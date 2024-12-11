"use client";

import {useState, useEffect} from "react";
import Navbar from "../../components/navbar";

export default function ProjectIdeasListing() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch("/api/getProjects");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Debug log
                console.log("Fetched data:", data);

                // Check if data is an array
                if (!Array.isArray(data)) {
                    console.error("Data structure:", data);
                    throw new Error("Data fetched is not in the expected format");
                }

                setProjects(data);
            } catch (error) {
                console.error("Error fetching project ideas:", error);
                setError("Failed to load project ideas. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    return (
        <>
            <div className="min-h-full">
                {/* Navbar with currentTab set to 'view-ideas' */}
                <Navbar currentTab={"view-ideas"} />

                {/* Header section */}
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Projects and Ideas
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Explore our collection of innovative ideas that you
                            can contribute to.
                        </p>
                    </div>
                </header>

                {/* Main content */}
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {loading ? (
                            <p className="text-gray-700">Loading projects...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                                    >
                                        <div className="p-6">
                                            {/* Project Title */}
                                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                                {project.title}
                                            </h3>

                                            {/* Project Description */}
                                            <p className="text-gray-600  mb-4">
                                                {project.description}
                                            </p>

                                            {/* Technologies Used */}
                                            <div className="mb-4">
                                                <span className="text-gray-700 font-bold">
                                                    Technologies:
                                                </span>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {project.technologies}
                                                </div>
                                            </div>

                                            {/* Looking For */}
                                            {/* <div className="mb-4">
                                                <span className="text-gray-700 font-medium">
                                                    Looking For:
                                                </span>
                                                <p className="text-gray-600 mt-1">
                                                    {project.lookingFor}
                                                </p>
                                            </div> */}

                                            {/* View More Button */}
                                            <button
                                                onClick={() => {
                                                    const notionBaseUrl =
                                                        process.env
                                                            .NEXT_PUBLIC_NOTION_BASE_URL;
                                                    const formattedTitle =
                                                        project.title.replace(
                                                            /\s+/g,
                                                            "-"
                                                        ); // Replace spaces with dashes
                                                    const sanitizedId =
                                                        project.id.replace(
                                                            /-/g,
                                                            ""
                                                        ); // Remove dashes from the ID
                                                    const projectUrl = `${notionBaseUrl}/${formattedTitle}-${sanitizedId}`;
                                                    window.open(
                                                        projectUrl,
                                                        "_blank"
                                                    ); // Opens in a new tab
                                                }}
                                                className="mt-4 inline-flex items-center px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                View More
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
