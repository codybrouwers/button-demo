// == Types ================================================================

// == Constants ============================================================

// == Exports ==============================================================

export function debounce<TArgs extends $IntentionalAny[]>(func: (...args: TArgs) => void, waitMs: number) {
  let timeout: ReturnType<typeof setTimeout> | null;
  const debouncedFunction = (...args: TArgs): void => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func(...args);
    }, waitMs);
  };
  debouncedFunction.cancel = () => {
    if (timeout) clearTimeout(timeout);
  };
  return debouncedFunction;
}
