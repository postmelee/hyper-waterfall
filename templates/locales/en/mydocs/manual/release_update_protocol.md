# Release and Update Protocol Guide

This document defines GitHub Release/tag criteria, release PRs, and the update protocol for repositories that already adopted Hyper-Waterfall. General task branch operation follows `git_workflow_guide.md`.

## Canonical Distribution Baseline

The canonical distribution unit for the Hyper-Waterfall methodology is a GitHub Release/tag. The state merged into `{RELEASE_BRANCH}` is fixed by a tag, and already adopted repositories update based on that release's `templates/manifest.json` and `docs/migrations/`.

Prompts, npm CLI, plugins, and Homebrew are only channels that make the release/tag baseline easier to execute or discover. They do not replace the canonical baseline.

## Release Readiness Checks

Before release, confirm:

- `frameworkVersion`, `plannedTag`, and `baselineTag` in `templates/manifest.json` match release intent.
- checksums can be finalized from `pending-release` during release packaging.
- `docs/migrations/v{from}-to-v{to}.md` includes added files, modified files, manual review, conflict risk, and verification criteria.
- `.hyper-waterfall/version.json` in adopted repositories can be updated to the target version.

## PR Type Separation

Normal task PRs, release PRs, and Hyper-Waterfall version update PRs have different purposes.

| Type | Purpose | Branch Flow | PR Title |
|---|---|---|---|
| task PR | Apply repository feature, documentation, or operations work by Issue | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: {task title}` |
| release PR | Promote accumulated framework changes from `{BASE_BRANCH}` to `{RELEASE_BRANCH}` and establish the tag baseline | `{BASE_BRANCH}` -> `{RELEASE_BRANCH}` | `Release: {version}` |
| Hyper-Waterfall version update PR | Update an adopted repository from the current version to a target release/tag | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: Hyper-Waterfall {fromVersion} -> {toVersion} version update` |

Separate normal task PRs from release PRs. Updates for adopted repositories happen after release as separate Hyper-Waterfall version update PRs.

## Release PR Flow

At release time, create a PR that promotes verified changes from `{BASE_BRANCH}` to `{RELEASE_BRANCH}`.

```bash
gh pr create --base {RELEASE_BRANCH} --head {BASE_BRANCH} --title "Release: {version}"
gh pr review --approve
gh pr merge --merge --delete-branch=false
```

Before creating the tag, check the manifest and migration guide again.

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
grep -nE 'target version|added files|modified files|manual review|conflict risk|verification' docs/migrations/v{from}-to-v{to}.md
```

Actual tag creation and GitHub Release publication happen in a separately approved release stage.

## Update Protocol

Existing adopted repository updates compare these inputs:

- `.hyper-waterfall/version.json` in the target repository
- `templates/manifest.json` from the target GitHub Release/tag
- `docs/migrations/v{from}-to-v{to}.md` from current version to target version
- user modification diff in the target repository
- if the manifest provides `localization`, current locale record, target release locale support, locale manifest diff, and locale preserve/switch judgment

Report the judgment first using `docs/lifecycle/update.md`. Do not apply files from the manifest diff to the target repository before approval.

## Hyper-Waterfall Version Update PR

Hyper-Waterfall version update PRs use the same branch flow as normal task PRs. The inputs and PR body differ.

- Input: existing update judgment result, manifest diff, locale manifest diff, migration guide
- Body: reflect `docs/lifecycle/update_pr.md` into `.github/pull_request_template.md`
- Tracking: GitHub Issue, task plan, implementation plan, stage reports, final report

Commit message rules:

- Single commit: `Task #{N}: Hyper-Waterfall {fromVersion} -> {toVersion} version update`
- Stage commit: `Task #{N} Stage {S}: Hyper-Waterfall version update {summary}`
- Final report commit: `Task #{N}: final report and daily task board completion`

Hyper-Waterfall version update PRs do not use a separate branch prefix because work tracking remains GitHub Issue plus Hyper-Waterfall artifacts. Even when a CLI or automation creates a PR candidate, it must first print the judgment result, receive an approved Issue number, then follow `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}`.

## Related Documents

- `git_workflow_guide.md`: branch flow and maintainer/contributor Git commands.
- `framework_lifecycle_guide.md`: criteria for turning lifecycle judgment into a normal task.
- `docs/lifecycle/update.md`: existing update judgment result format.
- `docs/lifecycle/update_pr.md`: update PR body criteria.
- `docs/migrations/README.md`: migration guide writing rules.
