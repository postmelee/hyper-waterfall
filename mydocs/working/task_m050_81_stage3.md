# Task #81 Stage 3 보고서 - v0.3.0 release와 npm publish 실행

GitHub Issue: [#81](https://github.com/postmelee/hyper-waterfall/issues/81)
구현계획서: [`task_m050_81_impl.md`](../plans/task_m050_81_impl.md)
Stage: 3

## 단계 목적

Stage 3은 Stage 1-2에서 검증한 release 후보를 실제 외부 배포 상태로 확정하는 단계다. 작업지시자의 Stage 3 진행 지시를 `v0.3.0 release/tag/npm publish 실행 승인`으로 간주하고, `origin/main` release commit 기준으로 Git tag, GitHub Release, npm publish를 실행했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m050_81_stage3.md` | `v0.3.0` tag/Release/npm publish 실행 결과 기록 |
| Git tag `v0.3.0` | `83836828a4da24385d0410515d35ee43946b981f`에 생성 후 origin push |
| GitHub Release `v0.3.0` | <https://github.com/postmelee/hyper-waterfall/releases/tag/v0.3.0> 생성 |
| npm package `hyper-waterfall@0.3.0` | npm registry publish 완료 |

## 본문 변경 정도 / 본문 무손실 여부

소스 코드와 사용자-facing 문서는 변경하지 않았다. 이번 단계의 repository 변경은 Stage 3 보고서 추가뿐이다.

release 실행은 `/private/tmp/hw-release-v030.0tCLyO` detached worktree에서 수행했고, 해당 worktree는 publish 후 제거했다. task branch의 `mydocs/` 산출물은 npm tarball에 포함되지 않았다.

## 검증 결과

실행 명령:

```bash
git status --short --branch
git rev-parse origin/main
git tag --list v0.3.0
git ls-remote --tags origin refs/tags/v0.3.0
gh release view v0.3.0 --repo postmelee/hyper-waterfall
npm view hyper-waterfall@0.3.0 version
npm whoami
git worktree add --detach /private/tmp/hw-release-v030.0tCLyO 83836828a4da24385d0410515d35ee43946b981f
git rev-parse HEAD
git status --short --branch
node -p "require('./package.json').version"
node -e "const m=require('./templates/manifest.json'); console.log(m.frameworkVersion, m.release && m.release.plannedTag, m.release && m.release.baselineTag, m.release && m.release.status)"
npm test
npm_config_cache=/private/tmp/hyper-waterfall-npm-cache npm pack --dry-run
git diff --check
git tag v0.3.0 83836828a4da24385d0410515d35ee43946b981f
git push origin v0.3.0
gh release create v0.3.0 --repo postmelee/hyper-waterfall --title "v0.3.0 - 다국어 적용 진입점과 locale pack" --notes-file /private/tmp/hw-v030-release-notes.md
npm publish
npm view hyper-waterfall@0.3.0 version
npm view hyper-waterfall@0.3.0 dist.tarball
npm view hyper-waterfall@0.3.0 bin --json
npm view hyper-waterfall@0.3.0 dist.shasum dist.integrity gitHead --json
npm view hyper-waterfall dist-tags --json
gh release view v0.3.0 --repo postmelee/hyper-waterfall --json tagName,name,isDraft,isPrerelease,url,targetCommitish,publishedAt
git ls-remote --tags origin refs/tags/v0.3.0
npm view hyper-waterfall@0.3.0 gitHead
git worktree remove /private/tmp/hw-release-v030.0tCLyO
git worktree prune
git worktree list
git diff --check
```

결과:

- OK: release 실행 직전 `v0.3.0` local tag, remote tag, GitHub Release는 없었다.
- OK: release 실행 직전 npm `hyper-waterfall@0.3.0`은 `E404 No match found for version 0.3.0`이었다.
- OK: npm publish 계정은 `postmelee`다.
- OK: release worktree는 `83836828a4da24385d0410515d35ee43946b981f` detached HEAD로 생성됐다.
- OK: release worktree의 `package.json` version은 `0.3.0`이다.
- OK: release worktree의 `templates/manifest.json`은 `0.3.0 v0.3.0 v0.2.0 planned`를 출력했다.
- OK: release worktree에서 `npm test` 통과. `node --test` 기준 12개 test 모두 pass.
- OK: release worktree에서 `npm pack --dry-run` 통과. `hyper-waterfall-0.3.0.tgz`, package size `1.8 MB`, unpacked size `2.5 MB`, total files `218`, shasum `e2fdc132cf8387c806d711f6c9da91d9a81ff012`.
- OK: `git push origin v0.3.0` 성공. 원격 tag는 `83836828a4da24385d0410515d35ee43946b981f refs/tags/v0.3.0`이다.
- OK: GitHub Release 생성 완료. URL은 <https://github.com/postmelee/hyper-waterfall/releases/tag/v0.3.0>다.
- OK: GitHub Release metadata는 `tagName: v0.3.0`, `name: v0.3.0 - 다국어 적용 진입점과 locale pack`, `isDraft: false`, `isPrerelease: false`, `publishedAt: 2026-05-28T03:37:36Z`, `targetCommitish: main`이다.
- OK: `npm publish` 완료. 출력은 `+ hyper-waterfall@0.3.0`였다.
- 확인: `npm publish` 중 `"bin[hyper-waterfall]" script name bin/hyper-waterfall.js was invalid and removed` auto-correct 경고가 있었으나, registry metadata 확인 결과 `bin` entry는 유지됐다.
- OK: `npm view hyper-waterfall@0.3.0 version`은 `0.3.0`이다.
- OK: `npm view hyper-waterfall@0.3.0 dist.tarball`은 `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.3.0.tgz`다.
- OK: `npm view hyper-waterfall@0.3.0 bin --json`은 `{ "hyper-waterfall": "bin/hyper-waterfall.js" }`다.
- OK: npm dist metadata는 `dist.shasum: e2fdc132cf8387c806d711f6c9da91d9a81ff012`, `dist.integrity: sha512-fJCO7NstZtGFXK2iFqJh0swDfrVxptDtvq9CaF2MStrIZnmCDN2mzpnqZlNk4qg62SjfZKTgt/sGRJAJvfziLg==`다.
- OK: npm dist-tag는 `{ "latest": "0.3.0" }`다.
- 확인: `npm view hyper-waterfall@0.3.0 gitHead`는 별도 값을 출력하지 않았다.
- OK: 임시 release worktree를 제거하고 `git worktree prune`을 실행했다. 현재 worktree 목록은 main 작업 경로의 `local/task81`만 남아 있다.
- OK: `git diff --check` 통과.

## 잔여 위험

- npm registry는 `gitHead`를 출력하지 않았다. 대신 release 대상 commit, Git tag SHA, tarball shasum/integrity, GitHub Release URL을 기록했다.
- npm publish가 `bin` 경로 정규화 경고를 냈다. registry `bin` metadata는 정상이나, Stage 4에서 실제 `npx hyper-waterfall@0.3.0 --version`과 `--help`로 반드시 검증한다.
- Homebrew tap은 아직 `0.2.0` 기준일 가능성이 높다. Stage 4 문서 갱신에서 npm/GitHub와 Homebrew 상태를 분리해야 한다.

## 다음 단계 영향

- Stage 4로 진행해 post-publish smoke를 실행한다.
- Stage 4에서는 빈 임시 디렉터리 기준 `npx hyper-waterfall@0.3.0`이 실제 registry package를 실행하는지 확인한다.
- Stage 4에서 `docs/releases/v0.3.0.md`, `docs/distribution-channels.md`, 필요 시 README 3종을 실제 publish 상태에 맞게 갱신한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4 post-publish 검증과 문서 상태 갱신으로 진행한다.
