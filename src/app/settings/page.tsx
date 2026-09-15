import { SettingsPage } from "@/components/management-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | HotelBook Admin",
  description: "Configure booking rules, cancellations, payments, and notifications.",
};

export default function Settings() {
  return <SettingsPage />;
}
