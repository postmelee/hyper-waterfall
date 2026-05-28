# Hyper-Waterfall Version Update PR 指南

[English](update_pr.en.md) | [한국어](update_pr.md) | 简体中文

本文档定义从既有更新判断结果中，将已批准变更候选转换为 Hyper-Waterfall version update PR 时的条件、命名规则和 PR 正文结构。

## 创建条件

只有在以下信息已经提出，并且任务指示者批准创建 PR 时，才转换为 Hyper-Waterfall version update PR。

- 当前 version
- 目标 release/tag
- 当前 locale
- 请求 locale 或 locale 切换请求
- 目标 release locale 支持
- migration guide
- manifest diff
- locale manifest diff
- locale 保留/切换判断
- 可自动应用项
- 需要手动确认项
- conflict 项

批准前不要实际应用 manifest diff 中包含的文件。

## 转换为普通 task 流程

- Issue：每个更新变更包创建一个 GitHub Issue。已有 Issue 时使用该 Issue number。
- 工作 branch：`local/task{issue_number}`
- PR 发布 branch：`publish/task{issue_number}`
- Commit message：`Task #{issue_number}: Hyper-Waterfall {fromVersion} -> {toVersion} version update`；如果是阶段工作，则使用 `Task #{issue_number} Stage {N}: Hyper-Waterfall version update {content}`
- PR title：`Task #{issue_number}: Hyper-Waterfall {fromVersion} -> {toVersion} version update`
- PR base：应用仓库的 `{BASE_BRANCH}`
- PR body：包含 manifest diff、migration guide 摘要、可自动应用项、需要手动确认项、conflict 项、验证结果、验证限制。

Hyper-Waterfall version update PR 与 release PR 或普通 feature task PR 的目的不同，但追踪单位同样是 GitHub Issue 和 Hyper-Waterfall 文档产出物。不要创建例外 branch 体系，继续使用 `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` 流程。

## PR 正文结构

Hyper-Waterfall version update PR 使用既有 `.github/pull_request_template.md`。不创建单独模板，而是把下面项目填入既有 section。

| PR 正文 section | 必须包含的内容 |
|---|---|
| `Summary` | 当前 version、当前 locale、请求 locale 或 locale 切换请求、目标 release/tag、目标 release locale 支持、migration guide、review point |
| `Changes` | manifest diff 和 locale manifest diff 摘要。区分新增、修改、删除、symlink、preserve、fallback 候选、locale 保留/切换候选 |
| `Impact area` | `AGENTS.md`、`CLAUDE.md`、`.github/`、`mydocs/manual/`、`mydocs/skills/`、`.hyper-waterfall/version.json` 等影响区域 |
| `Verification` | manifest parsing、version 记录和 `locale` 字段确认、目标 release locale 支持确认、migration guide 必填 section 确认、用户修改冲突确认 |
| `Verification limits` | 无法自动判断的用户修改、需要手动 review 的文件、既有 version state 没有 locale 记录而判断为 `unknown` 的情况、未运行远程 CI 的理由 |
| `Remaining risk` | conflict、fallback 候选、保留项、应用仓库 maintainer 必须直接决定的项目 |

## 变更分类标准

- 可自动应用：previous manifest checksum 与目标文件一致，update policy 允许自动反映，既有选择 locale source 在目标 release 中存在，并且不需要 fallback
- 需要手动确认：update policy 是 `merge`、`manual`、`preserve`，或可能混入项目特定运营规则，或选择 locale source 缺失需要提出 fallback 候选，或存在 locale 切换请求
- conflict：目标仓库修改和目标 release 修改可能触及同一文件或同一 link path，或选择 locale 与 fallback locale source 混合导致 semantic drift 风险
- 保留：本 PR 不处理，交给单独 Issue、单独 PR 或 maintainer 手动操作

用户修改文件不得放入可自动应用项。PR 正文中应把这些文件保留为需要手动确认或 conflict，并在验证限制和剩余风险中写明判断依据。

如果 `localization.preserveSelectedLocaleOnUpdate` 为 `true`，PR 默认说明保留既有 locale。locale 切换不是 update 的副作用，而是任务指示者明确批准的项目。

## 相关文档

- `docs/lifecycle/update.zh-CN.md`: 既有更新判断结果格式。
- `templates/locales/zh-CN/mydocs/manual/framework_lifecycle_guide.md`: 将判断结果转换为普通 task 的标准。
- `templates/locales/zh-CN/mydocs/manual/release_update_protocol.md`: release/tag 和 update protocol。
- `templates/locales/zh-CN/mydocs/manual/internal_pr_guide.md`: 内部 task PR 正文编写原则。
- `templates/locales/zh-CN/mydocs/manual/pr_command_guide.md`: PR 创建命令和文档链接规则。
