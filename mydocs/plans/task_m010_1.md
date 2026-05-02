# task_m010_1.md — 하이퍼-워터폴 자기 적용

GitHub Issue: [#1](https://github.com/postmelee/hyper-waterfall/issues/1)
마일스톤: M010

## 목적

본 저장소(`postmelee/hyper-waterfall`)에 자기 자신이 정의한 하이퍼-워터폴 방법론을 적용해 dogfooding 사례를 만든다. 적용 결과로 남는 issue, branch, plans/working/report 산출물, PR 흐름 자체가 사용자에게 살아있는 예시가 되도록 한다.

## 배경

본 저장소는 `templates/`에 적용 대상 저장소에 복사할 파일을 보관하고 `docs/agent-entrypoint.md`에서 적용 절차를 정의한다. 그러나 저장소 자체에는 방법론이 적용되어 있지 않아 `mydocs/`, `AGENTS.md`, `.github/`, `.agents/`, `.claude/` 같은 산출물이 없다. 첫 task로 자기 적용을 진행한다.

## 범위

### 포함

- 루트 `AGENTS.md`, `CLAUDE.md`: `templates/`의 placeholder를 본 저장소 값으로 치환해 복사
- 루트 `.github/pull_request_template.md`: placeholder 치환
- 루트 `mydocs/` 구조 신설:
  - 자체 폴더: `orders/`, `plans/` (+ `archives/`), `working/`, `report/`, `feedback/`, `tech/`, `troubleshootings/`, `pr/` (+ `archives/`)
  - 심볼릭 링크: `mydocs/manual` → `../templates/mydocs/manual`, `mydocs/skills` → `../templates/mydocs/skills`
- 루트 `.agents/skills`, `.claude/skills` → `../mydocs/skills` 심볼릭 링크
- README의 "저장소 구조" 섹션 재작성 (적용 후 대상 저장소 구조 + 본 저장소 자기 적용 후 구조 분리)
- **(scope 확장 2026-05-02)** [`postmelee/alhangeul-macos#115`](https://github.com/postmelee/alhangeul-macos/pull/115)의 PR 규칙 강화 적용:
  - PR 템플릿 재구조화: 요약(4 bullet) / 변경 내역(Stage당 1줄 + Stage·commit 이중 링크 + 영역 표 ≤5행 + 작업 문서) / 핵심 리뷰 포인트(선택) / 검증 / 스크린샷(Before/After 조건부) / 관련 이슈(선행·후속·Epic·upstream·참고) / 후속 이슈 제안 / 남은 리스크. `Closes #` 폐지 → `대상 타스크`로 흡수
  - `task-final-report` SKILL: draft → **Open PR 기본**, `--body-file` 우선
  - `pr_process_guide.md`, `git_workflow_guide.md`, `task_workflow_guide.md`: 새 섹션·용어·기본 PR 상태 반영
  - 자기 적용본(`AGENTS.md`, `README.md`, 루트 `.github/pull_request_template.md`) 갱신
- **(scope 재확장 2026-05-02)** PR `변경 내역` 섹션 가독성 개선 (본 저장소 자체 디자인 결정):
  - `변경 내역`을 Stage timeline만 두고 표·작업 문서를 `### 영향 영역` / `### 작업 문서` 하위 목차로 분리
  - `영향 영역`은 옵션 (영역 1~2개일 땐 통째 삭제, 최대 5행)
  - `pr_process_guide.md`의 섹션별 작성 기준·작성 예시 보정
  - templates와 자기 적용본 PR 템플릿 동일 갱신, PR #2 본문도 같은 구조로 재배치

### 제외

- 새 SKILL 추가, 기존 SKILL 본문 변경 (PR #115의 기존 SKILL 본문 변경은 포함하되, 신규 SKILL은 추가하지 않음)
- 외부 PR 처리, 다른 task 등록
- alhangeul-macos 특유 항목(copilot-instructions, AppKit/render 검증 명령)

## 설계 방향

- `templates/` 안의 매뉴얼과 SKILL은 진실 원천이다. 본 저장소 자기 적용 시 사본을 만들지 않고 심볼릭 링크로 같은 본문을 공유해 단일 진실 원천을 유지한다.
- 본 저장소는 단일 브랜치 운영(`main`)으로 단순화한다. `publish/task{N}`도 `main`을 base로 한다.
- placeholder 치환 값:
  - `{REPO_SLUG}` → `postmelee/hyper-waterfall`
  - `{REPO_NAME}` → `hyper-waterfall`
  - `{BASE_BRANCH}` → `main`
  - `{RELEASE_BRANCH}` → `main`
  - `{PR_TEMPLATE_PATH}` → `.github/pull_request_template.md`
  - `{PROJECT_OVERVIEW}` → 메타 저장소 성격 (하이퍼-워터폴 방법론 모듈 보관, 자기 적용 dogfooding)
  - `{PROJECT_SPECIFIC_RULES}` → `templates/` 보호 (placeholder 형식 유지), SKILL/매뉴얼 변경 시 README/`task_workflow_guide.md` 동시 갱신
  - `{PROJECT_SPECIFIC_REQUIRED_DOCUMENTS}` → [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)
  - `{PROJECT_VALIDATION_GUIDE}` → 코드 빌드가 없으므로 문서 일관성 검사 (placeholder 잔존 없음, 심볼릭 링크 정상)

## 예상 변경 파일

신규
- `AGENTS.md`, `CLAUDE.md`
- `.github/pull_request_template.md`
- `.agents/skills`, `.claude/skills` (심볼릭 링크)
- `mydocs/manual`, `mydocs/skills` (심볼릭 링크 → `../templates/mydocs/...`)
- `mydocs/orders/20260501.md`
- `mydocs/plans/task_m010_1.md`, `mydocs/plans/task_m010_1_impl.md`
- `mydocs/plans/archives/.gitkeep`, `mydocs/working/.gitkeep`, `mydocs/report/.gitkeep`, `mydocs/feedback/.gitkeep`, `mydocs/tech/.gitkeep`, `mydocs/troubleshootings/.gitkeep`, `mydocs/pr/.gitkeep`, `mydocs/pr/archives/.gitkeep`
- `mydocs/working/task_m010_1_stage{1,2,3,4,5}.md`
- `mydocs/report/task_m010_1_report.md`

수정
- `README.md` "저장소 구조" 섹션

## 잠정 단계

5단계로 분할한다 (Stage 4·5는 2026-05-02 scope 확장에서 추가). 단계 산출물 마무리(오늘할일 완료 처리, 최종 보고서)는 `task-final-report` 절차에서 처리한다.

- **Stage 1** — 루트 운영 파일 추가
  - `AGENTS.md`, `CLAUDE.md`, `.github/pull_request_template.md` 생성·placeholder 치환
- **Stage 2** — `mydocs/` 구조 + 심볼릭 링크
  - 자체 폴더(.gitkeep), `mydocs/manual` `mydocs/skills` 심볼릭 링크, 루트 `.agents/skills` `.claude/skills` 심볼릭 링크
- **Stage 3** — README "저장소 구조" 섹션 재작성
  - 적용 후 대상 저장소 구조 + 본 저장소 자기 적용 후 구조 두 갈래 표시
- **Stage 4** *(2026-05-02 추가)* — PR 규칙 강화 적용 (PR #115 동기화)
  - `templates/`의 PR 템플릿·`task-final-report` SKILL·`pr_process_guide.md`·`git_workflow_guide.md`·`task_workflow_guide.md` 갱신
  - 자기 적용본(루트 `.github/pull_request_template.md`, `AGENTS.md`, `README.md`)에서 draft 표현 보정 + 새 템플릿 본문 반영
- **Stage 5** *(2026-05-02 재추가)* — PR `변경 내역` 섹션 구조 개선
  - `변경 내역` = Stage timeline만, `### 영향 영역`(옵션)·`### 작업 문서`를 하위 목차로 분리
  - templates와 자기 적용본 PR 템플릿 동일 갱신, `pr_process_guide.md` 섹션 기준·예시 보정

## 검증 계획

### 단계별 검증

- Stage 1
  - `git diff --check` 무경고
  - placeholder 잔존 검사: `grep -RnE '\{[A-Z_]+\}' AGENTS.md CLAUDE.md .github/pull_request_template.md` 결과가 의도된 placeholder(예시 본문 안 `{head_sha}` 등)만 남고 치환 대상은 없음
- Stage 2
  - 심볼릭 링크 정상 대상: `ls -la .agents/skills .claude/skills mydocs/manual mydocs/skills`로 화살표 확인
  - 본문 동일 여부: `diff -q <(ls templates/mydocs/skills) <(ls mydocs/skills)` 결과 동일
- Stage 3
  - README "저장소 구조"에 "적용 후 대상 저장소" + "본 저장소(자기 적용 후)" 두 갈래 명시

### 통합 검증 (수용 기준)

- `docs/agent-entrypoint.md`의 "If The Target Repository Is Installed" 체크리스트 (`AGENTS.md`, `CLAUDE.md`, `mydocs/`, `.agents/skills`, `.claude/skills`, `.github/pull_request_template.md`) 모두 존재
- `git status --short`가 빈 출력
- `mydocs/orders/20260501.md`의 #1 행이 `완료` 상태 + `완료: HH:mm` 기록
- 본 저장소 issue/branch/PR/`mydocs/` 산출물이 모두 정렬되어 있어 사용자가 살아있는 예시로 참고 가능

## 리스크

- **심볼릭 링크 호환**: Windows fork에서는 동작이 제한될 수 있다. 본 저장소는 macOS/Linux 환경 기여자가 주 대상이므로 그대로 진행하고, 문제 발생 시 별도 task로 대응.
- **placeholder 치환 실수**: 매뉴얼/PR 템플릿 링크가 깨질 수 있다. Stage 1 검증에서 grep으로 잔존 검사.
- **README 가독성**: "저장소 구조" 섹션을 두 갈래로 늘리면 길어진다. Stage 3에서 표/트리 형식을 적절히 사용해 압축.

## 승인 요청 사항

- 위 잠정 단계(3단계 분할), placeholder 치환 값, 심볼릭 링크 통합 방식에 동의?
- 검증 기준에 추가/제거할 항목?

승인되면 `task_m010_1_impl.md`(구현계획서)에서 단계별 산출물·검증·커밋 메시지를 구체화한다.
