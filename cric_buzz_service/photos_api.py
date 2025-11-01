"""
Photos API - Handles all photo-related endpoints
"""
from typing import Optional
from .base_client import BaseCricBuzzClient


class PhotosAPI(BaseCricBuzzClient):
    """API client for photo-related operations"""
    
    async def get_photos_index(self) -> dict:
        """
        Get photos index with latest photo galleries
        
        Returns:
            dict: Photos index data with photo galleries and metadata
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with PhotosAPI() as api:
            >>>     photos = await api.get_photos_index()
        """
        response = await self._client.get('/photos/v1/index')
        return self._handle_response(response, "get_photos_index")
    
    async def get_photo_detail(self, photo_id: int) -> dict:
        """
        Get detailed information about a specific photo gallery
        
        Args:
            photo_id: ID of the photo gallery
            
        Returns:
            dict: Detailed photo gallery data with images and metadata
            
        Raises:
            DataIsEmpty: When API returns empty data
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with PhotosAPI() as api:
            >>>     photo_detail = await api.get_photo_detail(5374)
        """
        response = await self._client.get(f'/photos/v1/detail/{photo_id}')
        return self._handle_response(response, f"get_photo_detail_{photo_id}")
    
    async def get_image(
        self, 
        image_id: str, 
        size: Optional[str] = None, 
        quality: Optional[str] = None
    ) -> bytes:
        """
        Get image with specified size and quality
        
        Note: This endpoint returns raw image bytes (JPEG), not JSON data.
        
        Args:
            image_id: ID of the image (with 'c' prefix, e.g., 'c231889')
            size: Image size - one of: 'de', 'det', 'gthumb', 'thumb' (optional)
            quality: Image quality - 'high' or 'low' (optional)
            
        Returns:
            bytes: Raw image data (JPEG format)
            
        Raises:
            APINotSubscribed: When API key is not subscribed
            RateLimitExceeded: When rate limit is exceeded
            CricBuzzAPIError: For other errors
            
        Example:
            >>> async with PhotosAPI() as api:
            >>>     # Get default image
            >>>     image_data = await api.get_image('c231889')
            >>>     # Save to file
            >>>     with open('image.jpg', 'wb') as f:
            >>>         f.write(image_data)
            >>>     
            >>>     # Get thumbnail with high quality
            >>>     thumb = await api.get_image('c231889', size='thumb', quality='high')
        """
        # Build query parameters
        params = {}
        if size:
            params['p'] = size
        if quality:
            params['d'] = quality
        
        # Build URL with query string
        url = f'/img/v1/i1/{image_id}/i.jpg'
        if params:
            query_string = '&'.join([f'{k}={v}' for k, v in params.items()])
            url = f'{url}?{query_string}'
        
        response = await self._client.get(url)
        
        # Check for API errors in headers or status code
        if response.status_code == 403:
            from .base_client import APINotSubscribed
            raise APINotSubscribed()
        elif response.status_code == 429:
            from .base_client import RateLimitExceeded
            raise RateLimitExceeded()
        elif response.status_code >= 400:
            from .base_client import CricBuzzAPIError
            raise CricBuzzAPIError(f"HTTP {response.status_code}: {response.text}")
        
        # Return raw image bytes
        return response.content
