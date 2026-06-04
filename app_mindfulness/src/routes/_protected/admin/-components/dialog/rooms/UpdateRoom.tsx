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

import getUpdateRoomDefaultValues, {
  updateRoomSchema,
  type UpdateRoomFormData,
} from "../../../../../../../schemas/room-schema";
import { useUpdateRoom } from "../../../../../../../hooks/use-rooms";
import { useCenters } from "../../../../../../../hooks/use-centers";
import { isSuperAdmin } from "../../../../../../../utils/role-check";
import type { Room } from "../../../../../../../types/room";

interface UpdateRoomProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: Room | null;
}

export function UpdateRoom({ open, onOpenChange, room }: UpdateRoomProps) {
  const updateRoom = useUpdateRoom();
  const { data: centers } = useCenters();
  const superAdmin = isSuperAdmin();

  const form = useForm<UpdateRoomFormData>({
    resolver: zodResolver(updateRoomSchema),
    defaultValues: room ? getUpdateRoomDefaultValues(room) : {},
    mode: "onChange",
  });

  React.useEffect(() => {
    if (open && room) {
      form.reset(getUpdateRoomDefaultValues(room));
    }
  }, [open, room, form]);

  const onSubmit = async (data: UpdateRoomFormData) => {
    if (!room) return;

    try {
      await updateRoom.mutateAsync({
        id: room.id,
        data: {
          ...data,
          centerId: superAdmin ? data.centerId : undefined,
        },
      });

      myGoeyToast("success", "Salle modifiée", {
        description: "Les informations ont été mises à jour avec succès.",
      });

      onOpenChange(false);
    } catch (error) {
      if (isAxiosError<JsonApiErrorResponse>(error)) {
        const fieldErrors = extractJsonApiFieldErrors(error);
        if (fieldErrors.length > 0) {
          fieldErrors.forEach(({ field, message }) => {
            form.setError(field as keyof UpdateRoomFormData, {
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

  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup
        className="sm:max-w-3xl"
        containerClassName="sm:max-w-3xl max-h-[85vh] gap-4"
      >
        <DialogHeader>
          <DialogTitle>Modifier la salle</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations de la salle.
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
                    <FieldLabel htmlFor="update-room-name">Nom</FieldLabel>
                    <Input
                      {...field}
                      id="update-room-name"
                      placeholder="Nom de la salle"
                      disabled={updateRoom.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Capacité */}
              <Controller
                name="capacity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="update-room-capacity">Capacité</FieldLabel>
                    <Input
                      {...field}
                      id="update-room-capacity"
                      type="number"
                      placeholder="Capacité"
                      disabled={updateRoom.isPending}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Lieu */}
              <Controller
                name="location"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="update-room-location">Lieu</FieldLabel>
                    <Input
                      {...field}
                      id="update-room-location"
                      placeholder="Lieu de la salle"
                      disabled={updateRoom.isPending}
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
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="update-room-center">Centre</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={updateRoom.isPending}
                      >
                        <SelectTrigger
                          id="update-room-center"
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
              disabled={updateRoom.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={updateRoom.isPending}>
              {updateRoom.isPending ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
