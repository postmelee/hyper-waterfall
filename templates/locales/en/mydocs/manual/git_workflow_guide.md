# Git Workflow Manual

This manual defines branch policy, the Git workflow diagram, and maintainer/contributor workflow scripts for this repository. Read it before creating a task branch, publishing a PR, merging, or cleaning up. Document file locations and task approval procedures are covered in `document_structure_guide.md` and `task_workflow_guide.md`.

## Core Terms

- **`{BASE_BRANCH}`**: the development integration branch where work PRs merge. New work branches start from the latest `origin/{BASE_BRANCH}`.
- **`local/taskN`**: local work branch for Issue N. Stage commits and report commits accumulate here.
- **`publish/taskN`**: remote PR branch used to publish `local/taskN`. Delete it after PR merge.
- **Open PR**: a reviewable PR created against `{BASE_BRANCH}` after the Hyper-Waterfall final report.
- **Separate worktree**: a separate directory used to work on another branch when the main worktree is occupied by another task.
- **GitHub Release/tag**: the canonical distribution unit for Hyper-Waterfall. See [`release_update_protocol.md`](release_update_protocol.md).
- **Hyper-Waterfall version update PR**: an Issue-backed PR that updates an adopted repository to a new Hyper-Waterfall release/tag. See [`release_update_protocol.md`](release_update_protocol.md) and `docs/lifecycle/update_pr.md`.

## Branch Management

| Branch | Purpose |
|--------|---------|
| `{RELEASE_BRANCH}` | Final release branch. Stable versions are preserved by tags such as v0.5.0 |
| `{BASE_BRANCH}` | Development integration |
| `local/task{num}` | Per-task work branch |
| `publish/task{num}` | Remote publication branch for a PR to `{BASE_BRANCH}`. Delete after PR merge |

## Git Workflow

```text
local/task{N} -- commit · commit · commit --> push publish/task{N}
                                            |
                                            +--> PR to {BASE_BRANCH} -> review -> merge
                                                                            |
                                                                            +--> accumulates on {BASE_BRANCH}
                                                                                   |
                                                                                   +--> PR to {RELEASE_BRANCH} at release time -> tag
```

Parallel tasks repeat the same flow with independent `local/task{N}` branches.

- **Task branch**: commit in small units on `local/task{N}`.
- **Remote publication branch**: when `local/task{N}` is reviewable, push it as `publish/task{N}` and create a PR to `{BASE_BRANCH}`.
- **Remote push**: keep `local/task` branches local by default. Do not push them directly. Remote branches should be `publish/task{N}` and merged result branches.
- **PR to `{BASE_BRANCH}`**: task PRs are created as Open PRs by default, with final report and verification results reflected in the PR body.
- **Merge strategy**: keep merge commits or no-ff behavior for PRs to `{BASE_BRANCH}` by default. Do not make squash merge the default because it can erase Stage commit meaning.
- **Merge to `{RELEASE_BRANCH}` by PR**: at release time, create a `{BASE_BRANCH}` -> `{RELEASE_BRANCH}` PR, review/approve, merge, then tag.

## PR Type Separation

Normal task PRs and release PRs are separate. Task PRs follow `local/taskN -> publish/taskN -> {BASE_BRANCH}`. Release PRs follow `{BASE_BRANCH} -> {RELEASE_BRANCH}`. Updates for adopted repositories happen after release as separate Hyper-Waterfall version update PRs.

| Type | Purpose | Branch Flow | PR Title |
|---|---|---|---|
| task PR | Apply repository feature, documentation, or operations work by Issue | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: {task title}` |
| release PR | Promote accumulated framework changes from `{BASE_BRANCH}` to `{RELEASE_BRANCH}` and establish the tag baseline | `{BASE_BRANCH}` -> `{RELEASE_BRANCH}` | `Release: {version}` |
| Hyper-Waterfall version update PR | Update an adopted repository from the current version to the target release/tag | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: Hyper-Waterfall {fromVersion} -> {toVersion} version update` |

## Maintainer Workflow

```bash
# 1. Push local/taskN to publish/taskN and create an Open PR to {BASE_BRANCH}
git checkout local/task17
git push origin local/task17:publish/task17
gh pr create --base {BASE_BRANCH} --head publish/task17 --title "Task #17: title" --body-file /tmp/task17-pr-body.md

# 2. Review and merge PR to {BASE_BRANCH}
gh pr review --approve
gh pr merge --merge --delete-branch

# 3. Create PR from {BASE_BRANCH} to {RELEASE_BRANCH} at release time
gh pr create --base {RELEASE_BRANCH} --head {BASE_BRANCH} --title "Release: title"
gh pr review --approve
gh pr merge --merge --delete-branch=false

# 4. Check manifest/migration before release tag creation
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
grep -nE 'target version|added files|modified files|manual review|conflict risk|verification' docs/migrations/v{from}-to-v{to}.md
```

## Contributor Workflow (Fork-based)

```bash
# 1. Fork the original repository once on GitHub
# 2. Work in the fork
git clone https://github.com/{contributor}/{REPO_NAME}.git
git checkout -b feature/my-task
# ... work and commit ...
git push origin feature/my-task

# 3. Create a PR to the original repository's {BASE_BRANCH}
gh pr create --repo {REPO_SLUG} --base {BASE_BRANCH} --head {contributor}:feature/my-task --title "title"

# 4. Maintainer reviews and merges
```

## FAQ / Common Mistakes

### When the main worktree conflicts with another agent

Run `git status --short --branch` first to check the current branch and uncommitted changes. Do not revert another worker's changes. Prefer starting new work in a separate worktree. If you must touch the same files as an active task, share the conflict scope with the task requester and decide the order.

### When `{BASE_BRANCH}` seems to need rebase

The default flow is to update `{BASE_BRANCH}` with `git pull --ff-only`, then create a new `local/taskN` from the latest `origin/{BASE_BRANCH}`. Do not arbitrarily rebase an active work branch. If a PR conflict or stale base appears, first run `git fetch origin`, identify conflicting files, and get task requester approval before choosing rebase or merge recovery.

### When the wrong branch was pushed

If `local/taskN` was pushed directly or a remote branch has the wrong name, stop pushing. If no PR exists yet, push the correct `publish/taskN` branch and delete the wrong remote branch after task requester confirmation. If a PR already exists, inspect PR base/head and diff, then decide whether to create a new PR or repair the existing PR head.

### When adding document links to a PR body

Follow [`pr_command_guide.md`](pr_command_guide.md) for PR creation commands, `--body-file`, SHA-pinned GitHub blob URLs, and work document link format. This Git manual only covers branch flow and PR types.

### When local branches remain after merge

First confirm the PR is `MERGED`. After merge, return to `{BASE_BRANCH}`, update it, and clean up remote `publish/taskN` and local `local/taskN`. Follow the order documented in the [`pr-merge-cleanup`](../skills/pr-merge-cleanup/SKILL.md) SKILL.

## Related Manuals

- [`task_workflow_guide.md`](task_workflow_guide.md): Issue-based task start, stage approval, final report, and PR publication.
- [`document_structure_guide.md`](document_structure_guide.md): document location and filenames for plans, stage reports, and final reports.
- [`pr_command_guide.md`](pr_command_guide.md): PR creation commands and document link rules.
- [`pr_process_guide.md`](pr_process_guide.md): PR handling entrypoint.
- [`release_update_protocol.md`](release_update_protocol.md): release/tag and update protocol.
