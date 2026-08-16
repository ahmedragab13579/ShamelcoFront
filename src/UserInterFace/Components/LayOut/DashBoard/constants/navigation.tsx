import { DashboardHomeIcon, ReportsIcon, SettingsIcon } from "../../../Icons/Icons";
import { Star } from "lucide-react";

export const getDashboardNavItems = (homePath: string) => [
  { name: "HOME", path: homePath, icon: <DashboardHomeIcon /> },
  { name: "REVIEWS", path: `${homePath}/reviews`, icon: <Star className="w-5 h-5 text-shamelco-gold" /> },
  { name: "REPORTS", path: `${homePath}/reports`, icon: <ReportsIcon /> },
  { name: "SETTINGS", path: `${homePath}/settings`, icon: <SettingsIcon /> },
  { name:"PROFILE", path: `profile`, icon: <SettingsIcon /> },
  { name:"MORE_ACTION", path: `${homePath}/more-actions`, icon: <SettingsIcon /> },
];