# 적용·업데이트 workflow에 locale 선택 절차 연결 Stage 4 완료보고서

GitHub Issue: [#70](https://github.com/postmelee/hyper-waterfall/issues/70)
구현계획서: [`task_m050_70_impl.md`](../plans/task_m050_70_impl.md)
Stage: 4

## 단계 목적

Stage 4의 목적은 Stage 1-3에서 확정한 locale 저장 계약, CLI dry-run 판단, lifecycle/manual 문서 정합성을 통합 검증하는 것이다. 신규 적용 `init --locale`, 기존 update locale 보존, 명시적 locale 전환 요청, doctor 진단이 모두 승인 전 판단 보고로 동작하는지 확인하고, #71로 넘길 smoke/migration 범위를 정리했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/localization.md` | #70을 아직 미래형으로 설명하던 문구를 완료 상태로 정리하고, #71 smoke/migration handoff만 남겼다. |
| `mydocs/working/task_m050_70_stage4.md` | Stage 4 통합 검증 결과와 #71 handoff를 기록했다. |
| `mydocs/orders/20260527.md` | #70 진행 상태를 Stage 4 완료, 최종 보고 승인 대기로 갱신했다. |

## 본문 변경 정도 / 본문 무손실 여부

코드 변경은 없었다. `docs/localization.md`는 정책 본문 의미를 바꾸지 않고, #70 이전에 작성된 미래형 표현을 현재 완료 상태로 고쳤다. #71 범위인 locale별 smoke matrix와 기존 한국어-only 적용 저장소 migration guide는 새로 작성하지 않았다.

## 검증 결과

실행 명령:

```bash
npm test
node bin/hyper-waterfall.js doctor --repo . --manifest templates/manifest.json
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale en --dry-run
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale ko --dry-run
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale zh-CN --dry-run
node bin/hyper-waterfall.js update --repo . --manifest templates/manifest.json --from v0.1.0 --to v0.2.0 --dry-run
node bin/hyper-waterfall.js update --repo . --manifest templates/manifest.json --from v0.1.0 --to v0.2.0 --locale zh-CN --dry-run
rg -n '#70에서 .*확정한다|#70에서 .*처리한다|#67-#70에서 수행한다|중국어 간체 기준 표현은 #69에서 확정하되|선택 locale 저장 계약을 `.hyper-waterfall/version.json`의 `locale` 필드로 확정한다' docs/localization.md
rg -n "실제 locale 선택 저장 위치와 workflow|#70 범위|후속 #70|locale 선택 저장 위치 미확정|Applied version record|적용 버전 기록|records the framework version used|framework version。" docs templates README.md README.ko.md README.zh-CN.md src test
git diff --check
```

결과:

- OK: `npm test` 통과. 11개 테스트 모두 pass.
- OK: `doctor`는 manifest source 25개 존재, localization `complete`, fallback locale source 15개 존재, `.agents/skills`와 `.claude/skills` symlink OK를 보고했다.
- OK: `doctor`의 `.hyper-waterfall/version.json` missing과 target 10개 missing 경고는 이 프레임워크 저장소를 적용 대상처럼 진단할 때의 승인 전 확인 항목이다. 자동 수정은 수행하지 않았다.
- OK: `init --locale en`, `ko`, `zh-CN`은 각각 requested/selected/supported `yes`, selected source `exists=15`, version state `locale` 생성 계획을 출력했다.
- OK: `update` 기본 dry-run은 현재 locale `unknown`, selectedForDiff `en`, `preserveSelectedLocaleOnUpdate: true`, locale 보존/전환 승인 필요성을 출력했다.
- OK: `update --locale zh-CN`은 requested `zh-CN`, selectedForDiff `zh-CN`, selected source `exists=15`, 전환 요청을 별도 승인 항목으로 출력했다.
- OK: `docs/localization.md`의 #70 미래형 표현 검색 결과가 없다.
- OK: #70 보류 표현, locale 저장 위치 미확정 표현, 오래된 version-only 표현 검색 결과가 없다.
- OK: `git diff --check` 통과.

## 잔여 위험

- #71에서 locale별 smoke matrix를 별도 문서화하고, 기존 한국어-only 적용 저장소 migration guide를 작성해야 한다.
- 현재 CLI는 dry-run 판단 보고만 제공한다. 실제 파일 적용, version state 생성, symlink 재생성, PR 생성은 승인 후 일반 task workflow 또는 후속 구현 범위로 남아 있다.

## 다음 단계 영향

- 최종 보고서에는 Stage 1-4의 계약 확정, CLI 출력, 문서 정합성, 통합 검증 결과를 요약한다.
- #71 handoff에는 `en`, `ko`, `zh-CN` 신규 적용 smoke와 기존 한국어-only 저장소에서 `locale`이 없는 version state를 `unknown`으로 보고하는 migration 검증을 포함한다.

## 승인 요청

- Stage 4 산출물과 검증 결과를 승인하면 최종 보고서 작성과 PR 게시 준비로 진행한다.
