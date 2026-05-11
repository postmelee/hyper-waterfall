# Task #35 Stage 3 보고서 - Homebrew public tap smoke 검증

GitHub Issue: [#35](https://github.com/postmelee/hyper-waterfall/issues/35)
구현계획서: [`task_m040_35_impl.md`](../plans/task_m040_35_impl.md)
Stage: 3

## 단계 목적

이번 Stage의 목적은 Stage 2에서 게시한 public tap formula를 실제 공개 설치 경로로 검증하는 것이다. `brew tap`, `brew audit`, `brew install`, CLI version, `doctor`, `brew test`, cleanup을 실행해 #35 수용 기준의 공개 설치 경로 동작 여부를 확인했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_35_homebrew_public_tap_smoke.md` | public tap smoke 결과, 설치/cleanup 결과, readiness, Stage 4 인계 항목 기록 |
| `mydocs/working/task_m040_35_stage3.md` | Stage 3 검증 결과와 다음 단계 영향 기록 |
| `mydocs/orders/20260510.md` | #35 상태를 Stage 3 완료와 설치 안내 문서 갱신 승인 대기로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

신규 기술 기록과 신규 Stage 보고서 작성, 오늘할일 1행 비고 갱신만 수행했다. README, release notes, Homebrew PoC 문서, distribution channel 문서는 Stage 3에서 수정하지 않았다.

## 검증 결과

실행 명령:

```bash
brew tap postmelee/tap
brew audit --new --formula postmelee/tap/hyper-waterfall
brew install --build-from-source postmelee/tap/hyper-waterfall
brew list --versions hyper-waterfall
which hyper-waterfall
hyper-waterfall --version
git status --short
hyper-waterfall doctor --repo .
git status --short
brew test postmelee/tap/hyper-waterfall
brew uninstall hyper-waterfall
brew untap postmelee/tap
brew autoremove --dry-run
git diff --check
```

결과:

- OK: `brew tap postmelee/tap` 성공. `/opt/homebrew/Library/Taps/postmelee/homebrew-tap`에 tap 등록, `Tapped 1 formula (13 files, 5.8KB)`.
- OK: `brew audit --new --formula postmelee/tap/hyper-waterfall` 성공, 출력 없음.
- OK: `brew install --build-from-source postmelee/tap/hyper-waterfall` 성공. `/opt/homebrew/Cellar/hyper-waterfall/0.2.0: 60 files, 352.7KB`.
- OK: `brew list --versions hyper-waterfall` -> `hyper-waterfall 0.2.0`.
- OK: `which hyper-waterfall` -> `/opt/homebrew/bin/hyper-waterfall`.
- OK: `hyper-waterfall --version` -> `0.2.0`.
- OK: `hyper-waterfall doctor --repo .` exit 0. `doctor` 출력은 manifest load, frameworkVersion `0.2.0`, read-only safety 문구를 포함했다.
- OK: `doctor --repo .` 실행 전후 `git status --short`는 모두 빈 출력.
- OK: `brew test postmelee/tap/hyper-waterfall` 성공. test block에서 `--version`과 `doctor --repo` 실행.
- OK: cleanup 완료. `brew uninstall hyper-waterfall`, `brew untap postmelee/tap`, `brew autoremove --dry-run` 실행.
- OK: cleanup 이후 `brew list --versions hyper-waterfall` 출력 없음, `which hyper-waterfall`은 `hyper-waterfall not found`, `brew tap` 출력 없음.
- OK: `git diff --check`는 경고 없이 통과했다.

## 로컬 환경 영향

`brew install --build-from-source` 중 Homebrew가 `node 26.0.0`과 dependency 13개를 설치했다. uninstall 과정에서 Homebrew autoremove가 이번 install에서 새로 설치된 `node 26.0.0`과 dependency를 제거했다.

기존 Homebrew formula 버전은 유지됐다:

- `node 25.9.0_2`
- `llhttp 9.3.1`
- `merve 1.2.2`
- `simdjson 4.6.1`
- `libngtcp2 1.22.0`
- `simdutf 8.2.0`

Task #34 local tap smoke 때 보였던 `/opt/homebrew/bin/npm`, `/opt/homebrew/bin/npx` overwrite backup warning은 이번 public tap install 출력에서는 재현되지 않았다. cleanup 이후 shell의 active `node`, `npm`은 nvm 경로 기준 `node v24.15.0`, `npm 11.12.1`이다.

## 잔여 위험

- public tap repository와 formula는 공개 상태다. 문제가 발견되면 별도 commit/PR로 보정해야 하며 삭제나 force push는 별도 승인 없이 수행하지 않는다.
- Homebrew `node` dependency는 사용자 환경에 따라 `npm`/`npx` link warning을 낼 수 있다. Stage 4 문서에는 Homebrew가 Node runtime을 설치할 수 있다는 안내를 짧게 남기는 것이 좋다.
- release마다 formula `url`과 `sha256`을 갱신하는 운영 방식은 이번 task에서 자동화하지 않는다.

## 다음 단계 영향

Stage 4에서는 public tap smoke 통과 상태를 사용자 문서에 반영한다.

- README 또는 release notes에 Homebrew 설치 안내를 추가한다.
- `docs/homebrew-formula-tap-poc.md`의 public tap 승인 게이트를 public smoke 통과 상태로 갱신한다.
- `docs/distribution-channels.md`의 Homebrew 상태를 public tap 공개 상태로 갱신한다.
- Homebrew가 canonical 기준이 아니라 macOS CLI 설치 wrapper임을 명시한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4 설치 안내와 배포 문서 갱신으로 진행한다.
