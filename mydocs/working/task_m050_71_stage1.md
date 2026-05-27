# 다국어 적용 smoke 검증과 migration guide 작성 Stage 1 완료보고서

GitHub Issue: [#71](https://github.com/postmelee/hyper-waterfall/issues/71)
구현계획서: [`task_m050_71_impl.md`](../plans/task_m050_71_impl.md)
Stage: 1

## 단계 목적

Stage 1의 목적은 M050 다국어 smoke 검증의 장기 문서 골격을 만들고, `en`, `ko`, `zh-CN` 신규 적용 dry-run baseline을 확인하는 것이다. 또한 scratch repo를 대상으로 검증할 때 manifest 경로를 어떻게 넘겨야 하는지 실행 기준을 확정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/localization-smoke.md` | smoke 범위, 실행 기준, manifest baseline, 신규 적용 smoke matrix, Stage 2-4에서 채울 pending 항목, 검증 한계를 작성했다. |
| `mydocs/plans/task_m050_71_impl.md` | scratch repo 검증 명령의 `--manifest` 값을 `$(pwd)/templates/manifest.json` 형태로 보정했다. |
| `mydocs/orders/20260527.md` | #71 진행 상태를 Stage 1 완료, Stage 2 승인 대기로 갱신했다. |

## 본문 변경 정도 / 본문 무손실 여부

신규 공식 문서 `docs/localization-smoke.md`를 추가했다. 기존 정책 문서나 README 본문은 수정하지 않았다.

구현계획서의 검증 명령은 범위나 Stage 분할을 바꾸지 않고 경로 해석만 보정했다. scratch repo를 `--repo`로 지정하면 상대 `--manifest templates/manifest.json`이 scratch repo 기준으로 해석되어 실패하므로, framework repo root에서 `$(pwd)/templates/manifest.json`를 넘기도록 수정했다.

## 검증 결과

실행 명령:

```bash
node bin/hyper-waterfall.js init --repo /private/tmp/hw-smoke-en --manifest "$(pwd)/templates/manifest.json" --locale en --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-smoke-ko --manifest "$(pwd)/templates/manifest.json" --locale ko --dry-run
node bin/hyper-waterfall.js init --repo /private/tmp/hw-smoke-zh --manifest "$(pwd)/templates/manifest.json" --locale zh-CN --dry-run
rg -n "supportedLocales|availability|sourcePattern|versionState" templates/manifest.json docs/localization.md docs/localization-smoke.md
git diff --check
```

결과:

- OK: `init --locale en --dry-run`은 `supported: yes`, `selectedSourceStatus: exists=15`, `fallbackSourceStatus: exists=15`, version state `locale: en`, `targetStatus: missing=25`, 기존 파일 충돌 없음, Safety 비자동 수정을 출력했다.
- OK: `init --locale ko --dry-run`은 `supported: yes`, `selectedSourceStatus: exists=15`, `fallbackSourceStatus: exists=15`, version state `locale: ko`, `targetStatus: missing=25`, 기존 파일 충돌 없음, Safety 비자동 수정을 출력했다.
- OK: `init --locale zh-CN --dry-run`은 `supported: yes`, `selectedSourceStatus: exists=15`, `fallbackSourceStatus: exists=15`, version state `locale: zh-CN`, `targetStatus: missing=25`, 기존 파일 충돌 없음, Safety 비자동 수정을 출력했다.
- OK: manifest/localization 검색에서 `supportedLocales`, `availability`, `sourcePattern`, `versionState` 계약이 `templates/manifest.json`, `docs/localization.md`, `docs/localization-smoke.md`에 존재함을 확인했다.
- OK: `git diff --check` 통과.

## 잔여 위험

- Stage 1은 신규 적용 baseline까지만 확인했다. unsupported locale, 기존 update 보존/전환, placeholder와 승인 게이트 의미 보존은 Stage 2에서 채운다.
- 실제 파일 복사와 `.hyper-waterfall/version.json` write는 현재 CLI 범위가 아니므로 검증하지 않았다. 이 한계는 `docs/localization-smoke.md`에 명시했다.

## 다음 단계 영향

- Stage 2는 `docs/localization-smoke.md`의 pending 표를 실제 smoke 결과로 채운다.
- Stage 2는 한국어-only 임시 저장소 시나리오를 만들어 `locale` 없는 version state와 `locale: ko` 보존, `zh-CN` 전환 요청을 확인한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
