# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands are run from the root of the project:

- `npm install` - Install dependencies
- `npm run build` - Build production site to `./dist/`
- `npm run preview` - Preview build locally
- `npm run astro` - Run Astro CLI commands
- `prettier . --write` - Format code with Prettier

## Architecture

This is an **Astro-based Hebrew landing page** with static site generation. Key architectural points:

### Tech Stack
- **Astro v5** with static output (`output: "static"`)
- **TailwindCSS v4** for styling (integrated via Vite plugin)
- **Hebrew language support** with RTL layout (`lang="he" dir="rtl"`)
- **TypeScript** with strict configuration
- **Rubik font** for Hebrew text display

### Project Structure
- `src/pages/index.astro` - Main entry point that imports Layout
- `src/layouts/Layout.astro` - Main layout with all page sections
- `src/components/` - Individual section components (Hero, AboutMe, ContactForm, etc.)
- `src/scripts/ContactForm.js` - Client-side form validation and submission
- `src/utils/phone.js` - Phone number validation using libphonenumber-js
- `src/styles/global.css` - Global styles with CSS custom properties and Tailwind

### Styling System
- Uses CSS custom properties for colors (defined in `:root`)
- Dark theme ready with duplicate color definitions
- Hebrew-friendly font stack with Rubik as primary
- Custom utility classes: `.purple-hue` for gradient overlays, `.nav-open` for navigation

### Contact Form Architecture
- Form submits to external API at `https://landingapi.roeytech.dev/lead`
- Client-side validation for name, email, phone (Israeli), and privacy consent
- Uses libphonenumber-js for Israeli phone number validation
- Visual feedback with border colors (green/red for valid/invalid)
- Hebrew error messages and success notifications

### Deployment
- Static build output for hosting
- PM2 configuration in `ecosystem.config.cjs` (though conflicts with static output setting)
- Production server setup configured for port 8080

## Important Notes
- All text content is in Hebrew
- Form validation specifically targets Israeli phone numbers
- Uses external API for lead submission (not serverless functions)
- Layout.astro contains the complete page structure as a single-page application