# AGENTS.md

Operational rules for every coding agent working in this repository, including Codex and Claude Code. This file is loaded into the system prompt on every turn, so keep only the policies, constraints, and indexes that must always be present. Put detailed procedures in manuals and SKILL files.

## Project Overview

{PROJECT_OVERVIEW}

## Core Hyper-Waterfall Rules

This project uses the **Hyper-Waterfall** methodology. Read these rules carefully because they can conflict with an agent's default behavior, especially fast execution and autonomous edits. Details: [`agent_code_hyperfall_rule_conflict.md`](mydocs/manual/agent_code_hyperfall_rule_conflict.md).

- Request task requester approval before modifying source files.
- Track work by GitHub Issue.
- Never skip the order for new features, bug fixes, or structural changes: `Issue -> branch -> daily task board -> plan -> implementation -> verification -> final report -> PR`.
- Do not move to the next stage without approval after completing the current stage.
- If the scope is unclear or could conflict with existing work, ask first.
- Do not revert changes made by the user or another worker.
- Close an Issue only after task requester approval or after confirming the PR was merged.
- Before editing documentation, read the existing content first, change only the necessary parts, and add content only when needed.
- When creating, moving, or editing product, user, contributor, external integration, API, architecture, or roadmap documentation, record a document location judgment in the task plan and get approval.
- `mydocs/manual` is not the target project's product documentation location. The target project must explicitly choose its official documentation root, such as `docs/`, `specs/`, `site/`, `website/`, or `adr/`, in a separate task.
- After work is complete, clean up local and remote artifacts that are not needed for the next task.
- After PR merge and Issue close, return to `{BASE_BRANCH}` and remove unneeded `local/task{number}` branches and temporary worktrees.

**Approval assumption rule**: Treat the stage as approved only when the task requester explicitly says to continue in the same thread, such as "continue" or "proceed to the next stage."

## Naming Rules

- Milestone: `M{version}` (for example, M100=v1.0.0, M05x=v0.5.x). Document filenames use lowercase `m{number}` (for example, `m100`).
- Branches: `local/task{issue_number}` for work, `publish/task{issue_number}` for PR publication to `{BASE_BRANCH}`.
- Commit messages:
  - Basic: `Task #{number}: summary`
  - Stage: `Task #{number} Stage {N}: summary`
  - Substage: `Task #{number} [Stage {N.M}]: summary`
  - Report bundle: `Task #{number} Stage {N} + final report: summary`
- Document filename: `task_{milestone}_{issue_number}{_impl|_stage{N}|_report}?.md`. New documents must include the milestone. Details: [`document_structure_guide.md`](mydocs/manual/document_structure_guide.md).
- Write all documents in the selected Hyper-Waterfall locale for this repository.

## Mandatory Rules Before Changes

{PROJECT_SPECIFIC_RULES}

## Required References

- [`README.md`](README.md) - project overview, setup, and build
- [`mydocs/manual/document_structure_guide.md`](mydocs/manual/document_structure_guide.md) - `mydocs/` folder roles, document filenames, external PR folder policy, Skills location policy
- [`mydocs/manual/task_workflow_guide.md`](mydocs/manual/task_workflow_guide.md) - 15 task workflow steps, commit message rules, work time rules
- [`mydocs/manual/git_workflow_guide.md`](mydocs/manual/git_workflow_guide.md) - branch policy, Git diagrams, maintainer/contributor workflow
- [`mydocs/manual/pr_process_guide.md`](mydocs/manual/pr_process_guide.md) - external contributor PR review
- [`mydocs/manual/agent_code_hyperfall_rule_conflict.md`](mydocs/manual/agent_code_hyperfall_rule_conflict.md) - conflicts between Hyper-Waterfall and default agent behavior
- {PROJECT_SPECIFIC_REQUIRED_DOCUMENTS}

## Agent Skills

Fixed Hyper-Waterfall procedure points are separated into SKILL files. The source of truth is `mydocs/skills/`. Codex (`.agents/skills`) and Claude Code (`.claude/skills`) read the same content through symbolic links. Details: the "Agent Skills location policy" section in [`document_structure_guide.md`](mydocs/manual/document_structure_guide.md).

## Work Rules

- The task requester decides when work starts and ends. Agents do not propose ending work or impose time limits on their own.
