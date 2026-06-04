import { createFileRoute } from "@tanstack/react-router";
import PeriodList from "../-components/table/period/period-list";

export const Route = createFileRoute("/_protected/admin/periods/")({
  component: () => <PeriodList />,
  // pendingComponent: () => (
  //   <div className="flex items-center justify-center p-8">
  //     <div className="text-lg">Chargement des centres...</div>
  //   </div>
  // ),
  // errorComponent: () => (
  //   <div className="flex items-center justify-center p-8">
  //     <div className="text-lg text-red-500">Erreur lors du chargement</div>
  //   </div>
  // ),
});
