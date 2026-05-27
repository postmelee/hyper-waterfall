# Daily Task Board Template

This central template is for `mydocs/orders/{yyyymmdd}.md`. Actual daily task board files use date filenames in the `orders/` folder. Do not copy this template file into `orders/` as a saved artifact.

## Usage

- Actual file: `mydocs/orders/{yyyymmdd}.md`
- When to write: task start, status changes at stage boundaries, final report, and post-merge cleanup
- Writing language: use the selected Hyper-Waterfall locale for this repository.

## Body Template

```md
# Daily Tasks - YYYY-MM-DD

## M{milestone} - {milestone name}

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| #{number} | {one-line task summary} | Planned | {note} |
| #{number} | {one-line task summary} | In progress | {note} |
| #{number} | {one-line task summary} | Done | Done: HH:mm, {completion summary} |
```

## Common Operations Section Template

Use only for operational work that does not belong to a specific milestone.

```md
## Common - Operations

| Issue | Task | Status | Notes |
|------|------|--------|-------|
| Needs issue | {one-line task summary} | Planned | {note} |
```

## Backlog Template

Use only when there is an item that is not today's main work but should not be forgotten.

```md
## Backlog

| No | Content | Found On | Status | Notes |
|----|---------|----------|--------|-------|
| B-001 | {item} | YYYY-MM-DD | Open | {note} |
```

## Status Values

- `Planned`
- `In progress`
- `Done`
- `On hold`

## Writing Rules

- If a GitHub Issue number exists, write it as `#number`.
- If there is no Issue yet, write `Needs issue` instead of an arbitrary number or `TBD`.
- For completed work, include `Done: HH:mm` in the notes.
- Do not write detailed analysis, verification logs, or technical research in `orders/`; place them in the appropriate document folder.
