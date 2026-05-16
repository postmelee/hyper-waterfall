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
| #38 Codex plugin 배포 후보 생성과 설치 smoke | open | Codex/Claude 최종 smoke 비교는 #41에서 #38 완료 후 재확인 |
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

## Stage 1 검증 메모

Stage 1 검증 명령은 통과했다.

- OK: `claude --version`에서 `2.1.111 (Claude Code)` 확인.
- OK: `claude plugin --help`에서 `validate` 명령 확인.
- OK: `claude plugin validate --help`에서 path 기반 validation 명령 확인.
- OK: #38은 open 상태로 확인.
- OK: #37과 #39는 closed 상태로 확인.
- OK: #39 기술 기록과 최종 보고서에서 #40, 배포 후보, 설치 smoke, thin wrapper, zip, public, 보류 키워드 확인.
- OK: `docs/plugin-distribution-principles.md`와 `docs/distribution-channels.md`에서 Claude plugin, check matrix, #40, canonical, fallback, hook 기준 확인.

## 잔여 위험

- local Claude Code version이 zip plugin smoke 기준보다 낮다.
- directory `--plugin-dir` smoke는 대화식 세션을 열 수 있으므로 Stage 3에서 비대화식 경로를 우선 확인해야 한다.
- #38이 open이므로 #41에서 Codex/Claude 최종 배포 후보 결과를 다시 비교해야 한다.
- public marketplace 배포 권한과 절차는 아직 확인만 했고 실행하지 않았다.
