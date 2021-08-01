import { useMemo, useRef } from "react";

// == Types ================================================================

// == Constants ============================================================

// == Exports ==============================================================

export function useDebounceFunction<TArgs extends $IntentionalAny[]>(
  func: (...args: TArgs) => void | Promise<void>,
  waitMs: number
) {
  const functionRef = useRef(func);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useMemo(() => {
    const debouncedFunction = (...args: TArgs): void => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        void functionRef.current(...args);
      }, waitMs);
    };
    debouncedFunction.cancel = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    return debouncedFunction;
  }, [waitMs]);
}
