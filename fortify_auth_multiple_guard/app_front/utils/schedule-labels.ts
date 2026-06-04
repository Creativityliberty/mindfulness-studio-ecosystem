import { SCHEDULE_DAY, type ScheduleDayOfWeek } from "../types/schedule-day";

export const getScheduleDayLabel = (day: ScheduleDayOfWeek): string =>
  SCHEDULE_DAY.find((d) => d.value === day)?.label ?? day;

export const getScheduleDaysLabel = (days: ScheduleDayOfWeek[]): string =>
  days.map((d) => getScheduleDayLabel(d)).join(", ");
