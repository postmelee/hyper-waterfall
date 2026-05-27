# PR Process Guide

## Purpose

This document is the entrypoint for finding PR procedures in the `{REPO_NAME}` repository. Internal task PR writing, PR creation commands, and external contributor PR review each follow their own detailed documents.

Branch flow and merge strategy follow [`git_workflow_guide.md`](git_workflow_guide.md).

## Scope

- Guidance for internal task PR body writing
- Guidance for PR creation commands and document link rules
- Guidance for external contributor PR review
- Archive location after review completion

## Basic Principles

- Internal task PR bodies follow `{PR_TEMPLATE_PATH}`.
- Internal task PR bodies are short compressed versions of the final report.
- PR bodies include only verification that was actually performed, with result summaries and evidence instead of command lists.
- The Issue directly performed by the current PR goes in `Target task`.
- `Related Issues` is for context needed to understand the PR, such as prerequisites, follow-ups, Epics, upstream references, or reference Issues/PRs.
- External contributor PRs are reviewed for both code and documentation changes.
- External PR review results are managed through the `mydocs/pr/` document flow.
- Review documents must be reproducible and include verification commands/results.

## Detailed Documents

| Topic | Document | When to Use |
|---|---|---|
| Internal task PR body writing | [`internal_pr_guide.md`](internal_pr_guide.md) | After `task-final-report`, when writing an Open PR body to `{BASE_BRANCH}` |
| PR creation commands and document links | [`pr_command_guide.md`](pr_command_guide.md) | When pushing `publish/task{number}`, running `gh pr create`, or creating PR document links |
| External contributor PR review | [`external_pr_review_guide.md`](external_pr_review_guide.md) | When reviewing external contributor fork PRs and leaving `mydocs/pr/` records |

## Boundary Between Internal Tasks and External PRs

- Internal task PRs are handled through GitHub Issue, `local/task{number}`, task plan, implementation plan, stage reports, and final report.
- External contributor PRs do not force internal task document formats. They use the `mydocs/pr/` flow: `pr_{number}_review.md`, `pr_{number}_review_impl.md`, and `pr_{number}_report.md`.
- If internal follow-up changes are needed during external PR review, create a separate GitHub Issue and split it into an internal task.

## Checks Before and After Merge

Internal task PR pre/post-merge cleanup follows [`task-final-report`](../skills/task-final-report/SKILL.md), [`pr-merge-cleanup`](../skills/pr-merge-cleanup/SKILL.md), and [`pr_command_guide.md`](pr_command_guide.md).

External PR review, final recommendation, and archive flow follow [`external_pr_review_guide.md`](external_pr_review_guide.md) and [`external-pr-review`](../skills/external-pr-review/SKILL.md).

## Related Manuals

- [`git_workflow_guide.md`](git_workflow_guide.md): branch flow and merge strategy.
- [`task_workflow_guide.md`](task_workflow_guide.md): internal task plan, implementation, stage report, and final report flow.
- [`document_structure_guide.md`](document_structure_guide.md): `mydocs/pr/`, `working/`, and `report/` folder boundaries.
