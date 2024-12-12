import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper to fetch projects from getProjects API
async function fetchProjects() {
  try {
    console.log("[DEBUG] Fetching projects from getProjects API...");

    const response = await fetch(`${process.env.API_BASE_URL}/getProjects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error("[ERROR] Failed to fetch projects:", response.status, response.statusText);
      throw new Error('Failed to fetch projects from getProjects API');
    }

    const data = await response.json();
    console.log("[DEBUG] Projects fetched successfully:", data.projects);
    return data.projects || [];
  } catch (error) {
    console.error("[ERROR] Error fetching projects:", error);
    throw new Error('Unable to retrieve projects.');
  }
}

export async function POST(request) {
  console.log("[DEBUG] Received POST request to process-recommendation...");
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("[ERROR] OpenAI API key is missing");
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Parse the request body to get user input
    const body = await request.json();
    const { userInput } = body;
    console.log("[DEBUG] User input received:", userInput);

    if (!userInput || typeof userInput !== 'string') {
      console.error("[ERROR] Invalid or missing user input.");
      return NextResponse.json(
        { error: 'Invalid or missing user input.' },
        { status: 400 }
      );
    }

    // Fetch projects from getProjects API
    const projects = await fetchProjects();
    console.log("[DEBUG] Projects to analyze:", JSON.stringify(projects, null, 2));

    // Prepare OpenAI messages
    const messages = [
      {
        role: "system",
        content: `You are a helpful assistant tasked with recommending projects from a list based on user preferences.`,
      },
      {
        role: "user",
        content: `Here are the available projects:\n\n${JSON.stringify(projects, null, 2)}\n\nAnd here is the user's input:\n\n"${userInput}"\n\nRecommend the most suitable project for the user. Return the recommended project's ID.`,
      },
    ];
    console.log("[DEBUG] OpenAI messages prepared:", messages);

    // Send request to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Specify the model
      messages,
      temperature: 0.7, // Adjust for creativity
      max_tokens: 500, // Limit response size
    });
    console.log("[DEBUG] OpenAI response received:", completion);

    // Extract and validate response
    if (!completion.choices || !completion.choices[0]?.message?.content) {
      console.error("[ERROR] No valid response from OpenAI");
      throw new Error("No valid response from OpenAI");
    }

    const recommendation = completion.choices[0].message.content.trim();
    console.log("[DEBUG] Recommendation generated:", recommendation);

    // Respond with the recommendation
    return NextResponse.json({
      success: true,
      recommended_project_id: recommendation,
    });
  } catch (error) {
    console.error("[ERROR] Error processing recommendation:", error);
    return NextResponse.json(
      { error: 'Failed to generate recommendation. Please try again.' },
      { status: 500 }
    );
  }
}
