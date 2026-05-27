# `report/` 文件夹规则

## 目的

关闭并保留一个 task 的完整计划-实施-验证周期。

## 回答的问题

- “结果是什么？”
- “验收标准是否满足？”
- “还剩什么？”

## 何时编写

所有 Stage 和集成验证完成后、PR 发布前。

## 允许的文件名

`task_{milestone}_{issue_number}_report.md`

## 使用的模板

`mydocs/_templates/final_report.md`

## 必需内容

- 工作摘要
- 变更文件列表和影响范围
- 前后对比
- 验证结果
- 剩余风险和后续工作
- 审批请求

## 不允许的内容

- 进行中的 Stage report
- 对未验证结果的完成声明
- 只包含简短 PR review body 的文档

## 下一次会话 AI 必须恢复的上下文

最终 task 状态、merge 前验证证据和后续候选。
