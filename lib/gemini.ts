const fetch = require('node-fetch'); // Ensure fetch is available in your project

// Interface for error details (for reference)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""; // Load the API Key from environment variables
const GEMINI_BASE_URL = "https://api.gemini.example.com"; // Replace with the actual API endpoint

// Export the matchSkills function
module.exports = {
  matchSkills: async function (jobSkills, seekerSkills) {
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is missing. Add it to your .env.local file.");
    }

    try {
      // Prepare the payload
      const payload = {
        jobSkills, // List of skills from the job posting
        seekerSkills // List of skills from the job seekers
      };

      // Make the API call
      const response = await fetch(`${GEMINI_BASE_URL}/match-skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GEMINI_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      // Handle the response
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Gemini API Error: ${response.status} - ${errorDetails.message || 'Unknown error'}`);
      }

      // Return the response data
      return await response.json();
    } catch (error) {
      console.error("Error while matching skills with Gemini API:", error);
      throw error;
    }
  }
};
