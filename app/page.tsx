import type { Metadata } from "next";
import { LeadRadar } from "./lead-radar";

export const metadata: Metadata = {
  title: "Радар лидов | LeadMap",
  description:
    "Находите локальный бизнес, которому нужен сайт под ключ или CRM.",
};

export default function Home() {
  return <LeadRadar />;
}
