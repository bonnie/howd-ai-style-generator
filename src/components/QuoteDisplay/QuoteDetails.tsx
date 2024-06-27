import { GoogleFontsStatus, useGoogleFonts } from "@flyyer/use-googlefonts";
import React from "react";

import type { QuoteProperties } from "@/types";

import Card from "../Card";
import styles from "./QuoteDetails.module.css";
import QuoteStyleItem from "./QuoteStyleItem";

export interface QuoteDetailsProps {
  quoteProperties: QuoteProperties;
}

export function QuoteDetails({ quoteProperties }: QuoteDetailsProps) {
  const { quote, description, colors, fontName } = quoteProperties;

  const font = useGoogleFonts([
    {
      family: fontName,
      styles: [400],
    },
  ]);

  // show an error if the call failed
  if (font.status === GoogleFontsStatus.FAILED) {
    console.error(font.error);
  }

  // to avoid FOUT
  const textColor =
    font.status === GoogleFontsStatus.LOADING ? colors.background : colors.text;

  const fontStyle = {
    fontFamily: fontName,
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.quoteCard}>
        <Card
          textColor={textColor}
          backgroundColor={colors.background}
          style={fontStyle}
        >
          {quote}
        </Card>
      </section>
      <section className={styles.quoteStyles}>
        <h2>Quote Properties</h2>
        <div className={styles.styleItemsGrid}>
          <QuoteStyleItem name="description" value={description} />
          <QuoteStyleItem name="color" value={colors.background} />
          <QuoteStyleItem name="font" value={fontName} />
        </div>
      </section>
    </div>
  );
}

export default QuoteDetails;
