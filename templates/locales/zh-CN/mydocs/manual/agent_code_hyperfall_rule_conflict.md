# Agent 默认行为与 Hyper-Waterfall 的冲突规则

## 目的

Claude Code 和 Codex 通常针对快速执行和自主编辑进行优化。本项目使用 Hyper-Waterfall 方法论，因此这些默认行为可能与流程纪律冲突。本文档定义发生冲突时的优先级和处理规则。

## 冲突点

1. 立即实施倾向 vs. Stage 审批关卡
2. 未完成必要文档更新的 code-first 修复
3. 过早结束 task 或关闭 Issue
4. 通过相关重构或不必要产出物更新扩大范围

## 优先级规则

1. 任务请求者的明确指示
2. `AGENTS.md` 中的强制规则
3. Task 文档（`plans`、`working`、`report`、`orders`）
4. 自动化工具或 Agent 默认行为

如果更高规则与更低规则冲突，不应用更低规则。

## 运行规则

- 默认顺序是 `Issue -> branch -> daily task board -> plan -> implementation -> verification -> final report -> PR`。
- 每个 Stage 完成后，进入下一 Stage 前先确认批准。
- 如果任务请求者在同一线程中明确表示继续，例如 "continue" 或 "proceed to the next stage"，则将该 Stage 视为已批准。
- 只有在任务请求者批准后，或 PR 已 merge 后，才能关闭 Issue。
- 编辑文档前先阅读现有内容，只修改必要部分，并且只有在无法避免时才添加内容。
- 立即清理违反文档位置/文件名规则的产出物，以及下一项 task 不再需要的本地或远程副产物。

## 实用检查清单

- 编辑前：确认当前 Issue 编号、branch 和任务计划书是否存在。
- 编辑中：检查变更范围是否符合已批准的请求。
- 编辑后：运行验证、更新报告、把结果反映到 PR body，并在 merge 后清理副产物。

## 例外

- 如果任务请求者只要求简单措辞修正、拼写修正或调查，流程可以缩减到所需级别。
- 但是，如果该工作已经有 GitHub Issue，至少要在最终报告和 PR body 中记录结果。
