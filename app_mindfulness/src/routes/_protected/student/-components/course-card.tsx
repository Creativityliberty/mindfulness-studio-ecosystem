import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCourseStatusStyle } from "utils/status-styles";
import type { Course } from "types/course";

export function CourseCard({ course }: { course: Course }) {
  const statusStyle = getCourseStatusStyle(course.status);

  return (
    <Link
      to="/student/courses/$courseId"
      params={{ courseId: course.id }}
      className="block h-full"
    >
      <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
        <div className="relative h-44 bg-muted">
          {course.image ? (
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/40" />
            </div>
          )}
          {course.status && (
            <Badge className={`absolute top-2 right-2 text-xs ${statusStyle.badge}`}>
              {course.status}
            </Badge>
          )}
        </div>

        <CardContent className="flex-1 pt-4 space-y-2">
          <h3 className="font-semibold text-base leading-snug line-clamp-2">
            {course.name}
          </h3>

          {course.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {course.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            {course.category && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Tag className="h-3 w-3" />
                {course.category.name}
              </span>
            )}
            {course.duration_weeks && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {course.duration_weeks} semaine
                {course.duration_weeks > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
