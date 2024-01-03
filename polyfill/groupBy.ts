/**
 * paperless
 * groupBy.ts
 * created: 02/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

if (!Object.groupBy) {
  Object.groupBy = function <K extends PropertyKey, T>(
    items: Iterable<T>,
    keySelector: (item: T) => K,
  ): Partial<Record<K, T[]>> {
    const groups: Partial<Record<K, T[]>> = {};
    for (const item of items) {
      (groups[keySelector(item)] = groups[keySelector(item)] || []).push(item);
    }
    return groups;
  };
}
