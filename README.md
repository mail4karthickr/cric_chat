# Cricket Chat - MCP Server

**Comprehensive Cricket Statistics & Data Service**

Cricket Chat is a Model Context Protocol (MCP) server that provides cricket data and statistics from Cricbuzz, featuring interactive React widgets for rich data visualization in ChatGPT.

---

## 🏏 Features

- **Player Information**: Detailed player profiles with photos, roles, teams, and biography
- **Career Statistics**: Comprehensive batting and bowling stats across all formats (Test, ODI, T20I)
- **ICC Rankings**: Live team and player rankings for all formats
- **Cricket News**: Latest cricket news and updates
- **Trending Players**: Discover currently trending cricket players
- **Cricket Records**: Historical cricket records and statistics
- **Interactive Widgets**: Beautiful React-based widgets for enhanced data visualization

---

## 📊 Available Tools

### Player Information
- `get-player-info` - Get player profile with stats (has interactive widget)
- `search-player` - Search for players by name
- `get-player-career` - Get career summary (has interactive widget)
- `get-player-batting` - Get detailed batting statistics (has interactive widget)
- `get-player-bowling` - Get detailed bowling statistics (has interactive widget)
- `get-player-news` - Get news articles about a player (has interactive widget)

### Rankings & Records
- `get-rankings` - Get ICC rankings (has interactive widget)
- `get-records` - Get cricket records and statistics (has interactive widget)
- `get-record-filters` - Get available filters for records

### Trending
- `get-trending-players` - Get currently trending players (has interactive widget)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11 or higher
- Node.js 18+ (for building React widgets)
- Cricbuzz API key from RapidAPI

### Installation

#### Option 1: Docker (Recommended for Production)

**Quick Start:**
```bash
# 1. Create .env file
cp .env.example .env
# Edit .env and add your RAPIDAPI_KEY

# 2. Run with Docker Compose
docker-compose up -d

# 3. Verify
curl http://localhost:8000/health
```

**Build and Push to Docker Hub:**
```bash
./docker-build-push.sh
```

📚 **See detailed guides:**
- [DOCKER_QUICK_START.md](DOCKER_QUICK_START.md) - Quick commands and checklist
- [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md) - Complete deployment guide

#### Option 2: Local Development

1. **Clone the repository**
```bash
cd cric_chat
```

2. **Install Python dependencies**
```bash
pip install -e .
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env and add your RAPIDAPI_KEY
```

4. **Build React widgets** (optional, pre-built bundles included)
```bash
cd ui
npm install
npm run build
```

5. **Run the server**
```bash
python server.py
```

The server will start on `http://localhost:8000`

---

## 🔧 Configuration for ChatGPT

When adding this MCP server to ChatGPT, use this description:

```
Cricket data and statistics from Cricbuzz. Get player profiles, career stats, batting/bowling records, ICC rankings, cricket news, trending players, and historical records. Features interactive visual widgets for player information.
```

### MCP Server Configuration

Add to your ChatGPT MCP settings:

```json
{
  "mcpServers": {
    "cric_chat": {
      "url": "http://localhost:8000/mcp"
    }
  }
}
```

---

## 📖 Usage Examples

### In ChatGPT

Once connected, you can ask:

- "Show me Virat Kohli's player profile"
- "Get Sachin Tendulkar's ODI batting statistics"
- "What are the current ICC ODI team rankings?"
- "Show me cricket news about MS Dhoni"
- "Who are the trending cricket players?"
- "Get records for most runs in Test cricket"

ChatGPT will automatically:
1. Call the appropriate tool
2. Fetch data from Cricbuzz
3. Display an interactive widget (where available)

---

## 🎨 Interactive Widgets

The following tools display interactive React widgets in ChatGPT:

| Tool | Widget Features |
|------|----------------|
| `get-player-info` | Profile card with photo, stats, rankings |
| `get-player-batting` | Batting statistics tables by format |
| `get-player-bowling` | Bowling statistics tables by format |
| `get-player-career` | Career timeline and achievements |
| `get-player-news` | News cards with images |
| `get-rankings` | ICC rankings tables (Test/ODI/T20I) |
| `get-records` | Cricket records leaderboards |
| `get-trending-players` | Trending players grid |

---

## 🏗️ Architecture

```
Backend (Python/FastMCP)
    ↓
  Tools fetch data from Cricbuzz API
    ↓
  Return structuredContent
    ↓
ChatGPT receives data
    ↓
  Requests widget HTML
    ↓
  Injects data via window.openai.toolOutput
    ↓
React Widget renders with data
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

See [WIDGET_DATA_FLOW.md](./WIDGET_DATA_FLOW.md) for how data flows from tools to widgets.

---

## 🔐 Security

- API keys are stored in `.env` (gitignored)
- Never commit `.env` to version control
- Use `.env.example` as a template
- For production, implement backend image proxy to hide API keys from frontend

---

## 📁 Project Structure

```
cric_chat/
├── server.py              # Main MCP server
├── config.py              # Configuration
├── tools.py               # Tool definitions and handlers
├── widgets.py             # Widget configurations
├── schemas.py             # Pydantic schemas
├── mcp_handlers.py        # MCP protocol handlers
├── routes.py              # HTTP routes
├── resources.py           # MCP resources
├── cric_buzz_service/     # Cricbuzz API client
├── ui/                    # React widgets
│   ├── src/               # Widget components
│   └── dist/              # Built bundles
└── .env                   # Environment variables (gitignored)
```

---

## 🐛 Debugging

### Enable Debug Logging
The server runs with debug logging by default. Check console output for:
- Tool executions
- API calls
- Widget loading
- Data flow

### Test Tools Locally
```bash
# Test a tool directly
curl http://localhost:8000/test/player-info?player_id=1413
```

### Check Widget Loading
Look for these log messages:
- `🎨 Loading widgets.py module...`
- `📦 Loading bundle: player-info.js`
- `✅ UI bundles available: True`

---

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and design
- [EXECUTIVE_SUMMARY.md](./EXECUTIVE_SUMMARY.md) - Business overview for leadership
- [WIDGET_DATA_FLOW.md](./WIDGET_DATA_FLOW.md) - How data flows from backend to widgets
- [THEME_GUIDE.md](./ui/THEME_GUIDE.md) - Widget theming system

---

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Keep API keys secure

---

## 📄 License

This project is for demonstration purposes. Cricbuzz data is subject to their terms of service.

---

## 🙏 Acknowledgments

- **Cricbuzz** for cricket data via RapidAPI
- **MCP Protocol** by Anthropic
- **OpenAI Apps SDK** for widget rendering
- **React** for interactive components

---

## 📞 Support

For issues or questions:
1. Check the documentation in `/docs`
2. Review the debug logs
3. Ensure API keys are configured correctly
4. Verify React bundles are built

---

## 🎯 Roadmap

- [ ] Add live match scores
- [ ] Include match commentary
- [ ] Add team statistics
- [ ] Implement caching for frequently accessed data
- [ ] Add more cricket records categories
- [ ] Backend image proxy for production
- [ ] Performance optimizations
- [ ] Additional widget themes

---

**Built with ❤️ for cricket fans using MCP, FastAPI, and React**
