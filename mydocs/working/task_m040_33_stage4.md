# Task #33 Stage 4 보고서 - npm publish 후 registry와 npx 검증

GitHub Issue: [#33](https://github.com/postmelee/hyper-waterfall/issues/33)
구현계획서: [`task_m040_33_impl.md`](../plans/task_m040_33_impl.md)
Stage: 4

## 단계 목적

publish 후 npm registry metadata, dist-tag, 실제 `npx hyper-waterfall@0.2.0` 실행 경로를 검증한다. 검증 결과는 `docs/releases/v0.2.0-npm-publish.md`에도 post-publish 기록으로 남긴다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/releases/v0.2.0-npm-publish.md` | Task #33 Stage 3-4 기준 post-publish 검증 결과 추가 |
| `mydocs/working/task_m040_33_stage4.md` | Stage 4 registry/npx 검증 결과와 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

코드와 manifest는 수정하지 않았다. publish 준비 문서에는 기존 절차를 보존하고, 실제 publish 후 확인 결과를 별도 섹션으로 추가했다.

## 검증 결과

실행 명령:

```bash
npm view hyper-waterfall@0.2.0 version
npm view hyper-waterfall@0.2.0 dist.tarball
npm view hyper-waterfall@0.2.0 gitHead
npm view hyper-waterfall dist-tags --json
npx hyper-waterfall@0.2.0 --version
npx hyper-waterfall@0.2.0 --help
rg -n 'post-publish|npm publish|npm pack|tarball|smoke|hyper-waterfall@0.2.0|v0.2.0|승인|rollback|republish|unpublish|dist-tag|gitHead|npx' docs/releases/v0.2.0-npm-publish.md
git status --short --branch
git diff --check
```

결과:

- OK: `npm view hyper-waterfall@0.2.0 version`은 `0.2.0`을 반환했다.
- OK: `npm view hyper-waterfall@0.2.0 dist.tarball`은 `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz`를 반환했다.
- 확인: `npm view hyper-waterfall@0.2.0 gitHead`는 별도 값을 출력하지 않았다. publish는 `v0.2.0` tag 기준 detached worktree에서 수행했으므로 publish 대상 SHA `9bd2439b411f76b9d4360569e2f32e0d7976816f`를 보고서와 publish 문서에 별도 기록했다.
- OK: `npm view hyper-waterfall dist-tags --json`은 `{ "latest": "0.2.0" }`를 반환했다.
- 확인: task worktree source root에서 `npx hyper-waterfall@0.2.0 --version`과 `--help`는 `sh: hyper-waterfall: command not found`로 실패했다. 같은 package name의 local source root에서 npx가 local package를 우선 해석한 것으로 보인다.
- OK: 빈 임시 디렉터리 `/private/tmp/hyper-waterfall-task33-npx.aoLRmY`에서 같은 `npx hyper-waterfall@0.2.0 --version`은 `0.2.0`을 반환했다.
- OK: 빈 임시 디렉터리에서 `npx hyper-waterfall@0.2.0 --help`는 `init`, `update`, `doctor`, canonical 기준 안내를 출력했다.
- OK: `docs/releases/v0.2.0-npm-publish.md` 키워드 검증 통과.
- OK: `git diff --check` 통과.

## 잔여 위험

- `gitHead` metadata가 npm registry 조회에서 노출되지 않았다. 최종 보고서에는 npm `gitHead` 대신 publish 대상 `v0.2.0` tag SHA와 registry tarball metadata를 근거로 기록한다.
- 같은 package name의 source root에서 `npx hyper-waterfall@0.2.0`을 실행하면 local package 우선 해석으로 실패할 수 있다. 일반 사용자 경로인 별도/대상 디렉터리에서는 같은 명령이 통과했다.
- publish는 완료됐으므로 동일 version 재게시가 불가능하다. unpublish, dist-tag 수정, deprecate는 별도 승인 없이 실행하지 않는다.

## 다음 단계 영향

- 모든 Stage가 완료됐으므로 다음 단계는 `task-final-report` 절차다.
- 최종 보고서에는 publish 승인 지점, `v0.2.0` tag SHA, registry URL, dist-tag, npx smoke, `gitHead` 미노출 상태를 기록한다.
- PR 게시 전 `/private/tmp/hyper-waterfall-task33-publish-v020` 등 임시 publish worktree 정리 여부를 최종 보고서 단계에서 판단한다.

## 승인 요청

- Stage 4 산출물과 검증 결과를 승인하면 최종 결과 보고서 작성과 PR 게시 준비 단계로 진행한다.
