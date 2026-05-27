# Task Workflow Manual

This manual defines the Hyper-Waterfall task procedure, task number and commit message naming rules, work time rules, and approval assumption criteria. Read it before starting work from a GitHub Issue, ending a Stage, writing a final report, publishing a PR, or cleaning up after merge. Document folder locations are covered in `document_structure_guide.md`, and branch operation is covered in `git_workflow_guide.md`.

## Core Terms

- **Task plan**: document used for the first approval request. It records work purpose, scope, tentative stages, and verification plan.
- **Implementation plan**: document that turns the approved task plan into concrete stages, artifacts, verification commands, and commit messages.
- **Stage report**: `_stage{N}.md` report left in `mydocs/working/` after a Stage ends.
- **Final report**: `_report.md` report left in `mydocs/report/` after all Stages end.
- **Approval assumption rule**: a stage is approved only when the task requester explicitly says to continue in the same thread.

## Document Output Format

Plans, stage reports, final reports, daily task boards, and external PR review documents use the central templates in `mydocs/_templates/`. Skills define procedures and verification; central templates define output format. If they diverge, update them together in the same PR.

GitHub Issues and Pull Requests are GitHub platform artifacts. New task Issues use `.github/ISSUE_TEMPLATE/task.yml` as the input prompt format, and PR bodies use `.github/pull_request_template.md` as the output format.

The PR body `Verification` section follows `.github/pull_request_template.md`: `Automated Verification`, `Manual/Scenario Verification`, `CI/Remote Verification`, and `Verification Limitations`. Do not merely list commands. Include results and evidence. Do not leave unperformed verification in tables; move it to `Verification Limitations` or `Remaining Risks`.

## Framework Lifecycle Work

When installing Hyper-Waterfall in a new repository or updating an already adopted repository to a new version, first run framework lifecycle judgment. Judgment criteria and transition rules are in [`framework_lifecycle_guide.md`](framework_lifecycle_guide.md).

- New adoption judgment: `docs/agent-entrypoint.md`, `docs/lifecycle/adoption.md`, `templates/manifest.json`
- Existing update judgment: `docs/agent-entrypoint.md`, `docs/lifecycle/update.md`, `.hyper-waterfall/version.json`, target GitHub Release/tag manifest, `docs/migrations/`
- Update PR transition: `docs/lifecycle/update_pr.md`
- Release/tag and update protocol: [`release_update_protocol.md`](release_update_protocol.md)

After lifecycle judgment is approved and actual file changes begin, apply this manual's normal task procedure. Do not apply files from the manifest diff to the target repository before approval.

## Task Number Management

- Use **GitHub Issues** as task numbers to prevent duplicate numbering.
- **Milestone notation**: `M{version}` (for example, M100=v1.0.0, M05x=v0.5.x)
- New task registration: if no Issue exists, use the [`task-register`](../skills/task-register/SKILL.md) Skill to check duplicate Issues, milestone, and labels, then create the GitHub Issue after approval.
- Task start: if an Issue already exists, use [`task-start`](../skills/task-start/SKILL.md) to create the branch, daily task board row, and task plan.
- Branch name: `local/task{issue_number}` (example: `local/task1`)
- Remote PR publication branch: `publish/task{issue_number}` (example: `publish/task1`)
- Commit message rules:
  - Basic: `Task #{issue_number}: summary`
  - Stage commit: `Task #{issue_number} Stage {N}: summary`
  - Substage allowed: `Task #{issue_number} [Stage {N.M}]: summary`
  - Stage report or final report bundled commit: `Task #{issue_number} Stage {N} + final report: summary`
- In `mydocs/orders/`, reference milestone and Issue as `M100 #1`.
- Task completion: `gh issue close {number}` or `closes #{number}` in a commit message.

## Task Procedure

1. If no Issue exists, register a GitHub Issue with `task-register`. If an Issue exists, use that number.
2. Start the assigned Issue with `task-start`, create `local/task{issue_number}`, and proceed.
3. Write the task plan before work, then request approval.
4. Write the implementation plan (minimum 3 Stages, maximum 6 Stages), then request approval.
5. Start Stage work.
6. After each Stage, write the stage report and request approval.
7. **Commit the stage report (`_stage{N}.md`) together with that Stage's source changes on the task branch.**
8. After approval, proceed to the next Stage.
9. After all Stages, write the final report and request approval.
10. **Commit the final report (`_report.md`) and daily task board (`orders/`) update on the task branch. Before creating the PR, confirm no uncommitted files remain with `git status`.**
11. Push to `publish/task{issue_number}` and create an Open PR to `{BASE_BRANCH}`.
12. When approval is requested, the task requester may register feedback in `mydocs/feedback/`.
13. If all tests pass and there is no feedback, continue.
14. After PR merge, close the Issue and finalize the daily task board state.
15. Clean up the merged `publish/task{issue_number}` remote branch and reproducible local byproducts.

## Work Rules

- The task requester decides when work starts and ends. Agents do not propose ending work or impose time limits on their own.

## Approval Assumption Rule

- Treat a stage as approved only when the task requester explicitly says to continue in the same thread, such as "continue" or "proceed to the next stage."

## FAQ / Common Mistakes

### When Stage verification fails

Do not write or commit a stage report while verification is failing. First identify the failed command, summarize the error, and recover inside the same Stage. If the Stage scope grew beyond the plan, ask the task requester whether to split the Stage or update the implementation plan.

### When Stage size is unclear

Use 3-6 Stages by default. Each Stage should be small enough to implement, verify, and report in one cycle. Separate risky shared-rule changes, code changes, and documentation/verification cleanup into different Stages. Low-risk documentation work can be split by document group.

### When work started on the next Stage without approval

Stop immediately and inspect the current change scope. If changes are uncommitted, keep only the part belonging to the approved Stage. If already committed, report the situation to the task requester and confirm whether to add a corrective commit or update the plan.

## SKILL Call Display Guidance

When applying a Hyper-Waterfall SKILL procedure, tell the user in one line before running the actual procedure. This does not allow implicit calls; it only makes transparent that the procedure is being applied based on explicit instruction or stage approval.

Recommended format:

- `Calling the task-register skill.`
- `Calling the task-start skill.`
- `Calling the task-stage-report skill.`
- `Proceeding with the task-final-report skill.`
- `Calling the pr-merge-cleanup skill.`
- `Calling the external-pr-review skill.`
- `Calling the todo skill.`

Use this display for the corresponding Hyper-Waterfall procedure.

The README "Core SKILL Details" table is the user-facing summary of each Skill, while this section defines actual call display principles. If a Skill is added, removed, renamed, or its call timing changes, review the README table and this section in the same PR.

Document structure policy review or manual neutrality judgment is not itself a separate Skill call display target. Display the core Skill only when that judgment leads to Issue registration, task start, stage completion, or another core Skill procedure.

`task-final-report` is the procedure that writes the final report and publishes an Open PR with the PR body verification structure aligned to the template.

Installation/update lifecycle judgment itself is not a Hyper-Waterfall procedure call display target. However, if it results in GitHub Issue registration or task start, follow the display rule for `task-register`, `task-start`, or the actual core Skill used.

## Related Manuals

- [`document_structure_guide.md`](document_structure_guide.md): locations and filenames for task plans, stage reports, and final reports.
- [`git_workflow_guide.md`](git_workflow_guide.md): `local/taskN`, `publish/taskN`, `{BASE_BRANCH}` branch operation and PR publication.
- [`framework_lifecycle_guide.md`](framework_lifecycle_guide.md): new adoption, existing update, and update PR transition criteria.
- [`release_update_protocol.md`](release_update_protocol.md): release/tag and update protocol.
- [`agent_code_hyperfall_rule_conflict.md`](agent_code_hyperfall_rule_conflict.md): conflicts between Hyper-Waterfall rules and agent defaults.
