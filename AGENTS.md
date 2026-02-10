# AGENTS.md

Guide for agentic coding agents working in this repository.

## Package Manager

**CRITICAL**: This repository uses **Bun** exclusively. Never use npm, npx, yarn, or pnpm commands.

- Always use `bun install` instead of `npm install`
- Always use `bun run <script>` instead of `npm run <script>`
- Always use `bun <command>` instead of `npx <command>`

## Repository Overview

Turborepo monorepo using Bun package manager with Next.js 16 frontend and Bun server.

- **Frontend** (`apps/sketcha`): Next.js 16, React 19, TypeScript, Tailwind CSS v4, DaisyUI
- **Server** (`apps/server`): Bun runtime
- **Package Manager**: Bun 1.3.2
- **Monorepo Tool**: Turborepo 2.7.5

## Build/Lint/Type Commands

```bash
# Run across all apps/packages
bun run build          # Build all applications
bun run dev            # Start development servers
bun run lint           # Run ESLint across all apps
bun run format         # Run Prettier on all files
bun run check-types    # Type-check all packages

# App-specific commands (run from app directory or use --filter)
cd apps/sketcha && bun run dev        # Start Next.js dev server on port 3000
cd apps/sketcha && bun run build      # Build Next.js app
cd apps/sketcha && bun run lint       # ESLint with max-warnings 0
cd apps/sketcha && bun run check-types # Run next typegen && tsc --noEmit
```

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: Enabled (`strict: true`)
- **Target**: ES2023
- **Module**: ESNext with Bundler resolution
- **JSX**: Preserve (Next.js) or react-jsx (libraries)
- **Key flags**: `isolatedModules: true`, `noUncheckedIndexedAccess: true`

### Imports & Exports

- Use ES modules (`"type": "module"` in package.json)
- Prefer named exports for components and utilities
- Import React hooks and types explicitly when needed
- Use `"use client"` directive for client components

### Naming Conventions

- **Components**: PascalCase (e.g., `Canvas.tsx`, `ToolButton.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables/Functions**: camelCase
- **Types/Interfaces**: PascalCase (e.g., `ToolTypes`, `ToolButtonProps`)
- **Constants**: camelCase or UPPER_SNAKE_CASE

### Component Patterns

- Use functional components with explicit return types when helpful
- Props interface named `[ComponentName]Props`
- Place components in `components/[feature]/[Component].tsx`
- Store state in `store/state/` using Jotai atoms
- Define types in `store/types/`

### Styling (Tailwind CSS v4)

- Use Tailwind utility classes
- DaisyUI component classes: `btn`, `btn-primary`, `btn-outline`, etc.
- CSS variables for fonts: `--font-geist-sans`, `--font-geist-mono`
- Global styles in `app/globals.css`

### Error Handling

- TypeScript strict mode catches most issues at build time
- Use explicit error boundaries in React where appropriate
- ESLint rules prevent common mistakes

### State Management

- Use Jotai for global state (atoms in `store/state/`)
- Define atom types explicitly
- Keep atoms focused and composable

## ESLint Configuration

- Base config: `@repo/eslint-config`
- Next.js apps use `nextJsConfig` from `@repo/eslint-config/next-js`
- Plugins: TypeScript, React, React Hooks, Next.js, Prettier, Turbo
- All rules set to "warn" (via eslint-plugin-only-warn)
- Max warnings: 0 (treats warnings as errors)

## File Structure

```
apps/
  sketcha/           # Next.js frontend
    app/             # App router pages
    components/      # React components
    store/           # Jotai state management
    public/          # Static assets
  server/            # Bun server
packages/
  eslint-config/     # Shared ESLint configs
  typescript-config/ # Shared TS configs
```

## Testing

No test framework currently configured. To add tests:

- Consider Bun's built-in test runner (`bun test`)
- Or Vitest for compatibility

## Pre-commit Checklist

Before completing any task:

1. Run `bun run check-types` - ensure no TypeScript errors
2. Run `bun run lint` - ensure no linting errors
3. Run `bun run format` - format with Prettier
4. Verify app builds: `bun run build`

## Environment

- Bun 1.3.2 (package manager) - use exclusively
- Node.js >= 18 (for compatibility)
- No test framework currently set up
