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
