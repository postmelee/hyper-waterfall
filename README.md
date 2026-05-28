# Hyper-Waterfall

English | [한국어](README.ko.md) | [简体中文](README.zh-CN.md)

![Hyper-Waterfall overview](docs/assets/hyper-waterfall.png)

## A Methodology for Turning AI Pair Programming into a Traceable, Approvable Development Process

Hyper-Waterfall is not a way to tell AI, "just build it." It puts AI's execution speed inside human planning, approval, verification, and reporting discipline so you get both fast implementation and a traceable development process.

The core is simple: **AI executes, humans decide the direction.** Work flows through Issue, branch, plan, Stage report, final report, and PR, with approval gates at the boundaries between steps.

| Hyper-Waterfall Core | Meaning |
|---|---|
| Human decision ownership | Direction, scope, quality, and architecture decisions stay with the human. |
| Approval gates | A human checks before source edits, stage transitions, final reporting, and PR creation. |
| Externalized work memory | Context is left in Issues, plans, reports, PRs, and commit logs instead of only in chat. |
| Staged execution | Large work is split into Stages, and every Stage includes verification and reporting. |
| Resumable process | A new AI session or contributor can read repository documents and continue from the same context. |

> [!IMPORTANT]
> **Delegate execution to AI, but do not delegate decision ownership.**
>
> Hyper-Waterfall is not a tool that makes AI magically capable of anything. It is a set of rails that lets AI move quickly without making humans lose direction.

## Why Hyper-Waterfall?

AI's weakness is not a lack of execution power. Its weakness is that it can lose context or run quickly in the wrong direction. Hyper-Waterfall turns that weakness into workflow constraints and places AI's speed inside a development process humans can review.

| Strength | Meaning |
|---|---|
| Knowledge captured as assets | Intent, plans, verification results, and decision rationale remain in `mydocs/`, Issues, PRs, and commit logs, becoming input for the next task. |
| Early risk detection | Humans check direction at the task plan, implementation plan, and Stage report boundaries, reducing late discovery of wrong direction after a large implementation. |
| Automated role split | Humans decide direction, priority, quality, and architecture; AI handles repeated work such as exploration, implementation, verification, and documentation. |
| Lightweight context | `1 Issue = 1 Task = 1 Branch = 1 Session` keeps sessions small while repository documents retain memory. |
| Prompt guide alignment | Clear goals, sufficient context, output formats, verification criteria, and stop conditions are fixed by repository structure and templates. |

Hyper-Waterfall is a methodology harness that turns AI coding into a traceable and approvable development process by binding it to Issue, branch, plan, Stage report, final report, and PR.

Instead of letting AI edit files immediately, it documents the task purpose, scope, and verification criteria first. Approval gates stand before source edits, stage transitions, final reports, and PR creation.

As a result, every task is documented, and decisions plus verification results remain in the repository. Even when chat context disappears, task intent and progress can be traced again, and another AI session or worker can resume from the same context.

## Quick Start

Send this one line to your AI coding tool.

```text
Apply the Hyper-Waterfall methodology from https://github.com/postmelee/hyper-waterfall to this repository.
```

The AI starts from [`docs/agent-entrypoint.en.md`](docs/agent-entrypoint.en.md) and follows the adoption procedure. It must ask for approval before changing source files.

| What the AI reports first | Content |
|---|---|
| Adoption mode | Whether this is a new adoption or an update to an existing Hyper-Waterfall installation. |
| Change candidates | Which files it would create or modify, and whether placeholder substitution is needed. |
| Approval request | The scope the task requester must approve before actual file changes. |

### Language support

The default locale is `en`. Supported locale packs are `en`, `ko`, and `zh-CN`; missing locale sources are reported before fallback candidates are used. To apply Hyper-Waterfall in a specific language, include the locale in the prompt or run the CLI dry-run first.

| Language | AI prompt | CLI dry-run |
|---|---|---|
| English | `Apply the Hyper-Waterfall methodology from https://github.com/postmelee/hyper-waterfall to this repository. Use locale en.` | `npx hyper-waterfall@0.3.0 init --repo . --locale en --dry-run` |
| Korean | `https://github.com/postmelee/hyper-waterfall 의 하이퍼-워터폴 방법론을 이 저장소에 적용해줘. locale은 ko로 사용해줘.` | `npx hyper-waterfall@0.3.0 init --repo . --locale ko --dry-run` |
| Simplified Chinese | `将 https://github.com/postmelee/hyper-waterfall 的 Hyper-Waterfall 方法论应用到这个仓库。使用 zh-CN locale。` | `npx hyper-waterfall@0.3.0 init --repo . --locale zh-CN --dry-run` |

The CLI command prints a lifecycle judgment only. Actual file changes still move through the approval workflow.

After adoption, the AI proceeds according to the Hyper-Waterfall process. New users can simply ask the AI in natural language, such as `"Implement this."`

> Hyper-Waterfall lets anyone apply the method to a GitHub repository and makes multiple AI coding agents, including Codex and Claude Code, work under the same discipline.

## Learn More About Hyper-Waterfall

[When to Use](#when-to-use) ·
[Compared with Conventional AI Coding](#compared-with-conventional-ai-coding) ·
[What Changes Immediately](#what-changes-immediately) ·
[Strengths of Hyper-Waterfall](#strengths-of-hyper-waterfall) ·
[Workflow After Adoption](#workflow-after-adoption) ·
[Target Repository Structure After Adoption](#target-repository-structure-after-adoption)

## When to Use

Hyper-Waterfall focuses on keeping human control and traceability when AI is changing code quickly.

| Good Fit | Poor Fit |
|---|---|
| You let an AI coding tool modify real source code, but want humans to approve scope and quality standards. | A one- or two-line change where plan and report overhead is larger than the change itself. |
| Work must continue across multiple days, sessions, or agents. | Disposable prototypes where immediate experimentation matters more than traceability. |
| PR reviewers need to see what changed, why it changed, and how it was verified. | Repositories that do not use GitHub Issue, branch, and PR workflows. |
| You want to split large work by Issue, branch, and Stage so wrong direction is caught early. | Work where humans intend to accept AI output without review. |
| New contributors or new AI sessions need to restart from repository documents alone. | Personal experiments where handoff or resumability does not matter. |

> It is best suited for work where AI performs real source edits while humans must keep control over direction and quality. It can be too heavy when immediate experimentation matters more than traceability.

## Compared with Conventional AI Coding

The core is not giving decision ownership to AI. It is putting AI's execution speed inside human approval, review, and documentation discipline. Humans decide direction and quality, while AI performs analysis, implementation, verification, and documentation quickly.

> The difference is not whether you use AI, but which boundaries AI works inside. Conventional AI coding depends on the conversation flow; Hyper-Waterfall fixes task units, approval points, and artifact formats inside the repository.

| Conventional AI Coding | After Applying Hyper-Waterfall |
|---|---|
| You say "build this" and AI edits files immediately. | Issue and task plan first define purpose, scope, and verification criteria. |
| Scope keeps shifting during conversation. | The implementation plan splits work into Stages and execution stays inside the approved scope. |
| It is hard to trace later which files AI changed and why. | Stage reports and commits record the reason, artifact, and verification result for each change. |
| Context gets blurry as chat grows. | Work memory is externalized into `mydocs/`, Issues, PRs, and commit logs. |
| Wrong direction is discovered only after a large implementation. | The task requester approves or redirects at the task plan, implementation plan, and Stage boundaries. |
| PR reviewers need to search through chat logs again. | The PR and reports show what changed, why it changed, and how it was verified. |

The human task requester keeps full ownership of direction, quality, and architecture decisions, while AI performs implementation at a speed and scale humans cannot reach alone.

> [!IMPORTANT]
> **Key difference: humans never stop thinking.**

## What Changes Immediately

1. **AI does not modify code arbitrarily.**
   Source changes pass through a plan and approval gate first, so the task requester keeps control over direction.

2. **Humans do not lose control.**
   Approval gates stand before source edits, stage transitions, final reports, and PR creation. AI executes, but humans own direction and quality decisions.

3. **You no longer need to search chat history for "where did we stop?"**
   Issue, today's todo, task plan, Stage reports, final report, and PR automatically form the task timeline.

4. **Work memory remains even when chat disappears.**
   Intent, decisions, and verification results remain in `mydocs/`, Issues, PRs, and commit logs. New sessions, new agents, and new contributors can restart from the same context.

5. **Task-level work keeps context small and clear.**
   The recommended operation is `1 Issue = 1 Task = 1 Branch = 1 Session`. When a task ends, the session closes; the next issue starts in a clean new session.

6. **You can run multiple AI sessions in parallel.**
   Independent Issues can run in separate `local/task{N}` branches or separate worktrees. Context and change scope do not mix.

7. **PR review becomes easier.**
   The PR explains what changed, why it changed, which Stages were completed, and which verification ran. Reviewers read repository artifacts, not chat logs.

8. **You reduce late discovery of wrong direction after a large implementation.**
   Task plans, implementation plans, and Stage completion reports become quality gates reviewed by humans.

9. **You keep the speed of vibe coding while recovering engineering discipline.**
   You can build quickly while still explaining what was built, tracing where it went wrong, and handing it off at any point.

10. **AI coding becomes a traceable development process instead of a "vibe."**
    Every task connects through Issue, branch, document, commit, and PR so it can be reviewed and handed off later.

## Strengths of Hyper-Waterfall

AI has two structural weaknesses.

- It loses context when sessions grow long or tools change.
- It can keep executing confidently even when the direction is wrong.

This repository turns those weaknesses into work constraints and creates immediately visible benefits along four axes.

### 1. Every Task Becomes Documentation, and Documentation Becomes the Next Prompt — Knowledge Captured as Assets

- Task intent, plans, stage-by-stage verification results, and decision rationale all accumulate as markdown files inside `mydocs/`. They are not just records; they are **input for the next task**. When a model starts a new task, it reads past plans, reports, and decision records from the same repository and builds on them.
- When continuing work, you can restore context from repository artifacts instead of relying on chat history. A new contributor or new AI session can start from the same baseline.

> This has the same structure as connecting an Obsidian vault to an LLM and using a personal knowledge store as context. The difference is the nature of the vault. Obsidian stores general knowledge and ideas; `mydocs/` is a **vault specialized for work history**, accumulating intent, plans, verification, artifacts, and troubleshooting by task. The process enforces it, so it stays complete and consistent.

### 2. Direction Errors Are Caught at Gates Before Large Failures — Risk

- Work follows `Issue -> branch -> task plan -> implementation plan -> Stage implementation, verification, and report -> final report -> Open PR`, and each gate requires task requester approval.
- Instead of discovering "the direction was wrong" after a large implementation, it is caught early at the **task plan, implementation plan, and each Stage boundary, so sunk cost stays low.**
- If Stage verification fails, recovery happens inside that Stage. If scope changes, the plan is updated and re-approved.

### 3. Not "Ask AI Nicely," but "Make It Structurally Likely That AI Works Well" — Automated Role Split

- The task requester keeps responsibility for **direction, priority, architecture, and quality decisions**, while AI handles high-repetition work such as exploration, drafting, implementation, tests, reports, and PR body drafting. Every stage transition requires explicit approval from the task requester.
- This repository **automates that split operationally**. Task management rules are separated into SKILLs so AI naturally follows what to do at each step, what artifacts to leave, and when to stop and hand control back to the human.
- The work document formats naturally satisfy the core of official OpenAI and Anthropic prompting guides. Users do not need to study prompt engineering separately; AI works inside consistent central templates, clear context, staged thinking, and fixed output formats.

### 4. Open and Close Sessions by Task — Lightweight Context

- Hyper-Waterfall does not keep accumulating every work context in one AI session. The recommended operation is **`1 Issue = 1 Task = 1 Branch = 1 Session`**. One session owns one Issue, and when that task ends, the session ends too.
- Each session reads only the current Issue, task plan, implementation plan, Stage reports, and related code. Old conversations and decisions from other tasks do not pollute current judgment, so **context stays small and clear.**
- When a task ends, the result remains in `mydocs/`, Issues, PRs, and commit logs instead of chat. The next task can start from a new session and still rebuild the same context from repository documents.
- Independent Issues can run in parallel across multiple AI sessions using separate `local/task{N}` branches or separate worktrees. Tasks that touch the same file or architecture decision should be ordered first.

> AI sessions do not necessarily get smarter as they get longer. They often get blurrier. Hyper-Waterfall keeps sessions short and leaves memory in the repository.

### 5. Result

These four parts are not separate features; they form one work loop. Work becomes documentation, wrong direction is filtered at gates, human and AI roles are split, and sessions stay small by task.

As a result, AI coding becomes a traceable, reviewable, and resumable development process inside the repository instead of a long chat.

> [!NOTE]
> This structure aligns with the official OpenAI and Anthropic prompting guides: clear instructions, sufficient context, output format constraints, verification criteria, long-term work memory, and agentic workflow control. See [Prompt Guide Alignment](#prompt-guide-alignment) for the detailed mapping.

## Workflow After Adoption

Hyper-Waterfall works in **task** units.

### Task Procedure

Every task follows this procedure **strictly**.

```text
1. Confirm or register a GitHub Issue
2. Record today's todo (mydocs/orders/)
3. Create task branch (local/task{number})
4. Write task plan -> [task requester approval]
5. Write implementation plan -> [task requester approval]
6. Implement by Stage
7. Write Stage completion report -> [task requester approval]
8. Repeat next Stage
9. Write final result report -> [task requester approval]
10. Update today's todo status
```

> Each `[approval]` point is a quality gate. Direction errors that code review alone cannot catch are caught during document review.

Detailed procedure follows the [task workflow manual](templates/locales/en/mydocs/manual/task_workflow_guide.md). Branch and PR publication flow is described in the [Git workflow manual](templates/locales/en/mydocs/manual/git_workflow_guide.md).

### Core SKILL Details

| SKILL | When to Use | Main Artifacts |
|---|---|---|
| `task-register` | When a new task needs a GitHub Issue first | A GitHub Issue following the `task.yml` Issue Form structure, milestone and label candidates, and selection rationale |
| `task-start` | When starting work on an approved issue | `local/task{N}` branch, today's todo row, task plan based on `task_plan.md` |
| `task-stage-report` | After one Stage is implemented and before moving to the next Stage | Stage report based on `stage_report.md`, Stage bundle commit, Stage verification result |
| `task-final-report` | After all Stages are complete and just before publishing the PR | Final report based on `final_report.md`, today's todo completion update, Open PR |
| `pr-merge-cleanup` | Immediately after a PR is actually merged | Issue close, `publish/task{N}` remote deletion, local branch/worktree cleanup |
| `external-pr-review` | When reviewing an external contributor PR | `mydocs/pr/` review documents based on `external_pr_*` templates, verification result, recommendation (merge/request changes/close) |
| `todo` | When creating or updating the today's todo board | `mydocs/orders/yyyymmdd.md` table update based on `orders.md` |

When each SKILL should be displayed to the user follows the [SKILL call display guide](templates/locales/en/mydocs/manual/task_workflow_guide.md). PR body structure and verification follow the [internal task PR guide](templates/locales/en/mydocs/manual/internal_pr_guide.md), and PR creation commands plus document link formats follow the [PR command and link guide](templates/locales/en/mydocs/manual/pr_command_guide.md).

Document structure and manual-document neutrality are checked in the [document structure manual](templates/locales/en/mydocs/manual/document_structure_guide.md), not through a separate SKILL.

### Task Cycle

If an Issue already exists, skip `task-register` and go directly to `task-start` to write the task plan. For example, when the task requester says `"work on issue #17"`, AI checks milestone and issue body for #17, then creates `local/task17`, today's todo, and the task plan. Only when no Issue exists does `task-register` check duplicate Issues, milestone, and labels, ask for approval before creation, then create the GitHub Issue.

Every stage transition requires explicit approval from the task requester.

```text
0. Task registration -> `task-register`
   └─ AI: check duplicate issues, milestone, and label candidates
   └─ task requester: approve Issue creation
   └─ AI: create GitHub Issue and request approval to enter `task-start`

1. Task plan -> `task-start`
   └─ task requester: specify an existing Issue such as "work on issue #N", or approve starting from the newly created Issue
   └─ AI: write plan (minimum 3 stages, maximum 6 stages)
   └─ task requester: review -> approve or request edits

2. Stage implementation -> `task-stage-report` (repeat for each Stage)
   └─ AI: write code + run tests
   └─ AI: write Stage completion report
   └─ task requester: verify -> approve or give feedback

3. Feedback application -> (manual)
   └─ task requester: write feedback document (mydocs/feedback/), then AI applies it. If scope changes, update the plan and receive re-approval
   └─ AI: apply feedback and revise

4. Final report + Open PR -> `task-final-report`
   └─ AI: write final result report and create an Open PR with structured verification evidence
   └─ task requester: verify -> approve or give feedback

5. PR review + merge + cleanup -> `pr-merge-cleanup`
   └─ task requester: review PR -> approve or give feedback
   └─ AI: after review and merge, close Issue and clean branches/today's todo
```

`todo` is called whenever the today's todo board is updated in the above flow. `external-pr-review` is a separate flow for reviewing external contributor PRs.

### Document Structure

Documents used or produced by tasks:

```text
mydocs/
├── _templates/                         <- output formats by artifact type
├── orders/yyyymmdd.md                  <- today's todo (task list + status)
├── plans/task_{milestone}_{N}.md       <- task plan
├── plans/task_{milestone}_{N}_impl.md  <- implementation plan
├── working/task_{milestone}_{N}_stage{S}.md
│                                        <- Stage completion report
├── report/task_{milestone}_{N}_report.md
│                                        <- final result report
├── feedback/                           <- feedback and review notes
├── tech/                               <- technical research and pre-official drafts
├── manual/                             <- operating manuals and repeated work standards
├── troubleshootings/                   <- troubleshooting
└── pr/                                 <- external PR review records
```

Folder roles, document filename rules, and artifact output formats are defined in the [document structure manual](templates/locales/en/mydocs/manual/document_structure_guide.md). Each folder's detailed writing rules are checked from that folder's `README.md`.

| Area | Policy |
|---|---|
| `mydocs/` | Stores work memory, operating manuals, and research evidence. It is not the official product documentation root of the target project. |
| Official product docs | Hyper-Waterfall does not fix the official documentation root name. A target project may choose `docs/`, `specs/`, `site/`, `website/`, `adr/`, GitHub Wiki, or another path. Tasks that create, move, or edit product/user/contributor/API/architecture/roadmap docs must first get approval in the task plan's document location decision, including target audience, officialization level, selected path, alternative path, and reason. |
| `manual/` | Contains recurring operating standards and procedures. Records for a specific Issue, PR, release verification, or incident are separated into the corresponding artifact document. Details follow the [manual document neutrality policy](templates/locales/en/mydocs/manual/document_structure_guide.md). |
| `tech/` | Contains technical research, alternative comparisons, design rationale, and drafts that are not yet official. To promote them into official contract docs for users or external integrators, open a separate task, choose the official docs root, and receive approval. |
| `_templates/` | The source of truth for output formats, not an actual task artifact folder. Each Skill reads the corresponding template in `mydocs/_templates/` first and uses the minimal section summary inside the Skill only as fallback when the template cannot be read. |
| GitHub Issue and Pull Request | GitHub platform artifacts. Issue bodies follow `.github/ISSUE_TEMPLATE/task.yml`, PR bodies follow `.github/pull_request_template.md`, and repository-resident work documents follow `mydocs/_templates/`. Details follow the [GitHub platform template policy](templates/locales/en/mydocs/manual/document_structure_guide.md). |

## Target Repository Structure After Adoption

After `templates/` is copied and placeholders are replaced, the target repository looks like this.

```text
your-repo/
├── AGENTS.md                       single source of truth for operating rules
├── CLAUDE.md                       for Claude Code (references AGENTS.md)
├── .hyper-waterfall/
│   └── version.json                 records the applied Hyper-Waterfall version and locale
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── task.yml
│   └── pull_request_template.md
├── .agents/
│   └── skills -> ../mydocs/skills  Codex recognition path (symlink)
├── .claude/
│   └── skills -> ../mydocs/skills  Claude Code recognition path (symlink)
└── mydocs/
    ├── _templates/         output format templates by artifact type
    ├── manual/             operating manuals (document structure, task workflow, Git, PR, lifecycle, release/update, conflict rules)
    ├── skills/             SKILL source of truth (shared by Codex/Claude Code)
    ├── orders/             today's todo (yyyymmdd.md)
    ├── plans/              task and implementation plans
    │   └── archives/
    ├── working/            Stage completion reports
    ├── report/             final result reports
    ├── feedback/           feedback and review notes
    ├── tech/               technical research and pre-official drafts
    ├── troubleshootings/   troubleshooting
    └── pr/                 external PR review records
        └── archives/
```

| Area | What It Provides |
|---|---|
| `AGENTS.md`, `CLAUDE.md` | Loads common operating rules into AI coding agents. `AGENTS.md` is the source of truth, and `CLAUDE.md` delegates to it. |
| `.hyper-waterfall/version.json` | Records the applied framework version and selected locale, then supports update judgment. |
| `.github/` | Fixes the GitHub Issue Form and Pull Request body structure. |
| `.agents/skills`, `.claude/skills` | Lets Codex and Claude Code read the same SKILL text through symlinks. |
| `mydocs/_templates/` | Fixes output formats for plans, reports, feedback, technical research, troubleshooting, and external PR reviews. |
| `mydocs/manual/` | Contains repeated operating policies and procedures. |
| `mydocs/orders/`, `plans/`, `working/`, `report/` | Stores daily task state, plans, Stage reports, and final reports. |
| `mydocs/feedback/`, `tech/`, `troubleshootings/`, `pr/` | Stores feedback, research, troubleshooting, and external PR review records. |

The symlink structure for `.agents/skills` and `.claude/skills` in the adopted repository follows the [Agent Skills location policy](templates/locales/en/mydocs/manual/document_structure_guide.md). `.hyper-waterfall/version.json` and manifest-based update flow are documented in the [distribution manifest and version record policy](templates/locales/en/mydocs/manual/document_structure_guide.md), [`docs/lifecycle/update.en.md`](docs/lifecycle/update.en.md), and [`docs/lifecycle/update_pr.en.md`](docs/lifecycle/update_pr.en.md).

The framework's document templates, GitHub Issue Form, and SKILL source of truth are `templates/mydocs/_templates/`, `templates/.github/ISSUE_TEMPLATE/task.yml`, and `templates/mydocs/skills/`. In an adopted repository, `.agents/skills` and `.claude/skills` symlinks point to the same `mydocs/skills` text.

## Maintainer Details

<details>
<summary><strong>Updating Existing Adopted Repositories</strong></summary>

Existing adopted repositories are updated based on GitHub Releases/tags and the manifest. AI uses [`docs/agent-entrypoint.en.md`](docs/agent-entrypoint.en.md) as the entry point and follows the existing-update judgment format in [`docs/lifecycle/update.en.md`](docs/lifecycle/update.en.md), first reporting current version, current locale, requested locale or switch request, target release/tag, target release locale support, migration guide, manifest diff, locale manifest diff, and Hyper-Waterfall version update PR candidates.

When converting approved update candidates into a PR, follow [`docs/lifecycle/update_pr.en.md`](docs/lifecycle/update_pr.en.md). The npm CLI is a convenience execution channel for the same judgment and does not replace the canonical basis: GitHub Release/tag, `templates/manifest.json`, and migration guide. CLI output alone does not automatically apply files; only approved scope is converted into the normal task flow.

</details>

<details>
<summary><strong>CLI and Distribution Channels</strong></summary>

The `hyper-waterfall` CLI is published to the npm registry and can run lifecycle judgment through the following `npx` commands. Publish and post-publish verification results are tracked in [`docs/releases/v0.2.0-npm-publish.md`](docs/releases/v0.2.0-npm-publish.md).

```bash
npx hyper-waterfall init --repo . --dry-run
npx hyper-waterfall update --repo . --from v0.1.0 --to v0.2.0 --dry-run
npx hyper-waterfall doctor --repo .
```

On macOS, you can install the CLI through the public Homebrew tap.

```bash
brew install postmelee/tap/hyper-waterfall
hyper-waterfall --version
hyper-waterfall doctor --repo .
```

Additional distribution channels such as Homebrew, Docker, Codex plugin, and Claude plugin are treated only as protocol execution channels that do not replace the canonical basis. Channel purpose, non-goals, operating cost, and priority are summarized in [`docs/distribution-channels.md`](docs/distribution-channels.md).

This Homebrew formula is a wrapper that installs the npm CLI and does not replace the canonical basis: GitHub Release/tag, `templates/manifest.json`, and migration guide. Homebrew may install the Node runtime as a dependency. The path `brew install hyper-waterfall` without specifying a tap requires inclusion in Homebrew core, but as of the review criteria in [#46](https://github.com/postmelee/hyper-waterfall/issues/46), this repository keeps the public tap path and does not submit to core.

</details>

---

## Appendix

**Part 1. The Original Hyper-Waterfall** ([rhwp](https://github.com/edwardkim/rhwp))

1. [What Is Hyper-Waterfall?](#what-is-hyper-waterfall)
2. [Core Structure](#core-structure)
3. [Core Principles](#core-principles)
4. [Role Split](#role-split)
5. [Vibe Coding vs Hyper-Waterfall](#vibe-coding-vs-hyper-waterfall)
6. [Why It Is Powerful — The Point AI Makes Reachable](#why-it-is-powerful--the-point-ai-makes-reachable)

**Part 2. postmelee/hyper-waterfall**

1. [postmelee/hyper-waterfall: Turning the Methodology into a Harness](#postmeleehyper-waterfall-turning-the-methodology-into-a-harness)
2. [Live Example — Follow It Yourself](#live-example--follow-it-yourself)
3. [Design Principles](#design-principles)
4. [Prompt Guide Alignment](#prompt-guide-alignment)
5. [License](#license)

---

## What Is Hyper-Waterfall?

### Macro Waterfall + Micro Agile: AI Makes Both Possible at the Same Time

A methodology that was impossible before AI: waterfall's discipline and agile's speed at once.

> This methodology was refined from real project experience such as [`edwardkim/rhwp`](https://github.com/edwardkim/rhwp) and [`postmelee/alhangeul-macos`](https://github.com/postmelee/alhangeul-macos).
> Its core philosophy is captured most completely in [edwardkim/rhwp · hyper_waterfall.md](https://github.com/edwardkim/rhwp/blob/main/mydocs/manual/hyper_waterfall.md). This repository modularizes that methodology so it can be applied easily to other repositories.

To understand the methodology first, start with [Core Structure](#core-structure). To see what this repository adds, jump to [postmelee/hyper-waterfall: Turning the Methodology into a Harness](#postmeleehyper-waterfall-turning-the-methodology-into-a-harness).

## Core Structure

### Macro Waterfall + Micro Agile

```text
Macro (project level) — waterfall discipline:
  Plan ──→ Design ──→ Implement ──→ Verify ──→ Release
   │        │          │             │          │
   ▼        ▼          ▼             ▼          ▼
  Docs     Docs       Docs          Docs       Docs

Micro (task level, hours) — agile speed:
  Implement ──→ Test ──→ Feedback ──→ Revise ──→ Test → ... (fast iteration)
      │          │          │           │          │
      AI      automation  human judgment AI      automation
```

- Macro direction is controlled by **waterfall discipline**: plans, approvals, staged reporting, and final verification.
- Micro execution uses **agile fast iteration**: AI and immediate feedback loops, with the full cycle completing within **hours**.

Every task is documented, and every decision is recorded. This is what makes Hyper-Waterfall possible.

## Core Principles

> **Humans never stop thinking.**

No matter how capable AI becomes, humans decide the direction and judge quality. The moment you accept AI output without reading it, Hyper-Waterfall collapses into vibe coding. Operationally, this principle becomes three rules.

### 1. Humans Keep Direction Until the End

Stage transitions, plan changes, and source edits require explicit approval from the task requester. AI is a tool for decisions, not the decision maker. Once gates are skipped even once, the methodology breaks down quickly.

### 2. Always Give AI Enough Context

Intent and plans are embedded in `mydocs/` so the task's intent, scope, and approval criteria do not need to be explained from scratch in every prompt. Models read the same repository and work on the same context. If work starts with scattered context, AI fills the gaps by guessing.

### 3. Periodically Externalize AI Work Memory

Stage reports, final reports, and PR bodies distill and record intent, decisions, and verification evidence. Chat context disappears, but repository markdown remains. New sessions and new contributors can start from the same baseline.

## Role Split

### Task Requester (Human)

The human focuses on **thinking**:

- Direction: "What should we do next?"
- Priority: "What matters more?"
- Quality judgment: "Is this good enough?"
- Architecture decision: "Is this structure correct?"
- Domain knowledge: "How should this behave in this domain?"
- Feedback: "This part is wrong, because..."

### AI Pair Programmer

AI focuses on **execution**:

- Analysis: codebase exploration, root-cause tracing
- Planning: implementation plan drafting
- Implementation: code writing, test generation
- Documentation: reports, technical docs, commit messages
- Debugging: log analysis, fix proposals
- Iteration: applying feedback and retrying

## Vibe Coding vs Hyper-Waterfall

> Vibe coding — `accepting AI output without reading it, letting AI make architecture decisions, and shipping code you do not understand` — is a trap. It may appear to work, but because you do not understand the result, you cannot diagnose problems when they happen.
>
> This project takes the opposite approach. The human task requester keeps complete ownership of direction, quality, and architecture decisions, while AI performs implementation at a speed and scale humans cannot reach alone. Key difference: **humans never stop thinking.**
>
> — [edwardkim/rhwp · Vibe Coding vs AI-Driven Development](https://github.com/edwardkim/rhwp#%EB%B0%94%EC%9D%B4%EB%B8%8C-%EC%BD%94%EB%94%A9-vs-ai-%EC%A3%BC%EB%8F%84-%EA%B0%9C%EB%B0%9C)

| | Vibe Coding | Hyper-Waterfall |
|---|---|---|
| **Human role** | Accept AI output | Direct, review, decide |
| **Plan** | None — "just build it" | Task plan -> approval -> implementation plan -> Stage execution |
| **Quality gates** | Hope it works | Verification at every Stage + approval gates + Open PR review |
| **Debugging** | Ask AI to fix AI's bug | Human diagnoses, AI implements |
| **Architecture** | Accidentally formed | Intentionally designed by the task requester |
| **Docs** | None | `mydocs/` (plans, Stage reports, final report) + Issue/PR body |
| Reproducibility | Impossible | Full process timeline is traceable |
| **Result** | Fragile and hard to maintain | Traceable, handoff-ready, resumable anywhere |

## Why It Is Powerful — The Point AI Makes Reachable

Macro waterfall and micro agile were long treated as a trade-off. Discipline made things slow; speed removed discipline. AI pair programmers break this trade-off for the first time.

### 1. Recover Discipline Without Losing Speed

One major reason waterfall became heavy was that **humans had to carry all documents, plans, and verification themselves**. AI can draft these quickly, letting us recover the speed waterfall lost and the discipline agile lost. **The same discipline, 100x faster** — this is the point that was unreachable without AI.

### 2. Knowledge Is Externalized into the Repository, Not Kept in Heads

Decisions, rationale, and verification results remain in `mydocs/`, PRs, and Issues. Even if context concentrated in one person disappears, the next person or next AI session starts from **the same baseline**. Agile's bus-factor problem is structurally reduced.

### 3. Humans Focus on Decisions, AI on Execution

Humans remain responsible for direction, priority, architecture, and quality, while AI handles exploration, implementation, tests, documents, and repetition. A workload that one person's attention could not reach fits into one cycle. **AI is a multiplier**. Put it on top of a good process, and it produces exceptional results.

### 4. Work Can Move Across Places

The maintainer of [rhwp](https://github.com/edwardkim/rhwp) works from the office, home, and while moving, using different Claude sessions in each place. Each new session has no memory of the previous one.

But documents answer the context questions:

| Question | Answer |
|---|---|
| "What should I do now?" | `orders/20260409.md` |
| "Where did we stop?" | `working/task_m100_86_stage1.md` |
| "What did we decide to do?" | `plans/task_m100_86_impl.md` |
| "Why this approach?" | `feedback/` + `tech/` |
| "What is the trap here?" | `troubleshootings/` |

**The task requester spends almost zero time transferring context.** This is why continuous work is possible across three places, and why the same structure works when contributors join.

---

## postmelee/hyper-waterfall: Turning the Methodology into a Harness

> This repository references the Hyper-Waterfall methodology first introduced in [rhwp](https://github.com/edwardkim/rhwp) and extends it as follows.

### 1. Apply It to Any Repository with One Prompt — Modularization + Placeholder Substitution

The original methodology in rhwp is tightly coupled to that repository's documents and conventions, so it is hard to copy directly into other projects. This repository separates operating rules, manuals, and SKILLs into `templates/` and formalizes the entry procedure in [`docs/agent-entrypoint.en.md`](docs/agent-entrypoint.en.md). As a result, **one prompt to an AI coding tool** can apply it to any repository. The AI follows the entry procedure and automatically substitutes placeholders such as `REPO_SLUG` and `BASE_BRANCH`.

Lifecycle criteria for updating existing adopted repositories are also documented separately. GitHub Release/tag, manifest, migration guide, and `.hyper-waterfall/version.json` are used to determine the current version, current locale, requested locale or switch request, target release/tag, target release locale support, manifest diff, locale manifest diff, and Hyper-Waterfall version update PR candidates first. Detailed criteria live in [`docs/lifecycle/update.en.md`](docs/lifecycle/update.en.md) and [`docs/lifecycle/update_pr.en.md`](docs/lifecycle/update_pr.en.md). This repository itself is the first dogfooding case applying Hyper-Waterfall to itself (Issue #1, PR #2).

### 2. Alignment with Official Prompting Guides

The work document formats are designed to naturally satisfy the core of the official prompting guides from [OpenAI](https://developers.openai.com/api/docs/guides/prompt-guidance) and [Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices). In particular, GitHub Issue/PR templates structure GitHub platform artifacts, while `templates/mydocs/_templates/` specifies output formats for plans, reports, feedback, and external PR review documents.

> This minimizes response quality degradation in the recursive process where AI writes documents, then reads and uses them again as references.

- Clarity: task goals are clearly defined.
- Consistency: all work documents share the same structure.
- Step-by-step thinking: work is split into smaller stages.
- Context: all information needed for work is included in documents.
- Output format: task results are emitted in specific central template formats.

See the detailed mapping in [Prompt Guide Alignment](#prompt-guide-alignment).

### 3. Multi-Agent Compatibility + Token and Context Efficiency Through Separated Rules, SKILLs, and Manuals

rhwp inlined operating rules, document structure, folder policy, naming rules, and PR handling into a single `CLAUDE.md` file, and did not include `AGENTS.md`, so it operated as Claude Code-specific. This repository separates and expands it along two axes.

**(1) Multi-agent compatibility**: `AGENTS.md` is the single source of truth, while `CLAUDE.md` references it with one `@AGENTS.md` line. SKILLs are recognized by both tools through `.agents/skills` (Codex) and `.claude/skills` (Claude Code) symlinks pointing to the same text. New tools that recognize SKILLs can extend the same pattern.

**(2) Separation of operating rules, SKILLs, manuals, and templates**: `AGENTS.md` keeps only the policies, constraints, and index that must be loaded into every-turn system prompts. Procedural details are split into topic manuals under [`mydocs/manual/`](templates/locales/en/mydocs/manual/) (document structure, task workflow, Git, PR, lifecycle, release/update, conflict rules), each `mydocs/` folder's `README.md`, GitHub Issue/PR templates under [`.github/`](templates/locales/en/.github/), document output formats under [`mydocs/_templates/`](templates/locales/en/mydocs/_templates/), and 7 SKILLs under [`mydocs/skills/`](templates/locales/en/mydocs/skills/).

Effects:

- **Token efficiency**: reduces content loaded into every-turn system prompts. Manuals and SKILL text enter context only when called.
- **Context efficiency**: the model reads only the procedure needed at the current moment. Unrelated procedures do not pollute context.
- **Clearer intent transfer**: GitHub templates and central templates fix the structure of repeated artifacts, and staged SKILLs state when they are called, so AI does not infer or reinvent procedure and output formats.
- **Model portability**: SKILLs use a standard format and can be moved to other SKILL-aware tools.

## Live Example — Follow It Yourself

This repository is the first case of Hyper-Waterfall applying itself to itself. If you want to see actual operation before deciding whether to adopt it, review these artifacts in order.

1. **Issue** [`#1` Hyper-Waterfall self-adoption (dogfooding)](https://github.com/postmelee/hyper-waterfall/issues/1) — a clean structure with 3 labels, milestone M010, and automatically linked PR (no status-noise comments)
2. **Pull Request** [`#2`](https://github.com/postmelee/hyper-waterfall/pull/2) — Open PR body format: 4 summary bullets (target task/why/what/review points), Stage timeline with dual links (Stage report + commit URL), impact table, work documents, verification results and evidence
3. **Task plan** [`mydocs/plans/task_m010_1.md`](mydocs/plans/task_m010_1.md) — purpose, background, scope, design direction, expected changed files, tentative stages, verification plan, risks
4. **5-stage implementation plan** [`mydocs/plans/task_m010_1_impl.md`](mydocs/plans/task_m010_1_impl.md) — stage artifacts, verification commands, and commit messages fixed in advance
5. **5 Stage reports** [`mydocs/working/`](mydocs/working/) — artifacts, verification results, residual risks, and next-stage impact at each Stage boundary
6. **Final report** [`mydocs/report/task_m010_1_report.md`](mydocs/report/task_m010_1_report.md) — 5-stage synthesis, before/after quantitative comparison, acceptance criteria verification
7. **Today's todo** [`mydocs/orders/`](mydocs/orders/) — daily board format (milestone tables + completion time)
8. **Commit log** [`git log` (main)](https://github.com/postmelee/hyper-waterfall/commits/main) — 12 task commits preserved in chronological order from `Task #1: 수행 계획서 작성` through `pr-merge-cleanup`

This first task expanded scope twice and proceeded through 5 Stages. In other words, the README procedure is visible as live artifacts: approval gates, Stage reports, scope-change handling, PR body rewrite, and cleanup after merge.

## Design Principles

- Meaningful source changes require a human approval gate.
- Issue progress tracking is delegated to GitHub linked PR auto-cross-references plus labels and milestones; comments are reserved for discussion, blockers, and decision records.
- The latest state must be discoverable from Issue metadata, the current branch or PR, and `mydocs/`.
- This framework must work across many project types. Project-specific language, build, deployment, and product rules belong in the target repository's templates and settings, not in core.
- Be strict about process and flexible about tools.

> Hyper-Waterfall is not new magic. It is an operating method that restores waterfall discipline and agile speed at the same time on top of AI as a multiplier. On top of a good process, AI can produce exceptional results.

## Prompt Guide Alignment

Hyper-Waterfall implements the core of the official OpenAI and Anthropic prompting guides at the development-process level. It is not about "writing a good prompt"; it is about building a **repository structure where prompts are structurally likely to be good**.

### Alignment Summary

| Principle | How Hyper-Waterfall Implements It | Effect |
|---|---|---|
| Clear goal | GitHub Issue, task plan, implementation plan | AI understands scope and success criteria first. |
| Sufficient context | Plans, reports, feedback, and technical research in `mydocs/` | New sessions restore context from repository documents. |
| Output format constraints | `mydocs/_templates/`, Issue/PR templates | Plans, reports, and verification results keep the same structure every time. |
| Stepwise progress | Stage-level implementation, verification, and reporting | Complex work is split into reviewable units. |
| Verification criteria | Stage reports, final report, PR body | Results are judged by recorded criteria, not feeling. |
| Stop conditions | Approval gates | AI does not advance to the next step arbitrarily. |
| Long-term work memory | `mydocs/`, commit log, PR timeline | Work history remains even when chat disappears. |
| Lightweight context | `1 Issue = 1 Task = 1 Branch = 1 Session` | Sessions stay small and clear. |

<details>
<summary><strong>OpenAI prompt guidance mapping</strong> · source: <a href="https://developers.openai.com/api/docs/guides/prompt-guidance">OpenAI prompt guidance</a></summary>

1. **Define the output first.**
   Hyper-Waterfall defines artifacts from the start: Issue, task plan, implementation plan, Stage report, final report, and PR. Instead of asking AI to "do a good job," it first fixes what must be left behind.

2. **Describe what a good answer means.**
   Each Stage records not only implementation but also verification criteria and review points. AI output is judged against documented criteria, not intuition.

3. **Set short constraints.**
   Hyper-Waterfall makes boundaries explicit: "do not proceed to the next Stage without approval," "ask before source edits," and "track by Issue." This does not remove freedom; it lays rails that prevent runaway execution.

4. **State the level of evidence needed.**
   Implementation results are distilled into Stage reports, verification logs, and PR bodies. The repository keeps not only what changed, but why it changed and how it was checked.

5. **Specify the output format.**
   `mydocs/_templates/` fixes the expected output shape for task plans, implementation plans, Stage reports, final reports, feedback, technical research, troubleshooting, and external PR review documents. `.github/pull_request_template.md` structures PR bodies for the review screen. AI answers are shaped into artifacts the next worker can read again.

6. **Tell the model when to stop.**
   Hyper-Waterfall stops at every Stage boundary and waits for human approval. AI does not run to the end; it stops at lines where humans can confirm direction.

</details>

<details>
<summary><strong>Anthropic Claude prompting best practices mapping</strong> · source: <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices">Claude prompting best practices</a></summary>

1. **Clear and direct instructions.**
   Task intent is made explicit at every step through the Issue, task plan, and implementation plan. Instead of giving the model ambiguous intent, the method fixes what to build, why, and how far before the gate.

2. **Workflow and goal context.**
   Users do not need to include in every prompt how the work fits into the larger flow or artifact. That context is embedded in `mydocs/`, Issues, and PR bodies, so the model naturally reads the same context.

3. **Sequential steps.**
   Stage-based progress and approval gates directly implement the practice of splitting instructions into sequential steps.

4. **Output format control.**
   Task plans, Stage reports, final reports, feedback, technical research, and external PR review documents follow the desired output format in `mydocs/_templates/`, while PR bodies follow `.github/pull_request_template.md`. The model does not invent where to write what on each task.

5. **Long-running work and external memory.**
   `mydocs/` directly supports long-horizon agentic work and memory tasks. Even if chat context disappears, work memory is distilled into the filesystem.

6. **Literal instruction following and alignment.**
   More literal models tend to bind more tightly to explicit scope. Hyper-Waterfall documents boundaries such as "ask before source edits," "do not proceed to the next Stage without approval," and "track by Issue," so literal instruction following works in favor of the process.

> Hyper-Waterfall prioritizes human control and traceability over maximum autonomy. It does not operate at the same layer as guidance for one-turn interactive coding; it adds a higher-level task gate across the whole task. XML tag structuring is not adopted directly; `mydocs/` folder structure, filename rules, and central templates perform the same role.

> **One-line summary**: Hyper-Waterfall implements the core of Claude prompting best practices as a development-process harness, not as a single prompt sentence.

</details>

## License

MIT. See [LICENSE](LICENSE) for details.
