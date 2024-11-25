const { matchSkills } = require('./gemini');

async function testGeminiAPI() {
  const jobSkills = ["JavaScript", "React", "Node.js"];

  const seekerSkills = [
    "JavaScript",
    "React",
    "Next.js",
    "Python",
    "Django",
    "SQL",
    "Node.js",
    "Express",
    "MongoDB"
  ];

  try {
    const matches = await matchSkills(jobSkills, seekerSkills);
    console.log("Matched Skills:", matches);
  } catch (error) {
    console.error("Error during Gemini API test:", error);
  }
}

testGeminiAPI();
