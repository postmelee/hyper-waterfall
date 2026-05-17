# Task M040 #60 최종 보고서

GitHub Issue: [#60](https://github.com/postmelee/hyper-waterfall/issues/60)
마일스톤: M040

## 작업 요약

- 대상 이슈: #60
- 마일스톤: M040
- 단계 수: 3
- 작업 목적: 공식 문서 루트 이름을 Hyper-Waterfall이 고정하지 않고, 대상 프로젝트가 문서 위치 판단을 통해 선택하도록 매뉴얼, 템플릿, 진입 규칙을 강화한다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `templates/mydocs/manual/document_structure_guide.md` | 공식 문서 루트 용어와 `mydocs/` 경계 정책 추가, `manual/`/`tech/` 역할 정리 | 적용 저장소 문서 구조 판단 기준 |
| `templates/mydocs/_templates/task_plan.md` | `문서 위치 판단` 섹션 추가 | 신규 task 수행계획서 출력 형식 |
| `templates/mydocs/_templates/task_impl_plan.md` | `문서 위치 확인` 섹션과 위치 불일치 시 승인 규칙 추가 | 구현계획서 출력 형식 |
| `templates/mydocs/_templates/final_report.md` | `문서 위치 검증` 섹션 추가 | 최종 보고서 출력 형식 |
| `docs/agent-entrypoint.md` | 신규 적용 중 공식 문서 루트 선택/생성 금지와 보류 항목 추가 | Hyper-Waterfall 신규 적용 진입 절차 |
| `templates/AGENTS.md` | 제품/사용자/API/아키텍처/로드맵 문서 생성·이동·수정 시 위치 판단 승인 규칙 추가 | 적용 저장소 에이전트 런타임 규칙 |
| `templates/CLAUDE.md` | Claude Code도 문서 위치 판단과 공식 문서 루트 경계를 따른다는 설명 추가 | Claude Code 진입 문서 |
| `README.md` | 신규 적용 중 공식 문서 루트 자동 생성 금지와 `mydocs/` 경계 요약 추가 | 사용자 안내 |
| `mydocs/orders/20260517.md`, `mydocs/orders/20260518.md` | #60 진행/완료 상태 기록 | 작업 추적 |
| `mydocs/plans/task_m040_60.md`, `mydocs/plans/task_m040_60_impl.md` | 수행계획서와 구현계획서 작성 | 작업 계획 |
| `mydocs/working/task_m040_60_stage1.md`, `mydocs/working/task_m040_60_stage2.md`, `mydocs/working/task_m040_60_stage3.md` | Stage별 검증과 승인 요청 기록 | 단계 보고 |

## 문서 위치 검증

| 파일 | 계획된 위치 | 실제 위치 | 결과 | 근거 |
|---|---|---|---|---|
| `templates/mydocs/manual/document_structure_guide.md` | Hyper-Waterfall 운영 매뉴얼 | `templates/mydocs/manual/document_structure_guide.md` | OK | 공식 문서 루트와 `mydocs/` 경계는 반복 적용되는 운영 기준이므로 manual 진실 원천에 반영 |
| `templates/mydocs/_templates/task_plan.md` | 산출물 출력 형식 템플릿 | `templates/mydocs/_templates/task_plan.md` | OK | 계획서의 문서 위치 판단 출력 형식이므로 중앙 템플릿에 반영 |
| `templates/mydocs/_templates/task_impl_plan.md` | 산출물 출력 형식 템플릿 | `templates/mydocs/_templates/task_impl_plan.md` | OK | 구현계획서의 위치 확인 출력 형식이므로 중앙 템플릿에 반영 |
| `templates/mydocs/_templates/final_report.md` | 산출물 출력 형식 템플릿 | `templates/mydocs/_templates/final_report.md` | OK | 최종 보고서의 위치 검증 출력 형식이므로 중앙 템플릿에 반영 |
| `docs/agent-entrypoint.md` | 프레임워크 적용 진입 문서 | `docs/agent-entrypoint.md` | OK | 신규 적용 판단 결과와 금지 사항은 프레임워크 자체의 진입 문서에 해당 |
| `templates/AGENTS.md`, `templates/CLAUDE.md` | 적용 저장소 에이전트 규칙 템플릿 | `templates/AGENTS.md`, `templates/CLAUDE.md` | OK | 런타임 에이전트 규칙과 Claude 진입 설명에 해당 |
| `README.md` | 프레임워크 사용자 안내 | `README.md` | OK | 상세 정책은 매뉴얼에 두고 README에는 사용자 요약만 반영 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| 공식 문서 루트 정책 | 매뉴얼에 명시 정책 없음 | `document_structure_guide.md`에 공식 문서 루트와 `mydocs/` 경계 정책 추가 |
| 계획서 문서 위치 판단 | 없음 | `task_plan.md`에 `문서 위치 판단` 섹션 추가 |
| 구현계획서 문서 위치 확인 | 없음 | `task_impl_plan.md`에 `문서 위치 확인` 섹션 추가 |
| 최종 보고서 문서 위치 검증 | 없음 | `final_report.md`에 `문서 위치 검증` 섹션 추가 |
| 신규 적용 중 공식 문서 루트 보류 | manifest 외 제품 문서 보류만 명시 | `agent-entrypoint`에 공식 문서 루트 선택/생성 금지와 보류 항목 추가 |
| 변경 규모 | 기준 `origin/main` | 15 files changed, 557 insertions, 14 deletions |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| 문서 위치 판단 기준이 `docs/` 고정이 아니라 대상 프로젝트의 명시적 선택으로 설명된다 | OK — 매뉴얼, README, `agent-entrypoint`, 템플릿에서 공식 문서 루트 이름을 고정하지 않는다고 명시 |
| `mydocs/manual`, `mydocs/tech`, 공식 문서 루트의 경계가 문서 구조 매뉴얼에 기록된다 | OK — `공식 문서 루트와 mydocs 경계 정책`, `tech/`, `manual/` 상세 규칙 반영 |
| 계획서/구현계획서/최종보고서 템플릿에 문서 위치 판단 또는 검증 항목이 추가된다 | OK — `task_plan.md`, `task_impl_plan.md`, `final_report.md`에 각각 추가 |
| 신규 적용 중 manifest 외 제품 문서를 만들지 않는 guardrail이 유지된다 | OK — `agent-entrypoint`와 매뉴얼에서 신규 적용 중 공식 문서 루트 선택/생성 금지까지 보강 |
| README와 AGENTS/CLAUDE 규칙이 새 정책과 모순되지 않는다 | OK — README 요약, AGENTS 핵심 규칙, CLAUDE 단일 진실 원천 설명 확인 |

### 단계별 검증 결과

- Stage 1: [task_m040_60_stage1.md](../working/task_m040_60_stage1.md) — 공식 문서 루트 용어, `mydocs/manual`/`mydocs/tech` 경계, 신규 적용 guardrail 확인.
- Stage 2: [task_m040_60_stage2.md](../working/task_m040_60_stage2.md) — 템플릿/entrypoint/AGENTS/CLAUDE의 문서 위치 판단 규칙과 manifest 비자동 생성 확인.
- Stage 3: [task_m040_60_stage3.md](../working/task_m040_60_stage3.md) — README 정합성, manifest target 비추가, 통합 `rg`, `git diff --check`, `git status --short` 확인.

### 최종 통합 검증

- OK: `rg -n "문서 위치|공식 문서|mydocs/|docs/" README.md templates/mydocs/manual/document_structure_guide.md templates/mydocs/_templates docs/agent-entrypoint.md templates/AGENTS.md templates/CLAUDE.md`
  - README, 매뉴얼, 템플릿, entrypoint, AGENTS/CLAUDE에서 공식 문서 루트와 문서 위치 판단 문구 확인.
- OK: `rg -n '"target": "(docs|specs|site|website|adr)' templates/manifest.json || true`
  - 공식 문서 루트 자동 생성 target 없음.
- OK: `git diff --check`
  - whitespace 경고 없음.
- OK: `git status --short`
  - 최종 보고서 작성 전 기준 빈 출력 확인.
- OK: `git log --oneline origin/main..HEAD`
  - #60 준비 커밋과 Stage 1~3 커밋 확인.

## 잔여 위험과 후속 작업

### 잔여 위험

- 기존 적용 저장소가 이 정책으로 자동 변경되지는 않는다. 기존 저장소의 문서 배치 변경은 별도 update/migration task에서 판단해야 한다.
- README와 매뉴얼에 공식 문서 루트 예시가 들어가므로, 이후 변경에서 `docs/`가 기본값처럼 다시 쓰이지 않는지 리뷰가 필요하다.

### 후속 작업 후보

- 없음. 향후 실제 적용 저장소에서 문서 위치 충돌 사례가 나오면 별도 이슈로 다룬다.

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 승인하면 PR 게시 절차로 진행한다.
