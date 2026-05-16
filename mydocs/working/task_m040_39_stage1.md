# Task #39 Stage 1 보고서 - Claude plugin 공식 사양과 저장소 inventory

GitHub Issue: [#39](https://github.com/postmelee/hyper-waterfall/issues/39)
구현계획서: [`task_m040_39_impl.md`](../plans/task_m040_39_impl.md)
Stage: 1

## 단계 목적

Stage 1은 Claude plugin packaging 검증에 들어가기 전에 공식 Claude Code plugin/hooks 사양과 현재 저장소의 Claude 진입 구조를 inventory로 고정하는 단계다. 이번 단계에서는 Claude Code 공식 문서를 확인하고, `CLAUDE.md`, `.claude/skills`, `templates/.claude/skills`, canonical `templates/mydocs/skills`의 관계를 정리했다.

이번 단계에서는 plugin bundle 생성, hook 구현, core Skill/manual 본문 변경, #37 worktree 변경 참조를 실행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_39_claude_plugin_packaging.md` | Claude Code plugin/hooks 공식 문서 확인일과 URL, 공식 사양 요약, 현재 저장소 Claude 진입 구조 inventory, Stage 2/3 재확인 항목 작성 |
| `mydocs/orders/20260516.md` | #39 비고를 Stage 1 완료와 Stage 2 승인 대기 상태로 갱신 |
| `mydocs/working/task_m040_39_stage1.md` | Stage 1 목적, 산출물, 검증 결과, 잔여 위험, 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

신규 기술 노트와 신규 Stage 보고서를 추가했고, 오늘할일 파일의 #39 행 비고만 갱신했다. 기존 README, `docs/`, `templates/mydocs/manual`, `templates/mydocs/skills`, `CLAUDE.md`, `.claude/skills` 본문 또는 symlink는 수정하지 않았다.

공식 문서는 다음 출처를 기준으로 확인했다.

- [Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)
- [Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)
- [Hooks reference - Claude Code Docs](https://code.claude.com/docs/en/hooks)
- [Automate workflows with hooks - Claude Code Docs](https://code.claude.com/docs/en/hooks-guide)

## 검증 결과

실행 명령:

```bash
find .claude templates/.claude -maxdepth 2 -print
test -L .claude/skills && readlink .claude/skills
test -L templates/.claude/skills && readlink templates/.claude/skills
rg -n 'Claude|plugin|hook|hooks/hooks.json|확인일|URL|inventory|canonical|templates/mydocs/skills|CLAUDE.md|agent-entrypoint|#37' mydocs/tech/task_m040_39_claude_plugin_packaging.md mydocs/working/task_m040_39_stage1.md
git diff --check
```

결과:

- OK: `.claude`, `.claude/skills`, `templates/.claude`, `templates/.claude/skills`가 확인됐다.
- OK: `.claude/skills -> ../mydocs/skills`가 확인됐다.
- OK: `templates/.claude/skills -> ../mydocs/skills`가 확인됐다.
- OK: 기술 노트와 Stage 보고서에서 Claude, plugin, hook, `hooks/hooks.json`, 확인일, URL, inventory, canonical, `templates/mydocs/skills`, `CLAUDE.md`, `agent-entrypoint`, #37 관련 키워드가 확인됐다.
- OK: `git diff --check`가 출력 없이 통과했다.

추가 확인:

```bash
claude --version
```

결과:

- OK: 로컬 Claude Code version은 `2.1.111 (Claude Code)`이다.

수동 확인:

- OK: 공식 문서 URL과 확인일 `2026-05-16`이 기술 노트에 기록됐다.
- OK: 공식 문서 기준과 Task #39 해석을 표의 별도 열로 분리했다.
- OK: `.claude/skills`와 `templates/.claude/skills`가 canonical Skill 경로로 이어지는 symlink임을 확인했다.
- OK: plugin root 밖 symlink와 plugin root `CLAUDE.md`의 한계를 Stage 2 입력으로 분리했다.
- OK: `PermissionRequest`, `InstructionsLoaded`, `FileChanged`는 공식 event로 확인하되, decision control 차이를 Stage 3 재확인 항목으로 분리했다.
- OK: plugin bundle 생성, hook 구현, core Skill/manual 본문 변경을 하지 않았다.

## 잔여 위험

- Claude Code plugin과 hook 사양은 변경될 수 있다. #40 배포 후보 생성 전에는 공식 문서를 다시 확인해야 한다.
- 현재 로컬 Claude Code `2.1.111`은 공식 문서의 zip plugin local test 기준인 v2.1.128보다 낮다. #40에서 zip smoke를 요구하면 도구 업그레이드 또는 보류 판단이 필요하다.
- `PermissionRequest`는 강한 권한 제어가 가능하므로 Stage 3에서 자동 allow 금지를 명확히 하지 않으면 작업지시자 승인 게이트를 훼손할 수 있다.
- plugin cache와 path traversal 제한 때문에 현재 standalone symlink 구조를 plugin packaging에 그대로 옮기면 drift 또는 로드 실패가 생길 수 있다.

## 다음 단계 영향

- Stage 2는 `mydocs/tech/task_m040_39_claude_plugin_packaging.md`를 입력으로 `.claude-plugin/plugin.json`, `skills/`, `hooks/hooks.json` 후보 구조와 canonical drift 방지 기준을 검토한다.
- Stage 2에서는 release snapshot, thin wrapper, runtime reference 선택지를 비교하되 plugin bundle 생성 또는 install smoke 완료 처리는 하지 않는다.
- Stage 3에서는 `PreToolUse`, `PermissionRequest`, `PostToolUse`, `UserPromptSubmit`, `Stop`, `InstructionsLoaded`, `FileChanged`를 decision control과 Hyper-Waterfall 승인 게이트 기준으로 분류한다.
- #37 병렬 작업 결과는 Stage 4 시점에 main 또는 명확한 보고서로 확인되는 경우에만 비교 입력으로 사용한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 `Packaging 후보 구조와 canonical drift 검증`으로 진행한다.
