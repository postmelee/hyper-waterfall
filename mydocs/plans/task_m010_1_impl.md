# task_m010_1_impl.md — 하이퍼-워터폴 자기 적용 (구현계획서)

수행계획서: [`task_m010_1.md`](task_m010_1.md)
GitHub Issue: [#1](https://github.com/postmelee/hyper-waterfall/issues/1)

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 루트 운영 파일 | `AGENTS.md`, `CLAUDE.md`, `.github/pull_request_template.md` | placeholder 잔존 grep, `git diff --check` |
| 2 | mydocs 구조 + 심볼릭 링크 | `mydocs/` 8개 폴더, 4개 심볼릭 링크 | `ls -la`, `diff -q` |
| 3 | README "저장소 구조" 재작성 | `README.md` 패치 | 두 갈래 섹션 존재 grep |

## Stage 1 — 루트 운영 파일 추가

### 산출물

- `AGENTS.md`: `templates/AGENTS.md`를 루트로 복사 + placeholder 치환
- `CLAUDE.md`: `templates/CLAUDE.md`를 루트로 복사 (치환 대상 없음, 그대로)
- `.github/pull_request_template.md`: `templates/.github/pull_request_template.md` 복사 + placeholder 치환

### Placeholder 치환 본문

`AGENTS.md` 치환 항목:

- `{PROJECT_OVERVIEW}` → 다음 문단으로 치환:
  > 본 저장소는 하이퍼-워터폴 방법론을 모듈화한 프레임워크 저장소이며, 자기 자신에게 본 방법론을 적용하는 dogfooding 사례를 운영한다. `templates/`에는 적용 대상 저장소에 복사할 진실 원천 파일이 있고, 본 저장소 루트의 `mydocs/manual`과 `mydocs/skills`는 `templates/mydocs/`의 동일 폴더로 가는 심볼릭 링크다.
- `{PROJECT_SPECIFIC_RULES}` → 다음 3개 항목으로 치환:
  - `templates/` 안의 placeholder(`{REPO_SLUG}`, `{BASE_BRANCH}` 등)는 그대로 보존한다. 사용자가 자신의 저장소에 적용할 때 치환하므로 본 저장소에서는 치환하지 않는다.
  - SKILL이나 매뉴얼 본문을 변경할 때는 [`README.md`](README.md)의 "핵심 SKILL"·"도입 후 작업 흐름" 표와 [`templates/mydocs/manual/task_workflow_guide.md`](templates/mydocs/manual/task_workflow_guide.md)의 "SKILL 호출 표시 안내"를 같은 PR에서 갱신한다.
  - `mydocs/skills`와 `mydocs/manual` 심볼릭 링크 대상은 변경하지 않는다 (`templates/mydocs/skills`, `templates/mydocs/manual`이 진실 원천).
- `{PROJECT_SPECIFIC_REQUIRED_DOCUMENTS}` → `[docs/agent-entrypoint.md](docs/agent-entrypoint.md) — 외부 저장소 적용 진입 절차`
- `{BASE_BRANCH}` → `main`
- `{RELEASE_BRANCH}` → `main` (이 저장소는 단일 브랜치 운영)

`.github/pull_request_template.md` 치환 항목:

- `{REPO_SLUG}` → `postmelee/hyper-waterfall`
- 본문 안의 `{head_sha}`, `{milestone}`, `{issue}`는 PR 작성 시점에 채우는 동적 값이므로 그대로 보존(템플릿 일부)
- 검증 항목 placeholder(`{프로젝트별 검증 명령 1}` 등)는 본 저장소에 코드 빌드가 없으므로 다음 항목으로 치환:
  - `[ ] grep -RnE '\{[A-Z_]+\}' AGENTS.md CLAUDE.md` (placeholder 잔존 없음)
  - `[ ] ls -la .agents/skills .claude/skills mydocs/manual mydocs/skills` (심볼릭 링크 정상)
  - `[ ] git diff --check`

`CLAUDE.md`는 치환 대상이 없다(본문은 `@AGENTS.md` 한 줄).

### 검증

```bash
git diff --check
# 치환 대상 placeholder 잔존이 0이어야 함 (PR 템플릿 안의 예시 {head_sha}/{milestone}/{issue}/{REPO_SLUG}는 사용자 안내용으로 보존)
grep -nE '\{(PROJECT_OVERVIEW|PROJECT_SPECIFIC_RULES|PROJECT_SPECIFIC_REQUIRED_DOCUMENTS|PROJECT_VALIDATION_GUIDE|BASE_BRANCH|RELEASE_BRANCH|PR_TEMPLATE_PATH|REPO_NAME)\}' AGENTS.md CLAUDE.md .github/pull_request_template.md || echo "OK: 치환 대상 placeholder 잔존 없음"
```

### 커밋

```
Task #1 Stage 1: 루트 운영 파일 추가 (AGENTS, CLAUDE, PR 템플릿)
```

## Stage 2 — mydocs 구조 + 심볼릭 링크

### 산출물

자체 폴더 (.gitkeep으로 빈 폴더 보존):

- `mydocs/plans/archives/`
- `mydocs/working/`
- `mydocs/report/`
- `mydocs/feedback/`
- `mydocs/tech/`
- `mydocs/troubleshootings/`
- `mydocs/pr/`
- `mydocs/pr/archives/`

(`mydocs/orders/`, `mydocs/plans/`는 Stage 0 task-start 단계에서 이미 생성됨.)

심볼릭 링크 4개:

- `mydocs/manual` → `../templates/mydocs/manual`
- `mydocs/skills` → `../templates/mydocs/skills`
- `.agents/skills` → `../mydocs/skills`
- `.claude/skills` → `../mydocs/skills`

### 검증

```bash
ls -la .agents/skills .claude/skills mydocs/manual mydocs/skills
diff -q <(ls -1 templates/mydocs/skills) <(ls -1 mydocs/skills/)
diff -q <(ls -1 templates/mydocs/manual) <(ls -1 mydocs/manual/)
git diff --check
```

`diff -q` 두 줄 모두 빈 출력(차이 없음)이어야 한다.

### 커밋

```
Task #1 Stage 2: mydocs 구조와 심볼릭 링크 구성
```

## Stage 3 — README "저장소 구조" 재작성

### 산출물

`README.md`의 "저장소 구조" 섹션을 두 갈래로 나눈다.

- A. **적용 후 대상 저장소 구조**: 사용자가 자신의 프로젝트에 `templates/`를 복사한 결과 모습. 트리 형식.
- B. **본 저장소(자기 적용 후) 구조**: `templates/` 보관 + 자기 적용 산출물 + 심볼릭 링크 통합 구조.

A는 tree 형식이 보기 좋다. B는 핵심 차이만 짚는 짧은 트리 + 심볼릭 링크 안내.

### 검증

```bash
grep -nE "^## 저장소 구조" README.md
grep -nE "(적용 후 대상 저장소|자기 적용)" README.md
git diff --check
```

각 grep 1건 이상.

### 커밋

```
Task #1 Stage 3: README 저장소 구조 두 갈래 재작성
```

## 단계 의존성

- Stage 1 → Stage 2: 직접 의존 없음. 단, 운영 파일 → 데이터 폴더 순서가 자연스러움
- Stage 2 → Stage 3: README가 mydocs 구조를 설명하므로 Stage 2 결과가 확정된 뒤 작성

## 위험과 대응

- placeholder 치환 누락 → Stage 1 grep으로 잡힘
- 심볼릭 링크 깨짐(상대 경로 오류) → Stage 2 ls/diff로 확인
- README 두 갈래로 늘어 가독성 저하 → 표 + 짧은 트리로 압축

## 승인 요청 사항

- 위 3단계 분할과 placeholder 치환 본문에 동의?
- `AGENTS.md`의 `{PROJECT_SPECIFIC_RULES}` 3개 항목이 적절?
- PR 템플릿의 검증 항목(grep, ls, git diff --check)이 본 저장소 검증으로 적합?

승인되면 Stage 1부터 순차 진행한다. 단계마다 `task-stage-report` + `issue-checkpoint`로 보고하고 다음 단계 승인을 요청한다.
