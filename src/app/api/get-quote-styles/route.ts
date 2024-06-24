import { NextResponse } from "next/server";

import { getRandomQuote } from "@/helpers/random-quotes";

export function GET() {
  const generatedQuote = getRandomQuote();

  return NextResponse.json({ quote: generatedQuote });
}
