import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { isValidationError } from "types/json-api";
import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import {
  courseSchema,
  courseDefaultValues,
  type CourseFormData,
} from "schemas/super-admin/course-schema";
import { COURSE_STATUS } from "types/statuses";

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
import { UploadIcon } from "lucide-react";
import { Dropzone } from "@/components/kibo-ui/dropzone";
import { useCreateCourse } from "hooks/super-admin";
import { useCategories } from "hooks/super-admin";

interface CreateCourseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCourse({ open, onOpenChange }: CreateCourseProps) {
  const createCourse = useCreateCourse();
  const { data: categories = [] } = useCategories();
  const [imagePreview, setImagePreview] = React.useState<string | undefined>();
  const [imageFile, setImageFile] = React.useState<File | undefined>();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: courseDefaultValues,
    mode: "onChange",
  });

  React.useEffect(() => {
    const error = createCourse.error;
    if (!error) return;

    if (isValidationError(error)) {
      Object.entries(error.response.data.errors).forEach(
        ([field, messages]: [string, string[]]) => {
          form.setError(field as keyof CourseFormData, {
            message: messages[0],
          });
        },
      );
      return;
    }

    const display = toErrorDisplay(error);
    myGoeyToast("error", display.title, { description: display.message });
  }, [createCourse.error, form]);

  const resetMutation = createCourse.reset;
  React.useEffect(() => {
    if (!open) {
      form.reset();
      resetMutation();
      setImagePreview(undefined);
      setImageFile(undefined);
    }
  }, [open, form, resetMutation]);

  const handleImageDrop = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setImageFile(file);
    form.setValue("image", file, { shouldValidate: true });
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImagePreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: CourseFormData) => {
    try {
      await createCourse.mutateAsync(data);
      form.reset();
      onOpenChange(false);
      myGoeyToast("success", "Formation créée", {
        description: "La nouvelle formation a été créée avec succès.",
      });
    } catch {
      // Géré par useEffect sur createCourse.error
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup
        className="sm:max-w-3xl"
        containerClassName="sm:max-w-3xl max-h-[85vh] gap-4 overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Créer une formation</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer une nouvelle formation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <Controller
              name="category_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Catégorie</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={createCourse.isPending}
                  >
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
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
                  <FieldLabel htmlFor="create-course-name">Nom</FieldLabel>
                  <Input
                    {...field}
                    id="create-course-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nom de la formation"
                    disabled={createCourse.isPending}
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
                  <FieldLabel htmlFor="create-course-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="create-course-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Description de la formation (optionnel)"
                    disabled={createCourse.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-course-price">
                      Prix (€)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="create-course-price"
                      type="number"
                      min={0}
                      step="0.01"
                      aria-invalid={fieldState.invalid}
                      placeholder="0.00"
                      disabled={createCourse.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="duration_weeks"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-course-duration">
                      Durée (semaines)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="create-course-duration"
                      type="number"
                      min={1}
                      aria-invalid={fieldState.invalid}
                      placeholder="1"
                      disabled={createCourse.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="image"
              control={form.control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Image</FieldLabel>
                  <Dropzone
                    accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
                    maxSize={10 * 1024 * 1024}
                    onDrop={handleImageDrop}
                    onError={console.error}
                    src={imageFile ? [imageFile] : undefined}
                  >
                    {imagePreview ? (
                      <div className="relative h-36 w-full overflow-hidden rounded">
                        <img
                          alt="Preview"
                          className="absolute inset-0 h-full w-full object-cover"
                          src={imagePreview}
                        />
                        <p className="absolute bottom-1 w-full text-center text-xs text-white drop-shadow">
                          Cliquer ou glisser pour remplacer
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                          <UploadIcon size={16} />
                        </div>
                        <p className="text-sm font-medium">
                          Glisser ou cliquer pour uploader
                        </p>
                        <p className="text-xs text-muted-foreground">
                          JPG, JPEG, PNG — max 10 Mo
                        </p>
                      </div>
                    )}
                  </Dropzone>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Statut</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={createCourse.isPending}
                  >
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      {COURSE_STATUS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
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
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createCourse.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={createCourse.isPending}>
              {createCourse.isPending ? "Création..." : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
