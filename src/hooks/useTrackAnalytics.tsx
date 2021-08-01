import { fetchWithRetry } from "utils";
import { useDebounceFunction } from "./useDebounceFunction";

// == Types ================================================================

// == Constants ============================================================

// == Functions ============================================================

// == Exports ==============================================================

export function useTrackAnalytics() {
  return useDebounceFunction(async ({ event, meta }: { event: string; meta: $JSONSerializable }) => {
    try {
      const body = JSON.stringify({ event, meta, timestamp: new Date().toISOString() });
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
  }, 2500);
}
