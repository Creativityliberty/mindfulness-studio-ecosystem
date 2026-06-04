import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { isValidationError } from "types/json-api";
import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import {
  moduleSchema,
  type ModuleFormData,
} from "schemas/super-admin/module-schema";
import type { Module } from "types/Module";

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
import { useUpdateModule } from "hooks/super-admin";
import { useCourses } from "hooks/super-admin";

interface UpdateModuleProps {
  module: Module | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateModule({
  module,
  open,
  onOpenChange,
}: UpdateModuleProps) {
  const updateModule = useUpdateModule();
  const { data: courses = [] } = useCourses();

  const form = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      course_id: "",
      name: "",
      description: "",
      duration_minutes: 1,
    },
    mode: "onChange",
  });

  const resetMutation = updateModule.reset;
  React.useEffect(() => {
    if (module && open) {
      form.reset({
        course_id: module.course?.id ?? "",
        name: module.name,
        description: module.description ?? "",
        duration_minutes: module.duration_minutes ?? 1,
      });
      resetMutation();
    }
  }, [module, open, form, resetMutation]);

  React.useEffect(() => {
    const error = updateModule.error;
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
  }, [updateModule.error, form]);

  const onSubmit = async (data: ModuleFormData) => {
    if (!module) return;

    try {
      await updateModule.mutateAsync({ id: module.id, data });
      onOpenChange(false);
      myGoeyToast("success", "Module mis à jour", {
        description: "Les modifications ont été enregistrées avec succès.",
      });
    } catch {
      // Géré par useEffect sur updateModule.error
    }
  };

  if (!module) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup
        className="sm:max-w-3xl"
        containerClassName="sm:max-w-3xl max-h-[85vh] gap-4 overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Modifier le module</DialogTitle>
          <DialogDescription>
            Modifiez les informations du module.
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
                    disabled={updateModule.isPending}
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
                  <FieldLabel htmlFor="update-module-name">Nom</FieldLabel>
                  <Input
                    {...field}
                    id="update-module-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nom du module"
                    disabled={updateModule.isPending}
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
                  <FieldLabel htmlFor="update-module-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="update-module-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Description du module (optionnel)"
                    disabled={updateModule.isPending}
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
                  <FieldLabel htmlFor="update-module-duration">
                    Durée (minutes)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="update-module-duration"
                    type="number"
                    min={1}
                    aria-invalid={fieldState.invalid}
                    placeholder="1"
                    disabled={updateModule.isPending}
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
              disabled={updateModule.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={updateModule.isPending}>
              {updateModule.isPending ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
