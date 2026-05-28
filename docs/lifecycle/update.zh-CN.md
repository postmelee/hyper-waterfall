# 既有更新 Lifecycle 指南

[English](update.en.md) | [한국어](update.md) | 简体中文

本文档定义已经应用 Hyper-Waterfall 的仓库更新到新的 GitHub Release/tag 时的判断流程和结果格式。

## 入口条件

- 目标仓库存在 `.hyper-waterfall/version.json`。
- 目标 GitHub Release/tag 已确定，或存在候选。
- 可以检查目标 release 的 `templates/manifest.json` 和相关 `docs/migrations/` 文档。
- 如果目标 release 的 `templates/manifest.json` 包含 `localization`，可以检查支持 locale、默认 locale、fallback locale、既有 locale 保留标准。
- 如果当前应用仓库的 `.hyper-waterfall/version.json` 有 top-level `locale` 记录，则读取该值。为兼容旧应用仓库，也可以把 `selectedLocale`、`localization.locale`、`localization.selectedLocale` 作为读取候选。任何记录都没有时，报告为 `unknown`。

## 更新入口流程

1. 检查目标仓库是否存在 `.hyper-waterfall/version.json`，并确认当前 version。
2. 如果有当前 locale 记录，则读取；否则分类为 `unknown`。
3. 检查目标 GitHub Release/tag 的 `templates/manifest.json` 和 `localization` 契约。
4. 检查当前 version 到目标 version 的 `docs/migrations/v{from}-to-v{to}.md`。
5. 基于 manifest diff 和 locale source diff，将项目分类为可自动应用、需要手动确认、冲突可能。
6. 不覆盖用户修改文件，而是整理为 Hyper-Waterfall version update PR 候选。
7. 任务指示者批准后，在单独 Issue 和 branch 中进行更新。

## 分类标准

- 可自动应用：previous manifest checksum 与目标文件一致，update policy 允许自动反映，既有选择 locale source 在目标 release 中存在，并且不需要 fallback
- 需要手动确认：update policy 是 `merge`、`manual`、`preserve`，或可能混入项目特定运营规则，或选择 locale source 缺失需要提出 fallback 候选，或存在 locale 切换请求
- conflict：目标仓库修改和目标 release 修改可能触及同一文件或同一 link path，或选择 locale 与 fallback locale source 混合导致 semantic drift 风险
- 保留：本次变更不处理，交给单独 Issue、单独 PR 或 maintainer 手动操作

用户修改文件不得放入可自动应用项。判断结果中应把这些文件保留为需要手动确认或 conflict，并写明依据。

如果 `localization.preserveSelectedLocaleOnUpdate` 为 `true`，既有应用仓库 update 默认保留既有 locale。locale 切换不是 update 的副作用，而是任务指示者的明确请求和单独批准项。

## 既有更新判断结果格式

既有应用仓库更新在文件变更前先提出以下判断结果，只在批准范围内通过单独 Issue 和 branch 进行。

- 目标仓库：要更新的仓库根目录和 base branch
- 当前 version：目标仓库 `.hyper-waterfall/version.json` 中记录的 version、release、appliedAt
- 当前 locale：`.hyper-waterfall/version.json` 的 top-level `locale` 值，或兼容字段中读取的值；无记录时的 `unknown` 和确认依据
- 目标 release/tag：要应用的 Hyper-Waterfall GitHub Release 或 tag
- 目标 release locale 支持：`supportedLocales`、`defaultLocale`、`fallbackLocale`、`availability.status`、是否保留既有 locale
- migration guide：当前 version 到目标 version 迁移时要读取的 `docs/migrations/v{from}-to-v{to}.md`
- manifest diff：当前应用基准与目标 release manifest 之间的新增、修改、删除、symlink 差异摘要
- locale manifest diff：既有 locale source 是否存在、选择 locale source 是否变化、缺失文件或 directory、fallback 候选、混合 locale 风险
- locale 保留/切换判断：是否保留既有 locale、任务指示者是否请求 locale 切换、切换时是否需要单独批准
- 可自动应用：checksum 一致、无用户修改、update policy 允许自动反映
- 需要手动确认：update policy 是 `merge`、`manual`、`preserve`，或需要用户判断
- conflict：目标仓库修改与目标 release 修改可能冲突，因此不能直接覆盖
- Hyper-Waterfall version update PR 候选：批准后用单独 PR 处理的变更包、验证项、剩余风险
- 任务指示者批准请求：自动应用、手动确认、conflict 处理、是否创建 Hyper-Waterfall version update PR

## CLI 输出契约

即使 CLI 输出 `update` 或 `doctor` 结果，该结果也是文件变更前的判断报告。输出项必须包含当前 version、当前 locale、请求 locale 或切换请求、目标 release/tag、目标 release locale 支持、migration guide、manifest diff、locale manifest diff、可自动应用、需要手动确认、conflict、保留、验证、批准请求。

批准前不要实际应用 manifest diff 中包含的文件。

## 相关文档

- `docs/agent-entrypoint.zh-CN.md`: lifecycle 入口。
- `docs/lifecycle/update_pr.zh-CN.md`: 将已批准 update 候选转换为 PR 的标准。
- `docs/migrations/README.md`: migration guide 编写规则。
- `templates/locales/zh-CN/mydocs/manual/release_update_protocol.md`: release/tag 和 update protocol。
