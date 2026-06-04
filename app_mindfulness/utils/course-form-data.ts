import type { CourseFormData } from "schemas/super-admin/course-schema";

export function buildCourseFormData(
  payload: CourseFormData,
  method?: "POST" | "PATCH",
): FormData {
  const fd = new FormData();
  if (method === "PATCH") fd.append("_method", "PATCH");
  fd.append("category_id", payload.category_id);
  fd.append("name", payload.name);
  if (payload.description) fd.append("description", payload.description);
  fd.append("price", String(payload.price));
  fd.append("duration_weeks", String(payload.duration_weeks));
  fd.append("status", payload.status);
  if (payload.image) fd.append("image", payload.image);
  return fd;
}
