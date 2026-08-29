# Kashung Enterprise

Premium marketing website for Kashung Enterprise, a digital product studio building websites, software, and apps for startups and entrepreneurs across Northeast India.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
```

`npm test` creates a production build and verifies every public route, shared navigation, policy content, search metadata, and project image asset.

## Routes

- `/` — company overview and services
- `/portfolio` — selected work
- `/contact` — email and Instagram contact options
- `/terms` — terms of service
- `/privacy` — privacy policy
- `/refund-policy` — payment, refund, and revision policy

The site is built with React, Vinext, GSAP, and the OpenAI Sites deployment workflow.
