/**
 * React hooks for OpenAI Apps SDK
 * Based on: https://developers.openai.com/apps-sdk/build/custom-ux
 */

import { useCallback, useEffect, useSyncExternalStore, useState } from "react";

/**
 * Subscribe to a single global value from window.openai
 * Based on Apps SDK documentation
 */
export function useOpenAiGlobal(key) {
  console.log(`🔗 [useOpenAiGlobal] Subscribing to global key: "${key}"`);
  
  return useSyncExternalStore(
    (onChange) => {
      console.log(`📡 [useOpenAiGlobal] Setting up subscription for "${key}"`);
      
      const handleSetGlobal = (event) => {
        const globals = event.detail.globals;
        const value = globals[key];
        console.log(`📥 [useOpenAiGlobal] Received event for "${key}":`, value !== undefined ? 'value updated' : 'value undefined');
        if (value === undefined) {
          return;
        }
        console.log(`✨ [useOpenAiGlobal] Triggering onChange for "${key}"`);
        onChange();
      };

      window.addEventListener("openai:set_globals", handleSetGlobal, {
        passive: true,
      });
      
      console.log(`👂 [useOpenAiGlobal] Event listener added for "${key}"`);

      return () => {
        console.log(`🧹 [useOpenAiGlobal] Cleaning up subscription for "${key}"`);
        window.removeEventListener("openai:set_globals", handleSetGlobal);
      };
    },
    () => {
      const value = window.openai?.[key];
      console.log(`📖 [useOpenAiGlobal] Getting snapshot for "${key}":`, value !== undefined ? 'value exists' : 'value undefined');
      return value;
    }
  );
}

/**
 * Get tool input from window.openai
 */
export function useToolInput() {
  console.log('🛠️ [useToolInput] Hook called');
  const toolInput = useOpenAiGlobal("toolInput");
  console.log('🛠️ [useToolInput] Returning:', toolInput ? 'data available' : 'no data');
  return toolInput;
}

/**
 * Get tool output from window.openai
 */
export function useToolOutput() {
  console.log('📤 [useToolOutput] Hook called');
  const toolOutput = useOpenAiGlobal("toolOutput");
  console.log('📤 [useToolOutput] Returning:', toolOutput ? 'data available' : 'no data');
  return toolOutput;
}

/**
 * Get tool response metadata from window.openai
 */
export function useToolResponseMetadata() {
  console.log('ℹ️ [useToolResponseMetadata] Hook called');
  const metadata = useOpenAiGlobal("toolResponseMetadata");
  console.log('ℹ️ [useToolResponseMetadata] Returning:', metadata ? 'metadata available' : 'no metadata');
  return metadata;
}

/**
 * Get theme from window.openai
 */
export function useTheme() {
  console.log('🎨 [useTheme] Hook called');
  const theme = useOpenAiGlobal("theme");
  console.log('🎨 [useTheme] Current theme:', theme || 'default');
  return theme;
}

/**
 * Get display mode from window.openai
 */
export function useDisplayMode() {
  console.log('🖥️ [useDisplayMode] Hook called');
  const displayMode = useOpenAiGlobal("displayMode");
  console.log('🖥️ [useDisplayMode] Current mode:', displayMode || 'default');
  return displayMode;
}

/**
 * Widget state hook that syncs with window.openai
 * Based on Apps SDK documentation
 */
export function useWidgetState(defaultState) {
  console.log('📊 [useWidgetState] Hook initialized with default state:', defaultState);
  
  const widgetStateFromWindow = useOpenAiGlobal("widgetState");
  console.log('📊 [useWidgetState] Widget state from window:', widgetStateFromWindow !== null ? 'exists' : 'null');

  const [widgetState, _setWidgetState] = useState(() => {
    if (widgetStateFromWindow != null) {
      console.log('📊 [useWidgetState] Using widget state from window');
      return widgetStateFromWindow;
    }

    const initialState = typeof defaultState === "function"
      ? defaultState()
      : defaultState ?? null;
    console.log('📊 [useWidgetState] Using default state:', initialState);
    return initialState;
  });

  useEffect(() => {
    console.log('📊 [useWidgetState] Effect: Syncing with window state');
    _setWidgetState(widgetStateFromWindow);
  }, [widgetStateFromWindow]);

  const setWidgetState = useCallback(
    (state) => {
      console.log('📊 [useWidgetState] setWidgetState called');
      _setWidgetState((prevState) => {
        const newState = typeof state === "function" ? state(prevState) : state;
        console.log('📊 [useWidgetState] New state computed:', newState);

        if (newState != null && window.openai?.setWidgetState) {
          console.log('📊 [useWidgetState] Updating window.openai.widgetState');
          window.openai.setWidgetState(newState);
        } else {
          console.warn('⚠️ [useWidgetState] Cannot update window.openai.widgetState:', 
            newState == null ? 'state is null' : 'setWidgetState not available');
        }

        return newState;
      });
    },
    []
  );

  console.log('📊 [useWidgetState] Returning current state and setter');
  return [widgetState, setWidgetState];
}
