# Task #33 Stage 2 보고서 - v0.2.0 tag 기준 package와 tarball smoke 재검증

GitHub Issue: [#33](https://github.com/postmelee/hyper-waterfall/issues/33)
구현계획서: [`task_m040_33_impl.md`](../plans/task_m040_33_impl.md)
Stage: 2

## 단계 목적

Stage 1에서 확정한 방침에 따라 `v0.2.0` tag 기준 detached worktree에서 package test, pack dry-run, local tarball install smoke를 재검증한다. 이 단계는 publish 직전 package contents와 CLI 동작을 확인하는 단계이며 `npm publish`는 실행하지 않는다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m040_33_stage2.md` | Stage 2 검증 결과와 publish 직전 smoke 기준 기록 |
| `/private/tmp/hyper-waterfall-task33-publish-v020` | `v0.2.0` tag 기준 detached worktree. Stage 3 publish 후보 worktree |
| `/private/tmp/hyper-waterfall-task33-pack.OIUZVX/hyper-waterfall-0.2.0.tgz` | local smoke용 tarball |
| `/private/tmp/hyper-waterfall-task33-smoke.0GxsFG` | local tarball install smoke 디렉터리 |
| `/private/tmp/hyper-waterfall-task33-target.6Fymoo` | `init --dry-run` target 디렉터리 |

## 본문 변경 정도 / 본문 무손실 여부

repository의 코드, 배포 대상 문서, manifest는 수정하지 않았다. Stage 2는 `v0.2.0` tag 기준 detached worktree와 `/private/tmp` 임시 디렉터리에서 검증만 수행했다.

## 검증 결과

실행 명령:

```bash
PUBLISH_DIR="/private/tmp/hyper-waterfall-task33-publish-v020"
git worktree add --detach "$PUBLISH_DIR" v0.2.0
git -C "$PUBLISH_DIR" rev-parse HEAD
git rev-list -n 1 v0.2.0
npm test
npm pack --dry-run
PACK_DIR="$(mktemp -d /private/tmp/hyper-waterfall-task33-pack.XXXXXX)"
SMOKE_DIR="$(mktemp -d /private/tmp/hyper-waterfall-task33-smoke.XXXXXX)"
REPO_DIR="$(mktemp -d /private/tmp/hyper-waterfall-task33-target.XXXXXX)"
(
  cd "$PUBLISH_DIR"
  npm test
  npm pack --dry-run
  npm pack --pack-destination "$PACK_DIR"
)
npm install "$PACK_DIR/hyper-waterfall-0.2.0.tgz" --prefix "$SMOKE_DIR"
"$SMOKE_DIR/node_modules/.bin/hyper-waterfall" --version
"$SMOKE_DIR/node_modules/.bin/hyper-waterfall" --help
"$SMOKE_DIR/node_modules/.bin/hyper-waterfall" init --repo "$REPO_DIR" --dry-run
git -C "$PUBLISH_DIR" diff --check
git diff --check
```

결과:

- OK: `/private/tmp/hyper-waterfall-task33-publish-v020` detached worktree 생성 완료.
- OK: publish 후보 worktree HEAD와 `v0.2.0` tag SHA가 모두 `9bd2439b411f76b9d4360569e2f32e0d7976816f`.
- OK: publish 후보 worktree의 `package.json` version은 `0.2.0`.
- OK: publish 후보 worktree의 `templates/manifest.json` 기준은 `frameworkVersion 0.2.0`, `release.plannedTag v0.2.0`.
- OK: `npm test` 통과. `node --test` 기준 8개 테스트 모두 pass.
- OK: `npm pack --dry-run` 통과. 최초 sandbox 실행은 npm cache 권한 문제(`EPERM`, `/Users/melee/.npm/_cacache/tmp`)로 실패했으나 외부 권한 재실행 기준 통과했다.
- OK: pack 결과는 `hyper-waterfall-0.2.0.tgz`, package size `74.4 kB`, unpacked size `269.5 kB`, total files `53`, shasum `176f4619194c601aadbb81662c38120a5e91c296`.
- OK: `npm pack --pack-destination /private/tmp/hyper-waterfall-task33-pack.OIUZVX` 통과.
- OK: `npm install /private/tmp/hyper-waterfall-task33-pack.OIUZVX/hyper-waterfall-0.2.0.tgz --prefix /private/tmp/hyper-waterfall-task33-smoke.0GxsFG` 통과.
- OK: tarball CLI `--version` 출력은 `0.2.0`.
- OK: tarball CLI `--help` 출력에 `init`, `update`, `doctor`와 canonical 기준 안내가 포함됐다.
- OK: tarball CLI `init --repo /private/tmp/hyper-waterfall-task33-target.6Fymoo --dry-run`은 신규 적용 판단 결과, `templates/manifest.json`, `v0.2.0`, 승인 요청, 자동 수정 없음 안내를 출력했다.
- OK: publish 후보 worktree `git diff --check` 통과.
- OK: task worktree `git diff --check` 통과.

## 잔여 위험

- `npm publish`는 아직 실행하지 않았다. Stage 3에서 작업지시자의 별도 명시 승인이 필요하다.
- npm cache 권한 문제는 pack dry-run 자체의 package 실패는 아니었지만, Stage 3 publish 명령에서도 같은 환경 문제가 발생할 수 있다. 필요하면 외부 권한으로 실행하고 결과를 Stage 3 보고서에 남긴다.
- `/private/tmp/hyper-waterfall-task33-publish-v020`은 Stage 3 publish 후보 worktree이므로 아직 정리하지 않는다.

## 다음 단계 영향

- Stage 3은 `/private/tmp/hyper-waterfall-task33-publish-v020`에서 `npm publish`를 실행해야 한다.
- Stage 3 시작 전 `npm view hyper-waterfall@0.2.0 version`을 다시 확인하고, `0.2.0`이 이미 있으면 publish를 중단한다.
- Stage 3의 `npm publish`는 이 Stage 2 승인과 별도로 작업지시자의 명시적인 `npm publish` 승인 후에만 실행한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3으로 진행한다.
