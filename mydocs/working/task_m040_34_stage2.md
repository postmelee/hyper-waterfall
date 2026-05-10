# Task #34 Stage 2 보고서 - Homebrew formula 후보와 local tap 준비

GitHub Issue: [#34](https://github.com/postmelee/hyper-waterfall/issues/34)
구현계획서: [`task_m040_34_impl.md`](../plans/task_m040_34_impl.md)
Stage: 2

## 단계 목적

Stage 1에서 확인한 npm registry tarball URL과 SHA256을 사용해 Homebrew formula 후보를 작성하고, Stage 3에서 path 기반 local tap으로 사용할 수 있는 임시 tap repository를 준비했다.

이번 단계에서는 formula 후보 작성과 syntax/책임 경계 검토까지만 수행했다. `brew tap`, `brew audit`, `brew install`, `brew test`는 실행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m040_34_stage2.md` | Stage 2 formula 후보, local tap 준비, 검증 결과 기록 |
| `/private/tmp/hyper-waterfall-task34-homebrew/homebrew-hyper-waterfall-local/Formula/hyper-waterfall.rb` | npm tarball wrapper 방식의 Homebrew formula 후보. Git 커밋 대상 아님 |
| `/private/tmp/hyper-waterfall-task34-homebrew/homebrew-hyper-waterfall-local/.git` | Stage 3 local path tap 검증용 임시 Git repository. Git 커밋 대상 아님 |

임시 tap repository commit:

```text
508c633 Add hyper-waterfall formula candidate
```

## 본문 변경 정도 / 본문 무손실 여부

Stage 2는 repository 본문 문서를 수정하지 않았다. formula 후보는 `/private/tmp` 아래 임시 local tap repository에만 작성했고, 본 작업 브랜치에는 단계 보고서만 추가한다.

formula 후보는 CLI 설치 wrapper 역할만 담는다. `templates/manifest.json`, migration guide, manifest checksum, canonical release 판단 규칙은 formula 안에 복제하지 않았다.

## 검증 결과

실행 명령:

```bash
WORK_DIR="/private/tmp/hyper-waterfall-task34-homebrew"
TAP_DIR="$WORK_DIR/homebrew-hyper-waterfall-local"
mkdir -p "$TAP_DIR/Formula"
git -C "$TAP_DIR" init
test -f "$TAP_DIR/Formula/hyper-waterfall.rb"
ruby -c "$TAP_DIR/Formula/hyper-waterfall.rb"
rg -n 'class HyperWaterfall|url "|sha256 "|depends_on "node"|std_npm_args|bin.install_symlink|test do|doctor --repo' "$TAP_DIR/Formula/hyper-waterfall.rb"
! rg -n 'manifest|migration|checksum|templates/manifest|GitHub Release|canonical' "$TAP_DIR/Formula/hyper-waterfall.rb"
git -C "$TAP_DIR" add Formula/hyper-waterfall.rb
git -C "$TAP_DIR" commit -m "Add hyper-waterfall formula candidate"
git -C "$TAP_DIR" status --short --branch
git -C "$TAP_DIR" log --oneline -1
git diff --check
```

결과:

- OK: local tap repository 생성 완료. `git init` 기본 branch는 `master`로 생성됐다.
- OK: formula 파일 존재 확인 통과.
- OK: `ruby -c` -> `Syntax OK`
- OK: 필수 formula 요소 확인.
  - `class HyperWaterfall < Formula`
  - npm tarball `url`
  - Stage 1 SHA256
  - `depends_on "node"`
  - `system "npm", "install", *std_npm_args`
  - `bin.install_symlink libexec.glob("bin/*")`
  - `test do`
  - `doctor --repo`
- OK: canonical 기준 복제 의심 키워드 no-match 검증 통과.
- OK: 임시 tap repository commit `508c633 Add hyper-waterfall formula candidate` 생성.
- OK: 임시 tap repository `git status --short --branch` -> `## master`
- OK: 작업 브랜치 `git diff --check` 통과.

formula 후보 핵심 내용:

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

## 잔여 위험

- formula 후보는 Ruby syntax와 정적 구조만 확인했다. Homebrew audit, install layout, executable symlink, `brew test` 동작은 Stage 3에서 확인해야 한다.
- `test do`의 `doctor --repo #{testpath}`는 diagnostic 내용을 강하게 assert하지 않는다. Stage 3에서 실제 출력과 exit code를 보고 필요하면 같은 Stage 안에서 formula를 보정한다.
- 임시 tap repository 기본 branch가 `master`다. local path tap smoke에는 영향이 없지만, public tap 준비 단계인 #35에서는 repository 기본 branch와 naming을 별도로 정해야 한다.

## 다음 단계 영향

- Stage 3은 `/private/tmp/hyper-waterfall-task34-homebrew/homebrew-hyper-waterfall-local`을 local path tap으로 사용한다.
- Stage 3에서 처음 실행할 Homebrew 상태 변경 명령은 `brew tap postmelee/hyper-waterfall-local "$TAP_DIR"`이다.
- Stage 3에서 `brew audit --new --formula`가 실패하면 Homebrew 버전에 맞는 대체 audit 명령과 실패 사유를 기록해야 한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 Homebrew audit/install/smoke 검증으로 진행한다.
