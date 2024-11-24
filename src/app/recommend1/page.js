"use client";
import { useState } from "react";
import Navbar from "../../components/navbar";

export default function GetRecommendation() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[DEBUG] Form submitted with user input:", userInput);

    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      console.log("[DEBUG] Sending request to process-recommendation API...");
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        const text = await response.text(); // Capture raw response
        console.error("[ERROR] API response error:", text);
        throw new Error(
          `API Error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("[DEBUG] API response data:", data);
      setRecommendation(data.recommended_project_id);
    } catch (err) {
      console.error("[ERROR] Failed to get recommendation:", err);
      setError(
        err.message || "Could not get a recommendation. Please try again later."
      );
    } finally {
      console.log("[DEBUG] Request processing complete");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-full">
        {/* Navbar */}
        <Navbar currentTab={"get-recommendation"} />

        {/* Page Header */}
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Get a Project Recommendation
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Describe your interests, and we'll recommend a suitable project.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-8 bg-white p-6 shadow-md rounded-lg"
            >
              {/* User Input Field */}
              <div>
                <label
                  htmlFor="userInput"
                  className="block text-sm font-medium text-gray-700"
                >
                  Describe your interests
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
                    placeholder="Tell us about your passions, skills, and goals..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center px-4 py-2 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    loading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500 text-white"
                  }`}
                >
                  {loading ? "Finding Recommendation..." : "Get Recommendation"}
                </button>
              </div>
            </form>

            {/* Recommendation Section */}
            {recommendation && (
              <div className="mt-8 p-6 bg-green-100 text-green-800 rounded-md shadow-md">
                <h3 className="text-xl font-bold mb-2">Recommended Project ID:</h3>
                <p className="text-lg font-semibold text-gray-900">{recommendation}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 text-center bg-red-100 text-red-800 rounded-md">
                {error}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
