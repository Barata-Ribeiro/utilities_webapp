# Utilities Web App

A collection of focused utilities implemented as a modern Next.js application using the `app` router with TypeScript and
Tailwind CSS.
Built with composable UI primitives (Radix + shadcn/ui), the project organizes converters, calculators and utilities
into reusable components and routes for easy extension.
Provides PWA/service worker support, light/dark theming, and small server/client actions (ex: get\-ip, get\-jokes) to
power practical utilities.

Demo: https://utilities-webapp.vercel.app/

## 🧰 Key details

- **Framework**: Next.js (app router)
- **Language**: TypeScript + React
- **Styling**: Tailwind CSS
- **UI primitives**: Radix UI components for SHADCN/UI
- **Package manager**: pnpm

## 📁 What this repository contains

- `src/app` — Next.js app routes and pages (converters, calculators, utilities, about, etc.)
- `src/components` — shared UI and feature components (converters, calculators, utilities subcomponents)
- `src/lib` — utilities and helpers
- `src/actions` — small server/client actions used by pages (examples: get-ip, get-jokes)

## ✨ Notable features

- **Converters**: bytes, length, mass, speed, temperature, time
- **Calculators**: General, BMI, Dates, GCF/LCM, Percentage, Rule of Three
- **Utilities**: Character Counter, Lorem Ipsum, Password Generator(random, memorable, pin), QR Code Generator,
  Roman Converter, URL Slug Generator
- **Programming Utilities**: Image to Base64
- Light/dark theme switching (next-themes)
- Responsive layout with accessible UI primitives (Radix + custom shadcn/ui components)
- Project built with modern tooling: Next.js, TypeScript, Tailwind and linting
- Service Worker for offline support (unstable) and PWA (workbox)

MORE TO COME...

## ⚙️ Local development

1. Clone the repository

    ```bash
    git clone https://github.com/Barata-Ribeiro/utilities_webapp.git
    cd utilities_webapp
    ```

2. Install dependencies (pnpm is recommended)

    ```bash
    pnpm install
    ```

3. Run the development server

    ```bash
    pnpm run dev
    ```

## 🧩 Available scripts (from package.json)

- `pnpm run dev` — start Next.js in development (uses turbopack)
- `pnpm run build` — build for production
- `pnpm run start` — start built production server
- `pnpm run lint` — run linter

## 📝 Notes

- Routes are implemented under `src/app` (Next.js app router). Static files (icons, manifest) live in the `public/`
  directory.
- The project uses pnpm as package manager (see `packageManager` in package.json).

## 🤝 Contributing

Contributions are welcome. Open an issue to discuss larger changes before preparing a pull request. Keep changes small
and add descriptions/tests where appropriate.

## 📬 Get in Touch

Feel free to contact me with any questions or if you are interested in collaborating on a project.

🔗 [LinkedIn](https://www.linkedin.com/in/barataribeiro/)

## 📜 License

This project is free software available under the [GPLv3](LICENSE) license.
