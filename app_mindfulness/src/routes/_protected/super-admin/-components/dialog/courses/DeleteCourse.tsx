import { AlertTriangle } from "lucide-react";

import { toErrorDisplay } from "@/lib/error-messages";
import { myGoeyToast } from "@/lib/goey-toast-presets";
import type { Course } from "types/course";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPopup,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/optics/dialog";
import { useDeleteCourse } from "hooks/super-admin";

interface DeleteCourseProps {
  course: Course | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCourse({ course, open, onOpenChange }: DeleteCourseProps) {
  const deleteCourse = useDeleteCourse();

  const handleDelete = async () => {
    if (!course) return;

    try {
      await deleteCourse.mutateAsync(course.id);
      onOpenChange(false);
      myGoeyToast("success", "Formation supprimée", {
        description: `La formation "${course.name}" a été supprimée avec succès.`,
      });
    } catch (error) {
      const display = toErrorDisplay(deleteCourse.error ?? (error as never));
      myGoeyToast("error", display.title, { description: display.message });
    }
  };

  if (!course) return null;

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
            Êtes-vous sûr de vouloir supprimer la formation{" "}
            <strong>"{course.name}"</strong> ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteCourse.isPending}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteCourse.isPending}
          >
            {deleteCourse.isPending ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
