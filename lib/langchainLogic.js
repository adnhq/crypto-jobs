const { LLMChain, PromptTemplate } = require("langchain");
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
const { matchSkills } = require("./gemini");

// Initialize OpenAI LLM
const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-pro",
    googleApiKey: process.env.GOOGLE_API_KEY,
  });

// Define a prompt template for LangChain
const template = `You are a helpful assistant. Based on the following matched skills, suggest the top 3 most suitable job seekers for the role.

Job Skills: {jobSkills}
Matched Seekers: {matchedSeekers}

Provide detailed recommendations:
`;

const prompt = new PromptTemplate({
  inputVariables: ["jobSkills", "matchedSeekers"],
  template
});

const chain = new LLMChain({ llm, prompt });

async function processJobMatching(jobSkills, seekerSkills) {
  try {
    // Step 1: Match skills using Gemini API
    const matches = await matchSkills(jobSkills, seekerSkills);
    console.log("Matches from Gemini API:", matches);

    // Step 2: Use LangChain to process recommendations
    const result = await chain.call({
      jobSkills: jobSkills.join(", "),
      matchedSeekers: JSON.stringify(matches)
    });

    return result;
  } catch (error) {
    console.error("Error in LangChain processing:", error.message);
    throw error;
  }
}

module.exports = { processJobMatching };
