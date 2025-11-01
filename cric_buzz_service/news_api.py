"""
News API - Handles all news-related endpoints
"""
from typing import Optional
from enum import Enum
from .base_client import BaseCricBuzzClient


class NewsIndexType(Enum):
    """Types of news indexes that can be queried"""
    INDEX = "index"
    PREMIUM_INDEX = "premiumIndex"


class NewsAPI(BaseCricBuzzClient):
    """API client for news-related operations"""
    
    async def get_news_index(self, index_type: NewsIndexType = NewsIndexType.INDEX) -> dict:
        """
        Get news index based on type (index or premiumIndex)
        
        Args:
            index_type: Type of news index to retrieve (default: index)
            
        Returns:
            dict: News index data with news stories and metadata
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with NewsAPI() as api:
            >>>     news = await api.get_news_index(NewsIndexType.INDEX)
            >>>     premium_news = await api.get_news_index(NewsIndexType.PREMIUM_INDEX)
        """
        response = await self._client.get(f'/news/v1/{index_type.value}')
        return self._handle_response(response, f"get_news_{index_type.value}")
    
    async def get_news_detail(self, news_id: int) -> dict:
        """
        Get detailed information about a specific news story
        
        Args:
            news_id: ID of the news story (from story/id field in news list endpoints)
            
        Returns:
            dict: Detailed news story data with content, images, and metadata
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with NewsAPI() as api:
            >>>     news_detail = await api.get_news_detail(122025)
        """
        response = await self._client.get(f'/news/v1/detail/{news_id}')
        return self._handle_response(response, f"get_news_detail_{news_id}")
    
    async def get_news_categories(self) -> dict:
        """
        Get list of available news categories
        
        Returns:
            dict: News categories data with available categories and metadata
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with NewsAPI() as api:
            >>>     categories = await api.get_news_categories()
        """
        response = await self._client.get('/news/v1/cat')
        return self._handle_response(response, "get_news_categories")
    
    async def get_news_by_category(self, category_id: int) -> dict:
        """
        Get news filtered by category
        
        Args:
            category_id: ID of the category (from id field in get_news_categories response)
            
        Returns:
            dict: News stories for the specified category with metadata
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with NewsAPI() as api:
            >>>     category_news = await api.get_news_by_category(5)
        """
        response = await self._client.get(f'/news/v1/cat/{category_id}')
        return self._handle_response(response, f"get_news_by_category_{category_id}")
    
    async def get_news_topics(self) -> dict:
        """
        Get list of available news topics
        
        Returns:
            dict: News topics data with available topics and metadata
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with NewsAPI() as api:
            >>>     topics = await api.get_news_topics()
        """
        response = await self._client.get('/news/v1/topics')
        return self._handle_response(response, "get_news_topics")
    
    async def get_news_by_topic(self, topic_id: int) -> dict:
        """
        Get news filtered by topic
        
        Args:
            topic_id: ID of the topic (from id field in get_news_topics response)
            
        Returns:
            dict: News stories for the specified topic with metadata
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with NewsAPI() as api:
            >>>     topic_news = await api.get_news_by_topic(349)
        """
        response = await self._client.get(f'/news/v1/topics/{topic_id}')
        return self._handle_response(response, f"get_news_by_topic_{topic_id}")
