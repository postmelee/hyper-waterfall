# 다국어 적용 smoke 검증과 migration guide 작성 Stage 4 보고서

GitHub Issue: [#71](https://github.com/postmelee/hyper-waterfall/issues/71)
구현계획서: [`task_m050_71_impl.md`](../plans/task_m050_71_impl.md)
Stage: 4

## 단계 목적

Stage 1-3 산출물의 최종 링크 정합성과 M050 종료 상태를 점검한다. README, lifecycle, localization, manifest, smoke, migration 문서에 남은 #71 완료 전 표현을 제거하고, 최종 보고서와 PR 게시로 넘길 잔여 위험을 정리한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/localization.md` | #71 smoke/migration handoff 표현을 완료 상태로 갱신하고 최종 정합성 확인 문구 보정 |
| `docs/localization-smoke.md` | Stage 4 후속 기록을 완료 상태와 잔여 범위로 갱신 |
| `templates/manifest.json` | locale availability note를 #70/#71 완료 상태로 보정 |
| `test/cli-smoke.test.js` | manifest availability note 기대값을 완료 상태 문구에 맞춰 갱신 |
| `mydocs/orders/20260527.md` | #71 상태를 Stage 4 완료와 최종 보고 준비로 갱신 |
| `mydocs/working/task_m050_71_stage4.md` | Stage 4 완료 보고서 작성 |

## 본문 변경 정도 / 본문 무손실 여부

기존 정책과 smoke/migration 본문은 유지하고, 완료 전 handoff 표현만 완료 상태로 바꿨다. README 3종, lifecycle, distribution/plugin 문서는 링크와 책임 경계가 이미 현재 산출물과 맞아 추가 수정하지 않았다.

## 검증 결과

실행 명령:

```bash
npm test
rg -n "M050|locale|migration|zh-CN|README\\.ko|README\\.zh-CN" docs README* templates mydocs
rg -n "후속 #71|#71에서 이어진다|smoke 검증과 migration guide는 #71|#71에서 처리한다|#71 cover" docs README.md README.ko.md README.zh-CN.md templates test
git diff --check
```

결과:

- OK. `npm test` 통과: 11개 테스트 모두 pass.
- OK. `M050|locale|migration|zh-CN|README.ko|README.zh-CN` 검색으로 README 3종, lifecycle, distribution/plugin 문서, smoke/migration 문서, locale pack, 과거 작업 기록의 관련 문맥을 확인했다. 수정이 필요한 현재 사용자-facing 문서 링크 누락은 발견하지 않았다.
- OK. 완료 전 표현 검색은 수정 후 출력이 없었다.
- OK. `git diff --check` 통과.

## 잔여 위험

- Stage 1-4 검증은 dry-run과 문서/검색 기반 smoke다. 실제 적용 저장소 write mode, symlink 생성, `.hyper-waterfall/version.json` 쓰기는 이번 task 범위가 아니다.
- `v0.3.0` GitHub Release/tag 생성, npm publish, Homebrew/Docker/plugin 배포는 별도 release task와 승인 절차가 필요하다.
- `templates/manifest.json`의 version metadata와 checksum 상태는 실제 `v0.3.0` release task에서 다시 확정해야 한다.
- `mydocs/working/`과 `mydocs/report/`의 과거 작업 기록에는 당시 handoff 표현이 보존될 수 있다. 이번 Stage는 현재 기준 문서와 사용자-facing 문서의 stale 표현 제거에 한정했다.

## 다음 단계 영향

- 모든 구현 Stage가 끝났으므로 다음 절차는 최종 결과 보고서 작성, 최종 커밋, `publish/task71` push, PR 생성이다.
- 최종 보고서에는 dry-run 한계와 release/publish 후속 범위를 명확히 남긴다.

## 승인 요청

- Stage 4 산출물과 검증 결과를 승인하면 최종 보고서 작성과 PR 게시 절차로 진행한다.
