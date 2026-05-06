# task_m010_3_report.md - 중앙 문서 템플릿과 폴더별 문서 구조 가이드 보강 최종 보고서

GitHub Issue: [#3](https://github.com/postmelee/hyper-waterfall/issues/3)
마일스톤: M010

## 작업 요약

- 대상 이슈: #3
- 마일스톤: M010
- 단계 수: 5
- 작업 목적: 하이퍼-워터폴 산출물의 출력 형식을 중앙 템플릿으로 고정하고, 문서 구조 가이드와 Skill, README가 그 템플릿을 일관되게 참조하도록 보강했다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `templates/mydocs/_templates/*.md` | 오늘할일, 수행계획서, 구현계획서, 단계 보고서, 최종 보고서, 피드백, 기술 조사, 트러블슈팅, 외부 PR 검토 문서용 중앙 템플릿 11종 추가 | 모든 적용 저장소의 문서 출력 형식 |
| `mydocs/_templates` | dogfooding용 중앙 템플릿 심볼릭 링크 추가 | 본 저장소에서 Skill이 같은 템플릿을 참조 |
| `templates/mydocs/manual/document_structure_guide.md` | 중앙 템플릿 정책, 폴더별 목적과 규칙, 산출물 폴더 내부 템플릿 금지 원칙 보강 | 문서 구조 매뉴얼 |
| `templates/mydocs/manual/task_workflow_guide.md` | Skill은 절차와 검증, 중앙 템플릿은 출력 형식을 정의한다는 관계 추가 | 타스크 진행 매뉴얼 |
| `templates/mydocs/skills/task-start/SKILL.md` | 오늘할일과 수행계획서 작성 시 중앙 템플릿 참조 | task 시작 절차 |
| `templates/mydocs/skills/task-stage-report/SKILL.md` | 단계 보고서 작성 시 중앙 템플릿 참조 | stage 종료 절차 |
| `templates/mydocs/skills/task-final-report/SKILL.md` | 최종 보고서, 오늘할일, PR 본문 기준 분리 | 최종 보고와 PR 게시 절차 |
| `templates/mydocs/skills/todo/SKILL.md` | 오늘할일 출력 형식 기준을 중앙 템플릿으로 명시 | 오늘할일 문서 작성 절차 |
| `templates/mydocs/skills/external-pr-review/SKILL.md` | 외부 PR 검토 3종 문서의 중앙 템플릿 참조 추가 | 외부 기여 PR 검토 절차 |
| `README.md` | 중앙 템플릿 기반 출력 형식 근거와 GPT-5.5/Opus 4.7 프롬프팅 가이드 정합성 설명 보강 | 사용자 도입 문서 |
| `mydocs/plans/task_m010_3.md`, `mydocs/plans/task_m010_3_impl.md` | 수행계획서와 구현계획서 작성 | task 추적 문서 |
| `mydocs/working/task_m010_3_stage{1..5}.md` | Stage별 완료 보고서 작성 | 단계별 검증 기록 |
| `mydocs/orders/20260506.md` | #3 오늘할일 상태 완료 처리 | 작업 현황 보드 |
| `mydocs/report/task_m010_3_report.md` | 최종 보고서 작성 | PR 전 최종 검토 기록 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| 중앙 문서 템플릿 | 없음 | 11개 파일, 657라인 |
| dogfooding 템플릿 접근 경로 | 없음 | `mydocs/_templates -> ../templates/mydocs/_templates` |
| `document_structure_guide.md` 규모 | 82라인 | 250라인 |
| 중앙 템플릿을 직접 참조하는 Skill | 없음 | `task-start`, `task-stage-report`, `task-final-report`, `todo`, `external-pr-review` |
| Stage 완료 보고서 | 없음 | 5개 |
| 전체 변경 규모 | 없음 | 28개 파일, 1685 insertions, 42 deletions |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| 중앙 템플릿 폴더에 계획된 11종 템플릿이 존재한다 | OK - `find templates/mydocs/_templates -maxdepth 1 -type f -print`로 11개 파일 확인 |
| 본 저장소 dogfooding 경로 `mydocs/_templates`가 중앙 템플릿을 가리킨다 | OK - `test -L mydocs/_templates` 통과 |
| 문서 구조 가이드가 `_templates/`, 중앙 템플릿, 출력 형식 정책을 설명한다 | OK - `rg -n "_templates|중앙 템플릿|출력 형식|출력 계약" README.md templates/mydocs/manual/document_structure_guide.md` 통과 |
| 문서 산출물 Skill이 중앙 템플릿을 참조한다 | OK - `rg -n "mydocs/_templates/" templates/mydocs/skills templates/mydocs/manual/task_workflow_guide.md README.md` 통과 |
| README가 GPT-5.5와 Opus 4.7 프롬프팅 가이드의 출력 형식 항목을 구현 근거와 연결한다 | OK - Stage 5 검증에서 관련 문구 grep 통과 |
| placeholder 보존 규칙을 위반하지 않는다 | OK - Stage 5 검증에서 README/루트 운영 파일에 치환 누락 placeholder 없음 확인 |
| 작업 트리에 커밋 전 미정리 변경이 없다 | OK - 최종 보고서 작성 전 `git status --short` 빈 출력 확인 |
| whitespace 오류가 없다 | OK - `git diff --check` 통과 |
| 단계 커밋이 보존되어 있다 | OK - `git log --oneline origin/main..local/task3`에서 계획서 2개 커밋과 Stage 1~5 커밋 확인 |

### 단계별 검증 결과

- Stage 1: [`task_m010_3_stage1.md`](../working/task_m010_3_stage1.md) - 내부 task 템플릿 5종, 심볼릭 링크, 필수 heading, `git diff --check` 통과
- Stage 2: [`task_m010_3_stage2.md`](../working/task_m010_3_stage2.md) - 지원 문서와 외부 PR 템플릿 6종, 파일명 정책, 트러블슈팅 heading, `git diff --check` 통과
- Stage 3: [`task_m010_3_stage3.md`](../working/task_m010_3_stage3.md) - 폴더별 상세 규칙, 중앙 템플릿 정책, 산출물 폴더 내부 템플릿 금지 규칙, `git diff --check` 통과
- Stage 4: [`task_m010_3_stage4.md`](../working/task_m010_3_stage4.md) - Skill 5종과 `task_workflow_guide.md`의 중앙 템플릿 참조, `git diff --check` 통과
- Stage 5: [`task_m010_3_stage5.md`](../working/task_m010_3_stage5.md) - README 문서 구조와 프롬프트 가이드 정합 설명, placeholder 보존, `git diff --check` 통과

## 잔여 위험과 후속 작업

### 잔여 위험

- GPT-5.5와 Opus 4.7 공식 가이드는 외부 문서이므로 향후 내용이 바뀌면 README의 매핑 표현을 재검토해야 한다.
- `task-register`는 GitHub Issue 초안 작성 절차라 이번 중앙 `mydocs/_templates/` 산출물 범위에서 제외했다. GitHub Issue 템플릿까지 중앙 관리하려면 별도 작업이 필요하다.

### 후속 작업 후보

- GitHub Issue 본문 템플릿과 PR 본문 템플릿의 중앙 관리 여부를 별도 이슈로 검토한다.
- 실제 적용 저장소에 `_templates/`가 복사되는 설치/초기화 절차를 별도 검증한다.

## 작업지시자 승인 요청

- 최종 보고서와 PR의 변경 범위를 검토한 뒤 리뷰 및 merge 승인 여부를 결정한다.
