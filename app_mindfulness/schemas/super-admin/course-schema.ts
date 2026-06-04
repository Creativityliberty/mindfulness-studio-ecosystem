import { z } from "zod";

export const courseStatusEnum = z.enum(["active", "inactive"]);

export const courseSchema = z.object({
  category_id: z.string().uuid("La catégorie sélectionnée est invalide"),

  name: z
    .string()
    .min(1, "Nom requis")
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  description: z.string().optional(),

  price: z.coerce.number().min(0, "Le prix doit être supérieur ou égal à 0"),

  duration_weeks: z.coerce
    .number()
    .int("La durée doit être un entier")
    .min(1, "La durée doit être au moins de 1 semaine"),

  status: courseStatusEnum,

  image: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Seuls les formats JPG et PNG sont acceptés",
    )
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "L'image ne doit pas dépasser 10 Mo",
    )
    .optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;

export const courseDefaultValues: Omit<CourseFormData, "image"> = {
  category_id: "",
  name: "",
  description: "",
  price: 0,
  status: "active",
  duration_weeks: 1,
};
