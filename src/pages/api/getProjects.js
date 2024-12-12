import {Client} from "@notionhq/client";

const notion = new Client({auth: process.env.NOTION_API_KEY});

const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
                {
                    property: 'Created time',
                    direction: 'descending',
                },
            ],
        });

        const projects = response.results.map(page => ({
            id: page.id,
            title: page.properties.Name.title[0]?.plain_text || '',
            description: page.properties.Description.rich_text[0]?.plain_text || '',
            technologies: page.properties.Technologies.multi_select.map(tech => tech.name) || [],
            difficulty: page.properties.Difficulty.select?.name || '',
            creator: page.properties.Creator.rich_text[0]?.plain_text || 'Anonymous',
            lookingFor: page.properties['Looking For'].rich_text[0]?.plain_text || '',
            createdAt: page.created_time,
        }));

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Error fetching projects' });
    }
}
