---
name: task-final-report
description: |
  应用 Hyper-Waterfall task 的 final report 和 PR publication 流程。
  编写 final report（`_report.md`），将 daily task board 标记为完成，
  创建 final commit，push 远程 publish/task{N} branch，并创建面向 {BASE_BRANCH} 的 Open PR。
  只在所有 Stage 完成后、PR publication 之前立即调用。
---

# Hyper-Waterfall Final Report 和 PR Publication

## Trigger

- 任务请求者明确说 "write final report" 或 "prepare PR"。
- 直接调用此 SKILL。

## Preconditions

- 所有实施计划书 Stage 都已完成，且每个 stage report 都已 commit。
- 验收标准的集成验证已通过。
- `local/task{N}` 没有未提交变更，或只剩此流程将要 commit 的变更。

## Procedure

1. 运行集成验证：使用实施计划书的 acceptance criteria 或最后一个 Stage verification section 命令。
2. 编写 final report：`mydocs/report/task_m{milestone}_{N}_report.md`。
   - 使用中央模板 `mydocs/_templates/final_report.md`。
   - 只有在无法读取模板时，才使用这些 fallback sections：
     - Work summary: Issue link, milestone, Stage count
     - Changed files and impact area
     - Quantitative before/after comparison when applicable, such as line count, token count, or verification pass count
     - Verification results by acceptance criterion
     - Residual risks and follow-up work
     - Approval request to task requester
3. 更新 daily task board：`mydocs/orders/{yyyymmdd}.md` 中的 #{N} row。
   - 使用 `mydocs/_templates/orders.md` 的输出格式。
   - 将 status 设为 `Done`，并在 notes 中包含 `Done: HH:mm`。
4. 检查变更。
   ```bash
   git status --short
   git diff --check
   git log --oneline {BASE_BRANCH}..local/task{N}
   ```
5. 创建 final commit。它可以打包最后一个 Stage 和 final report，也可以只包含 report。
   ```bash
   git add mydocs/report/task_m{milestone}_{N}_report.md mydocs/orders/{yyyymmdd}.md
   git commit -m "Task #{N} Stage {last} + final report: {summary}"
   # or
   git commit -m "Task #{N}: final report and daily task board completion"
   ```
6. Push 远程 publication branch。
   ```bash
   git push origin local/task{N}:publish/task{N}
   ```
7. 创建面向 `{BASE_BRANCH}` 的 Open PR。
   ```bash
   HEAD_SHA=$(git rev-parse HEAD)
   PR_BODY=/tmp/task{N}-pr-body.md
   # Start from {PR_TEMPLATE_PATH} and write "$PR_BODY" from the final report and stage reports.
   gh pr create --base {BASE_BRANCH} --head publish/task{N} \
     --title "Task #{N}: {title}" \
     --body-file "$PR_BODY"
   ```
   - PR body 使用 `{PR_TEMPLATE_PATH}`。
   - Summary bullet 最多 4 个：target task、why、what、review focus。
   - 包含每个 Stage 一行、verification summary 和 remaining risks。
   - 将每个 Stage title 链接到 stage report URL，并将每个短 commit SHA 链接到 commit URL。
   - 使用 `HEAD_SHA` 固定的 URL 链接 work documents：`https://github.com/{REPO_SLUG}/blob/{HEAD_SHA}/mydocs/...`。
   - 使用 `[filename](URL)`，不要使用 raw links。
   - 不要使用 relative links 或 `blob/publish/task{N}/...` links。
   - 使用 PR body verification subsections：`Automated Verification`、`Manual/Scenario Verification`、`CI/Remote Verification` 和 `Verification Limitations`。
   - Automated verification 使用 `Topic / Method / Result / Evidence` 表，概括检查了哪个 acceptance criterion，以及关键输出或通过数量。
   - Manual/scenario verification 使用 `Scenario / Check Procedure / Result / Evidence` 表。
   - CI/remote verification 使用包含 GitHub Check names、run links 或 check time 的 `Item / Result / Evidence` 表。
   - 不要把未执行的验证留在表格中。移到 `Verification Limitations` 或 `Remaining Risks`。
   - 不要把长日志粘贴到 PR body；链接 final report 或 stage reports。
   - `Screenshots` 只为视觉变更保留。
   - `Related Issues` 用于 prerequisite、follow-up、Epic、upstream 或 reference Issues，不是 target task。
8. 将 PR URL 发给任务请求者，并请求 review/merge approval。

## Verification

- 所有 stage reports 和 final report 都存在。
- Final report 填写了 `mydocs/_templates/final_report.md` 的必需章节。
- `git status --short` 为空。
- `gh pr view` 显示 base/head 正确的 non-draft PR。
- PR body 的 `Changes` Stage summaries 链接到 stage reports 和短 commit SHA links。
- Work document links 使用 commit SHA-pinned URLs 和 `[filename](URL)` 格式。
- Work document links 不包含 raw GitHub blob URLs、relative links 或 `blob/publish/task{N}`。
- PR body 的 `Verification` section 遵循 `Automated Verification`、`Manual/Scenario Verification`、`CI/Remote Verification` 和 `Verification Limitations`。
- PR body 不保留未执行验证的 checklist tables。
- Daily task board #{N} row 是 `Done`，并包含 `Done: HH:mm`。

## Never Do

- 集成验证失败时创建 PR。
- 直接把 `local/task{N}` push 到远程；始终发布为 `publish/task{N}`。
- 强制 squash merge options；必须保留 Stage commit 的意义。
- 未经任务请求者明确指示，不创建 Draft PR 或 self-merge。

## Invocation

- Codex: `$task-final-report` 或 `/skills` 菜单
- Claude Code: `/task-final-report`
