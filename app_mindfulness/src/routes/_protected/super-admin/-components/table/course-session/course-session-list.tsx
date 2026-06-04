import { useState } from "react";
import { createColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useCourseSessions } from "hooks/super-admin/use-course-sessions";
import { CreateCourseSession } from "../../dialog/course-sessions/CreateCourseSession";
import { UpdateCourseSession } from "../../dialog/course-sessions/UpdateCourseSession";
import { DeleteCourseSession } from "../../dialog/course-sessions/DeleteCourseSession";
import type { CourseSession } from "types/course-session";

export default function CourseSessionList() {
  const { data: sessions = [], isLoading } = useCourseSessions();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CourseSession | null>(null);

  const handleEdit = (session: CourseSession) => {
    setSelectedSession(session);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (session: CourseSession) => {
    setSelectedSession(session);
    setDeleteDialogOpen(true);
  };

  const columns = createColumns({ onEdit: handleEdit, onDelete: handleDelete });

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
          <h1 className="text-3xl font-bold tracking-tight">Gestion des sessions</h1>
          <p className="text-muted-foreground">
            Créez, modifiez et gérez toutes les sessions de formation
          </p>
        </div>
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={sessions}
            searchFilter={{ columnIds: ["name"], placeholder: "Rechercher par nom..." }}
            actionButton={{ label: "Ajouter une session", onClick: () => setCreateDialogOpen(true) }}
          />
        </div>
      </div>

      <CreateCourseSession open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
      <UpdateCourseSession
        session={selectedSession}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />
      <DeleteCourseSession
        session={selectedSession}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
