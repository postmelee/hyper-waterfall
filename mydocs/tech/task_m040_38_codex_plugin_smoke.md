# Task #38 Codex plugin smoke validation

GitHub Issue: [#38](https://github.com/postmelee/hyper-waterfall/issues/38)
확인일: 2026-05-16

## 목적

이 문서는 Codex plugin 배포 후보 생성과 설치 smoke의 기준을 기록한다. Stage 1에서는 실제 bundle을 만들지 않고, 공식 사양, local CLI surface, #37 인계 조건을 다시 확인해 Stage 2-4의 실행 기준을 고정한다.

## 공식 문서 재확인

| 문서 | URL | #38 적용 항목 |
|---|---|---|
| Codex Plugins | https://developers.openai.com/codex/plugins | plugin은 Skill, app integration, MCP server를 reusable workflow로 묶는 단위이며, Codex app plugin directory와 CLI `/plugins`에서 browse/install surface를 제공한다. |
| Codex Build plugins | https://developers.openai.com/codex/plugins/build | `.codex-plugin/plugin.json` required entry point, `skills: "./skills/"`, repo marketplace, local marketplace source, manifest field/path rule을 확인했다. |
| Codex Hooks | https://developers.openai.com/codex/hooks | plugin-bundled hook은 `[features].plugin_hooks = true` opt-in이며, 기본 bundle에는 포함하지 않는다는 #37 판단을 재확인했다. |

## Stage 1 공식 사양 요약

| 항목 | 확인 결과 | #38 적용 |
|---|---|---|
| Plugin 단위 | Plugin은 Codex에서 reusable workflow를 제공하기 위해 skills, apps, MCP servers를 bundle할 수 있다. | #38 기본 bundle은 Skill만 포함한다. Apps/MCP는 제외한다. |
| Required manifest | `.codex-plugin/plugin.json`이 required entry point다. | Stage 2에서 이 파일을 생성한다. |
| Minimal skill plugin | 최소 구조는 plugin folder, `.codex-plugin/plugin.json`, `skills/<skill-name>/SKILL.md`다. | `plugins/hyper-waterfall-codex/skills/hyper-waterfall/SKILL.md`를 만든다. |
| Manifest metadata | `name`, `version`, `description`은 plugin 식별 정보이고, `skills`, `mcpServers`, `apps`, `hooks`는 bundled component를 plugin root 상대 경로로 가리킨다. | manifest에는 `skills: "./skills/"`만 포함하고 hooks/apps/MCP는 넣지 않는다. |
| Path rule | manifest path는 plugin root 상대 `./` 경로여야 한다. | `skills`와 향후 assets path는 plugin root 내부로 제한한다. |
| Repo marketplace | repo marketplace는 `$REPO_ROOT/.agents/plugins/marketplace.json`을 사용하고 plugin은 `$REPO_ROOT/plugins/` 아래에 둔다. | Stage 3에서 `.agents/plugins/marketplace.json`과 `plugins/hyper-waterfall-codex/` 구조를 사용한다. |
| Marketplace path 기준 | `source.path`는 `.agents/plugins/` 폴더가 아니라 marketplace root 기준으로 해석된다. | local CLI add 후보는 repo root에서 `codex plugin marketplace add .`로 보정한다. |
| CLI marketplace source | CLI는 GitHub shorthand, Git URL, SSH URL, local marketplace root directory를 source로 받을 수 있다. | Stage 3에서 repo root를 local marketplace root 후보로 둔다. |
| Plugin-bundled hook | plugin hook은 현재 release에서 opt-in이고 `[features].plugin_hooks = true`가 필요하다. | #38 기본 bundle에서 `hooks` field와 `hooks/` directory를 제외한다. |
| Hook matcher/coverage | `PreToolUse`, `PermissionRequest`, `PostToolUse` 등 일부 이벤트가 matcher를 지원하지만 shell/tool interception은 완전한 enforcement boundary가 아니다. | hook guardrail은 #38 기본 smoke 범위가 아니다. |

## Local CLI surface

실행 위치: `/private/tmp/hyper-waterfall-task38`

| 명령 | 결과 요약 |
|---|---|
| `codex --version` | `codex-cli 0.131.0-alpha.9` 확인. PATH update warning은 있었지만 version 출력은 성공했다. |
| `codex plugin --help` | `marketplace` subcommand 확인. |
| `codex plugin marketplace --help` | `add`, `upgrade`, `remove` subcommand 확인. |
| `codex plugin marketplace add --help` | `<SOURCE>`가 `owner/repo[@ref]`, HTTP(S) Git URL, SSH URL, local marketplace root directory를 지원한다고 확인. |

## #37 인계 조건 점검

| #37 인계 항목 | Stage 1 판단 | Stage 2-4 처리 |
|---|---|---|
| Hook 없는 thin wrapper bundle | GO | Stage 2에서 `plugins/hyper-waterfall-codex/` 아래에 생성한다. |
| Release snapshot bundle | CONDITIONAL | Thin wrapper discovery가 부족할 때 Stage 4 후속 후보로만 기록한다. |
| Hook 포함 bundle | 기본 NO-GO, opt-in CONDITIONAL | 이번 기본 bundle과 Stage 3 smoke에서는 제외한다. |
| App/MCP 포함 | NO-GO | 제외한다. |
| Public 배포 | #38에서도 별도 승인 전 실행 금지 | Stage 4에서 go/no-go와 승인 요청 조건만 기록한다. |
| Local marketplace smoke | #38 범위 | Stage 3에서 repo root marketplace 기준으로 확인한다. |
| Plugin cache/config cleanup | smoke 실행 시 필요 | Stage 3에서 변경 위치와 cleanup을 기록한다. |

## Stage 2 확정 후보

```text
plugins/hyper-waterfall-codex/
  .codex-plugin/
    plugin.json
  skills/
    hyper-waterfall/
      SKILL.md
  README.md
```

Stage 2 manifest 후보:

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

## Stage 3 smoke 기준 보정

구현계획서 초안의 조건부 명령은 `codex plugin marketplace add ./.agents/plugins`였으나, 공식 문서 기준으로는 marketplace root directory를 넘겨야 한다. repo marketplace 파일은 `$REPO_ROOT/.agents/plugins/marketplace.json`에 있고 `source.path`는 marketplace root 기준으로 해석되므로, #38 Stage 3의 조건부 명령 후보는 다음으로 보정한다.

```bash
codex plugin marketplace add .
```

이 명령은 local config/cache를 변경할 수 있으므로 Stage 3에서 작업지시자 승인 항목으로 다시 확인한다.

## Stage 1 결론

- #38 Stage 2는 hook 없는 thin wrapper bundle 생성으로 진행 가능하다.
- Stage 3 local marketplace smoke는 repo root를 marketplace root로 두는 방향으로 보정해야 한다.
- Hook 포함과 public 배포는 Stage 1 기준으로도 별도 승인 전 실행하지 않는다.
- Stage 2 전에 공식 사양 때문에 막히는 항목은 없다.

## Stage 2 bundle 생성 결과

Stage 2에서는 Stage 1에서 확정한 hook 없는 thin wrapper 구조를 실제 repository 산출물로 생성했다.

생성 파일:

```text
plugins/hyper-waterfall-codex/.codex-plugin/plugin.json
plugins/hyper-waterfall-codex/README.md
plugins/hyper-waterfall-codex/skills/hyper-waterfall/SKILL.md
```

### Manifest 결과

| field | 값 | 판단 |
|---|---|---|
| `name` | `hyper-waterfall` | kebab-case stable identifier로 사용 가능 |
| `version` | `0.2.0` | v0.2.0 배포 후보와 맞춤. plugin artifact version과 framework version의 혼동은 README와 보고서에서 관리 |
| `description` | `Discover Hyper-Waterfall workflows and lifecycle checks in Codex.` | install surface 설명 |
| `repository` | `https://github.com/postmelee/hyper-waterfall` | canonical repository 참조 |
| `license` | `MIT` | repository license와 일치 |
| `keywords` | `workflow`, `codex`, `project-management` | discovery metadata |
| `skills` | `./skills/` | plugin root 내부 상대 경로, 공식 path rule 충족 |
| `interface.capabilities` | `["Read"]` | thin wrapper의 읽기/안내 성격에 맞춰 제한 |

기본 bundle에는 `hooks`, `apps`, `mcpServers`, `assets`를 넣지 않았다.

### Thin wrapper 결과

`skills/hyper-waterfall/SKILL.md`는 다음 원칙을 따른다.

- `This plugin is not a canonical source.`라고 명시했다.
- 현재 저장소의 `AGENTS.md`를 먼저 읽게 한다.
- 정형 task 절차는 현재 저장소의 `mydocs/skills/{skill-name}/SKILL.md`를 읽게 한다.
- 신규 적용과 기존 업데이트 판단은 `docs/agent-entrypoint.md`, `templates/manifest.json`, `docs/migrations/`, npm CLI dry-run으로 보낸다.
- 승인 없이 파일 수정, issue close, PR merge, publish, release 생성을 하지 말라고 명시했다.
- fallback은 canonical 파일을 찾지 못할 때 사용자에게 저장소 루트와 release 기준 확인을 요청하는 수준으로 제한했다.

### README 결과

`README.md`는 local candidate의 목적, 포함 파일, 설계 원칙, local smoke 후보, 공개 배포 게이트를 설명한다. Stage 3에서 사용할 조건부 command 후보는 repo root 기준 `codex plugin marketplace add .`로 기록했다.

### Stage 2 검증 결과

| 항목 | 결과 | 근거 |
|---|---|---|
| 파일 구조 | OK | `find plugins/hyper-waterfall-codex -maxdepth 5 -type f`가 manifest, README, wrapper Skill 세 파일만 출력 |
| Manifest JSON | OK | `jq . plugins/hyper-waterfall-codex/.codex-plugin/plugin.json` 통과 |
| Canonical/fallback 문구 | OK | `AGENTS.md`, `mydocs/skills`, `docs/agent-entrypoint.md`, `npx hyper-waterfall`, `승인`, `canonical`, `진실 원천`, `not a canonical source`, `not execute public` 확인 |
| Manifest 복제 금지 | OK | `plugins/hyper-waterfall-codex/templates/manifest.json` 없음 |
| Migration 복제 금지 | OK | `plugins/hyper-waterfall-codex/docs/migrations` 없음 |
| Manual 복제 금지 | OK | `plugins/hyper-waterfall-codex/templates/mydocs/manual` 없음 |

### Stage 2 결론

- Stage 2 bundle 후보는 공식 Codex plugin path rule과 #37 canonical 원칙을 충족한다.
- 기본 bundle은 hook 없는 thin wrapper로 유지됐다.
- Stage 3에서는 repo-local marketplace 파일을 만들고, local config/cache 변경 가능성이 있는 `codex plugin marketplace add .` 실행 여부를 별도 확인해야 한다.
