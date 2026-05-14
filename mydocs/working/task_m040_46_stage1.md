# Task #46 Stage 1 보고서 - Homebrew core 기준 조사

GitHub Issue: [#46](https://github.com/postmelee/hyper-waterfall/issues/46)
구현계획서: [`task_m040_46_impl.md`](../plans/task_m040_46_impl.md)
Stage: 1

## 단계 목적

Stage 1은 Homebrew core 제출 가능성을 판단하기 전에 공식 기준과 적용 프레임을 고정하는 단계다. 이번 단계에서는 Homebrew 공식 문서를 확인하고, public tap과 `homebrew/core`의 차이, Stage 2에서 채울 gap matrix, Stage 3의 결론 분기 기준을 문서화했다.

Homebrew core PR 생성, reviewer 커뮤니케이션, public tap 변경, npm 재배포는 실행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_46_homebrew_core_review.md` | 공식 문서 확인일, core/tap 차이, Stage 2 gap matrix, Stage 3 판단 기준, 승인 게이트 작성 |
| `mydocs/orders/20260514.md` | #46 비고를 Stage 1 완료와 Stage 2 승인 대기 상태로 갱신 |
| `mydocs/working/task_m040_46_stage1.md` | Stage 1 목적, 산출물, 검증 결과, 잔여 위험 기록 |

## 본문 변경 정도 / 본문 무손실 여부

신규 기술 노트와 신규 Stage 보고서를 추가했다. 기존 본문 문서는 수정하지 않았고, 오늘할일 파일은 #46 행의 비고만 갱신했다.

공식 문서는 다음 Homebrew 문서를 기준으로 확인했다.

- [Acceptable Formulae](https://docs.brew.sh/Acceptable-Formulae)
- [Formula Cookbook](https://docs.brew.sh/Formula-Cookbook)
- [Node for Formula Authors](https://docs.brew.sh/Node-for-Formula-Authors)
- [How to Open a Homebrew Pull Request](https://docs.brew.sh/How-To-Open-a-Homebrew-Pull-Request)
- [Taps](https://docs.brew.sh/Taps)
- [How to Create and Maintain a Tap](https://docs.brew.sh/How-to-Create-and-Maintain-a-Tap)

## 검증 결과

실행 명령:

```bash
rg -n 'Homebrew|homebrew/core|core|tap|formula|brew install hyper-waterfall|postmelee/tap' docs mydocs README.md
rg -n 'Acceptable Formulae|Formula Cookbook|Node for Formula Authors|How To Open a Homebrew Pull Request|notability|self-submitted|public tap|homebrew/core' mydocs/tech/task_m040_46_homebrew_core_review.md mydocs/working/task_m040_46_stage1.md
git diff --check
```

결과:

- OK: README, `docs/homebrew-formula-tap-poc.md`, `docs/distribution-channels.md`, 기존 #34/#35 산출물, 신규 `task_m040_46_homebrew_core_review.md`에서 Homebrew/core/tap/formula 관련 키워드가 확인됐다.
- OK: 신규 기술 노트에서 `Acceptable Formulae`, `Formula Cookbook`, `Node for Formula Authors`, `How to Open a Homebrew Pull Request`, `notability`, `self-submitted`, `public tap`, `homebrew/core` 기준이 확인됐다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: 공식 문서 URL과 확인일 `2026-05-14`가 기술 노트에 기록됐다.
- OK: public tap smoke 통과와 Homebrew core readiness를 같은 기준으로 취급하지 않고 분리했다.
- OK: `brew install hyper-waterfall` 단독 첫 설치는 core 등재 필요 여부로 판단하고, 현재 지원 경로는 `brew install postmelee/tap/hyper-waterfall`로 분리했다.
- OK: Homebrew core PR 생성이나 외부 커뮤니케이션은 실행하지 않았다.

## 잔여 위험

- Homebrew 정책과 reviewer 판단은 변동될 수 있다. Stage 3에서 최종 결론을 내더라도 실제 core PR 직전에는 공식 문서를 다시 확인해야 한다.
- notability, self-submitted threshold, non-author usage, supported platform 검증은 Stage 2에서 실제 데이터를 채워야 한다.

## 다음 단계 영향

- Stage 2는 `mydocs/tech/task_m040_46_homebrew_core_review.md`의 gap matrix를 기준으로 현재 repository 지표, public tap formula, npm tarball, audit/test 상태를 채운다.
- Stage 2에서 Homebrew install/test를 실행하면 로컬 Homebrew 상태가 바뀔 수 있으므로 cleanup 결과를 함께 기록해야 한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 `현재 formula와 프로젝트 상태 gap 분석`으로 진행한다.
