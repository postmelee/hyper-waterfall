# PR 流程指南

## 目的

本文档是 `{REPO_NAME}` 仓库中查找 PR 流程的入口。内部 task PR 写作、PR 创建命令和外部贡献者 PR review 各自遵循独立的详细文档。

Branch flow 和 merge strategy 遵循 [`git_workflow_guide.md`](git_workflow_guide.md)。

## 范围

- 内部 task PR body 写作指南
- PR 创建命令和文档链接规则指南
- 外部贡献者 PR review 指南
- Review 完成后的归档位置

## 基本原则

- 内部 task PR body 遵循 `{PR_TEMPLATE_PATH}`。
- 内部 task PR body 是最终报告的短压缩版本。
- PR body 只包含实际执行过的验证，并使用结果摘要和证据，而不是命令列表。
- 当前 PR 直接执行的 Issue 写在 `Target task`。
- `Related Issues` 用于理解 PR 所需的上下文，例如 prerequisite、follow-up、Epic、upstream reference 或 reference Issues/PRs。
- 外部贡献者 PR 同时 review 代码和文档变更。
- 外部 PR review 结果通过 `mydocs/pr/` 文档流管理。
- Review 文档必须可复现，并包含验证命令/结果。

## 详细文档

| Topic | Document | When to Use |
|---|---|---|
| Internal task PR body writing | [`internal_pr_guide.md`](internal_pr_guide.md) | 在 `task-final-report` 后，向 `{BASE_BRANCH}` 写 Open PR body 时 |
| PR creation commands and document links | [`pr_command_guide.md`](pr_command_guide.md) | push `publish/task{number}`、运行 `gh pr create` 或创建 PR 文档链接时 |
| External contributor PR review | [`external_pr_review_guide.md`](external_pr_review_guide.md) | review 外部贡献者 fork PR 并留下 `mydocs/pr/` 记录时 |

## 内部 Task 与外部 PR 的边界

- 内部 task PR 通过 GitHub Issue、`local/task{number}`、任务计划书、实施计划书、Stage reports 和最终报告处理。
- 外部贡献者 PR 不强制使用内部 task 文档格式。它们使用 `mydocs/pr/` 流：`pr_{number}_review.md`、`pr_{number}_review_impl.md` 和 `pr_{number}_report.md`。
- 如果外部 PR review 期间需要内部 follow-up 变更，创建单独的 GitHub Issue，并拆分为内部 task。

## Merge 前后检查

内部 task PR 的 merge 前/后 cleanup 遵循 [`task-final-report`](../skills/task-final-report/SKILL.md)、[`pr-merge-cleanup`](../skills/pr-merge-cleanup/SKILL.md) 和 [`pr_command_guide.md`](pr_command_guide.md)。

外部 PR review、最终建议和 archive flow 遵循 [`external_pr_review_guide.md`](external_pr_review_guide.md) 和 [`external-pr-review`](../skills/external-pr-review/SKILL.md)。

## 相关 Manual

- [`git_workflow_guide.md`](git_workflow_guide.md)：branch flow 和 merge strategy。
- [`task_workflow_guide.md`](task_workflow_guide.md)：内部 task plan、implementation、stage report 和 final report flow。
- [`document_structure_guide.md`](document_structure_guide.md)：`mydocs/pr/`、`working/` 和 `report/` 文件夹边界。
