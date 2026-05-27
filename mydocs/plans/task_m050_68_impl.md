# #68 영어 locale pack 작성과 한국어 원문 보존 구현계획서

수행계획서: [`task_m050_68.md`](task_m050_68.md)
GitHub Issue: [#68](https://github.com/postmelee/hyper-waterfall/issues/68)
마일스톤: M050

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | locale 대상 inventory와 번역 범위 확정 | `mydocs/tech/task_m050_68_translation_terms.md`, `mydocs/working/task_m050_68_stage1.md` | manifest locale entry, 한국어 고정 문구, manual/Skill 포함 경계 확인 |
| 2 | 영어 기본 locale pack 작성 | `templates/locales/en/**`, `mydocs/working/task_m050_68_stage2.md` | placeholder/명령어/branch/file pattern 보존, 영어 pack 주요 파일 수동 검토 |
| 3 | 한국어 원문 보존 pack 작성 | `templates/locales/ko/**`, `mydocs/working/task_m050_68_stage3.md` | 기존 한국어 원문 보존, 선택 locale 정책 문구 정렬 |
| 4 | pack 정합성 검증과 smoke 기대값 정렬 | 필요한 최소 문서/테스트 보정, `mydocs/working/task_m050_68_stage4.md` | CLI doctor, `npm test`, `git diff --check`, locale source 존재 확인 |

## 문서 위치 확인

수행계획서의 "문서 위치 판단"과 실제 Stage 산출물 경로는 다음처럼 정렬한다.

| 파일 | 수행계획서상 선택 위치 | Stage 산출물 경로 | 일치 여부 | 비고 |
|---|---|---|---|---|
| `templates/locales/en/**` | `templates/locales/en/**` | Stage 2 | OK | #67 manifest의 `sourcePattern`과 일치 |
| `templates/locales/ko/**` | `templates/locales/ko/**` | Stage 3 | OK | 기존 한국어 원문 보존 pack |
| `mydocs/tech/task_m050_68_translation_terms.md` | `mydocs/tech/` | Stage 1, Stage 3 보강 | OK | 번역 판단 근거와 용어 대응표 |
| `mydocs/working/task_m050_68_stage{N}.md` | `mydocs/working/` | 각 Stage 종료 | OK | 단계별 완료보고서 |
| `mydocs/report/task_m050_68_report.md` | `mydocs/report/` | 최종 보고 | OK | 최종 결과보고서 |

## Stage 1 — locale 대상 inventory와 번역 범위 확정

### 산출물

신규:

- `mydocs/tech/task_m050_68_translation_terms.md`
- `mydocs/working/task_m050_68_stage1.md`

수정:

- 없음. 조사 결과가 수행계획서 범위를 바꾸는 경우에는 구현계획서를 먼저 갱신하고 승인받는다.

### 변경 내용

- `templates/manifest.json`의 `localization.enabled: true` entry를 기준으로 locale pack 대상 경로 목록을 확정한다.
- 현재 `templates/`의 한국어 원문과 한국어 고정 문구를 inventory로 정리한다.
- manual/Skill 전체 번역의 필요성과 리스크를 판단하고, 이번 task에서 포함할 최소 범위를 정한다.
- 용어 대응표 초안을 만든다. 최소 항목은 승인 게이트, 작업지시자, 수행계획서, 구현계획서, 단계별 완료보고서, 최종 결과보고서, 오늘할일, 산출물, 보존, 선택 locale, fallback이다.
- 구조적 계약 보존 기준을 용어 대응표에 적는다. placeholder, branch pattern, filename pattern, command/code block, GitHub 식별자는 번역하지 않는다.

### 검증

```bash
rg -n "작성 언어: 한국어|모든 문서는 한국어|language|locale|requiresSemanticReview" templates docs mydocs/tech/task_m050_67_locale_manifest_design.md
rg -n '"localization"|"sourcePattern"|"requiresSemanticReview"' templates/manifest.json
git diff --check
```

### 커밋

```text
Task #68 Stage 1: locale 번역 범위 확정
```

## Stage 2 — 영어 기본 locale pack 작성

### 산출물

신규:

- `templates/locales/en/AGENTS.md`
- `templates/locales/en/CLAUDE.md`
- `templates/locales/en/.github/ISSUE_TEMPLATE/task.yml`
- `templates/locales/en/.github/pull_request_template.md`
- `templates/locales/en/mydocs/_templates/**`
- `templates/locales/en/mydocs/{orders,plans,working,report,feedback,tech,troubleshootings,pr}/README.md`
- Stage 1에서 포함하기로 확정한 경우 `templates/locales/en/mydocs/manual/**`
- Stage 1에서 포함하기로 확정한 경우 `templates/locales/en/mydocs/skills/**`
- `mydocs/working/task_m050_68_stage2.md`

수정:

- `mydocs/tech/task_m050_68_translation_terms.md`

### 변경 내용

- 신규 적용 기본 pack으로 사용할 수 있는 영어 문서와 template을 작성한다.
- `작성 언어: 한국어`, `모든 문서는 한국어 작성` 계열 문구는 영어 기준으로 `Writing language: use the selected Hyper-Waterfall locale for this repository.` 의미를 반영한다.
- `Task`, `Issue`, `PR`, `label`, `milestone`, `commit`, `branch`처럼 플랫폼/도구 식별자는 식별자로 보존한다.
- `{REPO_SLUG}`, `{BASE_BRANCH}`, `{issue}`, `{stage}`, `{head_sha}`, `local/task{N}`, `publish/task{N}` 같은 구조적 계약은 그대로 보존한다.
- manual/Skill을 포함하는 경우 절차 의미 보존 검토 결과를 용어 대응표에 함께 기록한다.

### 검증

```bash
rg -n "\{REPO_SLUG\}|\{BASE_BRANCH\}|\{issue\}|\{stage\}|\{head_sha\}|local/task\{N\}|publish/task\{N\}" templates/locales/en
rg -n "작성 언어: 한국어|모든 문서는 한국어" templates/locales/en
git diff --check
```

추가 수동 검토:

- `templates/locales/en/AGENTS.md`
- `templates/locales/en/.github/ISSUE_TEMPLATE/task.yml`
- `templates/locales/en/mydocs/_templates/task_plan.md`
- `templates/locales/en/mydocs/_templates/stage_report.md`
- Stage 1에서 포함한 manual/Skill 대표 파일

### 커밋

```text
Task #68 Stage 2: 영어 locale pack 작성
```

## Stage 3 — 한국어 원문 보존 pack 작성

### 산출물

신규:

- `templates/locales/ko/AGENTS.md`
- `templates/locales/ko/CLAUDE.md`
- `templates/locales/ko/.github/ISSUE_TEMPLATE/task.yml`
- `templates/locales/ko/.github/pull_request_template.md`
- `templates/locales/ko/mydocs/_templates/**`
- `templates/locales/ko/mydocs/{orders,plans,working,report,feedback,tech,troubleshootings,pr}/README.md`
- Stage 1에서 포함하기로 확정한 경우 `templates/locales/ko/mydocs/manual/**`
- Stage 1에서 포함하기로 확정한 경우 `templates/locales/ko/mydocs/skills/**`
- `mydocs/working/task_m050_68_stage3.md`

수정:

- `mydocs/tech/task_m050_68_translation_terms.md`

### 변경 내용

- 기존 `templates/` 한국어 원문을 `ko` locale pack에 보존한다.
- 한국어 고정 문구는 M050 정책에 맞춰 "작성 언어: 이 저장소에 선택된 Hyper-Waterfall locale을 따른다" 의미로 정렬한다.
- 기존 한국어 운영 맥락은 보존하되, 선택 locale 정책과 충돌하는 표현만 최소 수정한다.
- 영어 pack과 한국어 pack의 절차 계약이 같은 의미를 갖는지 주요 template별로 대조한다.

### 검증

```bash
rg -n "작성 언어: 한국어|모든 문서는 한국어|선택한 Hyper-Waterfall locale|선택된 Hyper-Waterfall locale" templates/locales/ko
rg -n "\{REPO_SLUG\}|\{BASE_BRANCH\}|\{issue\}|\{stage\}|\{head_sha\}|local/task\{N\}|publish/task\{N\}" templates/locales/ko
git diff --check
```

추가 수동 검토:

- `templates/locales/ko/AGENTS.md`
- `templates/locales/ko/.github/ISSUE_TEMPLATE/task.yml`
- `templates/locales/ko/mydocs/_templates/task_plan.md`
- `templates/locales/ko/mydocs/_templates/stage_report.md`
- Stage 1에서 포함한 manual/Skill 대표 파일

### 커밋

```text
Task #68 Stage 3: 한국어 locale pack 보존
```

## Stage 4 — pack 정합성 검증과 smoke 기대값 정렬

### 산출물

신규:

- `mydocs/working/task_m050_68_stage4.md`

수정:

- `templates/manifest.json` 또는 `docs/localization.md`: 실제 pack 상태와 문서/manifest 설명이 어긋나는 경우에만 최소 수정
- `test/cli-smoke.test.js`: locale source 존재로 CLI smoke 기대값이 달라지는 경우에만 수정

### 변경 내용

- manifest의 `sourcePattern`이 실제 `templates/locales/en/**`, `templates/locales/ko/**` source와 맞는지 확인한다.
- `node bin/hyper-waterfall.js doctor --repo . --manifest templates/manifest.json` 출력에서 영어 fallback source 누락 경고가 해소되는지 확인한다.
- `ko` source가 존재하더라도 `zh-CN` source는 #69 범위이므로 남은 누락이 의도한 상태인지 보고서에 명시한다.
- smoke test가 manifest의 실제 source 존재 상태를 반영하도록 필요한 경우 기대값을 갱신한다.
- locale pack availability 문구는 #68 결과에 맞춰 조정할 필요가 있는지 판단하되, `zh-CN`이 남아 있으므로 전체 release 가능 상태로 과장하지 않는다.

### 검증

```bash
node bin/hyper-waterfall.js doctor --repo . --manifest templates/manifest.json
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --dry-run
npm test
rg -n "\{REPO_SLUG\}|\{BASE_BRANCH\}|작성 언어|Writing language|language|locale" templates docs README.md
git diff --check
```

추가 수동 검토:

- manifest `localization.enabled: true` entry와 `templates/locales/en`, `templates/locales/ko` source 존재 여부 대조
- 영어/한국어 주요 template 절차 의미 대조

### 커밋

```text
Task #68 Stage 4: locale pack 정합성 검증
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- Stage 1에서 manual/Skill 포함 범위가 수행계획서와 달라지면 구현계획서를 먼저 갱신하고 승인받는다.
- `zh-CN` locale pack 누락은 #69 범위로 보고하되, #68의 실패로 처리하지 않는다.
- `templates/manifest.json`의 release checksum 확정은 릴리스 범위이므로 이번 task에서 수행하지 않는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m050_68_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 다음 형식을 따른다.
  - `Task #68 Stage 1: locale 번역 범위 확정`
  - `Task #68 Stage 2: 영어 locale pack 작성`
  - `Task #68 Stage 3: 한국어 locale pack 보존`
  - `Task #68 Stage 4: locale pack 정합성 검증`

## 단계 의존성

- Stage 2는 Stage 1의 manual/Skill 포함 범위와 용어 대응표가 승인된 뒤 진행한다.
- Stage 3은 Stage 2의 영어 기본 pack과 절차 용어 기준이 승인된 뒤 진행한다.
- Stage 4는 Stage 2와 Stage 3의 pack 본문이 모두 작성된 뒤 진행한다.
- 최종 보고와 PR 게시는 Stage 4 승인 후 `task-final-report` 절차로 수행한다.

## 위험과 대응

- **manual/Skill 범위 과대화**: Stage 1에서 포함 범위를 명시하고, 전체 번역이 #68 목표를 넘는다고 판단되면 후속 이슈 후보로 분리한다.
- **절차 의미 drift**: 승인 게이트, Issue 추적, Stage 보고, PR 게시 규칙은 용어 대응표와 수동 대조로 검증한다.
- **locale source 존재와 completeness 혼동**: directory가 존재해도 일부 파일만 있으면 혼합 locale 위험이 있다. Stage 4에서 manifest entry와 실제 파일 목록을 대조한다.
- **availability 표현 과장**: `en`, `ko` pack이 작성되어도 `zh-CN`은 #69 범위다. 문서나 manifest 문구를 전체 완료처럼 표현하지 않는다.

## 승인 요청 사항

- 위 4단계 분할, 산출물 경로, 검증 명령, 커밋 메시지로 #68 구현을 진행한다.
- Stage 1 완료 후 manual/Skill 포함 범위와 용어 대응표를 보고받고 승인한 뒤 Stage 2로 넘어간다.
- Stage 4에서 `templates/manifest.json`, `docs/localization.md`, `test/cli-smoke.test.js` 수정 여부는 실제 smoke 결과에 따라 최소 범위로 판단한다.
