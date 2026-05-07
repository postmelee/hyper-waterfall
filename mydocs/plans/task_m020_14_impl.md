# task_m020_14_impl.md - README에 관련 문서 링크와 탐색 안내 보강 구현계획서

수행계획서: [`task_m020_14.md`](task_m020_14.md)
GitHub Issue: [#14](https://github.com/postmelee/hyper-waterfall/issues/14)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 작업 흐름과 SKILL 링크 보강 | `README.md` | workflow/PR/Git manual 링크 grep, 관련 heading 확인, `git diff --check` |
| 2 | 문서 구조 링크 보강 | `README.md` | document structure manual 링크 grep, 폴더별 상세 규칙 heading 확인, `git diff --check` |
| 3 | 링크 품질 검증과 문구 정리 | `README.md` | 관련 링크 종합 grep, `blob/main` 불필요 추가 확인, 상태 확인, `git diff --check` |

## Stage 1 - 작업 흐름과 SKILL 링크 보강

### 산출물

수정:

- `README.md`
- `mydocs/working/task_m020_14_stage1.md`

### 변경 내용

- `## 도입 후 작업 흐름` 하위의 절차 설명 근처에 세부 절차 매뉴얼 링크를 추가한다.
  - [`templates/mydocs/manual/task_workflow_guide.md#타스크-진행-절차`](../../templates/mydocs/manual/task_workflow_guide.md#타스크-진행-절차)
  - [`templates/mydocs/manual/git_workflow_guide.md#브랜치-관리`](../../templates/mydocs/manual/git_workflow_guide.md#브랜치-관리)
- `### 핵심 SKILL 상세` 표 근처에 SKILL 호출 표시와 PR 게시 절차로 이동하는 안내 링크를 추가한다.
  - [`templates/mydocs/manual/task_workflow_guide.md#skill-호출-표시-안내`](../../templates/mydocs/manual/task_workflow_guide.md#skill-호출-표시-안내)
  - [`templates/mydocs/manual/pr_process_guide.md#내부-task-pr-작성-규칙`](../../templates/mydocs/manual/pr_process_guide.md#내부-task-pr-작성-규칙)
- README 본문은 절차를 다시 길게 설명하지 않고, "자세한 절차는..." 형태의 짧은 안내 문구로 둔다.

### 검증

```bash
rg -n "task_workflow_guide|pr_process_guide|git_workflow_guide" README.md
rg -n "^## 타스크 진행 절차|^## SKILL 호출 표시 안내" templates/mydocs/manual/task_workflow_guide.md
rg -n "^## 브랜치 관리|^## 내부 task PR 작성 규칙" templates/mydocs/manual/git_workflow_guide.md templates/mydocs/manual/pr_process_guide.md
git diff --check
```

### 커밋

```text
Task #14 Stage 1: README 작업 흐름 링크 보강
```

## Stage 2 - 문서 구조 링크 보강

### 산출물

수정:

- `README.md`
- `mydocs/working/task_m020_14_stage2.md`

### 변경 내용

- `### 문서 구조` 아래에 작업지시자가 제안한 취지를 반영해 문서 구조 매뉴얼의 상세 섹션 링크를 추가한다.
  - [`templates/mydocs/manual/document_structure_guide.md#폴더별-상세-규칙`](../../templates/mydocs/manual/document_structure_guide.md#폴더별-상세-규칙)
  - [`templates/mydocs/manual/document_structure_guide.md#문서-파일명-규칙`](../../templates/mydocs/manual/document_structure_guide.md#문서-파일명-규칙)
  - [`templates/mydocs/manual/document_structure_guide.md#중앙-템플릿-정책`](../../templates/mydocs/manual/document_structure_guide.md#중앙-템플릿-정책)
- `## 적용 후 대상 저장소 구조` 아래에 대상 저장소 구조와 skills 링크 구조를 이해하기 위한 세부 링크를 추가한다.
  - [`templates/mydocs/manual/document_structure_guide.md#agent-skills-위치-정책`](../../templates/mydocs/manual/document_structure_guide.md#agent-skills-위치-정책)
  - [`templates/mydocs/manual/document_structure_guide.md#배포-manifest와-버전-기록-정책`](../../templates/mydocs/manual/document_structure_guide.md#배포-manifest와-버전-기록-정책)
- README 안에서는 `https://github.com/postmelee/hyper-waterfall/blob/main/...` 대신 저장소 상대 링크를 사용한다.

### 검증

```bash
rg -n "document_structure_guide|폴더별 상세 규칙|문서 파일명 규칙|중앙 템플릿 정책|Agent Skills 위치 정책|배포 manifest와 버전 기록 정책" README.md
rg -n "^## 폴더별 상세 규칙|^## 문서 파일명 규칙|^## 중앙 템플릿 정책|^## Agent Skills 위치 정책|^## 배포 manifest와 버전 기록 정책" templates/mydocs/manual/document_structure_guide.md
git diff --check
```

### 커밋

```text
Task #14 Stage 2: README 문서 구조 링크 보강
```

## Stage 3 - 링크 품질 검증과 문구 정리

### 산출물

수정:

- `README.md`
- `mydocs/working/task_m020_14_stage3.md`

### 변경 내용

- Stage 1~2에서 추가한 링크 문구가 README 흐름을 방해하지 않는지 정리한다.
- 상대 링크가 실제 파일과 heading에 대응하는지 수동 확인한다.
- `blob/main` URL이 README 내부 문서 링크로 새로 추가되지 않았는지 확인한다.
- 필요하면 중복되거나 과한 안내 링크를 줄인다.

### 검증

```bash
rg -n "document_structure_guide|task_workflow_guide|git_workflow_guide|pr_process_guide|폴더별 상세 규칙" README.md
rg -n "blob/main" README.md || true
test -f templates/mydocs/manual/document_structure_guide.md
test -f templates/mydocs/manual/task_workflow_guide.md
test -f templates/mydocs/manual/git_workflow_guide.md
test -f templates/mydocs/manual/pr_process_guide.md
git diff --check
git status --short --branch
```

### 커밋

```text
Task #14 Stage 3: README 링크 품질 검증과 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m020_14_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #14 Stage {N}: {핵심 내용 요약}` 형식을 따른다.

## 단계 의존성

- Stage 2는 Stage 1의 작업 흐름 링크 배치가 확정된 뒤 진행한다.
- Stage 3은 Stage 1~2의 링크가 모두 들어간 뒤 전체 문구와 링크 품질을 검증한다.
- README만 수정하는 task이므로 매뉴얼·SKILL 본문 동기화는 발생하지 않는다.

## 위험과 대응

- **README 링크 과밀화**: 세부 링크를 각 섹션의 바로 다음 행동으로 필요한 곳에만 둔다. 단순 색인표를 새로 만들지 않는다.
- **한국어 heading fragment 오류**: 검증 단계에서 대상 heading 텍스트를 직접 grep하고, README 링크 문구를 실제 heading과 맞춘다.
- **base 변경 충돌**: task 시작 후 `origin/main`에 PR #15가 merge되어 rebase를 수행했다. 후속 Stage 전에도 `git status --short --branch`로 기준 상태를 확인한다.

## 승인 요청 사항

- Stage 1~3 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- README에 추가할 링크를 작업 흐름/문서 구조/대상 저장소 구조 주변으로 한정하는 방향에 동의?
- 매뉴얼·SKILL 본문은 변경하지 않고 README의 탐색성만 보강하는 범위에 동의?

승인되면 Stage 1 구현을 시작한다.
