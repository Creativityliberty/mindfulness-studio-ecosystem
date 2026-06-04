import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { PlusIcon, Trash2Icon } from "lucide-react";

import { isValidationError } from "types/json-api";
import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import {
  lessonSchema,
  lessonDefaultValues,
  LESSON_MATERIAL_TYPES,
  LESSON_MATERIAL_ACCEPT,
  type LessonFormData,
} from "schemas/super-admin/lesson-schema";

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
import { useCreateLesson } from "hooks/super-admin";
import { useModules } from "hooks/super-admin";

interface CreateLessonProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MATERIAL_TYPE_LABELS: Record<string, string> = {
  video: "Vidéo",
  audio: "Audio",
  pdf: "PDF",
  image: "Image",
};

export function CreateLesson({ open, onOpenChange }: CreateLessonProps) {
  const createLesson = useCreateLesson();
  const { data: modules = [] } = useModules();

  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: lessonDefaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "materials",
  });

  React.useEffect(() => {
    const error = createLesson.error;
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
  }, [createLesson.error, form]);

  const resetMutation = createLesson.reset;
  React.useEffect(() => {
    if (!open) {
      form.reset();
      resetMutation();
    }
  }, [open, form, resetMutation]);

  const onSubmit = async (data: LessonFormData) => {
    try {
      await createLesson.mutateAsync(data);
      form.reset();
      onOpenChange(false);
      myGoeyToast("success", "Leçon créée", {
        description: "La nouvelle leçon a été créée avec succès.",
      });
    } catch {
      // Géré par useEffect sur createLesson.error
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup
        className="sm:max-w-3xl"
        containerClassName="sm:max-w-3xl max-h-[85vh] gap-4 overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Créer une leçon</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer une nouvelle leçon.
          </DialogDescription>
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
                    disabled={createLesson.isPending}
                  >
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Nom */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-lesson-name">Nom</FieldLabel>
                  <Input
                    {...field}
                    id="create-lesson-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nom de la leçon"
                    disabled={createLesson.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-lesson-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="create-lesson-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Description de la leçon (optionnel)"
                    disabled={createLesson.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Contenu */}
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-lesson-content">
                    Contenu (optionnel)
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="create-lesson-content"
                    aria-invalid={fieldState.invalid}
                    placeholder="Contenu de la leçon..."
                    disabled={createLesson.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Durée */}
            <Controller
              name="duration_minutes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-lesson-duration">
                    Durée (minutes)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="create-lesson-duration"
                    type="number"
                    min={1}
                    aria-invalid={fieldState.invalid}
                    placeholder="1"
                    disabled={createLesson.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                  disabled={createLesson.isPending}
                >
                  <PlusIcon className="mr-1 h-3.5 w-3.5" />
                  Ajouter
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="rounded-md border p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Matériau {index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-destructive"
                      onClick={() => remove(index)}
                      disabled={createLesson.isPending}
                    >
                      <Trash2Icon className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-[2fr_1fr_2fr] gap-2">
                    {/* Nom du matériau */}
                    <Controller
                      name={`materials.${index}.name`}
                      control={form.control}
                      render={({ field: f, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`mat-name-${index}`}>
                            Nom
                          </FieldLabel>
                          <Input
                            {...f}
                            id={`mat-name-${index}`}
                            aria-invalid={fieldState.invalid}
                            placeholder="Nom du fichier"
                            disabled={createLesson.isPending}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
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
                            disabled={createLesson.isPending}
                          >
                            <SelectTrigger
                              aria-invalid={fieldState.invalid}
                              className="w-full"
                            >
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
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Fichier */}
                    <Controller
                      name={`materials.${index}.file`}
                      control={form.control}
                      render={({ field: f, fieldState }) => {
                        const currentType = form.watch(
                          `materials.${index}.type`,
                        );
                        return (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={`mat-file-${index}`}>
                              Fichier
                            </FieldLabel>
                            <Input
                              id={`mat-file-${index}`}
                              type="file"
                              accept={LESSON_MATERIAL_ACCEPT[currentType]}
                              aria-invalid={fieldState.invalid}
                              disabled={createLesson.isPending}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                f.onChange(file ?? undefined);
                              }}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </div>

                  {/* URL externe */}
                  <Controller
                    name={`materials.${index}.external_url`}
                    control={form.control}
                    render={({ field: f, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={`mat-url-${index}`}>
                          URL externe (optionnel)
                        </FieldLabel>
                        <Input
                          {...f}
                          id={`mat-url-${index}`}
                          aria-invalid={fieldState.invalid}
                          placeholder="https://..."
                          disabled={createLesson.isPending}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                </div>
              ))}

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
              disabled={createLesson.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={createLesson.isPending}>
              {createLesson.isPending ? "Création..." : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
