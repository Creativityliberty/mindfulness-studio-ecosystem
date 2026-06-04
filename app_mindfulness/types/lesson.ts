import type { Module, ModuleResource } from "./Module";
import type {
  JsonApiRelationship,
  JsonApiResource,
  JsonApiResourceIdentifier,
} from "./json-api";

export type LessonMaterialType = "video" | "audio" | "pdf" | "image";

export interface LessonMaterialAttributes {
  name: string;
  type: LessonMaterialType;
  external_url: string | null;
  file_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface LessonMaterial {
  id: string;
  name: string;
  type: LessonMaterialType;
  external_url: string | null;
  file_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface LessonAttributes {
  slug: string | null;
  name: string;
  description: string | null;
  content: string | null;
  duration_minutes: number | null;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  slug: string | null;
  name: string;
  description: string | null;
  content: string | null;
  duration_minutes: number | null;
  module: Module | null;
  materials: LessonMaterial[];
  created_at: string;
  updated_at: string;
}

export interface LessonRelationships {
  module: JsonApiRelationship<JsonApiResourceIdentifier>;
  materials: JsonApiRelationship<JsonApiResourceIdentifier[]>;
}

export interface LessonMaterialRelationships {
  lesson: JsonApiRelationship<JsonApiResourceIdentifier>;
}

export type LessonResource = JsonApiResource<
  "lessons",
  LessonAttributes,
  LessonRelationships
>;

export type LessonMaterialResource = JsonApiResource<
  "lesson_materials",
  LessonMaterialAttributes,
  LessonMaterialRelationships
>;

export type LessonIncludedResource = ModuleResource | LessonMaterialResource;
