# Sketcha

A collaborative digital whiteboard application for creating diagrams, sketches, and visual notes in real-time.


## Overview

Sketcha is a modern collaborative whiteboard application that allows users to draw shapes, write text, and create diagrams on an interactive canvas. Built with performance and real-time collaboration in mind, Sketcha leverages WebSocket technology to enable multiple users to work together seamlessly.

### Key Features

- **Interactive Canvas**: High-performance drawing powered by Konva.js with support for shapes, lines, text, and freehand drawing
- **Rich Toolbar**: 12+ drawing tools including pen, shapes, arrows, text, and image insertion
- **Real-time Collaboration**: WebSocket infrastructure for multi-user editing (in development)
- **Modern UI**: Clean, responsive interface with glassmorphism design using Tailwind CSS and DaisyUI
- **Authentication**: Secure user authentication with Better Auth and Prisma ORM
- **Dark Theme**: Beautiful dark mode interface optimized for extended use

## Tech Stack

### Frontend

| Technology                                     | Version | Purpose                         |
| ---------------------------------------------- | ------- | ------------------------------- |
| [Next.js](https://nextjs.org/)                 | 16.1.0  | React framework with App Router |
| [React](https://react.dev/)                    | 19.2.0  | UI library                      |
| [TypeScript](https://www.typescriptlang.org/)  | 5.9.2   | Type-safe JavaScript            |
| [Tailwind CSS](https://tailwindcss.com/)       | 4.1.18  | Utility-first CSS framework     |
| [DaisyUI](https://daisyui.com/)                | 5.5.17  | Tailwind component library      |
| [Jotai](https://jotai.org/)                    | 2.17.1  | Atomic state management         |
| [Konva](https://konvajs.org/)                  | 10.2.0  | HTML5 Canvas library            |
| [React-Konva](https://konvajs.org/docs/react/) | 19.2.2  | React bindings for Konva        |
| [Lucide React](https://lucide.dev/)            | 0.563.0 | Icon library                    |

### Backend

| Technology                                                              | Purpose                   |
| ----------------------------------------------------------------------- | ------------------------- |
| [Bun](https://bun.sh/)                                                  | Runtime & package manager |
| [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) | Real-time communication   |
| [Better Auth](https://www.better-auth.com/)                             | Authentication framework  |
| [Prisma](https://www.prisma.io/)                                        | Database ORM              |
| [PostgreSQL](https://www.postgresql.org/)                               | Relational database       |

### Development Tools

| Technology                        | Purpose              |
| --------------------------------- | -------------------- |
| [Turborepo](https://turbo.build/) | Monorepo task runner |
| [ESLint](https://eslint.org/)     | Code linting         |
| [Prettier](https://prettier.io/)  | Code formatting      |

## Project Structure

```
Sketcha/
├── apps/
│   ├── sketcha/              # Next.js 16 frontend
│   │   ├── app/              # App router pages
│   │   ├── components/       # React components
│   │   │   ├── canvas/       # Canvas components
│   │   │   ├── toolbar/      # Toolbar components
│   │   │   └── menu/         # Menu components
│   │   ├── store/            # Jotai state management
│   │   │   ├── state/        # Atom definitions
│   │   │   └── types/        # TypeScript types
│   │   └── public/           # Static assets
│   │
│   └── server/               # Bun WebSocket server
│       ├── index.ts          # Server entry point
│       └── echo.ts           # WebSocket handlers
│
├── packages/
│   ├── ui/                   # Shared UI components
│   ├── db_auth_service/      # Database & authentication
│   ├── eslint-config/        # Shared ESLint configurations
│   └── typescript-config/    # Shared TypeScript configurations
│
├── package.json              # Root monorepo configuration
└── turbo.json                # Turborepo configuration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.3.2 or higher
- Node.js 18+ (for compatibility)
- PostgreSQL database (for authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/sketcha.git
   cd sketcha
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   # Copy example environment files
   cp apps/sketcha/.env.example apps/sketcha/.env.local
   cp apps/server/.env.example apps/server/.env
   ```

4. **Set up the database**

   ```bash
   cd packages/db_auth_service
   bunx prisma migrate dev
   ```

5. **Start development servers**

   ```bash
   # Start all apps
   bun run dev

   # Or start individually
   cd apps/sketcha && bun run dev    # http://localhost:3000
   cd apps/server && bun run dev     # ws://localhost:8080
   ```

## Development

### Available Commands

```bash
# Run all apps in development mode
bun run dev

# Build all applications
bun run build

# Run ESLint across all apps
bun run lint

# Format code with Prettier
bun run format

# Type-check all packages
bun run check-types
```

### App-Specific Commands

**Frontend (apps/sketcha):**

```bash
cd apps/sketcha
bun run dev        # Start dev server on port 3000
bun run build      # Build for production
bun run start      # Start production server
bun run lint       # Run ESLint
bun run check-types # Run type checking
```

**Server (apps/server):**

```bash
cd apps/server
bun run dev        # Start WebSocket server on port 8080
bun run build      # Build server
bun run start      # Start production server
```

## Architecture

### State Management

Sketcha uses [Jotai](https://jotai.org/) for atomic state management:

```typescript
// atoms for global state
const toolAtom = atom<toolTypes>("none"); // Selected drawing tool
const lockAtom = atom<boolean>(false); // Canvas lock state
const menuAtom = atom<boolean>(false); // Menu visibility
```

### Component Structure

- **Canvas** (`components/canvas/`): Konva.js-based drawing surface
- **Toolbar** (`components/toolbar/`): Floating tool selection UI
  - `toolarea.tsx`: Main toolbar container with glassmorphism design
  - `toolbutton.tsx`: Individual tool buttons
  - `lockbutton.tsx`: Canvas lock toggle

### Styling

- **Tailwind CSS v4**: Utility-first styling with PostCSS
- **DaisyUI**: Pre-built component classes (buttons, cards, etc.)
- **CSS Variables**: Theme colors defined in `globals.css`

## Contributing

We welcome contributions! Please follow these guidelines:

### Code Style

- **TypeScript**: Strict mode enabled with comprehensive type checking
- **Naming**:
  - Components: PascalCase (e.g., `ToolButton.tsx`)
  - Files: PascalCase for components, camelCase for utilities
  - Variables/Functions: camelCase
  - Types/Interfaces: PascalCase
- **Imports**: Use ES modules with named exports
- **Components**: Use functional components with explicit return types

### Development Workflow

1. **Fork and clone** the repository
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following the code style guidelines
4. **Run checks before committing**:
   ```bash
   bun run check-types
   bun run lint
   bun run format
   ```
5. **Commit your changes** with clear, descriptive messages
6. **Push to your fork** and create a Pull Request

### Pull Request Guidelines

- Provide a clear description of the changes
- Include screenshots for UI changes
- Ensure all checks pass (types, lint, build)
- Reference any related issues

### Reporting Issues

When reporting bugs or requesting features, please include:

- Clear description of the issue
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

## Roadmap

### Current Status

- [x] Basic canvas with Konva.js
- [x] Toolbar with tool selection
- [x] Jotai state management
- [x] WebSocket server infrastructure
- [x] Authentication setup (Better Auth + Prisma)

### Planned Features

- [ ] Drawing functionality for all tools (pen, shapes, arrows, etc.)
- [ ] Real-time collaboration via WebSocket
- [ ] User authentication flows
- [ ] Canvas persistence and storage
- [ ] Export to image/PDF
- [ ] Undo/redo functionality
- [ ] Layers support
- [ ] Collaborative cursors

## License

[MIT](LICENSE) - See LICENSE file for details.

## Acknowledgments

- [Konva.js](https://konvajs.org/) for the powerful canvas library
- [Better Auth](https://www.better-auth.com/) for authentication
- [DaisyUI](https://daisyui.com/) for beautiful UI components
- [Turborepo](https://turbo.build/) for monorepo management

---

Built with ❤️ using Next.js, Bun, and modern web technologies.
