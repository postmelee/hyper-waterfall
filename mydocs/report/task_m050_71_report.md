# 다국어 적용 smoke 검증과 migration guide 작성 최종 보고서

GitHub Issue: [#71](https://github.com/postmelee/hyper-waterfall/issues/71)
마일스톤: M050

## 작업 요약

- 대상 이슈: #71
- 마일스톤: M050
- 단계 수: 4
- 작업 목적: `en`, `ko`, `zh-CN` locale pack과 기존 한국어-only 적용 저장소 update 흐름을 smoke 검증하고, `v0.2.0 -> v0.3.0` migration guide를 작성한다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `docs/localization-smoke.md` | locale별 init/update dry-run, unsupported locale, 구조적 계약, migration guide 연결 결과를 장기 smoke 문서로 작성 | M050 다국어 검증 기준 |
| `docs/migrations/v0.2.0-to-v0.3.0.md` | 기존 한국어-only 적용 저장소가 다국어 구조로 이동할 때 확인할 수동 확인, 충돌, CLI 출력 기준 작성 | 기존 적용 저장소 update 기준 |
| `docs/migrations/README.md` | locale migration guide 작성 시 current locale, fallback, semantic review 기준 추가 | migration guide 작성 규칙 |
| `docs/localization.md` | #71 smoke/migration 완료 상태와 최종 정합성 문구 반영 | 다국어 정책 문서 |
| `templates/manifest.json` | locale availability note를 #70/#71 완료 상태로 보정 | CLI smoke와 manifest 상태 설명 |
| `test/cli-smoke.test.js` | manifest availability note 기대값을 완료 문구에 맞춰 갱신 | 자동 테스트 |
| `mydocs/plans/task_m050_71.md` | 수행계획서 작성 | 작업 관리 문서 |
| `mydocs/plans/task_m050_71_impl.md` | 4단계 구현계획서 작성 | 작업 관리 문서 |
| `mydocs/working/task_m050_71_stage1.md` - `task_m050_71_stage4.md` | 단계별 완료 보고서 작성 | 작업 진행 기록 |
| `mydocs/orders/20260527.md` | #71 진행 상태와 완료 기록 갱신 | 오늘할일 |

## 문서 위치 검증

| 파일 | 계획된 위치 | 실제 위치 | 결과 | 근거 |
|---|---|---|---|---|
| `docs/localization-smoke.md` | `docs/` | `docs/localization-smoke.md` | OK | 수행계획서와 구현계획서에서 M050 이후 반복 재검증할 공식 smoke matrix로 지정 |
| `docs/migrations/v0.2.0-to-v0.3.0.md` | `docs/migrations/` | `docs/migrations/v0.2.0-to-v0.3.0.md` | OK | 수행계획서와 구현계획서에서 기존 한국어-only 적용 저장소 migration guide로 지정 |
| `docs/migrations/README.md` | `docs/migrations/` 수정 후보 | `docs/migrations/README.md` | OK | locale migration guide 작성 규칙 보강 범위 |
| `mydocs/working/task_m050_71_stage{N}.md` | `mydocs/working/` | `mydocs/working/` | OK | 단계별 완료 보고서 위치 |
| `mydocs/report/task_m050_71_report.md` | `mydocs/report/` | `mydocs/report/task_m050_71_report.md` | OK | 최종 보고서 위치 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| 공식 smoke 문서 | 없음 | `docs/localization-smoke.md` 118 lines |
| `v0.2.0 -> v0.3.0` migration guide | 없음 | `docs/migrations/v0.2.0-to-v0.3.0.md` 165 lines |
| migration guide 작성 규칙 | locale migration 기준 없음 | current locale, fallback, semantic review 기준 3줄 보강 |
| 단계 보고서 | 없음 | Stage 1-4 보고서 229 lines |
| 전체 task diff | 없음 | 최종 보고 전 기준 13 files, 925 insertions, 6 deletions |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| `en`, `ko`, `zh-CN` locale pack 신규 적용 dry-run 결과가 기록된다. | OK — Stage 1에서 세 locale 모두 `exists=15`, `fallbackSourceStatus: exists=15`, `targetStatus: missing=25`를 확인하고 `docs/localization-smoke.md`에 기록 |
| unsupported locale이 fallback 후보를 보고한다. | OK — Stage 2에서 `fr` 요청이 `supported: no`, `selectedSourceStatus: missing=15`, `fallbackSourceStatus: exists=15`로 보고됨 |
| 기존 적용 저장소 update에서 `locale` 미기록, `ko` 보존, `zh-CN` 전환 요청을 구분한다. | OK — Stage 2에서 `unknown`, `selectedForDiff: ko`, `ko -> zh-CN; 별도 승인 필요`를 각각 확인 |
| placeholder, branch/file pattern, 승인 게이트, 생성 문서 언어가 locale과 무관하게 보존된다. | OK — Stage 2 구조적 계약 검색과 `docs/localization-smoke.md` 결과 표로 확인 |
| 기존 한국어-only 적용 저장소 migration guide가 작성된다. | OK — `docs/migrations/v0.2.0-to-v0.3.0.md` 작성, 필수 섹션과 locale/fallback/semantic review 기준 검증 |
| M050 종료 전에 stale #71 handoff 표현을 제거한다. | OK — Stage 4에서 완료 전 표현 검색 0건 확인 |
| 자동 테스트와 diff whitespace 검증이 통과한다. | OK — `npm test` 11 pass, `git diff --check` 통과 |

### 단계별 검증 결과

- Stage 1: [`task_m050_71_stage1.md`](../working/task_m050_71_stage1.md) — `en`, `ko`, `zh-CN` 신규 적용 dry-run baseline과 manifest localization 계약 확인.
- Stage 2: [`task_m050_71_stage2.md`](../working/task_m050_71_stage2.md) — unsupported locale, 기존 update locale 보존/전환, placeholder와 승인 게이트 검색 확인.
- Stage 3: [`task_m050_71_stage3.md`](../working/task_m050_71_stage3.md) — `v0.2.0 -> v0.3.0` migration guide 필수 섹션과 locale/fallback/semantic review 기준 확인.
- Stage 4: [`task_m050_71_stage4.md`](../working/task_m050_71_stage4.md) — `npm test`, M050/locale/migration 링크 검색, stale #71 표현 검색, `git diff --check` 확인.

통합 검증:

```bash
npm test
rg -n "M050|locale|migration|zh-CN|README\\.ko|README\\.zh-CN" docs README* templates mydocs
rg -n "후속 #71|#71에서 이어진다|smoke 검증과 migration guide는 #71|#71에서 처리한다|#71 cover" docs README.md README.ko.md README.zh-CN.md templates test
git diff --check
```

결과:

- `npm test`: 11개 테스트 모두 pass.
- 관련 문맥 검색: README 3종, lifecycle, distribution/plugin 문서, smoke/migration 문서, locale pack, 작업 기록의 관련 문맥 확인.
- stale #71 표현 검색: 출력 없음.
- `git diff --check`: 통과.

## 잔여 위험과 후속 작업

### 잔여 위험

- 이번 smoke는 dry-run과 문서/검색 기반이다. 실제 적용 저장소 write mode, symlink 생성, `.hyper-waterfall/version.json` 쓰기는 검증하지 않았다.
- `v0.3.0` GitHub Release/tag, npm publish, Homebrew/Docker/plugin 배포는 별도 release task와 승인 절차가 필요하다.
- `templates/manifest.json`의 version metadata와 checksum 상태는 실제 `v0.3.0` release task에서 다시 확정해야 한다.
- `mydocs/working/`과 `mydocs/report/`의 과거 작업 기록에는 작성 당시 handoff 표현이 남아 있을 수 있다. 현재 기준 문서와 사용자-facing 문서의 stale 표현 제거에 한정했다.

### 후속 작업 후보

- `v0.3.0` release task에서 GitHub Release/tag, manifest version metadata, checksum, release notes를 확정한다.
- 실제 적용 저장소 write mode smoke는 별도 이슈로 분리한다.
- manual/Skill locale mirror의 semantic review 자동화 또는 보조 스크립트는 별도 이슈로 분리한다.
- 새 locale 추가와 번역 품질 개선은 별도 이슈로 분리한다.

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 승인하면 PR 게시 절차로 진행한다.
