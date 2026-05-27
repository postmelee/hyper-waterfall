# `orders/` 文件夹规则

## 目的

用一个看板展示今天要做什么，以及当前状态。

## 回答的问题

- “当前正在处理哪个 Issue？”
- “今天完成了哪些工作？”

## 何时编写

当 task 开始、状态变化、最终报告写完，或 post-merge cleanup 运行时。

## 允许的文件名

只允许 `yyyymmdd.md`。

## 使用的模板

`mydocs/_templates/orders.md`

## 必需内容

- 日期标题
- Milestone 章节
- `Issue | Task | Status | Notes` 表格
- 已完成工作使用 `Done: HH:mm`

## 不允许的内容

- 长篇任务计划
- 验证日志
- 技术研究
- 故障排查
- 不是日期文件的模板文件

## 下一次会话 AI 必须恢复的上下文

今天应继续的工作，以及每个 Issue 的当前状态。
