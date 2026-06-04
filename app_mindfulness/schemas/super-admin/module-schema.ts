import { z } from "zod";

export const moduleSchema = z.object({
  course_id: z.string().uuid("Le cours sélectionné est invalide"),

  name: z
    .string()
    .min(1, "Nom requis")
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  description: z.string().optional(),

  duration_minutes: z.coerce
    .number()
    .int("La durée doit être un entier")
    .min(1, "La durée doit être au moins de 1 minute"),
});

export type ModuleFormData = z.infer<typeof moduleSchema>;

export const moduleDefaultValues: ModuleFormData = {
  course_id: "",
  name: "",
  description: "",
  duration_minutes: 1,
};
