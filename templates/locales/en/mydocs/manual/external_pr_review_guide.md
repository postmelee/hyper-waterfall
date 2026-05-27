# External Contributor PR Review Guide

## Purpose

This document defines the external contributor PR review procedure and the `mydocs/pr/` record flow. Do not apply this procedure to internal task PRs.

Use the [`external-pr-review`](../skills/external-pr-review/SKILL.md) Skill for the executable external PR review procedure.

## Basic Principles

- Review both code changes and documentation changes in external contributor PRs.
- Manage external PR review results through the `mydocs/pr/` document flow.
- Review documents must be reproducible and include the verification commands/results that were run.
- External contributor PRs differ from internal tasks, so they use separate procedures and folders.
- Leave external PR review records in `mydocs/pr/`.

## Document Flow

External PRs are handled through the `mydocs/pr/` document flow.

- Review document: `pr_{number}_review.md`
- Implementation plan: `pr_{number}_review_impl.md` when needed
- Final report: `pr_{number}_report.md`

Move completed documents to `mydocs/pr/archives/`.

## Procedure

1. Check PR metadata: base/head, mergeability, CI, linked Issue.
2. Inspect code and documentation change scope.
3. Run required verification.
4. Record key risks and change requests in `pr_{number}_review.md`.
5. If needed, record a re-review or auxiliary verification plan in `pr_{number}_review_impl.md`.
6. Record the final judgment in `pr_{number}_report.md`.
7. Move completed documents to `mydocs/pr/archives/`.

## Pre-merge Checks

- The PR target branch follows policy.
- Review comments are separated into resolved and unresolved items.
- Required verification was run.
- The basis for approval, hold, or rejection is documented.

## Post-merge Checks

- Check related Issue state, including auto-close or manual close.
- Confirm deletion of merged remote branches.
- Clean local worktrees, build artifacts, and installation smoke test artifacts not needed for the next task.
- Create a new Issue for follow-up work when needed.
- Move review documents to `mydocs/pr/archives/`.

## Boundary with Internal Tasks

Do not apply the internal task flow of `plan -> implementation -> stage report -> final report` directly to external contributor PR review.

If internal follow-up changes are needed, record the basis in the external PR review document, create a separate GitHub Issue, and run it as an internal task.
