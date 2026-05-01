# task_m010_1_stage1.md — Stage 1 완료 보고서

GitHub Issue: [#1](https://github.com/postmelee/hyper-waterfall/issues/1)
구현계획서: [`task_m010_1_impl.md`](../plans/task_m010_1_impl.md)

## 단계 목적

루트 운영 파일 3종을 추가해 본 저장소가 `docs/agent-entrypoint.md`의 "If The Target Repository Is Installed" 체크리스트의 절반(운영 규칙·PR 템플릿)을 만족하도록 한다.

## 산출물

| 파일 | 출처 | 치환 결과 |
|---|---|---|
| `AGENTS.md` | `templates/AGENTS.md` | `{PROJECT_OVERVIEW}`, `{PROJECT_SPECIFIC_RULES}`, `{PROJECT_SPECIFIC_REQUIRED_DOCUMENTS}`, `{BASE_BRANCH}` 모두 치환 |
| `CLAUDE.md` | `templates/CLAUDE.md` | 치환 대상 없음, 그대로 |
| `.github/pull_request_template.md` | `templates/.github/pull_request_template.md` | `{REPO_SLUG}` → `postmelee/hyper-waterfall`, 검증 항목 placeholder → grep/ls/git diff --check 명령 |

세부 결정:

- `{PROJECT_OVERVIEW}`는 메타 저장소 성격(프레임워크 보관 + dogfooding 자기 적용)을 한 문단으로 정리.
- `{PROJECT_SPECIFIC_RULES}`는 3개 항목: templates 보호, SKILL/매뉴얼 변경 시 README·`task_workflow_guide.md` 동시 갱신, 심볼릭 링크 대상 변경 금지.
- `{PROJECT_SPECIFIC_REQUIRED_DOCUMENTS}`는 `docs/agent-entrypoint.md` 1건만 추가(필수 참조 문서 섹션에 합류).
- PR 템플릿의 `{head_sha}`, `{milestone}`, `{issue}`는 PR 작성 시점에 채우는 동적 값이므로 보존.

## 검증 결과

```
=== git diff --check ===
OK

=== placeholder 잔존 검사 ===
OK: 치환 대상 placeholder 잔존 없음
```

검증 명령:

```bash
git diff --check
grep -nE '\{(PROJECT_OVERVIEW|PROJECT_SPECIFIC_RULES|PROJECT_SPECIFIC_REQUIRED_DOCUMENTS|PROJECT_VALIDATION_GUIDE|BASE_BRANCH|RELEASE_BRANCH|PR_TEMPLATE_PATH|REPO_NAME)\}' AGENTS.md CLAUDE.md .github/pull_request_template.md
```

PR 템플릿에 남아 있는 placeholder는 모두 사용자 안내용으로 의도된 것: `{head_sha}`, `{milestone}`, `{issue}`(PR 작성 시 동적 값). `{REPO_SLUG}`는 본 저장소 슬러그로 치환 완료.

## 본문 무손실 여부

`templates/`의 본문 구조와 모든 섹션 제목, 항목 순서를 그대로 보존했다. 치환된 자리는 의미가 달라지지 않는 메타데이터(슬러그, 브랜치명 등)이며, 핵심 강제 규칙·필수 참조 문서 섹션의 길이만 본 저장소 컨텍스트에 맞게 늘었다.

## 잔여 위험

- 매뉴얼 본문(`mydocs/manual/*.md`)은 Stage 2에서 `templates/mydocs/manual`로 가는 심볼릭 링크로 만든다. 이 매뉴얼들 안에는 `{REPO_SLUG}` 등 placeholder가 그대로 남아 있는데, AGENTS.md의 "핵심 강제 규칙" 1항에서 명시했듯 본 저장소는 이를 의도적으로 보존한다.
- AGENTS.md의 placeholder 인용 표기를 검증 grep에 안 걸리도록 일반화(`예: {REPO_SLUG}`)했다. 의미는 동일하지만, 향후 검증 패턴을 강화할 때 이 표기 규칙을 매뉴얼에 명시할지 검토 필요(후속 task 후보).

## 다음 단계 영향

Stage 2 진입 조건이 충족된다. Stage 2는 `mydocs/` 8개 자체 폴더와 4개 심볼릭 링크를 추가한다. AGENTS.md/CLAUDE.md가 참조하는 매뉴얼 경로(`mydocs/manual/...`)와 SKILL 경로(`.agents/skills`, `.claude/skills`)가 Stage 2 산출물로 실제 연결된다.

## 승인 요청

- Stage 1 산출물(파일 3개)과 placeholder 치환 결정에 동의?
- Stage 2 진입 승인?
