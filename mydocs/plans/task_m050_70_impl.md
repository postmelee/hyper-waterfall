# 적용·업데이트 workflow에 locale 선택 절차 연결 구현계획서

수행계획서: [`task_m050_70.md`](task_m050_70.md)
GitHub Issue: [#70](https://github.com/postmelee/hyper-waterfall/issues/70)
마일스톤: M050

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | locale 선택·저장 계약 확정 | `templates/manifest.json`, `docs/localization.md`, `docs/lifecycle/adoption.md`, `docs/lifecycle/update.md` | #70 보류 표현 제거 후보와 version state locale 계약 확인 |
| 2 | CLI dry-run locale 판단 연결 | `src/commands/init.js`, `src/commands/update.js`, `src/lib/manifest.js`, `src/lib/version-state.js`, `test/cli-smoke.test.js` | locale별 init/update dry-run과 npm test |
| 3 | lifecycle·plugin·manual 문서 정합성 반영 | `docs/agent-entrypoint.md`, `docs/lifecycle/update_pr.md`, distribution/plugin 문서, `templates/mydocs/manual/*`, locale mirror | 문서 검색으로 상충 표현과 #70 보류 표현 확인 |
| 4 | 통합 검증과 최종 정리 | stage 보고서, 검증 결과, 남은 #71 handoff | 전체 CLI dry-run, doctor, npm test, git diff --check |

## 문서 위치 확인

수행계획서의 "문서 위치 판단"과 실제 Stage 산출물 경로를 맞춘다. 공식 lifecycle 판단 기준은 `docs/`, 적용 저장소에 복사되는 운영 기준은 `templates/mydocs/manual/`과 locale mirror, 작업 산출물은 `mydocs/`에 둔다.

| 파일 | 수행계획서상 선택 위치 | Stage 산출물 경로 | 일치 여부 | 비고 |
|---|---|---|---|---|
| `templates/manifest.json` | `templates/` | Stage 1 | OK | version state locale 기록 계약 반영 |
| `docs/localization.md` | `docs/` | Stage 1 | OK | M050 locale 정책의 공식 기준 |
| `docs/lifecycle/adoption.md` | `docs/lifecycle/` | Stage 1 | OK | 신규 적용 locale 선택 판단 형식 |
| `docs/lifecycle/update.md` | `docs/lifecycle/` | Stage 1 | OK | 기존 update locale 보존/전환 판단 형식 |
| `src/**`, `test/cli-smoke.test.js` | 코드/검증 산출물 | Stage 2 | OK | CLI dry-run 판단 연결과 smoke 검증 |
| `docs/agent-entrypoint.md`, `docs/lifecycle/update_pr.md` | `docs/` | Stage 3 | OK | lifecycle 진입과 update PR 전환 기준 |
| `docs/plugin-distribution-principles.md`, `docs/distribution-channels.md` | `docs/` | Stage 3 | OK | plugin/distribution 안내의 locale 규칙 정렬 |
| `templates/mydocs/manual/*`, `templates/locales/*/mydocs/manual/*` | `templates/mydocs/manual/`, `templates/locales/{locale}/mydocs/manual/` | Stage 3 | OK | 적용 저장소 내부 운영 기준과 locale mirror |
| `README.md`, `README.ko.md`, `README.zh-CN.md` | repository root | Stage 3 검토 | OK | 짧은 진입 안내 또는 manual 변경 정합성이 필요할 때만 수정 |
| `mydocs/working/task_m050_70_stage{N}.md` | `mydocs/working/` | 각 Stage | OK | 단계별 완료보고서 |

## Stage 1 — locale 선택·저장 계약 확정

### 산출물

신규:

- `mydocs/working/task_m050_70_stage1.md`

수정:

- `templates/manifest.json`
- `docs/localization.md`
- `docs/lifecycle/adoption.md`
- `docs/lifecycle/update.md`

### 변경 내용

- `.hyper-waterfall/version.json`의 새 locale 기록 계약을 top-level `locale`로 확정한다.
- manifest `versionState.format`에 `locale` 필드를 추가하고 `defaultLocale`/기존 선택 locale과의 관계를 설명한다.
- 신규 적용 판단 결과에서 `locale 저장 보류` 표현을 제거하고, 승인 후 생성될 version state에 기록할 locale을 명시한다.
- 기존 update 판단 결과에서 locale이 없을 때 `unknown`으로 보고하는 호환 경로와, locale이 있으면 보존하는 기본값을 구분한다.
- 명시적 locale 전환 요청은 update 부수 효과가 아니라 별도 승인 항목임을 문서화한다.
- #65-#69 산출물과 충돌하는 표현이 없는지 확인한다.

### 검증

```bash
rg -n "#70|후속 #70|locale 선택 저장 위치|workflow 실행" docs templates README.md src test
rg -n "\"locale\"|selectedLocale|localization\\.locale" templates/manifest.json src docs templates/mydocs/manual
git diff --check
```

### 커밋

```text
Task #70 Stage 1: locale 선택 저장 계약 확정
```

## Stage 2 — CLI dry-run locale 판단 연결

### 산출물

신규:

- `mydocs/working/task_m050_70_stage2.md`

수정:

- `src/commands/init.js`
- `src/commands/update.js`
- `src/commands/doctor.js` (필요 시)
- `src/lib/manifest.js`
- `src/lib/version-state.js`
- `test/cli-smoke.test.js`

### 변경 내용

- `init --locale <locale>` 옵션을 추가하고, 요청 locale, 선택 locale, 지원 여부, fallback 후보, selected source 상태를 출력한다.
- `update --locale <locale>` 옵션을 locale 전환 요청으로 해석하고, 기존 locale 보존과 전환 후보를 분리해 출력한다.
- `update`는 version state의 top-level `locale`을 우선 읽고, 기존 호환을 위해 `selectedLocale`, `localization.locale`, `localization.selectedLocale`도 계속 읽는다.
- unsupported locale은 실패가 아니라 판단 보고 대상이지만, `selectedSupported: no`, source missing, fallback 후보가 드러나야 한다.
- CLI help와 smoke test를 갱신해 `en`, `ko`, `zh-CN`, unsupported locale, version state locale 보존 케이스를 확인한다.

### 검증

```bash
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale ko --dry-run
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale zh-CN --dry-run
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale fr --dry-run
node bin/hyper-waterfall.js update --repo . --manifest templates/manifest.json --from v0.1.0 --to v0.2.0 --dry-run
npm test
git diff --check
```

### 커밋

```text
Task #70 Stage 2: CLI locale 판단 연결
```

## Stage 3 — lifecycle·plugin·manual 문서 정합성 반영

### 산출물

신규:

- `mydocs/working/task_m050_70_stage3.md`

수정 후보:

- `docs/agent-entrypoint.md`
- `docs/lifecycle/update_pr.md`
- `docs/localization.md`
- `docs/plugin-distribution-principles.md`
- `docs/distribution-channels.md`
- `README.md`
- `README.ko.md`
- `README.zh-CN.md`
- `templates/mydocs/manual/framework_lifecycle_guide.md`
- `templates/mydocs/manual/release_update_protocol.md`
- `templates/mydocs/manual/task_workflow_guide.md`
- `templates/locales/en/mydocs/manual/framework_lifecycle_guide.md`
- `templates/locales/ko/mydocs/manual/framework_lifecycle_guide.md`
- `templates/locales/zh-CN/mydocs/manual/framework_lifecycle_guide.md`
- 필요 시 위 manual 변경과 연결되는 locale mirror 문서

### 변경 내용

- `docs/agent-entrypoint.md`의 #70 보류 문구를 확정된 locale 저장/선택 workflow 설명으로 바꾼다.
- `docs/lifecycle/update_pr.md`에 update PR 본문이 현재 locale, 요청 locale, 보존/전환 판단, fallback 후보를 어떻게 담아야 하는지 정리한다.
- plugin/distribution 문서가 CLI와 agent entrypoint를 다른 규칙처럼 안내하지 않도록 정렬한다.
- 적용 저장소에 복사되는 `framework_lifecycle_guide.md`와 locale mirror에서 같은 locale 보존/전환 규칙을 유지한다.
- manual 변경이 실제 core Skill 호출 시점이나 이름을 바꾸지 않는지 확인한다. 바꾸지 않는다면 README의 "핵심 SKILL"·"도입 후 작업 흐름" 표와 `task_workflow_guide.md`의 "SKILL 호출 표시 안내"는 변경 불필요로 stage 보고서에 근거를 남긴다.

### 검증

```bash
rg -n "실제 locale 선택 저장 위치와 workflow|#70 범위|후속 #70" docs templates README.md
rg -n "locale|language|version.json|preserveSelectedLocaleOnUpdate" docs README.md templates/mydocs/manual templates/locales/*/mydocs/manual
git diff --check
```

### 커밋

```text
Task #70 Stage 3: locale lifecycle 문서 정합성 반영
```

## Stage 4 — 통합 검증과 최종 정리

### 산출물

신규:

- `mydocs/working/task_m050_70_stage4.md`

수정:

- 필요 시 Stage 1-3에서 발견된 작은 정합성 보정 파일

### 변경 내용

- 전체 CLI dry-run과 doctor 결과를 기준으로 신규 적용, 기존 update, locale 보존, locale 전환 요청 흐름을 확인한다.
- `README`와 lifecycle 문서에서 사용자-facing 진입 안내가 과하게 중복되거나 서로 다른 규칙을 말하지 않는지 최종 검색한다.
- #71로 넘길 smoke matrix와 migration guide 범위를 stage 보고서에 명확히 남긴다.
- PR 전 최종 보고서에서 재사용할 검증 결과와 검증 한계를 정리한다.

### 검증

```bash
npm test
node bin/hyper-waterfall.js doctor --repo . --manifest templates/manifest.json
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale en --dry-run
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale ko --dry-run
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale zh-CN --dry-run
node bin/hyper-waterfall.js update --repo . --manifest templates/manifest.json --from v0.1.0 --to v0.2.0 --dry-run
git diff --check
```

### 커밋

```text
Task #70 Stage 4: locale workflow 통합 검증
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- 문서 위치가 수행계획서 판단과 달라지면 구현 전에 수행계획서 또는 구현계획서를 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m050_70_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #70 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 자체는 별도 커밋 `Task #70: 구현 계획서 작성`으로 묶는다.

## 단계 의존성

- Stage 2는 Stage 1의 locale 저장 계약 확정 후 진행한다.
- Stage 3은 Stage 2의 CLI 출력 계약이 확정된 뒤 문서 표현을 정렬한다.
- Stage 4는 Stage 1-3 산출물과 단계 보고서 승인 후 진행한다.

## 위험과 대응

- **dry-run 경계 약화**: CLI가 실제 적용 write mode처럼 보이지 않도록 help와 출력의 비파괴 설명을 유지한다.
- **unsupported locale 처리 혼동**: 지원되지 않는 locale은 자동 실패보다 판단 보고와 승인 게이트로 다루되, 지원 여부와 fallback 후보를 명확히 표시한다.
- **기존 적용 저장소 호환성**: locale 필드가 없는 version state는 `unknown`으로 유지하고, 새 계약은 `locale` 필드로 확정한다.
- **문서 mirror drift**: `templates/mydocs/manual/`과 `templates/locales/*/mydocs/manual/`의 같은 기준 문서를 함께 확인한다.
- **#71 범위 침범**: migration guide와 전체 smoke matrix는 만들지 않고, 필요한 handoff만 Stage 4와 최종 보고서에 남긴다.

## 승인 요청 사항

- 위 4단계 Stage 분할
- `init --locale <locale>`과 `update --locale <locale>`를 dry-run 판단 옵션으로 추가하는 방향
- `.hyper-waterfall/version.json`의 top-level `locale`을 새 저장 계약으로 확정하는 방향
- 각 Stage 산출물과 검증 명령, 커밋 메시지
- Stage 1 진입 승인
