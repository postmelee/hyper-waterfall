# Task #37 Stage 1 보고서 - Codex 공식 사양과 기존 원칙 재확인

GitHub Issue: [#37](https://github.com/postmelee/hyper-waterfall/issues/37)
구현계획서: [`task_m040_37_impl.md`](../plans/task_m040_37_impl.md)
Stage: 1

## 단계 목적

Stage 1은 Codex plugin packaging 검증을 시작하기 전에 OpenAI Codex plugin/hooks 공식 사양과 #36 공통 원칙의 Codex 관련 항목을 최신 기준으로 다시 확인하는 단계다.

이번 단계에서는 OpenAI Developer Docs MCP tool이 현재 세션에서 노출되지 않아 공식 OpenAI 도메인 문서만 fallback으로 확인했다. 확인 결과는 `mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md`에 확정, 보정, 보류 항목으로 분리했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md` | Codex plugin/hooks 공식 문서 확인일, URL, plugin structure, manifest, marketplace, hook feature flag, matcher, output semantics, #36 원칙 보정 항목 작성 |
| `mydocs/working/task_m040_37_stage1.md` | Stage 1 단계 보고서 작성 |
| `mydocs/orders/20260516.md` | #37 비고를 Stage 1 완료 후 승인 대기 상태로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

새 기술 조사 문서와 단계 보고서를 추가했다. 기존 문서는 `mydocs/orders/20260516.md`의 #37 비고 한 줄만 갱신했다. `docs/`, `templates/mydocs/skills`, `templates/mydocs/manual` 본문은 변경하지 않았다.

## 검증 결과

실행 명령:

```bash
rg -n 'Codex plugin|hooks|\\.codex-plugin|plugin_hooks|feature flag|manifest|skills|hooks/hooks.json' docs mydocs
rg -n 'OpenAI|Codex|plugin|hook|확인일|URL|공식|추론|재확인|inventory' mydocs/tech/task_m040_37_codex_plugin_specs_inventory.md mydocs/working/task_m040_37_stage1.md
git diff --check
```

결과:

- OK: Codex plugin, hooks, `.codex-plugin`, `plugin_hooks`, manifest, skills, `hooks/hooks.json` 관련 기존 문서와 Stage 1 산출물이 검색됐다.
- OK: Stage 1 기술 조사와 보고서에서 OpenAI 공식 문서, 확인일, URL, 추론, 재확인, inventory 키워드가 확인됐다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: 공식 문서 URL과 확인일은 기술 조사 문서의 조사 대상과 참고 링크에 남겼다.
- OK: 공식 문서로 확인한 항목, #36에서 온 기존 원칙, 이번 task에서 보정한 항목을 구분했다.
- OK: Codex 사양이 불명확하거나 실제 install/load가 필요한 항목은 Stage 2-4 또는 #38 인계 항목으로 남겼다.

## 잔여 위험

- OpenAI Developer Docs MCP tool이 현재 세션에서 노출되지 않아 공식 문서 확인은 `developers.openai.com` fallback browse로 수행했다.
- Codex plugin/hooks 사양은 계속 변동될 수 있다. #38에서 배포 후보 생성 전 재확인이 필요하다.
- Stage 1은 사양 inventory 단계이며 실제 `.codex-plugin/plugin.json` 후보 구조 검증은 Stage 2에서 진행한다.

## 다음 단계 영향

- Stage 2는 plugin root 밖의 `templates/mydocs/skills`를 manifest path로 직접 참조하는 방식을 제외하고, release snapshot 또는 thin wrapper 중심으로 검증해야 한다.
- Stage 3은 일반 hooks feature key `hooks`와 plugin-bundled hooks feature key `plugin_hooks`를 구분해야 한다.
- Stage 3은 `PermissionRequest`의 자동 allow를 Hyper-Waterfall guardrail 후보에서 제외하고, deny 또는 no-decision normal approval flow 중심으로 검토해야 한다.
- Stage 4는 local marketplace, Codex restart, install/load smoke를 #38 인계 조건으로 분리해야 한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 - Codex bundle 구조와 canonical 참조 방식 검증으로 진행한다.
