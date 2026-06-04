import { createColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useStudents } from "../../../../../../../hooks/use-users";
import { USER_STATUS } from "../../../../../../../types/user-status";
// import { CreateUser } from '../../users/CreateUser'
// import { UpdateUser } from '../../users/UpdateUser'
// import { DeleteUser } from '../../users/DeleteUser'
// import { ViewUser } from '../../users/ViewUser'

export default function StudentList() {
  const { data: students = [], isLoading } = useStudents();
  console.log(students);

  // const [createDialogOpen, setCreateDialogOpen] = useState(false)
  // const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  // const [viewDialogOpen, setViewDialogOpen] = useState(false)
  // const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // const handleEdit = (user: User) => {
  //   setSelectedUser(user)
  //   setUpdateDialogOpen(true)
  // }

  // const handleDelete = (user: User) => {
  //   setSelectedUser(user)
  //   setDeleteDialogOpen(true)
  // }

  // const handleView = (user: User) => {
  //   setSelectedUser(user)
  //   setViewDialogOpen(true)
  // }

  const columns = createColumns({
    onEdit: () => {},
    onDelete: () => {},
    // onEdit: handleEdit,
    // onDelete: handleDelete,
    // onView: handleView,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Chargement des étudiants...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto space-y-6 p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestion des étudiants
          </h1>
          <p className="text-muted-foreground">
            Créez, modifiez et gérez tous les étudiants en un seul endroit
          </p>
        </div>
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={students}
            searchFilter={{
              columnIds: ["fullName", "email"],
              placeholder: "Rechercher par nom ou email...",
            }}
            facetedFilters={[
              {
                columnId: "status",
                title: "Status",
                options: USER_STATUS,
              },
            ]}
            actionButton={{
              label: "Ajouter un étudiant",
              // onClick: () => setCreateDialogOpen(true),
              onClick: () => {},
            }}
          />
        </div>
      </div>

      {/* <CreateUser
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      /> */}

      {/* <UpdateUser
        user={selectedUser}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      /> */}

      {/* <DeleteUser
        user={selectedUser}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      /> */}

      {/* <ViewUser
        user={selectedUser}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      /> */}
    </>
  );
}
