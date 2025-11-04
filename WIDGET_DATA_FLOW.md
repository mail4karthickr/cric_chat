# How React Components Get Tool Data

**Understanding Data Flow from Tool Execution to Widget Rendering**

---

## Overview

When a tool is executed, the data flows through **three distinct phases**:

1. **Tool Execution** (Backend)
2. **Data Injection** (ChatGPT via OpenAI Apps SDK)
3. **Data Consumption** (React Widget via hooks)

**Important**: The current implementation uses the **OpenAI Apps SDK** which injects data via `window.openai.toolOutput`, not `window.WIDGET_DATA`. The React components use custom hooks (`useToolOutput()`) that subscribe to the Apps SDK's event system.

---

## Complete Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: TOOL EXECUTION (Backend - Python)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  User asks: "Show me Virat Kohli"                               │
│       ↓                                                           │
│  ChatGPT calls: call_tool("get-player-info", {playerId: 253802})│
│       ↓                                                           │
│  Python handler (_handle_get_player_info):                      │
│                                                                   │
│  async def _handle_get_player_info(arguments: dict):            │
│      # 1. Fetch from API                                         │
│      async with PlayersAPI() as api:                            │
│          player_data = await api.get_player_info("253802")      │
│                                                                   │
│      # 2. Return with widget reference                           │
│      return ServerResult(                                        │
│          CallToolResult(                                         │
│              content=[TextContent(                               │
│                  text="Here's Virat Kohli's info"              │
│              )],                                                 │
│              structuredContent={                    ← DATA HERE! │
│                  "playerId": "253802",                          │
│                  "name": "Virat Kohli",                         │
│                  "role": "Batsman",                             │
│                  "team": "India",                               │
│                  "DoB": "1988-11-05",                           │
│                  "bio": "...",                                   │
│                  "rankings": {...},                             │
│                  "recentBatting": {...}                         │
│              },                                                  │
│              _meta={                                             │
│                  "openai/outputTemplate":                       │
│                      "ui://widget/player-info.html"            │
│              }                                                   │
│          )                                                       │
│      )                                                           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: DATA INJECTION (ChatGPT)                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ChatGPT receives the response:                                  │
│  {                                                               │
│    structuredContent: {player data},                            │
│    _meta: {outputTemplate: "ui://widget/player-info.html"}     │
│  }                                                               │
│       ↓                                                           │
│  ChatGPT calls: read_resource("ui://widget/player-info.html")  │
│       ↓                                                           │
│  Server returns HTML bundle:                                     │
│  <div id="player-info-root"></div>                             │
│  <script type="module">...React code...</script>                │
│       ↓                                                           │
│  ChatGPT creates Skybridge sandbox with OpenAI Apps SDK:        │
│  ┌─────────────────────────────────────┐                       │
│  │ Skybridge Sandbox                    │                       │
│  │                                      │                       │
│  │ // CRITICAL: ChatGPT injects data   │                       │
│  │ // via OpenAI Apps SDK               │                       │
│  │ window.openai = {                    │  ← DATA INJECTED!    │
│  │   toolOutput: {                      │                       │
│  │     playerId: "253802",              │                       │
│  │     name: "Virat Kohli",             │                       │
│  │     role: "Batsman",                 │                       │
│  │     team: "India",                   │                       │
│  │     DoB: "1988-11-05",               │                       │
│  │     bio: "...",                       │                       │
│  │     rankings: {...},                 │                       │
│  │     recentBatting: {...}             │                       │
│  │   },                                 │                       │
│  │   toolInput: {player_id: 1413},     │                       │
│  │   theme: "light",                    │                       │
│  │   displayMode: "fullscreen"          │                       │
│  │ };                                   │                       │
│  │                                      │                       │
│  │ // Then loads the widget HTML/JS    │                       │
│  │ <div id="player-info-root"></div>   │                       │
│  │ <script>...React code...</script>   │                       │
│  └─────────────────────────────────────┘                       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: DATA CONSUMPTION (React Widget)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  React component uses OpenAI Apps SDK hooks:                     │
│                                                                   │
│  // hooks.js - Custom hook using Apps SDK                        │
│  export function useToolOutput() {                               │
│    return useOpenAiGlobal("toolOutput"); ← READ FROM SDK       │
│  }                                                               │
│                                                                   │
│  function useOpenAiGlobal(key) {                                │
│    return useSyncExternalStore(                                 │
│      (onChange) => {                                            │
│        // Subscribe to Apps SDK events                          │
│        const handleSetGlobal = (event) => {                     │
│          const value = event.detail.globals[key];               │
│          if (value !== undefined) onChange();                   │
│        };                                                        │
│        window.addEventListener("openai:set_globals",            │
│                               handleSetGlobal);                 │
│        return () => window.removeEventListener(                 │
│                       "openai:set_globals", handleSetGlobal);   │
│      },                                                          │
│      () => window.openai?.[key]  ← GET CURRENT VALUE           │
│    );                                                            │
│  }                                                               │
│                                                                   │
│  // PlayerInfo.jsx - Component                                   │
│  import { useToolOutput } from '../hooks';                       │
│                                                                   │
│  const PlayerInfoComponent = () => {                             │
│    const toolOutput = useToolOutput();  ← GET DATA              │
│                                                                   │
│    if (!toolOutput) {                                            │
│      return <Loading />;                                         │
│    }                                                              │
│                                                                   │
│    return (                                                       │
│      <Container>                                                 │
│        <PlayerName>{toolOutput.name}</PlayerName>               │
│        <Role>{toolOutput.role}</Role>                           │
│        <Team>{toolOutput.team}</Team>                           │
│        <Bio>{toolOutput.bio}</Bio>                              │
│        <Rankings>{toolOutput.rankings}</Rankings>               │
│        {/* ... render all data ... */}                           │
│      </Container>                                                │
│    );                                                             │
│  };                                                              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Code Examples

### 1. Backend: Tool Handler (Python)

```python
# tools.py - Where data originates

async def _handle_get_player_info(arguments: dict) -> ServerResult:
    """
    This is where we fetch and format the data
    """
    # Validate input
    payload = GetPlayerInfoInput.model_validate(arguments)
    
    # Fetch from Cricbuzz API
    async with PlayersAPI() as api:
        player_data = await api.get_player_info(payload.player_id)
    
    # IMPORTANT: This structuredContent is what gets passed to the widget
    return types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text=f"Displaying information for {player_data['name']}"
            )],
            
            # THIS BECOMES window.openai.toolOutput in the React component!
            structuredContent={
                "playerId": player_data.get("playerId"),
                "name": player_data.get("name"),
                "nickName": player_data.get("nickName"),
                "role": player_data.get("role"),
                "bat": player_data.get("bat"),
                "bowl": player_data.get("bowl"),
                "DoB": player_data.get("DoB"),
                "birthPlace": player_data.get("birthPlace"),
                "intlTeam": player_data.get("intlTeam"),
                "teams": player_data.get("teams"),
                "bio": player_data.get("bio"),
                "rankings": player_data.get("rankings"),
                "recentBatting": player_data.get("recentBatting"),
                "recentBowling": player_data.get("recentBowling"),
                "image": player_data.get("image"),
                "faceImageId": player_data.get("faceImageId")
            },
            
            # Tell ChatGPT which widget to use
            _meta={
                "openai/outputTemplate": "ui://widget/player-info.html",
                "openai/widgetAccessible": True
            }
        )
    )
```

### 2. Frontend: Reading the Data (React)

```javascript
// ui/src/hooks.js - Custom hook to access data

export const useToolOutput = () => {
  /**
   * This hook reads from window.openai.toolOutput
   * using the OpenAI Apps SDK subscription system
   */
  return useOpenAiGlobal("toolOutput");
};
```

```javascript
// ui/src/PlayerInfo/PlayerInfo.jsx - Using the data

import React from 'react';
import { createRoot } from 'react-dom/client';
import { useToolOutput } from '../hooks';

const PlayerInfoComponent = () => {
  // Get the data that was passed from the backend
  const toolOutput = useToolOutput();
  
  // Handle loading state
  if (!toolOutput) {
    return (
      <LoadingContainer>
        🏏 Loading player information...
      </LoadingContainer>
    );
  }
  
  // Destructure the data (same structure as structuredContent)
  const {
    name,
    nickName,
    role,
    bat,
    bowl,
    DoB,
    birthPlace,
    intlTeam,
    teams,
    bio,
    rankings,
    recentBatting,
    recentBowling,
    image,
    faceImageId
  } = toolOutput;
  
  // Render the UI with the data
  return (
    <Container>
      <Header>
        <PlayerImage src={image} alt={name} />
        <PlayerName>{name}</PlayerName>
        {nickName && <NickName>"{nickName}"</NickName>}
      </Header>
      
      <InfoGrid>
        <InfoItem>
          <Label>Role</Label>
          <Value>{role}</Value>
        </InfoItem>
        
        <InfoItem>
          <Label>Batting Style</Label>
          <Value>{bat}</Value>
        </InfoItem>
        
        <InfoItem>
          <Label>Bowling Style</Label>
          <Value>{bowl}</Value>
        </InfoItem>
        
        <InfoItem>
          <Label>Date of Birth</Label>
          <Value>{DoB}</Value>
        </InfoItem>
      </InfoGrid>
      
      <Bio>{bio}</Bio>
      
      {rankings && <Rankings data={rankings} />}
      {recentBatting && <RecentBatting data={recentBatting} />}
      {recentBowling && <RecentBowling data={recentBowling} />}
    </Container>
  );
};

// Mount the component when the script loads
const root = createRoot(document.getElementById('player-info-root'));
root.render(<PlayerInfoComponent />);

export default PlayerInfoComponent;
```

---

## Timeline of Data Flow

```
Time: 0ms
└─ User types: "Show me Virat Kohli"

Time: 50ms
└─ ChatGPT calls: call_tool("get-player-info", {playerId: "253802"})

Time: 100ms
└─ Backend fetches from Cricbuzz API

Time: 800ms
└─ Cricbuzz responds with player data

Time: 850ms
└─ Backend transforms and returns:
   {
     structuredContent: {player data},
     _meta: {outputTemplate: "ui://widget/player-info.html"}
   }

Time: 900ms
└─ ChatGPT receives response and calls:
   read_resource("ui://widget/player-info.html")

Time: 1100ms
└─ Backend returns HTML bundle (1MB)

Time: 1150ms
└─ ChatGPT creates Skybridge sandbox:
   1. Sets window.openai.toolOutput = {player data}
   2. Injects HTML into sandbox
   3. Dispatches openai:set_globals event

Time: 1200ms
└─ React component loads:
   1. useToolOutput() subscribes to window.openai.toolOutput
   2. Component receives data via hook
   3. User sees beautiful widget!
```

---

## Important Notes

### 1. **No Props, No State Management**

Unlike traditional React apps, the data doesn't come through props:

```javascript
// ❌ NOT like this (traditional React):
<PlayerInfo data={playerData} />

// ✅ Instead, data comes from window.openai.toolOutput via hooks:
const toolOutput = useToolOutput();  // Subscribes to Apps SDK
```

### 2. **Data is Injected BEFORE Component Loads**

ChatGPT guarantees this execution order:
```javascript
// Step 1: ChatGPT sets the data via Apps SDK
window.openai = {
  toolOutput: {player data},
  toolInput: {player_id: 1413},
  theme: "light"
};

// Step 2: Then loads the widget
<script type="module">...React code...</script>

// Step 3: React subscribes and reads the data
const toolOutput = useToolOutput();  // Hook subscribes to window.openai
```

### 3. **Data Structure Must Match**

The `structuredContent` from Python must match what React expects:

```python
# Python (tools.py)
structuredContent={
    "name": "Virat Kohli",  # ← Key name
    "role": "Batsman"       # ← Key name
}
```

```javascript
// JavaScript (PlayerInfo.jsx)
const { name, role } = toolOutput;  // ← Same key names
```

### 4. **Type Safety**

To ensure type safety, you can define interfaces:

```typescript
// If using TypeScript:
interface PlayerData {
  playerId: string;
  name: string;
  nickName?: string;
  role: string;
  bat: string;
  bowl: string;
  DoB: string;
  birthPlace: string;
  intlTeam: string;
  teams: string[];
  bio: string;
  rankings?: any;
  recentBatting?: any;
  recentBowling?: any;
  image?: string;
  faceImageId?: string;
}

const toolOutput = useToolOutput() as PlayerData | null;
```

---

## Debugging Tips

### 1. **Check if Data is Available**

```javascript
const PlayerInfoComponent = () => {
  const toolOutput = useToolOutput();
  
  // Debug: Log the data
  console.log('🔍 Tool Output:', toolOutput);
  
  if (!toolOutput) {
    console.error('❌ No data available!');
    return <div>No data</div>;
  }
  
  console.log('✅ Data received:', {
    name: toolOutput.name,
    role: toolOutput.role
  });
  
  // ... render component
};
```

### 2. **Inspect in Browser DevTools**

In ChatGPT, you can't directly inspect, but you can check logs:

```javascript
// Add console logs in your component
console.log('Tool Output:', window.openai?.toolOutput);
console.log('Full OpenAI Object:', window.openai);
```

### 3. **Test Locally**

Create a test HTML file:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Widget Test</title>
</head>
<body>
  <div id="player-info-root"></div>
  
  <script>
    // Simulate ChatGPT injecting data via OpenAI Apps SDK
    window.openai = {
      toolOutput: {
        playerId: "253802",
        name: "Virat Kohli",
        role: "Batsman",
        bat: "Right-hand bat",
        bowl: "Right-arm medium",
        DoB: "1988-11-05",
        // ... rest of data
      },
      toolInput: { player_id: "253802" },
      theme: "light",
      displayMode: "fullscreen"
    };
    
    // Dispatch the set_globals event
    window.dispatchEvent(new CustomEvent('openai:set_globals', {
      detail: { globals: window.openai }
    }));
  </script>
  
  <!-- Load your widget -->
  <script type="module" src="./dist/player-info.js"></script>
</body>
</html>
```

---

## Summary

**The data flow is:**

1. **Backend** fetches from Cricbuzz → returns `structuredContent`
2. **ChatGPT** receives `structuredContent` → injects as `window.openai.toolOutput`
3. **React** subscribes via `useToolOutput()` hook → renders UI

**Key Insight:** 
- ChatGPT acts as the "middleman" that connects backend data to frontend widgets
- The `structuredContent` you return from Python becomes `window.openai.toolOutput` in JavaScript
- React hooks use the OpenAI Apps SDK event system to subscribe to data updates
- This is a **one-way data flow**: Backend → ChatGPT → React (no reverse communication)

That's how React components magically have access to the data without any explicit props or API calls! 🎉

