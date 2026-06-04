import { api } from "@/lib/api";
import type { JsonApiDocument } from "../../types/json-api";
import type {
  Course,
  CourseIncludedResource,
  CourseResource,
} from "types/course";
import { normalizeCourse } from "normalizers/course-normalizer";
import type { CourseFormData } from "schemas/super-admin/course-schema";
import { buildCourseFormData } from "utils/course-form-data";

export const courseService = {
  async getCourses(): Promise<Course[]> {
    const { data } = await api.get<JsonApiDocument<CourseResource[]>>(
      "/api/v1/admin/courses",
      {
        params: {
          include: "category",
        },
      },
    );
    // Cast included to IncludedResource[]
    const included = (data.included || []) as CourseIncludedResource[];

    return data.data.map((course) => normalizeCourse(course, included));
  },

  async createCourse(payload: CourseFormData): Promise<Course> {
    const { data } = await api.post<JsonApiDocument<CourseResource>>(
      "/api/v1/admin/courses",
      buildCourseFormData(payload, "POST"),
    );
    return normalizeCourse(data.data);
  },

  async updateCourse(id: string, payload: CourseFormData): Promise<Course> {
    const { data } = await api.post<JsonApiDocument<CourseResource>>(
      `/api/v1/admin/courses/${id}`,
      buildCourseFormData(payload, "PATCH"),
    );
    return normalizeCourse(data.data);
  },

  async deleteCourse(id: string): Promise<void> {
    await api.delete(`/api/v1/admin/courses/${id}`);
  },
};
