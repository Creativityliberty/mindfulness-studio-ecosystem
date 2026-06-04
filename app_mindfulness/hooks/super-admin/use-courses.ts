import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "config/query-keys";
import { courseService } from "services/super-admin/course-service";
import type { ApiError } from "types/json-api";
import type { Course } from "types/course";
import type { CourseFormData } from "schemas/super-admin/course-schema";

export function useCourses() {
  return useQuery({
    queryKey: queryKeys.courses.lists(),
    queryFn: () => courseService.getCourses(),
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation<Course, ApiError, CourseFormData>({
    mutationFn: (data) => courseService.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.lists() });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation<Course, ApiError, { id: string; data: CourseFormData }>({
    mutationFn: ({ id, data }) => courseService.updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.lists() });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: (id) => courseService.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.lists() });
    },
  });
}
