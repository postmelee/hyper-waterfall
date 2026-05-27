# 外部 PR Review 模板

此中央模板用于 `mydocs/pr/pr_{number}_review.md`。它记录外部贡献者 PR 的初步判断、影响范围、验证计划和建议，并请求批准 review 方向。

## 用法

- 实际文件：`mydocs/pr/pr_{number}_review.md`
- 何时编写：检查外部贡献者 PR metadata 和 diff 后立即编写
- 编写语言：使用此仓库选择的 Hyper-Waterfall locale。

## PR 信息

- PR: #{number}
- Title: {PR title}
- Author: {author}
- base/head: `{base}` <- `{head}`
- head repository: `{fork or same repo}`
- State: {OPEN/MERGED/CLOSED}
- Linked Issue: {link if any, otherwise none}

## 变更摘要

- {core changes in the PR}

## 影响范围和兼容性

| Area | Impact | Compatibility Judgment |
|---|---|---|
| {area} | {impact} | {compatible/caution/risk} |

## 代码/文档 Review 发现

- {main findings discovered during review}

## 验证计划

```bash
{required verification command}
```

- {manual check item}

## 建议

Recommendation: {merge / request changes / close}

Rationale:

- {judgment rationale}

## 给任务请求者的审批请求

- 如果同意以上 review 方向和建议，则进入验证或 GitHub PR comment 草拟。
