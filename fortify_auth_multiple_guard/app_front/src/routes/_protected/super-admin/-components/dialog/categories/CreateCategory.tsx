import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useCreateCategory } from "hooks/use-categories";
import { isValidationError } from "types/json-api";
import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import {
  categorySchema,
  categoryDefaultValues,
  type CategoryFormData,
} from "schemas/super-admin/category-schema";

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

interface CreateCategoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCategory({ open, onOpenChange }: CreateCategoryProps) {
  const createCategory = useCreateCategory();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: categoryDefaultValues,
    mode: "onChange",
  });

  // Sync erreurs mutation → react-hook-form (même pattern que login-form)
  React.useEffect(() => {
    const error = createCategory.error;
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
  }, [createCategory.error, form]);

  // Reset à la fermeture
  const resetMutation = createCategory.reset;
  React.useEffect(() => {
    if (!open) {
      form.reset();
      resetMutation();
    }
  }, [open, form, resetMutation]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await createCategory.mutateAsync(data);
      form.reset();
      onOpenChange(false);
      myGoeyToast("success", "Catégorie créée", {
        description: "La nouvelle catégorie a été créée avec succès.",
      });
    } catch {
      // Géré par useEffect sur createCategory.error
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Créer une catégorie</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer une nouvelle catégorie.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-category-name">Nom</FieldLabel>
                  <Input
                    {...field}
                    id="create-category-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nom de la catégorie"
                    disabled={createCategory.isPending}
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
              disabled={createCategory.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={createCategory.isPending}>
              {createCategory.isPending ? "Création..." : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
