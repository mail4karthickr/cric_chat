from typing import Optional
import httpx
from enum import Enum
import os


# Custom Exceptions
class DataIsEmpty(Exception):
    """Raised when API returns empty data"""
    pass


class APINotSubscribed(Exception):
    """Raised when API key is not subscribed to the service"""
    def __init__(self, message: str = "You are not subscribed to this API"):
        self.message = message
        super().__init__(self.message)


class RateLimitExceeded(Exception):
    """Raised when API rate limit is exceeded"""
    def __init__(self, message: str = "Too many requests - rate limit exceeded"):
        self.message = message
        super().__init__(self.message)


class ErrorGettingMatchesList(Exception):
    """Raised when there's an error getting matches list"""
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)


class ErrorGettingImage(Exception):
    """Raised when there's an error getting image"""
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)


# Enums
class ImageResolution(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class ImageType(Enum):
    PORTRAIT = "portrait"
    LANDSCAPE = "landscape"


class MatchType(Enum):
    LIVE = "live"
    RECENT = "recent"
    UPCOMING = "upcoming"


# FIXME - Refactor API call functions.
class CricBuzzService:
    def __init__(self, base_url: Optional[str] = None, client: Optional[httpx.AsyncClient] = None):
        """
        Initialize CricBuzz Service
        
        Args:
            base_url: Base URL for the API (defaults to env variable)
            client: Optional httpx.AsyncClient instance
        """
        self._base_url = base_url or os.getenv('CRICBUZZ_BASE_URL', 'https://cricbuzz-cricket.p.rapidapi.com')
        
        if client is None:
            # Get API credentials from environment variables
            api_key = os.getenv('RAPIDAPI_KEY')
            if not api_key:
                raise ValueError(
                    "RAPIDAPI_KEY environment variable is not set. "
                    "Please create a .env file with your RapidAPI key. "
                    "See .env.example for reference."
                )
            api_host = os.getenv('RAPIDAPI_HOST', 'cricbuzz-cricket.p.rapidapi.com')
            
            # Create client with RapidAPI headers and timeouts
            headers = {
                "X-RapidAPI-Key": api_key,
                "X-RapidAPI-Host": api_host
            }
            self._client = httpx.AsyncClient(
                base_url=self._base_url,
                headers=headers,
                timeout=httpx.Timeout(5.0, connect=5.0)
            )
        else:
            self._client = client
    
    def _handle_response(self, response: httpx.Response, operation: str = "request") -> dict:
        """
        Handle API response and raise appropriate exceptions
        
        Args:
            response: HTTP response object
            operation: Description of the operation for error messages
            
        Returns:
            dict: Parsed JSON response
            
        Raises:
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            DataIsEmpty: When response is empty
            ErrorGettingMatchesList: For other errors
        """
        # Check for subscription issues
        if response.status_code == 403:
            try:
                error_data = response.json()
                raise APINotSubscribed(error_data.get('message', 'API access forbidden'))
            except (ValueError, KeyError):
                raise APINotSubscribed('API access forbidden - check your subscription')
        
        # Check for rate limiting
        if response.status_code == 429:
            try:
                error_data = response.json()
                raise RateLimitExceeded(error_data.get('message', 'Rate limit exceeded'))
            except (ValueError, KeyError):
                raise RateLimitExceeded('Rate limit exceeded')
        
        # Handle successful responses
        if response.status_code == 200:
            try:
                data = response.json()
                if not data:
                    raise DataIsEmpty()
                return data
            except ValueError as e:
                raise ErrorGettingMatchesList(f'Error parsing response for {operation}: {e}')
        
        # Handle other error codes
        raise ErrorGettingMatchesList(f'HTTP {response.status_code}: Error during {operation}')
    
    async def get_matches(self, match_type: MatchType) -> dict:
        """
        Get matches based on type (live, recent, upcoming)
        
        Args:
            match_type: Type of matches to retrieve
            
        Returns:
            dict: Match type list data
            
        Raises:
            DataIsEmpty: When API returns empty data
            ErrorGettingMatchesList: When there's an error getting matches
        """
        response = await self._client.get(f'/matches/v1/{match_type.value}')
        return self._handle_response(response, "getting matches")
    
    async def get_matches_for(self, series_id: int) -> dict:
        """
        Get match details for a specific series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Match details wrapper data
            
        Raises:
            DataIsEmpty: When API returns empty data
            ErrorGettingMatchesList: When there's an error getting matches
        """
        response = await self._client.get(f'/series/v1/{series_id}')
        return self._handle_response(response, "getting matches for series")
    
    async def get_image(
        self, 
        image_id: str, 
        resolution: Optional[ImageResolution] = None, 
        image_type: Optional[ImageType] = None
    ) -> bytes:
        """
        Get image bytes
        
        Args:
            image_id: ID of the image
            resolution: Optional image resolution
            image_type: Optional image type
            
        Returns:
            bytes: Image data
            
        Raises:
            ErrorGettingImage: When there's an error getting image
        """
        modified_image_id = f"c{image_id}"
        query_params = {}
        
        if resolution is not None:
            query_params['d'] = resolution.value
        
        if image_type is not None:
            query_params['p'] = image_type.value
        
        response = await self._client.get(
            f'/img/v1/i1/{modified_image_id}/i.jpg',
            params=query_params
        )
        
        if response.status_code == 200:
            return response.content
        else:
            raise ErrorGettingImage('Error getting image')
    
    async def get_points_table(self, series_id: int) -> dict:
        """
        Get points table for a series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Points table data
            
        Raises:
            DataIsEmpty: When API returns empty data
            ErrorGettingMatchesList: When there's an error getting data
        """
        response = await self._client.get(f'/stats/v1/series/{series_id}/points-table')
        return self._handle_response(response, "getting points table")
    
    async def get_squads(self, series_id: int) -> dict:
        """
        Get squads for a series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Squads wrapper data
            
        Raises:
            DataIsEmpty: When API returns empty data
            ErrorGettingMatchesList: When there's an error getting data
        """
        response = await self._client.get(f'/series/v1/{series_id}/squads')
        return self._handle_response(response, "getting squads")
    
    async def get_stats_filters(self, series_id: int) -> dict:
        """
        Get stats filters for a series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Stats filters data
            
        Raises:
            DataIsEmpty: When API returns empty data
            ErrorGettingMatchesList: When there's an error getting data
        """
        response = await self._client.get(f'/stats/v1/series/{series_id}')
        return self._handle_response(response, "getting stats filters")
    
    async def get_story_list(self, series_id: int) -> dict:
        """
        Get story list for a series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Story list data
            
        Raises:
            DataIsEmpty: When API returns empty data
            ErrorGettingMatchesList: When there's an error getting data
        """
        response = await self._client.get(f'/news/v1/series/{series_id}')
        return self._handle_response(response, "getting story list")
    
    async def get_series_venues(self, series_id: int) -> dict:
        """
        Get venues for a series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Series venue data
            
        Raises:
            DataIsEmpty: When API returns empty data
            ErrorGettingMatchesList: When there's an error getting data
        """
        response = await self._client.get(f'/series/v1/{series_id}/venues')
        return self._handle_response(response, "getting series venues")
    
    async def get_series_players(self, series_id: int, squad_id: int) -> dict:
        """
        Get players for a specific squad in a series
        
        Args:
            series_id: ID of the series
            squad_id: ID of the squad
            
        Returns:
            dict: Series players data
            
        Raises:
            DataIsEmpty: When API returns empty data
            ErrorGettingMatchesList: When there's an error getting data
        """
        response = await self._client.get(f'/series/v1/{series_id}/squads/{squad_id}')
        return self._handle_response(response, "getting series players")
    
    async def get_player_info(self, player_id: str) -> dict:
        """
        Get player information
        
        Args:
            player_id: ID of the player
            
        Returns:
            dict: Player info data
            
        Raises:
            DataIsEmpty: When API returns empty data
            ErrorGettingMatchesList: When there's an error getting data
        """
        response = await self._client.get(f'/stats/v1/player/{player_id}')
        return self._handle_response(response, "getting player info")
    
    async def close(self):
        """Close the HTTP client"""
        await self._client.aclose()
    
    async def __aenter__(self):
        """Async context manager entry"""
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        await self.close()
