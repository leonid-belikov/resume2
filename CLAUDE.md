# Portfolio site

A static portfolio site that presents a frontend developer to recruiters and employers.

@docs/brief.md

## Stack and static export

- Next.js (App Router) with static export: `output: 'export'`, `basePath: '/resume2'`.
- Hosted on GitHub Pages under `/resume2/`, so every internal link and asset URL must respect the base path.
- No server features: Server Actions, dynamic route handlers, rewrites and redirects, `next/image` with the default loader. Client-side interactivity is fine.
- Content is stored in the repository. No backend, blog or CMS.
- Verify Next.js details against the current documentation when planning. Docs matching the installed version ship in `node_modules/next/dist/docs/`.

## Code comments

- For Next.js-specific code (server and client components, `'use client'`, `generateStaticParams`, `basePath`, static export), leave short "why" comments of 1-3 lines.
- Do not comment the obvious. Put longer explanations in the plan and the PR description.

## Folder structure

- `app/`: Next.js App Router routes (`layout.tsx`, `page.tsx`).
- Root config: `next.config.ts` (static export, base path), `tsconfig.json`, `eslint.config.mjs`, `.nvmrc` (Node version for CI and local development).
- `docs/`: `brief.md` (project intent) and the PDF CV that the site offers as a download.
- `tests/`: `node:test` unit tests for scripts (run with `npm test`).
- `.claude/`: shared Claude Code settings (`settings.json`), including the rules that keep `.env` files unreadable.
- `.github/workflows/`: GitHub Actions CI (`ci.yml`): lint, typecheck, test and build on pull requests to `main` and pushes to `main`.

Update this section when folders are added.

## Language

Everything in the repository is English, with no Russian: code and comments, branch names, commits, issues, PRs, README, `CLAUDE.md` and documentation. Russian is allowed only in chat (including plans) and in private notes outside the repository.

## Process

- Plan first and wait for explicit approval, unless the request fully determines the diff (no choices about what to add, remove or rewrite).
- Work on a new branch named `<type>/agt-<N>-<topic>`, where `AGT-<N>` is the Linear issue (e.g. `chore/agt-5-linear-mcp`). Never commit to `main`.
- Keep commits small. Stage explicit paths (`git add <files>`), never `git add -A`.
- Before saying the branch is ready, run every available check (tests, lint, typecheck, build) and fix failures.
- Never push and never merge. When the branch is ready, say so and wait; after the human pushes, open the PR with `gh pr create`.
- After the PR is merged, do not switch branches, pull or delete branches. Cleanup is done by the human; if asked, reply with the commands to run instead.
- PR description: what and why, assumptions, how it was verified, issues noticed out of scope, `Fixes <ISSUE-ID>`.
- If CI exists, read `gh pr checks` and fix failures on the same branch.

## Linear

- At session start the human gives a Linear issue ID (`AGT-N`). Read the issue with the Linear MCP before planning.
- Move the issue: `Implementation` right after plan approval (sessions start in plan mode, where Linear writes are blocked), `Push` when the branch is ready, back to `Implementation` on review fixes. Never set `Plan`, `Review`, `Retro` or `Done`.
- When updating the issue, change only its status. Never edit the title, description or other fields; propose changes in the session instead.
- Comment on the issue with the approved plan summary and the PR link.
- Work only on the given issue. Do not create, delete or change other issues or projects.
- Everything in Linear is in English.
- Test hooks by piping sample JSON into the hook script; never make real MCP calls that change data to test them.

## Working principles

**Ambiguous tasks**
- State your assumptions. Ask questions at plan time.
- Stop only before irreversible or risky actions.

**Scope**
- Change only what the task needs. No unrelated refactors.
- List issues you notice at the end instead of fixing them.
- Remove only what became unused because of your changes.

**Minimal solution**
- No unrequested features, settings or speculative abstractions.
- Validate data at boundaries only.

**Done criteria**
- Define them before coding.
- Bug: write a failing test first.
- Logic: add tests together with the code.
- UI: verify by build and screenshot.
