# Hyper-Waterfall Agent Entrypoint

[English](agent-entrypoint.en.md) | [한국어](agent-entrypoint.md) | 简体中文

这是 AI 编码工具在目标仓库中应用或更新 Hyper-Waterfall 方法论时首先读取的入口文档。详细流程分散在 lifecycle 文档和 manual 文档中。

## 原则

- 新应用时，先读取 `templates/manifest.json`，并只按 manifest 定义的目标文件和符号链接执行。
- 更新已应用仓库时，先检查 `.hyper-waterfall/version.json`、目标 GitHub Release/tag、`templates/manifest.json`、`docs/migrations/`，再提出变更候选。
- 不重写、摘要或重新解释 Hyper-Waterfall 文档。
- 只替换仓库特定 placeholder。
- 保留有意保持模糊的表达。
- 如果目标文件已经存在，覆盖前必须询问任务指示者。
- 即使 manifest 的 update policy 是 `overwrite`，也必须先检查 checksum 或 diff，不能直接覆盖可能包含用户修改的文件。
- 新应用使用 adoption-only strict manifest 模式。不要创建或修改 manifest 未定义的文件或目录。
- 产品代码、产品文档、架构文档、路线图、API 契约、示例、schema 等目标项目特有产出物不属于新应用范围，只能报告为保留项或单独 task 候选。
- 新应用期间，不选择或创建目标项目的正式文档根目录。`docs/`、`specs/`、`site/`、`website/`、`adr/` 等路径应在之后的单独 task 中通过文档位置判断选择。

## 先选择流程

| 情况 | 要读取的文档 |
|---|---|
| 第一次把 Hyper-Waterfall 应用到目标仓库 | [`docs/lifecycle/adoption.zh-CN.md`](lifecycle/adoption.zh-CN.md) |
| 将已应用仓库更新到新的 release/tag | [`docs/lifecycle/update.zh-CN.md`](lifecycle/update.zh-CN.md) |
| 将已批准的 update 判断结果转换为 PR | [`docs/lifecycle/update_pr.zh-CN.md`](lifecycle/update_pr.zh-CN.md) |
| 将 lifecycle 判断转换为普通 task workflow | [`templates/locales/zh-CN/mydocs/manual/framework_lifecycle_guide.md`](../templates/locales/zh-CN/mydocs/manual/framework_lifecycle_guide.md) |
| 确认 release/tag 和 update protocol | [`templates/locales/zh-CN/mydocs/manual/release_update_protocol.md`](../templates/locales/zh-CN/mydocs/manual/release_update_protocol.md) |

## 语言和 locale 参考

- 面向用户的 README 入口文档是 `README.md` (`en`)、`README.ko.md` (`ko`)、`README.zh-CN.md` (`zh-CN`)。
- 多语言应用政策遵循 [`docs/localization.md`](localization.md)。
- `templates/manifest.json` 的 top-level `localization` 和各 `files[].localization` 定义新应用和既有更新时的 locale source 选择契约。
- 新应用的选择 locale、默认 locale、fallback 候选、缺失报告遵循 [`docs/lifecycle/adoption.zh-CN.md`](lifecycle/adoption.zh-CN.md) 的判断结果格式。
- 新应用中批准的选择 locale 会记录到 `.hyper-waterfall/version.json` 的 top-level `locale` 字段。
- 既有应用仓库 update 的当前 locale、既有 locale 保留、明确 locale 切换请求、按 locale 的 manifest diff 判断遵循 [`docs/lifecycle/update.zh-CN.md`](lifecycle/update.zh-CN.md)。
- 使用 CLI 时，新应用使用 `hyper-waterfall init --locale <locale> --dry-run`，既有 update 的 locale 切换检查使用 `hyper-waterfall update --locale <locale> --dry-run`。这些命令只输出判断结果；批准前不要应用文件。

## 通用流程

1. 判断是新应用还是既有更新。
2. 读取上表中的详细文档，并先写出判断结果。
3. 文件变更前向任务指示者请求批准。
4. 只应用已批准的范围。
5. 如果实际变更转换为普通 task，则用 GitHub Issue、branch、执行计划书、实现计划书、Stage 报告、最终报告、PR 追踪。

本文档是 Hyper-Waterfall framework lifecycle 的入口点。新应用和既有更新不把发布 lifecycle 混入 core task workflow，而是以 release manifest、version 记录、migration guide 为基准进行判断。

## Placeholder

- `{PROJECT_OVERVIEW}`
- `{PROJECT_SPECIFIC_RULES}`
- `{PROJECT_SPECIFIC_REQUIRED_DOCUMENTS}`
- `{PROJECT_VALIDATION_GUIDE}`
- `{REPO_SLUG}`
- `{REPO_NAME}`
- `{BASE_BRANCH}`
- `{RELEASE_BRANCH}`
- `{PR_TEMPLATE_PATH}`

推荐默认值：

- `{BASE_BRANCH}`: `devel`
- `{RELEASE_BRANCH}`: `main`
- `{PR_TEMPLATE_PATH}`: `.github/pull_request_template.md`

## 禁止

- 不要用自己的方式重新说明 Hyper-Waterfall 文档内容。
- 不要简化流程，或把它改成以自动化工具为中心的流程。
- 没有 manifest、migration guide 和任务指示者批准时，不要任意添加新 workflow、CLI、配置文件。
- 新应用期间，不要创建 manifest 外的产品代码、产品文档、架构文档、路线图、API 契约、示例、schema。
- 新应用期间，不要任意选择或创建 `docs/`、`specs/`、`site/`、`website/`、`adr/` 等正式文档根目录。
