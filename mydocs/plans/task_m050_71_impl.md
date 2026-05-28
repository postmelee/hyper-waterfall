# 다국어 적용 smoke 검증과 migration guide 작성 구현계획서

수행계획서: [`task_m050_71.md`](task_m050_71.md)
GitHub Issue: [#71](https://github.com/postmelee/hyper-waterfall/issues/71)
마일스톤: M050

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | smoke matrix 설계와 baseline 검증 | `docs/localization-smoke.md` 초안, `mydocs/working/task_m050_71_stage1.md` | locale source 존재, init dry-run baseline, manifest/localization 계약 확인 |
| 2 | locale별 smoke 실행과 결과 문서화 | `docs/localization-smoke.md` 결과 보강, `mydocs/working/task_m050_71_stage2.md` | en/ko/zh-CN/unsupported/init/update dry-run과 placeholder·승인 게이트 검색 |
| 3 | 기존 한국어-only migration guide 작성 | `docs/migrations/v0.2.0-to-v0.3.0.md`, 필요 시 `docs/migrations/README.md`, `mydocs/working/task_m050_71_stage3.md` | migration guide 필수 섹션, locale/version/manifest 근거 검색 |
| 4 | 최종 링크 정합성 및 M050 종료 점검 | `docs/localization.md` 등 최종 보정, `mydocs/working/task_m050_71_stage4.md` | npm test, M050/locale/migration 링크 검색, stale #71 표현 검색 |

## 문서 위치 확인

수행계획서의 "문서 위치 판단"과 실제 Stage 산출물 경로를 맞춘다. 이번 task의 공식 smoke/migration 문서는 Hyper-Waterfall framework 사용자와 maintainer가 반복 참조할 기준이므로 `docs/`와 `docs/migrations/`에 두고, 작업 진행 기록은 `mydocs/`에 둔다.

| 파일 | 수행계획서상 선택 위치 | Stage 산출물 경로 | 일치 여부 | 비고 |
|---|---|---|---|---|
| `docs/localization-smoke.md` | `docs/` | Stage 1-2 | OK | M050 이후 반복 재검증할 공식 smoke matrix |
| `docs/migrations/v0.2.0-to-v0.3.0.md` | `docs/migrations/` | Stage 3 | OK | 기존 한국어-only 적용 저장소의 다국어 구조 migration guide |
| `docs/migrations/README.md` | `docs/migrations/` | Stage 3 필요 시 | OK | locale migration 작성 규칙 보강이 필요할 때만 수정 |
| `docs/localization.md` | `docs/` | Stage 4 필요 시 | OK | smoke/migration 완료 상태와 M050 handoff 보정 |
| `README.md`, `README.ko.md`, `README.zh-CN.md` | repository root | Stage 4 검토 | OK | 링크 정합성 문제가 발견될 때만 수정 |
| `mydocs/working/task_m050_71_stage{N}.md` | `mydocs/working/` | 각 Stage | OK | 단계별 완료보고서 |
| `mydocs/report/task_m050_71_report.md` | `mydocs/report/` | 최종 보고 | OK | 최종 결과 장기 기록 |

## Stage 1 — smoke matrix 설계와 baseline 검증

### 산출물

신규:

- `docs/localization-smoke.md`
- `mydocs/working/task_m050_71_stage1.md`

수정:

- `mydocs/orders/20260527.md`

### 변경 내용

- `docs/localization-smoke.md`에 목적, 범위, smoke 환경, locale별 matrix, 검증 항목, 결과 기록 표의 골격을 만든다.
- `en`, `ko`, `zh-CN` 신규 적용 dry-run baseline 결과를 문서 초안에 반영한다.
- manifest의 localized entry 수, `supportedLocales`, `availability.status`, version state `locale` 계약을 smoke 기준으로 기록한다.
- Stage 1에서는 migration guide 본문을 만들지 않고, Stage 3에서 채울 항목을 `pending` 또는 후속 섹션으로 남긴다.

### 검증

```bash
node bin/hyper-waterfall.js init --repo /private/tmp/hw-smoke-en --manifest "$(pwd)/templates/manifest.json" --locale en --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-smoke-ko --manifest "$(pwd)/templates/manifest.json" --locale ko --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-smoke-zh --manifest "$(pwd)/templates/manifest.json" --locale zh-CN --dry-run
rg -n "supportedLocales|availability|sourcePattern|versionState" templates/manifest.json docs/localization.md docs/localization-smoke.md
git diff --check
```

### 커밋

```text
Task #71 Stage 1: smoke matrix 설계와 baseline 검증
```

## Stage 2 — locale별 smoke 실행과 결과 문서화

### 산출물

신규:

- `mydocs/working/task_m050_71_stage2.md`

수정:

- `docs/localization-smoke.md`
- `mydocs/orders/20260527.md`

### 변경 내용

- `docs/localization-smoke.md`의 locale별 matrix에 `en`, `ko`, `zh-CN` 신규 적용 dry-run 결과를 채운다.
- unsupported locale `fr`의 누락 source와 fallback 후보 보고 결과를 기록한다.
- 임시 한국어-only 적용 저장소 시나리오를 만들어 `.hyper-waterfall/version.json`에 `locale`이 없는 상태와 `locale: ko`가 있는 상태를 모두 확인한다.
- `update --locale zh-CN` 전환 요청이 별도 승인 항목으로 보고되는지 기록한다.
- placeholder와 승인 게이트 의미 보존 검색 결과를 문서에 반영한다.

### 검증

```bash
node bin/hyper-waterfall.js init --repo /private/tmp/hw-smoke-fr --manifest "$(pwd)/templates/manifest.json" --locale fr --dry-run
node bin/hyper-waterfall.js update --repo /private/tmp/hw-smoke-ko-only --manifest "$(pwd)/templates/manifest.json" --from v0.2.0 --to v0.3.0 --dry-run
node bin/hyper-waterfall.js update --repo /private/tmp/hw-smoke-ko-only --manifest "$(pwd)/templates/manifest.json" --from v0.2.0 --to v0.3.0 --locale zh-CN --dry-run
rg -n "\\{REPO_SLUG\\}|\\{BASE_BRANCH\\}|승인|approval|批准|locale" templates/locales docs/localization-smoke.md
git diff --check
```

### 커밋

```text
Task #71 Stage 2: locale별 smoke 결과 문서화
```

## Stage 3 — 기존 한국어-only migration guide 작성

### 산출물

신규:

- `docs/migrations/v0.2.0-to-v0.3.0.md`
- `mydocs/working/task_m050_71_stage3.md`

수정 후보:

- `docs/migrations/README.md`
- `docs/localization-smoke.md`
- `mydocs/orders/20260527.md`

### 변경 내용

- `docs/migrations/README.md`의 필수 섹션 규칙을 따라 `v0.2.0 -> v0.3.0` migration guide를 작성한다.
- 기존 한국어-only 적용 저장소의 판단 흐름을 명시한다: `locale` 기록 없음은 `unknown`, 한국어 문맥 보존 시 `ko` 선택 승인, `en`/`zh-CN` 전환은 별도 승인.
- M050에서 추가·수정된 README, locale pack, manifest localization, lifecycle/update 문서, template manual/Skill mirror의 수동 확인과 충돌 가능성을 정리한다.
- release/tag 생성과 npm publish는 이번 task 범위가 아니라는 점을 migration guide의 release 상태와 후속 작업에 명확히 적는다.
- 필요하면 `docs/migrations/README.md`에 locale migration guide 작성 시 `locale`, `fallback`, `semantic review` 항목을 포함하라는 기준을 보강한다.

### 검증

```bash
test -f docs/migrations/v0.2.0-to-v0.3.0.md
grep -nE '대상 버전|변경 요약|추가 파일|수정 파일|수동 확인|충돌 가능성|검증|후속 작업' docs/migrations/v0.2.0-to-v0.3.0.md
grep -nE 'v0.2.0|v0.3.0|manifest|version|locale|\\.hyper-waterfall' docs/migrations/v0.2.0-to-v0.3.0.md
git diff --check
```

### 커밋

```text
Task #71 Stage 3: 한국어-only migration guide 작성
```

## Stage 4 — 최종 링크 정합성 및 M050 종료 점검

### 산출물

신규:

- `mydocs/working/task_m050_71_stage4.md`

수정 후보:

- `docs/localization.md`
- `docs/localization-smoke.md`
- `docs/migrations/README.md`
- `docs/agent-entrypoint.md`
- `docs/lifecycle/adoption.md`
- `docs/lifecycle/update.md`
- `docs/plugin-distribution-principles.md`
- `docs/distribution-channels.md`
- `README.md`
- `README.ko.md`
- `README.zh-CN.md`
- `templates/manifest.json`
- `test/cli-smoke.test.js`
- `mydocs/orders/20260527.md`

### 변경 내용

- README, lifecycle, plugin/distribution, localization 정책에서 smoke/migration 링크와 stale 표현을 확인한다.
- `docs/localization.md`와 `templates/manifest.json`의 #71 관련 표현을 완료 상태로 정리할 필요가 있으면 보정한다.
- `test/cli-smoke.test.js`의 manifest availability note 기대값이 "후속 #71" 같은 완료 전 표현에 묶여 있으면 M050 완료 상태에 맞춘다.
- M050 milestone 종료 판단에 필요한 잔여 위험과 후속 작업 후보를 Stage 4 보고서에 정리한다.

### 검증

```bash
npm test
rg -n "M050|locale|migration|zh-CN|README\\.ko|README\\.zh-CN" docs README* templates mydocs
rg -n "후속 #71|#71에서 이어진다|smoke 검증과 migration guide는 #71|#71에서 처리한다|#71 cover" docs README.md README.ko.md README.zh-CN.md templates test
git diff --check
```

### 커밋

```text
Task #71 Stage 4: M050 다국어 검증 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- 문서 위치가 수행계획서 판단과 달라지면 구현 전에 수행계획서 또는 구현계획서를 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m050_71_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #71 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 자체는 별도 커밋 `Task #71: 구현 계획서 작성`으로 묶는다.

## 단계 의존성

- Stage 2는 Stage 1의 smoke matrix 골격과 baseline 검증 기준 확정 후 진행한다.
- Stage 3은 Stage 2의 smoke 결과를 migration guide에 반영할 수 있는 상태가 된 뒤 진행한다.
- Stage 4는 Stage 1-3 산출물과 단계 보고서 승인 후 진행한다.

## 위험과 대응

- **dry-run smoke 한계**: 실제 파일 복사와 write mode를 검증하지 못한다. smoke 문서와 보고서에 dry-run 기반 검증임을 명시하고, 실제 write mode는 후속 작업 후보로 남긴다.
- **v0.3.0 release 상태 혼동**: migration guide는 `v0.2.0 -> v0.3.0` 경로를 설명하되, release/tag 생성과 npm publish는 이번 task에서 수행하지 않는다고 명확히 적는다.
- **임시 저장소 상태 오염**: `/private/tmp` scratch path는 기존 파일이 있어도 dry-run 판단 결과가 달라질 수 있다. 필요한 경우 Stage 실행 시 새 임시 directory를 만들고 단계 보고서에 실제 path를 기록한다.
- **한국어-only 판정 모호성**: 자동 판정하지 않고 version state `locale`이 없으면 `unknown`으로 보고하며, `ko` 보존 또는 전환은 maintainer 승인 항목으로 둔다.
- **문서 중복 증가**: README에는 상세 smoke 절차를 넣지 않고 `docs/localization-smoke.md`와 migration guide를 기준 문서로 둔다.

## 승인 요청 사항

- 위 4단계 Stage 분할
- `docs/localization-smoke.md`와 `docs/migrations/v0.2.0-to-v0.3.0.md`를 공식 장기 문서로 작성하는 방향
- smoke를 실제 write mode 없이 dry-run과 locale source 검사로 수행하는 방향
- Stage별 산출물, 검증 명령, 커밋 메시지
- Stage 1 진입 승인
