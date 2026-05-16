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

## 결정

- #38의 Codex plugin bundle 1차 후보는 thin wrapper Skill 기반으로 둔다.
- plugin manifest는 `skills: "./skills/"`를 포함하고 `hooks`, `mcpServers`, `apps`는 Stage 2 base 후보에서 제외한다.
- plugin bundle은 `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, manual 본문, core Skill 본문을 canonical source로 복제하지 않는다.
- release snapshot 방식은 개별 core Skill discoverability가 부족할 때의 2차 후보로만 둔다.
- 실제 local marketplace와 install/load smoke는 #38로 넘긴다.

## 비결정 / 보류

- #38에서 thin wrapper만으로 Plugin Directory와 skill invocation discoverability가 충분한지 smoke가 필요하다.
- plugin `version`을 framework release와 같은 `0.2.0`으로 둘지, plugin artifact pre-release로 둘지는 #38에서 배포 후보 이름과 함께 확정한다.
- plugin assets, icon, legal links, long install-surface copy는 #38에서 최종화한다.
- hook inclusion은 Stage 3에서 `plugin_hooks` opt-in 조건과 함께 검증한다.

## 적용 영향

- Stage 3은 hook config를 Stage 2 base manifest와 분리해 검증해야 한다.
- Stage 4는 #38로 넘길 local marketplace와 restart/install smoke 전제 조건을 go/no-go에 포함해야 한다.
- 공통 원칙 문서 변경은 Stage 2에서는 필요하지 않다. 다만 Stage 4에서 #37 전체 결과를 종합해 `docs/plugin-distribution-principles.md`의 `codex_hooks` 계열 표현 보정 여부를 판단한다.

## 참고 링크

- [Build plugins - Codex](https://developers.openai.com/codex/plugins/build)
- [Plugins - Codex](https://developers.openai.com/codex/plugins)
- [`docs/plugin-distribution-principles.md`](../../docs/plugin-distribution-principles.md)
- [`mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md`](task_m040_37_codex_plugin_specs_inventory.md)
