# 外部贡献者 PR Review 指南

## 目的

本文档定义外部贡献者 PR review 流程和 `mydocs/pr/` 记录流。不要把此流程应用到内部 task PR。

可执行的外部 PR review 流程使用 [`external-pr-review`](../skills/external-pr-review/SKILL.md) Skill。

## 基本原则

- 同时 review 外部贡献者 PR 中的代码变更和文档变更。
- 通过 `mydocs/pr/` 文档流管理外部 PR review 结果。
- Review 文档必须可复现，并包含实际运行的验证命令/结果。
- 外部贡献者 PR 与内部 task 不同，因此使用独立流程和文件夹。
- 外部 PR review 记录保留在 `mydocs/pr/`。

## 文档流

外部 PR 通过 `mydocs/pr/` 文档流处理。

- Review document: `pr_{number}_review.md`
- Implementation plan: 需要时使用 `pr_{number}_review_impl.md`
- Final report: `pr_{number}_report.md`

将已完成文档移动到 `mydocs/pr/archives/`。

## 流程

1. 检查 PR metadata：base/head、mergeability、CI、linked Issue。
2. 检查代码和文档变更范围。
3. 运行必要验证。
4. 在 `pr_{number}_review.md` 中记录关键风险和变更请求。
5. 需要时，在 `pr_{number}_review_impl.md` 中记录 re-review 或辅助验证计划。
6. 在 `pr_{number}_report.md` 中记录最终判断。
7. 将完成的文档移动到 `mydocs/pr/archives/`。

## Merge 前检查

- PR target branch 符合 policy。
- Review comments 分为已解决项和未解决项。
- 已运行必要验证。
- 已记录批准、暂停或拒绝的依据。

## Merge 后检查

- 检查相关 Issue 状态，包括 auto-close 或 manual close。
- 确认 merged remote branches 已删除。
- 清理下一项 task 不再需要的本地 worktree、build artifact 和 installation smoke test artifact。
- 需要后续工作时创建新的 Issue。
- 将 review 文档移动到 `mydocs/pr/archives/`。

## 与内部 Task 的边界

不要把内部 task 的 `plan -> implementation -> stage report -> final report` 流程直接应用到外部贡献者 PR review。

如果需要内部 follow-up 变更，在外部 PR review 文档中记录依据，创建单独的 GitHub Issue，并按内部 task 执行。
