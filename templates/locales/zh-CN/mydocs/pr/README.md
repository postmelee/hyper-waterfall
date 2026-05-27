# `pr/` 文件夹规则

## 目的

将外部贡献者 PR review 与内部 task workflow 分开记录。

## 回答的问题

“这个外部 PR 应该 merge、要求修改，还是 close？”

## 何时编写

检查外部 PR metadata 和 diff 后、额外验证前后，以及发布最终 GitHub comment 前。

## 允许的文件名

- `pr_{number}_review.md`
- `pr_{number}_review_impl.md`
- `pr_{number}_report.md`

将已完成的 review 文档移动到 `pr/archives/`。

## 使用的模板

- `mydocs/_templates/external_pr_review.md`
- `mydocs/_templates/external_pr_review_impl.md`
- `mydocs/_templates/external_pr_report.md`

## 必需内容

- PR 信息
- 变更摘要
- 影响范围
- 代码/文档 review 发现
- 验证计划或结果
- 建议
- 给任务请求者的审批请求

## 不允许的内容

- 把内部 task 的 `_stage{N}.md` 或 `_report.md` 格式强行套用到外部 PR
- 未经批准做出 merge 或 close 决定

## 下一次会话 AI 必须恢复的上下文

外部 PR 的当前判断、剩余验证，以及要发布到 GitHub 的 comment 或 review body。
