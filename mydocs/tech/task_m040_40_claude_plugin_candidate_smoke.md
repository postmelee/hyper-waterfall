# Claude plugin 배포 후보와 설치 smoke 기록

이 문서는 Task #40에서 Claude plugin 배포 후보를 만들고 local validation/discovery smoke를 수행한 결과를 기록한다. Stage 1에서는 배포 후보 작성 전에 공식 사양, local Claude Code 버전, 선행 task 인계 조건, 보류 항목을 재확인한다.

## 검토 기준

| 항목 | 값 |
|---|---|
| GitHub Issue | [#40](https://github.com/postmelee/hyper-waterfall/issues/40) |
| 마일스톤 | M040 |
| 확인일 | 2026-05-16 |
| 작업 브랜치 | `local/task40` |
| 후보 root | `plugins/claude/hyper-waterfall/` |
| 기본 후보 | hook 없는 thin wrapper Skill plugin |
| 공식 출처 원칙 | Claude Code official docs만 기준으로 사용 |

## Stage 1 결론

#40은 Claude plugin 후보 bundle을 만들 수 있는 상태다. 다만 기본 후보는 hook 없는 thin wrapper Skill로 제한한다.

Stage 1 기준 결정:

- `plugins/claude/hyper-waterfall/`을 local plugin root 후보로 둔다.
- plugin manifest는 `.claude-plugin/plugin.json`에 둔다.
- component directory는 plugin root level의 `skills/` 아래에 둔다.
- Skill 호출은 plugin namespace를 전제로 한다.
- `claude plugin validate <path>`는 local CLI에서 사용 가능하다.
- `claude --plugin-dir <dir>` directory smoke는 Stage 3 후보로 유지한다.
- zip plugin smoke는 local Claude Code가 `2.1.111`이라서 v2.1.128 이상 필요 조건을 충족하지 못하므로 보류한다.
- `hooks/hooks.json`은 Stage 2 기본 후보에 포함하지 않는다.
- public marketplace 배포는 별도 승인 전 실행하지 않고 Stage 4에서 GO/NO-GO와 보류 사유를 문서화한다.

## 공식 문서 재확인

확인 문서:

- [Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)
- [Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)
- [Hooks reference - Claude Code Docs](https://code.claude.com/docs/en/hooks)
- [Automate workflows with hooks - Claude Code Docs](https://code.claude.com/docs/en/hooks-guide)

확인 내용:

| 항목 | 공식 문서 기준 | #40 적용 |
|---|---|---|
| standalone vs plugin | `.claude/` standalone은 project-local/personal workflow에 적합하고, plugin은 team/community sharing과 versioned release에 적합하다. | 현재 `.claude/skills`는 fallback/standalone 경로로 유지하고, #40 후보는 별도 sharing artifact로 만든다. |
| manifest 위치 | plugin identity는 `.claude-plugin/plugin.json`에 둔다. | Stage 2에서 해당 경로에 manifest를 만든다. |
| component 위치 | `skills/`, `commands/`, `agents/`, `hooks/` 등은 plugin root level에 둔다. `.claude-plugin/` 안에는 manifest만 둔다. | Stage 2 후보는 `skills/hyper-waterfall/SKILL.md` 구조를 사용한다. |
| Skill namespace | plugin Skill은 plugin `name`을 prefix로 한 namespaced 호출을 사용한다. | 예상 호출은 `/hyper-waterfall:hyper-waterfall` 계열로 두고 Stage 3에서 실제 discovery 한계를 확인한다. |
| local directory test | `--plugin-dir ./my-plugin`으로 local plugin을 세션 단위로 로드할 수 있다. | Stage 3에서 대화식 hang을 피하면서 가능한 범위의 directory smoke를 시도한다. |
| zip local test | `.zip` archive를 `--plugin-dir`에 넘기려면 Claude Code v2.1.128 이상이 필요하다. | 현재 `2.1.111`이므로 zip smoke는 보류한다. |
| version | explicit `version`을 쓰면 update 판단의 cache key가 된다. | Stage 2 manifest와 CHANGELOG의 version을 함께 관리한다. |
| README | 공유 전 README와 설치/사용 안내가 필요하다. | Stage 2 후보에 README를 포함한다. |
| public marketplace | official marketplace 제출은 in-app submission form을 사용한다. | #40에서 임의 public 배포하지 않고 Stage 4에 승인 조건으로 남긴다. |
| hook decision | `PermissionRequest`는 allow/deny decision과 permission update를 지원한다. | Hyper-Waterfall 승인 게이트와 충돌하므로 자동 allow/permission update는 기본 후보에서 제외한다. |

## Local CLI 확인

실행 명령:

```bash
claude --version
claude plugin --help
claude plugin validate --help
```

출력 요약:

| 명령 | 결과 | 판단 |
|---|---|---|
| `claude --version` | `2.1.111 (Claude Code)` | directory plugin smoke는 후보로 유지하되 zip smoke는 보류 |
| `claude plugin --help` | `install`, `list`, `marketplace`, `uninstall`, `update`, `validate` 확인 | local validation surface 존재 |
| `claude plugin validate --help` | `Validate a plugin or marketplace manifest` | Stage 3에서 후보 root 검증에 사용 |

## 선행 task와 상태

| 항목 | 상태 | #40 영향 |
|---|---|---|
| #37 Codex plugin packaging 검증 | closed, main 반영 | 공통 원칙과 Codex packaging 최종 산출물은 참고 가능 |
| #38 Codex plugin 배포 후보 생성과 설치 smoke | Stage 1 당시 open, 최종 보고 전 origin/main 재적용 후 closed 확인 | Codex/Claude 최종 smoke 비교는 #41에서 #38/#40 결과 기준으로 재확인 |
| #39 Claude plugin packaging 검증 | closed, main 반영 | #40의 직접 입력 |

## #39 인계 조건 반영

#39 최종 보고서와 기술 기록에서 확인한 #40 인계 조건:

- hook 없는 thin wrapper Skill을 1차 후보로 둔다.
- release snapshot은 core Skill 전체 포함 요구가 있을 때만 별도 승인 항목으로 분리한다.
- runtime reference와 root 밖 symlink는 plugin packaging 후보에서 제외한다.
- `hooks/hooks.json`과 blocking hook은 기본 후보에서 제외한다.
- `PermissionRequest` 자동 allow, `updatedPermissions`, `setMode` 같은 승인 자동화 장치는 금지 후보로 둔다.
- local smoke는 `claude plugin validate`, directory `--plugin-dir`, namespaced Skill invocation, fallback 확인을 중심으로 구성한다.
- zip smoke는 local Claude Code version 부족 때문에 보류하거나 업그레이드 후 별도 판단한다.

## 즉시 진행 항목과 보류 항목

| 분류 | 항목 | 처리 |
|---|---|---|
| 즉시 진행 | `.claude-plugin/plugin.json` | Stage 2에서 작성 |
| 즉시 진행 | `skills/hyper-waterfall/SKILL.md` thin wrapper | Stage 2에서 작성 |
| 즉시 진행 | README/CHANGELOG | Stage 2에서 작성 |
| 즉시 진행 | `claude plugin validate` | Stage 3에서 실행 |
| 즉시 진행 | `.claude/skills`, `docs/agent-entrypoint.md`, npm CLI fallback 확인 | Stage 3에서 실행 |
| 보류 | zip plugin smoke | Claude Code v2.1.128 이상 필요 |
| 보류 | public marketplace 배포 | 작업지시자 별도 승인 필요 |
| 보류 | release snapshot | drift 검증 조건과 별도 승인 필요 |
| 제외 | `hooks/hooks.json`, hook script | 기본 후보에서는 생성하지 않음 |

## Stage 2 입력

Stage 2는 다음 구조를 만든다.

```text
plugins/claude/hyper-waterfall/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── hyper-waterfall/
│       └── SKILL.md
├── README.md
└── CHANGELOG.md
```

Stage 2 작성 기준:

- plugin `name`은 namespace로 쓰이므로 `hyper-waterfall`을 우선 후보로 둔다.
- Skill directory도 `hyper-waterfall`로 둔다. 호출 UX가 중복되어 보이면 Stage 3에서 기록하되, 사용자에게 가장 명확한 literal entrypoint를 우선한다.
- wrapper Skill은 core Skill 본문을 요약하지 않고 canonical 진입 경로를 안내한다.
- README는 local validation, local load smoke, fallback, public 배포 보류를 설명한다.
- CHANGELOG는 candidate version과 기준 문서 상태를 기록한다.
- hook config는 만들지 않는다.

## Stage 2 반영 결과

Stage 2에서는 hook 없는 Claude plugin 후보 디렉터리를 작성했다.

작성한 구조:

```text
plugins/claude/hyper-waterfall/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── hyper-waterfall/
│       └── SKILL.md
├── README.md
└── CHANGELOG.md
```

### Manifest

`plugins/claude/hyper-waterfall/.claude-plugin/plugin.json`에는 다음 metadata를 둔다.

| 필드 | 값 |
|---|---|
| `name` | `hyper-waterfall` |
| `version` | `0.2.0-candidate.1` |
| `description` | Claude Code discovery layer for the Hyper-Waterfall framework. |
| `repository` | `https://github.com/postmelee/hyper-waterfall` |
| `license` | `MIT` |
| `skills` | `./skills/` |

`name`은 Claude plugin namespace가 되므로 Stage 3의 예상 호출 후보는 `/hyper-waterfall:hyper-waterfall`이다.

### Thin wrapper Skill

`skills/hyper-waterfall/SKILL.md`는 다음 역할로 제한했다.

- `AGENTS.md`, `CLAUDE.md`, `docs/agent-entrypoint.md`, `templates/manifest.json`, `.claude/skills`, `mydocs/skills`를 먼저 읽게 한다.
- 신규 적용 요청은 `docs/agent-entrypoint.md`의 신규 적용 판단 결과 형식을 따르게 한다.
- 기존 업데이트 요청은 `.hyper-waterfall/version.json`, 목표 release manifest, migration guide, conflict 후보를 확인하게 한다.
- 이미 적용된 저장소의 task 요청은 `.claude/skills` 또는 `mydocs/skills`의 canonical Skill로 넘긴다.
- `npx hyper-waterfall@0.2.0 --help`를 CLI fallback으로 안내한다.

wrapper가 하지 않는 일:

- core Skill 본문을 plugin 안에서 요약해 새 절차로 만들지 않는다.
- `templates/manifest.json`이나 migration guide를 복제하지 않는다.
- 승인 게이트, 이슈 추적, Stage 보고, PR 흐름을 우회하지 않는다.
- public publish, issue close, PR merge를 별도 승인 없이 실행하지 않는다.

### README와 CHANGELOG

README는 다음을 설명한다.

- local validation: `claude plugin validate plugins/claude/hyper-waterfall`
- local directory smoke: `claude --plugin-dir plugins/claude/hyper-waterfall`
- expected namespaced Skill 후보: `/hyper-waterfall:hyper-waterfall`
- zip smoke는 Claude Code v2.1.128 이상 업데이트 후 Stage 3에서 수행
- plugin unavailable fallback: `AGENTS.md`, `CLAUDE.md`, `.claude/skills`, `mydocs/skills`, `docs/agent-entrypoint.md`, npm CLI
- hook 미포함과 public distribution 보류

CHANGELOG는 `0.2.0-candidate.1` 후보와 #36/#39 입력 조건, hook 미포함, zip smoke Stage 3 수행 계획을 기록한다.

### Hook 제외 확인

Stage 2 후보에는 `hooks/` directory와 `hooks/hooks.json`을 만들지 않았다.

`README.md`와 `CHANGELOG.md`에는 `PermissionRequest`와 zip smoke 관련 문구가 있지만, 이는 금지/보류 정책 설명이다. 실제 hook config, permission allow decision, `updatedPermissions`, `setMode`, 자동 질의 응답 구현은 없다.

### 업데이트 계획 반영

작업지시자가 Claude Code local version 업데이트 계획을 밝혔다. 따라서 Stage 3은 업데이트 후 다음 순서로 진행하는 것이 적절하다.

1. 업데이트 후 `claude --version`을 재확인한다.
2. `claude plugin validate plugins/claude/hyper-waterfall`을 실행한다.
3. directory `--plugin-dir` smoke를 시도한다.
4. v2.1.128 이상이면 zip archive를 만들고 zip `--plugin-dir` smoke를 수행한다.
5. 업데이트 전후 version과 smoke 결과를 Stage 3 보고서에 남긴다.

## Stage 3 반영 결과

Stage 3에서는 local validation, session-only directory load, fallback 확인을 수행했다. Claude Code 업데이트는 시도했지만 완료되지 않았고, local version이 계속 `2.1.111`이라 zip smoke는 수행하지 않았다.

### Version과 업데이트 시도

실행 명령:

```bash
claude --version
claude update
claude --version
```

결과:

| 항목 | 결과 | 판단 |
|---|---|---|
| 업데이트 전 version | `2.1.111 (Claude Code)` | zip smoke 기준 미충족 |
| `claude update` | `Checking for updates to latest version...` 이후 30초 이상 무응답 | 검증 흐름을 막지 않도록 중단 |
| 업데이트 후 version | `2.1.111 (Claude Code)` | 업데이트 미완료, zip smoke 보류 |

`claude update`는 사용자가 업데이트 계획을 밝힌 뒤 Stage 3에서 시도했다. 프로세스가 장시간 진행되지 않아 종료했고, 이번 Stage에서는 directory/local validation smoke를 우선 완료했다.

### Manifest validation

초기 `claude plugin validate plugins/claude/hyper-waterfall` 실행은 응답 없이 대기했지만, `timeout`을 적용한 재실행에서는 정상 통과했다.

실행 명령:

```bash
/opt/homebrew/bin/timeout 15s claude plugin validate plugins/claude/hyper-waterfall
/opt/homebrew/bin/timeout 15s claude --bare plugin validate plugins/claude/hyper-waterfall
/opt/homebrew/bin/timeout 15s claude plugin validate plugins/claude/hyper-waterfall/.claude-plugin/plugin.json
```

결과:

- OK: 세 명령 모두 `.claude-plugin/plugin.json`을 대상으로 validation을 수행했다.
- OK: 세 명령 모두 `Validation passed`를 출력했다.

### Directory load와 discovery smoke

실행 명령:

```bash
/opt/homebrew/bin/timeout 15s claude --plugin-dir plugins/claude/hyper-waterfall plugin list
/opt/homebrew/bin/timeout 15s claude --plugin-dir plugins/claude/hyper-waterfall plugin validate plugins/claude/hyper-waterfall
/opt/homebrew/bin/timeout 15s claude --plugin-dir plugins/claude/hyper-waterfall --debug-file /private/tmp/hyper-waterfall-task40/claude-plugin-debug.log --print '/help'
```

결과:

| 검증 | 결과 | 판단 |
|---|---|---|
| session-only plugin list | `hyper-waterfall@inline`, version `0.2.0-candidate.1`, status `loaded` | directory `--plugin-dir` load 확인 |
| plugin validate with `--plugin-dir` | `Validation passed` | session-only plugin dir에서도 manifest 검증 통과 |
| print `/help` | `/help isn't available in this environment.` | slash command UI discovery는 이 비대화식 환경에서 확인 불가 |
| debug log inspection | inline plugin 로드, session-only plugin 1개, plugin skill 1개 로드 확인 | namespaced Skill source가 로드됨 |

debug log는 확인 후 커밋 대상에서 제외하고 삭제했다.

### Fallback 확인

실행 명령:

```bash
claude --help
claude plugin --help
test -L .claude/skills
test -f docs/agent-entrypoint.md
npx hyper-waterfall@0.2.0 --help
npm view hyper-waterfall@0.2.0 bin version --json
npm pack hyper-waterfall@0.2.0 --dry-run --json
```

결과:

| 항목 | 결과 | 판단 |
|---|---|---|
| `claude --help` | `--plugin-dir`, `--print`, `update`, `plugin` 확인 | non-interactive smoke와 update surface 존재 |
| `claude plugin --help` | `validate`, `marketplace`, `install`, `list` 등 확인 | plugin 관리 surface 존재 |
| `.claude/skills` | symlink 존재 | standalone/canonical Skill fallback 존재 |
| `docs/agent-entrypoint.md` | 파일 존재 | lifecycle fallback 문서 존재 |
| `npx` inside framework repo | `sh: hyper-waterfall: command not found` | package root 내부에서는 local package name resolution 영향으로 실패 |
| `/private/tmp`에서 `npx` | Hyper-Waterfall CLI help 출력 | 대상 저장소 밖 fallback은 정상 |
| npm metadata | `bin.hyper-waterfall = bin/hyper-waterfall.js`, version `0.2.0` | registry metadata 정상 |
| npm pack dry-run | `bin/hyper-waterfall.js` 포함 확인 | package tarball에 executable 포함 |

`npx hyper-waterfall@0.2.0 --help`는 이 framework 저장소 내부에서는 같은 package name 때문에 실패했지만, 일반 대상 저장소를 가정한 package root 밖 실행에서는 정상 동작했다. README에 이 차이를 짧게 보강했다.

zip smoke가 Stage 3에서 완료되지 않았으므로 README와 CHANGELOG의 zip smoke 문구는 "Stage 3 수행"에서 "업데이트 후 별도 검증"으로 보정했다.

### Zip smoke

zip smoke는 실행하지 않았다.

사유:

- local Claude Code는 업데이트 시도 후에도 `2.1.111`이다.
- Claude docs 기준 zip plugin load는 v2.1.128 이상이 필요하다.
- 업데이트 프로세스가 무응답 상태라 이번 Stage에서 버전 조건을 충족하지 못했다.

Stage 4에서는 public 배포 판단에서 zip smoke 미수행을 제한 사항으로 남긴다. 작업지시자가 별도 환경에서 Claude Code를 v2.1.128 이상으로 업데이트하면 같은 후보를 zip으로 묶어 추가 smoke를 수행할 수 있다.

## Stage 4 반영 결과

Stage 4에서는 작업지시자가 수동으로 업데이트한 Claude Code `2.1.143` 기준으로 zip smoke를 추가 확인했고, public 배포 GO/NO-GO를 정리했다.

### 업데이트 후 재검증

실행 명령:

```bash
claude --version
zip -r /private/tmp/hyper-waterfall-claude-plugin-task40.zip .
/opt/homebrew/bin/timeout 60s claude plugin validate plugins/claude/hyper-waterfall
/opt/homebrew/bin/timeout 60s claude --plugin-dir plugins/claude/hyper-waterfall plugin list
/opt/homebrew/bin/timeout 60s claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task40.zip plugin list
/opt/homebrew/bin/timeout 60s claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task40.zip plugin details hyper-waterfall
unzip -l /private/tmp/hyper-waterfall-claude-plugin-task40.zip
```

결과:

| 항목 | 결과 | 판단 |
|---|---|---|
| Claude Code version | `2.1.143 (Claude Code)` | zip smoke 최소 version 조건 충족 |
| zip archive | `CHANGELOG.md`, `README.md`, `.claude-plugin/plugin.json`, `skills/hyper-waterfall/SKILL.md` 포함 | plugin root 기준 archive 구조 확인 |
| directory manifest validation | `Validation passed` | source-managed candidate manifest OK |
| directory load | `hyper-waterfall@inline`, version `0.2.0-candidate.1`, status `loaded` | directory `--plugin-dir` GO |
| zip load | temp session path에서 `hyper-waterfall@inline`, version `0.2.0-candidate.1`, status `loaded` | zip `--plugin-dir` GO |
| component inventory | Skills 1, Agents 0, Hooks 0, MCP servers 0, LSP servers 0 | hook 없는 thin wrapper 후보 의도와 일치 |
| token cost | always-on 약 63 tok, on-invoke 약 470 tok | discovery layer로 수용 가능한 규모 |

`claude plugin validate /private/tmp/hyper-waterfall-claude-plugin-task40.zip`는 zip을 plugin archive로 해석하지 않고 JSON manifest로 직접 읽으려 해 `Unexpected identifier "PK"` 오류가 났다. 따라서 zip 검증은 `plugin validate`가 아니라 zip `--plugin-dir` load와 `plugin details` inventory로 판단한다.

업데이트 후 2.1.143의 `plugin validate`와 `plugin list`는 sandbox 안에서 `~/.claude` 설정/telemetry 쓰기 제한 때문에 timeout될 수 있었다. 권한 상승 실행에서는 정상 통과했다.

### GO/NO-GO 판단

| 범위 | 판단 | 근거 |
|---|---|---|
| source-managed local directory candidate | GO | manifest validation, directory load, component inventory 통과 |
| local zip candidate | GO | zip archive 구조, zip `--plugin-dir` load, component inventory 통과 |
| public marketplace 배포 | NO-GO for this task | 작업지시자 별도 승인, marketplace 제출 절차, release 운영 판단이 필요 |
| release asset 게시 | NO-GO for this task | v0.2.0 release asset 정책과 #41 최종 채널 감사가 필요 |
| hook 포함 | NO-GO | 기본 후보는 hook 없는 thin wrapper. hook guardrail은 별도 승인 항목 |

### 대체 설치/사용 경로

public 배포 전 사용 경로:

```bash
claude --plugin-dir plugins/claude/hyper-waterfall
claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task40.zip
```

plugin 미사용 fallback:

- `AGENTS.md`
- `CLAUDE.md`
- `.claude/skills`
- `mydocs/skills`
- `docs/agent-entrypoint.md`
- `npx hyper-waterfall@0.2.0 --help`

### 문서 반영

`docs/distribution-channels.md`를 보정했다.

- Claude plugin local/zip candidate 위치와 smoke 통과 결과를 반영했다.
- public marketplace 배포와 release asset 게시를 보류로 남겼다.
- "plugin 실제 packaging을 하지 않는다"는 오래된 표현을 Claude plugin candidate 범위에 맞게 보정했다.

`docs/plugin-distribution-principles.md`는 수정하지 않았다. 공통 원칙과 check matrix는 여전히 유효하며, #40 결과는 그 원칙을 따른 실제 후보 생성과 smoke 결과이기 때문이다.

### #41 인계 조건

#41에서는 다음을 확인해야 한다.

- #38 Codex plugin 배포 후보 생성과 설치 smoke 결과와 #40 Claude plugin 후보 결과의 정합성
- Codex/Claude plugin candidate의 naming, version, canonical reference, fallback 문구 정합성
- Claude plugin public marketplace 제출 여부
- Claude plugin zip/release asset을 v0.2.0 release에 포함할지 여부
- hook 없는 후보를 유지할지, 별도 hook guardrail task를 만들지 여부

## Stage 1 검증 메모

Stage 1 검증 명령은 통과했다.

- OK: `claude --version`에서 `2.1.111 (Claude Code)` 확인.
- OK: `claude plugin --help`에서 `validate` 명령 확인.
- OK: `claude plugin validate --help`에서 path 기반 validation 명령 확인.
- OK: Stage 1 당시 #38은 open 상태였다. 최종 보고 전 `origin/main` 재적용 후 #38은 closed 상태로 재확인했다.
- OK: #37과 #39는 closed 상태로 확인.
- OK: #39 기술 기록과 최종 보고서에서 #40, 배포 후보, 설치 smoke, thin wrapper, zip, public, 보류 키워드 확인.
- OK: `docs/plugin-distribution-principles.md`와 `docs/distribution-channels.md`에서 Claude plugin, check matrix, #40, canonical, fallback, hook 기준 확인.

## 잔여 위험

- local Claude Code version이 zip plugin smoke 기준보다 낮다.
- directory `--plugin-dir` smoke는 대화식 세션을 열 수 있으므로 Stage 3에서 비대화식 경로를 우선 확인해야 한다.
- #38과 #40의 최종 배포 후보 결과는 #41에서 다시 비교해야 한다.
- public marketplace 배포 권한과 절차는 아직 확인만 했고 실행하지 않았다.
