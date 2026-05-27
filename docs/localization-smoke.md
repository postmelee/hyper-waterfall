# 다국어 적용 smoke 검증

이 문서는 Hyper-Waterfall M050 다국어 적용 지원의 smoke 검증 기준과 결과를 기록한다. 목적은 `en`, `ko`, `zh-CN` locale pack이 신규 적용과 기존 update 판단에서 재현 가능하게 선택되고, 승인 게이트와 placeholder 같은 절차 계약이 locale과 무관하게 보존되는지 확인하는 것이다.

## 범위

포함:

- `templates/manifest.json`의 localization 계약과 locale source 존재 여부
- `en`, `ko`, `zh-CN` 신규 적용 dry-run
- unsupported locale의 fallback 후보 보고
- 기존 적용 저장소 update에서 기존 locale 보존과 명시적 locale 전환 요청 보고
- placeholder, branch, filename pattern, command, 승인 게이트 의미 보존
- 기존 한국어-only 적용 저장소 migration guide와의 연결

제외:

- 실제 외부 저장소 파일 변경
- `init` 또는 `update` write mode 검증
- GitHub Release/tag 생성
- npm publish, Homebrew, Docker, plugin 배포
- 새 locale 추가

## 실행 기준

현재 CLI는 dry-run 판단 보고 도구다. 이 smoke는 실제 파일을 복사하지 않고, scratch path를 대상 저장소처럼 지정해 manifest와 locale source 판단 결과를 확인한다.

framework 저장소 밖 scratch path를 `--repo`로 지정할 때는 manifest 경로를 절대 경로로 넘긴다.

```bash
node bin/hyper-waterfall.js init --repo /private/tmp/hw-smoke-en --manifest "$(pwd)/templates/manifest.json" --locale en --dry-run
```

상대 경로 `--manifest templates/manifest.json`은 대상 repo 기준으로 해석될 수 있으므로 scratch repo smoke에는 사용하지 않는다.

## Manifest Baseline

| 항목 | 결과 |
|---|---|
| framework version | `0.2.0` |
| default locale | `en` |
| supported locales | `en`, `ko`, `zh-CN` |
| fallback locale | `en` |
| locale availability | `complete` |
| localized manifest entries | 15 |
| `en` locale source 누락 | 없음 |
| `ko` locale source 누락 | 없음 |
| `zh-CN` locale source 누락 | 없음 |
| version state locale 계약 | `.hyper-waterfall/version.json` top-level `locale` |

## 신규 적용 Smoke Matrix

Stage 1 baseline 결과다. 각 명령은 파일을 쓰지 않고 판단 결과만 출력했다.

| locale | 명령 | supported | selected source | fallback source | version state locale plan | target status | 결과 |
|---|---|---:|---|---|---|---|---|
| `en` | `init --locale en --dry-run` | yes | `exists=15` | `exists=15` | `locale: en` | `missing=25` | OK |
| `ko` | `init --locale ko --dry-run` | yes | `exists=15` | `exists=15` | `locale: ko` | `missing=25` | OK |
| `zh-CN` | `init --locale zh-CN --dry-run` | yes | `exists=15` | `exists=15` | `locale: zh-CN` | `missing=25` | OK |

공통 확인:

- `missingLocalePolicy`는 `report-and-fallback-candidate`로 보고된다.
- 신규 scratch path에는 기존 target이 없으므로 `targetStatus: missing=25`와 `기존 파일 충돌 가능성: 없음`이 정상이다.
- `.hyper-waterfall/version.json` 생성 계획에는 `schemaVersion`, `frameworkVersion`, `releaseTag`, `locale`이 포함된다.
- 승인 요청에는 locale 검토, version state locale 기록 계획, copy/preserve/symlink 후보 검토, 기존 target 승인 게이트가 포함된다.
- Safety 섹션은 승인 전 파일 자동 수정을 수행하지 않는다고 보고한다.

## Unsupported Locale Smoke

Stage 2 결과다. unsupported locale 요청은 즉시 실패나 파일 적용으로 이어지지 않고, 선택 locale과 fallback 후보를 판단 보고에 남긴다.

| locale | 명령 | expected | 결과 |
|---|---|---|---|
| `fr` | `init --locale fr --dry-run` | unsupported locale을 실패로 종료하지 않고, `supported: no`, selected source missing, fallback source 후보를 보고한다. | OK. `requested: fr`, `selected: fr`, `supported: no`, `selectedSourceStatus: missing=15`, `fallbackSourceStatus: exists=15`로 보고했다. version state 생성 계획은 요청 locale인 `locale: fr`를 기록 후보로 표시했고, Safety 섹션은 승인 전 자동 수정을 수행하지 않는다고 보고했다. |

## 기존 Update Locale Smoke

Stage 2 결과다. 임시 저장소 `/private/tmp/hw-smoke-ko-only`에 `.hyper-waterfall/version.json`을 만들고, `locale` 필드가 없는 상태와 `locale: ko`가 있는 상태를 각각 확인했다.

| 시나리오 | 명령 | expected | 결과 |
|---|---|---|---|
| locale 없는 기존 version state | `update --dry-run` | 현재 locale을 `unknown`으로 보고하고, 실제 적용 전 보존 또는 전환 승인을 요청한다. | OK. `locale: unknown`, `reason: locale field is not recorded; current locale is unknown`, `selectedForDiff: en`, `selectedSourceStatus: exists=15`로 보고했다. migration guide는 Stage 3 작성 전이라 `exists: no`가 정상이다. |
| `ko` 기록 보존 | `update --dry-run` | 기존 `locale: ko`를 기본값으로 보존하고 selectedForDiff를 `ko`로 둔다. | OK. `locale: ko`, `reason: read from version state locale`, `selectedForDiff: ko`, `selectedSourceStatus: exists=15`로 보고했고, `기존 locale ko 보존을 기본값으로 판단한다`고 명시했다. |
| `zh-CN` 전환 요청 | `update --locale zh-CN --dry-run` | 전환 요청을 update 부수 효과가 아니라 별도 승인 항목으로 보고한다. | OK. 현재 locale은 `ko`로 읽고, 요청 locale은 `zh-CN`, `selectedForDiff: zh-CN`로 보고했다. locale 보존/전환 판단은 `ko -> zh-CN; 별도 승인 필요`로 분리했다. |

## 구조적 계약 Smoke

Stage 2 결과다. locale pack 전체에서 placeholder, branch/file pattern, 승인 게이트, 생성 문서 언어 안내를 검색했다.

| 항목 | 기준 | 결과 |
|---|---|---|
| placeholder | `{REPO_SLUG}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`, `{PR_TEMPLATE_PATH}` 등은 locale pack에서 실제 값으로 치환하지 않는다. | OK. `templates/locales/{en,ko,zh-CN}`의 AGENTS, manual, Skill, template에서 placeholder가 그대로 남아 있다. |
| branch/file pattern | `local/task{N}`, `publish/task{N}`, `task_{milestone}_{issue}.md` 등은 번역하지 않는다. | OK. 세 locale 모두 branch pattern과 문서 파일명 pattern을 literal contract로 유지한다. 자연어 설명은 locale별로 번역되지만 pattern 자체는 치환하지 않는다. |
| 승인 게이트 | 한국어, 영어, 중국어 간체에서 작업지시자 승인 전 파일 변경 금지 의미가 유지된다. | OK. AGENTS, task workflow, lifecycle, stage report, task-start/final-report/register Skill에서 승인 전 변경 금지와 다음 단계 승인 게이트가 각 locale에 존재한다. |
| 생성 문서 언어 | task plan, implementation plan, stage report, final report template이 선택 locale 작성 언어를 안내한다. | OK. AGENTS와 `_templates/*`, `todo` Skill, `document_structure_guide.md`가 선택된 Hyper-Waterfall locale을 문서 작성 언어로 사용하라고 안내한다. |

## Migration Guide 연결

Stage 3 결과다. `docs/migrations/v0.2.0-to-v0.3.0.md`에 기존 한국어-only 적용 저장소의 locale 판단과 semantic review 기준을 연결했다.

| 항목 | 기준 | 결과 |
|---|---|---|
| 기존 한국어-only 저장소 | `locale` 기록이 없으면 `unknown`으로 보고하고, 한국어 문맥 보존 시 `ko` 선택을 승인받는다. | OK. migration guide가 `locale` 미기록을 자동 추론하지 않고 `unknown`으로 보고하도록 명시하고, 한국어-only 문맥 보존은 maintainer의 `ko` 선택 승인으로 처리한다. |
| 명시 전환 | `en` 또는 `zh-CN` 전환은 별도 승인 항목으로 다룬다. | OK. migration guide가 `--locale en` 또는 `--locale zh-CN` 같은 명시 요청을 기존 locale 보존의 부수 효과가 아닌 별도 승인 항목으로 분리한다. |
| semantic review | manual/Skill locale mirror는 절차 의미 보존을 확인한다. | OK. migration guide와 migration 작성 규칙이 `requiresSemanticReview: true` 대상인 `mydocs/manual/`, `mydocs/skills/`에서 승인 게이트, Issue 추적, Stage 보고, PR 게시 절차 의미 보존을 확인하도록 요구한다. |

## 검증 한계

- 이 문서는 dry-run 기반 smoke 결과를 기록한다. 실제 파일 복사, symlink 생성, `.hyper-waterfall/version.json` write는 검증하지 않는다.
- scratch path의 target status는 대상 파일이 없다는 전제에서 `missing=25`로 나온다. 실제 적용 저장소에서는 기존 파일 충돌 가능성이 달라질 수 있다.
- GitHub Release/tag, npm publish, 배포 채널 검증은 이 smoke의 범위가 아니다.

## 후속 기록

- Stage 2: unsupported locale, 기존 update 보존/전환, placeholder와 승인 게이트 검증 결과를 채웠다.
- Stage 3: migration guide 연결 결과를 채웠다.
- Stage 4: M050 종료 판단과 잔여 위험을 최종 정리한다.
