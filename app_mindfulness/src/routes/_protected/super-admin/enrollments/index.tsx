import { createFileRoute } from "@tanstack/react-router";
import EnrollmentList from "../-components/table/enrollment/enrollment-list";

export const Route = createFileRoute("/_protected/super-admin/enrollments/")({
  component: () => <EnrollmentList />,
});
