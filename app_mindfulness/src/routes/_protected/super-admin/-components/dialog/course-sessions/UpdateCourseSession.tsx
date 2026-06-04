import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { isValidationError } from "types/json-api";
import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import {
  courseSessionSchema,
  type CourseSessionFormData,
} from "schemas/super-admin/course-session-schema";
import type { CourseSession } from "types/course-session";

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
import { useUpdateCourseSession } from "hooks/super-admin/use-course-sessions";
import { useCourses } from "hooks/super-admin/use-courses";

interface UpdateCourseSessionProps {
  session: CourseSession | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateCourseSession({ session, open, onOpenChange }: UpdateCourseSessionProps) {
  const updateSession = useUpdateCourseSession();
  const { data: courses = [] } = useCourses();

  const form = useForm<CourseSessionFormData>({
    resolver: zodResolver(courseSessionSchema),
    defaultValues: { course_id: "", name: "", start_date: "", end_date: "", max_seats: 30 },
    mode: "onChange",
  });

  const resetMutation = updateSession.reset;
  React.useEffect(() => {
    if (session && open) {
      form.reset({
        course_id: session.course?.id ?? "",
        name: session.name,
        start_date: session.start_date,
        end_date: session.end_date,
        max_seats: session.max_seats,
      });
      resetMutation();
    }
  }, [session, open, form, resetMutation]);

  React.useEffect(() => {
    const error = updateSession.error;
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
  }, [updateSession.error, form]);

  const onSubmit = async (data: CourseSessionFormData) => {
    if (!session) return;
    try {
      await updateSession.mutateAsync({ id: session.id, data });
      onOpenChange(false);
      myGoeyToast("success", "Session mise à jour", {
        description: "Les modifications ont été enregistrées avec succès.",
      });
    } catch {
      // Géré par useEffect sur updateSession.error
    }
  };

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup containerClassName="max-h-[85vh] gap-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier la session</DialogTitle>
          <DialogDescription>Modifiez les informations de la session.</DialogDescription>
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
                  <Select value={field.value} onValueChange={field.onChange} disabled={updateSession.isPending}>
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
                  <FieldLabel htmlFor="update-session-name">Nom</FieldLabel>
                  <Input
                    {...field}
                    id="update-session-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nom de la session"
                    disabled={updateSession.isPending}
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
                    <FieldLabel htmlFor="update-session-start">Date de début</FieldLabel>
                    <Input
                      {...field}
                      id="update-session-start"
                      type="date"
                      aria-invalid={fieldState.invalid}
                      disabled={updateSession.isPending}
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
                    <FieldLabel htmlFor="update-session-end">Date de fin</FieldLabel>
                    <Input
                      {...field}
                      id="update-session-end"
                      type="date"
                      aria-invalid={fieldState.invalid}
                      disabled={updateSession.isPending}
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
                  <FieldLabel htmlFor="update-session-seats">Places maximum</FieldLabel>
                  <Input
                    {...field}
                    id="update-session-seats"
                    type="number"
                    min={1}
                    aria-invalid={fieldState.invalid}
                    disabled={updateSession.isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={updateSession.isPending}>
              Annuler
            </Button>
            <Button type="submit" disabled={updateSession.isPending}>
              {updateSession.isPending ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
