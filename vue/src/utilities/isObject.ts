export const isObject = <O = Record<string, unknown>>(o: unknown): o is O =>
  typeof o === 'object' && o !== null && !Array.isArray(o)
