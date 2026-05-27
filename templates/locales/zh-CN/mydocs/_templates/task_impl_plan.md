# 实施计划书模板

此中央模板用于 `mydocs/plans/task_{milestone}_{issue}_impl.md`。实施计划书把已批准的任务计划书转化为具体的 Stage 产出物、验证命令和 commit message。

Task plan: [`task_{milestone}_{issue}.md`](task_{milestone}_{issue}.md)
GitHub Issue: [#{issue}](https://github.com/{REPO_SLUG}/issues/{issue})
Milestone: M{milestone}

## Stage 概览

| Stage | Title | Main Output | Verification |
|---|---|---|---|
| 1 | {title} | `{path}` | `{verification summary}` |
| 2 | {title} | `{path}` | `{verification summary}` |
| 3 | {title} | `{path}` | `{verification summary}` |

## 文档位置检查

确认实际 Stage 产出物位置与任务计划书中的 “文档位置判断” 一致。如果没有创建、移动或编辑文档，写 `Not applicable` 并说明原因。

| File | Planned Location in Task Plan | Stage Artifact Path | Match | Notes |
|---|---|---|---|---|
| `{path or not applicable}` | `{path}` | `{path}` | OK/MISS | {if mismatch, approval is required before changing the plan} |

## Stage 1 - {Title}

### 产出物

New:

- `{path}`

Modified:

- `{path}`

### 变更内容

- {Specifically describe what will be created or changed.}

### 验证

```bash
{verification command}
git diff --check
```

### Commit

```text
Task #{issue} Stage 1: {summary}
```

## Stage 2 - {Title}

### 产出物

- `{path}`

### 变更内容

- {Specifically describe what will be created or changed.}

### 验证

```bash
{verification command}
git diff --check
```

### Commit

```text
Task #{issue} Stage 2: {summary}
```

## Stage 3 - {Title}

### 产出物

- `{path}`

### 变更内容

- {Specifically describe what will be created or changed.}

### 验证

```bash
{verification command}
git diff --check
```

### Commit

```text
Task #{issue} Stage 3: {summary}
```

## 验证

- 在编写 stage report 之前，运行每个 Stage 的验证命令。
- 验证失败时，不得把 Stage 视为完成。
- 如果计划必须变更，先更新实施计划书并获得任务请求者批准。
- 如果文档位置与任务计划书判断不一致，实施前先更新任务计划书或实施计划书并获得批准。

## Commits

- 每个 Stage commit 将 Stage 产出物与 `mydocs/working/task_{milestone}_{issue}_stage{N}.md` 打包在一起。
- Commit message 遵循 `Task #{issue} Stage {N}: {summary}`。

## Stage 依赖

- Stage 2 在 Stage 1 产出物确认后开始。
- Stage 3 在 Stage 2 验证和报告批准后开始。

## 风险与应对

- **{risk name}**: {response}

## 审批请求

- {Ask for approval of Stage split, artifacts, verification commands, and commit messages.}
