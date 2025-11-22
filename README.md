YatraFlow

YatraFlow is a Road Safety Management System built entirely with React + Vite. It provides real-time accident and hazard reporting, live analytics, zone-wise tracking, and advanced filtering—all using local storage without any backend. The platform empowers traffic management teams, emergency responders, and city authorities to make roads safer.

🛠 Tech Stack

Frontend: React, TypeScript, Vite, Tailwind CSS

Charts & Visualization: Recharts

Icons: Lucide-React

Storage: Browser LocalStorage

Hosting: Netlify / any static host

📂 Project Structure
YATRAFLOW2/
├─ public/
│  ├─ favicon.ico
│  └─ index.html
├─ src/
│  ├─ assets/               
│  │  └─ alarm.mp3
│  ├─ components/           
│  │  ├─ ThemeToggle.tsx
│  │  ├─ ui/
│  │  │  ├─ button.tsx
│  │  │  ├─ card.tsx
│  │  │  ├─ table.tsx
│  │  │  ├─ input.tsx
│  │  │  ├─ label.tsx
│  │  │  ├─ dialog.tsx
│  │  │  └─ radio-group.tsx
│  ├─ contexts/
│  │  └─ AuthContext.tsx
│  ├─ lib/
│  │  ├─ storage.ts
│  │  ├─ dynamicgenerator.ts
│  │  └─ types.ts
│  ├─ pages/
│  │  ├─ Landing.tsx
│  │  └─ Dashboard.tsx
│  ├─ charts/
│  │  └─ ChartSection.tsx
│  ├─ tables/
│  │  └─ ReportsTable.tsx
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
└─ README.md

🔧 Installation

Clone the repo:

git clone https://github.com/AYUS2005/YATRAFLOW2.git
cd YATRAFLOW2


Install dependencies:

npm install


Run development server:

npm run dev


Build for production:

npm run build


Preview production build locally (optional):

npm run preview

