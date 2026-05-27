---
name: pr-merge-cleanup
description: |
  在确认 PR merge 后应用 cleanup。
  关闭 GitHub Issue，删除远程 publish/task{N} branch，
  清理本地 local/task{N} branch 和 separate worktree，并返回 {BASE_BRANCH}。
  只在 PR 实际 merge 后调用。
---

# PR Merge 后 Cleanup

## Trigger

- 任务请求者明确说 "cleanup after merge" 或 "clean up the task"。
- 直接调用此 SKILL。

## Preconditions

- 目标 PR 在 GitHub 上确实已 merge：`gh pr view {number} --json state,mergeCommit`。
- 任务请求者已批准关闭 Issue，或 PR body 包含 `closes #N` 且 Issue 已自动关闭。

## Procedure

1. 检查 PR 和 Issue 状态。
   ```bash
   gh pr view {number} --json state,mergedAt,mergeCommit,headRefName
   gh issue view {N} --json state
   ```
   - 如果 PR `state != MERGED`，立即停止并报告给任务请求者。
2. 只有在 Issue 尚未关闭时才关闭它。
   ```bash
   gh issue close {N}
   ```
3. 更新 `{BASE_BRANCH}`。
   ```bash
   git fetch origin --prune
   git checkout {BASE_BRANCH}
   git pull --ff-only
   ```
4. 删除远程 publish branch。如果 PR merge 时已用 `--delete-branch` 删除，则跳过。
   ```bash
   git push origin --delete publish/task{N} 2>&1 || echo "already deleted"
   ```
5. 如果使用了 separate worktree，移除它。
   ```bash
   git worktree remove ../{repo}-task{N}
   git worktree prune
   ```
6. 只有在 local work branch 不再需要时，才删除它。
   ```bash
   git branch -d local/task{N}
   # Forced deletion requires explicit task requester approval: git branch -D local/task{N}
   ```
7. 最终 daily task board 检查：确认 `mydocs/orders/{yyyymmdd}.md` 中的 #{N} row 是 `Done` 并包含完成时间。
8. 向任务请求者简要报告已清理的项目。

## Verification

- `gh pr view {number}` 显示 `state == MERGED`。
- 如果 branch 已删除，`git branch -vv | grep local/task{N}` 没有输出。
- `git ls-remote origin publish/task{N}` 输出为空。
- `git worktree list` 不包含已清理的 worktree。
- `git branch --show-current` 是 `{BASE_BRANCH}`。

## Never Do

- PR 未 merge 时关闭 Issue。
- 删除另一个 task branch 或 main worktree。
- 未经明确批准运行 `git branch -D`；未 merge 的 commits 可能丢失。
- 删除另一个 worker 的 stash。

## Invocation

- Codex: `$pr-merge-cleanup` 或 `/skills` 菜单
- Claude Code: `/pr-merge-cleanup`
