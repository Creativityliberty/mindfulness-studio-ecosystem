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

import getUpdatePeriodDefaultValues, {
  updatePeriodSchema,
  type UpdatePeriodFormData,
} from "../../../../../../../schemas/period-schema";
import { useUpdatePeriod } from "../../../../../../../hooks/use-periods";
import { useCenters } from "../../../../../../../hooks/use-centers";
import { isSuperAdmin } from "../../../../../../../utils/role-check";
import type { Period } from "../../../../../../../types/period";

interface UpdatePeriodProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  period: Period | null;
}

export function UpdatePeriod({ open, onOpenChange, period }: UpdatePeriodProps) {
  const updatePeriod = useUpdatePeriod();
  const { data: centers } = useCenters();
  const superAdmin = isSuperAdmin();

  const form = useForm<UpdatePeriodFormData>({
    resolver: zodResolver(updatePeriodSchema),
    defaultValues: period ? getUpdatePeriodDefaultValues(period) : {},
    mode: "onChange",
  });

  React.useEffect(() => {
    if (open && period) {
      form.reset(getUpdatePeriodDefaultValues(period));
    }
  }, [open, period, form]);

  const onSubmit = async (data: UpdatePeriodFormData) => {
    if (!period) return;

    try {
      await updatePeriod.mutateAsync({
        id: period.id,
        data: {
          ...data,
          centerId: superAdmin ? data.centerId : undefined,
        },
      });

      myGoeyToast("success", "Session modifiée", {
        description: "Les informations ont été mises à jour avec succès.",
      });

      onOpenChange(false);
    } catch (error) {
      if (isAxiosError<JsonApiErrorResponse>(error)) {
        const fieldErrors = extractJsonApiFieldErrors(error);
        if (fieldErrors.length > 0) {
          fieldErrors.forEach(({ field, message }) => {
            form.setError(field as keyof UpdatePeriodFormData, {
              type: "manual",
              message,
            });
          });
        } else {
          myGoeyToast("error", "Erreur de modification", {
            description: "Une erreur est survenue. Veuillez réessayer.",
          });
        }
      } else {
        myGoeyToast("error", "Erreur inattendue", {
          description: "Une erreur inattendue est survenue.",
        });
      }
    }
  };

  if (!period) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup
        className="sm:max-w-3xl"
        containerClassName="sm:max-w-3xl max-h-[85vh] gap-4"
      >
        <DialogHeader>
          <DialogTitle>Modifier la session</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations de la session.
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
                    <FieldLabel htmlFor="update-period-name">Nom</FieldLabel>
                    <Input
                      {...field}
                      id="update-period-name"
                      placeholder="Nom de la session"
                      disabled={updatePeriod.isPending}
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
                    <FieldLabel htmlFor="update-period-start">Date de début</FieldLabel>
                    <Input
                      {...field}
                      id="update-period-start"
                      type="date"
                      disabled={updatePeriod.isPending}
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
                    <FieldLabel htmlFor="update-period-end">Date de fin</FieldLabel>
                    <Input
                      {...field}
                      id="update-period-end"
                      type="date"
                      disabled={updatePeriod.isPending}
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
                      <FieldLabel htmlFor="update-period-center">Centre</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={updatePeriod.isPending}
                      >
                        <SelectTrigger
                          id="update-period-center"
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
              disabled={updatePeriod.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={updatePeriod.isPending}>
              {updatePeriod.isPending ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
