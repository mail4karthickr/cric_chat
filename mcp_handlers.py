"""
MCP Protocol Handlers for Cricket Chat Server.

This module contains all MCP callback handlers:
- list_tools: Register available tools
- call_tool: Execute tool requests
- list_resources: Register UI components
- list_resource_templates: Register UI templates
- read_resource: Serve UI component HTML
"""

import logging
import sys
from typing import List

import mcp.types as types
from tools import handle_tool_call, get_tool_definitions
from widgets import widgets, _tool_meta, _resource_description, WIDGETS_BY_URI, MIME_TYPE

# Setup logging with force to override any previous configuration
logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s:%(name)s: %(message)s',
    stream=sys.stdout,
    force=True  # This forces reconfiguration
)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)  # Ensure this logger is at DEBUG level

# Also set the root logger to DEBUG
logging.getLogger().setLevel(logging.DEBUG)


async def list_tools_handler() -> List[types.Tool]:
    """Register all available cricket tools."""
    logger.info("📋 list_tools_handler called")
    tools = get_tool_definitions()
    logger.info(f"   Returning {len(tools)} tools")
    return tools


async def list_resources_handler() -> List[types.Resource]:
    """Register UI components as resources."""
    # Use stderr for immediate output (not buffered by uvicorn)
    sys.stderr.write("\n" + "=" * 80 + "\n")
    sys.stderr.write("📦 CRICKET CHAT: list_resources_handler called\n")
    sys.stderr.write(f"   Registering {len(widgets)} widget(s) as resources\n")
    sys.stderr.write("=" * 80 + "\n\n")
    sys.stderr.flush()
    
    logger.info("=" * 80)
    logger.info("📦 list_resources_handler called")
    logger.info(f"   Total widgets available: {len(widgets)}")
    
    logger.debug("   Building resource registrations...")
    resources = [
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
    
    logger.info(f"   ✅ Successfully created {len(resources)} resource registrations")
    logger.info("   Resource Details:")
    for i, resource in enumerate(resources, 1):
        logger.info(f"      [{i}] Name: {resource.name}")
        logger.debug(f"          URI: {resource.uri}")
        logger.debug(f"          MimeType: {resource.mimeType}")
        logger.debug(f"          Description: {resource.description}")
        logger.debug(f"          Meta: {resource.meta}")
    
    logger.info("📦 list_resources_handler completed")
    logger.info("=" * 80)
    return resources


async def list_resource_templates_handler() -> List[types.ResourceTemplate]:
    """Register resource templates following Pizzaz pattern."""
    # Use stderr for immediate output (not buffered by uvicorn)
    sys.stderr.write("\n" + "=" * 80 + "\n")
    sys.stderr.write("🎨 CRICKET CHAT: list_resource_templates_handler called\n")
    sys.stderr.write(f"   Registering {len(widgets)} widget template(s)\n")
    sys.stderr.write("=" * 80 + "\n\n")
    sys.stderr.flush()
    
    logger.info("=" * 80)
    logger.info("🎨 list_resource_templates_handler called")
    logger.info(f"   Total widgets available for templates: {len(widgets)}")
    
    logger.debug("   Building resource template registrations...")
    templates = [
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
    
    logger.info(f"   ✅ Successfully created {len(templates)} resource template registrations")
    logger.info("   Resource Template Details:")
    for i, template in enumerate(templates, 1):
        logger.info(f"      [{i}] Name: {template.name}")
        logger.debug(f"          Title: {template.title}")
        logger.debug(f"          URI Template: {template.uriTemplate}")
        logger.debug(f"          MimeType: {template.mimeType}")
        logger.debug(f"          Description: {template.description}")
        logger.debug(f"          Meta Keys: {list(template.meta.keys()) if template.meta else 'None'}")
        if template.meta:
            for key, value in template.meta.items():
                logger.debug(f"             - {key}: {value}")
    
    logger.info("🎨 list_resource_templates_handler completed")
    logger.info("=" * 80)
    return templates


async def read_resource_handler(req: types.ReadResourceRequest) -> types.ServerResult:
    """Serve UI components as resources."""
    # Use stderr for immediate output (not buffered by uvicorn)
    sys.stderr.write("\n" + "=" * 80 + "\n")
    sys.stderr.write("📖 CRICKET CHAT: read_resource_handler called\n")
    sys.stderr.write(f"   Requested URI: {req.params.uri}\n")
    sys.stderr.write("=" * 80 + "\n")
    sys.stderr.flush()
    
    logger.info("=" * 80)
    logger.info(f"📖 read_resource_handler called")
    logger.info(f"   Requested URI: {req.params.uri}")
    logger.debug(f"   Request type: {type(req).__name__}")
    logger.debug(f"   Request params: {req.params}")
    logger.debug(f"   Total available widget URIs: {len(WIDGETS_BY_URI)}")
    logger.debug(f"   Available widget URIs: {list(WIDGETS_BY_URI.keys())}")
    
    # Convert URI to string and look up widget
    uri_str = str(req.params.uri)
    logger.debug(f"   Looking up widget for URI string: '{uri_str}'")
    widget = WIDGETS_BY_URI.get(uri_str)
    
    if widget is None:
        sys.stderr.write("❌ CRICKET CHAT: Widget NOT FOUND!\n")
        sys.stderr.write(f"   Requested: {uri_str}\n")
        sys.stderr.write(f"   Available: {list(WIDGETS_BY_URI.keys())}\n")
        sys.stderr.write("=" * 80 + "\n\n")
        sys.stderr.flush()
        
        logger.error("❌ Widget not found!")
        logger.error(f"   Requested URI: {uri_str}")
        logger.error(f"   URI type: {type(req.params.uri)}")
        logger.error(f"   Available URIs: {list(WIDGETS_BY_URI.keys())}")
        logger.info("=" * 80)
        return types.ServerResult(
            types.ReadResourceResult(
                contents=[],
                _meta={"error": f"Unknown resource: {req.params.uri}"},
            )
        )

    sys.stderr.write(f"✅ CRICKET CHAT: Widget FOUND - {widget.title}\n")
    sys.stderr.write(f"   Widget ID: {widget.identifier}\n")
    sys.stderr.write(f"   HTML Size: {len(widget.html)} chars\n")
    sys.stderr.write(f"   Has <div id='root'>: {'YES' if 'id=\"root\"' in widget.html else 'NO'}\n")
    sys.stderr.write("📤 CRICKET CHAT: Sending widget HTML to ChatGPT...\n")
    sys.stderr.write("=" * 80 + "\n\n")
    sys.stderr.flush()
    
    logger.info(f"✅ Widget found successfully!")
    logger.info(f"   Widget Title: {widget.title}")
    logger.info(f"   Widget Identifier: {widget.identifier}")
    logger.debug(f"   Widget Template URI: {widget.template_uri}")
    logger.debug(f"   Widget HTML length: {len(widget.html)} characters")
    logger.debug(f"   Widget HTML preview (first 200 chars):")
    logger.debug(f"   {widget.html[:200]}...")
    
    # Build response contents
    logger.debug("   Building TextResourceContents...")
    contents = [
        types.TextResourceContents(
            uri=widget.template_uri,
            mimeType=MIME_TYPE,
            text=widget.html,
            _meta=_tool_meta(widget),
        )
    ]
    
    logger.info(f"📤 Sending resource content")
    logger.info(f"   Content for widget: {widget.title}")
    logger.debug(f"   Content URI: {widget.template_uri}")
    logger.debug(f"   Content mimeType: {MIME_TYPE}")
    logger.debug(f"   Content text length: {len(widget.html)} bytes")
    logger.debug(f"   Content meta: {_tool_meta(widget)}")
    logger.info("📖 read_resource_handler completed successfully")
    logger.info("=" * 80)

    return types.ServerResult(types.ReadResourceResult(contents=contents))


# ============================================================================
# REGISTER HANDLERS
# ============================================================================

def register_mcp_handlers(mcp_server):
    """
    Register all MCP handlers with the server.
    
    Args:
        mcp_server: The FastMCP server instance
    """
    logger.info("=" * 80)
    logger.info("🔧 Registering MCP handlers...")
    
    # Register tools handlers
    logger.debug("   Registering list_tools handler...")
    @mcp_server._mcp_server.list_tools()
    async def _list_tools() -> List[types.Tool]:
        return await list_tools_handler()
    logger.debug("   ✅ list_tools handler registered")
    
    # Register resources handlers
    logger.debug("   Registering list_resources handler...")
    @mcp_server._mcp_server.list_resources()
    async def _list_resources() -> List[types.Resource]:
        return await list_resources_handler()
    logger.debug("   ✅ list_resources handler registered")
    
    logger.debug("   Registering list_resource_templates handler...")
    @mcp_server._mcp_server.list_resource_templates()
    async def _list_resource_templates() -> List[types.ResourceTemplate]:
        return await list_resource_templates_handler()
    logger.debug("   ✅ list_resource_templates handler registered")
    
    logger.debug("   Registering CallToolRequest handler...")
    mcp_server._mcp_server.request_handlers[types.CallToolRequest] = handle_tool_call
    logger.debug("   ✅ CallToolRequest handler registered")
    
    logger.debug("   Registering ReadResourceRequest handler...")
    mcp_server._mcp_server.request_handlers[types.ReadResourceRequest] = read_resource_handler
    logger.debug("   ✅ ReadResourceRequest handler registered")
    
    logger.info("✅ All MCP handlers registered successfully!")
    logger.info("=" * 80)
