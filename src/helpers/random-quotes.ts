import { quotes } from "../../data/quotes";

export const getRandomQuote = () => {
  const randomQuoteId = Math.floor(Math.random() * quotes.length);
  return quotes[randomQuoteId];
};
