# `pr/` Folder Rules

## Purpose

Record external contributor PR review separately from the internal task workflow.

## Question Answered

"Should this external PR be merged, changed, or closed?"

## When to Write

After checking external PR metadata and diff, before and after additional verification, and before posting the final GitHub comment.

## Allowed Filenames

- `pr_{number}_review.md`
- `pr_{number}_review_impl.md`
- `pr_{number}_report.md`

Move completed review documents to `pr/archives/`.

## Templates Used

- `mydocs/_templates/external_pr_review.md`
- `mydocs/_templates/external_pr_review_impl.md`
- `mydocs/_templates/external_pr_report.md`

## Required Content

- PR information
- Change summary
- Impact area
- Code/documentation review findings
- Verification plan or results
- Recommendation
- Approval request to task requester

## Content Not Allowed

- Forcing internal task `_stage{N}.md` or `_report.md` formats onto external PRs
- Merge or close decisions without approval

## Context the Next Session AI Must Restore

The current judgment for the external PR, remaining verification, and the comment or review body to post on GitHub.
