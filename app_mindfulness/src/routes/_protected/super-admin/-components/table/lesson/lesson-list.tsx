import { useState } from "react";
import { createColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useLessons } from "hooks/super-admin/use-lessons";
import { CreateLesson } from "../../dialog/lessons/CreateLesson";
import { UpdateLesson } from "../../dialog/lessons/UpdateLesson";
import { DeleteLesson } from "../../dialog/lessons/DeleteLesson";
import type { Lesson } from "types/lesson";

export default function LessonList() {
  const { data: lessons = [], isLoading } = useLessons();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleEdit = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (lesson: Lesson) => {
    setSelectedLesson(lesson);
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
          <p className="text-lg">Chargement des leçons...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto space-y-6 p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestion des leçons
          </h1>
          <p className="text-muted-foreground">
            Créez, modifiez et gérez toutes les leçons en un seul endroit
          </p>
        </div>
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={lessons}
            searchFilter={{
              columnIds: ["name"],
              placeholder: "Rechercher par nom...",
            }}
            actionButton={{
              label: "Ajouter une leçon",
              onClick: () => setCreateDialogOpen(true),
            }}
          />
        </div>
      </div>

      <CreateLesson
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      <UpdateLesson
        lesson={selectedLesson}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />

      <DeleteLesson
        lesson={selectedLesson}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
