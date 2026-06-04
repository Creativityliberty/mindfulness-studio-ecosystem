import { useState } from "react";
import { createColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { usePeriods } from "../../../../../../../hooks/use-periods";
import { UpdatePeriod } from "../../dialog/periods/UpdatePeriod";
import type { Period } from "../../../../../../../types/period";
import { CreatePeriod } from "../../dialog/periods/CreatePeriod";
import { DeletePeriod } from "../../dialog/periods/DeletePeriod";

export default function PeriodList() {
  const { data: periods = [], isLoading } = usePeriods();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);

  const handleEdit = (period: Period) => {
    setSelectedPeriod(period);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (period: Period) => {
    setSelectedPeriod(period);
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
          <p className="text-lg">Chargement des sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto space-y-6 p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestion des sessions
          </h1>
          <p className="text-muted-foreground">
            Créez, modifiez et gérez tous les sessions en un seul endroit
          </p>
        </div>
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={periods}
            searchFilter={{
              columnIds: ["name"],
              placeholder: "Rechercher par nom...",
            }}
            actionButton={{
              label: "Ajouter une session",
              onClick: () => setCreateDialogOpen(true),
            }}
          />
        </div>
      </div>

      <CreatePeriod
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      <UpdatePeriod
        period={selectedPeriod!}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />

      <DeletePeriod
        period={selectedPeriod!}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
