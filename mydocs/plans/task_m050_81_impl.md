# v0.3.0 release 실행과 post-publish 검증 구현계획서

수행계획서: [`task_m050_81.md`](task_m050_81.md)
GitHub Issue: [#81](https://github.com/postmelee/hyper-waterfall/issues/81)
마일스톤: M050

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | release 기준 정합성 preflight | `mydocs/working/task_m050_81_stage1.md` | version, tag/release, registry, npm 계정 상태 확인 |
| 2 | package와 locale smoke 검증 | `mydocs/working/task_m050_81_stage2.md` | `npm test`, locale dry-run, `npm pack --dry-run`, tarball 포함 파일 확인 |
| 3 | release/tag와 npm publish 실행 | `mydocs/working/task_m050_81_stage3.md`, Git tag `v0.3.0`, GitHub Release, npm package | 별도 승인 확인, tag/release/npm publish, registry 1차 조회 |
| 4 | post-publish 검증과 문서 상태 갱신 | `docs/releases/v0.3.0.md`, `docs/distribution-channels.md`, `mydocs/working/task_m050_81_stage4.md` | `npm view`, `npx`, locale별 post-publish dry-run, 문서 상태 검증 |
| 5 | 통합 검증과 최종 보고 | `mydocs/report/task_m050_81_report.md`, `mydocs/orders/20260528.md` | `npm test`, 문서 grep, `git diff --check`, clean status |

## 문서 위치 확인

수행계획서의 "문서 위치 판단"과 실제 Stage 산출물 경로는 일치한다. release 실행 결과와 배포 채널 상태는 공식 `docs/`에 반영하고, 작업 진행 산출물은 `mydocs/`에 둔다.

| 파일 | 수행계획서상 선택 위치 | Stage 산출물 경로 | 일치 여부 | 비고 |
|---|---|---|---|---|
| `docs/releases/v0.3.0.md` | `docs/releases/` | `docs/releases/v0.3.0.md` | OK | Stage 4에서 실제 release/publish 결과 반영 |
| `docs/distribution-channels.md` | `docs/` | `docs/distribution-channels.md` | OK | Stage 4에서 npm/GitHub/Homebrew 채널 상태 분리 |
| `README.md`, `README.ko.md`, `README.zh-CN.md` | repository root | 필요 시 동일 경로 | OK | 실제 배포 상태와 충돌이 있을 때만 수정 |
| `mydocs/orders/20260528.md` | `mydocs/orders/` | `mydocs/orders/20260528.md` | OK | Stage 5에서 완료 상태 갱신 |
| `mydocs/working/task_m050_81_stage{N}.md` | `mydocs/working/` | `mydocs/working/task_m050_81_stage{N}.md` | OK | 각 Stage 완료보고서 |
| `mydocs/report/task_m050_81_report.md` | `mydocs/report/` | `mydocs/report/task_m050_81_report.md` | OK | 최종 결과보고서 |

## Stage 1 — release 기준 정합성 preflight

### 산출물

신규:

- `mydocs/working/task_m050_81_stage1.md`

수정:

- 없음

### 변경 내용

- `origin/main`의 release 후보 commit을 확인한다.
- 현재 task branch 변경이 release package에 섞이지 않도록 release 실행 기준을 `origin/main`으로 고정한다.
- `package.json`, `templates/manifest.json`, `docs/releases/v0.3.0.md`, `docs/migrations/v0.2.0-to-v0.3.0.md`의 version/tag/status 기준을 확인한다.
- GitHub tag/release `v0.3.0` 기존 존재 여부를 확인한다.
- npm 계정과 `hyper-waterfall@0.3.0` 기존 publish 여부를 확인한다.
- 확인 결과와 중단 조건을 Stage 1 보고서에 기록한다.

### 검증

```bash
git fetch origin --prune
git rev-parse origin/main
git status --short --branch
git tag --list v0.3.0
gh release view v0.3.0 --repo postmelee/hyper-waterfall
node -p "require('./package.json').version"
node -e "const m=require('./templates/manifest.json'); console.log(m.frameworkVersion, m.release && m.release.plannedTag, m.release && m.release.baselineTag, m.release && m.release.status)"
rg -n "0.3.0|v0.3.0|v0.2.0|planned|npm publish|GitHub Release" package.json templates/manifest.json docs/releases/v0.3.0.md docs/migrations/v0.2.0-to-v0.3.0.md
npm whoami
npm view hyper-waterfall@0.3.0 version
git diff --check
```

`gh release view v0.3.0`와 `npm view hyper-waterfall@0.3.0 version`은 release/publish 전에는 미존재 오류가 기대 결과다. 이미 존재하면 Stage 2로 가지 않고 상태 조사와 계획 보정으로 전환한다.

### 커밋

```text
Task #81 Stage 1: release 기준 정합성 preflight
```

## Stage 2 — package와 locale smoke 검증

### 산출물

신규:

- `mydocs/working/task_m050_81_stage2.md`

수정:

- 없음

### 변경 내용

- `npm test`로 CLI 테스트를 재확인한다.
- `en`, `ko`, `zh-CN` locale별 local CLI dry-run을 실행한다.
- `npm pack --dry-run`을 실행해 publish 대상 파일 목록과 package metadata를 확인한다.
- dry-run 출력에 README 3종, localized lifecycle docs, `templates/locales/{en,ko,zh-CN}`가 포함되는지 확인한다.
- 필요하면 `/private/tmp` local tarball smoke로 package 내부 CLI entrypoint와 bundled manifest 접근을 재확인한다.
- Stage 2 결과를 근거로 Stage 3의 외부 publish 승인 요청 가능 여부를 정리한다.

### 검증

```bash
npm test
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-en --manifest "$(pwd)/templates/manifest.json" --locale en --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-ko --manifest "$(pwd)/templates/manifest.json" --locale ko --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-zh --manifest "$(pwd)/templates/manifest.json" --locale zh-CN --dry-run
npm_config_cache=/private/tmp/hyper-waterfall-npm-cache npm pack --dry-run
npm_config_cache=/private/tmp/hyper-waterfall-npm-cache npm pack --json --dry-run
git diff --check
```

tarball 구성 확인 대상:

- `README.md`
- `README.ko.md`
- `README.zh-CN.md`
- `docs/agent-entrypoint.en.md`
- `docs/agent-entrypoint.zh-CN.md`
- `docs/lifecycle/adoption.en.md`
- `docs/lifecycle/update.en.md`
- `docs/lifecycle/update_pr.en.md`
- `docs/lifecycle/adoption.zh-CN.md`
- `docs/lifecycle/update.zh-CN.md`
- `docs/lifecycle/update_pr.zh-CN.md`
- `templates/locales/en/AGENTS.md`
- `templates/locales/ko/AGENTS.md`
- `templates/locales/zh-CN/AGENTS.md`
- `templates/locales/en/mydocs/manual/`
- `templates/locales/ko/mydocs/manual/`
- `templates/locales/zh-CN/mydocs/manual/`

### 커밋

```text
Task #81 Stage 2: package와 locale smoke 검증
```

## Stage 3 — release/tag와 npm publish 실행

### 산출물

신규:

- `mydocs/working/task_m050_81_stage3.md`
- Git tag `v0.3.0`
- GitHub Release `v0.3.0`
- npm package `hyper-waterfall@0.3.0`

수정:

- 없음

### 변경 내용

- Stage 1-2 결과를 요약해 작업지시자에게 `v0.3.0` release/tag/npm publish 실행을 별도 승인 요청한다.
- 승인 전에는 `git tag`, `git push origin v0.3.0`, `gh release create`, `npm publish`를 실행하지 않는다.
- 승인 후 release 대상 commit을 다시 확인하고 `v0.3.0` tag를 생성해 원격에 push한다.
- `docs/releases/v0.3.0.md`의 release notes 초안을 기반으로 GitHub Release를 생성한다.
- npm publish는 release commit 기준 clean checkout 또는 별도 release worktree에서 실행한다.
- publish 직후 registry 1차 조회와 release URL을 Stage 3 보고서에 기록한다.

### 검증

```bash
git rev-parse origin/main
git status --short --branch
git tag v0.3.0 {release-commit}
git push origin v0.3.0
gh release create v0.3.0 --repo postmelee/hyper-waterfall --title "v0.3.0 - 다국어 적용 진입점과 locale pack" --notes-file {notes-file}
npm publish
npm view hyper-waterfall@0.3.0 version
npm view hyper-waterfall@0.3.0 dist.tarball
git diff --check
```

`npm publish`에서 2FA가 필요하면 작업지시자가 직접 입력하는 흐름으로 진행하고, OTP나 auth token은 문서에 기록하지 않는다.

### 커밋

```text
Task #81 Stage 3: v0.3.0 release와 npm publish 실행
```

## Stage 4 — post-publish 검증과 문서 상태 갱신

### 산출물

신규:

- `mydocs/working/task_m050_81_stage4.md`

수정:

- `templates/manifest.json`
- `test/cli-smoke.test.js`
- `docs/releases/v0.3.0.md`
- `docs/distribution-channels.md`
- `docs/migrations/v0.2.0-to-v0.3.0.md`
- `docs/localization-smoke.md`
- 필요 시 `README.md`
- 필요 시 `README.ko.md`
- 필요 시 `README.zh-CN.md`

### 변경 내용

- npm registry metadata와 dist tarball, bin entry를 확인한다.
- 빈 임시 디렉터리에서 `npx hyper-waterfall@0.3.0 --version`, `--help`, locale별 `init --dry-run`을 실행한다.
- `docs/releases/v0.3.0.md`의 readiness/publish 후 확인 체크리스트와 실제 결과를 갱신한다.
- `docs/distribution-channels.md`에서 npm/GitHub 상태를 `0.3.0` 기준으로 갱신하고, Homebrew tap 등 제외 채널은 후속 필요 상태로 분리한다.
- 실제 release 완료 상태에 맞춰 `templates/manifest.json`의 `release.status`를 `released`로 전환하고 테스트 기대값을 갱신한다.
- migration/smoke 문서에서 release 전 후보 표현을 실제 publish 완료 상태와 맞춘다.
- README 3종에 실제 publish 상태와 충돌하는 문구가 있으면 최소 수정한다.

### 검증

```bash
npm view hyper-waterfall@0.3.0 version
npm view hyper-waterfall@0.3.0 dist.tarball
npm view hyper-waterfall@0.3.0 bin --json
npx hyper-waterfall@0.3.0 --version
npx hyper-waterfall@0.3.0 --help
npx hyper-waterfall@0.3.0 init --repo /private/tmp/hw-postpublish-en --locale en --dry-run
npx hyper-waterfall@0.3.0 init --repo /private/tmp/hw-postpublish-ko --locale ko --dry-run
npx hyper-waterfall@0.3.0 init --repo /private/tmp/hw-postpublish-zh --locale zh-CN --dry-run
rg -n "0.3.0|v0.3.0|npm|npx|Homebrew|post-publish|publish 후" README.md README.ko.md README.zh-CN.md docs/releases/v0.3.0.md docs/distribution-channels.md
git diff --check
```

### 커밋

```text
Task #81 Stage 4: post-publish 검증과 배포 문서 갱신
```

## Stage 5 — 통합 검증과 최종 보고

### 산출물

신규:

- `mydocs/report/task_m050_81_report.md`

수정:

- `mydocs/orders/20260528.md`

### 변경 내용

- 최종 결과보고서에 release 대상 commit, GitHub Release URL, npm registry URL, post-publish smoke 결과, 남은 후속 작업을 정리한다.
- 오늘할일 #81 상태를 완료로 갱신한다.
- 통합 검증과 working tree 상태를 확인한다.
- `task-final-report` 진입 전 PR 준비 상태를 만든다.

### 검증

```bash
npm test
rg -n "0.3.0|v0.3.0|npm publish|post-publish|Homebrew|npx hyper-waterfall@0.3.0" README.md README.ko.md README.zh-CN.md docs/releases/v0.3.0.md docs/distribution-channels.md mydocs/report/task_m050_81_report.md
git diff --check
git status --short --branch
```

### 커밋

```text
Task #81 Stage 5: 통합 검증과 최종 보고
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- `gh release view v0.3.0` 또는 `npm view hyper-waterfall@0.3.0 version`이 Stage 1에서 이미 성공하면 중복 release/publish 가능성이 있으므로 Stage 2-3 진행을 중단하고 작업지시자에게 보고한다.
- Stage 3 외부 상태 변경 명령은 Stage 1-2 보고서 승인과 별도 release/publish 승인 없이 실행하지 않는다.
- 문서 위치가 수행계획서 판단과 달라지면 구현 전에 수행계획서 또는 구현계획서를 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m050_81_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #81 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- Stage 3의 외부 tag/release/npm publish는 Git 커밋과 별도 외부 산출물이므로, Stage 3 보고서 커밋에 대상 commit과 실행 결과를 기록한다.

## 단계 의존성

- Stage 2는 Stage 1에서 중복 release/publish 조건이 없고 version 기준이 일치할 때만 진행한다.
- Stage 3은 Stage 2 package/locale smoke가 통과하고 작업지시자가 release/tag/npm publish 실행을 별도 승인한 뒤 진행한다.
- Stage 4는 Stage 3에서 GitHub Release와 npm publish가 실제 완료된 뒤 진행한다.
- Stage 5는 Stage 4 post-publish 검증과 문서 갱신이 완료된 뒤 진행한다.

## 위험과 대응

- **동일 version 재배포 불가**: Stage 1에서 registry 기존 상태를 확인하고, Stage 2 smoke 통과 후 별도 승인 없이는 publish하지 않는다.
- **release commit drift**: Stage 1에서 `origin/main` release 후보 commit을 고정하고, Stage 3 실행 전 다시 확인한다.
- **task branch 산출물 혼입**: npm publish는 task branch가 아니라 release commit 기준 clean checkout 또는 별도 release worktree에서 실행한다.
- **2FA 또는 계정 권한 문제**: OTP와 token은 기록하지 않고 작업지시자가 직접 입력 가능한 흐름으로 둔다.
- **post-publish 전파 지연**: npm registry나 npx 캐시 반영이 늦으면 실패 명령과 시각을 기록하고 재시도 여부를 확인한다.
- **채널별 상태 불일치**: npm/GitHub와 Homebrew 상태를 한 문장으로 합치지 않고 채널별 상태 표로 분리한다.

## 승인 요청 사항

- 위 Stage 분할, 산출물, 검증 명령, 커밋 메시지로 진행해도 되는지 승인 요청한다.
- Stage 1-2를 먼저 진행하고, Stage 3의 `git tag`, `gh release create`, `npm publish`는 별도 명시 승인 전까지 실행하지 않는 방침을 승인 요청한다.
- npm publish를 release commit 기준 clean checkout 또는 별도 release worktree에서 실행해 task branch 산출물이 package에 섞이지 않게 하는 방침을 승인 요청한다.
