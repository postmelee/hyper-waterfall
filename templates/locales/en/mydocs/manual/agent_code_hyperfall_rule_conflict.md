# Conflict Rules Between Agent Defaults and Hyper-Waterfall

## Purpose

Claude Code and Codex are generally optimized for fast execution and autonomous edits. This project uses the Hyper-Waterfall methodology, so those defaults can conflict with process discipline. This document defines priorities and handling rules when conflicts occur.

## Conflict Points

1. Immediate implementation tendency vs. stage approval gates
2. Code-first fixes without required document updates
3. Premature task ending or Issue closing
4. Scope expansion through related refactors or unnecessary artifact updates

## Priority Rules

1. Explicit task requester instruction
2. Mandatory rules in `AGENTS.md`
3. Task documents (`plans`, `working`, `report`, `orders`)
4. Automation tool or agent default behavior

If a higher rule conflicts with a lower rule, do not apply the lower rule.

## Operating Rules

- The default order is `Issue -> branch -> daily task board -> plan -> implementation -> verification -> final report -> PR`.
- After completing each stage, confirm approval before moving to the next stage.
- If the task requester explicitly says to continue in the same thread, such as "continue" or "proceed to the next stage," treat that stage as approved.
- Close an Issue only after task requester approval or after the PR is merged.
- Before editing documentation, read the existing content first, change only the necessary parts, and add content only when unavoidable.
- Immediately clean up artifacts that violate document location/filename rules and local or remote byproducts not needed for the next task.

## Practical Checklist

- Before editing: confirm current Issue number, branch, and task plan existence.
- During editing: check whether the change scope matches the approved request.
- After editing: run verification, update reports, reflect results in the PR body, and clean up byproducts after merge.

## Exceptions

- If the task requester only asks for a simple wording fix, typo fix, or investigation, the procedure may be reduced to the level needed.
- However, if a GitHub Issue already exists for the work, at minimum record the result in the final report and PR body.
