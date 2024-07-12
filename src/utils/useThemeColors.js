import { useMemo } from "react";

// Third Party
import resolveConfig from "tailwindcss/resolveConfig";

// Project
import tailwindConfig from "@/../tailwind.config.js";

export default function useThemeColors() {
  const tailwind = useMemo(() => resolveConfig(tailwindConfig), []);
  return tailwind.theme.colors;
}
