export const isClosestNode = (source: unknown, target: unknown): boolean =>
  source instanceof Element &&
  target instanceof Element &&
  (source === target || source.contains(target))
