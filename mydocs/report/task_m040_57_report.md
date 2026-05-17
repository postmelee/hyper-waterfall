# Task #57 최종 보고서 - 신규 적용 시 manifest strict 범위 제한 명시

GitHub Issue: [#57](https://github.com/postmelee/hyper-waterfall/issues/57)
마일스톤: M040

## 작업 요약

- 대상 이슈: #57
- 마일스톤: M040
- 단계 수: 3
- 작업 목적: Hyper-Waterfall 신규 적용이 manifest가 정의한 운영 파일과 작업 기억 구조만 설치하도록 strict 범위를 명확히 한다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `docs/agent-entrypoint.md` | adoption-only strict manifest 원칙, 신규 적용 범위 제한, manifest 외 보류 후보, 금지 규칙 추가 | 신규 적용 프롬프트와 에이전트 판단 기준 |
| `templates/manifest.json` | `applicationMode`, `strictManifest`, `forbiddenTargetsOnAdoption`, `outOfScopeArtifactPolicy` 추가 | 적용 manifest의 기계적 판단 기준 |
| `templates/mydocs/manual/document_structure_guide.md` | strict manifest 신규 적용 경계와 제품 고유 산출물 보류/별도 task 분리 원칙 추가 | 문서 구조와 lifecycle 매뉴얼 |
| `mydocs/plans/task_m040_57.md` | 수행계획서 작성 | 작업 추적 산출물 |
| `mydocs/plans/task_m040_57_impl.md` | 구현계획서 작성 | 작업 추적 산출물 |
| `mydocs/working/task_m040_57_stage1.md` | 현재 문서 경계 점검 결과 작성 | 단계 보고 |
| `mydocs/working/task_m040_57_stage2.md` | strict 범위 규칙 반영 결과 작성 | 단계 보고 |
| `mydocs/working/task_m040_57_stage3.md` | 최종 정합성 검증 결과 작성 | 단계 보고 |
| `mydocs/orders/20260517.md` | #57 진행 상태와 완료 시각 갱신 | 오늘할일 보드 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| manifest strict top-level 필드 | 없음 | 4개: `applicationMode`, `strictManifest`, `forbiddenTargetsOnAdoption`, `outOfScopeArtifactPolicy` |
| 신규 적용 범위 제한 섹션 | 없음 | `docs/agent-entrypoint.md`에 1개 추가 |
| manifest 외 보류 후보 항목 | 없음 | 신규 적용 판단 결과 형식에 1개 추가 |
| 단계 보고서 | 0개 | 3개 |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| 신규 적용 절차가 manifest 외 파일/디렉터리 생성 금지를 명확히 표현한다. | OK — `docs/agent-entrypoint.md`에 adoption-only strict manifest 원칙과 신규 적용 범위 제한 섹션을 추가했다. |
| `/docs`는 의미가 정의되지 않고, 적용 중 생성/수정 금지 예시로만 등장한다. | OK — `docs/**`는 금지 예시로만 기록했고 금지 후보 검색에서 대상 저장소 제품 문서 위치 정의는 발견되지 않았다. |
| 제품 고유 산출물은 Hyper-Waterfall 적용 이후 별도 task로 다뤄야 한다는 원칙이 경로 특정 없이 표현된다. | OK — entrypoint와 document structure guide에 제품 고유 산출물을 보류 또는 별도 task 후보로 기록하도록 명시했다. |
| manifest가 strict 적용 범위를 판단할 수 있는 구조를 갖는다. | OK — `templates/manifest.json`에 strict 관련 top-level 필드 4개를 추가했고 JSON 파싱이 통과했다. |
| README, 매뉴얼, entrypoint, manifest 간 설명이 충돌하지 않는다. | OK — README는 이미 entrypoint와 manifest 기준 적용을 안내하고 있어 수정하지 않았고, Stage 3 정합성 검색을 통과했다. |

### 단계별 검증 결과

- Stage 1: [`task_m040_57_stage1.md`](../working/task_m040_57_stage1.md) — 현재 문서들에 `/docs` 역할 규정이나 `mydocs/manual` 오염 문구가 없는 것을 확인하고 Stage 2 수정 후보를 정리했다.
- Stage 2: [`task_m040_57_stage2.md`](../working/task_m040_57_stage2.md) — entrypoint, manifest, 문서 구조 매뉴얼에 strict 범위 규칙을 반영하고 JSON 파싱과 금지 문구 검색을 통과했다.
- Stage 3: [`task_m040_57_stage3.md`](../working/task_m040_57_stage3.md) — README 수정 불필요 판단, 최종 정합성 검색, manifest JSON 파싱, diff 검증을 수행했다.

## 잔여 위험과 후속 작업

### 잔여 위험

- manifest strict 필드는 이번 task에서 문서와 manifest 기준으로만 추가했다. CLI/doctor가 이 필드를 실제로 강제하지는 않는다.
- `docs/**` 금지 예시가 대상 저장소의 일반 문서 구조 금지로 오해되지 않도록 PR 리뷰에서 문구를 확인해야 한다.

### 후속 작업 후보

- CLI/doctor가 `strictManifest`와 `forbiddenTargetsOnAdoption`을 읽어 신규 적용 dry-run에서 manifest 외 생성 후보를 차단하거나 경고하도록 별도 이슈로 분리할 수 있다.

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 승인하면 PR 게시 절차로 진행한다.
