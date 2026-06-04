import { z } from "zod";

export const courseSessionSchema = z.object({
  course_id: z.string().uuid("La formation sélectionnée est invalide"),
  name: z
    .string()
    .min(1, "Nom requis")
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  start_date: z.string().min(1, "Date de début requise"),
  end_date: z.string().min(1, "Date de fin requise"),
  max_seats: z.coerce
    .number()
    .int()
    .min(1, "Le nombre de places doit être au moins 1")
    .default(30),
});

export type CourseSessionFormData = z.infer<typeof courseSessionSchema>;

export const courseSessionDefaultValues: CourseSessionFormData = {
  course_id: "",
  name: "",
  start_date: "",
  end_date: "",
  max_seats: 30,
};
