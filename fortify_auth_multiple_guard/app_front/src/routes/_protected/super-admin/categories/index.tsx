import { createFileRoute } from "@tanstack/react-router";
import CategoryList from "../-components/table/category/category-list";

export const Route = createFileRoute("/_protected/super-admin/categories/")({
  component: () => <CategoryList />,
});
