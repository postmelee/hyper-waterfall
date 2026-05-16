# Task #36 Stage 3 보고서 - hook guardrail 원칙 문서화

GitHub Issue: [#36](https://github.com/postmelee/hyper-waterfall/issues/36)
구현계획서: [`task_m040_36_impl.md`](../plans/task_m040_36_impl.md)
Stage: 3

## 단계 목적

Stage 3은 Codex/Claude plugin 공통 배포 원칙에 hook guardrail와 adapter 분리 기준을 추가하는 단계다. 이번 단계에서는 hook이 작업지시자 승인을 대체하지 않는다는 원칙, 객관 상태 기반 guardrail 후보, block/warn/report-only 등급, Codex/Claude adapter 책임, fallback 동작을 문서화했다.

이번 단계에서는 hook 구현 코드, hook JSON, plugin bundle 파일을 만들지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/plugin-distribution-principles.md` | hook guardrail 원칙, guardrail 후보, block/warn/report-only 등급, adapter 분리 기준, fallback 동작, Stage 4 인계 항목 추가 |
| `mydocs/tech/task_m040_36_plugin_specs_inventory.md` | Stage 3 반영 결과와 hook 구현 제외 사실 기록 |
| `mydocs/orders/20260516.md` | #36 비고를 Stage 3 완료와 Stage 4 승인 대기 상태로 갱신 |
| `mydocs/working/task_m040_36_stage3.md` | Stage 3 목적, 산출물, 검증 결과, 잔여 위험 기록 |

## 본문 변경 정도 / 본문 무손실 여부

기존 원칙 문서에 Stage 3 범위의 hook guardrail 섹션을 추가했다. Stage 2에서 작성한 canonical/package 원칙은 유지했고, Stage 3로 남겨둔 항목을 Stage 4 인계 항목으로 교체했다.

기술 노트에는 Stage 3 반영 결과만 덧붙였고, 오늘할일 파일은 #36 행의 비고만 갱신했다.

## 검증 결과

실행 명령:

```bash
rg -n 'hook|guardrail|승인|자동|adapter|차단|경고|report-only|publish|merge|close|위험 명령' docs/plugin-distribution-principles.md
rg -n '이슈 없는 구현|승인 전 파일 수정|단계 보고|작업지시자 승인|객관 상태|payload|adapter' docs/plugin-distribution-principles.md
git diff --check
```

결과:

- OK: 원칙 문서에서 hook, guardrail, 승인 자동화 금지, adapter, 차단, 경고, report-only, publish/merge/close, 위험 명령 관련 항목이 확인됐다.
- OK: 이슈 없는 구현, 승인 전 파일 수정, 단계 보고 누락, 작업지시자 승인, 객관 상태, payload, adapter 분리 기준이 확인됐다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: hook이 작업지시자 승인을 대체하지 않는다고 명확히 표현했다.
- OK: block 후보는 destructive action, 외부 공개 action, 객관 precondition 부재처럼 사람 대화 맥락 없이 판정 가능한 항목으로 제한했다.
- OK: 승인 맥락처럼 hook이 확정할 수 없는 항목은 warn 또는 report-only로 분류했다.
- OK: Codex/Claude hook semantics 차이를 공통 policy와 도구별 adapter 책임으로 분리했다.

## 잔여 위험

- 실제 hook payload와 output schema는 #37/#39 packaging 검증에서 다시 확인해야 한다.
- guardrail 후보는 아직 문서 원칙이며 실행 가능한 hook script가 아니다. 구현이 필요하면 별도 이슈와 승인 절차가 필요하다.
- hook 오탐과 과신 위험은 남아 있다. Stage 4에서는 문서 연결 시 hook이 보조 장치임을 유지해야 한다.

## 다음 단계 영향

- Stage 4는 `docs/plugin-distribution-principles.md`를 `docs/distribution-channels.md`와 필요한 문서에 연결한다.
- Stage 4는 #37-#40에서 재사용할 packaging 검증 checklist를 최종 형태로 정리한다.
- Stage 4에서 core Skill 또는 manual 본문 변경 필요성이 발견되면 즉시 수정하지 않고 별도 승인 항목으로 분리한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4 `연계 문서 갱신과 최종 정합성 검증`으로 진행한다.
