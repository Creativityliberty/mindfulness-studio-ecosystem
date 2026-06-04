// utils/included-finder.ts

import type { JsonApiResourceIdentifier } from "../types/json-api";

export function findIncluded<T extends JsonApiResourceIdentifier>(
  included: JsonApiResourceIdentifier[],
  type: T["type"],
  id: string
): T | undefined {
  return included.find((inc) => inc.type === type && inc.id === id) as
    | T
    | undefined;
}

export function findAllIncluded<T extends JsonApiResourceIdentifier>(
  included: JsonApiResourceIdentifier[],
  type: T["type"],
  ids: string[]
): T[] {
  return included.filter(
    (inc) => inc.type === type && ids.includes(inc.id)
  ) as T[];
}
