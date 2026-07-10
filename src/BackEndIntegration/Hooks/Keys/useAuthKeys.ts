export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  action: (data:string) => [...authKeys.all, data] as const,

};