---
name: task-start
description: |
  Apply the Hyper-Waterfall task start procedure.
  Confirm the GitHub Issue, update {BASE_BRANCH}, create local/task{N},
  add a daily task board row, and create the task plan template.
  Use before starting new code or documentation changes.
---

# Hyper-Waterfall Task Start

## Trigger

- The task requester explicitly says "start Issue #N" or "proceed with task #N."
- The task requester invokes this SKILL directly.

## Preconditions

- An approved Issue number and milestone exist.
- The target repository working tree is clean, or a separate worktree decision has been made.
- `gh` CLI is authenticated for the current user.

## Procedure

1. Confirm Issue information.
   ```bash
   gh issue view {N} --json number,title,milestone,state,body
   ```
2. Update `{BASE_BRANCH}`.
   ```bash
   git fetch origin
   git checkout {BASE_BRANCH}
   git pull --ff-only
   ```
3. Create the work branch. If another worker is using the main worktree, use a separate worktree.
   ```bash
   # single worktree
   git checkout -b local/task{N}

   # separate worktree, recommended to avoid interfering with another agent
   git worktree add ../{repo}-task{N} -b local/task{N} origin/{BASE_BRANCH}
   ```
4. Update daily task board: add a row to `mydocs/orders/{yyyymmdd}.md`.
   - Use output format from `mydocs/_templates/orders.md`.
   - Row format: `| #{N} | {task title} | In progress | M{milestone}, task plan written and awaiting approval |`
   - Place it under the appropriate milestone section. Use "Common - Operations" for operational work.
5. Create task plan: `mydocs/plans/task_m{milestone}_{N}.md`.
   - Use central template `mydocs/_templates/task_plan.md`.
   - Only if the template cannot be read, use these fallback sections: purpose / background / scope included and excluded / design direction / expected changed files / tentative stages of 3-6 stages / verification plan / risks / approval request.
6. Verify changes.
   ```bash
   git status --short
   git diff --check
   ```
7. Commit once.
   ```bash
   git add mydocs/plans/task_m{milestone}_{N}.md mydocs/orders/{yyyymmdd}.md
   git commit -m "Task #{N}: task plan and daily task board update"
   ```
8. Request task plan approval from the task requester.

## Verification

- `git log --oneline -1` shows `Task #{N}: task plan and daily task board update`.
- `mydocs/orders/{yyyymmdd}.md` contains a #{N} row.
- `mydocs/plans/task_m{milestone}_{N}.md` fills required sections from `mydocs/_templates/task_plan.md`.

## Never Do

- Write the implementation plan before task plan approval.
- Change code or manuals before task plan approval.
- Touch another worker's uncommitted changes or another task branch working tree.

## Invocation

- Codex: `$task-start` or select `task-start` from the `/skills` menu
- Claude Code: `/task-start`
