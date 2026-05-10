# task_m040_44_impl.md - manual 문서 중립성 정책 반영 구현계획서

수행계획서: [`task_m040_44.md`](task_m040_44.md)
GitHub Issue: [#44](https://github.com/postmelee/hyper-waterfall/issues/44)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | manual 중립성 정책 반영 | `templates/mydocs/manual/document_structure_guide.md`, `mydocs/working/task_m040_44_stage1.md` | manual 본문 책임 경계, 분리 위치, 금지 경로 확인 |
| 2 | 관련 문서 정합성 보강 | 필요 시 `README.md`, 필요 시 `templates/mydocs/manual/task_workflow_guide.md`, `mydocs/working/task_m040_44_stage2.md` | README/manual 링크와 중복 정책 확인 |
| 3 | 통합 검증과 정책 drift 점검 | `mydocs/working/task_m040_44_stage3.md`, 필요 시 `mydocs/orders/20260510.md` | 전체 검색, symlink, diff 공백, status 확인 |

## Stage 1 - manual 중립성 정책 반영

### 산출물

신규:

- `mydocs/working/task_m040_44_stage1.md`

수정:

- `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- `document_structure_guide.md`의 `manual/` 역할 정의 근처에 manual 문서 중립성 정책을 추가한다.
- manual 본문에 둘 수 있는 내용을 반복 적용 가능한 원칙, 절차, 판단 기준, 짧은 entrypoint와 링크로 제한한다.
- manual 본문에서 분리해야 하는 내용을 특정 이슈/PR/stage 판단, 특정 release 검증 결과, 특정 migration handoff, 특정 장애/실패 기록으로 정리한다.
- 분리 위치는 본 저장소 구조에 맞게 `mydocs/working/`, `mydocs/report/`, `mydocs/tech/`, `mydocs/troubleshootings/`, `docs/releases/`, `docs/migrations/`로 안내한다.
- `mydocs/release/` 같은 현재 구조에 없는 경로와 macOS 앱 특화 예시는 넣지 않는다.
- 특정 사건 문서를 참조해야 할 때는 사건 내용을 manual 본문에 복제하지 않고 일반화한 판단 기준과 짧은 링크만 둔다는 기준을 추가한다.

### 검증

```bash
rg -n 'Manual 문서|manual|중립|특정 이슈|특정 PR|docs/releases|docs/migrations|mydocs/working|mydocs/report|mydocs/tech|mydocs/troubleshootings' templates/mydocs/manual/document_structure_guide.md
! rg -n 'mydocs/release|notarization|deprecation warning' templates/mydocs/manual/document_structure_guide.md
git diff --check
```

### 커밋

```text
Task #44 Stage 1: manual 문서 중립성 정책 반영
```

## Stage 2 - 관련 문서 정합성 보강

### 산출물

신규:

- `mydocs/working/task_m040_44_stage2.md`

수정:

- 필요 시 `README.md`
- 필요 시 `templates/mydocs/manual/task_workflow_guide.md`
- 필요 시 `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- README의 문서 구조 설명이 새 manual 중립성 정책과 충돌하지 않는지 확인한다.
- README에는 세부 정책을 길게 복제하지 않고, 필요한 경우 문서 구조 매뉴얼을 가리키는 짧은 문장 또는 링크만 보강한다.
- `task_workflow_guide.md`의 lifecycle, 문서 출력 형식, SKILL 호출 표시 안내가 새 정책과 중복되거나 모순되지 않는지 확인한다.
- 수행계획서에서 지적한 `AGENTS.md` 상세 정책 중복 방지 원칙을 다시 확인한다. 기본 방향은 `AGENTS.md`를 수정하지 않는 것이다.
- 관련 문서 수정이 필요 없으면 그 판단 근거를 Stage 2 보고서에 남기고 문서 본문 변경은 하지 않는다.

### 검증

```bash
rg -n 'document_structure_guide|manual/|문서 구조|docs/releases|docs/migrations|SKILL 호출 표시|lifecycle' README.md templates/mydocs/manual/task_workflow_guide.md templates/mydocs/manual/document_structure_guide.md
rg -n '문서 수정은 기존 내용을 먼저 읽고 필요한 부분만 수정|필수 참조 문서|document_structure_guide' AGENTS.md
git diff --check
```

### 커밋

```text
Task #44 Stage 2: 관련 문서 책임 경계 정합성 보강
```

## Stage 3 - 통합 검증과 정책 drift 점검

### 산출물

신규:

- `mydocs/working/task_m040_44_stage3.md`

수정:

- 필요 시 `mydocs/orders/20260510.md`
- 필요 시 Stage 1~2에서 발견한 문서 문구 보정

### 변경 내용

- 이번 task에서 변경된 manual 정책이 본 저장소의 문서 구조, release/migration 위치, symlink 정책과 충돌하지 않는지 통합 확인한다.
- `AGENTS.md`에 상세 정책이 중복되지 않았는지 확인한다.
- `mydocs/manual`, `mydocs/skills`, `mydocs/_templates` symlink가 유지되는지 확인한다.
- 단계 보고서에 실행한 검증 결과와 남은 리스크를 기록한다.
- 최종 보고서로 넘어가기 전 작업 tree 상태와 diff 공백 검사를 확인한다.

### 검증

```bash
rg -n 'manual|중립|특정 이슈|특정 PR|릴리즈|troubleshooting|migration|release|docs/releases|docs/migrations|mydocs/release' templates/mydocs/manual README.md AGENTS.md docs
test -L mydocs/manual
test -L mydocs/skills
test -L mydocs/_templates
git status --short
git diff --check
```

### 커밋

```text
Task #44 Stage 3: manual 중립성 정책 통합 검증
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- `mydocs/release/` 도입이 필요하다는 판단이 나오면 즉시 중단하고 작업지시자에게 범위 변경 승인을 요청한다.
- README 또는 `task_workflow_guide.md` 수정이 불필요하다고 판단하면, 그 이유를 Stage 2 보고서에 기록한다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m040_44_stage{N}.md`를 함께 묶는다.
- 문서 본문이 바뀌는 Stage는 해당 문서와 단계 보고서를 같은 커밋에 묶는다.
- 커밋 메시지는 `Task #44 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 승인 전에는 Stage 1 산출물을 만들거나 `document_structure_guide.md` 본문을 수정하지 않는다.

## 단계 의존성

- Stage 2는 Stage 1에서 manual 중립성 정책 위치와 본문 책임 경계가 확정된 뒤 진행한다.
- Stage 3은 Stage 2에서 README와 관련 manual 정합성 판단이 끝난 뒤 진행한다.
- 최종 결과보고서와 PR 게시는 Stage 3 승인 이후 `task-final-report` 절차로 진행한다.

## 위험과 대응

- **정책 자체의 비대화**: 중립성 정책이 장황해지면 목적을 해친다. Stage 1에서는 원칙, 분리 대상, 분리 위치, 링크 방식만 남긴다.
- **저장소 구조 불일치**: 원문 PR의 `mydocs/release/`를 그대로 가져오면 현재 구조와 맞지 않는다. `docs/releases/`와 `docs/migrations/`를 기준으로 일반화한다.
- **README와 manual 중복**: README는 사용자 진입점이므로 세부 정책을 복제하지 않는다. 필요한 경우 document structure guide 링크만 보강한다.
- **AGENTS.md 프롬프트 비대화**: 상세 정책을 매 턴 적재되는 `AGENTS.md`에 넣지 않는다. 기존 필수 참조 문서 인덱스가 충분한지 확인한다.
- **문서 변경 연쇄 확대**: manual 본문 변경이 Skill 호출 규칙이나 lifecycle 프로토콜까지 건드리는 방향으로 번지면 Stage 2에서 범위를 재확인하고 필요한 경우 작업지시자 승인을 다시 받는다.

## 승인 요청 사항

- 위 3단계 구현계획으로 Stage 1을 시작하는 것.
- Stage 1의 1차 수정 대상을 `templates/mydocs/manual/document_structure_guide.md`로 한정하는 것.
- README와 `task_workflow_guide.md`는 Stage 2에서 필요성을 확인한 뒤 최소 수정 또는 무수정 판단으로 처리하는 것.
- `AGENTS.md`에는 상세 정책을 추가하지 않는 것을 기본 방향으로 두는 것.
