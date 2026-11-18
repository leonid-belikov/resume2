// Runs the save_issue guard hook as a child process, the same way Claude Code does:
// hook input JSON on stdin, decision by exit code (0 allows, 2 blocks).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HOOK = fileURLToPath(
  new URL('../.claude/hooks/linear-save-issue-guard.mjs', import.meta.url),
);

function run(stdin) {
  const { status, stderr } = spawnSync(process.execPath, [HOOK], {
    input: stdin,
    encoding: 'utf8',
  });
  return { status, stderr };
}

function runTool(toolInput) {
  return run(JSON.stringify({ tool_name: 'mcp__linear-server__save_issue', tool_input: toolInput }));
}

function assertBlocked({ status, stderr }) {
  assert.equal(status, 2);
  assert.match(stderr, /^Linear save_issue blocked: /);
}

for (const state of ['Plan', 'Implementation', 'Push']) {
  test(`allows a status change to ${state}`, () => {
    const { status, stderr } = runTool({ id: 'AGT-1', state });
    assert.equal(status, 0);
    assert.equal(stderr, '');
  });
}

test('blocks an extra field', () => {
  assertBlocked(runTool({ id: 'AGT-1', state: 'Plan', description: 'x' }));
});

test('blocks a missing id', () => {
  assertBlocked(runTool({ state: 'Plan' }));
});

for (const id of ['', '   ']) {
  test(`blocks an empty id ${JSON.stringify(id)}`, () => {
    assertBlocked(runTool({ id, state: 'Plan' }));
  });
}

for (const state of ['Review', 'Done']) {
  test(`blocks a status change to ${state}`, () => {
    assertBlocked(runTool({ id: 'AGT-1', state }));
  });
}

test('blocks invalid JSON', () => {
  assertBlocked(run('{not json'));
});

test('blocks input without tool_input', () => {
  assertBlocked(run(JSON.stringify({ tool_name: 'mcp__linear-server__save_issue' })));
});
