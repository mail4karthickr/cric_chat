"""
UI Widget configurations for Cricket Chat MCP Server.
"""

import logging
from pathlib import Path
from typing import Any, Dict, List
from attr import dataclass
from pydantic import AnyUrl

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.info("=" * 80)
logger.info("🎨 Loading widgets.py module...")

# Load React bundles
WEB_DIR = Path(__file__).parent / "ui"
bundle_path = WEB_DIR / "dist/player-info.js"

# Check if UI bundles exist (but don't load them yet - lazy load on demand)
HAS_UI = bundle_path.exists()

# Lazy-load function to load bundles only when needed
def _load_bundle(bundle_name: str) -> str:
    """Lazy-load a bundle file when needed, with caching."""
    try:
        bundle_file = WEB_DIR / f"dist/{bundle_name}.js"
        logger.debug(f"📦 Loading bundle: {bundle_name}.js")
        return bundle_file.read_text()
    except FileNotFoundError as e:
        logger.error(f"❌ Bundle not found: {bundle_name}.js")
        return "<div>UI not available. Build React components first.</div>"

logger.info(f"✅ UI bundles available: {HAS_UI}")


# Constants
MIME_TYPE = "text/html+skybridge"

@dataclass(frozen=True)
class CricUIWidget:
    """Cricket UI Widget configuration for player information display."""
    identifier: str
    title: str
    description: str
    template_uri: str
    invoking: str
    invoked: str
    bundle_name: str  # Bundle file name (without .js extension)
    root_id: str      # Root element ID for React mounting
    response_text: str
    
    def get_html(self) -> str:
        """Lazy-load and generate HTML for this widget."""
        if not HAS_UI:
            return "<div>UI not available. Build React components first.</div>"
        
        bundle_content = _load_bundle(self.bundle_name)
        return (
            f"<div id=\"{self.root_id}\"></div>\n"
            f"<script type=\"module\">\n{bundle_content}\n</script>"
        )


def _tool_meta(widget: CricUIWidget) -> Dict[str, Any]:
    """Create tool metadata for OpenAI Apps SDK integration."""
    return {
        "openai/outputTemplate": widget.template_uri,
        "openai/toolInvocation/invoking": widget.invoking,
        "openai/toolInvocation/invoked": widget.invoked,
        "openai/widgetAccessible": True,
        "openai/resultCanProduceWidget": True,
        "openai/widgetDescription": widget.response_text,
        "annotations": {
            "destructiveHint": False,
            "openWorldHint": False,
            "readOnlyHint": True,
        }
    }


def _resource_description(widget: CricUIWidget) -> str:
    """Generate resource description for a widget."""
    return f"{widget.description} Interactive widget for {widget.title}."


# Widget configurations
logger.info("📦 Creating widget configurations...")
widgets: List[CricUIWidget] = [
    CricUIWidget(
        identifier="get-player-info",
        title="Player Information",
        description=(
            "Fetch a player's profile and recent form. Returns identity (name, role, bat/bowl style, "
            "teams, image), bio, ICC rankings, and recent batting/bowling snippets. "
            "Note: This does NOT include career batting aggregates—use 'get-player-batting' for "
            "format-wise career stats."
        ),
        template_uri="ui://widget/player-info.html",
        invoking="Loading player information...",
        invoked="Player information loaded successfully",
        bundle_name="player-info",
        root_id="player-info-root",
        response_text="Displayed player information"
    ),
    # CricUIWidget(
    #     identifier="get-player-batting",
    #     title="Player Batting — Career by Format",
    #     description=(
    #         "Show career batting aggregates by format (e.g., Tests, ODIs, T20Is, IPL). "
    #         "Includes Matches, Innings, Runs, Balls, Highest, Average, Strike Rate, Not Out, "
    #         "Fours, Sixes, Ducks, 50s/100s, 200s/300s/400s. "
    #         "Use for 'stats' or 'career' queries. For bio/rankings/recent form, use 'get-player-info'."
    #     ),
    #     template_uri="ui://widget/player-batting.html",
    #     invoking="Loading batting career stats…",
    #     invoked="Batting career stats loaded",
    #     bundle_name="player-batting-info",
    #     root_id="player-batting-root",
    #     response_text="Displayed format-wise batting career aggregates"
    # ),
    # CricUIWidget(
    #     identifier="get-player-bowling",
    #     title="Player Bowling — Career by Format",
    #     description=(
    #         "Show career bowling aggregates by format (e.g., Tests, ODIs, T20Is, IPL). "
    #         "Includes Matches, Innings, Balls, Runs, Maidens, Wickets, Average, Economy, "
    #         "Strike Rate, Best Bowling Innings (BBI), Best Bowling Match (BBM), 4w/5w/10w hauls. "
    #         "Use for 'bowling stats' or 'career' queries. For bio/rankings/recent form, use 'get-player-info'."
    #     ),
    #     template_uri="ui://widget/player-bowling.html",
    #     invoking="Loading bowling career stats…",
    #     invoked="Bowling career stats loaded",
    #     bundle_name="player-bowling-info",
    #     root_id="player-bowling-root",
    #     response_text="Displayed format-wise bowling career aggregates"
    # ),
    CricUIWidget(
        identifier="get-player-news",
        title="Player News & Updates",
        description=(
            "Fetch latest news, articles, and updates about a player. Returns news stories with "
            "headlines, summaries, cover images, story types (News, Features, Match Reports, etc.), "
            "publication dates, context (tournament/series), and source attribution. "
            "Use for 'news', 'latest updates', or 'recent articles' queries about a player."
        ),
        template_uri="ui://widget/player-news.html",
        invoking="Loading player news...",
        invoked="Player news loaded successfully",
        bundle_name="player-news",
        root_id="player-news-root",
        response_text="Displayed latest news and updates about the player"
    ),
    # CricUIWidget(
    #     identifier="get-player-career",
    #     title="Player Career Information",
    #     description=(
    #         "Show player's career debut and last played information across all formats "
    #         "(Tests, ODIs, T20Is, IPL, Champions League, etc.). Returns debut match details "
    #         "including opponent, date, and venue, plus last played match information. "
    #         "Use for 'career', 'debut', or 'when did they start playing' queries."
    #     ),
    #     template_uri="ui://widget/player-career.html",
    #     invoking="Loading career information...",
    #     invoked="Career information loaded successfully",
    #     bundle_name="player-career",
    #     root_id="player-career-root",
    #     response_text="Displayed player career debut and last played information"
    # ),
    CricUIWidget(
        identifier="get-trending-players",
        title="Trending Players",
        description=(
            "Show currently trending cricket players with their images, names, and teams. "
            "Returns a grid of players who are currently popular or in the news. "
            "Includes player images, full names, and team/country information. "
            "Use for 'trending players', 'popular players', or 'who's trending' queries."
        ),
        template_uri="ui://widget/trending-players.html",
        invoking="Loading trending players...",
        invoked="Trending players loaded successfully",
        bundle_name="trending-players",
        root_id="trending-players-root",
        response_text="Displayed currently trending cricket players"
    ),
    CricUIWidget(
        identifier="get-rankings",
        title="ICC Rankings",
        description=(
            "Show ICC cricket rankings for batters, bowlers, or all-rounders across different formats. "
            "Displays player rankings with their rank, name, country, rating, points, and trend (up/down/flat). "
            "Includes player images and detailed ranking information. "
            "Use for 'ICC rankings', 'top batsmen', 'bowling rankings', or 'player rankings' queries."
        ),
        template_uri="ui://widget/icc-rankings.html",
        invoking="Loading ICC rankings...",
        invoked="ICC rankings loaded successfully",
        bundle_name="icc-rankings",
        root_id="icc-rankings-root",
        response_text="Displayed ICC cricket rankings"
    ),
    CricUIWidget(
        identifier="get-records",
        title="Cricket Records & Statistics",
        description=(
            "Display cricket records and statistics based on various filters. "
            "Shows records like most runs, most wickets, best batting average, etc. "
            "Can be filtered by year, match type, team, and opponent. "
            "Includes player names, statistics, and detailed record information. "
            "Use for 'most runs', 'top wickets', 'best average', or any cricket records queries. "
            "Note: Use get-record-filters first to discover available statistics types and filters."
        ),
        template_uri="ui://widget/cricket-records.html",
        invoking="Loading cricket records...",
        invoked="Cricket records loaded successfully",
        bundle_name="cricket-records",
        root_id="cricket-records-root",
        response_text="Displayed cricket records and statistics"
    )
]

WIDGETS_BY_ID: Dict[str, CricUIWidget] = {widget.identifier: widget for widget in widgets}
WIDGETS_BY_URI: Dict[str, CricUIWidget] = {widget.template_uri: widget for widget in widgets}