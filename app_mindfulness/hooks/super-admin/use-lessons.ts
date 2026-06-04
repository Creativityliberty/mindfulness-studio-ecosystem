import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "config/query-keys";
import { lessonService } from "services/super-admin/lesson-service";
import type { ApiError } from "types/json-api";
import type { Lesson } from "types/lesson";
import type { LessonFormData } from "schemas/super-admin/lesson-schema";

export function useLessons() {
  return useQuery({
    queryKey: queryKeys.lessons.lists(),
    queryFn: () => lessonService.getLessons(),
  });
}

export function useCreateLesson() {
  const queryClient = useQueryClient();
  return useMutation<Lesson, ApiError, LessonFormData>({
    mutationFn: (data) => lessonService.createLesson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons.lists() });
    },
  });
}

export function useUpdateLesson() {
  const queryClient = useQueryClient();
  return useMutation<Lesson, ApiError, { id: string; data: LessonFormData }>({
    mutationFn: ({ id, data }) => lessonService.updateLesson(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons.lists() });
    },
  });
}

export function useDeleteLesson() {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: (id) => lessonService.deleteLesson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons.lists() });
    },
  });
}
