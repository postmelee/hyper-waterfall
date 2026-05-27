---
name: todo
description: |
  Create and update the Hyper-Waterfall daily task board (`mydocs/orders/yyyymmdd.md`).
  Apply milestone table format, status update rules, and backlog section rules.
  When task-start, task-stage-report, task-final-report, or pr-merge-cleanup
  updates the daily task board, it follows this SKILL's format.
---

# Daily Task Board Writing

## Purpose

`mydocs/orders/{yyyymmdd}.md` is a one-page work board for the day. It is not a task plan, report, or technical note. It shows progress by milestone at a glance and records completion time.

## Trigger

- The task requester explicitly says "write today's tasks", "update orders", or "close today's tasks."
- Apply this SKILL's format when `task-start`, `task-stage-report`, `task-final-report`, or `pr-merge-cleanup` updates the daily task board.
- This SKILL is invoked directly.

## Artifact

- Target file: `mydocs/orders/{yyyymmdd}.md`
- Writing language: use the selected Hyper-Waterfall locale for this repository.
- Output format source: `mydocs/_templates/orders.md`

## Standard Format

Use central template `mydocs/_templates/orders.md` first. The following is the minimal fallback format for cases where the template cannot be read.

- Filename: `yyyymmdd.md`
- Title: `# Daily Tasks - YYYY-MM-DD`
- Body: at least one milestone section, plus a common operations section when needed
- Each milestone section uses this table:

```md
## M{milestone} - {milestone name}

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| #{number} | {task} | Planned | {note} |
| #{number} | {task} | In progress | {note} |
| #{number} | {task} | Done | {note} |
```

## Milestone Decision Rules

Before writing work, decide which milestone section it belongs to.

1. Explicit task requester instruction
2. If no explicit instruction exists, reuse the milestone structure already present in the same date's `mydocs/orders/{yyyymmdd}.md`
3. If no same-date file exists, use an explicit milestone label from the target repository `README.md` roadmap or release notation
4. If neither source decides it, do not invent a milestone name; ask the task requester

Cautions:

- Distinguish roadmap transition notation from milestone names. For example, `0.5 -> 1.0` is a transition notation, not a section title.
- Do not place work in a future milestone unless the task requester clearly specified it.
- If `README.md` marks one milestone as current, use it as the default section for ambiguous work.

## Common Operations Section

For cross-cutting, operational, or unclassified work that does not clearly belong to one milestone, do not force it into the wrong milestone. Put it in a common section.

```md
## Common - Operations

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| Needs issue | {task} | Planned | {note} |
```

Use this for:

- Milestone definition or roadmap cleanup
- Release or CI/CD planning
- Repository-wide operations work
- Work that needs Issue creation before classification

## Backlog (Optional)

Add only when there are unresolved items that are not today's main work but should not be forgotten.

```md
## Backlog

| No | Content | Found On | Status | Notes |
|----|---------|----------|--------|-------|
| B-001 | {item} | YYYY-MM-DD | Open | {note} |
```

## Writing Rules

- If a GitHub Issue number exists, write it as `#number`.
- If no Issue exists yet, write `Needs issue` instead of an arbitrary number or `TBD`.
- Keep `Task` as a one-line summary.
- Keep `Notes` short. Prioritize purpose, current stage, verification point, linked document, or blocker.
- When changing status to `Done`, add `Done: HH:mm` to the notes.
- Default statuses: `Planned`, `In progress`, `Done`, `On hold`.
- Omit the backlog section when there is no backlog.
- If multiple milestones are active on the same date, split sections by milestone.
- Do not place templates, temporary notes, or non-date files in `mydocs/orders/`.

## Verification

- Filename follows `yyyymmdd.md`.
- Title follows `# Daily Tasks - YYYY-MM-DD`.
- Every work row is inside an `Issue | Task | Status | Notes` table.
- Status value is one of `Planned`, `In progress`, `Done`, `On hold`.
- Completed work notes include `Done: HH:mm`.

## Never Do

- Write task plans, reports, or technical notes in `orders/`.
- Invent a milestone name because the milestone is ambiguous.
- Ignore an existing same-date milestone structure and force a new structure.
- Place work in a future milestone without task requester approval.
- Leave a row as `Needs issue` when an Issue exists.

## Minimal Template

This is a shortened version of `mydocs/_templates/orders.md`. When creating a new date file, check the central template first.

```md
# Daily Tasks - YYYY-MM-DD

## M{milestone} - {milestone name}

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| #{number} | {task} | Planned | {note} |
```

```md
## Common - Operations

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| Needs issue | {task} | Planned | {note} |
```

## Invocation

- Codex: `$todo` or select `todo` from the `/skills` menu
- Claude Code: `/todo`
