import { api } from "@/lib/api";
import type { JsonApiDocument } from "../../types/json-api";
import type {
  Enrollment,
  EnrollmentIncludedResource,
  EnrollmentResource,
} from "types/enrollment";
import { normalizeEnrollment } from "normalizers/enrollment-normalizer";

export const enrollmentService = {
  async getEnrollments(): Promise<Enrollment[]> {
    const { data } = await api.get<
      JsonApiDocument<EnrollmentResource[], EnrollmentIncludedResource>
    >("/api/v1/admin/enrollments", { params: { include: "user,courseSession.course,payment" } });
    const included = data.included ?? [];
    return data.data.map((e) => normalizeEnrollment(e, included));
  },
};
