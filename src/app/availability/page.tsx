import { AvailabilityPage } from "@/components/management-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Availability Management | HotelBook Admin",
  description: "Update inventory and manage room blocks across properties.",
};

export default function Availability() {
  return <AvailabilityPage />;
}
