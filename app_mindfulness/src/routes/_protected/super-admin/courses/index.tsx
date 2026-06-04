import { createFileRoute } from "@tanstack/react-router";
import CourseList from "../-components/table/course/course-list";

export const Route = createFileRoute("/_protected/super-admin/courses/")({
  component: () => <CourseList />,
});
