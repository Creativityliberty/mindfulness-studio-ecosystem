import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import type { User } from "../../../../../../../types/user";
import { USER_STATUS } from "../../../../../../../types/user-status";
import { formatDate } from "../../../../../../../utils/format-date";
import { getUserStatusStyle } from "../../../../../../../utils/status-styles";

interface ColumnsProps {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  // onView: (user: User) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
  // onView,
}: ColumnsProps): ColumnDef<User>[] => [
  {
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom complet" />
    ),
    accessorFn: (row) =>
      [row.firstName, row.lastName].filter(Boolean).join(" ") || "-",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Statut" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("status") as string;
      const status = USER_STATUS.find((s) => s.value === value);

      if (!status) return null;

      const styles = getUserStatusStyle(status.value);

      return (
        <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles.badge}`}>
          <status.icon className={`size-3.5 ${styles.icon}`} />
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Créé le" />
    ),
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      // // Check policies when available
      // const canUpdateThisUser = user.policies?.can_update ?? false;
      // const canDeleteThisUser = user.policies?.can_delete ?? false;
      // if (!canUpdateThisUser && !canDeleteThisUser) return null;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={() => onView(user)}>
              Voir
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => onEdit(user)}>
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(user)}
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const columns: ColumnDef<User>[] = createColumns({
  onEdit: () => {},
  onDelete: () => {},
});
