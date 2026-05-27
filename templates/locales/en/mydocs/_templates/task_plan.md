# Task Plan Template

This central template is for `mydocs/plans/task_{milestone}_{issue}.md`. The task plan fixes the purpose, scope, design direction, and verification criteria before implementation and requests task requester approval.

GitHub Issue: [#{issue}](https://github.com/{REPO_SLUG}/issues/{issue})
Milestone: M{milestone}

## Purpose

{Describe the result this task must achieve in 1-3 paragraphs.}

## Background

{Explain why this work is needed, what is wrong with the current state, and which official documents, existing Issues, or previous artifacts were referenced.}

## Scope

### Included

- {Items this task must cover}

### Excluded

- {Items this task explicitly does not cover}

## Design Direction

- {Structure, policy, file placement, compatibility judgment, or other points that must be agreed before implementation}
- {Which existing patterns are followed and which parts are newly defined}

## Document Location Judgment

If this task creates, moves, or edits product, user, contributor, external integration, API, architecture, or roadmap documentation, first decide whether the official documentation root or `mydocs/` should be used. If no document changes are involved, write `Not applicable` and explain why.

Hyper-Waterfall does not fix the official documentation root name. The target project may explicitly choose `docs/`, `specs/`, `site/`, `website/`, `adr/`, `book/`, GitHub Wiki, or another location, but this plan must approve the reason.

| File | Classification | Audience | Selected Location | Alternative Location | Reason |
|---|---|---|---|---|---|
| `{path or not applicable}` | {official doc/technical research/operating manual/work artifact} | {user/contributor/agent/internal worker} | `{path}` | `{path}` | {why this location is correct} |

## Expected Changed Files

New:

- `{path}`

Modified:

- `{path}`

Task artifacts:

- `mydocs/orders/{yyyymmdd}.md`
- `mydocs/plans/task_{milestone}_{issue}.md`
- `mydocs/plans/task_{milestone}_{issue}_impl.md`
- `mydocs/working/task_{milestone}_{issue}_stage{N}.md`
- `mydocs/report/task_{milestone}_{issue}_report.md`

## Tentative Stages

{Split into 3-6 stages by default. Each stage should be small enough to implement, verify, and report in one cycle.}

- **Stage 1 - {title}**
  - {artifact}
  - {verification perspective}
- **Stage 2 - {title}**
  - {artifact}
  - {verification perspective}
- **Stage 3 - {title}**
  - {artifact}
  - {verification perspective}

## Verification Plan

### Stage Verification

- Stage 1
  - `{verification command or check method}`
- Stage 2
  - `{verification command or check method}`
- Stage 3
  - `{verification command or check method}`

### Integrated Verification

- `{final acceptance criterion}`
- `git status --short` is empty before PR preparation.
- `git diff --check` passes without warnings.

## Risks

- **{risk name}**: {impact and response}

## Approval Request

- {Scope, design direction, and exclusions that the task requester must approve}

After approval, `task_{milestone}_{issue}_impl.md` will define Stage artifacts, verification commands, and commit messages in detail.
