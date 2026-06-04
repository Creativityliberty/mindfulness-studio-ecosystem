import type { Course } from "./course";
import type { CategoryResource } from "./category";
import type { Module, ModuleResource } from "./Module";

export type CourseDetailIncludedResource = CategoryResource | ModuleResource;

export interface CourseWithModules extends Course {
  modules: Module[];
}
