import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { isAxiosError, extractJsonApiFieldErrors } from "@/lib/api";
import type { JsonApiErrorResponse } from "../../../../../../../types/json-api";
import { myGoeyToast } from "@/lib/goey-toast-presets";

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
  createCenterSchema,
  createCenterDefaultValues,
  type CreateCenterFormData,
} from "../../../../../../../schemas/center-schema";
import { CENTER_STATUS } from "../../../../../../../types/center-status";
import { useCreateCenter } from "../../../../../../../hooks/use-centers";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/components/optics/dialog";

interface CreateCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCenter({ open, onOpenChange }: CreateCenterProps) {
  const createCenter = useCreateCenter();

  const form = useForm<CreateCenterFormData>({
    resolver: zodResolver(createCenterSchema),
    defaultValues: createCenterDefaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: CreateCenterFormData) => {
    try {
      await createCenter.mutateAsync(data);
      form.reset();
      onOpenChange(false);
      myGoeyToast("success", "Centre créé", {
        description: "Le nouveau centre a été créé avec succès.",
      });
    } catch (error) {
      if (isAxiosError<JsonApiErrorResponse>(error)) {
        const fieldErrors = extractJsonApiFieldErrors(error);
        if (fieldErrors.length > 0) {
          fieldErrors.forEach(({ field, message }) => {
            form.setError(field as keyof CreateCenterFormData, {
              type: "manual",
              message,
            });
          });
        } else {
          myGoeyToast("error", "Erreur de création", {
            description: "Une erreur est survenue. Veuillez réessayer.",
          });
        }
      } else {
        myGoeyToast("error", "Erreur inattendue", {
          description:
            "Une erreur inattendue est survenue. Veuillez réessayer.",
        });
      }
    }
  };

  React.useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup
        className="sm:max-w-3xl"
        containerClassName="sm:max-w-3xl max-h-[85vh] gap-4"
      >
        <DialogHeader>
          <DialogTitle>Créer un nouveau centre</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer un nouveau centre.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="overflow-y-auto flex-1 min-h-0 pr-1 pb-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Nom */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-center-name">Nom</FieldLabel>
                    <Input
                      {...field}
                      id="create-center-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nom du centre"
                      disabled={createCenter.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Statut */}
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-center-status">
                      Statut
                    </FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={createCenter.isPending}
                    >
                      <SelectTrigger
                        id="create-center-status"
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Sélectionnez un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        {CENTER_STATUS.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
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

              {/* Téléphone */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-center-phone">
                      Téléphone
                    </FieldLabel>
                    <Input
                      {...field}
                      id="create-center-phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="Numéro de téléphone"
                      disabled={createCenter.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-center-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="create-center-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Email du centre"
                      disabled={createCenter.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Adresse — pleine largeur */}
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="col-span-2"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor="create-center-address">
                      Adresse
                    </FieldLabel>
                    <Input
                      {...field}
                      id="create-center-address"
                      aria-invalid={fieldState.invalid}
                      placeholder="Adresse du centre"
                      disabled={createCenter.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createCenter.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={createCenter.isPending}>
              {createCenter.isPending ? "Création..." : "Créer le centre"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
