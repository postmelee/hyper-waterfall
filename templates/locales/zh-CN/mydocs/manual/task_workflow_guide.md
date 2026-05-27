# Task Workflow Manual

本文档定义 Hyper-Waterfall task 流程、task 编号和 commit message 命名规则、工作时间规则，以及批准推定标准。从 GitHub Issue 开始工作、结束 Stage、编写最终报告、发布 PR 或 merge 后 cleanup 前都要阅读它。文档文件夹位置由 `document_structure_guide.md` 说明，branch 操作由 `git_workflow_guide.md` 说明。

## 核心术语

- **Task plan**：第一次审批请求使用的文档。记录工作目的、范围、暂定 Stage 和验证计划。
- **Implementation plan**：把已批准的任务计划书转化为具体 Stage、产出物、验证命令和 commit message 的文档。
- **Stage report**：Stage 结束后留在 `mydocs/working/` 的 `_stage{N}.md` 报告。
- **Final report**：所有 Stage 结束后留在 `mydocs/report/` 的 `_report.md` 报告。
- **Approval assumption rule**：只有任务请求者在同一线程中明确表示继续，Stage 才视为已批准。

## 文档输出格式

Plans、stage reports、final reports、daily task boards 和 external PR review documents 使用 `mydocs/_templates/` 中的中央模板。Skills 定义流程和验证；中央模板定义输出格式。如果二者分歧，必须在同一 PR 中一起更新。

GitHub Issues 和 Pull Requests 是 GitHub 平台产出物。新 task Issues 使用 `.github/ISSUE_TEMPLATE/task.yml` 作为输入 prompt 格式，PR bodies 使用 `.github/pull_request_template.md` 作为输出格式。

PR body 的 `Verification` 章节遵循 `.github/pull_request_template.md`：`Automated Verification`、`Manual/Scenario Verification`、`CI/Remote Verification` 和 `Verification Limitations`。不要只列命令。要包含结果和证据。不要把未执行的验证留在表格中；移到 `Verification Limitations` 或 `Remaining Risks`。

## Framework Lifecycle 工作

在新仓库安装 Hyper-Waterfall，或将已采用仓库更新到新版本时，先运行 framework lifecycle 判断。判断标准和转入规则见 [`framework_lifecycle_guide.md`](framework_lifecycle_guide.md)。

- New adoption judgment: `docs/agent-entrypoint.md`, `docs/lifecycle/adoption.md`, `templates/manifest.json`
- Existing update judgment: `docs/agent-entrypoint.md`, `docs/lifecycle/update.md`, `.hyper-waterfall/version.json`, target GitHub Release/tag manifest, `docs/migrations/`
- Update PR transition: `docs/lifecycle/update_pr.md`
- Release/tag and update protocol: [`release_update_protocol.md`](release_update_protocol.md)

Lifecycle 判断获批且实际文件变更开始后，应用本 manual 的普通 task 流程。批准前不要把 manifest diff 中的文件应用到目标仓库。

## Task 编号管理

- 使用 **GitHub Issues** 作为 task 编号，防止重复编号。
- **Milestone notation**：`M{version}`（例如 M100=v1.0.0，M05x=v0.5.x）
- 新 task 注册：如果没有 Issue，使用 [`task-register`](../skills/task-register/SKILL.md) Skill 检查重复 Issues、milestone 和 labels，并在批准后创建 GitHub Issue。
- Task start：如果 Issue 已存在，使用 [`task-start`](../skills/task-start/SKILL.md) 创建 branch、daily task board row 和任务计划书。
- Branch name：`local/task{issue_number}`（示例：`local/task1`）
- Remote PR publication branch：`publish/task{issue_number}`（示例：`publish/task1`）
- Commit message 规则：
  - Basic: `Task #{issue_number}: summary`
  - Stage commit: `Task #{issue_number} Stage {N}: summary`
  - Substage allowed: `Task #{issue_number} [Stage {N.M}]: summary`
  - Stage report or final report bundled commit: `Task #{issue_number} Stage {N} + final report: summary`
- 在 `mydocs/orders/` 中，用 `M100 #1` 形式引用 milestone 和 Issue。
- Task completion：`gh issue close {number}` 或在 commit message 中使用 `closes #{number}`。

## Task 流程

1. 如果没有 Issue，用 `task-register` 注册 GitHub Issue。如果已有 Issue，使用该编号。
2. 用 `task-start` 启动指定 Issue，创建 `local/task{issue_number}`，然后继续。
3. 工作前编写任务计划书，然后请求批准。
4. 编写实施计划书（最少 3 个 Stage，最多 6 个 Stage），然后请求批准。
5. 开始 Stage 工作。
6. 每个 Stage 结束后，编写 stage report 并请求批准。
7. **在 task branch 上，将 stage report（`_stage{N}.md`）与该 Stage 的 source changes 一起 commit。**
8. 获批后，进入下一 Stage。
9. 所有 Stage 结束后，编写最终报告并请求批准。
10. **在 task branch 上 commit 最终报告（`_report.md`）和 daily task board（`orders/`）更新。创建 PR 前，用 `git status` 确认没有未提交文件。**
11. Push 到 `publish/task{issue_number}`，并创建面向 `{BASE_BRANCH}` 的 Open PR。
12. 请求批准时，任务请求者可在 `mydocs/feedback/` 注册反馈。
13. 如果所有测试通过且没有反馈，继续。
14. PR merge 后，关闭 Issue 并最终确定 daily task board 状态。
15. 清理 merged `publish/task{issue_number}` remote branch 和可复现的本地副产物。

## 工作规则

- 工作开始和结束由任务请求者决定。Agent 不得自行提议结束工作，也不得自行设定时间限制。

## Approval Assumption Rule

- 只有任务请求者在同一线程中明确表示继续，例如 "continue" 或 "proceed to the next stage"，才把 Stage 视为已批准。

## FAQ / 常见错误

### Stage 验证失败时

验证失败时，不要编写或 commit stage report。先识别失败命令，概括错误，并在同一 Stage 内恢复。如果 Stage 范围已超出计划，询问任务请求者是否拆分 Stage 或更新实施计划书。

### Stage 大小不清楚时

默认使用 3-6 个 Stage。每个 Stage 应足够小，可以在一个周期内实施、验证并报告。将有风险的共享规则变更、代码变更和文档/验证 cleanup 拆成不同 Stage。低风险文档工作可以按文档组拆分。

### 未获批准就开始下一 Stage 时

立即停止并检查当前变更范围。如果变更未提交，只保留属于已批准 Stage 的部分。如果已经提交，向任务请求者报告情况，并确认是添加修正 commit 还是更新计划。

## SKILL 调用显示指南

应用 Hyper-Waterfall SKILL 流程时，在运行实际流程前用一行告诉用户。这不允许隐式调用；它只是透明说明，当前流程基于明确指示或 Stage 批准正在应用。

推荐格式：

- `Calling the task-register skill.`
- `Calling the task-start skill.`
- `Calling the task-stage-report skill.`
- `Proceeding with the task-final-report skill.`
- `Calling the pr-merge-cleanup skill.`
- `Calling the external-pr-review skill.`
- `Calling the todo skill.`

对应 Hyper-Waterfall 流程使用该显示。

README 的 "Core SKILL Details" 表是面向用户的各 Skill 摘要，而本节定义实际调用显示原则。如果添加、删除、重命名 Skill，或其调用时机变化，应在同一 PR 中 review README 表和本节。

文档结构政策 review 或 manual neutrality 判断本身不是单独的 Skill call display 目标。只有当该判断导致 Issue registration、task start、stage completion 或其他 core Skill 流程时，才显示 core Skill。

`task-final-report` 是编写最终报告并发布 Open PR 的流程，PR body 的验证结构与模板对齐。

Installation/update lifecycle 判断本身不是 Hyper-Waterfall procedure call display 目标。但是，如果它导致 GitHub Issue registration 或 task start，则遵循 `task-register`、`task-start` 或实际使用的 core Skill 的显示规则。

## 相关 Manual

- [`document_structure_guide.md`](document_structure_guide.md)：task plans、stage reports 和 final reports 的位置与文件名。
- [`git_workflow_guide.md`](git_workflow_guide.md)：`local/taskN`、`publish/taskN`、`{BASE_BRANCH}` branch 操作和 PR publication。
- [`framework_lifecycle_guide.md`](framework_lifecycle_guide.md)：new adoption、existing update 和 update PR transition 标准。
- [`release_update_protocol.md`](release_update_protocol.md)：release/tag 和 update protocol。
- [`agent_code_hyperfall_rule_conflict.md`](agent_code_hyperfall_rule_conflict.md)：Hyper-Waterfall 规则与 Agent 默认行为的冲突。
