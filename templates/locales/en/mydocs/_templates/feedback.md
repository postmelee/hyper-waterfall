# Feedback Template

This central template is for recording task requester feedback, code review comments, and rework instructions in `mydocs/feedback/`. Feedback documents preserve judgments and requests that the AI must not miss in the next revision. They do not replace long-term technical notes or troubleshooting records.

## Usage

- Actual file: `mydocs/feedback/{yyyymmdd}_{topic}.md` or `mydocs/feedback/task_{milestone}_{issue}_feedback.md`
- When to write: when stage approval is withheld, PR review is received, the task requester asks for rework, or the design direction changes
- Writing language: use the selected Hyper-Waterfall locale for this repository.

## Target

- Related Issue: #{issue}
- Related Stage: {stage or not applicable}
- Related PR: #{pr or not applicable}
- Author: {task requester or reviewer}
- Date: YYYY-MM-DD

## Feedback Summary

{Summarize the requested change in 1-3 sentences.}

## Detailed Feedback

| Location | Content | Expected Result |
|---|---|---|
| `{file or document section}` | {problem or request} | {how it should change} |

## Priority

- must-fix: {must be reflected}
- should-fix: {should be reflected if possible}
- note: {reference note}

## Acceptance Criteria

- {criteria for considering the revision complete}
- {verification command or check method}

## Follow-up Check

- {what the task requester should review again}
