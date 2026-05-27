# `troubleshootings/` Folder Rules

## Purpose

Record the causes and resolutions of failures, incidents, and difficult problems to prevent recurrence.

## Questions Answered

- "Where did the work fail?"
- "Why did it fail?"
- "What should be checked to avoid repeating it?"

## When to Write

When the same error could recur or the resolution process itself is important context for later work.

## Allowed Filenames

- `{yyyymmdd}_{topic}.md`
- `task_{milestone}_{issue_number}_{topic}.md`

## Template Used

`mydocs/_templates/troubleshooting.md`

## Required Content

- Symptom
- Reproduction conditions
- Cause
- Resolution
- Recurrence prevention
- Verification
- References

## Content Not Allowed

- Documents containing only failure logs
- Unsupported speculation without causes
- Resolution declarations without verification

## Context the Next Session AI Must Restore

Pitfalls to avoid, reproduction commands, and verified fixes.
