export async function generateEmail(prompt: string) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error("Request failed");
  const data = await res.json();
  return data.choices[0].message.content as string;
}
