# External PR Final Report Template

This central template is for `mydocs/pr/pr_{number}_report.md`. It records the final judgment for an external PR review, verification results, and the GitHub PR comment or review body.

## Usage

- Actual file: `mydocs/pr/pr_{number}_report.md`
- When to write: after external PR review and required verification, before posting the comment/review to GitHub
- Writing language: use the selected Hyper-Waterfall locale for this repository.

## Review Result Summary

- PR: #{number}
- Final recommendation: {merge / request changes / close}
- Key reason: {one-line summary}

## Verification Results

Command run:

```bash
{verification command}
```

Result:

- {OK/MISS and key output summary}

## Key Findings

| Category | Finding | Handling |
|---|---|---|
| {bug/risk/doc/note} | {finding} | {fix before merge/follow-up/reference} |

## Final Recommendation

State one of merge, request changes, or close, and explain why.

## GitHub PR Comment Body

```md
{comment or review body to post on the GitHub PR}
```

## Approval Request to Task Requester

- If you approve the recommendation and GitHub PR comment body above, it will be posted to the PR.
