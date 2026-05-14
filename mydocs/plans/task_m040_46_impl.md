# Task #46 구현계획서 - Homebrew core 등재 가능성 평가와 제출 준비

수행계획서: [`task_m040_46.md`](task_m040_46.md)
GitHub Issue: [#46](https://github.com/postmelee/hyper-waterfall/issues/46)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | Homebrew core 기준 조사와 적용 기준 고정 | `mydocs/tech/task_m040_46_homebrew_core_review.md`, `mydocs/working/task_m040_46_stage1.md` | 공식 문서 확인 기록, core/tap 차이, 조사 키워드 점검 |
| 2 | 현재 formula와 프로젝트 상태 gap 분석 | `mydocs/tech/task_m040_46_homebrew_core_review.md`, `mydocs/working/task_m040_46_stage2.md` | formula, GitHub 지표, audit/test 결과, #35 smoke 대조 |
| 3 | 제출 가능성 판단과 배포 문서 갱신 | `docs/homebrew-formula-tap-poc.md`, `docs/distribution-channels.md`, `mydocs/tech/task_m040_46_homebrew_core_review.md`, `mydocs/working/task_m040_46_stage3.md` | core 제출 가능/보류 결론, public tap 안내 유지 근거, 문서 정합성 점검 |

## Stage 1 — Homebrew core 기준 조사와 적용 기준 고정

### 산출물

신규:

- `mydocs/tech/task_m040_46_homebrew_core_review.md`
- `mydocs/working/task_m040_46_stage1.md`

수정:

- `mydocs/orders/20260514.md`

### 변경 내용

- Homebrew 공식 문서를 확인하고 확인일을 기록한다.
- `homebrew/core` 등재와 public tap 운영의 차이를 분리한다.
- Acceptable Formulae, Formula Cookbook, Node for Formula Authors, How To Open a Homebrew Pull Request, Taps 문서에서 이번 task에 적용할 기준을 요약한다.
- self-submitted software, notability, duplicate formula, supported platform, stable release, test block, npm tarball wrapper 관련 조사 항목을 Stage 2 gap matrix 기준으로 고정한다.
- `brew install hyper-waterfall` 단독 첫 설치가 public tap만으로 가능한지 검토할 기준을 문서화한다.

### 검증

```bash
rg -n 'Homebrew|homebrew/core|core|tap|formula|brew install hyper-waterfall|postmelee/tap' docs mydocs README.md
rg -n 'Acceptable Formulae|Formula Cookbook|Node for Formula Authors|How To Open a Homebrew Pull Request|notability|self-submitted|public tap|homebrew/core' mydocs/tech/task_m040_46_homebrew_core_review.md mydocs/working/task_m040_46_stage1.md
git diff --check
```

수동 확인:

- 공식 문서 URL과 확인일이 Stage 1 산출물에 남아 있는지 확인한다.
- public tap smoke 통과와 Homebrew core readiness를 같은 기준으로 취급하지 않았는지 확인한다.

### 커밋

```text
Task #46 Stage 1: Homebrew core 기준 조사
```

## Stage 2 — 현재 formula와 프로젝트 상태 gap 분석

### 산출물

신규:

- `mydocs/working/task_m040_46_stage2.md`

수정:

- `mydocs/tech/task_m040_46_homebrew_core_review.md`
- `mydocs/orders/20260514.md`

### 변경 내용

- `postmelee/homebrew-tap`의 현재 `Formula/hyper-waterfall.rb`를 확인하고 core 제출 관점의 속성을 기록한다.
- GitHub repository 지표(stars, forks, watchers 또는 subscribers, visibility, license, latest release)를 확인한다.
- npm package `hyper-waterfall@0.2.0`와 public tap formula의 URL/SHA256/version 정합성을 #35 결과와 대조한다.
- 가능하면 현재 환경에서 `brew audit --new --formula postmelee/tap/hyper-waterfall`, `brew install --build-from-source`, `brew test`를 실행한다. 실행하지 못하면 이유와 #35 검증 결과를 구분해 기록한다.
- Homebrew core 기준과 현재 상태를 gap matrix로 정리한다.

### 검증

```bash
gh repo view postmelee/hyper-waterfall --json nameWithOwner,visibility,stargazerCount,forkCount,watchers,licenseInfo,latestRelease,url
gh repo view postmelee/homebrew-tap --json nameWithOwner,visibility,defaultBranchRef,url
gh api repos/postmelee/homebrew-tap/contents/Formula/hyper-waterfall.rb --jq '.download_url'
brew audit --new --formula postmelee/tap/hyper-waterfall
brew install --build-from-source postmelee/tap/hyper-waterfall
brew test postmelee/tap/hyper-waterfall
brew uninstall hyper-waterfall
brew untap postmelee/tap
rg -n 'gap|notability|stars|forks|watchers|Formula/hyper-waterfall.rb|sha256|brew audit|brew test|0.2.0' mydocs/tech/task_m040_46_homebrew_core_review.md mydocs/working/task_m040_46_stage2.md
git diff --check
```

수동 확인:

- 외부 상태 조회와 로컬 Homebrew 검증 결과가 서로 다른 성격으로 기록됐는지 확인한다.
- Homebrew 명령 실패 시 cleanup 상태와 실패 원인이 Stage 2 보고서에 남아 있는지 확인한다.

### 커밋

```text
Task #46 Stage 2: Homebrew core gap 분석
```

## Stage 3 — 제출 가능성 판단과 배포 문서 갱신

### 산출물

신규:

- `mydocs/working/task_m040_46_stage3.md`

수정:

- `mydocs/tech/task_m040_46_homebrew_core_review.md`
- `docs/homebrew-formula-tap-poc.md`
- `docs/distribution-channels.md`
- 필요 시 `README.md` 또는 `docs/releases/v0.2.0.md`
- `mydocs/orders/20260514.md`

### 변경 내용

- Stage 1/2 결과를 근거로 Homebrew core 제출 가능성을 `진행 가능`, `조건부 가능`, `보류` 중 하나로 결론낸다.
- `brew install hyper-waterfall` 단독 첫 설치를 달성하는 선택지를 정리한다.
- core 제출을 진행할 경우 필요한 사전 작업, 제출 전 검증, 작업지시자 승인 게이트를 분리한다.
- core 제출이 보류될 경우 `brew install postmelee/tap/hyper-waterfall` public tap 안내를 유지하는 이유를 명확히 남긴다.
- 관련 배포 문서에서 Homebrew core 상태와 public tap 상태가 혼동되지 않도록 갱신한다.
- 이번 task에서는 Homebrew core PR 생성, public tap 변경, npm 재배포를 실행하지 않는다.

### 검증

```bash
rg -n 'brew install hyper-waterfall|postmelee/tap/hyper-waterfall|homebrew/core|Homebrew core|notability|보류|조건부|제출|public tap' docs mydocs README.md
rg -n 'core|tap|wrapper|canonical|manifest|migration|checksum' docs/homebrew-formula-tap-poc.md docs/distribution-channels.md README.md docs/releases/v0.2.0.md
git diff --check
```

수동 확인:

- 결론이 수용 기준과 연결되는지 확인한다.
- 외부 PR 생성 또는 reviewer 커뮤니케이션을 실행한 것처럼 표현하지 않았는지 확인한다.
- Homebrew formula가 canonical 기준이 아니라 CLI 설치 wrapper라는 기존 경계를 유지하는지 확인한다.

### 커밋

```text
Task #46 Stage 3: Homebrew core 제출 판단 문서화
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 네트워크 또는 Homebrew 환경 문제로 검증을 실행할 수 없으면 실패/미실행을 구분해 단계 산출물에 기록하고, 필요한 경우 작업지시자에게 범위 조정을 요청한다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m040_46_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #46 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 자체는 별도 커밋 `Task #46: 구현계획서 작성`으로 남긴다.

## 단계 의존성

- Stage 1은 구현계획서 승인 후 진행한다.
- Stage 2는 Stage 1 보고서 승인 후 진행한다.
- Stage 3은 Stage 2 gap matrix와 검증 결과가 확정된 뒤 진행한다.
- Stage 3에서 core 제출 보류가 결론이면 후속 core 제출 PR이나 외부 커뮤니케이션은 진행하지 않는다.
- Stage 3에서 조건부 가능 또는 진행 가능이 결론이어도 실제 Homebrew core PR 생성은 별도 작업지시자 승인 후 별도 task로 분리한다.

## 위험과 대응

- **공식 정책 변동**: Homebrew 문서는 수시로 바뀔 수 있다. 각 확인 항목에 확인일과 URL을 기록하고 제출 직전 재확인 대상으로 둔다.
- **notability 판단의 주관성**: 공식 기준을 충족해도 reviewer 판단이 달라질 수 있다. 이번 task에서는 제출 가능성을 단정하지 않고 근거와 risk를 함께 둔다.
- **외부 커뮤니케이션 노출**: Homebrew core PR과 reviewer 대화는 공개 기록이다. 이번 task에서는 승인 없이 PR이나 discussion을 만들지 않는다.
- **Homebrew 환경 영향**: `brew install --build-from-source`는 `node` 등 dependency 설치와 cleanup을 동반할 수 있다. Stage 2에서 실행 전후 상태와 cleanup 결과를 기록한다.
- **문서 기준 혼동**: public tap, Homebrew core, npm, canonical release 기준이 섞일 수 있다. Stage 3 문서 검증에서 wrapper/canonical 책임 경계를 확인한다.

## 승인 요청 사항

- Stage 1-3 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Stage 1에서 공식 문서 기준을 먼저 고정하고, Stage 2에서 현재 formula와 repository 상태를 대조하는 순서에 동의?
- Stage 2에서 Homebrew install/test를 실행하되, 환경 문제 시 #35 smoke 결과와 미실행 사유를 분리 기록하는 방식에 동의?
- Stage 3에서 결론이 `진행 가능`이더라도 실제 Homebrew core PR 생성은 이번 task에서 하지 않고 별도 승인/별도 task로 분리하는 데 동의?
