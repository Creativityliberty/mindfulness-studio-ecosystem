import type { JsonApiResource } from "./json-api";

export interface CategoryAttributes {
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export type CategoryResource = JsonApiResource<
  "categories",
  CategoryAttributes
>;
