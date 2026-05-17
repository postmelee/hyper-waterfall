# Task #57 구현계획서 - 신규 적용 시 manifest strict 범위 제한 명시

수행계획서: [`task_m040_57.md`](task_m040_57.md)
GitHub Issue: [#57](https://github.com/postmelee/hyper-waterfall/issues/57)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 현재 적용 절차와 문서 경계 점검 | `mydocs/working/task_m040_57_stage1.md` | 신규 적용, manifest, `/docs`, `mydocs/manual` 관련 현재 표현과 충돌 위험 확인 |
| 2 | strict manifest와 entrypoint 규칙 반영 | `docs/agent-entrypoint.md`, `templates/manifest.json`, `templates/mydocs/manual/document_structure_guide.md`, Stage 2 보고서 | manifest JSON 파싱, strict/forbidden 표현 확인, manifest 외 생성 금지 확인 |
| 3 | 문서 정합성 검증과 최종 보고 | `README.md` 필요 시 최소 보정, `mydocs/report/task_m040_57_report.md`, Stage 3 보고서 | `/docs` 역할 미규정 확인, README/매뉴얼/entrypoint/manifest 정합성 확인 |

## Stage 1 — 현재 적용 절차와 문서 경계 점검

### 산출물

신규:

- `mydocs/working/task_m040_57_stage1.md`

수정:

- `mydocs/orders/20260517.md`

### 변경 내용

- 현재 worktree가 `local/task57` 분리 worktree인지 확인한다.
- `docs/agent-entrypoint.md`, `templates/manifest.json`, `templates/mydocs/manual/document_structure_guide.md`, `README.md`에서 신규 적용, manifest, `/docs`, 제품 고유 산출물, `mydocs/manual` 관련 표현을 검색한다.
- `/docs`를 대상 저장소의 제품/사용자/배포 문서 위치로 규정하는 표현이 있는지 확인한다.
- `mydocs/manual`이 제품 아키텍처, API 계약, 로드맵을 받는 위치로 오해될 표현이 있는지 확인한다.
- Stage 2에서 수정할 정확한 문장 위치와 manifest 필드 후보를 Stage 1 보고서에 정리한다.
- Stage 1에서는 운영 문서 본문과 manifest를 수정하지 않는다.

### 검증

```bash
git status --short --branch
git worktree list
rg -n "신규 적용|manifest|docs/|mydocs/manual|아키텍처|로드맵|제품 문서|제품 고유|별도 task" docs/agent-entrypoint.md templates/manifest.json templates/mydocs/manual/document_structure_guide.md README.md
rg -n "docs/.*제품|제품/사용자/배포 문서|mydocs/manual.*아키텍처|mydocs/manual.*로드맵|mydocs/manual.*API" docs/agent-entrypoint.md templates/mydocs/manual/document_structure_guide.md README.md || true
git diff --check
```

수동 확인:

- `/docs`는 금지 예시나 프레임워크 저장소 내부 문서 경로로만 쓰이는지 구분한다.
- 대상 저장소의 일반 문서 구조를 Hyper-Waterfall이 정의하는 문구는 Stage 2 수정 후보에서 제외한다.
- 제품 고유 문서를 `mydocs/manual`에 넣도록 유도하는 문구는 추가하지 않는다.

### 커밋

```text
Task #57 Stage 1: 신규 적용 문서 경계 점검
```

## Stage 2 — strict manifest와 entrypoint 규칙 반영

### 산출물

신규:

- `mydocs/working/task_m040_57_stage2.md`

수정:

- `docs/agent-entrypoint.md`
- `templates/manifest.json`
- `templates/mydocs/manual/document_structure_guide.md`
- `mydocs/orders/20260517.md`

### 변경 내용

- `docs/agent-entrypoint.md`에 신규 적용 범위 제한 섹션을 추가하거나 기존 신규 적용 절차를 보강한다.
- 신규 적용 중 허용 대상은 manifest `files[]`, `.hyper-waterfall/version.json`, manifest가 정의한 symlink로 제한한다고 명시한다.
- manifest 외 파일/디렉터리는 생성하거나 수정하지 않는다는 원칙을 명시한다.
- 제품 코드, 제품 문서, 아키텍처 문서, 로드맵, API 계약, 예제, 스키마는 신규 적용 범위 밖이며 보류/별도 task 후보로만 기록한다고 명시한다.
- `docs/**`, `src/**`, `examples/**`, `schemas/**`, `package.json`, `tsconfig.json`은 적용 중 생성/수정 금지 예시로만 둔다.
- `/docs`의 역할을 대상 저장소에 정의하지 않는다.
- `templates/manifest.json`에는 기존 `files[]`와 update policy 구조를 유지하면서 additive 필드만 추가한다.
  - 후보 필드: `applicationMode`, `strictManifest`, `forbiddenTargetsOnAdoption`
  - 필드명은 Stage 1 점검 결과와 기존 manifest 문맥에 맞춰 확정한다.
- `templates/mydocs/manual/document_structure_guide.md`에는 lifecycle/신규 적용 설명이 strict 범위와 충돌하지 않게 짧게 보강한다.
- `mydocs/manual`이 제품 고유 문서의 강제 목적지가 아니라 반복 운영 기준 위치임을 유지한다.

### 검증

```bash
node -e "JSON.parse(require('fs').readFileSync('templates/manifest.json', 'utf8')); console.log('ok')"
rg -n "strict|manifest 외|생성/수정 금지|docs/|src/|examples/|schemas/|별도 task|제품 고유|forbidden|applicationMode|strictManifest" docs/agent-entrypoint.md templates/manifest.json templates/mydocs/manual/document_structure_guide.md
rg -n "docs/.*제품|제품/사용자/배포 문서|mydocs/manual.*아키텍처|mydocs/manual.*로드맵|mydocs/manual.*API" docs/agent-entrypoint.md templates/mydocs/manual/document_structure_guide.md README.md || true
git diff --check
```

수동 확인:

- `docs/**`가 금지 예시로만 쓰이고 대상 저장소의 제품 문서 위치로 정의되지 않았는지 확인한다.
- manifest 새 필드가 기존 `schemaVersion`, `frameworkVersion`, `files[]`, `updatePolicies` 의미를 바꾸지 않는 additive 변경인지 확인한다.
- 신규 적용 도중 제품 고유 산출물을 만들지 않고 보류/별도 task 후보로 기록하게 되어 있는지 확인한다.

### 커밋

```text
Task #57 Stage 2: 신규 적용 strict 범위 규칙 반영
```

## Stage 3 — 문서 정합성 검증과 최종 보고

### 산출물

신규:

- `mydocs/working/task_m040_57_stage3.md`
- `mydocs/report/task_m040_57_report.md`

수정:

- `README.md`는 신규 적용 설명 정합성에 필요한 경우만 수정
- `mydocs/orders/20260517.md`

### 변경 내용

- README의 적용 절차 설명이 Stage 2 변경과 충돌하는지 확인한다.
- README가 이미 `docs/agent-entrypoint.md`와 manifest 기준 적용을 충분히 안내하면 수정하지 않고 Stage 3 보고서에 근거를 남긴다.
- README 수정이 필요한 경우에는 strict 적용 범위 원칙을 짧게 반영하고, 대상 저장소의 `/docs` 의미를 정의하지 않는다.
- 전체 변경에서 `/docs` 역할 규정, `mydocs/manual` 오염, manifest JSON 오류, README/entrypoint/매뉴얼 설명 충돌을 재검토한다.
- 최종 보고서에 수행 내용, 검증 결과, 의도적으로 하지 않은 항목, 후속 후보를 정리한다.
- 오늘할일 상태를 완료로 갱신한다.

### 검증

```bash
node -e "JSON.parse(require('fs').readFileSync('templates/manifest.json', 'utf8')); console.log('ok')"
rg -n "docs/.*제품|제품/사용자/배포 문서|mydocs/manual.*아키텍처|mydocs/manual.*로드맵|mydocs/manual.*API" docs/agent-entrypoint.md templates/mydocs/manual/document_structure_guide.md README.md || true
rg -n "strict|forbidden|manifest|신규 적용|제품 고유|별도 task|생성/수정 금지" docs/agent-entrypoint.md templates/manifest.json templates/mydocs/manual/document_structure_guide.md README.md mydocs/report/task_m040_57_report.md
git diff --check
git status --short --branch
```

수동 확인:

- #57 이슈의 수용 기준이 최종 보고서에 모두 대응하는지 확인한다.
- `/docs`가 의미 정의 없이 금지 예시 또는 프레임워크 내부 문서 경로로만 쓰이는지 확인한다.
- README 수정이 없으면 수정하지 않은 이유가 Stage 3 보고서나 최종 보고서에 남아 있는지 확인한다.

### 커밋

```text
Task #57 Stage 3: 신규 적용 strict 범위 정합성 검증
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- `|| true`가 붙은 검색 명령은 "금지 문구가 없음"이 정상 결과일 수 있으므로, 출력 유무를 Stage 보고서에 수동 판정으로 기록한다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m040_57_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #57 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 커밋은 `Task #57: 구현 계획서 작성`으로 분리한다.

## 단계 의존성

- Stage 2는 Stage 1 보고서 승인 후 진행한다.
- Stage 3은 Stage 2 검증과 보고서 승인 후 진행한다.
- README 수정 여부는 Stage 2 결과와 Stage 3 정합성 점검 결과를 보고 결정한다.

## 위험과 대응

- **대상 저장소 구조 선점**: `/docs`를 설명하면서 대상 저장소 일반 문서 구조를 규정할 수 있다. 경로 의미 정의는 하지 않고 신규 적용 금지 예시로만 둔다.
- **manual 오염**: 제품 아키텍처, API 계약, 로드맵을 `mydocs/manual`로 보내면 운영 매뉴얼 경계가 흐려진다. 제품 고유 산출물은 별도 task 후보로 분리한다.
- **manifest 호환성**: strict 필드 추가가 기존 도구나 문서와 충돌할 수 있다. 기존 필드는 유지하고 additive 필드만 추가하며 JSON 파싱으로 검증한다.
- **README 과수정**: M040 #41의 최종 문서 정합성 감사 범위와 충돌할 수 있다. README는 충돌이 확인된 경우에만 최소 수정한다.
- **문서 규칙만 있고 실행 강제가 없음**: 이번 task는 CLI 구현을 제외한다. 필요하면 최종 보고서에 CLI/doctor 후속 후보를 기록한다.

## 승인 요청 사항

- Stage 1-3 분할과 각 Stage 산출물에 동의?
- Stage 1을 read-only 점검과 단계 보고서 작성으로 진행하는 데 동의?
- Stage 2에서 manifest 필드는 기존 구조를 깨지 않는 additive 방식으로만 추가하는 데 동의?
- Stage 3에서 README는 필요한 경우만 최소 수정하고, 불필요하면 수정하지 않는 데 동의?

승인되면 Stage 1을 시작해 현재 문서 경계를 점검하고 `mydocs/working/task_m040_57_stage1.md`를 작성한다.
