---
name: task-register
description: |
  Register a new task that does not yet have a GitHub Issue in the Hyper-Waterfall workflow.
  Query open milestones and existing labels, choose candidates,
  confirm with the task requester before creating the Issue, then create the GitHub Issue number.
  After Issue creation, hand off branch, daily task board, and task plan work to task-start.
---

# Hyper-Waterfall Issue Registration

## Trigger

- The task requester explicitly asks to register an Issue, create a new task, or start from an Issue.
- The task requester invokes this SKILL directly.

## Preconditions

- The work does not yet have an Issue number.
- Purpose, background, and scope are at least drafted.
- `gh` CLI is authenticated for the current user.
- When possible, `.github/ISSUE_TEMPLATE/task.yml` or framework source `templates/.github/ISSUE_TEMPLATE/task.yml` can be read.
- Before creating the Issue, the title, body, milestone, and label draft can be confirmed with the task requester.

## Procedure

1. Check for duplicate Issues.
   ```bash
   gh issue list --repo {REPO_SLUG} --state all \
     --search "{work keywords}" \
     --limit 20 \
     --json number,title,state,milestone,labels,url
   ```
   - If a substantially identical open Issue exists, do not create a new one. Ask whether to use the existing Issue.
   - If a closed Issue covered the same topic, link it in the new Issue references.
2. Check open milestones.
   ```bash
   gh api repos/{REPO_SLUG}/milestones \
     --jq '.[] | {number,title,state,description,open_issues,closed_issues}'
   ```
   - Judge from the live `title`, `state`, and `description`.
   - Do not rely on remembered old milestone lists or version mappings.
3. Check existing labels.
   ```bash
   gh api repos/{REPO_SLUG}/labels --paginate \
     --jq '.[] | {name,description,color}'
   ```
   - Judge from live `name` and `description`.
   - Do not rely on remembered old label lists.
4. Choose milestone candidates.
   - Use only open milestones.
   - Compare work purpose, scope, component, and release phase with the milestone `title` and `description`.
   - If one candidate is clear, record its title and reason.
   - If 2-3 candidates are possible, present them with reasons and ask the task requester.
   - If no open milestone fits or descriptions are insufficient, ask the task requester instead of guessing.
5. Choose label candidates.
   - Use only existing labels from the live lookup.
   - Select a label only when the work clearly matches the label `name` and `description`.
   - Prefer 1 type label, 1-2 area labels, and 0-1 kind/status label.
   - Type labels include `bug`, `documentation`, `enhancement`, `duplicate`, or `question`.
   - Area labels are selected by primary work ownership, not every affected area.
   - Kind labels such as `kind:architecture`, `kind:automation`, `kind:regression`, `kind:verification`, or `kind:follow-up` are used only when they meaningfully distinguish handling.
   - General Issues should usually have 2-4 labels.
   - If 5 or more labels are needed, write the exception reason in the draft and confirm it with the task requester.
   - If candidates are clear, record label names and reasons.
   - If no label fits or the fit is ambiguous, create without labels or ask the task requester.
   - Do not create new labels.
6. Draft the Issue.
   - Title: one sentence that reveals the work unit.
   - Body: prefer GitHub Issue Form `.github/ISSUE_TEMPLATE/task.yml`.
     - In a framework repository, use `templates/.github/ISSUE_TEMPLATE/task.yml` when checking the source template for applied repositories.
     - Since `gh issue create` does not run Issue Form UI, convert form fields to Markdown sections.
   - Issue Form sections:
     - Background
     - Goals
     - Scope - Included
     - Scope - Excluded
     - Acceptance Criteria
     - Verification Criteria
     - References
     - Milestone and label candidates
   - If the Issue Form cannot be read, use the same section list as fallback.
   - Milestone: one open milestone chosen from live lookup and the selection reason.
   - Labels: approved existing labels and reasons, or none.
   - Split label reasons by type/area/kind, and include the exception reason if using 5 or more labels.
7. Request approval before creating the Issue.
   - Show the task requester the title, body, milestone, labels, and selection reasons.
   - Do not run `gh issue create` until the task requester explicitly approves creation in the same thread.
8. After approval, create the Issue.
   ```bash
   gh issue create --repo {REPO_SLUG} \
     --title "{title}" \
     --body "{body}" \
     --milestone "{milestone}" \
     --label "{label}"
   ```
   - Repeat `--label` for multiple labels, such as `--label documentation --label enhancement`.
   - Omit `--label` when creating without labels.
9. Confirm the created Issue.
   ```bash
   gh issue view {N} --repo {REPO_SLUG} \
     --json number,title,state,milestone,labels,url
   ```
10. Report the created Issue number and URL, then request approval to enter `task-start`.

## Verification

- The created Issue is `OPEN`.
- The milestone is not empty and was an open milestone from live lookup.
- Labels are only approved existing labels.
- General Issue labels are usually in the recommended 2-4 range.
- If 5 or more labels were used, the approved exception reason is included in the report.
- `area:*` labels are selected by primary work ownership.
- The Issue body fills the required inputs corresponding to `.github/ISSUE_TEMPLATE/task.yml`.
- The creation report includes Issue number, URL, milestone, labels, and selection reasons.

## Never Do

- Run `gh issue create` without task requester approval.
- Create a new milestone or label.
- Arbitrarily use a closed milestone.
- Continue to `task-start` after Issue creation without approval.
- Create branches, update the daily task board, or write the task plan inside this Skill.

## Invocation

- Codex: `$task-register` or select `task-register` from the `/skills` menu
- Claude Code: `/task-register`
