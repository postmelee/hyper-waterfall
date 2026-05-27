# Stage Report Template

This central template is for `mydocs/working/task_{milestone}_{issue}_stage{stage}.md`. A stage report records one Stage's implementation, verification, residual risk, and impact on the next stage, then requests approval to continue.

GitHub Issue: [#{issue}](https://github.com/{REPO_SLUG}/issues/{issue})
Implementation plan: [`task_{milestone}_{issue}_impl.md`](../plans/task_{milestone}_{issue}_impl.md)
Stage: {stage}

## Stage Purpose

{Explain what this Stage was meant to resolve and where it fits in the implementation plan.}

## Artifacts

| File | Change Summary |
|---|---|
| `{path}` | {change summary} |

## Body Change Scope / Lossless Preservation

{For documentation work, describe source preservation and rewrite scope. For code work, write not applicable or explain API/behavior preservation.}

## Verification Results

Command run:

```bash
{verification command}
```

Result:

- {OK/MISS and key output summary}

## Residual Risks

- {remaining risk. Write `None` if there are none.}

## Impact on Next Stage

- {context the next Stage must inherit. Write `None` if there is none.}

## Approval Request

- If you approve the Stage {stage} artifacts and verification results, proceed to the next stage.
