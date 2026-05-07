# task_m020_8_impl.md - 프레임워크 설치·업데이트 lifecycle 프로토콜 정리 구현계획서

수행계획서: [`task_m020_8.md`](task_m020_8.md)
GitHub Issue: [#8](https://github.com/postmelee/hyper-waterfall/issues/8)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | lifecycle 경계와 기존 표현 정리 | `docs/agent-entrypoint.md`, `task_workflow_guide.md`, `document_structure_guide.md` | 오래된 후속 Skill 표현 제거, lifecycle/core Skill 경계 grep, `git diff --check` |
| 2 | 신규 적용/기존 업데이트 판단 결과 형식 정의 | `docs/agent-entrypoint.md`, 관련 Manual | 판단 결과/checklist, manifest/version/migration 필드 grep, 신규 Skill 폴더 부재 확인 |
| 3 | README와 migration guide 연결 보정 | `README.md`, `docs/migrations/*`, 관련 Manual | README core Skill 표 확인, migration/update PR/CLI 연결 grep, `git diff --check` |

## Stage 1 - lifecycle 경계와 기존 표현 정리

### 산출물

수정:

- `docs/agent-entrypoint.md`
- `templates/mydocs/manual/task_workflow_guide.md`
- `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- 설치·업데이트를 core task workflow와 다른 framework lifecycle 프로토콜로 설명한다.
- `task_workflow_guide.md`의 "후속 Skill" 중심 표현을 제거하고, core Skill은 타스크 진행에 직접 쓰이는 Skill이라는 경계를 명시한다.
- `docs/agent-entrypoint.md`에서 특정 설치/업데이트 Skill workflow 예정 문구를 제거하고, agent entrypoint가 lifecycle 진입점임을 명시한다.
- `document_structure_guide.md`에서 `.hyper-waterfall/version.json`, manifest, migration guide가 lifecycle 상태와 판단 기준이라는 설명을 보강한다.
- 이 Stage에서는 README나 migration guide의 세부 연결은 최소화하고, 기존 표현 정리와 경계 확정에 집중한다.

### 검증

```bash
rg -n 'framework-install|framework-update|후속 Skill|Skill workflow|전담 Skill|Skill이 아직 없을 때' README.md docs templates/mydocs/manual templates/mydocs/skills
grep -nE 'lifecycle|core Skill|manifest|version|migration' docs/agent-entrypoint.md templates/mydocs/manual/task_workflow_guide.md templates/mydocs/manual/document_structure_guide.md
git diff --check
```

### 커밋

```text
Task #8 Stage 1: lifecycle 경계와 기존 표현 정리
```

## Stage 2 - 신규 적용/기존 업데이트 판단 결과 형식 정의

### 산출물

수정:

- `docs/agent-entrypoint.md`
- `templates/mydocs/manual/task_workflow_guide.md`
- `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- 신규 적용 판단 결과 형식을 정의한다.
  - 대상 저장소
  - 목표 release/tag
  - manifest 기준 적용 후보
  - 기존 파일 충돌 가능성
  - `.hyper-waterfall/version.json` 생성 계획
  - placeholder 확인 항목
  - 작업지시자 승인 요청
- 기존 업데이트 판단 결과 형식을 정의한다.
  - 현재 version
  - 목표 release/tag
  - migration guide
  - manifest diff 요약
  - 자동 적용 가능 항목
  - 수동 확인 필요 항목
  - conflict 항목
  - update PR 후보
- 후속 #9 update PR 워크플로우가 위 판단 결과를 PR 본문으로 옮길 수 있도록 필드명을 문서에 고정한다.
- 설치·업데이트 전용 Skill 폴더를 만들지 않고 문서 프로토콜만 정리한다.

### 검증

```bash
grep -nE '판단 결과|체크리스트|대상 저장소|목표 release|현재 version|manifest diff|자동 적용 가능|수동 확인|conflict|update PR 후보' docs/agent-entrypoint.md templates/mydocs/manual/*.md
test ! -e templates/mydocs/skills/framework-install
test ! -e templates/mydocs/skills/framework-update
find templates/mydocs/skills -maxdepth 2 -name SKILL.md | sort
git diff --check
```

### 커밋

```text
Task #8 Stage 2: lifecycle 판단 결과 형식 정의
```

## Stage 3 - README와 migration guide 연결 보정

### 산출물

수정:

- `README.md`
- `docs/migrations/README.md`
- `docs/migrations/v0.1.0-to-v0.2.0.md`
- `templates/mydocs/manual/task_workflow_guide.md`
- `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- README의 설치/업데이트 설명은 짧은 진입 안내 수준으로 유지한다.
- README 핵심 Skill 표는 하이퍼-워터폴 타스크 진행 Skill만 포함함을 확인한다.
- migration guide의 후속 작업 표현을 lifecycle protocol, update PR workflow, npm CLI 흐름과 일관되게 보정한다.
- #9가 update PR 워크플로우를 설계할 때 참조할 문서 위치를 명시한다.
- `templates/manifest.json`은 이미 `templates/mydocs/skills` directory 항목을 포함하므로, 이번 task에서 신규 Skill 항목을 추가하지 않는다.

### 검증

```bash
grep -nE 'lifecycle|update PR|manifest diff|migration|version|CLI' README.md docs/migrations/*.md templates/mydocs/manual/*.md
rg -n 'framework-install|framework-update|후속 Skill|Skill workflow|Skill이 아직 없을 때' README.md docs templates/mydocs/manual templates/mydocs/skills
test ! -e templates/mydocs/skills/framework-install
test ! -e templates/mydocs/skills/framework-update
find templates/mydocs/skills -maxdepth 2 -name SKILL.md | sort
git diff --check
```

### 커밋

```text
Task #8 Stage 3: README와 migration guide lifecycle 연결
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m020_8_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #8 Stage {N}: {핵심 내용 요약}` 형식을 따른다.

## 단계 의존성

- Stage 2는 Stage 1에서 lifecycle/core Skill 경계가 확정된 뒤 진행한다.
- Stage 3은 Stage 2에서 판단 결과 형식이 확정된 뒤 README와 migration guide를 연결한다.
- #9 update PR 워크플로우는 Stage 2~3의 판단 결과 형식과 migration guide 연결을 입력으로 삼는다.
- #10 npm CLI는 신규 적용/기존 업데이트 판단 결과 형식을 `init/update/doctor` 출력 기준으로 참고한다.

## 위험과 대응

- **README 과다 설명**: README에는 짧은 진입 안내만 남기고, 상세 판단 절차는 agent entrypoint와 Manual에 둔다.
- **core Skill 경계 흐림**: 설치·업데이트 전용 Skill이나 core Skill 표 항목을 추가하지 않는다.
- **후속 표현 누락**: `rg`로 특정 예정 Skill 표현을 확인하고, 남은 표현이 의도된 역사적 문맥인지 잘못된 안내인지 구분한다.
- **후속 작업과 범위 충돌**: update PR의 상세 workflow는 #9, CLI 구현은 #10에 남긴다.

## 승인 요청 사항

- Stage 1~3 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- 이번 task에서 신규 Skill 파일을 만들지 않고 lifecycle 프로토콜 문서만 정리하는 방향에 동의?
- #9와 #10이 재사용할 판단 결과 형식을 Stage 2에서 최소 구조로 고정하는 방향에 동의?

승인되면 Stage 1 구현을 시작한다.
