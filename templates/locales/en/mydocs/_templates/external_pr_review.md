# External PR Review Template

This central template is for `mydocs/pr/pr_{number}_review.md`. It records the initial judgment, impact area, verification plan, and recommendation for an external contributor PR, and requests approval for the review direction.

## Usage

- Actual file: `mydocs/pr/pr_{number}_review.md`
- When to write: immediately after checking external contributor PR metadata and diff
- Writing language: use the selected Hyper-Waterfall locale for this repository.

## PR Information

- PR: #{number}
- Title: {PR title}
- Author: {author}
- base/head: `{base}` <- `{head}`
- head repository: `{fork or same repo}`
- State: {OPEN/MERGED/CLOSED}
- Linked Issue: {link if any, otherwise none}

## Change Summary

- {core changes in the PR}

## Impact Area and Compatibility

| Area | Impact | Compatibility Judgment |
|---|---|---|
| {area} | {impact} | {compatible/caution/risk} |

## Code/Documentation Review Findings

- {main findings discovered during review}

## Verification Plan

```bash
{required verification command}
```

- {manual check item}

## Recommendation

Recommendation: {merge / request changes / close}

Rationale:

- {judgment rationale}

## Approval Request to Task Requester

- If you agree with the review direction and recommendation above, proceed to verification or GitHub PR comment drafting.
