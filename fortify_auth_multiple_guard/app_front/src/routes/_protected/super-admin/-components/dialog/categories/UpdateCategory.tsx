import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useUpdateCategory } from "hooks/use-categories";
import { isValidationError } from "types/json-api";
import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import {
  categorySchema,
  type CategoryFormData,
} from "schemas/super-admin/category-schema";
import type { Category } from "types/category";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/optics/dialog";

interface UpdateCategoryProps {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateCategory({
  category,
  open,
  onOpenChange,
}: UpdateCategoryProps) {
  const updateCategory = useUpdateCategory();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
    mode: "onChange",
  });

  // Pré-remplir le formulaire à l'ouverture
  const resetMutation = updateCategory.reset;
  React.useEffect(() => {
    if (category && open) {
      form.reset({ name: category.name });
      resetMutation();
    }
  }, [category, open, form, resetMutation]);

  // Sync erreurs mutation → react-hook-form (même pattern que login-form)
  React.useEffect(() => {
    const error = updateCategory.error;
    if (!error) return;

    if (isValidationError(error)) {
      Object.entries(error.response.data.errors).forEach(
        ([field, messages]: [string, string[]]) => {
          form.setError(field as keyof CategoryFormData, {
            message: messages[0],
          });
        },
      );
      return;
    }

    const display = toErrorDisplay(error);
    myGoeyToast("error", display.title, { description: display.message });
  }, [updateCategory.error, form]);

  const onSubmit = async (data: CategoryFormData) => {
    if (!category) return;

    try {
      await updateCategory.mutateAsync({ id: category.id, data });
      onOpenChange(false);
      myGoeyToast("success", "Catégorie mise à jour", {
        description: "Les modifications ont été enregistrées avec succès.",
      });
    } catch {
      // Géré par useEffect sur updateCategory.error
    }
  };

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Modifier la catégorie</DialogTitle>
          <DialogDescription>
            Modifiez les informations de la catégorie.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-category-name">Nom</FieldLabel>
                  <Input
                    {...field}
                    id="update-category-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nom de la catégorie"
                    disabled={updateCategory.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateCategory.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={updateCategory.isPending}>
              {updateCategory.isPending ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
