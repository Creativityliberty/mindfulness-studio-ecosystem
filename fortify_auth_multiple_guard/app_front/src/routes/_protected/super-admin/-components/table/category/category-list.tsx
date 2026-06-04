import { useState } from "react";
import { createColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useCategories } from "../../../../../../../hooks/super-admin/use-categories";
import { CreateCategory } from "../../dialog/categories/CreateCategory";
import { UpdateCategory } from "../../dialog/categories/UpdateCategory";
import { DeleteCategory } from "../../dialog/categories/DeleteCategory";
import type { Category } from "../../../../../../../types/category";

export default function CategoryList() {
  const { data: categories = [], isLoading } = useCategories();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const columns = createColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Chargement des catégories...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto space-y-6 p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestion des catégories
          </h1>
          <p className="text-muted-foreground">
            Créez, modifiez et gérez tous les catégories en un seul endroit
          </p>
        </div>
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={categories}
            searchFilter={{
              columnIds: ["name"],
              placeholder: "Rechercher par nom...",
            }}
            // facetedFilters={[
            //   {
            //     columnId: "status",
            //     title: "Status",
            //     options: CATEGORY_STATUS,
            //   },
            // ]}
            actionButton={{
              label: "Ajouter une catégorie",
              onClick: () => setCreateDialogOpen(true),
            }}
          />
        </div>
      </div>

      <CreateCategory
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      <UpdateCategory
        category={selectedCategory}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />

      <DeleteCategory
        category={selectedCategory}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
