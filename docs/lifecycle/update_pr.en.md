# Hyper-Waterfall Version Update PR Guide

English | [한국어](update_pr.md) | [简体中文](update_pr.zh-CN.md)

This document defines the conditions, naming rules, and PR body structure for converting approved change candidates from an existing-update judgment into a Hyper-Waterfall version update PR.

## Creation Conditions

Convert to a Hyper-Waterfall version update PR only when the following information has been presented and the task requester has approved PR creation.

- Current version
- Target release/tag
- Current locale
- Requested locale or locale switch request
- Target release locale support
- Migration guide
- Manifest diff
- Locale manifest diff
- Locale preservation/switch judgment
- Automatically applicable items
- Manual review required items
- Conflict items

Do not apply files included in the manifest diff before approval.

## Conversion to Normal Task Flow

- Issue: create one GitHub Issue for each update change bundle. If an Issue already exists, use that Issue number.
- Work branch: `local/task{issue_number}`
- PR publication branch: `publish/task{issue_number}`
- Commit message: `Task #{issue_number}: Hyper-Waterfall {fromVersion} -> {toVersion} version update`; for stage work, `Task #{issue_number} Stage {N}: Hyper-Waterfall version update {content}`
- PR title: `Task #{issue_number}: Hyper-Waterfall {fromVersion} -> {toVersion} version update`
- PR base: target repository `{BASE_BRANCH}`
- PR body: include manifest diff, migration guide summary, automatically applicable items, manual review required items, conflict items, verification result, and verification limits.

A Hyper-Waterfall version update PR has a different purpose from a release PR or normal feature task PR, but the tracking unit is still GitHub Issue plus Hyper-Waterfall document artifacts. Do not create a special branch system; use the existing `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` flow.

## PR Body Structure

Use the existing `.github/pull_request_template.md` for a Hyper-Waterfall version update PR. Instead of creating a separate template, fill the existing sections with the items below.

| PR body section | Required content |
|---|---|
| `Summary` | Current version, current locale, requested locale or locale switch request, target release/tag, target release locale support, migration guide, review points |
| `Changes` | Summary of manifest diff and locale manifest diff. Separate additions, modifications, deletions, symlinks, preserve, fallback candidates, locale preservation/switch candidates |
| `Impact area` | Affected areas such as `AGENTS.md`, `CLAUDE.md`, `.github/`, `mydocs/manual/`, `mydocs/skills/`, `.hyper-waterfall/version.json` |
| `Verification` | Manifest parsing, version record and `locale` field check, target release locale support check, migration guide required section check, user modification conflict check |
| `Verification limits` | User modifications that could not be detected automatically, files requiring manual review, cases where existing version state has no locale record and is judged as `unknown`, reasons remote CI was not run |
| `Remaining risk` | Conflict, fallback candidates, deferred items, and items that the adopted repository maintainer must decide directly |

## Change Classification Criteria

- Automatically applicable: previous manifest checksum matches the target file, update policy allows automatic application, existing selected locale source exists in the target release, and no fallback is needed
- Manual review required: update policy is `merge`, `manual`, or `preserve`; project-specific operating rules may be mixed in; selected locale source is missing and fallback candidates must be presented; or a locale switch was requested
- Conflict: target repository changes and target release changes may touch the same file or link path, or selected locale and fallback locale sources may be mixed and create semantic drift risk
- Deferred: leave the item to a separate Issue, separate PR, or maintainer manual action instead of handling it in this PR

Do not classify user-modified files as automatically applicable. In the PR body, keep those files as manual review required or conflict, and write the rationale in verification limits and remaining risk.

If `localization.preserveSelectedLocaleOnUpdate` is `true`, explain that the PR preserves the existing locale by default. Locale switching is not a side effect of update; write it as an explicitly approved task requester item.

## Related Documents

- `docs/lifecycle/update.en.md`: existing update judgment result format.
- `templates/locales/en/mydocs/manual/framework_lifecycle_guide.md`: criteria for converting judgment results into normal tasks.
- `templates/locales/en/mydocs/manual/release_update_protocol.md`: release/tag and update protocol.
- `templates/locales/en/mydocs/manual/internal_pr_guide.md`: internal task PR body authoring principles.
- `templates/locales/en/mydocs/manual/pr_command_guide.md`: PR creation commands and document link rules.
