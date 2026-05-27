# AGENTS.md

本仓库中所有编码 Agent（包括 Codex、Claude Code 等）都必须遵守的运行规则。本文件会在每一轮作为系统提示加载，因此只保留必须始终存在的政策、约束和索引。详细流程放在 manual 和 SKILL 文件中。

## 项目概览

{PROJECT_OVERVIEW}

## Hyper-Waterfall 核心规则

本项目使用 **Hyper-Waterfall** 方法论。请仔细阅读这些规则，因为它们可能与 Agent 的默认行为冲突，尤其是快速执行和自主编辑。详情见：[`agent_code_hyperfall_rule_conflict.md`](mydocs/manual/agent_code_hyperfall_rule_conflict.md)。

- 修改源文件前，必须先请求任务请求者批准。
- 工作必须按 GitHub Issue 跟踪。
- 新功能、bug 修复或结构变更绝不能跳过以下顺序：`Issue -> branch -> daily task board -> plan -> implementation -> verification -> final report -> PR`。
- 当前 Stage 完成后，未获批准不得进入下一 Stage。
- 如果范围不清楚，或可能与现有工作冲突，先询问。
- 不要回退用户或其他工作者做出的更改。
- 只有在任务请求者批准后，或确认 PR 已 merge 后，才能关闭 Issue。
- 编辑文档前先阅读现有内容，只修改必要部分，并且只有在需要时才补充内容。
- 创建、移动或编辑产品、用户、贡献者、外部集成、API、架构或 roadmap 文档时，必须在任务计划书中记录文档位置判断并获得批准。
- `mydocs/manual` 不是目标项目的产品文档位置。目标项目必须在单独 task 中明确选择官方文档根，例如 `docs/`、`specs/`、`site/`、`website/` 或 `adr/`。
- 工作完成后，清理下一项 task 不再需要的本地和远程产物。
- PR merge 且 Issue close 后，返回 `{BASE_BRANCH}`，并删除不再需要的 `local/task{number}` branch 和临时 worktree。

**批准推定规则**：只有任务请求者在同一线程中明确表示继续，例如 “continue” 或 “proceed to the next stage”，才把该 Stage 视为已批准。

## 命名规则

- Milestone：`M{version}`（例如 M100=v1.0.0，M05x=v0.5.x）。文档文件名使用小写 `m{number}`（例如 `m100`）。
- Branch：`local/task{issue_number}` 用于工作，`publish/task{issue_number}` 用于发布面向 `{BASE_BRANCH}` 的 PR。
- Commit message：
  - 基本：`Task #{number}: summary`
  - Stage：`Task #{number} Stage {N}: summary`
  - Substage：`Task #{number} [Stage {N.M}]: summary`
  - Report bundle：`Task #{number} Stage {N} + final report: summary`
- 文档文件名：`task_{milestone}_{issue_number}{_impl|_stage{N}|_report}?.md`。新文档必须包含 milestone。详情见 [`document_structure_guide.md`](mydocs/manual/document_structure_guide.md)。
- 所有文档都使用此仓库选择的 Hyper-Waterfall locale 编写。

## 变更前强制规则

{PROJECT_SPECIFIC_RULES}

## 必读参考

- [`README.md`](README.md) - 项目概览、设置和构建
- [`mydocs/manual/document_structure_guide.md`](mydocs/manual/document_structure_guide.md) - `mydocs/` 文件夹角色、文档文件名、外部 PR 文件夹政策、Skills 位置政策
- [`mydocs/manual/task_workflow_guide.md`](mydocs/manual/task_workflow_guide.md) - task workflow 15 个步骤、commit message 规则、工作时间规则
- [`mydocs/manual/git_workflow_guide.md`](mydocs/manual/git_workflow_guide.md) - branch 政策、Git 图、maintainer/contributor workflow
- [`mydocs/manual/pr_process_guide.md`](mydocs/manual/pr_process_guide.md) - 外部贡献者 PR review
- [`mydocs/manual/agent_code_hyperfall_rule_conflict.md`](mydocs/manual/agent_code_hyperfall_rule_conflict.md) - Hyper-Waterfall 与 Agent 默认行为之间的冲突
- {PROJECT_SPECIFIC_REQUIRED_DOCUMENTS}

## Agent Skills

固定的 Hyper-Waterfall 流程节点被拆分为 SKILL 文件。真相来源是 `mydocs/skills/`。Codex（`.agents/skills`）和 Claude Code（`.claude/skills`）通过符号链接读取同一份内容。详情见 [`document_structure_guide.md`](mydocs/manual/document_structure_guide.md) 中的 “Agent Skills 位置政策”。

## 工作规则

- 工作开始和结束由任务请求者决定。Agent 不得自行提议结束工作，也不得自行设定时间限制。
