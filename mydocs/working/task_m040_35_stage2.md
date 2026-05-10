# Task #35 Stage 2 보고서 - Homebrew public tap formula 게시 준비

GitHub Issue: [#35](https://github.com/postmelee/hyper-waterfall/issues/35)
구현계획서: [`task_m040_35_impl.md`](../plans/task_m040_35_impl.md)
Stage: 2

## 단계 목적

이번 Stage의 목적은 Stage 1에서 승인 대기 항목으로 분리한 public tap repository 생성과 formula push를 실제 외부 산출물로 반영하는 것이다.

작업지시자의 Stage 2 진행 승인에 따라 `postmelee/homebrew-tap` public repository를 생성하고, Task #34에서 검증한 npm tarball wrapper formula를 `Formula/hyper-waterfall.rb`로 게시했다. 공개 설치 smoke는 아직 실행하지 않았고 Stage 3 범위로 남겼다.

## 산출물

| 파일 또는 외부 산출물 | 변경 요약 |
|---|---|
| `mydocs/working/task_m040_35_stage2.md` | public tap repository 생성, formula push, 검증 결과 기록 |
| `mydocs/orders/20260510.md` | #35 상태를 Stage 2 완료와 Stage 3 승인 대기로 갱신 |
| `https://github.com/postmelee/homebrew-tap` | public Homebrew tap repository 생성 |
| `https://github.com/postmelee/homebrew-tap/blob/78ca46a54fa34b4251650607264b3fde132cfdfd/Formula/hyper-waterfall.rb` | `hyper-waterfall@0.2.0` formula 게시 |

## 본문 변경 정도 / 본문 무손실 여부

본 저장소에서는 신규 Stage 보고서와 오늘할일 1행 비고만 변경했다. 기존 README, release notes, Homebrew PoC 문서, distribution channel 문서는 Stage 2에서 수정하지 않았다.

외부 tap repository에는 신규 formula 파일 1개만 추가했다. formula는 Task #34에서 local tap smoke를 통과한 구조를 유지했고, manifest, migration guide, checksum 정책을 formula 안에 복제하지 않았다.

## 외부 repository 생성 결과

생성 명령:

```bash
gh repo create postmelee/homebrew-tap --public --description "Homebrew tap for Hyper-Waterfall"
```

결과:

- repository URL: `https://github.com/postmelee/homebrew-tap`
- visibility: `PUBLIC`
- default branch: `main`
- `gh repo view postmelee/homebrew-tap --json nameWithOwner,visibility,defaultBranchRef,url,pushedAt` 결과:

```json
{"defaultBranchRef":{"name":"main"},"nameWithOwner":"postmelee/homebrew-tap","pushedAt":"2026-05-10T06:29:35Z","url":"https://github.com/postmelee/homebrew-tap","visibility":"PUBLIC"}
```

## formula 게시 결과

외부 tap repository local clone:

- `/private/tmp/hyper-waterfall-task35-homebrew/homebrew-tap`

formula path:

- `Formula/hyper-waterfall.rb`

외부 tap commit:

```text
78ca46a54fa34b4251650607264b3fde132cfdfd Task #35: Add hyper-waterfall formula
```

push 결과:

```text
To https://github.com/postmelee/homebrew-tap.git
 * [new branch]      main -> main
```

formula 핵심 값:

```ruby
url "https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz"
sha256 "34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7"
depends_on "node"
```

formula install/test 구조:

- `system "npm", "install", *std_npm_args`
- `bin.install_symlink libexec.glob("bin/*")`
- `test do`에서 `hyper-waterfall --version`과 `hyper-waterfall doctor --repo #{testpath}` 실행

## 검증 결과

실행 명령:

```bash
gh repo view postmelee/homebrew-tap --json nameWithOwner,visibility,defaultBranchRef,url,pushedAt
ruby -c /private/tmp/hyper-waterfall-task35-homebrew/homebrew-tap/Formula/hyper-waterfall.rb
rg -n 'class HyperWaterfall|url "|sha256 "|depends_on "node"|std_npm_args|bin.install_symlink|test do|doctor --repo' /private/tmp/hyper-waterfall-task35-homebrew/homebrew-tap/Formula/hyper-waterfall.rb
rg -n 'manifest|migration|checksum|templates/manifest|version.json' /private/tmp/hyper-waterfall-task35-homebrew/homebrew-tap/Formula/hyper-waterfall.rb
git -C /private/tmp/hyper-waterfall-task35-homebrew/homebrew-tap status --short --branch
git diff --check
```

결과:

- OK: `gh repo view`에서 `postmelee/homebrew-tap`, `PUBLIC`, default branch `main`, URL을 확인했다.
- OK: `ruby -c` 결과 `Syntax OK`.
- OK: formula 구조 grep에서 class, tarball URL, SHA256, `depends_on "node"`, `std_npm_args`, `bin.install_symlink`, `test do`, `doctor --repo`를 확인했다.
- OK: canonical 기준 복제 의심 키워드 grep은 출력 없음. 이 결과는 formula가 manifest, migration, checksum, version 상태 파일 정책을 복제하지 않았음을 확인하기 위한 no-match 검증이다.
- OK: 외부 tap clone status는 `## main...origin/main`으로 clean.
- OK: 본 저장소 `git diff --check`는 경고 없이 통과했다.

수동 확인:

- OK: formula는 npm CLI 설치 wrapper이며 GitHub Release/tag, `templates/manifest.json`, migration guide, manifest checksum 정책을 대체하지 않는다.
- OK: public tap repository에는 formula 파일만 게시했고 README 설치 안내는 아직 추가하지 않았다.
- OK: public install smoke는 아직 실행하지 않았고 Stage 3 범위로 남겼다.

## 잔여 위험

- public tap repository와 formula는 이미 공개됐다. 문제가 발견되면 formula 수정 PR/commit으로 보정해야 하며, 삭제나 force push는 별도 승인 없이는 수행하지 않는다.
- `brew tap`, `brew install`, `brew test` 공개 경로 smoke는 아직 실행하지 않았다.
- Homebrew `node` 의존성으로 인한 `npm`/`npx` link warning 재현 여부는 Stage 3에서 확인해야 한다.
- public tap README는 아직 없다. README가 필요한지는 Stage 4 문서 안내 작업에서 판단한다.

## 다음 단계 영향

Stage 3은 공개 경로 기준으로 다음 smoke를 실행할 수 있다.

- `brew tap postmelee/tap`
- `brew audit --new --formula postmelee/tap/hyper-waterfall`
- `brew install --build-from-source postmelee/tap/hyper-waterfall`
- `hyper-waterfall --version`
- `hyper-waterfall doctor --repo .`
- `brew test postmelee/tap/hyper-waterfall`

Stage 3에서는 smoke 전후 `git status --short`를 비교해 `doctor --repo .` read-only 동작을 다시 확인하고, cleanup 결과까지 기록해야 한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 공개 설치 경로 smoke 검증으로 진행한다.
