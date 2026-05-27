# #67 locale manifest 구조 설계 기록

## 목적

이 문서는 #67 Stage 1에서 현재 `templates/`와 `templates/manifest.json` 구조를 조사하고, 다국어 locale pack을 어떤 단위로 배치하고 manifest/update 판단에 연결할지 정리한 기술 기록이다.

이번 Stage는 조사와 구조 후보 확정이 목적이다. `templates/manifest.json`, lifecycle 문서, 실제 template 본문은 Stage 2 이후에 수정한다.

## 입력 기준

| 기준 | 확인 내용 |
|---|---|
| #65 `docs/localization.md` | 기본 locale `en`, 보존 locale `ko`, 중국어 간체 `zh-CN`, fallback은 누락을 보고해야 한다는 정책 |
| #66 README 다국어화 | 사용자 진입 문서는 `README.md`, `README.ko.md`, `README.zh-CN.md`로 정렬됨 |
| `templates/manifest.json` | 신규 적용과 기존 update의 canonical 기계 판독 기준 |
| `docs/lifecycle/adoption.md` | 신규 적용 판단 결과 형식 |
| `docs/lifecycle/update.md` | 기존 적용 저장소 update 판단 결과 형식 |

## 현재 templates inventory

`find templates -maxdepth 4 -type f | sort` 기준 파일은 53개다. Git 추적 기준으로는 `.agents/skills`, `.claude/skills` 심볼릭 링크가 추가로 존재한다.

현재 `templates/manifest.json`의 `files[]`는 25개 entry를 가진다.

| role | entry 수 | 판단 |
|---|---:|---|
| `agent-runtime-rules` | 1 | 사용자-facing 운영 규칙. locale 대상 |
| `claude-entrypoint` | 1 | Claude 진입 안내. locale 대상 |
| `github-issue-form` | 1 | Issue 작성자가 직접 읽는다. locale 대상 |
| `github-pr-template` | 1 | PR 작성자가 직접 읽는다. locale 대상 |
| `document-output-templates` | 1 | 생성 문서 섹션명과 작성 언어를 결정한다. locale 대상 |
| `manuals` | 1 | 에이전트 운영 manual. locale 대상 후보이나 의미 보존 검증 필요 |
| `agent-skills` | 1 | 절차 실행 규격. locale 대상 후보이나 의미 보존 검증 필요 |
| `artifact-folder-placeholder` | 8 | `.gitkeep`만 배치한다. locale 비대상 |
| `artifact-folder-guide` | 8 | 각 폴더 README. 사용자-facing 안내이므로 locale 대상 |
| `codex-skill-discovery` | 1 | symlink 계약. locale 비대상 |
| `claude-skill-discovery` | 1 | symlink 계약. locale 비대상 |

### manifest 공백

현재 manifest는 다음을 표현하지 못한다.

- 지원 locale 목록
- 기본 locale
- fallback locale
- locale pack root
- file/directory entry별 locale 가능 여부
- 선택 locale source가 없을 때 보고할 누락 상태
- 기존 적용 저장소 update 시 기존 locale 보존 여부
- locale별 source의 checksum/diff 판단 기준

## locale 대상 분류

| 대상 | 현재 source | target | 분류 | 이유 |
|---|---|---|---|---|
| 에이전트 운영 규칙 | `templates/AGENTS.md` | `AGENTS.md` | locale 대상 | 적용 저장소의 매 턴 규칙으로, 작업 언어 정책을 포함한다. |
| Claude 진입 문서 | `templates/CLAUDE.md` | `CLAUDE.md` | locale 대상 | `AGENTS.md`를 가리키는 안내 자체가 사용자-facing이다. |
| GitHub Issue Form | `templates/.github/ISSUE_TEMPLATE/task.yml` | `.github/ISSUE_TEMPLATE/task.yml` | locale 대상 | 이슈 작성 화면의 label/description/placeholder가 사용자-facing이다. |
| GitHub PR template | `templates/.github/pull_request_template.md` | `.github/pull_request_template.md` | locale 대상 | PR 작성자가 읽는 템플릿이다. |
| 문서 출력 템플릿 | `templates/mydocs/_templates` | `mydocs/_templates` | locale 대상 | 생성 문서의 제목, 섹션명, 작성 언어를 결정한다. |
| 운영 manual | `templates/mydocs/manual` | `mydocs/manual` | locale 대상 후보 | 적용 저장소 에이전트가 읽지만 절차 의미 보존 검증이 필수다. |
| Skill 본문 | `templates/mydocs/skills` | `mydocs/skills` | locale 대상 후보 | Skill은 절차 계약이므로 번역 가능하되 의미 drift 검증이 필수다. |
| 폴더 README | `templates/mydocs/*/README.md` | `mydocs/*/README.md` | locale 대상 | 작업자가 읽는 폴더 역할 안내다. |
| `.gitkeep` | `templates/mydocs/**/.gitkeep` | `mydocs/**/.gitkeep` | locale 비대상 | 빈 파일 placeholder다. |
| Skill discovery symlink | `source: mydocs/skills` | `.agents/skills`, `.claude/skills` | locale 비대상 | 파일시스템 구조 계약이다. |

## 한국어 고정 문구 inventory

`rg -n "작성 언어: 한국어|모든 문서는 한국어" templates` 결과:

| 파일 | 문구 | 분류 |
|---|---|---|
| `templates/AGENTS.md` | `모든 문서는 한국어 작성` | locale 정책으로 교체 필요 |
| `templates/mydocs/manual/document_structure_guide.md` | `모든 문서는 한국어로 작성한다.` | locale 정책으로 교체 필요 |
| `templates/mydocs/skills/todo/SKILL.md` | `작성 언어: 한국어` | locale 정책으로 교체 필요 |
| `templates/mydocs/_templates/external_pr_report.md` | `작성 언어: 한국어` | locale 정책으로 교체 필요 |
| `templates/mydocs/_templates/external_pr_review.md` | `작성 언어: 한국어` | locale 정책으로 교체 필요 |
| `templates/mydocs/_templates/external_pr_review_impl.md` | `작성 언어: 한국어` | locale 정책으로 교체 필요 |
| `templates/mydocs/_templates/feedback.md` | `작성 언어: 한국어` | locale 정책으로 교체 필요 |
| `templates/mydocs/_templates/orders.md` | `작성 언어: 한국어` | locale 정책으로 교체 필요 |
| `templates/mydocs/_templates/tech_note.md` | `작성 언어: 한국어` | locale 정책으로 교체 필요 |
| `templates/mydocs/_templates/troubleshooting.md` | `작성 언어: 한국어` | locale 정책으로 교체 필요 |

이 문구의 교체 의미는 #65에서 이미 정한 아래 정책과 일치해야 한다.

```text
작성 언어: 적용 시 선택한 Hyper-Waterfall locale을 따른다.
```

영어 기준 의미:

```text
Writing language: use the selected Hyper-Waterfall locale for this repository.
```

## 구조적 계약

locale pack에서도 다음 항목은 번역하지 않는다.

| 항목 | 예시 | 이유 |
|---|---|---|
| placeholder | `{REPO_SLUG}`, `{BASE_BRANCH}`, `{PR_TEMPLATE_PATH}`, `{issue}`, `{stage}` | 적용 시점에 치환되는 구조적 계약 |
| branch pattern | `local/task{N}`, `publish/task{N}` | Git workflow 계약 |
| filename pattern | `task_{milestone}_{issue}.md`, `task_{milestone}_{issue}_report.md` | 문서 탐색과 Skill 절차 계약 |
| command/code block | `gh issue view`, `git diff --check`, `npm test` | 실행 가능한 명령 |
| GitHub identifier | Issue, PR, label, milestone, commit, branch | 플랫폼/도구 식별자 |
| symlink target | `mydocs/skills` | 파일시스템 계약 |

## locale pack 구조 후보

### 후보 A — `templates/locales/{locale}/...` 미러 구조

예시:

```text
templates/locales/en/AGENTS.md
templates/locales/en/CLAUDE.md
templates/locales/en/.github/ISSUE_TEMPLATE/task.yml
templates/locales/en/.github/pull_request_template.md
templates/locales/en/mydocs/_templates/task_plan.md
templates/locales/ko/AGENTS.md
templates/locales/zh-CN/AGENTS.md
```

장점:

- locale별 파일이 한 root 아래 모여 있어 후속 #68/#69 작업 범위가 선명하다.
- target path를 그대로 mirror하므로 manifest entry가 source 선택만 바꾸면 된다.
- root `templates/`의 비대상 구조 파일, `.gitkeep`, symlink 계약과 자연스럽게 분리된다.
- locale 추가 시 `templates/locales/{new-locale}`만 추가하면 된다.

단점:

- 기존 `templates/` root와 locale pack 사이의 canonical 관계를 manifest에 명확히 써야 한다.
- `en` pack이 생기기 전에는 default locale이 선언되어도 실제 default source가 준비되지 않을 수 있다. 이 상태는 #68 전까지 `planned` 또는 누락 보고 대상으로 다뤄야 한다.

판단:

- Stage 2의 우선 후보로 채택한다.

### 후보 B — 파일명 suffix 구조

예시:

```text
templates/AGENTS.en.md
templates/AGENTS.ko.md
templates/AGENTS.zh-CN.md
```

장점:

- 같은 폴더에서 원본과 번역본을 볼 수 있다.

단점:

- `.github`, `mydocs/_templates`, `mydocs/manual`, `mydocs/skills` 전체에 suffix 파일이 섞여 탐색성이 나빠진다.
- 기존 파일명 규칙과 혼동될 수 있다.
- directory entry와 symlink entry에는 적용하기 어렵다.

판단:

- 보류한다.

### 후보 C — locale별 manifest 분리

예시:

```text
templates/manifest.en.json
templates/manifest.ko.json
templates/manifest.zh-CN.json
```

장점:

- 각 locale의 source/checksum을 독립적으로 관리할 수 있다.

단점:

- canonical manifest가 여러 개로 갈라진다.
- update protocol과 migration guide가 manifest 간 drift를 추가로 관리해야 한다.
- #65의 "canonical 원천은 분리하지 않는다" 원칙과 충돌한다.

판단:

- 제외한다.

### 후보 D — locale별 전체 templates 복제

예시:

```text
templates-en/...
templates-ko/...
templates-zh-CN/...
```

장점:

- 적용 도구 입장에서는 locale별 root만 고르면 된다.

단점:

- `.gitkeep`, symlink, 비대상 구조 파일까지 중복된다.
- 변경 동기화 비용이 높고 canonical drift 위험이 크다.
- manifest와 lifecycle 문서의 책임 경계가 흐려진다.

판단:

- 제외한다.

## Stage 2 권장 manifest 계약

Stage 2에서는 다음 수준의 최소 계약을 권장한다.

```json
{
  "localization": {
    "defaultLocale": "en",
    "supportedLocales": ["en", "ko", "zh-CN"],
    "fallbackLocale": "en",
    "localePackRoot": "templates/locales",
    "missingLocalePolicy": "report-and-fallback-candidate",
    "preserveSelectedLocaleOnUpdate": true
  }
}
```

file entry에는 실행 로직이 아니라 source 선택 계약만 둔다.

```json
{
  "source": "templates/AGENTS.md",
  "target": "AGENTS.md",
  "kind": "file",
  "role": "agent-runtime-rules",
  "updatePolicy": "merge",
  "localization": {
    "enabled": true,
    "sourcePattern": "templates/locales/{locale}/AGENTS.md",
    "fallbackLocale": "en"
  }
}
```

directory entry는 directory mirror pattern을 사용한다.

```json
{
  "source": "templates/mydocs/_templates",
  "target": "mydocs/_templates",
  "kind": "directory",
  "role": "document-output-templates",
  "updatePolicy": "overwrite",
  "localization": {
    "enabled": true,
    "sourcePattern": "templates/locales/{locale}/mydocs/_templates",
    "fallbackLocale": "en"
  }
}
```

비대상 entry는 `localization.enabled: false`를 명시하거나 필드를 생략할 수 있다. Stage 2에서는 사람이 읽는 정합성을 위해 `.gitkeep`과 symlink entry에 `enabled: false`를 명시하는 편이 더 안전하다.

## Stage 2 반영 결과

Stage 2에서는 위 권장안을 `templates/manifest.json`에 최소 계약으로 반영했다.

Top-level `localization`:

| 필드 | 값 | 판단 |
|---|---|---|
| `defaultLocale` | `en` | 신규 적용 기본 locale |
| `supportedLocales` | `en`, `ko`, `zh-CN` | M050 초기 지원 대상으로 선언한 locale |
| `fallbackLocale` | `en` | 판단 기준 fallback locale |
| `localePackRoot` | `templates/locales` | locale pack root |
| `sourcePatternToken` | `{locale}` | 각 entry의 `sourcePattern`에서 치환할 token |
| `missingLocalePolicy` | `report-and-fallback-candidate` | 누락 locale을 조용히 성공 처리하지 않고 보고 |
| `preserveSelectedLocaleOnUpdate` | `true` | 기존 적용 저장소 update 시 선택 locale 보존 |
| `availability.status` | `planned` | 실제 pack 본문은 #68/#69에서 작성 |

Entry-level `localization`:

| entry 분류 | 반영 |
|---|---|
| 사용자-facing file | `enabled: true`, `sourcePattern: templates/locales/{locale}/...`, `fallbackLocale: en` |
| 사용자-facing directory | `enabled: true`, directory mirror `sourcePattern`, `fallbackLocale: en` |
| manual/Skill directory | 위 항목에 더해 `requiresSemanticReview: true` |
| `.gitkeep` placeholder | `enabled: false` |
| Skill discovery symlink | `enabled: false` |

이 단계는 source 선택 계약만 추가했다. 실제 `templates/locales/en`, `templates/locales/ko`, `templates/locales/zh-CN` 본문과 locale별 checksum은 후속 #68/#69/#71에서 작성하고 검증한다.

## fallback 판단 기준

fallback은 자동 성공이 아니다.

| 상황 | 판단 |
|---|---|
| 선택 locale source가 있음 | 해당 source를 적용 후보로 제시 |
| 선택 locale source가 없고 `en` source가 있음 | `en`을 fallback 후보로 제시하되 누락 locale을 보고 |
| 선택 locale source와 `en` source가 모두 없음 | 적용/update 후보를 conflict 또는 수동 확인 필요로 분류 |
| directory locale source 일부만 있음 | 혼합 locale 위험을 보고하고 수동 확인 필요로 분류 |

## update diff 기준

기존 적용 저장소 update에서는 다음 정보가 필요하다.

- 현재 기록된 Hyper-Waterfall version
- 현재 선택 locale
- 목표 release의 supported locales
- 선택 locale source 존재 여부
- locale source checksum 또는 directory checksum
- 사용자 수정 여부
- locale 전환 요청 여부

Stage 2에서는 manifest가 위 판단을 가능하게 하는 필드만 제공한다. 실제 `.hyper-waterfall/version.json`의 locale 저장 위치와 update workflow 연결은 #70 범위다.

## Stage 3 lifecycle 연결 결과

Stage 3에서는 Stage 2의 manifest 계약을 adoption/update 판단 문서에 연결했다.

| 문서 | 연결한 판단 기준 |
|---|---|
| `docs/agent-entrypoint.md` | locale source 선택 계약의 원천을 `templates/manifest.json`으로 명시하고, 신규 적용은 adoption 문서, 기존 update는 update 문서로 연결 |
| `docs/lifecycle/adoption.md` | 선택 locale, 기본 locale, 선택 locale source 누락, fallback 후보, locale 비대상 source, #70 선택 저장 위치 보류를 판단 결과 형식에 추가 |
| `docs/lifecycle/update.md` | 현재 locale, 목표 release locale 지원, 기존 locale 보존, locale 전환 요청, locale별 manifest diff, #70 workflow 보류를 판단 결과 형식과 CLI 출력 계약에 추가 |

Stage 3에서도 실제 locale pack 본문, locale checksum 산출, `.hyper-waterfall/version.json`의 선택 저장 위치, workflow 실행 구현은 만들지 않는다. 이 범위는 #68, #69, #70, #71에 남긴다.

## Stage 4 통합 정합성 검증 결과

Stage 4에서는 `docs/localization.md`, `templates/manifest.json`, adoption/update lifecycle 문서가 같은 책임 경계를 공유하도록 정렬했다.

| 항목 | 확인 결과 |
|---|---|
| 초기 locale | `templates/manifest.json`, `docs/localization.md`, lifecycle 문서가 `en`, `ko`, `zh-CN`을 기준으로 정렬됨 |
| 기본/fallback locale | `defaultLocale: en`, `fallbackLocale: en`이 policy와 manifest에서 일치함 |
| locale pack 상태 | manifest `availability.status: planned`이므로 실제 pack 본문은 아직 없고, 누락 source는 성공이 아니라 보고 대상임 |
| entry 분류 | manifest 기준 `localization.enabled: true` 15개, `enabled: false` 10개로 분리됨 |
| manual/Skill | locale 대상이지만 `requiresSemanticReview: true`로 절차 의미 보존 검증을 요구함 |
| 구조적 계약 | placeholder, branch, filename pattern, command/code block, symlink target은 locale pack에서도 번역하지 않음 |
| 후속 경계 | #68/#69는 locale pack 본문, #70은 선택 저장 위치와 workflow 실행, #71은 smoke/migration guide로 유지됨 |

`files[].source`는 release checksum, locale 비대상 파일, locale source 누락 보고의 기준이다. `localization.enabled: true`인 entry에서 선택 locale source가 없을 때 root `source`를 조용히 대체 적용하지 않고, fallback 후보와 누락 상태를 먼저 보고한다.

## 후속 이슈 입력

| 이슈 | 이 문서에서 넘기는 입력 |
|---|---|
| #68 | `templates/locales/en/...`, `templates/locales/ko/...` 배치 기준과 한국어 원문 보존 기준 |
| #69 | `templates/locales/zh-CN/...` 배치 기준, 구조적 계약 보존 목록 |
| #70 | locale 선택, 기존 locale 보존, fallback 보고, version state 저장 위치 후보 |
| #71 | locale별 smoke 검증 대상, 누락 locale/fallback 검증 기준, migration guide에 기록할 전환 조건 |

## Stage 1 결론

- locale pack 구조는 `templates/locales/{locale}/...` 미러 구조를 우선 채택한다.
- `templates/manifest.json`은 하나만 유지하고, locale별 source는 manifest entry의 localization 계약으로 표현한다.
- root `templates/`는 canonical manifest와 비대상 구조 파일을 보유하며, locale pack은 사용자-facing 파일 source 선택 계층으로 둔다.
- 한국어 고정 문구는 #65 정책 문구로 대체해야 하며, 실제 본문 교체는 #68/#69와 Stage 2 이후 구조 확정에 맞춰 진행한다.
- fallback은 조용한 대체가 아니라 보고 대상이다.
