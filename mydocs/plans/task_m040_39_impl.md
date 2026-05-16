# Task #39 구현계획서 - Claude plugin packaging 검증

수행계획서: [`task_m040_39.md`](task_m040_39.md)
GitHub Issue: [#39](https://github.com/postmelee/hyper-waterfall/issues/39)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | Claude 공식 사양과 저장소 현황 inventory | `mydocs/tech/task_m040_39_claude_plugin_packaging.md`, `mydocs/working/task_m040_39_stage1.md` | 공식 문서 확인 기록, `.claude`/`CLAUDE.md` 구조, canonical Skill 연결 확인 |
| 2 | Packaging 후보 구조와 canonical drift 검증 | `mydocs/tech/task_m040_39_claude_plugin_packaging.md`, `mydocs/working/task_m040_39_stage2.md` | plugin manifest/component 구조, Skill snapshot/wrapper/reference 선택지, drift 방지 기준 확인 |
| 3 | Claude hook guardrail 적용성 분류 | `mydocs/tech/task_m040_39_claude_plugin_packaging.md`, `mydocs/working/task_m040_39_stage3.md` | lifecycle event 지원 여부, matcher/decision control, block/warn/report-only 분류 확인 |
| 4 | Fallback, 후속 #40 입력, 최종 정합성 검토 | `mydocs/tech/task_m040_39_claude_plugin_packaging.md`, 필요 시 `docs/`, `mydocs/working/task_m040_39_stage4.md` | #36 공통 원칙, 가능한 #37 결과, #40 전제조건, fallback 경로 확인 |

## Stage 1 — Claude 공식 사양과 저장소 현황 inventory

### 산출물

신규:

- `mydocs/tech/task_m040_39_claude_plugin_packaging.md`
- `mydocs/working/task_m040_39_stage1.md`

수정:

- `mydocs/orders/20260516.md`

### 변경 내용

- Claude Code plugin과 hooks 공식 문서를 확인하고 확인일, URL, 공식 문서에서 확인한 사실, Hyper-Waterfall 해석을 분리해 기록한다.
- Claude plugin packaging과 hooks 검증에 필요한 공식 항목을 수집한다: manifest, component root, skills, hooks, local test, install scope, hook event, matcher, output/decision control, 보안 경계.
- `CLAUDE.md`, `.claude/skills`, `templates/.claude/skills`, `templates/mydocs/skills`, `templates/mydocs/manual`, `docs/agent-entrypoint.md`, `docs/plugin-distribution-principles.md`의 관계를 inventory로 정리한다.
- #37은 병렬 진행 중이므로 Stage 1에서는 #36 공통 원칙과 현재 main 기준 파일만 입력으로 사용한다고 명시한다.
- 공식 문서에서 확인되지 않은 이슈 본문의 hook/lifecycle 후보는 임의 확정하지 않고 Stage 3 재확인 항목으로 남긴다.

### 검증

```bash
find .claude templates/.claude -maxdepth 2 -print
test -L .claude/skills && readlink .claude/skills
test -L templates/.claude/skills && readlink templates/.claude/skills
rg -n 'Claude|plugin|hook|hooks/hooks.json|확인일|URL|inventory|canonical|templates/mydocs/skills|CLAUDE.md|agent-entrypoint|#37' mydocs/tech/task_m040_39_claude_plugin_packaging.md mydocs/working/task_m040_39_stage1.md
git diff --check
```

수동 확인:

- 공식 문서 URL과 확인일이 Stage 1 산출물에 남아 있는지 확인한다.
- 공식 문서에서 확인한 사실과 Hyper-Waterfall 적용 해석이 구분됐는지 확인한다.
- `.claude/skills`와 `templates/.claude/skills`가 canonical Skill 경로를 가리키는지 확인한다.
- Stage 1에서 plugin bundle 생성, hook 구현, core Skill/manual 본문 변경을 하지 않았는지 확인한다.

### 커밋

```text
Task #39 Stage 1: Claude plugin 공식 사양과 저장소 inventory
```

## Stage 2 — Packaging 후보 구조와 canonical drift 검증

### 산출물

신규:

- `mydocs/working/task_m040_39_stage2.md`

수정:

- `mydocs/tech/task_m040_39_claude_plugin_packaging.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- Claude plugin 후보 구조를 `.claude-plugin/plugin.json`, plugin root level component, `skills/`, `hooks/hooks.json`, optional local test command 관점으로 정리한다.
- core Skill을 plugin에서 다루는 선택지를 비교한다: release snapshot, thin wrapper, runtime reference, fallback 안내.
- 각 선택지가 `templates/mydocs/skills`, `templates/mydocs/manual`, `templates/manifest.json`, migration guide, npm CLI, `docs/agent-entrypoint.md`의 canonical 책임을 침범하지 않는지 검토한다.
- #40 배포 후보 생성 전에 확정해야 할 manifest metadata, version, namespace, 파일 포함 기준, scratch skeleton 필요 여부를 정리한다.
- 필요한 경우 문서의 cross-reference 보완 후보를 적되, Stage 2에서는 public bundle 생성이나 설치 smoke를 완료하지 않는다.

### 검증

```bash
rg -n 'claude-plugin|plugin.json|skills/|hooks/hooks.json|snapshot|thin wrapper|runtime reference|진실 원천|canonical|fallback' mydocs/tech/task_m040_39_claude_plugin_packaging.md
rg -n 'templates/mydocs/skills|templates/mydocs/manual|templates/manifest.json|migration|agent-entrypoint|npm CLI|#40' mydocs/tech/task_m040_39_claude_plugin_packaging.md
git diff --check
```

수동 확인:

- plugin 후보 구조가 core Skill/manual을 별도 편집 원천으로 만들지 않는지 확인한다.
- #40에서 실제 배포 후보로 넘길 항목과 이번 task에서 보류할 항목이 구분됐는지 확인한다.
- #37 병렬 산출물에 의존하는 변경을 만들지 않았는지 확인한다.

### 커밋

```text
Task #39 Stage 2: Claude plugin packaging 후보 구조 검증
```

## Stage 3 — Claude hook guardrail 적용성 분류

### 산출물

신규:

- `mydocs/working/task_m040_39_stage3.md`

수정:

- `mydocs/tech/task_m040_39_claude_plugin_packaging.md`
- 필요 시 `docs/plugin-distribution-principles.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- 이슈 본문에 명시된 `PreToolUse`, `PermissionRequest`, `PostToolUse`, `UserPromptSubmit`, `Stop`, `InstructionsLoaded`, `FileChanged` 후보의 공식 지원 여부와 실제 명칭을 확인한다.
- Claude hook의 matcher, 조건부 실행, command hook 입출력, exit code/JSON decision control, hook scope merge 동작을 Hyper-Waterfall 관점으로 정리한다.
- guardrail 후보를 block, warn, report-only로 분류한다: 위험 shell/git/npm/gh 명령, publish/merge/close, 이슈 없는 구현, 승인 전 수정 경고, 단계 보고 누락 등.
- 작업지시자 승인 여부는 hook 자동 판단 대상에서 제외하고, hook이 꺼진 상태에서도 `CLAUDE.md`/Skill/manual 절차가 기본 안전장치라고 명시한다.
- #36 공통 원칙 문서와 충돌하거나 보완이 필요한 Claude-specific 결과가 있으면 최소 범위로 반영 후보를 정리한다.

### 검증

```bash
rg -n 'PreToolUse|PermissionRequest|PostToolUse|UserPromptSubmit|Stop|InstructionsLoaded|FileChanged|matcher|hook|승인|자동|block|warn|report-only' mydocs/tech/task_m040_39_claude_plugin_packaging.md
rg -n '위험 명령|publish|merge|close|이슈 없는 구현|단계 보고|작업지시자 승인|객관 상태|scope|merge' mydocs/tech/task_m040_39_claude_plugin_packaging.md
git diff --check
```

수동 확인:

- hook이 승인 자동화가 아니라 보조 guardrail로 표현됐는지 확인한다.
- block 후보가 객관적으로 판별 가능한 위험 동작 중심인지 확인한다.
- 공식 문서에서 확인되지 않은 event를 구현 후보처럼 확정하지 않았는지 확인한다.

### 커밋

```text
Task #39 Stage 3: Claude hook guardrail 적용성 분류
```

## Stage 4 — Fallback, 후속 #40 입력, 최종 정합성 검토

### 산출물

신규:

- `mydocs/working/task_m040_39_stage4.md`

수정:

- `mydocs/tech/task_m040_39_claude_plugin_packaging.md`
- 필요 시 `docs/plugin-distribution-principles.md`
- 필요 시 `docs/distribution-channels.md`
- 필요 시 `docs/agent-entrypoint.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- Claude plugin 미설치, hook 비활성, official spec 불확실성, CLI 미설치 상황의 fallback 흐름을 정리한다.
- #40 Claude plugin 배포 후보 생성과 설치 smoke로 넘길 전제조건, 보류 조건, smoke 검증 후보를 정리한다.
- #36 공통 원칙과 Stage 1-3 결과를 대조하고, #37 산출물이 main에 있거나 명확히 접근 가능한 경우에만 Codex packaging 결과와 차이를 비교한다.
- 필요한 경우 관련 docs에 짧은 cross-reference만 반영한다. core Skill 또는 manual 본문 변경은 기본 제외하고 필요성을 별도 승인 항목으로 남긴다.

### 검증

```bash
rg -n '#40|배포 후보|설치 smoke|fallback|#36|#37|정합성|보류|후속' mydocs/tech/task_m040_39_claude_plugin_packaging.md mydocs/working/task_m040_39_stage4.md
rg -n 'Claude plugin|plugin-distribution-principles|canonical|fallback|hook' docs README.md
git diff --check
```

수동 확인:

- #40으로 넘길 배포 후보 생성 조건과 이번 task에서 하지 않은 일이 분리됐는지 확인한다.
- plugin이 canonical source가 아니라 discovery/execution layer라는 원칙이 유지됐는지 확인한다.
- #37 산출물 미가용 상태를 임의로 보완하지 않았는지 확인한다.
- core Skill 또는 manual 본문을 변경하지 않았는지 확인한다. 변경 필요성이 있으면 별도 승인 항목으로 남긴다.

### 커밋

```text
Task #39 Stage 4: Claude plugin fallback과 후속 조건 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 공식 문서 확인은 Claude/Anthropic 공식 출처만 기준으로 사용하고, 확인일을 산출물에 기록한다.
- 공식 문서에서 명확하지 않은 event, field, scope 동작은 구현 후보로 확정하지 않고 보류/재확인 항목으로 기록한다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 구현계획서 자체는 별도 커밋 `Task #39: 구현계획서 작성`으로 남긴다.
- 단계 커밋은 해당 단계 산출물과 `mydocs/working/task_m040_39_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #39 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서는 `task-final-report` 절차에서 별도 커밋과 PR 게시 흐름으로 처리한다.

## 단계 의존성

- Stage 1은 수행계획서 승인 후 진행한다.
- Stage 2는 Stage 1 보고서 승인 후 진행한다.
- Stage 3은 Stage 2의 packaging 후보 구조와 drift 기준이 확정된 뒤 진행한다.
- Stage 4는 Stage 3의 hook guardrail 분류가 확정된 뒤 진행한다.
- #37 Codex plugin packaging 결과는 Stage 4 시점에 main 또는 명확한 보고서로 확인되는 경우에만 참고한다.
- Stage 4에서 core Skill 또는 manual 본문 변경 필요성이 발견되면 즉시 반영하지 않고 별도 승인 항목 또는 후속 이슈로 분리한다.

## 위험과 대응

- **Claude 사양 변동**: Claude plugin/hook 사양은 바뀔 수 있다. 확인일과 URL을 기록하고 #40에서 재확인하도록 한다.
- **공식 문서 미확인 항목**: 이슈 본문의 event 후보가 실제 문서와 다를 수 있다. 미확인 항목은 보류로 남기고 구현 후보처럼 쓰지 않는다.
- **#37 병렬 진행 영향**: Codex packaging 결과가 아직 main에 없을 수 있다. #39는 #36 원칙을 기준으로 진행하고, #37 결과는 Stage 4에서 가용한 산출물만 참고한다.
- **canonical drift**: plugin bundle이 core Skill/manual/manifest/migration을 독립 복제하면 release 기준이 갈라진다. Stage 2에서 포함/참조/fallback 기준으로 제한한다.
- **hook 과신**: hook이 작업지시자 승인 여부를 자동 판단하면 핵심 규칙을 훼손한다. Stage 3에서 객관 상태 기반 guardrail로 제한한다.
- **문서 변경 범위 확산**: docs cross-reference가 중복될 수 있다. 필요한 경우에만 짧게 연결하고, Skill/manual 본문 변경은 별도 승인으로 분리한다.

## 승인 요청 사항

- Stage 1-4 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Stage 1은 Claude 공식 문서와 현재 저장소 구조 inventory에 한정하고 bundle 생성/hook 구현을 하지 않는 데 동의?
- #37 결과는 Stage 4에서 가용한 산출물만 참고하고, 병렬 worktree 변경에는 의존하지 않는 데 동의?
- 공식 문서에서 확인되지 않는 hook/lifecycle 후보는 구현 후보로 확정하지 않고 보류/재확인 항목으로 남기는 데 동의?
