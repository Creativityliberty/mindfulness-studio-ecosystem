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
import { useDeleteRoom } from "../../../../../../../hooks/use-rooms";
import type { Room } from "../../../../../../../types/room";

interface DeleteRoomProps {
  room: Room | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteRoom({ room, open, onOpenChange }: DeleteRoomProps) {
  const deleteRoom = useDeleteRoom();

  const handleDelete = async () => {
    if (!room) return;

    try {
      await deleteRoom.mutateAsync(room.id);
      onOpenChange(false);
      myGoeyToast("success", "Salle supprimée", {
        description: `La salle "${room.name}" a été supprimée avec succès.`,
      });
    } catch {
      myGoeyToast("error", "Erreur de suppression", {
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  if (!room) return null;

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
            Êtes-vous sûr de vouloir supprimer la salle{" "}
            <strong>"{room.name}"</strong> ? Cette action est irréversible et
            supprimera définitivement cette salle de la base de données.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteRoom.isPending}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteRoom.isPending}
          >
            {deleteRoom.isPending ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
