import type { Course, CourseResource } from "./course";
import type {
  JsonApiRelationship,
  JsonApiResource,
  JsonApiResourceIdentifier,
} from "./json-api";

export interface CourseSessionAttributes {
  name: string;
  start_date: string;
  end_date: string;
  max_seats: number;
  remaining_seats: number;
  created_at: string;
  updated_at: string;
}

export interface CourseSession {
  id: string; // UUID
  name: string;
  start_date: string;
  end_date: string;
  max_seats: number;
  remaining_seats: number;
  course: Course | null;
  created_at: string;
  updated_at: string;
}

// Relationships
export interface CourseSessionRelationships {
  course: JsonApiRelationship<JsonApiResourceIdentifier>;
}

export type CourseSessionResource = JsonApiResource<
  "course_sessions",
  CourseSessionAttributes,
  CourseSessionRelationships
>;

// Union type pour tous les included possibles
export type CourseSessionIncludedResource = CourseResource;
