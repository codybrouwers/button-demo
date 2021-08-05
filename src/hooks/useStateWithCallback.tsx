import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

// == Types ================================================================

// == Constants ============================================================

// == Exports ==============================================================

export function useStateWithCallback<
  TState extends $IntentionalUnknown,
  TCallback extends (updatedState: TState) => void
>(initialState: TState | (() => TState), callback: TCallback): [TState, Dispatch<SetStateAction<TState>>] {
  const [state, setState] = useState(initialState);
  const callbackRef = useRef<TCallback | null>(callback);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current && callbackRef.current) {
      callbackRef.current?.(state);
    }
    return () => {
      isFirstRender.current = false;
    };
  }, [state]);

  return [state, setState];
}
