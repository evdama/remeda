import { purry } from './purry';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Returns a partial copy of an object omitting the keys specified.
 * @param object the object
 * @param names the property names
 * @signature
 *    R.omit(obj, names);
 * @example
 *    R.omit({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'd']) // => { b: 2, c: 3 }
 * @data_first
 * @category Object
 */
export function omit<T extends {}, K extends keyof T>(
  object: T,
  names: K[]
): Omit<T, K>;

/**
 * Returns a partial copy of an object omitting the keys specified.
 * @param object the object
 * @param names the property names
 * @signature
 *    R.omit(names)(obj);
 * @example
 *    R.pipe({ a: 1, b: 2, c: 3, d: 4 }, R.omit(['a', 'd'])) // => { b: 2, c: 3 }
 * @data_last
 * @category Object
 */
export function omit<T extends {}, K extends keyof T>(
  names: K[]
): (object: T) => Omit<T, K>;

export function omit() {
  return purry(_omit, arguments);
}

function _omit<T extends {}, K extends keyof T>(
  object: T,
  names: K[]
): Omit<T, K> {
  const set = new Set(names as string[]);
  return Object.entries(object).reduce(
    (acc, [name, value]) => {
      if (!set.has(name)) {
        acc[name] = value;
      }
      return acc;
    },
    {} as any
  ) as Omit<T, K>;
}
