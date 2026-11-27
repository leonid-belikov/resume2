// Runs the save_issue guard hook as a child process, the same way Claude Code does:
// hook input JSON on stdin, decision by exit code (0 allows, 2 blocks).
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HOOK = fileURLToPath(
  new URL('../.claude/hooks/linear-save-issue-guard.mjs', import.meta.url),
);

type Result = { status: number | null; stderr: string };

function run(stdin: string): Result {
  const { status, stderr } = spawnSync(process.execPath, [HOOK], {
    input: stdin,
    encoding: 'utf8',
  });
  return { status, stderr };
}

function runTool(toolInput: Record<string, unknown>): Result {
  return run(JSON.stringify({ tool_name: 'mcp__linear-server__save_issue', tool_input: toolInput }));
}

function assertBlocked({ status, stderr }: Result, reason?: RegExp) {
  assert.equal(status, 2);
  assert.match(stderr, /^Linear save_issue blocked: /);
  if (reason) assert.match(stderr, reason);
}

for (const state of ['Implementation', 'Push']) {
  test(`allows a status change to ${state}`, () => {
    const { status, stderr } = runTool({ id: 'AGT-1', state });
    assert.equal(status, 0);
    assert.equal(stderr, '');
  });
}

test('blocks an extra field', () => {
  assertBlocked(
    runTool({ id: 'AGT-1', state: 'Implementation', description: 'x' }),
    /only "id" and "state"/,
  );
});

test('blocks a missing id', () => {
  assertBlocked(runTool({ state: 'Implementation' }), /only "id" and "state"/);
});

for (const id of ['', '   ']) {
  test(`blocks an empty id ${JSON.stringify(id)}`, () => {
    assertBlocked(runTool({ id, state: 'Implementation' }), /"id" must be a non-empty/);
  });
}

for (const state of ['Plan', 'Review', 'Done']) {
  test(`blocks a status change to ${state}`, () => {
    assertBlocked(runTool({ id: 'AGT-1', state }), new RegExp(`status "${state}" is not allowed`));
  });
}

test('blocks invalid JSON', () => {
  assertBlocked(run('{not json'));
});

test('blocks input without tool_input', () => {
  assertBlocked(run(JSON.stringify({ tool_name: 'mcp__linear-server__save_issue' })));
});
