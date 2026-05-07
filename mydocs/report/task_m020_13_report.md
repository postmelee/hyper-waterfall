# 최종 보고서

GitHub Issue: [#13](https://github.com/postmelee/hyper-waterfall/issues/13)
마일스톤: M020

## 작업 요약

- 대상 이슈: #13
- 마일스톤: M020
- 단계 수: 3
- 작업 목적: PR 템플릿의 `검증` 섹션을 명령 나열에서 목적·방법·결과·근거·한계 중심 구조로 강화했다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `.github/pull_request_template.md` | `검증` 섹션을 자동 검증, 수동/시나리오 검증, CI/원격 검증, 검증 한계 구조로 개편 | 본 저장소 dogfooding PR 본문 |
| `templates/.github/pull_request_template.md` | 적용 저장소용 PR 템플릿에 동일 구조 반영, `{REPO_SLUG}` 보존 | Hyper-Waterfall 적용 저장소 PR 본문 |
| `templates/mydocs/manual/pr_process_guide.md` | 내부 task PR 작성 규칙과 예시를 새 검증 구조에 맞춰 보강 | PR 작성 매뉴얼 |
| `templates/mydocs/skills/task-final-report/SKILL.md` | Open PR 생성 절차와 검증 기준에 새 구조 반영 | 최종 보고와 PR 게시 SKILL |
| `README.md` | 도입 후 흐름, 핵심 SKILL 표, 예시 설명을 검증 결과·근거 중심 표현으로 보정 | 사용자-facing 안내 |
| `templates/mydocs/manual/task_workflow_guide.md` | PR 본문 검증 구조와 `task-final-report` 연결 원칙 추가 | 타스크 진행 절차 매뉴얼 |
| `mydocs/plans/task_m020_13.md` | 수행계획서 작성 | task 진행 기록 |
| `mydocs/plans/task_m020_13_impl.md` | 구현계획서 작성 및 placeholder 검증 명령 보정 | task 진행 기록 |
| `mydocs/working/task_m020_13_stage1.md` | Stage 1 완료 보고서 작성 | task 진행 기록 |
| `mydocs/working/task_m020_13_stage2.md` | Stage 2 완료 보고서 작성 | task 진행 기록 |
| `mydocs/working/task_m020_13_stage3.md` | Stage 3 완료 보고서 작성 | task 진행 기록 |
| `mydocs/orders/20260507.md` | #13 상태 완료 처리 | 오늘할일 기록 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| PR 템플릿 `검증` 하위 섹션 | 단일 bullet placeholder | 템플릿별 4개 하위 섹션 |
| 적용 저장소용 `{REPO_SLUG}` placeholder | 4곳 | 4곳 보존 |
| `pr_process_guide.md`의 새 검증 구조 언급 | 0 | 12 |
| `task-final-report/SKILL.md`의 새 검증 구조 언급 | 0 | 7 |
| `task_workflow_guide.md`의 새 검증 구조 언급 | 0 | 1 |
| Stage 보고서 | 0개 | 3개 |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| PR 템플릿의 `검증` 섹션이 자동 검증, 수동/시나리오 검증, CI/원격 검증, 검증 한계를 구분한다. | OK — 두 PR 템플릿에서 네 하위 섹션 grep 통과 |
| 각 검증 항목이 주제, 검증 방법, 결과, 근거를 남기도록 안내한다. | OK — PR 템플릿, `pr_process_guide.md`, `task-final-report/SKILL.md`에서 표 컬럼과 작성 기준 확인 |
| 실행하지 않은 체크리스트를 남기지 않고 미수행 항목은 검증 한계나 남은 리스크로 분리하도록 명시한다. | OK — PR 템플릿, 매뉴얼, SKILL 모두 해당 기준 포함 |
| `templates/`의 `{REPO_SLUG}` placeholder가 보존된다. | OK — `templates/.github/pull_request_template.md` 4곳 확인 |
| 관련 매뉴얼/SKILL/README 설명이 서로 어긋나지 않는다. | OK — `pr_process_guide.md`, `task-final-report/SKILL.md`, README, `task_workflow_guide.md` 통합 grep 통과 |

### 단계별 검증 결과

- Stage 1: [`task_m020_13_stage1.md`](../working/task_m020_13_stage1.md) — PR 템플릿 두 벌의 검증 하위 목차, 표 컬럼, `{REPO_SLUG}` 보존, 정규화 동일성, `git diff --check` 통과.
- Stage 2: [`task_m020_13_stage2.md`](../working/task_m020_13_stage2.md) — PR 작성 규칙과 `task-final-report` SKILL의 새 검증 구조, 실행하지 않은 검증 처리, 긴 로그 제외, run 링크/확인 시점 기준 grep 통과.
- Stage 3: [`task_m020_13_stage3.md`](../working/task_m020_13_stage3.md) — README와 `task_workflow_guide.md`의 상위 안내 동기화, 새 검증 하위 섹션명 통합 grep, `{REPO_SLUG}` 보존, `git diff --check` 통과.

## 잔여 위험과 후속 작업

### 잔여 위험

- 없음.

### 후속 작업 후보

- 없음.

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 승인하면 PR 게시 절차로 진행한다.
