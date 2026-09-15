import { PaymentsPage } from "@/components/management-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Management | HotelBook Admin",
  description: "Track collections, pending transactions, failures, and refunds.",
};

export default function Payments() {
  return <PaymentsPage />;
}
