export type Status = "idle" | "loading" | "error";

export interface QuoteProperties {
  quote: string;
  description: string;
  colors: {
    text: string;
    background: string;
  };
  fontName: string;
}
