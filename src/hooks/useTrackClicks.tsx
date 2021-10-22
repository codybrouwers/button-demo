import { useRef } from "react";
import { IS_DEVELOPMENT } from "@config";
import type { TEventsData } from "@pages/api/game/write";
import { fetchWithRetry } from "@utils";
import { useDebounceFunction } from "./useDebounceFunction";

// == Types ================================================================

// == Constants ============================================================

const DEBOUNCE_TIME = IS_DEVELOPMENT ? 1000 : 2500;

// == Functions ============================================================

function timestampExcludingSeconds() {
  return new Date().setSeconds(0, 0);
}

// == Exports ==============================================================

export function useTrackClicks() {
  const clicksData = useRef<Map<number, number>>(new Map());
  const saveClicks = useDebounceFunction(async ({ event, timestamp, meta }: TEventsData) => {
    try {
      const body = JSON.stringify({ event, timestamp, meta });
      clicksData.current.clear();
      await fetchWithRetry("/api/game/write", {
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
    increment(user: IUser) {
      const timestamp = timestampExcludingSeconds();
      const clickData = clicksData.current;
      const currentCount = clickData.get(timestamp) ?? 0;
      clickData.set(timestamp, currentCount + 1);

      saveClicks({
        event: "clicks",
        timestamp: new Date().toISOString(),
        meta: { data: Object.fromEntries(clickData), user },
      });
    },
  };
}
