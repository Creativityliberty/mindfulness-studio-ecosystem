import { createFileRoute } from "@tanstack/react-router";
import ModuleList from "../-components/table/module/module-list";

export const Route = createFileRoute("/_protected/super-admin/modules/")({
  component: () => <ModuleList />,
});
