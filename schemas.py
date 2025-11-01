"""
Input validation schemas for Cricket Chat MCP Server tools.
"""

from typing import Any, Dict
from pydantic import BaseModel, Field, ConfigDict


class GetPlayerInfoInput(BaseModel):
    """Schema for get-player-info tool."""
    player_id: str = Field(
        ...,
        description="The player ID to get information for (e.g., '1413' for Virat Kohli)",
    )
    model_config = ConfigDict(populate_by_name=True, extra="forbid")


class SearchPlayerInput(BaseModel):
    """Schema for search-player tool."""
    player_name: str = Field(
        ...,
        description="The name or partial name of the player to search for",
    )
    model_config = ConfigDict(populate_by_name=True, extra="forbid")


class GetPlayerCareerInput(BaseModel):
    """Schema for get-player-career tool."""
    player_id: str = Field(
        ...,
        description="The player ID to get career statistics for",
    )
    model_config = ConfigDict(populate_by_name=True, extra="forbid")


class GetPlayerBowlingInput(BaseModel):
    """Schema for get-player-bowling tool."""
    player_id: str = Field(
        ...,
        description="The player ID to get bowling statistics for",
    )
    model_config = ConfigDict(populate_by_name=True, extra="forbid")


class GetPlayerBattingInput(BaseModel):
    """Schema for get-player-batting tool."""
    player_id: str = Field(
        ...,
        description="The player ID to get batting statistics for",
    )
    model_config = ConfigDict(populate_by_name=True, extra="forbid")


class GetPlayerNewsInput(BaseModel):
    """Schema for get-player-news tool."""
    player_id: str = Field(
        ...,
        description="The player ID to get news articles for",
    )
    model_config = ConfigDict(populate_by_name=True, extra="forbid")


# Generate JSON schemas for all input models
def get_schemas() -> Dict[str, Dict[str, Any]]:
    """Get all tool input schemas as JSON."""
    return {
        "get-player-info": GetPlayerInfoInput.model_json_schema(),
        "search-player": SearchPlayerInput.model_json_schema(),
        "get-player-career": GetPlayerCareerInput.model_json_schema(),
        "get-player-bowling": GetPlayerBowlingInput.model_json_schema(),
        "get-player-batting": GetPlayerBattingInput.model_json_schema(),
        "get-player-news": GetPlayerNewsInput.model_json_schema(),
    }
