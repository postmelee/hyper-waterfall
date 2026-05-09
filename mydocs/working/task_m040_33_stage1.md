# Task #33 Stage 1 보고서 - npm publish 전 기준 정합성 확인

GitHub Issue: [#33](https://github.com/postmelee/hyper-waterfall/issues/33)
구현계획서: [`task_m040_33_impl.md`](../plans/task_m040_33_impl.md)
Stage: 1

## 단계 목적

`hyper-waterfall@0.2.0` publish 전에 GitHub Release/tag, package version, manifest 기준, npm 계정, 기존 registry 상태를 확인한다. Stage 1 중 `v0.2.0` tag와 `origin/main`이 서로 다른 commit을 가리키는 점을 확인했으므로, Stage 2-3은 release 기준 drift를 막기 위해 `v0.2.0` tag 기준 detached worktree에서 실행하도록 구현계획서를 보정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/plans/task_m040_33_impl.md` | Stage 2-3을 `v0.2.0` tag 기준 detached worktree에서 실행하도록 보정 |
| `mydocs/working/task_m040_33_stage1.md` | Stage 1 검증 결과와 다음 단계 기준 기록 |

## 본문 변경 정도 / 본문 무손실 여부

코드와 배포 대상 파일은 수정하지 않았다. 구현계획서는 Stage 1에서 발견한 tag 기준 drift 위험을 반영하기 위해 Stage 2-3 실행 위치와 검증 명령만 보정했다.

## 검증 결과

실행 명령:

```bash
git fetch --tags origin --prune
git rev-parse HEAD
git rev-parse origin/main
git tag --list v0.2.0
git ls-remote origin refs/tags/v0.2.0
gh release view v0.2.0 --repo postmelee/hyper-waterfall --json tagName,name,isDraft,isPrerelease,url,targetCommitish
node -p "require('./package.json').version"
node -e "const m=require('./templates/manifest.json'); console.log(m.frameworkVersion, m.release && m.release.plannedTag)"
rg -n '0.2.0|v0.2.0|hyper-waterfall@0.2.0|npm publish|GitHub Release|manifest|canonical' package.json templates/manifest.json docs/releases/v0.2.0-npm-publish.md docs/distribution-channels.md README.md
npm whoami
npm view hyper-waterfall@0.2.0 version
git diff --check
git diff --name-status v0.2.0..origin/main -- package.json bin src templates docs README.md LICENSE
```

결과:

- OK: `git fetch --tags origin --prune` 통과.
- OK: 작업 브랜치 HEAD는 `f226c4cff6dc49e61e675ab852b16d1424944184`.
- OK: `origin/main`은 `3a366b20f4efc35b132deec32b873a1ec5fbfe77`.
- OK: local/remote `v0.2.0` tag는 `9bd2439b411f76b9d4360569e2f32e0d7976816f`.
- OK: GitHub Release `v0.2.0`은 draft/prerelease가 아니며 URL은 `https://github.com/postmelee/hyper-waterfall/releases/tag/v0.2.0`.
- OK: `package.json` version은 `0.2.0`.
- OK: `templates/manifest.json` 기준은 `frameworkVersion 0.2.0`, `release.plannedTag v0.2.0`.
- OK: 관련 문서에는 npm package가 canonical 기준이 아니라 GitHub Release/tag, manifest, migration guide를 실행하기 쉽게 하는 채널이라는 기준이 유지되어 있다.
- OK: `npm whoami`는 `postmelee`를 반환했다.
- OK: `npm view hyper-waterfall@0.2.0 version`은 `E404 Not Found`를 반환했다. 구현계획서 기준으로 이는 `hyper-waterfall@0.2.0` 미게시 상태이며 publish 중단 조건이 아니다.
- OK: `git diff --check` 통과.
- 확인: `v0.2.0..origin/main`의 package 포함 대상 차이는 `docs/distribution-channels.md` 수정과 `docs/homebrew-formula-tap-poc.md` 추가다. 따라서 Stage 2-3 package 검증과 publish는 `v0.2.0` tag 기준 detached worktree에서 실행해야 한다.

## 잔여 위험

- `npm publish`는 외부 registry 상태를 바꾸므로 Stage 2 smoke 통과 후에도 Stage 3에서 별도 명시 승인이 필요하다.
- `v0.2.0` tag 기준 detached worktree를 만들 때 기존 임시 worktree가 남아 있으면 먼저 상태를 확인하고 재사용 또는 정리 방침을 판단해야 한다.

## 다음 단계 영향

- Stage 2는 `/private/tmp/hyper-waterfall-task33-publish-v020`에 `v0.2.0` tag 기준 detached worktree를 만든 뒤 그 안에서 `npm test`, `npm pack --dry-run`, tarball install smoke를 실행한다.
- Stage 2에서 생성하는 tarball과 smoke 디렉터리는 repository에 남기지 않는다.
- Stage 3의 `npm publish`는 Stage 2 승인과 작업지시자의 별도 `npm publish` 승인 없이는 실행하지 않는다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
