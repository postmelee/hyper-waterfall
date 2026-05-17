# Task M040 #60 Stage 2 완료 보고서

GitHub Issue: [#60](https://github.com/postmelee/hyper-waterfall/issues/60)
구현계획서: [`task_m040_60_impl.md`](../plans/task_m040_60_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Stage 1에서 확정한 `공식 문서 루트`와 `문서 위치 판단` 정책을 실제 산출물 템플릿과 에이전트 진입 규칙에 반영하는 단계다. 문서 생성, 이동, 수정이 있는 task는 계획서에서 위치를 판단하고, 구현계획서와 최종 보고서에서 실제 산출물 위치가 계획과 맞는지 확인하도록 보강했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/mydocs/_templates/task_plan.md` | `문서 위치 판단` 섹션 추가. 공식 문서 루트 이름을 고정하지 않고 선택 이유를 계획서에서 승인받도록 명시 |
| `templates/mydocs/_templates/task_impl_plan.md` | `문서 위치 확인` 섹션 추가. 수행계획서의 위치 판단과 Stage 산출물 경로 일치 여부 확인 |
| `templates/mydocs/_templates/final_report.md` | `문서 위치 검증` 섹션 추가. 계획된 위치와 실제 위치 비교 결과 기록 |
| `docs/agent-entrypoint.md` | 신규 적용 중 공식 문서 루트를 선택하거나 생성하지 않고 별도 task 후보로만 남기도록 보강 |
| `templates/AGENTS.md` | 제품/사용자/API/아키텍처/로드맵 문서 생성, 이동, 수정 시 문서 위치 판단 승인 규칙 추가 |
| `templates/CLAUDE.md` | Claude Code도 AGENTS의 문서 위치 판단과 공식 문서 루트 경계를 따른다는 문구 추가 |
| `mydocs/orders/20260518.md` | #60 상태를 Stage 2 진행으로 갱신 |
| `mydocs/working/task_m040_60_stage2.md` | Stage 2 검증과 잔여 위험 기록 |

## 본문 변경 정도 / 본문 무손실 여부

템플릿의 기존 필수 섹션은 제거하지 않았다. 수행계획서, 구현계획서, 최종 보고서에 문서 위치 관련 섹션을 추가했고, 기존 검증/커밋/승인 구조는 유지했다.

`docs/agent-entrypoint.md`는 신규 적용 범위 제한의 기존 guardrail을 유지하면서, 공식 문서 루트 이름도 신규 적용 단계에서 선택하지 않는다는 점만 추가했다. `templates/manifest.json`은 수정하지 않았다.

## 검증 결과

실행 명령:

```bash
rg -n "문서 위치|공식 문서|docs/|specs/|site/|website/|adr/" templates/mydocs/_templates docs/agent-entrypoint.md templates/AGENTS.md templates/CLAUDE.md
rg -n "docs/|specs/|site/|website/|adr/" templates/manifest.json
rg -n '"target": "(docs|specs|site|website|adr)' templates/manifest.json || true
git diff --check
```

결과:

- OK: `task_plan.md`에 `문서 위치 판단` 섹션이 추가됐고, `docs/`, `specs/`, `site/`, `website/`, `adr/` 등은 예시이며 선택 이유를 승인받아야 한다는 문구가 확인됐다.
- OK: `task_impl_plan.md`와 `final_report.md`에 각각 `문서 위치 확인`, `문서 위치 검증` 섹션이 확인됐다.
- OK: `docs/agent-entrypoint.md`, `templates/AGENTS.md`, `templates/CLAUDE.md`에서 신규 적용 중 공식 문서 루트 선택 금지와 문서 위치 판단 승인 규칙이 확인됐다.
- OK: `templates/manifest.json`의 broad 검색은 기존 `forbiddenTargetsOnAdoption`의 `docs/**`와 `mydocs/*` target만 표시했다.
- OK: `templates/manifest.json`에서 `target`이 `docs`, `specs`, `site`, `website`, `adr`로 시작하는 자동 생성 항목은 없었다.
- OK: `git diff --check`가 경고 없이 통과했다.

## 잔여 위험

- Stage 3에서 README의 문서 구조 설명이 새 템플릿과 모순되지 않도록 짧게 보강해야 한다.
- README에 공식 문서 루트 예시를 넣을 때 `docs/`가 기본값처럼 읽히지 않도록 주의해야 한다.

## 다음 단계 영향

- Stage 3은 README에 `mydocs/` 작업 기억 체계와 대상 프로젝트 공식 문서 루트 비고정 원칙을 요약한다.
- 최종 보고서에서는 이번 task 자체가 템플릿과 매뉴얼을 수정하는 문서 task이므로, 새 `문서 위치 검증` 섹션을 실제로 사용해야 한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3으로 진행한다.
