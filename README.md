# Rhea Mae Bustamante Portfolio

React and TypeScript portfolio powered by Vite. The former standalone HTML, CSS, and JavaScript implementation has been replaced with a component-based React app.

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Project structure

```text
src/
  App.tsx          Main portfolio component
  main.tsx         React entry point
  styles.css       Portfolio styles
  vite-env.d.ts    Vite type declarations
index.html         Vite HTML entry
vite.config.ts     Vite React configuration
tsconfig.json      TypeScript configuration
```

## Production build

```bash
npm run build
npm run preview
```

The build checks TypeScript before creating the Vite production bundle.

## Create a React TypeScript Vite project

```bash
npm create vite@latest my-project -- --template react-ts
cd my-project
npm install
npm run dev
```

The current project uses the `react-ts` Vite template.
