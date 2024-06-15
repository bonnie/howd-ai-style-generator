import React from "react";

import type { Status } from "@/types";

function useQuoteStyles() {
  const [quote, setQuote] = React.useState<string>();
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string>();

  const fetchQuoteStyles = async () => {
    // reset error
    setError(undefined);

    try {
      // start request
      setStatus("loading");
      const response = await fetch("/api/get-quote-style");
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      if (!json?.quote) {
        throw new Error("Malformed response");
      }

      setQuote(json.quote);
      setStatus("idle");
    } catch (error) {
      setError(error?.toString());
      setStatus("error");
    }
  };

  return { status, error, quote, fetchQuoteStyles };
}

export default useQuoteStyles;
