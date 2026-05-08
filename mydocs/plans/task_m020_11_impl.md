# task_m020_11_impl.md - 추가 배포 채널 확장안 검토 구현계획서

수행계획서: [`task_m020_11.md`](task_m020_11.md)
GitHub Issue: [#11](https://github.com/postmelee/hyper-waterfall/issues/11)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 기준과 비교 축 확정 | `mydocs/working/task_m020_11_stage1.md` | 기존 배포 기준 문서 grep, 비교 축 정합성, `git diff --check` |
| 2 | 추가 배포 채널 전략 문서 작성 | `docs/distribution-channels.md`, `mydocs/working/task_m020_11_stage2.md` | 채널별 키워드, 목적/비목표/비용/우선순위 확인, `git diff --check` |
| 3 | README 연결과 전략 검증 정리 | `README.md`, `mydocs/working/task_m020_11_stage3.md` | README 링크와 프로토콜 실행 수단 경계 확인, 통합 grep, `git diff --check` |

## Stage 1 - 기준과 비교 축 확정

### 산출물

신규:

- `mydocs/working/task_m020_11_stage1.md`

수정:

- 없음

### 변경 내용

- #7~#10 산출물과 현재 문서를 읽어 GitHub Release/tag, `templates/manifest.json`, migration guide, npm CLI의 책임 경계를 요약한다.
- 추가 배포 채널 비교 축을 다음 항목으로 고정한다.
  - 사용자 문제
  - 배포 단위
  - canonical protocol과의 관계
  - 구현 난이도
  - 운영 비용
  - 검증 부담
  - 보류 조건
  - 후속 마일스톤 후보
- 전략 문서에서 반드시 확인할 키워드와 수용 기준을 Stage 1 보고서에 남긴다.
- Stage 1은 소스 문서 변경 없이 분석과 단계 보고서 작성만 수행한다.

### 검증

```bash
rg -n 'GitHub Release|manifest|migration|npm CLI|canonical|Homebrew|Docker|plugin' README.md docs templates/mydocs/manual mydocs/report/task_m020_10_report.md
rg -n 'Homebrew|Docker|Codex plugin|Claude plugin|npm|GitHub Release|manifest|migration' mydocs/plans/task_m020_11.md mydocs/plans/task_m020_11_impl.md
git diff --check
```

### 커밋

```text
Task #11 Stage 1: 배포 채널 비교 기준 확정
```

## Stage 2 - 추가 배포 채널 전략 문서 작성

### 산출물

신규:

- `docs/distribution-channels.md`
- `mydocs/working/task_m020_11_stage2.md`

수정:

- 없음

### 변경 내용

- `docs/distribution-channels.md`를 신설해 추가 배포 채널 전략을 정리한다.
- 문서에는 최소한 다음 섹션을 둔다.
  - 목적과 원칙
  - canonical 배포 단위
  - 채널별 비교
  - 채널별 세부 판단
  - 구현 우선순위
  - 후속 마일스톤 후보
  - 보류 항목과 리스크
  - 검증 기준
- GitHub Release/tag, npm, Homebrew, Docker, Codex plugin, Claude plugin의 목적과 비목표를 비교한다.
- Homebrew와 Docker는 npm CLI 이후 후보로 평가하되, 실제 formula/image 구현은 제외한다.
- Codex/Claude plugin은 tool-specific packaging의 가치와 lock-in, 유지보수 비용을 함께 적고 보류 또는 검증 선행 후보로 둔다.
- 모든 추가 채널은 canonical protocol을 실행하거나 발견하기 쉽게 하는 수단이며, canonical 기준을 대체하지 않는다고 명시한다.

### 검증

```bash
test -f docs/distribution-channels.md
rg -n 'Homebrew|Docker|Codex plugin|Claude plugin|npm|GitHub Release|manifest|migration|canonical' docs/distribution-channels.md
rg -n '목적|비목표|사용자|운영 비용|우선순위|후속 마일스톤|보류|프로토콜 실행 수단' docs/distribution-channels.md
git diff --check
```

### 커밋

```text
Task #11 Stage 2: 추가 배포 채널 전략 문서 작성
```

## Stage 3 - README 연결과 전략 검증 정리

### 산출물

신규:

- `mydocs/working/task_m020_11_stage3.md`

수정:

- `README.md`

### 변경 내용

- README의 배포·업데이트 안내 주변에 `docs/distribution-channels.md` 링크를 추가한다.
- README에는 상세 비교표를 넣지 않고, GitHub Release/tag + manifest + migration guide가 canonical 기준이며 추가 채널은 프로토콜 실행 수단이라는 경계만 짧게 둔다.
- 전략 문서와 README가 이슈 #11의 수용 기준을 충족하는지 통합 검증한다.
- Stage 3 보고서에 검증 결과와 남은 리스크를 남긴다.

### 검증

```bash
rg -n '배포 채널|프로토콜 실행 수단|GitHub Release|manifest|npm|Homebrew|Docker|Codex|Claude' README.md docs/distribution-channels.md
rg -n '우선순위|후속 마일스톤|보류|비목표|운영 비용' docs/distribution-channels.md
git diff --check
```

### 커밋

```text
Task #11 Stage 3: README 배포 채널 전략 연결
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- Stage 완료 보고서는 해당 Stage 산출물과 함께 커밋한다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m020_11_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #11 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서와 오늘할일 완료 처리는 `task-final-report` 단계에서 별도 커밋한다.

## 단계 의존성

- Stage 2는 Stage 1에서 canonical 기준과 비교 축이 확정된 뒤 진행한다.
- Stage 3은 Stage 2의 전략 문서 초안이 확정된 뒤 README를 연결한다.
- 모든 Stage는 작업지시자 승인 없이 다음 Stage로 넘어가지 않는다.

## 위험과 대응

- **canonical 기준 혼선**: 추가 채널이 배포 원천처럼 보이지 않도록 전략 문서와 README 모두 GitHub Release/tag + manifest + migration guide를 기준으로 명시한다.
- **문서 범위 과확장**: 실제 formula, image, plugin packaging 명령은 구현하지 않고 후보와 보류 조건만 적는다.
- **README 비대화**: 상세 비교는 전략 문서로 분리하고 README에는 링크와 경계 설명만 둔다.
- **도구별 plugin 사양 불확실성**: Codex/Claude plugin은 구현 명세가 아니라 실험 후보와 검증 질문으로 표현한다.

## 승인 요청 사항

- 위 3단계 Stage 분할, 산출물, 검증 명령, 커밋 메시지로 Stage 1을 시작해도 되는지 승인 요청한다.
