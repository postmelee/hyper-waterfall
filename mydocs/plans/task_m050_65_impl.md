# Task M050 #65 구현 계획서

수행계획서: [`task_m050_65.md`](task_m050_65.md)
GitHub Issue: [#65](https://github.com/postmelee/hyper-waterfall/issues/65)
마일스톤: M050

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 언어 고정 문구 inventory | `mydocs/tech/task_m050_65_language_inventory.md`, `mydocs/working/task_m050_65_stage1.md` | 한국어 고정 문구, locale 관련 문구, placeholder 위치 확인 |
| 2 | locale 정책 문서 작성 | `docs/localization.md`, `mydocs/working/task_m050_65_stage2.md` | 지원 locale, fallback, canonical, placeholder, 승인 게이트 기준 확인 |
| 3 | 후속 이슈 경계와 수용 기준 정렬 | `docs/localization.md`, inventory 보강, `mydocs/working/task_m050_65_stage3.md` | #65~#71 이슈 범위와 정책 문서 정합성 확인 |

## 문서 위치 확인

수행계획서의 "문서 위치 판단"과 실제 Stage 산출물 경로는 아래처럼 일치한다.

| 파일 | 수행계획서상 선택 위치 | Stage 산출물 경로 | 일치 여부 | 비고 |
|---|---|---|---|---|
| `docs/localization.md` | `docs/` | Stage 2, Stage 3 산출물 | OK | M050 전체가 참조할 공식 다국어 정책 문서 |
| `mydocs/tech/task_m050_65_language_inventory.md` | `mydocs/tech/` | Stage 1, Stage 3 산출물 | OK | 한국어 고정 문구와 후속 이슈 배정 조사 기록 |
| `mydocs/working/task_m050_65_stage{N}.md` | `mydocs/working/` | 각 Stage 완료 보고서 | OK | 단계별 산출물, 검증, 잔여 위험 기록 |

## Stage 1 — 언어 고정 문구 inventory

### 산출물

신규:

- `mydocs/tech/task_m050_65_language_inventory.md`
- `mydocs/working/task_m050_65_stage1.md`

수정:

- `mydocs/orders/20260522.md`

### 변경 내용

- `templates`, `docs`, `README.md`, `mydocs`, `.github`에서 한국어 고정 작성 규칙과 locale 관련 문구를 검색한다.
- `templates/AGENTS.md`, `templates/mydocs/_templates/*.md`, `templates/mydocs/skills/todo/SKILL.md`, `templates/mydocs/manual/document_structure_guide.md`의 한국어 고정 문구를 inventory에 분류한다.
- `{REPO_SLUG}`, `{BASE_BRANCH}`, `{milestone}`, `{issue}` 등 locale 설계 중 보존해야 하는 placeholder 위치를 조사한다.
- 각 항목을 #66 README/진입 문서, #67 template locale 구조/manifest, #68 영어+한국어 locale pack, #69 중국어 간체 locale pack, #70 workflow 연결, #71 smoke/migration 중 어느 후속 이슈에서 처리할지 배정한다.
- 이번 Stage에서는 source template 본문을 수정하지 않고 조사와 분류만 수행한다.

### 검증

```bash
rg -n "작성 언어: 한국어|모든 문서는 한국어|locale|언어" templates docs README.md mydocs .github
rg -n "\\{REPO_SLUG\\}|\\{BASE_BRANCH\\}|\\{milestone\\}|\\{issue\\}|\\{stage\\}" templates docs README.md mydocs .github
rg -n "작성 언어: 한국어|모든 문서는 한국어|placeholder|REPO_SLUG|BASE_BRANCH|후속 이슈|#66|#67|#68|#69|#70|#71" mydocs/tech/task_m050_65_language_inventory.md mydocs/working/task_m050_65_stage1.md
git diff --check
```

수동 확인:

- 한국어 고정 문구를 바로 고치지 않고 후속 이슈 범위로 분류했는지 확인한다.
- placeholder 항목이 번역 대상이 아니라 보존 대상임을 inventory에 명확히 적었는지 확인한다.
- Stage 1 결과만으로 #65 수용 기준의 "한국어 고정 정책 대체 방향"을 단정하지 않는다. 최종 정책은 Stage 2에서 확정한다.

### 커밋

```text
Task #65 Stage 1: 다국어 정책 inventory 작성
```

## Stage 2 — locale 정책 문서 작성

### 산출물

신규:

- `docs/localization.md`
- `mydocs/working/task_m050_65_stage2.md`

수정:

- `mydocs/tech/task_m050_65_language_inventory.md`
- `mydocs/orders/20260522.md`

### 변경 내용

- `docs/localization.md`를 M050 다국어 지원의 공통 정책 문서로 작성한다.
- 초기 지원 locale을 `en`, `ko`, `zh-CN`으로 정의하고, 기본 언어를 `en`으로 둔다.
- locale code는 BCP 47에 가까운 태그를 사용하며, 중국어는 `zh`가 아니라 `zh-CN`으로 시작한다고 명시한다.
- 사용자-facing 문서, 설치 템플릿, 생성 문서, 에이전트 운영 규칙, 내부 task 산출물의 언어 경계를 정의한다.
- canonical 원천, fallback, 번역 동기화, 용어 대응, placeholder 보존, 승인 게이트 의미 보존 원칙을 작성한다.
- 기존 "모든 문서는 한국어 작성"과 "작성 언어: 한국어" 정책을 선택 locale 기반 정책으로 대체하는 방향을 문서화한다.
- locale pack 구조와 manifest/update 구현은 #67, 실제 번역은 #66/#68/#69, workflow 연결은 #70, smoke/migration은 #71의 범위로 남긴다.

### 검증

```bash
rg -n "en|ko|zh-CN|fallback|canonical|placeholder|locale pack|approval gate|승인 게이트|작성 언어|한국어" docs/localization.md
rg -n "README|AGENTS|Issue|PR|template|manifest|Skill|#66|#67|#68|#69|#70|#71" docs/localization.md mydocs/tech/task_m050_65_language_inventory.md mydocs/working/task_m050_65_stage2.md
git diff --check
```

수동 확인:

- 정책 문서가 실제 locale pack 구현을 미리 확정하지 않고 #67에서 설계할 여지를 남기는지 확인한다.
- fallback이 silent downgrade가 아니라 적용/업데이트 보고에 드러나는 방식으로 정의됐는지 확인한다.
- 승인 게이트, 브랜치, 이슈, PR 규칙이 locale에 따라 달라지지 않는다고 명시했는지 확인한다.

### 커밋

```text
Task #65 Stage 2: locale 정책 문서 작성
```

## Stage 3 — 후속 이슈 경계와 수용 기준 정렬

### 산출물

신규:

- `mydocs/working/task_m050_65_stage3.md`

수정:

- `docs/localization.md`
- `mydocs/tech/task_m050_65_language_inventory.md`
- `mydocs/orders/20260522.md`

필요 시 수정:

- `README.md` 또는 `docs/lifecycle/*`에 `docs/localization.md` 참조가 꼭 필요한 경우에만 짧은 링크를 추가한다. #66, #70 범위를 침범하는 본문 개편은 하지 않는다.

### 변경 내용

- #65~#71 이슈 본문과 M050 milestone 설명을 다시 확인해 `docs/localization.md`의 정책과 충돌하는 항목이 없는지 점검한다.
- 후속 이슈별 책임 경계를 `docs/localization.md` 또는 inventory에 정리한다.
- #65의 수용 기준인 기본 언어, 초기 locale, 한국어 고정 정책 대체 방향, canonical 용어/구조 기준이 모두 문서에 반영됐는지 확인한다.
- README 또는 lifecycle 문서가 `docs/localization.md`를 당장 참조하지 않으면 후속 #66/#70으로 넘긴다. 필요한 경우에는 링크 수준의 최소 변경만 한다.
- Stage 1-3 결과를 단계 보고서에 묶어 #65 구현 범위가 후속 이슈를 대체하지 않았음을 기록한다.

### 검증

```bash
gh issue view 65 --repo postmelee/hyper-waterfall --json number,title,state,milestone,body
gh issue view 66 --repo postmelee/hyper-waterfall --json number,title,state,milestone,body
gh issue view 67 --repo postmelee/hyper-waterfall --json number,title,state,milestone,body
gh issue view 68 --repo postmelee/hyper-waterfall --json number,title,state,milestone,body
gh issue view 69 --repo postmelee/hyper-waterfall --json number,title,state,milestone,body
gh issue view 70 --repo postmelee/hyper-waterfall --json number,title,state,milestone,body
gh issue view 71 --repo postmelee/hyper-waterfall --json number,title,state,milestone,body
rg -n "M050|#65|#66|#67|#68|#69|#70|#71|기본 언어|fallback|placeholder|canonical|한국어 고정|locale" docs/localization.md mydocs/tech/task_m050_65_language_inventory.md mydocs/working/task_m050_65_stage3.md
git diff --check
```

수동 확인:

- 후속 이슈의 수용 기준을 #65에서 미리 구현하지 않았는지 확인한다.
- 정책 문서의 용어와 이슈 본문의 목표가 모순되지 않는지 확인한다.
- 네트워크 또는 GitHub 인증 문제로 `gh issue view`를 실행하지 못하면, 실패 사유와 영향 범위를 단계 보고서에 적는다.

### 커밋

```text
Task #65 Stage 3: 후속 이슈 경계와 정책 기준 정렬
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- Stage별 완료 보고서는 해당 단계 산출물과 같은 커밋에 포함한다.
- #65는 정책 설계 task이므로 README 번역, locale pack 본문 작성, manifest locale 구현, CLI/workflow 구현 변경을 수행하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- PR 준비 전 `git status --short`는 빈 출력이어야 한다.

## 커밋

- 구현계획서 자체는 별도 커밋 `Task #65: 구현계획서 작성`으로 남긴다.
- 단계 커밋은 해당 단계 산출물과 `mydocs/working/task_m050_65_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #65 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서와 오늘할일 완료 처리는 모든 Stage 승인 뒤 `task-final-report` 절차에서 별도 정리한다.

## 단계 의존성

- Stage 2는 Stage 1 inventory가 한국어 고정 문구와 placeholder 보존 지점을 분류한 뒤 진행한다.
- Stage 3은 Stage 2 정책 문서가 작성된 뒤 후속 이슈와 비교한다.
- Stage 3에서 README나 lifecycle 링크가 필요하다고 판단하더라도 본문 개편은 #66/#70으로 넘기고 링크 수준의 최소 변경만 허용한다.

## 위험과 대응

- **후속 이슈 범위 침범**: Stage 산출물을 정책과 inventory로 제한하고, README 번역·locale pack·workflow 구현은 명시적으로 제외한다.
- **정책 문서가 추상적으로만 남는 문제**: Stage 1 inventory의 실제 파일/문구를 근거로 Stage 2 정책을 작성한다.
- **한국어 원문 보존 누락**: `ko`를 기존 원문 보존 locale로 명시하고, 실제 파일 배치와 보존 구현은 #68에서 처리하게 한다.
- **fallback 오해**: fallback은 사용자에게 보이지 않게 영어로 대체하는 기능이 아니라, 누락을 보고하고 영어 기준으로 판단하는 safety net으로 정의한다.
- **GitHub 조회 의존성**: Stage 3의 `gh issue view`가 실패하면 실패를 기록하고, 이미 이슈 본문이 로컬 계획서에 반영된 범위까지만 근거로 사용한다.

## 승인 요청 사항

- 3개 Stage 구성과 단계별 산출물
- `docs/localization.md`를 M050 다국어 정책의 공통 기준으로 작성하는 방식
- `mydocs/tech/task_m050_65_language_inventory.md`를 조사 근거와 후속 이슈 배정표로 사용하는 방식
- #65에서 실제 번역, locale pack 구현, manifest/update 구현을 하지 않는 범위 제한
- Stage별 검증 명령과 커밋 메시지
