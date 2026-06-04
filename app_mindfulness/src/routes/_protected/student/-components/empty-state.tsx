import { BookOpen } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="rounded-full bg-muted p-6">
        <BookOpen className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Aucune formation</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Vous n'êtes inscrit à aucune formation pour le moment.
        </p>
      </div>
    </div>
  );
}
