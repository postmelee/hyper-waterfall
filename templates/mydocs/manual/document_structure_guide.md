# 문서 구조와 명명 규칙 매뉴얼

본 매뉴얼은 `mydocs/` 하위 폴더 역할, 문서 파일명 규칙, 중앙 문서 템플릿 정책, GitHub 플랫폼 템플릿 경계, 외부 기여자 PR 검토 폴더 정책, Agent Skills 위치 정책을 정의한다. 새 문서를 만들거나 기존 문서의 위치를 옮기기 전에 읽는다. 코드 작성 방식, Git 브랜치 운용, 타스크 단계 진행 절차는 이 문서가 아니라 관련 매뉴얼에서 다룬다. 모든 문서는 한국어로 작성한다.

`mydocs/`는 문서를 많이 쌓기 위한 폴더가 아니다. 새 세션의 AI가 "지금 무엇을 해야 하는가", "어떻게 하기로 했는가", "어디까지 했는가", "왜 그렇게 판단했는가", "어떤 함정이 있었는가"를 저장소만 읽고 복원하게 하는 작업 기억 체계다.

## 핵심 용어

- **문서 진실 원천**: 같은 정보를 여러 곳에 복제하지 않고, 최신 기준으로 삼는 단일 문서 또는 폴더.
- **문서 템플릿 진실 원천**: 산출물별 출력 형식을 정의하는 `mydocs/_templates/` 폴더. 본 프레임워크 저장소에서는 `templates/mydocs/_templates/`가 실제 진실 원천이고, dogfooding용 `mydocs/_templates`는 그 위치를 가리킨다.
- **GitHub 플랫폼 템플릿**: GitHub Issue나 Pull Request처럼 GitHub UI/CLI가 만드는 플랫폼 산출물의 입력 또는 본문 형식을 정의하는 `.github/ISSUE_TEMPLATE/`와 `.github/pull_request_template.md`.
- **실제 산출물 문서**: 특정 날짜, 이슈, PR, 조사 주제에 대해 작성된 문서. 예: `orders/20260506.md`, `plans/task_m010_3.md`.
- **내부 타스크**: GitHub Issue를 기준으로 수행계획서, 구현계획서, 단계 보고서, 최종 보고서를 남기는 저장소 내부 작업.
- **외부 기여 PR**: 외부 기여자가 제출한 Pull Request를 검토하는 작업. 내부 타스크와 다른 폴더와 절차를 사용한다.
- **마일스톤 포함 문서명**: `task_m010_49.md`처럼 마일스톤과 이슈 번호를 함께 넣은 신규 문서명.
- **Agent Skills 진실 원천**: Codex와 Claude Code가 함께 읽는 `mydocs/skills/{skill-name}/SKILL.md`.

## 문서 파일명 규칙

신규 내부 타스크 문서의 표준 형식은 GitHub Issue 번호와 마일스톤을 함께 사용한다.

- 수행 계획서: `task_{milestone}_{이슈번호}.md` (예: `task_m100_7.md`)
- 구현 계획서: `task_{milestone}_{이슈번호}_impl.md` (예: `task_m100_7_impl.md`)
- 단계별 완료 보고서: `task_{milestone}_{이슈번호}_stage{N}.md` (예: `task_m100_7_stage1.md`)
- 최종 보고서: `task_{milestone}_{이슈번호}_report.md` (예: `task_m100_7_report.md`)

지원 문서는 주제와 날짜를 함께 알 수 있게 작성한다.

- 오늘할일: `{yyyymmdd}.md` (예: `20260506.md`)
- 피드백: `{yyyymmdd}_{topic}.md` 또는 `task_{milestone}_{이슈번호}_feedback.md`
- 기술 조사: `{yyyymmdd}_{topic}.md` 또는 `task_{milestone}_{이슈번호}_{topic}.md`
- 트러블슈팅: `{yyyymmdd}_{topic}.md` 또는 `task_{milestone}_{이슈번호}_{topic}.md`
- 외부 PR 검토 문서: `pr_{번호}_review.md`, `pr_{번호}_review_impl.md`, `pr_{번호}_report.md`

강제 규칙:

- 신규 내부 타스크 문서는 반드시 `task_{milestone}_{이슈번호}` 형식을 사용한다.
- 마일스톤은 항상 `m{숫자}` 형식으로 적는다. 예: `m100`, `m200`
- 마일스톤 없이 `task_{이슈번호}` 형식으로 신규 내부 타스크 문서를 만들지 않는다.
- 기존 레거시 문서명은 유지할 수 있으나, 신규 이슈부터는 마일스톤 포함 형식을 고정한다.
- 실제 산출물 폴더 내부에는 템플릿 파일을 두지 않는다. 템플릿은 중앙 템플릿 폴더인 `mydocs/_templates/`에만 둔다.

## 폴더 역할 (엄격 준수)

| 폴더 | 용도 | 비고 |
|------|------|------|
| `_templates/` | 문서 출력 형식 템플릿 | 실제 task 산출물이 아니라 산출물별 작성 형식의 진실 원천 |
| `orders/` | 오늘 할일 | `yyyymmdd.md`만 허용. 상세 조사/분석은 `tech/` 또는 `troubleshootings/`에 기록. 완료 항목은 비고에 `완료: HH:mm` 형식으로 완료 시각 기록 |
| `plans/` | 수행/구현 계획서 | `_stage{N}`, `_report` 파일은 두지 않는다 |
| `plans/archives/` | 완료된 계획서 보관 | merge 후 정리 시 사용 |
| `working/` | 단계별 완료 보고서 (`_stage{N}.md`) | 최종 보고서는 두지 않는다 |
| `report/` | 최종 결과보고서 (`_report.md`) + 장기 보관 보고서 | 최종 보고서는 반드시 이 폴더 |
| `feedback/` | 작업지시자 피드백, 코드 리뷰 의견 | AI가 스스로 만들 수 없는 인간 판단을 보존 |
| `tech/` | 기술 조사, 구조/스펙 분석 | 재사용 가능한 조사 근거와 결정 기록 |
| `manual/` | 매뉴얼, 가이드 | 사용자/개발자 문서 |
| `troubleshootings/` | 트러블슈팅, 재발 방지 기록 | 해결 과정과 함정을 남기는 폴더 |
| `pr/` | 외부 기여자 PR 검토 기록 | 내부 타스크와 분리 |
| `pr/archives/` | 처리 완료된 PR 검토 기록 보관 | |
| `skills/` | Agent Skills SKILL.md 진실 원천 | `.agents/skills`와 `.claude/skills` 심볼릭 링크가 이 폴더를 가리킨다 |

## 중앙 템플릿 정책

문서 출력 형식은 `mydocs/_templates/`에서 관리한다. 각 Skill은 가능한 한 중앙 템플릿을 먼저 참조하고, 템플릿을 읽을 수 없는 상황에서만 Skill 본문에 남은 최소 섹션 요약을 fallback으로 사용한다.

- 프레임워크 진실 원천: `templates/mydocs/_templates/`
- 적용 저장소 위치: `mydocs/_templates/`
- 본 저장소 dogfooding 위치: `mydocs/_templates -> ../templates/mydocs/_templates`

중앙 템플릿의 역할:

- GPT-5.5 프롬프팅 가이드의 expected output shape, Output Format 요구를 파일 구조로 고정한다.
- Claude Opus 4.7의 literal instruction following에 맞게 desired output format과 constraints를 명시한다.
- 모델이 매번 문서 구조를 새로 발명하지 않게 한다.
- 문서가 다음 세션의 입력 프롬프트로 재사용될 때 섹션 의미가 흔들리지 않게 한다.

강제 규칙:

- 산출물 폴더 내부에는 템플릿 파일을 두지 않는다.
- `orders/`, `plans/`, `working/`, `report/`, `feedback/`, `tech/`, `troubleshootings/`, `pr/`에는 실제 산출물만 둔다.
- 템플릿 파일은 실제 산출물로 오해되지 않도록 첫 제목에 `템플릿`을 포함한다.
- 템플릿이 바뀌면 관련 Skill의 템플릿 참조와 README의 문서 구조 설명을 함께 확인한다.

## GitHub 플랫폼 템플릿 정책

GitHub Issue와 Pull Request는 `mydocs/` 산출물이 아니라 GitHub 플랫폼 산출물이다. 따라서 해당 형식은 `mydocs/_templates/`에 두지 않고 `.github/` 경로에서 관리한다.

- Issue Form 진실 원천: `templates/.github/ISSUE_TEMPLATE/task.yml`
- 적용 저장소 위치: `.github/ISSUE_TEMPLATE/task.yml`
- 본 저장소 dogfooding 위치: `.github/ISSUE_TEMPLATE/task.yml`
- PR 본문 템플릿 진실 원천: `templates/.github/pull_request_template.md`
- PR 본문 적용 저장소 위치: `.github/pull_request_template.md`

역할 구분:

- `.github/ISSUE_TEMPLATE/task.yml`: GitHub Issue를 다음 작업의 첫 입력 프롬프트로 만들기 위해 배경, 목표, 포함 범위, 제외 범위, 수용 기준, 검증 기준, 참고, 메타데이터를 구조화한다.
- `.github/pull_request_template.md`: 최종 보고 후 PR 리뷰 화면에 들어갈 요약, 변경 내역, 검증, 남은 리스크의 출력 형식을 정의한다.
- `mydocs/_templates/`: 수행계획서, 구현계획서, 단계 보고서, 최종 보고서, 피드백, 기술 조사, 트러블슈팅, 외부 PR 검토 문서처럼 저장소 안에 남는 문서 산출물의 출력 형식을 정의한다.

강제 규칙:

- GitHub Issue Form을 `mydocs/_templates/`에 넣지 않는다.
- `task-register`는 이슈 본문을 만들 때 `.github/ISSUE_TEMPLATE/task.yml`을 우선 참조하고, 파일을 읽을 수 없을 때만 Skill 본문의 fallback 섹션을 사용한다.
- `.github/ISSUE_TEMPLATE/task.yml`이 바뀌면 `task-register` Skill, README의 프롬프트 가이드 설명, 본 매뉴얼의 역할 구분을 함께 확인한다.

## 폴더별 상세 규칙

### `_templates/`

- 목적: 하이퍼-워터폴 산출물의 출력 형식을 중앙에서 정의한다.
- 답하는 질문: "이 문서는 어떤 섹션과 제약으로 작성해야 하는가?"
- 작성 시점: 새 산출물 종류가 추가되거나 기존 산출물 출력 형식을 바꿀 때.
- 허용 파일명: `orders.md`, `task_plan.md`, `task_impl_plan.md`, `stage_report.md`, `final_report.md`, `feedback.md`, `tech_note.md`, `troubleshooting.md`, `external_pr_review.md`, `external_pr_review_impl.md`, `external_pr_report.md` 등 산출물 종류가 드러나는 이름.
- 사용 템플릿: 해당 없음. 이 폴더 자체가 템플릿 진실 원천이다.
- 반드시 포함할 내용: 실제 파일 위치, 작성 시점, 작성 언어, 필수 섹션, 선택 섹션, 검증 또는 승인 기준.
- 두면 안 되는 내용: 특정 task의 실제 검증 로그, 완료 보고, 작업지시자 승인 기록.
- 다음 세션 AI가 복원해야 할 맥락: 산출물별 출력 형식과, 어느 폴더에 어떤 문서를 만들어야 하는지.

### `orders/`

- 목적: 오늘 무엇을 할 것인지와 현재 상태를 한 장으로 보여준다.
- 답하는 질문: "지금 어떤 이슈를 진행 중인가?", "오늘 완료된 작업은 무엇인가?"
- 작성 시점: task 시작, 상태 변경, 최종 보고, merge 후 정리 시점.
- 허용 파일명: `yyyymmdd.md`만 허용.
- 사용 템플릿: `mydocs/_templates/orders.md`.
- 반드시 포함할 내용: 날짜 제목, 마일스톤 섹션, `Issue | 타스크 | 상태 | 비고` 표, 완료 작업의 `완료: HH:mm`.
- 두면 안 되는 내용: 긴 계획서, 검증 로그, 기술 조사, 트러블슈팅, 날짜가 아닌 템플릿 파일.
- 다음 세션 AI가 복원해야 할 맥락: 오늘 이어서 해야 할 작업과 각 이슈의 현재 상태.

### `plans/`

- 목적: 내부 task의 방향과 구현 단계를 코드 수정 전에 고정한다.
- 답하는 질문: "무엇을 할 것인가?", "어떻게 나눠서 구현할 것인가?", "무엇이 범위 밖인가?"
- 작성 시점: `task-start`에서 수행계획서 작성, 수행계획 승인 후 구현계획서 작성.
- 허용 파일명: `task_{milestone}_{이슈번호}.md`, `task_{milestone}_{이슈번호}_impl.md`.
- 사용 템플릿: `mydocs/_templates/task_plan.md`, `mydocs/_templates/task_impl_plan.md`.
- 반드시 포함할 내용: 목적, 배경, 범위, 설계 방향, 예상 변경 파일, 단계, 검증 계획, 리스크, 승인 요청 사항.
- 두면 안 되는 내용: 단계별 완료 보고서, 최종 보고서, 실제 구현 후 검증 로그만 모은 문서.
- 다음 세션 AI가 복원해야 할 맥락: 작업지시자가 승인한 범위, Stage 분할, 검증 명령, 커밋 메시지 기준.

### `working/`

- 목적: 각 Stage가 어떻게 끝났는지 기록하고 다음 단계 진입 승인을 받는다.
- 답하는 질문: "어디까지 했는가?", "검증은 통과했는가?", "다음 단계에 어떤 영향을 주는가?"
- 작성 시점: 한 Stage 구현과 검증이 끝난 직후, 다음 Stage로 넘어가기 전.
- 허용 파일명: `task_{milestone}_{이슈번호}_stage{N}.md`.
- 사용 템플릿: `mydocs/_templates/stage_report.md`.
- 반드시 포함할 내용: 단계 목적, 산출물, 본문 변경 정도 또는 무손실 여부, 검증 결과, 잔여 위험, 다음 단계 영향, 승인 요청.
- 두면 안 되는 내용: 최종 결과보고서, 아직 검증 실패인 단계의 완료 선언, 다음 단계 구현 계획의 무단 변경.
- 다음 세션 AI가 복원해야 할 맥락: 마지막으로 승인된 단계, 남은 위험, 다음 단계에서 이어받을 조건.

### `report/`

- 목적: task 전체의 계획-실행-검증 사이클을 닫고 장기 보관한다.
- 답하는 질문: "결과가 무엇인가?", "수용 기준을 만족했는가?", "무엇이 남았는가?"
- 작성 시점: 모든 Stage 완료와 통합 검증 후, PR 게시 전.
- 허용 파일명: `task_{milestone}_{이슈번호}_report.md`.
- 사용 템플릿: `mydocs/_templates/final_report.md`.
- 반드시 포함할 내용: 작업 요약, 변경 파일 목록과 영향 범위, 변경 전후 비교, 검증 결과, 잔여 위험과 후속 작업, 승인 요청.
- 두면 안 되는 내용: 진행 중 단계 보고, 미검증 결과의 완료 선언, PR 리뷰 화면용 짧은 본문만 있는 문서.
- 다음 세션 AI가 복원해야 할 맥락: task의 최종 상태, merge 전 검증 근거, 후속 작업 후보.

### `feedback/`

- 목적: 작업지시자와 리뷰어가 AI 결과물을 교정한 내용을 보존한다.
- 답하는 질문: "무엇이 틀렸는가?", "사람이 어떤 도메인 판단을 추가했는가?"
- 작성 시점: 단계 승인 보류, PR 리뷰, 재작업 요청, 설계 방향 수정 요청 시점.
- 허용 파일명: `{yyyymmdd}_{topic}.md`, `task_{milestone}_{이슈번호}_feedback.md`.
- 사용 템플릿: `mydocs/_templates/feedback.md`.
- 반드시 포함할 내용: 대상 이슈/Stage/PR, 피드백 요약, 상세 피드백, 우선순위, 반영 기준, 후속 확인.
- 두면 안 되는 내용: AI가 임의로 만든 자기 평가, 기술 조사 전체, 트러블슈팅 해결 과정 전체.
- 다음 세션 AI가 복원해야 할 맥락: 사람이 명시적으로 교정한 판단과 반드시 반영해야 할 기준.

### `tech/`

- 목적: 기술 조사, 구조 분석, 스펙 검토, 대안 비교를 장기 재사용 가능한 근거로 남긴다.
- 답하는 질문: "무엇을 발견했는가?", "어떤 근거로 이 설계를 선택했는가?"
- 작성 시점: 구현 전 조사, 설계 대안 비교, 외부 문서/스펙 검토, 구조 분석 시점.
- 허용 파일명: `{yyyymmdd}_{topic}.md`, `task_{milestone}_{이슈번호}_{topic}.md`.
- 사용 템플릿: `mydocs/_templates/tech_note.md`.
- 반드시 포함할 내용: 조사 배경, 조사 질문, 조사 대상, 발견 내용, 결정, 비결정/보류, 적용 영향, 참고 링크.
- 두면 안 되는 내용: 오늘할일 상태표, 단계 완료 승인 요청, 재발 방지 중심의 장애 기록.
- 다음 세션 AI가 복원해야 할 맥락: 이미 조사한 사실, 반복 조사하지 않아도 되는 근거, 아직 결정하지 않은 쟁점.

### `troubleshootings/`

- 목적: 실패, 장애, 어려운 문제의 원인과 해결을 재발 방지 기록으로 남긴다.
- 답하는 질문: "어디서 넘어졌는가?", "왜 실패했는가?", "다시 빠지지 않으려면 무엇을 확인해야 하는가?"
- 작성 시점: 같은 오류가 반복될 가능성이 있거나 해결 과정 자체가 이후 작업의 중요한 맥락일 때.
- 허용 파일명: `{yyyymmdd}_{topic}.md`, `task_{milestone}_{이슈번호}_{topic}.md`.
- 사용 템플릿: `mydocs/_templates/troubleshooting.md`.
- 반드시 포함할 내용: 증상, 재현 조건, 원인, 해결, 재발 방지, 검증, 참고.
- 두면 안 되는 내용: 단순 실패 로그만 있는 문서, 원인 없는 추측, 검증 없는 해결 선언.
- 다음 세션 AI가 복원해야 할 맥락: 반복하면 안 되는 함정, 재현 명령, 검증된 해결 방법.

### `pr/`

- 목적: 외부 기여자 PR 검토를 내부 task 흐름과 분리해 기록한다.
- 답하는 질문: "이 외부 PR을 merge, 수정 요청, close 중 무엇으로 판단할 것인가?"
- 작성 시점: 외부 PR 메타데이터와 diff 확인 후, 추가 검증 전후, 최종 GitHub 코멘트 등록 전.
- 허용 파일명: `pr_{번호}_review.md`, `pr_{번호}_review_impl.md`, `pr_{번호}_report.md`.
- 사용 템플릿: `mydocs/_templates/external_pr_review.md`, `mydocs/_templates/external_pr_review_impl.md`, `mydocs/_templates/external_pr_report.md`.
- 반드시 포함할 내용: PR 정보, 변경 요약, 영향 범위, 코드/문서 점검 결과, 검증 계획 또는 결과, 권고, 작업지시자 승인 요청.
- 두면 안 되는 내용: 내부 task의 `_stage{N}.md`, `_report.md` 형식 강제 적용, 승인 없는 merge/close 결정.
- 다음 세션 AI가 복원해야 할 맥락: 외부 PR에 대한 현재 판단, 남은 검증, GitHub에 남길 코멘트 또는 리뷰 본문.

### `manual/`

- 목적: 하이퍼-워터폴 운영 규칙과 저장소 적용 절차를 설명하는 사용자/개발자 문서를 보관한다.
- 답하는 질문: "이 저장소는 어떤 규칙으로 운영되는가?", "절차를 바꾸려면 어느 문서를 봐야 하는가?"
- 작성 시점: 절차, 브랜치 정책, PR 정책, 문서 구조, 충돌 규칙이 바뀔 때.
- 허용 파일명: 주제가 드러나는 snake_case markdown. 예: `document_structure_guide.md`, `task_workflow_guide.md`.
- 사용 템플릿: 필요 시 `mydocs/_templates/tech_note.md`를 초안 구조로 참고할 수 있으나, 매뉴얼은 주제별 구조를 우선한다.
- 반드시 포함할 내용: 목적, 범위, 강제 규칙, 예외, 관련 매뉴얼 링크.
- 두면 안 되는 내용: 특정 task의 단계 보고, 완료 보고, 오늘할일 상태표.
- 다음 세션 AI가 복원해야 할 맥락: 현재 절차의 기준과 다른 문서와의 관계.

### `skills/`

- 목적: Codex와 Claude Code가 호출하는 하이퍼-워터폴 Skill 본문을 보관한다.
- 답하는 질문: "정형 절차를 수행할 때 어떤 순서와 검증을 따라야 하는가?"
- 작성 시점: task 시작, 단계 종료, 최종 보고, PR merge cleanup, 외부 PR 검토 같은 정형 절차가 바뀔 때.
- 허용 파일명: `mydocs/skills/{skill-name}/SKILL.md`.
- 사용 템플릿: Skill 본문은 도구별 Skill 형식을 따른다. 산출물 문서를 만들 때는 `mydocs/_templates/`의 해당 템플릿을 참조한다.
- 반드시 포함할 내용: 트리거, 사전 조건, 절차, 검증, 절대 하지 말 것, 호출 방법.
- 두면 안 되는 내용: 특정 task 결과, 특정 모델 전용 장황한 프롬프트, 다른 Skill과 충돌하는 절차.
- 다음 세션 AI가 복원해야 할 맥락: 언제 어떤 Skill을 호출하고, 어떤 산출물을 어떤 템플릿으로 만들어야 하는지.

## 외부 기여자 PR 처리 (`mydocs/pr/`)

외부 기여 PR 검토 상세 절차는 [`pr_process_guide.md`](pr_process_guide.md)와 [`external-pr-review`](../skills/external-pr-review/SKILL.md)를 따른다.

강제 규칙:

- 외부 기여자 PR은 내부 타스크와 다른 본질을 가지므로 별도 절차와 폴더를 사용한다.
- 이 목차는 외부 기여 PR 검토에만 적용한다.
- 외부 PR 검토 기록은 `mydocs/pr/`에 남긴다.
- 파일명은 `pr_{번호}_review.md`, `pr_{번호}_review_impl.md`(필요 시), `pr_{번호}_report.md`를 사용한다.
- 처리 완료 문서는 `mydocs/pr/archives/`로 이동한다.

내부 타스크의 `수행 -> 구현 -> 단계별 보고 -> 최종 보고` 절차는 외부 기여 PR 검토에 그대로 적용하지 않는다. 상세는 [`pr_process_guide.md`](pr_process_guide.md) 참조.

## Agent Skills 위치 정책

- 진실 원천: `mydocs/skills/{skill-name}/SKILL.md`
- Codex 인식 경로: `.agents/skills/` (저장소 루트 심볼릭 링크 -> `mydocs/skills`)
- Claude Code 인식 경로: `.claude/skills/` (저장소 루트 심볼릭 링크 -> `mydocs/skills`)
- 두 심볼릭 링크는 git에 mode `120000`으로 커밋된다.
- skill 본문은 도구 비종속(`gh`, `git`, 파일 생성)으로 작성하고, 도구별 호출 차이는 SKILL.md 말미 "호출 방법" 섹션에만 둔다.
- Skill이 계획서, 보고서, 리뷰 문서를 작성할 때는 먼저 `mydocs/_templates/`의 해당 템플릿을 참조한다.

## FAQ / 흔한 실수

### 마일스톤이 아직 확정되지 않았을 때

신규 하이퍼-워터폴 타스크는 GitHub Issue의 마일스톤을 먼저 확인한다. 이슈가 아직 없으면 [`task-register`](../skills/task-register/SKILL.md) Skill로 열린 milestone을 확인하고 생성 전 작업지시자 승인을 받는다. 마일스톤이 비어 있거나 모호하면 임의로 `m000` 같은 임시명을 만들지 말고 작업지시자에게 확인한다. 기존 레거시 문서는 이름을 유지할 수 있지만, 신규 문서는 마일스톤 포함 형식을 기준으로 한다.

### 외부 PR인지 내부 타스크인지 경계가 모호할 때

외부 기여자가 올린 PR을 검토하는 작업이면 `mydocs/pr/`와 [`pr_process_guide.md`](pr_process_guide.md)를 우선한다. 저장소 내부 Issue를 해결하기 위해 직접 변경하는 작업이면 `plans/`, `working/`, `report/` 흐름을 따른다. 외부 PR 검토 중 내부 후속 수정이 필요해지면 별도 GitHub Issue를 만들고 내부 타스크로 분리하는 편이 추적하기 쉽다.

### 산출물 폴더에 템플릿을 두고 싶을 때

두지 않는다. 산출물 폴더 내부에는 템플릿 파일을 두지 않는다. 예를 들어 `orders/`는 `yyyymmdd.md`만 허용하고, 오늘할일 템플릿은 `mydocs/_templates/orders.md`에 둔다. 이렇게 해야 실제 산출물과 출력 형식 정의가 섞이지 않는다.

GitHub Issue Form이나 PR 본문 템플릿도 `mydocs/_templates/`에 넣지 않는다. 이들은 문서 산출물 템플릿이 아니라 GitHub 플랫폼 템플릿이므로 `.github/ISSUE_TEMPLATE/` 또는 `.github/pull_request_template.md`에서 관리한다.

### 템플릿과 Skill 설명이 다를 때

중앙 템플릿과 Skill 중 하나만 고치지 않는다. Skill은 절차와 검증을 정의하고, 템플릿은 출력 형식을 정의한다. 둘이 어긋나면 같은 PR에서 함께 수정하고 README의 문서 구조 설명도 확인한다.

## 관련 매뉴얼

- [`task_workflow_guide.md`](task_workflow_guide.md): 내부 타스크의 수행계획서, 구현계획서, 단계 보고서, 최종 보고서 진행 순서.
- [`git_workflow_guide.md`](git_workflow_guide.md): `local/taskN`, `publish/taskN`, `{BASE_BRANCH}` 브랜치 운용과 PR 게시.
- [`pr_process_guide.md`](pr_process_guide.md): 외부 기여자 PR 검토 절차.
