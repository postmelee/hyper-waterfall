# 新应用 Lifecycle 指南

[English](adoption.en.md) | [한국어](adoption.md) | 简体中文

本文档定义第一次把 Hyper-Waterfall 方法论应用到目标仓库时的范围、流程和判断结果格式。AI 编码工具的第一个入口是 `docs/agent-entrypoint.zh-CN.md`。

## 原则

- 新应用先读取 `templates/manifest.json`，并按 manifest 定义的目标文件和符号链接执行。
- 不重写、摘要或重新解释文档。
- 只替换仓库特定 placeholder。
- 保留有意保持模糊的表达。
- 如果目标文件已经存在，覆盖前必须询问任务指示者。
- 即使 manifest 的 update policy 是 `overwrite`，也必须先检查 checksum 或 diff，不能直接覆盖可能包含用户修改的文件。
- 新应用的默认 locale 遵循 `templates/manifest.json` 的 `localization.defaultLocale`。
- 如果任务指示者明确指定语言或 locale，文件变更前必须检查 `localization.supportedLocales` 和各 entry 的 `files[].localization.sourcePattern` 是否存在。
- 如果选择的 locale source 缺失，不要静默成功；必须根据 manifest 的 `localization.missingLocalePolicy` 和各 entry 的 `fallbackLocale` 报告 fallback 候选和缺失项。
- 批准的选择 locale 会记录到 `.hyper-waterfall/version.json` 的 top-level `locale` 字段。

## 新应用流程

1. 确认目标仓库根目录。
2. 检查 `templates/manifest.json`。
3. 检查 `localization.defaultLocale`、`supportedLocales`、`fallbackLocale`、`missingLocalePolicy`。
4. 如果任务指示者请求了 locale，将其记录为选择 locale；否则把默认 locale 作为选择候选提出。
5. 对 `files[].localization.enabled: true` 的 entry，检查选择 locale 的 `sourcePattern` 是否存在，以及 fallback 候选是否存在。
6. 对 `files[].localization.enabled: false` 或没有 localization 字段的 entry，将 manifest 的默认 `source` 分类为应用候选。
7. 如果存在 locale 缺失、directory 部分缺失、fallback 候选，则在判断结果中报告并获得任务指示者批准。
8. 按批准的 source 复制 `templates/AGENTS.md`、`templates/CLAUDE.md` 或 locale pack 中的对应文件。
9. 按批准的 source 复制 `templates/.github/ISSUE_TEMPLATE/task.yml`、`templates/.github/pull_request_template.md` 或 locale pack 中的对应文件。
10. 按批准的 source 复制 `templates/mydocs/` 或 locale pack 中的对应 directory。
11. 创建 `.agents/skills -> ../mydocs/skills` 符号链接。
12. 创建 `.claude/skills -> ../mydocs/skills` 符号链接。
13. 创建 `.hyper-waterfall/version.json`，记录 `frameworkVersion`、`releaseTag`、`locale`、`installedAt`、`updatedAt`。
14. 替换 placeholder。
15. 目标项目特有规则只追加到 `AGENTS.md` 的指定 section。
16. 用 `git diff` 确认变更后向任务指示者报告。

## 范围限制

新应用使用 adoption-only strict manifest 模式。它只安装 Hyper-Waterfall 运营文件和工作记忆结构。允许的目标是 manifest `files[]` 的 target、`.hyper-waterfall/version.json`、manifest 定义的 symlink。

新应用期间，不要创建或修改该范围外的文件或目录。

禁止创建/修改的示例：

- `docs/**`
- `src/**`
- `examples/**`
- `schemas/**`
- `package.json`
- `tsconfig.json`

这些是 manifest 外路径示例，并不定义目标仓库的一般文档结构、正式文档根目录名称或产品文档位置。

即使看起来需要产品代码、产品文档、架构文档、路线图、API 契约、示例、schema，也不要在新应用期间创建文件。只能在判断结果中记录为保留项或单独 task 候选。

如果看起来需要正式文档根目录，新应用判断结果中不要确定位置。留下“需要正式文档根目录选择和文档位置判断”之类的单独 task 候选；之后在执行计划书中批准目标读者、正式化级别、选择路径、替代路径、选择理由。

## 新应用判断结果格式

复制文件或创建符号链接前，先向任务指示者提出以下判断结果并获得批准。

- 目标仓库：要应用 Hyper-Waterfall 的仓库根目录和 base branch
- 目标 release/tag：要应用的 Hyper-Waterfall GitHub Release 或 tag
- 选择 locale：任务指示者请求 locale 或 manifest 默认 locale，是否包含在 `supportedLocales`，`defaultLocale`，`fallbackLocale`
- locale source 候选：选择 locale 的 `sourcePattern` 是否存在、缺失文件或 directory、fallback 候选、directory 部分缺失导致的混合 locale 风险
- manifest 基准应用候选：按 `templates/manifest.json` 要 copy、preserve、symlink 的文件和目录
- locale 应用候选：locale-enabled entry 使用的选择 locale source 或 fallback 候选，非 locale entry 使用的默认 source
- manifest 外保留候选：新应用期间不创建的目标项目特有产出物，以及是否需要单独 task
- 正式文档根目录保留：不确定 `docs/`、`specs/`、`site/`、`website/`、`adr/` 等候选，说明需要在单独 task 中进行文档位置判断
- 既有文件冲突可能性：目标仓库中已经存在的文件、可能包含用户修改的文件、禁止覆盖项
- `.hyper-waterfall/version.json` 创建计划：要记录的 version、release、selected locale、source、installedAt、updatedAt 信息
- locale 保存计划：批准的选择 locale 会记录到 `.hyper-waterfall/version.json` 的 top-level `locale` 字段
- placeholder checklist：`{REPO_SLUG}`、`{REPO_NAME}`、`{BASE_BRANCH}`、`{RELEASE_BRANCH}`、`{PR_TEMPLATE_PATH}` 等替换目标和保留目标
- 任务指示者批准请求：立即应用的项目、保留的项目、拆分为单独 Issue 的项目

## 相关文档

- `docs/agent-entrypoint.zh-CN.md`: lifecycle 入口。
- `docs/localization.md`: 多语言政策和 locale pack 契约。
- `templates/manifest.json`: 新应用文件列表和 update policy。
- `templates/locales/zh-CN/mydocs/manual/document_structure_guide.md`: 正式文档根目录和 `mydocs/` 边界。
- `templates/locales/zh-CN/mydocs/manual/framework_lifecycle_guide.md`: lifecycle 判断后转换为普通 task 的标准。
