import { createFileRoute } from "@tanstack/react-router";
import CourseSessionList from "../-components/table/course-session/course-session-list";

export const Route = createFileRoute("/_protected/super-admin/course-sessions/")({
  component: () => <CourseSessionList />,
});
