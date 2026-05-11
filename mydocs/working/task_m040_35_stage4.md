# Task #35 Stage 4 보고서 - Homebrew 설치 안내 문서 갱신

GitHub Issue: [#35](https://github.com/postmelee/hyper-waterfall/issues/35)
구현계획서: [`task_m040_35_impl.md`](../plans/task_m040_35_impl.md)
Stage: 4

## 단계 목적

이번 Stage의 목적은 Stage 3에서 통과한 public tap smoke 결과를 사용자-facing 문서와 배포 채널 문서에 반영하는 것이다. `brew install postmelee/tap/hyper-waterfall`을 현재 지원되는 한 줄 설치 경로로 안내하고, `brew install hyper-waterfall` 단독 경로는 Homebrew core 등재가 필요하므로 후속 이슈로 분리했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | npm CLI 안내 아래에 Homebrew public tap 설치 명령과 wrapper/canonical 경계를 추가 |
| `docs/homebrew-formula-tap-poc.md` | public tap 승인 게이트를 Task #35 결과 기준으로 갱신하고 #46 core 등재 검토를 후속 작업으로 연결 |
| `docs/distribution-channels.md` | Homebrew 상태를 public tap smoke 통과 상태로 갱신하고 core 등재 검토를 #46으로 분리 |
| `docs/releases/v0.2.0.md` | release notes 후보에 Homebrew public tap 공개 상태와 core 등재 후속 검토를 반영 |
| `mydocs/orders/20260510.md` | #35 상태를 Stage 4 완료와 최종 보고 대기로 갱신 |
| `mydocs/working/task_m040_35_stage4.md` | Stage 4 검증 결과와 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

기존 문서 구조와 기존 npm/npx 안내는 유지했다. Homebrew 관련 상태만 public tap smoke 통과 이후 상태로 보강했고, `brew install hyper-waterfall` 단독 경로는 현 지원 경로로 쓰지 않고 #46 후속 이슈로 분리했다.

## 후속 이슈 등록

사용자 요청에 따라 Homebrew core 등재 검토를 후속 이슈로 등록했다.

- [#46 Homebrew core 등재 가능성 평가와 제출 준비](https://github.com/postmelee/hyper-waterfall/issues/46)
- milestone: M040
- labels: `enhancement`, `infrastructure`

## 검증 결과

실행 명령:

```bash
rg -n 'brew tap postmelee/tap|brew install postmelee/tap/hyper-waterfall|hyper-waterfall --version|doctor --repo|Homebrew|canonical|wrapper|node' README.md docs
rg -n 'public tap|homebrew-tap|postmelee/tap|보류|승인|readiness|#46|Homebrew core' docs mydocs/tech mydocs/working mydocs/orders/20260510.md
rg -n 'manifest|migration|checksum' docs/homebrew-formula-tap-poc.md docs/distribution-channels.md README.md docs/releases/v0.2.0.md
git diff --check
```

결과:

- OK: README와 docs에서 `brew install postmelee/tap/hyper-waterfall`, `hyper-waterfall --version`, `doctor --repo`, Homebrew wrapper/canonical 경계, Node runtime 안내를 확인했다.
- OK: public tap, `homebrew-tap`, `postmelee/tap`, readiness, #46 Homebrew core 후속 이슈 연결을 확인했다.
- OK: manifest, migration, checksum 관련 문구는 Homebrew가 canonical 기준을 대체하지 않는다는 맥락으로만 남아 있음을 확인했다.
- OK: `git diff --check`는 경고 없이 통과했다.

수동 확인:

- OK: README는 `brew install hyper-waterfall` 단독 경로를 현재 지원 경로로 안내하지 않는다.
- OK: 지원되는 한 줄 설치 경로는 `brew install postmelee/tap/hyper-waterfall`로 명시했다.
- OK: `brew install hyper-waterfall` 첫 설치 지원은 #46 Homebrew core 등재 검토로 분리했다.
- OK: public tap 실제 상태와 문서 상태가 일치한다.

## 잔여 위험

- `brew install hyper-waterfall` 단독 첫 설치는 아직 지원하지 않는다. 이 경로는 #46에서 Homebrew core 등재 가능성을 평가한 뒤 별도 결정해야 한다.
- release마다 formula `url`과 `sha256`을 갱신하는 운영 방식은 아직 자동화하지 않았다.
- Homebrew `node` dependency는 사용자 환경에 따라 link warning을 낼 수 있으므로, 향후 troubleshooting 문서가 필요할 수 있다.

## 다음 단계 영향

모든 구현 Stage가 끝났다. 다음 단계는 `task-final-report` 절차로 최종 보고서 작성, 오늘할일 완료 처리, PR 게시 준비를 진행한다.

최종 보고서에는 다음을 포함해야 한다.

- public tap repository와 formula commit
- public tap smoke 통과 결과
- README/docs 설치 안내 갱신 결과
- #46 후속 이슈 등록 결과
- 남은 리스크: Homebrew core 등재와 formula update 운영 방식

## 승인 요청

- Stage 4 산출물과 검증 결과를 승인하면 최종 결과보고서 작성 절차로 진행한다.
