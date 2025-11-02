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

try:
    PLAYER_INFO_BUNDLE = (WEB_DIR / "dist/player-info.js").read_text()
    PLAYER_BATTING_INFO_BUNDLE = (WEB_DIR / "dist/player-batting-info.js").read_text()
    PLAYER_BOWLING_INFO_BUNDLE = (WEB_DIR / "dist/player-bowling-info.js").read_text()
    HAS_UI = True
except FileNotFoundError as e:
    PLAYER_INFO_BUNDLE = ""
    PLAYER_BATTING_INFO_BUNDLE = ""
    PLAYER_BOWLING_INFO_BUNDLE = ""
    HAS_UI = False


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
    html: str
    response_text: str


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
        html=(
            f"<div id=\"player-info-root\"></div>\n"
            f"<script type=\"module\">\n{PLAYER_INFO_BUNDLE}\n</script>"
        ) if HAS_UI else "<div>UI not available. Build React components first.</div>",
        response_text="Displayed player information"
    ),
    CricUIWidget(
        identifier="get-player-batting",
        title="Player Batting — Career by Format",
        description=(
            "Show career batting aggregates by format (e.g., Tests, ODIs, T20Is, IPL). "
            "Includes Matches, Innings, Runs, Balls, Highest, Average, Strike Rate, Not Out, "
            "Fours, Sixes, Ducks, 50s/100s, 200s/300s/400s. "
            "Use for 'stats' or 'career' queries. For bio/rankings/recent form, use 'get-player-info'."
        ),
        template_uri="ui://widget/player-batting.html",
        invoking="Loading batting career stats…",
        invoked="Batting career stats loaded",
        html=(
            f"<div id=\"player-batting-root\"></div>\n"
            f"<script type=\"module\">\n{PLAYER_BATTING_INFO_BUNDLE}\n</script>"
        ) if HAS_UI else "<div>UI not available. Build React components first.</div>",
        response_text="Displayed format-wise batting career aggregates"
    ),
    CricUIWidget(
        identifier="get-player-bowling",
        title="Player Bowling — Career by Format",
        description=(
            "Show career bowling aggregates by format (e.g., Tests, ODIs, T20Is, IPL). "
            "Includes Matches, Innings, Balls, Runs, Maidens, Wickets, Average, Economy, "
            "Strike Rate, Best Bowling Innings (BBI), Best Bowling Match (BBM), 4w/5w/10w hauls. "
            "Use for 'bowling stats' or 'career' queries. For bio/rankings/recent form, use 'get-player-info'."
        ),
        template_uri="ui://widget/player-bowling.html",
        invoking="Loading bowling career stats…",
        invoked="Bowling career stats loaded",
        html=(
            f"<div id=\"player-bowling-root\"></div>\n"
            f"<script type=\"module\">\n{PLAYER_BOWLING_INFO_BUNDLE}\n</script>"
        ) if HAS_UI else "<div>UI not available. Build React components first.</div>",
        response_text="Displayed format-wise bowling career aggregates"
    )
]

WIDGETS_BY_ID: Dict[str, CricUIWidget] = {widget.identifier: widget for widget in widgets}
WIDGETS_BY_URI: Dict[str, CricUIWidget] = {widget.template_uri: widget for widget in widgets}