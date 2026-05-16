# Task #38 Stage 1 보고서 - 사양과 smoke 환경 재확인

GitHub Issue: [#38](https://github.com/postmelee/hyper-waterfall/issues/38)
구현계획서: [`task_m040_38_impl.md`](../plans/task_m040_38_impl.md)
Stage: 1

## 단계 목적

Stage 1은 Codex plugin 배포 후보를 만들기 전에 공식 OpenAI 문서와 local Codex CLI surface를 재확인하고, #37에서 넘어온 thin wrapper, local marketplace, hook 제외, public 배포 보류 조건을 #38 실행 기준으로 고정하는 단계다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_38_codex_plugin_smoke.md` | 공식 사양 재확인, local CLI surface, #37 인계 조건, Stage 2 bundle 후보, Stage 3 marketplace command 보정 기록 |
| `mydocs/working/task_m040_38_stage1.md` | Stage 1 단계 보고서 작성 |
| `mydocs/plans/task_m040_38_impl.md` | Stage 3 조건부 marketplace add 명령을 repo root 기준으로 보정 |
| `mydocs/orders/20260516.md` | #38 비고를 Stage 1 완료 후 승인 대기 상태로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

Stage 1은 신규 기술 노트와 단계 보고서를 추가했다. 기존 구현계획서는 공식 문서 재확인 결과에 맞춰 Stage 3 조건부 명령만 좁게 보정했다. `docs/`, `templates/`, plugin bundle 파일은 아직 변경하지 않았다.

## 검증 결과

실행 명령:

```bash
codex --version
codex plugin --help
codex plugin marketplace --help
codex plugin marketplace add --help
rg -n '#38|thin wrapper|local marketplace|install/load|smoke|GO|NO-GO|hook 없는|hook 포함|public 배포' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md mydocs/report/task_m040_37_report.md
rg -n 'OpenAI|Codex|plugin|hook|확인일|URL|local marketplace|install|load|smoke|재확인' mydocs/tech/task_m040_38_codex_plugin_smoke.md mydocs/working/task_m040_38_stage1.md
git diff --check
```

결과:

- OK: `codex --version`은 `codex-cli 0.131.0-alpha.9`를 출력했다. PATH update warning은 있었지만 version 확인은 성공했다.
- OK: `codex plugin --help`에서 `marketplace` subcommand를 확인했다.
- OK: `codex plugin marketplace --help`에서 `add`, `upgrade`, `remove`를 확인했다.
- OK: `codex plugin marketplace add --help`에서 local marketplace root directory source 지원을 확인했다.
- OK: #37 validation 문서와 최종 보고서에서 #38 thin wrapper, local marketplace, install/load smoke, hook 제외, public 배포 보류 조건을 확인했다.
- OK: Stage 1 기술 노트와 보고서에서 OpenAI 공식 문서 확인, local marketplace, install/load smoke, 재확인 항목을 확인했다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: 공식 문서 확인일과 URL을 Stage 1 기술 노트에 기록했다.
- OK: #37의 hook 없는 thin wrapper GO 판단은 유지했다.
- OK: 실행하지 않은 install/load를 완료처럼 쓰지 않고 Stage 3 조건부 smoke로 분리했다.
- OK: repo marketplace의 `source.path`가 marketplace root 기준으로 해석된다는 공식 문서 기준에 맞춰 Stage 3 조건부 명령을 보정했다.

## 잔여 위험

- Stage 3의 실제 `codex plugin marketplace add .`는 local config/cache 변경 가능성이 있으므로 Stage 3 진입 시 별도 승인 항목으로 다시 확인해야 한다.
- Thin wrapper Skill의 실제 discoverability는 Stage 2 bundle 생성과 Stage 3 smoke 전에는 확인되지 않았다.
- Codex plugin/hooks 사양은 변동 가능성이 있으므로 public 배포 직전에는 한 번 더 확인해야 한다.

## 다음 단계 영향

- Stage 2는 `plugins/hyper-waterfall-codex/` 아래 hook 없는 thin wrapper bundle을 생성하면 된다.
- Stage 2 manifest의 기본 구조는 `skills: "./skills/"`, `interface.capabilities: ["Read"]`, hooks/apps/MCP 제외로 둔다.
- Stage 3 조건부 local marketplace add 명령은 repo root에서 `codex plugin marketplace add .` 후보로 다룬다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 - hook 없는 thin wrapper bundle 생성으로 진행한다.
