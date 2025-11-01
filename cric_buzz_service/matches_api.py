"""
Matches API - Handles all match-related endpoints
"""
from typing import Optional
import httpx
from enum import Enum
from .base_client import BaseCricBuzzClient


class MatchType(Enum):
    """Types of matches that can be queried"""
    LIVE = "live"
    RECENT = "recent"
    UPCOMING = "upcoming"


class MatchesAPI(BaseCricBuzzClient):
    """API client for match-related operations"""
    
    async def get_matches(self, match_type: MatchType) -> dict:
        """
        Get matches based on type (live, recent, upcoming)
        
        Args:
            match_type: Type of matches to retrieve
            
        Returns:
            dict: Match type list data with keys:
                - typeMatches: List of matches
                - filters: Available filters
                - appIndex: App index information
                - responseLastUpdated: Last update timestamp
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with MatchesAPI() as api:
            >>>     matches = await api.get_matches(MatchType.LIVE)
        """
        response = await self._client.get(f'/matches/v1/{match_type.value}')
        return self._handle_response(response, f"get_{match_type.value}_matches")
    
    async def get_match_info(self, match_id: int) -> dict:
        """
        Get match center information (detailed match info)
        
        Args:
            match_id: ID of the match
            
        Returns:
            dict: Match center information including:
                - Match details
                - Team information
                - Venue details
                - Match state and status
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with MatchesAPI() as api:
            >>>     info = await api.get_match_info(41881)
        """
        response = await self._client.get(f'/mcenter/v1/{match_id}')
        return self._handle_response(response, f"get_match_info_{match_id}")
    
    async def get_match_team(self, match_id: int, team_id: int) -> dict:
        """
        Get team information for a specific match
        
        Args:
            match_id: ID of the match
            team_id: ID of the team
            
        Returns:
            dict: Team information including:
                - Playing XI
                - Bench players
                - Player details
                - Team statistics
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with MatchesAPI() as api:
            >>>     team_info = await api.get_match_team(35878, 9)
        """
        response = await self._client.get(f'/mcenter/v1/{match_id}/team/{team_id}')
        return self._handle_response(response, f"get_match_team_{match_id}_{team_id}")
    
    async def get_match_detail(self, match_id: int) -> dict:
        """
        Get detailed information about a specific match
        
        Args:
            match_id: ID of the match
            
        Returns:
            dict: Match details
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        response = await self._client.get(f'/matches/v1/{match_id}')
        return self._handle_response(response, f"get_match_detail_{match_id}")
    
    async def get_match_scorecard(self, match_id: int) -> dict:
        """
        Get scorecard for a specific match
        
        Args:
            match_id: ID of the match
            
        Returns:
            dict: Match scorecard
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        response = await self._client.get(f'/matches/v1/{match_id}/scorecard')
        return self._handle_response(response, f"get_match_scorecard_{match_id}")
    
    async def get_match_scorecard_detailed(
        self, 
        match_id: int,
        match_id_param: Optional[int] = None
    ) -> dict:
        """
        Get detailed scorecard for a specific match (mcenter endpoint)
        
        Args:
            match_id: ID of the match (used in URL path)
            match_id_param: Optional match ID parameter (matchId parameter). 
                          If not provided, defaults to the path match_id.
            
        Returns:
            dict: Detailed match scorecard with innings information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with MatchesAPI() as api:
            >>>     # Get scorecard (matchId will default to path match_id)
            >>>     scorecard = await api.get_match_scorecard_detailed(40381)
            >>>     
            >>>     # Get scorecard with explicit matchId parameter
            >>>     scorecard = await api.get_match_scorecard_detailed(40381, match_id_param=40381)
        """
        # Build query parameters
        params = {}
        # Use match_id_param if provided, otherwise use the path match_id
        params['matchId'] = match_id_param if match_id_param is not None else match_id
        
        response = await self._client.get(
            f'/mcenter/v1/{match_id}/scard',
            params=params
        )
        return self._handle_response(response, f"get_match_scorecard_detailed_{match_id}")
    
    async def get_match_commentary(self, match_id: int) -> dict:
        """
        Get commentary for a specific match
        
        Args:
            match_id: ID of the match
            
        Returns:
            dict: Match commentary
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        response = await self._client.get(f'/matches/v1/{match_id}/commentary')
        return self._handle_response(response, f"get_match_commentary_{match_id}")
    
    async def get_match_overs(self, match_id: int) -> dict:
        """
        Get over-by-over data for a specific match
        
        Args:
            match_id: ID of the match
            
        Returns:
            dict: Match overs data
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        response = await self._client.get(f'/matches/v1/{match_id}/overs')
        return self._handle_response(response, f"get_match_overs_{match_id}")
    
    async def get_match_commentary_detailed(
        self, 
        match_id: int,
        innings_id: Optional[int] = None,
        timestamp: Optional[int] = None
    ) -> dict:
        """
        Get detailed commentary for a specific match with optional filters
        
        Args:
            match_id: ID of the match
            innings_id: Optional innings ID to filter commentary
            timestamp: Optional timestamp (tms) for pagination
            
        Returns:
            dict: Match commentary with detailed ball-by-ball information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with MatchesAPI() as api:
            >>>     # Get all commentary
            >>>     comm = await api.get_match_commentary_detailed(41881)
            >>>     
            >>>     # Get commentary for specific innings
            >>>     comm = await api.get_match_commentary_detailed(41881, innings_id=1)
            >>>     
            >>>     # Get commentary with pagination
            >>>     comm = await api.get_match_commentary_detailed(41881, timestamp=1234567890)
        """
        # Build query parameters
        params = {}
        if innings_id is not None:
            params['inningsId'] = innings_id
        if timestamp is not None:
            params['tms'] = timestamp
        
        response = await self._client.get(
            f'/mcenter/v1/{match_id}/comm',
            params=params if params else None
        )
        return self._handle_response(response, f"get_match_commentary_detailed_{match_id}")
    
    async def get_match_commentary_v2(
        self, 
        match_id: int,
        innings_id: Optional[int] = None,
        timestamp: Optional[int] = None
    ) -> dict:
        """
        Get commentary for a specific match (v2 endpoint - Hindi commentary)
        
        Args:
            match_id: ID of the match
            innings_id: Optional innings ID to filter commentary
            timestamp: Optional timestamp (tms) for pagination
            
        Returns:
            dict: Match commentary v2 with detailed ball-by-ball information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with MatchesAPI() as api:
            >>>     # Get all commentary (v2)
            >>>     comm = await api.get_match_commentary_v2(41881)
            >>>     
            >>>     # Get commentary for specific innings
            >>>     comm = await api.get_match_commentary_v2(41881, innings_id=1)
            >>>     
            >>>     # Get commentary with pagination
            >>>     comm = await api.get_match_commentary_v2(41881, timestamp=1234567890)
        """
        # Build query parameters
        params = {}
        if innings_id is not None:
            params['inningsId'] = innings_id
        if timestamp is not None:
            params['tms'] = timestamp
        
        response = await self._client.get(
            f'/mcenter/v1/{match_id}/hcomm',
            params=params if params else None
        )
        return self._handle_response(response, f"get_match_commentary_v2_{match_id}")
    
    async def get_match_overs_detailed(
        self, 
        match_id: int,
        innings_id: Optional[int] = None,
        timestamp: Optional[int] = None,
        match_id_param: Optional[int] = None
    ) -> dict:
        """
        Get detailed scorecard/overs data for a specific match with optional filters
        
        Args:
            match_id: ID of the match (used in URL path)
            innings_id: Optional innings ID to filter data (iid parameter)
            timestamp: Optional timestamp (tms) for pagination
            match_id_param: Optional match ID parameter (matchId parameter)
            
        Returns:
            dict: Match scorecard with detailed overs and innings information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with MatchesAPI() as api:
            >>>     # Get all scorecard data
            >>>     overs = await api.get_match_overs_detailed(40381)
            >>>     
            >>>     # Get scorecard for specific innings
            >>>     overs = await api.get_match_overs_detailed(40381, innings_id=1)
            >>>     
            >>>     # Get scorecard with pagination
            >>>     overs = await api.get_match_overs_detailed(40381, timestamp=1234567890)
            >>>     
            >>>     # Get scorecard with all parameters
            >>>     overs = await api.get_match_overs_detailed(40381, innings_id=1, timestamp=1234567890, match_id_param=40381)
        """
        # Build query parameters
        params = {}
        if innings_id is not None:
            params['iid'] = innings_id
        if timestamp is not None:
            params['tms'] = timestamp
        if match_id_param is not None:
            params['matchId'] = match_id_param
        
        response = await self._client.get(
            f'/mcenter/v1/{match_id}/scard',
            params=params if params else None
        )
        return self._handle_response(response, f"get_match_overs_detailed_{match_id}")
