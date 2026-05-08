# task_m020_9_impl.md - 프로토콜 기반 Hyper-Waterfall 버전 업데이트 PR 워크플로우 정착 구현계획서

수행계획서: [`task_m020_9.md`](task_m020_9.md)
GitHub Issue: [#9](https://github.com/postmelee/hyper-waterfall/issues/9)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | Hyper-Waterfall 버전 업데이트 PR 워크플로우 경계와 명명 규칙 정의 | `docs/agent-entrypoint.md`, `git_workflow_guide.md`, `task_workflow_guide.md` | 생성 조건, 브랜치, 커밋, PR 제목, task/release/Hyper-Waterfall 버전 업데이트 PR 경계 grep |
| 2 | manifest diff와 migration 기반 PR 본문 구조 정의 | `docs/agent-entrypoint.md`, `docs/migrations/*`, `document_structure_guide.md`, PR 템플릿 검토 | 변경 분류, PR 본문 필드, 검증 한계, conflict 표기 grep |
| 3 | README/migration guide 연결과 CLI 기준 정리 | `README.md`, `docs/migrations/*`, 관련 Manual | README 짧은 안내, Hyper-Waterfall 버전 업데이트 PR/CLI 연결, 폐기된 예정 구현 표현 부재 확인 |

## Stage 1 - Hyper-Waterfall 버전 업데이트 PR 워크플로우 경계와 명명 규칙 정의

### 산출물

수정:

- `docs/agent-entrypoint.md`
- `templates/mydocs/manual/git_workflow_guide.md`
- `templates/mydocs/manual/task_workflow_guide.md`

### 변경 내용

- Hyper-Waterfall 버전 업데이트 PR이 #8의 기존 업데이트 판단 결과 승인 후 생성되는 후속 작업임을 명시한다.
- 일반 task PR, release PR, Hyper-Waterfall 버전 업데이트 PR의 목적과 흐름을 구분한다.
- Hyper-Waterfall 버전 업데이트 PR 브랜치명, 커밋 메시지, PR 제목 규칙을 정한다.
- Hyper-Waterfall 버전 업데이트 PR도 사람이 리뷰할 수 있는 일반 PR로 남기되, 입력은 lifecycle 판단 결과와 migration guide임을 명시한다.
- 브랜치 규칙은 후속 CLI가 반복 실행할 수 있도록 충돌 가능성이 낮은 이름으로 정의한다.

### 검증

```bash
grep -nE 'Hyper-Waterfall 버전 업데이트 PR|브랜치|커밋|PR 제목|release PR|task PR' docs/agent-entrypoint.md templates/mydocs/manual/*.md
grep -nE 'lifecycle 판단 결과|기존 업데이트 판단 결과|migration guide|manifest diff' docs/agent-entrypoint.md templates/mydocs/manual/*.md
git diff --check
```

### 커밋

```text
Task #9 Stage 1: Hyper-Waterfall 버전 업데이트 PR 경계와 명명 규칙 정의
```

## Stage 2 - manifest diff와 migration 기반 PR 본문 구조 정의

### 산출물

수정:

- `docs/agent-entrypoint.md`
- `docs/migrations/README.md`
- `docs/migrations/v0.1.0-to-v0.2.0.md`
- `templates/mydocs/manual/document_structure_guide.md`
- `templates/.github/pull_request_template.md` (필요할 때만 최소 보강)

### 변경 내용

- #8의 기존 업데이트 판단 결과 필드를 Hyper-Waterfall 버전 업데이트 PR 본문 항목으로 옮기는 매핑을 정의한다.
- `manifest diff`를 추가, 변경, 삭제, symlink, 보존, 충돌 후보로 읽는 기준을 정리한다.
- 변경 분류를 `자동 적용 가능`, `수동 확인 필요`, `conflict`, `보류`로 고정한다.
- 사용자 수정 파일은 자동 적용 항목에서 제외하고 PR 본문에 수동 확인 또는 conflict로 표기하도록 정한다.
- 기존 PR 템플릿의 `요약`, `변경 내역`, `검증`, `검증 한계`, `남은 리스크` 구조를 우선 재사용한다.
- 별도 Hyper-Waterfall 버전 업데이트 PR 전용 템플릿이 필요한지 검토하되, 필요하지 않다면 Manual/agent entrypoint의 작성 규칙으로 충분하다는 판단을 문서화한다.

### 검증

```bash
grep -nE 'manifest diff|자동 적용 가능|수동 확인|conflict|보류|검증 한계|PR 본문' docs/agent-entrypoint.md docs/migrations/*.md templates/mydocs/manual/*.md templates/.github/pull_request_template.md
grep -nE '요약|변경 내역|자동 검증|수동/시나리오 검증|CI/원격 검증|남은 리스크' templates/.github/pull_request_template.md
git diff --check
```

### 커밋

```text
Task #9 Stage 2: Hyper-Waterfall 버전 업데이트 PR 본문 구조 정의
```

## Stage 3 - README/migration guide 연결과 CLI 기준 정리

### 산출물

수정:

- `README.md`
- `docs/migrations/README.md`
- `docs/migrations/v0.1.0-to-v0.2.0.md`
- `templates/mydocs/manual/git_workflow_guide.md`
- `templates/mydocs/manual/task_workflow_guide.md`
- `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- README에는 기존 적용 저장소 업데이트가 판단 결과 승인 후 Hyper-Waterfall 버전 업데이트 PR로 진행된다는 짧은 안내만 둔다.
- migration guide가 Hyper-Waterfall 버전 업데이트 PR 본문과 CLI `update`/`doctor` 출력의 근거 문서임을 보강한다.
- #10 CLI가 재사용할 출력 필드와 검증 기준을 정리한다.
- Stage 1~2의 규칙이 README, migration guide, Manual에서 같은 용어로 연결되는지 확인한다.
- 폐기된 예정 구현 방식처럼 보이는 표현이 새 문서에 남지 않도록 중립 표현으로 정리한다.

### 검증

```bash
grep -nE 'Hyper-Waterfall 버전 업데이트 PR|migration|version|manifest diff|CLI|doctor|update' README.md docs/migrations/*.md templates/mydocs/manual/*.md
rg -n 'Skill workflow|Skill이 아직 없을 때|폐기된 예정 구현|별도 유지보수 절차명' README.md docs templates/mydocs/manual templates/mydocs/skills
git diff --check
```

### 커밋

```text
Task #9 Stage 3: README와 migration guide Hyper-Waterfall 버전 업데이트 PR 연결
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m020_9_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #9 Stage {N}: {핵심 내용 요약}` 형식을 따른다.

## 단계 의존성

- Stage 2는 Stage 1에서 Hyper-Waterfall 버전 업데이트 PR의 경계와 명명 규칙이 확정된 뒤 진행한다.
- Stage 3은 Stage 2에서 PR 본문 구조와 변경 분류 기준이 확정된 뒤 README와 migration guide를 연결한다.
- #10 CLI는 Stage 2~3의 Hyper-Waterfall 버전 업데이트 PR 본문 구조와 출력 필드를 `update`/`doctor` 명령 출력 기준으로 참고한다.

## 위험과 대응

- **PR 템플릿 중복**: Stage 2에서 기존 PR 템플릿으로 충분한지 먼저 판단하고, 별도 템플릿 추가는 필요성이 명확할 때만 제안한다.
- **자동 적용 과신**: 사용자 수정 파일은 자동 적용에서 제외하고 수동 확인 또는 conflict로 분류한다.
- **README 과다 설명**: README에는 짧은 Hyper-Waterfall 버전 업데이트 PR 흐름만 남기고 상세 규칙은 agent entrypoint, migration guide, Manual에 둔다.
- **후속 CLI 범위 침범**: 이번 task는 CLI가 사용할 출력 필드와 검증 기준까지만 정의하고 구현은 #10에 남긴다.
- **이전 접근 표현 재유입**: PR 본문과 문서에서 특정 폐기된 구현 방식처럼 읽히는 표현을 피하고, lifecycle/Hyper-Waterfall 버전 업데이트 PR 워크플로우의 현재 의사결정만 설명한다.

## 승인 요청 사항

- Stage 1~3 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Hyper-Waterfall 버전 업데이트 PR 본문은 기존 PR 템플릿 재사용을 우선 검토하고, 필요할 때만 최소 보강하는 방향에 동의?
- 변경 분류를 `자동 적용 가능`, `수동 확인 필요`, `conflict`, `보류`로 고정하는 방향에 동의?

승인되면 Stage 1 구현을 시작한다.
