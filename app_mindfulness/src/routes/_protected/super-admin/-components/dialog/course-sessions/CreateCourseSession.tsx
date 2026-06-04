import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { isValidationError } from "types/json-api";
import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import {
  courseSessionSchema,
  courseSessionDefaultValues,
  type CourseSessionFormData,
} from "schemas/super-admin/course-session-schema";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { useCreateCourseSession } from "hooks/super-admin/use-course-sessions";
import { useCourses } from "hooks/super-admin/use-courses";

interface CreateCourseSessionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCourseSession({ open, onOpenChange }: CreateCourseSessionProps) {
  const createSession = useCreateCourseSession();
  const { data: courses = [] } = useCourses();

  const form = useForm<CourseSessionFormData>({
    resolver: zodResolver(courseSessionSchema),
    defaultValues: courseSessionDefaultValues,
    mode: "onChange",
  });

  React.useEffect(() => {
    const error = createSession.error;
    if (!error) return;
    if (isValidationError(error)) {
      Object.entries(error.response.data.errors).forEach(
        ([field, messages]: [string, string[]]) => {
          form.setError(field as keyof CourseSessionFormData, { message: messages[0] });
        },
      );
      return;
    }
    const display = toErrorDisplay(error);
    myGoeyToast("error", display.title, { description: display.message });
  }, [createSession.error, form]);

  const resetMutation = createSession.reset;
  React.useEffect(() => {
    if (!open) {
      form.reset();
      resetMutation();
    }
  }, [open, form, resetMutation]);

  const onSubmit = async (data: CourseSessionFormData) => {
    try {
      await createSession.mutateAsync(data);
      form.reset();
      onOpenChange(false);
      myGoeyToast("success", "Session créée", {
        description: "La nouvelle session a été créée avec succès.",
      });
    } catch {
      // Géré par useEffect sur createSession.error
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup containerClassName="max-h-[85vh] gap-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer une session</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer une nouvelle session de formation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            {/* Formation */}
            <Controller
              name="course_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Formation</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange} disabled={createSession.isPending}>
                    <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                      <SelectValue placeholder="Sélectionner une formation" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Nom */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-session-name">Nom</FieldLabel>
                  <Input
                    {...field}
                    id="create-session-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nom de la session"
                    disabled={createSession.isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              {/* Date début */}
              <Controller
                name="start_date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-session-start">Date de début</FieldLabel>
                    <Input
                      {...field}
                      id="create-session-start"
                      type="date"
                      aria-invalid={fieldState.invalid}
                      disabled={createSession.isPending}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Date fin */}
              <Controller
                name="end_date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-session-end">Date de fin</FieldLabel>
                    <Input
                      {...field}
                      id="create-session-end"
                      type="date"
                      aria-invalid={fieldState.invalid}
                      disabled={createSession.isPending}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Places max */}
            <Controller
              name="max_seats"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-session-seats">Places maximum</FieldLabel>
                  <Input
                    {...field}
                    id="create-session-seats"
                    type="number"
                    min={1}
                    aria-invalid={fieldState.invalid}
                    disabled={createSession.isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={createSession.isPending}>
              Annuler
            </Button>
            <Button type="submit" disabled={createSession.isPending}>
              {createSession.isPending ? "Création..." : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
