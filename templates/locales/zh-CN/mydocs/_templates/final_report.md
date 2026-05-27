# 最终报告模板

此中央模板用于 `mydocs/report/task_{milestone}_{issue}_report.md`。最终报告关闭完整的计划-实施-验证周期，记录验收标准和长期保留的剩余风险，并在 PR 发布前请求批准。

GitHub Issue: [#{issue}](https://github.com/{REPO_SLUG}/issues/{issue})
Milestone: M{milestone}

## 工作摘要

- Target Issue: #{issue}
- Milestone: M{milestone}
- Stage count: {N}
- Work purpose: {one-line summary}

## 变更文件和影响范围

| Path | Change Summary | Impact Area |
|---|---|---|
| `{path}` | {change summary} | {impact area} |

## 文档位置验证

如果此 task 创建、移动或编辑了产品、用户、贡献者、外部集成、API、架构或 roadmap 文档，验证实际产出物位置是否与任务计划书中的 “文档位置判断” 一致。如果没有此类文档变更，写 `Not applicable` 并说明原因。

| File | Planned Location | Actual Location | Result | Evidence |
|---|---|---|---|---|
| `{path or not applicable}` | `{path}` | `{path}` | OK/MISS | {evidence from task plan and diff} |

## 量化前后对比

| Metric | Before | After |
|---|---|---|
| {metric} | {value} | {value} |

如果没有适用的量化指标，写 “Not applicable” 并说明原因。

## 验证结果

| Acceptance Criterion | Result |
|---|---|
| {criterion} | OK/MISS - {evidence} |

### Stage 验证结果

- Stage 1: {report link or verification summary}
- Stage 2: {report link or verification summary}
- Stage 3: {report link or verification summary}

## 剩余风险和后续工作

### 剩余风险

- {remaining risk. Write `None` if there are none.}

### 后续候选

- {follow-up Issue candidate. Write `None` if there are none.}

## 给任务请求者的审批请求

- 如果批准最终报告和验收标准验证结果，则进入 PR 发布。
