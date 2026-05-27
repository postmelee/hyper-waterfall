---
name: task-final-report
description: |
  Apply the final report and PR publication procedure for a Hyper-Waterfall task.
  Write the final report (`_report.md`), mark the daily task board complete,
  create the final commit, push the remote publish/task{N} branch, and create an Open PR to {BASE_BRANCH}.
  Invoke only immediately before PR publication after all stages are complete.
---

# Hyper-Waterfall Final Report and PR Publication

## Trigger

- The task requester explicitly says "write final report" or "prepare PR."
- This SKILL is invoked directly.

## Preconditions

- All implementation plan stages are complete and each stage report has been committed.
- Integrated verification for acceptance criteria has passed.
- `local/task{N}` has no uncommitted changes, or only changes that this procedure will commit.

## Procedure

1. Run integrated verification: use the implementation plan's acceptance criteria or the last Stage verification section commands.
2. Write final report: `mydocs/report/task_m{milestone}_{N}_report.md`.
   - Use central template `mydocs/_templates/final_report.md`.
   - Only if the template cannot be read, use these fallback sections:
     - Work summary: Issue link, milestone, Stage count
     - Changed files and impact area
     - Quantitative before/after comparison when applicable, such as line count, token count, or verification pass count
     - Verification results by acceptance criterion
     - Residual risks and follow-up work
     - Approval request to task requester
3. Update daily task board: #{N} row in `mydocs/orders/{yyyymmdd}.md`.
   - Use output format from `mydocs/_templates/orders.md`.
   - Set status to `Done` and include `Done: HH:mm` in notes.
4. Check changes.
   ```bash
   git status --short
   git diff --check
   git log --oneline {BASE_BRANCH}..local/task{N}
   ```
5. Create the final commit. It may bundle the last Stage and final report, or only the report.
   ```bash
   git add mydocs/report/task_m{milestone}_{N}_report.md mydocs/orders/{yyyymmdd}.md
   git commit -m "Task #{N} Stage {last} + final report: {summary}"
   # or
   git commit -m "Task #{N}: final report and daily task board completion"
   ```
6. Push the remote publication branch.
   ```bash
   git push origin local/task{N}:publish/task{N}
   ```
7. Create an Open PR to `{BASE_BRANCH}`.
   ```bash
   HEAD_SHA=$(git rev-parse HEAD)
   PR_BODY=/tmp/task{N}-pr-body.md
   # Start from {PR_TEMPLATE_PATH} and write "$PR_BODY" from the final report and stage reports.
   gh pr create --base {BASE_BRANCH} --head publish/task{N} \
     --title "Task #{N}: {title}" \
     --body-file "$PR_BODY"
   ```
   - The PR body uses `{PR_TEMPLATE_PATH}`.
   - Include at most 4 summary bullets: target task, why, what, review focus.
   - Include one line per Stage, verification summary, and remaining risks.
   - Link each Stage title to the stage report URL and each short commit SHA to the commit URL.
   - Link work documents with `HEAD_SHA` pinned URLs: `https://github.com/{REPO_SLUG}/blob/{HEAD_SHA}/mydocs/...`.
   - Use `[filename](URL)` instead of raw links.
   - Do not use relative links or `blob/publish/task{N}/...` links.
   - Use the PR body verification subsections `Automated Verification`, `Manual/Scenario Verification`, `CI/Remote Verification`, and `Verification Limitations`.
   - Automated verification uses a `Topic / Method / Result / Evidence` table, summarizing what acceptance criterion was checked and the key output or pass count.
   - Manual/scenario verification uses a `Scenario / Check Procedure / Result / Evidence` table.
   - CI/remote verification uses an `Item / Result / Evidence` table with GitHub Check names, run links, or check time.
   - Do not leave unperformed verification in tables. Move it to `Verification Limitations` or `Remaining Risks`.
   - Do not paste long logs into the PR body; link the final report or stage reports.
   - Keep `Screenshots` only for visual changes.
   - `Related Issues` is for prerequisite, follow-up, Epic, upstream, or reference Issues, not the target task.
8. Send the PR URL to the task requester and request review/merge approval.

## Verification

- All stage reports and the final report exist.
- The final report fills required sections from `mydocs/_templates/final_report.md`.
- `git status --short` is empty.
- `gh pr view` shows a non-draft PR with the correct base/head.
- The PR body `Changes` Stage summaries link to stage reports and short commit SHA links.
- Work document links use commit SHA-pinned URLs and `[filename](URL)` format.
- Work document links do not contain raw GitHub blob URLs, relative links, or `blob/publish/task{N}`.
- The PR body `Verification` section follows `Automated Verification`, `Manual/Scenario Verification`, `CI/Remote Verification`, and `Verification Limitations`.
- The PR body does not keep unperformed verification checklists in tables.
- The daily task board #{N} row is `Done` with `Done: HH:mm`.

## Never Do

- Create a PR when integrated verification is failing.
- Push `local/task{N}` directly to remote; always publish as `publish/task{N}`.
- Force squash merge options; Stage commit meaning must be preserved.
- Create a Draft PR or self-merge without explicit task requester instruction.

## Invocation

- Codex: `$task-final-report` or the `/skills` menu
- Claude Code: `/task-final-report`
