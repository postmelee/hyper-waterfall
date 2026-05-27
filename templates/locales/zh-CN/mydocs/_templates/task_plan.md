# 任务计划书模板

此中央模板用于 `mydocs/plans/task_{milestone}_{issue}.md`。任务计划书在实施前固定目的、范围、设计方向和验证标准，并请求任务请求者批准。

GitHub Issue: [#{issue}](https://github.com/{REPO_SLUG}/issues/{issue})
Milestone: M{milestone}

## 目的

{Describe the result this task must achieve in 1-3 paragraphs.}

## 背景

{Explain why this work is needed, what is wrong with the current state, and which official documents, existing Issues, or previous artifacts were referenced.}

## 范围

### 包含

- {Items this task must cover}

### 不包含

- {Items this task explicitly does not cover}

## 设计方向

- {Structure, policy, file placement, compatibility judgment, or other points that must be agreed before implementation}
- {Which existing patterns are followed and which parts are newly defined}

## 文档位置判断

如果此 task 会创建、移动或编辑产品、用户、贡献者、外部集成、API、架构或 roadmap 文档，先判断应使用官方文档根还是 `mydocs/`。如果不涉及文档变更，写 `Not applicable` 并说明原因。

Hyper-Waterfall 不固定官方文档根名称。目标项目可以明确选择 `docs/`、`specs/`、`site/`、`website/`、`adr/`、`book/`、GitHub Wiki 或其他位置，但本计划必须批准其理由。

| File | Classification | Audience | Selected Location | Alternative Location | Reason |
|---|---|---|---|---|---|
| `{path or not applicable}` | {official doc/technical research/operating manual/work artifact} | {user/contributor/agent/internal worker} | `{path}` | `{path}` | {why this location is correct} |

## 预期变更文件

New:

- `{path}`

Modified:

- `{path}`

Task artifacts:

- `mydocs/orders/{yyyymmdd}.md`
- `mydocs/plans/task_{milestone}_{issue}.md`
- `mydocs/plans/task_{milestone}_{issue}_impl.md`
- `mydocs/working/task_{milestone}_{issue}_stage{N}.md`
- `mydocs/report/task_{milestone}_{issue}_report.md`

## 暂定 Stage

{Split into 3-6 stages by default. Each stage should be small enough to implement, verify, and report in one cycle.}

- **Stage 1 - {title}**
  - {artifact}
  - {verification perspective}
- **Stage 2 - {title}**
  - {artifact}
  - {verification perspective}
- **Stage 3 - {title}**
  - {artifact}
  - {verification perspective}

## 验证计划

### Stage 验证

- Stage 1
  - `{verification command or check method}`
- Stage 2
  - `{verification command or check method}`
- Stage 3
  - `{verification command or check method}`

### 集成验证

- `{final acceptance criterion}`
- `git status --short` 在 PR 准备前为空。
- `git diff --check` 无 warning 通过。

## 风险

- **{risk name}**: {impact and response}

## 审批请求

- {Scope, design direction, and exclusions that the task requester must approve}

批准后，`task_{milestone}_{issue}_impl.md` 将详细定义 Stage 产出物、验证命令和 commit message。
