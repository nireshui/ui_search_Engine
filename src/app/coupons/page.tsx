import { CouponsPage } from "@/components/management-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coupons & Offers | HotelBook Admin",
  description: "Create and manage promotional codes across your hotel portfolio.",
};

export default function Coupons() {
  return <CouponsPage />;
}
