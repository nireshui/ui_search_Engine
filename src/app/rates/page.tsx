import { RatesPage } from "@/components/management-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rates & Pricing | HotelBook Admin",
  description: "Configure room rates, discounts, taxes, and date-based pricing.",
};

export default function Rates() {
  return <RatesPage />;
}
