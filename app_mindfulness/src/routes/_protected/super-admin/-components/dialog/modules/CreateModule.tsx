import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { isValidationError } from "types/json-api";
import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import {
  moduleSchema,
  moduleDefaultValues,
  type ModuleFormData,
} from "schemas/super-admin/module-schema";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/optics/dialog";
import { useCreateModule } from "hooks/super-admin";
import { useCourses } from "hooks/super-admin";

interface CreateModuleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateModule({ open, onOpenChange }: CreateModuleProps) {
  const createModule = useCreateModule();
  const { data: courses = [] } = useCourses();

  const form = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: moduleDefaultValues,
    mode: "onChange",
  });

  React.useEffect(() => {
    const error = createModule.error;
    if (!error) return;

    if (isValidationError(error)) {
      Object.entries(error.response.data.errors).forEach(
        ([field, messages]: [string, string[]]) => {
          form.setError(field as keyof ModuleFormData, {
            message: messages[0],
          });
        },
      );
      return;
    }

    const display = toErrorDisplay(error);
    myGoeyToast("error", display.title, { description: display.message });
  }, [createModule.error, form]);

  const resetMutation = createModule.reset;
  React.useEffect(() => {
    if (!open) {
      form.reset();
      resetMutation();
    }
  }, [open, form, resetMutation]);

  const onSubmit = async (data: ModuleFormData) => {
    try {
      await createModule.mutateAsync(data);
      form.reset();
      onOpenChange(false);
      myGoeyToast("success", "Module créé", {
        description: "Le nouveau module a été créé avec succès.",
      });
    } catch {
      // Géré par useEffect sur createModule.error
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup
        className="sm:max-w-3xl"
        containerClassName="sm:max-w-3xl max-h-[85vh] gap-4 overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Créer un module</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer un nouveau module.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <Controller
              name="course_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Formation</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={createModule.isPending}
                  >
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Sélectionner une formation" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-module-name">Nom</FieldLabel>
                  <Input
                    {...field}
                    id="create-module-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nom du module"
                    disabled={createModule.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-module-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="create-module-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Description du module (optionnel)"
                    disabled={createModule.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="duration_minutes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-module-duration">
                    Durée (minutes)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="create-module-duration"
                    type="number"
                    min={1}
                    aria-invalid={fieldState.invalid}
                    placeholder="1"
                    disabled={createModule.isPending}
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
              disabled={createModule.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={createModule.isPending}>
              {createModule.isPending ? "Création..." : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
