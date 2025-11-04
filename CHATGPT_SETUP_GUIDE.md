# ChatGPT MCP Server Configuration Guide

## 📝 What to Enter in ChatGPT

When configuring your MCP server in ChatGPT, use this information:

---

## 🎯 Server Description (Copy This)

**Recommended (Concise & Clear):**
```
Cricket data and statistics from Cricbuzz. Get player profiles, career stats, batting/bowling records, ICC rankings, cricket news, trending players, and historical records. Features interactive visual widgets for player information.
```

**Alternative (More Detailed):**
```
Comprehensive cricket statistics service powered by Cricbuzz API. Search players, view profiles with photos, get batting/bowling stats for all formats (Test/ODI/T20I), check ICC rankings, read cricket news, discover trending players, and explore cricket records. Features beautiful interactive widgets for enhanced data visualization.
```

---

## ⚙️ Server Configuration

**Server URL:**
```
http://localhost:8000/mcp
```

**Server Type:**
```
HTTP with SSE (Server-Sent Events)
```

---

## 🔍 Discovery Keywords

Your server will be triggered when users ask about:

### ✅ Primary Keywords
- Cricket
- Cricket player
- Cricket statistics / stats
- Player profile
- Batting / bowling
- ICC rankings
- Cricket news
- Cricket records

### ✅ Player Names
- Virat Kohli
- Sachin Tendulkar
- MS Dhoni
- Rohit Sharma
- Jasprit Bumrah
- (Any cricket player)

### ✅ Query Types
- "Show me [player name]'s profile"
- "Get [player name]'s batting statistics"
- "What are the ICC rankings?"
- "Cricket news about [player name]"
- "Trending cricket players"
- "Cricket records for most runs"

---

## 🧪 Test Queries

Use these to test your server after configuration:

1. **Player Profile:**
   - "Show me Virat Kohli's player information"
   - "Get Sachin Tendulkar's profile"

2. **Statistics:**
   - "What are Rohit Sharma's ODI batting statistics?"
   - "Show me Jasprit Bumrah's bowling stats"

3. **Rankings:**
   - "Get the current ICC ODI team rankings"
   - "Show me ICC Test player rankings"

4. **News:**
   - "Latest cricket news about MS Dhoni"
   - "Get player news for Virat Kohli"

5. **Trending:**
   - "Who are the trending cricket players?"

6. **Records:**
   - "Get cricket records for most runs in Test cricket"

---

## 🎨 Widget-Enabled Tools

These queries will display interactive widgets:

| Query Type | Tool | Widget Display |
|------------|------|----------------|
| Player profile | `get-player-info` | Profile card with photo, stats, rankings |
| Batting stats | `get-player-batting` | Statistics tables by format |
| Bowling stats | `get-player-bowling` | Statistics tables by format |
| Career info | `get-player-career` | Career timeline |
| Player news | `get-player-news` | News cards with images |
| ICC rankings | `get-rankings` | Rankings tables |
| Cricket records | `get-records` | Records leaderboards |
| Trending players | `get-trending-players` | Player grid |

---

## 🚀 Quick Setup Checklist

Before using in ChatGPT:

- [ ] Server is running (`python server.py`)
- [ ] Server accessible at `http://localhost:8000`
- [ ] `.env` file has `RAPIDAPI_KEY` configured
- [ ] React widgets built (`npm run build` in `ui/` folder)
- [ ] Test endpoint works: `curl http://localhost:8000/health`

---

## 💡 Pro Tips

### For Better Discovery:

1. **Use Specific Keywords**: 
   - ✅ "cricket player profile"
   - ❌ "sports information"

2. **Mention Format When Relevant**:
   - "ODI batting statistics"
   - "Test cricket records"
   - "T20I rankings"

3. **Include Visual Preferences**:
   - "Show me a widget with Virat's stats"
   - "Display an interactive chart"

### For Better Results:

1. **Be Specific**: 
   - ✅ "Virat Kohli's ODI batting average"
   - ❌ "Some cricket stats"

2. **Use Full Names** (first time):
   - ✅ "Virat Kohli" → then "Virat"
   - ❌ "VK" (may not work initially)

3. **Mention Tool Type** (optional):
   - "Search for player Sachin Tendulkar"
   - "Get batting stats for Rohit Sharma"

---

## 🐛 Troubleshooting

### Server Not Discovered?

**Check:**
1. Server description includes keywords like "cricket", "player", "statistics"
2. Server is running and accessible
3. ChatGPT has refreshed the MCP server list

### Widget Not Showing?

**Check:**
1. Tool has widget configured (see list above)
2. React bundles exist in `ui/dist/`
3. Browser console for errors (if testing locally)

### No Data Returned?

**Check:**
1. RAPIDAPI_KEY is configured in `.env`
2. API key is valid and has credits
3. Server logs for API errors
4. Player ID is correct (use `search-player` first)

---

## 📋 MCP Configuration JSON

If ChatGPT asks for JSON configuration:

```json
{
  "mcpServers": {
    "cric_chat": {
      "url": "http://localhost:8000/mcp",
      "name": "Cricket Chat",
      "description": "Cricket data and statistics from Cricbuzz. Get player profiles, career stats, batting/bowling records, ICC rankings, cricket news, trending players, and historical records. Features interactive visual widgets for player information."
    }
  }
}
```

---

## 🎯 Example Conversation Flow

**User:** "Show me Virat Kohli's batting statistics"

**ChatGPT thinks:**
1. Keywords detected: cricket, player name, batting statistics
2. Matches server: "cric_chat" (cricket statistics service)
3. Searches player: "Virat Kohli"
4. Calls tool: `get-player-batting` with player_id
5. Receives data with widget template
6. Displays interactive widget with stats

**User sees:** Beautiful interactive widget with Virat's batting stats across all formats

---

## 📚 Additional Resources

- Full documentation: See `README.md`
- Architecture details: See `ARCHITECTURE.md`
- Widget data flow: See `WIDGET_DATA_FLOW.md`
- Executive summary: See `EXECUTIVE_SUMMARY.md`

---

**Remember:** The more specific and cricket-focused your description, the better ChatGPT will discover and use your server! 🏏
