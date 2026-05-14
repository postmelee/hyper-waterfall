# Task #46 Stage 2 보고서 - Homebrew core gap 분석

GitHub Issue: [#46](https://github.com/postmelee/hyper-waterfall/issues/46)
구현계획서: [`task_m040_46_impl.md`](../plans/task_m040_46_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Stage 1에서 고정한 Homebrew core 기준을 현재 `hyper-waterfall@0.2.0` package와 `postmelee/homebrew-tap` formula에 대조하는 단계다. repository 지표, public tap formula, npm metadata, Homebrew audit/install/test 결과를 확인하고 gap matrix를 채웠다.

Homebrew core PR 생성, reviewer 커뮤니케이션, public tap 변경, npm 재배포는 실행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_46_homebrew_core_review.md` | Stage 2 현재 상태, formula 원문, 중복 formula 확인, Homebrew 재검증 결과, gap matrix 결과 추가 |
| `mydocs/orders/20260514.md` | #46 비고를 Stage 2 완료와 Stage 3 승인 대기 상태로 갱신 |
| `mydocs/working/task_m040_46_stage2.md` | Stage 2 목적, 산출물, 검증 결과, 잔여 위험 기록 |

## 본문 변경 정도 / 본문 무손실 여부

기존 기술 노트에 Stage 2 결과 섹션을 추가했다. 기존 Stage 1 기준은 유지했고, gap matrix의 "기준"을 실제 확인 결과와 판단으로 채웠다. 오늘할일 파일은 #46 행의 비고만 갱신했다.

## 검증 결과

실행 명령:

```bash
gh repo view postmelee/hyper-waterfall --json nameWithOwner,visibility,stargazerCount,forkCount,watchers,licenseInfo,latestRelease,url
gh repo view postmelee/homebrew-tap --json nameWithOwner,visibility,defaultBranchRef,url
gh api repos/postmelee/homebrew-tap/contents/Formula/hyper-waterfall.rb --jq '.download_url'
gh api repos/postmelee/homebrew-tap/contents/Formula/hyper-waterfall.rb -H 'Accept: application/vnd.github.raw'
npm view hyper-waterfall@0.2.0 version dist.tarball dist.shasum dist.integrity license engines bin repository --json
gh api --method GET search/code -f q='repo:Homebrew/homebrew-core hyper-waterfall'
gh search prs hyper-waterfall --repo Homebrew/homebrew-core --state open --json number,title,state,url,createdAt,author
gh search issues hyper-waterfall --repo Homebrew/homebrew-core --state open --json number,title,state,url,createdAt,author
brew search --formula hyper-waterfall
brew tap
brew list --versions hyper-waterfall node
brew audit --new --formula postmelee/tap/hyper-waterfall
brew install --build-from-source postmelee/tap/hyper-waterfall
hyper-waterfall --version
hyper-waterfall doctor --repo .
brew test postmelee/tap/hyper-waterfall
brew uninstall hyper-waterfall
brew autoremove --dry-run
brew --version
brew config
sw_vers
uname -m
rg -n 'dependencies|optionalDependencies|devDependencies|node-gyp|prebuild|native' package.json
git status --short
```

결과:

- OK: `postmelee/hyper-waterfall`은 public repository이고 latest release는 `v0.2.0`이다.
- OK: 현재 GitHub 지표는 stars 14, forks 3, watchers 0이다.
- OK: repository, npm package, formula license가 모두 MIT로 일치한다.
- OK: npm `dist.tarball`과 formula URL이 `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz`로 일치한다.
- OK: public tap formula 원문에서 `depends_on "node"`, `std_npm_args`, `bin.install_symlink libexec.glob("bin/*")`, `test do`가 확인됐다.
- OK: Homebrew core code search, 열린 PR, 열린 issue에서 `hyper-waterfall` 항목은 확인되지 않았다.
- OK: `brew audit --new --formula postmelee/tap/hyper-waterfall`가 출력 없이 통과했다.
- OK: `brew install --build-from-source postmelee/tap/hyper-waterfall`가 성공했고 `hyper-waterfall --version`은 `0.2.0`을 출력했다.
- OK: `hyper-waterfall doctor --repo .`가 exit 0으로 실행됐고 repository 파일을 수정하지 않았다.
- OK: `brew test postmelee/tap/hyper-waterfall`가 성공했다.
- OK: `brew uninstall hyper-waterfall`가 설치한 formula를 제거했고, `node 26.0.0`과 unneeded formula 14개가 autoremove됐다.
- OK: cleanup 후 `hyper-waterfall`은 PATH에 없고, 기존 `node 25.9.0_2`와 기존 `postmelee/tap` tap은 유지됐다.
- OK: `brew autoremove --dry-run` 출력이 없었다.
- OK: `git status --short`가 검증 전후 빈 출력이었다.

계획 대비 조정:

- `brew untap postmelee/tap`은 실행하지 않았다. Stage 2 시작 전 `brew tap`에 `postmelee/tap`이 이미 있었으므로, 검증 전에 존재하던 사용자/Homebrew 상태를 제거하지 않는 것이 더 적절하다고 판단했다.
- `rg -n ... package.json`은 native/dependency 관련 키워드가 없어 exit 1과 빈 출력을 냈다. 이는 package metadata에 해당 signal이 없다는 확인 결과로 기록했다.

## 잔여 위험

- Homebrew core notability 기준에는 미달한다. 현재 지표는 stars 14, forks 3, watchers 0이다.
- full Homebrew supported platform matrix는 검증하지 못했다. 이번 재검증은 macOS `26.3.1-arm64`, Homebrew `5.1.11-87-ga93d3b2` 기준이다.
- formula `test do`는 `doctor --repo #{testpath}`를 실행하지만 output assertion이 없어 core 제출용으로는 더 강한 기능 검증이 필요할 수 있다.
- Homebrew install 과정에서 Homebrew auto-update가 실행됐다. repository 파일 변경은 없었지만 로컬 Homebrew state는 갱신됐다.

## 다음 단계 영향

- Stage 3에서는 제출 가능성을 `진행 가능`, `조건부 가능`, `보류` 중 하나로 결론낸다.
- Stage 2 결과만 보면 기술 smoke는 통과했지만 notability, non-author usage, full platform evidence, stronger test assertion이 core 제출 판단의 핵심 gap이다.
- public tap 설치 경로 `brew install postmelee/tap/hyper-waterfall`은 현재 유지 가능한 안내 경로로 남는다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 `제출 가능성 판단과 배포 문서 갱신`으로 진행한다.
