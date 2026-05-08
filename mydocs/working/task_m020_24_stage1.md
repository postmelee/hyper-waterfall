# task_m020_24_stage1.md - release 준비 기준과 체크리스트 작성 완료보고서

GitHub Issue: [#24](https://github.com/postmelee/hyper-waterfall/issues/24)
구현계획서: [`task_m020_24_impl.md`](../plans/task_m020_24_impl.md)
Stage: 1

## 단계 목적

Stage 1은 `v0.2.0` GitHub Release/tag 생성 전에 maintainer가 확인할 release 준비 기준과 체크리스트를 별도 문서로 고정하는 단계다. 실제 tag 생성, GitHub Release publish, npm publish는 수행하지 않고 승인 게이트로 분리하는 것이 목표다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/releases/v0.2.0.md` | `v0.2.0` canonical 기준, release 전 체크리스트, release notes 초안, 생성 명령 후보, 보류 항목, 검증 기준을 정리한 124줄 문서 신설 |

## 본문 변경 정도 / 본문 무손실 여부

신규 문서 작성 단계이므로 기존 본문 손실은 없다. `templates/manifest.json`, `docs/migrations/v0.1.0-to-v0.2.0.md`, `docs/distribution-channels.md`, `package.json`은 읽기만 했고 수정하지 않았다. checksum 값은 구현계획서대로 채우지 않았으며, `pending-release` 의미와 release 생성 승인 뒤 확정 조건만 문서화했다.

## 검증 결과

실행 명령:

```bash
test -f docs/releases/v0.2.0.md
rg -n 'v0.2.0|GitHub Release|tag|manifest|migration|checksum|승인|release notes|pending-release' docs/releases/v0.2.0.md
git diff --check
```

결과:

- OK: `test -f docs/releases/v0.2.0.md` 통과.
- OK: `rg`가 `v0.2.0`, `GitHub Release`, `tag`, `manifest`, `migration`, `checksum`, `승인`, `release notes`, `pending-release`를 모두 포함한 관련 줄을 확인했다.
- OK: `git diff --check` 출력 없이 통과.

## 잔여 위험

- Stage 1은 release 준비 문서 신설만 수행했으므로 README, migration guide, distribution strategy, manifest 값 사이의 전체 정합성 보강은 아직 수행하지 않았다.
- `pending-release` checksum 값은 아직 확정하지 않았다. 실제 확정 여부와 방법은 release/tag 생성 승인 단계에서 결정해야 한다.

## 다음 단계 영향

- Stage 2는 `docs/releases/v0.2.0.md`를 기준 문서로 두고, `package.json`, `templates/manifest.json`, migration guide, README, `docs/distribution-channels.md`의 `0.2.0` / `v0.2.0` / canonical 기준 표현을 대조한다.
- Stage 2에서 불일치가 없으면 관련 파일은 무변경으로 보고서에 남기고, 불일치가 있으면 문서 역할에 맞춰 최소 수정한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
