# Task M050 #65 언어 정책 inventory

GitHub Issue: [#65](https://github.com/postmelee/hyper-waterfall/issues/65)
마일스톤: M050

이 문서는 M050 다국어 적용 지원을 위해 현재 저장소에 남아 있는 언어 고정 문구, locale 관련 기존 문구, placeholder 보존 지점을 조사한 Stage 1 산출물이다. 이번 Stage에서는 원본 template, manual, Skill 본문을 수정하지 않고 후속 이슈의 처리 대상을 분류한다.

## 조사 범위

검색 대상:

- `templates`
- `docs`
- `README.md`
- `mydocs`
- `.github`

주요 검색어:

- `작성 언어: 한국어`
- `모든 문서는 한국어`
- `locale`
- `언어`
- `{REPO_SLUG}`
- `{BASE_BRANCH}`
- `{milestone}`
- `{issue}`
- `{stage}`

## 한국어 고정 정책 inventory

| 파일 | 현재 문구 | 성격 | 처리 후보 |
|---|---|---|---|
| `templates/AGENTS.md` | `모든 문서는 한국어 작성` | 적용 저장소의 최상위 에이전트 운영 규칙 | #67에서 locale pack 구조에 맞는 정책 표현 위치 확정, #68/#69에서 locale별 본문 작성, #70에서 적용/update 시 선택 언어로 주입 |
| `templates/mydocs/manual/document_structure_guide.md` | `모든 문서는 한국어로 작성한다.` | 적용 저장소 문서 구조 매뉴얼의 전역 언어 정책 | #67에서 manual locale pack 대상 여부 확정, #68/#69에서 locale별 manual 또는 선택 언어 문구 작성 |
| `templates/mydocs/skills/todo/SKILL.md` | `작성 언어: 한국어` | 오늘할일 생성 Skill의 출력 언어 규칙 | #67에서 Skill locale pack 또는 runtime language policy 구조 확정, #70에서 적용/update workflow의 선택 언어와 연결 |
| `templates/mydocs/_templates/feedback.md` | `작성 언어: 한국어` | 생성 문서 템플릿의 언어 규칙 | #68/#69에서 locale별 생성 문서 템플릿 작성 |
| `templates/mydocs/_templates/orders.md` | `작성 언어: 한국어` | 오늘할일 템플릿의 언어 규칙 | #68/#69에서 locale별 생성 문서 템플릿 작성, #70에서 선택 locale과 연결 |
| `templates/mydocs/_templates/external_pr_review_impl.md` | `작성 언어: 한국어` | 외부 PR 검토 보조 구현계획서 템플릿의 언어 규칙 | #68/#69에서 locale별 생성 문서 템플릿 작성 |
| `templates/mydocs/_templates/tech_note.md` | `작성 언어: 한국어` | 기술 노트 템플릿의 언어 규칙 | #68/#69에서 locale별 생성 문서 템플릿 작성 |
| `templates/mydocs/_templates/external_pr_report.md` | `작성 언어: 한국어` | 외부 PR 최종 보고 템플릿의 언어 규칙 | #68/#69에서 locale별 생성 문서 템플릿 작성 |
| `templates/mydocs/_templates/troubleshooting.md` | `작성 언어: 한국어` | 트러블슈팅 템플릿의 언어 규칙 | #68/#69에서 locale별 생성 문서 템플릿 작성 |
| `templates/mydocs/_templates/external_pr_review.md` | `작성 언어: 한국어` | 외부 PR 검토 템플릿의 언어 규칙 | #68/#69에서 locale별 생성 문서 템플릿 작성 |

확인 사항:

- `templates/mydocs/_templates/task_plan.md`, `task_impl_plan.md`, `stage_report.md`, `final_report.md`는 작성 언어를 직접 고정하지 않지만, 본문이 한국어이고 생성 문서의 섹션명도 한국어다.
- `templates/mydocs/_templates/README.md`는 항목 이름으로 `작성 언어`를 설명하지만 특정 언어를 고정하지 않는다. 다국어 구조에서 template metadata 설명 문구로 남길 수 있다.
- `.github/ISSUE_TEMPLATE/task.yml`과 `.github/pull_request_template.md`는 현재 한국어 본문이지만 `작성 언어: 한국어` 같은 명시 고정 문구는 없다. GitHub 플랫폼 템플릿의 locale 처리 대상은 #67, #68, #69에서 별도 판단이 필요하다.

## 기존 locale 관련 문구

| 파일 | 현재 문구/맥락 | 판단 |
|---|---|---|
| `README.md` | 특정 언어, 빌드, 배포, 제품 규칙은 core가 아니라 대상 저장소의 템플릿과 설정에 둔다. | M050 정책과 잘 맞는 기존 방향이다. #66에서 README 다국어화 시 이 문구를 locale 정책으로 확장할 수 있다. |
| `docs/homebrew-formula-tap-poc.md` | 실제 formula test에서는 출력 언어를 다시 확인해야 한다. | Homebrew 검증 문맥의 출력 언어 언급이며 M050 locale policy의 직접 대상은 아니다. |
| `docs/agent-entrypoint.md` | `{REPO_SLUG}`, `{BASE_BRANCH}` placeholder 확인 절차 | locale 선택 workflow를 붙일 때 #70에서 함께 확인해야 한다. |
| `docs/lifecycle/adoption.md` | placeholder 체크리스트 | locale pack 적용 시 선택 언어와 placeholder 치환을 분리하는 기준이 필요하다. #67/#70 대상이다. |

## placeholder 보존 inventory

다국어화 과정에서 아래 placeholder는 번역 대상이 아니라 구조적 계약이다. locale pack을 만들 때 실제 값으로 치환하거나 자연어로 번역하지 않는다.

| placeholder | 대표 위치 | 보존 이유 | 후속 이슈 |
|---|---|---|---|
| `{REPO_SLUG}` | `templates/.github/pull_request_template.md`, `templates/mydocs/_templates/task_plan.md`, `task_impl_plan.md`, `stage_report.md`, `final_report.md`, `templates/mydocs/skills/task-register/SKILL.md`, PR command guide | 적용 저장소의 GitHub slug로 adoption/update 시 치환되는 값 | #67, #68, #69, #70, #71 |
| `{BASE_BRANCH}` | `templates/AGENTS.md`, `docs/agent-entrypoint.md`, `docs/lifecycle/adoption.md`, `templates/mydocs/skills/task-start/SKILL.md`, `git_workflow_guide.md`, `release_update_protocol.md` | 대상 저장소의 기본 통합 브랜치 계약 | #67, #70, #71 |
| `{RELEASE_BRANCH}` | `docs/lifecycle/adoption.md`, `git_workflow_guide.md`, `release_update_protocol.md` | release PR 흐름의 branch placeholder | #67, #70 |
| `{PR_TEMPLATE_PATH}` | `docs/lifecycle/adoption.md` | 대상 저장소 PR 템플릿 경로 placeholder | #67, #70 |
| `{milestone}` | `.github/pull_request_template.md`, `templates/.github/pull_request_template.md`, `templates/mydocs/_templates/*`, `document_structure_guide.md` | 작업 문서 파일명과 PR 링크 생성 계약 | #68, #69 |
| `{issue}` | `.github/pull_request_template.md`, `templates/.github/pull_request_template.md`, `templates/mydocs/_templates/*` | GitHub Issue 번호와 문서 링크 계약 | #68, #69 |
| `{stage}` | `templates/mydocs/_templates/stage_report.md` | 단계 보고서 템플릿 계약 | #68, #69 |
| `{sha}`, `{head_sha}`, `{stage1_sha}` | `.github/pull_request_template.md`, `templates/.github/pull_request_template.md`, PR command/internal PR guide | PR 본문에서 특정 커밋과 파일 링크를 고정하는 계약 | #68, #69 |

## 후속 이슈 배정

| 이슈 | 책임 범위 | Stage 1에서 넘기는 입력 |
|---|---|---|
| #66 README와 적용 진입 프롬프트 다국어화 | 사용자 진입 문서와 README 언어 링크 | `README.md`의 기존 언어 관련 문구, agent entrypoint의 placeholder 흐름 |
| #67 templates locale pack 구조와 manifest/update 기준 추가 | locale 파일 배치, manifest/update 판단, fallback 구조 | 한국어 고정 문구가 존재하는 template/manual/Skill 목록, placeholder 보존 목록 |
| #68 영어 locale pack 작성과 한국어 원문 보존 | `en` 기본 pack 작성과 기존 한국어 원문 `ko` 보존 | 생성 문서 템플릿, AGENTS, manual, Skill의 한국어 원문 위치 |
| #69 중국어 간체 locale pack 작성 | `zh-CN` pack 작성 | 번역해도 의미가 달라지면 안 되는 승인 게이트/문서 계약/placeholder 목록 |
| #70 적용·업데이트 workflow에 locale 선택 절차 연결 | 신규 적용/update 시 선택 언어 연결 | `docs/agent-entrypoint.md`, `docs/lifecycle/adoption.md`, `docs/lifecycle/update.md`의 placeholder 판단 흐름 |
| #71 다국어 적용 smoke 검증과 migration guide 작성 | locale별 적용 smoke와 migration | Stage 1 inventory의 필수 확인 목록과 placeholder 보존 기준 |

## Stage 2 정책 문서 입력

Stage 2의 `docs/localization.md`는 아래 판단을 명시해야 한다.

- 기본 언어는 `en`이다.
- 기존 한국어 원문은 `ko` locale의 기준 자료로 보존한다.
- 중국어 간체는 `zh-CN`으로 표기한다.
- 문서의 자연어 본문과 섹션명은 locale 대상이다.
- placeholder, 브랜치명, 파일명 패턴, GitHub Issue/PR 번호, 명령어, 코드 블록은 locale 대상이 아니라 보존 대상이다.
- `작성 언어: 한국어`와 `모든 문서는 한국어 작성`은 선택 locale 기반 정책으로 대체해야 한다.
- fallback은 누락된 locale을 조용히 숨기는 기능이 아니라, 영어 기준으로 판단하되 누락을 적용/업데이트 보고에 드러내는 safety net이어야 한다.
