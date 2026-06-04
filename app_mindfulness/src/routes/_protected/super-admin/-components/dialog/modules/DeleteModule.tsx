import { AlertTriangle } from "lucide-react";

import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import type { Module } from "types/Module";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/optics/dialog";
import { useDeleteModule } from "hooks/super-admin";

interface DeleteModuleProps {
  module: Module | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteModule({ module, open, onOpenChange }: DeleteModuleProps) {
  const deleteModule = useDeleteModule();

  const handleDelete = async () => {
    if (!module) return;

    try {
      await deleteModule.mutateAsync(module.id);
      onOpenChange(false);
      myGoeyToast("success", "Module supprimé", {
        description: `Le module "${module.name}" a été supprimé avec succès.`,
      });
    } catch (error) {
      const display = toErrorDisplay(deleteModule.error ?? (error as never));
      myGoeyToast("error", display.title, { description: display.message });
    }
  };

  if (!module) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </div>
          <DialogDescription className="pt-3">
            Êtes-vous sûr de vouloir supprimer le module{" "}
            <strong>"{module.name}"</strong> ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteModule.isPending}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteModule.isPending}
          >
            {deleteModule.isPending ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
