# Task #36 Stage 2 보고서 - plugin canonical 배포 원칙 문서화

GitHub Issue: [#36](https://github.com/postmelee/hyper-waterfall/issues/36)
구현계획서: [`task_m040_36_impl.md`](../plans/task_m040_36_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Stage 1 inventory를 바탕으로 Codex/Claude plugin이 공유해야 할 canonical/package 원칙을 문서화하는 단계다. 이번 단계에서는 `docs/plugin-distribution-principles.md`를 새로 작성해 canonical source, plugin 책임 경계, bundle 포함/참조/fallback 분류, Skill/manual/agent-entrypoint/npm CLI 책임 표, 도구별 packaging 차이를 정리했다.

hook guardrail의 세부 차단 정책, adapter payload 구조, block/warn/report-only 분류는 Stage 3 범위로 남겼다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/plugin-distribution-principles.md` | Codex/Claude plugin 공통 목적과 비목표, canonical source 표, 책임 경계, bundle 분류 기준, 공통 bundle 원칙, 도구별 packaging 차이, 참조/fallback 예시, #37-#40 입력 작성 |
| `mydocs/tech/task_m040_36_plugin_specs_inventory.md` | Stage 2 반영 결과를 추가해 원칙 문서로 고정한 항목과 Stage 3 인계 항목을 기록 |
| `mydocs/orders/20260516.md` | #36 비고를 Stage 2 완료와 Stage 3 승인 대기 상태로 갱신 |
| `mydocs/working/task_m040_36_stage2.md` | Stage 2 목적, 산출물, 검증 결과, 잔여 위험 기록 |

## 본문 변경 정도 / 본문 무손실 여부

신규 원칙 문서와 신규 Stage 보고서를 추가했고, 기존 기술 노트에는 Stage 2 반영 결과만 덧붙였다. 오늘할일 파일은 #36 행의 비고만 갱신했다.

`docs/distribution-channels.md`, README, `docs/agent-entrypoint.md`, `templates/mydocs/manual`, `templates/mydocs/skills` 본문은 수정하지 않았다. 이들 연계 문서 갱신은 구현계획서상 Stage 4 범위다.

## 검증 결과

실행 명령:

```bash
rg -n 'canonical|manifest|migration|templates/mydocs/skills|templates/mydocs/manual|agent-entrypoint|npm CLI|fallback|bundle' docs/plugin-distribution-principles.md
rg -n '진실 원천|별도 진실 원천|복제|참조|fallback|포함|책임 경계' docs/plugin-distribution-principles.md
git diff --check
```

결과:

- OK: 신규 원칙 문서에서 canonical, manifest, migration, `templates/mydocs/skills`, `templates/mydocs/manual`, agent-entrypoint, npm CLI, fallback, bundle 관련 항목이 확인됐다.
- OK: 신규 원칙 문서에서 진실 원천, 별도 진실 원천 금지, 복제 금지, 참조, fallback, 포함, 책임 경계 관련 항목이 확인됐다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: plugin이 GitHub Release/tag, `templates/manifest.json`, migration guide 기준을 재정의하지 않는다고 명시했다.
- OK: Skill과 manual의 진실 원천을 `templates/mydocs/skills`, `templates/mydocs/manual`로 유지했다.
- OK: 공통 원칙은 Codex/Claude 각각의 manifest와 path 차이를 인정하되, 특정 도구 구현 세부로 치우치지 않도록 "책임 경계"와 "후속 packaging 검증 입력"으로 분리했다.
- OK: hook 상세 guardrail 정책은 Stage 3으로 남기고, Stage 2 문서에서는 opt-in 보조 계층이라는 경계만 다뤘다.

## 잔여 위험

- `docs/plugin-distribution-principles.md`는 아직 `docs/distribution-channels.md`나 README에서 링크되지 않았다. 이 연결은 Stage 4에서 처리한다.
- hook 관련 표현은 최소 경계만 남겼다. Stage 3에서 승인 자동화 금지와 adapter 분리 기준을 구체화해야 한다.
- plugin에 core Skill을 포함할지 thin wrapper만 둘지는 Stage 2 원칙상 선택지를 열어둔 상태다. #37/#39 packaging 검증에서 실제 bundle 구조를 결정해야 한다.

## 다음 단계 영향

- Stage 3은 `docs/plugin-distribution-principles.md`의 "Stage 3로 넘기는 항목"을 기준으로 hook guardrail 후보, block/warn/report-only 분류, Codex/Claude adapter 분리 기준을 작성한다.
- Stage 4는 원칙 문서를 `docs/distribution-channels.md`와 필요한 문서에 연결하고 #37-#40용 최종 checklist를 정리한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 `hook guardrail와 adapter 분리 기준 작성`으로 진행한다.
