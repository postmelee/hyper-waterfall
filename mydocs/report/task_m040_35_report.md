# Task #35 최종 보고서 - Homebrew public tap 배포와 설치 안내

GitHub Issue: [#35](https://github.com/postmelee/hyper-waterfall/issues/35)
마일스톤: M040

## 작업 요약

- 대상 이슈: #35
- 마일스톤: M040
- 단계 수: 4
- 작업 목적: Task #34 local tap smoke 결과를 public tap 배포로 승격하고, macOS 사용자가 `hyper-waterfall@0.2.0`을 Homebrew public tap으로 설치할 수 있음을 검증해 사용자 문서에 반영한다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `mydocs/orders/20260510.md` | #35 상태를 진행중에서 완료로 변경 | 작업 추적 문서 |
| `mydocs/plans/task_m040_35.md` | 수행계획서 작성 | 작업 범위와 승인 기준 |
| `mydocs/plans/task_m040_35_impl.md` | Stage 1-4 구현계획서 작성 | 단계별 실행 계획과 검증 명령 |
| `mydocs/working/task_m040_35_stage1.md` | public tap 배포 전 승인 조건과 기본 후보 정리 | 단계 보고서 |
| `mydocs/working/task_m040_35_stage2.md` | public tap repository 생성과 formula push 결과 기록 | 단계 보고서 |
| `mydocs/working/task_m040_35_stage3.md` | public tap install, version, doctor, brew test, cleanup smoke 결과 기록 | 단계 보고서 |
| `mydocs/working/task_m040_35_stage4.md` | README/docs 설치 안내 갱신과 #46 후속 이슈 등록 결과 기록 | 단계 보고서 |
| `mydocs/tech/task_m040_35_homebrew_public_tap_smoke.md` | public tap smoke의 명령별 결과, 환경 영향, readiness 기록 | 기술 기록 |
| `README.md` | macOS Homebrew public tap 설치 명령과 wrapper/canonical 경계 추가 | 사용자-facing 설치 안내 |
| `docs/homebrew-formula-tap-poc.md` | public tap 승인 게이트를 Task #35 결과 기준으로 갱신 | Homebrew PoC 설계 문서 |
| `docs/distribution-channels.md` | Homebrew 상태를 public tap smoke 통과 상태로 갱신하고 core 등재를 #46으로 분리 | 배포 채널 전략 문서 |
| `docs/releases/v0.2.0.md` | release notes 후보에 Homebrew public tap 공개 상태와 core 등재 후속 검토 반영 | v0.2.0 release 준비 문서 |
| `mydocs/report/task_m040_35_report.md` | 최종 결과보고서 작성 | PR 전 장기 보관 보고 |

외부 산출물:

- public tap repository: `https://github.com/postmelee/homebrew-tap`
- public tap formula commit: `78ca46a54fa34b4251650607264b3fde132cfdfd Task #35: Add hyper-waterfall formula`
- formula path: `Formula/hyper-waterfall.rb`
- install name: `postmelee/tap/hyper-waterfall`
- 후속 이슈: [#46 Homebrew core 등재 가능성 평가와 제출 준비](https://github.com/postmelee/hyper-waterfall/issues/46)

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| public tap repository | 없음 | `postmelee/homebrew-tap` public repository 생성 |
| formula source | Task #34 local tap 후보만 존재 | public tap `Formula/hyper-waterfall.rb` 게시 |
| formula commit | 없음 | `78ca46a54fa34b4251650607264b3fde132cfdfd` |
| public install smoke | 미수행 | `brew install --build-from-source postmelee/tap/hyper-waterfall` 통과 |
| CLI version smoke | 미수행 | `hyper-waterfall --version` -> `0.2.0` |
| `doctor` read-only smoke | 미수행 | `hyper-waterfall doctor --repo .` exit 0, 실행 전후 `git status --short` 빈 출력 |
| `brew test` | 미수행 | `brew test postmelee/tap/hyper-waterfall` 통과 |
| 사용자 설치 안내 | README에 Homebrew public tap 설치 안내 없음 | `brew install postmelee/tap/hyper-waterfall` 안내 추가 |
| `brew install hyper-waterfall` 단독 경로 | 미정 | Homebrew core 등재 필요 항목으로 #46에 분리 |
| 문서 변경량 | 없음 | 최종 보고 전 기준 12개 파일, 979 insertions, 21 deletions. 이후 최종 보고서와 오늘할일 완료 처리 추가 |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| 승인된 public tap 경로가 존재하거나, 배포 보류 사유가 명확히 기록된다. | OK — `postmelee/homebrew-tap` public repository를 생성했고, `postmelee/tap/hyper-waterfall` 설치 이름을 smoke와 문서에 고정했다. |
| 공개 설치 명령이 실제로 동작한다. | OK — Stage 3에서 `brew tap postmelee/tap`, `brew install --build-from-source postmelee/tap/hyper-waterfall`, `brew test postmelee/tap/hyper-waterfall`이 통과했다. |
| 설치된 `hyper-waterfall --version`이 `0.2.0`을 출력한다. | OK — Stage 3에서 `/opt/homebrew/bin/hyper-waterfall` 기준 `0.2.0`을 확인했다. |
| `hyper-waterfall doctor --repo .`가 read-only로 실행된다. | OK — Stage 3에서 exit 0, 실행 전후 `git status --short` 빈 출력으로 자동 수정 없음 확인. |
| 문서가 Homebrew를 canonical 기준이 아닌 설치 wrapper로 설명한다. | OK — README, `docs/homebrew-formula-tap-poc.md`, `docs/distribution-channels.md`, `docs/releases/v0.2.0.md`에 wrapper/canonical 경계를 반영했다. |
| `brew install hyper-waterfall` 단독 경로의 처리 방향이 명확하다. | OK — Homebrew core 등재가 필요한 후속 범위로 #46을 등록하고 현재 지원 경로와 분리했다. |
| `git diff --check`가 경고 없이 통과한다. | OK — Stage 1-4와 최종 보고 전 통합 검증에서 통과했다. |

### 단계별 검증 결과

- Stage 1: [`task_m040_35_stage1.md`](../working/task_m040_35_stage1.md) — #34 인계 항목, public tap 기본 후보, 외부 공개 작업 승인 조건, README/release notes 반영 후보 확인. `postmelee/homebrew-tap`이 당시 존재하지 않음을 확인.
- Stage 2: [`task_m040_35_stage2.md`](../working/task_m040_35_stage2.md) — `postmelee/homebrew-tap` public repository 생성, formula syntax OK, URL/SHA256/Node dependency/std_npm_args/test block 확인, 외부 tap clone clean.
- Stage 3: [`task_m040_35_stage3.md`](../working/task_m040_35_stage3.md), [`task_m040_35_homebrew_public_tap_smoke.md`](../tech/task_m040_35_homebrew_public_tap_smoke.md) — public tap install, version, doctor read-only, `brew test`, uninstall/untap/autoremove cleanup 통과.
- Stage 4: [`task_m040_35_stage4.md`](../working/task_m040_35_stage4.md) — README/docs 설치 안내 갱신, wrapper/canonical 경계 확인, #46 후속 이슈 등록.

통합 검증:

- `git fetch origin main` -> `origin/main` 최신화, `HEAD..origin/main` 추가 commit 없음.
- `ls mydocs/plans/task_m040_35.md ... mydocs/tech/task_m040_35_homebrew_public_tap_smoke.md` -> 계획서, 구현계획서, Stage 1-4 보고서, 기술 기록 존재 확인.
- `gh repo view postmelee/homebrew-tap --json nameWithOwner,visibility,defaultBranchRef,url,pushedAt` -> `postmelee/homebrew-tap`, `PUBLIC`, default branch `main`, pushedAt `2026-05-10T06:29:35Z`.
- `gh issue view 46 --json title,url,state,milestone,labels` -> #46 OPEN, M040, `enhancement`, `infrastructure` 확인.
- `rg -n 'brew install postmelee/tap/hyper-waterfall|hyper-waterfall --version|hyper-waterfall doctor --repo|Homebrew public tap|Homebrew core|#46|canonical|wrapper|node' README.md docs mydocs/working/task_m040_35_stage4.md mydocs/tech/task_m040_35_homebrew_public_tap_smoke.md` -> 설치 안내, core 후속 이슈, wrapper/canonical 경계, Node runtime 안내 확인.
- `rg -n '78ca46a54fa34b4251650607264b3fde132cfdfd|34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7|brew audit --new --formula|brew install --build-from-source|brew test|read-only|git status --short' ...` -> formula commit, SHA256, public smoke 근거 확인.
- `git diff --check` -> 통과.
- `git status --short --branch` -> 최종 보고서 작성 전 기준 작업트리 clean, `local/task35...origin/main [ahead 6]`.

## 잔여 위험과 후속 작업

### 잔여 위험

- `brew install hyper-waterfall` 단독 첫 설치는 아직 지원하지 않는다. 이 경로는 #46에서 Homebrew core 등재 가능성을 평가해야 한다.
- release마다 formula `url`과 `sha256`을 갱신하는 운영 방식은 아직 자동화하지 않았다.
- Homebrew `node` dependency는 사용자 환경에 따라 `npm`/`npx` link warning을 낼 수 있다. Task #35 public smoke에서는 재현되지 않았지만 troubleshooting 문서 후보로 남긴다.
- public tap repository와 formula는 외부 공개 산출물이다. 문제가 발견되면 삭제나 force push가 아니라 별도 commit/PR로 보정해야 한다.

### 후속 작업 후보

- [#46 Homebrew core 등재 가능성 평가와 제출 준비](https://github.com/postmelee/hyper-waterfall/issues/46)
- release마다 Homebrew formula `url`과 `sha256`을 갱신하는 수동 checklist 또는 자동화 이슈 등록
- Homebrew `node` dependency와 link warning troubleshooting 문서화 여부 검토

## 작업지시자 승인 요청

- 최종 보고서, public tap smoke 결과, README/docs 설치 안내, #46 후속 이슈 분리를 승인하면 PR 리뷰와 merge 승인 단계로 진행한다.
