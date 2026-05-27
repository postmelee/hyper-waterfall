# 每日任务板模板

此中央模板用于 `mydocs/orders/{yyyymmdd}.md`。实际每日任务板文件使用 `orders/` 文件夹中的日期文件名。不要把此模板文件复制到 `orders/` 作为保存的产出物。

## 用法

- 实际文件：`mydocs/orders/{yyyymmdd}.md`
- 何时编写：task start、Stage 边界状态变化、最终报告、post-merge cleanup
- 编写语言：使用此仓库选择的 Hyper-Waterfall locale。

## 正文模板

```md
# Daily Tasks - YYYY-MM-DD

## M{milestone} - {milestone name}

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| #{number} | {one-line task summary} | Planned | {note} |
| #{number} | {one-line task summary} | In progress | {note} |
| #{number} | {one-line task summary} | Done | Done: HH:mm, {completion summary} |
```

## 通用操作章节模板

仅用于不属于特定 milestone 的运营工作。

```md
## Common - Operations

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| Needs issue | {one-line task summary} | Planned | {note} |
```

## Backlog 模板

仅在某个项目不是今天的主要工作、但不应被遗忘时使用。

```md
## Backlog

| No | Content | Found On | Status | Notes |
|----|---------|----------|--------|-------|
| B-001 | {item} | YYYY-MM-DD | Open | {note} |
```

## Status 值

- `Planned`
- `In progress`
- `Done`
- `On hold`

## 编写规则

- 如果存在 GitHub Issue 编号，写成 `#number`。
- 如果还没有 Issue，写 `Needs issue`，不要写任意编号或 `TBD`。
- 对已完成工作，在 notes 中包含 `Done: HH:mm`。
- 不要在 `orders/` 中写详细分析、验证日志或技术研究；把它们放在适当的文档文件夹中。
