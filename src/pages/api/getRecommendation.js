import { Client } from "@notionhq/client";
import OpenAI from 'openai';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userInput, filters } = req.body;
    
    if (!userInput) {
      return res.status(400).json({ message: 'User input is required' });
    }

    // Get all projects from Notion with filters
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: buildNotionFilters(filters)
      }
    });

    // Convert projects to searchable format
    const projects = response.results.map(page => ({
      id: page.id,
      title: page.properties.Name.title[0]?.plain_text || '',
      description: page.properties.Description.rich_text[0]?.plain_text || '',
      technologies: page.properties.Technologies.multi_select.map(tech => tech.name) || [],
      difficulty: page.properties.Difficulty.select?.name || '',
      lookingFor: page.properties['Looking For'].rich_text[0]?.plain_text || '',
    }));

    // Use OpenAI to get recommendations
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a project recommendation assistant. Your task is to analyze user interests and skills to recommend suitable projects.
Consider:
- Technical skill requirements
- Project difficulty level
- Technology stack alignment
- Project scope and complexity

Return recommendations in this exact format (no additional text):
{
  "recommendations": [
    {
      "id": "project_id",
      "explanation": "Detailed explanation of why this project matches"
    }
  ]
}

Recommend exactly 3 projects (or fewer if not enough matches).`
        },
        {
          role: "user",
          content: `Available projects:\n${JSON.stringify(projects, null, 2)}\n\nUser interests and skills: ${userInput}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    try {
      const aiResponse = JSON.parse(completion.choices[0].message.content);
      
      // Match AI recommendations with full project details
      const recommendations = aiResponse.recommendations.map(rec => ({
        ...projects.find(p => p.id === rec.id),
        explanation: rec.explanation
      }));

      return res.status(200).json({ recommendations });
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return res.status(500).json({ message: 'Error processing AI response' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error processing recommendation' });
  }
}

function buildNotionFilters(filters = {}) {
  const notionFilters = [];
  
  if (filters.difficulty) {
    notionFilters.push({
      property: "Difficulty",
      select: {
        equals: filters.difficulty
      }
    });
  }

  if (filters.technologies && filters.technologies.length > 0) {
    const techFilters = filters.technologies.map(tech => ({
      property: "Technologies",
      multi_select: {
        contains: tech
      }
    }));
    
    if (techFilters.length > 0) {
      notionFilters.push({
        or: techFilters
      });
    }
  }

  return notionFilters;
}
