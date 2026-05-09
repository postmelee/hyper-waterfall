# Homebrew formula local tap smoke 결과

이 문서는 Task #34에서 `hyper-waterfall@0.2.0` npm tarball wrapper formula를 macOS local tap으로 검증한 결과를 기록한다. public tap 저장소 생성, formula push, README 설치 안내 추가는 이 문서의 범위가 아니다.

## 검증 기준

| 항목 | 값 |
|---|---|
| npm package | `hyper-waterfall@0.2.0` |
| tarball URL | `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz` |
| SHA256 | `34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7` |
| npm integrity | `sha512-snQCsypiXj/S6lQUmNJze0QAhygAQCDYw1eX6pRdSnkj8J75HHonDI5gWdp88MOzVRP+Nio0cZjal/8T3lNCng==` |
| local tap | `postmelee/hyper-waterfall-local` |
| formula path | `/private/tmp/hyper-waterfall-task34-homebrew/homebrew-hyper-waterfall-local/Formula/hyper-waterfall.rb` |
| 검증 환경 | macOS `26.3.1-arm64`, Homebrew `5.1.10-52-g1c3a79e` |

## formula 후보

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

formula는 CLI 설치 wrapper만 담당한다. GitHub Release/tag, `templates/manifest.json`, migration guide, manifest checksum 정책은 formula 안에 복제하지 않았다.

## 검증 결과

| 검증 | 결과 | 메모 |
|---|---|---|
| `brew audit --new --formula postmelee/hyper-waterfall-local/hyper-waterfall` | OK | 출력 없이 성공 |
| `brew install --build-from-source postmelee/hyper-waterfall-local/hyper-waterfall` | OK | `/opt/homebrew/Cellar/hyper-waterfall/0.2.0: 60 files, 352.8KB` |
| `brew list --versions hyper-waterfall` | OK | `hyper-waterfall 0.2.0` |
| `which hyper-waterfall` | OK | `/opt/homebrew/bin/hyper-waterfall` |
| `hyper-waterfall --version` | OK | `0.2.0` |
| `hyper-waterfall doctor --repo .` | OK | exit 0, 자동 수정 없음 |
| `brew test postmelee/hyper-waterfall-local/hyper-waterfall` | OK | `--version`, `doctor --repo #{testpath}` 실행 |
| cleanup | OK | `brew uninstall hyper-waterfall`, `brew untap postmelee/hyper-waterfall-local` 완료 |

`doctor --repo .`는 현재 framework repository 기준으로 실행됐다. `.hyper-waterfall/version.json` 누락과 `.gitkeep` target 누락 경고가 있었지만, 이 smoke의 기준은 CLI 실행, bundled manifest 접근, read-only 동작 확인이다. 실행 전후 `git status --short`는 모두 빈 출력이었다.

## 로컬 환경 영향

`brew install --build-from-source` 중 Homebrew가 `node 26.0.0`과 관련 의존성을 설치했다. `node 26.0.0` link 단계에서 `/opt/homebrew/bin/npm`, `/opt/homebrew/bin/npx` overwrite backup 경고가 출력됐고, Homebrew는 backup을 `/Users/melee/Library/Caches/Homebrew/Backup` 아래에 만들었다.

정리 결과:

- `brew uninstall hyper-waterfall` 완료.
- `brew untap postmelee/hyper-waterfall-local` 완료.
- `brew autoremove --dry-run` 출력 없음.
- cleanup 이후 `hyper-waterfall`은 PATH에서 제거됐다.
- shell의 active `node`, `npm`, `npx`는 nvm 경로(`/Users/melee/.nvm/versions/node/v24.15.0/bin`)를 사용한다.

## public tap readiness

판단: technical smoke는 통과했지만 public tap 배포는 아직 보류한다.

충족된 조건:

- npm tarball URL과 SHA256을 재현 가능하게 확인했다.
- formula 후보가 npm tarball wrapper로 CLI를 설치했다.
- `brew audit --new --formula`가 통과했다.
- `brew install --build-from-source`가 통과했다.
- `hyper-waterfall --version`이 `0.2.0`을 출력했다.
- `hyper-waterfall doctor --repo .`가 실행되고 repository 파일을 수정하지 않았다.
- `brew test`가 통과했다.

보류 조건:

- 작업지시자의 public tap 배포 명시 승인이 아직 없다.
- public tap repository 이름, 기본 branch, 공개 범위가 아직 확정되지 않았다.
- formula source를 public tap에만 둘지, 본 저장소에 초안/검증 기록을 같이 둘지 결정해야 한다.
- README 또는 release notes에 Homebrew 설치 안내를 추가할지 별도 승인해야 한다.
- Homebrew `node` 의존성 설치와 `npm`/`npx` link overwrite backup 경고를 사용자 안내 또는 릴리스 노트에서 어떻게 다룰지 정해야 한다.
- release마다 formula `url`과 `sha256`을 갱신하는 수동 checklist 또는 자동화 이슈가 아직 없다.

## #35 인계 항목

- public tap 저장소 이름 후보: `homebrew-tap` 또는 `homebrew-hyper-waterfall`
- formula install name 후보: `postmelee/tap/hyper-waterfall`
- public tap formula에는 이 문서의 tarball URL과 SHA256을 재사용한다.
- README 설치 안내 추가는 public tap smoke가 끝난 뒤 별도 승인으로 진행한다.
- formula 배포 전 Homebrew `node` 의존성과 `npm`/`npx` link overwrite backup 가능성을 안내 문구 또는 troubleshooting 항목에 반영할지 결정한다.
