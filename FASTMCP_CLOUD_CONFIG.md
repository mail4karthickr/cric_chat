# ⚡ FastMCP Cloud - Quick Config

## Copy-Paste Configuration for FastMCP Cloud

---

## 🎯 Project Configuration

### In FastMCP Cloud Dashboard:

```
Project Name:     cricket-chat
Repository:       YOUR_USERNAME/cric_chat
Branch:           main
Entrypoint:       server.py:mcp
Authentication:   Disabled (or Enabled if you want private)
```

---

## 🔐 Environment Variables

### Set these in FastMCP Cloud:

```bash
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com
```

**⚠️ Important**: Replace `your_rapidapi_key_here` with your actual RapidAPI key!

---

## 🌐 Your Deployed URL

After deployment, your server will be at:

```
https://cricket-chat.fastmcp.app/mcp
```

*(Replace `cricket-chat` with whatever project name you chose)*

---

## 📱 ChatGPT Configuration

### Add to ChatGPT MCP Settings:

```json
{
  "mcpServers": {
    "cricket-chat": {
      "url": "https://cricket-chat.fastmcp.app/mcp"
    }
  }
}
```

### Server Description:

```
Cricket data and statistics from Cricbuzz. Get player profiles, career stats, batting/bowling records, ICC rankings, cricket news, trending players, and historical records. Features interactive visual widgets for player information.
```

---

## 🧪 Test Query

Once connected, try:

```
Show me Virat Kohli's player information
```

You should see an interactive widget with his profile! 🏏

---

## 📋 Summary

✅ Entrypoint: `server.py:mcp`  
✅ Tools: 7  
✅ Widgets: 5  
✅ Ready to deploy!

That's it! 🚀
