import { BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CourseWithModules } from "types/student-course";

interface Props {
  course: CourseWithModules;
}

export function CourseDetailHeader({ course }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Formation
          </p>
          <h1 className="text-2xl font-bold tracking-tight">{course.name}</h1>
          {course.description && (
            <p className="text-sm text-muted-foreground max-w-2xl">
              {course.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2 pt-1">
            {course.modules.length > 0 && (
              <Badge variant="outline" className="gap-1">
                <BookOpen className="h-3 w-3" />
                {course.modules.length} module
                {course.modules.length > 1 ? "s" : ""}
              </Badge>
            )}
            {course.duration_weeks && (
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {course.duration_weeks} semaine
                {course.duration_weeks > 1 ? "s" : ""}
              </Badge>
            )}
            {course.category && (
              <Badge variant="outline">{course.category.name}</Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 min-w-[180px]">
          <Button className="w-full">Continuer la formation</Button>
          <Button variant="outline" className="w-full">
            Voir ma progression
          </Button>
        </div>
      </div>
    </div>
  );
}
