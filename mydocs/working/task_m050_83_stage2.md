# Task M050 #83 Stage 2 Report

GitHub Issue: [#83](https://github.com/postmelee/hyper-waterfall/issues/83)
Implementation plan: [`task_m050_83_impl.md`](../plans/task_m050_83_impl.md)
Stage: 2

## Stage Purpose

Stage 2 replaced the long Language support table with a compact locale table, a short AI-language-selection note, a single localized `npx` dry-run example, and a short Homebrew install path for macOS users who run the CLI often.

After task requester review, the section was revised again to remove repeated per-language AI prompt blocks. The assumption is that when users ask an AI coding tool in their desired language, the AI can select and report the locale before file changes. `npx` and Homebrew remain visible near Quick Start, but only as lifecycle judgment execution channels rather than automatic adoption or file-application buttons.

## Outputs

| File | Change Summary |
|---|---|
| `README.md` | Reworked Language support into locale summary, AI-language-selection note, one `npx` dry-run example, and Homebrew CLI example. |
| `README.ko.md` | Applied the same compact Language support structure in Korean. |
| `README.zh-CN.md` | Applied the same compact Language support structure in Simplified Chinese. |
| `mydocs/plans/task_m050_83_impl.md` | Updated Stage 2 plan text and validation to remove repeated AI prompt blocks and include Homebrew guidance. |
| `mydocs/orders/20260528.md` | Updated #83 status note to Stage 2 revision approval pending. |

## Text Change Scope / Losslessness

The README changes are limited to the Language support section. The supported locale list remains `en`, `ko`, and `zh-CN`.

Repeated AI prompt examples were removed from this section. The main Quick Start prompt remains the primary prompt example, and Language support now explains locale behavior without duplicating natural-language prompts.

The existing lower README details about CLI and distribution channels remain in place. The new Quick Start-adjacent Homebrew mention is intentionally short and points only to the common install and dry-run path.

The CLI boundary was preserved: `npx` and Homebrew commands print lifecycle judgment only, and actual file changes still require approval.

## Validation Results

Executed commands:

```bash
rg -n "Language support|언어 지원|语言支持|npx hyper-waterfall@0.3.0 init --repo \\. --locale|brew install postmelee/tap/hyper-waterfall|hyper-waterfall init --repo \\. --locale" README.md README.ko.md README.zh-CN.md
rg -n "selected locale|선택 locale|选择的 locale|--locale en|--locale ko|--locale zh-CN" README.md README.ko.md README.zh-CN.md
bash -lc 'if rg -n "Use locale en|locale은 ko로 사용해줘|使用 zh-CN locale" README.md README.ko.md README.zh-CN.md; then exit 1; fi'
git diff --check
```

Results:

- OK: `rg` found Language support headings in all three README files.
- OK: `rg` found localized `npx hyper-waterfall@0.3.0 init --repo . --locale ... --dry-run` commands in all three README files.
- OK: `rg` found `brew install postmelee/tap/hyper-waterfall` and installed `hyper-waterfall init --repo . --locale ... --dry-run` examples in all three README files.
- OK: selected-locale wording and `--locale en`, `--locale ko`, `--locale zh-CN` command examples were found.
- OK: negative search confirmed repeated locale-specific natural-language prompt strings are no longer present in the README files.
- OK: `git diff --check` completed with no whitespace errors.
- OK: Manual review confirmed the three README Language support sections share the same structure.

## Residual Risk

- The lower README "CLI and Distribution Channels" section still contains detailed `npx` and Homebrew examples, so the README now has both quick copy examples and maintainer/detail examples. This is intentional, but Stage 3 should check that the two locations do not contradict each other.

## Next Stage Impact

- Stage 3 should verify cross-locale section order, entrypoint links, command consistency, and duplication boundaries between the Quick Start Language support section and the lower CLI/distribution detail section.

## Approval Request

- Approve the Stage 2 Language support structure and validation results to proceed to Stage 3.
