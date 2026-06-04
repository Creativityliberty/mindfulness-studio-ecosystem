import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { isAxiosError, extractJsonApiFieldErrors } from '@/lib/api'
import type { JsonApiErrorResponse } from '../../../../../../../types/json-api'
import { myGoeyToast } from '@/lib/goey-toast-presets'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/optics/dialog'
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  updateCenterSchema,
  getUpdateCenterDefaultValues,
  type UpdateCenterFormData,
} from '../../../../../../../schemas/center-schema'
import { CENTER_STATUS } from '../../../../../../../types/center-status'
import { useUpdateCenter } from '../../../../../../../hooks/use-centers'
import type { Center } from '../../../../../../../types/center'

interface UpdateCenterProps {
  center: Center | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateCenter({ center, open, onOpenChange }: UpdateCenterProps) {
  const updateCenter = useUpdateCenter()

  const form = useForm<UpdateCenterFormData>({
    resolver: zodResolver(updateCenterSchema),
    defaultValues: center ? getUpdateCenterDefaultValues(center) : {},
    mode: 'onChange',
  })

  React.useEffect(() => {
    if (center && open) {
      form.reset(getUpdateCenterDefaultValues(center))
    }
  }, [center, open, form])

  const onSubmit = async (data: UpdateCenterFormData) => {
    if (!center) return

    try {
      await updateCenter.mutateAsync({ id: center.id, data })
      onOpenChange(false)
      myGoeyToast('success', 'Centre mis à jour', {
        description: 'Les modifications ont été enregistrées avec succès.',
      })
    } catch (error) {
      if (isAxiosError<JsonApiErrorResponse>(error)) {
        const fieldErrors = extractJsonApiFieldErrors(error)
        if (fieldErrors.length > 0) {
          fieldErrors.forEach(({ field, message }) => {
            form.setError(field as keyof UpdateCenterFormData, {
              type: 'manual',
              message,
            })
          })
        } else {
          myGoeyToast('error', 'Erreur de mise à jour', {
            description: 'Une erreur est survenue. Veuillez réessayer.',
          })
        }
      } else {
        myGoeyToast('error', 'Erreur inattendue', {
          description: 'Une erreur inattendue est survenue. Veuillez réessayer.',
        })
      }
    }
  }

  if (!center) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="sm:max-w-2xl" containerClassName="sm:max-w-2xl max-h-[85vh] gap-4">
        <DialogHeader>
          <DialogTitle>Modifier le centre</DialogTitle>
          <DialogDescription>
            Modifiez les informations du centre.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
          <div className="overflow-y-auto flex-1 min-h-0 pr-1 pb-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Nom */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-center-name">Nom</FieldLabel>
                  <Input
                    {...field}
                    id="update-center-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nom du centre"
                    disabled={updateCenter.isPending}
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
                  <FieldLabel htmlFor="update-center-status">Statut</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={updateCenter.isPending}
                  >
                    <SelectTrigger
                      id="update-center-status"
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
                  <FieldLabel htmlFor="update-center-phone">Téléphone</FieldLabel>
                  <Input
                    {...field}
                    id="update-center-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="Numéro de téléphone"
                    disabled={updateCenter.isPending}
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
                  <FieldLabel htmlFor="update-center-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="update-center-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email du centre"
                    disabled={updateCenter.isPending}
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
                <Field className="col-span-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-center-address">Adresse</FieldLabel>
                  <Input
                    {...field}
                    id="update-center-address"
                    aria-invalid={fieldState.invalid}
                    placeholder="Adresse du centre"
                    disabled={updateCenter.isPending}
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
              disabled={updateCenter.isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={updateCenter.isPending}>
              {updateCenter.isPending ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  )
}
