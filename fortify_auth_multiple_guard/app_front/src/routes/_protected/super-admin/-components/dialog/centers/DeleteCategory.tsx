import { AlertTriangle } from "lucide-react";
import { myGoeyToast } from "@/lib/goey-toast-presets";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/optics/dialog";
import { useDeleteCenter } from "../../../../../../../hooks/use-centers";
import type { Center } from "../../../../../../../types/center";

interface DeleteCenterProps {
  center: Center | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCenter({
  center,
  open,
  onOpenChange,
}: DeleteCenterProps) {
  const deleteCenter = useDeleteCenter();

  const handleDelete = async () => {
    if (!center) return;

    try {
      await deleteCenter.mutateAsync(center.id);
      onOpenChange(false);
      myGoeyToast("success", "Centre supprimé", {
        description: `Le centre "${center.name}" a été supprimé avec succès.`,
      });
    } catch {
      myGoeyToast("error", "Erreur de suppression", {
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  if (!center) return null;

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
            Êtes-vous sûr de vouloir supprimer le centre{" "}
            <strong>"{center.name}"</strong> ? Cette action est irréversible et
            supprimera définitivement ce centre de la base de données.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteCenter.isPending}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteCenter.isPending}
          >
            {deleteCenter.isPending ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
