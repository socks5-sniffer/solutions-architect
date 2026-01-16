# Enterprise DevSecOps Platform

A modern, AI-powered solutions architect platform featuring real-time security monitoring, compliance tracking, and intelligent technical advisory powered by Google's Gemini AI.

<img width="1360" height="638" alt="{E940CBC7-93B7-482B-9D76-65EA9B75D40B}" src="https://github.com/user-attachments/assets/17197ab6-7fde-41f5-b0e5-f91ce3b9589b" />


## 🚀 Features

- **AI Solutions Architect** - Gemini-powered chatbot providing expert advice on Kubernetes, container platforms, and DevSecOps best practices

- **Knowledge Base** - Searchable technical documentation and best practices library

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework with TypeScript
- **Vite 6** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework with modern v4 features
- **Lucide React** - Beautiful icon library
- **Recharts** - Composable charting library for data visualization

### AI & Backend
- **Google Gemini API** - Advanced AI model (Gemini 3.0 Pro) for technical advisory
- **@google/genai** - Official Google Generative AI SDK

### Development
- **TypeScript** - Type-safe JavaScript
- **PostCSS** - CSS processing with Autoprefixer
- **Inter Font** - Modern, clean typography

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Google Gemini API Key** - Get one from [Google AI Studio](https://aistudio.google.com/app/apikey)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd solutions-architect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🏗️ Project Structure

```
solutions-architect/
├── components/          # React components
│   ├── AIAdvisor.tsx   # AI chatbot interface
│   ├── Dashboard.tsx   # Analytics dashboard
│   ├── SecurityConsole.tsx
│   ├── ComplianceVault.tsx
│   └── KnowledgeBase.tsx
├── services/           # API services
│   └── gemini.ts      # Gemini AI integration
├── App.tsx            # Main app component
├── index.tsx          # App entry point
├── index.html         # HTML template
├── styles.css         # Global styles & Tailwind config
├── types.ts           # TypeScript type definitions
└── vite.config.ts     # Vite configuration

```

## 🎨 Customization

### Colors
Custom brand colors are defined in [styles.css](styles.css) using Tailwind v4's `@theme` directive:
- `--color-primary`: Main accent color (#DC2626)
- `--color-dark`: Dark background color (#1F2937)

### AI Personality
Modify the AI's behavior by editing the `systemInstruction` in [services/gemini.ts](services/gemini.ts).

## 🔒 Security

- ✅ API keys stored in `.env.local` (gitignored)
- ✅ No hardcoded secrets in source code
- ✅ Environment variables injected at build time

**Important:** Never commit `.env.local` to version control.

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

---

**Note:** This project was originally created with Google AI Studio and converted to a standard Vite + React setup for local development.
