# External PR Review Implementation Plan Template

This central template is for `mydocs/pr/pr_{number}_review_impl.md`. Use it when an external PR review needs additional verification, an auxiliary patch, or reproduction steps in this repository. Do not force the internal task `task_{milestone}_{issue}_impl.md` format onto external PRs.

## Usage

- Actual file: `mydocs/pr/pr_{number}_review_impl.md`
- When to write: after external PR review document approval, when additional verification or auxiliary work is needed
- Writing language: use the selected Hyper-Waterfall locale for this repository.

## Purpose

{What to verify or what auxiliary work to perform.}

## Target PR

- PR: #{number}
- Review document: [`pr_{number}_review.md`](pr_{number}_review.md)

## Work Scope

### Included

- {additional verification or auxiliary work}

### Excluded

- {direct implementation that would replace the external PR, or work that must become an internal task}

## Verification Procedure

1. {verification step}
2. {verification step}
3. {verification step}

## Commands

```bash
{verification command}
```

## Expected Result

- {success criteria}

## Approval Request

- If you approve the verification/auxiliary work scope above, proceed with execution.
