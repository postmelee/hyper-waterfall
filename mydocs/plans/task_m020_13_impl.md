# task_m020_13_impl.md - PR 템플릿 검증 섹션 구조 강화 구현계획서

수행계획서: [`task_m020_13.md`](task_m020_13.md)
GitHub Issue: [#13](https://github.com/postmelee/hyper-waterfall/issues/13)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | PR 템플릿 검증 섹션 개편 | `.github/pull_request_template.md`, `templates/.github/pull_request_template.md` | 검증 하위 목차 grep, 두 템플릿 구조 비교, `{REPO_SLUG}` 보존, `git diff --check` |
| 2 | PR 작성 규칙과 최종 보고 SKILL 동기화 | `templates/mydocs/manual/pr_process_guide.md`, `templates/mydocs/skills/task-final-report/SKILL.md` | 새 검증 작성 기준 grep, PR 본문 생성 규칙 확인, `git diff --check` |
| 3 | README와 workflow 안내 동기화 | `README.md`, `templates/mydocs/manual/task_workflow_guide.md` | 핵심 SKILL/도입 흐름/SKILL 호출 안내 grep, 전체 placeholder·문서 일치 검증, `git diff --check` |

## Stage 1 - PR 템플릿 검증 섹션 개편

### 산출물

수정:

- `.github/pull_request_template.md`
- `templates/.github/pull_request_template.md`

### 변경 내용

- 기존 `## 검증` 섹션의 단일 bullet placeholder를 다음 하위 구조로 바꾼다.
  - `### 자동 검증`
  - `### 수동/시나리오 검증`
  - `### CI/원격 검증`
  - `### 검증 한계`
- 자동 검증과 수동/시나리오 검증은 `주제 / 검증 방법 / 결과 / 근거` 표를 사용한다.
- CI/원격 검증은 `항목 / 결과 / 근거` 표를 사용해 check 이름, OK/MISS/SKIP, run 링크 또는 확인 시점을 적게 한다.
- 실행하지 않은 검증은 체크리스트로 남기지 않고 `검증 한계` 또는 `남은 리스크`에 사유를 적도록 주석을 강화한다.
- `.github/` dogfooding 파일은 `postmelee/hyper-waterfall` 링크 정책을 유지하고, `templates/.github/` 파일은 `{REPO_SLUG}` placeholder를 보존한다.

### 검증

```bash
grep -nE '### 자동 검증|### 수동/시나리오 검증|### CI/원격 검증|### 검증 한계' .github/pull_request_template.md templates/.github/pull_request_template.md
grep -nE '주제 \\| 검증 방법 \\| 결과 \\| 근거|항목 \\| 결과 \\| 근거|실행하지 않은|긴 로그' .github/pull_request_template.md templates/.github/pull_request_template.md
grep -nF '{REPO_SLUG}' templates/.github/pull_request_template.md
diff -u .github/pull_request_template.md templates/.github/pull_request_template.md
git diff --check
```

`diff -u`는 dogfooding 파일의 `postmelee/hyper-waterfall`과 template 원본의 `{REPO_SLUG}` 차이만 허용한다.

### 커밋

```text
Task #13 Stage 1: PR 템플릿 검증 섹션 개편
```

## Stage 2 - PR 작성 규칙과 최종 보고 SKILL 동기화

### 산출물

수정:

- `templates/mydocs/manual/pr_process_guide.md`
- `templates/mydocs/skills/task-final-report/SKILL.md`

### 변경 내용

- `pr_process_guide.md`의 내부 task PR 작성 규칙에서 `검증` 섹션 작성 기준을 새 템플릿 구조와 일치시킨다.
- `검증` 섹션에는 실제 실행한 항목만 남기되, 명령만 나열하지 않고 목적·방법·결과·근거를 함께 적도록 명시한다.
- 수동 확인과 시각 자료는 어떤 화면, 파일, 산출물에서 무엇을 확인했는지 적도록 보강한다.
- CI/원격 검증은 check 이름, 결과, run 링크 또는 확인 시점을 남기도록 안내한다.
- `task-final-report/SKILL.md`의 PR 본문 생성 기준과 검증 항목도 같은 구조를 요구하도록 갱신한다.
- PR 본문 검증에서 실행하지 않은 항목이 남아 있지 않은지 확인하는 기존 규칙을 `검증 한계` 분리 기준까지 확장한다.

### 검증

```bash
grep -nE '자동 검증|수동/시나리오 검증|CI/원격 검증|검증 한계' templates/mydocs/manual/pr_process_guide.md templates/mydocs/skills/task-final-report/SKILL.md
grep -nE '주제.*검증 방법.*결과.*근거|실행하지 않은|긴 로그|run 링크|확인 시점' templates/mydocs/manual/pr_process_guide.md templates/mydocs/skills/task-final-report/SKILL.md
grep -nE 'PR 본문.*검증|검증 결과.*요약|명령.*나열' templates/mydocs/skills/task-final-report/SKILL.md templates/mydocs/manual/pr_process_guide.md
git diff --check
```

### 커밋

```text
Task #13 Stage 2: PR 작성 규칙과 최종 보고 SKILL 동기화
```

## Stage 3 - README와 workflow 안내 동기화

### 산출물

수정:

- `README.md`
- `templates/mydocs/manual/task_workflow_guide.md`

### 변경 내용

- README의 핵심 SKILL 표에서 `task-final-report` 산출물이 최종 보고서와 Open PR뿐 아니라 주제별 검증 결과를 압축한 PR 본문을 만든다는 점을 반영한다.
- README의 도입 후 작업 흐름 또는 dogfooding 예시에서 PR 본문이 단순 검증 명령이 아니라 검증 결과·근거를 포함한다는 표현으로 보정한다.
- `task_workflow_guide.md`의 문서 출력 형식 설명에 PR 본문 검증 섹션이 `.github/pull_request_template.md`의 구조를 따르고, 검증 한계를 분리해 적는다는 원칙을 추가한다.
- SKILL 호출 표시 안내는 기존 형식을 유지하되, `task-final-report`가 새 검증 구조를 따르는 PR 본문을 만드는 절차라는 연결이 필요하면 최소 문장으로 보강한다.
- Stage 3에서 전체 변경을 다시 훑어 README, 매뉴얼, SKILL, PR 템플릿이 같은 용어를 쓰는지 맞춘다.

### 검증

```bash
grep -nE 'task-final-report|Open PR|PR 본문|검증 결과|검증 근거' README.md
grep -nE 'PR 본문|pull_request_template|검증 한계|검증 결과|SKILL 호출 표시' templates/mydocs/manual/task_workflow_guide.md
grep -nE '자동 검증|수동/시나리오 검증|CI/원격 검증|검증 한계' .github/pull_request_template.md templates/.github/pull_request_template.md templates/mydocs/manual/pr_process_guide.md templates/mydocs/skills/task-final-report/SKILL.md
grep -nF '{REPO_SLUG}' templates/.github/pull_request_template.md
git diff --check
```

### 커밋

```text
Task #13 Stage 3: README와 workflow 안내 동기화
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- Stage 완료 보고서는 해당 Stage 산출물과 함께 커밋한다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m020_13_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #13 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서와 오늘할일 완료 처리는 `task-final-report` 단계에서 별도 커밋 또는 마지막 Stage와 묶음 커밋으로 처리한다.

## 단계 의존성

- Stage 2는 Stage 1에서 PR 템플릿의 검증 섹션 구조가 확정된 뒤 진행한다.
- Stage 3은 Stage 2에서 매뉴얼과 SKILL 용어가 확정된 뒤 진행한다.
- 모든 Stage는 작업지시자 승인 없이 다음 Stage로 넘어가지 않는다.

## 위험과 대응

- **검증 섹션 과밀화**: 표를 너무 많이 채우면 PR 본문이 장황해질 수 있다. 템플릿 주석에서 긴 로그 대신 핵심 출력·통과 개수·확인 조건만 남기도록 제한한다.
- **용어 불일치**: `검증 결과`, `검증 근거`, `검증 한계` 용어가 문서마다 다르게 쓰일 수 있다. Stage 3에서 PR 템플릿, 매뉴얼, SKILL, README의 표현을 함께 grep하고 보정한다.
- **placeholder 손상**: `templates/.github/pull_request_template.md`의 `{REPO_SLUG}`가 실제 저장소명으로 치환될 수 있다. Stage 1과 Stage 3에서 grep으로 보존 여부를 확인한다.

## 승인 요청 사항

- 위 3개 Stage, 산출물, 검증 명령, 커밋 메시지로 Stage 1 구현을 시작해도 되는지 승인 요청한다.
