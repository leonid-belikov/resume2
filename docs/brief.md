# Brief: portfolio site

Updated: 2026-11-26. This is the project's Intent: goal, audience, site structure, content and MVP criteria. Agent rules and technical conventions live in `CLAUDE.md`.

## Goal and audience
- Primary audience: recruiters and employers.
- Purpose: present Leonid as a frontend developer (8 years) who works with an AI-assisted process.
- Core idea: the evolution from a "classical" programmer with deep experience into a developer amplified by agentic coding. The site should show the best of both schools: a deep understanding of fundamentals and the speed gained from automation.

## Language
- English only.

## Site structure
- **Home page**: hero, short about, brief mentions of projects with links to their pages, experience/skills, contacts.
- **Project page** (one per project): detailed description. Template: problem → solution → stack → links.
- **Contacts**: LinkedIn, GitHub, Telegram, email. The CV link downloads a PDF file.

Assumption: experience/skills stay on the home page as short blocks, with no separate pages.

## Content
- There are no finished projects to show yet. Ideas exist; building them is a set of separate tasks later.
- The list of projects and the layout will change as projects are added; no generic structure is designed up front.
- MVP: a project page template plus one placeholder project.
- Texts: the agent drafts, Leonid edits.

## Technical constraints
- No database, blog or CMS.
- Content is stored in the repository.
- Hosting on Cloudflare Workers (Free plan); the site is served at the root path.

## Stack
- **Next.js on Cloudflare Workers** via the OpenNext adapter.
- Reasons: Next.js is frequently required in job postings, and the site should show hands-on work with it; interactivity will be added gradually later. A server runtime lets pages render per request, for example a view mode chosen by a query parameter, without a flash of the wrong content.
- Setup and limitations: see `CLAUDE.md`, section "Stack and hosting".

## Hosting and environments
- Repository: https://github.com/leonid-belikov/resume2
- Test environment: Cloudflare Worker `resume2-test` on `workers.dev`, deployed via CI on pushes to `main`.
- Later: production on a custom domain (a separate task).

## Design
- No mockups yet. Direction and references are discussed after the stack is chosen. Figma MCP is connected when needed, via `.mcp.json`.

## CV
- The PDF CV is already in `docs/` and is used at the start. It will be revised before the production release.

## Open questions
- Production domain is not chosen yet (a separate task).

## MVP acceptance criteria
- The home page and the placeholder project page open via links and work on mobile and desktop.
- Contact links go to the right places, and the CV downloads as a PDF.
- Build, lint and type checks pass in CI.
- The site is available at the test environment address, including direct links to project pages.
