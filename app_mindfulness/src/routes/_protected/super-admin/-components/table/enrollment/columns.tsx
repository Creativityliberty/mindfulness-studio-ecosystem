import { type ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import type { Enrollment } from "types/enrollment";
import { ENROLLMENT_STATUS, PAYMENT_STATUS } from "types/statuses";
import { ENROLLMENT_STATUS_STYLES, PAYMENT_STATUS_STYLES } from "utils/enrollment-styles";
import { formatDate } from "utils/format-date";

export const columns: ColumnDef<Enrollment>[] = [
  {
    id: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Utilisateur" />
    ),
    accessorFn: (row) => {
      const u = row.user;
      if (!u) return "—";
      return u.first_name && u.last_name
        ? `${u.first_name} ${u.last_name}`
        : u.email;
    },
  },
  {
    id: "session",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session" />
    ),
    accessorFn: (row) => row.courseSession?.name ?? "—",
  },
  {
    id: "course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Formation" />
    ),
    accessorFn: (row) => row.courseSession?.course?.name ?? "—",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Statut" />
    ),
    cell: ({ row }) => {
      const value = row.original.status;
      const label = ENROLLMENT_STATUS.find((s) => s.value === value)?.label ?? value;
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            value ? ENROLLMENT_STATUS_STYLES[value] : "",
          )}
        >
          {label}
        </span>
      );
    },
  },
  {
    id: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paiement" />
    ),
    cell: ({ row }) => {
      const value = row.original.payment?.status;
      if (!value) return <span className="text-muted-foreground text-xs">—</span>;
      const label = PAYMENT_STATUS.find((s) => s.value === value)?.label ?? value;
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            PAYMENT_STATUS_STYLES[value],
          )}
        >
          {label}
        </span>
      );
    },
  },
  {
    id: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Montant" />
    ),
    cell: ({ row }) => {
      const amount = row.original.payment?.amount;
      const currency = row.original.payment?.currency ?? "EUR";
      return amount != null ? `${amount} ${currency}` : "—";
    },
  },
  {
    accessorKey: "enrolled_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inscrit le" />
    ),
    cell: ({ row }) => formatDate(row.getValue("enrolled_at")),
  },
];
