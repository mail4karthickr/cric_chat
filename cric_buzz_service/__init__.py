"""
CricBuzz API Service
A modular Python client for the CricBuzz Cricket API via RapidAPI

Categories:
- Matches: Live, recent, and upcoming matches
- Series: Series details, points tables, squads, venues
- Players: Player information and statistics
- Media: Images and media content

Example:
    >>> from cric_buzz_service import MatchesAPI, SeriesAPI, PlayersAPI, MatchType
    >>> 
    >>> # Use individual API modules
    >>> async with MatchesAPI() as matches:
    >>>     live_matches = await matches.get_matches(MatchType.LIVE)
    >>>     
    >>> async with SeriesAPI() as series:
    >>>     series_details = await series.get_series_details(7607)
    >>>     
    >>> async with PlayersAPI() as players:
    >>>     player_info = await players.get_player_info("1413")
"""

# API Categories
from .matches_api import MatchesAPI, MatchType
from .series_api import SeriesAPI
from .players_api import PlayersAPI
# from .media_api import MediaAPI, ImageResolution, ImageType  # Not available yet

# Base client and exceptions
from .base_client import (
    BaseCricBuzzClient,
    DataIsEmpty,
    APINotSubscribed,
    RateLimitExceeded,
    CricBuzzAPIError
)

__version__ = "2.0.0"

__all__ = [
    # API Categories
    "MatchesAPI",
    "SeriesAPI",
    "PlayersAPI",
    # "MediaAPI",  # Not available yet
    
    # Enums
    "MatchType",
    # "ImageResolution",  # Not available yet
    # "ImageType",  # Not available yet
    
    # Exceptions
    "DataIsEmpty",
    "APINotSubscribed",
    "RateLimitExceeded",
    "CricBuzzAPIError",
    
    # Base
    "BaseCricBuzzClient",
]
