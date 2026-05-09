# task_m030_23_impl.md - Homebrew formula/tap PoC 구현계획서

수행계획서: [`task_m030_23.md`](task_m030_23.md)
GitHub Issue: [#23](https://github.com/postmelee/hyper-waterfall/issues/23)
마일스톤: M030

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 기존 배포 기준과 Homebrew 요구사항 정리 | `mydocs/working/task_m030_23_stage1.md` | Homebrew/canonical 기준 grep, CLI version/doctor help 확인, `git diff --check` |
| 2 | Homebrew formula/tap PoC 문서 작성 | `docs/homebrew-formula-tap-poc.md`, `docs/distribution-channels.md`, `mydocs/working/task_m030_23_stage2.md` | PoC 문서 필수 키워드 grep, 산출물 존재 확인, `git diff --check` |
| 3 | 수용 기준 검증과 책임 경계 정리 | `docs/homebrew-formula-tap-poc.md`, `mydocs/working/task_m030_23_stage3.md` | 이슈 검증 명령, 산출물 존재 확인, `git diff --check`, `git status --short --branch` |

## Stage 1 - 기존 배포 기준과 Homebrew 요구사항 정리

### 산출물

수정:

- `mydocs/working/task_m030_23_stage1.md`

### 변경 내용

- `docs/distribution-channels.md`, `docs/releases/v0.2.0.md`, `docs/releases/v0.2.0-npm-publish.md`, README의 배포 채널 설명을 확인한다.
- `package.json`과 CLI help를 확인해 현재 `hyper-waterfall --version`, `doctor` smoke 검증의 기준 명령을 정리한다.
- Homebrew PoC가 대체하면 안 되는 canonical 기준을 GitHub Release/tag, `templates/manifest.json`, migration guide, 작업지시자 승인 게이트로 고정한다.
- Homebrew 공식 문서 확인이 필요한 세부 formula 문법은 Stage 2 문서 작성 전에 확인하고, 확인한 근거를 PoC 문서에 짧게 반영한다.
- Stage 완료 시 `mydocs/working/task_m030_23_stage1.md`에 기존 기준, 확인한 CLI 명령, Stage 2 문서 작성 기준을 기록한다.

### 검증

```bash
rg -n 'Homebrew|formula|tap|GitHub Release|manifest|migration|canonical|doctor|version' docs README.md package.json
node bin/hyper-waterfall.js --version
node bin/hyper-waterfall.js --help
node bin/hyper-waterfall.js doctor --help
git diff --check
```

### 커밋

```text
Task #23 Stage 1: Homebrew PoC 기준 정리
```

## Stage 2 - Homebrew formula/tap PoC 문서 작성

### 산출물

신규:

- `docs/homebrew-formula-tap-poc.md`
- `mydocs/working/task_m030_23_stage2.md`

수정:

- `docs/distribution-channels.md`

### 변경 내용

- `docs/homebrew-formula-tap-poc.md`를 신설해 Homebrew PoC 설계를 작성한다.
- 문서에는 최소한 다음 항목을 포함한다.
  - 사용자 문제와 비목표
  - canonical 기준과 Homebrew 책임 경계
  - tap 저장소, 본 저장소 formula, npm package wrapper, release asset wrapper 비교
  - version, checksum, GitHub Release/tag, npm package 참조 방식
  - `hyper-waterfall --version`과 `hyper-waterfall doctor --repo .` smoke 검증 경로
  - 공개 tap 배포 전 승인 지점
  - 운영 비용, 보류 조건, 후속 작업 후보
- `docs/distribution-channels.md`는 Homebrew 세부 PoC 문서가 생겼음을 연결하거나 기존 후보 설명을 최신화하는 최소 수정만 한다.
- 실제 `brew tap`, `brew install`, public tap push, npm publish, GitHub Release/tag 생성은 실행하지 않는다.
- Stage 완료 시 `mydocs/working/task_m030_23_stage2.md`에 문서 구조, 접근안 비교 결과, 수정 파일, 검증 결과를 기록한다.

### 검증

```bash
test -f docs/homebrew-formula-tap-poc.md
rg -n 'Homebrew|formula|tap|GitHub Release|manifest|migration|canonical|doctor|version|checksum|npm package|release asset' docs/homebrew-formula-tap-poc.md docs/distribution-channels.md
git diff --check
```

### 커밋

```text
Task #23 Stage 2: Homebrew formula tap PoC 문서 작성
```

## Stage 3 - 수용 기준 검증과 책임 경계 정리

### 산출물

수정:

- `docs/homebrew-formula-tap-poc.md`
- `mydocs/working/task_m030_23_stage3.md`

### 변경 내용

- Stage 1~2 결과를 기준으로 PoC 문서의 추천 접근, 보류 조건, 승인 지점이 이슈 수용 기준을 만족하는지 점검한다.
- formula가 canonical 기준을 대체하지 않고 CLI 실행 수단으로만 동작한다는 경계가 문서에 명확히 드러나는지 확인한다.
- 필요하면 `docs/homebrew-formula-tap-poc.md`의 결론과 체크리스트를 보강한다.
- 실제 Homebrew public 배포, npm publish, GitHub Release/tag 생성, 자동 release pipeline 구현은 실행하지 않고 후속 승인 항목으로 남긴다.
- Stage 완료 시 `mydocs/working/task_m030_23_stage3.md`에 수용 기준별 검증 결과와 남은 승인 지점을 기록한다.

### 검증

```bash
test -f docs/homebrew-formula-tap-poc.md
rg -n 'Homebrew|formula|tap|GitHub Release|manifest|migration|canonical|doctor|version' docs README.md package.json
git diff --check
git status --short --branch
```

### 커밋

```text
Task #23 Stage 3: Homebrew PoC 수용 기준 검증
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- Homebrew 공식 문서 또는 formula 문법을 확인해야 할 때는 Stage 산출물에 확인 근거와 한계를 함께 남긴다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m030_23_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #23 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 승인 전에는 Stage 1 산출물을 만들지 않는다.

## 단계 의존성

- Stage 2는 Stage 1의 기존 배포 기준과 CLI smoke 기준 확인 후 진행한다.
- Stage 3은 Stage 2의 PoC 문서와 배포 채널 문서 연결이 끝난 뒤 진행한다.
- 최종 결과보고서와 PR 게시는 Stage 3 승인 이후 `task-final-report` 절차로 진행한다.

## 위험과 대응

- **canonical 기준 혼선**: 모든 Stage에서 GitHub Release/tag, manifest, migration guide를 기준으로 두고 Homebrew는 CLI 실행 wrapper로만 설명한다.
- **formula 문서가 실제 배포로 오인됨**: PoC 문서와 Stage 보고서에 public tap 배포, npm publish, release/tag 생성이 제외 범위임을 반복 확인한다.
- **접근안 비교 부족**: tap 저장소, 본 저장소 formula, npm package wrapper, release asset wrapper를 같은 표에서 비교해 추천 근거를 남긴다.
- **운영 비용 누락**: version 갱신, checksum, macOS smoke, Node.js dependency, release asset 또는 npm package 정합성을 별도 항목으로 둔다.

## 승인 요청 사항

- Stage 1~3 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- `docs/homebrew-formula-tap-poc.md`를 PoC 설계 문서로 신설하고 `docs/distribution-channels.md`는 최소 연결만 하는 방향에 동의?
- 실제 Homebrew tap 공개 배포, npm publish, GitHub Release/tag 생성, 자동 release pipeline 구현을 이번 Stage 구현에서 실행하지 않는 데 동의?

승인되면 Stage 1 구현을 시작한다.
