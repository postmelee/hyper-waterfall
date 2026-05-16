# Claude plugin packaging 검증

이 문서는 Task #39에서 Claude plugin packaging을 검증한 기술 기록이다. Stage 1에서는 Claude Code plugin/hooks 공식 사양과 현재 저장소의 Claude 진입 구조를 inventory로 고정한다. Stage 2 이후에는 packaging 후보 구조, hook guardrail, fallback과 #40 입력 조건을 이 문서에 이어서 기록한다.

## 검토 기준

| 항목 | 값 |
|---|---|
| GitHub Issue | [#39](https://github.com/postmelee/hyper-waterfall/issues/39) |
| 마일스톤 | M040 |
| 확인일 | 2026-05-16 |
| 확인 범위 | Claude Code plugin packaging, Claude hooks, 현재 저장소의 `CLAUDE.md`/`.claude/skills`/canonical Skill 연결 |
| 공식 출처 원칙 | Claude Code 공식 문서만 기준으로 사용 |
| 로컬 Claude Code | `2.1.111 (Claude Code)` |

## Stage 1 결론

Claude Code는 project-local standalone 설정과 공유 가능한 plugin packaging을 구분한다. 현재 저장소의 `.claude/skills` 구조는 standalone/project-local 진입 경로로는 canonical Skill symlink를 유지하지만, plugin packaging에서는 설치 후 plugin cache와 path traversal 제한 때문에 저장소 바깥 symlink를 그대로 기대하면 안 된다.

따라서 #39의 후속 Stage는 다음 전제를 둔다.

- Claude plugin은 Hyper-Waterfall의 새 canonical source가 아니라 versioned sharing/discovery layer다.
- plugin 안의 `CLAUDE.md`는 project context로 자동 로드되지 않으므로, plugin이 문맥을 제공하려면 Skill, agent, hook 같은 component로 제공해야 한다.
- plugin에 core Skill을 제공할 경우 `templates/mydocs/skills`를 편집 원천으로 두고, plugin에는 release snapshot 또는 thin wrapper를 두는 방향을 우선 검토한다.
- plugin hook은 `hooks/hooks.json`으로 제공할 수 있지만, hook은 작업지시자 승인을 자동 대체하지 않는다.
- `PermissionRequest`는 공식 hook event로 확인됐지만 자동 allow 기능은 Hyper-Waterfall 승인 게이트와 충돌할 수 있으므로 Stage 3에서 매우 보수적으로 분류한다.
- `InstructionsLoaded`와 `FileChanged`는 공식 event로 확인됐지만 decision control이 없으므로 block 장치가 아니라 관찰, 감사, 환경 갱신 후보로 본다.
- #37은 병렬 진행 중이므로 Stage 1은 #36 공통 원칙과 현재 main 기준 파일만 입력으로 사용했다.

## 공식 문서 확인

### Claude Code plugins

확인 문서:

- [Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)
- [Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)

확인 내용:

| 항목 | 공식 문서 기준 | Task #39 해석 |
|---|---|---|
| standalone vs plugin | Standalone `.claude/`는 project-specific 또는 개인 workflow에 적합하고, plugin은 team/community sharing, versioned release, marketplace 배포에 적합하다. | 현재 저장소의 `.claude/skills`는 standalone 적용 경로다. Claude plugin은 별도 sharing artifact로 분리한다. |
| namespace | plugin skill은 plugin name을 포함한 namespaced 호출을 사용한다. | Hyper-Waterfall core Skill 이름과 plugin wrapper 이름이 충돌하지 않도록 namespace를 전제로 검토한다. |
| manifest | `.claude-plugin/plugin.json`은 plugin identity, description, version 같은 metadata를 정의한다. | #40 후보 bundle에는 Claude 전용 manifest가 필요하다. Codex manifest와 공유하지 않는다. |
| component root | `skills/`, `commands/`, `agents/`, `hooks/`, MCP/LSP/monitor 설정은 plugin root level에 둔다. `.claude-plugin/` 안에는 manifest만 둔다. | core Skill snapshot 또는 wrapper도 plugin root의 `skills/` 아래에 둬야 한다. |
| Skill component | plugin은 `skills/<name>/SKILL.md` 구조의 Agent Skills를 포함할 수 있다. | `templates/mydocs/skills`를 그대로 편집 원천으로 삼지 않고 release snapshot 또는 wrapper 기준을 Stage 2에서 선택해야 한다. |
| plugin root `CLAUDE.md` | plugin root의 `CLAUDE.md`는 project context로 로드되지 않는다. | Hyper-Waterfall plugin 안내를 `CLAUDE.md`에만 넣는 방식은 부적합하다. Skill 또는 hook component로 전달해야 한다. |
| local test | `claude --plugin-dir ./my-plugin`으로 local plugin을 세션 단위로 로드할 수 있고, zip plugin은 v2.1.128 이상이 필요하다. | 현재 로컬 Claude Code는 `2.1.111`이므로 Stage 2/4에서 directory 기반 smoke 후보는 가능하지만 zip smoke는 현재 버전에서 보류해야 한다. |
| install scope | plugin install은 user, project, local scope를 가진다. project scope는 `.claude/settings.json`에 반영된다. | Hyper-Waterfall plugin을 team-wide로 배포할지 project-local로 둘지 #40 전에 정해야 한다. |
| plugin cache와 path | marketplace plugin은 cache로 복사되고, 설치된 plugin은 plugin root 밖 파일을 참조할 수 없다. root 밖 symlink는 설치 방식에 따라 skipped 또는 dereference될 수 있다. | plugin이 `../templates/mydocs/skills` 같은 외부 symlink를 runtime dependency로 삼으면 안 된다. |
| CLI 검증 | `claude plugin validate`, `/plugin validate`, `claude --debug`, `claude plugin details` 등이 plugin 진단에 사용된다. | #40 smoke 후보에는 manifest/schema와 component inventory 확인을 포함한다. |

### Claude Code hooks

확인 문서:

- [Hooks reference - Claude Code Docs](https://code.claude.com/docs/en/hooks)
- [Automate workflows with hooks - Claude Code Docs](https://code.claude.com/docs/en/hooks-guide)

확인 내용:

| 항목 | 공식 문서 기준 | Task #39 해석 |
|---|---|---|
| hook 목적 | hook은 Claude Code lifecycle 지점에서 shell command, HTTP, MCP tool, prompt, agent handler를 실행한다. | Hyper-Waterfall에서는 deterministic command hook을 우선 후보로 보고 prompt/agent hook은 과신 위험 때문에 후순위로 둔다. |
| plugin hook 위치 | plugin hook은 `hooks/hooks.json`에 둘 수 있고, plugin enabled 시 user/project hook과 merge된다. | hook은 plugin에 포함 가능하지만 default safety guarantee로 표현하면 안 된다. |
| path placeholders | hook command는 `${CLAUDE_PLUGIN_ROOT}`, `${CLAUDE_PLUGIN_DATA}`, `${CLAUDE_PROJECT_DIR}`를 사용할 수 있다. | bundled script는 `${CLAUDE_PLUGIN_ROOT}`와 exec form을 기본 후보로 둔다. 상태 파일은 `${CLAUDE_PLUGIN_DATA}`에 둬야 한다. |
| matcher와 if | hook event, matcher group, hook handler 구조를 쓰며, `if` field로 permission rule 하나를 둘 수 있다. Bash rule은 subcommand 단위로 매칭된다. | 위험 command 탐지 후보는 `Bash(git push *)`, `Bash(npm publish *)` 같은 permission rule 검토가 가능하다. 복합 조건은 별도 handler로 분리해야 한다. |
| PreToolUse | tool input 생성 후 tool 실행 전에 발생하며 `Bash`, `Edit`, `Write`, `Read`, MCP tool 등을 매칭할 수 있다. | 위험 명령, 승인 전 파일 수정 경고, 이슈 없는 구현 탐지에 가장 직접적인 후보다. |
| PreToolUse decision | `hookSpecificOutput.permissionDecision`으로 allow, deny, ask, defer 등이 가능하고, decision precedence는 deny가 가장 높다. | Hyper-Waterfall에서는 deny/ask 중심을 검토하고, allow는 작업지시자 승인 대체 위험 때문에 기본 후보에서 제외한다. |
| PermissionRequest | 사용자가 permission prompt를 받을 상황에서 발생하며 allow/deny 또는 permission update가 가능하다. | destructive command나 publish/merge/close 시도를 사용자 승인 흐름으로 유지하게 하는 guardrail 후보지만, 자동 allow는 금지 후보로 본다. |
| InstructionsLoaded | `CLAUDE.md` 또는 `.claude/rules/*.md` 로드 시 발생하고 matcher는 `load_reason` 기준이다. decision control이 없다. | AGENTS/CLAUDE 로드 관찰이나 audit 후보이며, 절차 강제 block에는 사용할 수 없다. |
| FileChanged | watched file 변경 시 발생하고 literal filename watch list를 사용한다. decision control이 없다. | `.claude/settings.json`, `.envrc` 같은 파일 변화 관찰 후보일 뿐, 변경 차단 장치로 쓰면 안 된다. |
| UserPromptSubmit, Stop, PostToolUse | prompt 처리 전, turn 종료 전후, tool 실행 후 feedback/context를 줄 수 있고 일부는 top-level `decision`을 지원한다. | 단계 보고 누락, 검증 미수행 경고, final response 전 확인 후보지만 이미 수행된 변경을 되돌리는 장치가 아니다. |
| hook 비활성화 | `disableAllHooks`가 존재하고 managed policy hierarchy 영향을 받는다. | hook이 꺼진 상태를 항상 fallback 경로로 고려해야 한다. |
| async hook | async command hook은 block/decision control을 할 수 없다. | background 검증은 report-only 후보로만 둔다. |

## 현재 저장소 Claude 진입 구조 inventory

### 파일과 symlink

| 항목 | 확인 결과 | 해석 |
|---|---|---|
| `CLAUDE.md` | `AGENTS.md`를 단일 진실 원천으로 두고 `@AGENTS.md`를 include한다. | Claude Code도 동일 운영 규칙을 읽는 lightweight entrypoint다. |
| `.claude/skills` | `../mydocs/skills`로 가는 symlink | root 적용 저장소의 Claude standalone Skill discovery 경로다. |
| `mydocs/skills` | `../templates/mydocs/skills`로 가는 symlink | 본 저장소에서는 `templates/mydocs/skills`가 core Skill 진실 원천이다. |
| `templates/.claude/skills` | `../mydocs/skills`로 가는 symlink | 적용 대상 저장소에 복사될 template의 Claude standalone Skill discovery 경로다. |
| `templates/mydocs/skills` | `task-start`, `task-stage-report`, `task-final-report`, `task-register`, `pr-merge-cleanup`, `external-pr-review`, `todo` | Hyper-Waterfall 정형 절차의 canonical Skill 본문이다. |
| `templates/mydocs/manual` | `mydocs/manual` symlink 대상 | manual 본문 역시 template 쪽이 진실 원천이다. |

확인 명령:

```bash
find .claude templates/.claude -maxdepth 2 -print
readlink .claude/skills
readlink templates/.claude/skills
claude --version
```

확인 출력 요약:

- `.claude/skills`와 `templates/.claude/skills`가 모두 존재한다.
- `.claude/skills -> ../mydocs/skills`
- `templates/.claude/skills -> ../mydocs/skills`
- `claude --version`은 `2.1.111 (Claude Code)`를 출력했다.

### canonical 관계

현재 구조는 standalone Claude Code 경로에서 drift를 줄이는 데 적합하다.

- root `.claude/skills`는 `mydocs/skills`를 바라본다.
- root `mydocs/skills`는 `templates/mydocs/skills`를 바라본다.
- template `.claude/skills`는 적용 대상 저장소의 `mydocs/skills`를 바라보도록 상대 symlink를 제공한다.
- `CLAUDE.md`는 별도 규칙 본문을 만들지 않고 `AGENTS.md`를 참조한다.

다만 plugin packaging에서는 이 symlink 구조를 그대로 옮기면 위험하다.

- 설치된 plugin은 cache에서 실행되며 plugin root 밖 path traversal이 제한된다.
- plugin root 밖 symlink는 설치 경로에 따라 보존되지 않을 수 있다.
- plugin root의 `CLAUDE.md`는 project context로 자동 로드되지 않는다.

따라서 Stage 2에서는 다음 선택지를 비교한다.

| 선택지 | 장점 | 위험 |
|---|---|---|
| release snapshot | 설치 후 cache 안에서 self-contained하게 동작한다. | snapshot 갱신 절차를 빼먹으면 canonical Skill과 drift가 생긴다. |
| thin wrapper Skill | plugin 본문을 작게 유지하고 canonical source를 명확히 가리킨다. | offline 또는 release source 접근 실패 시 fallback이 약하다. |
| runtime reference | 최신 canonical 파일을 직접 참조할 수 있다. | plugin cache/path 제한, 네트워크/파일 접근 실패, 임의 branch HEAD 참조 위험이 크다. |

## #36 공통 원칙과 Stage 1 연결

Stage 1 확인 결과는 #36의 `docs/plugin-distribution-principles.md`와 정합적이다.

- plugin은 canonical source가 아니라 discovery/execution layer다.
- Skill과 manual의 진실 원천은 `templates/mydocs/skills`, `templates/mydocs/manual`이다.
- plugin hook은 opt-in guardrail이며 작업지시자 승인 자동화 장치가 아니다.
- common policy와 Claude adapter를 분리해야 한다.

Stage 1에서 새롭게 강조할 점은 다음과 같다.

- plugin root `CLAUDE.md`가 project context로 로드되지 않으므로 Claude plugin은 Skill 또는 hook component 중심으로 설계해야 한다.
- 현재 local Claude Code `2.1.111`은 zip plugin local test 기준인 v2.1.128보다 낮으므로 #40에서 zip smoke를 요구하면 도구 업그레이드가 필요하다.
- `PermissionRequest`가 공식 event로 확인됐으므로 Stage 3에서는 자동 allow 금지와 사용자 승인 흐름 유지 기준을 명확히 해야 한다.
- `InstructionsLoaded`와 `FileChanged`도 공식 event로 확인됐지만 decision control이 없어 block 후보가 아니라 observability/report 후보로 분리해야 한다.

## Stage 2 입력

Stage 2는 이 inventory를 근거로 다음 항목을 검토한다.

- `.claude-plugin/plugin.json` 최소 metadata와 version 기준
- `skills/`에 둘 항목을 release snapshot으로 둘지 thin wrapper로 둘지
- `hooks/hooks.json`은 packaging 후보에 포함만 할지, #40 또는 후속 hook task로 넘길지
- plugin root 밖 symlink와 runtime reference를 피하는 기준
- `claude --plugin-dir ./my-plugin` directory smoke 후보와 현재 local version 한계
- #40 배포 후보 생성 전에 필요한 manifest validation, `/plugin validate`, `claude --debug`, `claude plugin details` 후보

## Stage 2 반영 결과

Stage 2에서는 Claude plugin 후보 구조와 canonical drift 방지 기준을 정리했다. 이번 단계에서는 실제 plugin bundle, scratch skeleton, `hooks/hooks.json`, hook script를 만들지 않았다. #40에서 배포 후보 생성과 설치 smoke를 수행하기 전에 어떤 구조가 원칙에 맞는지 확인하는 데 집중했다.

### 공식 사양에서 고정한 packaging 제약

| 항목 | Stage 2 기준 | 영향 |
|---|---|---|
| manifest 위치 | `.claude-plugin/plugin.json` | Codex의 `.codex-plugin/plugin.json`과 공유하지 않고 Claude 전용 manifest를 둔다. |
| component 위치 | `skills/`, `commands/`, `agents/`, `hooks/`, `scripts/` 등은 plugin root level | `.claude-plugin/` 안에 Skill이나 hook을 넣지 않는다. |
| Skill 구조 | `skills/<name>/SKILL.md` | Claude plugin Skill은 namespaced 호출을 전제로 하며, frontmatter `name`과 directory name을 충돌 없이 맞춘다. |
| hook 위치 | `hooks/hooks.json` | hook은 packaging 가능하지만 Stage 3에서 guardrail 등급과 자동 승인 금지를 확정하기 전에는 기본 후보에 포함하지 않는다. |
| plugin root `CLAUDE.md` | project context로 자동 로드되지 않음 | plugin 안내를 `CLAUDE.md`에 넣는 방식은 후보에서 제외하고 Skill로 제공한다. |
| path traversal | 설치된 plugin은 plugin root 밖 파일을 참조할 수 없음 | `../templates/mydocs/skills` symlink 또는 runtime external path reference는 후보에서 제외한다. |
| local test | `claude --plugin-dir ./my-plugin`은 가능, zip local test는 v2.1.128 이상 필요 | 현재 `2.1.111`에서는 directory smoke를 우선하고 zip smoke는 #40에서 업그레이드 또는 보류 판단한다. |
| local CLI surface | `claude plugin validate <path>`가 현재 로컬 help에 존재 | #40 smoke 후보에 manifest/schema validation을 포함할 수 있다. |

### 후보 구조

#40의 최소 Claude plugin 후보는 다음 구조를 우선 검토한다.

```text
hyper-waterfall-claude-plugin/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── hyper-waterfall/
│       └── SKILL.md
├── README.md
└── CHANGELOG.md
```

최소 후보의 역할:

- `plugin.json`: plugin 이름, 설명, version, author, repository 또는 homepage metadata를 둔다.
- `skills/hyper-waterfall/SKILL.md`: Hyper-Waterfall 진입 wrapper다. `AGENTS.md`, `CLAUDE.md`, `.claude/skills`, `docs/agent-entrypoint.md`, npm CLI dry-run 경로로 사용자를 안내한다.
- `README.md`: 설치, local smoke, canonical source 경계, hook 미포함 상태를 설명한다.
- `CHANGELOG.md`: plugin candidate version과 기준 Hyper-Waterfall release/tag를 적는다.

Stage 2 기준으로 `hooks/hooks.json`은 최소 후보에 포함하지 않는다. Claude hook guardrail은 Stage 3에서 event별 decision control과 자동 승인 금지 기준을 분류한 뒤, #40에서 포함 여부를 다시 판단한다.

### Skill 제공 방식 비교

| 방식 | 후보 등급 | 장점 | 위험 | Stage 2 판단 |
|---|---|---|---|---|
| thin wrapper Skill | 기본 후보 | plugin 본문이 작고 canonical source 경계가 명확하다. | 사용자가 core Skill 본문을 보려면 대상 저장소 또는 release 문서로 이동해야 한다. | #40 최소 후보로 적합하다. |
| release snapshot | 확장 후보 | plugin cache 안에서 self-contained하게 core workflow를 보여줄 수 있다. | snapshot 갱신 절차를 놓치면 `templates/mydocs/skills`와 drift가 생긴다. | snapshot 생성/검증 절차가 있을 때만 #40 확장 후보로 둔다. |
| runtime reference | 보류 | 최신 canonical path를 직접 가리키는 것처럼 보인다. | plugin cache/path traversal 제한, 네트워크 실패, 임의 branch HEAD drift 위험이 크다. | 기본 후보에서 제외한다. |
| root 밖 symlink | 금지 후보 | 현재 standalone 구조와 유사하다. | 설치된 plugin에서 root 밖 symlink가 skipped 또는 dereference될 수 있고 host file 접근 위험이 있다. | plugin packaging 후보로 사용하지 않는다. |

### thin wrapper Skill 기준

thin wrapper Skill은 절차 본문을 재작성하지 않는다. wrapper가 해야 할 일은 다음으로 제한한다.

- 현재 저장소 또는 대상 저장소의 `AGENTS.md`와 `CLAUDE.md`를 먼저 읽게 한다.
- 신규 적용 또는 업데이트 판단은 `docs/agent-entrypoint.md`, `templates/manifest.json`, migration guide, npm CLI dry-run 기준으로 진행하게 한다.
- 이미 Hyper-Waterfall이 적용된 저장소에서는 `.claude/skills`의 canonical Skill을 우선 사용하게 한다.
- plugin이 설치되지 않은 환경에서도 같은 절차를 수행할 수 있음을 명시한다.
- 파일 적용, 이슈 close, publish, merge 같은 민감 작업은 기존 하이퍼-워터폴 승인 게이트를 따르게 한다.

thin wrapper Skill이 하지 말아야 할 일:

- `task-start`, `task-stage-report`, `task-final-report` 본문을 요약해서 새 절차처럼 제공하지 않는다.
- `templates/manifest.json`이나 migration guide 내용을 plugin 안에 재정의하지 않는다.
- npm CLI 출력만으로 파일을 자동 적용하지 않는다.
- hook을 활성화하거나 승인된 것으로 간주하지 않는다.

### release snapshot 확장 후보 기준

core Skill 전체를 plugin에 포함해야 하는 요구가 #40에서 유지되면 다음 조건을 충족해야 한다.

- snapshot 대상은 `templates/mydocs/skills/*/SKILL.md` 7개로 제한한다.
- 각 snapshot에는 원본 경로와 기준 release/tag를 기록한다.
- snapshot 생성은 수동 복사가 아니라 후속 packaging 절차에서 source path 목록을 기준으로 검증 가능해야 한다.
- snapshot에 Claude 전용 절차를 덧붙이지 않는다. 기존 Skill의 `호출 방법` 섹션은 release source와 동일하게 유지한다.
- snapshot drift 검증 후보를 #40 smoke에 포함한다. 예: source 파일 목록, frontmatter `name`, line count 또는 checksum 비교.

Stage 2에서는 release snapshot 파일을 만들지 않았다.

### canonical source별 취급

| canonical source | Claude plugin 취급 | 금지 기준 |
|---|---|---|
| `templates/mydocs/skills` | wrapper가 원본 위치와 release/tag 기준을 안내한다. snapshot은 확장 후보로만 둔다. | plugin 전용 Skill fork를 편집 원천으로 만들지 않는다. |
| `templates/mydocs/manual` | 원문 링크 또는 대상 저장소의 `mydocs/manual` 확인을 안내한다. | manual 본문을 plugin README나 Skill에 재작성하지 않는다. |
| `templates/manifest.json` | 신규 적용/업데이트 판단 기준으로 참조한다. | manifest를 plugin bundle 안에 독자 사본으로 넣지 않는다. |
| `docs/migrations/` | 기존 적용 저장소 업데이트 판단 기준으로 안내한다. | migration guide를 plugin 전용으로 요약해 판단 기준으로 쓰지 않는다. |
| `docs/agent-entrypoint.md` | wrapper Skill의 핵심 진입 기준으로 안내한다. | entrypoint 판단 결과 형식을 plugin 전용으로 바꾸지 않는다. |
| npm CLI | `init/update/doctor --dry-run` 안내 또는 호출 후보로 둔다. | CLI 결과만으로 파일 적용을 자동 진행하지 않는다. |
| `CLAUDE.md`/`.claude/skills` | 적용 저장소의 fallback/standalone 경로로 안내한다. | plugin root `CLAUDE.md` 로드를 기대하지 않는다. |

### #40으로 넘길 결정 항목

#40에서 실제 배포 후보를 만들기 전에 다음을 결정해야 한다.

| 항목 | Stage 2 권장 | #40 확인 |
|---|---|---|
| plugin name | `hyper-waterfall` 후보 | namespaced Skill 호출이 `/hyper-waterfall:hyper-waterfall`처럼 중복되는지 확인 |
| version | 기준 Hyper-Waterfall release와 맞춘 explicit version | `plugin.json` version과 release/tag 기록 방식 확정 |
| Skill 구성 | 최소 후보는 thin wrapper 1개 | core Skill snapshot이 필요한지 별도 승인 |
| hook 포함 | Stage 2에서는 미포함 | Stage 3 결과를 보고 report-only 또는 미포함 판단 |
| local smoke | directory 기반 `claude --plugin-dir ./...` | 현재 `2.1.111`에서 가능한 범위 확인 |
| zip smoke | 보류 | v2.1.128 이상으로 업그레이드할지 판단 |
| validation | `claude plugin validate <path>` | `plugin.json`, Skill frontmatter, `hooks/hooks.json` 후보 schema 확인 |
| docs link | README와 Skill에서 canonical source를 링크 | 링크가 release/tag 또는 대상 저장소 path 기준인지 확인 |

### Stage 2에서 하지 않은 일

- Claude plugin bundle 또는 scratch skeleton을 만들지 않았다.
- `hooks/hooks.json` 또는 hook script를 작성하지 않았다.
- `templates/mydocs/skills` snapshot을 만들지 않았다.
- `docs/`, README, `docs/agent-entrypoint.md`, core Skill, manual 본문을 수정하지 않았다.
- #37 병렬 worktree의 산출물에 의존하지 않았다.

## Stage 3 재확인 항목

Stage 3은 다음 hook/lifecycle 후보를 공식 event와 decision control 기준으로 다시 분류한다.

| 후보 | Stage 1 확인 | Stage 3 판단 포인트 |
|---|---|---|
| `PreToolUse` | 공식 event, tool 실행 전 decision control 가능 | 위험 명령과 파일 수정 precondition 검사 후보 |
| `PermissionRequest` | 공식 event, permission request decision 가능 | 자동 allow 금지, deny/ask 또는 permission update 제한 기준 |
| `PostToolUse` | 공식 event, 실행 후 feedback/control 가능 | 이미 실행된 변경을 되돌리지 않는 report/warn 기준 |
| `UserPromptSubmit` | 공식 event, prompt 처리 전 control/context 가능 | task-start 누락 경고 후보지만 사용자 prompt 자체 차단은 보수 적용 |
| `Stop` | 공식 event, 종료 전 decision 가능 | 단계 보고 누락, 검증 미수행 경고 후보 |
| `InstructionsLoaded` | 공식 event, decision control 없음 | AGENTS/CLAUDE 로드 audit 후보 |
| `FileChanged` | 공식 event, decision control 없음 | 설정 파일 변화 관찰 후보 |

## Stage 3 반영 결과

Stage 3에서는 Claude hook event와 decision control을 Hyper-Waterfall guardrail 관점으로 분류했다. 이번 단계에서도 `hooks/hooks.json`, hook script, plugin bundle은 만들지 않았다. 결과는 #40에서 hook을 plugin candidate에 포함할지 판단하는 입력이다.

### 공식 event와 decision control 요약

| event | 공식 지원 | decision control | Stage 3 판단 |
|---|---|---|---|
| `PreToolUse` | 지원 | `hookSpecificOutput.permissionDecision`의 `allow`, `deny`, `ask`, `defer` | 위험 명령과 객관 precondition 검사에 가장 적합하다. Hyper-Waterfall에서는 `deny`와 `ask` 중심으로만 검토한다. |
| `PermissionRequest` | 지원 | `hookSpecificOutput.decision.behavior`의 `allow`, `deny` | permission prompt 직전에 개입할 수 있지만 자동 `allow`와 `updatedPermissions`는 승인 게이트를 흐리므로 금지 후보로 둔다. |
| `PostToolUse` | 지원 | top-level `decision: "block"`, `additionalContext`, `updatedToolOutput` | 이미 실행된 뒤이므로 enforcement가 아니라 feedback/warn/report 용도다. 파일 변경이나 외부 동작은 되돌리지 않는다. |
| `UserPromptSubmit` | 지원 | top-level `decision: "block"` 또는 context 추가 | 사용자 prompt 자체를 막는 것은 과하다. task-start 누락 가능성 안내 같은 report-only 또는 warn에 제한한다. |
| `Stop` | 지원 | top-level `decision: "block"` | 단계 보고서, 검증, 최종 보고 누락 같은 객관 gate를 마지막에 점검하는 후보지만 loop 방지가 필요하다. |
| `InstructionsLoaded` | 지원 | 없음 | `CLAUDE.md` 또는 `.claude/rules/*.md` 로드 관찰과 audit 전용이다. block에 사용할 수 없다. |
| `FileChanged` | 지원 | 없음 | literal filename watch와 env reload 또는 audit 전용이다. 파일 변경 차단에는 사용할 수 없다. |

### hook handler와 matcher 기준

Claude hook handler는 command, HTTP, MCP tool, prompt, agent 형태를 가질 수 있다. Hyper-Waterfall guardrail 후보는 deterministic command hook을 기본으로 둔다.

- command hook은 stdin JSON을 읽고 JSON 출력 또는 exit code로 결과를 반환한다.
- plugin-bundled script는 `${CLAUDE_PLUGIN_ROOT}`와 exec form `args`를 사용한다.
- 상태나 dependency cache가 필요하면 `${CLAUDE_PLUGIN_DATA}`를 사용한다.
- project 상태 검사는 `${CLAUDE_PROJECT_DIR}`와 hook input의 `cwd`를 기준으로 한다.
- `if` field는 tool event에서만 동작하므로 `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `PermissionDenied`에 한정해 사용한다.
- Bash command는 subcommand 단위로 permission rule matching이 가능하므로 `Bash(git push *)`, `Bash(npm publish *)`, `Bash(gh pr merge *)` 같은 후보를 둘 수 있다.
- 복합 조건은 `if` 한 줄에 넣지 않고 hook script 내부 검사 또는 별도 handler로 분리한다.
- prompt hook과 agent hook은 판단이 LLM에 의존하므로 승인 여부 판단에는 쓰지 않는다. 필요하면 #40 이후 별도 실험으로 분리한다.

### guardrail 후보 분류

| 후보 | event | matcher/if 후보 | 등급 | 이유 |
|---|---|---|---|---|
| destructive shell command | `PreToolUse` | `matcher: "Bash"`, `if: "Bash(rm -rf *)|Bash(git reset --hard *)|Bash(git clean *)"` 또는 script 검사 | block | 객관적으로 위험하고 실행 전 차단 가능하다. |
| publish 시도 | `PreToolUse`, `PermissionRequest` | `Bash(npm publish *)`, `Bash(gh release create *)` | block 또는 ask | 외부 공개 action은 별도 승인 게이트 대상이다. 자동 allow 금지. |
| merge/close 시도 | `PreToolUse`, `PermissionRequest` | `Bash(gh pr merge *)`, `Bash(gh issue close *)` | block 또는 ask | PR merge 확인 또는 작업지시자 승인 전 실행을 막아야 한다. |
| force push 또는 원격 파괴적 git | `PreToolUse` | `Bash(git push --force*)`, script 검사 | block | 원격 상태 변경 위험이 객관적이다. |
| 이슈 없는 구현 | `PreToolUse` | `matcher: "Edit|Write|Bash"`, branch/plan file 검사 | warn | branch, 계획서 존재는 볼 수 있지만 대화 승인 여부는 알 수 없다. |
| 승인 전 파일 수정 | `PreToolUse` | `matcher: "Edit|Write"` | warn | 승인 맥락은 hook이 확정할 수 없으므로 block보다 확인 경고가 맞다. |
| 구현계획서 없는 stage 산출 | `PreToolUse` | file path가 `mydocs/working/task_*_stage*.md` 또는 source 변경일 때 plan 검사 | block 후보 | 객관 파일 precondition이므로 차단 가능하지만 false positive를 줄이는 path 범위가 필요하다. |
| 단계 보고 누락 | `Stop`, `PostToolUse`, `PostToolBatch` 후보 | matcher 없음 또는 `Edit|Write` 후 상태 검사 | warn 또는 block 후보 | Stop에서 객관 누락을 확인할 수 있지만 loop 방지와 예외 처리가 필요하다. |
| 검증 미수행 | `Stop` | matcher 없음, transcript 또는 marker 검사 | warn | 검증 실행 여부를 완전히 신뢰하기 어렵다. Stage report에 명령 기록을 요구하는 편이 안전하다. |
| AGENTS/CLAUDE 로드 관찰 | `InstructionsLoaded` | `session_start`, `include`, `compact` | report-only | decision control이 없다. audit와 debug 용도다. |
| `.claude/settings` 또는 Skill 변경 관찰 | `FileChanged`, 보조로 `ConfigChange` 후보 | literal filename watch | report-only | FileChanged는 block 불가다. 설정 적용 차단은 별도 `ConfigChange` 검토가 필요하다. |
| canonical source 복제 위험 | `PreToolUse`, `PostToolUse` | plugin candidate path 안의 manifest/migration/manual copy 검사 | warn | 사람이 snapshot/wrapper 여부를 판단해야 한다. |

### 자동 승인 금지 기준

Claude hook은 permission을 자동으로 `allow`하거나 permission rule을 업데이트할 수 있지만, Hyper-Waterfall plugin에서는 이를 기본 후보에서 제외한다.

금지 또는 보류:

- `PreToolUse`에서 `permissionDecision: "allow"`로 tool call을 승인된 것으로 처리
- `PermissionRequest`에서 `behavior: "allow"`로 permission prompt를 대신 승인
- `updatedPermissions`로 `localSettings`, `projectSettings`, `userSettings`에 allow rule을 추가
- `setMode`로 `dontAsk` 또는 `bypassPermissions`에 가까운 흐름을 만드는 것
- `AskUserQuestion` 또는 `ExitPlanMode`를 `updatedInput`으로 자동 답변해 작업지시자 승인을 대체하는 것

허용 후보:

- 위험 명령에 대한 `deny`
- 민감 command에 대해 사용자에게 직접 확인시키는 `ask`
- 이미 실행된 뒤의 `additionalContext` 또는 report-only warning
- `InstructionsLoaded`, `FileChanged` 기반 audit log

### #40 hook 포함 판단

Stage 3 기준으로 #40의 최소 Claude plugin 후보에는 blocking hook을 기본 포함하지 않는 편이 안전하다. hook을 포함한다면 다음 순서가 적절하다.

1. `hooks/hooks.json` 없이 thin wrapper Skill만 포함한다.
2. 옵션으로 report-only hook 후보를 문서화한다.
3. 실제 hook config를 포함하려면 `PreToolUse` command hook 1개로 위험 shell command deny만 제한한다.
4. `PermissionRequest` 자동 allow와 persistent permission update는 포함하지 않는다.
5. Stop hook은 loop 방지 기준을 검증한 뒤 후속 task로 분리한다.

따라서 Stage 4에서는 hook 미포함 fallback과 #40의 hook 보류 조건을 정리한다. #36 공통 원칙 문서는 이미 "hook은 승인 자동화가 아니라 guardrail"이라고 충분히 말하고 있으므로 Stage 3에서 별도 수정하지 않았다.

### Stage 3에서 하지 않은 일

- `hooks/hooks.json`을 만들지 않았다.
- hook script를 만들지 않았다.
- `docs/plugin-distribution-principles.md`를 수정하지 않았다.
- Claude plugin bundle에 hook을 포함하지 않았다.
- 작업지시자 승인 여부를 자동 판정하는 정책을 만들지 않았다.

## Stage 4 반영 결과

Stage 4에서는 fallback 흐름, #40 인계 조건, #36 공통 원칙 및 #37 중간 산출물과의 정합성을 검토했다. 이번 단계에서도 실제 Claude plugin bundle, hook config, public 배포, local install/load smoke는 수행하지 않았다.

### fallback 흐름

| 상황 | fallback | 금지 |
|---|---|---|
| Claude plugin 미설치 | 대상 저장소의 `CLAUDE.md`를 읽고 `@AGENTS.md`를 통해 공통 규칙을 적용한다. `.claude/skills`가 있으면 canonical Skill을 직접 사용한다. | plugin 미설치를 이유로 절차를 간소화하지 않는다. |
| `.claude/skills` 없음 | `docs/agent-entrypoint.md`, `templates/manifest.json`, migration guide, npm CLI dry-run을 기준으로 적용 또는 업데이트 판단을 먼저 보고한다. | Skill 본문을 임의 요약해 새 절차로 쓰지 않는다. |
| hook 비활성 또는 미포함 | hook 없는 기본 상태를 정상 경로로 본다. AGENTS/CLAUDE/manual/Skill 절차가 기본 안전장치다. | hook 실패나 미설치를 승인으로 간주하지 않는다. |
| Claude Code version 부족 | 현재 `2.1.111` 기준 directory `--plugin-dir` smoke를 우선하고, zip smoke는 v2.1.128 이상 필요 조건으로 보류한다. | zip smoke 실패를 packaging 원칙 실패로 과대 해석하지 않는다. |
| canonical 문서 접근 실패 | 파일을 만들지 말고 repository root, 목표 release/tag, 설치 상태, npm CLI dry-run 실행 가능 여부를 작업지시자에게 확인한다. | fallback 본문으로 `task-start`, `task-stage-report`, `task-final-report` 절차를 재정의하지 않는다. |
| npm CLI 미설치 또는 실패 | 실패 사유를 보고하고 수동 진입 경로(`CLAUDE.md`, `.claude/skills`, `docs/agent-entrypoint.md`)로 전환한다. | CLI 실패 상태에서 파일 적용을 진행하지 않는다. |

### #40 최소 배포 후보

#40에서 실제 후보 bundle을 만든다면 Stage 2-3 결과 기준 최소 구조는 다음이다.

```text
plugins/hyper-waterfall-claude/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── hyper-waterfall/
│       └── SKILL.md
├── README.md
└── CHANGELOG.md
```

최소 후보 조건:

- `plugin.json`은 Claude 전용 manifest다. Codex manifest와 공유하지 않는다.
- `skills/hyper-waterfall/SKILL.md`는 thin wrapper다. core Skill 본문을 복제하거나 요약해 새 절차로 만들지 않는다.
- wrapper는 `CLAUDE.md`, `.claude/skills`, `docs/agent-entrypoint.md`, npm CLI dry-run으로 진입하도록 안내한다.
- `templates/manifest.json`, `docs/migrations/`, `templates/mydocs/manual`, `templates/mydocs/skills` 전문을 bundle에 넣지 않는다.
- `hooks/hooks.json`은 최소 후보에 넣지 않는다.
- README와 CHANGELOG에는 기준 Hyper-Waterfall release/tag와 plugin artifact version이 혼동되지 않도록 적는다.

### #40 smoke 후보

| 항목 | 후보 명령 또는 확인 | 현재 판단 |
|---|---|---|
| manifest/schema validation | `claude plugin validate plugins/hyper-waterfall-claude` | 로컬 `claude plugin --help`에서 `validate <path>` 확인됨 |
| directory load | `claude --plugin-dir ./plugins/hyper-waterfall-claude` | 현재 `2.1.111`에서 가능한 smoke 후보 |
| zip load | `claude --plugin-dir ./hyper-waterfall-claude.zip` | v2.1.128 이상 필요. 현재 환경에서는 보류 또는 업그레이드 필요 |
| skill invocation | `/hyper-waterfall:hyper-waterfall` 또는 #40에서 확정한 namespaced Skill 호출 | plugin name과 skill name 중복성을 #40에서 실제 UX로 확인 |
| component inventory | `claude plugin details <name>` 또는 `/plugin` UI | 설치 또는 세션 load 후 확인 후보 |
| fallback 확인 | plugin disabled/unavailable 상태에서 `CLAUDE.md`, `.claude/skills`, npm CLI dry-run 경로 확인 | #40 smoke checklist에 포함 |
| no-drift 확인 | bundle 안에 manifest/migration/manual/core Skill fork가 없는지 `find`/`rg`로 확인 | #40 static validation에 포함 |

### #40 보류 조건

- local directory load가 실패하고 원인이 Claude Code version 또는 plugin spec 불확실성인지 확인되지 않은 경우
- thin wrapper Skill invocation이 namespaced command로 노출되지 않는 경우
- wrapper가 canonical source를 안내하지 못하거나 절차 본문을 재정의해야만 동작하는 경우
- release snapshot을 요구하지만 snapshot 생성/검증 기준이 승인되지 않은 경우
- hook 포함을 요구하지만 `PreToolUse` 위험 명령 deny보다 넓은 권한 제어가 필요한 경우
- `PermissionRequest` 자동 allow, persistent permission update, `setMode`가 필요하다는 결론이 나는 경우

### #36 공통 원칙 정합성

Stage 1-4 결과는 `docs/plugin-distribution-principles.md`와 충돌하지 않는다.

- plugin은 canonical source가 아니라 discovery/execution layer다.
- `templates/mydocs/skills`와 `templates/mydocs/manual`은 진실 원천으로 유지한다.
- plugin bundle은 `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, npm CLI 출력 계약을 재정의하지 않는다.
- hook은 작업지시자 승인 자동화가 아니라 opt-in guardrail이다.
- hook 실패 또는 미설치는 승인으로 간주하지 않는다.

따라서 Stage 4에서는 `docs/plugin-distribution-principles.md`, `docs/distribution-channels.md`, `docs/agent-entrypoint.md`, README를 수정하지 않았다. 기존 문서가 이미 필요한 cross-reference와 공통 원칙을 포함한다.

### #37 중간 산출물과의 비교

#37은 별도 worktree `/private/tmp/hyper-waterfall-task37`의 `local/task37`에서 Stage 2까지 산출물이 확인됐다. 최종 보고서는 아직 확인되지 않았으므로 #39 결론은 #37 완료 결과에 의존하지 않는다.

비교 가능한 중간 결론:

| 항목 | #37 Codex Stage 2 | #39 Claude Stage 4 |
|---|---|---|
| 기본 Skill 노출 | thin wrapper Skill 1차 후보 | thin wrapper Skill 최소 후보 |
| release snapshot | 필요 시 2차 후보, metadata 필수 | 확장 후보, 생성/검증 승인 필요 |
| canonical source | manifest, migration, manual, core Skill 전문 copy 금지 | 동일 |
| hook | base manifest에서 제외, Stage 3 이후 판단 | 최소 후보에서 제외, 위험 command deny만 후속 후보 |
| fallback | AGENTS/manual/CLI 경로 안내 | `CLAUDE.md`, `.claude/skills`, agent-entrypoint, npm CLI dry-run 경로 안내 |
| smoke 인계 | #38에서 marketplace, restart, install/load 확인 | #40에서 `plugin validate`, directory `--plugin-dir`, namespaced Skill invocation 확인 |

공통 정합성:

- Codex와 Claude 모두 thin wrapper를 1차 후보로 두고 release snapshot은 drift 검증 조건이 있을 때만 확장한다.
- 두 도구 모두 plugin root 밖 runtime path 또는 symlink 참조를 배제한다.
- 두 도구 모두 hook을 기본 배포 후보에 포함하지 않고, 포함하더라도 승인 자동화가 아니라 제한적 guardrail로 본다.

### 최종 판단

Task #39 기준으로 Claude plugin packaging은 #40 배포 후보 생성과 설치 smoke로 진행할 수 있다. 단, #40의 기본 후보는 hook 없는 thin wrapper Skill이어야 하고, zip plugin smoke는 현재 local Claude Code version 때문에 보류 또는 업그레이드 후 진행해야 한다.

core Skill release snapshot과 blocking hook 포함은 기본 후보가 아니다. 둘 중 하나가 필요하면 #40에서 별도 승인 항목으로 분리한다.

## Stage 1에서 하지 않은 일

- Claude plugin bundle을 만들지 않았다.
- `hooks/hooks.json` 또는 hook script를 작성하지 않았다.
- core Skill, manual, README, `docs/agent-entrypoint.md` 본문을 수정하지 않았다.
- #37 worktree의 진행 중 변경을 읽거나 수정하지 않았다.
- #40의 local install/load smoke를 완료 처리하지 않았다.
