import type { User, UserResource } from "./user";
import type { CourseSession, CourseSessionResource } from "./course-session";
import type { CourseResource } from "./course";
import type {
  JsonApiRelationship,
  JsonApiResource,
  JsonApiResourceIdentifier,
} from "./json-api";
import type { EnrollmentStatus, PaymentStatus, PaymentProvider } from "./statuses";

// ─── Payment ────────────────────────────────────────────────

export interface PaymentAttributes {
  amount: number | null;
  currency: string;
  provider: PaymentProvider;
  transaction_id: string | null;
  status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string; // UUID
  amount: number | null;
  currency: string;
  provider: PaymentProvider;
  transaction_id: string | null;
  status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export type PaymentResource = JsonApiResource<"payments", PaymentAttributes>;

// ─── Enrollment ─────────────────────────────────────────────

export interface EnrollmentAttributes {
  status: EnrollmentStatus;
  enrolled_at: string;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string; // UUID
  status: EnrollmentStatus;
  enrolled_at: string;
  user: User | null;
  courseSession: CourseSession | null;
  payment: Payment | null;
  created_at: string;
  updated_at: string;
}

// Relationships
export interface EnrollmentRelationships {
  user: JsonApiRelationship<JsonApiResourceIdentifier>;
  courseSession: JsonApiRelationship<JsonApiResourceIdentifier>;
  payment: JsonApiRelationship<JsonApiResourceIdentifier>;
}

export type EnrollmentResource = JsonApiResource<
  "enrollments",
  EnrollmentAttributes,
  EnrollmentRelationships
>;

// Union type pour tous les included possibles
export type EnrollmentIncludedResource =
  | UserResource
  | CourseSessionResource
  | CourseResource
  | PaymentResource;
