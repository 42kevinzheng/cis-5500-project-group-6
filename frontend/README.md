# MusicCharts

A modern music charts website displaying trending songs, top artists, and popular albums with country-specific filtering for 10 different regions.

## Features

- 🌍 Browse charts for 10 regions (US, Spain, UK, Italy, France, Mexico, Argentina, Japan, South Korea, and Worldwide)
- 🎵 View top songs, artists, and albums
- 👤 Create user accounts (stored in localStorage)
- ❤️ Like/unlike songs, artists, and albums
- 📊 View your liked items in your profile
- 🎨 Modern purple-blue gradient theme with responsive design

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons
- **localStorage** - Data persistence (no backend required)

## Project Structure

```
/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── AlbumCard.tsx
│   ├── ArtistCard.tsx
│   ├── AuthDialog.tsx
│   ├── ChartItem.tsx
│   └── UserProfile.tsx
├── contexts/           # React contexts
│   └── UserContext.tsx # User authentication & likes
├── data/              # Static data
│   └── chartData.ts   # Chart data for all countries
├── styles/            # Global styles
│   └── globals.css
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.html         # HTML template

```

## How It Works

### User Authentication
- Users can register and login
- Credentials are stored in browser's localStorage
- No backend server required
- Sessions persist across page refreshes

### Like System
- Authenticated users can like songs, artists, and albums
- Likes are stored per user in localStorage
- Heart buttons show filled state when liked
- Profile page displays all liked items with statistics

## Data Persistence

All user data (accounts, likes) is stored in the browser's localStorage:
- `users` - Array of registered users
- `currentUser` - Currently logged-in user
- `likes_{userId}` - Liked items for each user

**Note:** Data is stored locally in your browser and will be lost if you clear browser data.

## License

This project is open source and available for personal and commercial use.
