# 反馈模板

此中央模板用于在 `mydocs/feedback/` 中记录任务请求者反馈、code review 评论和返工指示。反馈文档保留 AI 在下一次修订中不得遗漏的判断和请求。它们不替代长期技术笔记或故障排查记录。

## 用法

- 实际文件：`mydocs/feedback/{yyyymmdd}_{topic}.md` 或 `mydocs/feedback/task_{milestone}_{issue}_feedback.md`
- 何时编写：Stage 审批被拒、收到 PR review、任务请求者要求返工，或设计方向变化时
- 编写语言：使用此仓库选择的 Hyper-Waterfall locale。

## 目标

- Related Issue: #{issue}
- Related Stage: {stage or not applicable}
- Related PR: #{pr or not applicable}
- Author: {task requester or reviewer}
- Date: YYYY-MM-DD

## 反馈摘要

{Summarize the requested change in 1-3 sentences.}

## 详细反馈

| Location | Content | Expected Result |
|---|---|---|
| `{file or document section}` | {problem or request} | {how it should change} |

## 优先级

- must-fix: {must be reflected}
- should-fix: {should be reflected if possible}
- note: {reference note}

## 验收标准

- {criteria for considering the revision complete}
- {verification command or check method}

## 后续检查

- {what the task requester should review again}
