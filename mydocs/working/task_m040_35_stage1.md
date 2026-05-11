# Task #35 Stage 1 보고서 - Homebrew public tap 승인 조건 정리

GitHub Issue: [#35](https://github.com/postmelee/hyper-waterfall/issues/35)
구현계획서: [`task_m040_35_impl.md`](../plans/task_m040_35_impl.md)
Stage: 1

## 단계 목적

이번 Stage의 목적은 Task #34 local tap smoke 결과를 public tap 배포 단계로 넘기기 전에, 외부 공개 작업의 승인 조건과 repo 내부 문서 작업의 승인 조건을 분리해 고정하는 것이다.

Stage 1에서는 public tap repository를 만들거나 formula를 push하지 않았다. 다음 Stage에서 수행할 수 있는 외부 작업의 후보, 기본 이름, 검증 조건, 보류 조건만 문서화했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m040_35_stage1.md` | public tap 승인 조건, 기본 후보, 외부 작업 승인 항목, 검증 결과 기록 |
| `mydocs/orders/20260510.md` | #35 상태를 Stage 1 완료와 public tap 생성·formula push 승인 대기로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

신규 Stage 보고서 작성과 오늘할일 1행 비고 갱신만 수행했다. 기존 Homebrew PoC 문서, README, release notes, 배포 채널 문서 본문은 Stage 1에서 수정하지 않았다.

## 확인한 기준

Task #34에서 이미 충족된 조건:

- `hyper-waterfall@0.2.0` npm publish와 registry tarball URL 확인
- npm tarball SHA256 `34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7` 확인
- local tap formula 후보 syntax와 구조 확인
- local tap 기준 `brew audit --new --formula`, `brew install --build-from-source`, `hyper-waterfall --version`, `hyper-waterfall doctor --repo .`, `brew test` 통과
- `doctor --repo .` 실행 전후 repository 파일 변경 없음

Task #34에서 #35로 남긴 보류 조건:

- 작업지시자의 public tap 배포 명시 승인
- public tap repository 이름, 기본 branch, 공개 범위 확정
- formula source를 public tap에만 둘지 본 저장소에도 초안/검증 기록을 둘지 결정
- README 또는 release notes에 Homebrew 설치 안내를 추가할지 승인
- Homebrew `node` 의존성과 `/opt/homebrew/bin/npm`, `/opt/homebrew/bin/npx` link overwrite backup warning 안내 여부 결정
- release마다 formula `url`과 `sha256`을 갱신하는 운영 방식 결정

## Stage 2 기본 후보

| 항목 | Stage 2 기본 후보 | 판단 |
|---|---|---|
| public tap repository | `postmelee/homebrew-tap` | Homebrew GitHub tap naming 관례에 맞춘다. 사용자 명령에서는 `postmelee/tap`으로 축약된다. |
| 공개 범위 | `public` | Homebrew public install 경로 검증이 목적이므로 public repository가 필요하다. |
| 기본 branch | `main` | 본 저장소 기준과 맞춘다. |
| formula 경로 | `Formula/hyper-waterfall.rb` | Homebrew tap 일반 구조를 따른다. |
| formula source 보관 | public tap repository를 공식 source로 둔다. 본 저장소에는 공식 copy를 두지 않고 검증 기록만 둔다. | 중복 source drift를 줄인다. |
| formula 입력 | npm tarball wrapper | Task #34에서 통과한 접근이며 canonical 기준을 formula 내부로 복제하지 않는다. |
| 설치 이름 | `postmelee/tap/hyper-waterfall` | 문서와 smoke에서 사용할 공개 설치 경로 후보. |

GitHub repository 존재 여부:

- `gh repo view postmelee/homebrew-tap --json nameWithOwner,visibility,defaultBranchRef,url`
- 결과: `GraphQL: Could not resolve to a Repository with the name 'postmelee/homebrew-tap'. (repository)`
- 판단: Stage 2에서 public tap 배포를 승인한다면 repository 생성이 필요하다.

## Stage 2에서 별도 승인해야 할 외부 작업

다음 작업은 외부에 공개되거나 사용자에게 보이는 변경이므로 Stage 2 진입 승인에서 명시적으로 허용되어야 한다.

- GitHub public repository `postmelee/homebrew-tap` 생성
- tap repository에 `Formula/hyper-waterfall.rb` commit/push
- public tap 경로에서 `brew tap postmelee/tap`, `brew install postmelee/tap/hyper-waterfall`, `brew test postmelee/tap/hyper-waterfall` smoke 실행
- public smoke 성공 후 README 또는 release notes에 Homebrew 설치 안내 추가

Stage 2에서 repository 생성이나 formula push가 승인되지 않으면, Stage 2는 배포 보류 보고서 작성으로 종료하고 Stage 3 public smoke로 넘어가지 않는다.

## 문서 반영 후보

| 문서 | Stage 4 후보 반영 |
|---|---|
| `README.md` | 사용자-facing 설치 안내를 짧게 추가하는 1차 후보. `npx` 안내 근처에 Homebrew를 macOS 설치 wrapper로 설명한다. |
| `docs/releases/v0.2.0.md` | v0.2.0 배포 채널 상태를 release notes 후보에 반영할 수 있다. |
| `docs/homebrew-formula-tap-poc.md` | public tap 승인 게이트와 실제 public smoke 결과를 갱신한다. |
| `docs/distribution-channels.md` | Homebrew 상태를 PoC 후보에서 public tap 공개 또는 보류 상태로 갱신한다. |

## 검증 결과

실행 명령:

```bash
rg -n 'public tap|homebrew-tap|postmelee/tap|Homebrew|node|README|release notes|보류|승인' docs mydocs
rg -n '34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7|hyper-waterfall@0.2.0|brew test|doctor --repo' docs/homebrew-formula-tap-poc.md mydocs/tech/task_m040_34_homebrew_local_tap_smoke.md mydocs/plans/task_m040_35.md
gh repo view postmelee/homebrew-tap --json nameWithOwner,visibility,defaultBranchRef,url
rg -n 'Homebrew|brew|release notes|install|npx|npm' README.md docs/releases/v0.2.0.md docs/releases/v0.2.0-npm-publish.md docs/distribution-channels.md
git diff --check
```

결과:

- OK: 첫 번째 `rg`에서 #34 smoke 결과, PoC 문서, distribution channel 문서, #35 계획/구현계획서의 public tap, Homebrew, node, README/release notes, 승인/보류 항목을 확인했다.
- OK: 두 번째 `rg`에서 Task #34 SHA256, `hyper-waterfall@0.2.0`, `doctor --repo`, `brew test` 근거를 확인했다.
- OK: `gh repo view postmelee/homebrew-tap ...`는 승인된 네트워크 접근 기준 repository가 없음을 확인했다.
- OK: README와 release notes 후보 문서에서 현재 npm/npx 안내와 Homebrew wrapper/canonical 경계 문구를 확인했다.
- OK: `git diff --check`는 경고 없이 통과했다.

수동 확인:

- OK: Stage 1 보고서는 외부 공개 작업 승인 항목과 repo 내부 문서 작업 승인 항목을 분리했다.
- OK: #35 수용 기준의 "public tap 경로 존재 또는 보류 사유 기록"은 Stage 2의 분기 조건으로 반영되어 있다.
- OK: Stage 1에서는 public repository 생성, formula push, README 공개 설치 안내 추가를 수행하지 않았다.

## 잔여 위험

- `postmelee/homebrew-tap` repository가 아직 없으므로 Stage 2 승인 시 외부 public repository 생성이 필요하다.
- public tap 생성과 formula push는 외부에 노출되는 작업이다. Stage 2에서 명시 승인 없이 진행하면 안 된다.
- Homebrew `node` 의존성은 사용자 환경의 Homebrew `npm`/`npx` link 상태에 영향을 줄 수 있다. Stage 3 smoke와 Stage 4 문서에서 안내 여부를 다시 확인해야 한다.
- formula 업데이트 자동화는 이번 task 범위가 아니므로 release마다 수동 갱신하거나 후속 이슈로 분리해야 한다.

## 다음 단계 영향

Stage 2는 아래 조건이 승인되어야 진행할 수 있다.

- public repository `postmelee/homebrew-tap` 생성 승인
- `Formula/hyper-waterfall.rb`를 public tap repository에 commit/push 승인
- formula 값은 Task #34에서 검증한 npm tarball URL과 SHA256 사용 승인
- repository 기본 branch `main`, 공개 범위 `public`, 설치 이름 `postmelee/tap/hyper-waterfall` 승인

Stage 2가 완료되어 public tap formula가 공개 경로에 존재해야 Stage 3 public smoke로 넘어갈 수 있다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
- Stage 2 진행은 다음 외부 공개 작업 승인을 포함한다: `postmelee/homebrew-tap` public repository 생성, `Formula/hyper-waterfall.rb` commit/push, 이후 public tap smoke 준비.
