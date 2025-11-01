"""
Resource handlers for Cricket Chat MCP Server.
Handles UI widget resources and templates.
"""

from typing import List
import mcp.types as types
from widgets import widgets, WIDGETS_BY_URI, _tool_meta, _resource_description, MIME_TYPE


def get_resource_list() -> List[types.Resource]:
    """Get list of all UI resources."""
    return [
        types.Resource(
            name=widget.title,
            title=widget.title,
            uri=widget.template_uri,
            description=_resource_description(widget),
            mimeType=MIME_TYPE,
            _meta=_tool_meta(widget),
        )
        for widget in widgets
    ]


def get_resource_templates() -> List[types.ResourceTemplate]:
    """Get list of all resource templates."""
    return [
        types.ResourceTemplate(
            name=widget.title,
            title=widget.title,
            uriTemplate=widget.template_uri,
            description=_resource_description(widget),
            mimeType=MIME_TYPE,
            _meta=_tool_meta(widget),
        )
        for widget in widgets
    ]


async def handle_read_resource(req: types.ReadResourceRequest) -> types.ServerResult:
    """
    Handle read resource requests.
    
    Args:
        req: The read resource request
        
    Returns:
        ServerResult containing the resource contents
    """
    widget = WIDGETS_BY_URI.get(str(req.params.uri))
    if widget is None:
        return types.ServerResult(
            types.ReadResourceResult(
                contents=[],
                _meta={"error": f"Unknown resource: {req.params.uri}"},
            )
        )

    contents = [
        types.TextResourceContents(
            uri=widget.template_uri,
            mimeType=MIME_TYPE,
            text=widget.html,
            _meta=_tool_meta(widget),
        )
    ]

    return types.ServerResult(types.ReadResourceResult(contents=contents))
