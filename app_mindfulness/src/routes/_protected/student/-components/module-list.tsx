import type { Module } from "types/Module";
import { ModuleCard } from "./module-card";
import { BookOpen } from "lucide-react";

interface Props {
  modules: Module[];
}

export function ModuleList({ modules }: Props) {
  if (modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-3 rounded-lg border border-dashed">
        <BookOpen className="h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">Aucun module disponible.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-base">Modules de la formation</h2>
      <div className="space-y-3">
        {modules.map((module, index) => (
          <ModuleCard key={module.id} module={module} index={index} />
        ))}
      </div>
    </div>
  );
}
