import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import type { CourseSession } from "types/course-session";
import { formatDate } from "utils/format-date";

interface ColumnsProps {
  onEdit: (session: CourseSession) => void;
  onDelete: (session: CourseSession) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<CourseSession>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    id: "course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Formation" />
    ),
    accessorFn: (row) => row.course?.name ?? "—",
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Début" />
    ),
    cell: ({ row }) => formatDate(row.getValue("start_date")),
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fin" />
    ),
    cell: ({ row }) => formatDate(row.getValue("end_date")),
  },
  {
    accessorKey: "max_seats",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Places max" />
    ),
  },
  {
    accessorKey: "remaining_seats",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Places restantes" />
    ),
    cell: ({ row }) => {
      const remaining = row.getValue<number>("remaining_seats");
      const max = row.original.max_seats;
      const color =
        remaining === 0
          ? "text-destructive"
          : remaining <= max * 0.2
            ? "text-amber-600"
            : "text-green-600";
      return <span className={`font-medium ${color}`}>{remaining}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const session = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(session)}>
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(session)}
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
