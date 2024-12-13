# EasyCollab

EasyCollab is a web platform that helps developers find collaborators for their projects. Users can submit project ideas, browse existing projects, and connect with potential collaborators.

## Features

- 🔐 **User Authentication**: Secure email/password authentication using Firebase
- 💡 **Project Submission**: Submit your project ideas with detailed descriptions
- 🔍 **Project Discovery**: Browse and search through submitted project ideas
- 🏷️ **Technology Tags**: Filter projects by technology stack
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🗃️ **Notion Integration**: Project data stored and managed using Notion API

## Tech Stack

- **Frontend**: Next.js 13+ (App Router), React, TailwindCSS
- **Authentication**: Firebase Authentication
- **Database**: Notion Database
- **Styling**: Tailwind CSS, HeadlessUI
- **Icons**: Heroicons

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- Firebase account
- Notion account and API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/easy-collab.git
cd easy-collab
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API routes
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── submit-idea/      # Project submission page
│   └── view-ideas/       # Project browsing page
├── components/            # Reusable components
├── firebase/             # Firebase configuration
└── styles/               # Global styles
```

## Features in Detail

### Authentication
- Email/password signup and login
- Protected routes for authenticated users
- Secure session management

### Project Submission
- Submit project ideas with title, description, and requirements
- Tag projects with relevant technologies
- Specify time commitment and difficulty level
- Add contact information for interested collaborators

### Project Discovery
- Browse all submitted projects
- Filter projects by technology stack
- Search projects by keyword
- Sort by various criteria

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Setting Up Notion Integration

1. Create a new Notion integration at [Notion Developers](https://developers.notion.com/)
2. Create a new database in Notion with the following properties:
   - Name (title)
   - Description (rich text)
   - Technologies (multi-select)
   - Looking For (rich text)
   - Difficulty (select)
   - Time Commitment (rich text)
   - Contact Info (rich text)
3. Share your database with the integration
4. Copy your integration token and database ID to the `.env.local` file

## Setting Up Firebase Authentication

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Create a web app in your Firebase project
4. Copy the Firebase configuration to your `.env.local` file

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Notion API](https://developers.notion.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [HeadlessUI](https://headlessui.dev/)
