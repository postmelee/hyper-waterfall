# Task M050 #83 Implementation Plan

Task plan: [`task_m050_83.md`](task_m050_83.md)
GitHub Issue: [#83](https://github.com/postmelee/hyper-waterfall/issues/83)
Milestone: M050
Working locale: `en`

## Stage Overview

| Stage | Title | Primary Output | Validation |
|---|---|---|---|
| 1 | Quick Start Path Split | `README.md`, `README.ko.md`, `README.zh-CN.md`, `mydocs/working/task_m050_83_stage1.md` | New-project and existing-repository paths exist in all three READMEs |
| 2 | Copyable Language Support | `README.md`, `README.ko.md`, `README.zh-CN.md`, `mydocs/working/task_m050_83_stage2.md` | Locale overview table plus copyable prompt/CLI blocks exist in all three READMEs |
| 3 | Cross-Locale Consistency and Final Polish | `README.md`, `README.ko.md`, `README.zh-CN.md`, `mydocs/working/task_m050_83_stage3.md` | Cross-locale structure, command consistency, and whitespace checks pass |

## Document Location Check

The stage outputs match the task plan's document location decision.

| File | Task Plan Location | Stage Output Path | Match | Notes |
|---|---|---|---|---|
| `README.md` | Repository root | Stage 1-3 | OK | English user-facing Quick Start and Language support. |
| `README.ko.md` | Repository root | Stage 1-3 | OK | Korean localized mirror. |
| `README.zh-CN.md` | Repository root | Stage 1-3 | OK | Simplified Chinese localized mirror. |
| `mydocs/working/task_m050_83_stage1.md` | `mydocs/working/` | Stage 1 | OK | Stage 1 completion report. |
| `mydocs/working/task_m050_83_stage2.md` | `mydocs/working/` | Stage 2 | OK | Stage 2 completion report. |
| `mydocs/working/task_m050_83_stage3.md` | `mydocs/working/` | Stage 3 | OK | Stage 3 completion report. |
| `mydocs/report/task_m050_83_report.md` | `mydocs/report/` | Final report | OK | Final result report after all stages. |

## Stage 1 — Quick Start Path Split

### Outputs

New:

- `mydocs/working/task_m050_83_stage1.md`

Modified:

- `README.md`
- `README.ko.md`
- `README.zh-CN.md`
- `mydocs/orders/20260528.md`

### Changes

- Split the Quick Start section into two explicit paths:
  - Existing repository adoption.
  - New project adoption.
- Preserve the existing one-line adoption prompt for existing repositories.
- Add the new-project sequence:
  - Create an empty repository first.
  - Apply Hyper-Waterfall before product code or product documents.
  - Treat any external project brief as reference material only.
  - Start the first product task as a separate GitHub Issue after adoption.
- Explicitly avoid recommending adoption combined with product planning, architecture documents, or source code generation.
- Keep the section compact so Quick Start remains immediately actionable.

### Validation

```bash
rg -n "Existing repository|New project|project brief|product plans|source code|기존 저장소|새 프로젝트|프로젝트 기획서|제품 계획서|소스 코드|现有仓库|新项目|项目简报|产品计划|源代码" README.md README.ko.md README.zh-CN.md
git diff --check
```

Manual validation:

- Confirm all three README Quick Start sections have the same two-path structure.
- Confirm the new-project guidance does not imply product artifacts are created during adoption.
- Confirm external briefs are described as reference-only material.

### Commit

```text
Task #83 Stage 1: Quick Start new-project guidance
```

## Stage 2 — Copyable Language Support

### Outputs

New:

- `mydocs/working/task_m050_83_stage2.md`

Modified:

- `README.md`
- `README.ko.md`
- `README.zh-CN.md`
- `mydocs/orders/20260528.md`

### Changes

- Replace the long Language support prompt/CLI table with:
  - A compact supported-locale table.
  - A short note that AI coding tool users can ask in their desired language and that the AI reports selected locale before changing files.
  - A single localized `npx` CLI dry-run example.
  - A short Homebrew install path for macOS users who run the CLI often.
- Preserve the supported locale list exactly: `en`, `ko`, `zh-CN`.
- Keep command structure unchanged:
  - `npx hyper-waterfall@0.3.0 init --repo . --locale {locale} --dry-run`
  - `hyper-waterfall init --repo . --locale {locale} --dry-run`
- Preserve the statement that CLI dry-run prints lifecycle judgment only and actual file changes still require approval.
- Present `npx` and Homebrew as lifecycle judgment execution channels, not as automatic adoption or file-application buttons.

### Validation

```bash
rg -n "Language support|언어 지원|语言支持|npx hyper-waterfall@0.3.0 init --repo \\. --locale|brew install postmelee/tap/hyper-waterfall|hyper-waterfall init --repo \\. --locale" README.md README.ko.md README.zh-CN.md
rg -n "selected locale|선택 locale|选择的 locale|--locale en|--locale ko|--locale zh-CN" README.md README.ko.md README.zh-CN.md
bash -lc 'if rg -n "Use locale en|locale은 ko로 사용해줘|使用 zh-CN locale" README.md README.ko.md README.zh-CN.md; then exit 1; fi'
git diff --check
```

Manual validation:

- Confirm no repeated per-language AI prompt blocks remain in the Language support section.
- Confirm each README has one localized `npx` CLI dry-run example.
- Confirm each README has a Homebrew install example and an installed CLI dry-run example.
- Confirm the summary table remains short enough to scan.

### Commit

```text
Task #83 Stage 2: Copyable language support examples
```

## Stage 3 — Cross-Locale Consistency and Final Polish

### Outputs

New:

- `mydocs/working/task_m050_83_stage3.md`

Modified:

- `README.md`
- `README.ko.md`
- `README.zh-CN.md`
- `mydocs/orders/20260528.md`

### Changes

- Check that the changed Quick Start and Language support sections follow the same structure in all three README files.
- Confirm localized links point to the correct agent entrypoint files:
  - `docs/agent-entrypoint.en.md`
  - `docs/agent-entrypoint.md`
  - `docs/agent-entrypoint.zh-CN.md`
- Confirm code identifiers, locale codes, command names, branch/Issue/PR vocabulary, and file paths are preserved.
- Tighten wording where needed so the adoption/product-work boundary is clear without overloading Quick Start.
- Run final whitespace and search-based validation before the final report stage.

### Validation

```bash
rg -n "Existing repository|New project|Language support|언어 지원|语言支持|새 프로젝트|新项目|npx hyper-waterfall@0.3.0" README.md README.ko.md README.zh-CN.md
rg -n "docs/agent-entrypoint\\.en\\.md|docs/agent-entrypoint\\.md|docs/agent-entrypoint\\.zh-CN\\.md" README.md README.ko.md README.zh-CN.md
rg -n "product plans|architecture documents|source code|제품 계획서|아키텍처 문서|소스 코드|产品计划|架构文档|源代码" README.md README.ko.md README.zh-CN.md
git diff --check
```

Manual validation:

- Compare the changed section order across `README.md`, `README.ko.md`, and `README.zh-CN.md`.
- Confirm no unrelated README sections were rewritten.
- Confirm the final wording reflects all decisions from the thread.

### Commit

```text
Task #83 Stage 3: README locale consistency polish
```

## Validation Rules

- Each Stage validation command must run before the Stage report is written.
- A failed validation blocks Stage completion until recovered inside the same Stage or until the plan is updated and re-approved.
- Stage reports are committed with their stage outputs.
- `git diff --check` must pass at every Stage boundary.
- The final report must summarize the changed README guidance, validation results, and any remaining limitations.

## Commits

- Stage commits include both the README changes for that Stage and the corresponding `mydocs/working/task_m050_83_stage{N}.md` report.
- Commit messages use the exact messages listed in each Stage section unless the approved plan is updated.
- The implementation plan itself is committed separately as:

```text
Task #83: implementation plan
```

## Stage Dependencies

- Stage 2 starts only after Stage 1 is reported and approved.
- Stage 3 starts only after Stage 2 is reported and approved.
- Final reporting starts only after Stage 3 is reported and approved.

## Risks and Responses

- **Quick Start bloat**: The new-project path could make the entry section too long. Response: keep each path short and defer lifecycle details to the existing adoption procedure text.
- **Cross-locale drift**: One README could gain different guidance from the others. Response: keep the section structure parallel and validate with targeted searches.
- **Copy block duplication errors**: Repeated prompts and commands can drift by locale. Response: validate locale codes and CLI command strings explicitly.
- **Ambiguous project brief wording**: Readers could still interpret a brief as a request to create product artifacts during adoption. Response: use direct reference-only wording and explicitly move product work to a separate first Issue.

## Approval Request

Please approve:

- The three-stage implementation split.
- The Stage outputs and validation commands.
- The planned commit messages.
- The rule that each Stage stops for approval after its report before the next Stage begins.

After approval, I will start Stage 1 and edit only the Quick Start sections plus the Stage 1 report and todo state.
