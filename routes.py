"""
HTTP routes for Cricket Chat MCP Server.
"""

from starlette.responses import JSONResponse
from starlette.routing import Route

from config import SERVER_NAME, SERVER_VERSION, SERVER_DESCRIPTION, TOOL_NAMES
from widgets import widgets, HAS_UI, WIDGETS_BY_URI, MIME_TYPE


async def root(request):
    """Root endpoint - server information."""
    return JSONResponse({
        "name": "Cricket Chat MCP Server",
        "status": "running",
        "version": SERVER_VERSION,
        "description": SERVER_DESCRIPTION,
        "endpoints": {
            "mcp_sse": "/mcp (SSE - for MCP clients only)",
            "mcp_messages": "/mcp/messages (HTTP POST - for stateless MCP)",
            "health": "/health",
            "info": "/info",
            "widgets": "/debug/widgets"
        },
        "note": "The /mcp endpoint requires 'Accept: text/event-stream' header and is meant for MCP clients (like Claude Desktop), not browsers."
    })


async def health(request):
    """Health check endpoint."""
    return JSONResponse({
        "status": "healthy",
        "server": SERVER_NAME
    })


async def server_info(request):
    """Server information endpoint."""
    return JSONResponse({
        "name": SERVER_NAME,
        "version": SERVER_VERSION,
        "description": SERVER_DESCRIPTION,
        "tools": len(TOOL_NAMES),
        "tool_list": TOOL_NAMES
    })


async def debug_widgets(request):
    """Debug endpoint showing widget registration."""
    if not HAS_UI:
        return JSONResponse({
            "status": "widgets_disabled",
            "message": "UI bundles not built. Run: cd ui && npm run build"
        })
    
    widget_info = []
    for widget in widgets:
        widget_info.append({
            "identifier": widget.identifier,
            "title": widget.title,
            "description": widget.description,
            "template_uri": widget.template_uri,
            "invoking": widget.invoking,
            "invoked": widget.invoked,
            "response_text": widget.response_text,
            "html_length": len(widget.html),
            "html_preview": widget.html[:200] + "..." if len(widget.html) > 200 else widget.html,
        })
    
    return JSONResponse({
        "status": "widgets_enabled",
        "mime_type": MIME_TYPE,
        "widget_count": len(widgets),
        "widgets": widget_info,
        "widgets_by_uri": list(WIDGETS_BY_URI.keys()),
    })


def get_routes():
    """Get all HTTP routes."""
    return [
        Route("/", root),
        Route("/health", health),
        Route("/info", server_info),
        Route("/debug/widgets", debug_widgets),
    ]
