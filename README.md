# Clinton Amayo — Fullstack Software Developer

A portfolio website showcasing projects, writing, and skills in backend development, APIs, and developer tooling.

## Built With

- **React 19** — UI framework
- **Vite 7** — Build tooling and dev server
- **Tailwind CSS 4** — Styling
- **shadcn/ui** — Component primitives
- **wouter** — Client-side routing
- **TypeScript 5** — Type safety

## Getting Started

### Prerequisites

- Node.js 20.19+ (or Node.js 22.12+)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Opens the dev server at `http://localhost:3000`.

### Build

```bash
pnpm build
```

Outputs to `dist/` (client build in `dist/public/`, server bundle as `dist/index.js`).

### Preview

```bash
pnpm preview
```

Serves the production build locally.

### Type Check

```bash
pnpm check
```

## Project Structure

```
.
├── client/              # Frontend source
│   ├── index.html       # HTML template
│   ├── public/          # Static assets (portrait, resume)
│   └── src/
│       ├── App.tsx      # Root component + routing
│       ├── main.tsx     # React entry point
│       ├── pages/       # Route pages (Home, NotFound)
│       ├── components/  # UI components + shadcn/ui
│       ├── hooks/       # Custom React hooks
│       ├── contexts/    # Context providers
│       ├── lib/         # Utilities
│       └── index.css    # Global styles
├── server/              # Express backend
├── shared/              # Shared constants
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── pnpm-lock.yaml       # Lockfile
```

## Available Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `pnpm dev`      | Start the Vite dev server            |
| `pnpm build`    | Build client and server bundles      |
| `pnpm start`    | Run the production server            |
| `pnpm preview`  | Preview the production build         |
| `pnpm check`    | Run TypeScript type checking         |
| `pnpm format`   | Format code with Prettier            |

## Author

Clinton Amayo — fullstack software developer based in Kisumu, Kenya, building backend services, APIs, and developer tools with Go, JavaScript, Ruby, PostgreSQL, and Docker.
