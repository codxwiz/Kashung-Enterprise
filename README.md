# Kashung Enterprise

Premium marketing website for Kashung Enterprise, a digital product studio building websites, software, and apps for startups and entrepreneurs across Northeast India.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Meta Pixel and Conversions API

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_META_PIXEL_ID` to the Meta Dataset/Pixel ID before building the site. Configure the same value as the Worker's `META_DATASET_ID`, and store the Conversions API token as the `META_ACCESS_TOKEN` Worker secret. Set `META_GRAPH_API_VERSION` explicitly to the current Graph API version shown in Meta Events Manager.

Use `META_TEST_EVENT_CODE` only while checking delivery in **Events Manager → Test events**, then remove it so production events are not marked as test traffic. Browser and server `PageView` events share an `event_id` for deduplication and are sent only after the visitor accepts optional marketing cookies.

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
