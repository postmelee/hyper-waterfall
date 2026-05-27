# `plans/` 文件夹规则

## 目的

在修改代码前，固定内部 task 的方向和实施 Stage。

## 回答的问题

- “要做什么？”
- “实施将如何拆分？”
- “哪些内容不在范围内？”

## 何时编写

当 `task-start` 创建任务计划书时，以及任务计划书获批后编写实施计划书时。

## 允许的文件名

- `task_{milestone}_{issue_number}.md`
- `task_{milestone}_{issue_number}_impl.md`

如果已完成的计划需要归档，使用 `plans/archives/`。

## 使用的模板

- `mydocs/_templates/task_plan.md`
- `mydocs/_templates/task_impl_plan.md`

## 必需内容

- 目的
- 背景
- 范围
- 设计方向
- 预期变更文件
- Stage
- 验证计划
- 风险
- 审批请求

## 不允许的内容

- Stage 完成报告
- 最终报告
- 只收集实施后验证日志的文档

## 下一次会话 AI 必须恢复的上下文

已批准的范围、Stage 拆分、验证命令和 commit message 规则。
