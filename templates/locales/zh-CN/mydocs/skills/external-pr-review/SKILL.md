---
name: external-pr-review
description: |
  应用外部贡献者 PR review 流程。
  收集 PR 信息，编写 mydocs/pr/pr_{N}_review.md，执行验证，编写 pr_{N}_report.md，
  并在处理完成时将文档移动到 archives/。只用于外部贡献者 PR，不用于内部 task。
---

# 外部贡献者 PR Review

## Trigger

- 任务请求者明确说 "review PR #N" 或 "review external PR"。
- 直接调用此 SKILL。

## Preconditions

- 待 review 的 PR 是从外部贡献者 fork 打开到本仓库的 `{BASE_BRANCH}` 或约定 base。
- 不要将此 SKILL 用于 `publish/task{N}` 等内部 task PR。内部 task 使用普通 Stage 流程。
- `gh` CLI authentication 可用。

## Procedure

1. 收集 PR metadata。
   ```bash
   gh pr view {N} --json number,title,state,baseRefName,headRefName,headRepository,mergeable,mergeStateStatus,reviewDecision,labels,body
   gh pr diff {N} | head -200
   gh pr checks {N}
   ```
   - 检查 linked Issues、base/head、mergeability 和 CI state。
2. 编写 review document：`mydocs/pr/pr_{N}_review.md`。
   - 使用中央模板 `mydocs/_templates/external_pr_review.md`。
   - 只有在无法读取模板时，才使用这些 fallback sections：
     - PR information: number, author, base/head, linked Issue
     - Change summary
     - Impact area and compatibility: FFI, build, documentation
     - Code/documentation review findings
     - Verification plan
     - Recommendation: merge / request changes / close
     - Approval request to task requester
3. 请求任务请求者批准 review direction。
4. 需要时，编写 modification/verification plan：`mydocs/pr/pr_{N}_review_impl.md`。
   - 使用中央模板 `mydocs/_templates/external_pr_review_impl.md`。
   - 只有当本仓库需要额外验证工作时使用。
   - 编写后请求批准。
5. 仅在适用时运行验证。
   - 根据 change type 应用 `{PROJECT_VALIDATION_GUIDE}`。
6. 编写 final report：`mydocs/pr/pr_{N}_report.md`。
   - 使用中央模板 `mydocs/_templates/external_pr_report.md`。
   - 包含 review result、verification result、final recommendation，以及 GitHub PR comment body 或 link。
7. 任务请求者批准后，将 comment 或 review 发布到 GitHub PR。Merge 由任务请求者决定。
8. 处理完成后，归档文档。
   ```bash
   git mv mydocs/pr/pr_{N}_review.md mydocs/pr/archives/
   git mv mydocs/pr/pr_{N}_review_impl.md mydocs/pr/archives/  # if it exists
   git mv mydocs/pr/pr_{N}_report.md mydocs/pr/archives/
   ```
9. 一次 commit，或按 review phase commit。外部 PR review 不强制使用内部 Stage 格式。
   ```bash
   git commit -m "PR #{N} review: {summary}"
   ```

## Verification

- `mydocs/pr/pr_{N}_review.md` 填写了 `mydocs/_templates/external_pr_review.md` 的必需章节。
- 如果编写了 `mydocs/pr/pr_{N}_review_impl.md`，它填写了 `mydocs/_templates/external_pr_review_impl.md` 的必需章节。
- `mydocs/pr/pr_{N}_report.md` 填写了 `mydocs/_templates/external_pr_report.md` 的必需章节。
- Recommendation 明确为 merge、request changes 或 close。
- 处理完成后，创建的 PR review documents 存在于 `mydocs/pr/archives/`。

## Never Do

- 将此 SKILL 应用于 `publish/task{N}` 等内部 task PR。
- 未经任务请求者批准 merge 或 close 外部 PR。
- 绕过 PR 流程，直接 cherry-pick 外部贡献者 fork 的代码到本仓库。
- 将 `_stage{N}.md` 和 `_report.md` 等内部 Stage 文档强加到外部 PR review documents。

## Invocation

- Codex: `$external-pr-review` 或 `/skills` 菜单
- Claude Code: `/external-pr-review`
