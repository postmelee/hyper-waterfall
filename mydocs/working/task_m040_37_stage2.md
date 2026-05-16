# Task #37 Stage 2 보고서 - Codex bundle 구조와 canonical 참조 방식 검증

GitHub Issue: [#37](https://github.com/postmelee/hyper-waterfall/issues/37)
구현계획서: [`task_m040_37_impl.md`](../plans/task_m040_37_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Stage 1에서 확인한 Codex plugin 공식 사양을 바탕으로 `.codex-plugin/plugin.json` 후보 구조, plugin root 내부 component path, Skill/manual/agent-entrypoint/npm CLI 참조 방식, fallback 정책을 검증하는 단계다.

이번 단계에서는 실제 plugin bundle이나 marketplace 파일을 만들지 않고, #38에서 생성할 수 있는 후보 구조를 static validation 문서로 고정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md` | Codex plugin 후보 파일 트리, manifest 후보, thin wrapper Skill 후보, canonical 참조 방식, fallback 정책, local marketplace 후보, static validation 결과 작성 |
| `mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md` | Stage 2 반영 결과를 추가해 thin wrapper 1차 후보와 release snapshot 2차 후보를 명시 |
| `mydocs/working/task_m040_37_stage2.md` | Stage 2 단계 보고서 작성 |
| `mydocs/orders/20260516.md` | #37 비고를 Stage 2 완료 후 승인 대기 상태로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

새 packaging validation 기술 문서와 단계 보고서를 추가했고, Stage 1 inventory에는 Stage 2 반영 요약만 덧붙였다. 기존 `docs/`, `templates/mydocs/skills`, `templates/mydocs/manual` 본문은 변경하지 않았다.

## 검증 결과

실행 명령:

```bash
rg -n 'canonical|manifest|migration|templates/mydocs/skills|templates/mydocs/manual|agent-entrypoint|npm CLI|fallback|bundle|\\.codex-plugin|plugin.json|skills' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md
rg -n '진실 원천|별도 진실 원천|복제|참조|release snapshot|thin wrapper|fallback|component path|plugin root' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md
git diff --check
```

결과:

- OK: packaging validation 문서에서 canonical, manifest, migration, `templates/mydocs/skills`, `templates/mydocs/manual`, agent-entrypoint, npm CLI, fallback, bundle, `.codex-plugin`, `plugin.json`, skills 관련 항목이 확인됐다.
- OK: 진실 원천, 별도 진실 원천, 복제, 참조, release snapshot, thin wrapper, fallback, component path, plugin root 관련 항목이 확인됐다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: plugin 후보 구조는 `templates/manifest.json`, migration guide, Skill, manual의 별도 진실 원천을 만들지 않는다.
- OK: Skill 노출 방식은 thin wrapper를 1차 후보로 두며, core Skill 본문 fork를 만들지 않는다.
- OK: fallback은 AGENTS/manual/CLI 경로 복구 안내로 제한했고, 절차 본문을 plugin 전용으로 재정의하지 않았다.

## 잔여 위험

- Thin wrapper 방식은 full release snapshot보다 개별 core Skill 자동 발견성이 약할 수 있다. #38 install/load smoke에서 wrapper invocation과 skill discovery를 확인해야 한다.
- 실제 `.agents/plugins/marketplace.json`, `plugins/hyper-waterfall-codex/`, Codex restart, plugin install/load 확인은 #38 범위다.
- plugin `version`과 install-surface copy는 후보 수준이며, public 배포 후보 문구는 #38에서 최종화해야 한다.

## 다음 단계 영향

- Stage 3은 Stage 2 base manifest와 hook packaging을 분리해 검증해야 한다.
- Stage 3은 `hooks` field를 넣을지 default `hooks/hooks.json`을 사용할지, 그리고 `[features].plugin_hooks = true` opt-in 안내를 어떻게 둘지 판단해야 한다.
- Stage 4는 thin wrapper만으로 #38 진입이 가능한지, 또는 release snapshot을 요구할지 go/no-go 항목으로 정리해야 한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 - Codex hook guardrail packaging 가능성 검증으로 진행한다.
