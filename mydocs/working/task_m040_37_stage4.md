# Task #37 Stage 4 보고서 - local 검증 가능성, go/no-go, 후속 인계 정리

GitHub Issue: [#37](https://github.com/postmelee/hyper-waterfall/issues/37)
구현계획서: [`task_m040_37_impl.md`](../plans/task_m040_37_impl.md)
Stage: 4

## 단계 목적

Stage 4는 Stage 1-3의 Codex plugin packaging 검증 결과를 종합해 local install/load smoke 가능성, public 배포 전 go/no-go, #38 인계 조건을 정리하는 단계다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md` | Codex CLI local marketplace 명령 확인 결과, go/no-go matrix, #38 인계 조건, 보류 조건 추가 |
| `docs/plugin-distribution-principles.md` | Codex plugin-bundled hook feature key를 `[features].plugin_hooks = true`로 명확화하고 `codex_hooks` deprecated alias 주의 추가 |
| `mydocs/working/task_m040_37_stage4.md` | Stage 4 단계 보고서 작성 |
| `mydocs/report/task_m040_37_report.md` | Task #37 최종 보고서 작성 |
| `mydocs/orders/20260516.md` | #37 비고를 Stage 4 및 최종 보고서 승인 대기 상태로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

Stage 4는 기존 validation 기술 문서에 go/no-go와 #38 인계 조건을 추가했다. 공통 원칙 문서는 Codex hook feature key 표현만 좁게 보정했다. core Skill, manual, manifest, migration guide 본문은 변경하지 않았다.

## 검증 결과

실행 명령:

```bash
codex --version
codex plugin --help
codex plugin marketplace --help
codex plugin marketplace add --help
rg -n 'go/no-go|#38|install|load|smoke|보류|후속|public 배포|bundle 생성|hook 활성화' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md mydocs/report/task_m040_37_report.md
rg -n 'Codex plugin packaging|#37|guardrail|\\.codex-plugin|plugin.json|fallback' docs/plugin-distribution-principles.md docs/distribution-channels.md mydocs/report/task_m040_37_report.md
git diff --check
```

결과:

- OK: `codex --version`이 `codex-cli 0.131.0-alpha.9`를 출력했다.
- OK: `codex plugin --help`에서 `marketplace` 하위 명령이 확인됐다.
- OK: `codex plugin marketplace --help`에서 `add`, `upgrade`, `remove` 하위 명령이 확인됐다.
- OK: `codex plugin marketplace add --help`에서 local marketplace root directory를 source로 받을 수 있음이 확인됐다.
- OK: `go/no-go`, `#38`, install/load smoke, 보류, 후속, public 배포, bundle 생성, hook 활성화 관련 항목이 validation 문서와 최종 보고서에서 확인됐다.
- OK: Codex plugin packaging, #37, guardrail, `.codex-plugin`, `plugin.json`, fallback 관련 항목이 공통 원칙 문서, 배포 문서, 최종 보고서에서 확인됐다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: #38에서 실제 배포 후보를 만들 수 있는 조건과 아직 수정해야 할 조건을 go/no-go matrix로 구분했다.
- OK: 공통 원칙 문서 보정은 #36의 canonical 원칙과 충돌하지 않고 Codex plugin-bundled hook feature key만 명확히 했다.
- OK: 최종 보고서는 issue #37 수용 기준과 검증 기준을 대응한다.

## 잔여 위험

- 실제 plugin bundle 생성, marketplace 등록, Codex restart, install/load smoke는 #38 범위라 아직 실행하지 않았다.
- Codex CLI help 확인 시 sandbox PATH 업데이트 warning이 있었지만 명령 출력은 확인됐다.
- Hook guardrail은 2차 opt-in 후보일 뿐이며 구현, fixture test, trust review 안내는 아직 없다.

## 다음 단계 영향

- 최종 보고서 승인 후 PR 게시 절차로 진행한다.
- #38은 hook 없는 thin wrapper bundle을 1차 후보로 생성하고 install/load smoke를 수행한다.
- hook 포함 smoke는 #38에서 별도 승인 항목으로 분리하거나 후속 이슈로 넘긴다.

## 승인 요청

- Stage 4 산출물과 최종 보고서 검증 결과를 승인하면 최종 PR 게시 절차로 진행한다.
