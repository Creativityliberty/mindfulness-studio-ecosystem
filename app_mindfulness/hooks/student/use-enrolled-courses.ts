import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "config/query-keys";
import { enrolledCourseService } from "services/student/enrolled-course-service";

export function useEnrolledCourses() {
  return useQuery({
    queryKey: queryKeys.enrolledCourses.lists(),
    queryFn: () => enrolledCourseService.getEnrolledCourses(),
  });
}

export function useEnrolledCourse(id: string) {
  return useQuery({
    queryKey: queryKeys.enrolledCourses.detail(id),
    queryFn: () => enrolledCourseService.getEnrolledCourse(id),
    enabled: !!id,
  });
}
