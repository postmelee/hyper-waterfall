# 적용·업데이트 workflow에 locale 선택 절차 연결 최종 보고서

GitHub Issue: [#70](https://github.com/postmelee/hyper-waterfall/issues/70)
마일스톤: M050

## 작업 요약

- 대상 이슈: #70
- 마일스톤: M050
- 단계 수: 4
- 작업 목적: 신규 적용과 기존 update workflow에서 locale 선택, 저장, 보존, 전환 요청 판단을 같은 계약으로 연결한다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `templates/manifest.json` | `versionState.format.locale` 계약을 추가하고 locale pack availability를 현재 source 준비 상태로 정리했다. | manifest 기반 적용/update 판단 |
| `docs/localization.md` | locale 저장 계약, update 보존/전환 원칙, M050 이슈 완료 상태와 #71 handoff를 정리했다. | 다국어 정책 기준 |
| `docs/lifecycle/adoption.md`, `docs/lifecycle/update.md`, `docs/lifecycle/update_pr.md` | 신규 적용의 version state `locale` 기록, 기존 update의 `unknown`/보존/전환 판단, update PR 본문 반영 기준을 확정했다. | lifecycle 판단 문서 |
| `docs/agent-entrypoint.md` | #70 보류 표현을 제거하고 `init/update --locale` dry-run 판단 흐름을 연결했다. | 사용자와 에이전트 진입 절차 |
| `docs/plugin-distribution-principles.md`, `docs/distribution-channels.md` | plugin/distribution 채널이 CLI dry-run과 lifecycle 문서를 같은 locale 기준으로 안내하도록 정렬했다. | 배포·plugin 안내 |
| `src/commands/init.js`, `src/commands/update.js` | `--locale <locale>` dry-run 판단 옵션, version state locale 읽기, 보존/전환 출력, fallback source 상태 출력을 연결했다. | npm CLI 판단 출력 |
| `test/cli-smoke.test.js` | 명시 locale, unsupported locale, 기존 locale 보존, 전환 요청 smoke test를 추가했다. | CLI 회귀 검증 |
| `README.md`, `README.ko.md`, `README.zh-CN.md` | 적용 저장소 구조와 기존 update 설명에 version state locale 기록과 요청 locale/전환 판단을 반영했다. | 사용자 진입 README |
| `templates/mydocs/manual/*`, `templates/locales/*/mydocs/manual/*` | 적용 저장소 manual과 locale mirror에 version/locale 기록, CLI 판단 출력, release/update protocol 입력을 반영했다. | 적용 저장소 운영 기준 |
| `mydocs/plans/*`, `mydocs/working/*`, `mydocs/orders/20260527.md` | 수행계획서, 구현계획서, Stage 1-4 보고서, 오늘할일 상태를 기록했다. | 내부 작업 추적 |

## 문서 위치 검증

| 파일 | 계획된 위치 | 실제 위치 | 결과 | 근거 |
|---|---|---|---|---|
| `docs/lifecycle/*`, `docs/agent-entrypoint.md`, `docs/localization.md` | `docs/` | `docs/` | OK | 공식 lifecycle와 다국어 정책 문서로 수행계획서의 선택 위치와 일치한다. |
| `docs/plugin-distribution-principles.md`, `docs/distribution-channels.md` | `docs/` | `docs/` | OK | 배포·plugin 상세 안내 문서로 수행계획서의 선택 위치와 일치한다. |
| `templates/manifest.json` | `templates/` | `templates/` | OK | 적용/update 판단의 기계 판독 계약 위치와 일치한다. |
| `templates/mydocs/manual/*`, `templates/locales/*/mydocs/manual/*` | `templates/mydocs/manual/`, `templates/locales/{locale}/mydocs/manual/` | 동일 | OK | 적용 저장소에 복사될 운영 기준과 locale mirror 위치를 유지했다. |
| `README.md`, `README.ko.md`, `README.zh-CN.md` | repository root | repository root | OK | 사용자 진입 README의 짧은 update 안내만 보정했다. |
| `mydocs/plans/*`, `mydocs/working/*`, `mydocs/report/*` | `mydocs/` | `mydocs/` | OK | 하이퍼-워터폴 task 산출물 위치와 일치한다. |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| CLI locale 요청 옵션 | 없음 | `init --locale <locale>`, `update --locale <locale>` |
| version state locale 저장 계약 | 문서상 미확정 또는 보류 표현 존재 | `.hyper-waterfall/version.json` top-level `locale` |
| 지원 locale source 상태 | `en`, `ko`, `zh-CN` pack 준비 상태를 workflow가 충분히 쓰지 못함 | localized entry 15개 모두 source exists로 dry-run 판단 |
| CLI smoke test | 9개 pass | 11개 pass |
| 단계 커밋 | 없음 | Stage 1-4 포함 6개 작업 커밋 |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| 신규 적용 시 선택 locale, 기본값, fallback 후보를 보고한다. | OK — `init --locale en/ko/zh-CN --dry-run`이 requested/selected/supported, selected source `exists=15`, version state `locale` 생성 계획을 출력했다. |
| 기존 update가 기존 locale을 임의로 바꾸지 않는다. | OK — `update --dry-run`이 현재 locale `unknown`, selectedForDiff `en`, `preserveSelectedLocaleOnUpdate: true`, 보존 또는 전환 승인 필요성을 출력했다. |
| locale 전환은 명시 요청과 별도 승인 항목으로 분리한다. | OK — `update --locale zh-CN --dry-run`이 requested `zh-CN`, selectedForDiff `zh-CN`, 전환 요청 별도 승인 항목을 출력했다. |
| CLI/plugin/문서가 서로 다른 locale 규칙을 안내하지 않는다. | OK — stale #70 보류 표현, locale 저장 위치 미확정 표현, 오래된 version-only 표현 검색 결과가 없다. |
| template manual과 locale mirror가 같은 기준을 유지한다. | OK — `templates/mydocs/manual/*`와 `templates/locales/{en,ko,zh-CN}/mydocs/manual/*`에 version/locale 기록과 CLI 판단 출력 기준을 반영했다. |
| 통합 검증이 통과한다. | OK — `npm test` 11개 pass, `git diff --check` 통과. |

### 단계별 검증 결과

- Stage 1: [`task_m050_70_stage1.md`](../working/task_m050_70_stage1.md) — manifest와 lifecycle 문서의 top-level `locale` 저장 계약 확정, stale #70 후보 검색과 `npm test` 통과.
- Stage 2: [`task_m050_70_stage2.md`](../working/task_m050_70_stage2.md) — CLI `init/update --locale` dry-run과 smoke test 추가, `npm test` 11개 pass.
- Stage 3: [`task_m050_70_stage3.md`](../working/task_m050_70_stage3.md) — agent entrypoint, update PR, distribution/plugin, manual, README 정합성 반영, stale 표현 검색과 `npm test` 통과.
- Stage 4: [`task_m050_70_stage4.md`](../working/task_m050_70_stage4.md) — `doctor`, `init --locale en/ko/zh-CN`, `update`, `update --locale zh-CN`, stale 표현 검색, `npm test`, `git diff --check` 통과.

## 잔여 위험과 후속 작업

### 잔여 위험

- `doctor`는 이 프레임워크 저장소를 적용 대상처럼 진단할 때 `.hyper-waterfall/version.json` missing과 target 10개 missing을 경고한다. 이는 승인 전 확인 항목이며, 자동 수정은 수행하지 않았다.
- CLI는 여전히 dry-run 판단 보고만 제공한다. 실제 파일 적용, version state 생성, symlink 재생성, PR 생성은 승인 후 일반 task workflow 또는 후속 구현 범위다.

### 후속 작업 후보

- #71에서 locale별 smoke matrix를 문서화하고 기존 한국어-only 적용 저장소 migration guide를 작성한다.
- #71에서 `locale`이 없는 기존 version state를 `unknown`으로 보고하는 migration 검증을 포함한다.

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 승인하면 PR 게시 절차로 진행한다.
