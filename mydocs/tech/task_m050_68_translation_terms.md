# #68 locale pack 번역 범위와 용어 대응표

## 목적

이 문서는 #68 Stage 1에서 영어 기본 locale pack과 한국어 보존 locale pack의 작성 범위를 확정하고, 후속 Stage에서 번역 의미가 흔들리지 않도록 용어 대응표와 구조적 계약 보존 기준을 남긴다.

#68의 pack 본문 작성 대상은 #67에서 확정한 `templates/manifest.json`의 `localization.enabled: true` entry를 기준으로 한다. `en`은 신규 적용 기본 pack이고, `ko`는 기존 한국어 원문 보존 pack이다.

## 입력 기준

| 기준 | 확인 내용 |
|---|---|
| #65 `docs/localization.md` | 기본 locale은 `en`, 한국어 보존 locale은 `ko`, 중국어 간체는 `zh-CN` |
| #67 `templates/manifest.json` | `templates/locales/{locale}/...` source pattern과 locale 대상 entry 확정 |
| #67 `mydocs/tech/task_m050_67_locale_manifest_design.md` | locale 대상 분류, 한국어 고정 문구 inventory, fallback 정책 |
| #68 이슈 본문 | 영어 locale pack 작성, 한국어 원문 보존, placeholder와 링크 보존 |

## Stage 1 결정 요약

| 항목 | 결정 |
|---|---|
| `en` pack | 신규 적용 기본 pack으로 작성한다. |
| `ko` pack | 기존 `templates/` 한국어 원문을 보존하되, 한국어 고정 언어 정책 문구는 선택 locale 정책으로 정렬한다. |
| manual 포함 | 포함한다. manifest가 `templates/mydocs/manual` directory 전체를 locale source로 가리키므로 부분 번역은 mixed locale 위험이 있다. |
| Skill 포함 | 포함한다. manifest가 `templates/mydocs/skills` directory 전체를 locale source로 가리키고, 적용 저장소 에이전트가 직접 읽는 절차 계약이므로 선택 locale과 정렬한다. |
| manual/Skill 검증 | `requiresSemanticReview: true` 기준으로 절차 의미 보존 검토를 수행한다. |
| root `templates/` 수정 | Stage 2-3에서는 수정하지 않는다. 실제 pack 상태와 문서/manifest 설명이 어긋날 때만 Stage 4에서 최소 수정한다. |
| `zh-CN` | #69 범위로 남긴다. #68에서는 source 누락을 실패로 보지 않고 후속 범위로 보고한다. |

## manifest locale 대상

`templates/manifest.json` 기준 locale 대상은 15개 entry다.

| source | target | role | sourcePattern | #68 처리 |
|---|---|---|---|---|
| `templates/AGENTS.md` | `AGENTS.md` | `agent-runtime-rules` | `templates/locales/{locale}/AGENTS.md` | `en`, `ko` 작성 |
| `templates/CLAUDE.md` | `CLAUDE.md` | `claude-entrypoint` | `templates/locales/{locale}/CLAUDE.md` | `en`, `ko` 작성 |
| `templates/.github/ISSUE_TEMPLATE/task.yml` | `.github/ISSUE_TEMPLATE/task.yml` | `github-issue-form` | `templates/locales/{locale}/.github/ISSUE_TEMPLATE/task.yml` | `en`, `ko` 작성 |
| `templates/.github/pull_request_template.md` | `.github/pull_request_template.md` | `github-pr-template` | `templates/locales/{locale}/.github/pull_request_template.md` | `en`, `ko` 작성 |
| `templates/mydocs/_templates` | `mydocs/_templates` | `document-output-templates` | `templates/locales/{locale}/mydocs/_templates` | directory 전체 작성 |
| `templates/mydocs/manual` | `mydocs/manual` | `manuals` | `templates/locales/{locale}/mydocs/manual` | directory 전체 작성, semantic review |
| `templates/mydocs/skills` | `mydocs/skills` | `agent-skills` | `templates/locales/{locale}/mydocs/skills` | directory 전체 작성, semantic review |
| `templates/mydocs/orders/README.md` | `mydocs/orders/README.md` | `artifact-folder-guide` | `templates/locales/{locale}/mydocs/orders/README.md` | `en`, `ko` 작성 |
| `templates/mydocs/plans/README.md` | `mydocs/plans/README.md` | `artifact-folder-guide` | `templates/locales/{locale}/mydocs/plans/README.md` | `en`, `ko` 작성 |
| `templates/mydocs/working/README.md` | `mydocs/working/README.md` | `artifact-folder-guide` | `templates/locales/{locale}/mydocs/working/README.md` | `en`, `ko` 작성 |
| `templates/mydocs/report/README.md` | `mydocs/report/README.md` | `artifact-folder-guide` | `templates/locales/{locale}/mydocs/report/README.md` | `en`, `ko` 작성 |
| `templates/mydocs/feedback/README.md` | `mydocs/feedback/README.md` | `artifact-folder-guide` | `templates/locales/{locale}/mydocs/feedback/README.md` | `en`, `ko` 작성 |
| `templates/mydocs/tech/README.md` | `mydocs/tech/README.md` | `artifact-folder-guide` | `templates/locales/{locale}/mydocs/tech/README.md` | `en`, `ko` 작성 |
| `templates/mydocs/troubleshootings/README.md` | `mydocs/troubleshootings/README.md` | `artifact-folder-guide` | `templates/locales/{locale}/mydocs/troubleshootings/README.md` | `en`, `ko` 작성 |
| `templates/mydocs/pr/README.md` | `mydocs/pr/README.md` | `artifact-folder-guide` | `templates/locales/{locale}/mydocs/pr/README.md` | `en`, `ko` 작성 |

## locale 비대상

다음 10개 manifest entry는 `localization.enabled: false`이므로 #68에서 locale pack을 만들지 않는다.

| 대상 | 이유 |
|---|---|
| `templates/mydocs/**/.gitkeep` 8개 | 빈 폴더 placeholder로 자연어가 없다. |
| `templates/.agents/skills` | `mydocs/skills`를 가리키는 symlink 계약이다. |
| `templates/.claude/skills` | `mydocs/skills`를 가리키는 symlink 계약이다. |

## 현재 source inventory

Git 추적 기준 현재 template source는 다음 자연어 파일 묶음으로 나뉜다.

| 묶음 | 파일 수 | #68 처리 |
|---|---:|---|
| root 운영/진입 문서: `AGENTS.md`, `CLAUDE.md` | 2 | `en`, `ko` 작성 |
| GitHub platform template | 2 | `en`, `ko` 작성 |
| `templates/mydocs/_templates/*.md` | 12 | directory 전체 작성 |
| `templates/mydocs/manual/*.md` | 11 | directory 전체 작성, semantic review |
| `templates/mydocs/skills/README.md` + `*/SKILL.md` | 8 | directory 전체 작성, semantic review |
| `templates/mydocs/*/README.md` folder guide | 8 | `en`, `ko` 작성 |

`templates/.DS_Store` 같은 비추적 로컬 파일은 Git source와 manifest entry가 아니므로 locale pack 대상이 아니다.

## manual/Skill 포함 판단

#68 이슈는 "내부 manual/skill 전체 번역이 필요하다고 확정되지 않은 파일의 무리한 번역"을 제외했다. Stage 1 판단 결과, 현재 manifest 구조에서는 manual과 Skill을 다음 이유로 포함한다.

- manifest entry가 파일별이 아니라 `templates/mydocs/manual`, `templates/mydocs/skills` directory 전체를 locale source로 가리킨다.
- directory가 일부 파일만 가진 상태로 존재하면 CLI와 사람이 "locale source가 있다"고 오해할 수 있고, 실제 적용 결과는 선택 locale과 한국어 root source가 섞일 수 있다.
- manual과 Skill은 적용 저장소 에이전트가 직접 읽는 운영 절차이므로 선택 locale과 일치해야 한다.
- `requiresSemanticReview: true`는 제외 근거가 아니라 의미 보존 검증 요구다.

따라서 Stage 2와 Stage 3은 manual 11개 파일과 Skill directory 8개 파일을 포함한다. 다만 구조, 절차, 명령, branch, filename, placeholder는 바꾸지 않고 자연어 설명만 locale에 맞춘다.

### manual 대상 파일

- `templates/mydocs/manual/README.md`
- `templates/mydocs/manual/agent_code_hyperfall_rule_conflict.md`
- `templates/mydocs/manual/document_structure_guide.md`
- `templates/mydocs/manual/external_pr_review_guide.md`
- `templates/mydocs/manual/framework_lifecycle_guide.md`
- `templates/mydocs/manual/git_workflow_guide.md`
- `templates/mydocs/manual/internal_pr_guide.md`
- `templates/mydocs/manual/pr_command_guide.md`
- `templates/mydocs/manual/pr_process_guide.md`
- `templates/mydocs/manual/release_update_protocol.md`
- `templates/mydocs/manual/task_workflow_guide.md`

### Skill 대상 파일

- `templates/mydocs/skills/README.md`
- `templates/mydocs/skills/external-pr-review/SKILL.md`
- `templates/mydocs/skills/pr-merge-cleanup/SKILL.md`
- `templates/mydocs/skills/task-final-report/SKILL.md`
- `templates/mydocs/skills/task-register/SKILL.md`
- `templates/mydocs/skills/task-stage-report/SKILL.md`
- `templates/mydocs/skills/task-start/SKILL.md`
- `templates/mydocs/skills/todo/SKILL.md`

## 한국어 고정 문구 inventory

다음 문구는 `ko` pack에서도 "한국어 고정"이 아니라 "선택 locale" 정책으로 정렬해야 한다.

| 파일 | 현재 문구 | `en` 기준 의미 | `ko` 기준 의미 |
|---|---|---|---|
| `templates/AGENTS.md` | `모든 문서는 한국어 작성` | Write all documents in the selected Hyper-Waterfall locale for this repository. | 모든 문서는 이 저장소에 선택된 Hyper-Waterfall locale로 작성한다. |
| `templates/mydocs/manual/document_structure_guide.md` | `모든 문서는 한국어로 작성한다.` | Write all documents in the selected Hyper-Waterfall locale for this repository. | 모든 문서는 이 저장소에 선택된 Hyper-Waterfall locale로 작성한다. |
| `templates/mydocs/skills/todo/SKILL.md` | `작성 언어: 한국어` | Writing language: use the selected Hyper-Waterfall locale for this repository. | 작성 언어: 이 저장소에 선택된 Hyper-Waterfall locale을 따른다. |
| `templates/mydocs/_templates/external_pr_report.md` | `작성 언어: 한국어` | Writing language: use the selected Hyper-Waterfall locale for this repository. | 작성 언어: 이 저장소에 선택된 Hyper-Waterfall locale을 따른다. |
| `templates/mydocs/_templates/external_pr_review.md` | `작성 언어: 한국어` | Writing language: use the selected Hyper-Waterfall locale for this repository. | 작성 언어: 이 저장소에 선택된 Hyper-Waterfall locale을 따른다. |
| `templates/mydocs/_templates/external_pr_review_impl.md` | `작성 언어: 한국어` | Writing language: use the selected Hyper-Waterfall locale for this repository. | 작성 언어: 이 저장소에 선택된 Hyper-Waterfall locale을 따른다. |
| `templates/mydocs/_templates/feedback.md` | `작성 언어: 한국어` | Writing language: use the selected Hyper-Waterfall locale for this repository. | 작성 언어: 이 저장소에 선택된 Hyper-Waterfall locale을 따른다. |
| `templates/mydocs/_templates/orders.md` | `작성 언어: 한국어` | Writing language: use the selected Hyper-Waterfall locale for this repository. | 작성 언어: 이 저장소에 선택된 Hyper-Waterfall locale을 따른다. |
| `templates/mydocs/_templates/tech_note.md` | `작성 언어: 한국어` | Writing language: use the selected Hyper-Waterfall locale for this repository. | 작성 언어: 이 저장소에 선택된 Hyper-Waterfall locale을 따른다. |
| `templates/mydocs/_templates/troubleshooting.md` | `작성 언어: 한국어` | Writing language: use the selected Hyper-Waterfall locale for this repository. | 작성 언어: 이 저장소에 선택된 Hyper-Waterfall locale을 따른다. |

## 구조적 계약 보존 기준

다음 항목은 locale pack에서도 번역하거나 실제 값으로 치환하지 않는다.

| 항목 | 보존 예시 | 기준 |
|---|---|---|
| placeholder | `{REPO_SLUG}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`, `{PR_TEMPLATE_PATH}`, `{issue}`, `{stage}`, `{sha}`, `{head_sha}` | 적용 시점 또는 보고 시점에 치환되는 값 |
| branch pattern | `local/task{N}`, `publish/task{N}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}` | Git workflow 계약 |
| filename pattern | `task_{milestone}_{issue}.md`, `task_{milestone}_{issue}_impl.md`, `task_{milestone}_{issue}_stage{N}.md`, `task_{milestone}_{issue}_report.md` | 문서 탐색과 Skill 절차 계약 |
| command/code block | `gh issue view`, `git diff --check`, `npm test`, `node bin/hyper-waterfall.js doctor` | 실행 가능한 명령 |
| GitHub 식별자 | Issue, PR, label, milestone, commit, branch | 플랫폼/도구 식별자 |
| manifest field | `sourcePattern`, `fallbackLocale`, `requiresSemanticReview`, `localization.enabled` | 기계 판독 계약 |
| symlink target | `mydocs/skills` | 파일시스템 계약 |

## 용어 대응표

| 한국어 | 영어 기준 표현 | 비고 |
|---|---|---|
| 하이퍼-워터폴 | Hyper-Waterfall | 고유 방법론 이름. 대소문자 유지 |
| 하네스 | harness | 적용 가능한 프레임워크 묶음 의미 |
| 작업지시자 | task requester | 에이전트에게 작업을 지시하고 승인하는 사람 |
| 에이전트 | agent | Codex, Claude Code 등 코딩 에이전트 일반 |
| 타스크 | task | GitHub Issue 단위 작업 |
| 이슈 | Issue | GitHub 플랫폼 식별자. 영어 pack에서도 `Issue` 사용 |
| PR | PR | Pull Request의 약어로 유지 |
| 승인 게이트 | approval gate | 단계 전환 전 명시 승인 요구 |
| 승인 요청 | approval request | 다음 단계로 넘어가기 위한 요청 |
| 수행계획서 | task plan | `task_plan.md`와 연결 |
| 구현계획서 | implementation plan | `task_impl_plan.md`와 연결 |
| 단계별 완료보고서 | stage report | `stage_report.md`와 연결 |
| 최종 결과보고서 | final report | `final_report.md`와 연결 |
| 오늘할일 | daily task board | `mydocs/orders/{yyyymmdd}.md` |
| 산출물 | artifact | 코드, 문서, 보고서 등 결과물 |
| 검증 | verification | 실행 명령과 수동 검토 모두 포함 |
| 잔여 위험 | residual risk | 완료 후 남는 위험 |
| 다음 단계 영향 | impact on next stage | 다음 Stage에 넘길 맥락 |
| 보존 | preserve | 기존 사용자/프로젝트 내용 유지 |
| fallback | fallback candidate | 조용한 대체가 아니라 보고 대상 후보 |
| 선택 locale | selected locale | 적용 저장소에 선택된 Hyper-Waterfall locale |
| 기본 locale | default locale | 신규 적용 기본값. 현재 `en` |
| locale pack | locale pack | `templates/locales/{locale}` 묶음 |
| 의미 보존 검증 | semantic review | manual/Skill 번역 의미 drift 검증 |
| 수동 확인 필요 | manual review required | 자동 적용 대신 승인 검토 필요 |
| 충돌 | conflict | 대상 변경과 framework 변경이 같은 파일/의미에서 충돌 |

## Stage 2 작성 기준

영어 pack은 다음 기준으로 작성한다.

- 명령형 규칙은 직접적이고 중립적인 영어로 쓴다.
- 특정 모델이나 벤더에 종속되는 표현을 피하고, `agent`, `coding agent`, `task requester`를 우선 사용한다.
- GitHub 식별자, command, filename, branch pattern, placeholder는 그대로 둔다.
- `Writing language: use the selected Hyper-Waterfall locale for this repository.` 문구를 `_templates`와 Skill의 작성 언어 기준으로 사용한다.
- `AGENTS.md`의 문서 언어 규칙은 `Write all documents in the selected Hyper-Waterfall locale for this repository.` 의미를 사용한다.
- manual/Skill은 절차 순서, 금지 사항, 승인 조건, cleanup 조건을 바꾸지 않는다.

### Stage 2 실행 메모

Stage 2에서는 `templates/locales/en` 아래에 43개 영어 source 파일을 작성한다. manifest의 `localization.enabled: true` 15개 entry는 모두 `en` source를 갖도록 맞춘다.

manual과 Skill은 Stage 1 판단대로 전체 directory를 포함한다. 번역은 절차 의미 보존을 우선해 명령, placeholder, branch pattern, filename pattern, manifest field는 그대로 두고 자연어 설명만 영어로 작성한다.

## Stage 3 작성 기준

한국어 pack은 다음 기준으로 작성한다.

- 기존 `templates/` 한국어 원문을 기준으로 보존한다.
- "한국어로 작성" 고정 정책은 "이 저장소에 선택된 Hyper-Waterfall locale" 정책으로만 바꾼다.
- 기존 운영 맥락, 승인 조건, branch/commit 규칙, Skill 호출 조건은 유지한다.
- 영어 pack과 같은 구조적 계약을 요구하는지 주요 template별로 대조한다.

### Stage 3 실행 메모

Stage 3에서는 기존 `templates/` 한국어 원문을 `templates/locales/ko` 아래에 43개 source 파일로 보존한다. `templates/locales/ko`는 root 한국어 원문의 보존 pack이므로 본문 구조, 절차 순서, 명령, placeholder, branch/file pattern을 유지한다.

단, `작성 언어: 한국어`, `모든 문서는 한국어 작성`, `모든 문서는 한국어로 작성한다.` 같은 고정 언어 정책은 M050 정책에 맞춰 "이 저장소에 선택된 Hyper-Waterfall locale"을 따르는 표현으로 정렬한다.

## 후속 Stage 체크리스트

| Stage | 확인 항목 |
|---|---|
| Stage 2 | `templates/locales/en`에 manifest locale 대상 source가 모두 존재한다. |
| Stage 2 | 영어 pack에 한국어 고정 문구가 남지 않는다. |
| Stage 2 | manual/Skill의 절차 의미가 root 원문과 달라지지 않는다. |
| Stage 3 | `templates/locales/ko`에 manifest locale 대상 source가 모두 존재한다. |
| Stage 3 | 한국어 pack이 기존 원문을 보존하되 선택 locale 정책 문구를 반영한다. |
| Stage 4 | `doctor`가 `en` fallback source 누락을 더 이상 보고하지 않는다. |
| Stage 4 | `zh-CN` 누락은 #69 후속 범위로 명시한다. |
