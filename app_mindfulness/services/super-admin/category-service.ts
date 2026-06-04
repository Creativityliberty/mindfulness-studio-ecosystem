import { api } from "@/lib/api";
import type { JsonApiDocument } from "../../types/json-api";
import type { Category, CategoryResource } from "types/category";
import { normalizeCategory } from "normalizers/category-normalizer";
import type { CategoryFormData } from "schemas/super-admin/category-schema";

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const { data } = await api.get<JsonApiDocument<CategoryResource[]>>(
      "/api/v1/admin/categories",
    );
    return data.data.map((category) => normalizeCategory(category));
  },

  async createCategory(payload: CategoryFormData): Promise<Category> {
    const { data } = await api.post<JsonApiDocument<CategoryResource>>(
      "/api/v1/admin/categories",
      payload,
    );
    return normalizeCategory(data.data);
  },

  async updateCategory(id: string, payload: CategoryFormData): Promise<Category> {
    const { data } = await api.patch<JsonApiDocument<CategoryResource>>(
      `/api/v1/admin/categories/${id}`,
      payload,
    );
    return normalizeCategory(data.data);
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/api/v1/admin/categories/${id}`);
  },
};
