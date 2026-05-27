# `working/` 文件夹规则

## 目的

记录每个 Stage 如何结束，并请求批准进入下一 Stage。

## 回答的问题

- “工作推进到哪里了？”
- “验证是否通过？”
- “这对下一 Stage 有什么影响？”

## 何时编写

一个 Stage 实施并验证后立即编写，且必须在进入下一 Stage 前完成。

## 允许的文件名

`task_{milestone}_{issue_number}_stage{N}.md`

## 使用的模板

`mydocs/_templates/stage_report.md`

## 必需内容

- Stage 目的
- 产出物
- 正文变更范围或无损保留
- 验证结果
- 剩余风险
- 对下一 Stage 的影响
- 审批请求

## 不允许的内容

- 最终报告
- 对验证仍失败的 Stage 作完成声明
- 未经批准修改下一 Stage 实施计划

## 下一次会话 AI 必须恢复的上下文

最后获批的 Stage、剩余风险，以及需要带入下一 Stage 的条件。
