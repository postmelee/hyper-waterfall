# Homebrew public tap smoke 결과

이 문서는 Task #35에서 public tap `postmelee/tap` 경로로 `hyper-waterfall@0.2.0` formula를 검증한 결과를 기록한다. public tap repository와 formula는 Stage 2에서 게시했고, README/release notes 설치 안내 갱신은 Stage 4 범위다.

## 검증 기준

| 항목 | 값 |
|---|---|
| tap repository | `https://github.com/postmelee/homebrew-tap` |
| tap repository commit | `78ca46a54fa34b4251650607264b3fde132cfdfd` |
| formula path | `Formula/hyper-waterfall.rb` |
| install name | `postmelee/tap/hyper-waterfall` |
| npm package | `hyper-waterfall@0.2.0` |
| tarball URL | `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz` |
| SHA256 | `34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7` |
| 검증 환경 | macOS `26.3.1-arm64`, Homebrew `5.1.10-52-g1c3a79e` |

## formula

게시된 formula:

- `https://github.com/postmelee/homebrew-tap/blob/78ca46a54fa34b4251650607264b3fde132cfdfd/Formula/hyper-waterfall.rb`

formula는 npm CLI 설치 wrapper만 담당한다. GitHub Release/tag, `templates/manifest.json`, migration guide, manifest checksum 정책은 formula 안에 복제하지 않는다.

## 검증 결과

| 검증 | 결과 | 메모 |
|---|---|---|
| `brew tap postmelee/tap` | OK | `/opt/homebrew/Library/Taps/postmelee/homebrew-tap`에 tap 등록, `Tapped 1 formula (13 files, 5.8KB)` |
| `brew audit --new --formula postmelee/tap/hyper-waterfall` | OK | 출력 없이 성공 |
| `brew install --build-from-source postmelee/tap/hyper-waterfall` | OK | `/opt/homebrew/Cellar/hyper-waterfall/0.2.0: 60 files, 352.7KB` |
| `brew list --versions hyper-waterfall` | OK | `hyper-waterfall 0.2.0` |
| `which hyper-waterfall` | OK | `/opt/homebrew/bin/hyper-waterfall` |
| `hyper-waterfall --version` | OK | `0.2.0` |
| `hyper-waterfall doctor --repo .` | OK | exit 0, 자동 수정 없음 |
| `brew test postmelee/tap/hyper-waterfall` | OK | `--version`, `doctor --repo` 실행 |
| cleanup | OK | `brew uninstall hyper-waterfall`, `brew untap postmelee/tap`, `brew autoremove --dry-run` 완료 |

`doctor --repo .`는 task worktree `/private/tmp/hyper-waterfall-task35` 기준으로 실행했다. `.hyper-waterfall/version.json` 누락과 `.gitkeep` target 누락 경고가 있었지만, 이 smoke의 기준은 CLI 실행, bundled manifest 접근, read-only 동작 확인이다. 실행 전후 `git status --short`는 모두 빈 출력이었다.

## 설치 중 환경 영향

`brew install --build-from-source` 중 Homebrew가 `node 26.0.0`과 관련 의존성을 설치했다.

설치 중 새로 설치된 dependency:

- `ada-url`
- `brotli`
- `c-ares`
- `hdrhistogram_c`
- `libnghttp3`
- `libngtcp2`
- `libuv`
- `llhttp`
- `simdutf`
- `merve`
- `nbytes`
- `simdjson`
- `uvwasi`
- `node`

Task #34 local tap smoke 때 보였던 `/opt/homebrew/bin/npm`, `/opt/homebrew/bin/npx` overwrite backup warning은 이번 public tap install 출력에서는 재현되지 않았다.

cleanup 결과:

- `brew uninstall hyper-waterfall` 완료.
- Homebrew autoremove가 이번 install에서 새로 설치된 `node 26.0.0`과 dependency 13개를 제거했다.
- 기존 Homebrew `node 25.9.0_2`, `llhttp 9.3.1`, `merve 1.2.2`, `simdjson 4.6.1`, `libngtcp2 1.22.0`, `simdutf 8.2.0`은 남아 있다고 Homebrew가 안내했다.
- `brew untap postmelee/tap` 완료.
- `brew autoremove --dry-run` 출력 없음.
- cleanup 이후 `brew list --versions hyper-waterfall`은 출력 없이 exit 1.
- cleanup 이후 `which hyper-waterfall`은 `hyper-waterfall not found`.
- cleanup 이후 `brew tap` 출력 없음.
- shell의 active `node`, `npm`은 nvm 경로 기준 `node v24.15.0`, `npm 11.12.1`이다.

## public tap readiness

판단: public tap technical smoke는 통과했다.

충족된 조건:

- `postmelee/homebrew-tap` public repository가 존재한다.
- `Formula/hyper-waterfall.rb`가 public tap repository `main`에 push됐다.
- `brew tap postmelee/tap`이 성공했다.
- `brew audit --new --formula`가 통과했다.
- `brew install --build-from-source`가 통과했다.
- `hyper-waterfall --version`이 `0.2.0`을 출력했다.
- `hyper-waterfall doctor --repo .`가 실행되고 repository 파일을 수정하지 않았다.
- `brew test`가 통과했다.
- smoke 후 cleanup을 완료했다.

남은 항목:

- README 또는 release notes에 Homebrew 설치 안내를 반영할 위치를 확정한다.
- Homebrew가 canonical 기준이 아니라 macOS CLI 설치 wrapper임을 사용자 문서에 명시한다.
- release마다 formula `url`과 `sha256`을 갱신하는 운영 방식은 후속 checklist 또는 자동화 이슈로 분리한다.

## Stage 4 인계 항목

- 사용자 설치 명령 후보:

```bash
brew tap postmelee/tap
brew install postmelee/tap/hyper-waterfall
hyper-waterfall --version
hyper-waterfall doctor --repo .
```

- README에는 Homebrew를 macOS CLI 설치 wrapper로 짧게 소개한다.
- `docs/homebrew-formula-tap-poc.md`의 public tap 승인 게이트를 public smoke 통과 상태로 갱신한다.
- `docs/distribution-channels.md`의 Homebrew 상태를 public tap smoke 통과 상태로 갱신한다.
- `docs/releases/v0.2.0.md` 또는 release notes 후보에는 필요하면 Homebrew 채널 공개 상태를 짧게 반영한다.
