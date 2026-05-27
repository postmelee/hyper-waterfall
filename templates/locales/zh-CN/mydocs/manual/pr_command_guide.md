# PR 创建命令和链接指南

## 目的

本文档定义内部 task PR 使用的 `publish/task{number}` push、`gh pr create` 命令，以及 PR body 文档链接规则。

内部 task PR body 结构遵循 [`internal_pr_guide.md`](internal_pr_guide.md)。

## PR 创建命令

push `publish/task{number}` 到远程后，创建基础 PR。

```bash
git checkout local/task24
git push origin local/task24:publish/task24
gh pr create \
  --base {BASE_BRANCH} \
  --head publish/task24 \
  --title "Task #24: standardize PR template and PR creation rules" \
  --template {PR_TEMPLATE_PATH}
```

只把 `--template` 用作 PR body 的起点。

当 PR body 已基于最终报告和 Stage reports 完成时，优先使用 `--body-file`。

```bash
gh pr create \
  --base {BASE_BRANCH} \
  --head publish/task24 \
  --title "Task #24: standardize PR template and PR creation rules" \
  --body-file /tmp/task24-pr-body.md
```

运行标准：

- Starting from the template: `--template {PR_TEMPLATE_PATH}`
- Finalized from reports: prefer `--body-file <written PR body file>`
- 不要默认使用 `--fill`，因为它只根据 commit messages 生成 body。
- 避免把长 body 直接放进 `--body`；这样更难复用和 review。

## PR Body 文档链接规则

在 PR body 中链接计划、Stage reports、最终报告或 troubleshooting 文档时，优先使用固定到 commit SHA 的 GitHub blob URL，这样 merge 后仍然有效。

创建 PR 前，用 `git rev-parse HEAD` 获取 PR head commit SHA。

```text
https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/...
```

这样在 `publish/task{number}` branch 删除后，链接仍然有效。

## 工作文档链接格式

在 `Changes` 中，将工作文档链接写成 `[filename](URL)`，不要写 raw URL。

```md
- Task plan: [task_m010_61.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m010_61.md)
- Implementation plan: [task_m010_61_impl.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m010_61_impl.md)
- Final report: [task_m010_61_report.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/report/task_m010_61_report.md)
```

在 Stage summaries 中，将 Stage title 链接到 stage report，并将旁边的短 commit SHA 链接到 commit URL。

```md
- **[Stage 1](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/working/task_m010_61_stage1.md)** ([abc1234](https://github.com/{REPO_SLUG}/commit/{stage1_sha})): {Stage 1 one-line summary}
```

## 禁止事项

- PR bodies 中使用相对链接
- `blob/publish/task{number}/...` 链接
- 将 raw URL 作为文档链接暴露
- 默认使用 `--fill` 创建 PR body

这些模式会降低可读性，并使 merge 后链接更难使用。
