// pages/api/profile-setup.js

import { matchSkills } from "./gemini"; // Import matchSkills from your logic
import nodemailer from "nodemailer"; // Nodemailer for email sending
import { getJobListings } from "@/lib/actions";

export default async function handler(req, res) {
  //   console.log("Request body:", req.body);
  const jobs = (await getJobListings()) || [];
  console.log(jobs);
  if (req.method === "POST") {
    const { name, aboutMe, skills, userEmail } = req.body; // Added userEmail for dynamic email sending

    if (!aboutMe || !skills || !userEmail) {
      return res.status(400).json({ error: "About Me, Skills, and User Email are required" });
    }

    try {
      // Step 1: Define user profile
      const user = {
        name: name,
        description: aboutMe,
        skills: skills.split(",").map((skill) => skill.trim()),
      };

      // Step 2: Updated job data
    //   const jobs = [
    //     {
    //       "title": "Senior Product Manager",
    //       "company": "NexusChain Technologies",
    //       "skills": ["USDT", "Product", "Crypto"]
    //     },
    //     {
    //       "title": "React Developer",
    //       "company": "Quantum Blockchain Solutions (QBS)",
    //       "skills": ["React", "Frontend", "Next.js"]
    //     },
    //     {
    //       "title": "Senior Smart Contract Developer",
    //       "company": "NexusChain Solutions",
    //       "skills": ["React", "Frontend", "Next.js"]
    //     },
    //     {
    //       "title": "React Engineer",
    //       "company": "Sandhani Life Insurance",
    //       "skills": ["React", "Frontend", "Next.js"]
    //     },
    //     {
    //       "title": "React Engineer",
    //       "company": "Sandhani Life Insurance",
    //       "skills": ["React", "Frontend", "Next.js"]
    //     },
    //     {
    //       "title": "Senior Blockchain Developer",
    //       "company": "CryptoNova: Revolutionizing Digital Finance",
    //       "skills": ["React", "Frontend", "Next.js"]
    //     },
    //     {
    //       "title": "React Engineer",
    //       "company": "Sandhani Life Insurance",
    //       "skills": ["React", "Frontend", "Next.js"]
    //     }
    //   ];

      // Step 3: Match user with jobs
      const matches = await matchSkills([user], jobs);

      console.log("Matched Jobs:", JSON.stringify(matches, null, 2));

      // Filter jobs with scores >= 70 and sort them by descending match score
      const recommendedJobs = matches[0].recommendations
        .filter((job) => {
          const numericMatchScore = parseInt(job.matchScore.replace("%", ""), 10);
          return numericMatchScore >= 70;
        })
        .sort((a, b) => {
          const scoreA = parseInt(a.matchScore.replace("%", ""), 10);
          const scoreB = parseInt(b.matchScore.replace("%", ""), 10);
          return scoreB - scoreA; // Sort by descending match score
        });

      console.log("Recommended Jobs (Filtered & Sorted):", recommendedJobs);

      // Step 4: Send email with job recommendations (if any)
      if (recommendedJobs.length > 0) {
        const transporter = nodemailer.createTransport({
          service: "Gmail", // You can replace this with your email service
          auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password or app password
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: userEmail, // Use the email from the request body
          subject: "Recommended Jobs Based on Your Profile",
          html: `  
            <h3>Hi ${user.name},</h3>
            <p>Based on your profile, here are some job recommendations:</p>
            <ul>
              ${recommendedJobs
              .map(
                (job) =>
                  `<li><strong>${job.jobTitle}</strong> at <em>${job.company}</em></li>`
              )
              .join("")}
            </ul>
            <p>Best of luck in your job search!</p>
          `,
        };

        console.log("Mail: ", mailOptions);
        await transporter.sendMail(mailOptions);
      }

      // Respond with the list of recommended jobs
      res.status(200).json({ success: true, recommendedJobs });
    } catch (error) {
      console.error("Error during job matching or email sending:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
