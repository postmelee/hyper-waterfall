# Claude plugin public 배포와 release asset 판단 기록

이 문서는 Task #54에서 Claude plugin public marketplace 배포와 release asset 게시 가능성을 판단한 기록이다. Stage 1은 공개 배포 조건, 현재 CLI surface, 공식 문서, #52 충돌면, release asset 현황을 read-only로 재확인한다.

확인 시각: 2026-05-17 08:42 KST

## Stage 1 — 공개 배포 조건과 #52 충돌면 재확인

### 기준 상태

| 항목 | 결과 |
|---|---|
| #54 worktree | `/Users/melee/Documents/projects/hyper-waterfall-task54` |
| #54 branch | `local/task54`, `origin/main` 대비 ahead 2 |
| #52 worktree | `/private/tmp/hyper-waterfall-task52` |
| #52 branch | `local/task52`, `origin/main` 대비 ahead 2 |
| main worktree | `/Users/melee/Documents/projects/hyper-waterfall`, branch `main` |
| Claude Code version | `2.1.143 (Claude Code)` |
| GitHub Release | `v0.2.0 - 배포·업데이트 프로토콜 MVP`, published, draft 아님, prerelease 아님 |
| Release asset | 현재 `v0.2.0` release asset 없음 |

### #52 충돌면

현재 #52 worktree는 clean이고 계획/구현계획서 커밋만 존재한다.

```text
971cecb Task #52: 구현계획서 작성
5db284f Task #52: 수행 계획서 작성과 오늘할일 갱신
```

`origin/main...local/task52` 변경 파일:

```text
mydocs/orders/20260517.md
mydocs/plans/task_m040_52.md
mydocs/plans/task_m040_52_impl.md
```

`origin/main...local/task54` 변경 파일:

```text
mydocs/orders/20260517.md
mydocs/plans/task_m040_54.md
mydocs/plans/task_m040_54_impl.md
```

판단:

- 즉시 겹치는 파일은 `mydocs/orders/20260517.md`다. #52와 #54가 각각 같은 날짜 오늘할일 파일을 신규 추가했으므로, 두 브랜치 중 하나가 먼저 merge된 뒤 나머지 브랜치가 재적용될 때 두 row를 합치는 수동 조정이 필요하다.
- 계획서와 구현계획서는 파일명이 달라 직접 충돌하지 않는다.
- #52의 구현계획서상 향후 변경 후보는 `plugins/hyper-waterfall-codex/`, `.agents/plugins/marketplace.json`, Codex public smoke 기록이다.
- #54의 향후 변경 후보는 `plugins/claude/hyper-waterfall/`, Claude public distribution 기록, `docs/distribution-channels.md` 등이다.
- 공통 문서 충돌 위험은 Stage 4의 `docs/distribution-channels.md`, 조건부 `docs/plugin-distribution-principles.md`에서 다시 확인해야 한다.

### GitHub PR와 release 상태

`gh pr list --state open --search '52' --json number,title,headRefName,baseRefName,state,url` 결과는 빈 배열이었다. 현재 GitHub open PR surface에서는 #52 PR을 찾지 못했다.

`gh release list --limit 10` 결과는 `v0.2.0` latest release 1개를 보여줬다.

`gh release view v0.2.0 --json tagName,name,isPrerelease,isDraft,publishedAt,url,assets` 결과:

```json
{
  "assets": [],
  "isDraft": false,
  "isPrerelease": false,
  "name": "v0.2.0 - 배포·업데이트 프로토콜 MVP",
  "publishedAt": "2026-05-08T20:34:07Z",
  "tagName": "v0.2.0",
  "url": "https://github.com/postmelee/hyper-waterfall/releases/tag/v0.2.0"
}
```

판단:

- release asset 게시 대상 후보는 존재한다.
- 현재 asset이 없으므로 Claude plugin zip asset을 추가하면 release 상태가 바뀐다.
- asset 게시, 삭제, 교체는 외부 공개 action이므로 Stage 3에서 별도 승인 전 실행하지 않는다.

### Claude CLI surface

`claude plugin --help`에서 확인한 주요 command:

| Command | 의미 |
|---|---|
| `details <name>` | plugin component inventory와 token cost 확인 |
| `install <plugin>` | marketplace plugin 설치 |
| `list` | 설치된 plugin 목록 |
| `marketplace` | marketplace add/list/remove/update 관리 |
| `tag [path]` | `{name}--v{version}` git tag 생성, `--dry-run`, `--push` 지원 |
| `validate <path>` | plugin 또는 marketplace manifest validation |

`claude plugin marketplace --help`에서 확인한 command:

| Command | 의미 |
|---|---|
| `add <source>` | URL, path, GitHub repo에서 marketplace 추가 |
| `list` | configured marketplace 목록 |
| `remove <name>` | configured marketplace 제거 |
| `update [name]` | marketplace refresh |

`claude plugin marketplace list --json` 결과:

```json
[
  {
    "name": "claude-plugins-official",
    "source": "github",
    "repo": "anthropics/claude-plugins-official",
    "installLocation": "/Users/melee/.claude/plugins/marketplaces/claude-plugins-official"
  }
]
```

판단:

- local 환경에는 official marketplace가 등록되어 있다.
- CLI에서 marketplace 추가, 설치, validation, tag는 확인된다.
- CLI help에는 official marketplace에 직접 publish하는 명령이 보이지 않는다.
- public marketplace 제출은 공식 문서상 Claude.ai 또는 Console 제출 폼 중심으로 판단한다.

### 공식 문서 확인

확인한 공식 문서:

- Claude Code `Create plugins`: https://code.claude.com/docs/en/plugins
- Claude Code `Discover and install plugins`: https://code.claude.com/docs/en/discover-plugins
- Claude Code `Create and distribute a plugin marketplace`: https://code.claude.com/docs/en/plugin-marketplaces
- Claude.ai `Submitting your plugin`: https://claude.com/docs/plugins/submit

핵심 확인:

| 출처 | #54에 적용할 내용 |
|---|---|
| Create plugins | plugin은 `.claude-plugin/plugin.json` manifest를 사용하고, `--plugin-dir`로 local test할 수 있다. share 전 README, versioning, marketplace, 다른 사용자 테스트가 권장된다. official marketplace 제출은 Claude.ai 또는 Console 제출 폼을 사용한다. |
| Discover and install plugins | official Anthropic marketplace `claude-plugins-official`은 Claude Code 시작 시 자동 제공된다. official marketplace 제출은 Claude.ai와 Console의 in-app submission form으로 안내된다. 독립 배포는 자체 marketplace를 만들 수 있다. |
| Plugin marketplaces | 자체 marketplace는 `.claude-plugin/marketplace.json` catalog를 통해 배포할 수 있고, GitHub repo, git URL, remote URL, local path를 source로 추가할 수 있다. reserved official name은 사용할 수 없다. |
| Submitting your plugin | directory 제출은 GitHub link 또는 plugin zip upload를 지원한다. repo는 public이어야 하고 closed-source plugin은 허용되지 않는다. 제출 전 `claude plugin validate` 실행이 필요하다. 게시 후 GitHub repo update는 public marketplace mirror/screening으로 반영된다고 안내된다. |

Stage 1 결론:

- #54의 public marketplace 후보 경로는 두 가지다.
  - official directory 제출: Claude.ai 또는 Console submission form에 GitHub link 또는 zip upload를 제출한다.
  - independent marketplace: `.claude-plugin/marketplace.json`을 가진 별도 marketplace를 만들고 사용자에게 `claude plugin marketplace add`를 안내한다.
- 현재 `plugins/claude/hyper-waterfall/`은 source-managed plugin directory candidate이지 official directory submission package나 independent marketplace catalog는 아니다.
- official directory 제출은 브라우저/계정 제출 폼과 외부 공개 상태를 바꾸므로 Stage 3 별도 승인 전 실행하지 않는다.
- Stage 2에서는 README/CHANGELOG/manifest metadata가 제출 전 품질 기준을 충족하는지 확인하고, zip 후보와 checksum을 생성해 제출 또는 release asset 후보로 둘 수 있는지 smoke한다.

### Stage 1 검증 명령과 결과

| 명령 | 결과 |
|---|---|
| `git status --short --branch` | `## local/task54...origin/main [ahead 2]` |
| `git worktree list` | main, `/private/tmp/hyper-waterfall-task52`, task54 worktree 확인 |
| `gh issue view 52 --json number,title,state,milestone,body` | #52 open, M040 |
| `gh issue view 54 --json number,title,state,milestone,body` | #54 open, M040 |
| `git branch -r --list '*task52*'` | 출력 없음 |
| `gh pr list --state open --search '52' --json ...` | `[]` |
| `claude --version` | `2.1.143 (Claude Code)` |
| `claude plugin --help` | plugin command surface 확인 |
| `claude plugin validate --help` | `Validate a plugin or marketplace manifest` 확인 |
| `rg -n '#52|#54|Claude plugin|public|release asset|NO-GO|fallback' ...` | #40 보고서, 기술 기록, 배포 문서에서 후속 #54와 보류 조건 확인 |
| `git diff --check` | 출력 없이 통과 |

### Stage 2 입력

Stage 2에서 확인할 항목:

- `plugins/claude/hyper-waterfall/README.md`가 public 제출 사용자에게 충분한 installation, source review, fallback, no-hook 설명을 갖췄는지 확인한다.
- `.claude-plugin/plugin.json` metadata가 official directory 제출과 independent marketplace catalog에 부족하지 않은지 점검한다.
- zip 후보를 `/private/tmp/hyper-waterfall-claude-plugin-task54.zip`에 만들고 checksum을 생성한다.
- `claude plugin validate`, zip `--plugin-dir` list/details를 재확인한다.

Stage 2에서 하지 않을 항목:

- official directory 제출 폼 제출
- GitHub Release asset upload
- independent marketplace 추가 또는 public 안내 문서 변경
- hook 추가 또는 core Skill/manual 복제

## Stage 2 — public metadata와 artifact 후보 점검

### Metadata 점검

Stage 2에서는 `plugins/claude/hyper-waterfall/` 후보를 public 제출 또는 release asset 후보로 둘 때 부족한 안내를 점검했다.

| 파일 | 판단 | 변경 |
|---|---|---|
| `.claude-plugin/plugin.json` | `name`, `version`, `description`, `author`, `homepage`, `repository`, `license`, `keywords`, `skills`가 이미 존재한다. | 변경 없음 |
| `README.md` | local/zip smoke와 fallback은 충분하지만 public 제출 전 source review, 포함 파일, no-hook/no-MCP/no-binary, release asset 보류 조건이 더 명확해야 한다. | `Source review and permissions`, public submission/release asset 안내 추가 |
| `CHANGELOG.md` | #54 public readiness 점검 사실이 별도 기록되어야 한다. | 2026-05-17 public readiness notes 추가 |
| `skills/hyper-waterfall/SKILL.md` | canonical source, 승인 게이트, fallback, public publish 금지 문구가 이미 있다. | 변경 없음 |

### Artifact 후보

생성한 임시 artifact:

| 항목 | 값 |
|---|---|
| zip | `/private/tmp/hyper-waterfall-claude-plugin-task54.zip` |
| size | `5.3K` |
| sha256 | `b30fb8080f334b2c2956e020af707b98bc56c4ecec49b31f27b44f060d4e55fc` |
| checksum file | `/private/tmp/hyper-waterfall-claude-plugin-task54.zip.sha256` |

생성 명령:

```bash
zip -r /private/tmp/hyper-waterfall-claude-plugin-task54.zip .
shasum -a 256 /private/tmp/hyper-waterfall-claude-plugin-task54.zip > /private/tmp/hyper-waterfall-claude-plugin-task54.zip.sha256
```

Zip 포함 파일:

```text
CHANGELOG.md
README.md
.claude-plugin/plugin.json
skills/hyper-waterfall/SKILL.md
```

판단:

- zip은 official directory submission form의 upload 후보 또는 GitHub Release asset 후보로 사용할 수 있다.
- zip과 checksum file은 `/private/tmp`의 임시 산출물이며 Git에 포함하지 않는다.
- release asset으로 게시하려면 Stage 3에서 게시 대상 release/tag, asset명, checksum 정책, rollback/delete 조건을 별도 승인받아야 한다.

### Stage 2 smoke 결과

`claude plugin validate plugins/claude/hyper-waterfall`:

```text
Validating plugin manifest: /Users/melee/Documents/projects/hyper-waterfall-task54/plugins/claude/hyper-waterfall/.claude-plugin/plugin.json

✔ Validation passed
```

`claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task54.zip plugin list`:

```text
Session-only plugins (--plugin-dir / --plugin-url):

  ❯ hyper-waterfall@inline
    Version: 0.2.0-candidate.1
    Path: /tmp/claude-plugin-session-7fad1afe1100dd52/inline-0-hyper-waterfall-claude-plugin-task54
    Status: ✔ loaded
```

`claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task54.zip plugin details hyper-waterfall`:

```text
Component inventory
  Skills (1)  hyper-waterfall
  Agents (0)
  Hooks (0)
  MCP servers (0)
  LSP servers (0)

Projected token cost
  Always-on:   ~63 tok   added to every session
  hyper-waterfall        ~60       ~470
```

### Stage 2 결론

- directory validation, zip checksum, zip load/details smoke는 통과했다.
- public metadata 보강은 README와 CHANGELOG만으로 충분하다.
- manifest와 wrapper Skill은 변경하지 않았다.
- hook, MCP server, background monitor, bundled binary, local command runner는 계속 포함하지 않는다.
- public directory 제출과 GitHub Release asset 게시는 실행하지 않았다.
- Stage 3에서는 작업지시자 별도 승인 여부에 따라 official directory 제출 또는 release asset 게시를 실행할지, 아니면 NO-GO와 대체 경로로 남길지 판단한다.

## Stage 3 — 배포 승인 게이트와 실행/보류 판단

### 승인 게이트 해석

작업지시자의 Stage 3 진행 지시는 Stage 3 산출물 작성과 판단 정리 승인으로 해석한다. Stage 2와 구현계획서에서 분리한 다음 외부 공개 action에 대한 별도 명시 승인은 아직 없다.

별도 승인으로 인정할 문구 예:

- "Claude official directory에 제출해줘"
- "Claude plugin zip을 v0.2.0 release asset으로 게시해줘"
- "public marketplace 제출을 승인한다"
- "release asset 게시를 승인한다"

따라서 Stage 3에서는 public directory submission form 제출, GitHub Release asset upload, asset delete/replace, independent marketplace publish를 실행하지 않았다.

### GO/NO-GO 판단

| 항목 | 판단 | 근거 | 다음 조건 |
|---|---|---|---|
| 후보 품질 | GO | Stage 2에서 manifest validation, zip checksum, zip `--plugin-dir` list/details smoke 통과 | Stage 4 문서 정합성 반영 |
| official directory 제출 실행 | NO-GO for execution | Claude.ai/Console submission form은 외부 공개 action이며 별도 승인 없음 | 작업지시자가 제출을 명시 승인하고 제출 계정/경로를 지정 |
| GitHub Release asset 게시 실행 | NO-GO for execution | `v0.2.0` release는 published이고 asset이 없어 게시 가능 후보지만 별도 승인 없음 | 작업지시자가 release/tag, asset명, checksum 공개 방식을 명시 승인 |
| independent marketplace 생성 | NO-GO | 이번 task 범위는 official directory/release asset 판단이며 독립 marketplace catalog 작성은 별도 설계 필요 | 별도 이슈 또는 계획 갱신 |
| hook 포함 | NO-GO | 후보는 hook 없는 thin wrapper로 유지 | 별도 hook guardrail task |

### 대체 설치/사용 경로

별도 공개 action 전 사용 경로:

```bash
claude plugin validate plugins/claude/hyper-waterfall
claude --plugin-dir plugins/claude/hyper-waterfall plugin list
claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task54.zip plugin list
claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task54.zip plugin details hyper-waterfall
```

plugin 미사용 fallback:

- `AGENTS.md`
- `CLAUDE.md`
- `.claude/skills`
- `mydocs/skills`
- `docs/agent-entrypoint.md`
- `npx hyper-waterfall@0.2.0 --help`

### 재시도 조건

Official directory 제출을 재시도하려면 다음이 필요하다.

- 제출 승인 문구
- Claude.ai 또는 Console submission form 접근 가능 계정
- 제출 방식 선택: public GitHub link 또는 zip upload
- 제출 대상이 현재 `plugins/claude/hyper-waterfall/` candidate인지, 별도 marketplace repository인지 결정
- 제출 후 결과 URL, 상태, 심사 대기 여부 기록

GitHub Release asset 게시를 재시도하려면 다음이 필요하다.

- release asset 게시 승인 문구
- 게시 대상 release/tag: 후보 `v0.2.0`
- asset명 결정: 후보 `hyper-waterfall-claude-plugin-0.2.0-candidate.1.zip`
- checksum 공개 방식 결정: release body, 별도 `.sha256` asset, 또는 보고서/문서 기록
- 게시 후 다운로드 smoke와 checksum 검증

### Rollback / 보류 조건

Official directory 제출 후 문제가 생기면 다음 조건을 기록하고 철회 또는 수정 제출을 요청한다.

- 제출 폼에서 draft/cancel/withdraw가 가능한지 확인
- 제출 완료 후 review queue 상태라면 Console/Claude.ai에서 수정 또는 support route 확인
- plugin source를 public GitHub link로 제출했다면 offending commit/tag를 수정하고 directory mirror/screening 재반영을 기다린다.

Release asset 게시 후 문제가 생기면 다음 조건을 기록하고 삭제 또는 교체한다.

- 잘못된 asset명, checksum 불일치, zip load 실패, canonical drift 확인 시 asset 삭제
- 교체가 필요하면 같은 asset명 overwrite보다 삭제 후 새 checksum 기록을 우선한다.
- 삭제/교체도 외부 공개 action이므로 작업지시자 승인 후 실행한다.

### Stage 3 결론

- Candidate readiness는 GO다.
- Public marketplace 제출 실행은 별도 승인 부재로 NO-GO다.
- GitHub Release asset 게시 실행은 별도 승인 부재로 NO-GO다.
- Stage 4에서는 이 보류 판단, 대체 설치 경로, rollback 조건을 `docs/distribution-channels.md`와 최종 보고서에 반영한다.

## Stage 4 — 설치 smoke, rollback, 문서 정합성 정리

### #52 / #41 재확인

Stage 4 시작 전 `git fetch origin`을 실행했고, #52와 #41 상태를 확인했다.

| 항목 | 결과 |
|---|---|
| #52 worktree | `/private/tmp/hyper-waterfall-task52`, `local/task52...origin/main [ahead 5]` |
| #52 변경 파일 | `mydocs/orders/20260517.md`, #52 계획/기술/단계 문서, `plugins/hyper-waterfall-codex/README.md` |
| #52 open PR 검색 | `gh pr list --state open --search '52'` 결과 `[]` |
| #41 issue | open, 최종 배포 채널 정합성 감사와 문서 갱신 |

판단:

- #52는 아직 `docs/distribution-channels.md`를 수정하지 않았다.
- #54 Stage 4의 공통 문서 변경은 Claude plugin 섹션과 보류 항목의 상태 문구로 제한한다.
- `mydocs/orders/20260517.md`는 #52/#54 merge 시 row 병합이 계속 필요하다.
- Official Claude plugin directory 제출 여부는 #41의 Codex/Claude plugin 상태 확인 범위에 포함해 재결정한다.

### Stage 4 문서 반영

`docs/distribution-channels.md` 반영 내용:

- Claude plugin은 #54에서 public-readiness smoke까지 통과했다.
- Official Claude plugin directory 제출은 #41 최종 배포 채널 정합성 감사에서 Codex plugin public 상태와 함께 재결정한다.
- GitHub Release asset 게시는 실행하지 않았고, `v0.2.0` release에 `0.2.0-candidate.1` zip 후보를 올릴지는 별도 승인과 asset명/checksum 공개 방식 확정이 필요하다.

`docs/plugin-distribution-principles.md`는 수정하지 않았다. 공통 원칙, bundle 책임 경계, fallback, hook guardrail 기준은 #54 결과로 바뀌지 않았다.

### 대체 설치 smoke와 최종 상태

최종 대체 설치 후보:

```bash
claude plugin validate plugins/claude/hyper-waterfall
claude --plugin-dir plugins/claude/hyper-waterfall plugin list
claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task54.zip plugin list
claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task54.zip plugin details hyper-waterfall
```

최종 artifact 후보:

| 항목 | 값 |
|---|---|
| zip | `/private/tmp/hyper-waterfall-claude-plugin-task54.zip` |
| sha256 | `b30fb8080f334b2c2956e020af707b98bc56c4ecec49b31f27b44f060d4e55fc` |
| checksum file | `/private/tmp/hyper-waterfall-claude-plugin-task54.zip.sha256` |
| public release asset | 미게시 |
| official directory submission | 미제출, #41에서 재결정 |

### Stage 4 결론

- #54는 public-ready artifact 후보와 release asset 보류 조건을 남기는 것으로 완료한다.
- Official Claude plugin directory 제출은 #41에서 Codex plugin public 상태와 함께 재결정한다.
- GitHub Release asset 게시는 별도 승인 전까지 보류한다.
- Public URL 기반 install smoke는 public 제출/asset 게시가 없으므로 실행하지 않았다. 대신 directory/zip `--plugin-dir` smoke를 대체 경로로 유지한다.
