# Framework Lifecycle 工作指南

本文档定义在新仓库安装 Hyper-Waterfall，或将已采用仓库更新到新版本时的判断标准，以及转入普通 task flow 的规则。一般功能 task 的 Stage 遵循 `task_workflow_guide.md`。

## 适用时机

- 目标仓库首次采用 Hyper-Waterfall
- 已采用的仓库更新到新的 GitHub Release/tag
- npm CLI、plugin 或 Agent prompt 输出 lifecycle 判断结果，并转入实际文件变更时
- Hyper-Waterfall version update PR candidate 必须作为普通 task 跟踪时

## Core Skill 边界

这里的 core Skills 指 task workflow 节点使用的 Skills：Issue、branch、plan、stage report、final report、PR publication 和 post-merge cleanup。

Installation/update lifecycle 不新增 core Skills。先基于 `docs/agent-entrypoint.md`、release manifest、version record 和 migration guide 进行判断。实际变更随后通过普通 task flow 执行。

## 判断来源文档

| Work | Source Documents |
|---|---|
| New adoption | `docs/agent-entrypoint.md`, `docs/lifecycle/adoption.md`, `templates/manifest.json` |
| Existing update | `docs/agent-entrypoint.md`, `docs/lifecycle/update.md`, `.hyper-waterfall/version.json`, target release manifest, `docs/migrations/` |
| Update PR transition | `docs/lifecycle/update_pr.md`, `.github/pull_request_template.md` |
| Release/tag protocol | `release_update_protocol.md` |

## 文件变更前的判断

Lifecycle 判断结果是文件变更前的报告。对于新采用和现有更新，都先向任务请求者展示以下信息并获得批准。

- Target repository
- Target release/tag
- Current version for existing updates
- Current locale for existing updates
- Target release locale support
- Manifest diff
- Locale manifest diff
- Locale preserve/switch judgment
- Automatically applicable items
- Items requiring manual review
- Conflict items
- Hyper-Waterfall version update PR candidate
- Approval request

如果检测到用户已修改的文件，不要立即覆盖。使用 manifest 和 migration guide 将项目分类为自动可应用、需要手动 review 或 conflict，然后获得任务请求者批准。

## 转入普通 Task Flow

判断结果获批后，转入普通 task flow。

1. 如果还没有 Issue，先用 `task-register` 注册 lifecycle application Issue。
2. 如果已经有 Issue，运行 `task-start` 创建 branch、daily task board row 和任务计划书。
3. 如果有多个 Hyper-Waterfall version update PR candidates，根据任务请求者批准拆分 Issues 或 Stages。
4. 批准前，不要把 manifest diff 中的文件应用到目标仓库。

## Hyper-Waterfall Version Update PR 命名

- Work branch: `local/task{issue_number}`
- PR publication branch: `publish/task{issue_number}`
- Commit message: `Task #{issue_number}: Hyper-Waterfall {fromVersion} -> {toVersion} version update`
- Stage commit: `Task #{issue_number} Stage {N}: Hyper-Waterfall version update {summary}`
- PR title: `Task #{issue_number}: Hyper-Waterfall {fromVersion} -> {toVersion} version update`

Hyper-Waterfall version update PR 不同于 release PR。Release PR 将 framework repository 变更从 `{BASE_BRANCH}` 提升到 `{RELEASE_BRANCH}` 并创建 tag baseline。Hyper-Waterfall version update PR review 已采用仓库为跟随该 release/tag 所需的变更。

Hyper-Waterfall version update PR 使用与普通 task PR 相同的 approval gates、task plans、stage reports 和 final reports。

## README 和 CLI 边界

README 只应包含用户可复制的短入口指南，例如新采用 prompt 或已确认的 update prompt/CLI command。详细 lifecycle 判断标准属于 `docs/agent-entrypoint.md`、`docs/lifecycle/` 和 `docs/migrations/`。

即使 CLI 输出 `update` 或 `doctor` 结果，该结果也是变更前判断报告。CLI 输出必须包含 current version、current locale、target release/tag、target release locale support、migration guide、manifest diff、locale manifest diff、automatically applicable items、items requiring manual review、conflicts、deferred items、verification 和 approval request。批准前不要把文件应用到目标仓库。

## 相关文档

- `docs/agent-entrypoint.md`：AI coding tools 的第一入口。
- `docs/lifecycle/adoption.md`：新采用流程和判断结果格式。
- `docs/lifecycle/update.md`：已采用仓库的更新判断。
- `docs/lifecycle/update_pr.md`：把更新判断结果转成 PR 的标准。
- `release_update_protocol.md`：release/tag 和 update protocol。
- `task_workflow_guide.md`：批准后的普通 task 流程。
