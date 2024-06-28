"use client";

import React from "react";

import Button from "../Button";
import styles from "./QuoteForm.module.css";

export interface QuoteStyleFormProps {
  fetchQuoteStyles: (quote?: string) => Promise<void>;
  startOver: () => void;
}

const QuoteStyleForm = ({
  fetchQuoteStyles,
  startOver,
}: QuoteStyleFormProps) => {
  const [quote, setQuote] = React.useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    fetchQuoteStyles(quote);
  };
  const reset = () => {
    startOver();
    setQuote("");
  };

  const buttonLabel = quote ? "generate styles" : "use random quote";

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.enterQuote}>
          <textarea
            value={quote}
            placeholder="Enter a quote..."
            onChange={(event) => setQuote(event.target.value)}
          />
          <div className={styles.quoteButtons}>
            <Button type="button" variant="outline" onClick={reset}>
              start over
            </Button>
            <Button type="submit">{buttonLabel}</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuoteStyleForm;
