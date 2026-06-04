import { DataTable } from "@/components/ui/data-table";
import { useEnrollments } from "hooks/super-admin/use-enrollments";
import { columns } from "./columns";

export default function EnrollmentList() {
  const { data: enrollments = [], isLoading } = useEnrollments();

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Chargement des inscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des inscriptions</h1>
        <p className="text-muted-foreground">
          Consultez toutes les inscriptions aux sessions de formation
        </p>
      </div>
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={enrollments}
          searchFilter={{ columnIds: ["user"], placeholder: "Rechercher par utilisateur..." }}
        />
      </div>
    </div>
  );
}
