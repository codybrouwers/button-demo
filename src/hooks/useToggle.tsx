// https://github.com/streamich/react-use/blob/master/src/useToggle.ts
import { useCallback, useState } from "react";

// == Types ================================================================

// == Constants ============================================================

// == Functions ============================================================

// == Hook =================================================================

export const useToggle = (
  initialValue: boolean | (() => boolean)
): [boolean, (nextValue?: $IntentionalAny) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(
    (nextValue?: $IntentionalAny) => {
      if (typeof nextValue === "boolean") {
        setValue(nextValue);
      } else {
        setValue((currentValue) => !currentValue);
      }
    },
    [setValue]
  );

  return [value, toggle];
};
