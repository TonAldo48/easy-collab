"use client";

import { useState } from "react";
import Navbar from "../../components/navbar";
import DifficultyBadge from "../../components/DifficultyBadge";

const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];
const commonTechnologies = [
  "React", "Node.js", "Python", "JavaScript", 
  "TypeScript", "GraphQL", "PostgreSQL", "MongoDB"
];

export default function GetRecommendation() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    difficulty: "",
    technologies: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const response = await fetch("/api/getRecommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput, filters }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      setError("Could not get recommendations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full">
      <Navbar currentTab={"get-recommendation"} />
      
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Get Project Recommendations
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Tell us about your interests and skills, and we'll find matching projects.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 shadow-md rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Any Difficulty</option>
                {difficultyOptions.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies
              </label>
              <div className="flex flex-wrap gap-2">
                {commonTechnologies.map(tech => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        technologies: prev.technologies.includes(tech)
                          ? prev.technologies.filter(t => t !== tech)
                          : [...prev.technologies, tech]
                      }));
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      filters.technologies.includes(tech)
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="userInput" className="block text-sm font-medium text-gray-700">
              What are you interested in?
            </label>
            <div className="mt-1">
              <textarea
                id="userInput"
                name="userInput"
                rows={4}
                required
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Example: I'm interested in web development with React and Node.js. I want to work on projects that help people..."
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-semibold ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
            >
              {loading ? "Finding matches..." : "Find Projects"}
            </button>
          </div>
        </form>

        {recommendations && recommendations.length > 0 && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Recommended Projects</h2>
            <div className="space-y-4">
              {recommendations.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <DifficultyBadge difficulty={project.difficulty} />
                    <span className="text-sm text-gray-600">{project.lookingFor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {recommendations && recommendations.length === 0 && (
          <div className="mt-8 p-6 bg-yellow-50 rounded-lg text-center">
            <p className="text-yellow-800">No matching projects found. Try different keywords!</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-50 rounded-lg text-center">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </main>
    </div>
  );
}
