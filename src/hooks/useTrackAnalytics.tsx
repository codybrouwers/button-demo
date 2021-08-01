import { useRef } from "react";
import { IS_DEVELOPMENT } from "config";
import type { TEventsData } from "pages/api/analytics/track.api";
import { fetchWithRetry } from "utils";
import { useDebounceFunction } from "./useDebounceFunction";

// == Types ================================================================

// == Constants ============================================================

const DEBOUNCE_TIME = IS_DEVELOPMENT ? 2500 : 2500;

// == Functions ============================================================

function timestampExcludingSeconds() {
  return new Date().toISOString().substring(0, 16);
}

// == Exports ==============================================================

export function useTrackAnalytics() {
  const analyticsData = useRef<Record<string, Map<string, number>>>({ clicks: new Map() });
  const analyticsCall = useDebounceFunction(async ({ event, timestamp, meta }: TEventsData) => {
    try {
      const body = JSON.stringify({ event, timestamp, meta });
      analyticsData.current[event].clear();
      await fetchWithRetry("/api/analytics/track", {
        retryAttempts: 3,
        method: "POST",
        body,
      });
    } catch (error) {
      console.warn("[useTrackAnalytics] There was an error submiting the following analytics event: ", {
        event,
        meta,
        error,
      });
    }
  }, DEBOUNCE_TIME);

  return {
    click: {
      increment() {
        const timestamp = timestampExcludingSeconds();
        const clickData = analyticsData.current.clicks;
        const currentCount = clickData.get(timestamp) ?? 0;
        clickData.set(timestamp, currentCount + 1);

        analyticsCall({
          event: "clicks",
          timestamp: new Date().toISOString(),
          meta: { data: Object.fromEntries(clickData) },
        });
      },
    },
  };
}
