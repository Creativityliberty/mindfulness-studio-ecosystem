import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Nom requis")
    .min(2, "Le nom doit contenir au moins 2 caractères"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const categoryDefaultValues: CategoryFormData = {
  name: "",
};
