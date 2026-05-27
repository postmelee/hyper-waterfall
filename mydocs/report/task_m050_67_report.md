# Task M050 #67 최종 보고서

GitHub Issue: [#67](https://github.com/postmelee/hyper-waterfall/issues/67)
마일스톤: M050

## 작업 요약

- 대상 이슈: #67
- 마일스톤: M050
- 단계 수: 4개 Stage
- 작업 목적: `templates/` 사용자-facing 파일을 다국어 locale pack으로 확장할 수 있도록 locale pack 배치, manifest 계약, 신규 적용과 기존 update 판단 기준을 고정한다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `templates/manifest.json` | top-level `localization`과 entry-level `files[].localization` 계약 추가 | 신규 적용/update 도구가 locale source, fallback, 보존 정책을 판단하는 기계 판독 기준 |
| `docs/localization.md` | locale pack 배치, manifest 계약, entry-level localization 계약, lifecycle 정합성, 후속 이슈 경계 보강 | 다국어 정책과 후속 #68-#71 작업 기준 |
| `docs/agent-entrypoint.md` | locale 판단 원천을 manifest와 adoption/update lifecycle 문서로 연결 | AI coding tool의 적용/update 진입점 |
| `docs/lifecycle/adoption.md` | 신규 적용 판단 결과에 선택 locale, 기본 locale, source 누락, fallback 후보, #70 보류 항목 추가 | 신규 적용 전 승인 보고 형식 |
| `docs/lifecycle/update.md` | 기존 update 판단 결과에 현재 locale, 목표 release locale 지원, locale 보존/전환, locale manifest diff 추가 | 기존 적용 저장소 update 전 승인 보고 형식 |
| `docs/lifecycle/update_pr.md` | update 판단 결과를 PR로 전환할 때 locale 지원, locale diff, 보존/전환 판단을 포함하도록 보강 | 기존 적용 저장소 update PR 본문 기준 |
| `README.md` | 기존 적용 저장소 업데이트 설명에 현재 locale, 목표 release locale 지원, locale manifest diff를 추가 | 사용자/maintainer 진입 문서 |
| `src/lib/manifest.js` | manifest localization 요약, locale source 상태 계산, locale source 항목 formatting helper 추가 | CLI lifecycle dry-run/doctor 출력 |
| `src/commands/init.js` | 신규 적용 판단 결과에 선택 locale과 locale source 후보 섹션 추가 | `hyper-waterfall init --dry-run` 출력 |
| `src/commands/update.js` | 기존 update 판단 결과에 현재 locale, 목표 release locale 지원, locale manifest diff, locale 보존/전환 판단 섹션 추가 | `hyper-waterfall update --dry-run` 출력 |
| `src/commands/doctor.js` | doctor 진단에 localization 요약과 locale-source 누락 진단 추가 | `hyper-waterfall doctor` 출력 |
| `test/cli-smoke.test.js` | CLI smoke test가 locale 섹션과 현재 manifest entry 수를 검증하도록 갱신 | 자동 테스트 |
| `templates/mydocs/manual/framework_lifecycle_guide.md` | lifecycle 판단과 CLI 출력 기준에 locale 항목 추가 | 적용 저장소로 배포되는 framework lifecycle manual |
| `templates/mydocs/manual/release_update_protocol.md` | update protocol 입력과 update PR 입력에 locale manifest diff 추가 | 적용 저장소로 배포되는 release/update manual |
| `mydocs/tech/task_m050_67_locale_manifest_design.md` | locale 대상 inventory, 구조 후보, Stage별 manifest/lifecycle 연결 결과, 통합 검증 결과 기록 | 후속 task가 참조할 설계 근거 |
| `mydocs/plans/task_m050_67.md` | 수행계획서 작성 | 작업 이력 |
| `mydocs/plans/task_m050_67_impl.md` | 구현계획서와 Stage별 검증 기준 작성 | 작업 이력 |
| `mydocs/working/task_m050_67_stage*.md` | Stage별 완료 보고서 작성 | 단계 이력과 검증 근거 |
| `mydocs/orders/20260527.md` | #67 오늘할일 상태를 완료로 갱신 | 운영 보드 |

## 문서 위치 검증

| 파일 | 계획된 위치 | 실제 위치 | 결과 | 근거 |
|---|---|---|---|---|
| `docs/localization.md` | `docs/` | `docs/localization.md` | OK | 수행계획서의 공식 다국어 정책 문서 위치와 일치 |
| `docs/lifecycle/adoption.md` | `docs/lifecycle/` | `docs/lifecycle/adoption.md` | OK | 수행계획서의 신규 적용 lifecycle 문서 위치와 일치 |
| `docs/lifecycle/update.md` | `docs/lifecycle/` | `docs/lifecycle/update.md` | OK | 수행계획서의 기존 update lifecycle 문서 위치와 일치 |
| `docs/agent-entrypoint.md` | `docs/` | `docs/agent-entrypoint.md` | OK | 수행계획서의 agent 진입 문서 위치와 일치 |
| `docs/lifecycle/update_pr.md` | `docs/lifecycle/` | `docs/lifecycle/update_pr.md` | OK | PR 리뷰에서 기존 update 판단과 PR 전환 기준을 맞추기 위해 같은 lifecycle 위치에서 보강 |
| `templates/manifest.json` | `templates/` | `templates/manifest.json` | OK | 수행계획서의 배포 manifest 위치와 일치 |
| `mydocs/tech/task_m050_67_locale_manifest_design.md` | `mydocs/tech/` | `mydocs/tech/task_m050_67_locale_manifest_design.md` | OK | 수행계획서의 기술 조사/설계 근거 위치와 일치 |
| `mydocs/*` task 산출물 | `mydocs/plans`, `mydocs/working`, `mydocs/report`, `mydocs/orders` | 계획/단계/보고/오늘할일 폴더 | OK | 작업 산출물 위치가 수행계획서와 일치 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| manifest top-level `localization` | 없음 | 있음 |
| 지원 locale 선언 | 없음 | `en`, `ko`, `zh-CN` |
| 기본 locale / fallback locale | 없음 | `defaultLocale: en`, `fallbackLocale: en` |
| locale pack root | 없음 | `templates/locales` |
| `files[].localization.enabled: true` | 0개 | 15개 |
| `files[].localization.enabled: false` | 0개 | 10개 |
| manual/Skill semantic review 표시 | 없음 | `requiresSemanticReview: true` |
| CLI init locale 판단 섹션 | 없음 | `선택 locale`, `locale source 후보` |
| CLI update locale 판단 섹션 | 없음 | `현재 locale`, `목표 release locale 지원`, `locale manifest diff`, `locale 보존/전환 판단` |
| CLI doctor locale 진단 | 없음 | `localization`, `locale-source` |
| CLI smoke test | 1개 실패 | 8개 통과 |
| Stage 보고서 | 없음 | 4개 (`stage1`~`stage4`) |
| 계획/Stage/리뷰 커밋 | 없음 | 8개 (`main..local/task67`, PR 리뷰 반영 커밋 포함) |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| `templates/manifest.json`이 JSON으로 파싱된다. | OK — `node -e 'JSON.parse(...)'` 결과 `ok`. |
| 신규 적용과 기존 업데이트에서 locale을 어떻게 선택하고 보존하는지 문서화되어 있다. | OK — `docs/lifecycle/adoption.md`와 `docs/lifecycle/update.md`에 선택 locale, 현재 locale, 보존/전환, fallback, 누락 보고 항목을 추가했다. |
| placeholder와 구조적 계약 보존 규칙이 #65 정책과 충돌하지 않는다. | OK — `docs/localization.md`와 설계 기록에서 placeholder, branch, filename pattern, command/code block, symlink target을 비번역 구조 계약으로 명시했다. |
| 후속 #68/#69가 따를 locale pack 파일 배치와 manifest 표현 기준이 명확하다. | OK — `templates/locales/{locale}/...`, `sourcePatternToken`, `sourcePattern`, `fallbackLocale`, `availability.status`를 문서화했다. |
| CLI dry-run/doctor가 문서화된 locale 판단 항목을 보고한다. | OK — `init`, `update`, `doctor` 출력에 locale 판단 섹션과 `locale-source` 진단을 추가했고 smoke test로 확인했다. |
| 기존 update 판단과 update PR 전환 기준이 같은 locale 항목을 사용한다. | OK — `docs/lifecycle/update_pr.md`, `framework_lifecycle_guide.md`, `release_update_protocol.md`에 현재 locale, 목표 release locale 지원, locale manifest diff, locale 보존/전환 판단을 반영했다. |
| #70 workflow 구현 범위를 침범하지 않는다. | OK — locale 선택 저장 위치와 workflow 실행 구현은 #70 범위로 남겼다. |
| #71 smoke/migration 범위를 침범하지 않는다. | OK — locale별 smoke 검증과 migration guide는 #71 범위로 남겼다. |
| `git diff --check`가 경고 없이 통과한다. | OK — 통합 검증에서 통과했다. |
| PR 준비 전 `git status --short`가 빈 출력이다. | OK — 최종 보고서 작성 전 기준으로 빈 출력이었다. 최종 보고서 커밋 후 재확인한다. |

### 단계별 검증 결과

- Stage 1: [`task_m050_67_stage1.md`](../working/task_m050_67_stage1.md)에서 `templates/` inventory, locale 대상/비대상 분류, 한국어 고정 문구, 구조 후보를 검증했다.
- Stage 2: [`task_m050_67_stage2.md`](../working/task_m050_67_stage2.md)에서 manifest JSON parse, locale 계약 키워드, `templates/locales/{locale}` sourcePattern을 검증했다.
- Stage 3: [`task_m050_67_stage3.md`](../working/task_m050_67_stage3.md)에서 adoption/update 판단 결과에 locale 항목과 #70 보류 경계가 포함됐는지 검증했다.
- Stage 4: [`task_m050_67_stage4.md`](../working/task_m050_67_stage4.md)에서 #67-#71 경계, fallback, placeholder, manifest 정합성을 검증했다.

통합 검증 명령:

```bash
node -e 'const fs=require("fs"); JSON.parse(fs.readFileSync("templates/manifest.json","utf8")); console.log("ok")'
rg -n "#67|#68|#69|#70|#71|locale pack|manifest|fallback|placeholder" docs templates mydocs/tech/task_m050_67_locale_manifest_design.md
rg -n "en|ko|zh-CN|templates/locales|defaultLocale|fallbackLocale" templates/manifest.json docs/localization.md docs/lifecycle/adoption.md docs/lifecycle/update.md
git diff --check
npm test
git log --oneline main..local/task67
```

추가 manifest 요약 검증:

```bash
node -e 'const fs=require("fs"); const m=JSON.parse(fs.readFileSync("templates/manifest.json","utf8")); const counts=m.files.reduce((a,f)=>{const k=f.localization&&f.localization.enabled===true?"enabled":f.localization&&f.localization.enabled===false?"disabled":"missing"; a[k]=(a[k]||0)+1; return a},{}); console.log(JSON.stringify({defaultLocale:m.localization.defaultLocale,supportedLocales:m.localization.supportedLocales,fallbackLocale:m.localization.fallbackLocale,availability:m.localization.availability.status,counts},null,2))'
```

결과:

- `defaultLocale`: `en`
- `supportedLocales`: `en`, `ko`, `zh-CN`
- `fallbackLocale`: `en`
- `availability`: `planned`
- `localization.enabled: true`: 15개
- `localization.enabled: false`: 10개

## 잔여 위험과 후속 작업

### 잔여 위험

- 실제 `templates/locales/en`, `templates/locales/ko`, `templates/locales/zh-CN` 본문은 아직 없으며 #68, #69 범위다.
- locale별 checksum 산출과 smoke 검증은 아직 없으며 #71 범위다.
- `.hyper-waterfall/version.json`의 locale 선택 저장 위치와 update workflow 실행 방식은 아직 정하지 않았으며 #70 범위다.

### 후속 작업 후보

- #68 영어 locale pack 작성과 한국어 원문 보존
- #69 중국어 간체 locale pack 작성
- #70 적용·업데이트 workflow에 locale 선택 절차 연결
- #71 locale별 smoke 검증과 기존 한국어-only 적용 저장소 migration guide 작성

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 기준으로 PR 게시 절차를 진행한다.
