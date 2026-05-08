# task_m020_26_impl.md - v0.2.0 manifest release 상태와 checksum 확정 구현계획서

수행계획서: [`task_m020_26.md`](task_m020_26.md)
GitHub Issue: [#26](https://github.com/postmelee/hyper-waterfall/issues/26)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | manifest checksum 산출 가능성 조사 | `mydocs/working/task_m020_26_stage1.md` | manifest JSON parse, checksum/source/kind/status grep, 산출 방식 후보 정리 |
| 2 | release 상태와 checksum 정책 반영 | `templates/manifest.json`, `docs/releases/v0.2.0.md`, `mydocs/working/task_m020_26_stage2.md` | manifest JSON parse, release/checksum 표현 grep, `git diff --check` |
| 3 | 문서 정합성과 release 전 검증 확정 | 필요 시 `docs/migrations/v0.1.0-to-v0.2.0.md`, `README.md`, `docs/distribution-channels.md`, `mydocs/working/task_m020_26_stage3.md` | 통합 grep, tag/release 목록 확인, `git diff --check`, 상태 확인 |

## Stage 1 - manifest checksum 산출 가능성 조사

### 산출물

신규:

- `mydocs/working/task_m020_26_stage1.md`

수정:

- 없음. Stage 1은 조사와 검증 결과를 단계 보고서에 기록한다.

### 변경 내용

- `templates/manifest.json`의 checksum 대상 항목을 root, file, directory, placeholder/preserve 항목으로 분류한다.
- file 항목은 `source` 경로의 SHA-256으로 재현 가능하게 산출할 수 있는지 확인한다.
- directory 항목은 파일 순서, 권한, symlink, 빈 디렉터리 placeholder 처리 방식 때문에 단일 checksum 값이 안정적인지 검토한다.
- root checksum이 어떤 범위를 의미해야 하는지 후보를 정리한다.
- Stage 1에서는 manifest 값을 바꾸지 않는다. 결정 근거는 `mydocs/working/task_m020_26_stage1.md`에 남긴다.

### 검증

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n '"checksum"|"source"|"kind"|"status"|pending-release' templates/manifest.json
git diff --check
```

### 커밋

```text
Task #26 Stage 1: manifest checksum 산출 방식 조사
```

## Stage 2 - release 상태와 checksum 정책 반영

### 산출물

수정:

- `templates/manifest.json`
- `docs/releases/v0.2.0.md`
- `mydocs/working/task_m020_26_stage2.md`

### 변경 내용

- Stage 1 결과를 기준으로 `templates/manifest.json`의 `release.status`와 checksum 상태를 release 생성 직전 기준으로 조정한다.
- 재현 가능한 file checksum은 값을 채우고, 재현 기준이 확정되지 않은 directory/root checksum은 `pending-release` 유지 또는 별도 status/설명으로 보류한다.
- `docs/releases/v0.2.0.md`에 checksum 산출 방법, 확정된 항목, 보류한 항목, 보류 이유, 후속 확정 조건을 적는다.
- release 생성 명령과 npm publish는 계속 실행하지 않는다.

### 검증

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n 'planned|released|pending-release|checksum|v0.2.0|GitHub Release' templates/manifest.json docs/releases/v0.2.0.md
git diff --check
```

### 커밋

```text
Task #26 Stage 2: release manifest 상태와 checksum 정책 반영
```

## Stage 3 - 문서 정합성과 release 전 검증 확정

### 산출물

수정:

- `docs/releases/v0.2.0.md`
- `mydocs/working/task_m020_26_stage3.md`
- `docs/migrations/v0.1.0-to-v0.2.0.md` (정합성 보강이 필요할 때만)
- `README.md` (사용자-facing release 기준 설명 보강이 필요할 때만)
- `docs/distribution-channels.md` (배포 채널 기준 설명 보강이 필요할 때만)

### 변경 내용

- `templates/manifest.json`, release 준비 문서, migration guide, README, distribution strategy의 `planned` / `released` / `pending-release` / checksum 표현을 대조한다.
- 불일치가 있으면 문서 역할에 맞춰 최소 수정한다.
- `git tag --list --sort=version:refname`과 `gh release list --repo postmelee/hyper-waterfall --limit 20`로 tag/release 미생성 상태를 확인한다.
- 실제 `git tag`, `git push`, `gh release create`, npm publish는 실행하지 않고 최종 승인 항목으로 남긴다.

### 검증

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n 'planned|released|pending-release|checksum|v0.2.0|GitHub Release' templates/manifest.json docs/releases/v0.2.0.md docs/migrations/v0.1.0-to-v0.2.0.md README.md docs/distribution-channels.md
git tag --list --sort=version:refname
gh release list --repo postmelee/hyper-waterfall --limit 20
git diff --check
git status --short --branch
```

### 커밋

```text
Task #26 Stage 3: release 전 manifest 검증 기준 확정
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- 원격 GitHub Release 확인은 `gh release list --repo postmelee/hyper-waterfall --limit 20` 결과를 Stage 보고서에 요약한다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m020_26_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #26 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 승인 전에는 Stage 1 산출물을 만들지 않는다.

## 단계 의존성

- Stage 2는 Stage 1의 checksum 산출 가능성 조사 결과가 확정된 뒤 진행한다.
- Stage 3은 Stage 2의 manifest/status/checksum 정책 반영과 검증이 끝난 뒤 진행한다.
- 최종 결과보고서와 PR 게시는 Stage 3 승인 이후 `task-final-report` 절차로 진행한다.

## 위험과 대응

- **directory checksum 재현성**: directory checksum은 파일 순서, 권한, symlink 처리에 따라 달라질 수 있다. Stage 1에서 재현 방식이 확정되지 않으면 값을 채우지 않고 보류 정책을 문서화한다.
- **root checksum 자기참조 문제**: manifest 파일 자체에 checksum 값이 들어가면 root checksum 범위가 자기참조가 될 수 있다. 산출 범위를 명확히 분리한다.
- **release.status 의미 혼선**: tag 생성 전 상태값 변경이 실제 release publish와 어긋나지 않게 문서에 의미와 승인 경계를 남긴다.
- **승인 없는 배포 실행**: tag/release/npm publish 명령은 이번 task에서 실행하지 않는다.

## 승인 요청 사항

- Stage 1~3 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Stage 2에서 재현 가능한 file checksum만 값으로 채우고, directory/root checksum은 불명확하면 보류 정책을 문서화하는 방향에 동의?
- 이번 task에서도 `git tag`, `gh release create`, npm publish를 실행하지 않는 범위에 동의?

승인되면 Stage 1 구현을 시작한다.
