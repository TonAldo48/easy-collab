"use client";

import { useState } from "react";
import Navbar from "../../components/navbar";

export default function SubmitIdea() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    lookingFor: "",
    difficulty: "Intermediate",
    timeCommitment: "",
    contactInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const availableTechnologies = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "GraphQL",
    "PostgreSQL",
    "MongoDB",
    "Vue.js",
    "Angular",
    "Django",
    "Flask",
    "Docker",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/submitIdea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          title: "",
          description: "",
          technologies: [],
          lookingFor: "",
          difficulty: "Intermediate",
          timeCommitment: "",
          contactInfo: "",
        });
      } else {
        setError(data.error || "Failed to submit project idea");
      }
    } catch (error) {
      console.error("Error submitting idea:", error);
      setError("An error occurred while submitting your idea");
    } finally {
      setLoading(false);
    }
  };

  const toggleTechnology = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }));
  };

  return (
    <div className="min-h-full">
      <Navbar currentTab="submit-idea" />
      
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Submit Project Idea
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 shadow-lg rounded-xl">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">Project idea submitted successfully!</div>
            </div>
          )}

          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your project title..."
              required
            />
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe your project idea..."
              required
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTechnologies.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTechnology(tech)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    formData.technologies.includes(tech)
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Time Commitment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Commitment
            </label>
            <input
              type="text"
              value={formData.timeCommitment}
              onChange={(e) => setFormData({...formData, timeCommitment: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., 5-10 hours/week"
              required
            />
          </div>

          {/* Looking For */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Looking For
            </label>
            <textarea
              rows={3}
              value={formData.lookingFor}
              onChange={(e) => setFormData({...formData, lookingFor: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe the kind of collaborators you're looking for..."
              required
            />
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Information
            </label>
            <input
              type="text"
              value={formData.contactInfo}
              onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="How can interested collaborators reach you?"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Project Idea"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
