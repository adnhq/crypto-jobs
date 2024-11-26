import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
const { matchSkills } = require("./gemini");
require("dotenv").config();

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro",
  googleApiKey: process.env.GOOGLE_API_KEY, // Add your Google API key in the .env file
});

async function testLangChain() {
  const jobSkills = ["JavaScript", "React", "Node.js"]; // Example job skills
  const seekerSkills = [
    ["JavaScript", "React", "Next.js"], // Skills of seeker 1
    ["Python", "Django", "SQL"],        // Skills of seeker 2
    ["Node.js", "Express", "MongoDB"],  // Skills of seeker 3
  ];

  const SystemMessage = `
    You are a helpful assistant. Based on the following matched skills, suggest the top 3 most suitable job seekers for the role.

    Job Skills: {jobSkills}
    Matched Seekers: {matchedSeekers}

    Provide detailed recommendations:
  `;

  try {
    // Step 1: Match skills using Gemini API
    const matches = await matchSkills(jobSkills, seekerSkills);
    console.log("Matches from Gemini API:", matches);

    // Step 2: Prepare the content for the LLM
    const promptContent = SystemMessage.replace(
      "{jobSkills}",
      jobSkills.join(", ")
    ).replace("{matchedSeekers}", JSON.stringify(matches));

    // Step 3: Use LLM to generate a response
    const response = await llm.invoke([
      { role: "system", content: promptContent },
    ]);

    console.log("LLM Recommendations:", response.content);
  } catch (error) {
    console.error("Error during LangChain test:", error.message);
  }
}

testLangChain();
