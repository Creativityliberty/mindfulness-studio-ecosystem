import { useState } from "react";
import { createColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useRooms } from "../../../../../../../hooks/use-rooms";
import { UpdateRoom } from "../../dialog/rooms/UpdateRoom";
import type { Room } from "../../../../../../../types/room";
import { CreateRoom } from "../../dialog/rooms/CreateRoom";
import { DeleteRoom } from "../../dialog/rooms/DeleteRoom";

export default function RoomList() {
  const { data: rooms = [], isLoading } = useRooms();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (room: Room) => {
    setSelectedRoom(room);
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
          <p className="text-lg">Chargement des salles...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto space-y-6 p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestion des salles
          </h1>
          <p className="text-muted-foreground">
            Créez, modifiez et gérez tous les salles en un seul endroit
          </p>
        </div>
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={rooms}
            searchFilter={{
              columnIds: ["name"],
              placeholder: "Rechercher par nom...",
            }}
            actionButton={{
              label: "Ajouter une salle",
              onClick: () => setCreateDialogOpen(true),
            }}
          />
        </div>
      </div>

      <CreateRoom open={createDialogOpen} onOpenChange={setCreateDialogOpen} />

      <UpdateRoom
        room={selectedRoom!}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />

      <DeleteRoom
        room={selectedRoom}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
