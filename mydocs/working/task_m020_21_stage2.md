# task_m020_21_stage2.md - npm publish 전 체크리스트와 smoke 절차 작성 단계 보고서

GitHub Issue: [#21](https://github.com/postmelee/hyper-waterfall/issues/21)
구현계획서: [`task_m020_21_impl.md`](../plans/task_m020_21_impl.md)
Stage: 2

## 단계 목적

Stage 2는 `hyper-waterfall@0.2.0` npm publish 전에 maintainer가 따라야 할 체크리스트와 로컬 tarball smoke 절차를 문서화하는 단계다. Stage 1의 package metadata 보강과 `npm pack --dry-run` 결과를 기준으로 publish 전 확인 항목, 승인 게이트, publish 후 확인, rollback/unpublish/republish 리스크를 정리했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/releases/v0.2.0-npm-publish.md` | `hyper-waterfall@0.2.0` npm publish 준비 체크리스트, tarball 구성 확인, 로컬 smoke 절차, publish 전/후 확인, rollback 리스크를 정리했다. |
| `mydocs/working/task_m020_21_stage2.md` | Stage 2 목적, 산출물, 검증 결과, 다음 단계 영향을 기록했다. |

## 본문 변경 정도 / 본문 무손실 여부

신규 문서 작성이다. 기존 release 문서나 README는 Stage 2에서 수정하지 않았다.

`docs/releases/v0.2.0-npm-publish.md`는 `v0.2.0` GitHub Release/tag 준비 문서와 역할을 분리했다. GitHub Release/tag는 canonical 배포 단위로 유지하고, npm package는 `npx hyper-waterfall` 실행을 위한 편의 채널로 설명했다.

## 검증 결과

실행 명령:

```bash
test -f docs/releases/v0.2.0-npm-publish.md
rg -n 'npm publish|npm pack|tarball|smoke|hyper-waterfall@0.2.0|v0.2.0|승인|rollback|republish|unpublish' docs/releases/v0.2.0-npm-publish.md
git diff --check
```

결과:

- OK: `docs/releases/v0.2.0-npm-publish.md` 파일 존재 확인.
- OK: grep 검증에서 `npm publish`, `npm pack`, `tarball`, `smoke`, `hyper-waterfall@0.2.0`, `v0.2.0`, `승인`, `rollback`, `republish`, `unpublish` 관련 항목 확인.
- OK: `git diff --check` 통과.

## 잔여 위험

- npm registry의 현재 package name 점유 여부와 README의 `npx` 예시가 실제 publish 상태와 충돌하는지는 Stage 3에서 문서 정합성 검토와 함께 다룬다.
- 로컬 tarball 설치 smoke는 Stage 4 통합 검증에서 실제로 실행한다.

## 다음 단계 영향

- Stage 3은 이 문서를 README, `docs/distribution-channels.md`, `docs/releases/v0.2.0.md`와 연결하거나 정합성 보강이 필요한지 판단한다.
- Stage 3에서 publish 전/후 상태 설명이 사용자-facing README와 충돌하면 최소 문구를 보강한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3으로 진행한다.
