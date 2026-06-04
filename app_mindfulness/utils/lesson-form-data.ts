import type { LessonFormData } from "schemas/super-admin/lesson-schema";

export function buildLessonFormData(
  payload: LessonFormData,
  method?: "POST" | "PATCH",
): FormData {
  const fd = new FormData();
  if (method === "PATCH") fd.append("_method", "PATCH");

  fd.append("module_id", payload.module_id);
  fd.append("name", payload.name);
  if (payload.description) fd.append("description", payload.description);
  if (payload.content) fd.append("content", payload.content);
  fd.append("duration_minutes", String(payload.duration_minutes));

  payload.materials.forEach((material, index) => {
    if (material.id) fd.append(`materials[${index}][id]`, material.id);
    fd.append(`materials[${index}][name]`, material.name);
    fd.append(`materials[${index}][type]`, material.type);
    if (material.file) fd.append(`materials[${index}][file]`, material.file);
    if (material.external_url)
      fd.append(`materials[${index}][external_url]`, material.external_url);
  });

  return fd;
}
