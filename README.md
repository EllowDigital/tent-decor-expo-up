# Tent Decor Expo UP — Event Website

The website project for Tent Decor Expo UP and the 4th Mahadhiveshan, associated with the 2026 edition in Kanpur. This repository contains the event-facing web experience and deployment assets; it is not the event registration database or the portable offline EventHub application.

## Project overview

- Event information and promotional pages
- Responsive visitor experience and calls to action
- Event-specific content and media
- SEO and social-sharing metadata
- Asset-generation and asset-verification scripts

Confirm event facts, association branding, sponsor details, and any live registration links with the event organizer before publishing updates. Because the advertised 2026 dates have passed, avoid wording that presents the event as upcoming unless a new edition is announced.

## Technology stack

- React and TypeScript
- Vite
- TanStack Start and TanStack Router
- Tailwind CSS and reusable UI components
- Netlify Vite integration
- Asset generation and verification scripts

## Requirements

- Node.js and npm (use versions compatible with the lockfile and deployment environment)

## Local development

```bash
git clone https://github.com/EllowDigital/tent-decor-expo-up.git
cd tent-decor-expo-up
npm ci
npm run dev
```

## Build and verification

```bash
npm run build
npm run verify:assets
npm run lint
npm run format
```

The project has prebuild and postbuild hooks that generate or verify assets. Check `package.json` and the scripts under `scripts/` before changing the build pipeline.

## Deployment

The repository includes Netlify integration/configuration. Verify the correct site, branch, build command, output, domain, environment values, and redirect behavior before deploying. Use test/deploy previews to review changes before promoting them.

## Content and privacy

Only publish approved event, attendee, sponsor, exhibitor, and partner information. Never commit attendee lists, registration exports, private contact details, or service credentials. Check analytics, embedded forms, and external links when changing data collection behavior.

## Contributing

For significant changes, discuss the proposed work with the maintainer first. Keep pull requests focused and include build/test results. Do not include private event data or credentials in issue reports.

## License

See [LICENSE](LICENSE). Project-specific code, event branding, copy, photography, and sponsor assets are not granted for open-source reuse unless the relevant rights holder expressly authorizes it. Third-party libraries retain their own licenses.
