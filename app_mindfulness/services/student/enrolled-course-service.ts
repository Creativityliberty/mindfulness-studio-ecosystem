import { api } from "@/lib/api";
import type { JsonApiDocument } from "types/json-api";
import type { Course, CourseIncludedResource, CourseResource } from "types/course";
import type { CourseDetailIncludedResource, CourseWithModules } from "types/student-course";
import type { ModuleResource } from "types/Module";
import { normalizeCourse } from "normalizers/course-normalizer";
import { normalizeModule } from "normalizers/module-normalizer";

export const enrolledCourseService = {
  async getEnrolledCourses(): Promise<Course[]> {
    const { data } = await api.get<
      JsonApiDocument<CourseResource[], CourseIncludedResource>
    >("/api/v1/student/courses", {
      params: { include: "category" },
    });
    const included = data.included ?? [];
    return data.data.map((course) => normalizeCourse(course, included));
  },

  async getEnrolledCourse(id: string): Promise<CourseWithModules> {
    const { data } = await api.get<
      JsonApiDocument<CourseResource, CourseDetailIncludedResource>
    >(`/api/v1/student/courses/${id}`, {
      params: { include: "category,modules" },
    });
    const included = data.included ?? [];
    const course = normalizeCourse(
      data.data,
      included as CourseIncludedResource[],
    );
    const modules = (included.filter((r) => r.type === "modules") as ModuleResource[]).map(
      (m) => normalizeModule(m),
    );
    return { ...course, modules };
  },
};
