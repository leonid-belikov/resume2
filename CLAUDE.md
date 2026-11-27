# Portfolio site

A portfolio site that presents a frontend developer to recruiters and employers.

Product intent (goal, audience, site structure, content, MVP criteria) is in `docs/brief.md`. Read it when planning user-facing features: pages, content or site structure.

## Stack and hosting

- Next.js (App Router), built with the OpenNext adapter (`@opennextjs/cloudflare`) and served by Cloudflare Workers at the root path.
- Pages are prerendered unless they read request data; request-time rendering runs in the Worker.
- Wrangler config: `wrangler.jsonc`. Deploy only through a named environment; `test` is the Worker `resume2-test` on `workers.dev`.
- `npm run preview` runs the build in the local Workers runtime; `npm run deploy` deploys `test` (CI does this on pushes to `main`).
- Workers Free plan: the compressed Worker must stay under 3 MiB.
- OpenNext caching (ISR, incremental cache) and image optimization are not set up, so do not use `next/image` with the default loader or ISR.
- Content is stored in the repository. No database, blog or CMS.
- Verify Next.js details against the current documentation when planning. Docs matching the installed version ship in `node_modules/next/dist/docs/`.

## Code comments

- Comment only non-obvious decisions specific to this project. Do not explain how frameworks or libraries work, and do not comment the obvious.
- Keep comments short. Put detailed rationale in the plan and the PR description.

## Folder structure

- `app/`: Next.js App Router routes (`layout.tsx`, `page.tsx`) and their component tests (`*.test.tsx`, next to the component).
- `public/`: static files served as Workers assets; `_headers` sets caching headers for them.
- Root config: `next.config.ts`, `open-next.config.ts` (OpenNext adapter), `wrangler.jsonc` (Worker and environments), `vitest.config.mts` and `vitest.setup.ts` (tests), `tsconfig.json`, `eslint.config.mjs`, `.nvmrc` (Node version for CI and local development).
- `docs/`: `brief.md` (project intent) and the PDF CV that the site offers as a download.
- `tests/`: unit tests for scripts (`*.test.ts`).

## Tests

- Vitest runs all tests; the file extension picks the environment: `*.test.tsx` runs in jsdom (component tests with React Testing Library), `*.test.ts` runs in Node.
- Component tests live next to the component; script tests live in `tests/`.
- `npm test` runs all tests once; `npm run test:watch` runs them in watch mode.
- Async Server Components cannot be rendered by Vitest; cover them with E2E tests.
- `.claude/`: shared Claude Code settings (`settings.json`), including the rules that keep `.env` files unreadable.
- `.github/workflows/`: GitHub Actions CI (`ci.yml`): lint, typecheck, test and build on pull requests to `main` and pushes to `main`; job `deploy` deploys the `test` Worker on pushes to `main` and manual runs, using Cloudflare secrets of the GitHub environment `test`.

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
- PR description: what and why, assumptions, how it was verified (for each acceptance criterion of the issue: the evidence, or "not verifiable before merge"; when the diff itself is the evidence, as for docs or config changes, write "see the diff"), issues noticed out of scope, `Fixes <ISSUE-ID>`.
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
