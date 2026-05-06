# task_m010_5_stage2.md - Stage 2 완료 보고서

GitHub Issue: [#5](https://github.com/postmelee/hyper-waterfall/issues/5)
구현계획서: [`task_m010_5_impl.md`](../plans/task_m010_5_impl.md)
Stage: 2

## 단계 목적

Stage 1에서 추가한 GitHub Issue Form을 실제 이슈 등록 절차와 문서 구조 매뉴얼에 연결했다. `task-register`는 이제 `.github/ISSUE_TEMPLATE/task.yml`을 우선 참조해 이슈 본문을 만들고, `document_structure_guide.md`는 GitHub 플랫폼 템플릿과 `mydocs/_templates/`의 역할 경계를 설명한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/mydocs/skills/task-register/SKILL.md` | Issue Form 우선 참조, Markdown 본문 변환 기준, fallback 섹션, 검증 기준 보강 |
| `templates/mydocs/manual/document_structure_guide.md` | GitHub 플랫폼 템플릿 용어와 정책, Issue/PR 템플릿 위치, `mydocs/_templates/`와의 경계 추가 |
| `templates/mydocs/manual/task_workflow_guide.md` | GitHub Issue는 입력 프롬프트 형식, PR 본문은 출력 형식이라는 절차 안내 추가 |

변경 규모:

```text
templates/mydocs/manual/document_structure_guide.md      | 27 +++++++++++++++++++++-
templates/mydocs/manual/task_workflow_guide.md           |  2 ++
templates/mydocs/skills/task-register/SKILL.md           | 15 +++++++++---
3 files changed, 40 insertions(+), 4 deletions(-)
```

## 본문 변경 정도 / 본문 무손실 여부

기존 절차는 유지하고, 이슈 초안 작성 기준만 Issue Form 우선 참조 방식으로 보강했다.

- 유지: 중복 이슈 확인, live milestone/label 조회, 작업지시자 승인 전 `gh issue create` 금지, 생성 후 `task-start` 승인 요청
- 보강: `.github/ISSUE_TEMPLATE/task.yml` 우선 참조, `gh issue create`용 Markdown 본문 변환 기준, 수용 기준과 검증 기준 섹션
- 추가: GitHub 플랫폼 템플릿은 `.github/`에 두고, `mydocs/_templates/`는 저장소 문서 산출물 전용으로 유지한다는 경계

`task_workflow_guide.md`는 구현계획서 Stage 2의 주요 산출물에는 없었지만, Skill/매뉴얼 변경 시 관련 안내를 같은 PR에서 갱신해야 한다는 저장소 규칙을 충족하기 위해 최소 문구를 추가했다.

## 검증 결과

실행 명령:

```bash
grep -nE '\.github/ISSUE_TEMPLATE/task\.yml|GitHub Issue Form|fallback|수용 기준|검증' templates/mydocs/skills/task-register/SKILL.md
grep -nE 'GitHub 플랫폼|ISSUE_TEMPLATE|pull_request_template|mydocs/_templates|입력 프롬프트' templates/mydocs/manual/document_structure_guide.md
grep -nE '산출물 폴더 내부에는 템플릿 파일을 두지 않는다|중앙 템플릿' templates/mydocs/manual/document_structure_guide.md
grep -nE 'ISSUE_TEMPLATE/task\.yml|pull_request_template|입력 프롬프트|출력 형식' templates/mydocs/manual/task_workflow_guide.md
git diff --check
```

결과:

- `task-register`에서 `.github/ISSUE_TEMPLATE/task.yml`, `templates/.github/ISSUE_TEMPLATE/task.yml`, GitHub Issue Form, fallback, 수용 기준, 검증 기준 문구 확인.
- `document_structure_guide.md`에서 GitHub 플랫폼 템플릿 정책, Issue Form/PR 템플릿 위치, `mydocs/_templates/` 경계, 입력 프롬프트 문구 확인.
- 산출물 폴더 내부 템플릿 금지와 중앙 템플릿 기존 규칙 유지 확인.
- `task_workflow_guide.md`에서 Issue Form과 PR 템플릿의 입력/출력 형식 역할 확인.
- `git diff --check` 경고 없이 통과.

## 잔여 위험

- Stage 3 전까지 README에는 아직 Issue Form을 입력 프롬프트 구조화 장치로 설명하지 않는다.
- `task-register`는 CLI로 이슈를 만들 때 Issue Form UI를 실행하지 않으므로, Form 항목을 Markdown 섹션으로 변환한다는 안내가 실제 사용에서 중요하다.

## 다음 단계 영향

Stage 3에서는 README의 문서 구조, 핵심 SKILL 설명, GPT-5.5/Opus 4.7 프롬프팅 가이드 정합성 설명에 Issue Form 기반 입력 프롬프트 구조화 근거를 반영해야 한다.

## 승인 요청

Stage 2 산출물과 검증 결과를 승인하면 Stage 3으로 진행한다.
