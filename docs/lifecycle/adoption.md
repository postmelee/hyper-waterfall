# 신규 적용 Lifecycle 가이드

이 문서는 대상 저장소에 Hyper-Waterfall 방법론을 처음 적용할 때의 범위, 절차, 판단 결과 형식을 정의한다. AI coding tool의 첫 진입점은 `docs/agent-entrypoint.md`다.

## 원칙

- 신규 적용은 `templates/manifest.json`을 먼저 읽고, manifest가 정의한 대상 파일과 심볼릭 링크를 기준으로 수행한다.
- 문서를 재작성, 요약, 해석하지 않는다.
- 저장소 특화 placeholder만 치환한다.
- 중의적인 표현은 유지한다.
- 기존 파일이 있으면 덮어쓰기 전에 작업지시자에게 확인한다.
- 사용자 수정 가능성이 있는 파일은 manifest의 update policy가 `overwrite`여도 checksum 또는 diff를 확인하기 전에는 덮어쓰지 않는다.
- 신규 적용의 기본 locale은 `templates/manifest.json`의 `localization.defaultLocale`을 따른다.
- 작업지시자가 언어 또는 locale을 명시하면 `localization.supportedLocales`와 각 entry의 `files[].localization.sourcePattern` 존재 여부를 파일 변경 전에 확인한다.
- 선택 locale source가 누락되면 조용히 성공 처리하지 않고, manifest의 `localization.missingLocalePolicy`와 entry별 `fallbackLocale` 기준으로 fallback 후보와 누락 항목을 보고한다.
- 실제 locale 선택 저장 위치와 적용 workflow 실행 구현은 후속 #70 범위다.

## 신규 적용 절차

1. 대상 저장소 루트 확인
2. `templates/manifest.json` 확인
3. `localization.defaultLocale`, `supportedLocales`, `fallbackLocale`, `missingLocalePolicy` 확인
4. 작업지시자가 요청한 locale이 있으면 선택 locale로 기록하고, 없으면 기본 locale을 선택 후보로 제시
5. `files[].localization.enabled: true` entry는 선택 locale의 `sourcePattern` 존재 여부와 fallback 후보를 확인
6. `files[].localization.enabled: false` entry나 localization이 없는 entry는 manifest의 기본 `source`를 적용 후보로 분류
7. locale 누락, directory 일부 누락, fallback 후보가 있으면 판단 결과에 보고하고 작업지시자 승인을 받음
8. 승인된 source 기준으로 `templates/AGENTS.md`, `templates/CLAUDE.md` 또는 locale pack의 대응 파일 복사
9. 승인된 source 기준으로 `templates/.github/ISSUE_TEMPLATE/task.yml`, `templates/.github/pull_request_template.md` 또는 locale pack의 대응 파일 복사
10. 승인된 source 기준으로 `templates/mydocs/` 또는 locale pack의 대응 directory 복사
11. `.agents/skills -> ../mydocs/skills` 심볼릭 링크 생성
12. `.claude/skills -> ../mydocs/skills` 심볼릭 링크 생성
13. `.hyper-waterfall/version.json` 생성
14. placeholder 치환
15. 대상 프로젝트 고유 규칙은 `AGENTS.md`의 지정 섹션에만 추가
16. `git diff`로 변경 확인 후 작업지시자에게 보고

## 범위 제한

신규 적용은 adoption-only strict manifest 모드로 수행한다. Hyper-Waterfall 운영 파일과 작업 기억 구조 설치만 수행하며, 허용 대상은 manifest `files[]`의 target, `.hyper-waterfall/version.json`, manifest가 정의한 symlink다.

이 범위 밖 파일이나 디렉터리는 신규 적용 중 생성하거나 수정하지 않는다.

생성/수정 금지 예시:

- `docs/**`
- `src/**`
- `examples/**`
- `schemas/**`
- `package.json`
- `tsconfig.json`

이 목록은 manifest 외 경로의 예시이며, 대상 저장소의 일반 문서 구조, 공식 문서 루트 이름, 제품 문서 위치를 정의하지 않는다.

제품 코드, 제품 문서, 아키텍처 문서, 로드맵, API 계약, 예제, 스키마가 필요해 보여도 신규 적용 중 파일을 만들지 않고 판단 결과의 보류 항목 또는 별도 task 후보로만 기록한다.

공식 문서 루트가 필요해 보이면 신규 적용 판단 결과에서는 위치를 확정하지 않는다. 별도 task 후보에 "공식 문서 루트 선택과 문서 위치 판단 필요"를 남기고, 이후 수행계획서에서 대상 독자, 공식화 수준, 선택 경로, 대안 경로, 선택 이유를 승인받는다.

## 신규 적용 판단 결과 형식

신규 적용 절차에서 파일을 복사하거나 심볼릭 링크를 만들기 전에 다음 판단 결과를 작업지시자에게 먼저 제시하고 승인을 받는다.

- 대상 저장소: Hyper-Waterfall을 적용할 저장소 루트와 기본 브랜치
- 목표 release/tag: 적용할 Hyper-Waterfall GitHub Release 또는 tag
- 선택 locale: 작업지시자 요청 locale 또는 manifest 기본 locale, `supportedLocales` 포함 여부, `defaultLocale`, `fallbackLocale`
- locale source 후보: 선택 locale의 `sourcePattern` 존재 여부, 누락 파일 또는 directory, fallback 후보, directory 일부 누락에 따른 혼합 locale 위험
- manifest 기준 적용 후보: `templates/manifest.json` 기준으로 복사, preserve, symlink 처리할 파일과 디렉터리
- locale 적용 후보: locale 대상 entry에 사용할 선택 locale source 또는 fallback 후보, locale 비대상 entry에 사용할 기본 source
- manifest 외 보류 후보: 신규 적용 중 만들지 않을 대상 프로젝트 고유 산출물과 별도 task 분리 필요성
- 공식 문서 루트 보류: `docs/`, `specs/`, `site/`, `website/`, `adr/` 등 후보를 확정하지 않고 별도 task에서 문서 위치 판단이 필요하다는 점
- 기존 파일 충돌 가능성: 대상 저장소에 이미 존재하는 파일, 사용자 수정 가능 파일, 덮어쓰기 금지 항목
- `.hyper-waterfall/version.json` 생성 계획: 기록할 version, release, appliedAt, source 정보
- locale 저장 보류: 실제 locale 선택 저장 위치와 workflow 실행 연결은 #70 범위이며, 이번 판단 결과에서는 선택/누락/fallback 후보만 보고한다는 점
- placeholder 체크리스트: `{REPO_SLUG}`, `{REPO_NAME}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`, `{PR_TEMPLATE_PATH}` 등 치환 대상과 보류 대상
- 작업지시자 승인 요청: 즉시 적용할 항목, 보류할 항목, 별도 이슈로 분리할 항목

## 관련 문서

- `docs/agent-entrypoint.md`: lifecycle 진입점.
- `docs/localization.md`: 다국어 정책과 locale pack 계약.
- `templates/manifest.json`: 신규 적용 파일 목록과 update policy.
- `templates/mydocs/manual/document_structure_guide.md`: 공식 문서 루트와 `mydocs/` 경계.
- `templates/mydocs/manual/framework_lifecycle_guide.md`: lifecycle 판단 후 일반 task 전환 기준.
