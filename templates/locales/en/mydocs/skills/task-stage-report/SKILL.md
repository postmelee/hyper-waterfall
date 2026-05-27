---
name: task-stage-report
description: |
  Apply the stage completion procedure for a Hyper-Waterfall task.
  Write the stage report (`_stage{N}.md`), commit stage source and report together,
  and run stage verification commands. Invoke after a stage completes and before entering the next stage.
---

# Hyper-Waterfall Stage Completion Report

## Trigger

- The task requester explicitly says "finish Stage {N}" or "write the stage report."
- This SKILL is invoked directly.

## Preconditions

- The implementation plan `task_m{milestone}_{N}_impl.md` exists and was approved by the task requester.
- All current Stage work items are reflected in code or documents.
- The work branch is `local/task{N}`.

## Procedure

1. Run the Stage verification commands exactly as written in the implementation plan's Stage verification section.
   - Preserve output so it can be cited in the report.
2. Write the stage report: `mydocs/working/task_m{milestone}_{N}_stage{S}.md`.
   - Use central template `mydocs/_templates/stage_report.md`.
   - Only if the template cannot be read, use these fallback sections:
     - Stage purpose
     - Artifacts: file list plus line count or summary
     - Body change scope / lossless preservation when applicable
     - Verification results with output from step 1
     - Residual risks
     - Impact on next Stage
     - Approval request for next stage or PR stage
3. Check changes.
   ```bash
   git status --short
   git diff --check
   ```
4. Commit stage source and report together.
   ```bash
   git add {stage artifact files} mydocs/working/task_m{milestone}_{N}_stage{S}.md
   git commit -m "Task #{N} Stage {S}: {summary}"
   ```
   - Substage: `Task #{N} [Stage {S.M}]: summary`
   - Final Stage plus final report bundle: `Task #{N} Stage {S} + final report: summary`; using `task-final-report` is recommended for this case.
5. Ask the task requester to review the stage report and approve entering the next stage.

## Verification

- `git log --oneline -1` follows the stage commit message format.
- `mydocs/working/task_m{milestone}_{N}_stage{S}.md` exists.
- The stage report fills required sections from `mydocs/_templates/stage_report.md`.
- Stage verification commands passed. If they failed, the Stage is incomplete and the report must not be written.

## Never Do

- Write or commit a report while verification is failing.
- Commit stage artifacts and stage report separately. One Stage uses one bundled commit.
- Enter the next stage without task requester approval.

## Invocation

- Codex: `$task-stage-report` or the `/skills` menu
- Claude Code: `/task-stage-report`
