"""
Cricket Chat MCP Server - Main Entry Point

A cricket player information service that integrates with ChatGPT
through the Model Context Protocol (MCP). Features player stats,
career information, news, and trending players using the CricBuzz API.
"""

import logging
import sys

import uvicorn
from uvicorn.config import LOGGING_CONFIG
from mcp.server.fastmcp import FastMCP
from starlette.middleware.cors import CORSMiddleware

# Configure logging FIRST before importing other modules
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stdout,
    force=True
)

# Set uvicorn loggers to INFO to reduce noise
logging.getLogger("uvicorn").setLevel(logging.INFO)
logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
logging.getLogger("uvicorn.error").setLevel(logging.INFO)

from config import (
    SERVER_NAME,
    SERVER_HOST,
    SERVER_PORT,
    MCP_INSTRUCTIONS,
    SSE_PATH,
    MESSAGE_PATH,
    CORS_ALLOW_ORIGINS,
    CORS_ALLOW_METHODS,
    CORS_ALLOW_HEADERS,
    CORS_ALLOW_CREDENTIALS,
)
from mcp_handlers import register_mcp_handlers
from routes import get_routes
from widgets import widgets, HAS_UI


def create_mcp_server() -> FastMCP:
    """Create and configure the FastMCP server."""
    mcp = FastMCP(
        name=SERVER_NAME,
        instructions=MCP_INSTRUCTIONS,
        stateless_http=True,
        sse_path=SSE_PATH,
        message_path=MESSAGE_PATH,
    )
    
    # Register all MCP handlers (tools, resources, etc.)
    register_mcp_handlers(mcp)
    
    return mcp


def configure_app(mcp: FastMCP):
    """Configure the HTTP application with middleware and routes."""
    app = mcp.streamable_http_app()
    
    # Add CORS middleware
    try:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=CORS_ALLOW_ORIGINS,
            allow_methods=CORS_ALLOW_METHODS,
            allow_headers=CORS_ALLOW_HEADERS,
            allow_credentials=CORS_ALLOW_CREDENTIALS,
        )
    except Exception as e:
        print(f"Warning: Could not add CORS middleware: {e}")
    
    # Add HTTP routes
    app.routes.extend(get_routes())
    
    return app


# Create MCP server instance at module level for FastMCP Cloud deployment
# FastMCP Cloud will use this instance when deploying
mcp = create_mcp_server()

# Create app at module level for uvicorn compatibility
app = configure_app(mcp)


def print_startup_banner():
    """Print server startup information."""
    print("=" * 60)
    print("🏏 Cricket Chat MCP Server")
    print("=" * 60)
    print("\n📍 Endpoints:")
    print(f"  • MCP:    http://{SERVER_HOST}:{SERVER_PORT}{SSE_PATH}")
    print(f"  • Health: http://{SERVER_HOST}:{SERVER_PORT}/health")
    print(f"  • Info:   http://{SERVER_HOST}:{SERVER_PORT}/info")
    print("\n🛠️  Available Tools:")
    print("    Player Tools:")
    print("    • get-player-info - Get player profile and statistics")
    print("    • search-player - Search for players by name")
    print("    • get-player-career - Get comprehensive career stats")
    print("    • get-player-bowling - Get detailed bowling statistics")
    print("    • get-player-batting - Get detailed batting statistics")
    print("    • get-player-news - Get news articles for a player")
    print("    • get-trending-players - Get currently trending players")
    print("\n    Stats & Rankings Tools:")
    print("    • get-rankings - Get ICC rankings (batsmen, bowlers, allrounders, teams)")
    print("    • get-records - Get cricket records with filters (most runs, wickets, etc.)")
    print("    • get-record-filters - Get available statistics filters and record types")
    
    print(f"\n🎨 UI Widgets: {'Enabled' if HAS_UI else 'Disabled (build required)'}")
    if HAS_UI:
        print(f"    Registered {len(widgets)} widget(s):")
        for widget in widgets:
            print(f"    • {widget.title} ({widget.identifier})")
            print(f"      URI: {widget.template_uri}")
    
    print(f"\n💡 For ChatGPT: http://localhost:{SERVER_PORT}{SSE_PATH}")
    print("=" * 60)
    print("\nPress Ctrl+C to stop\n")


def main():
    """Main entry point for the server."""
    print("\n🔧 Starting Cricket Chat MCP Server...\n")
    
    # Create MCP server
    mcp = create_mcp_server()
    
    # Configure application
    app = configure_app(mcp)
    
    # Print startup information
    print_startup_banner()
    
    print("📋 Logging Configuration:")
    print(f"   - Root logger level: {logging.getLogger().level}")
    print(f"   - mcp_handlers logger level: {logging.getLogger('mcp_handlers').level}")
    print(f"   - Output: stdout")
    print("")
    
    # Configure uvicorn logging to use our handlers
    log_config = LOGGING_CONFIG
    log_config["formatters"]["default"]["fmt"] = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    log_config["formatters"]["access"]["fmt"] = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    # Set all loggers to use our configuration
    log_config["loggers"]["uvicorn"]["level"] = "INFO"
    log_config["loggers"]["uvicorn.error"]["level"] = "INFO"
    log_config["loggers"]["uvicorn.access"]["level"] = "WARNING"
    
    # Add our custom logger configuration
    log_config["loggers"]["mcp_handlers"] = {
        "level": "DEBUG",
        "handlers": ["default"],
        "propagate": False
    }
    
    # Run server with custom logging configuration
    uvicorn.run(
        app, 
        host=SERVER_HOST, 
        port=SERVER_PORT,
        log_config=log_config,
        log_level="debug",  # Enable debug level for our handlers
        access_log=False,  # Disable access logs to reduce noise
    )


# Entry point for local development
if __name__ == "__main__":
    main()
