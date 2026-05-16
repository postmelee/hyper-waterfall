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
