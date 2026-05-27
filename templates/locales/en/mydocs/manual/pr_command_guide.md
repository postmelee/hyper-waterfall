# PR Creation Commands and Link Guide

## Purpose

This document defines the `publish/task{number}` push, `gh pr create` commands, and PR body document link rules used for internal task PRs.

Internal task PR body structure follows [`internal_pr_guide.md`](internal_pr_guide.md).

## PR Creation Command

Create a basic PR after pushing `publish/task{number}` to the remote.

```bash
git checkout local/task24
git push origin local/task24:publish/task24
gh pr create \
  --base {BASE_BRANCH} \
  --head publish/task24 \
  --title "Task #24: standardize PR template and PR creation rules" \
  --template {PR_TEMPLATE_PATH}
```

Use `--template` only as the starting point for the PR body.

When the PR body has been finalized from the final report and stage reports, prefer `--body-file`.

```bash
gh pr create \
  --base {BASE_BRANCH} \
  --head publish/task24 \
  --title "Task #24: standardize PR template and PR creation rules" \
  --body-file /tmp/task24-pr-body.md
```

Operating standards:

- Starting from the template: `--template {PR_TEMPLATE_PATH}`
- Finalized from reports: prefer `--body-file <written PR body file>`
- Do not use `--fill` as the default because it creates a body only from commit messages.
- Avoid putting a long body directly in `--body`; it is harder to reuse and review.

## PR Body Document Link Rules

When linking plans, stage reports, final reports, or troubleshooting documents in the PR body, prefer commit SHA-pinned GitHub blob URLs that remain valid after merge.

Use the PR head commit SHA from `git rev-parse HEAD` just before PR creation.

```text
https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/...
```

This keeps links valid after the `publish/task{number}` branch is deleted.

## Work Document Link Format

In `Changes`, write work document links as `[filename](URL)` instead of raw URLs.

```md
- Task plan: [task_m010_61.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m010_61.md)
- Implementation plan: [task_m010_61_impl.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m010_61_impl.md)
- Final report: [task_m010_61_report.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/report/task_m010_61_report.md)
```

In Stage summaries, link the Stage title to the stage report and the short commit SHA next to it to the commit URL.

```md
- **[Stage 1](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/working/task_m010_61_stage1.md)** ([abc1234](https://github.com/{REPO_SLUG}/commit/{stage1_sha})): {Stage 1 one-line summary}
```

## Prohibited

- Relative links in PR bodies
- `blob/publish/task{number}/...` links
- Exposing raw URLs as document links
- Using `--fill` as the default PR body creation method

These patterns reduce readability and make links harder to use after merge.
