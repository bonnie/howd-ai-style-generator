"use client";

import Button from "@/components/Button";
import QuoteContent from "@/components/QuoteContent";
import Separator from "@/components/Separator";
import useQuoteStyles from "@/hooks/use-quote-styles";

export default function Home() {
  const { status, error, quoteProperties, fetchQuoteStyles } = useQuoteStyles();

  return (
    <main>
      <Button onClick={fetchQuoteStyles}>use random quote</Button>
      <Separator />
      <QuoteContent
        status={status}
        quoteProperties={quoteProperties}
        error={error}
      />
    </main>
  );
}
