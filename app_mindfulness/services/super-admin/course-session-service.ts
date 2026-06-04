import { api } from "@/lib/api";
import type { JsonApiDocument } from "../../types/json-api";
import type {
  CourseSession,
  CourseSessionIncludedResource,
  CourseSessionResource,
} from "types/course-session";
import { normalizeCourseSession } from "normalizers/course-session-normalizer";
import type { CourseSessionFormData } from "schemas/super-admin/course-session-schema";

export const courseSessionService = {
  async getCourseSessions(): Promise<CourseSession[]> {
    const { data } = await api.get<
      JsonApiDocument<CourseSessionResource[], CourseSessionIncludedResource>
    >("/api/v1/admin/course-sessions", { params: { include: "course" } });
    const included = data.included ?? [];
    return data.data.map((s) => normalizeCourseSession(s, included));
  },

  async createCourseSession(payload: CourseSessionFormData): Promise<CourseSession> {
    const { data } = await api.post<JsonApiDocument<CourseSessionResource>>(
      "/api/v1/admin/course-sessions",
      payload,
    );
    return normalizeCourseSession(data.data);
  },

  async updateCourseSession(id: string, payload: CourseSessionFormData): Promise<CourseSession> {
    const { data } = await api.patch<JsonApiDocument<CourseSessionResource>>(
      `/api/v1/admin/course-sessions/${id}`,
      payload,
    );
    return normalizeCourseSession(data.data);
  },

  async deleteCourseSession(id: string): Promise<void> {
    await api.delete(`/api/v1/admin/course-sessions/${id}`);
  },
};
