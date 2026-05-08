# task_m020_24_impl.md - v0.2.0 GitHub Release/tag 준비 구현계획서

수행계획서: [`task_m020_24.md`](task_m020_24.md)
GitHub Issue: [#24](https://github.com/postmelee/hyper-waterfall/issues/24)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | release 준비 기준과 체크리스트 작성 | `docs/releases/v0.2.0.md` | release 기준/승인 게이트 grep, `git diff --check` |
| 2 | manifest, migration, 안내 문서 정합성 보강 | `docs/releases/v0.2.0.md`, 필요 시 `README.md`, `docs/distribution-channels.md`, `docs/migrations/v0.1.0-to-v0.2.0.md`, `templates/manifest.json` | manifest JSON parse, version/tag/canonical 설명 grep, `git diff --check` |
| 3 | release/tag 생성 승인 경계와 통합 검증 | `docs/releases/v0.2.0.md` | tag/release 미생성 확인, manifest parse, 통합 grep, 상태 확인 |

## Stage 1 - release 준비 기준과 체크리스트 작성

### 산출물

신규:

- `docs/releases/v0.2.0.md`
- `mydocs/working/task_m020_24_stage1.md`

### 변경 내용

- `docs/releases/v0.2.0.md`를 신설해 `v0.2.0` GitHub Release/tag 생성 전 maintainer 체크리스트를 작성한다.
- 문서에는 최소한 다음 항목을 포함한다.
  - release 목적과 canonical 기준
  - manifest/version/tag 확인 항목
  - migration guide 확인 항목
  - release notes 초안
  - tag/release 생성 전 승인 게이트
  - 이번 task에서 보류하는 npm publish, Homebrew, Docker, plugin 범위
- `templates/manifest.json`의 checksum은 이번 Stage에서 채우지 않고, `pending-release` 상태와 확정 조건만 설명한다.
- Stage 완료 시 `mydocs/working/task_m020_24_stage1.md`에 산출물과 검증 결과를 기록한다.

### 검증

```bash
test -f docs/releases/v0.2.0.md
rg -n 'v0.2.0|GitHub Release|tag|manifest|migration|checksum|승인|release notes|pending-release' docs/releases/v0.2.0.md
git diff --check
```

### 커밋

```text
Task #24 Stage 1: v0.2.0 release 준비 체크리스트 작성
```

## Stage 2 - manifest, migration, 안내 문서 정합성 보강

### 산출물

수정:

- `docs/releases/v0.2.0.md`
- `mydocs/working/task_m020_24_stage2.md`
- `README.md` (정합성 연결이 필요할 때만)
- `docs/distribution-channels.md` (release 준비 문서 링크나 의존 관계 보강이 필요할 때만)
- `docs/migrations/v0.1.0-to-v0.2.0.md` (필수 섹션이나 보류 항목 보강이 필요할 때만)
- `templates/manifest.json` (version/tag 필드 불일치가 확인될 때만)

### 변경 내용

- `package.json`, `templates/manifest.json`, migration guide, README, 배포 채널 전략 문서의 `0.2.0` / `v0.2.0` / canonical 기준 표현을 대조한다.
- 불일치가 있으면 문서의 진실 원천 역할에 맞춰 최소 수정한다.
- `templates/manifest.json`은 JSON parse와 version/tag 필드 검증을 수행하되, 불일치가 없으면 값 변경 없이 검증 결과만 Stage 보고서에 남긴다.
- `docs/migrations/v0.1.0-to-v0.2.0.md`는 적용 저장소 업데이트 판단 근거 역할을 유지한다. release checklist 세부 운영 항목을 migration guide로 옮기지 않는다.
- Stage 완료 시 `mydocs/working/task_m020_24_stage2.md`에 수정 여부, 무변경 파일, 검증 결과를 기록한다.

### 검증

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n '0.2.0|v0.2.0|plannedTag|baselineTag|GitHub Release|manifest|migration|pending-release' templates/manifest.json docs/migrations/v0.1.0-to-v0.2.0.md README.md docs/distribution-channels.md docs/releases/v0.2.0.md package.json
git diff --check
```

### 커밋

```text
Task #24 Stage 2: release 기준 문서 정합성 보강
```

## Stage 3 - release/tag 생성 승인 경계와 통합 검증

### 산출물

수정:

- `docs/releases/v0.2.0.md`
- `mydocs/working/task_m020_24_stage3.md`

### 변경 내용

- Stage 1~2 결과를 기준으로 `docs/releases/v0.2.0.md`의 생성 전 체크리스트와 release notes 초안을 최종 정리한다.
- `git tag --list --sort=version:refname`과 `gh release list --repo postmelee/hyper-waterfall --limit 20`로 tag/release 미생성 상태를 확인한다.
- 실제 `git tag`, `gh release create`, npm publish 명령은 실행하지 않는다.
- checksum 확정, tag 생성, GitHub Release publish를 최종 보고 이후 작업지시자 승인 항목으로 남긴다.
- Stage 완료 시 `mydocs/working/task_m020_24_stage3.md`에 통합 검증 결과와 남은 승인 항목을 기록한다.

### 검증

```bash
git tag --list --sort=version:refname
gh release list --repo postmelee/hyper-waterfall --limit 20
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n '0.2.0|v0.2.0|plannedTag|baselineTag|GitHub Release|manifest|migration|pending-release|checksum|승인' templates/manifest.json docs/migrations/v0.1.0-to-v0.2.0.md README.md docs/distribution-channels.md docs/releases/v0.2.0.md package.json
git diff --check
git status --short --branch
```

### 커밋

```text
Task #24 Stage 3: release 생성 승인 경계 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- 원격 GitHub Release 확인은 `gh release list --repo postmelee/hyper-waterfall --limit 20` 결과를 Stage 보고서에 요약한다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m020_24_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #24 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 승인 전에는 Stage 1 산출물을 만들지 않는다.

## 단계 의존성

- Stage 2는 Stage 1의 release 준비 문서 구조가 확정된 뒤 진행한다.
- Stage 3은 Stage 2의 정합성 검증과 필요한 문서 보강이 끝난 뒤 진행한다.
- 최종 결과보고서와 PR 게시는 Stage 3 승인 이후 `task-final-report` 절차로 진행한다.

## 위험과 대응

- **release 문서와 migration guide 역할 중복**: release 문서는 maintainer 체크리스트, migration guide는 적용 저장소 업데이트 판단 근거로 분리한다.
- **checksum 확정 시점 혼선**: 이번 task에서는 `pending-release`의 의미와 확정 조건만 문서화하고 값은 release/tag 생성 승인 이후 확정한다.
- **승인 없는 배포 실행**: `git tag`, `gh release create`, npm publish는 검증 대상이 아니라 승인 후 실행 대상이다. 검증은 목록 조회와 문서 정합성 확인에 한정한다.
- **문서 변경 범위 확장**: README, migration guide, manifest는 불일치가 확인될 때만 수정하고, 불필요한 문구 개편은 하지 않는다.

## 승인 요청 사항

- Stage 1~3 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- `docs/releases/v0.2.0.md`를 maintainer release 준비 문서로 두고 migration guide와 역할을 분리하는 방향에 동의?
- `git tag`, `gh release create`, npm publish를 이번 Stage 구현에서 실행하지 않고 최종 승인 항목으로 남기는 데 동의?

승인되면 Stage 1 구현을 시작한다.
