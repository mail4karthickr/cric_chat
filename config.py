"""
Configuration constants for Cricket Chat MCP Server.
"""

# Server configuration
SERVER_NAME = "cric_chat"
SERVER_VERSION = "1.0.0"
SERVER_DESCRIPTION = "Cricket player information service using CricBuzz API"
SERVER_HOST = "0.0.0.0"
SERVER_PORT = 8000

# MCP configuration
MCP_INSTRUCTIONS = (
    "Cricket player information service using CricBuzz API. "
    "Get player stats, career info, news, and trending players."
)
SSE_PATH = "/mcp"
MESSAGE_PATH = "/mcp/messages"

# Tool names
TOOL_NAMES = [
    "get-player-info",
    "search-player",
    "get-player-career",
    "get-player-bowling",
    "get-player-batting",
    "get-player-news",
    "get-trending-players",
]

# CORS settings
CORS_ALLOW_ORIGINS = ["*"]
CORS_ALLOW_METHODS = ["*"]
CORS_ALLOW_HEADERS = ["*"]
CORS_ALLOW_CREDENTIALS = False
