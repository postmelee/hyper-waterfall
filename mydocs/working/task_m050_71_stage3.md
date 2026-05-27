# 다국어 적용 smoke 검증과 migration guide 작성 Stage 3 보고서

GitHub Issue: [#71](https://github.com/postmelee/hyper-waterfall/issues/71)
구현계획서: [`task_m050_71_impl.md`](../plans/task_m050_71_impl.md)
Stage: 3

## 단계 목적

기존 한국어-only 적용 저장소가 다국어 구조로 이동할 때 참고할 `v0.2.0 -> v0.3.0` migration guide를 작성한다. `locale` 미기록 상태를 `unknown`으로 보고하고, `ko` 보존 또는 `en`/`zh-CN` 전환을 maintainer 승인 항목으로 분리하는 기준을 문서화한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/migrations/v0.2.0-to-v0.3.0.md` | 다국어 구조 migration guide 신규 작성 |
| `docs/migrations/README.md` | locale migration guide 작성 시 `locale`, fallback, semantic review 기준 보강 |
| `docs/localization-smoke.md` | Migration Guide 연결 섹션을 Stage 3 결과로 갱신 |
| `mydocs/orders/20260527.md` | #71 상태를 Stage 3 완료와 Stage 4 승인 대기로 갱신 |
| `mydocs/working/task_m050_71_stage3.md` | Stage 3 완료 보고서 작성 |

## 본문 변경 정도 / 본문 무손실 여부

기존 migration guide 작성 규칙은 유지하고 locale migration 작성 기준만 추가했다. `docs/localization-smoke.md`는 Stage 1-2 결과를 보존한 채 migration guide 연결 표의 pending 결과만 OK로 갱신했다.

## 검증 결과

실행 명령:

```bash
test -f docs/migrations/v0.2.0-to-v0.3.0.md
grep -nE '대상 버전|변경 요약|추가 파일|수정 파일|수동 확인|충돌 가능성|검증|후속 작업' docs/migrations/v0.2.0-to-v0.3.0.md
grep -nE 'v0.2.0|v0.3.0|manifest|version|locale|\.hyper-waterfall' docs/migrations/v0.2.0-to-v0.3.0.md
grep -nE 'locale|fallback|semantic|unknown' docs/migrations/README.md docs/migrations/v0.2.0-to-v0.3.0.md
git diff --check
```

결과:

- OK. `docs/migrations/v0.2.0-to-v0.3.0.md`가 존재한다.
- OK. 필수 섹션 `대상 버전`, `변경 요약`, `추가 파일`, `수정 파일`, `수동 확인`, `충돌 가능성`, `검증`, `후속 작업`을 모두 포함한다.
- OK. migration guide가 `v0.2.0`, `v0.3.0`, `manifest`, `version`, `locale`, `.hyper-waterfall` 근거를 포함한다.
- OK. migration guide 작성 규칙과 신규 guide가 `locale`, fallback, semantic review, `unknown` 처리 기준을 포함한다.
- OK. `git diff --check` 통과.

## 잔여 위험

- `v0.3.0` GitHub Release/tag, npm publish, 배포 채널 생성은 이번 Stage 범위가 아니다.
- 현재 manifest metadata는 작성 시점의 release 상태를 유지할 수 있으므로, 실제 `v0.3.0` release task에서 version metadata와 checksum 상태를 다시 확정해야 한다.
- 실제 write mode 적용은 smoke 범위가 아니며, 적용 저장소별 변경은 dry-run 판단 승인 후 일반 task 흐름으로 수행해야 한다.

## 다음 단계 영향

- Stage 4에서는 README, lifecycle, localization, manifest, test 문서의 stale #71 표현과 smoke/migration 링크 정합성을 점검한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4로 진행한다.
