# Task #37 구현계획서 - Codex plugin packaging 검증

수행계획서: [`task_m040_37.md`](task_m040_37.md)
GitHub Issue: [#37](https://github.com/postmelee/hyper-waterfall/issues/37)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | Codex 공식 사양과 기존 원칙 재확인 | `mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md`, `mydocs/working/task_m040_37_stage1.md` | 공식 문서 확인일, URL, 확정/추론/재확인 항목 분리 |
| 2 | Codex bundle 구조와 canonical 참조 방식 검증 | `mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md`, `mydocs/working/task_m040_37_stage2.md` | `.codex-plugin/plugin.json`, component path, Skill/manual/fallback 참조 기준 점검 |
| 3 | Codex hook guardrail packaging 가능성 검증 | `mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md`, `mydocs/working/task_m040_37_stage3.md` | hook feature flag, config path, event별 block/warn/report-only 후보와 한계 점검 |
| 4 | local 검증 가능성, go/no-go, 후속 인계 정리 | `mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md`, `mydocs/working/task_m040_37_stage4.md`, `mydocs/report/task_m040_37_report.md` | #38 진입 조건, 보류 조건, public 배포 전 go/no-go 점검 |

## Stage 1 — Codex 공식 사양과 기존 원칙 재확인

### 산출물

신규:

- `mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md`
- `mydocs/working/task_m040_37_stage1.md`

수정:

- `mydocs/orders/20260516.md`

### 변경 내용

- OpenAI Codex plugin 공식 문서를 확인하고 확인일, URL, packaging에 적용할 항목을 기록한다.
- OpenAI Codex hooks 공식 문서를 확인하고 확인일, URL, hook packaging과 event coverage에 적용할 항목을 기록한다.
- `.codex-plugin/plugin.json`, bundled component path, `skills`, `hooks`, manifest path 규칙, plugin root 제약을 공식 문서 기준으로 분리한다.
- plugin hook feature flag, hook config 위치, hook output semantics, matcher 또는 tool coverage 관련 제한을 정리한다.
- `docs/plugin-distribution-principles.md`, `docs/distribution-channels.md`, `docs/agent-entrypoint.md`, `mydocs/tech/task_m040_36_plugin_specs_inventory.md`에서 Codex 관련 기존 원칙과 재확인 항목을 inventory로 묶는다.
- 공식 문서로 확정 가능한 사실, #36 산출물에서 온 기존 원칙, 이번 task에서 추론한 후보, #38에서 다시 확인할 항목을 구분한다.

### 검증

```bash
rg -n 'Codex plugin|hooks|\\.codex-plugin|plugin_hooks|feature flag|manifest|skills|hooks/hooks.json' docs mydocs
rg -n 'OpenAI|Codex|plugin|hook|확인일|URL|공식|추론|재확인|inventory' mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md mydocs/working/task_m040_37_stage1.md
git diff --check
```

수동 확인:

- 공식 문서 URL과 확인일이 Stage 1 산출물에 남아 있는지 확인한다.
- 공식 문서에서 확인한 사실과 기존 #36 원칙, 이번 task의 추론을 구분했는지 확인한다.
- Codex 사양이 불명확한 항목을 임의 확정하지 않고 Stage 2-4 또는 #38 재확인 항목으로 남겼는지 확인한다.

### 커밋

```text
Task #37 Stage 1: Codex 공식 사양과 기존 원칙 재확인
```

## Stage 2 — Codex bundle 구조와 canonical 참조 방식 검증

### 산출물

신규:

- `mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md`
- `mydocs/working/task_m040_37_stage2.md`

수정:

- `mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- `.codex-plugin/plugin.json` 후보 구조를 metadata, version, description, component path, `skills`, `hooks` 후보 기준으로 정리한다.
- Codex plugin root 내부 component path 규칙을 기준으로 어떤 파일을 bundle에 포함할 수 있고 어떤 파일은 링크 또는 안내로 참조해야 하는지 분류한다.
- core Skill 노출 방식을 비교한다: release snapshot, thin wrapper, repository path 안내, npm CLI 또는 `docs/agent-entrypoint.md` 안내.
- `templates/mydocs/skills`, `templates/mydocs/manual`, `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, npm CLI의 canonical 책임을 plugin bundle이 재정의하지 않는 구조를 작성한다.
- fallback 경로를 정의한다: plugin component를 읽지 못하면 AGENTS/manual/CLI 수동 경로를 안내하고, fallback 본문으로 절차를 새로 만들지 않는다.
- 필요 시 로컬 검증용 skeleton은 repository root에 영구 bundle로 추가하지 않고, 파일 트리 또는 임시 skeleton 기준으로 static validation 결과만 기록한다.

### 검증

```bash
rg -n 'canonical|manifest|migration|templates/mydocs/skills|templates/mydocs/manual|agent-entrypoint|npm CLI|fallback|bundle|\\.codex-plugin|plugin.json|skills' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md
rg -n '진실 원천|별도 진실 원천|복제|참조|release snapshot|thin wrapper|fallback|component path|plugin root' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md
git diff --check
```

수동 확인:

- plugin 후보 구조가 `templates/manifest.json`, migration guide, Skill, manual의 별도 진실 원천을 만들지 않는지 확인한다.
- Skill 노출 방식이 Codex 편의성을 높이되 core Skill 본문 fork로 흐르지 않는지 확인한다.
- fallback이 절차 재정의가 아니라 canonical 경로 복구 안내로 제한되는지 확인한다.

### 커밋

```text
Task #37 Stage 2: Codex bundle 구조와 canonical 참조 검증
```

## Stage 3 — Codex hook guardrail packaging 가능성 검증

### 산출물

신규:

- `mydocs/working/task_m040_37_stage3.md`

수정:

- `mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md`
- `mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- Codex plugin에서 hook config를 둘 수 있는 위치를 검토한다: `hooks/hooks.json`, manifest `hooks` field, inline 또는 path array 후보.
- hook 활성화 조건과 feature flag가 사용자 설치 UX와 #38 smoke 범위에 어떤 영향을 주는지 기록한다.
- `PreToolUse`, `PermissionRequest`, `PostToolUse`, `UserPromptSubmit`, `Stop`, `SessionStart` 이벤트를 Hyper-Waterfall guardrail 관점으로 분류한다.
- 각 이벤트 후보를 block, warn, report-only로 나누고, 승인 여부 자동 판정 또는 자동 allow가 필요한 항목은 제외한다.
- 위험 shell/git/npm/gh 명령, publish/merge/close 시도, 구현계획서 없는 stage 시작, 단계 보고 누락, canonical source 복제 위험 같은 객관 상태 기반 후보를 정리한다.
- hook 적용 한계를 기록한다: 일부 shell/tool path 미포착, 비대상 도구, 사후 side effect 되돌림 불가, hook 비활성 또는 실패 시 기본 절차는 AGENTS/manual/Skill이라는 점.

### 검증

```bash
rg -n 'PreToolUse|PermissionRequest|PostToolUse|UserPromptSubmit|Stop|SessionStart|feature flag|hooks/hooks.json|manifest hooks|block|warn|report-only|승인 자동' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md
rg -n '위험 명령|publish|merge|close|구현계획서|단계 보고|canonical source|비대상 도구|side effect|AGENTS|manual|Skill' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md
git diff --check
```

수동 확인:

- hook이 작업지시자 승인을 대체하지 않는다고 명확히 표현됐는지 확인한다.
- block 후보가 사람 맥락이 아니라 객관 상태 또는 위험 action에만 걸려 있는지 확인한다.
- hook 기능을 public 배포의 필수 안전장치처럼 표현하지 않았는지 확인한다.

### 커밋

```text
Task #37 Stage 3: Codex hook guardrail packaging 검증
```

## Stage 4 — local 검증 가능성, go/no-go, 후속 인계 정리

### 산출물

신규:

- `mydocs/working/task_m040_37_stage4.md`
- `mydocs/report/task_m040_37_report.md`

수정:

- `mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md`
- 필요 시 `docs/plugin-distribution-principles.md`
- 필요 시 `docs/distribution-channels.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- 현재 Codex 환경에서 local install/load smoke가 가능한지 조사하고, 가능하면 #38에서 실행할 smoke 명령 후보와 전제 조건을 기록한다.
- local smoke가 불가능하면 불가능 사유, 필요한 Codex plugin tooling 또는 수동 확인 조건, #38의 준비 항목을 기록한다.
- Stage 1-3 결과를 종합해 Codex plugin public 배포 후보를 만들 수 있는지 go/no-go로 정리한다.
- `docs/plugin-distribution-principles.md` 또는 `docs/distribution-channels.md`에 #37 결과를 반영해야 할 정도로 공통 원칙이나 배포 전략이 바뀌었는지 확인하고, 필요한 경우 짧게 갱신한다.
- #38 인계 항목을 정리한다: bundle 생성 범위, install/load smoke 범위, hook 활성화 UX 검증 여부, 보류 조건.
- 최종 보고서를 작성하고 수용 기준과 검증 결과를 연결한다.

### 검증

```bash
rg -n 'go/no-go|#38|install|load|smoke|보류|후속|public 배포|bundle 생성|hook 활성화' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md mydocs/report/task_m040_37_report.md
rg -n 'Codex plugin packaging|#37|guardrail|\\.codex-plugin|plugin.json|fallback' docs/plugin-distribution-principles.md docs/distribution-channels.md mydocs/report/task_m040_37_report.md
git diff --check
```

수동 확인:

- #38에서 실제 배포 후보를 만들 수 있는 조건과 아직 수정해야 할 조건이 구분됐는지 확인한다.
- 공통 원칙 또는 배포 전략 문서를 수정한 경우, #36의 canonical 원칙과 충돌하지 않는지 확인한다.
- 최종 보고서가 issue #37 수용 기준과 검증 기준을 모두 대응하는지 확인한다.

### 커밋

```text
Task #37 Stage 4: Codex packaging go-no-go 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 공식 문서 확인은 OpenAI 공식 출처를 우선하고, 확인일과 URL을 산출물에 기록한다.
- 네트워크 또는 도구 접근 문제로 공식 문서를 확인하지 못하면 해당 항목을 미확인으로 기록하고 다음 단계로 넘기지 않는다.
- local skeleton이 필요하면 repository root의 영구 배포 후보가 아니라 임시 skeleton 또는 파일 트리 문서화로 제한한다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 구현계획서 자체는 별도 커밋 `Task #37: 구현계획서 작성`으로 남긴다.
- 단계 커밋은 해당 단계 산출물과 `mydocs/working/task_m040_37_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #37 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서는 `task-final-report` 절차에서 별도 커밋과 PR 게시 흐름으로 처리한다.

## 단계 의존성

- Stage 1은 구현계획서 승인 후 진행한다.
- Stage 2는 Stage 1 보고서 승인 후 진행한다.
- Stage 3은 Stage 2의 bundle/canonical 참조 방식이 확정된 뒤 진행한다.
- Stage 4는 Stage 3의 hook guardrail packaging 판단이 확정된 뒤 진행한다.
- Stage 4에서 실제 plugin bundle 생성 또는 설치 smoke 실행 필요성이 발견되면 #38 범위로 넘긴다.

## 위험과 대응

- **Codex 사양 변동**: plugin과 hook 사양은 바뀔 수 있다. Stage 1에서 확인일과 URL을 기록하고 #38에서 배포 후보 생성 전 다시 확인한다.
- **비공식 정보 혼입**: plugin packaging 관련 비공식 자료가 많을 수 있다. 이번 task의 판단 기준은 OpenAI 공식 문서와 현재 저장소 산출물로 제한한다.
- **canonical drift**: plugin bundle이 Skill, manual, manifest, migration guide를 독립 복제하면 release 기준이 갈라진다. Stage 2에서 포함/참조/fallback 기준을 검증한다.
- **hook 과신**: hook이 승인 여부를 자동 판단하면 하이퍼-워터폴 핵심 규칙을 훼손한다. Stage 3에서 guardrail과 승인 게이트를 분리한다.
- **#38 범위 침범**: 실제 배포 후보 bundle 생성과 설치 smoke를 #37에서 끝내려 하면 task 경계가 흐려진다. Stage 4는 smoke 가능성과 go/no-go 판단까지만 수행한다.

## 승인 요청 사항

- Stage 1-4 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Stage 1에서 OpenAI Codex plugin/hooks 공식 문서를 최신 기준으로 다시 확인하고 확인일을 남기는 데 동의?
- Stage 2에서 Codex bundle 후보는 canonical source를 복제하지 않는 참조 구조와 fallback 중심으로 검증하는 데 동의?
- Stage 3에서 hook은 승인 자동화가 아니라 opt-in guardrail 후보와 한계 기록까지만 다루는 데 동의?
- Stage 4에서 실제 배포 후보 생성과 설치 smoke 완료는 #38로 넘기고, #37은 go/no-go와 인계 조건 정리로 마무리하는 데 동의?
