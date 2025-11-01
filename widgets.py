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
logger.info(f"   Web directory: {WEB_DIR}")
logger.info(f"   Web directory exists: {WEB_DIR.exists()}")

bundle_path = WEB_DIR / "dist/player-info.js"
logger.info(f"   Bundle path: {bundle_path}")
logger.info(f"   Bundle exists: {bundle_path.exists()}")

try:
    PLAYER_INFO_BUNDLE = bundle_path.read_text()
    HAS_UI = True
    logger.info(f"✅ React bundle loaded successfully!")
    logger.info(f"   Bundle size: {len(PLAYER_INFO_BUNDLE)} characters")
    logger.info(f"   Bundle preview (first 200 chars): {PLAYER_INFO_BUNDLE[:200]}")
except FileNotFoundError as e:
    logger.error(f"❌ React bundle not found: {e}")
    logger.error(f"   Expected path: {bundle_path}")
    logger.error("⚠️  React bundles not found. Run: cd ui && npm run build")
    PLAYER_INFO_BUNDLE = ""
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
            "Get detailed information about a cricket player. "
            "Returns player profile, career statistics, batting and bowling records, "
            "and recent performance. Use this to get comprehensive stats about any player."
        ),
        template_uri="ui://widget/player-info.html",
        invoking="Loading player information...",
        invoked="Player information loaded successfully",
        html=(
            f"<div id=\"player-info-root\"></div>\n"
            f"<script type=\"module\">\n{PLAYER_INFO_BUNDLE}\n</script>"
        ) if HAS_UI else "<div>UI not available. Build React components first.</div>",
        response_text="Displayed player information"
    )
]

logger.info(f"✅ Created {len(widgets)} widget(s)")
for i, widget in enumerate(widgets, 1):
    logger.info(f"   [{i}] {widget.title}")
    logger.debug(f"       - identifier: {widget.identifier}")
    logger.debug(f"       - template_uri: {widget.template_uri}")
    logger.debug(f"       - HTML length: {len(widget.html)} chars")
    logger.debug(f"       - HTML starts with: {widget.html[:100]}")

WIDGETS_BY_ID: Dict[str, CricUIWidget] = {widget.identifier: widget for widget in widgets}
WIDGETS_BY_URI: Dict[str, CricUIWidget] = {widget.template_uri: widget for widget in widgets}

logger.info(f"📚 Widget lookup dictionaries created:")
logger.info(f"   - WIDGETS_BY_ID keys: {list(WIDGETS_BY_ID.keys())}")
logger.info(f"   - WIDGETS_BY_URI keys: {list(WIDGETS_BY_URI.keys())}")
logger.info("=" * 80)