import { GROUP_STATUS, type GroupStatus } from "../types/group-status";
import { GROUP_TYPE, type GroupType } from "../types/group-type";
import { GROUP_MODE, type GroupMode } from "../types/group-mode";

export const getGroupStatusLabel = (status: GroupStatus): string =>
  GROUP_STATUS.find((s) => s.value === status)?.label ?? status;

export const getGroupTypeLabel = (type: GroupType): string =>
  GROUP_TYPE.find((t) => t.value === type)?.label ?? type;

export const getGroupModeLabel = (mode: GroupMode): string =>
  GROUP_MODE.find((m) => m.value === mode)?.label ?? mode;
