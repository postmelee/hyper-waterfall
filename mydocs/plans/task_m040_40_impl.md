# Task #40 구현계획서 - Claude plugin 배포 후보 생성과 설치 smoke

수행계획서: [`task_m040_40.md`](task_m040_40.md)
GitHub Issue: [#40](https://github.com/postmelee/hyper-waterfall/issues/40)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | Claude plugin 후보 기준 재확인 | `mydocs/tech/task_m040_40_claude_plugin_candidate_smoke.md` | 공식 사양, local Claude Code version, #39 인계 조건, #38 상태 확인 |
| 2 | Hook 없는 배포 후보 bundle 작성 | `plugins/claude/hyper-waterfall/` | manifest, wrapper Skill, README, CHANGELOG, hook 미포함 확인 |
| 3 | Local validation과 discovery smoke | 기술 기록 Stage 3 섹션 | `claude plugin validate`, 가능한 `--plugin-dir` smoke, npm CLI fallback 확인 |
| 4 | 배포/보류 판단과 문서 정리 | 기술 기록 Stage 4 섹션, 필요 시 배포 문서 보정 | public 배포 판단, 대체 설치 경로, #41 인계 조건 확인 |

## Stage 1 — Claude plugin 후보 기준 재확인

### 산출물

신규:

- `mydocs/tech/task_m040_40_claude_plugin_candidate_smoke.md`
- `mydocs/working/task_m040_40_stage1.md`

수정:

- `mydocs/orders/20260516.md`

### 변경 내용

- Claude Code plugin 공식 사양을 배포 후보 생성 직전 기준으로 다시 확인한다.
- local Claude Code version과 `claude plugin` 명령 surface를 확인한다.
- #39 최종 보고서와 Stage 4의 #40 인계 조건을 기술 기록의 baseline으로 고정한다.
- #37은 main에 merge된 최종 산출물을 참고하고, #38은 open 상태인지 확인해 Codex/Claude 최종 비교를 #41로 넘길지 판단한다.
- zip plugin smoke, public marketplace 배포, hook 포함 여부를 이번 task에서 즉시 수행할 항목과 보류 항목으로 분리한다.

### 검증

```bash
claude --version
claude plugin --help
gh issue view 38 --json number,state,title,url
rg -n '#40|배포 후보|설치 smoke|thin wrapper|zip|public|보류' mydocs/tech/task_m040_39_claude_plugin_packaging.md mydocs/report/task_m040_39_report.md
rg -n 'Claude plugin|check matrix|#40|canonical|fallback|hook' docs/plugin-distribution-principles.md docs/distribution-channels.md
git diff --check
```

공식 문서 확인은 Claude Code official docs만 사용하고, 확인일과 URL을 기술 기록에 남긴다.

### 커밋

```text
Task #40 Stage 1: Claude plugin 후보 기준 재확인
```

## Stage 2 — Hook 없는 배포 후보 bundle 작성

### 산출물

신규:

- `plugins/claude/hyper-waterfall/.claude-plugin/plugin.json`
- `plugins/claude/hyper-waterfall/skills/hyper-waterfall/SKILL.md`
- `plugins/claude/hyper-waterfall/README.md`
- `plugins/claude/hyper-waterfall/CHANGELOG.md`
- `mydocs/working/task_m040_40_stage2.md`

수정:

- `mydocs/tech/task_m040_40_claude_plugin_candidate_smoke.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- `plugins/claude/hyper-waterfall/`을 Claude local plugin root 후보로 만든다.
- `.claude-plugin/plugin.json`에는 plugin identity, description, version, repository/homepage, component path를 둔다.
- `skills/hyper-waterfall/SKILL.md`는 thin wrapper로 작성한다. 절차 본문을 재작성하지 않고 `AGENTS.md`, `CLAUDE.md`, `.claude/skills`, `docs/agent-entrypoint.md`, `npx hyper-waterfall@0.2.0 --help` 경로를 안내한다.
- README에는 local validation, local load smoke, canonical source 경계, hook 미포함, public 배포 보류 조건을 적는다.
- CHANGELOG에는 후보 version, 기준 Hyper-Waterfall release/version, #39 입력 조건, hook 미포함 상태를 적는다.
- `hooks/hooks.json`, hook script, `PermissionRequest` 자동 allow 장치는 만들지 않는다.

### 검증

```bash
test -f plugins/claude/hyper-waterfall/.claude-plugin/plugin.json
test -f plugins/claude/hyper-waterfall/skills/hyper-waterfall/SKILL.md
test -f plugins/claude/hyper-waterfall/README.md
test -f plugins/claude/hyper-waterfall/CHANGELOG.md
rg -n 'AGENTS.md|CLAUDE.md|docs/agent-entrypoint.md|npx hyper-waterfall|승인|canonical|fallback|hook' plugins/claude/hyper-waterfall
test ! -f plugins/claude/hyper-waterfall/hooks/hooks.json
rg -n 'PermissionRequest|permissionDecision.*allow|updatedPermissions|setMode|AskUserQuestion|ExitPlanMode' plugins/claude/hyper-waterfall || true
git diff --check
```

마지막 `rg`는 자동 승인 위험 키워드가 있는 경우 사람이 검토하기 위한 확인이다. README/CHANGELOG에서 금지 대상으로 언급하는 것은 허용하되, 실제 hook 설정이나 자동 allow 구현은 없어야 한다.

### 커밋

```text
Task #40 Stage 2: Claude plugin 배포 후보 bundle 작성
```

## Stage 3 — Local validation과 discovery smoke

### 산출물

신규:

- `mydocs/working/task_m040_40_stage3.md`

수정:

- `mydocs/tech/task_m040_40_claude_plugin_candidate_smoke.md`
- 필요 시 `plugins/claude/hyper-waterfall/README.md`
- 필요 시 `plugins/claude/hyper-waterfall/skills/hyper-waterfall/SKILL.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- `claude plugin validate plugins/claude/hyper-waterfall`을 실행하고 결과를 기술 기록에 남긴다.
- 가능한 경우 non-destructive local load/discovery smoke를 실행한다. `claude --plugin-dir plugins/claude/hyper-waterfall`가 interactive session을 요구하면 실행하지 않고, help/print/debug 등 비대화식 경로가 있는지 확인한 뒤 그 결과를 기록한다.
- wrapper Skill이 Claude Code에서 namespaced Skill로 발견 가능한지 확인한다. 실제 UI 호출이 불가하면 공식 CLI surface와 validation 결과를 근거로 한계를 명시한다.
- `.claude/skills` canonical fallback, `docs/agent-entrypoint.md`, `npx hyper-waterfall@0.2.0 --help` 경로를 확인한다.
- smoke 실패나 local version 부족이 있으면 bundle을 무리하게 바꾸지 않고 fallback과 보류 조건을 문서화한다.

### 검증

```bash
claude plugin validate plugins/claude/hyper-waterfall
claude --help
claude plugin --help
npx hyper-waterfall@0.2.0 --help
test -L .claude/skills
test -f docs/agent-entrypoint.md
rg -n 'validate|--plugin-dir|discovery|namespaced|fallback|npx hyper-waterfall|실패|보류' mydocs/tech/task_m040_40_claude_plugin_candidate_smoke.md plugins/claude/hyper-waterfall/README.md
git diff --check
```

`npx`가 네트워크 또는 registry 접근 문제로 실패하면 실패 원인과 수동 fallback을 기록한다. 검증 실패를 숨기지 않고, #40 수용 기준에서 요구하는 "실행 결과 또는 실행 불가 사유"로 남긴다.

### 커밋

```text
Task #40 Stage 3: Claude plugin local smoke 결과 정리
```

## Stage 4 — 배포/보류 판단과 문서 정리

### 산출물

신규:

- `mydocs/working/task_m040_40_stage4.md`

수정:

- `mydocs/tech/task_m040_40_claude_plugin_candidate_smoke.md`
- `docs/distribution-channels.md` 또는 `docs/plugin-distribution-principles.md`는 Stage 3 결과로 public 배포 판단이나 설치 경로 문서 보정이 필요할 때만 수정
- `mydocs/orders/20260516.md`

### 변경 내용

- Stage 1-3 결과를 기준으로 public 배포 GO/NO-GO를 판단한다.
- public 배포가 가능한 경우에도 이번 stage에서는 작업지시자 별도 승인 없이 배포하지 않는다. 필요한 승인 항목, 권한, 명령, 검증 한계를 문서화한다.
- public 배포가 보류라면 local plugin directory 경로, validation 명령, fallback 경로를 대체 설치/사용 경로로 남긴다.
- #41 최종 배포 채널 정합성 감사로 넘길 항목을 정리한다.
- #38이 여전히 open이면 Codex/Claude 최종 smoke 비교는 #41에서 #38 완료 후 재확인해야 한다고 명시한다.

### 검증

```bash
rg -n 'public 배포|GO|NO-GO|보류|대체 설치|fallback|#41|#38|검증 한계' mydocs/tech/task_m040_40_claude_plugin_candidate_smoke.md mydocs/working/task_m040_40_stage4.md
rg -n 'Claude plugin|local plugin|public|보류|fallback' docs/distribution-channels.md docs/plugin-distribution-principles.md
git diff --check
```

문서를 수정하지 않는 경우에는 기존 문서가 #40 판단을 이미 포괄하는지 Stage 보고서에 근거를 남긴다.

### 커밋

```text
Task #40 Stage 4: Claude plugin 배포 판단과 후속 조건 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 검증 실패가 local 환경 한계라면 실패 로그 요약, 영향, fallback, 후속 조건을 단계 보고서에 기록한다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m040_40_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #40 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서와 오늘할일 완료 처리는 모든 Stage 승인 후 `task-final-report` 절차에서 별도 커밋한다.

## 단계 의존성

- Stage 2는 Stage 1에서 local Claude Code version과 validation 가능 범위를 확인한 뒤 진행한다.
- Stage 3은 Stage 2의 plugin 후보 구조가 확정된 뒤 진행한다.
- Stage 4는 Stage 3의 smoke 결과를 기준으로 public 배포 또는 보류 판단을 정리한다.

## 위험과 대응

- **Claude Code version 한계**: zip plugin smoke 또는 일부 plugin 명령이 현재 local version에서 불가능하면 directory validation과 문서화로 범위를 낮추고, 업그레이드는 별도 승인 항목으로 둔다.
- **Interactive CLI hang 위험**: `claude --plugin-dir`가 대화식 세션을 열 가능성이 있으면 비대화식 옵션 확인 후 제한적으로 실행하고, 무기한 대기 명령은 실행하지 않는다.
- **Canonical drift**: wrapper Skill과 README가 core Skill 본문을 재작성하지 않도록 링크, 경로, 승인 게이트 안내 중심으로 제한한다.
- **Public 배포 권한 불확실성**: marketplace 또는 공개 배포는 별도 승인 전 실행하지 않고, 가능 조건과 보류 사유만 남긴다.
- **#38 미완료 상태**: Codex plugin 배포 후보 smoke가 완료되지 않았으면 #41에서 최종 비교를 다시 하도록 인계한다.

## 승인 요청 사항

- Stage 1-4 분할, 산출물, 검증 명령, 커밋 메시지 형식을 승인할지 확인한다.
- Stage 2에서 hook 없는 thin wrapper bundle만 만들고, release snapshot과 hook 구현은 이번 task 기본 범위에서 제외하는 방향을 승인할지 확인한다.
- Stage 3에서 대화식 Claude Code 실행은 피하고, 가능한 비대화식 validation/load/discovery smoke와 실패 사유 기록으로 제한하는 방향을 승인할지 확인한다.
