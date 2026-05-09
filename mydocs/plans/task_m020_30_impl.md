# task_m020_30_impl.md - v0.2.0 GitHub Release/tag 생성 구현계획서

수행계획서: [`task_m020_30.md`](task_m020_30.md)
GitHub Issue: [#30](https://github.com/postmelee/hyper-waterfall/issues/30)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | release 전 최종 검증과 대상 commit 확정 | `mydocs/working/task_m020_30_stage1.md` | manifest/version/release notes 정합성, tag/release 미존재, release 대상 SHA 기록 |
| 2 | v0.2.0 tag와 GitHub Release 생성 | `mydocs/working/task_m020_30_stage2.md`, Git tag `v0.2.0`, GitHub Release `v0.2.0` | tag SHA, 원격 tag, release title/body/draft 상태 확인 |
| 3 | release 생성 결과 검증과 후속 경계 정리 | `mydocs/working/task_m020_30_stage3.md` | release view/list, npm publish 미실행, 최종 상태 확인 |

## Stage 1 — release 전 최종 검증과 대상 commit 확정

### 산출물

신규:

- `mydocs/working/task_m020_30_stage1.md`

수정:

- 없음. Stage 1은 검증 결과와 release 대상 SHA를 단계 보고서에 기록한다.

### 변경 내용

- `origin/main`을 최신화하고 release 대상 commit SHA를 `git rev-parse origin/main`으로 확정한다.
- `v0.2.0` local tag, remote tag, GitHub Release가 아직 없는지 확인한다.
- `package.json`, `templates/manifest.json`, `docs/releases/v0.2.0.md`, migration guide, README, distribution strategy의 `0.2.0`/`v0.2.0` 표현을 대조한다.
- `docs/releases/v0.2.0.md`의 release notes 초안이 Stage 2에서 사용할 수 있는 상태인지 확인한다.
- `templates/manifest.json`의 `release.status: planned`는 변경하지 않는다.

### 검증

```bash
git fetch --tags origin --prune
git rev-parse origin/main
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n '0.2.0|v0.2.0|plannedTag|baselineTag|GitHub Release|manifest|migration|pending-release|ready' templates/manifest.json docs/migrations/v0.1.0-to-v0.2.0.md README.md docs/distribution-channels.md docs/releases/v0.2.0.md package.json
git tag --list --sort=version:refname
git ls-remote origin refs/tags/v0.2.0
gh release list --repo postmelee/hyper-waterfall --limit 20
git diff --check
```

### 커밋

```text
Task #30 Stage 1: release 전 최종 검증과 대상 commit 확정
```

## Stage 2 — v0.2.0 tag와 GitHub Release 생성

### 산출물

신규:

- `mydocs/working/task_m020_30_stage2.md`

외부 산출물:

- local Git tag `v0.2.0`
- remote Git tag `v0.2.0`
- GitHub Release `v0.2.0`

임시 산출물:

- `/private/tmp/hyper-waterfall-v0.2.0-release-notes.md`

### 변경 내용

- Stage 1에서 확정한 `origin/main` SHA를 대상으로 `v0.2.0` tag를 생성한다.
- `git push origin refs/tags/v0.2.0`로 tag를 원격에 게시한다.
- `docs/releases/v0.2.0.md`의 release notes 초안을 `/private/tmp/hyper-waterfall-v0.2.0-release-notes.md`에 작성한다.
- `gh release create v0.2.0 --verify-tag --title "v0.2.0 - 배포·업데이트 프로토콜 MVP" --notes-file /private/tmp/hyper-waterfall-v0.2.0-release-notes.md`로 GitHub Release를 생성한다.
- release 생성 결과와 명령 출력 요약을 `mydocs/working/task_m020_30_stage2.md`에 기록한다.

### 실행 명령

아래 `<RELEASE_SHA>`는 Stage 1에서 확정한 `origin/main` SHA로 치환한다.

```bash
git tag v0.2.0 <RELEASE_SHA>
git push origin refs/tags/v0.2.0
gh release create v0.2.0 --repo postmelee/hyper-waterfall --verify-tag --title "v0.2.0 - 배포·업데이트 프로토콜 MVP" --notes-file /private/tmp/hyper-waterfall-v0.2.0-release-notes.md
```

### 검증

```bash
git tag --list v0.2.0
git rev-list -n 1 v0.2.0
git ls-remote origin refs/tags/v0.2.0
gh release view v0.2.0 --repo postmelee/hyper-waterfall --json tagName,name,isDraft,isPrerelease,url,targetCommitish
git diff --check
```

### 커밋

```text
Task #30 Stage 2: v0.2.0 tag와 GitHub Release 생성
```

## Stage 3 — release 생성 결과 검증과 후속 경계 정리

### 산출물

신규:

- `mydocs/working/task_m020_30_stage3.md`

수정:

- 없음. Stage 3은 생성된 release 검증 결과와 후속 작업 경계를 단계 보고서에 기록한다.

### 변경 내용

- `gh release view v0.2.0`로 release 제목, tag, draft/prerelease 여부, URL, 본문을 확인한다.
- tag 목록과 remote tag를 다시 확인한다.
- npm publish, Homebrew, Docker, plugin 배포가 이번 task에서 실행되지 않았음을 보고서에 기록한다.
- 후속 작업 후보를 npm publish와 M030 배포 채널 작업으로 분리해 기록한다.

### 검증

```bash
git tag --list --sort=version:refname
git ls-remote origin refs/tags/v0.2.0
gh release view v0.2.0 --repo postmelee/hyper-waterfall
gh release list --repo postmelee/hyper-waterfall --limit 20
git status --short --branch
git diff --check
```

### 커밋

```text
Task #30 Stage 3: release 생성 결과 검증과 후속 경계 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- Stage 2는 외부에 tag와 GitHub Release를 생성하는 단계이므로, Stage 1 보고서 승인 후에만 실행한다.
- `v0.2.0` tag 또는 GitHub Release가 이미 존재하면 Stage 2 생성 명령을 실행하지 않고 작업지시자에게 상태를 보고한다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 보고서와 해당 Stage의 문서 산출물을 묶는다.
- Stage 2의 외부 산출물인 tag와 GitHub Release는 Git 커밋으로 되돌릴 수 없으므로, 생성 전 검증과 생성 후 검증 결과를 단계 보고서에 자세히 기록한다.
- 커밋 메시지는 `Task #30 Stage {N}: {핵심 내용 요약}` 형식을 따른다.

## 단계 의존성

- Stage 2는 Stage 1에서 `origin/main` SHA, tag/release 미존재, release notes 초안이 확정된 뒤 진행한다.
- Stage 3은 Stage 2에서 tag push와 GitHub Release 생성이 성공한 뒤 진행한다.
- 최종 결과보고서와 PR 게시는 Stage 3 승인 이후 `task-final-report` 절차로 진행한다.

## 위험과 대응

- **잘못된 tag 대상**: `local/task30` 문서 커밋이 아니라 Stage 1에서 확정한 `origin/main` SHA에 tag를 생성한다. Stage 2 검증에서 `git rev-list -n 1 v0.2.0`와 remote tag SHA를 대조한다.
- **중복 tag/release**: Stage 1에서 local tag, remote tag, GitHub Release 미존재를 확인한다. 존재하면 생성 명령을 실행하지 않는다.
- **외부 산출물 rollback 비용**: tag push와 GitHub Release는 외부 상태를 만든다. 실패 시 삭제나 수정은 별도 승인 없이 수행하지 않고 상태를 보고한다.
- **release notes 불일치**: Stage 2에서 임시 notes 파일을 만들고, Stage 3에서 `gh release view` 본문과 `docs/releases/v0.2.0.md` 초안을 대조한다.
- **npm publish 혼선**: 이번 task에서 npm publish는 실행하지 않는다. `docs/releases/v0.2.0-npm-publish.md` 기준의 publish 승인 게이트는 후속 작업으로 남긴다.

## 승인 요청 사항

- Stage 1~3 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Stage 2에서 `v0.2.0` tag를 Stage 1에서 확정한 `origin/main` SHA에 생성하는 방향에 동의?
- Stage 2에서 `git push origin refs/tags/v0.2.0`와 `gh release create v0.2.0 --verify-tag`를 실행하는 범위에 동의?
- `templates/manifest.json`의 `release.status: planned` 유지, npm publish 제외, root/directory checksum 산식 제외 범위에 동의?

승인되면 Stage 1 구현을 시작한다.
