import { createFileRoute } from "@tanstack/react-router";
import RoomList from "../-components/table/room/room-list";

export const Route = createFileRoute("/_protected/admin/rooms/")({
  component: () => <RoomList />,
});
