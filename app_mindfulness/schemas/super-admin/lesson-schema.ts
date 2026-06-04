import { z } from "zod";

export const LESSON_MATERIAL_TYPES = ["video", "audio", "pdf", "image"] as const;

export const LESSON_MATERIAL_ACCEPT: Record<string, string> = {
  video: "video/*",
  audio: "audio/*",
  pdf: "application/pdf",
  image: "image/jpeg,image/png",
};

export const materialSchema = z.object({
  id: z.string().uuid().optional(), // existing material (update only)
  name: z.string().min(1, "Nom requis"),
  type: z.enum(LESSON_MATERIAL_TYPES),
  file: z.instanceof(File).optional(),
  external_url: z.string().optional(),
  existing_file_url: z.string().optional(), // display only, not sent to API
});

export const lessonSchema = z.object({
  module_id: z.string().uuid("Le module sélectionné est invalide"),

  name: z
    .string()
    .min(1, "Nom requis")
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  description: z.string().optional(),

  content: z.string().optional(),

  duration_minutes: z.coerce
    .number()
    .int("La durée doit être un entier")
    .min(1, "La durée doit être au moins de 1 minute"),

  materials: z.array(materialSchema),
});

export type MaterialFormData = z.infer<typeof materialSchema>;
export type LessonFormData = z.infer<typeof lessonSchema>;

export const lessonDefaultValues: LessonFormData = {
  module_id: "",
  name: "",
  description: "",
  content: "",
  duration_minutes: 1,
  materials: [],
};
