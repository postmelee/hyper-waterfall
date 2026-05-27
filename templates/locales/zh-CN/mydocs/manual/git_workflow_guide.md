# Git Workflow Manual

本文档定义本仓库的 branch policy、Git workflow diagram，以及 maintainer/contributor workflow scripts。创建 task branch、发布 PR、merge 或 cleanup 前都要阅读它。文档文件位置和 task 审批流程由 `document_structure_guide.md` 和 `task_workflow_guide.md` 说明。

## 核心术语

- **`{BASE_BRANCH}`**：工作 PR merge 的开发集成 branch。新 work branch 从最新 `origin/{BASE_BRANCH}` 开始。
- **`local/taskN`**：Issue N 的本地 work branch。Stage commits 和 report commits 累积在这里。
- **`publish/taskN`**：用于发布 `local/taskN` 的远程 PR branch。PR merge 后删除。
- **Open PR**：Hyper-Waterfall 最终报告后，对 `{BASE_BRANCH}` 创建的可 review PR。
- **Separate worktree**：当 main worktree 被另一个 task 占用时，用于在另一个 branch 上工作的独立目录。
- **GitHub Release/tag**：Hyper-Waterfall 的规范分发单位。见 [`release_update_protocol.md`](release_update_protocol.md)。
- **Hyper-Waterfall version update PR**：由 Issue 跟踪的 PR，用于将已采用仓库更新到新的 Hyper-Waterfall release/tag。见 [`release_update_protocol.md`](release_update_protocol.md) 和 `docs/lifecycle/update_pr.md`。

## Branch 管理

| Branch | Purpose |
|--------|---------|
| `{RELEASE_BRANCH}` | 最终 release branch。稳定版本由 v0.5.0 等 tag 保留 |
| `{BASE_BRANCH}` | 开发集成 |
| `local/task{num}` | 每个 task 的 work branch |
| `publish/task{num}` | 面向 `{BASE_BRANCH}` PR 的远程 publication branch。PR merge 后删除 |

## Git Workflow

```text
local/task{N} -- commit · commit · commit --> push publish/task{N}
                                            |
                                            +--> PR to {BASE_BRANCH} -> review -> merge
                                                                            |
                                                                            +--> accumulates on {BASE_BRANCH}
                                                                                   |
                                                                                   +--> PR to {RELEASE_BRANCH} at release time -> tag
```

并行 task 以独立 `local/task{N}` branch 重复同一 flow。

- **Task branch**：在 `local/task{N}` 上以小单元 commit。
- **Remote publication branch**：当 `local/task{N}` 可 review 时，将其 push 为 `publish/task{N}`，并创建面向 `{BASE_BRANCH}` 的 PR。
- **Remote push**：默认保持 `local/task` branch 为本地 branch。不要直接 push 它们。远程 branch 应是 `publish/task{N}` 和 merged result branches。
- **PR to `{BASE_BRANCH}`**：task PR 默认创建为 Open PR，PR body 反映最终报告和验证结果。
- **Merge strategy**：默认保留 PR to `{BASE_BRANCH}` 的 merge commit 或 no-ff 行为。不要把 squash merge 设为默认，因为它可能抹掉 Stage commit 的意义。
- **Merge to `{RELEASE_BRANCH}` by PR**：release 时创建 `{BASE_BRANCH}` -> `{RELEASE_BRANCH}` PR，review/approve、merge，然后 tag。

## PR 类型分离

普通 task PR 和 release PR 分开。Task PR 遵循 `local/taskN -> publish/taskN -> {BASE_BRANCH}`。Release PR 遵循 `{BASE_BRANCH} -> {RELEASE_BRANCH}`。已采用仓库的 update 在 release 后作为独立 Hyper-Waterfall version update PR 执行。

| Type | Purpose | Branch Flow | PR Title |
|---|---|---|---|
| task PR | 按 Issue 应用仓库功能、文档或运营工作 | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: {task title}` |
| release PR | 将累积的 framework 变更从 `{BASE_BRANCH}` 提升到 `{RELEASE_BRANCH}` 并建立 tag baseline | `{BASE_BRANCH}` -> `{RELEASE_BRANCH}` | `Release: {version}` |
| Hyper-Waterfall version update PR | 将已采用仓库从当前版本更新到目标 release/tag | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: Hyper-Waterfall {fromVersion} -> {toVersion} version update` |

## Maintainer Workflow

```bash
# 1. Push local/taskN to publish/taskN and create an Open PR to {BASE_BRANCH}
git checkout local/task17
git push origin local/task17:publish/task17
gh pr create --base {BASE_BRANCH} --head publish/task17 --title "Task #17: title" --body-file /tmp/task17-pr-body.md

# 2. Review and merge PR to {BASE_BRANCH}
gh pr review --approve
gh pr merge --merge --delete-branch

# 3. Create PR from {BASE_BRANCH} to {RELEASE_BRANCH} at release time
gh pr create --base {RELEASE_BRANCH} --head {BASE_BRANCH} --title "Release: title"
gh pr review --approve
gh pr merge --merge --delete-branch=false

# 4. Check manifest/migration before release tag creation
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
grep -nE 'target version|added files|modified files|manual review|conflict risk|verification' docs/migrations/v{from}-to-v{to}.md
```

## Contributor Workflow (Fork-based)

```bash
# 1. Fork the original repository once on GitHub
# 2. Work in the fork
git clone https://github.com/{contributor}/{REPO_NAME}.git
git checkout -b feature/my-task
# ... work and commit ...
git push origin feature/my-task

# 3. Create a PR to the original repository's {BASE_BRANCH}
gh pr create --repo {REPO_SLUG} --base {BASE_BRANCH} --head {contributor}:feature/my-task --title "title"

# 4. Maintainer reviews and merges
```

## FAQ / 常见错误

### Main worktree 与另一个 Agent 冲突时

先运行 `git status --short --branch` 检查当前 branch 和未提交变更。不要回退其他工作者的变更。优先在 separate worktree 中开始新工作。如果必须触碰与活跃 task 相同的文件，向任务请求者共享冲突范围并决定顺序。

### `{BASE_BRANCH}` 看起来需要 rebase 时

默认 flow 是用 `git pull --ff-only` 更新 `{BASE_BRANCH}`，然后从最新 `origin/{BASE_BRANCH}` 创建新的 `local/taskN`。不要随意 rebase 活跃 work branch。如果出现 PR conflict 或 stale base，先运行 `git fetch origin`，识别冲突文件，并在选择 rebase 或 merge recovery 前获得任务请求者批准。

### Push 了错误 branch 时

如果直接 push 了 `local/taskN` 或远程 branch 名称错误，停止 push。如果还没有 PR，push 正确的 `publish/taskN` branch，并在任务请求者确认后删除错误远程 branch。如果 PR 已存在，检查 PR base/head 和 diff，再决定创建新 PR 还是修复现有 PR head。

### 向 PR body 添加文档链接时

遵循 [`pr_command_guide.md`](pr_command_guide.md) 中的 PR 创建命令、`--body-file`、SHA-pinned GitHub blob URLs 和工作文档链接格式。本 Git manual 只覆盖 branch flow 和 PR types。

### Merge 后本地 branch 仍存在时

先确认 PR 是 `MERGED`。Merge 后返回 `{BASE_BRANCH}`，更新它，并清理远程 `publish/taskN` 和本地 `local/taskN`。按 [`pr-merge-cleanup`](../skills/pr-merge-cleanup/SKILL.md) SKILL 中记录的顺序执行。

## 相关 Manual

- [`task_workflow_guide.md`](task_workflow_guide.md)：基于 Issue 的 task start、stage approval、final report 和 PR publication。
- [`document_structure_guide.md`](document_structure_guide.md)：plans、stage reports 和 final reports 的文档位置与文件名。
- [`pr_command_guide.md`](pr_command_guide.md)：PR 创建命令和文档链接规则。
- [`pr_process_guide.md`](pr_process_guide.md)：PR handling entrypoint。
- [`release_update_protocol.md`](release_update_protocol.md)：release/tag 和 update protocol。
