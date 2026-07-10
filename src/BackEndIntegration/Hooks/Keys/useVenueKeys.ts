
import type { GUID } from "../../Types/shared/Guid";
import type Pagination from "../../Types/shared/Paganation";

export const venueKeys = {
  all: ["venues"] as const,
  lists: () => [...venueKeys.all, "list"] as const,
  list: (params: Pagination) => [...venueKeys.lists(), params] as const,
  details: () => [...venueKeys.all, "detail"] as const,
  detail: (id: GUID) => [...venueKeys.details(), id] as const,
  availability: (id: GUID,date?:string) => [...venueKeys.all, "availability", id,date] as const,
  floorPlans: () => [...venueKeys.all, "floor-plan"] as const,
  floorPlan: (id: GUID) => [...venueKeys.floorPlans(), id] as const,
  consoles: () => [...venueKeys.all, "consoles"] as const,
  consolesListOfVenue: (venueId: GUID) => [...venueKeys.consoles(), "list", venueId] as const,
  consolesListOfVenuePaged: (venueId: GUID, params: Pagination) => [...venueKeys.consolesListOfVenue(venueId), params] as const,
  tables: () => [...venueKeys.all, "tables"] as const,
  tableDetail: (id: GUID) => [...venueKeys.tables(), "detail", id] as const,
  staff: () => [...venueKeys.all, "staff"] as const,
  staffListOfVenue: (venueId: GUID) => [...venueKeys.staff(), "list", venueId] as const,
  staffListOfVenuePaged: (venueId: GUID, params: Pagination) => [...venueKeys.staffListOfVenue(venueId), params] as const,
};

