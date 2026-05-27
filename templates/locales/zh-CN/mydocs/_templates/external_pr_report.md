# 外部 PR 最终报告模板

此中央模板用于 `mydocs/pr/pr_{number}_report.md`。它记录外部 PR review 的最终判断、验证结果，以及 GitHub PR comment 或 review 正文。

## 用法

- 实际文件：`mydocs/pr/pr_{number}_report.md`
- 何时编写：外部 PR review 和必要验证完成后、向 GitHub 发布 comment/review 之前
- 编写语言：使用此仓库选择的 Hyper-Waterfall locale。

## Review 结果摘要

- PR: #{number}
- Final recommendation: {merge / request changes / close}
- Key reason: {one-line summary}

## 验证结果

执行命令：

```bash
{verification command}
```

结果：

- {OK/MISS and key output summary}

## 关键发现

| Category | Finding | Handling |
|---|---|---|
| {bug/risk/doc/note} | {finding} | {fix before merge/follow-up/reference} |

## 最终建议

说明 merge、request changes 或 close 之一，并解释原因。

## GitHub PR Comment Body

```md
{comment or review body to post on the GitHub PR}
```

## 给任务请求者的审批请求

- 如果批准以上建议和 GitHub PR comment body，则发布到 PR。
