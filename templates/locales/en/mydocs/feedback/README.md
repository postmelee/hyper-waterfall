# `feedback/` Folder Rules

## Purpose

Preserve corrections from the task requester and reviewers on AI output.

## Questions Answered

- "What was wrong?"
- "What domain judgment did a human add?"

## When to Write

When Stage approval is withheld, PR review arrives, rework is requested, or the design direction changes.

## Allowed Filenames

- `{yyyymmdd}_{topic}.md`
- `task_{milestone}_{issue_number}_feedback.md`

## Template Used

`mydocs/_templates/feedback.md`

## Required Content

- Target Issue, Stage, and PR
- Feedback summary
- Detailed feedback
- Priority
- Acceptance criteria
- Follow-up check

## Content Not Allowed

- AI-created self-evaluations
- Full technical investigations
- Full troubleshooting resolution histories

## Context the Next Session AI Must Restore

Human corrections and criteria that must be reflected.
