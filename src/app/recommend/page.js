"use client";
import {useState} from "react";
import Navbar from "../../components/navbar";

export default function GetRecommendation() {
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("[DEBUG] Form submitted with user input:", userInput);

        setLoading(true);
        setError("");
        setAnalysis(null);

        try {
            console.log("[DEBUG] Sending request to API...");
            const response = await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userInput}),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("[ERROR] API response error:", result);
                throw new Error(
                    result.error ||
                        `API Error: ${response.status} - ${response.statusText}`
                );
            }

            console.log("[DEBUG] API response data:", result);
            setAnalysis(result.analysis); // Ensure this is pre-formatted or safe HTML.
        } catch (err) {
            console.error("[ERROR] Failed to get recommendations:", err);
            setError(
                err.message ||
                    "Could not get recommendations. Please try again later."
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
                            Get Project Recommendations
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Provide your input, and we'll analyze it to give you
                            tailored recommendations.
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
                                    Enter your input
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="userInput"
                                        name="userInput"
                                        rows={4}
                                        required
                                        value={userInput}
                                        onChange={(e) =>
                                            setUserInput(e.target.value)
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Describe your skills, goals, or requirements..."
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
                                    {loading
                                        ? "Analyzing..."
                                        : "Get Recommendations"}
                                </button>
                            </div>
                        </form>

                        {/* Recommendation Section */}
                        {analysis && (
                            <div className="mt-8 p-6 bg-green-100 text-green-800 rounded-md shadow-md">
                                <h3 className="text-xl font-bold mb-2">
                                    Recommended Projects:
                                </h3>
                                <div
                                    className="prose max-w-none bg-white p-4 rounded-lg shadow"
                                    // Replace analysis with trusted HTML or plain text.
                                    dangerouslySetInnerHTML={{__html: analysis}}
                                ></div>

                                {/* Notion Link */}
                                <div className="mt-4">
                                    <a
                                        href="https://www.notion.so/your-notion-page-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                                    >
                                        View Details on Notion
                                    </a>
                                </div>
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
