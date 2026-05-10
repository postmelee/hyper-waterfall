# Task #35 구현계획서 - Homebrew public tap 배포와 설치 안내

수행계획서: [`task_m040_35.md`](task_m040_35.md)
GitHub Issue: [#35](https://github.com/postmelee/hyper-waterfall/issues/35)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | public tap 배포 승인 조건 확정 | `mydocs/working/task_m040_35_stage1.md` | #34 인계 항목, #35 수용 기준, public tap 승인 항목 점검 |
| 2 | public tap formula 게시 또는 보류 기록 | `mydocs/working/task_m040_35_stage2.md`, 외부 tap repository 후보 | `gh repo view`, formula syntax, URL/SHA256/test block 확인 |
| 3 | 공개 설치 경로 smoke 검증 | `mydocs/tech/task_m040_35_homebrew_public_tap_smoke.md`, `mydocs/working/task_m040_35_stage3.md` | `brew tap/install/version/doctor/test`, read-only, cleanup |
| 4 | 설치 안내와 배포 문서 갱신 | `docs/homebrew-formula-tap-poc.md`, `docs/distribution-channels.md`, `README.md` 또는 release notes, `mydocs/working/task_m040_35_stage4.md` | 설치 안내 grep, canonical wrapper 경계 확인 |

## Stage 1 — public tap 배포 승인 조건 확정

### 산출물

신규:

- `mydocs/working/task_m040_35_stage1.md`

수정:

- `mydocs/orders/20260510.md`

### 변경 내용

- #34 local tap smoke 결과에서 #35로 넘긴 항목을 다시 정리한다.
- public tap 기본 후보를 `postmelee/homebrew-tap`, 사용자 설치 이름을 `postmelee/tap/hyper-waterfall`, 기본 branch 후보를 `main`, 공개 범위를 `public`으로 둔다.
- formula source 위치를 public tap repository의 `Formula/hyper-waterfall.rb`로 두고, 본 저장소에는 공식 formula copy를 두지 않는 방향을 1차 후보로 둔다.
- README 또는 release notes 설치 안내 반영 범위를 비교한다. 기본 후보는 README에 짧은 설치 경로를 두고, release notes에는 v0.2.0 배포 채널 상태를 갱신하는 방식이다.
- Stage 2에서 실제로 허용되는 외부 작업을 승인 항목으로 분리한다:
  - GitHub repository `postmelee/homebrew-tap` 생성 또는 기존 repo 사용
  - `Formula/hyper-waterfall.rb` commit/push
  - public tap smoke 실행
  - README/release notes 공개 설치 안내 반영

### 검증

```bash
rg -n 'public tap|homebrew-tap|postmelee/tap|Homebrew|node|README|release notes|보류|승인' docs mydocs
rg -n '34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7|hyper-waterfall@0.2.0|brew test|doctor --repo' docs/homebrew-formula-tap-poc.md mydocs/tech/task_m040_34_homebrew_local_tap_smoke.md mydocs/plans/task_m040_35.md
git diff --check
```

수동 확인:

- Stage 1 보고서가 외부 공개 작업 승인 항목과 repo 내부 문서 작업 승인 항목을 분리했는지 확인한다.
- #35 수용 기준 중 "public tap 경로 존재 또는 보류 사유 기록"이 Stage 2의 분기 조건으로 반영됐는지 확인한다.

### 커밋

```text
Task #35 Stage 1: Homebrew public tap 승인 조건 정리
```

## Stage 2 — public tap formula 게시 또는 보류 기록

### 산출물

신규:

- `mydocs/working/task_m040_35_stage2.md`
- 승인 시 외부 repository `postmelee/homebrew-tap`
- 승인 시 외부 repository `postmelee/homebrew-tap/Formula/hyper-waterfall.rb`

수정:

- `mydocs/orders/20260510.md`

### 변경 내용

- Stage 1 승인 결과에 따라 `postmelee/homebrew-tap` repository 존재 여부를 확인한다.
- repository가 없고 작업지시자가 public repo 생성을 명시 승인한 경우에만 `gh repo create postmelee/homebrew-tap --public` 흐름을 수행한다.
- repository가 있으면 visibility, default branch, clone URL을 확인한다.
- Task #34 formula 후보를 public tap repository의 `Formula/hyper-waterfall.rb`로 옮긴다.
- formula는 다음 값을 사용한다:
  - `url "https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz"`
  - `sha256 "34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7"`
  - `depends_on "node"`
  - `system "npm", "install", *std_npm_args`
  - `bin.install_symlink libexec.glob("bin/*")`
  - `test do`에서 `--version`과 `doctor --repo #{testpath}` 실행
- public tap 생성 또는 push가 승인되지 않으면 Stage 2 보고서에 보류 사유와 다음 승인 항목을 기록하고 Stage 3 public smoke로 넘어가지 않는다.

### 검증

승인된 public tap repository가 있는 경우:

```bash
gh repo view postmelee/homebrew-tap --json nameWithOwner,visibility,defaultBranchRef,url
ruby -c /private/tmp/hyper-waterfall-task35-homebrew/homebrew-tap/Formula/hyper-waterfall.rb
rg -n 'class HyperWaterfall|url "|sha256 "|depends_on "node"|std_npm_args|bin.install_symlink|test do|doctor --repo' /private/tmp/hyper-waterfall-task35-homebrew/homebrew-tap/Formula/hyper-waterfall.rb
git -C /private/tmp/hyper-waterfall-task35-homebrew/homebrew-tap status --short --branch
git diff --check
```

보류된 경우:

```bash
rg -n '보류|승인|public tap|homebrew-tap|Formula/hyper-waterfall.rb' mydocs/working/task_m040_35_stage2.md
git diff --check
```

수동 확인:

- formula가 manifest, migration guide, checksum 정책을 복제하지 않는지 확인한다.
- 외부 tap repository commit/push 여부와 commit SHA를 Stage 2 보고서에 기록한다.

### 커밋

```text
Task #35 Stage 2: Homebrew public tap formula 게시 준비
```

## Stage 3 — 공개 설치 경로 smoke 검증

### 산출물

신규:

- `mydocs/tech/task_m040_35_homebrew_public_tap_smoke.md`
- `mydocs/working/task_m040_35_stage3.md`

수정:

- `mydocs/orders/20260510.md`

### 변경 내용

- public tap이 실제로 존재하고 formula가 push된 경우에만 공개 경로 smoke를 실행한다.
- smoke 전후 `git status --short`를 비교해 `hyper-waterfall doctor --repo .`가 repository 파일을 수정하지 않았는지 확인한다.
- Homebrew install 중 `node`, `npm`, `npx` link 관련 warning이 나오면 그대로 기록한다.
- 검증 후 `brew uninstall hyper-waterfall`, `brew untap postmelee/tap`, 필요 시 `brew autoremove --dry-run`으로 cleanup 상태를 확인한다.
- public tap이 보류된 경우 이 Stage는 실행하지 않고 구현계획서 변경 또는 작업지시자 승인 대기로 되돌린다.

### 검증

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

### 커밋

```text
Task #35 Stage 3: Homebrew public tap smoke 검증
```

## Stage 4 — 설치 안내와 배포 문서 갱신

### 산출물

신규:

- `mydocs/working/task_m040_35_stage4.md`

수정:

- `docs/homebrew-formula-tap-poc.md`
- `docs/distribution-channels.md`
- `README.md` 또는 `docs/releases/v0.2.0.md`
- 필요 시 `docs/releases/v0.2.0-npm-publish.md`
- `mydocs/orders/20260510.md`

### 변경 내용

- public tap smoke가 통과하면 README 또는 release notes에 Homebrew 설치 안내를 반영한다.
- 설치 안내는 최소 명령을 중심으로 둔다:
  - `brew tap postmelee/tap`
  - `brew install postmelee/tap/hyper-waterfall`
  - `hyper-waterfall --version`
  - `hyper-waterfall doctor --repo .`
- Homebrew가 canonical 기준이 아닌 macOS CLI 설치 wrapper임을 명시한다.
- Homebrew `node` dependency와 link warning 가능성은 필요하면 troubleshooting/주의 문구로 반영한다.
- `docs/homebrew-formula-tap-poc.md`의 승인 게이트를 실제 Stage 2/3 결과에 맞춰 갱신한다.
- `docs/distribution-channels.md`의 Homebrew 상태를 PoC 후보에서 public tap 공개 또는 보류 상태로 갱신한다.
- public tap이 보류된 경우 README 공개 설치 안내는 추가하지 않고 보류 상태 문서만 갱신한다.

### 검증

```bash
rg -n 'brew tap postmelee/tap|brew install postmelee/tap/hyper-waterfall|hyper-waterfall --version|doctor --repo|Homebrew|canonical|wrapper|node' README.md docs
rg -n 'public tap|homebrew-tap|postmelee/tap|보류|승인|readiness' docs mydocs/tech mydocs/working mydocs/orders/20260510.md
rg -n 'manifest|migration|checksum' docs/homebrew-formula-tap-poc.md docs/distribution-channels.md README.md docs/releases/v0.2.0.md
git diff --check
```

수동 확인:

- README/release notes가 Homebrew를 canonical 배포 기준으로 설명하지 않는지 확인한다.
- public tap 실제 상태와 문서 상태가 어긋나지 않는지 확인한다.

### 커밋

```text
Task #35 Stage 4: Homebrew 설치 안내 문서 갱신
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- public tap repository 생성, formula push, 공개 설치 안내 추가는 Stage 1 보고서 승인과 작업지시자 명시 승인 후에만 수행한다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m040_35_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #35 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 외부 tap repository에 commit/push가 발생하면 외부 commit SHA와 URL을 Stage 보고서와 최종 보고서에 기록한다.

## 단계 의존성

- Stage 2는 Stage 1 산출물 승인 후 진행한다.
- Stage 2에서 public tap 생성 또는 formula push가 보류되면 Stage 3으로 넘어가지 않고 보류 사유 보고 후 작업지시자 승인을 다시 받는다.
- Stage 3은 public tap formula가 공개 경로에 존재한 뒤 진행한다.
- Stage 4는 Stage 3 smoke 성공 또는 명시적 보류 판단이 기록된 뒤 진행한다.

## 위험과 대응

- **외부 repo 생성/삭제 비용**: public tap repository는 외부에 노출된다. 생성 전 승인 문구를 분리하고, 생성 후 URL과 rollback 후보를 기록한다.
- **설치 명령 drift**: repository 이름은 `homebrew-tap`이지만 사용자 명령은 `postmelee/tap`이다. 문서에는 두 이름의 관계와 fully qualified formula 이름을 함께 둔다.
- **Homebrew node link warning**: #34에서 `npm`/`npx` link backup warning이 있었다. Stage 3에서 재현 여부를 기록하고 Stage 4 문서에 안내 반영 여부를 결정한다.
- **public smoke 실패**: 실패 명령, stderr 핵심, cleanup 결과를 남기고 formula 또는 문서 보정 전 작업지시자 승인을 받는다.
- **canonical 기준 혼동**: formula URL/SHA256은 CLI artifact 설치 기준이고 manifest checksum이 아니다. Stage 4 문서 검토에서 이 경계를 확인한다.

## 승인 요청 사항

- Stage 1-4 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Stage 1 승인 전에는 외부 public tap repository 생성이나 formula push를 하지 않는 데 동의?
- Stage 2에서 별도 승인이 내려질 경우 `postmelee/homebrew-tap` public repository와 `postmelee/tap/hyper-waterfall` 설치 이름을 기본값으로 진행하는 데 동의?
- Stage 3 public smoke가 성공한 뒤 README 또는 release notes 중 실제 반영 위치를 Stage 4에서 확정하는 데 동의?
