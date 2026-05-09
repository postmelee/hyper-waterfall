# Task #34 Stage 3 보고서 - Homebrew local tap smoke 검증

GitHub Issue: [#34](https://github.com/postmelee/hyper-waterfall/issues/34)
구현계획서: [`task_m040_34_impl.md`](../plans/task_m040_34_impl.md)
Stage: 3

## 단계 목적

Stage 2에서 만든 local tap formula 후보를 실제 Homebrew에 등록하고, `brew audit`, `brew install --build-from-source`, 설치된 CLI smoke, `doctor --repo .` read-only 확인, `brew test`를 실행했다.

이번 단계는 public tap 배포가 아니라 local tap smoke다. GitHub public tap 생성, formula push, README 설치 안내 추가는 수행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m040_34_stage3.md` | Homebrew local tap audit/install/smoke/test 결과와 cleanup 결과 기록 |
| `/private/tmp/hyper-waterfall-task34-homebrew/homebrew-hyper-waterfall-local/Formula/hyper-waterfall.rb` | Stage 3 검증에 사용한 formula 후보. Git 커밋 대상 아님 |

Homebrew 로컬 상태 변경:

- `brew tap postmelee/hyper-waterfall-local /private/tmp/hyper-waterfall-task34-homebrew/homebrew-hyper-waterfall-local` 실행 후 `brew untap postmelee/hyper-waterfall-local`로 제거했다.
- `brew install --build-from-source postmelee/hyper-waterfall-local/hyper-waterfall` 실행 후 `brew uninstall hyper-waterfall`로 제거했다.
- 설치 중 Homebrew가 `node 26.0.0`과 관련 의존성을 설치했다. uninstall 과정에서 Homebrew가 `node 26.0.0` 등 unneeded formula 14개를 autoremove했다.
- `brew test` 중 Homebrew vendor bundle에 `drb 2.2.3`, `minitest 6.0.6` gem이 설치됐다.

## 본문 변경 정도 / 본문 무손실 여부

repository 본문 문서는 수정하지 않았다. 현재 작업 브랜치의 tracked 변경은 Stage 3 보고서 추가뿐이다.

`hyper-waterfall doctor --repo .` 실행 전후 `git status --short`는 모두 빈 출력이어서 repository 파일 변경은 없었다.

## 검증 결과

실행 명령:

```bash
brew tap postmelee/hyper-waterfall-local /private/tmp/hyper-waterfall-task34-homebrew/homebrew-hyper-waterfall-local
brew audit --new --formula postmelee/hyper-waterfall-local/hyper-waterfall
brew install --build-from-source postmelee/hyper-waterfall-local/hyper-waterfall
brew list --versions hyper-waterfall
which hyper-waterfall
hyper-waterfall --version
git status --short
hyper-waterfall doctor --repo .
git status --short
brew test postmelee/hyper-waterfall-local/hyper-waterfall
brew uninstall hyper-waterfall
brew untap postmelee/hyper-waterfall-local
brew list --versions hyper-waterfall
brew tap
which hyper-waterfall
brew list --versions node
node --version
npm --version
which npm
which node
which npx
npx --version
brew autoremove --dry-run
git diff --check
```

결과:

- OK: `brew tap` 성공. `Tapped 1 formula (14 files, 5KB)`.
- OK: `brew audit --new --formula postmelee/hyper-waterfall-local/hyper-waterfall` 성공, 출력 없음.
- OK: `brew install --build-from-source` 성공.
  - `hyper-waterfall 0.2.0` 설치 완료.
  - 설치 결과: `/opt/homebrew/Cellar/hyper-waterfall/0.2.0: 60 files, 352.8KB`
  - 설치 중 의존성으로 `node 26.0.0`, `libnghttp2 1.69.0`, `libngtcp2 1.22.1`, `llhttp 9.4.1`, `simdutf 9.0.0`, `merve 1.2.2_1`, `simdjson 4.6.4` 등이 설치됐다.
- WARN: `node 26.0.0` link 단계에서 `/opt/homebrew/bin/npm`, `/opt/homebrew/bin/npx`가 overwrite됐고 Homebrew가 `/Users/melee/Library/Caches/Homebrew/Backup` 아래에 backup을 만들었다.
- OK: `brew list --versions hyper-waterfall` -> `hyper-waterfall 0.2.0`
- OK: `which hyper-waterfall` -> `/opt/homebrew/bin/hyper-waterfall`
- OK: `hyper-waterfall --version` -> `0.2.0`
- OK: `hyper-waterfall doctor --repo .` exit 0.
  - `frameworkVersion: 0.2.0`
  - manifest source paths: all exist
  - target status: `exists=15, missing=2`
  - expected WARN: `.hyper-waterfall/version.json is missing`
  - Safety 출력: 자동 수정하지 않음
- OK: `doctor` 전후 `git status --short`가 모두 빈 출력이라 read-only smoke 통과.
- OK: `brew test postmelee/hyper-waterfall-local/hyper-waterfall` 성공.
  - test block에서 `/opt/homebrew/Cellar/hyper-waterfall/0.2.0/bin/hyper-waterfall --version` 실행.
  - test block에서 `/opt/homebrew/Cellar/hyper-waterfall/0.2.0/bin/hyper-waterfall doctor --repo` 실행.
- OK: `brew uninstall hyper-waterfall` 성공.
  - Homebrew가 `node 26.0.0` 등 unneeded formula 14개를 autoremove했다.
  - 기존 `node 25.9.0_2`는 계속 설치되어 있다고 Homebrew가 출력했다.
- OK: `brew untap postmelee/hyper-waterfall-local` 성공. `Untapped 1 formula (14 files, 5KB)`.
- OK: 정리 후 `brew list --versions hyper-waterfall`은 exit 1/no output, `which hyper-waterfall`은 `hyper-waterfall not found`.
- OK: 정리 후 `brew tap` 출력 없음.
- OK: 정리 후 `brew list --versions node` -> `node 25.9.0_2`.
- OK: shell의 active Node/npm/npx는 nvm 경로를 사용한다.
  - `which node` -> `/Users/melee/.nvm/versions/node/v24.15.0/bin/node`
  - `node --version` -> `v24.15.0`
  - `which npm` -> `/Users/melee/.nvm/versions/node/v24.15.0/bin/npm`
  - `npm --version` -> `11.12.1`
  - `which npx` -> `/Users/melee/.nvm/versions/node/v24.15.0/bin/npx`
  - `npx --version` -> `11.12.1`
- OK: `brew autoremove --dry-run` 출력 없음.
- OK: `git diff --check` 통과.

참고:

- cleanup 이후 `brew list --versions libnghttp2 libngtcp2 llhttp simdutf merve simdjson` 결과에서 `libnghttp2 1.69.0 1.68.1`이 함께 보인다. `brew autoremove --dry-run`이 빈 출력이므로 Homebrew 관점의 unneeded cleanup 후보는 아니다.
- 추가로 path 기반 `brew audit --new --formula /private/tmp/.../Formula/hyper-waterfall.rb`를 시도했으나, 현재 Homebrew는 path audit를 비활성화하고 `brew audit [name ...]` 사용을 요구했다. 계획된 name 기반 audit는 이미 통과했으므로 이 결과는 Stage 3 통과 기준에 포함하지 않았다.

## 잔여 위험

- formula smoke 자체는 통과했지만, `brew install`이 Homebrew `node`를 의존성으로 설치하면서 `npm`/`npx` link overwrite backup 경고를 냈다. public tap 배포 전에는 사용자 환경 안내 또는 의존성 영향 범위를 #35에서 다시 다뤄야 한다.
- `brew test`는 `doctor --repo #{testpath}` 실행 성공만 확인한다. diagnostic 내용이 적용 저장소 정합성을 뜻하지는 않는다.
- 이번 검증은 macOS `26.3.1-arm64`, Homebrew `5.1.10-52-g1c3a79e` 환경 기준이다. 다른 macOS/Homebrew 버전에서는 audit 경고나 dependency graph가 달라질 수 있다.
- local tap repository 기본 branch는 `master`다. public tap 준비 시 repository branch 정책과 이름을 별도로 정해야 한다.

## 다음 단계 영향

- Stage 4에서 public tap readiness는 "local tap smoke 통과"로 정리할 수 있다.
- Stage 4에서 보류 조건으로 Homebrew `node` 의존성 설치와 `npm`/`npx` link overwrite backup 경고를 남겨야 한다.
- Stage 4에서 #35로 넘길 항목은 public tap repository naming, formula source 보관 위치, README 설치 안내 승인 여부, dependency 영향 안내다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4 결과 문서화와 public tap readiness 판단으로 진행한다.
