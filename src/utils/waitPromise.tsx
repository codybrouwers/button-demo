// == Types ================================================================

// == Constants ============================================================

// == Functions ============================================================

// == Exports ==============================================================

export function waitPromise(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}