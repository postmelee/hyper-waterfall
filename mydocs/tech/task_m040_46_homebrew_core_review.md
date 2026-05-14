# Homebrew core 등재 가능성 검토

이 문서는 Task #46에서 `hyper-waterfall` formula를 Homebrew core에 제출할 수 있는지 평가하기 위한 기준과 조사 항목을 정리한다. Stage 1에서는 공식 기준과 적용 프레임만 고정하고, 현재 프로젝트 지표와 formula gap 분석은 Stage 2에서 수행한다.

## 검토 기준

| 항목 | 값 |
|---|---|
| GitHub Issue | [#46](https://github.com/postmelee/hyper-waterfall/issues/46) |
| 마일스톤 | M040 |
| 확인일 | 2026-05-14 |
| 현재 지원 설치 경로 | `brew install postmelee/tap/hyper-waterfall` |
| 검토 대상 설치 경로 | `brew install hyper-waterfall` |
| 현재 public tap | `postmelee/homebrew-tap` |
| 현재 formula | `postmelee/homebrew-tap/Formula/hyper-waterfall.rb` |

## Stage 1 결론

`brew install hyper-waterfall`을 아무 사전 tap 없이 첫 설치 경로로 보장하려면 Homebrew core 등재가 필요하다는 전제를 유지한다. public tap은 `brew install postmelee/tap/hyper-waterfall`처럼 fully qualified 이름을 쓰면 한 줄 설치가 가능하지만, 이름만 쓰는 `brew install hyper-waterfall` 경로의 기본 발견성은 core formula 존재 여부에 좌우된다.

이번 Stage에서 Homebrew core 제출을 실행하지 않는다. Homebrew core PR 생성, reviewer 커뮤니케이션, public tap 변경, npm 재배포는 Stage 1 범위 밖이다.

## 공식 문서 확인

| 공식 문서 | Stage 1 적용 기준 |
|---|---|
| [Acceptable Formulae](https://docs.brew.sh/Acceptable-Formulae) | `homebrew/core` formula는 Homebrew 지원 플랫폼에서 빌드와 test가 가능해야 한다. stable tagged version, DFSG-compatible open-source license, source 또는 cross-platform binary, homepage, maintainability, notability, non-author usage를 확인해야 한다. self-submitted software는 일반 notability 기준보다 3배 높은 기준이 적용된다. |
| [Formula Cookbook](https://docs.brew.sh/Formula-Cookbook) | 신규 formula 제출 전 acceptable formula 요구사항, 기존 formula/대기 PR 중복 여부, stable tagged version, upstream support, `brew audit --new --formula` 통과 여부를 확인한다. `test do`는 가능한 한 실제 기능을 검증해야 하며 `--version`/`--help`만 있는 test는 약하다. |
| [Node for Formula Authors](https://docs.brew.sh/Node-for-Formula-Authors) | npm registry에 있는 Node module은 npm-hosted release tarball이 선호된다. 최신 Node 호환 package는 `depends_on "node"`를 선언하고 `system "npm", "install", *std_npm_args`, `bin.install_symlink libexec.glob("bin/*")` 패턴을 사용할 수 있다. native addon이 있으면 추가 build dependency 검토가 필요하다. |
| [How to Open a Homebrew Pull Request](https://docs.brew.sh/How-To-Open-a-Homebrew-Pull-Request) | formula 변경은 `homebrew/core` tap에 PR을 보내는 흐름이다. 제출 전 `HOMEBREW_NO_INSTALL_FROM_API=1 brew install --build-from-source <FORMULA>`와 `brew lgtm --online` 등 PR용 검증을 통과해야 한다. AI/LLM 사용 시 최초 issue/PR에서 사용 사실과 도구를 공개해야 한다. |
| [Taps](https://docs.brew.sh/Taps) | tap은 Homebrew가 추적하는 외부 formula 저장소다. `brew install foo`는 core formula를 먼저 찾고 이후 다른 tap을 찾는다. 특정 tap의 formula를 보장하려면 `<user>/<repo>/<formula>` 형식의 fully qualified 이름을 사용한다. |
| [How to Create and Maintain a Tap](https://docs.brew.sh/How-to-Create-and-Maintain-a-Tap) | GitHub tap은 `homebrew-` 접두 저장소명을 권장한다. `brew install user/repository/formula`는 필요 시 tap을 자동 추가하는 직접 설치 경로다. upstream tap은 자체 formula 배포에 적합하지만, core에 적합한 software는 discoverability와 유지보수 편의를 위해 core 유지가 선호될 수 있다. |

## public tap과 Homebrew core의 차이

| 구분 | public tap | Homebrew core |
|---|---|---|
| 현재 상태 | `postmelee/homebrew-tap` 공개, smoke 통과 | 미제출 |
| 사용자 명령 | `brew install postmelee/tap/hyper-waterfall` | `brew install hyper-waterfall` |
| 발견성 | tap namespace를 알아야 한다 | Homebrew 기본 검색 경로 |
| 유지 주체 | `postmelee/homebrew-tap` maintainer | Homebrew core maintainer review와 policy |
| 수용 기준 | tap maintainer 책임, core와 같은 formula 형식 사용 가능 | supported platforms, notability, stable release, audit/test, review discretion 적용 |
| 이번 task의 판단 | 이미 사용 가능한 기본 안내 경로 | 제출 가능성 평가 대상 |

## Stage 2 gap matrix 기준

Stage 2에서는 아래 항목을 현재 `hyper-waterfall@0.2.0`과 public tap formula에 대조한다.

| 기준 | 확인할 증거 | Stage 2 데이터 출처 | 판단 방식 |
|---|---|---|---|
| stable tagged version | `v0.2.0` tag/release와 npm `0.2.0` 정합성 | GitHub release, npm package, #35 smoke 기록 | OK/GAP |
| license | repository license와 formula `license "MIT"` 정합성 | GitHub repo metadata, formula | OK/GAP |
| homepage | 접근 가능한 project homepage와 README | GitHub repo URL, README | OK/GAP |
| supported platforms | 최신 지원 macOS, Apple Silicon/x86_64, x86_64 Linux에서 build/test 가능성 | 공식 기준, 현재 검증 환경, CI 여부 | OK/GAP/UNKNOWN |
| notability | stars, forks, watchers 또는 subscribers | GitHub repo metadata | OK/GAP |
| self-submitted threshold | self-submitted software 기준 3배 threshold 적용 여부 | GitHub repo metadata, 제출자 판단 | OK/GAP |
| non-author usage | author 외 사용자 수요 또는 third-party 제출 근거 | issue/PR/request 기록 | OK/GAP/UNKNOWN |
| duplicate formula | `hyper-waterfall` 이름이 core나 대기 PR에 이미 있는지 | `brew search`, Homebrew issue/PR search | OK/GAP |
| source/tarball | versioned, checksummed tarball | npm registry tarball, formula URL/SHA256 | OK/GAP |
| Node formula style | `depends_on "node"`, `std_npm_args`, `libexec`, bin symlink | formula body | OK/GAP |
| native addon risk | native dependency와 `node-gyp` 여부 | package metadata, npm install output | OK/GAP/UNKNOWN |
| meaningful test | `test do`가 실제 기능을 검증하는지 | formula, #35 smoke | OK/GAP |
| audit/build/test | `brew audit --new --formula`, build-from-source, `brew test` | local command, #35 smoke | OK/GAP |
| self-upgrade/unversioned download | CLI나 install script가 Homebrew 밖에서 self-update하거나 unversioned download를 수행하는지 | CLI/package behavior, formula | OK/GAP |

## Stage 3 판단 기준

Stage 3에서는 Stage 2 gap matrix를 근거로 다음 중 하나를 결론으로 남긴다.

| 결론 | 의미 | 다음 조치 |
|---|---|---|
| 진행 가능 | core 요구사항상 명확한 blocker가 없고 제출 전 검증이 가능한 상태 | Homebrew core PR은 별도 승인과 별도 task로 분리 |
| 조건부 가능 | formula 기술 요건은 대체로 맞지만 notability, non-author usage, platform 검증 등 제출 전 조건이 남은 상태 | 부족한 증거를 채우는 후속 작업 정의 |
| 보류 | 공식 기준상 거절 가능성이 높은 blocker가 확인된 상태 | public tap 경로를 기본 설치 안내로 유지 |

## 승인 게이트

- 이번 task는 Homebrew core 제출 가능성 평가와 제출 준비까지만 다룬다.
- Homebrew core PR 생성은 실행하지 않는다.
- Homebrew core reviewer 또는 외부 maintainer와 승인 없이 커뮤니케이션하지 않는다.
- public tap repository 삭제, force push, formula 변경은 실행하지 않는다.
- 결론이 `진행 가능`이어도 실제 core PR은 별도 이슈, 브랜치, 계획서, 승인 절차로 분리한다.

## Stage 2 인계

Stage 2는 이 문서의 gap matrix를 채우는 단계다. 우선 확인할 항목은 다음 순서로 둔다.

1. GitHub repository 지표와 license/release metadata 조회
2. `postmelee/homebrew-tap` formula 원문 확인
3. npm tarball URL/SHA256과 #35 smoke 결과 대조
4. 가능하면 현재 환경에서 `brew audit --new --formula`, build-from-source, `brew test` 재실행
5. Homebrew core 제출 blocker와 보류 사유 분리
