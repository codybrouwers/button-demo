import { waitPromise } from "@utils/waitPromise";

// == Types ================================================================

interface IFetchWithRetryOptions extends RequestInit {
  retryAttempts?: number;
}

// == Constants ============================================================

// == Exports ==============================================================

export async function fetchWithRetry(
  endpoint: string,
  options: IFetchWithRetryOptions = {}
): Promise<Response> {
  try {
    const response = await fetch(endpoint, options);
    if (response.ok) return response;
    throw new Error("Error making request");
  } catch (error) {
    const attemptsLeft = options.retryAttempts ? options.retryAttempts - 1 : 0;
    if (!attemptsLeft) throw error;

    const exponentialBackoffTime = 2 ** -attemptsLeft * 10_000;
    console.log(`Trying request again in ${exponentialBackoffTime / 1000} seconds`);
    await waitPromise(exponentialBackoffTime);
    return await fetchWithRetry(endpoint, { ...options, retryAttempts: attemptsLeft });
  }
}
