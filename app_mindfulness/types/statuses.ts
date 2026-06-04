import { CheckCircle2, XCircle, ShieldBan } from "lucide-react";

export const USER_STATUS = [
  { label: "Actif", value: "active", icon: CheckCircle2 },
  { label: "Inactif", value: "inactive", icon: XCircle },
  { label: "Restreint", value: "restricted", icon: ShieldBan },
] as const;

export type UserStatus = (typeof USER_STATUS)[number]["value"];

export const COURSE_STATUS = [
  { label: "Actif", value: "active", icon: CheckCircle2 },
  { label: "Inactif", value: "inactive", icon: XCircle },
] as const;

export type CourseStatus = (typeof COURSE_STATUS)[number]["value"];

export const ENROLLMENT_STATUS = [
  { label: "En attente", value: "pending" },
  { label: "Actif", value: "active" },
  { label: "Annulé", value: "cancelled" },
] as const;
export type EnrollmentStatus = (typeof ENROLLMENT_STATUS)[number]["value"];

export const PAYMENT_STATUS = [
  { label: "En attente", value: "pending" },
  { label: "Payé", value: "paid" },
  { label: "Échoué", value: "failed" },
  { label: "Remboursé", value: "refunded" },
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUS)[number]["value"];

export const PAYMENT_PROVIDER = [
  { label: "PayPal", value: "paypal" },
  { label: "Stripe", value: "stripe" },
] as const;
export type PaymentProvider = (typeof PAYMENT_PROVIDER)[number]["value"];
