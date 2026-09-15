import { HotelsPageComponent } from "@/components/hotels-page-component";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotels & Rooms Portfolio | HotelBook Admin",
  description: "Manage properties, room inventory, category specifications, and operating status.",
};

export default function HotelsPage() {
  return <HotelsPageComponent />;
}
