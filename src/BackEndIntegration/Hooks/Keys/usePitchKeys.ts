import type { GUID } from "../../Types/shared/Guid";
import type Pagination from "../../Types/shared/Paganation";

export const pitchKeys = {
  all: ["pitches"] as const,
  lists: () => [...pitchKeys.all, "list"] as const,
  list: (params: Pagination) => [...pitchKeys.lists(), params] as const,
  details: () => [...pitchKeys.all, "detail"] as const,
  detail: (id: GUID) => [...pitchKeys.details(), id] as const,
  availability: (id: GUID,date?:string) => [...pitchKeys.all, "availability", id,date] as const,
};