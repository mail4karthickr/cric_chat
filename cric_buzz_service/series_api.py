"""
Series API - Handles all series-related endpoints
"""
from typing import Optional
from .base_client import BaseCricBuzzClient


class SeriesAPI(BaseCricBuzzClient):
    """API client for series-related operations"""
    
    async def get_series_details(self, series_id: int) -> dict:
        """
        Get detailed information about a series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Series details with keys:
                - matchDetails: List of matches in the series
                - appIndex: App index information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with SeriesAPI() as api:
            >>>     details = await api.get_series_details(7607)
        """
        response = await self._client.get(f'/series/v1/{series_id}')
        return self._handle_response(response, f"get_series_details_{series_id}")
    
    async def get_series_points_table(self, series_id: int) -> dict:
        """
        Get points table for a series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Points table with keys:
                - pointsTable: List of team standings
                - appIndex: App index information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        response = await self._client.get(f'/stats/v1/series/{series_id}/points-table')
        return self._handle_response(response, f"get_points_table_{series_id}")
    
    async def get_series_squads(self, series_id: int) -> dict:
        """
        Get squads for all teams in a series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Squads information with keys:
                - squads: List of team squads
                - seriesName: Name of the series
                - seriesId: ID of the series
                - appIndex: App index information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        response = await self._client.get(f'/series/v1/{series_id}/squads')
        return self._handle_response(response, f"get_squads_{series_id}")
    
    async def get_series_squad_players(self, series_id: int, squad_id: int) -> dict:
        """
        Get players for a specific squad in a series
        
        Args:
            series_id: ID of the series
            squad_id: ID of the squad
            
        Returns:
            dict: Squad players with key:
                - player: List of players
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        response = await self._client.get(f'/series/v1/{series_id}/squads/{squad_id}')
        return self._handle_response(response, f"get_series_players_{series_id}_{squad_id}")
    
    async def get_series_venues(self, series_id: int) -> dict:
        """
        Get venues for a series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Venue information with keys:
                - seriesVenue: List of venues
                - seriesId: ID of the series
                - seriesName: Name of the series
                - appIndex: App index information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        response = await self._client.get(f'/series/v1/{series_id}/venues')
        return self._handle_response(response, f"get_series_venues_{series_id}")
    
    async def get_series_stats(self, series_id: int) -> dict:
        """
        Get statistics filters for a series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Stats filters with keys:
                - types: Available stat types
                - appIndex: App index information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        response = await self._client.get(f'/stats/v1/series/{series_id}')
        return self._handle_response(response, f"get_stats_filters_{series_id}")
    
    async def get_series_news(self, series_id: int) -> dict:
        """
        Get news/stories for a series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: News stories with keys:
                - storyList: List of news articles
                - lastUpdatedTime: Last update timestamp
                - appIndex: App index information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        response = await self._client.get(f'/news/v1/series/{series_id}')
        return self._handle_response(response, f"get_series_news_{series_id}")
    
    async def get_international_series(self, series_type: Optional[str] = None) -> dict:
        """
        Get a list of international series
        
        Args:
            series_type: Optional type of the series (e.g., 'ODI', 'T20', 'Test')
            
        Returns:
            dict: List of international series with keys:
                - seriesId: ID of the series
                - seriesName: Name of the series
                - seriesType: Type of the series
                - startDate: Start date of the series
                - endDate: End date of the series
                - appIndex: App index information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
        """
        params = {'type': series_type} if series_type else {}
        response = await self._client.get('/series/v1/international', params=params)
        return self._handle_response(response, "get_international_series")
    
    async def get_series_matches(self, series_id: int) -> dict:
        """
        Get all matches for a specific series
        
        Args:
            series_id: ID of the series
            
        Returns:
            dict: Matches information with keys:
                - matchDetails: List of matches in the series
                - seriesName: Name of the series
                - seriesId: ID of the series
                - appIndex: App index information
            
        Raises:
            DataIsEmpty: When API returns empty data
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with SeriesAPI() as api:
            >>>     matches = await api.get_series_matches(3641)
        """
        response = await self._client.get(f'/series/v1/{series_id}')
        return self._handle_response(response, f"get_series_matches_{series_id}")
    
    async def get_series_stats(self, statsType: str, series_id: str):
        """
        Retrieve statistics for a specific cricket series.

        Args:
            statsType (str): The type of statistics to retrieve. This should be the value 
                from the 'value' field returned in the /series/get-stats-filter endpoint.
                Examples include 'mostRuns', 'mostWickets', etc.
            series_id (str): The unique identifier for the series. This should be the value 
                of the 'id' field returned in /series/list or /series/list-archives endpoints.

        Returns:
            dict: The response containing series statistics data.

        Raises:
            Exception: If the API request fails or returns an error response.

        Example:
            >>> stats = await get_series_stats('mostRuns', '3718')
        """
        response = await self._client.get(f'/series/v1/{series_id}')
        return self._handle_response(response, f"get_series_stats_{series_id}")


        
