import { z } from "zod";

export const PAYMENT_PROVIDERS = ["paypal", "stripe"] as const;

export const enrollmentSchema = z.object({
  user_id: z.string().uuid("L'utilisateur sélectionné est invalide"),
  course_session_id: z.string().uuid("La session sélectionnée est invalide"),
  provider: z.enum(PAYMENT_PROVIDERS),
  currency: z.string().length(3, "La devise doit contenir exactement 3 caractères").optional(),
});

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

export const enrollmentDefaultValues: EnrollmentFormData = {
  user_id: "",
  course_session_id: "",
  provider: "stripe",
};
