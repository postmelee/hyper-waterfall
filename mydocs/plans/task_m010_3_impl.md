# task_m010_3_impl.md — 중앙 문서 템플릿과 폴더별 문서 구조 가이드 보강 (구현계획서)

수행계획서: [`task_m010_3.md`](task_m010_3.md)
GitHub Issue: [#3](https://github.com/postmelee/hyper-waterfall/issues/3)
마일스톤: M010

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 중앙 템플릿 폴더와 내부 task 템플릿 | `templates/mydocs/_templates/` 내부 task 템플릿 5종, `mydocs/_templates` 심볼릭 링크 | 템플릿 파일 목록, 필수 heading grep, symlink 확인, `git diff --check` |
| 2 | 지원 문서와 외부 PR 템플릿 | feedback/tech/troubleshooting/external PR 템플릿 6종 | 템플릿 파일 목록, 외부 PR 산출물명 grep, `git diff --check` |
| 3 | 문서 구조 가이드 보강 | `document_structure_guide.md` 폴더별 상세 규칙, `_templates/` 정책 | 폴더별 상세 heading grep, 템플릿 금지/참조 규칙 grep, `git diff --check` |
| 4 | Skill 템플릿 참조 전환 | `task-start`, `task-stage-report`, `task-final-report`, `todo`, `external-pr-review` 보강 | `mydocs/_templates/` 참조 grep, 기존 산출물명 일치 확인, `git diff --check` |
| 5 | README와 프롬프트 가이드 준수 근거 정리 | README 구조/프롬프트 가이드 섹션 보강, 필요 시 `task_workflow_guide.md` 갱신 | README `_templates`/출력 형식 grep, placeholder 보존 검사, 전체 `git diff --check` |

## Stage 1 — 중앙 템플릿 폴더와 내부 task 템플릿

### 산출물

신규 파일:

- `templates/mydocs/_templates/orders.md`
- `templates/mydocs/_templates/task_plan.md`
- `templates/mydocs/_templates/task_impl_plan.md`
- `templates/mydocs/_templates/stage_report.md`
- `templates/mydocs/_templates/final_report.md`

신규 심볼릭 링크:

- `mydocs/_templates` -> `../templates/mydocs/_templates`

### 템플릿 작성 기준

- 각 템플릿은 실제 산출물로 오해되지 않도록 파일명과 첫 문단에서 "템플릿"임을 명시한다.
- 실제 문서 파일명 placeholder는 `{milestone}`, `{issue}`, `{stage}`처럼 소문자 중심으로 둔다.
- 저장소 적용용 placeholder(`{REPO_SLUG}`, `{BASE_BRANCH}` 등)는 필요할 때만 사용하고, 본 저장소에서 치환하지 않는다.
- 필수 섹션과 선택 섹션을 구분한다.
- `orders.md`는 실제 `orders/` 폴더에 두지 않고 중앙 템플릿에만 둔다.

### 검증

```bash
find templates/mydocs/_templates -maxdepth 1 -type f | sort
test -L mydocs/_templates
ls -la mydocs/_templates
grep -nE '^# .*템플릿' templates/mydocs/_templates/orders.md templates/mydocs/_templates/task_plan.md templates/mydocs/_templates/task_impl_plan.md templates/mydocs/_templates/stage_report.md templates/mydocs/_templates/final_report.md
grep -nE '^## (목적|배경|범위|검증 계획|리스크)' templates/mydocs/_templates/task_plan.md
grep -nE '^## (단계 개요|Stage 1|검증|커밋)' templates/mydocs/_templates/task_impl_plan.md
grep -nE '^## (단계 목적|산출물|검증 결과|잔여 위험|승인 요청)' templates/mydocs/_templates/stage_report.md
grep -nE '^## (작업 요약|변경 파일 목록과 영향 범위|검증 결과|잔여 위험과 후속 작업|작업지시자 승인 요청)' templates/mydocs/_templates/final_report.md
git diff --check
```

### 커밋

```text
Task #3 Stage 1: 중앙 템플릿 폴더와 내부 task 템플릿 추가
```

## Stage 2 — 지원 문서와 외부 PR 템플릿

### 산출물

신규 파일:

- `templates/mydocs/_templates/feedback.md`
- `templates/mydocs/_templates/tech_note.md`
- `templates/mydocs/_templates/troubleshooting.md`
- `templates/mydocs/_templates/external_pr_review.md`
- `templates/mydocs/_templates/external_pr_review_impl.md`
- `templates/mydocs/_templates/external_pr_report.md`

### 템플릿 작성 기준

- `feedback.md`는 작업지시자 피드백과 코드 리뷰 의견을 기록하는 짧은 형식으로 둔다.
- `tech_note.md`는 조사 배경, 조사 대상, 발견 내용, 결정/비결정, 참고 링크를 포함한다.
- `troubleshooting.md`는 증상, 재현 조건, 원인, 해결, 재발 방지, 검증을 포함한다.
- 외부 PR 3종 템플릿은 `external-pr-review` Skill의 파일명 정책(`pr_{번호}_review.md`, `pr_{번호}_review_impl.md`, `pr_{번호}_report.md`)과 맞춘다.

### 검증

```bash
find templates/mydocs/_templates -maxdepth 1 -type f | sort
grep -nE '^# .*템플릿' templates/mydocs/_templates/feedback.md templates/mydocs/_templates/tech_note.md templates/mydocs/_templates/troubleshooting.md templates/mydocs/_templates/external_pr_review.md templates/mydocs/_templates/external_pr_review_impl.md templates/mydocs/_templates/external_pr_report.md
grep -nE 'pr_\\{번호\\}_review\\.md|pr_\\{번호\\}_review_impl\\.md|pr_\\{번호\\}_report\\.md' templates/mydocs/_templates/external_pr_review.md templates/mydocs/_templates/external_pr_review_impl.md templates/mydocs/_templates/external_pr_report.md templates/mydocs/skills/external-pr-review/SKILL.md
grep -nE '^## (증상|재현 조건|원인|해결|재발 방지|검증)' templates/mydocs/_templates/troubleshooting.md
git diff --check
```

### 커밋

```text
Task #3 Stage 2: 지원 문서와 외부 PR 템플릿 추가
```

## Stage 3 — 문서 구조 가이드 보강

### 산출물

수정 파일:

- `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- 핵심 용어에 "문서 템플릿 진실 원천"을 추가한다.
- 폴더 역할 표에 `_templates/`를 추가한다.
- `templates/mydocs/_templates/`와 적용 저장소의 `mydocs/_templates/` 관계를 설명한다.
- 각 폴더별 상세 규칙을 추가한다.
  - 목적
  - 답하는 질문
  - 작성 시점
  - 허용 파일명
  - 사용 템플릿
  - 반드시 포함할 내용
  - 두면 안 되는 내용
  - 다음 세션 AI가 복원해야 할 맥락
- 산출물 폴더 내부에 템플릿 파일을 두지 않는 원칙을 명시한다.
- 원본 rhwp의 관점은 참고하되, 본문은 본 저장소의 폴더 구조와 프레임워크 성격에 맞게 새로 작성한다.

### 검증

```bash
grep -nE '`_templates/`|문서 템플릿 진실 원천' templates/mydocs/manual/document_structure_guide.md
grep -nE '^### `(orders|plans|working|report|feedback|tech|troubleshootings|pr|manual|skills|_templates)/`' templates/mydocs/manual/document_structure_guide.md
grep -nE '답하는 질문|작성 시점|사용 템플릿|두면 안 되는 내용|다음 세션' templates/mydocs/manual/document_structure_guide.md
grep -nE '산출물 폴더 내부에는 템플릿 파일을 두지 않는다|중앙 템플릿' templates/mydocs/manual/document_structure_guide.md
git diff --check
```

### 커밋

```text
Task #3 Stage 3: 문서 구조 가이드에 폴더별 목적과 템플릿 정책 보강
```

## Stage 4 — Skill 템플릿 참조 전환

### 산출물

수정 파일:

- `templates/mydocs/skills/task-start/SKILL.md`
- `templates/mydocs/skills/task-stage-report/SKILL.md`
- `templates/mydocs/skills/task-final-report/SKILL.md`
- `templates/mydocs/skills/todo/SKILL.md`
- `templates/mydocs/skills/external-pr-review/SKILL.md`

필요 시 수정:

- `templates/mydocs/manual/task_workflow_guide.md`

### 변경 내용

- `task-start`: 수행계획서 작성 시 `mydocs/_templates/task_plan.md`를 기준으로 생성한다고 명시한다.
- `task-stage-report`: 단계 보고서 작성 시 `mydocs/_templates/stage_report.md`를 기준으로 생성한다고 명시한다.
- `task-final-report`: 최종 보고서 작성 시 `mydocs/_templates/final_report.md`, PR 본문 작성 시 `{PR_TEMPLATE_PATH}`를 기준으로 한다고 분리한다.
- `todo`: 오늘할일 형식은 중앙 템플릿 `mydocs/_templates/orders.md`와 Skill 내 최소 예시가 같은 구조임을 명시한다.
- `external-pr-review`: 외부 PR 검토 3종 문서를 각각 중앙 템플릿 기준으로 작성하게 한다.
- Skill 본문에서 섹션 목록을 완전히 제거하지는 않는다. 템플릿 파일을 읽지 못하는 상황에서도 최소 절차가 보존되도록 짧은 요약만 남긴다.

### 검증

```bash
grep -nE 'mydocs/_templates/(task_plan|stage_report|final_report|orders|external_pr_review|external_pr_review_impl|external_pr_report)\\.md' templates/mydocs/skills/task-start/SKILL.md templates/mydocs/skills/task-stage-report/SKILL.md templates/mydocs/skills/task-final-report/SKILL.md templates/mydocs/skills/todo/SKILL.md templates/mydocs/skills/external-pr-review/SKILL.md
grep -nE 'task_plan\\.md' templates/mydocs/skills/task-start/SKILL.md
grep -nE 'stage_report\\.md' templates/mydocs/skills/task-stage-report/SKILL.md
grep -nE 'final_report\\.md|\\{PR_TEMPLATE_PATH\\}' templates/mydocs/skills/task-final-report/SKILL.md
grep -nE 'external_pr_review\\.md|external_pr_review_impl\\.md|external_pr_report\\.md' templates/mydocs/skills/external-pr-review/SKILL.md
git diff --check
```

### 커밋

```text
Task #3 Stage 4: Skill 문서 작성 절차를 중앙 템플릿 참조로 전환
```

## Stage 5 — README와 프롬프트 가이드 준수 근거 정리

### 산출물

수정 파일:

- `README.md`
- 필요 시 `templates/mydocs/manual/task_workflow_guide.md`

### 변경 내용

- README "이 저장소가 한 일"과 "프롬프트 가이드 준수" 섹션에서 중앙 템플릿 기반 출력 계약을 명시한다.
- README "도입 후 작업 흐름" 또는 "문서 구조"에 `_templates/`를 추가한다.
- "핵심 SKILL 상세" 표의 주요 산출물 설명이 새 템플릿 참조 흐름과 어긋나지 않게 조정한다.
- `task_workflow_guide.md`의 SKILL 호출 표시 안내는 실제 Skill 목록 변경이 없으면 최소 변경 또는 무변경으로 둔다. 단, 문서 템플릿 적용 시점 안내가 필요하면 짧게 보강한다.

### 검증

```bash
grep -nE '_templates|중앙 템플릿|출력 형식|출력 계약' README.md
grep -nE 'GPT-5.5|Opus 4.7|Output Format|desired output format' README.md
grep -nE 'task-start|task-stage-report|task-final-report|external-pr-review|todo' README.md templates/mydocs/manual/task_workflow_guide.md
grep -RnE '\\{(PROJECT_OVERVIEW|PROJECT_SPECIFIC_RULES|PROJECT_SPECIFIC_REQUIRED_DOCUMENTS|PROJECT_VALIDATION_GUIDE|BASE_BRANCH|RELEASE_BRANCH|PR_TEMPLATE_PATH|REPO_NAME)\\}' AGENTS.md CLAUDE.md .github/pull_request_template.md README.md templates/mydocs/manual templates/mydocs/skills || true
git diff --check
```

검증 해석:

- placeholder grep은 `templates/` 진실 원천에 의도적으로 남아 있는 placeholder와 실제 치환 누락을 구분해 확인한다.
- README 안의 외부 공식 가이드 링크는 기존 링크를 유지하고, 주장만 구현 상태에 맞춰 조정한다.

### 커밋

```text
Task #3 Stage 5: README에 중앙 템플릿 기반 출력 형식 근거 반영
```

## 단계 의존성

- Stage 2는 Stage 1의 `_templates/` 폴더가 있어야 진행할 수 있다.
- Stage 3은 Stage 1~2에서 확정된 템플릿 파일명을 기준으로 문서 구조 가이드를 보강한다.
- Stage 4는 Stage 3의 템플릿 정책과 충돌하지 않게 Skill을 갱신한다.
- Stage 5는 Stage 1~4의 실제 구현을 README에 반영한다.

## 위험과 대응

- **템플릿 이름 변경 가능성**: Stage 1~2에서 파일명이 바뀌면 Stage 3~5 검증 grep도 같이 갱신한다.
- **문서 과다 중복**: 템플릿과 Skill이 같은 섹션 목록을 길게 반복하지 않도록 Skill은 참조와 예외 중심으로 유지한다.
- **원본 rhwp 문맥 혼입**: `hyper_waterfall_docs_guide.md`는 폴더별 목적 설명 방식만 참고하고, 제품 특화 표현은 사용하지 않는다.
- **중앙 템플릿 위치 오해**: `document_structure_guide.md`와 README에서 산출물 폴더 내부 템플릿 금지 원칙을 함께 설명한다.
- **검증 grep의 과민성**: 문구 변경으로 grep이 깨질 수 있으므로 Stage별 보고서에서 grep 실패 시 실제 누락인지 문구 변경인지 구분한다.

## 승인 요청 사항

- Stage 1~5 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Stage 4에서 Skill의 섹션 목록을 완전히 제거하지 않고 "템플릿 참조 + 최소 요약"으로 유지하는 방향에 동의?
- Stage 5에서 `task_workflow_guide.md`는 실제 필요가 확인될 때만 최소 보강하는 방향에 동의?

승인되면 Stage 1 구현을 시작한다.
