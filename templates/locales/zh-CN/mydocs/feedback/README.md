# `feedback/` 文件夹规则

## 目的

保留任务请求者和 reviewer 对 AI 输出提出的修正。

## 回答的问题

- “哪里不对？”
- “人类补充了什么领域判断？”

## 何时编写

当 Stage 审批被拒、收到 PR review、请求返工，或设计方向变化时。

## 允许的文件名

- `{yyyymmdd}_{topic}.md`
- `task_{milestone}_{issue_number}_feedback.md`

## 使用的模板

`mydocs/_templates/feedback.md`

## 必需内容

- 目标 Issue、Stage 和 PR
- 反馈摘要
- 详细反馈
- 优先级
- 验收标准
- 后续检查

## 不允许的内容

- AI 自行创建的自我评价
- 完整技术调查
- 完整故障排查解决历史

## 下一次会话 AI 必须恢复的上下文

必须反映的人类修正和标准。
