import React from "react";

import type { Status } from "@/types";

import Card from "../Card";
import ErrorCard from "../ErrorCard";
import Spinner from "../Spinner";
import styles from "./QuoteContent.module.css";

export interface QuoteContentProps {
  status: Status;
  // optional, since may be undefined
  quote?: string;
  error?: string;
}

function QuoteContent({ status, quote, error }: QuoteContentProps) {
  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorCard error={error} />;
  }

  // no need to check for idle state! state must
  //   be "idle" if we haven't returned yet
  if (quote) {
    return (
      <Card textColor="aliceBlue" backgroundColor="mediumBlue">
        {quote}
      </Card>
    );
  }

  return undefined;
}

export default QuoteContent;
