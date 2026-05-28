# New Adoption Lifecycle Guide

English | [한국어](adoption.md) | [简体中文](adoption.zh-CN.md)

This document defines the scope, procedure, and judgment result format for applying the Hyper-Waterfall methodology to a target repository for the first time. The first entrypoint for an AI coding tool is `docs/agent-entrypoint.en.md`.

## Principles

- A new adoption reads `templates/manifest.json` first and operates from the target files and symlinks defined by the manifest.
- Do not rewrite, summarize, or reinterpret documents.
- Substitute only repository-specific placeholders.
- Preserve ambiguous wording.
- If a target file already exists, ask the task requester before overwriting it.
- Even if the manifest update policy is `overwrite`, do not overwrite files that may contain user changes before checking checksum or diff.
- The default locale for new adoption follows `localization.defaultLocale` in `templates/manifest.json`.
- If the task requester explicitly names a language or locale, check `localization.supportedLocales` and the existence of each entry's `files[].localization.sourcePattern` before changing files.
- If the selected locale source is missing, do not silently treat the adoption as successful. Report fallback candidates and missing entries based on the manifest's `localization.missingLocalePolicy` and each entry's `fallbackLocale`.
- Record the approved selected locale in the top-level `locale` field of `.hyper-waterfall/version.json`.

## New Adoption Procedure

1. Confirm the target repository root.
2. Inspect `templates/manifest.json`.
3. Check `localization.defaultLocale`, `supportedLocales`, `fallbackLocale`, and `missingLocalePolicy`.
4. If the task requester requested a locale, record it as the selected locale; otherwise present the default locale as the selection candidate.
5. For entries with `files[].localization.enabled: true`, check whether the selected locale `sourcePattern` exists and whether fallback candidates exist.
6. For entries with `files[].localization.enabled: false` or no localization field, classify the manifest's default `source` as the adoption candidate.
7. If locale sources are missing, a directory is partially missing, or fallback candidates exist, report them in the judgment result and get task requester approval.
8. Copy `templates/AGENTS.md`, `templates/CLAUDE.md`, or the corresponding locale pack files based on the approved source.
9. Copy `templates/.github/ISSUE_TEMPLATE/task.yml`, `templates/.github/pull_request_template.md`, or the corresponding locale pack files based on the approved source.
10. Copy `templates/mydocs/` or the corresponding locale pack directory based on the approved source.
11. Create the `.agents/skills -> ../mydocs/skills` symlink.
12. Create the `.claude/skills -> ../mydocs/skills` symlink.
13. Create `.hyper-waterfall/version.json`. Record `frameworkVersion`, `releaseTag`, `locale`, `installedAt`, and `updatedAt`.
14. Substitute placeholders.
15. Add target-project-specific rules only in the designated section of `AGENTS.md`.
16. Review the change with `git diff` and report it to the task requester.

## Scope Limit

A new adoption runs in adoption-only strict manifest mode. It installs only Hyper-Waterfall operating files and work-memory structure. Allowed targets are the manifest `files[]` targets, `.hyper-waterfall/version.json`, and symlinks defined by the manifest.

Do not create or modify files or directories outside that scope during a new adoption.

Examples of paths that must not be created or modified:

- `docs/**`
- `src/**`
- `examples/**`
- `schemas/**`
- `package.json`
- `tsconfig.json`

This list is an example of paths outside the manifest. It does not define the target repository's general documentation structure, official docs root name, or product documentation location.

Even if product code, product docs, architecture docs, roadmap, API contracts, examples, or schemas seem necessary, do not create files during the new adoption. Record them only as deferred items or separate task candidates in the judgment result.

If an official docs root seems necessary, do not decide the location in the new adoption judgment. Leave a separate task candidate such as "official docs root selection and document location judgment required"; later, the task plan must approve the target audience, officialization level, selected path, alternative path, and reason.

## New Adoption Judgment Result Format

Before copying files or creating symlinks, present this judgment result to the task requester and get approval.

- Target repository: repository root and base branch to apply Hyper-Waterfall to
- Target release/tag: Hyper-Waterfall GitHub Release or tag to apply
- Selected locale: task requester requested locale or manifest default locale, whether it is in `supportedLocales`, `defaultLocale`, `fallbackLocale`
- Locale source candidates: selected locale `sourcePattern` existence, missing files or directories, fallback candidates, mixed-locale risk from partial directory presence
- Manifest-based adoption candidates: files and directories to copy, preserve, or symlink based on `templates/manifest.json`
- Locale adoption candidates: selected locale source or fallback candidate for locale-enabled entries, default source for non-locale entries
- Manifest-external deferred candidates: target-project-specific artifacts not created during new adoption and whether a separate task is needed
- Official docs root deferred: do not decide candidates such as `docs/`, `specs/`, `site/`, `website/`, `adr/`; note that a separate task needs document location judgment
- Existing file conflict risk: existing target files, user-modifiable files, overwrite-prohibited entries
- `.hyper-waterfall/version.json` creation plan: version, release, selected locale, source, installedAt, updatedAt values to record
- Locale record plan: approved selected locale will be recorded in `.hyper-waterfall/version.json` top-level `locale`
- Placeholder checklist: `{REPO_SLUG}`, `{REPO_NAME}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`, `{PR_TEMPLATE_PATH}`, and other substitution or deferred targets
- Approval request: items to apply immediately, items to defer, and items to split into separate Issues

## Related Documents

- `docs/agent-entrypoint.en.md`: lifecycle entrypoint.
- `docs/localization.md`: multilingual policy and locale pack contract.
- `templates/manifest.json`: new adoption file list and update policy.
- `templates/locales/en/mydocs/manual/document_structure_guide.md`: official docs root and `mydocs/` boundary.
- `templates/locales/en/mydocs/manual/framework_lifecycle_guide.md`: criteria for converting lifecycle judgment into the normal task workflow.
