import { ChevronRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Module } from "types/Module";

interface Props {
  module: Module;
  index: number;
}

export function ModuleCard({ module, index }: Props) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-xs font-mono text-muted-foreground mt-0.5 shrink-0">
            {num}
          </span>
          <div className="space-y-1">
            <p className="font-semibold text-sm leading-snug">{module.name}</p>
            {module.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {module.description}
              </p>
            )}
          </div>
        </div>
        <Badge className="shrink-0 bg-gray-500/10 text-gray-500 border border-gray-500/20 text-xs">
          <Lock className="h-3 w-3 mr-1" />
          Non commencé
        </Badge>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progression</span>
          <span>0%</span>
        </div>
        <Progress value={0} className="h-1.5" />
      </div>

      <div className="flex gap-2">
        <Button size="sm" className="flex-1 gap-1" disabled>
          Ouvrir
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
        <Button size="sm" variant="outline">
          Détails
        </Button>
      </div>
    </div>
  );
}
