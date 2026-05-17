# Task #52 Codex plugin public smoke validation

GitHub Issue: [#52](https://github.com/postmelee/hyper-waterfall/issues/52)
확인일: 2026-05-17

## 목적

이 문서는 Codex plugin public 배포와 UI discovery smoke의 기준과 실행 결과를 기록한다. Stage 1에서는 실제 marketplace add, UI discovery, public 배포를 수행하지 않고, 공식 문서, local CLI surface, #38 산출물, 현재 배포 후보 gap을 재확인한다.

## Stage 1 공식 문서 재확인

OpenAI Docs MCP search/fetch 도구가 현재 Codex 세션의 callable tool로 노출되지 않아, 공식 OpenAI domain 웹 문서를 fallback으로 확인했다. 사용한 출처는 모두 `developers.openai.com`이다.

| 문서 | URL | #52 적용 항목 |
|---|---|---|
| Codex Plugins | https://developers.openai.com/codex/plugins | Codex app Plugin Directory와 CLI `/plugins`에서 plugin을 browse/install하고, 설치 후 새 thread에서 plugin을 사용한다. 특정 plugin 또는 bundled skill은 `@`로 명시 invocation할 수 있다. |
| Codex Build plugins | https://developers.openai.com/codex/plugins/build | repo marketplace 위치, `source.path` 기준, CLI marketplace add source, plugin manifest, install-surface metadata, public plugin publishing 상태를 확인했다. |
| Agent Skills | https://developers.openai.com/codex/skills | Skill은 workflow authoring format이고 plugin은 reusable skill/app distribution unit이라는 관계를 확인했다. |

## Stage 1 공식 사양 요약

| 항목 | 확인 결과 | #52 판단 |
|---|---|---|
| Plugin Directory | Codex app의 Plugins 화면에서 curated plugin을 browse/install한다. CLI에서는 `codex` 진입 후 `/plugins`로 plugin list를 연다. | Stage 2에서 Codex app 또는 CLI `/plugins` 확인이 필요하다. 비대화식 CLI에는 list/install subcommand가 없다. |
| Marketplace source | `codex plugin marketplace add`는 GitHub shorthand, Git URL, SSH URL, local marketplace root directory를 source로 받는다. | repo root에서 `codex plugin marketplace add .`를 Stage 2 smoke 후보로 유지한다. |
| Repo marketplace | repo-scoped marketplace는 `$REPO_ROOT/.agents/plugins/marketplace.json`이고, plugin은 보통 `$REPO_ROOT/plugins/` 아래에 둔다. | 현재 `.agents/plugins/marketplace.json`과 `plugins/hyper-waterfall-codex/` 구조는 공식 repo marketplace 구조와 맞다. |
| Marketplace path | `source.path`는 `.agents/plugins/` 폴더가 아니라 marketplace root 기준이며 `./`로 시작하고 root 내부에 있어야 한다. | 현재 `./plugins/hyper-waterfall-codex`는 repo root 기준 상대 경로라 유지 가능하다. |
| Marketplace metadata | `name`, `interface.displayName`, `plugins[]`, `policy.installation`, `policy.authentication`, `category`를 사용한다. | 현재 local marketplace는 필수 형식을 충족한다. |
| Plugin install/cache | Codex는 plugin을 `~/.codex/plugins/cache/$MARKETPLACE_NAME/$PLUGIN_NAME/$VERSION/`에 설치하고, local plugin version은 `local`로 처리한다. enabled 상태는 `~/.codex/config.toml`에 저장된다. | Stage 2 add/remove smoke는 local config/cache 부작용과 cleanup을 반드시 기록해야 한다. |
| Manifest entry point | `.codex-plugin/plugin.json`이 required entry point다. `plugin.json`만 `.codex-plugin/`에 두고 skills/assets/hooks 등은 plugin root에 둔다. | 현재 후보는 required entry point와 `skills/` 위치를 충족한다. |
| Published manifest | published plugin은 minimal manifest보다 rich metadata를 쓰는 편이며, manifest는 식별, bundled component path, install-surface metadata를 제공한다. | 현재 후보는 식별/skills/read capability는 있으나 `author`, `homepage`, `privacyPolicyURL`, `termsOfServiceURL`, `brandColor`, `composerIcon`, `logo`, `screenshots`가 없다. |
| Visual/legal metadata | install-surface metadata에는 `websiteURL`, `privacyPolicyURL`, `termsOfServiceURL`, `defaultPrompt`, `brandColor`, `composerIcon`, `logo`, `screenshots`가 포함될 수 있다. | public 배포 전 legal link와 asset 필요 여부를 Stage 3 판단에 반영해야 한다. |
| Public publishing | 공식 Plugin Directory 추가와 self-serve plugin publishing/management는 coming soon 상태다. | 현재 공식 self-serve public 배포 명령은 확인되지 않는다. #52 public 배포는 실행보다 보류/대체 경로 문서화 가능성이 높다. |
| Skills 관계 | Skill은 reusable workflow authoring format이고, plugin은 reusable skill/app의 installable distribution unit이다. | thin wrapper Skill 전략은 유지 가능하다. core Skill 본문 fork는 계속 제외한다. |

## Local CLI surface

실행 위치: `/private/tmp/hyper-waterfall-task52`

| 명령 | 결과 요약 | 판단 |
|---|---|---|
| `codex --version` | `codex-cli 0.131.0-alpha.9` 출력. PATH update warning은 있었지만 version 확인은 성공했다. | Stage 2 smoke 실행 가능 |
| `codex plugin --help` | `marketplace` subcommand만 노출된다. | 비대화식 install/list/load subcommand는 없음 |
| `codex plugin marketplace --help` | `add`, `upgrade`, `remove` subcommand 확인. | add/remove smoke 가능 |
| `codex plugin marketplace add --help` | `<SOURCE>`가 GitHub shorthand, Git URL, SSH URL, local marketplace root directory를 지원한다고 출력. | repo root local marketplace add 후보 유지 |

## 현재 후보 구조 점검

현재 plugin 후보 파일:

```text
plugins/hyper-waterfall-codex/.codex-plugin/plugin.json
plugins/hyper-waterfall-codex/README.md
plugins/hyper-waterfall-codex/skills/hyper-waterfall/SKILL.md
.agents/plugins/marketplace.json
```

### Manifest 점검

| 항목 | 현재 값 | 판단 |
|---|---|---|
| `name` | `hyper-waterfall` | kebab-case stable identifier로 적합 |
| `version` | `0.2.0` | M040/v0.2.0 candidate와 일치 |
| `description` | `Discover Hyper-Waterfall workflows and lifecycle checks in Codex.` | 기본 설명 존재 |
| `repository` | `https://github.com/postmelee/hyper-waterfall` | canonical repository 연결 |
| `license` | `MIT` | repository license와 일치 |
| `keywords` | `workflow`, `codex`, `project-management` | discovery metadata 존재 |
| `skills` | `./skills/` | plugin root 내부 상대 경로 |
| `interface.displayName` | `Hyper-Waterfall` | install-surface title 존재 |
| `interface.shortDescription` | `Issue-first waterfall workflow guardrails for coding agents.` | install-surface copy 존재 |
| `interface.longDescription` | canonical source를 새로 만들지 않는 workflow entrypoint 설명 | thin wrapper 원칙과 맞음 |
| `interface.developerName` | `postmelee` | publisher display metadata 존재 |
| `interface.category` | `Productivity` | marketplace category 존재 |
| `interface.capabilities` | `Read` | thin wrapper 성격과 맞음 |
| `interface.websiteURL` | GitHub repository URL | external link 존재 |
| `interface.defaultPrompt` | 2개 prompt | starter prompt 존재 |
| `privacyPolicyURL` / `termsOfServiceURL` | 없음 | public install-surface 전 추가 필요 여부 확인 필요 |
| `brandColor` / `composerIcon` / `logo` / `screenshots` | 없음 | public install-surface 전 asset 필요 여부 확인 필요 |

### Marketplace 점검

| 항목 | 현재 값 | 판단 |
|---|---|---|
| `name` | `hyper-waterfall-local` | local marketplace 식별 가능 |
| `interface.displayName` | `Hyper-Waterfall Local Plugins` | Codex-facing marketplace title 존재 |
| `plugins[0].name` | `hyper-waterfall` | manifest name과 일치 |
| `source.source` | `local` | repo-local candidate와 일치 |
| `source.path` | `./plugins/hyper-waterfall-codex` | marketplace root 기준 path rule 충족 |
| `policy.installation` | `AVAILABLE` | 공식 예시와 맞음 |
| `policy.authentication` | `ON_INSTALL` | 공식 예시와 맞음 |
| `category` | `Productivity` | manifest category와 일치 |

## #38 baseline

| #38 결과 | #52 Stage 1 판단 |
|---|---|
| `codex plugin marketplace add .` local smoke 성공 | Stage 2에서 같은 repo root 기준으로 재확인한다. |
| `codex plugin marketplace remove hyper-waterfall-local` cleanup 성공 | Stage 2에서도 add/remove를 같은 단계 안에서 처리한다. |
| 실제 Plugin Directory 표시와 Skill invocation은 Codex restart/UI 확인 필요 | Stage 2의 핵심 확인 범위로 유지한다. |
| public 배포는 별도 승인 전 보류 | Stage 3에서 별도 승인 여부와 공식 publishing surface 부재를 함께 판단한다. |
| fallback 경로는 `AGENTS.md`, `docs/agent-entrypoint.md`, `templates/mydocs/skills/`, npm CLI | public 배포 보류 시 대체 설치/사용 경로로 이어받는다. |

## Gap 분석

| Gap | 영향 | Stage 2-3 처리 |
|---|---|---|
| Official self-serve public publishing 명령/절차 미확인 | 현재 상태에서 즉시 public 배포를 실행할 수 없다. | Stage 3에서 public 배포 NO-GO 또는 보류 근거로 기록한다. |
| UI discovery 미확인 | repo-local marketplace가 실제 Codex app/CLI plugin browser에 표시되는지 아직 모른다. | Stage 2에서 app 또는 CLI `/plugins` 확인을 시도한다. |
| Skill invocation 미확인 | thin wrapper가 설치 후 `@` 또는 skill invocation surface에서 발견되는지 아직 모른다. | Stage 2에서 prompt discovery 또는 수동 확인을 기록한다. |
| legal link 부재 | public install-surface에서 privacy/terms URL이 요구되면 배포 전 보강 필요. | Stage 3에서 필요 여부와 보류 사유로 분리한다. |
| visual asset 부재 | composer icon, logo, screenshots가 public listing 품질 또는 요건에 필요할 수 있다. | Stage 3에서 보강 필요 여부를 후속 후보로 남긴다. |

## Stage 1 결론

- 현재 plugin 후보는 repo-local marketplace 구조, manifest entry point, `skills` path, thin wrapper 원칙을 유지할 수 있다.
- Codex CLI `0.131.0-alpha.9`는 marketplace add/remove surface를 제공하지만 비대화식 plugin list/install/load subcommand는 노출하지 않는다.
- 공식 문서 기준으로 public Plugin Directory 추가와 self-serve publishing/management는 아직 coming soon이다.
- Stage 2는 repo-local marketplace add/remove와 UI 또는 `/plugins` discovery 확인에 집중한다.
- Stage 3에서 public 배포는 별도 승인뿐 아니라 공식 publishing surface 존재 여부를 기준으로 GO/NO-GO를 판단해야 한다.

## Stage 2 UI discovery와 Skill invocation smoke

Stage 2에서는 repo-local marketplace를 현재 Codex CLI 설정에 임시 등록하고, CLI `/plugins` browser에서 local marketplace와 plugin 후보가 발견되는지 확인했다. 설치는 수행하지 않았다.

### Pre-cleanup 확인

실행 위치: `/private/tmp/hyper-waterfall-task52`

| 명령 | 결과 | 판단 |
|---|---|---|
| `codex plugin marketplace remove hyper-waterfall-local` | `marketplace 'hyper-waterfall-local' is not configured or installed` | Stage 2 시작 시 기존 local marketplace 등록이 없었다. |

### Marketplace add

| 명령 | 결과 | 판단 |
|---|---|---|
| `codex plugin marketplace add .` | sandbox 안에서는 `failed to add marketplace 'hyper-waterfall-local' to user config.toml: Operation not permitted` | `~/.codex/config.toml` 쓰기가 필요하므로 sandbox 제한으로 실패했다. |
| `codex plugin marketplace add .` | escalated 실행에서 `Added marketplace 'hyper-waterfall-local' from /private/tmp/hyper-waterfall-task52.` / `Installed marketplace root: /private/tmp/hyper-waterfall-task52` | repo root local marketplace add smoke 성공. |

### CLI `/plugins` discovery

`codex --no-alt-screen -C /private/tmp/hyper-waterfall-task52` interactive CLI를 실행해 `/plugins`를 열었다.

초기 sandbox 실행은 `~/.codex` state database write 제한 때문에 실패했다. escalated 실행에서는 TERM이 `dumb`이라는 warning이 있었지만 inline TUI가 열렸고, Plugin Directory 화면을 확인할 수 있었다.

확인 결과:

| 화면 | 확인 내용 | 판단 |
|---|---|---|
| Plugin browser | marketplace tab에 `Hyper-Waterfall Local Plugins`가 표시됐다. | repo-local marketplace discovery 성공 |
| Plugin search | `hyper-waterfall` 검색 결과에 `[-] Hyper-Waterfall`가 표시되고 상태가 `Available`로 보였다. | plugin 후보 discovery 성공 |
| Plugin details | `Hyper-Waterfall · Can be installed · hyper-waterfall-local` 표시. 설명은 `Discover Hyper-Waterfall workflows and lifecycle checks in Codex.`로 표시됐다. | manifest metadata가 details 화면에 반영됨 |
| Plugin details | `Skills           hyper-waterfall:hyper-waterfall` 표시. | bundled wrapper Skill prompt discovery 성공 |
| Plugin details | `Hooks No plugin hooks`, `Apps No plugin apps`, `MCP Servers No plugin MCP servers` 표시. | #38 thin wrapper/no hook 원칙 유지 확인 |

설치와 실제 skill invocation은 수행하지 않았다. 이번 Stage의 확인 범위는 Plugin Directory 후보 표시와 bundled skill prompt discovery다. 설치 후 새 thread에서의 `@hyper-waterfall` invocation은 local plugin install 상태를 남길 수 있어, Stage 2에서는 manual discovery 확인으로 제한했다.

interactive CLI 실행 중 GitHub MCP authentication warning이 표시됐지만 Plugin Directory rendering과 local plugin discovery에는 영향을 주지 않았다.

### Cleanup

| 명령 | 결과 | 판단 |
|---|---|---|
| `codex plugin marketplace remove hyper-waterfall-local` | `Removed marketplace 'hyper-waterfall-local'.` | Stage 2 local marketplace registration cleanup 성공 |

Codex CLI에는 marketplace list 명령이 없어 별도 listing으로 cleanup을 재검증하지 못했다. remove 명령 성공을 cleanup 근거로 둔다.

### Stage 2 결론

- `codex plugin marketplace add .`는 repo root local marketplace를 정상 등록했다.
- CLI `/plugins`에서 `Hyper-Waterfall Local Plugins` marketplace와 `Hyper-Waterfall` plugin 후보가 표시됐다.
- Plugin details에서 bundled Skill `hyper-waterfall:hyper-waterfall`가 표시돼 prompt discovery를 확인했다.
- Plugin install과 실제 invocation은 수행하지 않았다.
- `codex plugin marketplace remove hyper-waterfall-local`로 local registration cleanup을 완료했다.
- Stage 3에서는 official self-serve public publishing surface 부재, legal/asset gap, Stage 2 discovery 성공을 기준으로 public 배포 GO/NO-GO를 판단한다.

## Stage 3 public 배포 게이트와 실행/보류 판단

Stage 3에서는 Stage 1-2 결과를 기준으로 public 배포 실행 여부를 판단했다. 이번 Stage에서 작업지시자의 별도 public 배포 명시 승인은 없었고, 공식 문서 기준 self-serve public plugin publishing/management surface도 아직 coming soon 상태다. 따라서 public 배포는 실행하지 않는다.

### Gate 판단

| 항목 | 판단 | 근거 |
|---|---|---|
| Repo-local candidate 품질 | GO | Stage 2에서 local marketplace add, CLI `/plugins` discovery, bundled Skill prompt discovery가 확인됐다. |
| Plugin install-surface 기본 정보 | CONDITIONAL GO | `displayName`, `shortDescription`, `longDescription`, `developerName`, `category`, `capabilities`, `websiteURL`, `defaultPrompt`가 있다. |
| Legal link readiness | CONDITIONAL / 보강 필요 | `privacyPolicyURL`, `termsOfServiceURL`가 없다. public listing에서 요구되면 별도 보강이 필요하다. |
| Visual asset readiness | CONDITIONAL / 보강 필요 | `brandColor`, `composerIcon`, `logo`, `screenshots`가 없다. public listing 품질 또는 요건에 필요할 수 있다. |
| Official publishing surface | NO-GO | 공식 문서 기준 self-serve public plugin publishing/management는 coming soon이며, 현재 실행 가능한 public 배포 명령을 확인하지 못했다. |
| Public 배포 승인 | NO-GO | “진행해줘”는 Stage 3 진입 승인으로 해석한다. public 배포 외부 action에 대한 별도 명시 승인은 없었다. |
| Public 배포 실행 | NO-GO / 보류 | 공식 publishing surface와 별도 승인 모두 부족하므로 실행하지 않았다. |

### 실행/보류 결과

| 항목 | 결과 |
|---|---|
| public 배포 명령 실행 | 실행하지 않음 |
| public 배포 URL/상태 | 없음 |
| manifest metadata 보강 | 이번 Stage에서는 수정하지 않음. 법적 URL/asset 요구가 확정되면 별도 승인 후 보강 |
| README 보강 | public 배포 보류와 대체 경로를 좁게 추가 |

### 대체 설치/사용 경로

Public 배포가 보류된 상태에서 사용할 수 있는 대체 경로는 다음과 같다.

| 경로 | 사용 방법 | 상태 |
|---|---|---|
| repo-local marketplace | repository root에서 `codex plugin marketplace add .` 실행 후 Codex `/plugins`에서 `Hyper-Waterfall` 확인 | Stage 2 smoke 성공 |
| cleanup | `codex plugin marketplace remove hyper-waterfall-local` | Stage 2 cleanup 성공 |
| repository entrypoint | 현재 저장소의 `AGENTS.md`를 먼저 읽는다 | 유지 |
| core Skill 원문 | `mydocs/skills/{skill-name}/SKILL.md`를 읽고 따른다 | 유지 |
| lifecycle 판단 | `docs/agent-entrypoint.md`, `templates/manifest.json`, `docs/migrations/`를 기준으로 판단한다 | 유지 |
| npm CLI fallback | `npx hyper-waterfall@0.2.0 init --repo . --dry-run`, `update --dry-run`, `doctor --repo .`, `--help` | #38에서 fallback 확인 |

### 후속 보강 후보

- `privacyPolicyURL`, `termsOfServiceURL` 필요 여부 확정
- `brandColor`, `composerIcon`, `logo`, `screenshots` 필요 여부 확정
- official self-serve public plugin publishing이 공개되면 배포 명령과 권한 확인
- public 배포가 가능해진 뒤 실제 install, 새 thread invocation, cleanup 검증 추가

### Stage 3 결론

- repo-local discovery 기준으로 candidate는 유지 가능하다.
- public 배포는 공식 publishing surface 부재와 별도 명시 승인 부재 때문에 NO-GO로 보류한다.
- 보류 상태의 대체 경로는 repo-local marketplace, canonical repository entrypoint, core Skill 원문, npm CLI fallback으로 문서화했다.
- Stage 4에서는 Stage 1-3 결과를 수용 기준별로 묶고 최종 보고서를 작성한다.

## Stage 4 cleanup, 최종 검증, 보고

Stage 4에서는 Stage 1-3 결과를 #52 수용 기준별로 정리하고 #41 최종 배포 채널 감사로 넘길 입력을 고정했다.

### Cleanup 최종 상태

| 항목 | 상태 | 근거 |
|---|---|---|
| `hyper-waterfall-local` marketplace registration | cleanup 완료 | Stage 2에서 `codex plugin marketplace remove hyper-waterfall-local`가 `Removed marketplace 'hyper-waterfall-local'.`를 출력했다. |
| Plugin install | 설치하지 않음 | Stage 2는 `/plugins` details 화면의 `Available` 상태와 bundled Skill prompt discovery까지만 확인했다. |
| Public 배포 | 실행하지 않음 | Stage 3에서 official publishing surface 부재와 별도 승인 부재로 NO-GO/보류 판단했다. |
| Public 배포 URL/상태 | 없음 | public 배포 명령을 실행하지 않았으므로 결과 URL도 없다. |

Codex CLI에는 marketplace list 명령이 없어 cleanup을 listing으로 재검증하지 못했다. remove 성공 출력과 설치 미수행을 최종 cleanup 근거로 둔다.

### #41 인계 반영

작업지시자 지시에 따라 GitHub Issue [#41](https://github.com/postmelee/hyper-waterfall/issues/41) 본문을 갱신했다.

반영 내용:

- #52 Codex plugin public 배포와 UI discovery smoke를 최종 판단 입력으로 추가
- #54 Claude plugin public marketplace 배포와 release asset 게시를 최종 판단 입력으로 추가
- #41의 범위를 새 public 배포 실행이 아니라 완료/보류/대체 경로 문서 정합성 확정으로 명확화
- #52/#54에서 보류된 plugin public 배포를 #41에서 새로 실행하지 않는 제외 범위 추가

### 수용 기준 대응 요약

| 수용 기준 | 결과 |
|---|---|
| Codex Plugin Directory UI discovery 또는 그 한계가 구체적으로 기록된다 | OK. CLI `/plugins`에서 local marketplace, `Hyper-Waterfall` plugin, details 화면을 확인했고 Codex app GUI는 별도 실행하지 않았다고 기록했다. |
| thin wrapper Skill invocation smoke 결과 또는 수동 확인 결과가 기록된다 | OK with limit. 실제 invocation은 수행하지 않았고 details 화면의 `hyper-waterfall:hyper-waterfall` bundled Skill prompt discovery를 수동 확인으로 기록했다. |
| public 배포 실행 여부가 작업지시자 승인 근거와 함께 기록된다 | OK. 별도 public 배포 명시 승인이 없고 official self-serve publishing surface가 없어 실행하지 않았다고 기록했다. |
| public 배포를 보류하면 보류 사유와 대체 설치/사용 경로가 문서화된다 | OK. official publishing surface 부재, legal/asset gap, 별도 승인 부재와 repo-local marketplace, canonical entrypoint, npm CLI fallback을 기록했다. |
| 필요한 local config/cache cleanup이 완료되거나 잔여 상태가 명확히 보고된다 | OK with limit. `codex plugin marketplace remove hyper-waterfall-local` 성공을 기록했고, CLI list 부재로 listing 검증은 못 했다고 남겼다. |

### Stage 4 결론

- #52의 실질 결론은 “Codex repo-local plugin discovery는 성공, public 배포는 보류”다.
- #41에는 #52와 #54를 최종 배포 판단 입력으로 반영했다.
- #41은 #52에서 보류한 Codex public 배포를 새로 실행하지 않고, M040 배포 채널 문서 정합성에서 완료/보류/대체 경로를 확정하는 역할로 정리됐다.
- 다음 절차는 최종 보고서 승인 후 PR 게시다.
