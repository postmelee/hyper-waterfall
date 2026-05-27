---
name: external-pr-review
description: |
  Apply the external contributor PR review procedure.
  Collect PR information, write mydocs/pr/pr_{N}_review.md, verify, write pr_{N}_report.md,
  and move documents to archives/ when processing is complete. Use only for external contributor PRs, not internal tasks.
---

# External Contributor PR Review

## Trigger

- The task requester explicitly says "review PR #N" or "review external PR."
- This SKILL is invoked directly.

## Preconditions

- The PR under review is opened from an external contributor fork to this repository's `{BASE_BRANCH}` or agreed base.
- Do not use this SKILL for internal task PRs such as `publish/task{N}`. Internal tasks use the normal stage procedure.
- `gh` CLI authentication is available.

## Procedure

1. Collect PR metadata.
   ```bash
   gh pr view {N} --json number,title,state,baseRefName,headRefName,headRepository,mergeable,mergeStateStatus,reviewDecision,labels,body
   gh pr diff {N} | head -200
   gh pr checks {N}
   ```
   - Check linked Issues, base/head, mergeability, and CI state.
2. Write review document: `mydocs/pr/pr_{N}_review.md`.
   - Use central template `mydocs/_templates/external_pr_review.md`.
   - Only if the template cannot be read, use these fallback sections:
     - PR information: number, author, base/head, linked Issue
     - Change summary
     - Impact area and compatibility: FFI, build, documentation
     - Code/documentation review findings
     - Verification plan
     - Recommendation: merge / request changes / close
     - Approval request to task requester
3. Request task requester approval for the review direction.
4. If needed, write a modification/verification plan: `mydocs/pr/pr_{N}_review_impl.md`.
   - Use central template `mydocs/_templates/external_pr_review_impl.md`.
   - Use this only when this repository needs additional verification work.
   - Request approval after writing it.
5. Run verification only when applicable.
   - Apply `{PROJECT_VALIDATION_GUIDE}` based on change type.
6. Write final report: `mydocs/pr/pr_{N}_report.md`.
   - Use central template `mydocs/_templates/external_pr_report.md`.
   - Include review result, verification result, final recommendation, and GitHub PR comment body or link.
7. After task requester approval, post the comment or review to the GitHub PR. The task requester decides merge.
8. When processing is complete, archive documents.
   ```bash
   git mv mydocs/pr/pr_{N}_review.md mydocs/pr/archives/
   git mv mydocs/pr/pr_{N}_review_impl.md mydocs/pr/archives/  # if it exists
   git mv mydocs/pr/pr_{N}_report.md mydocs/pr/archives/
   ```
9. Commit once or by review phase. External PR review does not force the internal stage format.
   ```bash
   git commit -m "PR #{N} review: {summary}"
   ```

## Verification

- `mydocs/pr/pr_{N}_review.md` fills required sections from `mydocs/_templates/external_pr_review.md`.
- If written, `mydocs/pr/pr_{N}_review_impl.md` fills required sections from `mydocs/_templates/external_pr_review_impl.md`.
- `mydocs/pr/pr_{N}_report.md` fills required sections from `mydocs/_templates/external_pr_report.md`.
- The recommendation is explicit: merge, request changes, or close.
- After processing, created PR review documents exist in `mydocs/pr/archives/`.

## Never Do

- Apply this SKILL to internal task PRs such as `publish/task{N}`.
- Merge or close an external PR without task requester approval.
- Cherry-pick code from an external contributor fork directly into this repository while bypassing PR procedure.
- Force internal stage documents such as `_stage{N}.md` and `_report.md` onto external PR review documents.

## Invocation

- Codex: `$external-pr-review` or the `/skills` menu
- Claude Code: `/external-pr-review`
