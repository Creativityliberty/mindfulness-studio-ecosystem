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
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/components/optics/dialog";

import {
  createPeriodSchema,
  createPeriodDefaultValues,
  type CreatePeriodFormData,
} from "../../../../../../../schemas/period-schema";
import { useCreatePeriod } from "../../../../../../../hooks/use-periods";
import { useCenters } from "../../../../../../../hooks/use-centers";
import { isSuperAdmin } from "../../../../../../../utils/role-check";

interface CreatePeriodProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePeriod({ open, onOpenChange }: CreatePeriodProps) {
  const createPeriod = useCreatePeriod();
  const { data: centers } = useCenters();
  const superAdmin = isSuperAdmin();

  const form = useForm<CreatePeriodFormData>({
    resolver: zodResolver(createPeriodSchema),
    defaultValues: createPeriodDefaultValues,
    mode: "onChange",
  });

  React.useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const onSubmit = async (data: CreatePeriodFormData) => {
    try {
      await createPeriod.mutateAsync({
        ...data,
        centerId: superAdmin ? data.centerId : undefined,
      });
      form.reset();
      onOpenChange(false);
      myGoeyToast("success", "Session créée", {
        description: "La nouvelle session a été créée avec succès.",
      });
    } catch (error) {
      if (isAxiosError<JsonApiErrorResponse>(error)) {
        const fieldErrors = extractJsonApiFieldErrors(error);
        if (fieldErrors.length > 0) {
          fieldErrors.forEach(({ field, message }) => {
            form.setError(field as keyof CreatePeriodFormData, {
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
          description: "Une erreur inattendue est survenue. Veuillez réessayer.",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup
        className="sm:max-w-3xl"
        containerClassName="sm:max-w-3xl max-h-[85vh] gap-4"
      >
        <DialogHeader>
          <DialogTitle>Créer une nouvelle session</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer une nouvelle session.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="overflow-y-auto flex-1 min-h-0 pr-1 pb-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Nom — pleine largeur */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="col-span-2" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-period-name">Nom</FieldLabel>
                    <Input
                      {...field}
                      id="create-period-name"
                      placeholder="Nom de la session"
                      disabled={createPeriod.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Date de début */}
              <Controller
                name="startDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-period-start">Date de début</FieldLabel>
                    <Input
                      {...field}
                      id="create-period-start"
                      type="date"
                      disabled={createPeriod.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Date de fin */}
              <Controller
                name="endDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-period-end">Date de fin</FieldLabel>
                    <Input
                      {...field}
                      id="create-period-end"
                      type="date"
                      disabled={createPeriod.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Centre — uniquement SuperAdmin */}
              {superAdmin && (
                <Controller
                  name="centerId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="col-span-2" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="create-period-center">Centre</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={createPeriod.isPending}
                      >
                        <SelectTrigger
                          id="create-period-center"
                          className="w-full"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Sélectionnez un centre" />
                        </SelectTrigger>
                        <SelectContent>
                          {centers?.map((center) => (
                            <SelectItem key={center.id} value={center.id}>
                              {center.name}
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
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createPeriod.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={createPeriod.isPending}>
              {createPeriod.isPending ? "Création..." : "Créer la session"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
