export type GUID = string & { readonly _brand: unique symbol };

export default function asGUID(id: string): GUID {
  const guidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!guidRegex.test(id)) {
    throw new Error("Invalid GUID format");
  }

  return id as GUID;
}

export function isEmpty(id: string): boolean {
  if (id === "00000000-0000-0000-0000-000000000000") return true;
  return false;
}
