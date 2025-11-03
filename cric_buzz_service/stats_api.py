"""
Stats API - Handles all statistics and rankings related endpoints
"""
from typing import Optional, Literal
import httpx
from enum import Enum
from .base_client import BaseCricBuzzClient


class FormatType(Enum):
    """Cricket format types"""
    TEST = "test"
    ODI = "odi"
    T20 = "t20"


class RankingCategory(Enum):
    """Ranking categories"""
    BATSMEN = "batsmen"
    BOWLERS = "bowlers"
    ALLROUNDERS = "allrounders"
    TEAMS = "teams"


class MatchType(Enum):
    """Match types for ICC standings"""
    WORLD_TEST_CHAMPIONSHIP = 1
    WORLD_CUP_SUPER_LEAGUE = 2


class StatsAPI(BaseCricBuzzClient):
    """API client for statistics and rankings operations"""
    
    async def get_rankings(
        self, 
        category: RankingCategory,
        format_type: FormatType,
        is_women: Optional[bool] = False
    ) -> dict:
        """
        Get ICC rankings for batsmen, bowlers, allrounders, or teams
        
        Args:
            category: Ranking category (batsmen, bowlers, allrounders, teams)
            format_type: Cricket format (test, odi, t20)
                Note: If is_women is True, odi is not available
            is_women: Set to True to get rankings for women (default: False)
            
        Returns:
            dict: Rankings data containing player/team rankings
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            ValueError: When invalid parameter combination is provided
            
        Example:
            >>> async with StatsAPI() as api:
            >>>     # Get men's test batsmen rankings
            >>>     rankings = await api.get_rankings(
            >>>         category=RankingCategory.BATSMEN,
            >>>         format_type=FormatType.TEST
            >>>     )
            >>>     
            >>>     # Get women's T20 bowlers rankings
            >>>     rankings = await api.get_rankings(
            >>>         category=RankingCategory.BOWLERS,
            >>>         format_type=FormatType.T20,
            >>>         is_women=True
            >>>     )
        """
        # Validate parameters
        if is_women and format_type == FormatType.ODI:
            raise ValueError("ODI format is not available for women's rankings")
        
        # Build query parameters
        params = {
            "formatType": format_type.value
        }
        
        if is_women:
            params["isWomen"] = "1"
        
        # Make the API request
        response = await self._client.get(
            f'/stats/v1/rankings/{category.value}',
            params=params
        )
        
        return self._handle_response(response, f"get_{category.value}_rankings")
    
    async def get_record_filters(self) -> dict:
        """
        Get top stats and record filters from Cricbuzz
        
        Returns:
            dict: Top statistics and available record filters
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with StatsAPI() as api:
            >>>     filters = await api.get_record_filters()
            >>>     print(filters)
        """
        # Make the API request
        response = await self._client.get('/stats/v1/topstats')
        
        return self._handle_response(response, "get_record_filters")
    
    async def get_records(
        self,
        stats_type: str,
        year: Optional[str] = None,
        match_type: Optional[int] = None,
        team: Optional[int] = None,
        opponent: Optional[int] = None
    ) -> dict:
        """
        Get cricket records and statistics based on various filters
        
        Args:
            stats_type: Type of statistic (e.g., 'mostRuns', 'mostWickets', 'mostSixes', etc.)
            year: Year to filter records (optional)
            match_type: Match type ID to filter records (optional, default: 0)
            team: Team ID to filter records (optional, default: 0)
            opponent: Opponent team ID to filter records (optional, default: 0)
            
        Returns:
            dict: Records data containing player statistics
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with StatsAPI() as api:
            >>>     # Get most runs records
            >>>     records = await api.get_records(stats_type="mostRuns")
            >>>     
            >>>     # Get most wickets for a specific year and team
            >>>     records = await api.get_records(
            >>>         stats_type="mostWickets",
            >>>         year="2023",
            >>>         team=1
            >>>     )
        """
        # Build query parameters
        params = {
            "statsType": stats_type
        }
        
        # Add optional parameters if provided
        if year is not None:
            params["year"] = year
        if match_type is not None:
            params["matchType"] = str(match_type)
        if team is not None:
            params["team"] = str(team)
        if opponent is not None:
            params["opponent"] = str(opponent)
        
        # Make the API request - all parameters are query params, no path parameter
        response = await self._client.get(
            '/stats/v1/topstats',
            params=params
        )
        
        return self._handle_response(response, f"get_records_{stats_type}")
    
    async def get_icc_standings(
        self,
        match_type: MatchType,
        is_women: Optional[bool] = False
    ) -> dict:
        """
        Get ICC standings for World Test Championship or World Cup Super League
        
        Args:
            match_type: Match type (World Test Championship, World Cup Super League)
            is_women: Set to True to get standings for women's tournaments (default: False)
            
        Returns:
            dict: Standings data containing team positions and points
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            ValueError: When invalid parameter combination is provided
            
        Example:
            >>> async with StatsAPI() as api:
            >>>     # Get standings for World Test Championship
            >>>     standings = await api.get_icc_standings(
            >>>         match_type=MatchType.WORLD_TEST_CHAMPIONSHIP
            >>>     )
            >>>     
            >>>     # Get standings for Women's World Cup Super League
            >>>     standings = await api.get_icc_standings(
            >>>         match_type=MatchType.WORLD_CUP_SUPER_LEAGUE,
            >>>         is_women=True
            >>>     )
        """
        # Build query parameters
        params = {}
        
        if is_women:
            params["isWomen"] = "1"
        
        # Make the API request
        response = await self._client.get(
            f'/stats/v1/iccstanding/team/matchtype/{match_type.value}',
            params=params
        )
        
        return self._handle_response(response, f"get_icc_standings_{match_type.name.lower()}")
