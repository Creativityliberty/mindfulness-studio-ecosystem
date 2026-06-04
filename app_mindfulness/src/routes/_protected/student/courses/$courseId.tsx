import { createFileRoute } from "@tanstack/react-router";
import { useEnrolledCourse } from "hooks/student";
import { CourseDetailHeader } from "../-components/course-detail-header";
import { CourseFeatures } from "../-components/course-features";
import { ModuleList } from "../-components/module-list";
import { CourseProgressPanel } from "../-components/course-progress-panel";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_protected/student/courses/$courseId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseId } = Route.useParams();
  const { data: course, isLoading, isError } = useEnrolledCourse(courseId);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
          <div className="space-y-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="container mx-auto p-6">
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          Une erreur est survenue lors du chargement de la formation.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <CourseDetailHeader course={course} />

      <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
        <div className="space-y-6">
          <CourseFeatures course={course} />
          <ModuleList modules={course.modules} />
        </div>
        <CourseProgressPanel course={course} />
      </div>
    </div>
  );
}
