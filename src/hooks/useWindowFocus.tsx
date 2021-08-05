import { useEffect } from "react";
import { IS_CLIENT } from "config";
import { useToggle } from "./useToggle";

// == Types ================================================================

// == Constants ============================================================

// == Functions ============================================================

function isWindowFocused() {
  return IS_CLIENT && window.document.hasFocus();
}

// == Hook =================================================================

export const useWindowFocus = () => {
  const [isFocused, toggleIsFocused] = useToggle(isWindowFocused);

  useEffect(() => {
    toggleIsFocused(isWindowFocused());

    const onFocus = () => toggleIsFocused(true);
    const onBlur = () => toggleIsFocused(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, [toggleIsFocused]);

  return isFocused;
};
