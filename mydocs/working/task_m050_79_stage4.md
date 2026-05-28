# #79 Stage 4 완료 보고서 — v0.3.0 release readiness 정렬

GitHub Issue: [#79](https://github.com/postmelee/hyper-waterfall/issues/79)
구현계획서: [`task_m050_79_impl.md`](../plans/task_m050_79_impl.md)
Stage: 4

## 단계 목적

Stage 4는 README의 `npx hyper-waterfall@0.3.0` 안내와 실제 배포 후보 metadata가 모순되지 않도록 package, manifest, release readiness 문서를 정렬하는 단계다. 실제 GitHub Release/tag 생성, npm publish, Homebrew tap 갱신은 실행하지 않고, publish 직전 검증 가능한 상태까지만 만든다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `package.json` | package version을 `0.3.0`으로 올리고 npm tarball `files`에 `README.ko.md`, `README.zh-CN.md` 추가 |
| `templates/manifest.json` | `frameworkVersion: 0.3.0`, `plannedTag: v0.3.0`, `baselineTag: v0.2.0`, `release.status: planned`, version state 예시를 `v0.3.0`으로 정렬 |
| `README.md` | CLI/distribution details에서 `v0.3.0` version-pinned `npx`와 release readiness 문서 링크로 정렬 |
| `README.ko.md` | 한국어 README의 CLI/distribution details를 `v0.3.0` 기준으로 정렬 |
| `README.zh-CN.md` | 중국어 간체 README의 CLI/distribution details를 `v0.3.0` 기준으로 정렬 |
| `docs/releases/v0.3.0.md` | v0.3.0 release readiness, publish 승인 게이트, npm tarball 체크리스트, release notes 초안, post-publish 검증 기준 추가 |
| `docs/distribution-channels.md` | 현재 채널 상태를 2026-05-28 기준으로 갱신하고 v0.3.0 readiness와 release 실행 경계를 추가 |
| `docs/localization-smoke.md` | framework version을 `0.3.0`으로 맞추고 Stage 4 release readiness 연결 표 추가 |
| `docs/migrations/v0.2.0-to-v0.3.0.md` | package/manifest metadata가 v0.3.0 release 후보로 정렬된다는 주의 문구로 교체 |
| `test/cli-smoke.test.js` | package/manifest version 정합성과 다국어 README package inclusion을 검증하고 update smoke를 `v0.2.0 -> v0.3.0`으로 정렬 |
| `mydocs/plans/task_m050_79_impl.md` | scratch repo dry-run 검증 명령의 manifest 경로를 absolute path 기준으로 수정 |
| `mydocs/working/task_m050_79_stage4.md` | Stage 4 변경과 검증 결과 기록 |

## 본문 변경 정도 / 본문 무손실 여부

README 본문 구조와 기존 방법론 설명은 유지했고, 접힘 영역의 CLI/distribution 안내만 `v0.3.0` release 후보 기준으로 바꿨다. `v0.2.0` release/publish 역사 문서는 삭제하거나 재작성하지 않았다. `docs/distribution-channels.md`는 기존 채널 전략을 유지하면서 현재 상태와 readiness 섹션만 보강했다. 구현계획서의 Stage 4 검증 명령은 실제 CLI의 manifest path 해석과 `docs/localization-smoke.md` 기준에 맞게 `$(pwd)/templates/manifest.json`을 사용하도록 바로잡았다.

## 검증 결과

실행 명령:

```bash
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-en --manifest "$(pwd)/templates/manifest.json" --locale en --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-ko --manifest "$(pwd)/templates/manifest.json" --locale ko --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-zh --manifest "$(pwd)/templates/manifest.json" --locale zh-CN --dry-run
npm test
npm_config_cache=/private/tmp/hyper-waterfall-npm-cache npm pack --dry-run
npm_config_cache=/private/tmp/hyper-waterfall-npm-cache npm pack --dry-run 2>&1 | rg "hyper-waterfall@0\.3\.0|README\.ko\.md|README\.zh-CN\.md|docs/agent-entrypoint\.en\.md|docs/agent-entrypoint\.zh-CN\.md|docs/lifecycle/adoption\.en\.md|docs/lifecycle/adoption\.zh-CN\.md|docs/releases/v0\.3\.0\.md|templates/locales/en/AGENTS\.md|templates/locales/ko/AGENTS\.md|templates/locales/zh-CN/AGENTS\.md|total files"
rg -n 'v0\.2\.0-npm-publish|npx hyper-waterfall( |$)|from v0\.1\.0 --to v0\.2\.0|framework version \| `0\.2\.0`|frameworkVersion": "0\.2\.0"|releaseTag": "v0\.2\.0"' README.md README.ko.md README.zh-CN.md docs/distribution-channels.md docs/localization-smoke.md docs/migrations/v0.2.0-to-v0.3.0.md package.json templates/manifest.json test/cli-smoke.test.js
git diff --check
```

결과:

- `en`, `ko`, `zh-CN` 신규 적용 dry-run: OK. 세 locale 모두 `release: v0.3.0`, `frameworkVersion: 0.3.0`, `selectedSourceStatus: exists=15`, `fallbackSourceStatus: exists=15`, version state `locale` 계획을 출력했다.
- `npm test`: OK. `node --test` 기준 12개 테스트가 모두 통과했다.
- `npm pack --dry-run`: OK. `hyper-waterfall@0.3.0`, `hyper-waterfall-0.3.0.tgz`, package size `1.8 MB`, unpacked size `2.5 MB`, total files `218`로 출력됐다.
- tarball 포함 항목 grep: OK. `README.ko.md`, `README.zh-CN.md`, `docs/agent-entrypoint.en.md`, `docs/agent-entrypoint.zh-CN.md`, `docs/lifecycle/adoption.en.md`, `docs/lifecycle/adoption.zh-CN.md`, `docs/releases/v0.3.0.md`, `templates/locales/{en,ko,zh-CN}/AGENTS.md`가 출력됐다.
- legacy mismatch 검색: OK. README와 현재 readiness 문서/manifest/test 범위에서 `v0.2.0-npm-publish` 링크, unpinned `npx hyper-waterfall`, `v0.1.0 -> v0.2.0` update 예시, manifest/version state의 `0.2.0` 잔존 검색 결과가 없었다.
- `git diff --check`: OK.
- `npm pack --dry-run`은 dry-run으로 실행했고 repository root에 `hyper-waterfall-0.3.0.tgz` 파일을 남기지 않았다.

## 잔여 위험

- **실제 publish 미실행**: `v0.3.0` GitHub Release/tag, npm publish, Homebrew tap 갱신은 아직 실행하지 않았다. Stage 4는 readiness 정렬까지만 완료했다.
- **npm registry 상태 미확인**: network publish/read 검증은 이번 Stage에서 실행하지 않았다. release 실행 단계에서 `npm view hyper-waterfall@0.3.0`, `npx hyper-waterfall@0.3.0` post-publish smoke가 필요하다.
- **Homebrew formula 갱신**: npm publish 후 formula URL, version, checksum 갱신이 필요하지만 이번 Stage에서는 문서화만 했다.
- **root/directory checksum**: 기존 정책대로 directory/root checksum은 `pending-release` 상태이며, 이 Stage에서 새 산식을 정의하지 않았다.

## 다음 단계 영향

- Stage 5에서 README 3종, localized docs, package/manifest/release readiness를 통합 검증한다.
- Stage 5에서 `npm test`, `git diff --check`, status 확인을 다시 실행하고 최종 보고서/PR 단계로 넘긴다.
- PR merge 후 실제 배포를 진행하려면 `docs/releases/v0.3.0.md`의 publish 전 승인 게이트와 post-publish 검증을 기준으로 별도 release 실행 승인이 필요하다.

## 승인 요청

- Stage 4 산출물과 검증 결과를 승인하면 Stage 5 — 통합 검증과 최종 보고로 진행한다.
