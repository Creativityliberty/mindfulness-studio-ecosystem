import type { Category, CategoryResource } from "types/category";

export function normalizeCategory(resource: CategoryResource): Category {
  return {
    id: resource.id,
    name: resource.attributes.name,
    created_at: resource.attributes.created_at,
    updated_at: resource.attributes.updated_at,
  };
}
