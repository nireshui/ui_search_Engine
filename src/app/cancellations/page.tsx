import { CancellationsPage } from "@/components/management-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Management | HotelBook Admin",
  description: "Review requests, approve refunds, and track resolution status.",
};

export default function Cancellations() {
  return <CancellationsPage />;
}
