#!/usr/bin/env node
// PreToolUse hook for mcp__linear-server__save_issue.
// Allows only a status change of an existing issue to Plan, Implementation or Push.
// Exit code 2 blocks the call; stderr is shown to the agent as the reason.
import { readFileSync } from 'node:fs';

const ALLOWED_STATES = ['Plan', 'Implementation', 'Push'];

function block(reason) {
  process.stderr.write(`Linear save_issue blocked: ${reason}\n`);
  process.exit(2);
}

let input;
try {
  input = JSON.parse(readFileSync(0, 'utf8')).tool_input;
} catch {
  block('hook input is not valid JSON.');
}
if (!input || typeof input !== 'object' || Array.isArray(input)) {
  block('tool_input is missing.');
}

const keys = Object.keys(input).sort();
if (keys.join(',') !== 'id,state') {
  block(
    `only "id" and "state" may be set, got: ${keys.join(', ') || 'none'}. ` +
      'Creating issues and editing other fields is not allowed.',
  );
}
if (typeof input.id !== 'string' || input.id.trim() === '') {
  block('"id" must be a non-empty issue ID; creating issues is not allowed.');
}
if (!ALLOWED_STATES.includes(input.state)) {
  block(`status "${input.state}" is not allowed; use one of: ${ALLOWED_STATES.join(', ')}.`);
}
