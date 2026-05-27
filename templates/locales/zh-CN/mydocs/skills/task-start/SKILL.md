---
name: task-start
description: |
  应用 Hyper-Waterfall task start 流程。
  确认 GitHub Issue，更新 {BASE_BRANCH}，创建 local/task{N}，
  添加 daily task board row，并创建任务计划书模板。
  在开始新的代码或文档变更前使用。
---

# Hyper-Waterfall Task Start

## Trigger

- 任务请求者明确说 "start Issue #N" 或 "proceed with task #N"。
- 任务请求者直接调用此 SKILL。

## Preconditions

- 已存在获批的 Issue number 和 milestone。
- 目标仓库 working tree 干净，或已经做出 separate worktree 决定。
- `gh` CLI 已为当前用户认证。

## Procedure

1. 确认 Issue 信息。
   ```bash
   gh issue view {N} --json number,title,milestone,state,body
   ```
2. 更新 `{BASE_BRANCH}`。
   ```bash
   git fetch origin
   git checkout {BASE_BRANCH}
   git pull --ff-only
   ```
3. 创建 work branch。如果另一个 worker 正在使用 main worktree，使用 separate worktree。
   ```bash
   # single worktree
   git checkout -b local/task{N}

   # separate worktree, recommended to avoid interfering with another agent
   git worktree add ../{repo}-task{N} -b local/task{N} origin/{BASE_BRANCH}
   ```
4. 更新 daily task board：向 `mydocs/orders/{yyyymmdd}.md` 添加一行。
   - 使用 `mydocs/_templates/orders.md` 的输出格式。
   - Row format: `| #{N} | {task title} | In progress | M{milestone}, task plan written and awaiting approval |`
   - 放在适当的 milestone section 下。运营工作使用 "Common - Operations"。
5. 创建任务计划书：`mydocs/plans/task_m{milestone}_{N}.md`。
   - 使用中央模板 `mydocs/_templates/task_plan.md`。
   - 只有在无法读取模板时，才使用这些 fallback sections：purpose / background / scope included and excluded / design direction / expected changed files / tentative stages of 3-6 stages / verification plan / risks / approval request。
6. 验证变更。
   ```bash
   git status --short
   git diff --check
   ```
7. 只 commit 一次。
   ```bash
   git add mydocs/plans/task_m{milestone}_{N}.md mydocs/orders/{yyyymmdd}.md
   git commit -m "Task #{N}: task plan and daily task board update"
   ```
8. 向任务请求者请求任务计划书批准。

## Verification

- `git log --oneline -1` 显示 `Task #{N}: task plan and daily task board update`。
- `mydocs/orders/{yyyymmdd}.md` 包含 #{N} row。
- `mydocs/plans/task_m{milestone}_{N}.md` 填写了 `mydocs/_templates/task_plan.md` 的必需章节。

## Never Do

- 在任务计划书获批前编写实施计划书。
- 在任务计划书获批前修改代码或 manual。
- 触碰另一个 worker 的未提交变更或另一个 task branch working tree。

## Invocation

- Codex: `$task-start` 或从 `/skills` 菜单选择 `task-start`
- Claude Code: `/task-start`
