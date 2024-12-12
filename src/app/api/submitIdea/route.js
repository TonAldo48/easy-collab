import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function POST(request) {
  try {
    const { title, description, technologies, lookingFor, difficulty, timeCommitment, contactInfo } = await request.json();

    // Validate required fields
    if (!title || !description || !lookingFor || !contactInfo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the page in Notion
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [{ text: { content: title } }]
        },
        Description: {
          rich_text: [{ text: { content: description } }]
        },
        Technologies: {
          multi_select: technologies.map(tech => ({ name: tech }))
        },
        "Looking For": {
          rich_text: [{ text: { content: lookingFor } }]
        },
        Difficulty: {
          select: { name: difficulty }
        },
        "Time Commitment": {
          rich_text: [{ text: { content: timeCommitment } }]
        },
        "Contact Info": {
          rich_text: [{ text: { content: contactInfo } }]
        }
      }
    });

    return NextResponse.json(
      { message: 'Project added successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding project to Notion:', error);
    return NextResponse.json(
      { error: 'Failed to add project to database' },
      { status: 500 }
    );
  }
} 