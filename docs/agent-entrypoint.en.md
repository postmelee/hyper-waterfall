# Hyper-Waterfall Agent Entrypoint

English | [한국어](agent-entrypoint.md) | [简体中文](agent-entrypoint.zh-CN.md)

This is the first document an AI coding tool reads when applying or updating the Hyper-Waterfall methodology in a target repository. Detailed procedures are split across lifecycle documents and manual documents.

## Principles

- For a new adoption, read `templates/manifest.json` first and operate only from the target files and symlinks defined by the manifest.
- For an update to an already adopted repository, inspect `.hyper-waterfall/version.json`, the target GitHub Release/tag, `templates/manifest.json`, and `docs/migrations/`, then present change candidates.
- Do not rewrite, summarize, or reinterpret Hyper-Waterfall documents.
- Substitute only repository-specific placeholders.
- Preserve ambiguous wording.
- If a target file already exists, ask the task requester before overwriting it.
- Even if the manifest update policy is `overwrite`, do not overwrite files that may contain user changes before checking checksum or diff.
- A new adoption runs in adoption-only strict manifest mode. Do not create or modify files or directories not defined by the manifest.
- Treat project-specific artifacts such as product code, product docs, architecture docs, roadmap, API contracts, examples, and schemas as out of scope for a new adoption. Report them as deferred or separate task candidates only.
- During a new adoption, do not choose or create the official documentation root for the target project. Paths such as `docs/`, `specs/`, `site/`, `website/`, and `adr/` are chosen later through a separate task and document-location decision.

## Choose the Procedure First

| Situation | Document to read |
|---|---|
| Applying Hyper-Waterfall to a repository for the first time | [`docs/lifecycle/adoption.en.md`](lifecycle/adoption.en.md) |
| Updating an already adopted repository to a new release/tag | [`docs/lifecycle/update.en.md`](lifecycle/update.en.md) |
| Converting an approved update judgment into a PR | [`docs/lifecycle/update_pr.en.md`](lifecycle/update_pr.en.md) |
| Converting lifecycle judgment into the normal task workflow | [`templates/locales/en/mydocs/manual/framework_lifecycle_guide.md`](../templates/locales/en/mydocs/manual/framework_lifecycle_guide.md) |
| Checking release/tag and update protocol | [`templates/locales/en/mydocs/manual/release_update_protocol.md`](../templates/locales/en/mydocs/manual/release_update_protocol.md) |

## Language and Locale Reference

- User-facing README entry documents are `README.md` (`en`), `README.ko.md` (`ko`), and `README.zh-CN.md` (`zh-CN`).
- Multilingual adoption policy follows [`docs/localization.md`](localization.md).
- The top-level `localization` field in `templates/manifest.json` and each `files[].localization` entry define the locale source selection contract for new adoption and existing update.
- The selected locale, default locale, fallback candidates, and missing-source report for new adoption follow the judgment format in [`docs/lifecycle/adoption.en.md`](lifecycle/adoption.en.md).
- The approved selected locale for a new adoption is recorded in the top-level `locale` field of `.hyper-waterfall/version.json`.
- Current locale, existing locale preservation, explicit locale switch requests, and locale-specific manifest diff judgment for existing updates follow [`docs/lifecycle/update.en.md`](lifecycle/update.en.md).
- When using the CLI, a new adoption uses `hyper-waterfall init --locale <locale> --dry-run`, and an existing update locale switch review uses `hyper-waterfall update --locale <locale> --dry-run`. These commands only print judgment results. Do not apply files before approval.

## Common Flow

1. Decide whether this is a new adoption or an existing update.
2. Read the detailed document in the table above and write the judgment result first.
3. Ask the task requester for approval before changing files.
4. Apply only the approved scope.
5. If the actual change is converted into a normal task, track it with GitHub Issue, branch, task plan, implementation plan, Stage report, final report, and PR.

This document is the entrypoint for the Hyper-Waterfall framework lifecycle. New adoption and existing update do not mix distribution lifecycle into the core task workflow; they are judged from the release manifest, version record, and migration guide.

## Placeholder

- `{PROJECT_OVERVIEW}`
- `{PROJECT_SPECIFIC_RULES}`
- `{PROJECT_SPECIFIC_REQUIRED_DOCUMENTS}`
- `{PROJECT_VALIDATION_GUIDE}`
- `{REPO_SLUG}`
- `{REPO_NAME}`
- `{BASE_BRANCH}`
- `{RELEASE_BRANCH}`
- `{PR_TEMPLATE_PATH}`

Recommended defaults:

- `{BASE_BRANCH}`: `devel`
- `{RELEASE_BRANCH}`: `main`
- `{PR_TEMPLATE_PATH}`: `.github/pull_request_template.md`

## Prohibited

- Do not re-explain Hyper-Waterfall documents in your own way.
- Do not simplify the procedure or turn it into an automation-tool-centered workflow.
- Do not add new workflows, CLI behavior, or configuration files without the manifest, migration guide, and task requester approval.
- During new adoption, do not create project code, product docs, architecture docs, roadmap, API contracts, examples, schemas, or any other manifest-external artifacts.
- During new adoption, do not arbitrarily choose or create an official docs root such as `docs/`, `specs/`, `site/`, `website/`, or `adr/`.
