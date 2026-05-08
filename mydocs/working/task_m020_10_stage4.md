# task_m020_10_stage4.md - README와 CLI 검증 정리 단계 보고서

GitHub Issue: [#10](https://github.com/postmelee/hyper-waterfall/issues/10)
구현계획서: [`task_m020_10_impl.md`](../plans/task_m020_10_impl.md)
Stage: 4

## 단계 목적

Stage 4는 Stage 1~3에서 구현한 CLI MVP를 사용자 안내와 로컬 검증 기준에 연결하는 단계다. 이번 단계에서는 README에 `npx hyper-waterfall init/update/doctor` 예시를 추가하고, npm CLI가 canonical 배포 기준을 대체하지 않는 편의 실행 채널임을 명시했다. 또한 `npx` 형태 사용을 고려해 기본 manifest가 대상 저장소에 없으면 패키지에 포함된 manifest로 fallback되도록 보정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | 신규/업데이트 진입 안내에 npm CLI 예시와 canonical 기준·비자동 적용 경계 추가 |
| `docs/migrations/README.md` | CLI 출력 기준 문구를 실제 `init`/`update`/`doctor` 기준으로 보정 |
| `docs/migrations/v0.1.0-to-v0.2.0.md` | CLI 출력 기준 문구와 보류 항목을 현재 MVP 범위에 맞게 보정 |
| `src/lib/manifest.js` | 대상 저장소에 manifest가 없을 때 패키지 bundled manifest로 fallback |
| `src/commands/init.js` | 기본 manifest help 문구를 fallback 동작과 일치시킴 |
| `src/commands/doctor.js` | 기본 manifest help 문구를 fallback 동작과 일치시킴 |
| `test/cli-smoke.test.js` | framework repository 밖에서도 bundled manifest로 `init --dry-run`이 동작하는 smoke test 추가 |

파일 규모:

```text
533 README.md
99 docs/migrations/README.md
122 docs/migrations/v0.1.0-to-v0.2.0.md
239 src/lib/manifest.js
133 src/commands/init.js
255 src/commands/doctor.js
130 test/cli-smoke.test.js
1511 total
```

## 본문 변경 정도 / 본문 무손실 여부

README는 "새 저장소에 빠르게 적용하기" 섹션에 npm CLI 예시와 편의 실행 채널 설명을 추가하는 수준으로 수정했다. Migration 문서는 "후속 CLI" 표현을 실제 CLI 출력 기준으로 보정하고, 보류 항목을 npm CLI 구현이 아니라 npm publish로 좁혔다. Manual과 SKILL 본문은 수정하지 않았다.

CLI 코드는 기본 manifest 탐색만 보정했다. 파일 쓰기, 자동 적용, 덮어쓰기, symlink 수정, PR 생성 동작은 추가하지 않았다.

## 검증 결과

실행 명령:

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

- OK: `npm test`가 Node test 8개를 모두 통과했다.
- OK: `node bin/hyper-waterfall.js --version`이 `0.2.0`을 출력했다.
- OK: `init --dry-run`이 신규 적용 판단 결과와 승인 요청을 출력했다.
- OK: `update --dry-run`이 기존 업데이트 판단 결과, migration guide, manifest diff, 자동 적용 가능, 수동 확인 필요, conflict, 보류, 승인 요청을 출력했다.
- OK: `doctor`가 `OK/WARN/ERROR/INFO` 수준의 비파괴 진단 결과를 출력했다.
- OK: `templates/manifest.json`이 Ruby JSON parser로 parse됐다.
- OK: README/docs/manual grep으로 `npx hyper-waterfall` 예시, canonical 기준, manifest/migration 설명, 편의 실행 채널 문구를 확인했다.
- OK: `{REPO_SLUG}` placeholder가 `templates/.github/pull_request_template.md`에 보존됨을 확인했다.
- OK: `git diff --check`가 경고 없이 통과했다.
- OK: `/private/tmp`처럼 framework repository 밖의 경로에서도 `init --dry-run`이 bundled manifest를 사용해 판단 결과를 출력했다.

## 잔여 위험

- npm publish 자동화와 실제 npm registry 배포는 이번 task 범위가 아니며, migration guide 보류 항목에 남겼다.
- `manifest diff`는 여전히 MVP 수준의 target-status/update-policy 요약이다. release 간 checksum 비교와 자동 병합은 후속 범위다.
- README 예시는 `npx` 명령 형태를 보여주지만, 실제 publish 전에는 로컬 `node bin/hyper-waterfall.js ...` 검증 경로가 기준이다.

## 다음 단계 영향

- 모든 Stage가 완료됐으므로 다음 절차는 `task-final-report`다.
- 최종 보고서에서는 Stage 1~4 커밋, CLI 명령별 수용 기준, npm publish 제외 범위, 검증 결과를 종합해야 한다.
- PR 본문에는 npm CLI가 canonical 배포 기준이 아니라 편의 실행 채널이라는 점과 자동 파일 적용을 하지 않는다는 점을 남겨야 한다.

## 승인 요청

- Stage 4 산출물과 검증 결과를 승인하면 최종 보고서 작성과 PR 게시 준비 절차로 진행한다.
