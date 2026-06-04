import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "config/query-keys";
import { courseSessionService } from "services/super-admin/course-session-service";
import type { ApiError } from "types/json-api";
import type { CourseSession } from "types/course-session";
import type { CourseSessionFormData } from "schemas/super-admin/course-session-schema";

export function useCourseSessions() {
  return useQuery({
    queryKey: queryKeys.courseSessions.lists(),
    queryFn: () => courseSessionService.getCourseSessions(),
  });
}

export function useCreateCourseSession() {
  const queryClient = useQueryClient();
  return useMutation<CourseSession, ApiError, CourseSessionFormData>({
    mutationFn: (data) => courseSessionService.createCourseSession(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courseSessions.lists() });
    },
  });
}

export function useUpdateCourseSession() {
  const queryClient = useQueryClient();
  return useMutation<CourseSession, ApiError, { id: string; data: CourseSessionFormData }>({
    mutationFn: ({ id, data }) => courseSessionService.updateCourseSession(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courseSessions.lists() });
    },
  });
}

export function useDeleteCourseSession() {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: (id) => courseSessionService.deleteCourseSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courseSessions.lists() });
    },
  });
}
