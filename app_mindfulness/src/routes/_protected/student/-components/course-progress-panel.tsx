import { BookOpen, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { CourseWithModules } from "types/student-course";

interface Props {
  course: CourseWithModules;
}

export function CourseProgressPanel({ course }: Props) {
  const totalModules = course.modules.length;
  const firstModule = course.modules[0];

  return (
    <div className="space-y-4 xl:sticky xl:top-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Vue rapide</CardTitle>
          <p className="text-xs text-muted-foreground">Progression totale</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progression</span>
              <span className="font-medium text-foreground">0%</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Modules terminés</span>
              <span className="font-medium">0 / {totalModules}</span>
            </div>
            {firstModule && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Module en cours</span>
                <span className="font-medium text-blue-600 text-right max-w-[140px] truncate">
                  {firstModule.name}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button className="w-full justify-between" disabled>
            Reprendre le dernier module
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between" disabled>
            <BookOpen className="h-4 w-4" />
            Voir tous les modules
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between" disabled>
            <Award className="h-4 w-4" />
            Accéder aux certificats
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
