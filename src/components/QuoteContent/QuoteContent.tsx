import React from "react";

import type { QuoteProperties, Status } from "@/types";

import Card from "../Card";
import ErrorCard from "../ErrorCard";
import Spinner from "../Spinner";
import styles from "./QuoteContent.module.css";

export interface QuoteContentProps {
  status: Status;
  // optional, since may be undefined
  quoteProperties?: QuoteProperties;
  error?: string;
}

function QuoteContent({ status, quoteProperties, error }: QuoteContentProps) {
  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorCard error={error} />;
  }

  // no need to check for idle state! state must
  //   be "idle" if we haven't returned yet
  if (quoteProperties) {
    const { quote, colors } = quoteProperties;
    return (
      <Card textColor={colors.text} backgroundColor={colors.background}>
        {quote}
      </Card>
    );
  }

  return undefined;
}

export default QuoteContent;
