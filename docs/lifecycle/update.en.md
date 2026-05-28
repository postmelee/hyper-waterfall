# Existing Update Lifecycle Guide

English | [한국어](update.md) | [简体中文](update.zh-CN.md)

This document defines the judgment procedure and result format for updating a repository that already has Hyper-Waterfall applied to a new GitHub Release/tag.

## Entry Conditions

- The target repository has `.hyper-waterfall/version.json`.
- A target GitHub Release/tag is chosen or available as a candidate.
- The target release's `templates/manifest.json` and related `docs/migrations/` documents can be checked.
- If the target release's `templates/manifest.json` has `localization`, supported locale, default locale, fallback locale, and existing-locale preservation criteria can be checked.
- If the current adopted repository's `.hyper-waterfall/version.json` has a top-level `locale`, read that value. For compatibility with older adopted repositories, `selectedLocale`, `localization.locale`, and `localization.selectedLocale` may also be read candidates. If no record exists, report `unknown`.

## Update Entry Procedure

1. Check whether `.hyper-waterfall/version.json` exists in the target repository and read the current version.
2. If a current locale record exists, read it; otherwise classify it as `unknown`.
3. Check the target GitHub Release/tag's `templates/manifest.json` and `localization` contract.
4. Check `docs/migrations/v{from}-to-v{to}.md` for the current version to target version path.
5. Classify items as automatically applicable, manual review required, or conflict risk based on manifest diff and locale source diff.
6. Do not overwrite user-modified files. Summarize them as Hyper-Waterfall version update PR candidates.
7. After task requester approval, proceed with the update in a separate Issue and branch.

## Classification Criteria

- Automatically applicable: previous manifest checksum matches the target file, update policy allows automatic application, existing selected locale source exists in the target release, and no fallback is needed
- Manual review required: update policy is `merge`, `manual`, or `preserve`; project-specific operating rules may be mixed in; selected locale source is missing and fallback candidates must be presented; or a locale switch was requested
- Conflict: target repository changes and target release changes may touch the same file or link path, or selected locale and fallback locale sources may be mixed and create semantic drift risk
- Deferred: leave the item to a separate Issue, separate PR, or maintainer manual action instead of handling it in this change

Do not classify user-modified files as automatically applicable. Keep those files as manual review required or conflict in the judgment result and write the rationale.

If `localization.preserveSelectedLocaleOnUpdate` is `true`, existing adopted repository updates preserve the existing locale by default. Locale switching is not a side effect of update; it is separated as an explicit task requester request and approval item.

## Existing Update Judgment Result Format

Before changing files, present this judgment result and proceed only with the approved scope in a separate Issue and branch.

- Target repository: repository root and base branch to update
- Current version: version, release, appliedAt recorded in `.hyper-waterfall/version.json`
- Current locale: top-level `locale` in `.hyper-waterfall/version.json` or compatible field value, `unknown` when absent, and evidence
- Target release/tag: Hyper-Waterfall GitHub Release or tag to apply
- Target release locale support: `supportedLocales`, `defaultLocale`, `fallbackLocale`, `availability.status`, and whether existing locale is preserved
- Migration guide: `docs/migrations/v{from}-to-v{to}.md` to read for the current-to-target version path
- Manifest diff: summary of additions, modifications, deletions, and symlink differences between current applied baseline and target release manifest
- Locale manifest diff: existing locale source existence, selected locale source changes, missing files or directories, fallback candidates, mixed-locale risk
- Locale preservation/switch judgment: whether existing locale is preserved, whether the task requester requested a locale switch, and whether separate approval is needed
- Automatically applicable: checksum match, no user modification, and update policy allows automatic application
- Manual review required: update policy is `merge`, `manual`, `preserve`, or user judgment is needed
- Conflict: target repository changes and target release changes may conflict, so direct overwrite is prohibited
- Hyper-Waterfall version update PR candidates: approved change bundle, verification items, and remaining risk for a separate PR
- Approval request: automatic application, manual review, conflict handling, and whether to create a Hyper-Waterfall version update PR

## CLI Output Contract

Even if the CLI prints an `update` or `doctor` result, that output is a pre-file-change judgment report. It must include current version, current locale, requested locale or switch request, target release/tag, target release locale support, migration guide, manifest diff, locale manifest diff, automatically applicable, manual review required, conflict, deferred, verification, and approval request.

Do not apply files included in the manifest diff before approval.

## Related Documents

- `docs/agent-entrypoint.en.md`: lifecycle entrypoint.
- `docs/lifecycle/update_pr.en.md`: criteria for converting approved update candidates into a PR.
- `docs/migrations/README.md`: migration guide authoring rules.
- `templates/locales/en/mydocs/manual/release_update_protocol.md`: release/tag and update protocol.
