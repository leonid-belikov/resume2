# Brief: portfolio site

Updated: 2026-10-25. This is the project's Intent: the starting point for choosing the stack, writing `CLAUDE.md` and splitting work into issues.

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
- Static site: no backend, blog or CMS.
- Content is stored in the repository.
- Hosting on GitHub Pages: the site lives under the `/resume2/` path, so the stack must support a base path.

## Stack
- **Next.js with static export** (`output: 'export'`, `basePath` set to `/resume2`).
- Reasons: Next.js is frequently required in job postings, and the site should show hands-on work with it; interactivity will be added gradually later.
- Static export limitations: no server features (Server Actions, dynamic route handlers, rewrites and redirects, `next/image` optimization with the default loader). Client-side interactivity is possible; if a server part is ever needed, that is a separate decision. Verify details against the current documentation at the planning stage.

## Rules for the agent (to be moved into `CLAUDE.md`)
- For Next.js-specific code (App Router, server and client components, `'use client'`, `generateStaticParams`, `basePath`, static export), leave short "why" comments of 1–3 lines. Do not comment the obvious. Give longer explanations in the plan and in the PR description.
- Everything visible in the public GitHub repository is written in English, with no Russian: code and comments, branch names, commits, issues, PRs, README, `CLAUDE.md`, documentation. Russian is allowed only in chat (including the plan) and in private notes outside the repository.

## Hosting and environments
- Repository: https://github.com/leonid-belikov/resume2
- Test environment: GitHub Pages, https://leonid-belikov.github.io/resume2/, deployed via CI.
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
