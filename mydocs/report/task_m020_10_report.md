# task_m020_10_report.md - npm CLI MVP로 init/update/doctor 제공 최종 보고서

GitHub Issue: [#10](https://github.com/postmelee/hyper-waterfall/issues/10)
마일스톤: M020

## 작업 요약

- 대상 이슈: #10
- 마일스톤: M020
- 단계 수: 4
- 작업 목적: npm CLI MVP로 `init`, `update`, `doctor`를 제공해 manifest/version 기반 lifecycle 판단 결과를 로컬에서 재현 가능하게 출력한다.

이번 작업은 GitHub Release/tag, `templates/manifest.json`, migration guide를 canonical 기준으로 유지하면서, npm CLI를 편의 실행 채널로 추가했다. CLI는 파일 적용 전에 판단 결과와 승인 요청을 출력하며, 사용자 저장소 파일을 자동으로 덮어쓰거나 수정하지 않는다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `package.json` | npm package metadata, `bin.hyper-waterfall`, `npm test` 추가 | npm CLI 실행과 로컬 test 진입점 |
| `bin/hyper-waterfall.js` | `hyper-waterfall` 실행 파일 추가 | CLI entrypoint |
| `src/cli.js` | 전역 help/version, command dispatch, unknown command 처리 추가 | CLI 공통 실행 흐름 |
| `src/commands/init.js` | 신규 적용 판단 결과 출력 구현 | 신규 적용 dry-run |
| `src/commands/update.js` | 기존 업데이트 판단 결과 출력 구현 | 기존 적용 저장소 update dry-run |
| `src/commands/doctor.js` | version/source/target/symlink/placeholder 진단 구현 | 적용 저장소 상태 점검 |
| `src/lib/manifest.js` | manifest parse/검증, source/target 상태 요약, 후보 분류, bundled manifest fallback 추가 | CLI lifecycle 판단 공통 로직 |
| `src/lib/version-state.js` | `.hyper-waterfall/version.json` reader 추가 | version 상태 확인 |
| `src/lib/output.js` | help, lifecycle report, diagnostic report 출력 helper 추가 | CLI 출력 구조 |
| `test/cli-smoke.test.js` | CLI smoke test 8개 추가 | 로컬 검증 |
| `README.md` | `npx hyper-waterfall init/update/doctor` 예시와 canonical 기준 설명 추가 | 사용자 진입 안내 |
| `docs/migrations/README.md` | CLI 출력 기준을 실제 `init`/`update`/`doctor` 기준으로 보정 | migration guide와 CLI 연결 |
| `docs/migrations/v0.1.0-to-v0.2.0.md` | CLI 출력 기준과 보류 항목을 현재 MVP 범위에 맞게 보정 | M020 migration 기준 |
| `mydocs/plans/task_m020_10.md` | 수행계획서 작성 | 작업 추적 |
| `mydocs/plans/task_m020_10_impl.md` | 구현계획서 작성 | 단계 계획 |
| `mydocs/working/task_m020_10_stage1.md` | Stage 1 보고서 작성 | 단계 기록 |
| `mydocs/working/task_m020_10_stage2.md` | Stage 2 보고서 작성 | 단계 기록 |
| `mydocs/working/task_m020_10_stage3.md` | Stage 3 보고서 작성 | 단계 기록 |
| `mydocs/working/task_m020_10_stage4.md` | Stage 4 보고서 작성 | 단계 기록 |
| `mydocs/orders/20260508.md` | 오늘할일 상태 갱신 | 작업 보드 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| CLI package metadata | 없음 | `package.json` 29줄 |
| CLI executable | 없음 | `bin/hyper-waterfall.js` 13줄 |
| CLI source | 없음 | `src/` 1103줄 |
| CLI smoke test | 없음 | `test/cli-smoke.test.js` 130줄, 8개 test |
| CLI 명령 | 없음 | `init`, `update`, `doctor`, `--help`, `--version` |
| 작업 단계 보고서 | 없음 | 4개 |
| 전체 diff | 없음 | 20 files changed, 1991 insertions, 7 deletions |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| `npx` 또는 로컬 `node bin/hyper-waterfall.js` 경로로 `init`, `update`, `doctor` MVP를 실행할 수 있다 | OK — `node bin/hyper-waterfall.js init/update/doctor ...` 검증 통과, README에 `npx` 예시 추가 |
| CLI가 `templates/manifest.json`을 읽고 필수 필드 누락을 진단한다 | OK — `src/lib/manifest.js`에서 필수 필드 검증, Ruby JSON parse 통과 |
| CLI가 `.hyper-waterfall/version.json` 존재 여부와 파싱 가능 여부를 진단한다 | OK — `update`와 `doctor`에서 version state 누락/parse 결과 출력 |
| `init`과 `update`는 파일 적용 전 판단 결과와 승인 요청을 출력한다 | OK — `신규 적용 판단 결과`, `기존 업데이트 판단 결과`, `승인 요청`, safety 문구 출력 |
| `doctor`는 상태 점검 결과를 출력하되 사용자 수정 파일을 자동 덮어쓰지 않는다 | OK — `OK/WARN/ERROR/INFO` 진단과 `자동 수정하지 않습니다` 문구 출력 |
| README가 npm을 편의 실행 채널로 설명하고 GitHub Release/tag + manifest + migration guide를 canonical 기준으로 유지한다 | OK — README의 신규 적용 섹션에 `npx` 예시와 canonical 기준 설명 추가 |
| `git status --short`가 PR 준비 전 빈 출력이다 | OK — 최종 보고 커밋 전 변경 파일만 남아 있음, 커밋 후 재확인 예정 |
| `git diff --check`가 경고 없이 통과한다 | OK — 통합 검증에서 통과 |

### 단계별 검증 결과

- Stage 1: [`task_m020_10_stage1.md`](../working/task_m020_10_stage1.md) — help/version/package metadata, `npm test`, `git diff --check` 통과.
- Stage 2: [`task_m020_10_stage2.md`](../working/task_m020_10_stage2.md) — `init --dry-run`, `update --dry-run`, manifest parse, 출력 필드 grep, `npm test`, `git diff --check` 통과.
- Stage 3: [`task_m020_10_stage3.md`](../working/task_m020_10_stage3.md) — `doctor`, 비파괴 safety 문구, 쓰기 API 부재 확인, `npm test`, `git diff --check` 통과.
- Stage 4: [`task_m020_10_stage4.md`](../working/task_m020_10_stage4.md) — 전체 CLI smoke, README/docs grep, placeholder 보존, bundled manifest fallback, `npm test`, `git diff --check` 통과.

통합 검증:

```bash
npm test
node bin/hyper-waterfall.js --version
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --dry-run
node bin/hyper-waterfall.js update --repo . --manifest templates/manifest.json --from v0.1.0 --to v0.2.0 --dry-run
node bin/hyper-waterfall.js doctor --repo . --manifest templates/manifest.json
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n 'npx hyper-waterfall (init|update|doctor)|canonical|GitHub Release|manifest|migration|편의 실행 채널' README.md docs templates/mydocs/manual
grep -nF '{REPO_SLUG}' templates/AGENTS.md templates/.github/pull_request_template.md
git diff --check
node bin/hyper-waterfall.js init --repo /private/tmp --dry-run
```

결과:

- OK: `npm test` 8개 test pass.
- OK: CLI version `0.2.0` 출력.
- OK: `init`, `update`, `doctor` 실행 결과가 수용 기준 필드를 포함.
- OK: manifest JSON parse 통과.
- OK: README/docs/manual 검색으로 `npx`, canonical 기준, manifest/migration 설명 확인.
- OK: `{REPO_SLUG}` placeholder 보존 확인.
- OK: `git diff --check` 통과.
- OK: framework repository 밖의 `/private/tmp` 대상으로 bundled manifest fallback 동작 확인.

## 잔여 위험과 후속 작업

### 잔여 위험

- `manifest diff`는 MVP 수준의 target-status/update-policy 요약이다. 이전 release manifest checksum과의 완전 비교나 자동 병합은 이번 범위가 아니다.
- `init`, `update`, `doctor`는 판단 결과와 진단만 출력한다. 실제 파일 적용, symlink 재생성, PR 생성 자동화, npm publish는 수행하지 않는다.
- README의 `npx` 예시는 npm package publish 이후 사용자 경로다. publish 전 로컬 검증은 `node bin/hyper-waterfall.js ...`가 기준이다.

### 후속 작업 후보

- npm publish 준비와 실제 registry 배포 승인 작업.
- release manifest checksum 확정 후 checksum 기반 diff/doctor 진단 강화.
- update PR 생성 보조 기능은 별도 이슈에서 승인 게이트를 유지한 채 검토.

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 승인하면 PR 게시 절차로 진행한다.
