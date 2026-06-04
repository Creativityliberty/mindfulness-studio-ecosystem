import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "config/query-keys";
import { moduleService } from "services/super-admin/module-service";
import type { ApiError } from "types/json-api";
import type { Module } from "types/Module";
import type { ModuleFormData } from "schemas/super-admin/module-schema";

export function useModules() {
  return useQuery({
    queryKey: queryKeys.modules.lists(),
    queryFn: () => moduleService.getModules(),
  });
}

export function useCreateModule() {
  const queryClient = useQueryClient();
  return useMutation<Module, ApiError, ModuleFormData>({
    mutationFn: (data) => moduleService.createModule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.modules.lists() });
    },
  });
}

export function useUpdateModule() {
  const queryClient = useQueryClient();
  return useMutation<Module, ApiError, { id: string; data: ModuleFormData }>({
    mutationFn: ({ id, data }) => moduleService.updateModule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.modules.lists() });
    },
  });
}

export function useDeleteModule() {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: (id) => moduleService.deleteModule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.modules.lists() });
    },
  });
}
