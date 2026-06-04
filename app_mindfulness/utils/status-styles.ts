import type { CourseStatus, UserStatus } from "../types/statuses";

const userStatusStyles: Record<UserStatus, { badge: string; icon: string }> = {
  active: {
    badge: "bg-green-500/10 text-green-600 border border-green-500/20",
    icon: "text-green-600",
  },
  inactive: {
    badge: "bg-gray-500/10 text-gray-500 border border-gray-500/20",
    icon: "text-gray-500",
  },
  restricted: {
    badge: "bg-red-500/10 text-red-600 border border-red-500/20",
    icon: "text-red-600",
  },
};

const courseStatusStyles: Record<
  CourseStatus,
  { badge: string; icon: string }
> = {
  active: {
    badge: "bg-green-500/10 text-green-600 border border-green-500/20",
    icon: "text-green-600",
  },
  inactive: {
    badge: "bg-gray-500/10 text-gray-500 border border-gray-500/20",
    icon: "text-gray-500",
  },
};

export const getUserStatusStyle = (
  status: UserStatus | null,
): { badge: string; icon: string } => {
  if (!status || !(status in userStatusStyles)) {
    return {
      badge: "bg-gray-500/10 text-gray-500 border border-gray-500/20",
      icon: "text-gray-500",
    };
  }
  return userStatusStyles[status];
};

export const getCourseStatusStyle = (
  status: CourseStatus | null,
): { badge: string; icon: string } => {
  if (!status || !(status in courseStatusStyles)) {
    return {
      badge: "bg-gray-500/10 text-gray-500 border border-gray-500/20",
      icon: "text-gray-500",
    };
  }
  return courseStatusStyles[status];
};
