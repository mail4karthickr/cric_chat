"""
Base client for CricBuzz API
Handles authentication and common HTTP operations
"""
from typing import Optional
import httpx
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


class CricBuzzAPIError(Exception):
    """Base exception for CricBuzz API errors"""
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)


class BaseCricBuzzClient:
    """Base client for making authenticated requests to CricBuzz API"""
    
    def __init__(self, base_url: Optional[str] = None, client: Optional[httpx.AsyncClient] = None):
        """
        Initialize base client
        
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
                timeout=httpx.Timeout(10.0, connect=5.0)
            )
            self._owns_client = True
        else:
            self._client = client
            self._owns_client = False
    
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
            CricBuzzAPIError: For other errors
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
                raise CricBuzzAPIError(f'Error parsing response for {operation}: {e}')
        
        # Handle 204 No Content as empty data
        if response.status_code == 204:
            raise DataIsEmpty(f'No data available for {operation}')
        
        # Handle other error codes
        raise CricBuzzAPIError(f'HTTP {response.status_code}: Error during {operation}')
    
    async def close(self):
        """Close the HTTP client if we own it"""
        if self._owns_client:
            await self._client.aclose()
    
    async def __aenter__(self):
        """Async context manager entry"""
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        await self.close()
