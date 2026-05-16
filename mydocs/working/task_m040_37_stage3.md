# Task #37 Stage 3 보고서 - Codex hook guardrail packaging 가능성 검증

GitHub Issue: [#37](https://github.com/postmelee/hyper-waterfall/issues/37)
구현계획서: [`task_m040_37_impl.md`](../plans/task_m040_37_impl.md)
Stage: 3

## 단계 목적

Stage 3은 Stage 2에서 정리한 Codex bundle 후보와 분리해 Codex plugin-bundled hook guardrail을 packaging할 수 있는지 검증하는 단계다. 이번 단계는 hook 구현이 아니라 `hooks/hooks.json`, manifest `hooks` field, `plugin_hooks` opt-in 조건, event별 block/warn/report-only 후보와 한계를 문서화한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md` | Stage 3 hook packaging validation, hook config 후보, event별 guardrail matrix, output 정책, 한계, hook packaging 후보 구조 추가 |
| `mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md` | Stage 3 반영 결과 추가 |
| `mydocs/working/task_m040_37_stage3.md` | Stage 3 단계 보고서 작성 |
| `mydocs/orders/20260516.md` | #37 비고를 Stage 3 완료 후 승인 대기 상태로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

Stage 2 validation 문서에 Stage 3 hook packaging 검증 섹션을 추가했다. Stage 1 inventory에는 Stage 3 반영 요약만 덧붙였다. 기존 `docs/`, `templates/mydocs/skills`, `templates/mydocs/manual` 본문은 변경하지 않았다.

## 검증 결과

실행 명령:

```bash
rg -n 'PreToolUse|PermissionRequest|PostToolUse|UserPromptSubmit|Stop|SessionStart|feature flag|hooks/hooks.json|manifest hooks|block|warn|report-only|승인 자동' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md
rg -n '위험 명령|publish|merge|close|구현계획서|단계 보고|canonical source|비대상 도구|side effect|AGENTS|manual|Skill' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md
git diff --check
```

결과:

- OK: Stage 3 validation 문서에서 `PreToolUse`, `PermissionRequest`, `PostToolUse`, `UserPromptSubmit`, `Stop`, `SessionStart`, feature flag, `hooks/hooks.json`, manifest hooks, block, warn, report-only, 승인 자동 관련 항목이 확인됐다.
- OK: 위험 명령, publish, merge, close, 구현계획서, 단계 보고, canonical source, 비대상 도구, side effect, AGENTS, manual, Skill 관련 항목이 확인됐다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: hook은 작업지시자 승인을 대체하지 않는다고 명시했다.
- OK: `PermissionRequest` 자동 allow는 금지하고 deny 또는 no-decision normal approval flow만 후보로 뒀다.
- OK: block 후보는 위험 명령, 외부 공개 action, 객관 precondition 중심으로 제한했다.
- OK: `PostToolUse`와 `Stop`은 side effect 되돌림 수단이 아니라 warn/report-only 후보로 표현했다.
- OK: hook 기능을 public 배포의 필수 안전장치처럼 표현하지 않고 opt-in 2차 후보로 분리했다.

## 잔여 위험

- Codex hook interception은 모든 shell/tool path를 포괄하지 않는다. 특히 unified exec 계열과 WebSearch 같은 비대상 도구는 완전한 enforcement boundary가 아니다.
- 실제 hook script 구현, runtime 선택, fixture test, trust review 안내는 이번 Stage 범위가 아니다.
- hook 포함 여부를 #38 bundle smoke에 넣을지, 별도 후속 task로 분리할지는 Stage 4 go/no-go에서 결정해야 한다.

## 다음 단계 영향

- Stage 4는 #38 1차 bundle을 hook 없는 thin wrapper Skill로 둘지, hook opt-in candidate까지 포함할지 go/no-go로 분리해야 한다.
- Stage 4는 `docs/plugin-distribution-principles.md`에서 `codex_hooks` 또는 plugin hook 기본 off 표현 보정이 필요한지 확인해야 한다.
- Stage 4는 local marketplace, Codex restart, install/load smoke 조건과 hook 활성화 UX 검증 조건을 별도 인계 항목으로 정리해야 한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4 - local 검증 가능성, go/no-go, 후속 인계 정리로 진행한다.
