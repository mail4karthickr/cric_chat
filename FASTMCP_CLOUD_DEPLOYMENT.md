# FastMCP Cloud Deployment Guide

## 🚀 Deploying Cricket Chat to FastMCP Cloud

This guide walks you through deploying your Cricket Chat MCP server to [FastMCP Cloud](https://fastmcp.cloud).

---

## ✅ Pre-Deployment Checklist

Your project is now ready for FastMCP Cloud! Here's what has been configured:

- [x] **FastMCP server instance at module level** (`server.py`)
- [x] **Dependencies defined** (`pyproject.toml`)
- [x] **Environment variables support** (`.env` with `python-dotenv`)
- [x] **Proper entrypoint** (`server.py:mcp`)
- [x] **GitHub repository** (push your code to GitHub)

---

## 📋 Step-by-Step Deployment

### Step 1: Push Your Code to GitHub

1. **Create a new GitHub repository** (if you haven't already):
   ```bash
   # Initialize git if not already done
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - Cricket Chat MCP Server"
   
   # Add remote (replace with your GitHub repo URL)
   git remote add origin https://github.com/yourusername/cric_chat.git
   
   # Push to GitHub
   git push -u origin main
   ```

2. **Ensure `.env` is in `.gitignore`**:
   - ✅ Already configured in your `.gitignore`
   - Your API key won't be committed to GitHub

---

### Step 2: Set Up FastMCP Cloud Project

1. **Visit [fastmcp.cloud](https://fastmcp.cloud)**

2. **Sign in with your GitHub account**

3. **Create a new project**:
   - Click "Create Project"
   - Choose your `cric_chat` repository (or use quickstart to test)

4. **Configure your project**:

   | Field | Value | Description |
   |-------|-------|-------------|
   | **Name** | `cricket-chat` or `cric-chat` | Project name (will be part of URL) |
   | **Entrypoint** | `server.py:mcp` | Points to the `mcp` instance in `server.py` |
   | **Authentication** | Choose based on your needs | Public or organization-only |

   Example configuration:
   ```
   Name: cricket-chat
   Repository: yourusername/cric_chat
   Branch: main
   Entrypoint: server.py:mcp
   Authentication: Disabled (public) or Enabled (private)
   ```

---

### Step 3: Set Environment Variables

Your MCP server needs the `RAPIDAPI_KEY` environment variable. FastMCP Cloud provides a way to set environment variables securely.

**Important**: Contact FastMCP Cloud support or check their dashboard for how to set environment variables. They may provide:
- Environment variable configuration in the project settings
- Secrets management
- `.env` file upload

**Required Environment Variables**:
```bash
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com
```

---

### Step 4: Deploy!

FastMCP Cloud will automatically:
1. ✅ Clone your repository
2. ✅ Detect `pyproject.toml` and install dependencies
3. ✅ Find the `mcp` instance at `server.py:mcp`
4. ✅ Build and deploy your server
5. ✅ Provide a unique URL

Your server will be available at:
```
https://cricket-chat.fastmcp.app/mcp
```
*(Replace `cricket-chat` with your actual project name)*

---

### Step 5: Connect to ChatGPT

Once deployed, use the provided URL in ChatGPT:

1. Open ChatGPT
2. Go to MCP settings
3. Add a new server:

```json
{
  "mcpServers": {
    "cricket-chat": {
      "url": "https://cricket-chat.fastmcp.app/mcp"
    }
  }
}
```

4. Use the server description from `QUICK_REFERENCE.md`:
```
Cricket data and statistics from Cricbuzz. Get player profiles, career stats, batting/bowling records, ICC rankings, cricket news, trending players, and historical records. Features interactive visual widgets for player information.
```

---

## 🔄 Continuous Deployment

FastMCP Cloud automatically redeploys when you push to the `main` branch:

```bash
# Make changes to your code
git add .
git commit -m "Updated player stats widget"
git push

# FastMCP Cloud will automatically redeploy!
```

---

## 🧪 Testing Before Production

FastMCP Cloud creates preview deployments for pull requests:

1. Create a new branch:
   ```bash
   git checkout -b feature/new-widget
   ```

2. Make your changes and push:
   ```bash
   git push origin feature/new-widget
   ```

3. Create a Pull Request on GitHub

4. FastMCP Cloud will deploy to a unique URL like:
   ```
   https://cricket-chat-pr-123.fastmcp.app/mcp
   ```

5. Test with this URL before merging to `main`

---

## 📦 Dependencies

Your `pyproject.toml` already includes all required dependencies:

```toml
[project]
dependencies = [
    "aiohttp>=3.12.15",
    "backoff>=2.2.1",
    "cachetools>=6.1.0",
    "fastapi>=0.116.1",
    "fastmcp>=2.11.3",
    "httpx>=0.27.0",
    "jq>=1.10.0",
    "mcp>=1.16.0",
    "pydantic>=2.11.7",
    "python-dotenv>=1.1.1",
    "starlette>=0.41.0",
    "uvicorn>=0.35.0",
]
```

FastMCP Cloud will automatically install these from your `pyproject.toml`.

---

## 🎨 Widget Bundles

Your React widget bundles are already built and included in the repository at `ui/dist/`.

FastMCP Cloud will serve these static files when rendering widgets in ChatGPT.

---

## 🔍 Verifying Your Deployment

Before deploying, you can test your entrypoint locally:

```bash
# Install fastmcp if not already installed
pip install fastmcp

# Inspect your server
fastmcp inspect server.py:mcp
```

This shows what FastMCP Cloud will see:
- Tools available
- Resources available
- Configuration

---

## 🐛 Troubleshooting

### Issue: "Module not found" error

**Solution**: Ensure all imports are relative to the project root:
```python
# ✅ Correct
from config import SERVER_NAME
from mcp_handlers import register_mcp_handlers

# ❌ Wrong
from .config import SERVER_NAME
```

### Issue: Environment variables not working

**Solution**: 
1. Set environment variables in FastMCP Cloud dashboard
2. Ensure `python-dotenv` is in dependencies ✅ (already added)
3. Check `base_client.py` loads environment variables ✅ (already configured)

### Issue: Widgets not rendering

**Solution**:
1. Ensure `ui/dist/` folder is committed to git
2. Check widget bundles exist:
   ```bash
   ls ui/dist/
   # Should show: player-info.js, player-news.js, etc.
   ```

### Issue: CORS errors

**Solution**: CORS is already configured in `server.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
```

---

## 📊 Monitoring

FastMCP Cloud provides:
- **Build logs** - See deployment progress
- **Runtime logs** - Monitor server activity
- **Error tracking** - Debug issues
- **Health checks** - Ensure server is running

Access these from your FastMCP Cloud dashboard.

---

## 🔐 Security Considerations

### API Keys

- ✅ `.env` is gitignored
- ✅ Environment variables loaded via `python-dotenv`
- ❌ **Action Required**: Remove hardcoded API keys from React components

The React widgets currently have hardcoded API keys for image loading. For production:

1. **Option A**: Use CDN URLs (already implemented - no API key needed)
2. **Option B**: Implement backend image proxy (future enhancement)

Current implementation uses public CDN URLs, so no API key exposure.

### Authentication

If you enabled authentication on FastMCP Cloud:
- Only your organization members can access the server
- No public access

If authentication is disabled:
- Anyone with the URL can use your server
- Monitor usage to prevent abuse

---

## 💰 Pricing

**FastMCP Cloud is free during beta!**

After beta, check [fastmcp.cloud](https://fastmcp.cloud) for pricing details.

---

## 🆘 Support

Need help?

- **FastMCP Discord**: [https://discord.com/invite/aGsSC3yDF4](https://discord.com/invite/aGsSC3yDF4)
- **Documentation**: [https://gofastmcp.com](https://gofastmcp.com)
- **GitHub Issues**: Create an issue in your repository

---

## 📝 Summary

Your Cricket Chat MCP server is ready for FastMCP Cloud deployment:

1. ✅ Code structure compatible with FastMCP Cloud
2. ✅ Entrypoint: `server.py:mcp`
3. ✅ Dependencies in `pyproject.toml`
4. ✅ Environment variables supported
5. ✅ Widgets built and ready

**Next Steps**:
1. Push code to GitHub
2. Create project on FastMCP Cloud
3. Configure environment variables
4. Deploy!
5. Connect to ChatGPT

**Your deployed URL will be**:
```
https://your-project-name.fastmcp.app/mcp
```

Happy deploying! 🚀🏏
