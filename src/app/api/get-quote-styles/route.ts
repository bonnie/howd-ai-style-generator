import { NextResponse } from "next/server";
import OpenAI from "openai";

import { getRandomQuote } from "@/helpers/random-quotes";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const systemPrompt = `You will be provided with a quotation, and your task is to generate:
 1) a hex color code that matches the mood of the quotation
 2) a contrasting color to the hex color code that matches the mood. The contrasting color should be "black" or "white", whichever has the higher WCAG contrast ratio compared to the color that matches the mood.

Write your output in json with these keys: 
"hex_color"
"text_color"
`;

export async function GET() {
  const generatedQuote = getRandomQuote();

  const messages = [
    {
      // https://github.com/openai/openai-node/issues/639
      role: "system" as const,
      content: systemPrompt,
    },
    {
      role: "user" as const,
      content: generatedQuote,
    },
  ];

  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
    // https://platform.openai.com/docs/guides/text-generation/json-mode
    response_format: { type: "json_object" },
    // https://platform.openai.com/docs/api-reference/chat/create#chat-create-temperature
    temperature: 0.7,
    // https://platform.openai.com/docs/api-reference/chat/create#chat-create-max_tokens
    max_tokens: 256,
  });

  const rawStyles = completion.choices[0].message.content;
  // to avoid TypeScript error with `JSON.parse`
  if (!rawStyles) {
    return NextResponse.json({
      quote: generatedQuote,
    });
  }

  try {
    const styles = JSON.parse(rawStyles);

    return NextResponse.json({
      quote: generatedQuote,
      colors: { background: styles.hex_color, text: styles.text_color },
    });
  } catch (error) {
    // in production app, record error to logs
    console.error(error);
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/error_static
    return NextResponse.error();
  }
}
