# Codex/Claude plugin 공식 사양과 기존 문서 inventory

이 문서는 Task #36 Stage 1에서 Codex/Claude plugin 공통 배포 원칙을 정리하기 전에 공식 사양과 현재 저장소 문서의 기준을 inventory로 고정한 기록이다. Stage 2에서는 이 문서를 입력으로 `docs/plugin-distribution-principles.md`를 작성한다.

## 검토 기준

| 항목 | 값 |
|---|---|
| GitHub Issue | [#36](https://github.com/postmelee/hyper-waterfall/issues/36) |
| 마일스톤 | M040 |
| 확인일 | 2026-05-16 |
| 확인 범위 | Codex plugin/hooks, Claude Code plugin/hooks, 현재 저장소의 plugin/canonical/fallback 문구 |
| 공식 출처 원칙 | OpenAI와 Anthropic/Claude 공식 문서만 기준으로 사용 |

## Stage 1 결론

Codex와 Claude Code 모두 plugin을 "공유 가능한 agent 확장 bundle"로 다룬다. 양쪽 모두 skill류 구성 요소와 hook류 구성 요소를 plugin에 넣을 수 있지만, manifest 파일명, component 경로, hook 활성화와 실행 semantics는 서로 다르다.

따라서 Hyper-Waterfall plugin 공통 원칙은 tool-specific bundle 구조보다 상위의 책임 경계를 먼저 고정해야 한다.

- plugin은 Hyper-Waterfall을 발견하고 실행하기 쉽게 하는 배포/통합 계층이다.
- plugin은 `templates/mydocs/skills`, `templates/mydocs/manual`, `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, npm CLI 출력 계약을 대체하지 않는다.
- hook은 승인 게이트를 자동 대체하지 않고, 객관 상태와 위험 명령을 조기 탐지하는 guardrail 후보로만 둔다.
- Codex/Claude 차이는 공통 policy와 도구별 adapter로 분리해 #37-#40에서 각각 검증한다.

## 공식 문서 확인

### OpenAI Codex plugin

확인 문서:

- [Build plugins - Codex](https://developers.openai.com/codex/plugins/build)

확인 내용:

| 항목 | 공식 문서 기준 | Task #36 해석 |
|---|---|---|
| manifest | `.codex-plugin/plugin.json`이 required entry point이고, published plugin은 metadata와 bundled component pointer를 가진다. | Codex bundle에는 Codex 전용 manifest가 필요하다. 공통 원칙 문서는 manifest path와 canonical source를 분리해야 한다. |
| bundled components | `skills`, `mcpServers`, `apps`, `hooks`가 plugin root 기준 component를 가리킨다. | Hyper-Waterfall core Skill을 포함할지, release snapshot으로 둘지, 설치 후 symlink/참조로 둘지 Stage 2에서 분류해야 한다. |
| path rules | manifest path는 plugin root 기준 `./`로 시작하고 plugin root 내부에 있어야 한다. | 외부 `templates/`를 runtime path로 직접 벗어나 참조하는 방식은 Codex plugin packaging 후보로 부적합할 수 있다. |
| hook packaging | plugin hooks는 default `./hooks/hooks.json` 또는 manifest `hooks` entry로 제공할 수 있다. | hook 후보를 plugin과 함께 배포할 수는 있지만, 활성화 조건과 신뢰 검토를 별도 확인해야 한다. |
| hook activation | plugin hooks는 현재 release에서 기본 off이며 `[features].plugin_hooks = true`가 필요하다. | hook을 필수 안전장치처럼 표현하면 안 된다. manual/AGENTS 규칙이 기본이고 hook은 opt-in 보조 장치다. |
| plugin hook environment | `PLUGIN_ROOT`, `PLUGIN_DATA`를 제공하고 compatibility용 `CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA`도 설정한다. | 공통 hook script를 만들 경우 path adapter를 분리할 수 있는 근거다. |

### OpenAI Codex hooks

확인 문서:

- [Hooks - Codex](https://developers.openai.com/codex/hooks)

확인 내용:

| 항목 | 공식 문서 기준 | Task #36 해석 |
|---|---|---|
| hook 위치 | Codex는 `hooks.json` 또는 `config.toml` inline hooks를 config layer 옆에서 찾고, plugin도 hook lifecycle config를 bundle할 수 있다. | repository-local hook과 plugin-bundled hook을 모두 후보로 보되, 공통 원칙에서는 둘을 같은 정책 계층으로 묶는다. |
| plugin hook path | plugin manifest의 `hooks` entry는 `./` path, path array, inline object, inline object array를 받을 수 있다. | hook policy를 JSON 파일로 둘지 inline으로 둘지는 #37 packaging 검증에서 결정한다. |
| input | command hook은 stdin JSON을 받고 공통 field로 `session_id`, `transcript_path`, `cwd`, `hook_event_name`, Codex extension인 `model` 등을 받는다. | 공통 policy script는 stdin JSON adapter가 필요하다. |
| PreToolUse input | `tool_name`, `tool_input`, `tool_use_id` 등을 받으며 `Bash`, `apply_patch`, MCP tool 등을 구분할 수 있다. | 위험 shell/git/npm/gh 명령과 파일 edit 시도를 탐지하는 guardrail 후보로 적합하다. |
| PreToolUse output | JSON `hookSpecificOutput.permissionDecision = "deny"` 또는 legacy block shape로 tool call을 차단할 수 있다. | 객관 위험 명령은 block 후보가 될 수 있다. 사람 승인 여부는 이 정보만으로 확정하지 않는다. |
| PostToolUse output | `decision: "block"`은 이미 실행된 명령을 되돌리지 않고 feedback/context로 모델 흐름을 바꾼다. | 수정 후 검사나 보고 누락 감지는 warn/report 성격으로 두는 편이 안전하다. |
| limitation | 일부 shell call과 non-shell/non-MCP tool interception이 아직 incomplete라고 설명한다. | Codex hook을 완전한 강제 장치로 취급하면 안 된다. |

### Claude Code plugin

확인 문서:

- [Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)
- [Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)

확인 내용:

| 항목 | 공식 문서 기준 | Task #36 해석 |
|---|---|---|
| plugin 목적 | plugin은 custom commands, agents, hooks, Skills, MCP servers를 공유 가능한 형태로 배포한다. | Hyper-Waterfall plugin도 공유/버전 관리 가능한 agent 진입 계층으로 제한한다. |
| standalone vs plugin | 단일 프로젝트 실험은 `.claude/` standalone, 공유/버전 배포는 plugin을 권장한다. | 현재 `templates/.claude/skills -> mydocs/skills` 구조는 standalone 적용 경로이고, plugin은 별도 배포 후보로 다룬다. |
| manifest | `.claude-plugin/plugin.json`은 plugin identity와 configuration을 정의한다. manifest가 있으면 `name`이 required field다. | Claude bundle에는 Claude 전용 manifest가 필요하다. Codex manifest와 공유하지 않는다. |
| component locations | `skills/`, `commands/`, `agents/`, `hooks/`, `.mcp.json`, `.lsp.json`, `monitors/`, `bin/`, `settings.json`이 plugin root level에 위치한다. | Hyper-Waterfall core Skill을 plugin `skills/`로 포장할 때 namespacing과 canonical source snapshot 정책을 별도로 정해야 한다. |
| skills behavior | plugin skills는 설치 시 발견되고 Claude가 task context에 따라 자동 호출할 수 있으며 supporting files를 포함할 수 있다. | core Skill 본문이 도구별 copy로 drift하지 않도록 packaging source를 release snapshot으로 고정해야 한다. |
| local test | `claude --plugin-dir ./my-plugin` 또는 zip plugin으로 local test가 가능하다. | #39/#40에서 local packaging smoke 후보로 사용한다. |
| install scope | user/project/local/managed scope가 있다. | team-wide 적용과 repository-local 적용의 책임 경계를 Stage 2 원칙에 반영해야 한다. |

### Claude Code hooks

확인 문서:

- [Hooks reference - Claude Code Docs](https://code.claude.com/docs/en/hooks)

확인 내용:

| 항목 | 공식 문서 기준 | Task #36 해석 |
|---|---|---|
| lifecycle | hook은 session, turn, tool call 등 Claude Code lifecycle 지점에서 실행되고 event JSON을 hook handler에 전달한다. | Hyper-Waterfall 승인 gate 주변의 객관 상태 확인 지점과 잘 맞는다. |
| events | `PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `Stop`, `SubagentStop`, `FileChanged`, `WorktreeCreate` 등 다양한 event가 있다. | Codex보다 event 폭이 넓으므로 공통 policy와 Claude adapter를 분리해야 한다. |
| plugin hooks | plugin hook은 `hooks/hooks.json`에 정의되며 enabled plugin에서 user/project hooks와 merge된다. | hook config를 plugin에 넣을 수 있지만 project/user hook과 충돌 가능성을 검토해야 한다. |
| env vars | plugin script는 `${CLAUDE_PLUGIN_ROOT}`를 사용해 plugin-bundled script를 참조할 수 있다. | Codex compatibility env와 함께 공통 script path adapter 후보가 된다. |
| output | exit code와 JSON output으로 allow/block/context를 제어한다. `PreToolUse`는 tool call 전 차단이 가능하고 `PostToolUse`는 이미 실행된 뒤 feedback을 제공한다. | 위험 명령은 `PreToolUse` block 후보, 실행 후 상태 확인은 `PostToolUse` warn/report 후보로 분리한다. |
| hook types | command, http, mcp_tool, prompt, agent hook이 있다. | Hyper-Waterfall 정책은 우선 deterministic command script 기준으로 설계하고, prompt/agent hook은 과신 위험 때문에 후순위로 둔다. |
| security | hook은 자동 실행되는 code이므로 보안 주의와 입력 검증이 강조된다. | hook 자체가 위험 표면이므로 최소 권한, read-only 우선, destructive action 금지가 필요하다. |

## 기존 저장소 문서 inventory

### canonical 배포 기준

| 파일 | 현재 기준 |
|---|---|
| `README.md` | AI는 `docs/agent-entrypoint.md`를 기준으로 적용 후보를 보고하고 승인 전 파일 변경을 하지 않는다. canonical 기준은 GitHub Release/tag, `templates/manifest.json`, migration guide다. |
| `docs/distribution-channels.md` | npm, Homebrew, Docker, Codex plugin, Claude plugin은 canonical protocol을 실행하거나 발견하기 쉽게 하는 수단이며, channel package/image 자체가 canonical source가 되면 안 된다. |
| `docs/releases/v0.2.0.md` | v0.2.0 release는 GitHub Release/tag, manifest, migration guide를 canonical 기준으로 설명하고 plugin packaging은 후속으로 둔다. |
| `docs/releases/v0.2.0-npm-publish.md` | npm package는 canonical protocol을 실행하기 쉽게 하는 편의 실행 채널이며 plugin packaging은 제외한다. |
| `docs/migrations/README.md` | plugin 배포는 migration guide만으로 수행하지 않고 별도 이슈와 승인 절차를 따른다. |

### agent entrypoint와 lifecycle 기준

| 파일 | 현재 기준 |
|---|---|
| `docs/agent-entrypoint.md` | 신규 적용과 기존 업데이트는 manifest, version 기록, migration guide 기준으로 판단하고, 실제 변경 전 승인 요청 형식을 유지한다. |
| `templates/mydocs/manual/task_workflow_guide.md` | framework lifecycle 판단은 core Skill 목록을 늘리지 않고 `docs/agent-entrypoint.md`, release manifest, version 기록, migration guide를 기준으로 판단한 뒤 일반 task 흐름으로 전환한다. |
| `templates/mydocs/manual/git_workflow_guide.md` | GitHub Release/tag를 canonical 배포 단위로 두고 update protocol PR도 일반 task PR 흐름으로 추적한다. |
| `templates/mydocs/manual/document_structure_guide.md` | lifecycle 판단 결과 형식과 README/agent-entrypoint/migration guide 책임 경계를 설명한다. |

### Skill과 manual 진실 원천

| 파일 | 현재 기준 |
|---|---|
| `README.md` | `AGENTS.md`를 단일 진실 원천으로 두고 `CLAUDE.md`는 참조한다. `.agents/skills`와 `.claude/skills`는 같은 `mydocs/skills` 본문을 가리킨다. |
| `templates/mydocs/manual/document_structure_guide.md` | Agent Skills 진실 원천은 `mydocs/skills/{skill-name}/SKILL.md`이고 Codex 인식 경로는 `.agents/skills`, Claude Code 인식 경로는 `.claude/skills` 심볼릭 링크다. |
| `templates/mydocs/skills/*/SKILL.md` | 각 Skill은 Codex 호출 방법과 Claude Code 호출 방법을 말미에만 분리한다. 절차 본문은 도구 비종속으로 유지한다. |

### plugin 관련 기존 판단

| 파일 | 현재 기준 |
|---|---|
| `docs/distribution-channels.md` | Codex plugin은 core Skill 흐름 발견, npm CLI 또는 agent entrypoint 호출을 돕는 계층이다. Codex plugin이 core Skill/manual의 별도 진실 원천이 되면 안 된다. |
| `docs/distribution-channels.md` | Claude plugin은 `CLAUDE.md`, `.claude/skills`, core Skill을 발견하고 실행하게 돕는다. Claude plugin이 `AGENTS.md`, `CLAUDE.md`, `mydocs/skills`의 진실 원천을 복제하면 안 된다. |
| `docs/distribution-channels.md` | Codex/Claude 공통 plugin 설계 원칙을 먼저 정한 뒤 도구별 구현을 분리해야 한다. |
| `README.md` | Homebrew, Docker, Codex plugin, Claude plugin은 canonical 기준을 대체하지 않는 protocol 실행 수단이다. |

### fallback 관련 기존 판단

| 파일 | 현재 기준 |
|---|---|
| `README.md` | 중앙 템플릿을 먼저 참조하고, 읽을 수 없을 때만 Skill 본문의 최소 섹션 요약을 fallback으로 사용한다. |
| `templates/mydocs/manual/document_structure_guide.md` | 문서 출력 형식은 `mydocs/_templates/`에서 관리하고 Skill 본문 fallback은 템플릿을 읽을 수 없는 상황으로 제한한다. |
| `templates/mydocs/skills/*/SKILL.md` | task-start, stage-report, final-report 등은 중앙 템플릿을 기준으로 하고 fallback은 최소 섹션 목록으로 제한한다. |

## 확정 가능한 공통 원칙 후보

Stage 2에서 다음 원칙은 확정 후보로 가져간다.

1. plugin은 canonical source가 아니라 tool-specific 발견/실행 계층이다.
2. Skill과 manual의 진실 원천은 계속 `templates/mydocs/skills`, `templates/mydocs/manual`이다.
3. plugin bundle에 Skill이 포함되더라도 release snapshot 또는 packaging artifact이지 편집 원천이 아니다.
4. plugin bundle은 `templates/manifest.json`과 migration guide를 재정의하지 않는다.
5. hook은 opt-in guardrail이다. AGENTS/CLAUDE/manual 규칙과 작업지시자 승인을 대체하지 않는다.
6. 공통 hook policy는 branch/issue/file/report/command 같은 객관 상태를 검사한다.
7. Codex/Claude hook payload, env var, activation, event 폭은 adapter로 분리한다.

## 불확실성과 후속 재확인 항목

| 항목 | 불확실성 | 후속 task |
|---|---|---|
| Codex plugin 배포 경로 | OpenAI Codex plugin published workflow와 install surface 세부는 실제 packaging 검증에서 다시 확인해야 한다. | #37, #38 |
| Codex plugin hooks | 공식 문서상 plugin hooks는 기본 off이며 feature flag가 필요하다. 실제 사용자 설치 smoke에서 활성화 UX를 확인해야 한다. | #37, #38 |
| Codex hook interception | 공식 문서가 일부 shell/non-shell interception incomplete를 언급한다. 위험 작업 차단 범위를 과장하면 안 된다. | #37, Stage 3 |
| Claude plugin marketplace | marketplace 배포 구조와 versioning은 #39/#40에서 실제 bundle 후보 기준으로 확인해야 한다. | #39, #40 |
| Claude hook 종류 | command/http/mcp_tool/prompt/agent hook이 있지만 Hyper-Waterfall guardrail은 deterministic command hook 우선으로 제한할지 Stage 3에서 판단한다. | Stage 3, #39 |
| bundled Skill snapshot | plugin에 core Skill을 포함할 경우 release snapshot인지 runtime 참조인지 선택해야 한다. | Stage 2 |
| npm CLI 호출 | plugin이 npm CLI를 직접 호출할지, docs/agent-entrypoint 안내만 제공할지 결정이 필요하다. | Stage 2 |
| README/agent-entrypoint cross-reference | Stage 4에서 중복 없이 짧은 링크로 충분한지 판단한다. | Stage 4 |

## Stage 2 입력

Stage 2는 이 inventory를 근거로 `docs/plugin-distribution-principles.md`에 다음 구조를 만든다.

- 목적과 비목표
- canonical source와 plugin 책임 경계
- Codex/Claude 공통 bundle 원칙
- 포함/참조/fallback 분류 기준
- Skill/manual/agent-entrypoint/npm CLI 책임 표
- 도구별 packaging task 재확인 checklist 초안

Stage 2에서는 아직 hook guardrail 상세 정책을 완성하지 않는다. hook 관련 내용은 canonical/package 원칙에 필요한 최소 경계만 두고, 상세 guardrail와 adapter 분리 기준은 Stage 3에서 작성한다.

## Stage 2 반영 결과

Stage 2에서는 `docs/plugin-distribution-principles.md`를 새로 작성해 다음 항목을 고정했다.

- plugin은 canonical source가 아니라 tool-specific 발견/실행 계층이다.
- GitHub Release/tag, `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, npm CLI, `templates/mydocs/skills`, `templates/mydocs/manual`의 책임 경계를 표로 분리했다.
- plugin bundle의 파일 취급을 포함, 참조, fallback으로 분류했다.
- 포함된 Skill 또는 문서 조각은 release snapshot 또는 packaging artifact일 뿐 별도 진실 원천이 아니라고 명시했다.
- Codex와 Claude의 manifest, Skill 배치, hook 배치, path 규칙, local smoke 차이를 도구별 packaging 검증 항목으로 분리했다.

Stage 2에서는 hook guardrail 상세 정책을 확정하지 않았다. hook 관련 세부는 Stage 3에서 block/warn/report-only 분류, payload adapter 기준, 승인 자동화 금지 문구로 이어간다.

## Stage 3 반영 결과

Stage 3에서는 `docs/plugin-distribution-principles.md`에 hook guardrail 원칙을 추가했다.

- hook은 작업지시자 승인 여부를 자동 판정하지 않으며 `allow` 장치로 쓰지 않는다고 명시했다.
- branch, issue number, 계획서/보고서 파일 존재, command string, changed file path 같은 객관 상태만 검사 대상으로 뒀다.
- 이슈 없는 구현, 승인 전 파일 수정, 구현계획서 없는 stage 시작, 단계 보고 누락, 위험 shell 명령, publish/merge/close 시도, manifest/migration 복제, core Skill fork를 guardrail 후보로 정리했다.
- block, warn, report-only 등급을 구분하고, destructive action과 외부 공개 action 중심으로 block을 제한했다.
- Codex/Claude raw hook payload를 직접 공통 policy에서 처리하지 않고 adapter가 공통 event로 정규화하는 구조를 정리했다.
- hook이 없거나 실패해도 AGENTS/CLAUDE/manual/Skill 절차가 기본 안전장치라는 fallback 원칙을 추가했다.

Stage 3에서는 hook 구현 코드, hook JSON 파일, plugin bundle 파일을 만들지 않았다. Stage 4에서는 이 원칙 문서를 관련 배포 문서와 연결하고 #37-#40 checklist를 확정한다.
