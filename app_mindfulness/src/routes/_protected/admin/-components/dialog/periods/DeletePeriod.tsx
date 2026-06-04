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
import { useDeletePeriod } from "../../../../../../../hooks/use-periods";
import type { Period } from "../../../../../../../types/period";

interface DeletePeriodProps {
  period: Period | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeletePeriod({ period, open, onOpenChange }: DeletePeriodProps) {
  const deletePeriod = useDeletePeriod();

  const handleDelete = async () => {
    if (!period) return;

    try {
      await deletePeriod.mutateAsync(period.id);
      onOpenChange(false);
      myGoeyToast("success", "Session supprimée", {
        description: `La session "${period.name}" a été supprimée avec succès.`,
      });
    } catch {
      myGoeyToast("error", "Erreur de suppression", {
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  if (!period) return null;

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
            Êtes-vous sûr de vouloir supprimer la session{" "}
            <strong>"{period.name}"</strong> ? Cette action est irréversible et
            supprimera définitivement cette session de la base de données.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deletePeriod.isPending}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deletePeriod.isPending}
          >
            {deletePeriod.isPending ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
