# Task #81 Stage 2 보고서 - package와 locale smoke 검증

GitHub Issue: [#81](https://github.com/postmelee/hyper-waterfall/issues/81)
구현계획서: [`task_m050_81_impl.md`](../plans/task_m050_81_impl.md)
Stage: 2

## 단계 목적

Stage 2는 `v0.3.0` publish 전에 package 산출물과 locale dry-run이 배포 가능한 상태인지 확인하는 단계다. 이번 단계에서는 test, locale별 local CLI dry-run, npm pack dry-run, 실제 local tarball install smoke를 실행했다.

외부 상태 변경 명령인 `git tag`, `gh release create`, `npm publish`는 실행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m050_81_stage2.md` | Stage 2 package/locale smoke 검증 결과 기록 |

## 본문 변경 정도 / 본문 무손실 여부

소스 코드와 사용자-facing 문서는 변경하지 않았다. repository 변경은 Stage 2 보고서 추가뿐이다. package smoke 산출물은 `/private/tmp` 아래에 생성했으며 repository 안에는 tarball을 남기지 않았다.

## 검증 결과

실행 명령:

```bash
npm test
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-en --manifest /Users/melee/Documents/projects/hyper-waterfall/templates/manifest.json --locale en --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-ko --manifest /Users/melee/Documents/projects/hyper-waterfall/templates/manifest.json --locale ko --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-readiness-zh --manifest /Users/melee/Documents/projects/hyper-waterfall/templates/manifest.json --locale zh-CN --dry-run
npm_config_cache=/private/tmp/hyper-waterfall-npm-cache npm pack --dry-run
npm_config_cache=/private/tmp/hyper-waterfall-npm-cache npm pack --json --dry-run
mktemp -d /private/tmp/hw-task81-pack.XXXXXX
mktemp -d /private/tmp/hw-task81-smoke.XXXXXX
mktemp -d /private/tmp/hw-task81-target.XXXXXX
npm_config_cache=/private/tmp/hyper-waterfall-npm-cache npm pack --pack-destination /private/tmp/hw-task81-pack.X7Espp
npm_config_cache=/private/tmp/hyper-waterfall-npm-cache npm install /private/tmp/hw-task81-pack.X7Espp/hyper-waterfall-0.3.0.tgz --prefix /private/tmp/hw-task81-smoke.KMj2iv
/private/tmp/hw-task81-smoke.KMj2iv/node_modules/.bin/hyper-waterfall --version
/private/tmp/hw-task81-smoke.KMj2iv/node_modules/.bin/hyper-waterfall --help
/private/tmp/hw-task81-smoke.KMj2iv/node_modules/.bin/hyper-waterfall init --repo /private/tmp/hw-task81-target.w4xmIe --locale en --dry-run
git diff --check
```

결과:

- OK: `npm test` 통과. `node --test` 기준 12개 test 모두 pass.
- OK: `en` dry-run은 `selected: en`, `supported: yes`, `selectedSourceStatus: exists=15`, `fallbackSourceStatus: exists=15`, `targetStatus: missing=25`, `Safety: 파일을 자동 수정하지 않습니다.`를 출력했다.
- OK: `ko` dry-run은 `selected: ko`, `supported: yes`, `selectedSourceStatus: exists=15`, `fallbackSourceStatus: exists=15`, `targetStatus: missing=25`, `Safety: 파일을 자동 수정하지 않습니다.`를 출력했다.
- OK: `zh-CN` dry-run은 `selected: zh-CN`, `supported: yes`, `selectedSourceStatus: exists=15`, `fallbackSourceStatus: exists=15`, `targetStatus: missing=25`, `Safety: 파일을 자동 수정하지 않습니다.`를 출력했다.
- OK: `npm pack --dry-run` 통과. package name `hyper-waterfall`, version `0.3.0`, filename `hyper-waterfall-0.3.0.tgz`, package size `1.8 MB`, unpacked size `2.5 MB`, total files `218`.
- OK: `npm pack --json --dry-run` 통과. `size: 1811244`, `unpackedSize: 2516222`, `shasum: e2fdc132cf8387c806d711f6c9da91d9a81ff012`, `entryCount: 218`.
- OK: tarball 필수 구성 포함 확인.
  - `README.md`
  - `README.ko.md`
  - `README.zh-CN.md`
  - `docs/agent-entrypoint.en.md`
  - `docs/agent-entrypoint.zh-CN.md`
  - `docs/lifecycle/adoption.en.md`
  - `docs/lifecycle/update.en.md`
  - `docs/lifecycle/update_pr.en.md`
  - `docs/lifecycle/adoption.zh-CN.md`
  - `docs/lifecycle/update.zh-CN.md`
  - `docs/lifecycle/update_pr.zh-CN.md`
  - `templates/locales/en/AGENTS.md`
  - `templates/locales/ko/AGENTS.md`
  - `templates/locales/zh-CN/AGENTS.md`
  - `templates/locales/en/mydocs/manual/`
  - `templates/locales/ko/mydocs/manual/`
  - `templates/locales/zh-CN/mydocs/manual/`
- OK: 실제 local tarball 생성 경로는 `/private/tmp/hw-task81-pack.X7Espp/hyper-waterfall-0.3.0.tgz`다.
- OK: local tarball install smoke는 `/private/tmp/hw-task81-smoke.KMj2iv`에 설치되어 `added 1 package`로 완료됐다.
- OK: installed CLI `--version`은 `0.3.0`을 출력했다.
- OK: installed CLI `--help`는 `init`, `update`, `doctor`, canonical 기준 안내를 출력했다.
- OK: installed CLI bundled manifest dry-run은 package 내부 `/private/tmp/hw-task81-smoke.KMj2iv/node_modules/hyper-waterfall/templates/manifest.json`을 사용했고, `selected: en`, `frameworkVersion: 0.3.0`, `releaseTag: v0.3.0`, 승인 요청과 safety 문구를 출력했다.
- OK: `git diff --check` 통과.

## 잔여 위험

- `npm pack`은 task branch에서 실행했지만 package `files` 범위가 `bin`, `src`, `templates`, `docs`, README, LICENSE, `package.json`이라 이번 task의 `mydocs/` 보고서 산출물은 tarball에 포함되지 않았다.
- Stage 3 publish 시점에는 npm 2FA 또는 추가 인증 확인이 다시 필요할 수 있다.

## 다음 단계 영향

- Stage 3 release/tag/npm publish 실행 승인 요청이 가능하다.
- Stage 3에서는 release 대상 commit을 다시 확인하고, `origin/main` 기준 clean checkout 또는 별도 release worktree에서 `v0.3.0` tag, GitHub Release, npm publish를 실행해야 한다.
- Stage 3의 외부 상태 변경 명령은 별도 명시 승인 전까지 계속 보류한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 release/tag와 npm publish 실행 승인 게이트로 진행한다.
