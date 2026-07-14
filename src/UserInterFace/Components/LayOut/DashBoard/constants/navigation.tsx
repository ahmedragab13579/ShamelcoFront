// constants/dashboardNavigation.tsx
import { DashboardHomeIcon, ReportsIcon, SettingsIcon } from "../../../Icons/Icons";

export const getDashboardNavItems = (homePath: string) => [
  { name: "HOME", path: homePath, icon: <DashboardHomeIcon /> },
  { name: "REPORTS", path: `${homePath}/reports`, icon: <ReportsIcon /> },
  { name: "SETTINGS", path: `${homePath}/settings`, icon: <SettingsIcon /> },
  { name:"PROFILE", path: `profile`, icon: <SettingsIcon /> },
  { name:"MORE_ACTION", path: `${homePath}/more-actions`, icon: <SettingsIcon /> },


];