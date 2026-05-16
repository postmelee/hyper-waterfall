# Task #40 Stage 1 보고서 - Claude plugin 후보 기준 재확인

GitHub Issue: [#40](https://github.com/postmelee/hyper-waterfall/issues/40)
구현계획서: [`task_m040_40_impl.md`](../plans/task_m040_40_impl.md)
Stage: 1

## 단계 목적

Stage 1은 Claude plugin 배포 후보를 실제로 만들기 전, 공식 사양과 local CLI 상태, 선행 task 인계 조건, 보류 항목을 다시 고정하는 단계다.

이번 단계에서는 plugin bundle 파일을 만들지 않았다. Stage 2에서 만들 후보 구조와 Stage 3에서 실행할 smoke 범위만 확정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_40_claude_plugin_candidate_smoke.md` | 공식 문서 재확인, local Claude Code version, `plugin validate` surface, #37/#38/#39 상태, #40 즉시 진행/보류 항목 기록 |
| `mydocs/orders/20260516.md` | #40 비고를 Stage 1 완료와 Stage 2 승인 대기 상태로 갱신 |
| `mydocs/working/task_m040_40_stage1.md` | Stage 1 목적, 산출물, 검증 결과, 잔여 위험, 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

신규 기술 기록과 신규 Stage 보고서를 작성했다. 기존 manual, core Skill, plugin 원칙 문서, #39 산출물은 수정하지 않았다.

오늘할일 파일은 #40 행의 비고만 갱신했다.

## 검증 결과

실행 명령:

```bash
claude --version
claude plugin --help
claude plugin validate --help
gh issue view 38 --json number,state,title,url
gh issue view 37 --json number,state,title,url
gh issue view 39 --json number,state,title,url
rg -n '#40|배포 후보|설치 smoke|thin wrapper|zip|public|보류' mydocs/tech/task_m040_39_claude_plugin_packaging.md mydocs/report/task_m040_39_report.md
rg -n 'Claude plugin|check matrix|#40|canonical|fallback|hook' docs/plugin-distribution-principles.md docs/distribution-channels.md
git diff --check
```

결과:

- OK: `claude --version`은 `2.1.111 (Claude Code)`를 출력했다.
- OK: `claude plugin --help`에서 `install`, `list`, `marketplace`, `uninstall`, `update`, `validate` 명령이 확인됐다.
- OK: `claude plugin validate --help`에서 path 기반 plugin 또는 marketplace manifest validation 명령이 확인됐다.
- OK: #38은 `OPEN` 상태로 확인됐다.
- OK: #37과 #39는 `CLOSED` 상태로 확인됐다.
- OK: #39 기술 기록과 최종 보고서에서 #40, 배포 후보, 설치 smoke, thin wrapper, zip, public, 보류 관련 인계 조건이 확인됐다.
- OK: `docs/plugin-distribution-principles.md`와 `docs/distribution-channels.md`에서 Claude plugin, check matrix, #40, canonical, fallback, hook 기준이 확인됐다.
- OK: `git diff --check`는 출력 없이 통과했다.

공식 문서 확인:

- [Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)
- [Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)
- [Hooks reference - Claude Code Docs](https://code.claude.com/docs/en/hooks)
- [Automate workflows with hooks - Claude Code Docs](https://code.claude.com/docs/en/hooks-guide)

확인 결과:

- OK: plugin manifest는 `.claude-plugin/plugin.json`에 둔다.
- OK: `skills/`, `commands/`, `agents/`, `hooks/` 등 component는 plugin root level에 둔다.
- OK: plugin Skill은 namespace를 사용한다.
- OK: `--plugin-dir` local directory load는 Stage 3 smoke 후보로 적합하다.
- OK: zip archive load는 Claude Code v2.1.128 이상 필요하므로 현재 local version에서는 보류한다.
- OK: `PermissionRequest` 자동 allow와 permission update는 기술적으로 가능하지만 Hyper-Waterfall 승인 게이트와 충돌하므로 기본 후보에서 제외한다.

## 잔여 위험

- local Claude Code `2.1.111`은 zip plugin smoke 요구 기준인 v2.1.128보다 낮다.
- `claude --plugin-dir`는 대화식 세션을 열 수 있으므로 Stage 3에서 비대화식 검증 경로를 우선해야 한다.
- #38이 아직 open이므로 Codex/Claude 최종 smoke 비교는 #41에서 다시 확인해야 한다.
- public marketplace 배포는 권한과 승인 조건이 남아 있으며 이번 Stage에서 실행하지 않았다.

## 다음 단계 영향

- Stage 2는 `plugins/claude/hyper-waterfall/` 아래 hook 없는 thin wrapper Skill 기반 후보만 작성한다.
- Stage 2에서는 `hooks/hooks.json`, hook script, release snapshot을 만들지 않는다.
- Stage 3은 `claude plugin validate`와 가능한 non-destructive directory load/discovery smoke를 중심으로 진행한다.
- zip smoke와 public 배포는 Stage 4의 보류 또는 별도 승인 항목으로 남긴다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
