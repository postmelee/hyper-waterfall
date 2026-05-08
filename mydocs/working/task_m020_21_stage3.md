# task_m020_21_stage3.md - README와 배포 채널 정합성 보강 단계 보고서

GitHub Issue: [#21](https://github.com/postmelee/hyper-waterfall/issues/21)
구현계획서: [`task_m020_21_impl.md`](../plans/task_m020_21_impl.md)
Stage: 3

## 단계 목적

Stage 3은 README, 배포 채널 전략, `v0.2.0` release 준비 문서의 `npx`, npm CLI, GitHub Release/tag, manifest, migration guide 설명을 대조하고, publish 전 상태와 충돌하지 않도록 보강하는 단계다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | 첫 npm publish 전에는 `npx` 예시가 publish 이후 안정 경로이며, publish 전 검증과 승인 게이트가 `docs/releases/v0.2.0-npm-publish.md`에 있음을 명시했다. |
| `docs/distribution-channels.md` | npm CLI 섹션에 publish 전 `npx` 상태와 publish 승인 게이트 문서를 연결하고, npm publish 실행과 publish 자동화의 경계를 분리했다. |
| `docs/releases/v0.2.0.md` | release 생성 승인 게이트, release notes 초안, 보류 항목에서 npm publish 준비 문서 기준을 연결했다. |
| `mydocs/working/task_m020_21_stage3.md` | Stage 3 목적, 산출물, 검증 결과, 다음 단계 영향을 기록했다. |

## 본문 변경 정도 / 본문 무손실 여부

기존 설명은 보존하고 필요한 연결 문구만 추가했다. README의 `npx` 명령 예시는 삭제하지 않고, 첫 npm publish 전에는 publish 이후 안정 경로라는 상태 설명을 앞에 붙였다.

`docs/distribution-channels.md`의 "후속 마일스톤 후보" 섹션은 현재 Task #21이 M020에서 npm publish 준비를 수행 중인 상태와 맞도록 "구현 후보"로 제목을 조정했다.

## 검증 결과

실행 명령:

```bash
npm view hyper-waterfall@0.2.0 version
rg -n 'npx hyper-waterfall|npm CLI|npm publish|GitHub Release|manifest|migration|canonical|0.2.0|v0.2.0' README.md docs/distribution-channels.md docs/releases/v0.2.0.md docs/releases/v0.2.0-npm-publish.md package.json
git diff --check
```

결과:

- OK: `npm view hyper-waterfall@0.2.0 version`은 외부 권한 실행 기준 `E404 Not Found`를 반환했다. 따라서 Stage 3 시점에는 public npm registry에 `hyper-waterfall@0.2.0`이 publish되지 않은 상태로 판단했다.
- OK: 최초 `npm view` 시도는 network/cache 대기 상태로 멈춰 해당 조회 프로세스를 종료했고, 같은 명령을 외부 권한으로 재실행해 위 결과를 확인했다.
- OK: grep 검증에서 README, `docs/distribution-channels.md`, `docs/releases/v0.2.0.md`, `docs/releases/v0.2.0-npm-publish.md`, `package.json`의 `npx`, npm CLI, npm publish, GitHub Release, manifest, migration, canonical, version/tag 표현을 확인했다.
- OK: `git diff --check` 통과.

## 잔여 위험

- npm publish 이후에는 README의 "첫 npm publish 전" 문구를 실제 publish 완료 상태에 맞게 후속 변경해야 한다.
- npm registry publish 후 `dist-tags`, `gitHead`, `npx hyper-waterfall@0.2.0` 검증은 Stage 4가 아니라 실제 publish 승인 이후 확인 대상이다.

## 다음 단계 영향

- Stage 4는 Stage 1~3 결과를 기준으로 통합 검증과 로컬 tarball smoke를 실행하고, `npm publish`, `git tag`, `gh release create`가 실행되지 않았음을 보고서에 남긴다.
- Stage 4에서는 README와 배포 채널 문서의 publish 전 상태 설명이 로컬 tarball smoke 결과와 충돌하지 않는지 마지막으로 확인한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4로 진행한다.
