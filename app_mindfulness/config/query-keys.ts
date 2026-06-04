export const queryKeys = {
  categories: {
    all: ["categories"] as const,
    lists: () => [...queryKeys.categories.all, "list"] as const,
    detail: (id: string) => [...queryKeys.categories.all, id] as const,
  },
  courses: {
    all: ["courses"] as const,
    lists: () => [...queryKeys.courses.all, "list"] as const,
    detail: (id: string) => [...queryKeys.courses.all, id] as const,
  },
  modules: {
    all: ["modules"] as const,
    lists: () => [...queryKeys.modules.all, "list"] as const,
    detail: (id: string) => [...queryKeys.modules.all, id] as const,
  },
  lessons: {
    all: ["lessons"] as const,
    lists: () => [...queryKeys.lessons.all, "list"] as const,
    detail: (id: string) => [...queryKeys.lessons.all, id] as const,
  },
  courseSessions: {
    all: ["courseSessions"] as const,
    lists: () => [...queryKeys.courseSessions.all, "list"] as const,
    detail: (id: string) => [...queryKeys.courseSessions.all, id] as const,
  },
  enrollments: {
    all: ["enrollments"] as const,
    lists: () => [...queryKeys.enrollments.all, "list"] as const,
    detail: (id: string) => [...queryKeys.enrollments.all, id] as const,
  },
  enrolledCourses: {
    all: ["enrolledCourses"] as const,
    lists: () => [...queryKeys.enrolledCourses.all, "list"] as const,
    detail: (id: string) => [...queryKeys.enrolledCourses.all, id] as const,
  },
};
