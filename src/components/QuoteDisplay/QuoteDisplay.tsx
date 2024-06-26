import React from "react";

import type { QuoteProperties, Status } from "@/types";

import ErrorCard from "../ErrorCard";
import Spinner from "../Spinner";
import QuoteDetails from "./QuoteDetails";
import styles from "./QuoteDisplay.module.css";

export interface QuoteDisplayProps {
  status: Status;
  // optional, since may be undefined
  quoteProperties?: QuoteProperties;
  error?: string;
}

function QuoteDisplay({ status, quoteProperties, error }: QuoteDisplayProps) {
  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorCard error={error} />;
  }

  // no need to check for idle state! state must
  //   be "idle" if we haven't returned yet
  if (quoteProperties) {
    return <QuoteDetails quoteProperties={quoteProperties} />;
  }

  return undefined;
}

export default QuoteDisplay;
