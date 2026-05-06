# task_m010_5_impl.md - GitHub Issue 템플릿과 task-register 출력 형식 보강 구현계획서

수행계획서: [`task_m010_5.md`](task_m010_5.md)
GitHub Issue: [#5](https://github.com/postmelee/hyper-waterfall/issues/5)
마일스톤: M010

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | GitHub Issue Form 추가 | `.github/ISSUE_TEMPLATE/task.yml`, `templates/.github/ISSUE_TEMPLATE/task.yml` | YAML parse, root/templates 동등성, 필수 입력 id grep, `git diff --check` |
| 2 | task-register와 문서 구조 가이드 보강 | `task-register/SKILL.md`, `document_structure_guide.md` | Issue Form 참조, fallback, 플랫폼 템플릿 경계 grep, `git diff --check` |
| 3 | README 프롬프트 가이드 근거 보강 | `README.md` | Issue Form/입력 프롬프트/출력 형식/GPT-5.5/Opus 4.7 grep, `git diff --check` |

## Stage 1 - GitHub Issue Form 추가

### 산출물

신규:

- `.github/ISSUE_TEMPLATE/task.yml`
- `templates/.github/ISSUE_TEMPLATE/task.yml`

### 변경 내용

- GitHub YAML Issue Form으로 하이퍼-워터폴 task 전용 템플릿을 추가한다.
- 본문 구조는 #1의 하이퍼-워터폴형 이슈를 기준으로 하되, 다음 작업 프롬프트로 쓰기 위해 필수 입력을 더 명확히 나눈다.
  - `background`: 배경
  - `goals`: 목표
  - `included_scope`: 포함 범위
  - `excluded_scope`: 제외 범위
  - `acceptance_criteria`: 수용 기준
  - `validation`: 검증 기준
  - `references`: 참고
  - `metadata`: milestone/label 후보와 선택 이유
  - `confirmations`: 중복 확인과 범위 확인 체크박스
- 적용 저장소마다 label 구성이 다를 수 있으므로 자동 label 부여는 과하게 고정하지 않는다. 필요 label은 `metadata`에 후보와 이유를 쓰게 한다.
- 루트와 `templates/`의 Issue Form은 같은 구조를 유지한다.

### 검증

```bash
test -f .github/ISSUE_TEMPLATE/task.yml
test -f templates/.github/ISSUE_TEMPLATE/task.yml
cmp .github/ISSUE_TEMPLATE/task.yml templates/.github/ISSUE_TEMPLATE/task.yml
ruby -e 'require "yaml"; YAML.load_file(".github/ISSUE_TEMPLATE/task.yml"); YAML.load_file("templates/.github/ISSUE_TEMPLATE/task.yml")'
grep -nE '^(name|description|title|body):' .github/ISSUE_TEMPLATE/task.yml templates/.github/ISSUE_TEMPLATE/task.yml
grep -nE 'id: (background|goals|included_scope|excluded_scope|acceptance_criteria|validation|references|metadata|confirmations)' .github/ISSUE_TEMPLATE/task.yml
grep -nE 'required: true' .github/ISSUE_TEMPLATE/task.yml
git diff --check
```

### 커밋

```text
Task #5 Stage 1: 하이퍼-워터폴 task용 GitHub Issue Form 추가
```

## Stage 2 - task-register와 문서 구조 가이드 보강

### 산출물

수정:

- `templates/mydocs/skills/task-register/SKILL.md`
- `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- `task-register`의 이슈 초안 작성 단계에 `.github/ISSUE_TEMPLATE/task.yml` 우선 참조를 추가한다.
- Skill이 CLI로 이슈를 만들 때도 Issue Form의 필수 입력 구조를 본문 작성 기준으로 사용하게 한다.
- Issue Form을 읽을 수 없는 상황에 대비해 기존 `배경 / 목표 / 범위 / 제외 / 참고` fallback을 `수용 기준 / 검증 / 메타데이터`까지 포함하도록 보강한다.
- `document_structure_guide.md`에 다음 경계를 추가한다.
  - `mydocs/_templates/`: 계획서, 보고서, 피드백 등 저장소 문서 산출물의 출력 형식
  - `.github/ISSUE_TEMPLATE/`: GitHub Issue 같은 플랫폼 산출물의 입력 프롬프트 형식
  - `.github/pull_request_template.md`: PR 본문 출력 형식
- `mydocs/_templates/`에 Issue Form을 넣지 않는 원칙을 명확히 한다.

### 검증

```bash
grep -nE '\.github/ISSUE_TEMPLATE/task\.yml|GitHub Issue Form|fallback|수용 기준|검증' templates/mydocs/skills/task-register/SKILL.md
grep -nE 'GitHub 플랫폼|ISSUE_TEMPLATE|pull_request_template|mydocs/_templates|입력 프롬프트' templates/mydocs/manual/document_structure_guide.md
grep -nE '산출물 폴더 내부에는 템플릿 파일을 두지 않는다|중앙 템플릿' templates/mydocs/manual/document_structure_guide.md
git diff --check
```

### 커밋

```text
Task #5 Stage 2: task-register를 Issue Form 기반 이슈 초안으로 보강
```

## Stage 3 - README 프롬프트 가이드 근거 보강

### 산출물

수정:

- `README.md`

### 변경 내용

- README의 프롬프트 가이드 정합성 설명에 입력 프롬프트 구조화 장치로 Issue Form을 추가한다.
- "Issue Form = 입력 프롬프트 구조화, `mydocs/_templates/` = 출력 형식 구조화" 관계를 명시한다.
- GPT-5.5와 Opus 4.7 공식 가이드에 대한 표현은 "핵심 원칙을 구조적으로 반영"으로 유지하고, 과장된 보장 표현은 쓰지 않는다.
- 저장소 구조 또는 도입 후 작업 흐름 섹션에 `.github/ISSUE_TEMPLATE/task.yml`을 반영한다.
- `task-register` 설명이 새 Issue Form 참조 흐름과 어긋나지 않게 조정한다.

### 검증

```bash
grep -nE 'Issue Form|입력 프롬프트|출력 형식|GPT-5.5|Opus 4.7' README.md
grep -nE 'task-register|ISSUE_TEMPLATE|mydocs/_templates|pull_request_template' README.md templates/mydocs/manual/document_structure_guide.md
grep -nE '핵심 원칙|구조적으로 반영|다음 작업의 첫 프롬프트' README.md
git diff --check
```

### 커밋

```text
Task #5 Stage 3: README에 Issue Form 기반 입력 프롬프트 구조화 근거 반영
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m010_5_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #5 Stage {N}: {핵심 내용 요약}` 형식을 따른다.

## 단계 의존성

- Stage 2는 Stage 1에서 Issue Form 파일명과 필수 입력 id가 확정된 뒤 진행한다.
- Stage 3은 Stage 1~2의 실제 구현을 README에 반영한다.

## 위험과 대응

- **Issue Form 과설계**: 필수 입력은 다음 작업 프롬프트에 꼭 필요한 항목으로 제한하고, 추가 메타 정보는 선택 입력으로 둔다.
- **label/milestone 자동화 오해**: 적용 저장소마다 label과 milestone이 다르므로 Issue Form은 후보와 이유를 수집하고, 실제 선택은 `task-register`의 live 조회 절차가 맡는다.
- **템플릿 위치 혼동**: GitHub 플랫폼 템플릿은 `.github/`에 두고, `mydocs/_templates/`는 저장소 문서 산출물 전용임을 Skill, 매뉴얼, README에서 같은 방식으로 설명한다.
- **공식 가이드 주장 과장**: GPT-5.5/Opus 4.7 가이드를 "완전 준수 보장"으로 쓰지 않고, 입력·출력 구조화 원칙을 반영한다고 표현한다.

## 승인 요청 사항

- Stage 1~3 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Issue Form에서 label 자동 부여를 강제하지 않고 `metadata` 필드에 milestone/label 후보와 이유를 남기는 방향에 동의?
- `mydocs/_templates/`에는 Issue Form을 넣지 않고 `.github/ISSUE_TEMPLATE/task.yml`을 GitHub 플랫폼 입력 템플릿으로 두는 방향에 동의?

승인되면 Stage 1 구현을 시작한다.
