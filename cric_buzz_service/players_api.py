"""
Players API - Handles all player-related endpoints
"""
from .base_client import BaseCricBuzzClient


class PlayersAPI(BaseCricBuzzClient):
    """API client for player-related operations"""
    
    async def get_player_info(self, player_id: str) -> dict:
        """
        Get detailed information about a player
        
        Args:
            player_id: ID of the player
            
        Returns:
            dict: Player information with keys:
                - id: Player ID
                - name: Player full name
                - nickName: Player nickname
                - bat: Batting statistics
                - bowl: Bowling statistics
                - And other player details
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with PlayersAPI() as api:
            >>>     player = await api.get_player_info("1413")  # Virat Kohli
        """
        response = await self._client.get(f'/stats/v1/player/{player_id}')
        return self._handle_response(response, f"get_player_info_{player_id}")
    
    async def get_player_stats(self, player_id: str, stat_type: str = "batting") -> dict:
        """
        Get specific statistics for a player
        
        Args:
            player_id: ID of the player
            stat_type: Type of stats ("batting", "bowling", "fielding")
            
        Returns:
            dict: Player statistics
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        response = await self._client.get(f'/stats/v1/player/{player_id}/{stat_type}')
        return self._handle_response(response, f"get_player_stats_{player_id}_{stat_type}")
    
    async def list_trending(self) -> dict:
        """
        Get list of trending players
        
        Returns:
            dict: Trending players data with keys:
                - player: List of trending players
                - appIndex: App index information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with PlayersAPI() as api:
            >>>     trending = await api.list_trending()
        """
        response = await self._client.get('/stats/v1/player/trending')
        return self._handle_response(response, "list_trending_players")
    
    async def get_career(self, player_id: str) -> dict:
        """
        Retrieve the career statistics for a specific player.

        This method fetches comprehensive career data for a player identified by their unique ID,
        including their performance statistics across different formats and matches.

        Args:
            player_id (str): The unique identifier of the player whose career statistics are to be retrieved.

        Returns:
            dict: A dictionary containing the player's career statistics and performance data.
                  The exact structure depends on the API response format.

        Raises:
            Exception: May raise exceptions related to network issues or API errors,
                      handled by the _handle_response method.

        Example:
            >>> career_stats = await get_career("player123")
            >>> print(career_stats)
        """
        response = await self._client.get(f'/stats/v1/player/{player_id}/career')
        return self._handle_response(response, "get_player_career")
    
    async def get_news(self, player_id: str) -> dict:
        """
        Retrieve news articles related to a specific player.

        Args:
            player_id (str): The unique identifier of the player for whom to fetch news.

        Returns:
            dict: A dictionary containing news articles and related information for the player.
                  The exact structure depends on the API response format.

        Raises:
            Exception: May raise exceptions during HTTP request or response handling.
                       Specific exceptions depend on the _handle_response implementation.
        """
        response = await self._client.get(f'/news/v1/player/{player_id}')
        return self._handle_response(response, "get_player_news")
    
    async def get_bowling(self, player_id: str) -> dict:
        """
        Retrieve bowling statistics for a specific player.

        Args:
            player_id (str): The unique identifier of the player whose bowling statistics are to be retrieved.

        Returns:
            dict: A dictionary containing the player's bowling statistics, including metrics such as
                  wickets taken, bowling average, economy rate, and other relevant bowling performance data.

        Raises:
            Exception: May raise exceptions related to API communication errors or invalid player_id,
                      as handled by _handle_response method.
        """
        response = await self._client.get(f'/stats/v1/player/{player_id}/bowling')
        return self._handle_response(response, "get_player_bowling")
    
    async def get_batting(self, player_id: str) -> dict:
        """
        Retrieve batting statistics for a specific player.

        Args:
            player_id (str): The unique identifier of the player whose batting statistics are to be retrieved.

        Returns:
            dict: A dictionary containing the player's batting statistics including metrics such as 
                  runs, averages, strike rates, centuries, half-centuries, and other batting performance data.

        Raises:
            May raise exceptions from the HTTP client or response handler if the request fails 
            or if the response cannot be processed properly.
        """
        response = await self._client.get(f'/stats/v1/player/{player_id}/batting')
        return self._handle_response(response, "get_player_batting")
    
    async def get_info(self, player_id: str) -> dict:
        """
        Retrieves detailed information for a specific player.

        Args:
            player_id (str): The unique identifier of the player.

        Returns:
            dict: A dictionary containing the player's information including stats,
                  biography, and other relevant details.

        Raises:
            Exception: If the API request fails or returns an error, as handled by
                      _handle_response method.
        """
        response = await self._client.get(f'/stats/v1/player/{player_id}')
        return self._handle_response(response, "get_player_info")
    
    async def search_player(self, player_name: str) -> dict:
        """
        Search for a player by name using the CricBuzz API.

        This method performs an asynchronous search for cricket players matching the provided name.
        It queries the CricBuzz stats API endpoint and returns the search results after handling
        the response appropriately.

        Args:
            player_name (str): The name or partial name of the player to search for.
                              This will be URL-encoded as the 'plrN' query parameter.

        Returns:
            dict: A dictionary containing the search results from the API response.
                  The exact structure depends on the API's response format and the
                  _handle_response method's processing.

        Raises:
            May raise exceptions from the underlying HTTP client or _handle_response method,
            such as network errors, API errors, or response parsing errors.

        Example:
            >>> results = await search_player("Virat Kohli")
            >>> print(results)
        """
        response = await self._client.get(f'/stats/v1/player/search?plrN={player_name}')
        return self._handle_response(response, "search_player")
    

        
