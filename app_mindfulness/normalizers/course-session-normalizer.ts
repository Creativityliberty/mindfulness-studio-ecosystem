import { findIncluded } from "utils/included-finder";
import { normalizeCourse } from "./course-normalizer";
import type { Course, CourseResource } from "types/course";
import type {
  CourseSession,
  CourseSessionIncludedResource,
  CourseSessionResource,
} from "types/course-session";

export function normalizeCourseSession(
  resource: CourseSessionResource,
  included: CourseSessionIncludedResource[] = [],
): CourseSession {
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
    start_date: resource.attributes.start_date,
    end_date: resource.attributes.end_date,
    max_seats: resource.attributes.max_seats,
    remaining_seats: resource.attributes.remaining_seats,
    course,
    created_at: resource.attributes.created_at,
    updated_at: resource.attributes.updated_at,
  };
}
