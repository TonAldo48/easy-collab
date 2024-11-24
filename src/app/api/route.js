// app/api/process-excel/route.js
import {NextResponse} from "next/server";
import OpenAI from "openai";

// Initialize OpenAI with error handling
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
    try {
        // Verify OpenAI API key
        if (!process.env.OPENAI_API_KEY) {
            console.error("OpenAI API key is missing");
            return NextResponse.json(
                {error: "OpenAI API key is not configured"},
                {status: 500}
            );
        }

        const data = [
            {
                owner_id: 1,
                owner_name: "Alice Johnson",
                project: "Weatherly",
                project_description:
                    "A weather forecasting app with real-time updates and alerts.",
                tech_stack: ["React", "Node.js", "OpenWeather API"],
            },
            {
                owner_id: 2,
                owner_name: "Bob Smith",
                project: "EduLearn",
                project_description:
                    "An e-learning platform for interactive coding tutorials.",
                tech_stack: ["Python", "Django", "PostgreSQL", "Vue.js"],
            },
            {
                owner_id: 3,
                owner_name: "Cindy Lee",
                project: "HealthTrack",
                project_description:
                    "A fitness tracker that monitors activity and suggests personalized workouts.",
                tech_stack: ["Swift", "Core Data", "Firebase"],
            },
            {
                owner_id: 4,
                owner_name: "David Kim",
                project: "ShopEase",
                project_description:
                    "An e-commerce app with AI-driven product recommendations.",
                tech_stack: ["Java", "Spring Boot", "MongoDB", "Angular"],
            },
            {
                owner_id: 5,
                owner_name: "Ella Brown",
                project: "SafeSurf",
                project_description:
                    "A browser extension that blocks harmful content and trackers.",
                tech_stack: ["JavaScript", "Chrome Extensions API", "Firebase"],
            },
            {
                owner_id: 6,
                owner_name: "Frank Miller",
                project: "EcoLog",
                project_description:
                    "An app to track and reduce carbon footprint with daily tips.",
                tech_stack: ["React Native", "GraphQL", "Node.js"],
            },
            {
                owner_id: 7,
                owner_name: "Grace Lee",
                project: "EventConnect",
                project_description:
                    "A social app for finding and organizing local events.",
                tech_stack: ["Flutter", "Dart", "Firebase", "MySQL"],
            },
            {
                owner_id: 8,
                owner_name: "Harry Watson",
                project: "BudgetBuddy",
                project_description:
                    "A personal finance app for managing expenses and savings.",
                tech_stack: ["Kotlin", "Room Database", "SQLite"],
            },
            {
                owner_id: 9,
                owner_name: "Ivy Chen",
                project: "QuickVote",
                project_description:
                    "A platform for creating and sharing polls in real time.",
                tech_stack: ["React", "Express.js", "Socket.IO", "MongoDB"],
            },
            {
                owner_id: 10,
                owner_name: "Jake Robinson",
                project: "RecipeHunt",
                project_description:
                    "A recipe discovery app using user preferences and reviews.",
                tech_stack: ["Python", "Flask", "PostgreSQL", "HTML/CSS"],
            },
            {
                owner_id: 11,
                owner_name: "Kara Taylor",
                project: "PhotoVault",
                project_description:
                    "An app for storing and encrypting personal photos.",
                tech_stack: ["Java", "Spring Boot", "AWS S3"],
            },
            {
                owner_id: 12,
                owner_name: "Liam White",
                project: "PetCare",
                project_description:
                    "A pet care scheduling and health tracking app.",
                tech_stack: ["Flutter", "Firebase", "SQLite"],
            },
            {
                owner_id: 13,
                owner_name: "Mia Evans",
                project: "LangMaster",
                project_description:
                    "A language learning app with gamified lessons.",
                tech_stack: ["React", "Node.js", "MongoDB", "Redis"],
            },
            {
                owner_id: 14,
                owner_name: "Nathan Jones",
                project: "CryptoSafe",
                project_description:
                    "A secure cryptocurrency wallet with real-time price tracking.",
                tech_stack: ["Python", "Flask", "Blockchain APIs"],
            },
            {
                owner_id: 15,
                owner_name: "Olivia Brown",
                project: "TaskTidy",
                project_description:
                    "A task management app for teams with collaborative features.",
                tech_stack: ["Vue.js", "Firebase", "Node.js"],
            },
            {
                owner_id: 16,
                owner_name: "Peter Davis",
                project: "TravelMate",
                project_description:
                    "A travel planning app with itinerary optimization.",
                tech_stack: ["Java", "Android SDK", "Google Maps API"],
            },
            {
                owner_id: 17,
                owner_name: "Quincy Adams",
                project: "GreenThumb",
                project_description:
                    "An app for identifying and caring for plants.",
                tech_stack: ["Python", "TensorFlow", "Flutter"],
            },
            {
                owner_id: 18,
                owner_name: "Rita Patel",
                project: "CodeCollab",
                project_description:
                    "A platform for collaborative coding with live sharing.",
                tech_stack: ["React", "Node.js", "WebRTC", "Redis"],
            },
            {
                owner_id: 19,
                owner_name: "Sam Moore",
                project: "Moodly",
                project_description:
                    "An app that tracks mood patterns using journaling.",
                tech_stack: ["Kotlin", "SQLite", "Firebase"],
            },
            {
                owner_id: 20,
                owner_name: "Tina Brooks",
                project: "ArtGen",
                project_description:
                    "An AI-based art generator for creative projects.",
                tech_stack: ["Python", "PyTorch", "React"],
            },
        ];

        const userData = {
            user_id: "12345",
            username: "MunasheMukweya",
            full_name: "Munashe Mukweya",
            email: "munashe@example.com",
            bio: "Passionate about software engineering, cybersecurity, and game development. Always eager to collaborate on innovative tech projects.",
            location: "Grambling, LA, USA",
            interests: [
                "Software Engineering",
                "Cybersecurity",
                "Game Development",
                "AI & Machine Learning",
                "Open Source Contributions",
            ],
            tech_stack: {
                languages: ["Python", "C++", "JavaScript", "Java"],
                frameworks: ["React", "Node.js", "Django"],
                tools: ["Git", "Docker", "Kubernetes", "AWS"],
            },
            availability: {
                hours_per_week: 10,
                time_zone: "CST",
            },
            skills: [
                "Full-stack Development",
                "Penetration Testing",
                "Game Design",
                "Cloud Computing",
            ],
            social_links: {
                github: "https://github.com/MunasheMukweya",
                linkedin: "https://linkedin.com/in/munashemukweya",
                twitter: "https://twitter.com/MunasheMukweya",
            },
        };

        // if (!file) {
        //   return NextResponse.json(
        //     { error: 'No file provided' },
        //     { status: 400 }
        //   );
        // }

        // const bytes = await file.arrayBuffer();
        // const buffer = Buffer.from(bytes);

        // let workbook;
        // try {
        //   workbook = XLSX.read(buffer, {
        //     type: 'buffer',
        //     cellDates: true,
        //     cellNF: false,
        //     cellText: false,
        //     raw: true,
        //     WTF: false,
        //   });
        // } catch (error) {
        //   console.error('Excel parsing error:', error);
        //   return NextResponse.json(
        //     { error: 'Failed to parse Excel file. Please ensure it is a valid .xlsx or .xls file.' },
        //     { status: 400 }
        //   );
        // }

        // if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
        //   return NextResponse.json(
        //     { error: 'Invalid Excel file structure' },
        //     { status: 400 }
        //   );
        // }

        // const firstSheetName = workbook.SheetNames[0];
        // const worksheet = workbook.Sheets[firstSheetName];

        // const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        //   header: 1,
        //   raw: false,
        //   dateNF: 'yyyy-mm-dd'
        // });

        // if (!jsonData || jsonData.length < 2) {
        //   return NextResponse.json(
        //     { error: 'Excel file is empty or contains no data' },
        //     { status: 400 }
        //   );
        // }

        // const headers = jsonData[0];
        // const rows = jsonData.slice(1);

        // const formattedData = rows.map(row => {
        //   const rowData = {};
        //   headers.forEach((header, index) => {
        //     rowData[header] = row[index];
        //   });
        //   return rowData;
        // });

        try {
            // Send to OpenAI for analysis with corrected model name
            const completion = await openai.chat.completions.create({
                model: "gpt-4o", // Corrected model name
                messages: [
                    {
                        role: "system",
                        content: `Recommend projects the user should consider joining based on their user data from the selection of 
            projects available in the json data that is below. Strictly return just 1 project name and the tile and description of the from the data you would recommend. This is the data\n\ndata:\n\n${JSON.stringify(
                data
            )}`,
                    },
                    {
                        role: "user",
                        content: `User data:\n\n${JSON.stringify(userData)}`,
                    },
                ],
                temperature: 0.5,
                max_tokens: 1500,
            });

            if (
                !completion.choices ||
                !completion.choices[0]?.message?.content
            ) {
                throw new Error("No analysis generated");
            }

            return NextResponse.json({
                success: true,
                analysis: completion.choices[0].message.content,
            });
        } catch (openaiError) {
            console.error("OpenAI API error:", openaiError);

            // More specific error messages based on the error type
            if (openaiError.code === "invalid_api_key") {
                return NextResponse.json(
                    {error: "Invalid OpenAI API key"},
                    {status: 500}
                );
            } else if (openaiError.code === "model_not_found") {
                return NextResponse.json(
                    {error: "Selected GPT model is not available"},
                    {status: 500}
                );
            } else {
                return NextResponse.json(
                    {error: "Error generating analysis. Please try again."},
                    {status: 500}
                );
            }
        }
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            {error: "Server error processing file"},
            {status: 500}
        );
    }
}
