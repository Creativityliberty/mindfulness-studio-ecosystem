import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { PlusIcon, Trash2Icon, FileIcon } from "lucide-react";

import { isValidationError } from "types/json-api";
import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import {
  lessonSchema,
  LESSON_MATERIAL_TYPES,
  LESSON_MATERIAL_ACCEPT,
  type LessonFormData,
} from "schemas/super-admin/lesson-schema";
import type { Lesson } from "types/lesson";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
import { useUpdateLesson } from "hooks/super-admin";
import { useModules } from "hooks/super-admin";

interface UpdateLessonProps {
  lesson: Lesson | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MATERIAL_TYPE_LABELS: Record<string, string> = {
  video: "Vidéo",
  audio: "Audio",
  pdf: "PDF",
  image: "Image",
};

export function UpdateLesson({ lesson, open, onOpenChange }: UpdateLessonProps) {
  const updateLesson = useUpdateLesson();
  const { data: modules = [] } = useModules();

  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      module_id: "",
      name: "",
      description: "",
      duration_minutes: 1,
      materials: [],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "materials",
  });

  const resetMutation = updateLesson.reset;
  React.useEffect(() => {
    if (lesson && open) {
      form.reset({
        module_id: lesson.module?.id ?? "",
        name: lesson.name,
        description: lesson.description ?? "",
        content: lesson.content ?? "",
        duration_minutes: lesson.duration_minutes ?? 1,
        materials: lesson.materials.map((m) => ({
          id: m.id,
          name: m.name,
          type: m.type,
          file: undefined,
          external_url: m.external_url ?? "",
          existing_file_url: m.file_url ?? undefined,
        })),
      });
      resetMutation();
    }
  }, [lesson, open, form, resetMutation]);

  React.useEffect(() => {
    const error = updateLesson.error;
    if (!error) return;

    if (isValidationError(error)) {
      Object.entries(error.response.data.errors).forEach(
        ([field, messages]: [string, string[]]) => {
          form.setError(field as keyof LessonFormData, {
            message: messages[0],
          });
        },
      );
      return;
    }

    const display = toErrorDisplay(error);
    myGoeyToast("error", display.title, { description: display.message });
  }, [updateLesson.error, form]);

  const onSubmit = async (data: LessonFormData) => {
    if (!lesson) return;

    try {
      await updateLesson.mutateAsync({ id: lesson.id, data });
      onOpenChange(false);
      myGoeyToast("success", "Leçon mise à jour", {
        description: "Les modifications ont été enregistrées avec succès.",
      });
    } catch {
      // Géré par useEffect sur updateLesson.error
    }
  };

  if (!lesson) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup
        className="sm:max-w-2xl"
        containerClassName="sm:max-w-2xl max-h-[85vh] gap-4 overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Modifier la leçon</DialogTitle>
          <DialogDescription>Modifiez les informations de la leçon.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            {/* Module */}
            <Controller
              name="module_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Module</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={updateLesson.isPending}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                      <SelectValue placeholder="Sélectionner un module" />
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
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
                  <FieldLabel htmlFor="update-lesson-name">Nom</FieldLabel>
                  <Input
                    {...field}
                    id="update-lesson-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nom de la leçon"
                    disabled={updateLesson.isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-lesson-description">Description</FieldLabel>
                  <Textarea
                    {...field}
                    id="update-lesson-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Description de la leçon (optionnel)"
                    disabled={updateLesson.isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Contenu */}
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-lesson-content">Contenu (optionnel)</FieldLabel>
                  <Textarea
                    {...field}
                    id="update-lesson-content"
                    aria-invalid={fieldState.invalid}
                    placeholder="Contenu de la leçon..."
                    disabled={updateLesson.isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Durée */}
            <Controller
              name="duration_minutes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-lesson-duration">Durée (minutes)</FieldLabel>
                  <Input
                    {...field}
                    id="update-lesson-duration"
                    type="number"
                    min={1}
                    aria-invalid={fieldState.invalid}
                    disabled={updateLesson.isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Matériaux */}
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Matériaux</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append(
                      { name: "", type: "pdf", file: undefined },
                      { shouldFocus: false },
                    )
                  }
                  disabled={updateLesson.isPending}
                >
                  <PlusIcon className="mr-1 h-3.5 w-3.5" />
                  Ajouter
                </Button>
              </div>

              {fields.map((field, index) => {
                const existingUrl = form.watch(`materials.${index}.existing_file_url`);
                return (
                  <div key={field.id} className="rounded-md border p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Matériau {index + 1}
                        {field.id && (
                          <span className="ml-1 text-xs text-muted-foreground">(existant)</span>
                        )}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive"
                        onClick={() => remove(index)}
                        disabled={updateLesson.isPending}
                      >
                        <Trash2Icon className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-[2fr_1fr_2fr] gap-2">
                      {/* Nom */}
                      <Controller
                        name={`materials.${index}.name`}
                        control={form.control}
                        render={({ field: f, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={`upd-mat-name-${index}`}>Nom</FieldLabel>
                            <Input
                              {...f}
                              id={`upd-mat-name-${index}`}
                              aria-invalid={fieldState.invalid}
                              placeholder="Nom du fichier"
                              disabled={updateLesson.isPending}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />

                      {/* Type */}
                      <Controller
                        name={`materials.${index}.type`}
                        control={form.control}
                        render={({ field: f, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Type</FieldLabel>
                            <Select
                              value={f.value}
                              onValueChange={f.onChange}
                              disabled={updateLesson.isPending}
                            >
                              <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                {LESSON_MATERIAL_TYPES.map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {MATERIAL_TYPE_LABELS[t]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />

                      {/* Fichier */}
                      <Controller
                        name={`materials.${index}.file`}
                        control={form.control}
                        render={({ field: f, fieldState }) => {
                          const currentType = form.watch(`materials.${index}.type`);
                          return (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={`upd-mat-file-${index}`}>
                                {existingUrl ? "Nouveau fichier (optionnel)" : "Fichier"}
                              </FieldLabel>
                              <Input
                                id={`upd-mat-file-${index}`}
                                type="file"
                                accept={LESSON_MATERIAL_ACCEPT[currentType]}
                                aria-invalid={fieldState.invalid}
                                disabled={updateLesson.isPending}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  f.onChange(file ?? undefined);
                                }}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          );
                        }}
                      />
                    </div>

                    {/* Fichier existant */}
                    {existingUrl && (
                      <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-xs">
                        <FileIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <a
                          href={existingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="truncate text-primary underline-offset-2 hover:underline"
                        >
                          Fichier actuel
                        </a>
                      </div>
                    )}

                      {/* URL externe */}
                      <Controller
                        name={`materials.${index}.external_url`}
                        control={form.control}
                        render={({ field: f, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={`upd-mat-url-${index}`}>
                              URL externe (optionnel)
                            </FieldLabel>
                            <Input
                              {...f}
                              id={`upd-mat-url-${index}`}
                              aria-invalid={fieldState.invalid}
                              placeholder="https://..."
                              disabled={updateLesson.isPending}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />

                  </div>
                );
              })}

              {fields.length === 0 && (
                <p className="text-center text-xs text-muted-foreground py-4">
                  Aucun matériau. Cliquez sur "Ajouter" pour en ajouter un.
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateLesson.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={updateLesson.isPending}>
              {updateLesson.isPending ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
