# Task #34 최종 보고서 - Homebrew formula local tap smoke PoC

GitHub Issue: [#34](https://github.com/postmelee/hyper-waterfall/issues/34)
마일스톤: M040

## 작업 요약

- 대상 이슈: #34
- 마일스톤: M040
- 단계 수: 4
- 작업 목적: `hyper-waterfall@0.2.0` npm tarball wrapper formula를 macOS local tap에서 검증하고, public tap 배포 전 readiness와 보류 조건을 정리한다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `mydocs/orders/20260510.md` | #34 상태를 진행중에서 완료로 변경 | 작업 추적 문서 |
| `mydocs/plans/task_m040_34.md` | 수행계획서 작성 | 작업 범위와 승인 기준 |
| `mydocs/plans/task_m040_34_impl.md` | Stage 1-4 구현계획서 작성 | 작업 실행 계획과 검증 명령 |
| `mydocs/working/task_m040_34_stage1.md` | npm tarball URL, integrity, SHA256, Homebrew/Node 환경 확인 결과 기록 | 단계 보고서 |
| `mydocs/working/task_m040_34_stage2.md` | Homebrew formula 후보와 `/private/tmp` local tap repository 준비 결과 기록 | 단계 보고서 |
| `mydocs/working/task_m040_34_stage3.md` | `brew audit`, install, `--version`, `doctor`, `brew test`, cleanup 결과 기록 | 단계 보고서 |
| `mydocs/working/task_m040_34_stage4.md` | smoke 결과 문서화와 public tap readiness 판단 결과 기록 | 단계 보고서 |
| `mydocs/tech/task_m040_34_homebrew_local_tap_smoke.md` | local tap smoke 결과 문서 신설. tarball URL/SHA256, formula 후보, 검증 결과, 보류 조건, #35 인계 항목 정리 | Homebrew public tap 배포 전 판단 근거 |
| `docs/homebrew-formula-tap-poc.md` | Task #34 smoke 결과 링크, 확인된 SHA256, public tap 승인 게이트 상태, 후속 작업 후보 갱신 | 기존 Homebrew PoC 설계 문서 |
| `mydocs/report/task_m040_34_report.md` | 최종 결과보고서 작성 | PR 전 장기 보관 보고 |

외부/로컬 산출물:

- npm registry tarball: `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz`
- tarball SHA256: `34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7`
- local tap formula 후보: `/private/tmp/hyper-waterfall-task34-homebrew/homebrew-hyper-waterfall-local/Formula/hyper-waterfall.rb`
- local tap repository commit: `508c633 Add hyper-waterfall formula candidate`

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| npm tarball SHA256 | 미기록 | `34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7` 기록 |
| Homebrew formula 후보 | 설계 문서의 placeholder 초안 | 실제 SHA256을 채운 formula 후보 작성 및 local tap 검증 |
| Homebrew local install smoke | 미수행 | `brew install --build-from-source` 통과 |
| CLI version smoke | 미수행 | `hyper-waterfall --version` -> `0.2.0` |
| `doctor` read-only smoke | 미수행 | `hyper-waterfall doctor --repo .` exit 0, 전후 `git status --short` 빈 출력 |
| `brew test` | 미수행 | 통과 |
| public tap readiness | 승인 게이트만 존재 | local technical smoke 통과, public 배포는 보류 조건 분리 |
| 문서 변경량 | 없음 | 최종 보고 전 기준 9개 파일, 918 insertions, 16 deletions. 이후 최종 보고서와 오늘할일 완료 처리 추가 |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| npm tarball SHA256이 재현 가능하게 기록된다. | OK — Stage 1에서 tarball을 내려받고 `shasum -a 256`으로 `34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7` 확인 |
| local tap formula가 `hyper-waterfall@0.2.0` CLI를 설치한다. | OK — Stage 3에서 `brew install --build-from-source postmelee/hyper-waterfall-local/hyper-waterfall` 통과 |
| `hyper-waterfall --version`이 `0.2.0`을 출력한다. | OK — Stage 3에서 `/opt/homebrew/bin/hyper-waterfall` 기준 `0.2.0` 출력 |
| `hyper-waterfall doctor --repo .`가 실행되고 파일을 수정하지 않는다. | OK — Stage 3에서 exit 0, 실행 전후 `git status --short` 빈 출력 |
| `brew audit --new --formula`가 통과한다. | OK — Stage 3에서 name 기반 audit가 출력 없이 성공 |
| `brew test` 가능 여부를 확인한다. | OK — Stage 3에서 `brew test postmelee/hyper-waterfall-local/hyper-waterfall` 통과 |
| formula가 manifest, migration guide, checksum 정책을 복제하지 않는다. | OK — Stage 2에서 canonical 기준 복제 의심 키워드 no-match 검증, Stage 4 문서에 CLI wrapper 경계 기록 |
| public tap 배포 가능 여부와 보류 조건이 정리된다. | OK — `mydocs/tech/task_m040_34_homebrew_local_tap_smoke.md`와 `docs/homebrew-formula-tap-poc.md`에 local smoke 통과와 public 배포 보류 조건 분리 |
| `git diff --check`가 경고 없이 통과한다. | OK — Stage 1-4와 최종 보고 전 통합 검증에서 통과 |

### 단계별 검증 결과

- Stage 1: [`task_m040_34_stage1.md`](../working/task_m040_34_stage1.md) — npm registry metadata, tarball URL, integrity, SHA256, Homebrew/Node/npm 환경 확인. 샌드박스 네트워크 실패 후 승인된 네트워크 접근으로 `npm view`와 tarball download 통과.
- Stage 2: [`task_m040_34_stage2.md`](../working/task_m040_34_stage2.md) — 실제 SHA256을 채운 formula 후보 작성, `ruby -c` syntax OK, 필수 formula 요소와 canonical 기준 미복제 확인.
- Stage 3: [`task_m040_34_stage3.md`](../working/task_m040_34_stage3.md) — local tap 등록, audit, install, `--version`, `doctor`, `brew test` 통과. `brew uninstall`과 `brew untap` cleanup 완료.
- Stage 4: [`task_m040_34_stage4.md`](../working/task_m040_34_stage4.md) — smoke 결과 문서화, public tap readiness 판단, #35 인계 항목 정리.

통합 검증:

- `test -f mydocs/plans/task_m040_34.md` 등 계획서와 Stage 1-4 보고서 존재 확인 -> 통과
- `test -f mydocs/tech/task_m040_34_homebrew_local_tap_smoke.md` -> 통과
- `rg -n 'SHA256|34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7|brew audit|brew install --build-from-source|hyper-waterfall --version|doctor --repo|brew test|public tap|보류' ...` -> 통과
- `git diff --check` -> 통과
- `git status --short --branch` -> PR 게시 직전 기준 작업트리 clean

## 잔여 위험과 후속 작업

### 잔여 위험

- public tap 배포는 아직 승인되지 않았다. 이번 task는 local tap smoke PoC 완료까지다.
- `brew install` 중 Homebrew `node 26.0.0` 의존성이 설치되며 `/opt/homebrew/bin/npm`, `/opt/homebrew/bin/npx` overwrite backup 경고가 있었다. #35에서 사용자 안내 또는 troubleshooting 반영 여부를 결정해야 한다.
- 이번 smoke는 macOS `26.3.1-arm64`, Homebrew `5.1.10-52-g1c3a79e` 기준이다. 다른 macOS/Homebrew 버전에서는 audit 경고나 dependency graph가 달라질 수 있다.
- public tap repository 이름, 기본 branch, 공개 범위, formula source 보관 위치가 아직 확정되지 않았다.
- release마다 formula `url`과 `sha256`을 갱신하는 운영 방식이 아직 없다.

### 후속 작업 후보

- #35 Homebrew public tap 배포와 설치 안내: Task #34에서 확인한 tarball URL, SHA256, formula 후보를 public tap 후보로 이관
- public tap repository 이름 후보 결정: `homebrew-tap` 또는 `homebrew-hyper-waterfall`
- public tap 기준 `brew audit --new --formula`, `brew install --build-from-source`, `brew test` 재검증
- README 또는 release notes에 Homebrew 설치 안내를 추가할지 별도 승인
- Homebrew `node` 의존성과 `npm`/`npx` link overwrite backup 가능성을 사용자 안내 또는 troubleshooting에 반영할지 결정
- release마다 formula를 갱신하는 수동 checklist 또는 자동화 이슈 등록

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 승인하면 PR 게시 절차로 진행한다.
