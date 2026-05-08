# task_m020_21_report.md - npm publish 준비와 배포 전 검증 정리 최종 보고서

GitHub Issue: [#21](https://github.com/postmelee/hyper-waterfall/issues/21)
마일스톤: M020

## 작업 요약

- 대상 이슈: #21
- 마일스톤: M020
- 단계 수: 4
- 작업 목적: `hyper-waterfall@0.2.0` npm publish 전에 필요한 package metadata, tarball 구성, smoke test, README 정합성, publish 승인 게이트를 정리한다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `package.json` | npm registry metadata용 `repository`, `bugs`, `homepage` 필드 추가 | npm package metadata. CLI 동작 변경 없음 |
| `docs/releases/v0.2.0-npm-publish.md` | npm publish 전 체크리스트, 로컬 tarball smoke, publish 전/후 확인, rollback 리스크, Stage 4 검증 결과 정리 | release 운영 문서 |
| `README.md` | 첫 npm publish 전 `npx` 예시는 publish 이후 안정 경로임을 명시 | 사용자-facing 안내 |
| `docs/distribution-channels.md` | npm publish 준비 문서 연결, publish 실행과 자동화 분리, 구현 후보 정렬 | 배포 채널 전략 문서 |
| `docs/releases/v0.2.0.md` | npm publish 준비 문서 기준 연결 | `v0.2.0` release/tag 준비 문서 |
| `mydocs/plans/task_m020_21.md` | 수행계획서 작성 | task 추적 문서 |
| `mydocs/plans/task_m020_21_impl.md` | 4단계 구현계획서 작성 | task 추적 문서 |
| `mydocs/working/task_m020_21_stage1.md` | Stage 1 완료 보고 | task 추적 문서 |
| `mydocs/working/task_m020_21_stage2.md` | Stage 2 완료 보고 | task 추적 문서 |
| `mydocs/working/task_m020_21_stage3.md` | Stage 3 완료 보고 | task 추적 문서 |
| `mydocs/working/task_m020_21_stage4.md` | Stage 4 완료 보고 | task 추적 문서 |
| `mydocs/orders/20260509.md` | #21 상태를 완료로 갱신 | 오늘할일 보드 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| npm registry metadata | `repository`, `bugs`, `homepage` 없음 | 3개 필드 추가 |
| npm publish 준비 문서 | 없음 | `docs/releases/v0.2.0-npm-publish.md` 신설 |
| 단계 보고서 | 없음 | Stage 1~4 보고서 4개 작성 |
| 최종 보고 전 diff 통계 | 0 files | 12 files, 818 insertions, 6 deletions |
| `npm test` | 미실행 | 8개 테스트 pass |
| `npm pack --dry-run` | 미실행 | total files 53, package size 74.4 kB |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| npm publish 전에 확인해야 할 파일 포함 범위와 smoke test가 명확하다 | OK — `docs/releases/v0.2.0-npm-publish.md`에 tarball 구성 체크리스트와 로컬 tarball smoke 절차를 작성했다. |
| `hyper-waterfall@0.2.0` publish 이유와 `v0.2.0` release/tag 관계가 정리된다 | OK — npm package는 편의 실행 채널이고 canonical 기준은 GitHub Release/tag + manifest + migration guide임을 문서화했다. |
| README의 `npx` 예시가 실제 publish 상태와 충돌하지 않는다 | OK — 첫 npm publish 전에는 `npx` 예시가 publish 이후 안정 경로임을 명시했다. |
| publish 실행은 별도 승인 없이 자동 수행되지 않는다 | OK — `npm publish`, `git tag`, `gh release create`를 실행하지 않았고 별도 승인 게이트로 남겼다. |
| `npm test` | OK — 8개 테스트 모두 pass. |
| `npm pack --dry-run` | OK — sandbox의 npm cache 권한 문제로 최초 실패했으나 외부 권한 재실행 기준 통과. total files 53. |
| `node bin/hyper-waterfall.js --version` | OK — `0.2.0` 출력. |
| `node bin/hyper-waterfall.js --help` | OK — `init`, `update`, `doctor`와 canonical 기준 안내 출력. |
| `git diff --check` | OK — 공백 오류 없음. |

### 단계별 검증 결과

- Stage 1: [task_m020_21_stage1.md](../working/task_m020_21_stage1.md) — package metadata 보강, `npm test`, dry-run pack, CLI version/help 통과.
- Stage 2: [task_m020_21_stage2.md](../working/task_m020_21_stage2.md) — npm publish 준비 문서 작성, 체크리스트 grep, `git diff --check` 통과.
- Stage 3: [task_m020_21_stage3.md](../working/task_m020_21_stage3.md) — README와 배포 채널 정합성 보강, npm registry `E404 Not Found`로 publish 전 상태 확인.
- Stage 4: [task_m020_21_stage4.md](../working/task_m020_21_stage4.md) — 통합 검증, local tarball install smoke, bundled manifest `init --dry-run` 통과.

## 잔여 위험과 후속 작업

### 잔여 위험

- npm cache에 root-owned file이 있어 sandbox 권한으로 `npm pack`과 `npm install`이 실패한다. publish 전 maintainer 환경에서는 npm cache 권한을 정리하거나 외부 권한 실행 기준을 명확히 해야 한다.
- 실제 `npm publish`는 아직 실행하지 않았다. publish 이후 `npm view`, `dist-tags`, `gitHead`, `npx hyper-waterfall@0.2.0` 검증이 필요하다.
- README의 "첫 npm publish 전" 문구는 publish 완료 후 상태에 맞게 후속 갱신해야 한다.

### 후속 작업 후보

- 작업지시자 별도 승인 후 `v0.2.0` GitHub Release/tag 생성과 `npm publish` 실행.
- publish 완료 후 README의 publish 전 안내를 publish 완료 상태로 갱신.
- publish 완료 후 `npm view hyper-waterfall@0.2.0`, `npx hyper-waterfall@0.2.0 --version`, `--help` 검증 결과 기록.

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 승인하면 `publish/task21` 원격 브랜치와 `main` 대상 PR 게시 절차로 진행한다.
