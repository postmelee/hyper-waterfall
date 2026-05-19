# Task #41 구현계획서 - 최종 배포 채널 정합성 감사와 문서 갱신

수행계획서: [`task_m040_41.md`](task_m040_41.md)
GitHub Issue: [#41](https://github.com/postmelee/hyper-waterfall/issues/41)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 실제 배포 상태와 선행 이슈 입력 감사 | `mydocs/tech/task_m040_41_distribution_audit.md`, `mydocs/working/task_m040_41_stage1.md` | GitHub Release/tag, npm, Homebrew, #33-#40/#52/#54 결과, 문서 수정 후보 확인 |
| 2 | 사용자-facing 문서 표현 정합성 갱신 | README와 `docs/` 최소 수정, `mydocs/working/task_m040_41_stage2.md` | `planned`, `PoC`, `public`, `보류`, 채널별 설치 경로 검색 확인 |
| 3 | canonical 기준과 후속 작업 분리 | 기술 기록 보강, 조건부 manifest/migration 수정, `mydocs/working/task_m040_41_stage3.md` | canonical source, 완료/보류/후속 분리, plugin public/release asset 보류 조건 확인 |
| 4 | 최종 검증과 보고 | `mydocs/report/task_m040_41_report.md`, `mydocs/working/task_m040_41_stage4.md` | #41 수용 기준, 통합 검색, `git diff --check`, 최종 상태 확인 |

## Stage 1 — 실제 배포 상태와 선행 이슈 입력 감사

### 산출물

신규:

- `mydocs/tech/task_m040_41_distribution_audit.md`
- `mydocs/working/task_m040_41_stage1.md`

수정:

- `mydocs/orders/20260517.md`

### 변경 내용

- #41 이슈 본문과 #33-#40, #52, #54 이슈 상태를 확인해 M040 선행 결과를 표로 정리한다.
- `v0.2.0` Git tag와 GitHub Release 상태를 확인하고, `templates/manifest.json`의 `release.status`와 충돌하는지 기록한다.
- npm registry의 `hyper-waterfall@0.2.0`, `npx hyper-waterfall@0.2.0 --version`, Homebrew `postmelee/tap/hyper-waterfall` 상태를 확인한다.
- #52/#54 최종 보고서에서 plugin public 배포, Official Claude directory, release asset 보류 조건을 추출한다.
- README, `docs/`, plugin README/CHANGELOG에서 채널 상태 표현 수정 후보를 검색해 기술 기록에 분류한다.
- Stage 2에서 바로 고칠 문서 표현과 Stage 3에서 조건부 판단할 canonical/manifest 항목을 분리한다.

### 검증

```bash
git status --short --branch
gh issue view 41 --json number,title,state,milestone,body
gh issue list --repo postmelee/hyper-waterfall --state all --json number,title,state --limit 100
gh release view v0.2.0 --repo postmelee/hyper-waterfall --json tagName,name,isDraft,isPrerelease,publishedAt,url
git tag --list v0.2.0
npm view hyper-waterfall@0.2.0 version
npm view hyper-waterfall@0.2.0 dist.tarball
npx hyper-waterfall@0.2.0 --version
brew info postmelee/tap/hyper-waterfall
rg -n '#33|#34|#35|#36|#37|#38|#39|#40|#52|#54|npm|Homebrew|Codex|Claude|Docker|보류|public|planned|PoC|release asset' mydocs/report docs README.md plugins
rg -n '#41|확인 시점|actual|planned|npm|Homebrew|Codex|Claude|Docker|수정 후보|보류' mydocs/tech/task_m040_41_distribution_audit.md mydocs/working/task_m040_41_stage1.md
git diff --check
```

수동 확인:

- 네트워크 또는 인증 문제로 확인하지 못한 항목은 "미확인"으로 기록하고 문서 수정 근거로 사용하지 않는다.
- GitHub Release/tag 상태와 manifest 상태가 충돌하면 Stage 1에서 바로 수정하지 않고 Stage 3 판단 항목으로 남긴다.
- 신규 public 배포, release asset 게시, Homebrew core 제출 명령은 실행하지 않는다.

### 커밋

```text
Task #41 Stage 1: 배포 채널 실제 상태 감사
```

## Stage 2 — 사용자-facing 문서 표현 정합성 갱신

### 산출물

신규:

- `mydocs/working/task_m040_41_stage2.md`

수정:

- `mydocs/tech/task_m040_41_distribution_audit.md`
- `README.md`
- `docs/distribution-channels.md`
- `docs/releases/v0.2.0.md`
- `docs/releases/v0.2.0-npm-publish.md`
- `docs/agent-entrypoint.md`는 사용자-facing release/channel 상태 표현이 필요한 경우에만 수정
- `docs/homebrew-formula-tap-poc.md`는 Homebrew public tap/core 보류 표현이 실제 상태와 충돌하는 경우에만 수정
- `docs/plugin-distribution-principles.md`는 plugin 공통 원칙이 아니라 최종 상태 cross-reference가 필요한 경우에만 수정
- plugin README/CHANGELOG는 #52/#54 최종 상태와 사용자-facing 문구가 충돌하는 경우에만 수정
- `mydocs/orders/20260517.md`

### 변경 내용

- README의 빠른 적용, npm, Homebrew, plugin, release 관련 사용자-facing 문구가 실제 사용 가능 경로와 맞는지 수정한다.
- `docs/distribution-channels.md`에서 GitHub Release/tag, npm, Homebrew public tap, Homebrew core 보류, Docker 제외, Codex public 보류, Claude Official directory/release asset 보류 상태를 한 표 또는 섹션으로 맞춘다.
- release 문서의 보류 항목이 이미 완료된 npm/Homebrew 작업을 여전히 보류로 표현하면 현재 상태로 고친다.
- plugin 문서는 stable public channel이 아니라 repo-local 또는 local/zip candidate와 후속 public 검토 상태로 표현한다.
- `planned`, `PoC`, `public`, `보류` 표현은 채널별로 확인 시점과 근거가 드러나게 조정한다.

### 검증

```bash
rg -n 'planned|PoC|public|보류|Docker|npm|Homebrew|Codex|Claude|release asset|Official|Plugin Directory|core|postmelee/tap/hyper-waterfall|hyper-waterfall@0.2.0|npx hyper-waterfall@0.2.0|v0.2.0|templates/manifest.json|migration guide' README.md docs plugins mydocs/tech/task_m040_41_distribution_audit.md
rg -n 'npm publish|Homebrew public tap|Codex plugin|Claude plugin|Official directory|release asset|Docker 제외|후속|#41' README.md docs mydocs/working/task_m040_41_stage2.md
git diff --check
```

수동 확인:

- 사용자에게 지금 실행 가능한 명령과 후속 검토 후보가 섞여 있지 않은지 확인한다.
- 문서가 plugin public 배포를 완료된 안정 채널로 오해하게 만들지 않는지 확인한다.
- manual/SKILL 본문 수정 필요가 발견되면 Stage 2에서 즉시 수정하지 않고 범위 변경 승인 대상으로 기록한다.

### 커밋

```text
Task #41 Stage 2: 사용자 문서 배포 상태 정합성 갱신
```

## Stage 3 — canonical 기준과 후속 작업 분리

### 산출물

신규:

- `mydocs/working/task_m040_41_stage3.md`

수정:

- `mydocs/tech/task_m040_41_distribution_audit.md`
- `docs/distribution-channels.md`
- `docs/releases/v0.2.0.md`
- `docs/migrations/v0.1.0-to-v0.2.0.md`는 release 상태와 migration 안내가 실제 상태와 충돌하는 경우에만 수정
- `templates/manifest.json`은 `release.status`, checksum 정책, release/tag 상태가 실제 release와 충돌한다고 확인된 경우에만 수정
- `mydocs/orders/20260517.md`

### 변경 내용

- Stage 1-2 결과를 기준으로 canonical 기준이 GitHub Release/tag + `templates/manifest.json` + migration guide라는 설명을 최종 확인한다.
- `templates/manifest.json`의 `release.status`가 실제 `v0.2.0` Release/tag와 충돌하면, `planned` 유지 또는 `released` 전환 중 어느 쪽이 현재 release protocol에 맞는지 판단하고 필요한 최소 수정을 적용한다.
- root/directory checksum의 `pending-release` 상태가 release 후에도 유지되어야 하는지, 또는 후속 checksum 산식 확정 작업으로 분리할지 문서화한다.
- M040 완료 항목, 명시 보류 항목, 후속 이슈 후보를 구분한다.
- Codex official public 배포, Claude Official directory 제출, Claude release asset 게시, Homebrew core 제출, Docker image, release automation은 후속 조건과 함께 분리한다.

### 검증

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n 'canonical|GitHub Release/tag|templates/manifest.json|migration guide|pending-release|released|planned|fallback|NO-GO|GO|후속|보류|Homebrew core|Docker|Official directory|release asset|Codex official|Claude Official' README.md docs templates/manifest.json mydocs/tech/task_m040_41_distribution_audit.md mydocs/working/task_m040_41_stage3.md
git diff --check
```

수동 확인:

- manifest를 수정했다면 release protocol과 checksum 정책을 새로 정의한 것이 아니라 실제 상태와 표현을 맞춘 것인지 확인한다.
- root/directory checksum 보류는 확정 산식 없이 임의 값으로 채우지 않는다.
- 후속 작업 후보는 이번 PR에서 해결하려 들지 않고 추적 가능한 항목으로만 남긴다.

### 커밋

```text
Task #41 Stage 3: canonical 기준과 후속 작업 분리
```

## Stage 4 — 최종 검증과 보고

### 산출물

신규:

- `mydocs/working/task_m040_41_stage4.md`
- `mydocs/report/task_m040_41_report.md`

수정:

- `mydocs/tech/task_m040_41_distribution_audit.md`
- `mydocs/orders/20260517.md`

### 변경 내용

- Stage 1-3 결과를 #41 수용 기준별로 정리한다.
- 최종 보고서에 변경 파일, 채널별 실제 상태, 문서 정합성 결과, 검증 결과, 잔여 위험, 후속 작업 후보를 기록한다.
- 오늘할일 #41 행은 Stage 4 완료 보고 전까지 진행중으로 유지하고, 최종 보고 승인 후 `task-final-report` 절차에서 완료 처리한다.
- PR 게시 전 잔여 리스크와 승인 필요 항목을 분리한다.

### 검증

```bash
rg -n '#41|M040|수용 기준|npm|Homebrew|Codex|Claude|Docker|보류|후속|canonical|planned|public|PoC|release asset|Official|Homebrew core' mydocs/report/task_m040_41_report.md mydocs/working/task_m040_41_stage4.md mydocs/tech/task_m040_41_distribution_audit.md README.md docs
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
git status --short --branch
git diff --check
```

수동 확인:

- 최종 보고서가 #41 이슈 목표와 수행계획서 수용 기준을 모두 대응하는지 확인한다.
- 승인 없는 외부 공개 action이 없었는지 확인한다.
- PR 게시 직전 필요한 `task-final-report` 절차와 오늘할일 완료 처리가 남아 있음을 명확히 기록한다.

### 커밋

```text
Task #41 Stage 4: 배포 채널 감사 최종 보고
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 네트워크 의존 검증은 확인 시점, 명령, 결과, 실패 시 영향 범위를 기술 기록에 남긴다.
- `npm publish`, `gh release create`, `gh release upload`, plugin public 제출, Homebrew core 제출, Docker publish 같은 외부 공개 action은 이번 task에서 실행하지 않는다.
- manual/SKILL 본문 변경이 필요하면 구현계획서를 갱신하고 작업지시자 범위 변경 승인을 먼저 받는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 구현계획서 자체는 별도 커밋 `Task #41: 구현계획서 작성`으로 남긴다.
- 단계 커밋은 해당 단계 산출물과 `mydocs/working/task_m040_41_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #41 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서와 오늘할일 완료 처리는 Stage 4 승인 후 `task-final-report` 절차에서 별도 정리한다.

## 단계 의존성

- Stage 1은 구현계획서 승인 후 진행한다.
- Stage 2는 Stage 1에서 실제 배포 상태와 수정 후보가 확정된 뒤 진행한다.
- Stage 3은 Stage 2의 사용자-facing 문서 수정 결과를 기준으로 canonical/manifest/후속 작업 분리를 확정한다.
- Stage 4는 Stage 3의 완료/보류/후속 분리가 끝난 뒤 진행한다.
- public 배포, release asset 게시, Homebrew core 제출, Docker publish가 필요해지면 이번 task 범위가 아니라 별도 승인과 별도 이슈로 전환한다.

## 위험과 대응

- **외부 상태 변동**: Stage 1에서 확인 시점과 명령 결과를 기록하고, 이후 Stage에서 상태가 달라지면 기술 기록에 재확인 시점을 추가한다.
- **manifest 상태 전환 리스크**: `release.status` 변경은 적용 저장소 update 판단에 영향을 줄 수 있으므로 실제 Release/tag와 migration 문서 정합성을 함께 확인한 뒤 최소 수정한다.
- **checksum 보류 오해**: root/directory checksum은 공식 산식 없이 값을 채우지 않고 `pending-release` 유지 또는 후속 작업으로 분리한다.
- **plugin public 상태 과장**: Codex/Claude plugin은 public stable channel이 아니라 repo-local 또는 local/zip 후보와 public 보류 상태로 표현한다.
- **공통 문서 중복 수정**: README와 `docs/distribution-channels.md`의 역할을 나누고, 중복 설명보다 canonical 링크와 채널 상태 표를 우선한다.
- **manual/SKILL 변경 확산**: manual/SKILL 본문 변경이 필요하면 이번 Stage를 멈추고 범위 변경 승인을 요청한다.

## 승인 요청 사항

- Stage 1-4 분할, 산출물, 검증 명령, 커밋 메시지 형식을 승인할지 확인한다.
- Stage 1에서 GitHub, npm, Homebrew 조회와 `npx hyper-waterfall@0.2.0 --version` 같은 read-only 외부 상태 확인을 수행하는 방향을 승인할지 확인한다.
- 이번 task에서는 신규 public 배포, release asset 게시, Homebrew core 제출, Docker publish를 실행하지 않고 문서 정합성과 후속 분리만 수행하는 방향을 승인할지 확인한다.
