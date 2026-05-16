# Task #39 Stage 3 보고서 - Claude hook guardrail 적용성 분류

GitHub Issue: [#39](https://github.com/postmelee/hyper-waterfall/issues/39)
구현계획서: [`task_m040_39_impl.md`](../plans/task_m040_39_impl.md)
Stage: 3

## 단계 목적

Stage 3은 Claude hook event와 decision control을 Hyper-Waterfall guardrail 후보로 분류하는 단계다. 이번 단계에서는 `PreToolUse`, `PermissionRequest`, `PostToolUse`, `UserPromptSubmit`, `Stop`, `InstructionsLoaded`, `FileChanged`의 공식 지원 여부와 적용 한계를 정리하고, block/warn/report-only 기준을 나눴다.

이번 단계에서는 hook config, hook script, plugin bundle을 만들지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_39_claude_plugin_packaging.md` | Stage 3 반영 결과 추가: event별 decision control, handler/matcher 기준, guardrail 후보 분류, 자동 승인 금지 기준, #40 hook 포함 판단 |
| `mydocs/orders/20260516.md` | #39 비고를 Stage 3 완료와 Stage 4 승인 대기 상태로 갱신 |
| `mydocs/working/task_m040_39_stage3.md` | Stage 3 목적, 산출물, 검증 결과, 잔여 위험, 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

기존 기술 노트에 Stage 3 섹션을 추가했고, 오늘할일 파일의 #39 행 비고만 갱신했다. `docs/plugin-distribution-principles.md`, README, `docs/`, `templates/mydocs/manual`, `templates/mydocs/skills`, `CLAUDE.md`, `.claude/skills`는 수정하지 않았다.

공식 문서는 다음 출처를 기준으로 재확인했다.

- [Hooks reference - Claude Code Docs](https://code.claude.com/docs/en/hooks)
- [Automate workflows with hooks - Claude Code Docs](https://code.claude.com/docs/en/hooks-guide)

## 검증 결과

실행 명령:

```bash
rg -n 'PreToolUse|PermissionRequest|PostToolUse|UserPromptSubmit|Stop|InstructionsLoaded|FileChanged|matcher|hook|승인|자동|block|warn|report-only' mydocs/tech/task_m040_39_claude_plugin_packaging.md
rg -n '위험 명령|publish|merge|close|이슈 없는 구현|단계 보고|작업지시자 승인|객관 상태|scope|merge' mydocs/tech/task_m040_39_claude_plugin_packaging.md
git diff --check
```

결과:

- OK: 기술 노트에서 지정 event, matcher, hook, 승인, 자동, block, warn, report-only 관련 기준이 확인됐다.
- OK: 기술 노트에서 위험 명령, publish, merge, close, 이슈 없는 구현, 단계 보고, 작업지시자 승인, 객관 상태, scope, merge 관련 기준이 확인됐다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: hook은 승인 자동화가 아니라 보조 guardrail로 표현했다.
- OK: block 후보는 destructive command, publish, merge, close, force push, 구현계획서 없는 stage 산출처럼 객관적으로 판별 가능한 항목 중심으로 제한했다.
- OK: `PermissionRequest` 자동 allow, `updatedPermissions`, `setMode`를 기본 후보에서 제외했다.
- OK: `InstructionsLoaded`와 `FileChanged`는 공식 event지만 decision control이 없어 report-only로 분류했다.
- OK: 공식 문서에서 확인되지 않은 event를 구현 후보처럼 확정하지 않았다.

## 잔여 위험

- `Stop` hook은 단계 보고 누락을 막는 데 유용할 수 있지만 loop 방지와 예외 처리가 어렵다. #40 최소 후보에는 포함하지 않는 편이 안전하다.
- `PreToolUse` block rule은 command pattern이 너무 넓으면 정상 검증 명령까지 막을 수 있다. 실제 hook 구현은 좁은 위험 command부터 시작해야 한다.
- `PermissionRequest`는 강력한 permission update 기능을 제공하므로 plugin에 포함하면 운영자가 의도하지 않은 권한 변경 위험이 있다.
- report-only hook은 안전하지만 사용자가 hook warning을 무시할 수 있다. hook은 여전히 AGENTS/CLAUDE/manual 절차를 대체하지 않는다.

## 다음 단계 영향

- Stage 4는 hook 미포함 또는 report-only 기본값을 전제로 fallback 흐름과 #40 전제조건을 정리한다.
- #40 최소 후보는 thin wrapper Skill 중심으로 유지하고, blocking hook은 기본 포함하지 않는 판단을 이어받는다.
- hook을 포함하려면 위험 shell command deny 하나로 범위를 좁히고, `PermissionRequest` 자동 allow와 persistent permission update는 제외한다.
- #36 공통 원칙 문서는 이번 Stage에서 수정하지 않았으므로 Stage 4에서 최종 정합성만 확인하면 된다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4 `Fallback, 후속 #40 입력, 최종 정합성 검토`로 진행한다.
