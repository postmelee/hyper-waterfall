# 다국어 배포 진입점 보강과 v0.3.0 release readiness 구현계획서

수행계획서: [`task_m050_79.md`](task_m050_79.md)
GitHub Issue: [#79](https://github.com/postmelee/hyper-waterfall/issues/79)
마일스톤: M050

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 다국어 진입점/링크 baseline 감사 | `mydocs/working/task_m050_79_stage1.md` | README 잔존 한국어 anchor, entrypoint/lifecycle, package/manifest version 상태 검색 |
| 2 | README 언어 지원과 적용 프롬프트 보강 | `README.md`, `README.ko.md`, `README.zh-CN.md` | 언어 지원 블록, prompt, `--locale`, `npx` 안내 검색 |
| 3 | localized entrypoint/lifecycle 문서 추가 | `docs/agent-entrypoint.en.md`, `docs/agent-entrypoint.zh-CN.md`, `docs/lifecycle/*.en.md`, `docs/lifecycle/*.zh-CN.md` | localized 문서 존재, link target, placeholder/approval/locale 계약 검색 |
| 4 | v0.3.0 release readiness 정렬 | `package.json`, `templates/manifest.json`, release/migration 문서 필요 보정 | init dry-run, pack dry-run, version/status 문구 검색 |
| 5 | 통합 검증과 최종 보고 | 최종 보정, `mydocs/working/task_m050_79_stage5.md` | `npm test`, `git diff --check`, status 확인 |

## 문서 위치 확인

수행계획서의 "문서 위치 판단"과 실제 Stage 산출물 경로를 맞춘다. 이번 task는 Hyper-Waterfall framework 자체의 release-facing 사용자 진입 문서와 lifecycle 문서를 다루므로 공식 문서는 repository root와 `docs/` 아래에 두고, 작업 기록은 `mydocs/`에 둔다.

| 파일 | 수행계획서상 선택 위치 | Stage 산출물 경로 | 일치 여부 | 비고 |
|---|---|---|---|---|
| `README.md`, `README.ko.md`, `README.zh-CN.md` | repository root | Stage 2 | OK | GitHub 첫 화면의 다국어 사용자 진입 문서 |
| `docs/agent-entrypoint.en.md`, `docs/agent-entrypoint.zh-CN.md` | `docs/` | Stage 3 | OK | English/Chinese 사용자와 에이전트가 처음 읽을 lifecycle 진입점 |
| `docs/lifecycle/*.en.md`, `docs/lifecycle/*.zh-CN.md` | `docs/lifecycle/` | Stage 3 | OK | README와 entrypoint에서 연결되는 localized 절차 문서 |
| `templates/locales/{locale}/mydocs/manual/*` | 기존 위치 유지 | Stage 2-3 링크 대상 | OK | 적용 대상 저장소에 복사될 locale pack 진실 원천 |
| `package.json`, `templates/manifest.json` | repository root, `templates/` | Stage 4 | OK | v0.3.0 배포 readiness 판단 기준 |
| `docs/releases/*`, `docs/migrations/*` | `docs/releases/`, `docs/migrations/` | Stage 4 필요 시 | OK | release 상태와 migration 기준 장기 참조 문서 |
| `mydocs/working/task_m050_79_stage{N}.md` | `mydocs/working/` | 각 Stage | OK | 단계별 완료보고서 |
| `mydocs/report/task_m050_79_report.md` | `mydocs/report/` | 최종 보고 | OK | 최종 결과 장기 기록 |

## Stage 1 — 다국어 진입점/링크 baseline 감사

### 산출물

신규:

- `mydocs/working/task_m050_79_stage1.md`

수정:

- 없음

### 변경 내용

- README 3종의 상단 흐름, `agent-entrypoint` 링크, `--locale`/`npx` 안내 상태를 확인한다.
- English/Chinese README의 의도하지 않은 한국어 anchor와 한국어-only 진입 경로를 목록화한다.
- `docs/agent-entrypoint.md`, lifecycle 문서, `templates/locales` 문서 존재 상태를 확인한다.
- `package.json`, `templates/manifest.json`, npm registry 관찰 결과, `npm pack --dry-run` 결과를 기준으로 v0.3.0 readiness 항목을 Stage 2-4 입력으로 정리한다.

### 검증

```bash
rg -n "[가-힣]" README.md README.zh-CN.md
rg -n "agent-entrypoint|docs/lifecycle|templates/mydocs/manual|templates/locales|--locale|v0.3.0|0.2.0" README.md README.ko.md README.zh-CN.md docs package.json templates/manifest.json
git diff --check
```

### 커밋

```text
Task #79 Stage 1: 다국어 진입점 baseline 감사
```

## Stage 2 — README 언어 지원과 적용 프롬프트 보강

### 산출물

수정:

- `README.md`
- `README.ko.md`
- `README.zh-CN.md`

### 변경 내용

- Quick Start 근처에 지원 locale, 기본 locale, fallback 정책을 짧게 추가한다.
- 언어별 AI 적용 프롬프트를 복사 가능한 한 줄 예시로 추가한다.
- `npx hyper-waterfall@0.3.0 init --repo . --locale <locale> --dry-run` 예시를 dry-run 판단 명령으로 설명한다.
- English/Chinese README의 한국어 anchor 링크를 localized template/manual 문서 또는 언어 중립 링크로 교체한다.
- README에는 상세 다국어 정책을 중복하지 않고 `docs/localization.md`와 localized lifecycle 문서로 연결한다.

### 검증

```bash
rg -n "Language support|언어 지원|语言支持|--locale|npx hyper-waterfall@0.3.0|README\\.ko|README\\.zh-CN" README.md README.ko.md README.zh-CN.md
rg -n "[가-힣]" README.md README.zh-CN.md
git diff --check
```

### 커밋

```text
Task #79 Stage 2: README 다국어 진입 안내 보강
```

## Stage 3 — localized entrypoint/lifecycle 문서 추가

### 산출물

신규:

- `docs/agent-entrypoint.en.md`
- `docs/agent-entrypoint.zh-CN.md`
- `docs/lifecycle/adoption.en.md`
- `docs/lifecycle/update.en.md`
- `docs/lifecycle/update_pr.en.md`
- `docs/lifecycle/adoption.zh-CN.md`
- `docs/lifecycle/update.zh-CN.md`
- `docs/lifecycle/update_pr.zh-CN.md`

수정 후보:

- `docs/agent-entrypoint.md`
- `docs/localization.md`
- `README.md`
- `README.zh-CN.md`

### 변경 내용

- 한국어 entrypoint/lifecycle 문서의 절차 계약을 보존해 English/Chinese 문서를 작성한다.
- placeholder, branch name, file pattern, command, GitHub vocabulary는 번역하지 않는다.
- localized 문서의 상대 링크가 실제 파일을 가리키도록 정렬한다.
- README와 entrypoint가 서로 맞는 localized 문서로 연결되는지 확인한다.

### 검증

```bash
test -f docs/agent-entrypoint.en.md
test -f docs/agent-entrypoint.zh-CN.md
rg -n "\\{REPO_SLUG\\}|\\{BASE_BRANCH\\}|approval|批准|locale|manifest" docs/agent-entrypoint*.md docs/lifecycle/*.en.md docs/lifecycle/*.zh-CN.md
rg -n "\\]\\([^)]*\\.md\\)" docs/agent-entrypoint*.md docs/lifecycle/*.en.md docs/lifecycle/*.zh-CN.md
git diff --check
```

### 커밋

```text
Task #79 Stage 3: localized lifecycle 진입 문서 추가
```

## Stage 4 — v0.3.0 release readiness 정렬

### 산출물

수정 후보:

- `package.json`
- `templates/manifest.json`
- `docs/migrations/v0.2.0-to-v0.3.0.md`
- `docs/releases/v0.2.0.md`
- `docs/releases/v0.2.0-npm-publish.md`
- `docs/distribution-channels.md`
- `docs/localization-smoke.md`
- `test/cli-smoke.test.js`

신규 후보:

- `docs/releases/v0.3.0.md`

### 변경 내용

- v0.3.0 배포 직전 상태에 맞춰 package/manifest/release 문구를 정렬한다.
- `npx hyper-waterfall@0.3.0` 안내가 실제 package version과 모순되지 않게 한다.
- GitHub Release/tag 생성, npm publish, Homebrew tap 갱신은 별도 release 실행 단계임을 문서화한다.
- `npm pack --dry-run`으로 README, docs, templates/locales가 npm tarball에 포함되는지 확인한다.

### 검증

```bash
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-en --manifest "$(pwd)/templates/manifest.json" --locale en --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-ko --manifest "$(pwd)/templates/manifest.json" --locale ko --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-zh --manifest "$(pwd)/templates/manifest.json" --locale zh-CN --dry-run
npm_config_cache=/private/tmp/hyper-waterfall-npm-cache npm pack --dry-run
git diff --check
```

### 커밋

```text
Task #79 Stage 4: v0.3.0 release readiness 정렬
```

## Stage 5 — 통합 검증과 최종 보고

### 산출물

신규:

- `mydocs/working/task_m050_79_stage5.md`

수정 후보:

- Stage 1-4에서 발견된 최종 문서 보정 대상
- `mydocs/orders/20260528.md`

### 변경 내용

- Stage 1-4 산출물을 통합 검증한다.
- README와 localized docs의 잔여 링크/언어/버전 상태를 최종 확인한다.
- 실제 publish/release/Homebrew 갱신을 별도 승인 단계로 넘길 항목을 최종 보고 입력으로 정리한다.

### 검증

```bash
npm test
rg -n "agent-entrypoint|--locale|v0.3.0|npx|README\\.ko|README\\.zh-CN" README.md README.ko.md README.zh-CN.md docs templates/manifest.json package.json
rg -n "[가-힣]" README.md README.zh-CN.md
git diff --check
git status --short
```

### 커밋

```text
Task #79 Stage 5: 다국어 배포 readiness 통합 검증
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- 문서 위치가 수행계획서 판단과 달라지면 구현 전에 수행계획서 또는 구현계획서를 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 구현계획서 자체는 별도 커밋 `Task #79: 구현 계획서 작성`으로 묶는다.
- 단계 커밋은 단계 산출물과 `mydocs/working/task_m050_79_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #79 Stage {N}: {핵심 내용 요약}` 형식을 따른다.

## 단계 의존성

- Stage 2는 Stage 1 baseline 감사 결과를 반영해 README 수정 범위를 확정한 뒤 진행한다.
- Stage 3은 Stage 2에서 결정한 README link target과 entrypoint 경로를 기준으로 작성한다.
- Stage 4는 README와 localized lifecycle 문서가 정렬된 뒤 package/manifest/release readiness를 맞춘다.
- Stage 5는 Stage 1-4 산출물과 단계 보고서 승인 후 진행한다.

## 위험과 대응

- **localized 문서 중복 관리 비용**: 최소 lifecycle 문서만 추가하고 적용 후 운영 manual은 기존 `templates/locales`를 링크 대상으로 사용한다.
- **v0.3.0 배포 상태 혼동**: 실제 publish/tag/Homebrew 갱신은 제외하고 release readiness 상태와 별도 실행 필요성을 명시한다.
- **CLI 역할 오해**: `npx` 예시는 자동 적용 명령이 아니라 dry-run 판단 명령으로 설명한다.
- **한국어 잔존 grep의 false positive**: 언어 선택 링크와 고유명사는 의도 잔존으로 분류하고, 한국어-only anchor는 수정 대상으로 분리한다.
- **release 범위 확장**: 실제 배포 작업은 별도 승인과 release 절차에서 수행한다.

## 승인 요청 사항

- 위 5단계 Stage 분할
- README 3종, localized entrypoint/lifecycle 문서, package/manifest/release readiness를 같은 #79 범위에서 다루는 방향
- 실제 npm publish, GitHub Release/tag 생성, Homebrew tap 갱신은 제외하는 방향
- Stage별 산출물, 검증 명령, 커밋 메시지
