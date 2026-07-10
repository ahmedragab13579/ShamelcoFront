// constants/dashboardNavigation.tsx
import { DashboardHomeIcon, ReportsIcon, SettingsIcon } from "../../../Icons/Icons";

export const getDashboardNavItems = (homePath: string) => [
  { name: "الرئيسية", path: homePath, icon: <DashboardHomeIcon /> },
  { name: "التقارير", path: `${homePath}/reports`, icon: <ReportsIcon /> },
  { name: "الإعدادات", path: `${homePath}/settings`, icon: <SettingsIcon /> },
  { name:"الحساب", path: `profile`, icon: <SettingsIcon /> },
    { name:"المزيد من العمليات", path: `${homePath}/more-actions`, icon: <SettingsIcon /> },


];