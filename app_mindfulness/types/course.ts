import type { Category, CategoryResource } from "./category";
import type {
  JsonApiRelationship,
  JsonApiResource,
  JsonApiResourceIdentifier,
} from "./json-api";
import type { CourseStatus } from "./statuses";

export interface CourseAttributes {
  slug: string | null;
  name: string;
  description: string | null;
  price: number | null;
  duration_weeks: number | null;
  image: string | null;
  status: CourseStatus | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string; // UUID
  slug: string | null;
  name: string;
  description: string | null;
  price: number | null;
  category: Category | null;
  duration_weeks: number | null;
  image: string | null;
  status: CourseStatus | null;
  created_at: string;
  updated_at: string;
}

// Relationships
export interface CourseRelationships {
  category: JsonApiRelationship<JsonApiResourceIdentifier>;
}

export type CourseResource = JsonApiResource<
  "courses",
  CourseAttributes,
  CourseRelationships
>;

// Union type pour tous les included possibles
export type CourseIncludedResource = CategoryResource;
