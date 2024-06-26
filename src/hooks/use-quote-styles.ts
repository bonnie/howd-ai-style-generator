import React from "react";

import type { QuoteProperties, Status } from "@/types";

// https://x.com/mattpocockuk/status/1627686849396211716?lang=en
const isValidJson = (json: any) => {
  return (
    json?.quote &&
    json?.colors?.text &&
    json?.colors?.background &&
    json?.description &&
    json?.fontName
  );
};

function useQuoteStyles() {
  const [quoteProperties, setQuoteProperties] =
    React.useState<QuoteProperties>();
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string>();

  const fetchQuoteStyles = async () => {
    // reset error
    setError(undefined);

    try {
      // start request
      setStatus("loading");
      const response = await fetch("/api/get-quote-styles");
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      if (!isValidJson(json)) {
        throw new Error("Malformed response");
      }

      setQuoteProperties(json);
      setStatus("idle");
    } catch (error) {
      setError(error?.toString());
      setStatus("error");
    }
  };

  return { status, error, quoteProperties, fetchQuoteStyles };
}

export default useQuoteStyles;
