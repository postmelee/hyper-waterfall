# Hyper-Waterfall Agent Entrypoint

이 문서는 AI coding tool이 대상 저장소에 Hyper-Waterfall 방법론을 적용할 때 가장 먼저 읽는 진입점이다.

## 원칙

- `templates/` 아래 파일을 대상 저장소로 복사한다.
- 문서를 재작성, 요약, 해석하지 않는다.
- 저장소 특화 placeholder만 치환한다.
- 중의적인 표현은 유지한다.
- 기존 파일이 있으면 덮어쓰기 전에 작업지시자에게 확인한다.

## 적용 절차

1. 대상 저장소 루트 확인
2. `templates/AGENTS.md`, `templates/CLAUDE.md` 복사
3. `templates/.github/pull_request_template.md` 복사
4. `templates/mydocs/` 전체 복사
5. `.agents/skills -> ../mydocs/skills` 심볼릭 링크 생성
6. `.claude/skills -> ../mydocs/skills` 심볼릭 링크 생성
7. placeholder 치환
8. 대상 프로젝트 고유 규칙은 `AGENTS.md`의 지정 섹션에만 추가
9. `git diff`로 변경 확인 후 작업지시자에게 보고

## Placeholder

- `{PROJECT_OVERVIEW}`
- `{PROJECT_SPECIFIC_RULES}`
- `{PROJECT_SPECIFIC_REQUIRED_DOCUMENTS}`
- `{PROJECT_VALIDATION_GUIDE}`
- `{REPO_SLUG}`
- `{REPO_NAME}`
- `{BASE_BRANCH}`
- `{RELEASE_BRANCH}`
- `{PR_TEMPLATE_PATH}`

권장 기본값:

- `{BASE_BRANCH}`: `devel`
- `{RELEASE_BRANCH}`: `main`
- `{PR_TEMPLATE_PATH}`: `.github/pull_request_template.md`

## 금지

- Hyper-Waterfall 문서 내용을 자기 방식으로 다시 설명하지 않는다.
- 절차를 간소화하거나 자동화 도구 중심으로 바꾸지 않는다.
- 새 workflow, CLI, 설정 파일을 임의로 추가하지 않는다.
