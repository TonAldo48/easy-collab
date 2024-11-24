import {Client} from "@notionhq/client";

const notion = new Client({auth: process.env.NOTION_API_KEY});

export default async function handler(req, res) {
    try {
        const databaseId = process.env.NOTION_DATABASE_ID;
        const response = await notion.databases.query({
            database_id: databaseId,
        });

        // Extract relevant project information from the response
        const projects = response.results.map((page) => {
            return {
                id: page.id,
                title:
                    page.properties.title?.title[0]?.plain_text || "Untitled",
                description:
                    page.properties.description?.rich_text[0]?.plain_text || "",
                technologies:
                    page.properties.technologies?.rich_text[0]?.plain_text ||
                    "",
            };
        });

        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch projects from Notion"});
    }
}
