import { findIncluded } from "utils/included-finder";
import { normalizeCourse } from "./course-normalizer";
import type { Course, CourseResource } from "types/course";
import type {
  Module,
  ModuleIncludedResource,
  ModuleResource,
} from "types/Module";

export function normalizeModule(
  resource: ModuleResource,
  included: ModuleIncludedResource[] = [],
): Module {
  let course: Course | null = null;

  const courseRel = resource.relationships?.course?.data;
  if (courseRel) {
    const courseResource = findIncluded<CourseResource>(
      included,
      "courses",
      courseRel.id,
    );
    if (courseResource) {
      course = normalizeCourse(courseResource);
    }
  }

  return {
    id: resource.id,
    name: resource.attributes.name,
    slug: resource.attributes.slug,
    description: resource.attributes.description,
    duration_minutes: resource.attributes.duration_minutes,
    course,
    created_at: resource.attributes.created_at,
    updated_at: resource.attributes.updated_at,
  };
}
