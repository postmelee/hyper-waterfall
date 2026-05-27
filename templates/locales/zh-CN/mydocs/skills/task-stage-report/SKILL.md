---
name: task-stage-report
description: |
  应用 Hyper-Waterfall task 的 Stage 完成流程。
  编写 stage report（`_stage{N}.md`），将 Stage source 和 report 一起 commit，
  并运行 Stage 验证命令。在一个 Stage 完成后、进入下一 Stage 前调用。
---

# Hyper-Waterfall Stage 完成报告

## Trigger

- 任务请求者明确说 "finish Stage {N}" 或 "write the stage report"。
- 直接调用此 SKILL。

## Preconditions

- 实施计划书 `task_m{milestone}_{N}_impl.md` 存在，并已由任务请求者批准。
- 当前 Stage 的所有工作项都已反映到代码或文档中。
- Work branch 是 `local/task{N}`。

## Procedure

1. 完全按实施计划书 Stage verification section 中写明的命令运行 Stage 验证。
   - 保留输出，以便在报告中引用。
2. 编写 stage report：`mydocs/working/task_m{milestone}_{N}_stage{S}.md`。
   - 使用中央模板 `mydocs/_templates/stage_report.md`。
   - 只有在无法读取模板时，才使用这些 fallback sections：
     - Stage purpose
     - Artifacts: file list plus line count or summary
     - Body change scope / lossless preservation when applicable
     - Verification results with output from step 1
     - Residual risks
     - Impact on next Stage
     - Approval request for next stage or PR stage
3. 检查变更。
   ```bash
   git status --short
   git diff --check
   ```
4. 将 Stage source 和 report 一起 commit。
   ```bash
   git add {stage artifact files} mydocs/working/task_m{milestone}_{N}_stage{S}.md
   git commit -m "Task #{N} Stage {S}: {summary}"
   ```
   - Substage: `Task #{N} [Stage {S.M}]: summary`
   - Final Stage plus final report bundle: `Task #{N} Stage {S} + final report: summary`；此情况推荐使用 `task-final-report`。
5. 请求任务请求者 review stage report，并批准进入下一 Stage。

## Verification

- `git log --oneline -1` 符合 stage commit message format。
- `mydocs/working/task_m{milestone}_{N}_stage{S}.md` 存在。
- Stage report 填写了 `mydocs/_templates/stage_report.md` 的必需章节。
- Stage 验证命令已通过。如果失败，该 Stage 未完成，且不得编写报告。

## Never Do

- 在验证失败时编写或 commit report。
- 将 Stage artifacts 和 Stage report 分开 commit。一个 Stage 使用一个 bundled commit。
- 未经任务请求者批准进入下一 Stage。

## Invocation

- Codex: `$task-stage-report` 或 `/skills` 菜单
- Claude Code: `/task-stage-report`
