# task_m020_7_impl.md - GitHub Release + manifest + migration guide 도입 구현계획서

수행계획서: [`task_m020_7.md`](task_m020_7.md)
GitHub Issue: [#7](https://github.com/postmelee/hyper-waterfall/issues/7)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | manifest와 version 정책 정의 | `templates/manifest.json`, `document_structure_guide.md` | JSON parse, 필수 필드 grep, 주요 템플릿 경로 포함 확인, `git diff --check` |
| 2 | migration guide 체계 추가 | `docs/migrations/README.md`, `docs/migrations/v0.1.0-to-v0.2.0.md` | 문서 존재, 필수 섹션 grep, 버전/수동 확인 항목 확인, `git diff --check` |
| 3 | README와 Manual에 배포·업데이트 프로토콜 반영 | `README.md`, `docs/agent-entrypoint.md`, 관련 Manual | GitHub Release/manifest/version/migration 설명 grep, 프롬프트와 canonical 배포 단위 경계 확인, `git diff --check` |

## Stage 1 - manifest와 version 정책 정의

### 산출물

신규:

- `templates/manifest.json`

수정:

- `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- `templates/manifest.json`을 추가해 Hyper-Waterfall 적용 파일의 배포 목록과 업데이트 정책을 정의한다.
- manifest 필드는 후속 Skill/CLI가 읽을 수 있도록 최소 구조로 둔다.
  - `schemaVersion`
  - `frameworkVersion`
  - `release`
  - `versionState`
  - `files`
  - `updatePolicies`
  - `checksum`
- `versionState`에는 적용 저장소가 현재 Hyper-Waterfall 버전을 기록할 위치를 `.hyper-waterfall/version.json`으로 명시한다.
- `files` 항목에는 최소한 다음 계열을 포함한다.
  - `templates/AGENTS.md`
  - `templates/CLAUDE.md`
  - `templates/.github/ISSUE_TEMPLATE/task.yml`
  - `templates/.github/pull_request_template.md`
  - `templates/mydocs/_templates/`
  - `templates/mydocs/manual/`
  - `templates/mydocs/skills/`
- checksum 값은 실제 release 패키징 시점에 확정될 수 있으므로, Stage 1에서는 `algorithm`, `status`, `value`를 구분해 `pending-release` 상태를 표현한다.
- `document_structure_guide.md`에 `.hyper-waterfall/version.json`과 `templates/manifest.json`의 책임을 추가한다.

### 검증

```bash
test -f templates/manifest.json
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
grep -nE '"schemaVersion"|"frameworkVersion"|"release"|"versionState"|"files"|"updatePolicies"|"checksum"' templates/manifest.json
grep -nE 'AGENTS.md|CLAUDE.md|templates/mydocs/skills|templates/mydocs/_templates|templates/.github' templates/manifest.json
grep -nE 'manifest|version|\\.hyper-waterfall|version.json' templates/mydocs/manual/document_structure_guide.md
git diff --check
```

### 커밋

```text
Task #7 Stage 1: manifest와 version 정책 정의
```

## Stage 2 - migration guide 체계 추가

### 산출물

신규:

- `docs/migrations/README.md`
- `docs/migrations/v0.1.0-to-v0.2.0.md`

### 변경 내용

- `docs/migrations/README.md`에 migration guide의 목적, 파일명 규칙, 필수 섹션, 작성 기준을 정의한다.
- `docs/migrations/v0.1.0-to-v0.2.0.md`에 M020에서 도입되는 배포·업데이트 프로토콜의 migration 초안을 작성한다.
- migration 문서는 다음 섹션을 포함한다.
  - 대상 버전
  - 변경 요약
  - 추가 파일
  - 수정 파일
  - 적용 저장소 수동 확인
  - 충돌 가능성
  - 검증
  - 후속 작업
- 이 문서는 실제 release 생성 자동화가 아니라, 후속 `framework-update` Skill과 update PR이 참조할 리뷰 근거로 둔다.

### 검증

```bash
test -f docs/migrations/README.md
test -f docs/migrations/v0.1.0-to-v0.2.0.md
grep -nE '파일명 규칙|필수 섹션|대상 버전|추가 파일|수정 파일|수동 확인|충돌 가능성|검증' docs/migrations/README.md docs/migrations/v0.1.0-to-v0.2.0.md
grep -nE 'v0.1.0|v0.2.0|manifest|version|GitHub Release' docs/migrations/v0.1.0-to-v0.2.0.md
git diff --check
```

### 커밋

```text
Task #7 Stage 2: migration guide 체계 추가
```

## Stage 3 - README와 Manual에 배포·업데이트 프로토콜 반영

### 산출물

수정:

- `README.md`
- `docs/agent-entrypoint.md`
- `templates/mydocs/manual/document_structure_guide.md`
- `templates/mydocs/manual/git_workflow_guide.md`
- `templates/mydocs/manual/task_workflow_guide.md`

### 변경 내용

- README에 배포·업데이트 모델을 추가한다.
  - 프롬프트는 설치·업데이트 요청 인터페이스다.
  - canonical 배포 단위는 GitHub Release/tag다.
  - `templates/manifest.json`은 포함 파일과 업데이트 정책의 기준이다.
  - `.hyper-waterfall/version.json`은 적용 저장소의 현재 버전을 기록한다.
  - `docs/migrations/`는 기존 적용 저장소의 수동 확인과 충돌 판단 근거다.
- `docs/agent-entrypoint.md`에 신규 적용과 기존 업데이트의 진입 분기를 추가한다.
- `git_workflow_guide.md`에 release/tag와 update protocol의 관계를 보강한다.
- `task_workflow_guide.md`에는 후속 `framework-install`/`framework-update` Skill이 참조할 배포 프로토콜 위치를 안내하되, 아직 Skill을 구현하지 않았다는 범위를 명확히 한다.
- Stage 3에서 문서 변경으로 manifest 대상 파일 설명이 바뀌면 `templates/manifest.json` 설명 필드를 함께 맞춘다.

### 검증

```bash
grep -nE 'GitHub Release|manifest|migration|version|\\.hyper-waterfall' README.md docs/agent-entrypoint.md templates/mydocs/manual/*.md
grep -nE '프롬프트|canonical|배포 단위|업데이트 프로토콜|version.json' README.md docs/agent-entrypoint.md templates/mydocs/manual/*.md
grep -nE 'framework-install|framework-update|manifest|migration' templates/mydocs/manual/task_workflow_guide.md README.md
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
git diff --check
```

### 커밋

```text
Task #7 Stage 3: 배포 업데이트 프로토콜 문서 반영
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m020_7_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #7 Stage {N}: {핵심 내용 요약}` 형식을 따른다.

## 단계 의존성

- Stage 2는 Stage 1에서 manifest와 version 기록 위치가 확정된 뒤 진행한다.
- Stage 3은 Stage 1~2의 실제 정책과 migration 문서를 README/Manual에 반영한다.
- 후속 #8 `framework-install`/`framework-update` Skill은 본 task의 manifest, version, migration 정책을 기준으로 설계한다.

## 위험과 대응

- **release 버전 혼동**: 아직 실제 release tag를 생성하지 않는다. 문서에서는 `v0.1.0`을 baseline, `v0.2.0`을 M020 목표 예시로 쓰되, 실제 태그 생성은 별도 승인 절차로 둔다.
- **manifest 과설계**: 후속 CLI 구현 전이므로 복잡한 자동 병합 규칙 대신 사람이 검토 가능한 최소 필드와 정책 이름을 우선 둔다.
- **사용자 수정 충돌**: `AGENTS.md`, `CLAUDE.md`, `.github`, `mydocs`는 적용 저장소에서 수정될 수 있으므로 manifest의 업데이트 정책을 `overwrite` 위주로 두지 않고 `merge`, `manual`, `preserve`, `symlink`를 구분한다.
- **문서 중복**: README는 개념과 사용 흐름, Manual은 파일 위치와 정책, migration 문서는 버전별 적용 절차로 역할을 나눈다.

## 승인 요청 사항

- Stage 1~3 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- version 기록 위치를 `.hyper-waterfall/version.json`으로 고정하는 방향에 동의?
- manifest checksum은 실제 release 패키징 시점에 확정되도록 `pending-release` 상태를 표현하는 방향에 동의?

승인되면 Stage 1 구현을 시작한다.
