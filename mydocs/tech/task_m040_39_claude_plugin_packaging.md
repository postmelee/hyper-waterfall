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

## Stage 1에서 하지 않은 일

- Claude plugin bundle을 만들지 않았다.
- `hooks/hooks.json` 또는 hook script를 작성하지 않았다.
- core Skill, manual, README, `docs/agent-entrypoint.md` 본문을 수정하지 않았다.
- #37 worktree의 진행 중 변경을 읽거나 수정하지 않았다.
- #40의 local install/load smoke를 완료 처리하지 않았다.
