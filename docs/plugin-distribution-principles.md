# Codex/Claude plugin 공통 배포 원칙

이 문서는 Codex plugin과 Claude plugin을 실제로 packaging하기 전에 두 채널이 공유해야 할 canonical 참조 원칙과 bundle 책임 경계를 정의한다. 실제 Codex plugin bundle 생성, Claude plugin bundle 생성, hook 구현, public 배포는 이 문서의 범위가 아니다.

## 목적

Codex plugin과 Claude plugin의 목적은 Hyper-Waterfall을 agent UI 안에서 더 쉽게 발견하고 실행하게 만드는 것이다. plugin은 사용자가 `task-start`, `task-stage-report`, `task-final-report` 같은 정형 흐름을 찾고, `docs/agent-entrypoint.md`와 npm CLI 판단 흐름으로 진입하도록 돕는다.

plugin은 새로운 방법론 본문이나 release 기준을 만들지 않는다. plugin package는 특정 도구에 맞춘 배포 artifact일 뿐이며, Hyper-Waterfall의 canonical source는 계속 release와 저장소의 기존 문서 구조가 담당한다.

## 비목표

- plugin이 `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, npm CLI 출력 계약을 재정의하지 않는다.
- plugin이 `templates/mydocs/skills` 또는 `templates/mydocs/manual`의 별도 진실 원천이 되지 않는다.
- Codex 전용 절차나 Claude 전용 절차를 만들어 multi-agent 호환성을 깨뜨리지 않는다.
- plugin 설치만으로 작업지시자 승인 게이트, 이슈 기반 추적, 단계 보고, PR 흐름을 우회하지 않는다.
- hook을 작업지시자 승인 자동화 장치로 사용하지 않는다.

## canonical source

| 구성 | 책임 | plugin에서의 취급 |
|---|---|---|
| GitHub Release/tag | Hyper-Waterfall version을 고정하는 canonical 배포 단위 | plugin version과 산출물의 기준 version을 대조한다. |
| `templates/manifest.json` | 적용 대상 파일, target 경로, update policy, checksum 상태를 정의하는 manifest | plugin bundle 안에서 복제하거나 수정하지 않는다. 필요 시 읽기 기준으로 참조한다. |
| `docs/migrations/` | 기존 적용 저장소가 version을 올릴 때 읽는 migration 기준 | plugin이 migration guide를 재작성하지 않는다. 업데이트 판단은 migration guide 링크와 `docs/agent-entrypoint.md` 형식을 따른다. |
| `docs/agent-entrypoint.md` | 신규 적용과 기존 업데이트 판단 결과 형식 | plugin의 agent-friendly 진입 문구가 따라야 할 출력 계약이다. |
| npm CLI | `init`, `update`, `doctor` 판단을 실행하는 편의 실행 채널 | plugin이 CLI를 호출할 수는 있지만, CLI 출력만으로 파일을 자동 적용하지 않는다. |
| `templates/mydocs/skills` | Codex와 Claude Code가 함께 읽는 core Skill 진실 원천 | plugin에 포함되더라도 release snapshot 또는 packaging artifact로만 둔다. |
| `templates/mydocs/manual` | 하이퍼-워터폴 운영 규칙과 절차 설명의 진실 원천 | plugin에 별도 manual 본문을 만들지 않는다. 필요한 설명은 원문 링크 또는 release snapshot 참조로 둔다. |

## 책임 경계

| 영역 | 담당 | 책임 경계 |
|---|---|---|
| 작업 승인 | 작업지시자와 하이퍼-워터폴 절차 | plugin과 hook은 승인 여부를 자동 판정하지 않는다. |
| 신규 적용 판단 | `docs/agent-entrypoint.md`, `templates/manifest.json`, npm CLI dry-run | plugin은 판단 결과 형식을 안내하거나 CLI 실행을 돕는다. |
| 기존 업데이트 판단 | `.hyper-waterfall/version.json`, 목표 release manifest, migration guide | plugin은 update 후보를 직접 적용하지 않고 판단 결과와 승인 요청을 노출한다. |
| 정형 task 절차 | `templates/mydocs/skills`의 core Skill | plugin은 Skill을 발견하고 호출하기 쉽게 한다. Skill 본문을 갈라서 관리하지 않는다. |
| 운영 규칙 설명 | `AGENTS.md`, `CLAUDE.md`, `templates/mydocs/manual` | plugin은 요약 안내와 링크를 제공할 수 있지만, 규칙의 새 원천이 아니다. |
| CLI 실행 | npm CLI | plugin이 npm CLI를 호출할 경우 CLI version과 release 기준을 대조하고 read-only/dry-run 기본값을 유지한다. |
| guardrail | hook 후보와 공통 정책 script | hook은 객관 상태와 위험 동작을 보조 확인한다. 승인 자동화와 파일 자동 적용은 하지 않는다. |

## bundle 분류 기준

plugin bundle에 어떤 파일을 넣을지는 "포함", "참조", "fallback"을 구분해 결정한다. 이 구분은 Codex와 Claude가 서로 다른 manifest 형식을 쓰더라도 공통으로 적용한다.

| 분류 | 의미 | 허용 대상 | 금지 |
|---|---|---|---|
| 포함 | plugin package 안에 파일을 둔다. | 도구별 `plugin.json`, plugin README, starter prompt, thin wrapper Skill, release snapshot으로 고정한 core Skill copy, hook adapter 후보 | 편집 원천으로 쓰는 manual/Skill fork, 독자 manifest, 독자 migration guide |
| 참조 | plugin이 저장소나 release의 canonical 파일을 가리킨다. | GitHub Release/tag, `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, npm CLI package | runtime에 임의 branch HEAD를 canonical 기준처럼 참조 |
| fallback | canonical 파일을 읽을 수 없거나 plugin 환경 제약이 있을 때만 제한적으로 사용한다. | 최소 안내 문구, "저장소의 AGENTS/CLAUDE/manual을 읽으라"는 복구 지시, CLI 설치/실행 실패 시 수동 진입 안내 | fallback 본문으로 절차를 재정의하거나 최신 원칙처럼 취급 |

포함 파일은 release artifact다. 포함된 Skill이나 문서 조각이 있더라도 편집은 `templates/mydocs/skills`, `templates/mydocs/manual`, `docs/agent-entrypoint.md`에서 먼저 이뤄져야 하고, plugin은 후속 packaging task에서 그 결과를 다시 가져간다.

## 공통 bundle 원칙

1. plugin manifest는 도구별로 분리한다. Codex는 `.codex-plugin/plugin.json`, Claude는 `.claude-plugin/plugin.json`을 사용한다.
2. 공통 원칙 문서와 canonical source는 하나로 유지한다. Codex/Claude manifest가 같은 내용을 각자 재작성하지 않는다.
3. core Skill을 plugin에 넣는 경우 release tag 기준 snapshot으로 표시한다. snapshot에는 원본 경로와 release/tag를 기록한다.
4. thin wrapper Skill을 만드는 경우 wrapper는 원본 Skill을 요약하지 않고 canonical Skill 또는 agent entrypoint를 읽도록 안내한다.
5. `templates/manifest.json`과 migration guide는 plugin에 별도 복제하지 않는다. 필요한 경우 release URL 또는 repository path를 참조한다.
6. plugin이 npm CLI를 실행하면 기본은 read-only 또는 dry-run 판단 출력이어야 한다. 파일 적용은 작업지시자 승인 후 일반 task 흐름으로 전환한다.
7. plugin 설치가 없는 환경에서도 `AGENTS.md`, `CLAUDE.md`, `.agents/skills`, `.claude/skills`, npm CLI, manual 기준으로 같은 절차를 수행할 수 있어야 한다.
8. plugin hook은 opt-in guardrail로만 설명한다. Codex의 plugin-bundled hook은 `[features].plugin_hooks = true`가 필요하며, hook이 꺼져 있거나 설치되지 않아도 하이퍼-워터폴 규칙의 기본 효력은 AGENTS/CLAUDE/manual에 남아야 한다.

## 도구별 packaging 차이

| 항목 | Codex plugin | Claude plugin | 공통 처리 |
|---|---|---|---|
| manifest | `.codex-plugin/plugin.json` required entry point | `.claude-plugin/plugin.json`은 manifest가 있으면 `name` required | manifest schema는 공유하지 않고 책임 경계만 공유한다. |
| Skill 배치 | manifest의 `skills` field가 plugin root 상대 경로를 가리킨다. | plugin root의 `skills/` 또는 manifest의 `skills` field를 사용한다. | Skill 본문 source는 `templates/mydocs/skills` 기준으로 추적한다. |
| hook 배치 | plugin-bundled hook은 default `hooks/hooks.json` 또는 manifest `hooks` entry 후보이며 `[features].plugin_hooks = true`가 필요하다. 일반 Codex hooks feature key는 `hooks`이고 `codex_hooks`는 deprecated alias다. | plugin hook은 `hooks/hooks.json` 또는 inline config 후보이며 enabled plugin에서 merge된다. | hook 상세 정책은 공통 policy와 adapter로 분리한다. |
| path 규칙 | manifest path는 `./`로 시작하고 plugin root 내부에 있어야 한다. | plugin component는 plugin root level에 두는 구조를 따른다. | 외부 canonical 파일을 runtime path로 직접 벗어나 참조하지 않는다. |
| local smoke | Codex plugin packaging 검증에서 install/load surface를 확인한다. | `claude --plugin-dir ./my-plugin` 또는 zip plugin smoke 후보를 확인한다. | smoke는 실제 배포와 분리하고 결과를 task 보고서로 남긴다. |
| 실행 책임 | Codex UI에서 Skill, app, MCP, hook integration이 가능하다. | Claude Code에서 skill, agent, hook, MCP, monitor 등이 가능하다. | Hyper-Waterfall plugin은 기능 폭을 좁혀 discovery와 protocol 실행 보조에 집중한다. |

## 참조와 fallback 예시

| 상황 | 권장 처리 | 이유 |
|---|---|---|
| 사용자가 신규 적용을 요청 | plugin이 `docs/agent-entrypoint.md`의 신규 적용 판단 결과 형식을 안내하고, 필요 시 npm CLI `init --dry-run`을 제안한다. | 승인 전 파일 변경 금지와 manifest 기준을 유지한다. |
| 사용자가 기존 적용 저장소 update를 요청 | `.hyper-waterfall/version.json`, 목표 release manifest, migration guide 확인을 안내한다. | update protocol을 plugin 전용으로 재정의하지 않는다. |
| core Skill을 plugin UI에서 노출 | wrapper 또는 snapshot에 원본 경로와 release 기준을 명시한다. | Skill 별도 진실 원천 생성을 피한다. |
| canonical 문서를 읽을 수 없음 | "저장소의 AGENTS/CLAUDE/manual과 release manifest를 먼저 확인하라"는 최소 fallback만 제공한다. | fallback이 절차 본문을 대체하지 않게 한다. |
| npm CLI 실행 실패 | 실패 사유와 수동 진입 경로를 보여주고 파일 적용을 중단한다. | CLI 실패 상태에서 무승인 적용을 막는다. |

## hook guardrail 원칙

hook은 하이퍼-워터폴 승인 게이트를 대체하지 않는다. hook은 agent가 도구를 호출하기 전후에 객관 상태를 확인해 위험한 행동을 막거나, 경고하거나, 보고하는 보조 guardrail이다.

기본 원칙:

1. hook은 작업지시자 승인 여부를 자동 판정하지 않는다.
2. hook은 "승인된 것으로 간주"하는 `allow` 장치가 아니다.
3. hook은 branch, issue number, 계획서/보고서 파일 존재, command string, changed file path 같은 객관 상태만 검사한다.
4. hook이 설치되지 않았거나 실패해도 `AGENTS.md`, `CLAUDE.md`, manual, Skill 절차가 기본 안전장치다.
5. hook 정책은 기본 read-only 확인을 우선하고, destructive action이나 외부 공개 action에만 제한적으로 block을 사용한다.
6. hook이 오탐 가능성이 있으면 block보다 warn 또는 report-only를 우선한다.

## guardrail 후보

| 후보 | 확인할 객관 상태 | 권장 등급 | 비고 |
|---|---|---|---|
| 이슈 없는 구현 | 현재 branch가 `local/task{N}` 형식인지, 관련 계획서가 존재하는지 | warn 또는 block | 새 파일 수정 전 task-start 누락을 조기 탐지한다. 단순 조회 명령은 막지 않는다. |
| 승인 전 파일 수정 | 수행계획서와 구현계획서 존재 여부, 현재 stage 보고서 상태, 수정 대상 path | warn | 실제 승인 대화는 hook이 알 수 없으므로 "확인 필요" 경고로 둔다. |
| 구현계획서 없는 stage 시작 | `mydocs/plans/task_m{milestone}_{N}_impl.md` 존재 여부 | block 후보 | stage 산출 파일 작성 전 objective precondition으로 확인 가능하다. |
| 단계 보고 누락 | stage 산출물 변경 후 `mydocs/working/task_m{milestone}_{N}_stage{S}.md` 존재 여부 | warn 또는 report-only | PostToolUse나 Stop 시점의 검토 후보. 이미 실행된 변경은 되돌리지 않는다. |
| 위험 명령 차단 | `rm -rf`, `git reset --hard`, `git clean`, force push, destructive checkout 등 command pattern | block | 작업지시자 명시 요청 없이는 destructive action을 차단하는 것이 우선이다. |
| publish 시도 | `npm publish`, `gh release create`, package registry upload 등 command pattern | block 또는 ask | 외부 공개 action은 별도 승인 게이트 대상이다. |
| merge/close 시도 | `gh pr merge`, `gh issue close`, PR merge/issue close 관련 API call | block 또는 ask | PR merge 확인 또는 작업지시자 승인 전 실행을 막는다. |
| manifest/migration 복제 | plugin bundle 안에 `templates/manifest.json` 또는 migration guide 사본 추가 시도 | warn | canonical drift 위험을 알린다. Stage 2 원칙에 따라 참조 우선이다. |
| core Skill fork | plugin 전용 Skill 본문이 canonical Skill을 재작성하는 변경 | warn | release snapshot 또는 thin wrapper인지 사람이 검토해야 한다. |

등급 의미:

| 등급 | 의미 | 사용 기준 |
|---|---|---|
| block | 도구 호출 또는 진행을 중단하고 이유를 반환한다. | destructive action, 외부 공개 action, 객관 precondition 부재가 명확한 경우 |
| warn | 진행은 허용하되 agent와 사용자에게 확인 메시지를 남긴다. | 승인 맥락처럼 hook이 확정할 수 없는 경우 |
| report-only | 기록만 남기고 agent 흐름을 바꾸지 않는다. | stage 종료 전 점검, packaging smoke 관찰, 향후 정책 튜닝 |

## adapter 분리 기준

공통 hook policy는 Codex와 Claude의 raw payload를 직접 처리하지 않는다. 도구별 adapter가 raw hook input을 공통 event로 정규화하고, 공통 policy가 판정한 결과를 다시 도구별 output 형식으로 변환한다.

공통 event 후보:

| field | 의미 |
|---|---|
| `tool` | `Bash`, `apply_patch`, `Edit`, `Write`, MCP tool 등 정규화한 도구 이름 |
| `phase` | `pre-tool`, `post-tool`, `stop`, `prompt` 같은 lifecycle phase |
| `cwd` | 작업 디렉터리 |
| `command` | shell command 또는 patch/edit 설명 |
| `paths` | 수정 또는 참조 대상 파일 path 목록 |
| `branch` | 현재 git branch |
| `issue` | branch 또는 파일명에서 추정한 task issue 번호 |
| `stage` | 현재 stage 번호 후보 |
| `pluginRoot` | plugin root path |
| `pluginData` | plugin writable data path |

도구별 adapter 책임:

| 책임 | Codex adapter | Claude adapter |
|---|---|---|
| 입력 정규화 | `tool_name`, `tool_input`, `cwd`, `hook_event_name`, Codex extension field를 공통 event로 변환 | Claude hook event JSON, matcher, tool input, project/plugin env를 공통 event로 변환 |
| plugin path | `PLUGIN_ROOT`, `PLUGIN_DATA`, compatibility env를 확인 | `CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA`, `CLAUDE_PROJECT_DIR`를 확인 |
| block 출력 | Codex가 지원하는 `permissionDecision: "deny"` 또는 block shape로 변환 | Claude가 지원하는 exit code 2 또는 JSON decision으로 변환 |
| warn 출력 | `systemMessage` 또는 additional context 후보로 변환 | `systemMessage`, additional context, stderr warning 후보로 변환 |
| report-only | plugin data 또는 debug log에 기록 | plugin data, debug log, transcript-visible warning 후보로 기록 |

공통 policy 책임:

- branch와 issue number 규칙 확인
- 계획서, 구현계획서, stage 보고서 존재 확인
- 위험 command pattern 판정
- plugin bundle 안의 canonical source 복제 위험 판정
- block/warn/report-only 등급 결정

공통 policy가 하지 않는 일:

- 작업지시자 승인 여부 판정
- 사람의 대화 맥락을 근거로 자동 allow
- 파일 자동 수정, 자동 revert, 자동 PR 생성
- Codex/Claude 전용 JSON schema를 직접 생성

## fallback 동작

hook이 없거나 꺼져 있거나 실패한 경우에도 기본 절차는 변하지 않는다.

- agent는 `AGENTS.md`와 `CLAUDE.md`를 우선 읽는다.
- 정형 단계는 `templates/mydocs/skills`의 Skill 절차를 따른다.
- 신규 적용과 기존 업데이트는 `docs/agent-entrypoint.md`, manifest, migration guide, npm CLI dry-run을 기준으로 판단한다.
- hook 실패는 승인으로 간주하지 않는다.
- hook 실패가 작업을 막을 정도로 반복되면 plugin 작업이 아니라 별도 hook 안정화 task로 분리한다.

## packaging check matrix

도구별 packaging 검증 task는 이 check matrix를 기준으로 원칙 준수 여부를 확인한다.

| 항목 | #37 Codex plugin packaging 검증 | #38 Codex plugin 배포 후보와 설치 smoke | #39 Claude plugin packaging 검증 | #40 Claude plugin 배포 후보와 설치 smoke |
|---|---|---|---|---|
| manifest | `.codex-plugin/plugin.json` schema, metadata, component path 확인 | 배포 후보 manifest가 설치 surface에서 읽히는지 확인 | `.claude-plugin/plugin.json` schema, namespace, metadata 확인 | marketplace 또는 local bundle 설치 시 manifest가 읽히는지 확인 |
| Skill source | `skills` path가 `templates/mydocs/skills` release snapshot 또는 thin wrapper 기준인지 확인 | Skill discovery와 호출 문구가 canonical Skill을 재정의하지 않는지 확인 | `skills/` namespace와 snapshot/wrapper 기준 확인 | namespaced Skill 호출과 원본 경로 표시 확인 |
| canonical references | `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, npm CLI를 복제하지 않고 참조하는지 확인 | 설치 smoke에서 canonical 기준 안내가 유지되는지 확인 | 같은 기준을 Claude bundle에서 확인 | 설치 smoke에서 canonical 기준 안내가 유지되는지 확인 |
| npm CLI | CLI를 호출한다면 read-only/dry-run 기본값과 version 대조 방식 확인 | CLI dry-run 또는 entrypoint 안내가 파일 적용으로 이어지지 않는지 확인 | CLI 호출 또는 안내 방식 확인 | CLI dry-run 또는 entrypoint 안내가 파일 적용으로 이어지지 않는지 확인 |
| hook/guardrail | Codex plugin-bundled hook의 `plugin_hooks` feature flag, hooks path, adapter 후보만 확인. hook 구현은 별도 승인 대상 | plugin hook 비활성 기본값, 활성화 UX, block/warn/report-only 안내 확인 | `hooks/hooks.json` 후보와 adapter 후보만 확인. hook 구현은 별도 승인 대상 | hook merge 동작과 opt-in 보조 guardrail 안내 확인 |
| fallback | canonical 파일을 읽지 못할 때 최소 복구 안내만 있는지 확인 | 실패 시 AGENTS/CLAUDE/manual/CLI 수동 경로를 안내하는지 확인 | 같은 fallback 원칙 확인 | 실패 시 AGENTS/CLAUDE/manual/CLI 수동 경로를 안내하는지 확인 |
| cleanup | packaging 산출물이 별도 진실 원천을 만들지 않는지 확인 | install/uninstall 또는 enable/disable 후 부산물 정리 확인 | packaging 산출물이 별도 진실 원천을 만들지 않는지 확인 | install/uninstall 또는 enable/disable 후 부산물 정리 확인 |

## Stage 4 반영 결과

Stage 4에서는 이 문서를 `docs/distribution-channels.md`의 Codex/Claude plugin 판단과 연결했다. README와 `docs/agent-entrypoint.md`는 이미 추가 배포 채널과 lifecycle 판단 기준을 `docs/distribution-channels.md`와 `docs/agent-entrypoint.md`로 분리하고 있으므로, 이번 stage에서는 중복 cross-reference를 추가하지 않았다.

core Skill 또는 manual 본문 변경은 필요하지 않았다. 이 문서는 후속 #37-#40 packaging 검증의 입력이며, 실제 plugin bundle 생성이나 hook 구현을 수행하지 않는다.

## 검증 기준

이 문서는 최소한 다음 검증을 통과해야 한다.

```bash
rg -n 'canonical|manifest|migration|templates/mydocs/skills|templates/mydocs/manual|agent-entrypoint|npm CLI|fallback|bundle' docs/plugin-distribution-principles.md
rg -n '진실 원천|별도 진실 원천|복제|참조|fallback|포함|책임 경계' docs/plugin-distribution-principles.md
rg -n 'hook|guardrail|승인|자동|adapter|차단|경고|report-only|publish|merge|close|위험 명령' docs/plugin-distribution-principles.md
rg -n '이슈 없는 구현|승인 전 파일 수정|단계 보고|작업지시자 승인|객관 상태|payload|adapter' docs/plugin-distribution-principles.md
rg -n 'Codex plugin packaging|Claude plugin packaging|check matrix|guardrail|#37|#38|#39|#40' docs/plugin-distribution-principles.md
git diff --check
```

후속 Stage에서 `docs/distribution-channels.md`, README, `docs/agent-entrypoint.md`를 연결하더라도 이 문서의 핵심 원칙은 유지한다.
