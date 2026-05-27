# `plans/` Folder Rules

## Purpose

Fix the direction and implementation stages of an internal task before modifying code.

## Questions Answered

- "What will be done?"
- "How will the implementation be split?"
- "What is out of scope?"

## When to Write

When `task-start` creates a task plan, and after task plan approval when the implementation plan is written.

## Allowed Filenames

- `task_{milestone}_{issue_number}.md`
- `task_{milestone}_{issue_number}_impl.md`

Use `plans/archives/` if completed plans need to be archived.

## Templates Used

- `mydocs/_templates/task_plan.md`
- `mydocs/_templates/task_impl_plan.md`

## Required Content

- Purpose
- Background
- Scope
- Design direction
- Expected changed files
- Stages
- Verification plan
- Risks
- Approval request

## Content Not Allowed

- Stage completion reports
- Final reports
- Documents that only collect post-implementation verification logs

## Context the Next Session AI Must Restore

The approved scope, Stage split, verification commands, and commit message rules.
