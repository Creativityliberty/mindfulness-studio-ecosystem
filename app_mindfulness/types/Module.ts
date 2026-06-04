import type { Course, CourseResource } from "./course";
import type {
  JsonApiRelationship,
  JsonApiResource,
  JsonApiResourceIdentifier,
} from "./json-api";

export interface ModuleAttributes {
  slug: string | null;
  name: string;
  description: string | null;
  duration_minutes: number | null;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string; // UUID
  slug: string | null;
  name: string;
  description: string | null;
  course: Course | null;
  duration_minutes: number | null;
  created_at: string;
  updated_at: string;
}

// Relationships
export interface ModuleRelationships {
  course: JsonApiRelationship<JsonApiResourceIdentifier>;
  lessons: JsonApiRelationship<JsonApiResourceIdentifier[]>;
}

export type ModuleResource = JsonApiResource<
  "modules",
  ModuleAttributes,
  ModuleRelationships
>;

// Union type pour tous les included possibles
export type ModuleIncludedResource = CourseResource;
