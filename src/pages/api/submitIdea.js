
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, technologies, lookingFor } = req.body;

    try {
      await notion.pages.create({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: title,
                },
              },
            ],
          },
          description: {
            rich_text: [
              {
                text: {
                  content: description,
                },
              },
            ],
          },
          technologies: {
            rich_text: [
              {
                text: {
                  content: technologies,
                },
              },
            ],
          },
          lookingFor: {
            rich_text: [
              {
                text: {
                  content: lookingFor,
                },
              },
            ],
          },
        },
      });

      res.status(200).json({ message: 'Idea added successfully!' });
    } catch (error) {
      console.error('Error adding idea to Notion:', error);
      res.status(500).json({ error: 'Failed to add idea' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
