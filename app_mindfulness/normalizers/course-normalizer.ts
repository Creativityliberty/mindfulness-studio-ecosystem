import type { Category, CategoryResource } from "types/category";
import type {
  Course,
  CourseIncludedResource,
  CourseResource,
} from "types/course";
import { findIncluded } from "utils/included-finder";
import { normalizeCategory } from "./category-normalizer";

export function normalizeCourse(
  resource: CourseResource,
  included: CourseIncludedResource[] = [],
): Course {
  let category: Category | null = null;

  const categoryRel = resource.relationships?.category?.data;
  if (categoryRel) {
    const categoryResource = findIncluded<CategoryResource>(
      included,
      "categories",
      categoryRel.id,
    );
    if (categoryResource) {
      category = normalizeCategory(categoryResource);
    }
  }

  return {
    id: resource.id,
    name: resource.attributes.name,
    slug: resource.attributes.slug,
    description: resource.attributes.description,
    price: resource.attributes.price,
    duration_weeks: resource.attributes.duration_weeks,
    image: resource.attributes.image,
    category,
    status: resource.attributes.status,
    created_at: resource.attributes.created_at,
    updated_at: resource.attributes.updated_at,
  };
}
