"""
Input validation schemas for Cricket Chat MCP Server tools.
"""

from typing import Any, Dict, Literal, Optional
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


class GetRankingsInput(BaseModel):
    """Schema for get-rankings tool."""
    category: Literal["batsmen", "bowlers", "allrounders", "teams"] = Field(
        ...,
        description="Ranking category (batsmen, bowlers, allrounders, or teams)",
    )
    format_type: Literal["test", "odi", "t20"] = Field(
        ...,
        description="Cricket format (test, odi, or t20). Note: ODI is not available for women's rankings.",
    )
    is_women: bool = Field(
        default=False,
        description="Set to true for women's rankings, false for men's rankings (default: false)",
    )
    model_config = ConfigDict(populate_by_name=True, extra="forbid")


class GetRecordsInput(BaseModel):
    """Schema for get-records tool."""
    stats_type: str = Field(
        ...,
        description=(
            "Type of statistic to retrieve. Must be a valid stats_type returned by the get-record-filters tool. "
            "Valid values include:\n"
            "Batting: 'mostRuns', 'highestScore', 'highestAvg', 'highestSr', 'mostHundreds', 'mostFifties', "
            "'mostFours', 'mostSixes', 'mostNineties'\n"
            "Bowling: 'mostWickets', 'lowestAvg', 'bestBowlingInnings', 'mostFiveWickets', 'lowestEcon', 'lowestSr'\n"
            "Use get-record-filters to get the complete list of available stats types with their headers and categories."
        ),
    )
    year: Optional[str] = Field(
        default=None,
        description="Year to filter records (optional, e.g., '2023')",
    )
    match_type: Optional[int] = Field(
        default=None,
        description="Match type ID to filter records (optional, default: 0)",
    )
    team: Optional[int] = Field(
        default=None,
        description="Team ID to filter records (optional, default: 0)",
    )
    opponent: Optional[int] = Field(
        default=None,
        description="Opponent team ID to filter records (optional, default: 0)",
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
        "get-trending-players": {
            "type": "object",
            "properties": {},
            "required": []
        },
        "get-rankings": GetRankingsInput.model_json_schema(),
        "get-records": GetRecordsInput.model_json_schema(),
        "get-record-filters": {
            "type": "object",
            "properties": {},
            "required": []
        },
    }

