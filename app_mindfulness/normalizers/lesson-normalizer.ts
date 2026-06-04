import { findIncluded, findAllIncluded } from "utils/included-finder";
import { normalizeModule } from "./module-normalizer";
import type { Module, ModuleResource } from "types/Module";
import type {
  Lesson,
  LessonIncludedResource,
  LessonMaterial,
  LessonMaterialResource,
  LessonResource,
} from "types/lesson";

export function normalizeLessonMaterial(
  resource: LessonMaterialResource,
): LessonMaterial {
  return {
    id: resource.id,
    name: resource.attributes.name,
    type: resource.attributes.type,
    external_url: resource.attributes.external_url,
    file_url: resource.attributes.file_url,
    created_at: resource.attributes.created_at,
    updated_at: resource.attributes.updated_at,
  };
}

export function normalizeLesson(
  resource: LessonResource,
  included: LessonIncludedResource[] = [],
): Lesson {
  let module: Module | null = null;

  const moduleRel = resource.relationships?.module?.data;
  if (moduleRel && !Array.isArray(moduleRel)) {
    const moduleResource = findIncluded<ModuleResource>(
      included,
      "modules",
      moduleRel.id,
    );
    if (moduleResource) {
      module = normalizeModule(moduleResource);
    }
  }

  const materialsRel = resource.relationships?.materials?.data;
  const materials: LessonMaterial[] = [];
  if (Array.isArray(materialsRel)) {
    const materialIds = materialsRel.map((r) => r.id);
    const materialResources = findAllIncluded<LessonMaterialResource>(
      included,
      "lesson_materials",
      materialIds,
    );
    materials.push(...materialResources.map(normalizeLessonMaterial));
  }

  return {
    id: resource.id,
    slug: resource.attributes.slug,
    name: resource.attributes.name,
    description: resource.attributes.description,
    content: resource.attributes.content,
    duration_minutes: resource.attributes.duration_minutes,
    module,
    materials,
    created_at: resource.attributes.created_at,
    updated_at: resource.attributes.updated_at,
  };
}
