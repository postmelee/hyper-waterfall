# 다국어 적용 smoke 검증과 migration guide 작성 Stage 2 보고서

GitHub Issue: [#71](https://github.com/postmelee/hyper-waterfall/issues/71)
구현계획서: [`task_m050_71_impl.md`](../plans/task_m050_71_impl.md)
Stage: 2

## 단계 목적

locale별 smoke 실행 결과를 `docs/localization-smoke.md`에 채운다. unsupported locale, 기존 적용 저장소 update의 locale 보존/전환, placeholder와 승인 게이트 같은 구조적 계약이 locale과 무관하게 유지되는지 확인한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/localization-smoke.md` | unsupported locale `fr`, 기존 update locale 미기록/`ko` 보존/`zh-CN` 전환, 구조적 계약 검색 결과를 Stage 2 결과로 기록 |
| `mydocs/orders/20260527.md` | #71 상태를 Stage 2 완료와 Stage 3 승인 대기로 갱신 |
| `mydocs/working/task_m050_71_stage2.md` | Stage 2 완료 보고서 작성 |

## 본문 변경 정도 / 본문 무손실 여부

기존 Stage 1 smoke matrix와 검증 한계는 유지하고, Stage 2 pending 표를 실제 dry-run 결과와 검색 결과로 채웠다. migration guide 연결 섹션은 Stage 3 범위라 pending 상태로 보존했다.

## 검증 결과

실행 명령:

```bash
node -e 'const fs=require("fs"); const dir="/private/tmp/hw-smoke-ko-only/.hyper-waterfall"; fs.mkdirSync(dir,{recursive:true}); fs.writeFileSync(`${dir}/version.json`, JSON.stringify({schemaVersion:"0.1.0",frameworkVersion:"0.2.0",releaseTag:"v0.2.0",source:"github-release",installedAt:"2026-05-27T00:00:00.000Z",updatedAt:"2026-05-27T00:00:00.000Z"}, null, 2)+"\n");'
node bin/hyper-waterfall.js init --repo /private/tmp/hw-smoke-fr --manifest "$(pwd)/templates/manifest.json" --locale fr --dry-run
node bin/hyper-waterfall.js update --repo /private/tmp/hw-smoke-ko-only --manifest "$(pwd)/templates/manifest.json" --from v0.2.0 --to v0.3.0 --dry-run
node -e 'const fs=require("fs"); const file="/private/tmp/hw-smoke-ko-only/.hyper-waterfall/version.json"; const data=JSON.parse(fs.readFileSync(file,"utf8")); data.locale="ko"; fs.writeFileSync(file, JSON.stringify(data, null, 2)+"\n");'
node bin/hyper-waterfall.js update --repo /private/tmp/hw-smoke-ko-only --manifest "$(pwd)/templates/manifest.json" --from v0.2.0 --to v0.3.0 --dry-run
node bin/hyper-waterfall.js update --repo /private/tmp/hw-smoke-ko-only --manifest "$(pwd)/templates/manifest.json" --from v0.2.0 --to v0.3.0 --locale zh-CN --dry-run
rg -n "\\{REPO_SLUG\\}|\\{BASE_BRANCH\\}|승인|approval|批准|locale" templates/locales docs/localization-smoke.md
git diff --check
```

결과:

- OK. `fr` 신규 적용 dry-run은 `supported: no`, `selectedSourceStatus: missing=15`, `fallbackSourceStatus: exists=15`를 보고했고, 승인 전 자동 수정을 수행하지 않았다.
- OK. `locale` 미기록 version state는 `locale: unknown`, `selectedForDiff: en`으로 보고했다. Stage 3 전이므로 migration guide `exists: no`는 현재 정상 상태다.
- OK. `locale: ko` version state는 `selectedForDiff: ko`로 보존했고, `--locale zh-CN` 요청은 `ko -> zh-CN; 별도 승인 필요`로 분리했다.
- OK. placeholder, branch/file pattern, 승인 게이트, 선택 locale 작성 언어 안내가 `templates/locales/{en,ko,zh-CN}`에 존재한다.
- OK. `git diff --check` 통과.

## 잔여 위험

- migration guide는 Stage 3 산출물이므로 update dry-run에서 `docs/migrations/v0.2.0-to-v0.3.0.md`가 아직 없다고 보고한다.
- Stage 2는 dry-run과 검색 기반 smoke다. 실제 파일 적용 write mode는 이번 Stage 범위가 아니다.

## 다음 단계 영향

- Stage 3에서는 `docs/migrations/v0.2.0-to-v0.3.0.md`를 작성하고, Stage 2에서 확인한 `unknown` locale 및 `ko` 보존/전환 승인 흐름을 migration guide에 반영한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3으로 진행한다.
