# Task #39 Stage 2 보고서 - Claude plugin packaging 후보 구조 검증

GitHub Issue: [#39](https://github.com/postmelee/hyper-waterfall/issues/39)
구현계획서: [`task_m040_39_impl.md`](../plans/task_m040_39_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Claude plugin packaging 후보 구조와 canonical drift 방지 기준을 검증하는 단계다. 이번 단계에서는 `.claude-plugin/plugin.json`, `skills/`, `hooks/hooks.json`, local smoke 후보를 기준으로 #40에서 만들 수 있는 최소 후보와 확장 후보를 분리했다.

이번 단계에서는 실제 plugin bundle, scratch skeleton, hook config, core Skill snapshot을 만들지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_39_claude_plugin_packaging.md` | Stage 2 반영 결과 추가: packaging 제약, 최소 후보 구조, Skill 제공 방식 비교, canonical source별 취급, #40 결정 항목 |
| `mydocs/orders/20260516.md` | #39 비고를 Stage 2 완료와 Stage 3 승인 대기 상태로 갱신 |
| `mydocs/working/task_m040_39_stage2.md` | Stage 2 목적, 산출물, 검증 결과, 잔여 위험, 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

기존 Stage 1 기술 노트에 Stage 2 섹션을 추가했고, 오늘할일 파일의 #39 행 비고만 갱신했다. README, `docs/`, `templates/mydocs/manual`, `templates/mydocs/skills`, `CLAUDE.md`, `.claude/skills` 본문 또는 symlink는 수정하지 않았다.

## 검증 결과

실행 명령:

```bash
rg -n 'claude-plugin|plugin.json|skills/|hooks/hooks.json|snapshot|thin wrapper|runtime reference|진실 원천|canonical|fallback' mydocs/tech/task_m040_39_claude_plugin_packaging.md
rg -n 'templates/mydocs/skills|templates/mydocs/manual|templates/manifest.json|migration|agent-entrypoint|npm CLI|#40' mydocs/tech/task_m040_39_claude_plugin_packaging.md
git diff --check
```

결과:

- OK: 기술 노트에서 `.claude-plugin`, `plugin.json`, `skills/`, `hooks/hooks.json`, snapshot, thin wrapper, runtime reference, 진실 원천, canonical, fallback 관련 기준이 확인됐다.
- OK: 기술 노트에서 `templates/mydocs/skills`, `templates/mydocs/manual`, `templates/manifest.json`, migration, `agent-entrypoint`, npm CLI, #40 관련 기준이 확인됐다.
- OK: `git diff --check`가 출력 없이 통과했다.

추가 확인:

```bash
claude plugin --help
find templates/mydocs/skills -maxdepth 2 -name SKILL.md -print | sort
rg -n 'name:|description:|호출 방법|Claude Code' templates/mydocs/skills -g 'SKILL.md'
```

결과:

- OK: 로컬 `claude plugin --help`에서 `validate <path>` 명령이 확인됐다.
- OK: canonical core Skill은 `templates/mydocs/skills` 아래 7개 `SKILL.md`로 확인됐다.
- OK: 각 core Skill은 frontmatter `name`과 Claude Code 호출 방법을 포함한다.

수동 확인:

- OK: Stage 2 최소 후보는 thin wrapper Skill 중심이며 core Skill/manual을 별도 편집 원천으로 만들지 않는다.
- OK: release snapshot은 확장 후보로만 두고, 생성/검증 절차가 있을 때만 #40에서 다루도록 분리했다.
- OK: runtime reference와 plugin root 밖 symlink는 plugin cache/path traversal 제한 때문에 기본 후보에서 제외했다.
- OK: `hooks/hooks.json`은 Stage 3 결과 전에는 기본 후보에 넣지 않는다.
- OK: #37 병렬 산출물에 의존하는 변경을 만들지 않았다.

## 잔여 위험

- thin wrapper만으로는 plugin 단독 설치 상태에서 core Skill 본문을 모두 오프라인으로 제공하지 못한다. 이 요구가 #40에서 중요하면 release snapshot 확장 후보를 별도 승인해야 한다.
- release snapshot은 self-contained 장점이 있지만 생성/검증 자동화가 없으면 drift 위험이 크다.
- plugin 이름을 `hyper-waterfall`로 두면 wrapper Skill 이름도 `hyper-waterfall`일 때 호출명이 중복적으로 보일 수 있다. #40에서 Skill directory/name을 조정해야 한다.
- hook 포함 여부는 아직 Stage 3 결정에 의존한다. Stage 2에서는 hook을 기본 미포함으로 판단했다.

## 다음 단계 영향

- Stage 3은 `hooks/hooks.json` 포함 여부를 판단하기 위해 Claude hook event와 decision control을 block/warn/report-only 기준으로 분류한다.
- Stage 3에서는 특히 `PreToolUse`, `PermissionRequest`, `PostToolUse`, `UserPromptSubmit`, `Stop`, `InstructionsLoaded`, `FileChanged`를 작업지시자 승인 자동화 금지 원칙과 대조한다.
- #40은 최소 후보로 `.claude-plugin/plugin.json`과 thin wrapper Skill 1개를 만들 수 있지만, core Skill snapshot 또는 hook 포함은 Stage 3/4 결과와 별도 승인에 따라 결정해야 한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 `Claude hook guardrail 적용성 분류`로 진행한다.
