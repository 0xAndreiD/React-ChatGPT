import { Configuration, OpenAIApi } from "openai";

import store from "~/store";
import { Message } from "~/enums";

export async function requestCompletion(prompt: string) {
  const {
    auth: { apiKey },
  } = store.getState();

  const configuration = new Configuration({ apiKey });

  const openai = new OpenAIApi(configuration);

  try {
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.9,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });
    return { data: { answer: data.choices[0].text } };
  } catch {
    return { data: { message: Message.SomethingWrong } };
  }
}

export async function requestImageUrl(keyword: string) {
  const {
    auth: { apiKey },
  } = store.getState();

  const configuration = new Configuration({ apiKey });

  const openai = new OpenAIApi(configuration);

  try {
    const { data } = await openai.createImage({
      prompt: keyword,
      n: 1,
      size: "512x512",
    });
    const { url } = data.data[0];
    return { data: { url } };
  } catch {
    return { data: { message: Message.SomethingWrong } };
  }
}

export async function requestCodeExplanation(code: string) {
  const {
    auth: { apiKey },
  } = store.getState();

  const configuration = new Configuration({ apiKey });

  const openai = new OpenAIApi(configuration);

  const prompt = `Can you provide a step-by-step breakdown of how the following code works, using Markdown formatting?
${code}`;

  try {
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return { data: { text: data.choices[0].text } };
  } catch {
    return { data: { message: Message.SomethingWrong } };
  }
}
