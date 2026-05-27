# 다국어 적용 정책

이 문서는 Hyper-Waterfall 하네스를 다국어 사용자가 자신의 저장소에 자신의 언어로 적용하기 위한 공통 정책을 정의한다. M050의 후속 작업(#66-#71)은 이 문서를 기준으로 README, 진입 프롬프트, template, manifest, locale pack, Skill, 적용/update workflow, smoke 검증을 정렬한다.

## 목표

Hyper-Waterfall의 다국어 지원 목표는 단순히 README를 번역하는 것이 아니다. 사용자가 하네스를 적용한 뒤에도 에이전트 운영 규칙, GitHub Issue/PR template, `mydocs/` 생성 문서, 보고서 섹션명, 적용/update 안내가 선택 언어와 일관되어야 한다.

다만 언어가 달라져도 하이퍼-워터폴의 절차 계약은 달라지면 안 된다. 승인 게이트(approval gate), GitHub Issue 기준 추적, branch 규칙, Stage 보고, 최종 보고, PR 게시 규칙은 locale과 무관하게 같은 의미를 유지한다.

## 초기 지원 locale

| locale | 역할 | 비고 |
|---|---|---|
| `en` | 기본 언어 | 새 사용자 진입, 기본 README, 기본 locale pack의 기준 언어 |
| `ko` | 기존 한국어 원문 보존 | 현재 저장소의 한국어 문서를 보존하고 dogfooding 맥락을 유지하는 기준 |
| `zh-CN` | 중국어 간체 | 중국어 초기 지원 locale. 모호한 `zh`는 사용하지 않는다. |

locale code는 BCP 47에 가까운 짧은 태그를 사용한다. 중국어 번체가 필요해지면 `zh-TW` 같은 별도 locale로 추가한다.

## 언어 기본값과 선택

- 신규 적용의 기본 언어는 `en`이다.
- 기존 한국어 원문은 `ko` locale의 기준 자료로 보존한다.
- 사용자가 명시적으로 언어를 고르면 해당 locale의 사용자-facing 문서와 생성 문서 template을 우선 적용한다.
- 사용자가 언어를 명시하지 않으면 적용/update workflow는 영어 기본값을 제안하되, 대상 저장소에 이미 Hyper-Waterfall locale 기록이 있으면 기존 선택을 보존한다.
- 실제 locale 선택 저장 위치와 update 판단 방식은 #70에서 확정한다.

## 문서와 산출물 구분

| 영역 | locale 대상 여부 | 기준 |
|---|---|---|
| README와 사용자 진입 프롬프트 | 대상 | #66에서 `en`, `ko`, `zh-CN` 진입 문서를 정렬한다. |
| `templates/AGENTS.md` | 대상 | 적용 저장소의 에이전트 운영 규칙이므로 선택 locale과 일치해야 한다. |
| GitHub Issue/PR template | 대상 | Issue/PR 작성자가 읽는 플랫폼 template이므로 locale pack 포함 대상으로 둔다. |
| `templates/mydocs/_templates/*` | 대상 | 수행계획서, 구현계획서, Stage 보고서, 최종 보고서 등 생성 문서의 섹션명과 작성 언어를 결정한다. |
| `templates/mydocs/manual/*` | 대상 | 에이전트 운영 manual이므로 locale 대상이다. 번역 시 `requiresSemanticReview: true` 기준으로 의미 보존을 검증한다. |
| `templates/mydocs/skills/*` | 대상 | Skill은 절차 실행 규격이므로 locale 대상이다. 번역 시 `requiresSemanticReview: true` 기준으로 의미 보존을 검증한다. |
| 내부 task 산출물 `mydocs/*` | 현재 작업 locale 사용 | 본 저장소 dogfooding 문서는 현재까지 한국어 중심이지만, M050 이후에는 선택 locale 정책을 따른다. |
| code, command, branch, filename | 비대상 | 언어와 무관한 구조적 계약으로 보존한다. |

## locale pack 배치와 manifest 계약

locale pack은 `templates/locales/{locale}/...` 미러 구조를 사용한다. locale pack 안의 경로는 적용 대상 target 경로를 기준으로 mirror한다.

예:

```text
templates/locales/en/AGENTS.md
templates/locales/en/.github/ISSUE_TEMPLATE/task.yml
templates/locales/en/mydocs/_templates/task_plan.md
templates/locales/ko/AGENTS.md
templates/locales/zh-CN/AGENTS.md
```

`templates/manifest.json`은 하나만 유지한다. locale별 manifest를 따로 만들지 않고, top-level `localization`과 각 `files[]` entry의 `localization` 필드로 locale source 선택 계약을 표현한다.

top-level `localization` 계약:

| 필드 | 의미 |
|---|---|
| `defaultLocale` | 신규 적용 기본 locale. 초기값은 `en` |
| `supportedLocales` | M050에서 지원 대상으로 선언한 locale 목록: `en`, `ko`, `zh-CN` |
| `fallbackLocale` | 판단 기준 fallback locale. 초기값은 `en` |
| `localePackRoot` | locale pack root. 초기값은 `templates/locales` |
| `sourcePatternToken` | entry별 `sourcePattern`에서 locale code로 치환할 token. 초기값은 `{locale}` |
| `missingLocalePolicy` | 선택 locale source가 없을 때 조용히 성공 처리하지 않고 보고하는 정책 |
| `preserveSelectedLocaleOnUpdate` | 기존 적용 저장소 update 시 기존 선택 locale을 보존하는 기본 정책 |
| `availability.status` | 실제 locale pack 본문 준비 상태. 전체 초기 지원 locale이 완료될 때까지 `planned`로 유지하며, #68에서 `en`/`ko`, #69에서 `zh-CN`을 채운다. |

entry-level `localization` 계약:

| 필드 | 의미 |
|---|---|
| `enabled: true` | 선택 locale의 `sourcePattern`을 우선 적용 후보로 사용한다. |
| `enabled: false` | `.gitkeep`, Skill discovery symlink처럼 자연어가 아닌 구조 파일이며 manifest의 기본 `source`를 사용한다. |
| `sourcePattern` | `templates/locales/{locale}/...` 미러 경로. `{locale}`은 `sourcePatternToken` 기준으로 치환한다. |
| `fallbackLocale` | 선택 locale source가 없을 때 보고할 fallback 후보 locale. 초기값은 `en` |
| `requiresSemanticReview` | manual/Skill처럼 절차 의미 보존 검증이 필요한 locale 대상에 둔다. |

`files[].source`는 release checksum, locale 비대상 파일, locale source 누락 보고의 기준이다. `localization.enabled: true`인 entry에서 선택 locale source가 없을 때 `files[].source`를 조용히 선택 locale 대체물처럼 적용하지 않는다. 누락과 fallback 후보를 먼저 보고하고 작업지시자 승인을 받는다.

`templates/mydocs/manual`과 `templates/mydocs/skills`는 locale 대상이지만 절차 의미가 바뀌면 안 되므로 `requiresSemanticReview: true`를 둔다. 번역본 작성과 의미 보존 검증은 #68, #69, #71에서 확인한다.

현재 manifest의 locale pack availability는 부분 준비 상태다. `en`과 `ko` pack source는 #68에서 채웠고, `zh-CN` pack 본문은 #69에서 채운다. `availability.status`는 전체 초기 지원 locale이 완료될 때까지 `planned`로 유지한다.

## 구조적 계약

다음 항목은 번역하지 않는다.

- placeholder: `{REPO_SLUG}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`, `{PR_TEMPLATE_PATH}`, `{milestone}`, `{issue}`, `{stage}`, `{sha}`, `{head_sha}`
- branch: `local/task{N}`, `publish/task{N}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`
- file pattern: `task_{milestone}_{issue}.md`, `task_{milestone}_{issue}_impl.md`, `task_{milestone}_{issue}_stage{N}.md`, `task_{milestone}_{issue}_report.md`
- command and code block: `gh issue view`, `git diff --check`, `npm test` 같은 실행 명령
- GitHub vocabulary used as identifiers: Issue, PR, label, milestone, commit, branch
- symlink target: `mydocs/skills`

자연어 설명과 섹션명은 locale 대상이지만, 위 구조적 계약은 locale pack에서도 그대로 유지한다.

## 한국어 고정 정책 대체

현재 template에는 `작성 언어: 한국어`, `모든 문서는 한국어 작성` 같은 문구가 있다. M050 이후 이 정책은 다음 방향으로 대체한다.

```text
작성 언어: 적용 시 선택한 Hyper-Waterfall locale을 따른다.
```

영어 기준 표현은 다음 의미를 가져야 한다.

```text
Writing language: use the selected Hyper-Waterfall locale for this repository.
```

중국어 간체 기준 표현은 #69에서 확정하되, 의미는 "이 저장소에 선택된 Hyper-Waterfall locale을 따른다"여야 한다. 이 문구는 실제 파일 배치와 locale pack 구조가 정해지는 #67, #68, #69에서 각 문서에 반영한다.

## fallback

fallback은 품질 문제를 숨기는 기능이 아니다. 선택한 locale의 파일이 없거나 일부 template이 누락되면 다음 원칙을 따른다.

- 필수 파일이 없으면 적용/update 보고에 누락을 명시한다.
- 판단 기준이 필요한 경우 `en` canonical 문서를 기준으로 비교한다.
- 사용자-facing 결과물이 선택 locale과 섞이면 PR 또는 보고서의 검증 한계에 기록한다.
- 누락 locale을 조용히 영어로 대체하고 성공처럼 보고하지 않는다.

manifest 기준 fallback 판단은 다음처럼 처리한다.

| 상황 | 판단 |
|---|---|
| 선택 locale의 `sourcePattern` 대상이 존재한다. | 선택 locale source를 적용 후보로 제시한다. |
| 선택 locale source가 없고 `fallbackLocale` source가 존재한다. | fallback source를 후보로 제시하되, 선택 locale 누락을 적용/update 보고에 명시한다. |
| 선택 locale source와 fallback source가 모두 없다. | 자동 적용하지 않고 수동 확인 필요 또는 conflict로 분류한다. |
| directory locale source가 일부만 존재한다. | 혼합 locale 위험을 보고하고 수동 확인 필요로 분류한다. |

## canonical 원천

다국어 구조에서도 canonical 원천은 분리하지 않는다.

- release/update 판단의 canonical 기준은 GitHub Release/tag, `templates/manifest.json`, migration guide다.
- locale pack은 canonical 절차를 번역하거나 배치하는 계층이지, 별도 절차를 만드는 원천이 아니다.
- 같은 절차가 locale별로 다른 의미를 갖게 되면 `en` 문서와 구조적 계약을 기준으로 불일치를 수정한다.
- `templates/` 안의 placeholder는 사용자가 자신의 저장소에 적용할 때 치환되는 값이므로 본 저장소에서 번역하거나 실제 값으로 치환하지 않는다.

## lifecycle 정합성

locale 판단은 다음 문서가 같은 책임 경계를 공유한다.

| 문서 | 책임 |
|---|---|
| `docs/agent-entrypoint.md` | 신규 적용과 기존 update가 locale 판단을 어디서 시작할지 연결한다. |
| `docs/lifecycle/adoption.md` | 파일 변경 전 선택 locale, 기본 locale, fallback 후보, 누락 source를 판단 결과로 보고한다. |
| `docs/lifecycle/update.md` | 현재 locale, 목표 release locale 지원, 기존 locale 보존, locale 전환 요청, locale manifest diff를 보고한다. |
| `templates/manifest.json` | 위 판단에 필요한 기계 판독 계약을 제공한다. |

#67은 위 구조와 판단 결과 형식을 고정한다. #68은 `en`/`ko` locale pack 본문을 작성하고, #69는 `zh-CN` locale pack 본문을 작성한다. locale 선택 저장 위치와 workflow 실행 연결은 #70, smoke 검증과 migration guide는 #71에서 처리한다.

## 번역 동기화

locale별 문서는 같은 절차 의미를 유지해야 한다.

- `en`을 기본 비교 기준으로 둔다.
- `ko`는 기존 한국어 원문을 보존하되, M050 이후 정책 문구는 선택 locale 기반 표현으로 갱신한다.
- `zh-CN`은 `en`과 `ko`를 함께 참조하되, 승인 게이트, Issue 추적, Stage 보고, PR 규칙의 의미를 바꾸지 않는다.
- 번역 중 의미가 흔들리는 용어는 용어 대응표나 번역 메모에 남긴다.

## 후속 이슈 경계

| 이슈 | 책임 |
|---|---|
| #66 | README와 적용 진입 프롬프트를 `en`, `ko`, `zh-CN` 기준으로 정렬한다. |
| #67 | templates locale pack 구조, manifest/update 표현, fallback 처리 위치를 확정한다. |
| #68 | 영어 locale pack을 작성하고 기존 한국어 원문을 `ko` 기준으로 보존한다. |
| #69 | 중국어 간체 `zh-CN` locale pack을 작성하고 용어 의미 보존을 검증한다. |
| #70 | 신규 적용과 기존 update workflow에 locale 선택과 보존 절차를 연결한다. |
| #71 | locale별 smoke 검증과 기존 한국어-only 적용 저장소 migration guide를 작성한다. |

#65는 이 정책을 고정하는 작업이며, 실제 README 번역, locale pack 파일 배치, manifest 구현, workflow 구현은 후속 이슈 범위다. 이 중 manifest 계약과 lifecycle 판단 형식은 #67에서 정렬하고, locale pack 본문과 workflow 실행은 #68 이후 후속 이슈에서 처리한다.

## 수용 기준 대응

#65의 정책 산출물은 후속 이슈가 참조할 기준을 고정하는 데 한정한다. 수용 기준별 대응은 다음과 같다.

| #65 수용 기준 | 정책 기준 | 후속 구현 범위 |
|---|---|---|
| 기본 언어와 초기 지원 locale 정의 | 기본 언어는 `en`, 기존 한국어 보존 locale은 `ko`, 중국어 간체는 `zh-CN`으로 둔다. | README 진입 문서는 #66, locale pack 배치는 #67-#69에서 반영한다. |
| 한국어 고정 정책 대체 방향 | `작성 언어: 한국어`와 `모든 문서는 한국어 작성`은 선택한 Hyper-Waterfall locale을 따르는 정책으로 대체한다. | 실제 template/Skill/manual 문구 교체는 #67-#70에서 수행한다. |
| placeholder와 canonical 용어 보존 | placeholder, branch, filename pattern, command, code block은 구조적 계약으로 보존한다. | locale pack 작성과 smoke 검증은 #68, #69, #71에서 확인한다. |
| fallback 기준 | 누락 locale은 조용히 영어로 대체하지 않고 적용/update 보고에 명시한다. 판단 기준은 `en` canonical 문서다. | fallback 처리 위치와 사용자-facing 메시지는 #67, #70에서 확정한다. |
| 후속 이슈 경계 | #66-#71의 책임을 분리하고 #65가 README 번역, locale pack, workflow 구현을 대체하지 않는다. | 각 이슈의 수행계획서에서 이 문서를 선행 기준으로 참조한다. |

Stage 3에서 #65-#71 이슈 본문과 M050 milestone 설명을 확인한 결과, 후속 이슈의 목표와 수용 기준은 위 정책과 충돌하지 않는다. #66은 사용자 진입 문서, #67은 구조와 manifest, #68-#69는 locale pack 본문, #70은 적용/update 선택 절차, #71은 smoke와 migration으로 분리되어 있다.

#68 Stage 4에서 `templates/manifest.json`, adoption/update lifecycle 문서, 이 정책 문서의 정합성을 확인한 결과, 초기 locale은 `en`, `ko`, `zh-CN`으로 일치한다. `en`과 `ko` source는 manifest의 localized entry 15개에 모두 존재한다. `zh-CN`은 #69 범위로 남아 있으므로 manifest의 locale pack `availability.status`는 `planned`로 유지하고, 누락 locale source는 성공이 아니라 보고 대상으로 남긴다.
