# Task #54 구현계획서 - Claude plugin public marketplace 배포와 release asset 게시

수행계획서: [`task_m040_54.md`](task_m040_54.md)
GitHub Issue: [#54](https://github.com/postmelee/hyper-waterfall/issues/54)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 공개 배포 조건과 #52 충돌면 재확인 | `mydocs/tech/task_m040_54_claude_public_distribution.md`, `mydocs/working/task_m040_54_stage1.md` | Claude plugin CLI/docs surface, #52 상태, 공통 문서 충돌 위험, release asset 정책 후보 확인 |
| 2 | public metadata와 artifact 후보 점검 | plugin README/CHANGELOG/metadata 보강안, `/private/tmp` zip 후보, Stage 2 보고서 | `claude plugin validate`, zip checksum, zip `--plugin-dir` load/details, canonical drift 확인 |
| 3 | 배포 승인 게이트와 실행/보류 판단 | `mydocs/working/task_m040_54_stage3.md`, 기술 기록 Stage 3 섹션 | public marketplace 제출 승인 여부, release asset 게시 승인 여부, GO/NO-GO와 재시도 조건 확인 |
| 4 | 설치 smoke, rollback, 문서 정합성 정리 | `docs/` 최소 반영, `mydocs/report/task_m040_54_report.md`, Stage 4 보고서 | public 또는 대체 설치 smoke, rollback/unpublish/disable 조건, #41/#52 인계 확인 |

## Stage 1 — 공개 배포 조건과 #52 충돌면 재확인

### 산출물

신규:

- `mydocs/tech/task_m040_54_claude_public_distribution.md`
- `mydocs/working/task_m040_54_stage1.md`

수정:

- `mydocs/orders/20260517.md`

### 변경 내용

- 현재 worktree와 브랜치가 `local/task54` 분리 worktree인지 확인한다.
- #52 이슈 상태, 원격 브랜치/PR 존재 여부, 공통 문서 변경 가능성을 재확인한다.
- Claude Code version과 `claude plugin` CLI surface를 확인한다.
- Claude plugin public marketplace 제출 방법이 공식 문서 또는 CLI에서 확인되는지 조사하고, 확인일/URL/명령 surface를 기술 기록에 남긴다.
- GitHub Release asset 후보가 될 수 있는 release/tag 상태와 `gh release` 접근 가능 범위를 read-only로 확인한다.
- Stage 2에서 변경 가능한 plugin metadata 항목과 Stage 3에서 별도 승인 없이 실행하지 않을 public action 목록을 고정한다.

### 검증

```bash
git status --short --branch
git worktree list
gh issue view 52 --json number,title,state,milestone,body
gh issue view 54 --json number,title,state,milestone,body
git branch -r --list '*task52*'
gh pr list --state open --search '52'
claude --version
claude plugin --help
claude plugin validate --help
rg -n '#52|#54|Claude plugin|public|release asset|NO-GO|fallback' mydocs/report/task_m040_40_report.md mydocs/tech/task_m040_40_claude_plugin_candidate_smoke.md docs/distribution-channels.md docs/plugin-distribution-principles.md
git diff --check
```

수동 확인:

- 공식 문서 확인이 필요한 경우 Claude 또는 Anthropic의 공식 문서만 사용하고, 확인일과 URL을 기록한다.
- `gh pr list` 결과가 검색 제약으로 부정확하면 미확인으로 기록하고 원격 브랜치/이슈 상태 기준으로 보수 판단한다.
- 공개 action 실행 명령은 Stage 1에서 실행하지 않는다.

### 커밋

```text
Task #54 Stage 1: Claude public 배포 조건 재확인
```

## Stage 2 — public metadata와 artifact 후보 점검

### 산출물

신규:

- `mydocs/working/task_m040_54_stage2.md`

수정:

- `mydocs/tech/task_m040_54_claude_public_distribution.md`
- `plugins/claude/hyper-waterfall/README.md`
- `plugins/claude/hyper-waterfall/CHANGELOG.md`
- `plugins/claude/hyper-waterfall/.claude-plugin/plugin.json`은 public metadata 보강이 필요한 경우만 수정
- `mydocs/orders/20260517.md`

Git에 포함하지 않는 후보:

- `/private/tmp/hyper-waterfall-claude-plugin-task54.zip`
- `/private/tmp/hyper-waterfall-claude-plugin-task54.zip.sha256`

### 변경 내용

- Stage 1에서 확인한 public 제출 요건에 맞춰 README, CHANGELOG, manifest metadata의 부족한 항목을 좁게 보강한다.
- plugin 설명은 canonical source, fallback, 승인 게이트, hook 미포함 경계를 유지한다.
- `plugins/claude/hyper-waterfall/` 기준 zip 후보를 `/private/tmp`에 만들고 checksum을 생성한다.
- directory validation, zip load, plugin details smoke를 재실행한다.
- asset 후보 파일명, checksum, 생성 명령, smoke 결과, 보류 조건을 기술 기록에 남긴다.
- `templates/manifest.json`, migration guide, core Skill/manual 본문은 plugin 안에 복제하지 않는다.

### 검증

```bash
claude plugin validate plugins/claude/hyper-waterfall
(cd plugins/claude/hyper-waterfall && zip -r /private/tmp/hyper-waterfall-claude-plugin-task54.zip .)
shasum -a 256 /private/tmp/hyper-waterfall-claude-plugin-task54.zip
claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task54.zip plugin list
claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task54.zip plugin details hyper-waterfall
test ! -f plugins/claude/hyper-waterfall/hooks/hooks.json
rg -n 'canonical|fallback|승인|public|marketplace|release asset|hook|AGENTS.md|CLAUDE.md|docs/agent-entrypoint.md|npx hyper-waterfall' plugins/claude/hyper-waterfall mydocs/tech/task_m040_54_claude_public_distribution.md
git diff --check
```

수동 확인:

- zip 후보는 smoke용 임시 파일이며 Git에 추가하지 않는다.
- metadata 보강이 public 제출 요건에 필요하지 않으면 plugin 파일을 수정하지 않고 근거를 Stage 2 보고서에 남긴다.
- public 제출이나 release asset 게시 명령은 Stage 2에서 실행하지 않는다.

### 커밋

```text
Task #54 Stage 2: Claude plugin public metadata와 artifact 후보 점검
```

## Stage 3 — 배포 승인 게이트와 실행/보류 판단

### 산출물

신규:

- `mydocs/working/task_m040_54_stage3.md`

수정:

- `mydocs/tech/task_m040_54_claude_public_distribution.md`
- `mydocs/orders/20260517.md`

### 변경 내용

- Stage 1-2 결과를 기준으로 public marketplace 제출 가능 여부를 GO/NO-GO로 정리한다.
- Stage 1에서 제출 명령이나 제출 UI가 공식적으로 확인되고 작업지시자가 별도 승인한 경우에만 marketplace 제출을 실행한다.
- v0.2.0 GitHub Release asset 게시가 필요하고 작업지시자가 별도 승인한 경우에만 release asset 게시를 실행한다.
- 별도 승인이 없거나 제출 권한/정책/release 상태가 불충분하면 실행하지 않고 NO-GO 사유, 재시도 조건, 대체 설치 경로를 기록한다.
- 실행한 public action이 있으면 결과 URL, 상태, 실패 시 rollback 또는 삭제 조건을 기록한다.

### 검증

```bash
rg -n 'GO|NO-GO|public marketplace|release asset|승인|보류|재시도|fallback|rollback' mydocs/tech/task_m040_54_claude_public_distribution.md mydocs/working/task_m040_54_stage3.md
git diff --check
```

조건부 검증:

```bash
# 작업지시자 별도 승인 후에만 실행한다.
# public marketplace 제출 명령 또는 UI 절차: Stage 1에서 공식 확인된 절차를 사용한다.
# release asset 게시 명령: 승인된 release/tag와 asset명만 대상으로 한다.
```

수동 확인:

- `진행해줘`처럼 Stage 일반 진행 승인은 public marketplace 제출 또는 release asset 게시 승인으로 해석하지 않는다.
- public action을 실행했다면 승인 근거, 실행 시각, 결과, rollback 조건이 기술 기록과 Stage 3 보고서에 모두 남아야 한다.
- public action을 실행하지 않았다면 NO-GO 사유와 재시도 조건이 구체적이어야 한다.

### 커밋

```text
Task #54 Stage 3: Claude plugin public 배포 판단 정리
```

## Stage 4 — 설치 smoke, rollback, 문서 정합성 정리

### 산출물

신규:

- `mydocs/working/task_m040_54_stage4.md`
- `mydocs/report/task_m040_54_report.md`

수정:

- `mydocs/tech/task_m040_54_claude_public_distribution.md`
- `docs/distribution-channels.md`
- `docs/plugin-distribution-principles.md`는 공통 원칙 보강이 필요한 경우만 수정
- #41 인계 문서는 실제 위치가 존재하거나 생성된 경우만 최소 수정
- `mydocs/orders/20260517.md`

### 변경 내용

- Stage 3에서 public 배포가 실행됐다면 public install/load/discovery smoke를 기록한다.
- public 배포가 보류됐다면 directory `--plugin-dir`와 zip `--plugin-dir` 대체 설치 경로를 문서화한다.
- release asset이 게시됐다면 다운로드 경로, checksum 검증, asset smoke, 삭제/교체 조건을 기록한다.
- release asset이 보류됐다면 보류 사유와 후속 승인 조건을 문서화한다.
- `docs/distribution-channels.md`에는 Claude plugin public/release asset 최종 상태를 좁게 반영한다.
- `docs/plugin-distribution-principles.md`는 공통 원칙이 바뀐 경우에만 수정한다.
- #52와 겹칠 수 있는 공통 문서 변경은 origin 상태와 #52 공개 변경 여부를 다시 확인한 뒤 최소 수정한다.
- 최종 보고서에서 #54 수용 기준, 검증 결과, public action 승인 여부, 잔여 위험을 정리한다.

### 검증

```bash
git fetch origin
git branch -r --list '*task52*'
gh pr list --state open --search '52'
rg -n 'public marketplace|release asset|NO-GO|GO|rollback|unpublish|disable|fallback|#41|#52|Claude plugin' mydocs/tech/task_m040_54_claude_public_distribution.md mydocs/report/task_m040_54_report.md docs/distribution-channels.md
git diff --check
```

조건부 검증:

```bash
# public marketplace 배포가 실행된 경우에만 public install/load/discovery smoke를 실행한다.
# release asset 게시가 실행된 경우에만 다운로드와 checksum 검증을 실행한다.
```

수동 확인:

- 최종 보고서가 #54 이슈의 수용 기준을 모두 대응하는지 확인한다.
- #52와 충돌 가능성이 있는 문서 변경이 Claude-specific 최소 변경인지 확인한다.
- #41 인계 항목이 실제 완료/보류 상태와 맞는지 확인한다.

### 커밋

```text
Task #54 Stage 4: Claude plugin 배포 결과와 문서 정합성 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 공식 문서 확인은 공식 출처를 우선하고, 확인일과 URL을 산출물에 기록한다.
- public marketplace 제출, GitHub Release asset 게시, asset 삭제/교체, unpublish/disable 같은 외부 공개 action은 별도 승인 없이 실행하지 않는다.
- 네트워크, 인증, 권한, CLI surface 문제로 검증이 제한되면 실패 원인, 영향, fallback, 재시도 조건을 기록한다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 구현계획서 자체는 별도 커밋 `Task #54: 구현계획서 작성`으로 남긴다.
- 단계 커밋은 해당 단계 산출물과 `mydocs/working/task_m040_54_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #54 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서와 오늘할일 완료 처리는 Stage 4 승인 후 `task-final-report` 절차에서 별도 정리한다.

## 단계 의존성

- Stage 1은 구현계획서 승인 후 진행한다.
- Stage 2는 Stage 1에서 public 제출 조건과 #52 충돌면을 재확인한 뒤 진행한다.
- Stage 3은 Stage 2 artifact 후보와 metadata 검증 결과를 기준으로 진행한다.
- Stage 3의 public marketplace 제출과 release asset 게시 실행은 각각 별도 승인 후에만 진행한다.
- Stage 4는 Stage 3의 실행 또는 보류 판단이 기록된 뒤 진행한다.

## 위험과 대응

- **#52 공통 문서 충돌**: Stage 1과 Stage 4에서 #52 상태, 원격 브랜치/PR, origin 상태를 재확인하고 공통 문서 수정은 Claude-specific 최소 변경으로 제한한다.
- **public 제출 surface 불명확**: 공식 제출 절차나 권한이 확인되지 않으면 public marketplace는 NO-GO로 기록하고 대체 설치 경로를 유지한다.
- **release asset 기준 불명확**: 게시 대상 release/tag, asset명, checksum 정책이 승인되지 않으면 asset 게시를 실행하지 않는다.
- **canonical drift**: README, manifest, 기술 기록은 canonical source와 fallback 경로를 안내하고 core Skill/manual/manifest를 재작성하지 않는다.
- **외부 공개 action rollback 비용**: 공개 제출과 asset 게시 전 rollback/unpublish/delete 조건을 문서화하고 승인 근거를 남긴다.
- **환경 의존 smoke**: Claude Code version, 로그인, 네트워크, registry 접근 문제가 있으면 실패와 미수행을 구분해 기록한다.

## 승인 요청 사항

- Stage 1-4 분할, 산출물, 검증 명령, 커밋 메시지 형식을 승인할지 확인한다.
- Stage 2에서 plugin metadata는 필요한 최소 범위만 보강하고 hook 없는 thin wrapper 구조를 유지하는 데 동의?
- Stage 3에서 public marketplace 제출과 release asset 게시를 각각 별도 승인 전까지 실행하지 않는 데 동의?
- Stage 4에서 #52와 겹칠 수 있는 공통 문서는 Claude-specific 최소 변경으로 제한하고, 충돌면을 재확인하는 데 동의?
