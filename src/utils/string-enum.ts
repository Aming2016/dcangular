/** Utility function to create a K:V from a list of strings
 * sample:
 * export const StringEnum = strEnum("VALUE1", "VALUE2")
 * export type StringEnum = keyof typeof StringEnum
 */
export function strEnum<T extends string>(... o: Array<T>): {[K in T]: K}{
  return  Object.freeze(o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null)))
}

