# 구현계획서

수행계획서: [`task_m050_67.md`](task_m050_67.md)
GitHub Issue: [#67](https://github.com/postmelee/hyper-waterfall/issues/67)
마일스톤: M050

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 현 구조 inventory와 locale 대상 분류 | `mydocs/tech/task_m050_67_locale_manifest_design.md` | locale 대상/비대상 분류와 manifest 공백 확인 |
| 2 | locale pack 구조와 manifest 계약 반영 | `templates/manifest.json`, `docs/localization.md` | manifest JSON parse, locale 계약 키워드 확인 |
| 3 | adoption/update 문서 기준 정렬 | `docs/agent-entrypoint.md`, `docs/lifecycle/adoption.md`, `docs/lifecycle/update.md` | 신규 적용/기존 업데이트 판단 결과에 locale 항목 포함 확인 |
| 4 | 통합 정합성 검증과 후속 경계 보강 | `docs/localization.md`, `mydocs/tech/task_m050_67_locale_manifest_design.md` | #67-#71 경계, fallback, placeholder, manifest 정합성 확인 |

## 문서 위치 확인

수행계획서의 "문서 위치 판단"과 실제 Stage 산출물 경로는 아래처럼 일치시킨다.

| 파일 | 수행계획서상 선택 위치 | Stage 산출물 경로 | 일치 여부 | 비고 |
|---|---|---|---|---|
| `docs/localization.md` | `docs/` | `docs/localization.md` | OK | 다국어 정책과 후속 이슈 경계 보강 |
| `docs/lifecycle/adoption.md` | `docs/lifecycle/` | `docs/lifecycle/adoption.md` | OK | 신규 적용 locale 판단 기준 |
| `docs/lifecycle/update.md` | `docs/lifecycle/` | `docs/lifecycle/update.md` | OK | 기존 locale 보존/update diff 기준 |
| `docs/agent-entrypoint.md` | `docs/` | `docs/agent-entrypoint.md` | OK | 진입점의 locale 판단 문서 연결 |
| `templates/manifest.json` | `templates/` | `templates/manifest.json` | OK | locale pack 기계 판독 계약 |
| `mydocs/tech/task_m050_67_locale_manifest_design.md` | `mydocs/tech/` | `mydocs/tech/task_m050_67_locale_manifest_design.md` | OK | 구조 후보와 채택/보류 근거 |

## Stage 1 — 현 구조 inventory와 locale 대상 분류

### 산출물

신규:

- `mydocs/tech/task_m050_67_locale_manifest_design.md`
- `mydocs/working/task_m050_67_stage1.md`

수정:

- 없음

### 변경 내용

- 현재 `templates/` 파일 목록과 `templates/manifest.json`의 source/target/update policy 구조를 조사한다.
- #65 `docs/localization.md` 기준으로 locale 대상, locale 대상 후보, locale 비대상, 후속 보류 대상을 분류한다.
- `templates/AGENTS.md`, `templates/mydocs/_templates/*`, GitHub Issue/PR template, manual, Skill에 남아 있는 한국어 고정 작성 규칙과 placeholder 보존 지점을 정리한다.
- locale pack 구조 후보를 비교한다. 기본 후보는 `templates/locales/{locale}/...`이며, 기존 단일 template 파일과의 관계 및 #68/#69에서 필요한 migration 기준을 함께 기록한다.

### 검증

```bash
rg -n "작성 언어: 한국어|모든 문서는 한국어|locale|언어|manifest|fallback" templates docs mydocs/tech
find templates -maxdepth 3 -type f | sort
git diff --check
```

### 커밋

```text
Task #67 Stage 1: locale manifest 구조 조사
```

## Stage 2 — locale pack 구조와 manifest 계약 반영

### 산출물

수정:

- `templates/manifest.json`
- `docs/localization.md`
- `mydocs/tech/task_m050_67_locale_manifest_design.md`
- `mydocs/working/task_m050_67_stage2.md`

### 변경 내용

- `templates/manifest.json`에 locale 지원을 표현하는 최소 필드를 추가한다.
  - 초기 지원 locale: `en`, `ko`, `zh-CN`
  - 기본 locale: `en`
  - fallback 기준: `en`, 단 누락을 조용히 성공 처리하지 않는 보고 정책
  - locale pack root와 source 선택 방식
  - locale 적용 대상 role 또는 file entry별 locale 가능 여부
- 기존 `files[]` entry가 locale source를 어떻게 참조할지 결정한다. 전체 본문 번역은 하지 않고, 후속 locale pack 작성자가 따라갈 source/target 관계만 고정한다.
- `docs/localization.md`에 manifest 계약, locale pack 배치, 기존 한국어 원문 보존 기준을 보강한다.
- `mydocs/tech/task_m050_67_locale_manifest_design.md`에 채택한 manifest 구조와 보류한 대안을 기록한다.

### 검증

```bash
node -e 'const fs=require("fs"); JSON.parse(fs.readFileSync("templates/manifest.json","utf8")); console.log("ok")'
rg -n "locale|locales|defaultLocale|fallback|source|templates/locales" templates/manifest.json docs/localization.md mydocs/tech/task_m050_67_locale_manifest_design.md
git diff --check
```

### 커밋

```text
Task #67 Stage 2: locale manifest 계약 추가
```

## Stage 3 — adoption/update 문서 기준 정렬

### 산출물

수정:

- `docs/agent-entrypoint.md`
- `docs/lifecycle/adoption.md`
- `docs/lifecycle/update.md`
- `mydocs/tech/task_m050_67_locale_manifest_design.md`
- `mydocs/working/task_m050_67_stage3.md`

### 변경 내용

- 신규 적용 판단 결과 형식에 선택 locale, 기본 locale 제안, 선택 locale 파일 누락, fallback 보고 항목을 추가한다.
- 기존 업데이트 판단 결과 형식에 현재 locale, 목표 release의 locale 지원 상태, 기존 locale 보존 여부, locale 전환 요청 여부, locale별 manifest diff 판단 항목을 추가한다.
- `docs/agent-entrypoint.md`의 locale 참고 섹션을 #67에서 확정한 manifest/lifecycle 문서 기준으로 연결한다.
- #70 범위인 실제 locale 선택 저장 위치와 workflow 실행 구현은 명시적으로 남겨 둔다.

### 검증

```bash
rg -n "locale|default|fallback|preserve|manifest diff|언어|선택" docs/agent-entrypoint.md docs/lifecycle/adoption.md docs/lifecycle/update.md docs/localization.md
rg -n "#70|선택 저장 위치|workflow" docs/agent-entrypoint.md docs/lifecycle/adoption.md docs/lifecycle/update.md mydocs/tech/task_m050_67_locale_manifest_design.md
git diff --check
```

### 커밋

```text
Task #67 Stage 3: locale lifecycle 판단 기준 정렬
```

## Stage 4 — 통합 정합성 검증과 후속 경계 보강

### 산출물

수정:

- `docs/localization.md`
- `mydocs/tech/task_m050_67_locale_manifest_design.md`
- `mydocs/working/task_m050_67_stage4.md`

### 변경 내용

- #67에서 확정한 구조가 후속 #68, #69, #70, #71 책임과 충돌하지 않는지 문서화한다.
- placeholder, branch, filename pattern, command/code block 보존 기준이 manifest와 lifecycle 문서에 일관되게 반영됐는지 확인하고 필요한 최소 보강을 한다.
- locale pack 본문 작성, 실제 workflow 연결, migration guide 작성이 후속 이슈에 남아 있음을 명확히 정리한다.
- 전체 변경에 대한 통합 검증 결과와 남은 리스크를 Stage 4 보고서에 기록한다.

### 검증

```bash
node -e 'const fs=require("fs"); JSON.parse(fs.readFileSync("templates/manifest.json","utf8")); console.log("ok")'
rg -n "#67|#68|#69|#70|#71|locale pack|manifest|fallback|placeholder" docs templates mydocs/tech/task_m050_67_locale_manifest_design.md
rg -n "en|ko|zh-CN|templates/locales|defaultLocale|fallbackLocale" templates/manifest.json docs/localization.md docs/lifecycle/adoption.md docs/lifecycle/update.md
git diff --check
```

### 커밋

```text
Task #67 Stage 4: locale 구조 정합성 검증
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- 문서 위치가 수행계획서 판단과 달라지면 구현 전에 수행계획서 또는 구현계획서를 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m050_67_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #67 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 승인 전에는 Stage 1 산출물을 작성하지 않는다.

## 단계 의존성

- Stage 2는 Stage 1의 inventory와 구조 후보 확인 후 진행한다.
- Stage 3은 Stage 2의 manifest 계약 확정 후 진행한다.
- Stage 4는 Stage 2와 Stage 3의 문서 정렬이 끝난 뒤 통합 검증으로 진행한다.

## 위험과 대응

- **manifest schema 과설계**: Stage 2에서 실행 로직이 아니라 최소 기계 판독 계약만 반영한다.
- **후속 이슈 범위 침범**: locale pack 본문 작성은 #68/#69, workflow 실행 연결은 #70, migration guide는 #71로 남긴다.
- **기존 한국어 원문 손실**: 이번 task에서 기존 template 본문 전체 이동이나 번역을 하지 않는다. `ko` 보존 위치와 기준만 문서화한다.
- **fallback 오해**: fallback은 성공 처리 장치가 아니라 보고 대상이라는 점을 manifest, localization, lifecycle 문서에 함께 반영한다.
- **검증 명령의 플랫폼 차이**: JSON 파싱은 Node.js 기반 단일 명령으로 수행하고, shell glob에 의존하지 않는 `rg`/`find` 중심 검증을 사용한다.

## 승인 요청 사항

- Stage 1~4 단계 분할
- `templates/manifest.json`에 locale 최소 계약을 반영하는 방향
- `docs/localization.md`, `docs/lifecycle/adoption.md`, `docs/lifecycle/update.md`, `docs/agent-entrypoint.md`를 공식 기준 문서로 정렬하는 산출물 범위
- locale pack 본문 작성, workflow 구현, migration guide 작성을 후속 이슈로 남기는 제외 범위
