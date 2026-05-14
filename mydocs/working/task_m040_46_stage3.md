# Task #46 Stage 3 보고서 - Homebrew core 제출 판단 문서화

GitHub Issue: [#46](https://github.com/postmelee/hyper-waterfall/issues/46)
구현계획서: [`task_m040_46_impl.md`](../plans/task_m040_46_impl.md)
Stage: 3

## 단계 목적

Stage 3은 Stage 1/2의 공식 기준과 gap matrix를 근거로 Homebrew core 제출 가능성을 결론내고, 배포 문서에서 Homebrew core와 public tap 상태가 혼동되지 않도록 정리하는 단계다.

이번 단계의 결론은 `보류`다. 현재 formula는 public tap 기준 audit/build/test를 통과하지만, Homebrew core 제출에는 notability, non-author usage, 전체 지원 플랫폼 검증, stronger formula test 근거가 부족하다.

Homebrew core PR 생성, reviewer 커뮤니케이션, public tap 변경, npm 재배포는 실행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_46_homebrew_core_review.md` | Stage 3 최종 판단 추가: core 제출 보류, public tap 경로 유지, 재검토 조건 정리 |
| `docs/homebrew-formula-tap-poc.md` | #46 결과를 반영해 `brew install hyper-waterfall` 단독 경로는 보류하고 public tap 경로를 유지한다고 갱신 |
| `docs/distribution-channels.md` | Homebrew 채널 판단, 우선순위, 보류 항목에서 core 제출 보류 상태 반영 |
| `README.md` | Homebrew 설치 안내에서 core 제출 보류와 public tap 유지 상태 반영 |
| `docs/releases/v0.2.0.md` | release notes 후보와 보류 항목에서 core 제출 재검토 조건 반영 |
| `mydocs/orders/20260514.md` | #46 비고를 Stage 3 완료와 최종 보고 대기 상태로 갱신 |
| `mydocs/working/task_m040_46_stage3.md` | Stage 3 목적, 산출물, 검증 결과, 잔여 위험 기록 |

## 본문 변경 정도 / 본문 무손실 여부

기존 Homebrew public tap 안내와 canonical 책임 경계는 유지했다. 새로 반영한 내용은 `#46`의 core 제출 판단 결과이며, 기존 지원 설치 경로 `brew install postmelee/tap/hyper-waterfall`을 제거하거나 바꾸지 않았다.

`brew install hyper-waterfall` 단독 경로는 현재 지원 경로로 쓰지 않고, Homebrew core 제출 보류 상태로 명확히 분리했다.

## 검증 결과

실행 명령:

```bash
rg -n 'brew install hyper-waterfall|postmelee/tap/hyper-waterfall|homebrew/core|Homebrew core|notability|보류|조건부|제출|public tap' docs mydocs README.md
rg -n 'core|tap|wrapper|canonical|manifest|migration|checksum' docs/homebrew-formula-tap-poc.md docs/distribution-channels.md README.md docs/releases/v0.2.0.md
git diff --check
```

결과:

- OK: README, `docs/homebrew-formula-tap-poc.md`, `docs/distribution-channels.md`, `docs/releases/v0.2.0.md`, `mydocs/tech/task_m040_46_homebrew_core_review.md`에서 `brew install hyper-waterfall`, `postmelee/tap/hyper-waterfall`, Homebrew core, notability, 보류, public tap 관련 문구가 확인됐다.
- OK: Homebrew formula가 canonical 기준이 아니라 npm CLI 설치 wrapper라는 경계가 유지됐다.
- OK: manifest, migration, checksum 문구는 Homebrew가 canonical 기준을 대체하지 않는 맥락으로만 남아 있다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: Stage 3 결론은 `보류`로 명확하다.
- OK: public tap 설치 경로를 기본 안내로 유지한다.
- OK: Homebrew core PR 생성 또는 reviewer 커뮤니케이션을 실행한 것처럼 표현하지 않았다.
- OK: 실제 Homebrew core PR 생성은 별도 이슈, 계획서, 승인 대상으로 분리했다.

## 잔여 위험

- Homebrew 정책과 GitHub 지표는 시간이 지나면 바뀔 수 있다. core 제출을 재검토하려면 공식 문서와 notability 지표를 다시 확인해야 한다.
- x86_64 macOS/Linux 검증과 stronger formula test는 아직 작성하지 않았다. 이들은 core 재검토 전 별도 준비 항목이다.
- release마다 formula URL/SHA256을 갱신하는 운영 자동화는 이번 task 범위가 아니다.

## 다음 단계 영향

- 모든 Stage가 완료됐다. 다음 단계는 `task-final-report` 절차로 최종 결과보고서 작성, 오늘할일 완료 처리, 최종 검증, PR 게시 준비를 진행하는 것이다.
- 최종 보고서에서는 Homebrew core 제출 보류, public tap 유지, 재검토 조건을 핵심 결론으로 인계한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 최종 보고 단계로 진행한다.
