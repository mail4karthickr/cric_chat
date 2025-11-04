"""
Cricket Chat MCP Server - FastCloud-safe entrypoint (no self-hosted Uvicorn)
"""

import logging
import sys
import os

from starlette.middleware.cors import CORSMiddleware
from mcp.server.fastmcp import FastMCP

from config import (
    SERVER_NAME,
    SERVER_HOST,         # still used for local dev prints
    SERVER_PORT,         # still used for local dev prints
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

# ---------- Logging ----------
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    stream=sys.stdout,
    force=True,
)
logging.getLogger("uvicorn").setLevel(logging.INFO)
logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
logging.getLogger("uvicorn.error").setLevel(logging.INFO)

# ---------- Build MCP ----------
def create_mcp_server() -> FastMCP:
    mcp = FastMCP(
        name=SERVER_NAME,
        instructions=MCP_INSTRUCTIONS,
        stateless_http=True,
        sse_path=SSE_PATH,        # keep SSE endpoint for legacy clients
        message_path=MESSAGE_PATH # Streamable-HTTP messages endpoint
    )
    register_mcp_handlers(mcp)
    return mcp

def configure_app(mcp: FastMCP):
    # Streamable HTTP ASGI app (no uvicorn.run here!)
    app = mcp.streamable_http_app()

    # CORS
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

    # Extra routes (health, info, widgets, etc.)
    app.routes.extend(get_routes())
    return app

# FastCloud picks these up on import:
mcp = create_mcp_server()
app = configure_app(mcp) 

def build_server() -> FastMCP:
    return create_mcp_server()