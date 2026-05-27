# Troubleshooting Template

This central template is for recording failures, failed verification, reproducible errors, and recurrence prevention in `mydocs/troubleshootings/`. A troubleshooting document is not a simple failure log. It preserves the cause and fix so the next AI session does not repeat the same problem.

## Usage

- Actual file: `mydocs/troubleshootings/{yyyymmdd}_{topic}.md` or `mydocs/troubleshootings/task_{milestone}_{issue}_{topic}.md`
- When to write: when the same error may recur or the solution process is important context for later work
- Writing language: use the selected Hyper-Waterfall locale for this repository.

## Symptom

{Describe the visible failure, error message, or wrong result.}

## Reproduction Conditions

```bash
{reproduction command or procedure}
```

- Environment: {OS, tool versions, branch, relevant settings}
- Input: {files or data required to reproduce}

## Cause

{Describe the confirmed cause. If it is an inference, say so.}

## Resolution

```bash
{resolution command or change summary}
```

- Changed files: `{path}`
- Key fix: {what changed}

## Recurrence Prevention

- {verification command added, documentation reinforced, procedure changed, etc.}

## Verification

```bash
{verification command}
```

Result:

- {OK/MISS and key output summary}

## References

- [{title}]({URL or path})
