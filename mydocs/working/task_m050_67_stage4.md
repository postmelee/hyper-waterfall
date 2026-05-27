# 단계 보고서

GitHub Issue: [#67](https://github.com/postmelee/hyper-waterfall/issues/67)
구현계획서: [`task_m050_67_impl.md`](../plans/task_m050_67_impl.md)
Stage: 4

## 단계 목적

Stage 4는 #67에서 확정한 locale pack 구조, manifest 계약, adoption/update 판단 기준이 서로 충돌하지 않는지 통합 검증하고, 후속 #68, #69, #70, #71의 책임 경계를 다시 명확히 하는 단계다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/localization.md` | manual/Skill을 locale 대상으로 확정하고 `requiresSemanticReview` 기준을 반영했다. manifest의 `sourcePatternToken`, `availability.status`, entry-level `localization` 계약, `files[].source`의 책임, lifecycle 정합성 표를 추가했다. |
| `mydocs/tech/task_m050_67_locale_manifest_design.md` | Stage 4 통합 정합성 검증 결과를 추가하고, 초기 locale, 기본/fallback locale, locale pack 상태, entry 분류, 구조적 계약, 후속 경계를 기록했다. |
| `mydocs/working/task_m050_67_stage4.md` | Stage 4 산출물, 검증 결과, 잔여 위험, 다음 단계 영향을 기록했다. |

## 본문 변경 정도 / 본문 무손실 여부

기존 다국어 정책의 목표, fallback 원칙, canonical 원천, 번역 동기화, 후속 이슈 경계는 유지했다. Stage 2와 Stage 3에서 이미 확정된 manifest/lifecycle 기준에 맞춰 `대상 후보` 표현을 현재 계약으로 갱신하고, 누락된 manifest 필드와 lifecycle 책임 표를 보강했다.

이번 단계에서도 실제 locale pack 본문, locale별 checksum, workflow 실행 구현, migration guide는 작성하지 않았다.

## 검증 결과

실행 명령:

```bash
node -e 'const fs=require("fs"); JSON.parse(fs.readFileSync("templates/manifest.json","utf8")); console.log("ok")'
rg -n "#67|#68|#69|#70|#71|locale pack|manifest|fallback|placeholder" docs templates mydocs/tech/task_m050_67_locale_manifest_design.md
rg -n "en|ko|zh-CN|templates/locales|defaultLocale|fallbackLocale" templates/manifest.json docs/localization.md docs/lifecycle/adoption.md docs/lifecycle/update.md
git diff --check
```

결과:

- OK: `templates/manifest.json` JSON parse 결과 `ok`.
- OK: #67-#71, `locale pack`, `manifest`, `fallback`, `placeholder` 키워드가 관련 문서와 template 기준에서 확인됐다.
- OK: `en`, `ko`, `zh-CN`, `templates/locales`, `defaultLocale`, `fallbackLocale` 기준이 manifest, localization, adoption/update 문서에서 확인됐다.
- OK: `git diff --check` 출력 없음.

추가 확인:

```bash
node -e 'const fs=require("fs"); const m=JSON.parse(fs.readFileSync("templates/manifest.json","utf8")); const counts=m.files.reduce((a,f)=>{const k=f.localization&&f.localization.enabled===true?"enabled":f.localization&&f.localization.enabled===false?"disabled":"missing"; a[k]=(a[k]||0)+1; return a},{}); console.log(JSON.stringify({defaultLocale:m.localization.defaultLocale,supportedLocales:m.localization.supportedLocales,fallbackLocale:m.localization.fallbackLocale,availability:m.localization.availability.status,counts},null,2))'
```

결과:

- OK: `defaultLocale`은 `en`, `supportedLocales`는 `en`, `ko`, `zh-CN`, `fallbackLocale`은 `en`, `availability`는 `planned`.
- OK: `localization.enabled: true` 15개, `enabled: false` 10개.

## 잔여 위험

- `templates/locales/en`, `templates/locales/ko`, `templates/locales/zh-CN` 실제 본문은 아직 없으며 #68, #69 범위다.
- `.hyper-waterfall/version.json`에 locale을 어디에 저장할지는 아직 정하지 않았으며 #70 범위다.
- locale별 smoke 검증과 기존 한국어-only 적용 저장소 migration guide는 아직 작성하지 않았으며 #71 범위다.

## 다음 단계 영향

- #67의 구현 Stage는 Stage 4로 완료됐다.
- 다음 절차는 최종 보고서 작성, 최종 검증, publish 브랜치 push, PR 생성 단계다.

## 승인 요청

- Stage 4 산출물과 검증 결과를 승인하면 최종 보고서와 PR 게시 단계로 진행한다.
