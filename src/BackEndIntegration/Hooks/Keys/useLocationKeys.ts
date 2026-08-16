export const locationKeys = {
  all: ["locations"] as const,
  governorates: () => [...locationKeys.all, "governorates"] as const,
  cities: (governorateId?: number) =>
    [...locationKeys.all, "cities", governorateId] as const,
};
