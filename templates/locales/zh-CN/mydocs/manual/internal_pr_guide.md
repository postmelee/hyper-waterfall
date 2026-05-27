# 内部 Task PR 写作指南

## 目的

本文档定义内部 task PR body 的写作规则。内部 task PR 在从 `local/task{number}` push 到 `publish/task{number}` 后，面向 `{BASE_BRANCH}` 创建。

Branch 创建、push 和 `gh pr create` 命令遵循 [`pr_command_guide.md`](pr_command_guide.md)。

## 基本原则

- 从 `{PR_TEMPLATE_PATH}` 编写 PR body。
- 模板被扩展以连接本仓库的 Hyper-Waterfall artifacts。
- PR body 是最终报告的短压缩版本。
- 通过 `Changes` 中的 Stage report links 和 work document links 连接细节。

## Section 结构

内部 task PR 使用这些顶层 section：

- `Summary`
- `Changes`
  - `### Impact Areas`（可选）
  - `### Work Documents`
- `Key Review Points`
- `Verification`
- `Screenshots`
- `Related Issues`
- `Proposed Follow-up Issues`
- `Remaining Risks`

`Changes` 在 body 中只保留 Stage timeline，并将 `Impact Areas` 和 `Work Documents` 作为 subsection 分离。这样既能在 PR 顶部展示 Stage flow，也能在 GitHub sidebar ToC 中暴露 area tables 和 document links。

仅在需要时保留 `Key Review Points`、`Screenshots`、`Proposed Follow-up Issues` 和 `### Impact Areas`。不适用时删除整个 section 或写 `None`。

## Section 写作规则

`Summary`：

- 最多 4 个 bullet。
- 包含 target task、变更原因、变更内容，以及 reviewer 应优先检查的内容。
- 将此 PR 直接执行的 Issue 放在 `Target task`。

`Changes`：

- 主体只保留 Stage timeline。把 area tables 和 work document links 放在 subsection 中。
- 对基于 Stage 的工作，每个 Stage 写一行。
- 将 Stage title 链接到 stage report，并将旁边的短 commit SHA 链接到 commit URL。
- 示例：`**[Stage 1](stage-url)** ([0cdbae0](commit-url)): one-line summary`

`### Impact Areas` under `Changes`：

- 仅在多个区域变更且 reviewer 需要按区域判断优先级时保留。
- 如果只变更 1-2 个区域，删除此 subsection。
- 最多 5 行：`Area / Change / Review Focus`。

`### Work Documents` under `Changes`：

- 列出 task plan、implementation plan 和 final report。
- 不要在这里重复 stage reports；它们已经从 Stage timeline 链接。
- 使用 PR head commit SHA GitHub blob URLs，并显示为 `[filename](URL)`，不要使用 raw URLs。

`Key Review Points`：

- 仅当 reviewer 必须优先判断 ABI、schema、rendering contracts、algorithm branches 或 compatibility 时保留。
- 最多 3 项。每个 code block 保持在 20 行以内。

`Verification`：

- 只包含实际执行过的验证。
- 不要以命令列表结束。包含结果和证据。
- 使用 `Automated Verification`、`Manual/Scenario Verification`、`CI/Remote Verification` 和 `Verification Limitations`。
- Automated verification 使用 `Topic / Method / Result / Evidence` 表。
  - `Topic`：验证了哪个 acceptance criterion、risk 或 change area。
  - `Method`：命令或检查方法。
  - `Result`：使用 `OK`、`MISS` 或 `SKIP`。
  - `Evidence`：关键输出、通过数量或已检查条件。
- Manual/scenario verification 使用 `Scenario / Check Procedure / Result / Evidence`。
- CI/remote verification 使用 `Item / Result / Evidence`，包含 GitHub Check name、run link 或 check time。
- 不要把未执行的验证留在表格中。移到 `Verification Limitations` 或 `Remaining Risks`。
- 不要把长日志粘贴到 PR body。改为链接 final reports 或 stage reports。
- 删除无关 subsection。

`Screenshots`：

- 仅为 UI、Finder、Quick Look、thumbnail 或 renderer output 等视觉变更保留。
- 有视觉变更时使用 Before/After 表。
- 没有真实图片或 artifact 时不要保留格式。

`Related Issues`：

- 不要在这里列此 PR 的 target task。列出理解 PR 所需的上下文 Issues。
- 使用 prerequisite、follow-up、Epic、upstream 或 reference PR/Issue 等标签。
- 没有则写 `None`。

`Proposed Follow-up Issues`：

- 列出尚未已有 Issues 的候选。
- 没有则写 `None`。

`Remaining Risks`：

- 包含验证限制和运营注意事项。
- 没有则写 `None`。

## PR Body 与 Final Report 的关系

Final report 是长期保留文档。PR body 是快速 review-screen 摘要。

- Final report：
  - 详细记录完整上下文、Stage 结果、验证日志和剩余风险。
- PR body：
  - 只压缩 reviewer 判断 merge 所需的信息。
  - 通过 `Changes` 中的 Stage links 和 work document links 连接细节。

## 写作示例

```md
## Summary

- Target task: #22
- Why: {reason}
- What: {core change}
- Review focus: {what reviewers should inspect first}

## Changes

- **[Stage 1](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/working/task_m050_22_stage1.md)** ([abc1234](https://github.com/{REPO_SLUG}/commit/{stage1_sha})): {Stage 1 summary}
- **[Stage 2](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/working/task_m050_22_stage2.md)** ([def5678](https://github.com/{REPO_SLUG}/commit/{stage2_sha})): {Stage 2 summary}

### Impact Areas

| Area | Change | Review Focus |
|------|--------|--------------|
| {area 1} | {change summary} | {review focus} |

### Work Documents

- Task plan: [task_m050_22.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m050_22.md)
- Implementation plan: [task_m050_22_impl.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m050_22_impl.md)
- Final report: [task_m050_22_report.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/report/task_m050_22_report.md)

## Verification

### Automated Verification

| Topic | Method | Result | Evidence |
|------|--------|--------|----------|
| Template structure | `grep -nE 'Automated Verification|Verification Limitations' .github/pull_request_template.md` | OK | Required subsections found |
| whitespace | `git diff --check` | OK | No warnings |

### Manual/Scenario Verification

| Scenario | Check Procedure | Result | Evidence |
|----------|-----------------|--------|----------|
| PR body readability | Confirm the drafted PR body separates automated verification and limitations | OK | PR body preview |

### CI/Remote Verification

| Item | Result | Evidence |
|------|--------|----------|
| GitHub Checks | OK | run link or check time |

### Verification Limitations

- {unperformed verification and reason. Write `None` if none.}

## Related Issues

- Prerequisite: #17
- Reference: edwardkim/rhwp#385

## Remaining Risks

- {remaining risk summary}
```
