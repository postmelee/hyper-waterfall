# task_m010_3_stage4.md — Stage 4 완료 보고서

GitHub Issue: [#3](https://github.com/postmelee/hyper-waterfall/issues/3)
구현계획서: [`task_m010_3_impl.md`](../plans/task_m010_3_impl.md)
Stage: 4

## 단계 목적

Stage 1~3에서 추가한 중앙 템플릿 정책을 실제 Skill 절차에 연결했다. 문서 산출물을 만드는 Skill이 `mydocs/_templates/`를 먼저 참조하도록 바꾸고, 템플릿을 읽을 수 없는 상황에 대비해 기존 표준 섹션 목록은 최소 fallback 요약으로 남겼다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/mydocs/skills/task-start/SKILL.md` | 오늘할일은 `orders.md`, 수행계획서는 `task_plan.md` 기준으로 작성하도록 보강 |
| `templates/mydocs/skills/task-stage-report/SKILL.md` | 단계 보고서를 `stage_report.md` 기준으로 작성하도록 보강 |
| `templates/mydocs/skills/task-final-report/SKILL.md` | 최종 보고서는 `final_report.md`, 오늘할일은 `orders.md`, PR 본문은 `{PR_TEMPLATE_PATH}` 기준으로 분리 |
| `templates/mydocs/skills/todo/SKILL.md` | 오늘할일 출력 형식 기준을 `orders.md`로 명시하고 기존 예시는 fallback으로 정리 |
| `templates/mydocs/skills/external-pr-review/SKILL.md` | 외부 PR 검토 3종 문서를 `external_pr_*` 템플릿 기준으로 작성하도록 보강 |
| `templates/mydocs/manual/task_workflow_guide.md` | 중앙 템플릿이 출력 형식을 정의하고 Skill은 절차와 검증을 정의한다는 관계 추가 |

변경 규모:

```text
templates/mydocs/manual/task_workflow_guide.md      |  6 +++++-
templates/mydocs/skills/external-pr-review/SKILL.md | 11 ++++++++---
templates/mydocs/skills/task-final-report/SKILL.md  |  8 ++++++--
templates/mydocs/skills/task-stage-report/SKILL.md  |  4 +++-
templates/mydocs/skills/task-start/SKILL.md         |  8 +++++---
templates/mydocs/skills/todo/SKILL.md               |  5 +++++
6 files changed, 32 insertions(+), 10 deletions(-)
```

## 본문 변경 정도 / 본문 무손실 여부

기존 절차와 승인 게이트는 유지했다. 변경은 산출물 작성 단계의 출력 형식 기준을 중앙 템플릿으로 연결하는 데 한정했다.

- 유지: 이슈 조회, 브랜치 생성, 검증 명령, 커밋 메시지, 승인 요청, 절대 하지 말 것
- 보강: `mydocs/_templates/...` 참조, fallback 섹션 요약, 검증 항목의 템플릿 필수 섹션 확인
- 조정: 외부 PR 검토 검증에서 선택 문서인 `pr_{N}_review_impl.md`를 조건부 검증으로 명확화

## 검증 결과

실행 명령:

```bash
grep -nE 'mydocs/_templates/(task_plan|stage_report|final_report|orders|external_pr_review|external_pr_review_impl|external_pr_report)\.md' templates/mydocs/skills/task-start/SKILL.md templates/mydocs/skills/task-stage-report/SKILL.md templates/mydocs/skills/task-final-report/SKILL.md templates/mydocs/skills/todo/SKILL.md templates/mydocs/skills/external-pr-review/SKILL.md
grep -nE 'task_plan\.md' templates/mydocs/skills/task-start/SKILL.md
grep -nE 'stage_report\.md' templates/mydocs/skills/task-stage-report/SKILL.md
grep -nE 'final_report\.md|\{PR_TEMPLATE_PATH\}' templates/mydocs/skills/task-final-report/SKILL.md
grep -nE 'external_pr_review\.md|external_pr_review_impl\.md|external_pr_report\.md' templates/mydocs/skills/external-pr-review/SKILL.md
grep -nE 'mydocs/_templates/' templates/mydocs/manual/task_workflow_guide.md
git diff --check
```

결과:

- `task-start`, `task-stage-report`, `task-final-report`, `todo`, `external-pr-review`에서 중앙 템플릿 경로 참조 확인.
- `task-start`의 `task_plan.md`, `task-stage-report`의 `stage_report.md`, `task-final-report`의 `final_report.md`와 `{PR_TEMPLATE_PATH}` 참조 확인.
- `external-pr-review`의 외부 PR 템플릿 3종 참조 확인.
- `task_workflow_guide.md`의 중앙 템플릿 정책 안내 확인.
- `git diff --check` 경고 없이 통과.

## 잔여 위험

- Stage 5 전까지 README는 아직 중앙 템플릿 구조와 Skill 참조 흐름을 설명하지 않는다.
- `task-register`는 GitHub Issue 초안 작성용 Skill이라 중앙 `mydocs/_templates/` 문서 산출물 참조 대상에서 제외했다. 향후 GitHub Issue 템플릿까지 관리하려면 별도 후속 작업이 필요하다.

## 다음 단계 영향

Stage 5에서는 README의 문서 구조, 핵심 SKILL, 프롬프트 가이드 준수 설명을 새 구조와 맞춰 갱신해야 한다. 특히 "정해진 위치와 템플릿"이라는 주장에 `templates/mydocs/_templates/`와 Skill의 템플릿 참조 흐름을 연결해야 한다.

## 승인 요청

Stage 4 산출물과 검증 결과를 승인하면 Stage 5로 진행한다.
