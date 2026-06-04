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
  createRoomSchema,
  createRoomDefaultValues,
  type CreateRoomFormData,
} from "../../../../../../../schemas/room-schema";
import { useCreateRoom } from "../../../../../../../hooks/use-rooms";
import { useCenters } from "../../../../../../../hooks/use-centers";
import { isSuperAdmin } from "../../../../../../../utils/role-check";

interface CreateRoomProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateRoom({ open, onOpenChange }: CreateRoomProps) {
  const createRoom = useCreateRoom();
  const { data: centers } = useCenters(); // récupérer tous les centres si besoin

  const form = useForm<CreateRoomFormData & { centerId?: string }>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: createRoomDefaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: CreateRoomFormData & { centerId?: string }) => {
    try {
      await createRoom.mutateAsync({
        ...data,
        centerId: isSuperAdmin() ? data.centerId : undefined,
      });
      form.reset();
      onOpenChange(false);
      myGoeyToast("success", "Salle créée", {
        description: "La nouvelle salle a été créée avec succès.",
      });
    } catch (error) {
      if (isAxiosError<JsonApiErrorResponse>(error)) {
        const fieldErrors = extractJsonApiFieldErrors(error);
        if (fieldErrors.length > 0) {
          fieldErrors.forEach(({ field, message }) => {
            form.setError(field as keyof CreateRoomFormData, {
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
    if (!open) form.reset();
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup
        className="sm:max-w-3xl"
        containerClassName="sm:max-w-3xl max-h-[85vh] gap-4"
      >
        <DialogHeader>
          <DialogTitle>Créer une nouvelle salle</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer une nouvelle salle.
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
                    <FieldLabel htmlFor="room-name">Nom</FieldLabel>
                    <Input
                      {...field}
                      id="room-name"
                      placeholder="Nom de la salle"
                      disabled={createRoom.isPending}
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
                    <FieldLabel htmlFor="room-capacity">Capacité</FieldLabel>
                    <Input
                      {...field}
                      id="room-capacity"
                      type="number"
                      placeholder="Capacité"
                      disabled={createRoom.isPending}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value}
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
                    <FieldLabel htmlFor="room-location">Lieu</FieldLabel>
                    <Input
                      {...field}
                      id="room-location"
                      placeholder="Lieu de la salle"
                      disabled={createRoom.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Select Center — seulement si Super Admin */}
              {isSuperAdmin() && (
                <Controller
                  name="centerId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="room-center">Centre</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={createRoom.isPending}
                      >
                        <SelectTrigger
                          id="room-center"
                          className="w-full"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Sélectionnez un centre" />
                        </SelectTrigger>
                        <SelectContent>
                          {centers?.map(
                            (center: { id: string; name: string }) => (
                              <SelectItem key={center.id} value={center.id}>
                                {center.name}
                              </SelectItem>
                            )
                          )}
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
              disabled={createRoom.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={createRoom.isPending}>
              {createRoom.isPending ? "Création..." : "Créer la salle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
