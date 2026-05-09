# Homebrew formula/tap PoC 설계

이 문서는 Hyper-Waterfall CLI를 Homebrew로 설치하는 PoC의 최소 범위, 접근안 비교, smoke 검증 경로, 승인 게이트를 정리한다. 실제 Homebrew tap 공개 배포, `brew install` 실행 검증, npm publish, GitHub Release/tag 생성, 자동 release pipeline 구현은 이 문서만으로 수행하지 않는다.

## 목적

Homebrew 채널의 목적은 macOS 개발자가 익숙한 `brew install` 또는 tap 기반 흐름으로 `hyper-waterfall` 실행 파일에 접근하게 하는 것이다. Node.js/npm 명령을 직접 기억하지 않아도 `hyper-waterfall --version`과 `hyper-waterfall doctor --repo .`를 실행할 수 있어야 한다.

Homebrew는 설치 발견성과 업데이트 경험을 개선하는 wrapper일 뿐이다. Hyper-Waterfall의 canonical 배포 기준은 계속 GitHub Release/tag, `templates/manifest.json`, migration guide다.

## 비목표

- Homebrew formula가 manifest나 migration guide를 자체 기준으로 재정의하지 않는다.
- formula가 적용 저장소 파일을 복사, 덮어쓰기, symlink 재생성, PR 생성하지 않는다.
- `v0.2.0` GitHub Release/tag, npm package, release asset이 안정되기 전 formula만 먼저 안정 채널처럼 배포하지 않는다.
- public tap 저장소 생성, formula push, `brew install` 공개 안내는 별도 승인 전에는 수행하지 않는다.
- 자동 release pipeline은 이번 PoC의 범위가 아니다.

## 공식 문서 기준

2026-05-09 기준 Homebrew 공식 문서에서 다음 기준을 확인했다.

| 문서 | PoC에 반영할 기준 |
|---|---|
| [How to Create and Maintain a Tap](https://docs.brew.sh/How-to-Create-and-Maintain-a-Tap) | tap은 formula를 제공하는 외부 source이고, GitHub tap 저장소는 `homebrew-` 접두 이름을 권장한다. formula는 `Formula/` 하위 폴더에 두는 구성이 적합하다. |
| [Taps](https://docs.brew.sh/Taps) | `brew tap <user>/<repo>`는 GitHub tap repository를 clone하고, 이후 `brew update`에서 tap도 갱신된다. 이름 충돌이 있으면 fully qualified install name을 사용한다. |
| [Node for Formula Authors](https://docs.brew.sh/Node-for-Formula-Authors) | Node module formula는 npm registry tarball을 우선 후보로 보고, 최신 Node 호환 package는 `depends_on "node"`와 `std_npm_args` 기반 설치가 일반적이다. |
| [Formula Cookbook](https://docs.brew.sh/Formula-Cookbook) | formula는 Ruby package definition이며 stable tagged version, dependency, audit/test 관점이 필요하다. |

## 책임 경계

| 영역 | 책임 |
|---|---|
| GitHub Release/tag | Hyper-Waterfall version과 release notes를 고정하는 canonical 배포 단위 |
| `templates/manifest.json` | 적용 대상 파일, target 경로, update policy, checksum 상태를 정의하는 기계 판독 기준 |
| migration guide | 기존 적용 저장소 업데이트 시 수동 확인, 충돌 가능성, 검증 기준을 제공 |
| npm package | CLI를 실행하기 쉽게 하는 편의 배포 단위 |
| Homebrew formula/tap | macOS에서 CLI executable을 설치하고 업데이트하는 wrapper |
| `hyper-waterfall doctor` | 설치된 CLI가 repository 상태를 진단하되 파일을 수정하지 않는 smoke와 진단 명령 |

Homebrew formula의 `url`, `version`, `sha256`은 어떤 CLI artifact를 설치할지 고정한다. 이 값은 manifest checksum이나 migration guide를 대체하지 않는다.

## 접근안 비교

| 접근 | 설치 흐름 | 장점 | 비용/리스크 | 판단 |
|---|---|---|---|---|
| 별도 tap 저장소 + npm package wrapper | `brew install postmelee/tap/hyper-waterfall` | 사용자 UX가 가장 단순하다. Homebrew의 Node formula 패턴과 맞고 npm publish smoke 결과를 재사용할 수 있다. | npm publish가 선행되어야 한다. release마다 formula URL과 SHA256을 갱신해야 한다. | PoC 1순위 |
| 별도 tap 저장소 + GitHub Release asset wrapper | `brew install postmelee/tap/hyper-waterfall` | canonical GitHub Release/tag와 직접 연결된다. npm registry 상태에 덜 의존한다. | Node package install, executable 배치, asset checksum 정책을 별도로 설계해야 한다. asset 구조가 바뀌면 formula 유지 비용이 커진다. | npm publish를 쓰지 못할 때의 후보 |
| 본 저장소 안 formula 파일 | local formula 또는 repository path 기반 설치 | formula 초안을 code review하기 쉽고 별도 tap 저장소 없이 실험할 수 있다. | 일반 사용자의 `brew install` 발견성이 낮다. Homebrew tap 업데이트 흐름과 분리된다. | 공개 UX PoC로는 부적합, 내부 초안 보관은 가능 |
| npm만 유지 | `npx hyper-waterfall` 또는 npm global install | 현재 MVP와 가장 단순하다. 별도 Homebrew 운영 비용이 없다. | macOS 사용자의 Homebrew 기반 설치 발견성을 해결하지 못한다. | baseline, Homebrew PoC 대체 아님 |

## 추천 PoC

1차 PoC는 별도 tap 저장소의 npm package wrapper로 본다.

권장 이유:

- Homebrew 공식 Node formula 기준이 npm registry tarball을 자연스러운 입력으로 본다.
- Task #21에서 `npm pack`, local tarball install, `--version`, `--help`, bundled manifest dry-run smoke가 이미 정리되어 있어 검증 결과를 재사용하기 쉽다.
- formula가 GitHub Release/tag와 manifest를 해석하지 않고 CLI executable만 설치하므로 canonical 책임 경계가 선명하다.
- release asset wrapper보다 formula 구현이 얇고 운영 변수가 적다.

보류 조건:

- `hyper-waterfall@0.2.0` npm publish가 승인되지 않았거나 registry에 존재하지 않는다.
- `v0.2.0` GitHub Release/tag와 npm package commit 정합성을 확인하지 못했다.
- npm tarball SHA256을 재현 가능하게 확인하지 못했다.
- formula smoke에서 `hyper-waterfall --version` 또는 `doctor` 실행이 실패한다.

## PoC formula 초안

아래는 설계 기준을 보여주는 초안이다. 이번 task에서는 formula 파일을 생성하거나 tap에 push하지 않는다.

```ruby
class HyperWaterfall < Formula
  desc "CLI helpers for Hyper-Waterfall framework lifecycle checks"
  homepage "https://github.com/postmelee/hyper-waterfall"
  url "https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz"
  sha256 "<npm-tarball-sha256>"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink libexec.glob("bin/*")
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/hyper-waterfall --version")
    assert_match "doctor 진단 결과", shell_output("#{bin}/hyper-waterfall doctor --repo #{testpath}")
  end
end
```

검토 메모:

- `url`은 npm registry tarball을 가리킨다.
- `sha256`은 npm tarball bytes 기준으로 계산한다.
- `depends_on "node"`는 CLI runtime 의존성을 표현한다.
- `test do`의 `doctor --repo #{testpath}`는 적용 저장소가 아닌 임시 폴더 진단이므로 WARN/ERROR diagnostic이 나올 수 있다. PoC smoke에서는 command가 실행되고 파일을 수정하지 않는지를 확인한다.
- 실제 formula test에서는 macOS/Homebrew 환경에서 출력 언어, exit code, npm install layout을 다시 확인해야 한다.

## version과 checksum 기준

| 항목 | 기준 |
|---|---|
| formula version | npm package version `0.2.0` 또는 release asset version `v0.2.0`과 일치 |
| formula URL | npm wrapper면 `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz` |
| formula SHA256 | formula URL의 다운로드 결과를 SHA-256으로 계산 |
| canonical version | GitHub Release/tag와 `templates/manifest.json`의 `frameworkVersion`을 기준으로 판단 |
| manifest checksum | formula SHA256과 별개다. 적용 대상 파일의 checksum과 update policy는 manifest가 담당 |
| migration guide | formula 안에 복제하지 않고 CLI와 문서가 canonical guide를 참조 |

checksum 확인 후보:

```bash
curl -L https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz | shasum -a 256
```

이 명령은 publish 후 후보이며, 이번 task에서는 실행하지 않는다.

## smoke 검증 경로

### 사전 조건

- `v0.2.0` GitHub Release/tag 생성 상태 또는 생성 순서가 승인되어 있다.
- `hyper-waterfall@0.2.0` npm publish가 승인되어 있고, package tarball URL과 SHA256을 확인했다.
- Homebrew tap 저장소 공개 여부가 별도 승인되어 있다.
- formula는 manifest나 migration guide를 복제하지 않고 CLI 설치만 담당한다.

### local PoC 검증 후보

아래 명령은 후속 승인 이후의 후보이며 이번 task에서는 실행하지 않는다.

```bash
brew tap-new postmelee/homebrew-tap
brew create https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz --tap postmelee/homebrew-tap --set-name hyper-waterfall
brew install --build-from-source postmelee/tap/hyper-waterfall
hyper-waterfall --version
hyper-waterfall doctor --repo .
brew test postmelee/tap/hyper-waterfall
```

기대 결과:

- `hyper-waterfall --version`이 `0.2.0`을 출력한다.
- `hyper-waterfall doctor --repo .`가 진단 결과를 출력하고 파일을 수정하지 않는다.
- `doctor` 결과에 WARN/ERROR가 있더라도 smoke의 핵심은 command 실행, bundled manifest 접근, read-only 동작 확인이다. 적용 저장소 정합성 평가는 별도 lifecycle 판단이다.
- `brew test`는 formula가 설치한 executable을 찾고 최소 명령을 실행한다.

## public tap 배포 승인 게이트

다음 항목이 모두 충족되기 전에는 public tap을 만들거나 formula를 push하지 않는다.

- [ ] 작업지시자가 Homebrew tap 공개 배포를 명시 승인했다.
- [ ] `v0.2.0` GitHub Release/tag와 npm package version 정합성을 확인했다.
- [ ] npm tarball 또는 release asset SHA256을 확인했다.
- [ ] local tap에서 `brew install --build-from-source`가 통과했다.
- [ ] `hyper-waterfall --version` smoke가 통과했다.
- [ ] `hyper-waterfall doctor --repo .` smoke가 read-only로 동작했다.
- [ ] `brew test`가 통과했다.
- [ ] README 또는 release notes에 Homebrew 설치 안내를 추가할지 별도 승인했다.
- [ ] formula 업데이트 자동화 여부를 별도 이슈로 분리했다.

## 운영 비용

| 비용 | 설명 | 대응 |
|---|---|---|
| formula version 갱신 | release마다 `url`, `sha256`, version을 갱신해야 한다. | release checklist 또는 후속 automation 이슈로 분리 |
| npm/GitHub 정합성 | npm package가 GitHub Release/tag와 다른 commit을 대표하면 기준이 흔들린다. | publish 전 `gitHead`, release tag, manifest version 대조 |
| macOS smoke | Homebrew install, test, update는 macOS 환경이 필요하다. | local maintainer 검증 또는 CI 후보를 후속 검토 |
| Node runtime | formula가 Homebrew `node`에 의존한다. | `engines.node >=18`과 Homebrew node compatibility 확인 |
| channel drift | npm, Homebrew, Docker가 서로 다른 CLI behavior를 안내할 수 있다. | CLI help와 `docs/agent-entrypoint.md`를 공통 기준으로 유지 |
| public tap 유지 | tap README, formula audit, issue 대응이 필요하다. | PoC 통과 후 운영 책임자를 승인 지점에 포함 |

## 후속 작업 후보

- `homebrew-tap` 저장소 이름과 공개 범위 결정
- npm package publish 후 tarball SHA256 확인
- formula 초안 작성과 `brew audit --new --formula` 검증
- macOS local tap smoke 검증
- README에 Homebrew 설치 안내를 넣을지 판단
- release마다 formula를 갱신하는 수동 checklist 또는 자동화 이슈 등록

## 결론

Homebrew PoC는 별도 tap 저장소의 npm package wrapper를 1순위로 둔다. 이 접근은 macOS 설치 UX를 개선하면서도 canonical 기준을 formula 내부로 옮기지 않는다.

실제 public 배포는 `v0.2.0` GitHub Release/tag, npm publish, tarball SHA256, local Homebrew smoke가 확인되고 작업지시자가 별도 승인한 뒤에만 진행한다.
