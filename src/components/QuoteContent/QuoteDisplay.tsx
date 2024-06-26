import { GoogleFontsStatus, useGoogleFonts } from "@flyyer/use-googlefonts";
import React from "react";

import { QuoteProperties } from "@/types";

import Card from "../Card";
import styles from "./QuoteDisplay.module.css";
import QuoteStyleItem from "./QuoteStyleItem";

async function loadFontFace(fontFace: FontFace) {
  const loadedFont = await fontFace.load();
  document.fonts.add(loadedFont);
}

export interface QuoteDisplayProps {
  quoteProperties: QuoteProperties;
}

export function QuoteDisplay({ quoteProperties }: QuoteDisplayProps) {
  const { quote, description, colors, fontName } = quoteProperties;

  const font = useGoogleFonts([
    {
      family: fontName,
      styles: [400],
    },
  ]);

  if (font.status === GoogleFontsStatus.FAILED) {
    console.error(font.error);
  } else {
    console.log(font.href);
  }

  const fontStyle = {
    fontFamily: fontName,
  };

  // to avoid FOUT
  const textColor =
    font.status === GoogleFontsStatus.LOADING ? colors.background : colors.text;

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

export default QuoteDisplay;
