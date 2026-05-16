# Hyper-Waterfall Claude Plugin Candidate

이 디렉터리는 Claude Code용 Hyper-Waterfall plugin 배포 후보이다. 목적은 Claude Code 안에서 Hyper-Waterfall 진입점과 canonical Skill 흐름을 쉽게 발견하게 하는 것이다.

이 plugin은 Hyper-Waterfall의 새 진실 원천이 아니다. canonical 기준은 계속 GitHub Release/tag, `templates/manifest.json`, `docs/migrations/`, `docs/agent-entrypoint.md`, `AGENTS.md`, `CLAUDE.md`, `templates/mydocs/skills`에 있다.

## 구조

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

## Local validation

저장소 루트에서 실행한다.

```bash
claude plugin validate plugins/claude/hyper-waterfall
```

## Local directory smoke

Claude Code에서 local plugin directory를 세션 단위로 로드한다.

```bash
claude --plugin-dir plugins/claude/hyper-waterfall
```

로드 후 기대하는 Skill 호출 후보는 다음이다.

```text
/hyper-waterfall:hyper-waterfall
```

대화식 세션을 열 수 있으므로 자동화 검증에서는 먼저 `claude plugin validate`를 통과시킨 뒤 수행한다.

## Zip smoke

zip plugin smoke는 Claude Code v2.1.128 이상이 필요하다. #40 Stage 4 기준 local Claude Code `2.1.143`에서 zip load smoke를 통과했다.

검증 후보:

```bash
zip -r /private/tmp/hyper-waterfall-claude-plugin-task40.zip .
claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task40.zip plugin list
claude --plugin-dir /private/tmp/hyper-waterfall-claude-plugin-task40.zip plugin details hyper-waterfall
```

`claude plugin validate <zip>`은 zip archive를 plugin root로 해석하지 않고 JSON manifest로 직접 읽으려 하므로, zip 검증은 source directory manifest validation과 zip `--plugin-dir` load smoke 조합으로 판단한다.

## Source review and permissions

설치 전 검토 기준은 이 디렉터리 전체다. public 제출 또는 release asset 후보는 다음 파일만 포함한다.

- `.claude-plugin/plugin.json`
- `skills/hyper-waterfall/SKILL.md`
- `README.md`
- `CHANGELOG.md`

이 후보는 MCP server, hook, background monitor, local command runner, bundled binary를 포함하지 않는다. Plugin Skill은 Hyper-Waterfall canonical 문서와 npm CLI fallback을 안내하는 discovery layer다.

## Fallback

plugin이 설치되지 않았거나 로드되지 않으면 다음 경로로 진행한다.

- `AGENTS.md`
- `CLAUDE.md`
- `.claude/skills`
- `mydocs/skills`
- `docs/agent-entrypoint.md`
- `npx hyper-waterfall@0.2.0 --help`

이 framework 저장소 자체에서 fallback을 검증할 때는 package name이 같아 local package resolution이 끼어들 수 있다. 그 경우 `/private/tmp`처럼 package root 밖에서 같은 명령을 확인한다.

fallback은 절차를 단순화하는 예외가 아니다. 파일 변경 전 승인, 이슈 추적, 수행계획서, 구현계획서, Stage 보고서, 최종 보고서, PR 흐름은 그대로 유지한다.

## Hook policy

이 후보에는 `hooks/hooks.json`이 없다. `PermissionRequest` 자동 allow, persistent permission update, mode 변경, 자동 질의 응답은 Hyper-Waterfall 승인 게이트와 충돌할 수 있으므로 기본 후보에서 제외한다.

Hook guardrail이 필요하면 별도 승인 항목에서 좁은 범위의 report-only 또는 deny 후보로 검토한다.

## Public distribution

이 후보는 source-managed local/zip candidate이다. public marketplace 배포와 release asset 생성은 작업지시자 별도 승인 후 판단한다.

공식 Claude plugin directory 제출 후보는 Claude.ai 또는 Console submission form에 GitHub link나 zip upload로 제출한다. 제출 전 `claude plugin validate plugins/claude/hyper-waterfall`을 통과해야 한다.

GitHub Release asset 후보는 `v0.2.0` release에 부착하는 zip 보조 산출물로만 취급한다. asset 게시, 삭제, 교체는 외부 공개 action이므로 별도 승인 전 실행하지 않는다.
