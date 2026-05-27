# Release 和 Update Protocol 指南

本文档定义 GitHub Release/tag 标准、release PR，以及已采用 Hyper-Waterfall 的仓库使用的 update protocol。一般 task branch 操作遵循 `git_workflow_guide.md`。

## 规范分发基线

Hyper-Waterfall 方法论的规范分发单位是 GitHub Release/tag。merge 到 `{RELEASE_BRANCH}` 的状态由 tag 固定，已采用仓库基于该 release 的 `templates/manifest.json` 和 `docs/migrations/` 更新。

Prompts、npm CLI、plugins 和 Homebrew 只是让 release/tag baseline 更易执行或发现的渠道。它们不替代规范基线。

## Release 就绪检查

Release 前确认：

- `templates/manifest.json` 中的 `frameworkVersion`、`plannedTag` 和 `baselineTag` 与 release 意图一致。
- checksums 可以在 release packaging 期间从 `pending-release` 最终确定。
- `docs/migrations/v{from}-to-v{to}.md` 包含 added files、modified files、manual review、conflict risk 和 verification criteria。
- 已采用仓库中的 `.hyper-waterfall/version.json` 可以记录或保留目标版本和所选 locale。

## PR 类型分离

普通 task PR、release PR 和 Hyper-Waterfall version update PR 目的不同。

| Type | Purpose | Branch Flow | PR Title |
|---|---|---|---|
| task PR | 按 Issue 应用仓库功能、文档或运营工作 | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: {task title}` |
| release PR | 将累积的 framework 变更从 `{BASE_BRANCH}` 提升到 `{RELEASE_BRANCH}` 并建立 tag baseline | `{BASE_BRANCH}` -> `{RELEASE_BRANCH}` | `Release: {version}` |
| Hyper-Waterfall version update PR | 将已采用仓库从当前版本更新到目标 release/tag | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: Hyper-Waterfall {fromVersion} -> {toVersion} version update` |

将普通 task PR 与 release PR 分开。已采用仓库的 update 在 release 之后作为单独的 Hyper-Waterfall version update PR 执行。

## Release PR Flow

Release 时创建 PR，将已验证变更从 `{BASE_BRANCH}` 提升到 `{RELEASE_BRANCH}`。

```bash
gh pr create --base {RELEASE_BRANCH} --head {BASE_BRANCH} --title "Release: {version}"
gh pr review --approve
gh pr merge --merge --delete-branch=false
```

创建 tag 前，再次检查 manifest 和 migration guide。

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
grep -nE 'target version|added files|modified files|manual review|conflict risk|verification' docs/migrations/v{from}-to-v{to}.md
```

实际 tag 创建和 GitHub Release 发布在单独批准的 release Stage 中执行。

## Update Protocol

已采用仓库的 update 比较这些输入：

- 目标仓库中的 `.hyper-waterfall/version.json`
- 目标 GitHub Release/tag 中的 `templates/manifest.json`
- 从当前版本到目标版本的 `docs/migrations/v{from}-to-v{to}.md`
- 目标仓库中的用户修改 diff
- 如果 manifest 提供 `localization`，还包括 `.hyper-waterfall/version.json` 中的 current locale record、requested locale 或 switch request、target release locale support、locale manifest diff 和 locale preserve/switch judgment

先使用 `docs/lifecycle/update.md` 报告判断。批准前不要把 manifest diff 中的文件应用到目标仓库。

## Hyper-Waterfall Version Update PR

Hyper-Waterfall version update PR 使用与普通 task PR 相同的 branch flow。输入和 PR body 不同。

- Input: existing update judgment result, manifest diff, locale manifest diff, locale preserve/switch judgment, migration guide
- Body: 将 `docs/lifecycle/update_pr.md` 反映到 `.github/pull_request_template.md`
- Tracking: GitHub Issue, task plan, implementation plan, stage reports, final report

Commit message 规则：

- Single commit: `Task #{N}: Hyper-Waterfall {fromVersion} -> {toVersion} version update`
- Stage commit: `Task #{N} Stage {S}: Hyper-Waterfall version update {summary}`
- Final report commit: `Task #{N}: final report and daily task board completion`

Hyper-Waterfall version update PR 不使用单独的 branch prefix，因为工作跟踪仍然是 GitHub Issue 加 Hyper-Waterfall artifacts。即使 CLI 或 automation 创建 PR candidate，也必须先输出判断结果，获得已批准的 Issue 编号，然后遵循 `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}`。

## 相关文档

- `git_workflow_guide.md`：branch flow 和 maintainer/contributor Git commands。
- `framework_lifecycle_guide.md`：将 lifecycle 判断转为普通 task 的标准。
- `docs/lifecycle/update.md`：existing update judgment result format。
- `docs/lifecycle/update_pr.md`：update PR body criteria。
- `docs/migrations/README.md`：migration guide writing rules。
