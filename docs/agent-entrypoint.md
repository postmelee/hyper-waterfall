# Hyper-Waterfall Agent Entrypoint

이 문서는 AI coding tool이 대상 저장소에 Hyper-Waterfall 방법론을 적용할 때 가장 먼저 읽는 진입점이다.

## 원칙

- 신규 적용은 `templates/manifest.json`을 먼저 읽고, manifest가 정의한 대상 파일과 심볼릭 링크를 기준으로 수행한다.
- 기존 적용 저장소 업데이트는 `.hyper-waterfall/version.json`과 `docs/migrations/`를 확인한 뒤 변경 후보를 제시한다.
- 문서를 재작성, 요약, 해석하지 않는다.
- 저장소 특화 placeholder만 치환한다.
- 중의적인 표현은 유지한다.
- 기존 파일이 있으면 덮어쓰기 전에 작업지시자에게 확인한다.
- 사용자 수정 가능성이 있는 파일은 manifest의 update policy가 `overwrite`여도 checksum 또는 diff를 확인하기 전에는 덮어쓰지 않는다.

## 신규 적용 절차

1. 대상 저장소 루트 확인
2. `templates/manifest.json` 확인
3. `templates/AGENTS.md`, `templates/CLAUDE.md` 복사
4. `templates/.github/ISSUE_TEMPLATE/task.yml`, `templates/.github/pull_request_template.md` 복사
5. `templates/mydocs/` 전체 복사
6. `.agents/skills -> ../mydocs/skills` 심볼릭 링크 생성
7. `.claude/skills -> ../mydocs/skills` 심볼릭 링크 생성
8. `.hyper-waterfall/version.json` 생성
9. placeholder 치환
10. 대상 프로젝트 고유 규칙은 `AGENTS.md`의 지정 섹션에만 추가
11. `git diff`로 변경 확인 후 작업지시자에게 보고

## 신규 적용 판단 결과 형식

신규 적용 절차에서 파일을 복사하거나 심볼릭 링크를 만들기 전에 다음 판단 결과를 작업지시자에게 먼저 제시하고 승인을 받는다.

- 대상 저장소: Hyper-Waterfall을 적용할 저장소 루트와 기본 브랜치
- 목표 release/tag: 적용할 Hyper-Waterfall GitHub Release 또는 tag
- manifest 기준 적용 후보: `templates/manifest.json` 기준으로 복사, preserve, symlink 처리할 파일과 디렉터리
- 기존 파일 충돌 가능성: 대상 저장소에 이미 존재하는 파일, 사용자 수정 가능 파일, 덮어쓰기 금지 항목
- `.hyper-waterfall/version.json` 생성 계획: 기록할 version, release, appliedAt, source 정보
- placeholder 체크리스트: `{REPO_SLUG}`, `{REPO_NAME}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`, `{PR_TEMPLATE_PATH}` 등 치환 대상과 보류 대상
- 작업지시자 승인 요청: 즉시 적용할 항목, 보류할 항목, 별도 이슈로 분리할 항목

## 기존 적용 저장소 업데이트 진입

1. 대상 저장소의 `.hyper-waterfall/version.json` 존재 여부와 현재 version 확인
2. 목표 GitHub Release/tag의 `templates/manifest.json` 확인
3. 현재 version에서 목표 version으로 가는 `docs/migrations/v{from}-to-v{to}.md` 확인
4. manifest diff를 기준으로 자동 적용 가능, 수동 확인 필요, 충돌 가능 항목 분류
5. 사용자 수정 파일은 덮어쓰지 않고 update PR 후보로 정리
6. 작업지시자 승인 후 별도 이슈와 브랜치에서 업데이트 진행

## 기존 업데이트 판단 결과 형식

기존 적용 저장소 업데이트는 파일을 변경하기 전에 다음 판단 결과를 먼저 제시하고, 승인된 범위만 별도 이슈와 브랜치에서 진행한다.

- 대상 저장소: 업데이트할 저장소 루트와 기준 브랜치
- 현재 version: 대상 저장소의 `.hyper-waterfall/version.json`에 기록된 version, release, appliedAt
- 목표 release/tag: 적용하려는 Hyper-Waterfall GitHub Release 또는 tag
- migration guide: 현재 version에서 목표 version으로 이동할 때 읽어야 하는 `docs/migrations/v{from}-to-v{to}.md`
- manifest diff: 현재 적용 기준과 목표 release manifest 사이의 추가, 변경, 삭제, symlink 차이 요약
- 자동 적용 가능: checksum 일치, 사용자 수정 없음, update policy상 자동 반영 가능한 항목
- 수동 확인 필요: update policy가 `merge`, `manual`, `preserve`이거나 사용자 판단이 필요한 항목
- conflict: 대상 저장소 수정과 목표 release 변경이 충돌할 가능성이 있어 직접 덮어쓰면 안 되는 항목
- update PR 후보: 승인 후 별도 PR로 만들 변경 묶음, 검증 항목, 남은 리스크
- 작업지시자 승인 요청: 자동 적용, 수동 확인, conflict 처리, update PR 생성 여부

이 문서는 Hyper-Waterfall framework lifecycle의 진입점이다. 신규 적용과 기존 업데이트는 core Skill 목록에 설치·업데이트 전용 Skill을 추가해 처리하지 않고, release manifest, version 기록, migration guide를 기준으로 판단한다. 실제 파일 변경은 일반 타스크와 동일하게 이슈, 브랜치, 계획서, 승인, PR 흐름으로 추적한다.

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
- manifest, migration guide, 작업지시자 승인 없이 새 workflow, CLI, 설정 파일을 임의로 추가하지 않는다.
