# Task #37 Codex plugin packaging validation

## 조사 배경

Task #37 Stage 2는 Stage 1에서 확인한 OpenAI Codex plugin 공식 사양과 #36 공통 원칙을 바탕으로 Codex bundle 구조와 canonical 참조 방식을 검증하는 단계다.

이번 단계는 실제 `.codex-plugin/` bundle을 repository root에 생성하지 않는다. #38에서 배포 후보를 만들기 전에 어떤 파일을 포함하고, 어떤 파일을 참조하며, 어떤 fallback만 허용할지 static validation 형태로 고정한다.

확인일: 2026-05-16

## 조사 질문

- Codex plugin 후보의 `.codex-plugin/plugin.json`은 어떤 최소 구조를 가져야 하는가?
- Hyper-Waterfall Skill과 manual을 plugin에서 발견하게 하되 별도 진실 원천을 만들지 않는 방식은 무엇인가?
- `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, npm CLI를 plugin 안에 복제하지 않는 참조 방식은 무엇인가?
- canonical 파일을 읽지 못할 때 허용되는 fallback은 어디까지인가?
- #38에서 실제 bundle을 만들 때 넘겨야 할 파일 트리와 보류 조건은 무엇인가?

## 조사 대상

| 대상 | 이유 | 위치 |
|---|---|---|
| OpenAI Codex Build plugins | manifest, plugin root, path rules, local marketplace 구조 확인 | [Build plugins](https://developers.openai.com/codex/plugins/build) |
| OpenAI Codex Plugins | install/use surface와 plugin invocation 방식 확인 | [Plugins](https://developers.openai.com/codex/plugins) |
| `docs/plugin-distribution-principles.md` | canonical source, bundle 포함/참조/fallback 원칙 확인 | `docs/plugin-distribution-principles.md` |
| `mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md` | Stage 1에서 재확인한 Codex 사양 입력 | `mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md` |
| `docs/agent-entrypoint.md` | lifecycle 판단 결과와 fallback 출력 계약 확인 | `docs/agent-entrypoint.md` |
| `templates/mydocs/skills/` | core Skill 진실 원천 확인 | `templates/mydocs/skills/` |
| `templates/mydocs/manual/` | manual 진실 원천 확인 | `templates/mydocs/manual/` |

## 공식 사양 요약

- 모든 Codex plugin은 `.codex-plugin/plugin.json` manifest를 required entry point로 가진다.
- `.codex-plugin/` 내부에는 `plugin.json`만 둔다.
- `skills/`, `hooks/`, `assets/`, `.mcp.json`, `.app.json`은 plugin root에 둔다.
- manifest path는 plugin root 상대 경로여야 하고 `./`로 시작해야 한다.
- `skills`, `mcpServers`, `apps`, `hooks` field는 bundled component를 가리킨다.
- `interface` object는 plugin install surface의 display name, description, category, default prompt, visual asset 등을 제공한다.
- plugin은 marketplace를 통해 설치되며, local plugin도 설치 후 `~/.codex/plugins/cache/...`의 installed copy에서 로드된다.

## 후보 bundle 구조

Stage 2의 1차 후보는 thin wrapper Skill 기반이다. 실제 bundle 파일 생성은 #38에서 수행한다.

```text
plugins/hyper-waterfall-codex/
  .codex-plugin/
    plugin.json
  skills/
    hyper-waterfall/
      SKILL.md
  README.md
```

선택 후보:

```text
plugins/hyper-waterfall-codex/
  assets/
    icon.png
```

Stage 3 이후 hook 포함이 승인될 때만 추가할 후보:

```text
plugins/hyper-waterfall-codex/
  hooks/
    hooks.json
    *.js 또는 *.py
```

포함하지 않는 항목:

- `templates/manifest.json`
- `docs/migrations/`
- `docs/agent-entrypoint.md` 전문 copy
- `templates/mydocs/manual/` 전문 copy
- `templates/mydocs/skills/`의 편집 가능한 fork
- `.hyper-waterfall/version.json`

## manifest 후보

#38에서 실제 bundle을 만들 때 사용할 manifest 후보는 다음 구조다.

```json
{
  "name": "hyper-waterfall",
  "version": "0.2.0",
  "description": "Discover Hyper-Waterfall workflows and lifecycle checks in Codex.",
  "repository": "https://github.com/postmelee/hyper-waterfall",
  "license": "MIT",
  "keywords": ["workflow", "codex", "project-management"],
  "skills": "./skills/",
  "interface": {
    "displayName": "Hyper-Waterfall",
    "shortDescription": "Issue-first waterfall workflow guardrails for coding agents.",
    "longDescription": "Use Hyper-Waterfall workflow entrypoints, lifecycle checks, and fallback guidance from Codex without making the plugin a new canonical source.",
    "developerName": "postmelee",
    "category": "Productivity",
    "capabilities": ["Read"],
    "websiteURL": "https://github.com/postmelee/hyper-waterfall",
    "defaultPrompt": [
      "Use Hyper-Waterfall to start the current GitHub issue workflow.",
      "Use Hyper-Waterfall to check whether this repository should be initialized or updated."
    ]
  }
}
```

검증:

- `name`: kebab-case stable identifier이며 plugin/component namespace로 사용 가능하다.
- `version`: v0.2.0 배포 후보와 맞춘다. 다만 plugin version은 canonical framework version 자체가 아니라 bundle artifact version이라는 설명이 필요하다.
- `skills`: plugin root 내부 `./skills/`만 가리키므로 path rule을 만족한다.
- `hooks`: Stage 3 전에는 넣지 않는다. plugin-bundled hooks는 별도 opt-in과 trust review가 필요하기 때문이다.
- `mcpServers`, `apps`: 이번 task의 목적과 무관하므로 제외한다.
- `capabilities`: thin wrapper의 기본 기능은 읽기와 안내이므로 `Read`로 제한한다. 외부 app, MCP, write capability는 #38 또는 별도 task에서 재검토한다.

## Skill 노출 방식 비교

| 방식 | 설명 | 장점 | 위험 | 판단 |
|---|---|---|---|---|
| Thin wrapper Skill | `skills/hyper-waterfall/SKILL.md`가 canonical 파일을 읽고 적절한 core Skill 또는 npm CLI로 진입하라고 지시 | 중복이 가장 적고 plugin이 새 진실 원천이 되지 않는다 | canonical 파일이 없는 repo에서는 안내력이 제한된다 | #38 1차 후보 |
| Release snapshot | `templates/mydocs/skills`의 특정 release/tag copy를 plugin root 내부에 포함 | 설치만으로 core Skill discoverability가 높다 | snapshot과 templates 원문 drift, bundle 크기, 업데이트 부담 | 필요 시 2차 후보. snapshot metadata 필수 |
| Repository path 안내만 제공 | manifest/defaultPrompt 또는 README로 repo 문서 경로만 안내 | bundle이 매우 작다 | plugin으로 설치할 실질 Skill이 약하다 | 단독 후보로는 부족 |
| npm CLI 중심 | `npx hyper-waterfall init/update/doctor --dry-run` 안내를 wrapper에 포함 | lifecycle 판단과 read-only 원칙이 선명하다 | Codex Skill workflow 발견성은 낮을 수 있다 | thin wrapper의 fallback으로 포함 |

Stage 2 판단:

- #38의 1차 후보는 thin wrapper Skill이다.
- wrapper는 core Skill 본문을 요약하거나 재작성하지 않고 다음 경로를 읽도록 지시한다.
  - 현재 repo의 `AGENTS.md`
  - 현재 repo의 `mydocs/skills/{skill-name}/SKILL.md`
  - `docs/agent-entrypoint.md`
  - npm CLI `npx hyper-waterfall ... --dry-run`
- release snapshot이 필요하면 #38에서 generated artifact로 만들고, 각 snapshot에 원본 경로와 release/tag를 표시한다.
- plugin manifest가 `../templates/mydocs/skills` 또는 절대 경로를 가리키는 방식은 공식 path rule 위반 후보이므로 제외한다.

## Thin wrapper Skill 후보

실제 파일 생성은 #38 범위다. Stage 2에서는 후보 내용을 static validation 용도로 고정한다.

```md
---
name: hyper-waterfall
description: Hyper-Waterfall workflow entrypoint for Codex. Use when starting or continuing issue-based Hyper-Waterfall tasks, checking lifecycle init/update paths, or finding canonical manuals and skills.
---

Hyper-Waterfall plugin은 canonical source가 아니다.

1. 현재 저장소의 `AGENTS.md`를 먼저 읽는다.
2. 정형 task 절차는 현재 저장소의 `mydocs/skills/{skill-name}/SKILL.md`를 읽고 따른다.
3. 신규 적용 또는 기존 업데이트 판단은 `docs/agent-entrypoint.md`, `templates/manifest.json`, migration guide, npm CLI dry-run을 기준으로 한다.
4. 승인 전 파일 변경, 자동 적용, issue close, merge, publish를 수행하지 않는다.
5. canonical 파일을 읽을 수 없으면 파일을 만들지 말고 사용자에게 경로 확인 또는 npm CLI dry-run 실행 승인을 요청한다.
```

검증:

- wrapper는 core Skill 본문을 복제하지 않는다.
- wrapper는 작업지시자 승인 게이트를 우회하지 않는다.
- wrapper는 fallback으로 절차 본문을 새로 정의하지 않고 canonical 파일과 CLI로 복구한다.
- wrapper는 `templates/manifest.json`이나 migration guide를 포함하지 않는다.

## canonical 참조 방식

| canonical source | plugin 처리 | 검증 |
|---|---|---|
| GitHub Release/tag | plugin README와 wrapper가 기준 release/tag 확인을 지시 | plugin version과 framework release를 혼동하지 않도록 설명 필요 |
| `templates/manifest.json` | bundle에 복제하지 않고 현재 repo 또는 release URL에서 읽도록 안내 | plugin manifest에 포함 금지 |
| `docs/migrations/` | bundle에 복제하지 않고 release 또는 repo 문서 링크로 참조 | migration guide 전문 copy 금지 |
| `docs/agent-entrypoint.md` | lifecycle 판단 출력 계약으로 참조 | wrapper가 이 문서의 판단 흐름으로 넘김 |
| npm CLI | `init/update/doctor --dry-run` read-only 판단 경로로 안내 | 파일 적용은 일반 task 흐름과 승인 후에만 가능 |
| `templates/mydocs/skills` | core Skill 진실 원천 | plugin에서는 thin wrapper 또는 release snapshot artifact만 허용 |
| `templates/mydocs/manual` | manual 진실 원천 | plugin README가 링크할 수 있으나 manual 본문 fork 금지 |
| `AGENTS.md` | 적용 repo의 agent 운영 규칙 | wrapper 첫 단계에서 읽도록 안내 |

## fallback 정책

허용:

- 현재 저장소에 `AGENTS.md`가 있으면 우선 읽기
- 현재 저장소에 `mydocs/skills`가 있으면 대상 Skill 원문 읽기
- lifecycle 판단은 `docs/agent-entrypoint.md` 형식과 npm CLI dry-run으로 안내
- canonical 파일을 찾지 못하면 사용자에게 repository root, target release, 설치 여부 확인 요청
- plugin 없는 환경에서도 AGENTS/manual/CLI로 같은 절차 수행 가능하다고 안내

금지:

- fallback 본문에 task-start, stage-report, final-report 절차를 새로 재작성
- plugin에 `templates/manifest.json`이나 migration guide 전문 copy 포함
- plugin wrapper가 승인된 것으로 간주하고 파일 수정 진행
- npm CLI 결과만으로 자동 파일 적용
- plugin-specific task flow를 만들어 Codex 전용 절차로 분기

## local validation 후보

Stage 2에서는 실제 marketplace 파일을 만들지 않았다. #38 후보는 다음 repo marketplace 구조다.

```text
.agents/
  plugins/
    marketplace.json
plugins/
  hyper-waterfall-codex/
    .codex-plugin/plugin.json
    skills/hyper-waterfall/SKILL.md
    README.md
```

repo marketplace 후보:

```json
{
  "name": "hyper-waterfall-local",
  "interface": {
    "displayName": "Hyper-Waterfall Local Plugins"
  },
  "plugins": [
    {
      "name": "hyper-waterfall",
      "source": {
        "source": "local",
        "path": "./plugins/hyper-waterfall-codex"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    }
  ]
}
```

검증:

- marketplace `source.path`는 marketplace root 상대 `./plugins/hyper-waterfall-codex` 후보로 둔다.
- Codex restart와 plugin directory install/load 확인은 #38 smoke 범위다.
- 이 task에서는 repository root에 `plugins/` 또는 `.agents/plugins/marketplace.json`을 만들지 않았다.

## static validation 결과

| 항목 | 결과 | 근거 |
|---|---|---|
| Required manifest | OK | `.codex-plugin/plugin.json` 후보를 required entry point로 둔다. |
| Path rules | OK | `skills` 후보가 `./skills/`이며 plugin root 밖을 참조하지 않는다. |
| Component root | OK | `skills/`, `README.md`, 향후 `hooks/`는 plugin root에 둔다. |
| Canonical source 보존 | OK | manifest, migration, manual, core Skill 원문을 bundle에 복제하지 않는다. |
| Skill discoverability | OK with risk | thin wrapper가 Hyper-Waterfall entrypoint를 제공한다. 개별 core Skill 자동 발견성은 release snapshot보다 약하다. |
| Fallback | OK | AGENTS/manual/CLI 경로 안내로 제한한다. |
| Hook 제외 | OK | Stage 2 base manifest에는 `hooks`를 넣지 않고 Stage 3에서 별도 검증한다. |
| Local smoke | 보류 | #38에서 marketplace 생성, Codex restart, install/load 확인이 필요하다. |

## Stage 3 hook packaging validation

Stage 3은 Codex plugin에 hook guardrail을 포함할 수 있는지 검증했다. 결론부터 말하면 #38 1차 bundle 후보에는 hook을 넣지 않고, hook은 2차 opt-in 후보로 분리한다. 이유는 plugin-bundled hook이 `[features].plugin_hooks = true`를 요구하고, non-managed hook trust review가 필요하며, 현재 hook coverage가 완전한 enforcement boundary가 아니기 때문이다.

### Hook config 위치 후보

| 후보 | 구조 | 장점 | 위험 | 판단 |
|---|---|---|---|---|
| Default file | `hooks/hooks.json` | manifest `hooks` field를 생략할 수 있고 공식 기본값과 맞는다 | 파일 존재만으로 hook 포함 의도가 보일 수 있다 | hook 포함 시 1차 후보 |
| Manifest path | `.codex-plugin/plugin.json`의 `"hooks": "./hooks/hooks.json"` | hook entry를 manifest에서 명시한다 | default와 중복하면 혼동된다 | hook 파일을 여러 개로 나눌 때 후보 |
| Manifest path array | `"hooks": ["./hooks/session.json", "./hooks/tools.json"]` | SessionStart와 tool guardrail 분리 가능 | #38 install-surface 설명이 복잡해진다 | 2개 이상 policy 파일이 필요할 때 후보 |
| Inline hooks object | manifest `hooks`에 inline object | 파일 수가 줄어든다 | JSON이 커지고 review가 어렵다 | 보류 |

Stage 3 판단:

- #38 1차 bundle에는 `hooks` field와 `hooks/` 디렉터리를 포함하지 않는다.
- hook 포함 후보는 default `hooks/hooks.json`을 우선한다.
- manifest `hooks` field는 여러 hook config 파일을 분리해야 할 때만 사용한다.
- 모든 hook path는 plugin root 내부 `./` 경로여야 한다.

### Hook 활성화 조건

- 일반 Codex hooks의 canonical feature key는 `hooks`이고 기본 활성이다.
- `codex_hooks`는 deprecated alias이므로 새 문서나 plugin 후보에서 사용하지 않는다.
- plugin-bundled hooks는 별도 opt-in이며 `[features].plugin_hooks = true`가 필요하다.
- plugin이 enabled 상태여야 bundled hooks가 로드된다.
- plugin hooks는 non-managed hooks라서 실행 전 trust review가 필요하다.
- hook이 꺼져 있거나 실패해도 기본 절차는 `AGENTS.md`, manual, Skill, npm CLI dry-run이다.

### Event별 guardrail 후보

| Event | matcher 지원 | Hyper-Waterfall 후보 | 권장 등급 | 판단 |
|---|---|---|---|---|
| `SessionStart` | `startup`, `resume`, `clear` source | `AGENTS.md`, `mydocs/skills`, 현재 branch 확인 안내를 additional context로 주입 | report-only | 시작 맥락 보강용. 차단 목적 아님 |
| `PreToolUse` | tool name. `Bash`, `apply_patch`, MCP tool names, `Edit`, `Write` alias | 위험 명령, publish/merge/close, 승인 전 파일 수정, canonical source 복제 시도 탐지 | block 또는 warn | 사전 guardrail 핵심 후보지만 incomplete interception 한계 존재 |
| `PermissionRequest` | tool name. `Bash`, `apply_patch`, MCP tool names | escalated command, managed-network approval 요청에서 destructive/public action deny | deny 또는 no-decision | 자동 allow 금지. 승인 대체 금지 |
| `PostToolUse` | tool name. `Bash`, `apply_patch`, MCP tool names, `Edit`, `Write` alias | 단계 보고 누락, 검증 미수행, generated output 또는 외부 action 발생 감지 | warn 또는 report-only | 이미 실행된 side effect는 되돌릴 수 없음 |
| `UserPromptSubmit` | matcher 미지원 | 이슈 없는 구현 요청, 승인 없는 다음 단계 요청, secret paste 같은 prompt-level 경고 | warn 또는 block 후보 | matcher가 없어 과도한 global hook 위험 |
| `Stop` | matcher 미지원 | stage 종료 전 보고서/검증 누락 경고, 다음 단계 승인 대기 reminder | report-only 또는 제한적 warn | continuation loop 위험. block 남용 금지 |

### Guardrail rule 후보

| 후보 | Event | 확인할 객관 상태 | 권장 등급 | 비고 |
|---|---|---|---|---|
| 위험 명령 | `PreToolUse`, `PermissionRequest` | `rm -rf`, `git reset --hard`, `git clean`, force push, destructive checkout | block/deny | 작업지시자 명시 요청 없이는 차단 후보 |
| publish 시도 | `PreToolUse`, `PermissionRequest` | `npm publish`, `gh release create`, registry upload | block/deny | 외부 공개 action은 별도 승인 필요 |
| merge/close 시도 | `PreToolUse`, `PermissionRequest` | `gh pr merge`, `gh issue close`, merge/close API tool | block/deny | PR merge 확인 또는 승인 전 금지 |
| 승인 전 파일 수정 | `PreToolUse` | `apply_patch`, `Edit`, `Write`, 수정 대상 path, 구현계획서/stage 상태 | warn 또는 block 후보 | 승인 맥락은 hook이 확정할 수 없어 보수적으로 warn 우선 |
| 구현계획서 없는 stage 시작 | `PreToolUse`, `Stop` | `mydocs/plans/task_m{milestone}_{issue}_impl.md` 존재 여부 | block 후보 | 객관 precondition이라 비교적 명확 |
| 단계 보고 누락 | `PostToolUse`, `Stop` | `mydocs/working/task_m{milestone}_{issue}_stage{N}.md` 존재 여부 | warn/report-only | PostToolUse는 side effect를 되돌릴 수 없음 |
| canonical source 복제 | `PreToolUse`, `PostToolUse` | plugin bundle 안의 `templates/manifest.json`, migration guide, manual copy 추가 | warn | release snapshot인지 drift 위험인지 사람 검토 필요 |
| core Skill fork | `PreToolUse`, `PostToolUse` | `skills/*/SKILL.md`가 canonical Skill 본문을 재작성하는지 | warn | thin wrapper 또는 release snapshot 여부 검토 |
| 비대상 도구 사용 | `Stop` | `WebSearch` 등 hook이 못 본 동작 후 보고서 누락 여부 | report-only | hook intercept 대상이 아니므로 강한 보장 금지 |

### Hook output 정책

- `PreToolUse`에서 명확히 차단할 때는 `permissionDecision: "deny"` 또는 legacy block shape를 후보로 둔다.
- `PreToolUse`에서 맥락 보강만 필요하면 `additionalContext` 후보로 둔다.
- `PermissionRequest`에서는 자동 `allow`를 사용하지 않는다. 명확한 위험 요청만 `deny`하고, 나머지는 no-decision으로 normal approval flow를 유지한다.
- `PostToolUse`의 block은 이미 완료된 tool result를 hook feedback으로 대체할 수 있지만 side effect를 undo하지 않는다. 따라서 되돌림 수단처럼 문서화하지 않는다.
- `UserPromptSubmit`과 `Stop`은 matcher 미지원이므로 global behavior가 된다. 우선 report-only 또는 제한적 warn 후보로 둔다.
- `suppressOutput`, `updatedInput`, `updatedMCPToolOutput`처럼 parsed but unsupported 또는 reserved인 필드는 사용하지 않는다.

### Hook 한계

- `PreToolUse`와 `PostToolUse`는 모든 shell call을 intercept하지 않는다.
- newer `unified_exec` 계열 shell handling은 interception이 incomplete로 문서화되어 있다.
- `WebSearch` 같은 non-shell, non-MCP 비대상 도구는 hook 대상이 아니다.
- 같은 event의 여러 matching command hooks는 concurrently 시작될 수 있어 한 hook이 다른 hook 시작을 막을 수 없다.
- `PostToolUse`는 사후 event라 side effect를 되돌릴 수 없다.
- 작업지시자 승인 여부, 같은 스레드의 대화 맥락, 사람의 의도를 hook이 안정적으로 판정할 수 없다.
- hook 실패나 비활성 상태는 승인으로 간주되지 않는다.

### Hook packaging 후보 구조

Hook을 #38 이후에 포함한다면 다음 구조가 1차 후보가 된다.

```text
plugins/hyper-waterfall-codex/
  .codex-plugin/
    plugin.json
  skills/
    hyper-waterfall/
      SKILL.md
  hooks/
    hooks.json
    hyper_waterfall_guardrail.js
  README.md
```

`hooks/hooks.json` 후보:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume|clear",
        "hooks": [
          {
            "type": "command",
            "command": "node ${PLUGIN_ROOT}/hooks/hyper_waterfall_guardrail.js session-start",
            "statusMessage": "Checking Hyper-Waterfall context"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash|apply_patch|Edit|Write|mcp__.*",
        "hooks": [
          {
            "type": "command",
            "command": "node ${PLUGIN_ROOT}/hooks/hyper_waterfall_guardrail.js pre-tool",
            "statusMessage": "Checking Hyper-Waterfall guardrails"
          }
        ]
      }
    ],
    "PermissionRequest": [
      {
        "matcher": "Bash|apply_patch|Edit|Write|mcp__.*",
        "hooks": [
          {
            "type": "command",
            "command": "node ${PLUGIN_ROOT}/hooks/hyper_waterfall_guardrail.js permission-request",
            "statusMessage": "Checking approval request"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash|apply_patch|Edit|Write|mcp__.*",
        "hooks": [
          {
            "type": "command",
            "command": "node ${PLUGIN_ROOT}/hooks/hyper_waterfall_guardrail.js post-tool",
            "statusMessage": "Recording Hyper-Waterfall guardrail result"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ${PLUGIN_ROOT}/hooks/hyper_waterfall_guardrail.js stop",
            "statusMessage": "Checking stage reporting status"
          }
        ]
      }
    ]
  }
}
```

이 후보는 구현이 아니라 packaging shape 검증용이다. 실제 guardrail script 작성, Node runtime 의존성, test fixture, trust review 안내는 별도 승인 또는 #38 이후 범위다.

### Stage 3 결정

- #38 1차 bundle 후보는 hook 없는 thin wrapper Skill로 유지한다.
- hook 포함은 #38에서 smoke 전 별도 승인 항목으로 제시한다.
- hook 포함 시 default `hooks/hooks.json`을 우선하고, manifest `hooks` field는 여러 config 파일을 나눌 때만 사용한다.
- `PermissionRequest` 자동 allow는 금지한다.
- `PreToolUse`는 위험 명령과 외부 공개 action 중심의 block/deny 후보로 둔다.
- `PostToolUse`, `Stop`은 검증/보고 누락의 warn/report-only 후보로 둔다.

## 결정

- #38의 Codex plugin bundle 1차 후보는 thin wrapper Skill 기반으로 둔다.
- plugin manifest는 `skills: "./skills/"`를 포함하고 `hooks`, `mcpServers`, `apps`는 Stage 2 base 후보에서 제외한다.
- plugin bundle은 `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, manual 본문, core Skill 본문을 canonical source로 복제하지 않는다.
- release snapshot 방식은 개별 core Skill discoverability가 부족할 때의 2차 후보로만 둔다.
- 실제 local marketplace와 install/load smoke는 #38로 넘긴다.
- hook 포함은 opt-in 2차 후보로 분리하고, #38의 1차 smoke는 hook 없는 plugin으로 시작한다.

## 비결정 / 보류

- #38에서 thin wrapper만으로 Plugin Directory와 skill invocation discoverability가 충분한지 smoke가 필요하다.
- plugin `version`을 framework release와 같은 `0.2.0`으로 둘지, plugin artifact pre-release로 둘지는 #38에서 배포 후보 이름과 함께 확정한다.
- plugin assets, icon, legal links, long install-surface copy는 #38에서 최종화한다.
- 실제 hook guardrail script 구현, fixture test, trust review 문구는 후속 승인 또는 #38 이후 범위다.

## 적용 영향

- Stage 3 결과에 따라 hook config는 Stage 2 base manifest와 분리한다.
- Stage 4는 #38로 넘길 local marketplace와 restart/install smoke 전제 조건을 go/no-go에 포함해야 한다.
- 공통 원칙 문서 변경은 Stage 2에서는 필요하지 않다. 다만 Stage 4에서 #37 전체 결과를 종합해 `docs/plugin-distribution-principles.md`의 `codex_hooks` 계열 표현 보정 여부를 판단한다.
- Stage 4는 #38 1차 bundle을 hook 없는 thin wrapper로 둘지, hook opt-in candidate까지 같이 만들지 go/no-go로 분리해야 한다.

## Stage 4 local 검증 가능성과 go/no-go

Stage 4는 실제 plugin bundle을 만들거나 install/load smoke를 수행하지 않고, #38에서 수행 가능한 local 검증 표면과 go/no-go를 정리했다.

### Local tooling 확인

실행 명령:

```bash
codex --version
codex plugin --help
codex plugin marketplace --help
codex plugin marketplace add --help
```

결과:

- `codex --version`은 `codex-cli 0.131.0-alpha.9`를 출력했다.
- `codex plugin --help`에서 `marketplace` 하위 명령이 확인됐다.
- `codex plugin marketplace --help`에서 `add`, `upgrade`, `remove` 하위 명령이 확인됐다.
- `codex plugin marketplace add --help`에서 local marketplace root directory를 `<SOURCE>`로 받을 수 있고 `owner/repo[@ref]`, HTTP(S) Git URL, SSH URL, local marketplace root directory를 지원한다고 확인됐다.
- sandbox 때문에 Codex CLI가 PATH 업데이트 warning을 출력했지만 help와 version 확인은 정상 수행됐다.

Stage 4 판단:

- #38에서 local marketplace root를 만들고 `codex plugin marketplace add ./<marketplace-root>` 형태의 smoke를 설계할 수 있다.
- 실제 add/install/load는 `~/.codex/config.toml`, plugin cache, Codex restart 또는 plugin UI 조작이 필요하므로 #37 범위에서는 실행하지 않았다.

### Go/no-go

| 항목 | 판단 | 근거 | #38 인계 |
|---|---|---|---|
| Hook 없는 thin wrapper bundle | GO | `.codex-plugin/plugin.json`, `skills: "./skills/"`, `skills/hyper-waterfall/SKILL.md` 구조가 공식 path rule과 canonical 원칙을 충족한다. | #38 1차 bundle 후보로 생성 |
| Release snapshot bundle | CONDITIONAL | offline discoverability는 좋아지지만 snapshot drift 위험이 있다. | thin wrapper smoke가 부족하면 2차 후보로 검토 |
| Hook 포함 bundle | NO-GO for default, CONDITIONAL for opt-in | `[features].plugin_hooks = true`, non-managed trust review, incomplete interception, side effect 한계가 있다. | #38에서 별도 승인 항목으로만 다룸 |
| App/MCP 포함 | NO-GO | 이번 task 목적과 무관하고 external auth/setup surface가 늘어난다. | 별도 이슈 필요 |
| Public 배포 | NO-GO in #37 | #37은 packaging 검증 task이고 실제 배포 후보 생성/설치 smoke는 #38 범위다. | #38에서 bundle 생성과 install/load smoke 수행 |

### #38 인계 조건

#38은 다음 순서로 진행하는 것이 적절하다.

1. `plugins/hyper-waterfall-codex/` 아래에 hook 없는 thin wrapper bundle을 생성한다.
2. `.codex-plugin/plugin.json`에는 `skills: "./skills/"`만 component pointer로 둔다.
3. `skills/hyper-waterfall/SKILL.md` wrapper는 `AGENTS.md`, `mydocs/skills`, `docs/agent-entrypoint.md`, npm CLI dry-run으로 넘긴다.
4. repo 또는 temporary marketplace root에 marketplace JSON을 만들고 local source path를 `./plugins/hyper-waterfall-codex`로 둔다.
5. Codex CLI 또는 app plugin directory에서 install/load surface를 확인한다.
6. 설치 후 새 thread에서 `@hyper-waterfall` 또는 bundled Skill invocation이 가능한지 확인한다.
7. hook 포함 smoke는 기본 bundle smoke 이후 별도 승인으로만 진행한다.

### 보류 조건

- thin wrapper Skill이 plugin directory나 prompt invocation에서 충분히 발견되지 않으면 release snapshot 후보를 재검토한다.
- Codex CLI/app이 local marketplace를 install하지 못하면 marketplace root 구조, path 해석, restart 요구를 #38 보고서에 남긴다.
- plugin cache나 config 변경이 필요하면 cleanup 절차를 #38 계획에 포함한다.
- hook을 포함하려면 trust review 안내, `plugin_hooks` 활성화 UX, fixture 기반 script 검증이 먼저 필요하다.

### Stage 4 결정

- #38 진입은 가능하다.
- #38 기본 scope는 hook 없는 thin wrapper bundle 생성과 install/load smoke다.
- hook guardrail은 packaging 후보로만 남기고 기본 배포 후보에서는 제외한다.
- `docs/plugin-distribution-principles.md`는 Codex plugin-bundled hook의 feature key를 `[features].plugin_hooks = true`로 명시하도록 보정한다.

## 참고 링크

- [Build plugins - Codex](https://developers.openai.com/codex/plugins/build)
- [Plugins - Codex](https://developers.openai.com/codex/plugins)
- [Hooks - Codex](https://developers.openai.com/codex/hooks)
- [`docs/plugin-distribution-principles.md`](../../docs/plugin-distribution-principles.md)
- [`mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md`](task_m040_37_codex_plugin_specs_inventory.md)
