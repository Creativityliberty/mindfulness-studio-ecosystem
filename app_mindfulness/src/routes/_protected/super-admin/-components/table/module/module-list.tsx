import { useState } from "react";
import { createColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useModules } from "hooks/super-admin/use-modules";
import { CreateModule } from "../../dialog/modules/CreateModule";
import { UpdateModule } from "../../dialog/modules/UpdateModule";
import { DeleteModule } from "../../dialog/modules/DeleteModule";
import type { Module } from "types/Module";

export default function ModuleList() {
  const { data: modules = [], isLoading } = useModules();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const handleEdit = (module: Module) => {
    setSelectedModule(module);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (module: Module) => {
    setSelectedModule(module);
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
          <p className="text-lg">Chargement des modules...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto space-y-6 p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestion des modules
          </h1>
          <p className="text-muted-foreground">
            Créez, modifiez et gérez tous les modules en un seul endroit
          </p>
        </div>
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={modules}
            searchFilter={{
              columnIds: ["name"],
              placeholder: "Rechercher par nom...",
            }}
            actionButton={{
              label: "Ajouter un module",
              onClick: () => setCreateDialogOpen(true),
            }}
          />
        </div>
      </div>

      <CreateModule
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      <UpdateModule
        module={selectedModule}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />

      <DeleteModule
        module={selectedModule}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
