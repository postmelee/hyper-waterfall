# Task M040 #60 구현 계획서

수행계획서: [`task_m040_60.md`](task_m040_60.md)
GitHub Issue: [#60](https://github.com/postmelee/hyper-waterfall/issues/60)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 문서 구조 정책 정리 | `templates/mydocs/manual/document_structure_guide.md` | 공식 문서 루트와 `mydocs/` 경계 문구 확인, manifest 자동 생성 정책 유지 확인 |
| 2 | 템플릿과 에이전트 진입 규칙 보강 | `templates/mydocs/_templates/*.md`, `docs/agent-entrypoint.md`, `templates/AGENTS.md`, `templates/CLAUDE.md` | 문서 위치 판단 항목과 신규 적용 guardrail 확인 |
| 3 | README 정합성 및 통합 검증 | `README.md`, 최종 보고서 | README/매뉴얼/템플릿 정합성, manifest 비변경, 최종 검증 |

## Stage 1 — 문서 구조 정책 정리

### 산출물

신규:

- `mydocs/working/task_m040_60_stage1.md`

수정:

- `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- `mydocs/`가 작업 기억 체계라는 기존 설명을 유지하면서, 대상 프로젝트의 공식 문서 루트는 Hyper-Waterfall이 고정하지 않는다는 정책을 추가한다.
- 공식 문서 루트 후보를 `docs/`, `specs/`, `site/`, `website/`, `adr/`, `book/`, `wiki/`처럼 예시로만 제시하고 기본값으로 강제하지 않는다.
- 제품/사용자/기여자/외부 통합/API/아키텍처/로드맵 문서를 만들거나 옮기는 task는 수행계획서의 문서 위치 판단을 통해 승인받도록 명시한다.
- `manual/` 설명을 "사용자/개발자 문서"에서 Hyper-Waterfall 운영 절차, 에이전트 규칙, 반복 적용되는 작업 기준으로 좁힌다.
- `tech/` 설명에는 조사, 대안 비교, 설계 판단 근거, 아직 공식화되지 않은 초안의 성격을 명확히 한다.
- 신규 적용 중 `docs/**` 등 manifest 외 경로를 만들지 않는 정책과 모순되지 않게 문장을 정리한다.

### 검증

```bash
rg -n "사용자/개발자 문서|공식 문서|문서 위치|mydocs/manual|mydocs/tech" templates/mydocs/manual/document_structure_guide.md
rg -n "docs/\\*\\*|manifest 외|제품 문서|공식 문서 루트" templates/mydocs/manual/document_structure_guide.md
git diff --check
```

### 커밋

```text
Task #60 Stage 1: 문서 위치 정책 정리
```

## Stage 2 — 템플릿과 에이전트 진입 규칙 보강

### 산출물

신규:

- `mydocs/working/task_m040_60_stage2.md`

수정:

- `templates/mydocs/_templates/task_plan.md`
- `templates/mydocs/_templates/task_impl_plan.md`
- `templates/mydocs/_templates/final_report.md`
- `docs/agent-entrypoint.md`
- `templates/AGENTS.md`
- `templates/CLAUDE.md`

### 변경 내용

- `task_plan.md`에 "문서 위치 판단" 섹션을 추가한다. 문서 생성/수정이 있는 task에서 파일, 분류, 대상 독자, 선택 위치, 대안 위치, 선택 이유를 짧은 표로 기록하게 한다.
- `task_impl_plan.md`에 승인된 문서 위치 판단과 Stage 산출물이 일치하는지 확인하는 항목을 추가한다.
- `final_report.md`에 문서 위치 검증 항목을 추가해 계획서의 위치 판단과 실제 산출물 위치가 일치하는지 보고하게 한다.
- `docs/agent-entrypoint.md`에 신규 적용 단계에서는 공식 문서 루트를 선택하거나 생성하지 않고 별도 task 후보로만 기록한다는 문구를 보강한다.
- `templates/AGENTS.md`와 `templates/CLAUDE.md`의 핵심 강제 규칙에 제품/사용자/API/아키텍처/로드맵 문서 생성 시 문서 위치 판단을 먼저 승인받도록 추가한다.
- `mydocs/manual`을 대상 프로젝트 제품 문서 위치로 쓰지 않는다는 규칙을 짧게 추가한다.

### 검증

```bash
rg -n "문서 위치|공식 문서|docs/|specs/|site/|website/|adr/" templates/mydocs/_templates docs/agent-entrypoint.md templates/AGENTS.md templates/CLAUDE.md
rg -n "docs/|specs/|site/|website/|adr/" templates/manifest.json
git diff --check
```

### 커밋

```text
Task #60 Stage 2: 문서 위치 판단 템플릿 보강
```

## Stage 3 — README 정합성 및 통합 검증

### 산출물

신규:

- `mydocs/working/task_m040_60_stage3.md`
- `mydocs/report/task_m040_60_report.md`

수정:

- `README.md`
- `mydocs/orders/20260517.md`

### 변경 내용

- README의 문서 구조 설명에 Hyper-Waterfall이 제공하는 것은 `mydocs/` 작업 기억 체계이며, 대상 프로젝트 공식 문서 루트 이름은 강제하지 않는다는 요약을 추가한다.
- README에서 `manual/`과 `tech/`의 역할 설명이 문서 구조 매뉴얼과 모순되지 않게 정리한다.
- `docs/`가 신규 적용 manifest에 포함되지 않는다는 정책을 README와 진입 문서가 충돌 없이 설명하는지 확인한다.
- 최종 보고서에 변경 파일, 문서 위치 정책 결과, 검증 결과, 남은 리스크를 기록한다.
- 오늘할일 #60 항목을 최종 보고서 작성 후 상태에 맞게 갱신한다.

### 검증

```bash
rg -n "문서 위치|공식 문서|mydocs/|docs/" README.md templates/mydocs/manual/document_structure_guide.md templates/mydocs/_templates docs/agent-entrypoint.md templates/AGENTS.md templates/CLAUDE.md
git diff --check
git status --short
```

### 커밋

```text
Task #60 Stage 3: README 정합성과 최종 보고서 작성
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- `templates/manifest.json`에는 공식 문서 루트 자동 생성 항목을 추가하지 않는다.
- `docs/`, `specs/`, `site/`, `website/`, `adr/`는 예시 또는 대상 프로젝트 선택 후보로만 언급하고 기본값으로 강제하지 않는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m040_60_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #60 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 작성 커밋은 별도 준비 커밋으로 `Task #60: 구현 계획서 작성`을 사용한다.

## 단계 의존성

- Stage 2는 Stage 1에서 `document_structure_guide.md`의 문서 위치 정책이 확정된 후 진행한다.
- Stage 3은 Stage 2의 템플릿과 에이전트 진입 규칙이 확정된 후 README 요약을 맞춘다.
- 최종 보고서는 Stage 1~3 검증 결과를 모두 반영한 뒤 작성한다.

## 위험과 대응

- **공식 문서 루트 기본값 오인**: `docs/`를 예시로 언급하더라도 기본값처럼 읽힐 수 있다. 모든 설명에서 "대상 프로젝트가 명시적으로 선택"한다는 문장을 붙인다.
- **적용 단계 guardrail 약화**: 제품 문서를 별도 task에서 만들 수 있다고 쓰면서 신규 적용 중 생성 금지가 약해질 수 있다. `agent-entrypoint`와 매뉴얼에 신규 적용 중 금지를 반복 확인한다.
- **템플릿 작성 부담 증가**: 문서 위치 판단 표가 모든 task에 부담이 될 수 있다. 문서 생성/수정이 있는 경우에만 채우고, 없으면 "해당 없음"으로 적을 수 있게 한다.
- **README와 매뉴얼 중복**: README는 짧은 요약과 링크만 두고, 상세 기준은 `document_structure_guide.md`에 둔다.

## 승인 요청 사항

- Stage 1~3 분할과 각 Stage 산출물
- 문서 위치 판단을 수행계획서/구현계획서/최종보고서 템플릿에 반영하는 방식
- `docs/` 또는 다른 공식 문서 루트를 manifest에 추가하지 않는 검증 기준
- `mydocs/manual`을 Hyper-Waterfall 운영 절차 위치로 좁히는 변경 방식
