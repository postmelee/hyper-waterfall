# Task #37 Codex plugin 사양 inventory

## 조사 배경

Task #37 Stage 1은 Codex plugin packaging 검증을 시작하기 전에 OpenAI Codex plugin/hooks 공식 사양과 #36 공통 원칙의 Codex 관련 항목을 최신 기준으로 다시 고정하는 단계다.

`openai-docs` Skill 지침에 따라 OpenAI Developer Docs MCP를 우선 탐색했으나, 현재 세션에서는 `tool_search`로 OpenAI Developer Docs MCP callable tool이 노출되지 않았다. 따라서 공식 OpenAI 도메인인 `developers.openai.com` 문서만 fallback으로 확인했다.

확인일: 2026-05-16

## 조사 질문

- Codex plugin의 필수 manifest 위치와 plugin root 구조는 무엇인가?
- Codex plugin marketplace와 local install/load 검증은 어떤 표면을 사용해야 하는가?
- Codex plugin이 Skill, hook, MCP, app integration을 어떤 manifest field로 가리키는가?
- Codex hook의 현재 feature flag, plugin-bundled hook 조건, event coverage, matcher 지원 범위는 무엇인가?
- #36 공통 원칙 중 #37에서 확정하거나 보정해야 할 항목은 무엇인가?

## 조사 대상

| 대상 | 이유 | 위치 |
|---|---|---|
| OpenAI Codex Build plugins | plugin authoring, manifest, marketplace, plugin root 구조 확인 | [Build plugins](https://developers.openai.com/codex/plugins/build) |
| OpenAI Codex Plugins | 사용자가 plugin을 찾고 설치하는 기본 표면 확인 | [Plugins](https://developers.openai.com/codex/plugins) |
| OpenAI Codex Hooks | hook feature flag, lifecycle event, matcher, output semantics 확인 | [Hooks](https://developers.openai.com/codex/hooks) |
| `docs/plugin-distribution-principles.md` | #36에서 정한 공통 canonical/source 원칙 확인 | `docs/plugin-distribution-principles.md` |
| `docs/distribution-channels.md` | Codex plugin 배포 채널 위치와 비목표 확인 | `docs/distribution-channels.md` |
| `docs/agent-entrypoint.md` | plugin fallback이 따라야 할 lifecycle 판단 출력 기준 확인 | `docs/agent-entrypoint.md` |
| `mydocs/tech/task_m040_36_plugin_specs_inventory.md` | #36에서 남긴 사양 inventory와 재확인 항목 비교 | `mydocs/tech/task_m040_36_plugin_specs_inventory.md` |

## 발견 내용

### Codex plugin 목적과 사용 표면

- 공식 Plugins 문서는 Codex plugin을 reusable workflow용 bundle로 설명하며, 포함 가능한 주요 구성은 Skills, Apps, MCP servers다.
- Codex 앱에서는 Plugin Directory에서 curated plugin을 탐색하고 설치한다.
- Codex CLI에서는 `codex` 실행 후 `/plugins`에서 plugin list를 열고, marketplace별로 plugin을 탐색, install/uninstall, enabled state toggle을 수행할 수 있다.
- Stage 2에서는 local install/load 검증 표면을 repo marketplace 또는 personal marketplace 중 어느 쪽으로 둘지 결정해야 한다.

### Marketplace와 local install

- repo marketplace 위치는 `$REPO_ROOT/.agents/plugins/marketplace.json`, personal marketplace 위치는 `~/.agents/plugins/marketplace.json`이다.
- marketplace는 `plugins[]` 아래에 plugin entry를 두고, local source는 plugin folder를 가리키는 `source.path`를 `./`로 시작하는 marketplace root 상대 경로로 둔다.
- local repo 예시는 plugin folder를 `$REPO_ROOT/plugins/my-plugin`에 두고 marketplace entry가 `./plugins/my-plugin`을 가리키는 방식이다.
- Codex는 marketplace를 통해 plugin을 설치한 뒤 `~/.codex/plugins/cache/$MARKETPLACE_NAME/$PLUGIN_NAME/$VERSION/`에서 installed copy를 로드한다. local plugin의 `$VERSION`은 `local`이다.
- plugin enable/disable 상태는 `~/.codex/config.toml`에 저장된다.
- Stage 4의 local 검증 가능성 조사는 marketplace 파일 추가, Codex restart, plugin directory 확인이 필요한지 별도로 검토해야 한다. #37에서는 실제 설치 smoke 완료를 범위 밖으로 둔다.

### Plugin structure와 manifest

- 모든 plugin에는 `.codex-plugin/plugin.json` manifest가 필요하다.
- plugin root에는 선택적으로 `skills/`, `hooks/`, `.app.json`, `.mcp.json`, `assets/`를 둘 수 있다.
- `.codex-plugin/` 내부에는 `plugin.json`만 두고, `skills/`, `hooks/`, `assets/`, `.mcp.json`, `.app.json`은 plugin root에 둔다.
- manifest의 top-level metadata는 plugin 식별과 discovery에 쓰인다. 핵심 필드는 `name`, `version`, `description`이고, publisher metadata로 `author`, `homepage`, `repository`, `license`, `keywords`를 둘 수 있다.
- bundled component pointer는 `skills`, `mcpServers`, `apps`, `hooks` field로 표현하고, 경로는 plugin root 상대이며 `./`로 시작해야 한다.
- `interface` object는 install surface에 보이는 `displayName`, `shortDescription`, `longDescription`, `developerName`, `category`, `capabilities`, link, starter prompt, visual asset metadata를 담는다.
- `name`은 kebab-case stable identifier로 두어야 하며, Codex는 이를 plugin identifier와 component namespace로 사용한다.

### Skill packaging 관련 확정 사항

- minimal plugin은 `skills` field가 `./skills/`를 가리키고, Skill은 `skills/<skill-name>/SKILL.md` 아래에 둔다.
- Hyper-Waterfall core Skill을 plugin으로 노출할 경우, Stage 2에서 release snapshot과 thin wrapper를 비교해야 한다.
- 확정: plugin root 밖의 `templates/mydocs/skills`를 manifest path로 직접 가리키는 방식은 현재 path 규칙과 맞지 않는다. plugin에 Skill을 포함한다면 plugin root 내부 snapshot 또는 wrapper여야 한다.
- 보류: snapshot을 포함할 경우 원본 경로와 release/tag를 표시하는 방식, wrapper를 둘 경우 원본 Skill을 어떻게 읽게 할지는 Stage 2에서 결정한다.

### Hook feature flag와 plugin-bundled hook

- 일반 Codex hooks는 현재 기본 활성이다. 필요 시 `[features].hooks = false`로 끌 수 있으며, `codex_hooks`는 deprecated alias로 남아 있다.
- plugin-bundled hooks는 이번 release에서 opt-in이다. enabled plugin이 bundled hook을 로드하려면 `[features].plugin_hooks = true`가 필요하다.
- plugin hook은 기본적으로 plugin root의 `hooks/hooks.json`에서 찾는다.
- `.codex-plugin/plugin.json`의 `hooks` field가 있으면 기본 `hooks/hooks.json` 대신 manifest entry를 사용한다.
- manifest `hooks` entry는 `./` path, path array, inline hooks object, inline hooks object array가 가능하다.
- manifest hook path는 plugin root 상대이며 plugin root 내부에 머물러야 한다.
- plugin hook command에는 `PLUGIN_ROOT`, `PLUGIN_DATA`가 Codex-specific extension으로 제공되고, compatibility 목적으로 `CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA`도 제공된다.
- plugin hooks는 non-managed hooks이므로 실행 전 trust review가 필요하다.

### Hook runtime, matcher, output semantics

- matching hook이 여러 source에 있으면 모두 실행된다. 같은 event의 여러 command hook은 concurrently 시작되므로 한 hook이 다른 matching hook의 시작을 막을 수 없다.
- `PreToolUse`, `PermissionRequest`, `PostToolUse`, `UserPromptSubmit`, `Stop`은 turn scope에서 실행된다.
- `SessionStart`, `PreToolUse`, `PermissionRequest`, `PostToolUse`, `UserPromptSubmit`, `Stop` input에는 `permission_mode`가 포함된다.
- matcher 지원은 event별로 다르다. `PreToolUse`, `PermissionRequest`, `PostToolUse`는 tool name 기준 matcher를 지원하고, 지원 tool 범위는 `Bash`, `apply_patch`, MCP tool names다. `apply_patch`는 matcher alias로 `Edit`, `Write`도 사용할 수 있다.
- `SessionStart` matcher는 `startup`, `resume`, `clear` source에 적용된다.
- `UserPromptSubmit`과 `Stop`은 현재 matcher를 사용하지 않는다.
- `PreToolUse`는 지원되는 tool call 전에 실행되어 deny, block, exit code 2, additional context 후보를 사용할 수 있다.
- `PermissionRequest`는 allow 또는 deny decision을 반환할 수 있다. Hyper-Waterfall guardrail에서는 자동 `allow`를 사용하지 않는 것이 원칙에 맞다. deny가 필요 없는 경우 decision을 반환하지 않아 Codex의 normal approval flow를 유지해야 한다.
- `PostToolUse`는 tool 실행 후에 실행되며, 이미 발생한 side effect를 되돌릴 수 없다.
- `UserPromptSubmit`은 prompt 제출 전 context 추가 또는 block 후보로 쓸 수 있으나 matcher가 적용되지 않는다.
- `Stop`은 turn 종료 시점에 JSON output을 기대하며, continuation을 만들 수 있다. 반복 continuation 위험이 있어 report-only 또는 제한적 warn 후보로 검토해야 한다.

### Hook coverage 한계

- 현재 hook은 모든 shell call을 intercept하지 않는다. simple shell 중심이고, newer unified exec mechanism의 interception도 incomplete로 문서화되어 있다.
- `WebSearch`와 같은 non-shell, non-MCP tool call은 현재 hook intercept 대상이 아니다.
- `PostToolUse`는 사후 hook이므로 파일 변경, shell side effect, 외부 action을 되돌릴 수 없다.
- prompt, agent handler type은 parsed되지만 현재 skipped되고, command handler만 실행된다.
- `async: true` command hook도 현재 지원되지 않아 skipped된다.

### #36 원칙과의 비교

- 유지: Codex plugin은 canonical source가 아니라 발견성과 실행 편의를 위한 계층이다.
- 유지: Skill/manual/manifest/migration guide를 plugin 전용 진실 원천으로 만들면 안 된다.
- 유지: hook은 작업지시자 승인 자동화가 아니라 객관 상태 기반 guardrail 후보로만 다룬다.
- 보정: #36 inventory의 `codex_hooks` 표현은 현재 공식 문서 기준에서 deprecated alias다. 일반 hooks feature key는 `hooks`, plugin-bundled hooks feature key는 `plugin_hooks`로 구분해야 한다.
- 보정: #36에서 "plugin hooks 기본 off"라고 정리한 항목은 plugin-bundled hooks에만 적용된다. 일반 hooks 자체는 현재 기본 활성이다.
- 보정: PermissionRequest는 technical하게 allow를 반환할 수 있지만, Hyper-Waterfall 정책상 allow 자동화는 금지하고 deny 또는 no-decision normal approval flow만 후보로 둔다.

## 결정

- Stage 2는 `.codex-plugin/plugin.json`을 required entry point로 두고, plugin root 내부 component path만 후보로 검증한다.
- Stage 2는 core Skill 노출 방식을 release snapshot 또는 thin wrapper 중심으로 비교한다. plugin manifest가 `templates/mydocs/skills`를 plugin root 밖 경로로 직접 참조하는 방식은 제외한다.
- Stage 3은 일반 hooks feature key `hooks`와 plugin-bundled hooks feature key `plugin_hooks`를 구분해 기록한다.
- Stage 3은 `PermissionRequest` 자동 allow를 Hyper-Waterfall guardrail 후보에서 제외한다. deny 또는 no-decision normal approval flow만 검토한다.
- Stage 4는 local install/load smoke를 #37에서 완료하지 않고, marketplace entry와 Codex restart가 필요한 #38 인계 조건으로 정리한다.

## 비결정 / 보류

- plugin에 core Skill snapshot을 포함할지 thin wrapper만 둘지는 Stage 2에서 결정한다.
- `.codex-plugin/plugin.json`의 published metadata 수준과 install-surface copy는 Stage 2에서 후보 구조로 검증하고, 실제 배포 후보 문구는 #38에서 확정한다.
- hook config를 default `hooks/hooks.json`으로 둘지 manifest `hooks` field로 명시할지는 Stage 3에서 분류한다.
- 실제 local marketplace 파일 생성, plugin install, enable/disable, Codex restart 확인은 #38에서 수행한다.

## 적용 영향

- `docs/plugin-distribution-principles.md`의 원칙은 대체로 유지되지만, `codex_hooks` 대신 `hooks`와 `plugin_hooks`를 구분하는 보정이 필요할 수 있다.
- Stage 2의 packaging validation 문서는 plugin root 내부 snapshot/wrapper 기준을 강하게 적용해야 한다.
- Stage 3의 hook guardrail 문서는 `PermissionRequest` allow 자동화를 금지하고, incomplete interception과 PostToolUse side effect 한계를 명확히 해야 한다.
- #38은 local marketplace와 Codex restart가 필요한 install/load smoke를 별도 범위로 받아야 한다.

## Stage 2 반영

Stage 2에서는 이 inventory를 기준으로 `mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md`를 작성했다. 반영 결과는 다음과 같다.

- `.codex-plugin/plugin.json`을 required entry point로 두고, manifest component path는 plugin root 내부 `./` 경로만 허용하는 것으로 검증했다.
- #38의 1차 bundle 후보는 full core Skill snapshot이 아니라 `skills/hyper-waterfall/SKILL.md` thin wrapper로 두었다.
- release snapshot 방식은 offline discovery가 필요할 때의 2차 후보로 남기되, snapshot에도 원본 경로와 release/tag를 표시해야 한다고 정리했다.
- `templates/manifest.json`, `docs/migrations/`, `docs/agent-entrypoint.md`, npm CLI, `templates/mydocs/manual`은 plugin bundle에 복제하지 않고 참조 또는 fallback 안내로만 다루는 것으로 검증했다.
- `hooks` manifest field와 `hooks/hooks.json` 구성은 Stage 3 범위로 남기고 Stage 2 base manifest에는 넣지 않는 것으로 정리했다.

## Stage 3 반영

Stage 3에서는 Codex hook guardrail packaging 가능성을 `mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md`에 추가했다. 반영 결과는 다음과 같다.

- #38 1차 bundle 후보는 hook을 포함하지 않는 thin wrapper Skill 전용 구성을 유지한다.
- hook 포함은 2차 후보로 두며, 사용하려면 `[features].plugin_hooks = true`, plugin enable 상태, non-managed hook trust review가 필요하다고 정리했다.
- manifest `hooks` field를 생략하면 default `hooks/hooks.json`을 사용할 수 있으므로, 1개 hook config만 둘 때는 default 파일을 우선 후보로 정했다.
- `PermissionRequest`는 기술적으로 allow를 반환할 수 있지만 Hyper-Waterfall 정책상 자동 allow를 금지하고 deny 또는 no-decision normal approval flow만 후보로 둔다.
- `PreToolUse`는 위험 명령, publish/merge/close, 승인 전 파일 수정 시도 같은 사전 guardrail 후보로 두되, incomplete interception 한계를 명시했다.
- `PostToolUse`와 `Stop`은 단계 보고 누락, 검증 미수행 같은 사후 warn/report-only 후보로 두고 side effect 되돌림 수단으로 표현하지 않았다.

## 참고 링크

- [Build plugins - Codex](https://developers.openai.com/codex/plugins/build)
- [Plugins - Codex](https://developers.openai.com/codex/plugins)
- [Hooks - Codex](https://developers.openai.com/codex/hooks)
- [`docs/plugin-distribution-principles.md`](../../docs/plugin-distribution-principles.md)
- [`docs/distribution-channels.md`](../../docs/distribution-channels.md)
- [`docs/agent-entrypoint.md`](../../docs/agent-entrypoint.md)
