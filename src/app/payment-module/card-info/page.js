"use client";

import { useSearchParams } from "next/navigation";
import CreditCardForm from "../../components/CreditCardForm";

export default function CreditCardPage() {
  const searchParams = useSearchParams();
  const consumerUrl = searchParams.get("consumerUrl") || "";

  return <CreditCardForm consumerUrl={consumerUrl} />;
}
