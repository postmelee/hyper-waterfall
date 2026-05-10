# task_m040_34_impl.md - Homebrew formula local tap smoke PoC 구현계획서

수행계획서: [`task_m040_34.md`](task_m040_34.md)
GitHub Issue: [#34](https://github.com/postmelee/hyper-waterfall/issues/34)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | npm tarball 기준과 로컬 Homebrew 환경 확인 | `mydocs/working/task_m040_34_stage1.md`, `/private/tmp/hyper-waterfall-task34-homebrew` | npm registry metadata, tarball SHA256, Homebrew/Node 환경 확인 |
| 2 | formula 후보와 local tap 준비 | `mydocs/working/task_m040_34_stage2.md`, `/private/tmp/hyper-waterfall-task34-homebrew/homebrew-hyper-waterfall-local/Formula/hyper-waterfall.rb` | formula syntax, URL/SHA256/Node/std_npm_args/test 수동 검토 |
| 3 | Homebrew audit/install/smoke 검증 | `mydocs/working/task_m040_34_stage3.md`, local Homebrew install 상태 | `brew audit`, `brew install --build-from-source`, `--version`, `doctor`, `brew test`, read-only 확인 |
| 4 | 결과 문서화와 public tap readiness 판단 | `docs/homebrew-formula-tap-poc.md` 또는 `mydocs/tech/task_m040_34_homebrew_local_tap_smoke.md`, `mydocs/working/task_m040_34_stage4.md` | smoke 결과 grep, public tap 보류 조건 확인, `git diff --check` |

## Stage 1 - npm tarball 기준과 로컬 Homebrew 환경 확인

### 산출물

신규:

- `mydocs/working/task_m040_34_stage1.md`

임시 산출물:

- `/private/tmp/hyper-waterfall-task34-homebrew/hyper-waterfall-0.2.0.tgz`
- `/private/tmp/hyper-waterfall-task34-homebrew/npm-view-*.txt`

수정:

- 없음. Stage 1은 검증 결과와 판단을 단계 보고서에 기록한다.

### 변경 내용

- `hyper-waterfall@0.2.0`의 npm registry version과 tarball URL을 다시 확인한다.
- registry tarball을 `/private/tmp/hyper-waterfall-task34-homebrew` 아래로 내려받고 SHA256을 계산한다.
- `mydocs/report/task_m040_33_report.md`의 registry tarball URL과 실제 `npm view` 결과가 일치하는지 확인한다.
- `brew --version`, `brew config`, `node --version`, `npm --version`으로 local tap smoke 실행 가능 조건을 확인한다.
- Homebrew가 없거나 필수 명령이 실패하면 Stage 2 이후를 강행하지 않고 실패 조건과 대안 후보를 보고한다.

### 검증

```bash
WORK_DIR="/private/tmp/hyper-waterfall-task34-homebrew"
mkdir -p "$WORK_DIR"
npm view hyper-waterfall@0.2.0 version
npm view hyper-waterfall@0.2.0 dist.tarball
npm view hyper-waterfall@0.2.0 dist.integrity
curl -L https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz -o "$WORK_DIR/hyper-waterfall-0.2.0.tgz"
shasum -a 256 "$WORK_DIR/hyper-waterfall-0.2.0.tgz"
brew --version
brew config
node --version
npm --version
rg -n 'hyper-waterfall@0.2.0|registry tarball|dist.tarball|Homebrew|public tap' mydocs/report/task_m040_33_report.md docs/homebrew-formula-tap-poc.md docs/distribution-channels.md
git diff --check
```

### 커밋

```text
Task #34 Stage 1: Homebrew smoke 기준 환경 확인
```

## Stage 2 - formula 후보와 local tap 준비

### 산출물

신규:

- `mydocs/working/task_m040_34_stage2.md`

임시 산출물:

- `/private/tmp/hyper-waterfall-task34-homebrew/homebrew-hyper-waterfall-local/Formula/hyper-waterfall.rb`

수정:

- 필요 시 `docs/homebrew-formula-tap-poc.md`

### 변경 내용

- Stage 1에서 계산한 SHA256을 formula 후보의 `sha256` 값으로 사용한다.
- `/private/tmp/hyper-waterfall-task34-homebrew/homebrew-hyper-waterfall-local`에 public tap과 분리된 local tap repository를 만든다.
- formula는 `class HyperWaterfall < Formula`, npm tarball `url`, `sha256`, `license "MIT"`, `depends_on "node"`, `npm install *std_npm_args`, `bin.install_symlink libexec.glob("bin/*")` 구조를 기본으로 작성한다.
- `test do`는 최소 `hyper-waterfall --version`과 `hyper-waterfall doctor --repo #{testpath}` 실행 가능성을 검증하되, diagnostic 내용이 repository 정합성을 뜻하지 않음을 Stage 보고서에 기록한다.
- formula가 `templates/manifest.json`, migration guide, manifest checksum 정책을 복제하지 않고 CLI 설치 wrapper로만 동작하는지 수동 검토한다.
- local tap 생성은 `/private/tmp` 아래 git repository에 한정하고 GitHub public tap 생성이나 push는 하지 않는다.

### 검증

```bash
WORK_DIR="/private/tmp/hyper-waterfall-task34-homebrew"
TAP_DIR="$WORK_DIR/homebrew-hyper-waterfall-local"
mkdir -p "$TAP_DIR/Formula"
git -C "$TAP_DIR" init
test -f "$TAP_DIR/Formula/hyper-waterfall.rb"
ruby -c "$TAP_DIR/Formula/hyper-waterfall.rb"
rg -n 'class HyperWaterfall|url "|sha256 "|depends_on "node"|std_npm_args|bin.install_symlink|test do|doctor --repo' "$TAP_DIR/Formula/hyper-waterfall.rb"
! rg -n 'manifest|migration|checksum|templates/manifest|GitHub Release|canonical' "$TAP_DIR/Formula/hyper-waterfall.rb"
git diff --check
```

`! rg ...` 검증은 formula 안에 canonical 기준 복제 의심 키워드가 없음을 확인하기 위한 명령이다. `homepage` URL 같은 허용된 프로젝트 참조는 수동 검토에 함께 기록한다.

### 커밋

```text
Task #34 Stage 2: Homebrew formula 후보 준비
```

## Stage 3 - Homebrew audit/install/smoke 검증

### 산출물

신규:

- `mydocs/working/task_m040_34_stage3.md`

외부/로컬 상태:

- Homebrew local tap `postmelee/hyper-waterfall-local` 또는 path 기반 local tap
- Homebrew installed formula `hyper-waterfall`

수정:

- 필요 시 `docs/homebrew-formula-tap-poc.md`

### 변경 내용

- Stage 2의 local tap formula를 Homebrew가 인식할 수 있게 tap한다.
- 현재 Homebrew 버전에 맞는 audit 명령을 우선 실행한다. `brew audit --new --formula`가 지원되지 않으면 `brew audit --formula` 또는 `brew audit --strict --online --formula` 가능 여부를 기록한다.
- `brew install --build-from-source`로 local tap formula를 설치한다.
- 설치된 executable 경로와 `hyper-waterfall --version` 출력이 `0.2.0`인지 확인한다.
- `hyper-waterfall doctor --repo .`를 현재 task worktree에서 실행하고, 실행 전후 `git status --short`가 변하지 않는지 확인한다.
- `brew test`를 실행하고 실패하면 stdout/stderr 요약과 formula 수정 필요 여부를 같은 Stage 안에서 판단한다.
- Stage 종료 시 `brew uninstall hyper-waterfall`과 `brew untap postmelee/hyper-waterfall-local` 정리 여부를 결과에 기록한다. 정리는 local tap smoke 재현성을 해치지 않는 범위에서 수행하되, 실패 분석에 필요한 상태는 보고서에 남긴다.

### 검증

```bash
WORK_DIR="/private/tmp/hyper-waterfall-task34-homebrew"
TAP_DIR="$WORK_DIR/homebrew-hyper-waterfall-local"
brew tap postmelee/hyper-waterfall-local "$TAP_DIR"
brew audit --new --formula postmelee/hyper-waterfall-local/hyper-waterfall || brew audit --formula postmelee/hyper-waterfall-local/hyper-waterfall
brew install --build-from-source postmelee/hyper-waterfall-local/hyper-waterfall
brew list --versions hyper-waterfall
which hyper-waterfall
hyper-waterfall --version
BEFORE_STATUS="$(git status --short)"
hyper-waterfall doctor --repo .
AFTER_STATUS="$(git status --short)"
test "$BEFORE_STATUS" = "$AFTER_STATUS"
brew test postmelee/hyper-waterfall-local/hyper-waterfall
git status --short
git diff --check
```

정리 후보:

```bash
brew uninstall hyper-waterfall
brew untap postmelee/hyper-waterfall-local
```

정리 명령은 설치 smoke 결과를 기록한 뒤 실행한다. uninstall/untap 실패는 task 실패로 바로 간주하지 않고 남은 로컬 상태로 기록한다.

### 커밋

```text
Task #34 Stage 3: Homebrew local tap smoke 검증
```

## Stage 4 - 결과 문서화와 public tap readiness 판단

### 산출물

신규:

- `mydocs/working/task_m040_34_stage4.md`
- 필요 시 `mydocs/tech/task_m040_34_homebrew_local_tap_smoke.md`

수정:

- `docs/homebrew-formula-tap-poc.md` 또는 `docs/distribution-channels.md`
- `mydocs/orders/20260510.md`

### 변경 내용

- Stage 1~3의 SHA256, formula 후보 핵심 내용, audit/install/smoke 결과를 public tap 배포 판단용으로 정리한다.
- public tap 배포 가능 조건과 보류 조건을 분리한다.
- local smoke에서 성공한 명령과 실패/경고가 있는 명령을 구분해 최종 보고서에서 재사용 가능하게 남긴다.
- #35에서 이어갈 항목을 정리하되 README public Homebrew 설치 안내는 이번 Stage에서 추가하지 않는다.
- 오늘할일 비고를 Stage 결과에 맞게 갱신한다.

### 검증

```bash
rg -n 'Homebrew|formula|tap|SHA256|brew audit|brew install|doctor|public tap|보류|readiness' docs mydocs/tech mydocs/working mydocs/orders/20260510.md
git diff --check
git status --short --branch
```

### 커밋

```text
Task #34 Stage 4: Homebrew smoke 결과 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- Homebrew가 설치되어 있지 않거나 local tap smoke를 수행할 수 없으면 Stage 보고서에 blocked 상태와 재현 조건을 기록하고, public tap readiness는 보류로 판단한다.
- `brew audit`, `brew install`, `brew test` 결과가 Homebrew 버전에 따라 달라지면 실행한 Homebrew version과 대체 명령을 단계 보고서에 기록한다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m040_34_stage{N}.md`를 함께 묶는다.
- 문서 산출물이 있는 Stage는 관련 문서와 단계 보고서를 같은 커밋에 묶는다.
- `/private/tmp` 아래 formula와 local tap 산출물은 Git 커밋에 포함하지 않는다. 필요한 내용은 단계 보고서나 별도 문서에 재현 가능한 형태로 기록한다.
- 커밋 메시지는 `Task #34 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 구현계획서 승인 전에는 Stage 1 산출물을 만들거나 Homebrew 명령을 실행하지 않는다.

## 단계 의존성

- Stage 2는 Stage 1에서 npm tarball URL, SHA256, Homebrew/Node 환경이 확인된 뒤 진행한다.
- Stage 3은 Stage 2에서 formula 후보 syntax와 책임 경계 검토가 끝난 뒤 진행한다.
- Stage 3의 `brew tap`, `brew install`, `brew test`, 정리 명령은 로컬 Homebrew 상태를 바꾸므로 구현계획서 승인 후에만 실행한다.
- Stage 4는 Stage 3의 smoke 결과가 성공했거나 실패/blocked 상태를 보고하기로 판단한 뒤 진행한다.
- 최종 결과보고서와 PR 게시는 Stage 4 승인 이후 `task-final-report` 절차로 진행한다.

## 위험과 대응

- **Homebrew 로컬 상태 변경**: Stage 3 명령이 tap 목록과 installed formula를 바꿀 수 있다. local tap 이름을 `postmelee/hyper-waterfall-local`로 분리하고, 결과 기록 뒤 uninstall/untap 정리 후보를 실행한다.
- **audit 명령 호환성**: Homebrew 버전별로 `brew audit --new --formula` 지원 여부가 다를 수 있다. 실패하면 지원되는 대체 audit 명령과 실패 원문 요약을 보고한다.
- **formula 설치 layout 불일치**: `std_npm_args` 결과의 `bin` layout이 예상과 다르면 formula를 같은 Stage 안에서 보정하고, `which hyper-waterfall`과 `brew test`로 확인한다.
- **doctor 출력 오해**: `doctor` diagnostic은 적용 저장소 정합성 평가가 아니라 CLI 실행과 read-only smoke 근거로만 사용한다. repository 파일 변경 없음은 `git status --short` 전후 비교로 확인한다.
- **네트워크 의존성**: npm tarball download와 Homebrew dependency fetch가 네트워크 상태에 의존한다. 실패 시 시각, 명령, 오류 요약을 남기고 재시도 또는 blocked 판단을 요청한다.
- **public tap 오인**: 이번 task는 local tap smoke까지이며 public tap 생성, formula push, README 설치 안내는 #35 이후 별도 승인 대상으로 남긴다.

## 승인 요청 사항

- Stage 1~4 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Stage 3에서 `brew tap`, `brew install --build-from-source`, `brew test`, `brew uninstall`, `brew untap`이 로컬 Homebrew 상태를 변경할 수 있음을 승인?
- `/private/tmp` 산출물은 커밋하지 않고 단계 보고서와 필요 문서에 재현 가능한 결과만 남기는 방향에 동의?
- public tap 생성, formula push, README Homebrew 설치 안내, 자동화 구현을 이번 task에서 제외하는 방향에 동의?

승인되면 Stage 1 구현을 시작한다.
