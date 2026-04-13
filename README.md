# Spreadsheet App

A Google Sheets-inspired spreadsheet application built with **Next.js**, **TypeScript**, and **Zustand** for state management. Supports formula evaluation, cell referencing, and real-time updates across the grid.

## Features

- **Editable grid** — click any cell to edit; supports keyboard navigation
- **Formula support** — evaluate basic arithmetic formulas (e.g. `=A1+B2`, `=SUM(A1:A5)`)
- **Cell referencing** — formulas update reactively when referenced cells change
- **Zustand store** — global spreadsheet state managed cleanly outside React components
- **Tailwind CSS styling** — clean, minimal UI

## Tech Stack

- Next.js (App Router)
- TypeScript
- Zustand (state management)
- Tailwind CSS

## Project Structure

```
spreadsheet-app/
├── app/        # Next.js app directory
├── store/      # Zustand store for cell state
└── public/     # Static assets
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design Decisions

- **Zustand over Context** — chosen for its minimal boilerplate and ability to handle frequent cell updates without unnecessary re-renders across the entire grid
- **Formula evaluation** — formulas are parsed and evaluated client-side; cell dependency graph is tracked to trigger re-evaluation on changes
