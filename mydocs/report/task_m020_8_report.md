# task_m020_8_report.md - 프레임워크 설치·업데이트 lifecycle 프로토콜 정리 최종 보고서

GitHub Issue: [#8](https://github.com/postmelee/hyper-waterfall/issues/8)
마일스톤: M020

## 작업 요약

- 대상 이슈: #8
- 마일스톤: M020
- 단계 수: 3
- 작업 목적: 설치·업데이트를 core Skill이 아니라 GitHub Release/tag, manifest, version 기록, migration guide 기반 framework lifecycle 프로토콜로 정리한다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `README.md` | 기존 적용 저장소 업데이트가 현재 version, 목표 release/tag, migration guide, manifest diff, update PR 후보를 먼저 보고하는 흐름임을 짧게 안내 | 사용자 진입 문서 |
| `docs/agent-entrypoint.md` | 신규 적용 판단 결과 형식과 기존 업데이트 판단 결과 형식을 추가 | 에이전트 lifecycle 진입점 |
| `docs/migrations/README.md` | migration guide를 lifecycle 판단, update PR 리뷰, 향후 CLI 출력의 근거 문서로 정리 | release 간 migration guide 작성 규칙 |
| `docs/migrations/v0.1.0-to-v0.2.0.md` | 오래된 후속 Skill 표현을 lifecycle, update PR workflow, npm CLI 참조 기준으로 보정 | M020 migration 기준 문서 |
| `templates/mydocs/manual/task_workflow_guide.md` | core Skill 경계, lifecycle 판단 결과, 일반 타스크 전환 기준을 명시 | 타스크 진행 매뉴얼 |
| `templates/mydocs/manual/document_structure_guide.md` | manifest, `.hyper-waterfall/version.json`, migration guide, 판단 결과 형식의 역할을 연결 | 문서 구조 매뉴얼 |
| `mydocs/plans/task_m020_8.md` | 수행계획서 작성 | 작업 계획 기록 |
| `mydocs/plans/task_m020_8_impl.md` | 3단계 구현계획서 작성 | 단계별 산출/검증 기준 |
| `mydocs/working/task_m020_8_stage1.md` | Stage 1 완료 보고 | 단계 기록 |
| `mydocs/working/task_m020_8_stage2.md` | Stage 2 완료 보고 | 단계 기록 |
| `mydocs/working/task_m020_8_stage3.md` | Stage 3 완료 보고 | 단계 기록 |
| `mydocs/orders/20260507.md` | #8 오늘할일 상태 갱신 | 작업 상태 보드 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| 구현 Stage | 0 | 3 |
| 단계 보고서 | 0 | 3 |
| lifecycle 전용 신규 Skill 폴더 | 0 | 0 |
| `framework-install`/`framework-update` 등 오래된 예정 Skill 표현 | 9개 검색 결과 | 0개 검색 결과 |
| 신규/업데이트 판단 결과 형식 | 없음 | `docs/agent-entrypoint.md`에 2개 형식 추가 |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| 신규 적용과 기존 업데이트의 기준 문서와 판단 순서가 명확하다 | OK — `docs/agent-entrypoint.md`에 신규 적용 절차, 기존 업데이트 진입, 각 판단 결과 형식을 분리 |
| README 핵심 Skill 표는 하이퍼-워터폴 타스크 진행 Skill만 포함한다 | OK — README 핵심 Skill 표는 `task-register`, `task-start`, `task-stage-report`, `task-final-report`, `pr-merge-cleanup`, `external-pr-review`, `todo`만 포함 |
| 설치·업데이트는 core Skill이 아니라 lifecycle 프로토콜로 설명된다 | OK — `task_workflow_guide.md`와 `agent-entrypoint.md`에서 core Skill과 framework lifecycle 경계를 명시 |
| 사용자가 별도 유지보수용 Skill 이름을 몰라도 적용과 업데이트를 요청할 수 있는 흐름이 문서화된다 | OK — README는 짧은 진입 안내, 상세 판단은 `docs/agent-entrypoint.md`와 `docs/migrations/`로 연결 |
| #9 update PR 워크플로우가 참조할 lifecycle 판단 결과 형식 또는 체크리스트가 최소한으로 정의된다 | OK — 기존 업데이트 판단 결과 형식에 `manifest diff`, `자동 적용 가능`, `수동 확인 필요`, `conflict`, `update PR 후보` 포함 |
| 설치·업데이트 전용 Skill 폴더가 추가되지 않았다 | OK — `templates/mydocs/skills/framework-install`, `templates/mydocs/skills/framework-update` 부재 확인 |
| `git diff --check` | OK — 공백 오류 없음 |

### 단계별 검증 결과

- Stage 1: [`task_m020_8_stage1.md`](../working/task_m020_8_stage1.md) — 대상 파일에서 오래된 예정 Skill 표현 제거, lifecycle/core Skill 경계 확인, `git diff --check` 통과.
- Stage 2: [`task_m020_8_stage2.md`](../working/task_m020_8_stage2.md) — 신규 적용/기존 업데이트 판단 결과 필드 확인, 신규 Skill 폴더 부재 확인, `git diff --check` 통과.
- Stage 3: [`task_m020_8_stage3.md`](../working/task_m020_8_stage3.md) — README/migration guide/Manual 연결 확인, 오래된 예정 Skill 표현 전체 제거, 신규 Skill 폴더 부재 확인, `git diff --check` 통과.

## 잔여 위험과 후속 작업

### 잔여 위험

- 실제 update PR 생성 절차와 PR 본문 구성은 아직 정의하지 않았다. #9 범위로 남겼다.
- npm CLI `init/update/doctor`의 실제 명령 인터페이스와 검증은 아직 구현하지 않았다. #10 범위로 남겼다.
- 실제 `v0.2.0` GitHub Release/tag 생성은 M020 산출물이 안정화된 뒤 별도 승인으로 수행해야 한다.

### 후속 작업 후보

- #9 프로토콜 기반 update PR 워크플로우 정착
- #10 npm CLI MVP로 `init`, `update`, `doctor` 제공

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 기준으로 PR 게시를 진행한다.
