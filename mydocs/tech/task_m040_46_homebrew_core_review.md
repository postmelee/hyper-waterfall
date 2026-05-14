# Homebrew core 등재 가능성 검토

이 문서는 Task #46에서 `hyper-waterfall` formula를 Homebrew core에 제출할 수 있는지 평가하기 위한 기준과 조사 결과를 정리한다. Stage 1에서는 공식 기준과 적용 프레임을 고정했고, Stage 2에서는 현재 프로젝트 지표와 formula gap을 분석했다.

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

## Stage 2 결과 요약

Stage 2 기준 현재 formula는 macOS arm64 환경에서 `brew audit --new --formula`, `brew install --build-from-source`, `hyper-waterfall --version`, `hyper-waterfall doctor --repo .`, `brew test`를 통과했다. npm tarball URL, formula URL, package version, license, Node engine, Homebrew Node formula pattern도 서로 일치한다.

다만 Homebrew core 제출 관점에서는 즉시 진행하기 어렵다. GitHub 공개 지표가 2026-05-14 기준 stars 14, forks 3, watchers 0으로 Homebrew의 일반 notability 예시 기준(75 stars, 30 forks, 30 watchers)과 self-submitted 기준(225 stars, 90 forks, 90 watchers)에 모두 미달한다. 또한 full Homebrew supported platform matrix, non-author usage, stronger formula test assertion 증거가 부족하다.

Stage 2에서는 Homebrew core PR 생성, public tap 변경, npm 재배포를 실행하지 않았다.

## Stage 3 최종 판단

결론: Homebrew core 제출은 현재 보류한다.

보류 근거:

- notability 기준 미달: GitHub 지표가 stars 14, forks 3, watchers 0으로 Homebrew의 일반 notability 예시 기준(75 stars, 30 forks, 30 watchers)과 self-submitted 기준(225 stars, 90 forks, 90 watchers)에 모두 미달한다.
- non-author usage 근거 부족: Homebrew core 열린 PR/이슈에서 third-party 요청이 확인되지 않았고, author 외 사용자가 Homebrew 추가를 요청했다는 증거를 확보하지 못했다.
- supported platform evidence 부족: macOS arm64에서는 audit/build/test가 통과했지만 Homebrew core가 요구하는 전체 지원 플랫폼 matrix의 x86_64 macOS와 x86_64 Linux 검증 증거가 없다.
- formula test 보강 필요: 현재 `test do`는 `doctor --repo #{testpath}`를 실행하지만 output assertion이 약하고 `--version` assertion 중심이다.

따라서 `brew install hyper-waterfall` 단독 첫 설치 경로는 지금 보장하지 않는다. 사용자-facing 기본 Homebrew 설치 경로는 계속 다음 명령으로 둔다.

```bash
brew install postmelee/tap/hyper-waterfall
```

core 제출을 재검토하려면 최소한 다음 조건을 먼저 채운다.

- GitHub notability 또는 non-author usage 증거 확보
- x86_64 macOS와 x86_64 Linux build/test 증거 확보
- `doctor` 등 실제 기능 output을 검증하는 stronger formula test 후보 작성
- Homebrew official policy 재확인
- Homebrew core PR 생성에 대한 별도 이슈, 수행계획서, 작업지시자 승인 확보

이번 task에서는 Homebrew core PR 생성, reviewer 커뮤니케이션, public tap 변경, npm 재배포를 실행하지 않았다.

## 현재 상태 조회

| 항목 | 확인 결과 |
|---|---|
| framework repository | `postmelee/hyper-waterfall`, public |
| repository description | `AI 페어 프로그래밍을 위한 하이퍼-워터폴 방법론 하네스` |
| repository created/pushed | created `2026-05-01T04:58:51Z`, pushed `2026-05-11T00:51:55Z` |
| GitHub 지표 | stars 14, forks 3, watchers 0 |
| license | MIT License |
| latest release | `v0.2.0`, `2026-05-08T20:34:07Z` published |
| tap repository | `postmelee/homebrew-tap`, public, default branch `main` |
| tap repository created/pushed | created `2026-05-10T06:28:23Z`, pushed `2026-05-13T04:56:48Z` |
| formula raw URL | `https://raw.githubusercontent.com/postmelee/homebrew-tap/main/Formula/hyper-waterfall.rb` |
| npm package | `hyper-waterfall@0.2.0` |
| npm tarball | `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz` |
| npm license/engine/bin | MIT, `node >=18`, `hyper-waterfall: bin/hyper-waterfall.js` |
| package dependency signal | `package.json`에 dependencies, optionalDependencies, devDependencies, `node-gyp`, `prebuild`, native 키워드 없음 |

현재 public tap formula:

```ruby
class HyperWaterfall < Formula
  desc "CLI helpers for Hyper-Waterfall framework lifecycle checks"
  homepage "https://github.com/postmelee/hyper-waterfall"
  url "https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz"
  sha256 "34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink libexec.glob("bin/*")
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/hyper-waterfall --version")
    shell_output("#{bin}/hyper-waterfall doctor --repo #{testpath}")
  end
end
```

## 중복 formula 확인

| 확인 | 결과 |
|---|---|
| `gh api --method GET search/code -f q='repo:Homebrew/homebrew-core hyper-waterfall'` | `total_count: 0` |
| `gh search prs hyper-waterfall --repo Homebrew/homebrew-core --state open` | `[]` |
| `gh search issues hyper-waterfall --repo Homebrew/homebrew-core --state open` | `[]` |
| `brew search --formula hyper-waterfall` | `postmelee/tap/hyper-waterfall`, `hyperestraier` |
| `brew search hyper-waterfall` | `postmelee/tap/hyper-waterfall`, `hyperestraier`, `hyperwhisper` |

해석: Homebrew core 안에 exact `hyper-waterfall` formula 또는 열린 PR/이슈는 확인되지 않았다. `brew search`는 fuzzy result를 포함하므로 `hyperestraier`, `hyperwhisper`는 이름 유사 항목으로만 기록한다.

## Homebrew 재검증 결과

| 항목 | 결과 |
|---|---|
| 검증 환경 | macOS `26.3.1-arm64`, Homebrew `5.1.11-87-ga93d3b2`, Xcode `26.5` |
| 검증 전 tap | `postmelee/tap` 존재 |
| 검증 전 install 상태 | `hyper-waterfall` 없음, `node 25.9.0_2` 존재 |
| `brew audit --new --formula postmelee/tap/hyper-waterfall` | OK, 출력 없이 성공 |
| `brew install --build-from-source postmelee/tap/hyper-waterfall` | OK, `/opt/homebrew/Cellar/hyper-waterfall/0.2.0: 60 files, 352.7KB` |
| install 중 Homebrew 상태 변화 | Homebrew auto-update 실행, core/cask tap 갱신, `node 26.0.0`과 관련 dependency 설치 |
| `hyper-waterfall --version` | OK, `0.2.0` |
| `hyper-waterfall doctor --repo .` | OK, exit 0, repository 파일 수정 없음 |
| `brew test postmelee/tap/hyper-waterfall` | OK, `--version`과 `doctor --repo` 실행 |
| cleanup | `brew uninstall hyper-waterfall` 완료, `node 26.0.0`과 unneeded formula 14개 autoremove |
| cleanup 후 상태 | `hyper-waterfall` 없음, `node 25.9.0_2` 유지, `brew autoremove --dry-run` 출력 없음 |
| tap cleanup | `postmelee/tap`은 검증 전부터 존재했으므로 제거하지 않고 유지 |

`brew install` 중 Homebrew가 auto-update를 실행해 Homebrew HEAD가 `a93d3b24e5aeb5e81c4c0acf853b8e1033f8b4f8`로 갱신됐다. 이 변화는 Homebrew 명령 실행에 따른 외부 환경 변화이며 repository 파일 변경은 아니다.

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

## Stage 2 gap matrix 결과

Stage 2에서는 아래 항목을 현재 `hyper-waterfall@0.2.0`과 public tap formula에 대조했다.

| 기준 | 확인한 증거 | Stage 2 데이터 출처 | 판단 |
|---|---|---|---|
| stable tagged version | `v0.2.0` latest release와 npm `0.2.0` 확인 | GitHub repo metadata, npm metadata | OK |
| license | repository MIT License, npm MIT, formula `license "MIT"` | GitHub repo metadata, npm metadata, formula | OK |
| homepage | GitHub repository URL과 README 존재 | GitHub repo metadata, README, formula | OK |
| supported platforms | 현재 macOS `26.3.1-arm64`에서는 audit/build/test 통과. x86_64 macOS와 x86_64 Linux 검증 증거 없음 | local Homebrew 검증, 공식 기준 | GAP |
| notability | stars 14, forks 3, watchers 0 | GitHub repo metadata | GAP |
| self-submitted threshold | self-submitted 기준 예시 threshold인 stars 225, forks 90, watchers 90 미달 | GitHub repo metadata, 공식 기준 | GAP |
| non-author usage | Homebrew core 열린 PR/이슈에서 third-party 요청 확인 안 됨 | GitHub search | GAP |
| duplicate formula | core code search 0건, Homebrew core 열린 PR/이슈 0건 | GitHub code/PR/issue search, `brew search` | OK |
| source/tarball | formula URL과 npm `dist.tarball` 일치, build-from-source install 성공으로 formula SHA256 검증 | npm metadata, formula, Homebrew install | OK |
| Node formula style | `depends_on "node"`, `std_npm_args`, `bin.install_symlink libexec.glob("bin/*")` 사용 | formula body | OK |
| native addon risk | package metadata에 dependencies/native addon signal 없음 | `package.json`, npm metadata | OK |
| meaningful test | `doctor --repo #{testpath}`를 실행하지만 output assertion은 없고 `--version` assertion 중심 | formula body, `brew test` | GAP |
| audit/build/test | 현재 macOS arm64에서 audit/build/test 통과 | local Homebrew 검증 | OK |
| self-upgrade/unversioned download | formula는 versioned npm tarball을 사용하고 CLI doctor는 read-only. self-update 동작 없음 | formula, CLI smoke | OK |

## Stage 3 판단 결과

Stage 3에서는 Stage 2 gap matrix를 근거로 다음처럼 판단했다.

| 결론 | 의미 | 다음 조치 |
|---|---|---|
| 진행 가능 | core 요구사항상 명확한 blocker가 없고 제출 전 검증이 가능한 상태 | 해당 없음 |
| 조건부 가능 | formula 기술 요건은 대체로 맞지만 notability, non-author usage, platform 검증 등 제출 전 조건이 남은 상태 | 해당 없음 |
| 보류 | 공식 기준상 거절 가능성이 높은 blocker가 확인된 상태 | public tap 경로를 기본 설치 안내로 유지 |

## 승인 게이트

- 이번 task는 Homebrew core 제출 가능성 평가와 제출 준비까지만 다룬다.
- Homebrew core PR 생성은 실행하지 않는다.
- Homebrew core reviewer 또는 외부 maintainer와 승인 없이 커뮤니케이션하지 않는다.
- public tap repository 삭제, force push, formula 변경은 실행하지 않는다.
- 결론이 `진행 가능`이어도 실제 core PR은 별도 이슈, 브랜치, 계획서, 승인 절차로 분리한다.

## 최종 인계

이번 task의 최종 보고서는 다음 결론을 이어받는다.

1. Homebrew core 제출은 현재 보류한다.
2. public tap 경로 `brew install postmelee/tap/hyper-waterfall`을 기본 Homebrew 설치 안내로 유지한다.
3. `brew install hyper-waterfall` 단독 경로는 notability, non-author usage, platform matrix, formula test 보강 후 재검토한다.
4. 실제 Homebrew core PR 생성은 별도 승인과 별도 task 없이는 수행하지 않는다.
