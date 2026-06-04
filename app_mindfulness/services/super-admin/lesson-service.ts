import { api } from "@/lib/api";
import type { JsonApiDocument } from "../../types/json-api";
import type {
  Lesson,
  LessonIncludedResource,
  LessonResource,
} from "types/lesson";
import { normalizeLesson } from "normalizers/lesson-normalizer";
import type { LessonFormData } from "schemas/super-admin/lesson-schema";
import { buildLessonFormData } from "utils/lesson-form-data";

export const lessonService = {
  async getLessons(): Promise<Lesson[]> {
    const { data } = await api.get<JsonApiDocument<LessonResource[]>>(
      "/api/v1/admin/lessons",
      {
        params: { include: "module,materials" },
      },
    );
    const included = (data.included || []) as LessonIncludedResource[];
    return data.data.map((lesson) => normalizeLesson(lesson, included));
  },

  async createLesson(payload: LessonFormData): Promise<Lesson> {
    const { data } = await api.post<JsonApiDocument<LessonResource>>(
      "/api/v1/admin/lessons",
      buildLessonFormData(payload, "POST"),
    );
    return normalizeLesson(data.data);
  },

  async updateLesson(id: string, payload: LessonFormData): Promise<Lesson> {
    const { data } = await api.post<JsonApiDocument<LessonResource>>(
      `/api/v1/admin/lessons/${id}`,
      buildLessonFormData(payload, "PATCH"),
    );
    return normalizeLesson(data.data);
  },

  async deleteLesson(id: string): Promise<void> {
    await api.delete(`/api/v1/admin/lessons/${id}`);
  },
};
