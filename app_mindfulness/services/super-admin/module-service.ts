import { api } from "@/lib/api";
import type { JsonApiDocument } from "../../types/json-api";
import type {
  Module,
  ModuleIncludedResource,
  ModuleResource,
} from "types/Module";
import { normalizeModule } from "normalizers/module-normalizer";
import type { ModuleFormData } from "schemas/super-admin/module-schema";

export const moduleService = {
  async getModules(): Promise<Module[]> {
    const { data } = await api.get<JsonApiDocument<ModuleResource[]>>(
      "/api/v1/admin/modules",
      {
        params: { include: "course" },
      },
    );
    const included = (data.included || []) as ModuleIncludedResource[];
    return data.data.map((module) => normalizeModule(module, included));
  },

  async createModule(payload: ModuleFormData): Promise<Module> {
    const { data } = await api.post<JsonApiDocument<ModuleResource>>(
      "/api/v1/admin/modules",
      payload,
    );
    return normalizeModule(data.data);
  },

  async updateModule(id: string, payload: ModuleFormData): Promise<Module> {
    const { data } = await api.patch<JsonApiDocument<ModuleResource>>(
      `/api/v1/admin/modules/${id}`,
      payload,
    );
    return normalizeModule(data.data);
  },

  async deleteModule(id: string): Promise<void> {
    await api.delete(`/api/v1/admin/modules/${id}`);
  },
};
