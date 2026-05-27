# #69 zh-CN 번역 기준과 source inventory

GitHub Issue: [#69](https://github.com/postmelee/hyper-waterfall/issues/69)
마일스톤: M050

## 목적

이 문서는 `templates/locales/zh-CN/**` 작성 전에 중국어 간체 번역 범위, 구조적 계약 보존 기준, 용어 대응표를 고정한다. #69의 `zh-CN` pack은 #68에서 작성한 `en` 기본 pack과 `ko` 원문 보존 pack을 함께 참조하되, 절차 의미는 `en`과 같은 기준으로 유지한다.

## source inventory

### locale pack 파일 수

| locale | 파일 수 | 비고 |
|---|---:|---|
| `en` | 43 | #68에서 작성한 기본 pack |
| `ko` | 43 | #68에서 작성한 한국어 원문 보존 pack |
| `zh-CN` | 0 | #69에서 작성 예정 |

`templates/locales/en`과 `templates/locales/ko`의 상대 경로 목록은 완전히 일치한다. 따라서 `zh-CN`도 같은 43개 파일을 생성한다.

### Stage별 작성 범위

| Stage | 범위 | 파일 수 | 비고 |
|---|---|---:|---|
| Stage 2 | `AGENTS.md`, `CLAUDE.md`, GitHub Issue/PR template, `mydocs/_templates/**`, folder README 8개 | 24 | 신규 적용과 생성 문서에 직접 노출되는 핵심 template |
| Stage 3 | `mydocs/manual/**`, `mydocs/skills/**` | 19 | `requiresSemanticReview: true` 대상 포함 |
| 합계 | `templates/locales/zh-CN/**` | 43 | #68 `en`/`ko`와 동일 범위 |

### manifest localized entry

`templates/manifest.json`의 `localization.enabled: true` entry는 15개다. `zh-CN` source 경로는 다음과 같다.

| target | `zh-CN` source |
|---|---|
| `AGENTS.md` | `templates/locales/zh-CN/AGENTS.md` |
| `CLAUDE.md` | `templates/locales/zh-CN/CLAUDE.md` |
| `.github/ISSUE_TEMPLATE/task.yml` | `templates/locales/zh-CN/.github/ISSUE_TEMPLATE/task.yml` |
| `.github/pull_request_template.md` | `templates/locales/zh-CN/.github/pull_request_template.md` |
| `mydocs/_templates` | `templates/locales/zh-CN/mydocs/_templates` |
| `mydocs/manual` | `templates/locales/zh-CN/mydocs/manual` |
| `mydocs/skills` | `templates/locales/zh-CN/mydocs/skills` |
| `mydocs/orders/README.md` | `templates/locales/zh-CN/mydocs/orders/README.md` |
| `mydocs/plans/README.md` | `templates/locales/zh-CN/mydocs/plans/README.md` |
| `mydocs/working/README.md` | `templates/locales/zh-CN/mydocs/working/README.md` |
| `mydocs/report/README.md` | `templates/locales/zh-CN/mydocs/report/README.md` |
| `mydocs/feedback/README.md` | `templates/locales/zh-CN/mydocs/feedback/README.md` |
| `mydocs/tech/README.md` | `templates/locales/zh-CN/mydocs/tech/README.md` |
| `mydocs/troubleshootings/README.md` | `templates/locales/zh-CN/mydocs/troubleshootings/README.md` |
| `mydocs/pr/README.md` | `templates/locales/zh-CN/mydocs/pr/README.md` |

현재 source 존재 상태:

| locale | localized entry 누락 수 |
|---|---:|
| `en` | 0 |
| `ko` | 0 |
| `zh-CN` | 15 |

`zh-CN` 누락 15개는 #69에서 해소해야 할 직접 수용 기준이다.

## 구조적 계약 보존 기준

다음 항목은 중국어 간체 pack에서도 번역하거나 치환하지 않는다.

| 항목 | 예시 | 보존 이유 |
|---|---|---|
| placeholder | `{REPO_SLUG}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`, `{PR_TEMPLATE_PATH}`, `{issue}`, `{stage}`, `{sha}`, `{head_sha}` | 적용 시점 치환 계약 |
| branch pattern | `local/task{N}`, `publish/task{N}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}` | Git workflow 계약 |
| filename pattern | `task_{milestone}_{issue}.md`, `task_{milestone}_{issue}_impl.md`, `task_{milestone}_{issue}_stage{N}.md`, `task_{milestone}_{issue}_report.md` | 문서 탐색과 Skill 절차 계약 |
| command/code block | `gh issue view`, `git diff --check`, `npm test`, `node bin/hyper-waterfall.js doctor` | 실행 가능한 명령 |
| GitHub 식별자 | Issue, PR, label, milestone, commit, branch | GitHub UI와 도구 식별자 |
| manifest field | `sourcePattern`, `fallbackLocale`, `requiresSemanticReview`, `localization.enabled` | 기계 판독 계약 |
| symlink target | `mydocs/skills`, `.agents/skills -> ../mydocs/skills`, `.claude/skills -> ../mydocs/skills` | 파일시스템 계약 |
| Skill identifier | `task-start`, `task-final-report`, `todo`, `SKILL.md` | 도구 discovery 계약 |

## 중국어 간체 용어 대응표

| 기준 표현 | `zh-CN` 표현 | 비고 |
|---|---|---|
| Hyper-Waterfall | Hyper-Waterfall | 고유 방법론 이름. 대소문자 유지 |
| harness | harness / 框架套件 | 사용자-facing 문장에서는 `Hyper-Waterfall 框架套件` 사용 가능 |
| agent | Agent | Codex, Claude Code 등 코딩 Agent 일반 |
| coding agent | 编码 Agent | 필요할 때만 설명적으로 사용 |
| task requester | 任务请求者 | 승인과 범위 결정을 내리는 사람 |
| task | task / 任务 | GitHub Issue 단위 작업. 문서 제목에서는 `任务` 우선 |
| Issue | Issue | GitHub 식별자. 번역하지 않음 |
| PR | PR | Pull Request 약어로 유지 |
| Pull Request | Pull Request | GitHub 식별자. 필요 시 `PR` 병기 |
| approval gate | 审批关卡 | 단계 전환 전 명시 승인 요구 |
| approval request | 审批请求 | 다음 단계 진행 요청 |
| task plan | 任务计划书 | `task_plan.md`와 연결 |
| implementation plan | 实施计划书 | `task_impl_plan.md`와 연결 |
| stage report | 阶段报告 | `stage_report.md`와 연결 |
| final report | 最终报告 | `final_report.md`와 연결 |
| daily task board | 每日任务板 | `mydocs/orders/{yyyymmdd}.md` |
| artifact | 产出物 | 코드, 문서, 보고서 등 결과물 |
| verification | 验证 | 실행 명령과 수동 검토 모두 포함 |
| residual risk | 剩余风险 | 완료 후 남는 위험 |
| impact on next stage | 对下一阶段的影响 | 다음 Stage에 넘길 맥락 |
| selected locale | 选定 locale | `locale`은 manifest field와 맞춰 유지 |
| default locale | 默认 locale | 신규 적용 기본값 |
| fallback | fallback 候选 | 조용한 대체가 아니라 보고 대상 후보 |
| semantic review | 语义审查 | manual/Skill 번역 의미 drift 검증 |
| manual | manual / 手册 | 디렉터리명은 `manual` 유지, 본문에서는 `手册` 가능 |
| Skill | Skill | Agent Skill 식별자. 번역하지 않음 |
| source of truth | 真相来源 | 단일 기준 문서 또는 폴더 |
| strict manifest mode | strict manifest 模式 | manifest 외 경로 수정 금지 의미 |
| conflict | conflict / 冲突 | Git/GitHub 맥락에서는 `conflict` 병기 |
| update policy | update policy / 更新策略 | manifest field로는 `updatePolicy` 유지 |
| preserve | preserve / 保留 | manifest policy로는 `preserve` 유지 |
| overwrite | overwrite / 覆盖 | manifest policy로는 `overwrite` 유지 |
| merge | merge / 合并 | manifest policy로는 `merge` 유지 |
| symlink | symlink / 符号链接 | manifest policy로는 `symlink` 유지 |

## 작성 언어 정책 문구

`zh-CN` pack에서 작성 언어 정책은 다음 의미로 통일한다.

```text
编写语言：使用此仓库选择的 Hyper-Waterfall locale。
```

문서 전체 규칙에서는 다음 표현을 사용한다.

```text
所有文档都使用此仓库选择的 Hyper-Waterfall locale 编写。
```

이 문구는 "중국어로 작성"을 고정하는 것이 아니라, 적용 저장소가 선택한 locale을 따르는 정책이다.

## 작성 기준

- 중국어 간체 문장은 간결한 운영 문체로 쓴다.
- 승인 조건, 금지 사항, fallback 조건, cleanup 조건은 원문보다 약해지지 않게 쓴다.
- GitHub UI와 CLI에서 그대로 쓰는 식별자는 영어를 유지한다.
- 명령어, 파일 경로, placeholder, branch pattern은 코드 서식 안에서 원문 그대로 둔다.
- `Stage`, `Issue`, `PR`, `Skill`은 절차 식별자로 유지하고, 필요한 경우 중국어 설명을 덧붙인다.
- `manual`과 `Skill`은 `requiresSemanticReview: true` 대상이므로 자연스러운 번역보다 절차 의미 보존을 우선한다.

## 후속 Stage 체크리스트

| Stage | 확인 항목 |
|---|---|
| Stage 2 | 핵심 template 24개가 `templates/locales/zh-CN` 아래에 존재한다. |
| Stage 2 | Issue Form YAML이 파싱된다. |
| Stage 2 | placeholder와 branch/file pattern이 보존된다. |
| Stage 3 | manual 11개, Skill 8개가 추가되어 전체 43개 파일을 맞춘다. |
| Stage 3 | 대표 manual/Skill의 승인 게이트, 금지 사항, cleanup 조건이 약해지지 않는다. |
| Stage 4 | manifest localized entry 기준 `zh-CN` source 누락이 0개다. |
| Stage 4 | `doctor`, `init --dry-run`, `npm test`가 통과한다. |
| Stage 4 | manifest/docs/test 기대값은 #69 완료 상태와 일치한다. |

## Stage 2 적용 결과

Stage 2에서 핵심 적용 template과 산출물 template 24개를 `templates/locales/zh-CN/**` 아래에 작성했다.

| 구분 | 파일 수 | 비고 |
|---|---:|---|
| 적용 진입 문서 | 2 | `AGENTS.md`, `CLAUDE.md` |
| GitHub template | 2 | Issue Form, PR template |
| 중앙 산출물 template | 12 | `mydocs/_templates/**` |
| 산출물 폴더 README | 8 | `orders`, `plans`, `working`, `report`, `feedback`, `tech`, `troubleshootings`, `pr` |
| 합계 | 24 | Stage 2 계획과 일치 |

추가 보존 기준:

- `{...}` 안의 template placeholder 문구는 번역하지 않고 `en` pack과 같은 token 집합을 유지한다.
- `Issue`, `PR`, `Stage`, `Skill`, `Task plan`, `Implementation plan`, `Final report`처럼 GitHub/문서 workflow 식별자로 쓰이는 표현은 필요한 곳에서 원문을 유지한다.
- Issue Form YAML은 중국어 간체 label/description을 사용하되 `id`, `type`, `validations.required` 같은 GitHub form 구조는 유지한다.

## Stage 3 적용 결과

Stage 3에서 `requiresSemanticReview: true` 대상인 manual과 Skill 19개를 `templates/locales/zh-CN/**` 아래에 작성했다.

| 구분 | 파일 수 | 비고 |
|---|---:|---|
| manual | 11 | 운영 규칙, 문서 구조, Git/PR/lifecycle 절차 |
| Skill | 8 | `README.md` 1개와 Skill 본문 7개 |
| 합계 | 19 | Stage 3 계획과 일치 |

Semantic review 확인 항목:

- `document_structure_guide.md`: official documentation root와 `mydocs/` 경계, strict manifest mode, GitHub platform template 경계를 보존했다.
- `task_workflow_guide.md`: Issue 기반 task 흐름, Stage 승인 게이트, Stage source/report 묶음 commit, final report/PR 순서를 보존했다.
- `git_workflow_guide.md`: `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` 흐름, squash merge 기본 금지, merge 후 cleanup 조건을 보존했다.
- Skill 본문: `name` 값과 Skill directory identifier를 원문 그대로 유지했고, 승인 전 금지 사항과 `Never Do` 조건을 약화하지 않았다.

## Stage 4 적용 결과

Stage 4에서 `zh-CN` pack source가 manifest localized entry 15개에 모두 존재하는 상태로 정렬했다.

| 항목 | 결과 | 비고 |
|---|---|---|
| `templates/manifest.json` availability | `complete` | `en`, `ko`, `zh-CN` source가 모두 존재한다. #70 workflow 연결과 #71 smoke/migration은 note에 후속으로 남겼다. |
| manifest localized entry 누락 | `en=0`, `ko=0`, `zh-CN=0` | directory source인 `_templates`, `manual`, `skills` 포함 |
| locale pack 파일 수 | `zh-CN=43` | `en`, `ko`와 동일 |
| smoke test 기대값 | `zh-CN` source 존재 기대 | #68의 `zh-CN` 누락 기대값을 제거했다. |
