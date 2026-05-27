---
name: todo
description: |
  创建并更新 Hyper-Waterfall daily task board（`mydocs/orders/yyyymmdd.md`）。
  应用 milestone table format、status update rules 和 backlog section rules。
  当 task-start、task-stage-report、task-final-report 或 pr-merge-cleanup
  更新 daily task board 时，遵循此 SKILL 的格式。
---

# Daily Task Board 编写

## Purpose

`mydocs/orders/{yyyymmdd}.md` 是当天的一页工作看板。它不是任务计划书、报告或技术笔记。它以 milestone 视角展示进度，并记录完成时间。

## Trigger

- 任务请求者明确说 "write today's tasks"、"update orders" 或 "close today's tasks"。
- 当 `task-start`、`task-stage-report`、`task-final-report` 或 `pr-merge-cleanup` 更新 daily task board 时，应用此 SKILL 的格式。
- 直接调用此 SKILL。

## Artifact

- Target file: `mydocs/orders/{yyyymmdd}.md`
- 编写语言：使用此仓库选择的 Hyper-Waterfall locale。
- Output format source: `mydocs/_templates/orders.md`

## Standard Format

优先使用中央模板 `mydocs/_templates/orders.md`。以下是在无法读取模板时的最小 fallback format。

- Filename: `yyyymmdd.md`
- Title: `# Daily Tasks - YYYY-MM-DD`
- Body: 至少一个 milestone section；需要时添加 common operations section
- 每个 milestone section 使用此表：

```md
## M{milestone} - {milestone name}

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| #{number} | {task} | Planned | {note} |
| #{number} | {task} | In progress | {note} |
| #{number} | {task} | Done | {note} |
```

## Milestone 判断规则

编写工作前，判断它属于哪个 milestone section。

1. 任务请求者的明确指示
2. 如果没有明确指示，复用同日期 `mydocs/orders/{yyyymmdd}.md` 中已有的 milestone structure
3. 如果同日期文件不存在，使用目标仓库 `README.md` roadmap 或 release notation 中的明确 milestone label
4. 如果以上来源都不能决定，不要发明 milestone name；询问任务请求者

注意事项：

- 区分 roadmap transition notation 和 milestone names。例如 `0.5 -> 1.0` 是 transition notation，不是 section title。
- 除非任务请求者明确指定，不要把工作放进未来 milestone。
- 如果 `README.md` 将某个 milestone 标记为 current，将其用作模糊工作的默认 section。

## Common Operations Section

对于跨领域、运营类或无法明确归入某个 milestone 的工作，不要强行放入错误 milestone。放入 common section。

```md
## Common - Operations

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| Needs issue | {task} | Planned | {note} |
```

用于：

- Milestone definition 或 roadmap cleanup
- Release 或 CI/CD planning
- Repository-wide operations work
- 需要先创建 Issue 才能分类的工作

## Backlog（可选）

仅当存在不是今天主要工作但不应遗忘的未解决项目时添加。

```md
## Backlog

| No | Content | Found On | Status | Notes |
|----|---------|----------|--------|-------|
| B-001 | {item} | YYYY-MM-DD | Open | {note} |
```

## 编写规则

- 如果存在 GitHub Issue number，写成 `#number`。
- 如果还没有 Issue，写 `Needs issue`，不要写任意编号或 `TBD`。
- `Task` 保持为一行摘要。
- `Notes` 保持简短。优先写 purpose、current stage、verification point、linked document 或 blocker。
- 状态变为 `Done` 时，在 notes 中添加 `Done: HH:mm`。
- 默认 statuses: `Planned`, `In progress`, `Done`, `On hold`。
- 没有 backlog 时省略 backlog section。
- 同一天有多个 active milestones 时，按 milestone 拆分 sections。
- 不要把 templates、temporary notes 或非日期文件放进 `mydocs/orders/`。

## Verification

- Filename 遵循 `yyyymmdd.md`。
- Title 遵循 `# Daily Tasks - YYYY-MM-DD`。
- 每个 work row 都在 `Issue | Task | Status | Notes` 表中。
- Status value 是 `Planned`、`In progress`、`Done`、`On hold` 之一。
- Completed work notes 包含 `Done: HH:mm`。

## Never Do

- 在 `orders/` 中写任务计划书、报告或技术笔记。
- 因为 milestone 模糊而发明 milestone name。
- 忽略同日期已有 milestone structure 并强行创建新结构。
- 未经任务请求者批准，把工作放进未来 milestone。
- 当 Issue 已存在时，让 row 保持 `Needs issue`。

## Minimal Template

这是 `mydocs/_templates/orders.md` 的缩短版。创建新日期文件时，先检查中央模板。

```md
# Daily Tasks - YYYY-MM-DD

## M{milestone} - {milestone name}

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| #{number} | {task} | Planned | {note} |
```

```md
## Common - Operations

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| Needs issue | {task} | Planned | {note} |
```

## Invocation

- Codex: `$todo` 或从 `/skills` 菜单选择 `todo`
- Claude Code: `/todo`
