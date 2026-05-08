# task_m020_21_impl.md - npm publish 준비와 배포 전 검증 정리 구현계획서

수행계획서: [`task_m020_21.md`](task_m020_21.md)
GitHub Issue: [#21](https://github.com/postmelee/hyper-waterfall/issues/21)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | package metadata와 pack 구성 점검 | `package.json`, `mydocs/working/task_m020_21_stage1.md` | `npm test`, `npm pack --dry-run`, CLI version/help, `git diff --check` |
| 2 | npm publish 전 체크리스트와 smoke 절차 작성 | `docs/releases/v0.2.0-npm-publish.md`, `mydocs/working/task_m020_21_stage2.md` | publish 체크리스트 grep, `git diff --check` |
| 3 | README와 배포 채널 정합성 보강 | `README.md`, `docs/distribution-channels.md`, `docs/releases/v0.2.0.md`, `mydocs/working/task_m020_21_stage3.md` | npx/npm/canonical 설명 grep, `git diff --check` |
| 4 | 통합 검증과 publish 승인 경계 확정 | `docs/releases/v0.2.0-npm-publish.md`, `mydocs/working/task_m020_21_stage4.md` | `npm test`, dry-run pack, 로컬 tarball smoke, CLI version/help, 상태 확인 |

## Stage 1 - package metadata와 pack 구성 점검

### 산출물

수정:

- `package.json` (metadata, files, bin, engines, scripts 보강이 필요할 때만)
- `mydocs/working/task_m020_21_stage1.md`

### 변경 내용

- `package.json`의 `name`, `version`, `description`, `license`, `bin`, `scripts.test`, `engines`, `files`, `keywords`를 점검한다.
- npm publish 전 metadata로 `repository`, `bugs`, `homepage` 등 public registry에서 필요한 설명 필드가 부족한지 판단한다.
- `files` 범위가 CLI 실행에 필요한 `bin`, `src`, `templates`, `docs`, `README.md`, `LICENSE`를 포함하는지 `npm pack --dry-run` 결과로 확인한다.
- 부족한 metadata나 포함 범위가 확인되면 `package.json`만 최소 수정한다. CLI 기능과 command contract는 변경하지 않는다.
- Stage 완료 시 `mydocs/working/task_m020_21_stage1.md`에 package 점검 결과, `npm pack --dry-run` 포함 범위 요약, 변경 여부, 검증 결과를 기록한다.

### 검증

```bash
npm test
npm pack --dry-run
node bin/hyper-waterfall.js --version
node bin/hyper-waterfall.js --help
git diff --check
```

### 커밋

```text
Task #21 Stage 1: npm package metadata와 pack 구성 점검
```

## Stage 2 - npm publish 전 체크리스트와 smoke 절차 작성

### 산출물

신규:

- `docs/releases/v0.2.0-npm-publish.md`
- `mydocs/working/task_m020_21_stage2.md`

### 변경 내용

- `docs/releases/v0.2.0-npm-publish.md`를 신설해 `hyper-waterfall@0.2.0` npm publish 전 maintainer 체크리스트를 작성한다.
- 문서에는 최소한 다음 항목을 포함한다.
  - 목적과 canonical 기준과의 관계
  - `package.json` metadata 체크리스트
  - `npm pack --dry-run` tarball 구성 체크리스트
  - 로컬 tarball 기반 CLI smoke 절차
  - publish 전 승인 게이트
  - publish 후 확인 항목
  - rollback, unpublish, republish 리스크
  - `v0.2.0` GitHub Release/tag와 npm publish 순서 판단
- 실제 `npm publish` 명령은 실행 명령 후보로만 적고, 실행 조건은 작업지시자 별도 승인으로 둔다.
- Stage 완료 시 `mydocs/working/task_m020_21_stage2.md`에 문서 구조와 검증 결과를 기록한다.

### 검증

```bash
test -f docs/releases/v0.2.0-npm-publish.md
rg -n 'npm publish|npm pack|tarball|smoke|hyper-waterfall@0.2.0|v0.2.0|승인|rollback|republish|unpublish' docs/releases/v0.2.0-npm-publish.md
git diff --check
```

### 커밋

```text
Task #21 Stage 2: npm publish 전 체크리스트 작성
```

## Stage 3 - README와 배포 채널 정합성 보강

### 산출물

수정:

- `README.md` (`npx` 안내가 publish 전 상태와 충돌할 때만)
- `docs/distribution-channels.md` (npm publish 기준과 채널 역할 보강이 필요할 때만)
- `docs/releases/v0.2.0.md` (npm publish 준비 문서 연결이 필요할 때만)
- `docs/releases/v0.2.0-npm-publish.md`
- `mydocs/working/task_m020_21_stage3.md`

### 변경 내용

- README의 `npx hyper-waterfall` 예시가 npm publish 전 상태에서 안정 경로처럼 오해될 수 있는지 점검한다.
- 필요하면 README에 npm CLI가 publish 이후 편의 실행 채널이라는 점과 canonical 기준은 GitHub Release/tag + manifest + migration guide라는 점을 짧게 보강한다.
- `docs/distribution-channels.md`에서 npm publish 준비 문서와 후속 채널 시작 조건이 충돌하지 않는지 확인하고 필요한 최소 문구만 보강한다.
- `docs/releases/v0.2.0.md`에는 npm publish가 별도 승인 항목이라는 연결만 필요할 때 추가한다.
- Stage 완료 시 `mydocs/working/task_m020_21_stage3.md`에 수정 파일, 수정하지 않은 파일과 이유, 검증 결과를 기록한다.

### 검증

```bash
rg -n 'npx hyper-waterfall|npm CLI|npm publish|GitHub Release|manifest|migration|canonical|0.2.0|v0.2.0' README.md docs/distribution-channels.md docs/releases/v0.2.0.md docs/releases/v0.2.0-npm-publish.md package.json
git diff --check
```

### 커밋

```text
Task #21 Stage 3: npm publish 안내 정합성 보강
```

## Stage 4 - 통합 검증과 publish 승인 경계 확정

### 산출물

수정:

- `docs/releases/v0.2.0-npm-publish.md`
- `mydocs/working/task_m020_21_stage4.md`

### 변경 내용

- Stage 1~3 결과를 기준으로 npm publish 전 체크리스트의 검증 결과와 승인 경계를 최종 정리한다.
- `npm pack --dry-run`으로 registry publish 전 tarball 포함 범위를 다시 확인한다.
- 필요하면 `/private/tmp` 아래 임시 디렉터리에 실제 tarball을 생성하고 로컬 tarball 기반으로 `hyper-waterfall --version`, `hyper-waterfall --help` smoke를 실행한다. 이 과정은 local tarball 검증이며 `npm publish`가 아니다.
- 실제 `npm publish`, `git tag v0.2.0`, `gh release create`는 실행하지 않는다.
- Stage 완료 시 `mydocs/working/task_m020_21_stage4.md`에 통합 검증 결과, publish 전 남은 승인 항목, 실행하지 않은 명령을 기록한다.

### 검증

```bash
npm test
npm pack --dry-run
node bin/hyper-waterfall.js --version
node bin/hyper-waterfall.js --help
git diff --check
git status --short --branch
```

로컬 tarball smoke를 실행하는 경우:

```bash
mkdir -p /private/tmp/hyper-waterfall-task21-pack /private/tmp/hyper-waterfall-task21-smoke
npm pack --pack-destination /private/tmp/hyper-waterfall-task21-pack
npm install /private/tmp/hyper-waterfall-task21-pack/hyper-waterfall-0.2.0.tgz --prefix /private/tmp/hyper-waterfall-task21-smoke
/private/tmp/hyper-waterfall-task21-smoke/node_modules/.bin/hyper-waterfall --version
/private/tmp/hyper-waterfall-task21-smoke/node_modules/.bin/hyper-waterfall --help
```

### 커밋

```text
Task #21 Stage 4: npm publish 전 통합 검증 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- `npm publish`, Git tag 생성, GitHub Release publish는 검증 명령이 아니라 별도 승인 후 실행 대상이다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m020_21_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #21 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 승인 전에는 Stage 1 산출물을 만들지 않는다.

## 단계 의존성

- Stage 2는 Stage 1의 package metadata와 tarball 구성 점검 결과를 기준으로 작성한다.
- Stage 3은 Stage 2의 npm publish 체크리스트 구조가 확정된 뒤 문서 연결을 보강한다.
- Stage 4는 Stage 1~3의 검증과 필요한 문서 보강이 끝난 뒤 통합 검증 결과를 정리한다.
- 최종 결과보고서와 PR 게시는 Stage 4 승인 이후 `task-final-report` 절차로 진행한다.

## 위험과 대응

- **npm publish 되돌리기 한계**: 동일 version 재배포가 제한되므로 publish 전 dry-run, 로컬 tarball smoke, 승인 게이트를 단계 검증으로 둔다.
- **GitHub Release/tag와 npm version drift**: `v0.2.0`과 `hyper-waterfall@0.2.0`의 관계를 publish 체크리스트와 문서 정합성 검증에 포함한다.
- **package 포함 파일 누락**: `npm pack --dry-run` 결과를 Stage 1과 Stage 4에서 확인하고, 필요하면 `files` 범위만 최소 보강한다.
- **README 상태 오인**: `npx` 예시는 npm publish 이후 편의 실행 채널이며 canonical 기준은 GitHub Release/tag + manifest + migration guide라는 설명을 유지한다.
- **승인 없는 배포 실행**: `npm publish`, `git tag`, `gh release create`는 이번 Stage 구현에서 실행하지 않고 최종 승인 항목으로 남긴다.

## 승인 요청 사항

- Stage 1~4 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- 로컬 tarball smoke는 `/private/tmp` 임시 디렉터리에서 실행하고 repo에는 산출물을 남기지 않는 방향에 동의?
- `npm publish`, `git tag`, `gh release create`를 이번 Stage 구현에서 실행하지 않고 최종 승인 항목으로 남기는 데 동의?

승인되면 Stage 1 구현을 시작한다.
