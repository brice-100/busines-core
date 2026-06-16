import type { Metadata } from "next";
import DecryptagesClient from "./DecryptagesClient";

export const metadata: Metadata = {
  title: "Décryptages",
  description: "Articles d’analyse et veille marché sur la fintech et la finance.",
};

export default function DecryptagesPage() {
  return <DecryptagesClient />;
}