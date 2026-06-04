import { findIncluded } from "utils/included-finder";
import { normalizeCourseSession } from "./course-session-normalizer";
import type {
  CourseSession,
  CourseSessionIncludedResource,
  CourseSessionResource,
} from "types/course-session";
import type { User, UserResource } from "types/user";
import type {
  Enrollment,
  EnrollmentIncludedResource,
  EnrollmentResource,
  Payment,
  PaymentResource,
} from "types/enrollment";

function normalizeUser(resource: UserResource): User {
  return {
    id: resource.id,
    first_name: resource.attributes.first_name,
    last_name: resource.attributes.last_name,
    email: resource.attributes.email,
    status: resource.attributes.status,
    role: resource.attributes.role,
    permissions: resource.attributes.permissions ?? [],
    created_at: resource.attributes.created_at,
    updated_at: resource.attributes.updated_at,
  };
}

function normalizePayment(resource: PaymentResource): Payment {
  return {
    id: resource.id,
    amount: resource.attributes.amount,
    currency: resource.attributes.currency,
    provider: resource.attributes.provider,
    transaction_id: resource.attributes.transaction_id,
    status: resource.attributes.status,
    paid_at: resource.attributes.paid_at,
    created_at: resource.attributes.created_at,
    updated_at: resource.attributes.updated_at,
  };
}

export function normalizeEnrollment(
  resource: EnrollmentResource,
  included: EnrollmentIncludedResource[] = [],
): Enrollment {
  let user: User | null = null;
  let courseSession: CourseSession | null = null;
  let payment: Payment | null = null;

  const userRel = resource.relationships?.user?.data;
  if (userRel && !Array.isArray(userRel)) {
    const userResource = findIncluded<UserResource>(included, "users", userRel.id);
    if (userResource) user = normalizeUser(userResource);
  }

  const sessionRel = resource.relationships?.courseSession?.data;
  if (sessionRel && !Array.isArray(sessionRel)) {
    const sessionResource = findIncluded<CourseSessionResource>(
      included,
      "course_sessions",
      sessionRel.id,
    );
    if (sessionResource)
      courseSession = normalizeCourseSession(
        sessionResource,
        included as CourseSessionIncludedResource[],
      );
  }

  const paymentRel = resource.relationships?.payment?.data;
  if (paymentRel && !Array.isArray(paymentRel)) {
    const paymentResource = findIncluded<PaymentResource>(
      included,
      "payments",
      paymentRel.id,
    );
    if (paymentResource) payment = normalizePayment(paymentResource);
  }

  return {
    id: resource.id,
    status: resource.attributes.status,
    enrolled_at: resource.attributes.enrolled_at,
    user,
    courseSession,
    payment,
    created_at: resource.attributes.created_at,
    updated_at: resource.attributes.updated_at,
  };
}
