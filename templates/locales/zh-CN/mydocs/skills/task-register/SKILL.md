---
name: task-register
description: |
  在 Hyper-Waterfall workflow 中注册一个尚无 GitHub Issue 的新 task。
  查询 open milestones 和 existing labels，选择候选，
  创建 Issue 前与任务请求者确认，然后创建 GitHub Issue number。
  Issue 创建后，将 branch、daily task board 和任务计划书工作交给 task-start。
---

# Hyper-Waterfall Issue Registration

## Trigger

- 任务请求者明确要求注册 Issue、创建新 task，或从 Issue 开始。
- 任务请求者直接调用此 SKILL。

## Preconditions

- 该工作尚无 Issue number。
- Purpose、background 和 scope 至少已有草稿。
- `gh` CLI 已为当前用户认证。
- 尽可能能读取 `.github/ISSUE_TEMPLATE/task.yml` 或 framework source `templates/.github/ISSUE_TEMPLATE/task.yml`。
- 创建 Issue 前，可以与任务请求者确认 title、body、milestone 和 label draft。

## Procedure

1. 检查重复 Issues。
   ```bash
   gh issue list --repo {REPO_SLUG} --state all \
     --search "{work keywords}" \
     --limit 20 \
     --json number,title,state,milestone,labels,url
   ```
   - 如果存在实质相同的 open Issue，不要创建新 Issue。询问是否使用现有 Issue。
   - 如果 closed Issue 覆盖过同一主题，在新 Issue references 中链接它。
2. 检查 open milestones。
   ```bash
   gh api repos/{REPO_SLUG}/milestones \
     --jq '.[] | {number,title,state,description,open_issues,closed_issues}'
   ```
   - 根据实时 `title`、`state` 和 `description` 判断。
   - 不要依赖记忆中的旧 milestone list 或 version mapping。
3. 检查 existing labels。
   ```bash
   gh api repos/{REPO_SLUG}/labels --paginate \
     --jq '.[] | {name,description,color}'
   ```
   - 根据实时 `name` 和 `description` 判断。
   - 不要依赖记忆中的旧 label list。
4. 选择 milestone candidates。
   - 只使用 open milestones。
   - 将 work purpose、scope、component 和 release phase 与 milestone `title` 和 `description` 比较。
   - 如果一个候选明确，记录其 title 和 reason。
   - 如果有 2-3 个可能候选，带理由展示并询问任务请求者。
   - 如果没有适合的 open milestone 或 descriptions 不足，不要猜测，询问任务请求者。
5. 选择 label candidates。
   - 只使用 live lookup 中的 existing labels。
   - 只有当工作明确匹配 label `name` 和 `description` 时才选择 label。
   - 优先选择 1 个 type label、1-2 个 area labels，以及 0-1 个 kind/status label。
   - Type labels 包括 `bug`、`documentation`、`enhancement`、`duplicate` 或 `question`。
   - Area labels 按主要工作所有权选择，而不是所有受影响区域。
   - `kind:architecture`、`kind:automation`、`kind:regression`、`kind:verification` 或 `kind:follow-up` 等 kind labels 只在能有意义地区分处理时使用。
   - 一般 Issue 通常有 2-4 个 labels。
   - 如果需要 5 个或更多 labels，在 draft 中写明例外理由，并与任务请求者确认。
   - 如果候选明确，记录 label names 和 reasons。
   - 如果没有适配 label 或适配模糊，不带 labels 创建或询问任务请求者。
   - 不要创建新 labels。
6. 起草 Issue。
   - Title: 一句话揭示工作单元。
   - Body: 优先使用 GitHub Issue Form `.github/ISSUE_TEMPLATE/task.yml`。
     - 在 framework repository 中，检查 applied repositories 的 source template 时使用 `templates/.github/ISSUE_TEMPLATE/task.yml`。
     - 因为 `gh issue create` 不运行 Issue Form UI，所以将 form fields 转换为 Markdown sections。
   - Issue Form sections:
     - Background
     - Goals
     - Scope - Included
     - Scope - Excluded
     - Acceptance Criteria
     - Verification Criteria
     - References
     - Milestone and label candidates
   - 如果无法读取 Issue Form，使用同一 section list 作为 fallback。
   - Milestone: 从 live lookup 中选择的一个 open milestone，以及 selection reason。
   - Labels: 已批准的 existing labels 和 reasons，或 none。
   - 按 type/area/kind 拆分 label reasons；如果使用 5 个或更多 labels，包含 exception reason。
7. 创建 Issue 前请求批准。
   - 向任务请求者展示 title、body、milestone、labels 和 selection reasons。
   - 未经任务请求者在同一线程中明确批准创建，不要运行 `gh issue create`。
8. 获批后创建 Issue。
   ```bash
   gh issue create --repo {REPO_SLUG} \
     --title "{title}" \
     --body "{body}" \
     --milestone "{milestone}" \
     --label "{label}"
   ```
   - 多个 labels 时重复 `--label`，例如 `--label documentation --label enhancement`。
   - 无 labels 创建时省略 `--label`。
9. 确认已创建的 Issue。
   ```bash
   gh issue view {N} --repo {REPO_SLUG} \
     --json number,title,state,milestone,labels,url
   ```
10. 报告已创建的 Issue number 和 URL，然后请求批准进入 `task-start`。

## Verification

- 创建的 Issue 是 `OPEN`。
- Milestone 非空，且来自 live lookup 的 open milestone。
- Labels 只使用已批准的 existing labels。
- 一般 Issue labels 通常在推荐的 2-4 个范围内。
- 如果使用 5 个或更多 labels，报告中包含已批准的 exception reason。
- `area:*` labels 按主要工作所有权选择。
- Issue body 填写了与 `.github/ISSUE_TEMPLATE/task.yml` 对应的必需输入。
- Creation report 包含 Issue number、URL、milestone、labels 和 selection reasons。

## Never Do

- 未经任务请求者批准运行 `gh issue create`。
- 创建新的 milestone 或 label。
- 随意使用 closed milestone。
- Issue 创建后未经批准继续到 `task-start`。
- 在此 Skill 内创建 branches、更新 daily task board 或编写任务计划书。

## Invocation

- Codex: `$task-register` 或从 `/skills` 菜单选择 `task-register`
- Claude Code: `/task-register`
