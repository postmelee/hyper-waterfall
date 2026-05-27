# `manual/` 文件夹规则

## 目的

保存 Hyper-Waterfall 运行规则、仓库采用流程，以及会重复应用的工作标准。

## 回答的问题

- “这个仓库由哪些规则运行？”
- “修改流程时应该检查哪份文档？”

## 何时编写

当流程、branch policy、PR policy、文档结构或冲突规则发生变化时。

## 允许的文件名

使用能揭示主题的 snake_case Markdown 名称。示例：

- `document_structure_guide.md`
- `task_workflow_guide.md`
- `git_workflow_guide.md`
- `pr_process_guide.md`
- `internal_pr_guide.md`
- `external_pr_review_guide.md`
- `pr_command_guide.md`
- `framework_lifecycle_guide.md`
- `release_update_protocol.md`
- `agent_code_hyperfall_rule_conflict.md`

## 使用的模板

需要草稿结构时，可使用 `mydocs/_templates/tech_note.md`，但 manual 文档应优先使用适合其主题的结构。

## 必需内容

- 目的
- 范围
- 强制规则
- 例外
- 相关 manual 链接

## 不允许的内容

- 特定 task 的 Stage report
- 完成报告
- 每日 task 状态表
- 目标项目的产品、用户、贡献者或 API 合约文档

## 下一次会话 AI 必须恢复的上下文

当前流程基线，以及它与其他文档的关系。
