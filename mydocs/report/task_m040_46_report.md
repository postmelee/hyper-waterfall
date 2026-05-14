# Task #46 최종 보고서 - Homebrew core 등재 가능성 평가와 제출 준비

GitHub Issue: [#46](https://github.com/postmelee/hyper-waterfall/issues/46)
마일스톤: M040

## 작업 요약

- 대상 이슈: #46
- 마일스톤: M040
- 단계 수: 3
- 작업 목적: `hyper-waterfall`을 `brew install hyper-waterfall` 단독 명령으로 제공할 수 있는지 Homebrew core 기준에서 평가하고, 제출 보류 시 public tap 유지 근거를 문서화한다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `mydocs/plans/task_m040_46.md` | Homebrew core 제출 가능성 평가 task의 목적, 범위, 단계, 검증 계획 정리 | 작업 추적 문서 |
| `mydocs/plans/task_m040_46_impl.md` | Stage 1-3 산출물, 검증 명령, 커밋 기준 구체화 | 작업 실행 계획 |
| `mydocs/tech/task_m040_46_homebrew_core_review.md` | Homebrew 공식 기준, 현재 formula와 repository gap, 최종 보류 판단, 재검토 조건 정리 | Homebrew core 판단 근거 |
| `mydocs/working/task_m040_46_stage1.md` | Homebrew core 기준 조사 단계 보고 | 단계 기록 |
| `mydocs/working/task_m040_46_stage2.md` | 현재 formula, GitHub 지표, npm metadata, Homebrew audit/install/test 결과 보고 | 단계 기록 |
| `mydocs/working/task_m040_46_stage3.md` | 제출 가능성 판단과 문서 정합성 갱신 보고 | 단계 기록 |
| `docs/homebrew-formula-tap-poc.md` | `brew install hyper-waterfall` 단독 경로는 보류하고 public tap 경로를 유지한다고 갱신 | 배포 채널 설계 문서 |
| `docs/distribution-channels.md` | Homebrew public tap 상태와 core 제출 보류 상태 분리 | 배포 채널 전략 문서 |
| `docs/releases/v0.2.0.md` | release notes 후보와 보류 항목에 core 재검토 조건 반영 | v0.2.0 release 문서 |
| `README.md` | Homebrew 설치 안내에 public tap 유지와 core 제출 보류 상태 반영 | 사용자-facing 안내 |
| `mydocs/orders/20260514.md` | #46 진행 상태를 최종 보고 단계까지 갱신 | 오늘할일 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| Homebrew core 판단 문서 | 없음 | `mydocs/tech/task_m040_46_homebrew_core_review.md` 1개 신설 |
| 단계 보고서 | 없음 | Stage 1-3 보고서 3개 신설 |
| 작업 계획 문서 | 없음 | 수행계획서와 구현계획서 2개 신설 |
| 문서 변경량 | 해당 없음 | `origin/main..HEAD` 기준 11개 파일, 770 insertions, 10 deletions |
| 단계 커밋 | 없음 | 계획 2개 + Stage 1-3 커밋 3개 |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| `brew install hyper-waterfall` 첫 설치 지원이 public tap만으로 가능한지 결론이 명확하다 | OK - public tap은 `brew install postmelee/tap/hyper-waterfall` 경로이고, 단독 `brew install hyper-waterfall`은 Homebrew core 등재가 필요하다고 문서화했다. |
| Homebrew core 등재 가능/보류 판단과 근거가 문서화된다 | OK - 최종 판단은 `보류`이며, notability, non-author usage, x86_64 macOS/Linux 검증, stronger formula test gap을 근거로 남겼다. |
| 현재 formula가 core 요구사항과 충돌하는 지점이 항목별로 정리된다 | OK - `mydocs/tech/task_m040_46_homebrew_core_review.md`의 gap matrix에 stable release, license, supported platforms, notability, test block 등을 정리했다. |
| core 제출 진행 시 필요한 사전 작업과 승인 게이트가 분리된다 | OK - core 제출 재검토 조건과 별도 이슈/수행계획서/작업지시자 승인 필요성을 명시했다. |
| core 제출 보류 시 public tap 설치 안내를 유지하는 이유가 정리된다 | OK - README와 배포 문서에서 public tap은 현재 지원 설치 경로로 유지하고 core 제출만 보류한다고 정리했다. |
| `git diff --check`가 경고 없이 통과한다 | OK - 최종 보고서 작성 전 통합 검증에서 통과했다. |

### 단계별 검증 결과

- Stage 1: `mydocs/working/task_m040_46_stage1.md`에 Homebrew 공식 문서 확인일, core/tap 차이, 조사 키워드 검증 결과를 기록했다.
- Stage 2: `mydocs/working/task_m040_46_stage2.md`에 GitHub repository 지표, public tap formula, npm metadata, `brew audit`, source install, `brew test` 결과를 기록했다.
- Stage 3: `mydocs/working/task_m040_46_stage3.md`에 core 제출 보류 판단, public tap 안내 유지, 문서 정합성 검증 결과를 기록했다.

## 잔여 위험과 후속 작업

### 잔여 위험

- Homebrew 정책과 notability 판단은 시간이 지나면 바뀔 수 있다. core 제출 재검토 직전 공식 문서와 repository 지표를 다시 확인해야 한다.
- 현재 검증은 macOS arm64에서 수행됐다. x86_64 macOS와 x86_64 Linux 검증 증거는 아직 없다.
- formula test는 smoke 수준이다. core 제출을 다시 추진할 경우 실제 CLI 동작에 대한 더 강한 assertion이 필요하다.

### 후속 작업 후보

- Homebrew core 제출 재검토 준비: notability 또는 non-author usage 증거 확보, x86_64 macOS/Linux build/test 증거 확보, formula test 보강.
- Homebrew public tap 운영 자동화: release마다 formula URL, version, SHA256 갱신을 검증하는 별도 workflow 검토.

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 승인하면 PR 게시 절차로 진행한다.
