import { createFileRoute } from "@tanstack/react-router";
import { useEnrolledCourses } from "hooks/student";
import { CourseCard } from "../-components/course-card";
import { CourseCardSkeleton } from "../-components/course-card-skeleton";
import { EmptyState } from "../-components/empty-state";

export const Route = createFileRoute("/_protected/student/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: courses, isLoading, isError } = useEnrolledCourses();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Mes formations</h1>
        <p className="text-muted-foreground text-sm">
          Retrouvez toutes les formations auxquelles vous êtes inscrit.
        </p>
      </div>

      {isError && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          Une erreur est survenue lors du chargement des formations.
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : !courses || courses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
