import { createFileRoute } from "@tanstack/react-router";
import LessonList from "../-components/table/lesson/lesson-list";

export const Route = createFileRoute("/_protected/super-admin/lessons/")({
  component: () => <LessonList />,
});
