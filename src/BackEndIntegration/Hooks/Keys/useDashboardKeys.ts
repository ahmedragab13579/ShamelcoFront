import type { GUID } from "../../Types/shared/Guid";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  venues: () => [...dashboardKeys.all, "venues"] as const,
  venueDetails: (id: GUID) => [...dashboardKeys.venues(), id] as const,
  pitches: () => [...dashboardKeys.all, "pitches"] as const,
  pitchDetails: (id: GUID) => [...dashboardKeys.pitches(), id] as const,
};