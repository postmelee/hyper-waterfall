# task_m020_22_impl.md - README 상단 빠른 적용 안내 추가 구현계획서

수행계획서: [`task_m020_22.md`](task_m020_22.md)
GitHub Issue: [#22](https://github.com/postmelee/hyper-waterfall/issues/22)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | README 진입 문구 위치와 중복 범위 확정 | `mydocs/working/task_m020_22_stage1.md` | README 상단/기존 섹션/context grep, 충돌 표현 조사 |
| 2 | README 상단 빠른 적용 안내 반영 | `README.md`, `mydocs/working/task_m020_22_stage2.md` | README grep, README diff 수동 확인, `git diff --check` |
| 3 | 정합성 검증과 수용 기준 확인 | `mydocs/working/task_m020_22_stage3.md` | 이슈 검증 명령, 통합 diff/status 확인 |

## Stage 1 - README 진입 문구 위치와 중복 범위 확정

### 산출물

신규:

- `mydocs/working/task_m020_22_stage1.md`

수정:

- 없음. Stage 1은 조사 결과와 적용 방향을 단계 보고서에 기록한다.

### 변경 내용

- README 첫 화면 상단, 목차, `새 저장소에 빠르게 적용하기` 섹션의 역할을 비교한다.
- 상단 빠른 안내가 들어갈 위치를 확정한다.
- `docs/agent-entrypoint.md`, `docs/distribution-channels.md`, `docs/migrations/`, `templates/manifest.json` 기준과 충돌할 수 있는 표현을 점검한다.
- `install`, npm publish, GitHub Release/tag 확정처럼 실제 배포 상태보다 앞선 인상을 줄 표현을 배제한다.
- Stage 1에서는 README 본문을 변경하지 않는다.

### 검증

```bash
rg -n '빠르게 적용|agent-entrypoint|npx hyper-waterfall|GitHub Release|manifest|migration|새 저장소에 빠르게 적용하기' README.md docs/agent-entrypoint.md docs/distribution-channels.md docs/migrations templates/manifest.json
sed -n '1,120p' README.md
sed -n '270,310p' README.md
git diff --check
```

### 커밋

```text
Task #22 Stage 1: README 빠른 적용 안내 위치 조사
```

## Stage 2 - README 상단 빠른 적용 안내 반영

### 산출물

수정:

- `README.md`
- `mydocs/working/task_m020_22_stage2.md`

### 변경 내용

- README 첫 제목과 프로젝트 설명 직후, `적용하면 바로 달라지는 것` 이전에 3~5줄 수준의 빠른 적용 안내를 추가한다.
- 안내에는 AI에게 보낼 적용 프롬프트와 `docs/agent-entrypoint.md` 기준을 짧게 연결한다.
- npm CLI는 dry-run 또는 보조 채널로만 표현하고, canonical 기준인 GitHub Release/tag, `templates/manifest.json`, migration guide를 대체하지 않는다는 경계를 유지한다.
- 기존 `새 저장소에 빠르게 적용하기` 섹션과 역할이 겹치면 상단은 요약, 기존 섹션은 상세 안내로 남도록 최소 수정한다.

### 검증

```bash
rg -n '빠르게 적용|agent-entrypoint|npx hyper-waterfall|GitHub Release|manifest|migration|새 저장소에 빠르게 적용하기' README.md
sed -n '1,130p' README.md
sed -n '270,310p' README.md
git diff -- README.md
git diff --check
```

### 커밋

```text
Task #22 Stage 2: README 상단 빠른 적용 안내 추가
```

## Stage 3 - 정합성 검증과 수용 기준 확인

### 산출물

신규:

- `mydocs/working/task_m020_22_stage3.md`

수정:

- README 정합성 보강이 필요할 때만 `README.md`

### 변경 내용

- 이슈의 검증 기준을 실행하고 결과를 단계 보고서에 정리한다.
- README diff를 수동 확인해 첫 화면 안내, 기존 빠른 적용 섹션, canonical 기준 문구의 역할이 분리되었는지 확인한다.
- 수용 기준별 충족 여부와 잔여 리스크를 정리한다.
- 최종 보고서 작성 전 상태를 점검한다.

### 검증

```bash
rg -n '빠르게 적용|agent-entrypoint|npx hyper-waterfall|GitHub Release|manifest|migration' README.md
git diff --check
git status --short --branch
```

### 커밋

```text
Task #22 Stage 3: README 빠른 적용 안내 정합성 검증
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- README diff 수동 확인 결과를 Stage 2 또는 Stage 3 보고서에 남긴다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m020_22_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #22 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 승인 전에는 Stage 1 산출물을 만들지 않는다.

## 단계 의존성

- Stage 2는 Stage 1의 위치·중복 범위 조사 결과가 승인된 뒤 진행한다.
- Stage 3은 Stage 2의 README 반영과 검증이 끝난 뒤 진행한다.
- 최종 결과보고서와 PR 게시는 Stage 3 승인 이후 `task-final-report` 절차로 진행한다.

## 위험과 대응

- **상단 안내 과밀화**: 첫 화면 안내는 프롬프트와 기준 문서 연결만 담고, 상세 설명은 기존 섹션에 유지한다.
- **배포 상태 오인**: npm CLI는 dry-run 또는 판단 보조 채널로만 표현하고, publish나 release 생성 완료를 암시하지 않는다.
- **기준 문서 역할 약화**: `docs/agent-entrypoint.md`, GitHub Release/tag, manifest, migration guide가 적용 기준이라는 문맥을 유지한다.
- **문서 변경 범위 확대**: README 외 매뉴얼, SKILL, CLI 동작은 수정하지 않는다.

## 승인 요청 사항

- Stage 1~3 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Stage 1은 조사 보고만 수행하고 README 본문 변경은 Stage 2에서 진행하는 방향에 동의?
- 이번 task에서 README 외 매뉴얼, SKILL, CLI 동작, release/tag/npm publish는 수정하지 않는 범위에 동의?

승인되면 Stage 1 구현을 시작한다.
