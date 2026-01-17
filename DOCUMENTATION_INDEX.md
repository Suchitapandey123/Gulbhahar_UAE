# Gulbhahar Website - Documentation Index

This directory contains comprehensive documentation for the Gulbhahar e-commerce website built with Next.js. Use this index to quickly navigate to the information you need.

## 📋 Documentation Files

### 🏗️ [CODEBASE_STRUCTURE.md](./CODEBASE_STRUCTURE.md)
**Complete project structure overview**
- Directory organization and file locations
- Framework and technology stack details
- Key features and development commands
- Dependencies and configuration overview

### 🧩 [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md)
**Component location and usage guide**
- Navigation components (Navbar, Footer)
- Page components (Homepage, Product pages, Auth)
- UI components (Loaders, Cards, Forms)
- Component usage patterns and responsive design

### 🔌 [API_DATA_FLOW.md](./API_DATA_FLOW.md)
**API endpoints and data management**
- API route structure and endpoints
- Data flow architecture and state management
- External integrations (Analytics, Payment, AWS)
- Caching strategies and error handling

### 🛠️ [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
**Development workflows and common tasks**
- Quick file access map for modifications
- Common development tasks and patterns
- File modification templates
- Troubleshooting and debugging guide

### ⚙️ [CONFIGURATION_REFERENCE.md](./CONFIGURATION_REFERENCE.md)
**Configuration files and settings**
- Next.js, Tailwind, and build configurations
- Environment variables and deployment settings
- Analytics and SEO configurations
- Performance optimization settings

## 🚀 Quick Start Guide

### For New Developers
1. Read [CODEBASE_STRUCTURE.md](./CODEBASE_STRUCTURE.md) for project overview
2. Review [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) for UI components
3. Check [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for common tasks

### For Modifications
1. Use [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) "Need to modify..." section
2. Reference [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) for component locations
3. Check [API_DATA_FLOW.md](./API_DATA_FLOW.md) for data-related changes

### For Configuration Changes
1. Refer to [CONFIGURATION_REFERENCE.md](./CONFIGURATION_REFERENCE.md)
2. Check environment variables and build settings
3. Review performance and SEO configurations

## 📁 Project Structure Quick Reference

```
Gulbhahar_website/
├── 📄 Documentation Files (this directory)
│   ├── CODEBASE_STRUCTURE.md
│   ├── COMPONENT_REFERENCE.md
│   ├── API_DATA_FLOW.md
│   ├── DEVELOPMENT_GUIDE.md
│   └── CONFIGURATION_REFERENCE.md
│
├── 🎨 Frontend (/src)
│   ├── all_components/     # Reusable UI components
│   ├── app/               # Next.js App Router pages
│   ├── hooks/             # Custom React hooks
│   ├── Providers/         # Context providers
│   └── utils/             # Utility functions
│
├── 🖼️ Assets (/public)
│   ├── home-page/         # Homepage images
│   ├── about/             # About page images
│   ├── login/             # Authentication images
│   └── [various]/         # Other page assets
│
└── ⚙️ Configuration
    ├── next.config.mjs    # Next.js configuration
    ├── tailwind.config.js # Tailwind CSS setup
    ├── package.json       # Dependencies
    └── .env               # Environment variables
```

## 🔍 Common Use Cases

### "I need to modify the homepage"
→ [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) → Homepage Content section

### "I need to add a new page"
→ [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) → Adding a New Page section

### "I need to understand the API structure"
→ [API_DATA_FLOW.md](./API_DATA_FLOW.md) → API Routes section

### "I need to find a specific component"
→ [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) → Component location tables

### "I need to change configuration"
→ [CONFIGURATION_REFERENCE.md](./CONFIGURATION_REFERENCE.md) → Specific config section

### "I need to understand the project structure"
→ [CODEBASE_STRUCTURE.md](./CODEBASE_STRUCTURE.md) → Directory Structure section

## 🎯 Key Technologies

- **Framework**: Next.js 15.5.9 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context + TanStack Query
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Deployment**: AWS Amplify
- **Analytics**: Google Analytics, Facebook Pixel, Microsoft Clarity

## 📞 Development Support

### File Locations Quick Access
- **Homepage**: `/src/all_components/Homepage/HomePage.js`
- **Navigation**: `/src/all_components/Navbar/Main.js`
- **Product Pages**: `/src/app/products/[id]/page.js`
- **API Routes**: `/src/app/api/`
- **Global Styles**: `/src/app/globals.css`
- **Configuration**: Root level config files

### Common Commands
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run linting
```

---

**Note**: This documentation is designed to help AI assistants and developers quickly understand and modify the codebase. Each file contains detailed information for specific aspects of the project. Always refer to the most relevant documentation file for your current task.