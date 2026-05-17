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
- 신규 적용은 adoption-only strict manifest 모드로 수행한다. manifest가 정의하지 않은 파일이나 디렉터리는 생성하거나 수정하지 않는다.
- 제품 코드, 제품 문서, 아키텍처 문서, 로드맵, API 계약, 예제, 스키마처럼 대상 프로젝트 고유 산출물은 신규 적용 범위 밖으로 보고 보류 또는 별도 task 후보로만 기록한다.
- 신규 적용 중에는 대상 프로젝트의 공식 문서 루트 이름을 선택하거나 생성하지 않는다. `docs/`, `specs/`, `site/`, `website/`, `adr/` 등은 별도 task에서 문서 위치 판단을 거쳐 선택한다.

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

## 신규 적용 범위 제한

신규 적용은 Hyper-Waterfall 운영 파일과 작업 기억 구조 설치만 수행한다. 허용 대상은 manifest `files[]`의 target, `.hyper-waterfall/version.json`, manifest가 정의한 symlink다. 이 범위 밖 파일이나 디렉터리는 신규 적용 중 생성하거나 수정하지 않는다.

생성/수정 금지 예시:

- `docs/**`
- `src/**`
- `examples/**`
- `schemas/**`
- `package.json`
- `tsconfig.json`

이 목록은 신규 적용 중 건드리지 않을 manifest 외 경로의 예시이며, 대상 저장소의 일반 문서 구조, 공식 문서 루트 이름, 제품 문서 위치를 정의하지 않는다. 제품 코드, 제품 문서, 아키텍처 문서, 로드맵, API 계약, 예제, 스키마가 필요해 보여도 신규 적용 중 파일을 만들지 않고 판단 결과의 보류 항목 또는 별도 task 후보로만 기록한다.

공식 문서 루트가 필요해 보이면 신규 적용 판단 결과에서는 위치를 확정하지 않는다. 별도 task 후보에 "공식 문서 루트 선택과 문서 위치 판단 필요"를 남기고, 이후 수행계획서에서 대상 독자, 공식화 수준, 선택 경로, 대안 경로, 선택 이유를 승인받는다.

## 신규 적용 판단 결과 형식

신규 적용 절차에서 파일을 복사하거나 심볼릭 링크를 만들기 전에 다음 판단 결과를 작업지시자에게 먼저 제시하고 승인을 받는다.

- 대상 저장소: Hyper-Waterfall을 적용할 저장소 루트와 기본 브랜치
- 목표 release/tag: 적용할 Hyper-Waterfall GitHub Release 또는 tag
- manifest 기준 적용 후보: `templates/manifest.json` 기준으로 복사, preserve, symlink 처리할 파일과 디렉터리
- manifest 외 보류 후보: 신규 적용 중 만들지 않을 대상 프로젝트 고유 산출물과 별도 task 분리 필요성
- 공식 문서 루트 보류: `docs/`, `specs/`, `site/`, `website/`, `adr/` 등 후보를 확정하지 않고 별도 task에서 문서 위치 판단이 필요하다는 점
- 기존 파일 충돌 가능성: 대상 저장소에 이미 존재하는 파일, 사용자 수정 가능 파일, 덮어쓰기 금지 항목
- `.hyper-waterfall/version.json` 생성 계획: 기록할 version, release, appliedAt, source 정보
- placeholder 체크리스트: `{REPO_SLUG}`, `{REPO_NAME}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`, `{PR_TEMPLATE_PATH}` 등 치환 대상과 보류 대상
- 작업지시자 승인 요청: 즉시 적용할 항목, 보류할 항목, 별도 이슈로 분리할 항목

## 기존 적용 저장소 업데이트 진입

1. 대상 저장소의 `.hyper-waterfall/version.json` 존재 여부와 현재 version 확인
2. 목표 GitHub Release/tag의 `templates/manifest.json` 확인
3. 현재 version에서 목표 version으로 가는 `docs/migrations/v{from}-to-v{to}.md` 확인
4. manifest diff를 기준으로 자동 적용 가능, 수동 확인 필요, 충돌 가능 항목 분류
5. 사용자 수정 파일은 덮어쓰지 않고 Hyper-Waterfall 버전 업데이트 PR 후보로 정리
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
- Hyper-Waterfall 버전 업데이트 PR 후보: 승인 후 별도 PR로 만들 변경 묶음, 검증 항목, 남은 리스크
- 작업지시자 승인 요청: 자동 적용, 수동 확인, conflict 처리, Hyper-Waterfall 버전 업데이트 PR 생성 여부

## Hyper-Waterfall 버전 업데이트 PR 전환 규칙

기존 업데이트 판단 결과에서 Hyper-Waterfall 버전 업데이트 PR 후보가 승인되면 다음 규칙으로 일반 타스크 흐름에 전환한다.

- 생성 조건: 현재 version, 목표 release/tag, migration guide, manifest diff, 자동 적용 가능 항목, 수동 확인 필요 항목, conflict 항목이 제시되고 작업지시자가 PR 생성을 승인한 경우
- 이슈: 업데이트 변경 묶음마다 GitHub Issue를 하나 만든다. 이미 이슈가 있으면 해당 이슈 번호를 사용한다.
- 작업 브랜치: `local/task{issue번호}`
- PR 게시 브랜치: `publish/task{issue번호}`
- 커밋 메시지: `Task #{issue번호}: Hyper-Waterfall {fromVersion} -> {toVersion} 버전 업데이트` 또는 단계 작업이면 `Task #{issue번호} Stage {N}: Hyper-Waterfall 버전 업데이트 {내용}`
- PR 제목: `Task #{issue번호}: Hyper-Waterfall {fromVersion} -> {toVersion} 버전 업데이트`
- PR base: 적용 저장소의 `{BASE_BRANCH}`
- PR 본문: manifest diff, migration guide 요약, 자동 적용 가능 항목, 수동 확인 필요 항목, conflict 항목, 검증 결과, 검증 한계를 포함한다.

Hyper-Waterfall 버전 업데이트 PR은 release PR이나 일반 기능 task PR과 목적이 다르지만, 추적 단위는 동일하게 GitHub Issue와 하이퍼-워터폴 문서 산출물이다. 즉 별도 예외 브랜치 체계를 만들지 않고 기존 `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` 흐름을 따른다.

## Hyper-Waterfall 버전 업데이트 PR 본문 구조

Hyper-Waterfall 버전 업데이트 PR 본문은 기존 `.github/pull_request_template.md`를 사용한다. 별도 템플릿을 만들기보다 아래 항목을 기존 섹션에 채워 넣는다.

| PR 본문 섹션 | 포함해야 할 내용 |
|---|---|
| `요약` | 현재 version, 목표 release/tag, migration guide, 리뷰 포인트 |
| `변경 내역` | manifest diff 요약과 변경 묶음. 추가, 수정, 삭제, symlink, preserve 항목을 구분 |
| `영향 영역` | `AGENTS.md`, `CLAUDE.md`, `.github/`, `mydocs/manual/`, `mydocs/skills/`, `.hyper-waterfall/version.json` 등 영향을 받는 영역 |
| `검증` | manifest 파싱, version 기록 확인, migration guide 필수 섹션 확인, 사용자 수정 충돌 확인 |
| `검증 한계` | 자동 판별하지 못한 사용자 수정, 수동 리뷰가 필요한 파일, 원격 CI 미수행 사유 |
| `남은 리스크` | conflict, 보류 항목, 적용 저장소 maintainer가 직접 결정해야 하는 항목 |

변경 분류 기준:

- 자동 적용 가능: 이전 manifest checksum과 대상 파일이 일치하고 update policy상 자동 반영이 허용되는 항목
- 수동 확인 필요: update policy가 `merge`, `manual`, `preserve`이거나 프로젝트별 운영 규칙이 섞일 수 있는 항목
- conflict: 대상 저장소 수정과 목표 release 변경이 같은 파일 또는 같은 링크 경로에서 충돌할 가능성이 있는 항목
- 보류: 이번 PR에서 다루지 않고 별도 이슈, 별도 PR, 또는 maintainer 수동 작업으로 넘기는 항목

사용자 수정 파일은 자동 적용 가능 항목에 넣지 않는다. PR 본문에는 해당 파일을 수동 확인 필요 또는 conflict로 남기고, 검증 한계와 남은 리스크에 판단 근거를 적는다.

이 문서는 Hyper-Waterfall framework lifecycle의 진입점이다. 신규 적용과 기존 업데이트는 core task workflow 안에 배포 lifecycle을 섞지 않고, release manifest, version 기록, migration guide를 기준으로 판단한다. 실제 파일 변경은 일반 타스크와 동일하게 이슈, 브랜치, 계획서, 승인, PR 흐름으로 추적한다.

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
- 신규 적용 중 manifest 외 제품 코드, 제품 문서, 아키텍처 문서, 로드맵, API 계약, 예제, 스키마를 생성하지 않는다.
- 신규 적용 중 `docs/`, `specs/`, `site/`, `website/`, `adr/` 같은 공식 문서 루트를 임의로 선택하거나 생성하지 않는다.
