# Task M050 #83 Stage 2 Report

GitHub Issue: [#83](https://github.com/postmelee/hyper-waterfall/issues/83)
Implementation plan: [`task_m050_83_impl.md`](../plans/task_m050_83_impl.md)
Stage: 2

## Stage Purpose

Stage 2 replaced the long Language support table with a more copyable structure: a compact locale table, language-specific AI prompt blocks, language-specific `npx` dry-run blocks, and a short Homebrew install path for macOS users who run the CLI often.

This stage also incorporated the task requester's decision that `npx` and Homebrew should be visible near Quick Start, while still being described as lifecycle judgment execution channels rather than automatic adoption or file-application buttons.

## Outputs

| File | Change Summary |
|---|---|
| `README.md` | Reworked Language support into locale summary, copyable prompt blocks, `npx` dry-run blocks, and Homebrew CLI example. |
| `README.ko.md` | Applied the same Language support structure in Korean. |
| `README.zh-CN.md` | Applied the same Language support structure in Simplified Chinese. |
| `mydocs/plans/task_m050_83_impl.md` | Updated Stage 2 plan text and validation to include Homebrew guidance. |
| `mydocs/orders/20260528.md` | Updated #83 status note to Stage 2 report approval pending. |

## Text Change Scope / Losslessness

The README changes are limited to the Language support section. The supported locale list remains `en`, `ko`, and `zh-CN`.

The existing lower README details about CLI and distribution channels remain in place. The new Quick Start-adjacent Homebrew mention is intentionally short and points only to the common install and dry-run path.

The CLI boundary was preserved: `npx` and Homebrew commands print lifecycle judgment only, and actual file changes still require approval.

## Validation Results

Executed commands:

```bash
rg -n "Language support|언어 지원|语言支持|Supported locale|지원 locale|支持的 locale|npx hyper-waterfall@0.3.0 init --repo \\. --locale|brew install postmelee/tap/hyper-waterfall|hyper-waterfall init --repo \\. --locale" README.md README.ko.md README.zh-CN.md
rg -n "locale en|locale은 ko|使用 zh-CN locale|--locale en|--locale ko|--locale zh-CN" README.md README.ko.md README.zh-CN.md
git diff --check
```

Results:

- OK: `rg` found Language support headings in all three README files.
- OK: `rg` found all three `npx hyper-waterfall@0.3.0 init --repo . --locale ... --dry-run` commands in all three README files.
- OK: `rg` found `brew install postmelee/tap/hyper-waterfall` and installed `hyper-waterfall init --repo . --locale ... --dry-run` examples in all three README files.
- OK: locale prompt strings and `--locale en`, `--locale ko`, `--locale zh-CN` command examples were found.
- OK: `git diff --check` completed with no whitespace errors.
- OK: Manual review confirmed the three README Language support sections share the same structure.

## Residual Risk

- The lower README "CLI and Distribution Channels" section still contains detailed `npx` and Homebrew examples, so the README now has both quick copy examples and maintainer/detail examples. This is intentional, but Stage 3 should check that the two locations do not contradict each other.

## Next Stage Impact

- Stage 3 should verify cross-locale section order, entrypoint links, command consistency, and duplication boundaries between the Quick Start Language support section and the lower CLI/distribution detail section.

## Approval Request

- Approve the Stage 2 Language support structure and validation results to proceed to Stage 3.
