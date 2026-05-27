# 文档结构和命名规则 Manual

本文档定义 `mydocs/` 文件夹角色、文档文件名规则、中央文档模板政策、GitHub 平台模板边界、外部贡献者 PR review 文件夹政策，以及 Agent Skills 位置政策。创建新文档或移动现有文档前阅读它。代码风格、Git branch 操作和 task Stage workflow 由相关 manual 说明，而不是本文档。所有文档都使用此仓库选择的 Hyper-Waterfall locale 编写。

`mydocs/` 不是任意文档的堆积文件夹。它是一个工作记忆系统，让新的 AI 会话通过阅读仓库恢复“现在应该做什么”、“已经决定了什么”、“工作推进到哪里”、“为什么做出那个判断”以及“有哪些陷阱”。

## 核心术语

- **Document source of truth**：被视为当前有效的单一文档或文件夹，避免在多处重复同一信息。
- **Document template source of truth**：`mydocs/_templates/`，定义 artifact 输出格式。在此 framework repository 中，`templates/mydocs/_templates/` 是真正的真相来源，dogfooding 的 `mydocs/_templates` 指向它。
- **GitHub platform template**：`.github/ISSUE_TEMPLATE/` 和 `.github/pull_request_template.md`，定义 GitHub Issues 和 Pull Requests 的输入/body 格式。
- **Official documentation root**：目标项目面向用户、贡献者、外部集成者或分发渠道的官方文档位置。示例包括 `docs/`、`specs/`、`site/`、`website/`、`adr/`、`book/` 和 GitHub Wiki。Hyper-Waterfall 不固定这个名称。
- **Release manifest**：`templates/manifest.json`，定义 release files、target paths、update policies 和 checksum status。
- **Applied version record**：`.hyper-waterfall/version.json`，记录应用了 Hyper-Waterfall 的仓库使用的 framework version。
- **Actual artifact document**：为特定日期、Issue、PR 或研究主题编写的文档，例如 `orders/20260506.md` 或 `plans/task_m010_3.md`。
- **Internal task**：由 GitHub Issue 跟踪，并用任务计划书、实施计划书、Stage reports 和最终报告记录的仓库内部工作。
- **External contributor PR**：针对外部贡献者提交的 Pull Request 的 review 工作。它使用与内部 task 不同的文件夹和流程。
- **Milestone-including filename**：包含 milestone 和 Issue number 的新文档文件名，例如 `task_m010_49.md`。
- **Agent Skills source of truth**：`mydocs/skills/{skill-name}/SKILL.md`，由 Codex 和 Claude Code 读取。

## 文档文件名规则

新的内部 task 文档同时使用 GitHub Issue number 和 milestone。

- Task plan: `task_{milestone}_{issue_number}.md`（示例：`task_m100_7.md`）
- Implementation plan: `task_{milestone}_{issue_number}_impl.md`（示例：`task_m100_7_impl.md`）
- Stage report: `task_{milestone}_{issue_number}_stage{N}.md`（示例：`task_m100_7_stage1.md`）
- Final report: `task_{milestone}_{issue_number}_report.md`（示例：`task_m100_7_report.md`）

Supporting documents 在有用时应暴露 topic 和 date。

- Daily task board: `{yyyymmdd}.md`（示例：`20260506.md`）
- Feedback: `{yyyymmdd}_{topic}.md` 或 `task_{milestone}_{issue_number}_feedback.md`
- Technical research: `{yyyymmdd}_{topic}.md` 或 `task_{milestone}_{issue_number}_{topic}.md`
- Troubleshooting: `{yyyymmdd}_{topic}.md` 或 `task_{milestone}_{issue_number}_{topic}.md`
- External PR review documents: `pr_{number}_review.md`, `pr_{number}_review_impl.md`, `pr_{number}_report.md`

强制规则：

- 新内部 task 文档必须使用 `task_{milestone}_{issue_number}`。
- Milestones 写成 `m{number}`，例如 `m100` 或 `m200`。
- 不要用没有 milestone 的 `task_{issue_number}` 格式创建新的内部 task 文档。
- Legacy filenames 可以保留，但新 Issues 使用包含 milestone 的文件名。
- 不要把 template files 放进实际 artifact folders。Templates 只存在于 `mydocs/_templates/`。

## 文件夹角色

| Folder | Purpose | Notes |
|------|---------|------|
| `_templates/` | 文档输出格式模板 | artifact formats 的真相来源，不是 task artifacts |
| `orders/` | Daily task board | 只允许 `yyyymmdd.md`；详细分析放到 `tech/` 或 `troubleshootings/`；完成行包含 `Done: HH:mm` |
| `plans/` | Task 和 implementation plans | 不要把 `_stage{N}` 或 `_report` 文件放在这里 |
| `plans/archives/` | 已完成 plan archive | post-merge cleanup 期间使用 |
| `working/` | Stage reports（`_stage{N}.md`） | 不要放 final reports |
| `report/` | Final reports（`_report.md`）和长期 reports | Final reports 必须放这里 |
| `feedback/` | 任务请求者 feedback 和 code review comments | 保留 AI 无法自行发明的人类判断 |
| `tech/` | 技术研究和结构/spec 分析 | 可复用证据、备选方案比较、非正式草稿 |
| `manual/` | 操作 manuals 和 guides | Hyper-Waterfall 流程、Agent 规则、重复工作标准 |
| `troubleshootings/` | Troubleshooting 和 recurrence prevention | 记录解决过程和陷阱 |
| `pr/` | 外部贡献者 PR review 记录 | 与内部 task 分离 |
| `pr/archives/` | 已完成 PR review 记录归档 |  |
| `skills/` | Agent Skills `SKILL.md` 真相来源 | `.agents/skills` 和 `.claude/skills` symlink here |

## Official Documentation Root 与 `mydocs/` 边界

Hyper-Waterfall 不固定目标项目的 official documentation root 名称。目标项目可按需要选择 `docs/`、`specs/`、`site/`、`website/`、`adr/`、`book/`、GitHub Wiki 或其他位置。此列表是示例，不是默认值。

可能属于 official documentation root 的内容：

- 用户、贡献者或外部集成者直接引用的产品文档
- 实现和外部用户必须遵循的官方合约，例如 API、protocols、DSLs、schemas 或 MCP tool contracts
- 文档站点、update feeds 或 release notes 等 public surfaces
- README 作为官方标准链接的 architecture、security、integration 或 operations policy 文档

属于 `mydocs/` 的内容：

- 特定 Issues 的 plans、stage results 和 final reports
- 尚未正式化的 research、alternative comparisons、decision evidence 和 drafts
- 任务请求者 feedback 和 review judgments
- Hyper-Waterfall operating procedures、agent rules 和 repeated work standards
- Failure symptoms、causes、resolutions 和 recurrence prevention records

强制规则：

- 新采用 Hyper-Waterfall 时，不要选择或创建 official documentation root。如果 manifest 外似乎需要 product documentation，把它记录为 deferred item 或 separate task candidate。
- 任何创建或移动 product、user、contributor、external integration、API、architecture 或 roadmap documentation 的 task，都必须在任务计划书中记录 document location judgment 并获得批准。
- Document location judgment 必须包含 audience、officialness level、selected path、alternative path 和 reason。
- `mydocs/manual/` 不是目标项目的 product documentation location。它包含重复使用的 Hyper-Waterfall operating procedures 和 standards。
- `mydocs/tech/` 用于 research 和 design judgment evidence。要将内容提升为 official contract 或 user-facing document，必须在单独 task 中选择并批准 official documentation root。
- 如果目标仓库已有 official documentation root 或 documentation site rules，先检查那些惯例。Hyper-Waterfall 不默认创建 `docs/`。

## Manual Document Neutrality Policy

`mydocs/manual/` 文档记录长期原则、流程和判断标准。不要在 manual 正文中累积特定 Issue、PR、Stage、release、一次性验证或 failure event 的细节。

Manual 中允许：

- 可重复使用的 policies 和 guardrails
- worker 可复用的 procedures 和 check criteria
- 变更时需要文档更新的 operating standards 和 responsibility boundaries
- 用于查找下级文档或 artifacts 的短入口和链接

应从 manual 分离出去的内容：

- 特定 Issue、PR 或 Stage 的 analysis、evidence 和 completion results
- 详细 release preparation、deployment verification 或 release decision records
- 特定 migration/update review results 和 follow-up handoff
- 需要 symptoms、reproduction conditions、cause 和 recurrence prevention 的 incident records

分离目标：

| Content | Location |
|---|---|
| Internal task stage results and approval evidence | `mydocs/working/` |
| Internal task final results and long-term reports | `mydocs/report/` |
| Reusable technical research and design judgment | `mydocs/tech/` |
| Failure symptoms, causes, fixes, and recurrence prevention | `mydocs/troubleshootings/` |
| Release preparation and deployment verification for this framework repository | `docs/releases/` |
| Migration/update judgment criteria for repositories that already adopted the framework | `docs/migrations/` |

当 manual 需要引用特定 event document 时，不要复制 event content。Manual 中只保留泛化判断规则和短链接；详细上下文保留在 artifact document 中。

## Central Template Policy

文档输出格式在 `mydocs/_templates/` 中管理。每个 Skill 应尽可能先查询中央模板；只有在无法读取模板时，才把 Skill 内的最小 section summary 作为 fallback。

- Framework source of truth: `templates/mydocs/_templates/`
- Applied repository location: `mydocs/_templates/`
- Dogfooding location in this repository: `mydocs/_templates -> ../templates/mydocs/_templates`

中央模板：

- 以文件结构固定预期输出形状和输出格式要求。
- 指定期望输出格式和约束，使 literal instruction following 保持稳定。
- 防止模型每次发明文档结构。
- 当文档被复用为下一会话 prompt 时，保持 section 意义稳定。

强制规则：

- 不要把 template files 放进 artifact folders。
- `orders/`、`plans/`、`working/`、`report/`、`feedback/`、`tech/`、`troubleshootings/` 和 `pr/` 只包含 actual artifacts。
- Template filenames 或 first headings 必须明确表明它们是 templates。
- 当 template 变化时，review 相关 Skill template references 和 README document structure description。

## GitHub Platform Template Policy

GitHub Issues 和 Pull Requests 是 GitHub 平台产出物，不是 `mydocs/` artifacts。它们的格式在 `.github/` 下管理，而不是 `mydocs/_templates/`。

- Issue Form source of truth: `templates/.github/ISSUE_TEMPLATE/task.yml`
- Applied repository location: `.github/ISSUE_TEMPLATE/task.yml`
- Dogfooding location in this repository: `.github/ISSUE_TEMPLATE/task.yml`
- PR body template source of truth: `templates/.github/pull_request_template.md`
- Applied repository PR body location: `.github/pull_request_template.md`

角色边界：

- `.github/ISSUE_TEMPLATE/task.yml` 结构化 background、goals、included scope、excluded scope、acceptance criteria、verification criteria、references 和 metadata，使 GitHub Issue 可成为下一项 task 的第一个 prompt。
- `.github/pull_request_template.md` 定义 final report 后面向 review screen 的 changes、verification 和 remaining risks 摘要格式。
- `mydocs/_templates/` 定义仓库保留 artifacts 的格式，例如 task plans、implementation plans、stage reports、final reports、feedback、technical notes、troubleshooting 和 external PR review documents。

强制规则：

- 不要把 GitHub Issue Form 放进 `mydocs/_templates/`。
- `task-register` 创建 Issue bodies 时，应优先使用 `.github/ISSUE_TEMPLATE/task.yml`，只有在无法读取文件时才使用 Skill fallback sections。
- 当 `.github/ISSUE_TEMPLATE/task.yml` 变化时，review `task-register` Skill、README prompt guide explanation 和本 manual 的 role boundaries。

## Release Manifest 和 Version Record Policy

Hyper-Waterfall 的规范分发单位是 GitHub Release/tag。Prompts 只是启动 installation 或 update 的用户界面。实际文件应用基于 release `templates/manifest.json`、version record 和 migration guide。

- Manifest source of truth: `templates/manifest.json`
- Applied repository version record: `.hyper-waterfall/version.json`
- Migration guide location: `docs/migrations/`

Lifecycle judgment details 由以下文档覆盖：

| Topic | Source of Truth |
|---|---|
| New adoption procedure and judgment result format | `docs/lifecycle/adoption.md` |
| Existing repository update judgment | `docs/lifecycle/update.md` |
| Hyper-Waterfall version update PR transition | `docs/lifecycle/update_pr.md` |
| Release/tag and update protocol | [`release_update_protocol.md`](release_update_protocol.md) |

`templates/manifest.json`：

- 列出 release 包含的 framework files 及其 target paths。
- 标识 update target areas，例如 `AGENTS.md`、`CLAUDE.md`、`.github/`、`mydocs/_templates/`、`mydocs/manual/` 和 `mydocs/skills/`。
- 将每个 entry 的 update policy 表示为 `overwrite`、`merge`、`manual`、`preserve` 或 `symlink`。
- Release packaging 前可把 checksums 保持为 `pending-release`，并在实际 tag/release 创建时最终确定。

Update policy 含义：

- `overwrite`：仅当 target file 仍匹配 previous manifest checksum 时替换；用户修改视为 conflict。
- `merge`：用于 user-visible 且常被自定义的 rule/template files；优先 patch 和 review，而不是 automatic overwrite。
- `manual`：需要 maintainer judgment 和 migration guide。
- `preserve`：缺失时创建，但没有明确批准不得更改现有内容。
- `symlink`：验证 `.agents/skills -> ../mydocs/skills` 和 `.claude/skills -> ../mydocs/skills` 等链接。

`.hyper-waterfall/version.json` 不是 work artifact。不要把它放在 `mydocs/` 下。它记录目标仓库安装了哪个 Hyper-Waterfall release，以及最后何时更新。Lifecycle judgment 读取此文件，并将当前版本与目标 release manifest 和 migration guide 比较。

New adoption 使用 strict manifest mode。允许的 targets 是 manifest `files[]` targets、`.hyper-waterfall/version.json` 和 manifest-defined symlinks。Adoption 期间不要创建或修改 manifest 外文件。Target-project-specific artifacts，例如 product code、product docs、architecture docs、roadmap、API contracts、examples 和 schemas，是 deferred task candidates，不是 adoption side effects。

Hyper-Waterfall version update PR 也是 GitHub 平台产出物，因此不要在 `mydocs/_templates/` 中为它们创建单独的 document template。使用 `.github/pull_request_template.md` 作为 PR body，并在 `Summary`、`Changes`、`Verification`、`Verification limits` 和 `Remaining risks` 中反映 manifest diff 和 migration guide evidence。

Lifecycle judgment results 是 pre-application report formats，不是存储在 `mydocs/` 下的长期 artifact templates。一旦判断结果获批并开始实际变更，就通过 GitHub Issue、任务计划书、实施计划书、stage reports、final report 和 PR body template 跟踪工作。

强制规则：

- 当 `templates/manifest.json` 变化时，同时 review README distribution/update explanations 和 migration guides。
- `.hyper-waterfall/version.json` 是实际已采用仓库中的 state file；不要把它与本 framework repository 的 document artifact templates 混在一起。
- 不要把高度可由用户自定义的文件标为 unconditional `overwrite`。
- 当 README 或 `docs/agent-entrypoint.md` 的 installation/update explanations 变化时，同时 review manifest、migration guides、`framework_lifecycle_guide.md` 和 `release_update_protocol.md` explanations。

## External Contributor PR Review Policy

外部贡献者 PR review 使用 `mydocs/pr/`，而不是内部 task 文件夹。

- Initial review: `mydocs/pr/pr_{number}_review.md`
- Optional review implementation/verification plan: `mydocs/pr/pr_{number}_review_impl.md`
- Final report: `mydocs/pr/pr_{number}_report.md`
- Archive after completion: `mydocs/pr/archives/`

内部 task 文档由 Issue 和 Stage 支撑。外部 PR review 文档由 PR 支撑，不强制使用内部 task stage/final report 格式。如果外部 PR review 发现内部 follow-up 工作，创建单独的 GitHub Issue 并启动内部 task。

## Agent Skills 位置政策

Agent Skills 存储在 `mydocs/skills/{skill-name}/SKILL.md`。

- Source of truth: `mydocs/skills/`
- Codex discovery path: `.agents/skills -> mydocs/skills`
- Claude Code discovery path: `.claude/skills -> mydocs/skills`
- 两个 symlink 都以 mode `120000` 提交到 git。
- Skill bodies 应与工具无关（`gh`、`git`、file creation），工具特定的调用差异只应位于 `SKILL.md` 末尾的 "Invocation" section。
- 当 Skill 编写 plan、report 或 review document 时，应先查询 `mydocs/_templates/` 下的对应模板。

不要随意编辑 symlink targets。如果添加、删除、重命名 Skill，或其调用时机变化，应在同一 PR 中 review README 的 core Skill table 和 `task_workflow_guide.md` Skill call display guidance。

## 相关 Manual

- [`task_workflow_guide.md`](task_workflow_guide.md)：基于 Issue 的 task flow、approval gates、reports 和 PR publication。
- [`git_workflow_guide.md`](git_workflow_guide.md)：branch naming、remote publication、merge 和 cleanup。
- [`pr_process_guide.md`](pr_process_guide.md)：PR handling entrypoint。
- [`release_update_protocol.md`](release_update_protocol.md)：release/tag 和 update protocol。
- [`agent_code_hyperfall_rule_conflict.md`](agent_code_hyperfall_rule_conflict.md)：Agent defaults 与 Hyper-Waterfall rules 的冲突。
