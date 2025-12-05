import fs from "fs";
import fetch from "node-fetch";

// Eleven Labs API key & Voice ID
const API_KEY = "7751dec2849769f6acfa4dca4281355c54ab5ddc73ba9dc4e0e4d71675b63fdc";
const VOICE_ID = "pNInz6obpgDQGcFmaJgB";

// Predefined 10 quotes
const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Don't let yesterday take up too much of today.",
  "It's not whether you get knocked down, it's whether you get up.",
  "If you are working on something exciting, it will keep you motivated.",
  "Success is not in what you have, but who you are.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Little things make big days.",
  "It’s going to be hard, but hard does not mean impossible."
];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    for (let i = 0; i < quotes.length; i++) {
      const text = quotes[i];
      const filename = `id_${i + 1}.mp3`;

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice_settings: { stability: 0.7, similarity_boost: 0.75 },
        }),
      });

      if (!response.ok) throw new Error(`Failed for quote #${i + 1}`);

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(filename, buffer);
      console.log(`Saved: ${filename}`);
    }

    res.status(200).json({ message: "All 10 audio files generated!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating audio files", error: err.message });
  }
}
