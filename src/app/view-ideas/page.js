"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import DifficultyBadge from "../../components/DifficultyBadge";

export default function ProjectIdeasListing() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/getProjects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError('Error loading projects. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-full">
      <Navbar currentTab={"view-ideas"} />
      
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Projects and Ideas
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Explore innovative project ideas and find opportunities to collaborate.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  const notionBaseUrl = process.env.NEXT_PUBLIC_NOTION_BASE_URL;
                  const formattedTitle = project.title.replace(/\s+/g, "-");
                  const sanitizedId = project.id.replace(/-/g, "");
                  window.open(`${notionBaseUrl}/${formattedTitle}-${sanitizedId}`, "_blank");
                }}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2 text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <DifficultyBadge difficulty={project.difficulty} />
                    <span className="text-sm text-gray-600">
                      {project.lookingFor}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
