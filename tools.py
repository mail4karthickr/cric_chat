"""
Tool definitions and handlers for Cricket Chat MCP Server.
"""

import logging
from typing import List
from pydantic import ValidationError

import mcp.types as types
from cric_buzz_service.players_api import PlayersAPI
from cric_buzz_service.stats_api import StatsAPI, FormatType, RankingCategory
from schemas import (
    GetPlayerInfoInput,
    SearchPlayerInput,
    GetPlayerCareerInput,
    GetPlayerBowlingInput,
    GetPlayerBattingInput,
    GetPlayerNewsInput,
    GetRankingsInput,
    GetRecordsInput,
    get_schemas,
)
from widgets import widgets, _tool_meta

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Get all schemas
SCHEMAS = get_schemas()


def get_tool_definitions() -> List[types.Tool]:
    """Get all available tool definitions (widget-based + non-widget tools)."""
    tools = []
    
    logger.info(f"🔧 Generating tool definitions. Found {len(widgets)} widgets")
    
    # Add widget-based tools (with UI)
    for widget in widgets:
        meta = _tool_meta(widget)
        logger.info(f"✅ Registering widget tool: {widget.identifier}")
        logger.debug(f"   Widget metadata: {meta}")
        tools.append(
            types.Tool(
                name=widget.identifier,
                description=widget.description,
                inputSchema=SCHEMAS.get(widget.identifier, {}),
                _meta=meta,
            )
        )
    
    # Add non-widget tools (without UI)
    logger.info("✅ Registering non-widget tool: search-player")
    tools.append(
        types.Tool(
            name="search-player",
            description=(
                "Search for cricket players by name. "
                "Returns a list of players matching the search query with their IDs. "
                "Use this to find a player's ID before getting detailed information."
            ),
            inputSchema=SCHEMAS["search-player"],
        )
    )
    
    logger.info("✅ Registering non-widget tool: get-record-filters")
    tools.append(
        types.Tool(
            name="get-record-filters",
            description=(
                "Get available statistics filters and record types from Cricbuzz. "
                "Returns available stats types (like 'mostRuns', 'mostWickets', etc.), years, teams, and match types. "
                "Use this to discover what filters are available before calling get-records. "
                "This is a metadata endpoint to help construct valid get-records queries."
            ),
            inputSchema=SCHEMAS["get-record-filters"],
        )
    )
    
    # Note: get-rankings is now a widget-based tool (registered above with UI support)
    # Note: get-records will be a widget-based tool (UI component to be created)
    # Note: get-icc-standings has been removed (not needed)
    
    logger.info(f"📋 Total tools registered: {len(tools)}")
    return tools

async def handle_tool_call(req: types.CallToolRequest) -> types.ServerResult:
    """
    Handle tool execution requests.
    
    Args:
        req: The tool call request
        
    Returns:
        ServerResult containing the tool execution result
    """
    tool_name = req.params.name
    arguments = req.params.arguments or {}
    
    logger.info(f"🔨 Tool call received: {tool_name}")
    logger.debug(f"   Arguments: {arguments}")
    
    try:
        # Route to appropriate handler
        if tool_name == "get-player-info":
            logger.info("   Routing to: _handle_get_player_info")
            return await _handle_get_player_info(arguments)
        elif tool_name == "search-player":
            logger.info("   Routing to: _handle_search_player")
            return await _handle_search_player(arguments)
        elif tool_name == "get-player-career":
            return await _handle_get_player_career(arguments)
        elif tool_name == "get-player-bowling":
            return await _handle_get_player_bowling(arguments)
        elif tool_name == "get-player-batting":
            return await _handle_get_player_batting(arguments)
        elif tool_name == "get-player-news":
            return await _handle_get_player_news(arguments)
        elif tool_name == "get-trending-players":
            return await _handle_get_trending_players()
        elif tool_name == "get-rankings":
            logger.info("   Routing to: _handle_get_rankings")
            return await _handle_get_rankings(arguments)
        elif tool_name == "get-records":
            logger.info("   Routing to: _handle_get_records")
            return await _handle_get_records(arguments)
        elif tool_name == "get-record-filters":
            logger.info("   Routing to: _handle_get_record_filters")
            return await _handle_get_record_filters()
        else:
            return _create_error_result(f"Unknown tool: {tool_name}")
    
    except ValidationError as exc:
        return _create_error_result(f"Input validation error: {exc.errors()}")
    except Exception as exc:
        return _create_error_result(f"Error executing tool: {str(exc)}")


# Tool handler implementations

async def _handle_get_player_info(arguments: dict) -> types.ServerResult:
    """Handle get-player-info tool."""
    logger.info("🏏 Handling get-player-info request")
    payload = GetPlayerInfoInput.model_validate(arguments)
    logger.debug(f"   Player ID: {payload.player_id}")
    
    async with PlayersAPI() as api:
        player_info = await api.get_player_info(payload.player_id)
    
    logger.info(f"✅ Player info retrieved successfully")
    logger.debug(f"   Data keys: {list(player_info.keys()) if isinstance(player_info, dict) else 'Not a dict'}")
    
    result = types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text=f"Successfully retrieved player information for player ID {payload.player_id}."
            )],
            structuredContent=player_info,
        )
    )
    
    logger.info("📦 Returning CallToolResult with structuredContent")
    logger.debug(f"   StructuredContent keys: {list(player_info.keys()) if isinstance(player_info, dict) else 'N/A'}")
    logger.info("🎨 This response should trigger widget display (has structuredContent)")
    
    return result


async def _handle_search_player(arguments: dict) -> types.ServerResult:
    """Handle search-player tool."""
    payload = SearchPlayerInput.model_validate(arguments)
    
    async with PlayersAPI() as api:
        search_results = await api.search_player(payload.player_name)
    
    return types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text=f"Successfully searched for player: {payload.player_name}."
            )],
            structuredContent=search_results,
        )
    )


async def _handle_get_player_career(arguments: dict) -> types.ServerResult:
    """Handle get-player-career tool."""
    payload = GetPlayerCareerInput.model_validate(arguments)
    
    async with PlayersAPI() as api:
        career_stats = await api.get_career(payload.player_id)
    
    return types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text=f"Successfully retrieved career statistics for player ID {payload.player_id}."
            )],
            structuredContent=career_stats,
        )
    )


async def _handle_get_player_bowling(arguments: dict) -> types.ServerResult:
    """Handle get-player-bowling tool."""
    payload = GetPlayerBowlingInput.model_validate(arguments)
    
    async with PlayersAPI() as api:
        bowling_stats = await api.get_bwidgetowling(payload.player_id)
    
    return types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text=f"Successfully retrieved bowling statistics for player ID {payload.player_id}."
            )],
            structuredContent=bowling_stats,
        )
    )


async def _handle_get_player_batting(arguments: dict) -> types.ServerResult:
    """Handle get-player-batting tool."""
    payload = GetPlayerBattingInput.model_validate(arguments)
    
    async with PlayersAPI() as api:
        batting_stats = await api.get_batting(payload.player_id)
    
    return types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text=f"Successfully retrieved batting statistics for player ID {payload.player_id}."
            )],
            structuredContent=batting_stats,
        )
    )


async def _handle_get_player_news(arguments: dict) -> types.ServerResult:
    """Handle get-player-news tool."""
    payload = GetPlayerNewsInput.model_validate(arguments)
    
    async with PlayersAPI() as api:
        player_news = await api.get_news(payload.player_id)
    
    return types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text=f"Successfully retrieved news for player ID {payload.player_id}."
            )],
            structuredContent=player_news,
        )
    )


async def _handle_get_trending_players() -> types.ServerResult:
    """Handle get-trending-players tool."""
    async with PlayersAPI() as api:
        trending_players = await api.list_trending()
    
    return types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text="Successfully retrieved trending players."
            )],
            structuredContent=trending_players,
        )
    )


async def _handle_get_rankings(arguments: dict) -> types.ServerResult:
    """Handle get-rankings tool."""
    logger.info("📊 Handling get-rankings request")
    payload = GetRankingsInput.model_validate(arguments)
    logger.debug(f"   Category: {payload.category}, Format: {payload.format_type}, Women: {payload.is_women}")
    
    # Convert string values to enums
    category = RankingCategory(payload.category)
    format_type = FormatType(payload.format_type)
    
    async with StatsAPI() as api:
        rankings = await api.get_rankings(
            category=category,
            format_type=format_type,
            is_women=payload.is_women
        )
    
    logger.info(f"✅ Rankings retrieved successfully")
    
    gender = "Women's" if payload.is_women else "Men's"
    format_name = payload.format_type.upper()
    category_name = payload.category.capitalize()
    
    # Add metadata to the rankings response for UI
    rankings_with_metadata = {
        **rankings,
        "metadata": {
            "category": payload.category,
            "format_type": payload.format_type,
            "is_women": payload.is_women,
            "gender": gender,
            "format_name": format_name,
            "category_name": category_name
        }
    }
    
    return types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text=f"Successfully retrieved {gender} {format_name} {category_name} rankings."
            )],
            structuredContent=rankings_with_metadata,
        )
    )


async def _handle_get_records(arguments: dict) -> types.ServerResult:
    """Handle get-records tool."""
    logger.info("📊 Handling get-records request")
    payload = GetRecordsInput.model_validate(arguments)
    logger.debug(f"   Stats Type: {payload.stats_type}, Year: {payload.year}, Match Type: {payload.match_type}")
    
    async with StatsAPI() as api:
        records = await api.get_records(
            stats_type=payload.stats_type,
            year=payload.year,
            match_type=payload.match_type,
            team=payload.team,
            opponent=payload.opponent
        )
    
    logger.info(f"✅ Records retrieved successfully")
    
    return types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text=f"Successfully retrieved {payload.stats_type} records."
            )],
            structuredContent=records,
        )
    )


async def _handle_get_record_filters() -> types.ServerResult:
    """Handle get-record-filters tool."""
    logger.info("📊 Handling get-record-filters request")
    
    async with StatsAPI() as api:
        filters = await api.get_record_filters()
    
    logger.info(f"✅ Record filters retrieved successfully")
    
    return types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text="Successfully retrieved available record filters and statistics types."
            )],
            structuredContent=filters,
        )
    )




# Helper functions

def _create_error_result(error_message: str) -> types.ServerResult:
    """Create an error result."""
    return types.ServerResult(
        types.CallToolResult(
            content=[types.TextContent(
                type="text",
                text=error_message
            )],
            isError=True,
        )
    )
