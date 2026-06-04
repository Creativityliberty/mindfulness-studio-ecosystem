import { useState } from "react";
import { createColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useCourses } from "hooks/super-admin/use-courses";
import { CreateCourse } from "../../dialog/courses/CreateCourse";
import { UpdateCourse } from "../../dialog/courses/UpdateCourse";
import { DeleteCourse } from "../../dialog/courses/DeleteCourse";
import { COURSE_STATUS } from "types/statuses";
import type { Course } from "types/course";

export default function CourseList() {
  const { data: courses = [], isLoading } = useCourses();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (course: Course) => {
    setSelectedCourse(course);
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
          <p className="text-lg">Chargement des formations...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto space-y-6 p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestion des formations
          </h1>
          <p className="text-muted-foreground">
            Créez, modifiez et gérez toutes les formations en un seul endroit
          </p>
        </div>
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={courses}
            searchFilter={{
              columnIds: ["name"],
              placeholder: "Rechercher par nom...",
            }}
            facetedFilters={[
              {
                columnId: "status",
                title: "Statut",
                options: COURSE_STATUS,
              },
            ]}
            actionButton={{
              label: "Ajouter une formation",
              onClick: () => setCreateDialogOpen(true),
            }}
          />
        </div>
      </div>

      <CreateCourse
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      <UpdateCourse
        course={selectedCourse}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />

      <DeleteCourse
        course={selectedCourse}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
