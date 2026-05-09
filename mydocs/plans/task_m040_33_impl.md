# task_m040_33_impl.md - npm publish 실행과 post-publish 검증 구현계획서

수행계획서: [`task_m040_33.md`](task_m040_33.md)
GitHub Issue: [#33](https://github.com/postmelee/hyper-waterfall/issues/33)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | publish 전 기준 정합성 재확인 | `mydocs/working/task_m040_33_stage1.md` | release/tag, package, manifest, npm 계정, registry 기존 상태 확인 |
| 2 | v0.2.0 tag 기준 package와 local tarball smoke 재검증 | `mydocs/working/task_m040_33_stage2.md`, `/private/tmp/hyper-waterfall-task33-publish-v020` | `npm test`, `npm pack`, tarball install smoke, CLI smoke |
| 3 | publish 승인 게이트와 npm publish 실행 | `mydocs/working/task_m040_33_stage3.md`, npm package `hyper-waterfall@0.2.0` | 별도 승인 확인, v0.2.0 tag worktree 기준 `npm publish`, publish 직후 registry 조회 |
| 4 | post-publish registry/npx 검증과 최종 정리 | `mydocs/working/task_m040_33_stage4.md` | `npm view`, `dist-tags`, `npx --version`, `npx --help` |

## Stage 1 - publish 전 기준 정합성 재확인

### 산출물

신규:

- `mydocs/working/task_m040_33_stage1.md`

수정:

- 없음. Stage 1은 검증 결과와 판단을 단계 보고서에 기록한다.

### 변경 내용

- 현재 작업 브랜치의 기준 commit과 `origin/main` 상태를 확인한다.
- `v0.2.0` local tag, remote tag, GitHub Release 상태를 확인한다.
- `package.json` version, `templates/manifest.json`의 framework version과 release tag, 관련 문서의 `v0.2.0` 기준을 대조한다.
- `npm whoami`로 publish 계정을 확인하되 계정명 외 인증 비밀값은 문서에 남기지 않는다.
- `npm view hyper-waterfall@0.2.0 version`으로 동일 version의 기존 registry 상태를 확인한다.
- `v0.2.0` tag SHA와 `origin/main` SHA가 다르면 npm `gitHead`와 package contents가 release 기준에서 drift되지 않도록 Stage 2-3을 `v0.2.0` tag 기준 detached worktree에서 실행한다.
- 이미 `hyper-waterfall@0.2.0`이 존재하면 Stage 2 이후를 중단하고 상태 조사 결과를 작업지시자에게 보고한다.

### 검증

```bash
git fetch --tags origin --prune
git rev-parse HEAD
git rev-parse origin/main
git tag --list v0.2.0
git ls-remote origin refs/tags/v0.2.0
gh release view v0.2.0 --repo postmelee/hyper-waterfall --json tagName,name,isDraft,isPrerelease,url,targetCommitish
node -p "require('./package.json').version"
node -e "const m=require('./templates/manifest.json'); console.log(m.frameworkVersion, m.release && m.release.plannedTag)"
rg -n '0.2.0|v0.2.0|hyper-waterfall@0.2.0|npm publish|GitHub Release|manifest|canonical' package.json templates/manifest.json docs/releases/v0.2.0-npm-publish.md docs/distribution-channels.md README.md
npm whoami
npm view hyper-waterfall@0.2.0 version
git diff --check
```

`npm view hyper-waterfall@0.2.0 version`이 E404 또는 no match를 반환하면 미게시 상태로 기록한다. `0.2.0`을 반환하면 동일 version이 이미 존재하므로 Stage 2 이후를 중단한다.

### 커밋

```text
Task #33 Stage 1: npm publish 전 기준 정합성 확인
```

## Stage 2 - v0.2.0 tag 기준 package와 local tarball smoke 재검증

### 산출물

신규:

- `mydocs/working/task_m040_33_stage2.md`

수정:

- 필요 시 `docs/releases/v0.2.0-npm-publish.md`

임시 산출물:

- `/private/tmp/hyper-waterfall-task33-publish-v020`
- `/private/tmp/hyper-waterfall-task33-pack.*`
- `/private/tmp/hyper-waterfall-task33-smoke.*`
- `/private/tmp/hyper-waterfall-task33-target.*`

### 변경 내용

- `/private/tmp/hyper-waterfall-task33-publish-v020`에 `v0.2.0` tag 기준 detached worktree를 준비한다.
- publish 후보 worktree에서 `git rev-parse HEAD`가 `git rev-list -n 1 v0.2.0`와 일치하는지 확인한다.
- publish 후보 worktree에서 `npm test`로 CLI test suite를 재실행한다.
- publish 후보 worktree에서 `npm pack --dry-run`으로 publish 대상 파일 구성을 확인한다.
- `/private/tmp` 아래에 pack, smoke, target 임시 디렉터리를 만들고 local tarball install smoke를 수행한다.
- tarball에서 설치된 `hyper-waterfall`의 `--version`, `--help`, `init --dry-run` 결과를 확인한다.
- `docs/releases/v0.2.0-npm-publish.md`의 publish 전 체크리스트와 smoke 기준이 실제 결과와 어긋나면 최소 범위로 갱신한다.
- Stage 완료 시 단계 보고서에 pack 결과, tarball 경로, smoke 결과, 문서 수정 여부를 기록한다.

### 검증

```bash
PUBLISH_DIR="/private/tmp/hyper-waterfall-task33-publish-v020"
git worktree add --detach "$PUBLISH_DIR" v0.2.0
git -C "$PUBLISH_DIR" rev-parse HEAD
git rev-list -n 1 v0.2.0
PACK_DIR="$(mktemp -d /private/tmp/hyper-waterfall-task33-pack.XXXXXX)"
SMOKE_DIR="$(mktemp -d /private/tmp/hyper-waterfall-task33-smoke.XXXXXX)"
REPO_DIR="$(mktemp -d /private/tmp/hyper-waterfall-task33-target.XXXXXX)"
(
  cd "$PUBLISH_DIR"
  npm test
  npm pack --dry-run
  npm pack --pack-destination "$PACK_DIR"
)
npm install "$PACK_DIR/hyper-waterfall-0.2.0.tgz" --prefix "$SMOKE_DIR"
"$SMOKE_DIR/node_modules/.bin/hyper-waterfall" --version
"$SMOKE_DIR/node_modules/.bin/hyper-waterfall" --help
"$SMOKE_DIR/node_modules/.bin/hyper-waterfall" init --repo "$REPO_DIR" --dry-run
git -C "$PUBLISH_DIR" diff --check
git diff --check
```

### 커밋

```text
Task #33 Stage 2: npm package와 tarball smoke 재검증
```

## Stage 3 - publish 승인 게이트와 npm publish 실행

### 산출물

신규:

- `mydocs/working/task_m040_33_stage3.md`

외부 산출물:

- npm registry package `hyper-waterfall@0.2.0`

수정:

- 필요 시 `docs/releases/v0.2.0-npm-publish.md`

### 변경 내용

- Stage 1과 Stage 2 검증 결과를 요약해 작업지시자에게 `npm publish` 별도 명시 승인을 요청한다.
- 별도 승인이 없으면 `npm publish`를 실행하지 않는다.
- 승인 후 `/private/tmp/hyper-waterfall-task33-publish-v020`의 `v0.2.0` tag 기준 detached worktree에서 `npm publish`를 실행한다. OTP가 필요하면 작업지시자가 직접 입력 가능한 방식으로 진행하고 OTP 값은 기록하지 않는다.
- publish 직후 `npm view hyper-waterfall@0.2.0 version`으로 registry 반영 여부를 1차 확인한다.
- publish가 실패하면 실패 명령, 오류 요약, registry 상태를 단계 보고서에 기록하고 삭제, unpublish, dist-tag 변경 같은 후속 조치는 별도 승인 없이 실행하지 않는다.

### 검증

```bash
npm view hyper-waterfall@0.2.0 version
PUBLISH_DIR="/private/tmp/hyper-waterfall-task33-publish-v020"
git -C "$PUBLISH_DIR" rev-parse HEAD
git rev-list -n 1 v0.2.0
(
  cd "$PUBLISH_DIR"
  npm publish
)
npm view hyper-waterfall@0.2.0 version
git -C "$PUBLISH_DIR" diff --check
git diff --check
```

첫 번째 `npm view hyper-waterfall@0.2.0 version`에서 `0.2.0`을 반환하면 `npm publish`를 실행하지 않는다. E404 또는 no match일 때만 별도 승인 내용을 재확인하고 `npm publish`를 실행한다.

### 커밋

```text
Task #33 Stage 3: npm publish 실행 결과 기록
```

## Stage 4 - post-publish registry/npx 검증과 최종 정리

### 산출물

신규:

- `mydocs/working/task_m040_33_stage4.md`

수정:

- 필요 시 `docs/releases/v0.2.0-npm-publish.md`

### 변경 내용

- publish 후 registry metadata를 확인한다.
- `npm view hyper-waterfall@0.2.0 gitHead`가 publish 대상 commit과 일치하는지 확인하고, 차이가 있으면 이유를 기록한다.
- `npm view hyper-waterfall dist-tags --json`으로 `latest` 등 dist-tag 상태를 기록한다.
- `npx hyper-waterfall@0.2.0 --version`과 `--help`로 실제 사용자 설치 경로를 smoke 검증한다.
- 최종 보고서 작성 전에 Stage 1~4 결과, 승인 지점, registry URL, Homebrew 후속 작업 선행 조건 충족 여부를 정리한다.

### 검증

```bash
npm view hyper-waterfall@0.2.0 version
npm view hyper-waterfall@0.2.0 dist.tarball
npm view hyper-waterfall@0.2.0 gitHead
npm view hyper-waterfall dist-tags --json
npx hyper-waterfall@0.2.0 --version
npx hyper-waterfall@0.2.0 --help
git status --short --branch
git diff --check
```

### 커밋

```text
Task #33 Stage 4: npm publish 후 registry와 npx 검증
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 동일 version이 registry에 이미 있으면 `npm publish`를 실행하지 않는다.
- Stage 3의 `npm publish`는 Stage 1-2 완료와 별도 명시 승인 후에만 실행한다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 보고서와 해당 Stage의 문서 산출물을 묶는다.
- `npm publish`는 Git 커밋으로 되돌릴 수 없는 외부 산출물이므로 Stage 3 보고서에 승인 시각, 실행 명령, 결과, 후속 검증을 자세히 기록한다.
- 커밋 메시지는 `Task #33 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 승인 전에는 Stage 1 산출물을 만들지 않는다.

## 단계 의존성

- Stage 2는 Stage 1에서 release/tag, package, manifest, registry 기존 상태가 확인된 뒤 진행하며, package 검증은 `v0.2.0` tag 기준 detached worktree에서 수행한다.
- Stage 3은 Stage 2의 package와 local tarball smoke가 통과한 뒤 진행한다.
- Stage 3의 `npm publish`는 작업지시자의 별도 명시 승인 후 `v0.2.0` tag 기준 detached worktree에서만 실행한다.
- Stage 4는 Stage 3에서 `npm publish`가 성공했거나, 실패 상태를 보고하기로 승인된 뒤 진행한다.
- 최종 결과보고서와 PR 게시는 Stage 4 승인 이후 `task-final-report` 절차로 진행한다.

## 위험과 대응

- **동일 version 재배포 불가**: Stage 1에서 기존 registry 상태를 확인하고, Stage 2에서 tarball smoke를 통과한 뒤에만 publish 승인 요청으로 넘어간다.
- **registry에 이미 존재하는 version**: `npm view hyper-waterfall@0.2.0 version`이 `0.2.0`을 반환하면 publish를 중단하고 상태 조사로 전환한다.
- **2FA 또는 인증 실패**: `npm whoami`와 `npm publish` 결과를 분리해 기록하고, OTP 값은 입력하거나 문서화하지 않는다.
- **canonical 기준 drift**: Stage 1에서 GitHub Release/tag, package version, manifest 기준을 대조하고 Stage 4에서 npm `gitHead`를 기록한다.
- **외부 상태 변경 rollback 비용**: unpublish, dist-tag 수정, package deprecate 같은 조치는 이번 계획에 포함하지 않고 별도 승인 대상으로 둔다.
- **네트워크 일시 장애**: npm registry, npx, GitHub 조회 실패는 명령과 오류 요약을 남기고 같은 Stage 안에서 재시도 여부를 확인한다.

## 승인 요청 사항

- Stage 1~4 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Stage 3에서 `npm publish`를 별도 명시 승인 후 실행하는 게이트에 동의?
- 동일 version이 이미 registry에 있으면 publish를 중단하고 상태 조사로 전환하는 방침에 동의?
- npm OTP, token, 계정 비밀값을 문서에 기록하지 않는 방침에 동의?

승인되면 Stage 1 구현을 시작한다.
