import { AlertTriangle } from "lucide-react";

import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import type { Lesson } from "types/lesson";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/optics/dialog";
import { useDeleteLesson } from "hooks/super-admin";

interface DeleteLessonProps {
  lesson: Lesson | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteLesson({ lesson, open, onOpenChange }: DeleteLessonProps) {
  const deleteLesson = useDeleteLesson();

  const handleDelete = async () => {
    if (!lesson) return;

    try {
      await deleteLesson.mutateAsync(lesson.id);
      onOpenChange(false);
      myGoeyToast("success", "Leçon supprimée", {
        description: `La leçon "${lesson.name}" a été supprimée avec succès.`,
      });
    } catch (error) {
      const display = toErrorDisplay(deleteLesson.error ?? (error as never));
      myGoeyToast("error", display.title, { description: display.message });
    }
  };

  if (!lesson) return null;

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
            Êtes-vous sûr de vouloir supprimer la leçon{" "}
            <strong>"{lesson.name}"</strong> ? Tous ses matériaux seront
            également supprimés. Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteLesson.isPending}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteLesson.isPending}
          >
            {deleteLesson.isPending ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
