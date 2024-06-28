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

  const fetchQuoteStyles = async (incomingQuote?: string) => {
    // reset error
    setError(undefined);

    try {
      // start request
      setStatus("loading");

      const baseUrl = "/api/get-quote-styles";
      const url = incomingQuote
        ? encodeURI(`${baseUrl}?quote=${incomingQuote}`)
        : baseUrl;

      const response = await fetch(url);
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

  const startOver = () => {
    setQuoteProperties(undefined);
    setError(undefined);
  };

  return {
    status,
    error,
    quoteProperties,
    fetchQuoteStyles,
    startOver,
  };
}

export default useQuoteStyles;
