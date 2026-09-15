import { ReportsPage } from "@/components/management-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Reports | HotelBook Admin",
  description: "Analyze portfolio performance and export operational reports.",
};

export default function Reports() {
  return <ReportsPage />;
}
