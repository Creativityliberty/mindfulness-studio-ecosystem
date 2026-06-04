import { AlertTriangle } from "lucide-react";

import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import type { CourseSession } from "types/course-session";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/optics/dialog";
import { useDeleteCourseSession } from "hooks/super-admin/use-course-sessions";

interface DeleteCourseSessionProps {
  session: CourseSession | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCourseSession({ session, open, onOpenChange }: DeleteCourseSessionProps) {
  const deleteSession = useDeleteCourseSession();

  const handleDelete = async () => {
    if (!session) return;
    try {
      await deleteSession.mutateAsync(session.id);
      onOpenChange(false);
      myGoeyToast("success", "Session supprimée", {
        description: `La session "${session.name}" a été supprimée avec succès.`,
      });
    } catch (error) {
      const display = toErrorDisplay(deleteSession.error ?? (error as never));
      myGoeyToast("error", display.title, { description: display.message });
    }
  };

  if (!session) return null;

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
            <strong>"{session.name}"</strong> ? Toutes les inscriptions associées
            seront également supprimées. Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={deleteSession.isPending}>
            Annuler
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={deleteSession.isPending}>
            {deleteSession.isPending ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
