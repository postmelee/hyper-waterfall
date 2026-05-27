# Document Structure and Naming Rules Manual

This manual defines `mydocs/` folder roles, document filename rules, the central document template policy, GitHub platform template boundaries, external contributor PR review folder policy, and Agent Skills location policy. Read it before creating a new document or moving an existing one. Code style, Git branch operation, and task stage workflow are covered by related manuals, not this document. Write all documents in the selected Hyper-Waterfall locale for this repository.

`mydocs/` is not a folder for accumulating arbitrary documents. It is a working memory system that lets a new AI session restore "what should be done now," "what was decided," "how far work progressed," "why that judgment was made," and "what pitfalls existed" by reading the repository.

## Core Terms

- **Document source of truth**: the single document or folder treated as current instead of duplicating the same information in multiple places.
- **Document template source of truth**: `mydocs/_templates/`, which defines artifact output formats. In this framework repository, `templates/mydocs/_templates/` is the real source of truth, and dogfooding `mydocs/_templates` points there.
- **GitHub platform template**: `.github/ISSUE_TEMPLATE/` and `.github/pull_request_template.md`, which define the input/body format for GitHub Issues and Pull Requests.
- **Official documentation root**: the target project's official documentation location for users, contributors, external integrators, or distribution channels. Examples include `docs/`, `specs/`, `site/`, `website/`, `adr/`, `book/`, and GitHub Wiki. Hyper-Waterfall does not fix this name.
- **Release manifest**: `templates/manifest.json`, which defines release files, target paths, update policies, and checksum status.
- **Applied version/locale record**: `.hyper-waterfall/version.json`, which records the framework version and selected locale used by a repository where Hyper-Waterfall is applied.
- **Actual artifact document**: a document written for a specific date, Issue, PR, or research topic, such as `orders/20260506.md` or `plans/task_m010_3.md`.
- **Internal task**: repository-internal work tracked by a GitHub Issue and documented with a task plan, implementation plan, stage reports, and final report.
- **External contributor PR**: review work for a Pull Request submitted by an external contributor. It uses a different folder and procedure from internal tasks.
- **Milestone-including filename**: a new document filename such as `task_m010_49.md` that includes both milestone and Issue number.
- **Agent Skills source of truth**: `mydocs/skills/{skill-name}/SKILL.md`, read by Codex and Claude Code.

## Document Filename Rules

New internal task documents use the GitHub Issue number and milestone together.

- Task plan: `task_{milestone}_{issue_number}.md` (example: `task_m100_7.md`)
- Implementation plan: `task_{milestone}_{issue_number}_impl.md` (example: `task_m100_7_impl.md`)
- Stage report: `task_{milestone}_{issue_number}_stage{N}.md` (example: `task_m100_7_stage1.md`)
- Final report: `task_{milestone}_{issue_number}_report.md` (example: `task_m100_7_report.md`)

Supporting documents should expose topic and date when useful.

- Daily task board: `{yyyymmdd}.md` (example: `20260506.md`)
- Feedback: `{yyyymmdd}_{topic}.md` or `task_{milestone}_{issue_number}_feedback.md`
- Technical research: `{yyyymmdd}_{topic}.md` or `task_{milestone}_{issue_number}_{topic}.md`
- Troubleshooting: `{yyyymmdd}_{topic}.md` or `task_{milestone}_{issue_number}_{topic}.md`
- External PR review documents: `pr_{number}_review.md`, `pr_{number}_review_impl.md`, `pr_{number}_report.md`

Mandatory rules:

- New internal task documents must use `task_{milestone}_{issue_number}`.
- Milestones are written as `m{number}`, such as `m100` or `m200`.
- Do not create new internal task documents in `task_{issue_number}` format without milestone.
- Legacy filenames may remain, but new Issues use milestone-including filenames.
- Do not put template files inside actual artifact folders. Templates live only in `mydocs/_templates/`.

## Folder Roles

| Folder | Purpose | Notes |
|------|---------|------|
| `_templates/` | Document output format templates | Source of truth for artifact formats, not task artifacts |
| `orders/` | Daily task board | Only `yyyymmdd.md`; detailed analysis goes to `tech/` or `troubleshootings/`; completed rows include `Done: HH:mm` |
| `plans/` | Task and implementation plans | Do not place `_stage{N}` or `_report` files here |
| `plans/archives/` | Completed plan archive | Used during post-merge cleanup |
| `working/` | Stage reports (`_stage{N}.md`) | Do not place final reports here |
| `report/` | Final reports (`_report.md`) and long-term reports | Final reports must go here |
| `feedback/` | Task requester feedback and code review comments | Preserves human judgment the AI cannot invent |
| `tech/` | Technical research and structure/spec analysis | Reusable evidence, alternative comparison, unofficial drafts |
| `manual/` | Operating manuals and guides | Hyper-Waterfall procedures, agent rules, repeated work standards |
| `troubleshootings/` | Troubleshooting and recurrence prevention | Records resolution process and pitfalls |
| `pr/` | External contributor PR review records | Separate from internal tasks |
| `pr/archives/` | Archived completed PR review records |  |
| `skills/` | Agent Skills `SKILL.md` source of truth | `.agents/skills` and `.claude/skills` symlink here |

## Official Documentation Root and `mydocs/` Boundary

Hyper-Waterfall does not fix the official documentation root name for the target project. The target project may choose `docs/`, `specs/`, `site/`, `website/`, `adr/`, `book/`, GitHub Wiki, or another location according to its needs. This list is examples, not a default.

Content that may belong in the official documentation root:

- Product documentation referenced directly by users, contributors, or external integrators
- Official contracts that implementation and external users must follow, such as APIs, protocols, DSLs, schemas, or MCP tool contracts
- Public surfaces such as documentation sites, update feeds, or release notes
- Architecture, security, integration, or operations policy documents linked by README as official standards

Content that belongs in `mydocs/`:

- Plans, stage results, and final reports for specific Issues
- Research, alternative comparisons, decision evidence, and drafts not yet formalized
- Task requester feedback and review judgments
- Hyper-Waterfall operating procedures, agent rules, and repeated work standards
- Failure symptoms, causes, resolutions, and recurrence prevention records

Mandatory rules:

- During new Hyper-Waterfall adoption, do not choose or create an official documentation root. If product documentation seems needed outside the manifest, record it as a deferred item or separate task candidate.
- Any task that creates or moves product, user, contributor, external integration, API, architecture, or roadmap documentation must record a document location judgment in the task plan and receive approval.
- The document location judgment must include audience, officialness level, selected path, alternative path, and reason.
- `mydocs/manual/` is not the target project's product documentation location. It contains repeated Hyper-Waterfall operating procedures and standards.
- `mydocs/tech/` is for research and design judgment evidence. To promote content into an official contract or user-facing document, choose and approve an official documentation root in a separate task.
- If the target repository already has official documentation root or documentation site rules, inspect those conventions first. Hyper-Waterfall does not create `docs/` as a default.

## Manual Document Neutrality Policy

`mydocs/manual/` documents record long-lived principles, procedures, and judgment standards. Do not accumulate details from a specific Issue, PR, Stage, release, one-time verification, or failure event in manual bodies.

Allowed in manuals:

- Repeated policies and guardrails
- Procedures and check criteria reusable by workers
- Operating standards and responsibility boundaries that require document updates when changed
- Short entrypoints and links for finding subordinate documents or artifacts

Separate out of manuals:

- Analysis, evidence, and completion results for a specific Issue, PR, or Stage
- Detailed release preparation, deployment verification, or release decision records
- Specific migration/update review results and follow-up handoff
- Incident records that need symptoms, reproduction conditions, cause, and recurrence prevention

Separation targets:

| Content | Location |
|---|---|
| Internal task stage results and approval evidence | `mydocs/working/` |
| Internal task final results and long-term reports | `mydocs/report/` |
| Reusable technical research and design judgment | `mydocs/tech/` |
| Failure symptoms, causes, fixes, and recurrence prevention | `mydocs/troubleshootings/` |
| Release preparation and deployment verification for this framework repository | `docs/releases/` |
| Migration/update judgment criteria for repositories that already adopted the framework | `docs/migrations/` |

When a manual needs to reference a specific event document, do not copy the event content. Keep only generalized judgment rules and a short link in the manual; keep detailed context in the artifact document.

## Central Template Policy

Document output formats are managed in `mydocs/_templates/`. Each Skill should consult the central template first whenever possible, and use the minimal section summary inside the Skill only as fallback when the template cannot be read.

- Framework source of truth: `templates/mydocs/_templates/`
- Applied repository location: `mydocs/_templates/`
- Dogfooding location in this repository: `mydocs/_templates -> ../templates/mydocs/_templates`

Central templates:

- Fix expected output shape and output format requirements as file structure.
- Specify desired output format and constraints so literal instruction following stays stable.
- Prevent the model from inventing a document structure every time.
- Keep section meaning stable when documents are reused as the next session prompt.

Mandatory rules:

- Do not place template files inside artifact folders.
- `orders/`, `plans/`, `working/`, `report/`, `feedback/`, `tech/`, `troubleshootings/`, and `pr/` contain only actual artifacts.
- Template filenames or first headings must make it clear that they are templates.
- When a template changes, review the related Skill template references and the README document structure description.

## GitHub Platform Template Policy

GitHub Issues and Pull Requests are GitHub platform artifacts, not `mydocs/` artifacts. Manage their formats under `.github/`, not `mydocs/_templates/`.

- Issue Form source of truth: `templates/.github/ISSUE_TEMPLATE/task.yml`
- Applied repository location: `.github/ISSUE_TEMPLATE/task.yml`
- Dogfooding location in this repository: `.github/ISSUE_TEMPLATE/task.yml`
- PR body template source of truth: `templates/.github/pull_request_template.md`
- Applied repository PR body location: `.github/pull_request_template.md`

Role boundaries:

- `.github/ISSUE_TEMPLATE/task.yml` structures background, goals, included scope, excluded scope, acceptance criteria, verification criteria, references, and metadata so a GitHub Issue can become the first prompt for the next task.
- `.github/pull_request_template.md` defines the review-screen summary format for changes, verification, and remaining risks after the final report.
- `mydocs/_templates/` defines formats for repository-retained artifacts such as task plans, implementation plans, stage reports, final reports, feedback, technical notes, troubleshooting, and external PR review documents.

Mandatory rules:

- Do not put the GitHub Issue Form in `mydocs/_templates/`.
- `task-register` should use `.github/ISSUE_TEMPLATE/task.yml` first when creating Issue bodies, and use Skill fallback sections only when the file cannot be read.
- When `.github/ISSUE_TEMPLATE/task.yml` changes, review the `task-register` Skill, README prompt guide explanation, and this manual's role boundaries.

## Release Manifest and Version Record Policy

The canonical distribution unit for Hyper-Waterfall is a GitHub Release/tag. Prompts are only user interfaces for starting installation or update. Actual file application is based on the release `templates/manifest.json`, version record, and migration guide.

- Manifest source of truth: `templates/manifest.json`
- Applied repository version/locale record: `.hyper-waterfall/version.json`
- Migration guide location: `docs/migrations/`

Lifecycle judgment details are covered by the following documents:

| Topic | Source of Truth |
|---|---|
| New adoption procedure and judgment result format | `docs/lifecycle/adoption.md` |
| Existing repository update judgment | `docs/lifecycle/update.md` |
| Hyper-Waterfall version update PR transition | `docs/lifecycle/update_pr.md` |
| Release/tag and update protocol | [`release_update_protocol.md`](release_update_protocol.md) |

`templates/manifest.json`:

- Lists framework files included in a release and their target paths.
- Identifies update target areas such as `AGENTS.md`, `CLAUDE.md`, `.github/`, `mydocs/_templates/`, `mydocs/manual/`, and `mydocs/skills/`.
- Expresses each entry's update policy as `overwrite`, `merge`, `manual`, `preserve`, or `symlink`.
- May keep checksums as `pending-release` before release packaging, then finalize them when the actual tag/release is created.

Update policy meanings:

- `overwrite`: replace only when the target file still matches the previous manifest checksum; treat user modification as conflict.
- `merge`: use for user-visible and commonly customized rule/template files; prefer patch and review over automatic overwrite.
- `manual`: require maintainer judgment with a migration guide.
- `preserve`: create when missing, but do not change existing content without explicit approval.
- `symlink`: verify links such as `.agents/skills -> ../mydocs/skills` and `.claude/skills -> ../mydocs/skills`.

`.hyper-waterfall/version.json` is not a work artifact. Do not place it under `mydocs/`. It records which Hyper-Waterfall release and locale the target repository installed and when it was last updated. Lifecycle judgment reads this file and compares the current version, current locale, target release manifest, and migration guide.

New adoption uses strict manifest mode. Allowed targets are manifest `files[]` targets, `.hyper-waterfall/version.json`, and manifest-defined symlinks. Do not create or modify files outside the manifest during adoption. Target-project-specific artifacts such as product code, product docs, architecture docs, roadmap, API contracts, examples, and schemas are deferred task candidates, not adoption side effects.

Hyper-Waterfall version update PRs are also GitHub platform artifacts, so do not create a separate document template for them in `mydocs/_templates/`. Use `.github/pull_request_template.md` for the PR body, and reflect manifest diff and migration guide evidence in the `Summary`, `Changes`, `Verification`, `Verification limits`, and `Remaining risks` sections.

Lifecycle judgment results are pre-application report formats, not long-term artifact templates stored under `mydocs/`. Once a judgment result is approved and actual changes begin, track the work through a GitHub Issue, task plan, implementation plan, stage reports, final report, and PR body template.

Mandatory rules:

- When `templates/manifest.json` changes, review README distribution/update explanations and migration guides together.
- `.hyper-waterfall/version.json` is a state file left in an actual adopted repository; do not mix it with document artifact templates in this framework repository.
- Do not mark highly user-customizable files as unconditional `overwrite` in the manifest.
- When README or `docs/agent-entrypoint.md` installation/update explanations change, review the manifest, migration guides, `framework_lifecycle_guide.md`, and `release_update_protocol.md` explanations together.

## External Contributor PR Review Policy

External contributor PR review uses `mydocs/pr/`, not the internal task folders.

- Initial review: `mydocs/pr/pr_{number}_review.md`
- Optional review implementation/verification plan: `mydocs/pr/pr_{number}_review_impl.md`
- Final report: `mydocs/pr/pr_{number}_report.md`
- Archive after completion: `mydocs/pr/archives/`

Internal task documents are issue-backed and Stage-backed. External PR review documents are PR-backed and do not force internal task stage/final report formats. If external PR review reveals internal follow-up work, create a separate GitHub Issue and start an internal task.

## Agent Skills Location Policy

Agent Skills are stored in `mydocs/skills/{skill-name}/SKILL.md`.

- Source of truth: `mydocs/skills/`
- Codex discovery path: `.agents/skills -> mydocs/skills`
- Claude Code discovery path: `.claude/skills -> mydocs/skills`
- Both symlinks are committed to git with mode `120000`.
- Skill bodies should be tool-independent (`gh`, `git`, file creation), and tool-specific invocation differences should live only in the "Invocation" section at the end of `SKILL.md`.
- When a Skill writes a plan, report, or review document, it should first consult the corresponding template under `mydocs/_templates/`.

Do not edit the symlink targets casually. If a Skill is added, removed, renamed, or its call timing changes, review README's core Skill table and `task_workflow_guide.md` Skill call display guidance in the same PR.

## Related Manuals

- [`task_workflow_guide.md`](task_workflow_guide.md): Issue-based task flow, approval gates, reports, and PR publication.
- [`git_workflow_guide.md`](git_workflow_guide.md): branch naming, remote publication, merge, and cleanup.
- [`pr_process_guide.md`](pr_process_guide.md): PR handling entrypoint.
- [`release_update_protocol.md`](release_update_protocol.md): release/tag and update protocol.
- [`agent_code_hyperfall_rule_conflict.md`](agent_code_hyperfall_rule_conflict.md): conflicts between agent defaults and Hyper-Waterfall rules.
