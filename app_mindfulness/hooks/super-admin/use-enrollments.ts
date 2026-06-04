import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "config/query-keys";
import { enrollmentService } from "services/super-admin/enrollment-service";

export function useEnrollments() {
  return useQuery({
    queryKey: queryKeys.enrollments.lists(),
    queryFn: () => enrollmentService.getEnrollments(),
  });
}
