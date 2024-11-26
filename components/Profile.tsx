"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ProfileSetupPage() {
  const searchParams = useSearchParams(); // Get the search params from the URL
  const name = searchParams?.get("name") ?? ""; // Retrieve the 'name' query param
  const email = searchParams?.get("email") ?? ""; // Retrieve the 'email' query param

  const [formData, setFormData] = useState({
    name: name || "",
    aboutMe: "",
    skills: "",
    userEmail: email || "", // Initialize with email from query params
  });

  useEffect(() => {
    if (name && email) {
      // If name and email are available in the query params, you can use them
      setFormData((prev) => ({
        ...prev,
        userEmail: email,
      }));
    }
  }, [name, email]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send data to the API
    const response = await fetch("/api/profile-setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      alert("Profile saved successfully and job recommendations sent!");
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="aboutMe">About Me</Label>
        <Textarea
          id="aboutMe"
          name="aboutMe"
          placeholder="Tell us about yourself"
          value={formData.aboutMe}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="skills">Skills</Label>
        <Textarea
          id="skills"
          name="skills"
          placeholder="List your skills separated by commas"
          value={formData.skills}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div className="grid gap-2">
        <Label htmlFor="userEmail">Your Email</Label>
        <Textarea
          id="userEmail"
          name="userEmail"
          placeholder="Your email for job recommendations"
          value={formData.userEmail}
          onChange={handleChange}
          required
        />
      </div> */}
      <Button type="submit">Save Profile</Button>
    </form>
  );
}
