import React from "react";
import { useInitializeAnaimtionHasRan } from "../components/InitializeAnimationContext";
import { HTMLMotionProps } from "framer-motion";

const disabledMotion = {}

/**
 * useMotionProps is a wrapper that will return your motion props, of return empty props while the initialze animation runs.
 * this is mainly for performance during initial render.
 */
export const useMotionProps = (inputProps?: object) => {
  const hasRan = useInitializeAnaimtionHasRan()
  const props = React.useMemo(() => {
    return hasRan ? inputProps : disabledMotion
  }, [hasRan, inputProps])

  return props
}

export const useMotionLayoutID = (id: string): string | undefined => {
  const hasRan = useInitializeAnaimtionHasRan()
  const newID = React.useMemo(() => {
    return hasRan ? id : undefined
  }, [hasRan, id])

  return newID
}

