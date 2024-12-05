export type Status = "idle" | "loading" | "error";

export interface QuoteProperties {
  quote: string;
  colors: {
    text: string;
    background: string;
  };
  // include font later
}
