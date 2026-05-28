# Task #81 Stage 4 보고서 - post-publish 검증과 배포 문서 갱신

GitHub Issue: [#81](https://github.com/postmelee/hyper-waterfall/issues/81)
구현계획서: [`task_m050_81_impl.md`](../plans/task_m050_81_impl.md)
Stage: 4

## 단계 목적

Stage 4는 Stage 3에서 공개한 `v0.3.0` GitHub Release/tag와 npm package가 실제 사용자-facing 경로에서 동작하는지 확인하고, release 전 후보 표현을 release 완료 상태로 갱신하는 단계다. 검증 기준은 공개 npm registry, `npx hyper-waterfall@0.3.0`, locale별 `init --dry-run`, 배포 문서의 채널 상태 정합성이다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m050_81_stage4.md` | post-publish smoke와 문서 갱신 결과 기록 |
| `templates/manifest.json` | `release.status`를 `planned`에서 `released`로 전환 |
| `test/cli-smoke.test.js` | manifest release status 기대값을 `released`로 갱신 |
| `docs/releases/v0.3.0.md` | release readiness 문서를 실제 release 문서로 전환하고 GitHub Release/npm publish/post-publish 결과 반영 |
| `docs/distribution-channels.md` | GitHub Release/tag, npm CLI, Homebrew tap의 현재 상태를 `v0.3.0` 기준으로 분리 |
| `docs/migrations/v0.2.0-to-v0.3.0.md` | release 후보 표현을 publish 완료 상태와 후속 보류 항목으로 갱신 |
| `docs/localization-smoke.md` | localization smoke 기준의 release 상태를 `released`와 post-publish 검증 결과에 맞춤 |
| `README.md` | `v0.3.0` release 상태 문서 설명을 post-publish 검증 결과 기준으로 조정 |
| `README.ko.md` | 한국어 README의 release 상태 안내를 publish 후 검증 결과 기준으로 조정 |
| `README.zh-CN.md` | 중국어 README의 release 상태 안내를 publish 후 검증 결과 기준으로 조정 |
| `mydocs/plans/task_m050_81_impl.md` | Stage 4 실제 산출물 범위에 manifest/test/migration/localization 문서 반영 |

## 본문 변경 정도 / 본문 무손실 여부

문서 본문은 release 실행 전 후보 상태를 release 완료 상태로 전환하는 범위에서만 수정했다. 핵심 방법론 설명, README의 상단 후킹, lifecycle 설명, locale 적용 절차는 재작성하지 않았다.

`templates/manifest.json`의 `release.status` 변경은 공개 완료된 source 상태를 나타내기 위한 후속 갱신이다. 이미 publish된 `v0.3.0` tag와 npm tarball은 Stage 3의 release commit `83836828a4da24385d0410515d35ee43946b981f` 기준이며, 해당 tarball 내부 manifest는 publish 당시의 `planned` 상태를 포함한다. 본 저장소의 release 후 source 상태는 `released`로 정렬한다.

## 검증 결과

실행 명령:

```bash
npm test
git diff --check
npm view hyper-waterfall@0.3.0 version
npm view hyper-waterfall@0.3.0 dist.tarball
npm view hyper-waterfall@0.3.0 bin --json
npx --yes hyper-waterfall@0.3.0 --version
npx --yes hyper-waterfall@0.3.0 --help
npx --yes hyper-waterfall@0.3.0 init --repo /private/tmp/hw-postpublish-en.vCx734 --locale en --dry-run
npx --yes hyper-waterfall@0.3.0 init --repo /private/tmp/hw-postpublish-ko.fT1usX --locale ko --dry-run
npx --yes hyper-waterfall@0.3.0 init --repo /private/tmp/hw-postpublish-zh.Eo5RWh --locale zh-CN --dry-run
rg -n "0.3.0|v0.3.0|npm|npx|Homebrew|post-publish|publish 후" README.md README.ko.md README.zh-CN.md docs/releases/v0.3.0.md docs/distribution-channels.md
```

결과:

- OK: `npm test` 통과. `node --test` 기준 12개 test 모두 pass.
- OK: `git diff --check` 통과.
- OK: `npm view hyper-waterfall@0.3.0 version`은 `0.3.0`이다.
- OK: `npm view hyper-waterfall@0.3.0 dist.tarball`은 `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.3.0.tgz`다.
- OK: `npm view hyper-waterfall@0.3.0 bin --json`은 `{ "hyper-waterfall": "bin/hyper-waterfall.js" }`다.
- OK: `npx --yes hyper-waterfall@0.3.0 --version`은 `0.3.0`이다.
- OK: `npx --yes hyper-waterfall@0.3.0 --help`는 `init`, `update`, `doctor`, canonical 기준 안내를 출력한다.
- OK: `en`, `ko`, `zh-CN` locale별 `init --dry-run`은 요청 locale을 `selected`로 선택했고 `supported: yes`, `availability: complete`, `selectedSourceStatus: exists=15`, `targetStatus: missing=25`, `frameworkVersion: 0.3.0`, `releaseTag: v0.3.0`을 출력했다.
- OK: locale별 dry-run은 파일을 자동 수정하지 않는다는 Safety 문구와 적용 전 승인 요청을 출력했다.
- OK: README 3종과 release/distribution 문서는 `v0.3.0`, `npx hyper-waterfall@0.3.0`, post-publish 검증 결과, Homebrew 후속 필요 상태를 함께 설명한다.

## 잔여 위험

- Homebrew public tap formula는 아직 `0.2.0` npm tarball 기준이다. `0.3.0` formula URL과 checksum 갱신은 별도 후속 작업으로 처리해야 한다.
- Stage 3의 `npm publish`는 `bin` 경로 정규화 경고를 출력했다. registry `bin` metadata와 실제 `npx --version`, `--help`, locale dry-run은 정상이라 사용자-facing 실행 위험은 현재 확인되지 않았다.
- publish된 `v0.3.0` tarball의 manifest status는 release commit 당시 `planned`다. source repository의 후속 release 상태는 이번 Stage에서 `released`로 갱신했다.

## 다음 단계 영향

- Stage 5에서 최종 결과보고서에 GitHub Release URL, npm registry URL, `npx` post-publish smoke 결과, Homebrew 후속 필요 항목을 요약한다.
- Stage 5에서 `mydocs/orders/20260528.md`의 #81 상태를 완료로 갱신한다.
- 최종 PR 설명에는 Homebrew tap이 아직 `0.2.0` 기준이라는 후속 작업을 명확히 남긴다.

## 승인 요청

- Stage 4 산출물과 검증 결과를 승인하면 Stage 5 통합 검증과 최종 보고로 진행한다.
