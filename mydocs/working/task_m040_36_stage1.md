# Task #36 Stage 1 보고서 - plugin 공식 사양과 기존 문서 inventory

GitHub Issue: [#36](https://github.com/postmelee/hyper-waterfall/issues/36)
구현계획서: [`task_m040_36_impl.md`](../plans/task_m040_36_impl.md)
Stage: 1

## 단계 목적

Stage 1은 Codex/Claude plugin 공통 배포 원칙을 작성하기 전에 공식 사양과 현재 저장소 기준을 고정하는 단계다. 이번 단계에서는 OpenAI Codex와 Claude Code의 plugin/hooks 공식 문서를 확인하고, 기존 저장소 문서의 plugin/canonical/fallback 관련 문구를 inventory로 정리했다.

이번 단계에서는 plugin bundle 생성, hook 구현, README 또는 manual 본문 변경, public 배포를 실행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_36_plugin_specs_inventory.md` | Codex/Claude plugin/hooks 공식 문서 확인일과 URL, 공식 사양 요약, 기존 문서 inventory, 확정 가능한 공통 원칙 후보, 불확실성과 후속 재확인 항목 작성 |
| `mydocs/orders/20260516.md` | #36 비고를 Stage 1 완료와 Stage 2 승인 대기 상태로 갱신 |
| `mydocs/working/task_m040_36_stage1.md` | Stage 1 목적, 산출물, 검증 결과, 잔여 위험, 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

신규 기술 노트와 신규 Stage 보고서를 추가했고, 오늘할일 파일의 #36 행 비고만 갱신했다. 기존 README, `docs/`, `templates/mydocs/manual`, `templates/mydocs/skills` 본문은 수정하지 않았다.

공식 문서는 다음 출처를 기준으로 확인했다.

- [Build plugins - Codex](https://developers.openai.com/codex/plugins/build)
- [Hooks - Codex](https://developers.openai.com/codex/hooks)
- [Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)
- [Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)
- [Hooks reference - Claude Code Docs](https://code.claude.com/docs/en/hooks)

## 검증 결과

실행 명령:

```bash
rg -n 'Codex|Claude|plugin|hook|fallback|canonical|templates/mydocs/skills|templates/mydocs/manual|agent-entrypoint' README.md docs templates/mydocs/manual templates/mydocs/skills
rg -n 'OpenAI|Codex|Anthropic|Claude|plugin|hook|확인일|URL|불확실|inventory' mydocs/tech/task_m040_36_plugin_specs_inventory.md mydocs/working/task_m040_36_stage1.md
git diff --check
```

결과:

- OK: README, `docs/distribution-channels.md`, release/migration 문서, manual, Skill 본문에서 Codex/Claude/plugin/hook/fallback/canonical/agent-entrypoint 관련 기존 문구가 확인됐다.
- OK: 신규 기술 노트와 Stage 보고서에서 OpenAI, Codex, Anthropic/Claude, plugin, hook, 확인일, URL, 불확실성, inventory 관련 키워드가 확인됐다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: 공식 문서 URL과 확인일 `2026-05-16`이 기술 노트에 기록됐다.
- OK: OpenAI/Anthropic 공식 문서에서 확인한 사실과 Task #36 해석을 표의 별도 열로 분리했다.
- OK: Codex plugin hook feature flag, Codex hook interception limitation, Claude marketplace/versioning, bundled Skill snapshot, npm CLI 호출 여부 등 불확실성을 임의 확정하지 않고 #37-#40 또는 Stage 2/3 재확인 항목으로 남겼다.
- OK: plugin bundle 생성, hook 구현, README/manual 본문 변경, public 배포를 실행하지 않았다.

## 잔여 위험

- Codex/Claude plugin과 hook 사양은 변경될 수 있다. Stage 2 원칙 문서에는 확인일을 남기고, #37-#40의 packaging 검증에서 다시 확인해야 한다.
- 공식 문서의 feature 폭이 넓어 plugin에 포함 가능한 구성 요소가 많다. Stage 2에서 Hyper-Waterfall의 canonical source와 plugin bundle 경계를 좁히지 않으면 범위가 확산될 수 있다.
- hook은 자동 실행되는 code이므로 guardrail 자체가 위험 표면이 될 수 있다. Stage 3에서 deterministic command hook, read-only 우선, block/warn/report-only 구분을 별도로 정리해야 한다.

## 다음 단계 영향

- Stage 2는 `mydocs/tech/task_m040_36_plugin_specs_inventory.md`를 입력으로 `docs/plugin-distribution-principles.md`를 작성한다.
- Stage 2에서는 canonical source, plugin 책임 경계, 포함/참조/fallback 분류, Skill/manual/agent-entrypoint/npm CLI 책임 표를 먼저 작성한다.
- hook guardrail 상세 정책은 Stage 2에서 완성하지 않고, Stage 3에서 adapter 분리 기준과 함께 작성한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 `공통 canonical/package 원칙 작성`으로 진행한다.
