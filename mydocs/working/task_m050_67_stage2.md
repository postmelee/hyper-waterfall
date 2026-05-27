# 단계 보고서

GitHub Issue: [#67](https://github.com/postmelee/hyper-waterfall/issues/67)
구현계획서: [`task_m050_67_impl.md`](../plans/task_m050_67_impl.md)
Stage: 2

## 단계 목적

Stage 2의 목적은 Stage 1에서 채택한 `templates/locales/{locale}/...` 미러 구조를 `templates/manifest.json`의 기계 판독 계약과 `docs/localization.md`의 공식 정책 문서에 반영하는 것이다.

이번 단계는 locale pack 본문을 작성하지 않고, 후속 #68/#69가 따를 source 선택 계약과 fallback 판단 기준만 확정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/manifest.json` | top-level `localization` 계약 추가, 25개 `files[]` entry에 `localization` 필드 추가 |
| `docs/localization.md` | locale pack 미러 구조, manifest 계약, entry-level localization, fallback 판단 기준 문서화 |
| `mydocs/tech/task_m050_67_locale_manifest_design.md` | Stage 2 실제 반영 결과와 entry 분류를 기술 기록에 추가 |

## 본문 변경 정도 / 본문 무손실 여부

기존 template 본문은 변경하지 않았다. `templates/manifest.json`은 기존 source, target, kind, role, updatePolicy, checksum 값을 유지하고 locale source 선택 계약만 추가했다.

`docs/localization.md`에는 기존 정책을 삭제하지 않고 `locale pack 배치와 manifest 계약`, manifest 기준 fallback 판단 표를 추가했다.

## 검증 결과

실행 명령:

```bash
node -e 'const fs=require("fs"); JSON.parse(fs.readFileSync("templates/manifest.json","utf8")); console.log("ok")'
rg -n "locale|locales|defaultLocale|fallback|source|templates/locales" templates/manifest.json docs/localization.md mydocs/tech/task_m050_67_locale_manifest_design.md
git diff --check
```

추가 확인:

```bash
node -e 'const fs=require("fs"); const m=JSON.parse(fs.readFileSync("templates/manifest.json","utf8")); const missing=m.files.filter(f=>!f.localization); const enabled=m.files.filter(f=>f.localization&&f.localization.enabled); const bad=enabled.filter(f=>!f.localization.sourcePattern || !f.localization.sourcePattern.includes("templates/locales/{locale}")); console.log(JSON.stringify({missingLocalization:missing.length,enabled:enabled.length,disabled:m.files.length-enabled.length,badSourcePattern:bad.map(f=>f.role)},null,2)); process.exit(missing.length||bad.length?1:0);'
```

결과:

- OK: manifest JSON parse 결과 `ok`.
- OK: `rg` 결과에서 `defaultLocale`, `supportedLocales`, `fallbackLocale`, `localePackRoot`, `sourcePattern`, `templates/locales/{locale}`가 manifest, 정책 문서, 기술 기록에 확인됐다.
- OK: 모든 `files[]` entry에 `localization` 필드가 존재한다.
- OK: locale 대상 entry는 15개, 비대상 entry는 10개로 분류됐다.
- OK: locale 대상 entry의 `sourcePattern`은 모두 `templates/locales/{locale}` 경로를 포함한다.
- OK: `manuals`, `agent-skills` entry에는 `requiresSemanticReview: true`가 설정됐다.
- OK: `git diff --check`가 경고 없이 통과했다.

## 잔여 위험

- `templates/locales/en`, `templates/locales/ko`, `templates/locales/zh-CN` 본문은 아직 존재하지 않는다. manifest의 `availability.status`는 그래서 `planned`로 남겼다.
- `supportedLocales`는 M050 지원 대상으로 선언된 locale 목록이며, 실제 pack availability는 #68/#69 완료 전까지 planned 상태다.
- 현재 단계는 source 선택 계약만 추가했으므로, 실제 신규 적용/update 판단 결과 형식은 Stage 3에서 lifecycle 문서에 연결해야 한다.
- locale별 checksum 또는 directory checksum 산식은 이번 Stage에서 확정하지 않았다. 후속 #68/#69/#71에서 pack 본문과 smoke 검증을 기준으로 다뤄야 한다.

## 다음 단계 영향

- Stage 3은 `docs/agent-entrypoint.md`, `docs/lifecycle/adoption.md`, `docs/lifecycle/update.md`에 이번 Stage의 manifest 계약을 연결한다.
- 신규 적용 판단 결과에는 선택 locale, 기본 locale, source 누락, fallback 보고가 포함되어야 한다.
- 기존 업데이트 판단 결과에는 현재 locale, 목표 release locale 지원 상태, 기존 locale 보존, locale 전환 요청, locale별 manifest diff 판단이 포함되어야 한다.
- 실제 locale 선택 저장 위치와 workflow 실행 구현은 계속 #70 범위로 남긴다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 — adoption/update 문서 기준 정렬로 진행한다.
