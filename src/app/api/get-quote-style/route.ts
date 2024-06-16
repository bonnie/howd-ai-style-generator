import { NextResponse } from "next/server";

import { getRandomQuote } from "@/helpers/random-quotes";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function GET() {
  const generatedQuote = getRandomQuote();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "user", content: "Describe Dolly Parton in three words" },
    ],
    model: "gpt-3.5-turbo",
  });

  const responseText = completion.choices[0].message.content;
  console.log("===========> RESPONSE", responseText);

  return NextResponse.json({ quote: generatedQuote });
}
