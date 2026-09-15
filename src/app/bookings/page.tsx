import { BookingsPageComponent } from "@/components/bookings-page-component";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookings Management | HotelBook Admin",
  description: "Search, filter, review, and handle reservation operations across all properties.",
};

export default function BookingsPage() {
  return <BookingsPageComponent />;
}
