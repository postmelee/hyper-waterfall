# Task M050 #83 Stage 1 Report

GitHub Issue: [#83](https://github.com/postmelee/hyper-waterfall/issues/83)
Implementation plan: [`task_m050_83_impl.md`](../plans/task_m050_83_impl.md)
Stage: 1

## Stage Purpose

Stage 1 split the Quick Start guidance into two explicit paths: applying Hyper-Waterfall to an existing repository and starting a brand-new project with Hyper-Waterfall from day one.

The stage also added the agreed adoption boundary: external project briefs can be attached as reference only, while product plans, architecture documents, and source code must not be generated during the adoption step.

## Outputs

| File | Change Summary |
|---|---|
| `README.md` | Added `Existing repository` and `New project` Quick Start paths, with reference-only project brief guidance and separate first-Issue product work. |
| `README.ko.md` | Added the same Quick Start path split in Korean. |
| `README.zh-CN.md` | Added the same Quick Start path split in Simplified Chinese. |
| `mydocs/orders/20260528.md` | Updated #83 status note to Stage 1 report approval pending. |

## Text Change Scope / Losslessness

The README changes are limited to the Quick Start area before the Language support section. The existing adoption prompt, agent entrypoint link, approval-gate wording, and "What the AI reports first" table were preserved in each README.

The Language support table remains unchanged in this Stage; it is the planned Stage 2 scope.

## Validation Results

Executed commands:

```bash
rg -n "Existing repository|New project|project brief|product plans|source code|기존 저장소|새 프로젝트|프로젝트 기획서|제품 계획서|소스 코드|现有仓库|新项目|项目简报|产品计划|源代码" README.md README.ko.md README.zh-CN.md
git diff --check
```

Results:

- OK: `rg` found the new existing-repository and new-project headings in all three READMEs.
- OK: `rg` found the reference-only brief wording and the product artifact boundary in all three READMEs.
- OK: `git diff --check` completed with no whitespace errors.
- OK: Manual side-by-side review confirmed the same two-path Quick Start structure across English, Korean, and Simplified Chinese READMEs.
- OK: Manual review confirmed the new-project guidance does not imply product artifacts are created during adoption.

## Residual Risk

- Stage 2 has not yet improved the Language support section, so the current long prompt/CLI table remains until the next approved stage.

## Next Stage Impact

- Stage 2 should preserve this new Quick Start structure while replacing the Language support table with a compact locale overview and copyable prompt/CLI blocks.

## Approval Request

- Approve the Stage 1 Quick Start guidance and validation results to proceed to Stage 2.
