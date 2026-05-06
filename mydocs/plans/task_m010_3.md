# task_m010_3.md — 중앙 문서 템플릿과 폴더별 문서 구조 가이드 보강

GitHub Issue: [#3](https://github.com/postmelee/hyper-waterfall/issues/3)
마일스톤: M010

## 목적

하이퍼-워터폴 산출물의 출력 형식을 중앙 템플릿으로 고정하고, `mydocs/` 각 폴더가 어떤 작업 기억을 담당하는지 명확히 설명한다. 이를 통해 README의 GPT-5.5 및 Claude Opus 4.7 프롬프팅 가이드 준수 주장을 실제 저장소 구조와 Skill 동작으로 뒷받침한다.

## 배경

현재 저장소는 PR 본문 템플릿과 오늘할일 표준 형식은 비교적 구체적이지만, 수행계획서, 구현계획서, 단계 보고서, 최종 보고서, 피드백, 기술 조사, 트러블슈팅, 외부 PR 검토 문서는 주로 Skill 안의 표준 섹션 목록에 의존한다. 별도의 중앙 문서 템플릿이 없어서 "정해진 위치와 템플릿"이라는 README 표현은 구현보다 조금 앞서 있다.

또한 원본 rhwp 저장소의 `hyper_waterfall_docs_guide.md`는 폴더별 목적과 사용 시점을 서술적으로 설명한다. 반면 현재 `templates/mydocs/manual/document_structure_guide.md`는 표 중심이라, 새 세션의 AI가 각 폴더를 어떤 질문에 답하는 기억 저장소로 써야 하는지 복원하기 어렵다.

GPT-5.5 프롬프팅 가이드는 예상 출력 형태와 Output Format 명시를 권장하고, Claude Opus 4.7 가이드는 desired output format, constraints, literal instruction following에 맞춘 명확한 지시를 요구한다. 중앙 템플릿과 폴더별 목적 보강은 이 요구를 프롬프트 문장이 아니라 저장소 구조로 구현하는 작업이다.

## 범위

### 포함

- `templates/mydocs/_templates/` 중앙 템플릿 폴더 추가
- 주요 산출물별 Markdown 템플릿 작성
  - 오늘할일
  - 수행계획서
  - 구현계획서
  - 단계 보고서
  - 최종 보고서
  - 피드백
  - 기술 조사
  - 트러블슈팅
  - 외부 PR 검토 문서
  - 외부 PR 검토 구현계획서
  - 외부 PR 검토 최종 보고서
- 필요 시 본 저장소 dogfooding용 `mydocs/_templates` 연결 방식 정리
- `templates/mydocs/manual/document_structure_guide.md` 보강
  - 폴더별 목적
  - 해당 폴더가 답하는 질문
  - 작성 시점
  - 허용 파일명
  - 사용 템플릿
  - 반드시 포함할 내용
  - 두면 안 되는 내용
  - 다음 세션 AI가 복원해야 할 맥락
- 관련 Skill이 중앙 템플릿을 참조하도록 보강
- `README.md`의 프롬프트 가이드 준수 설명을 템플릿 기반 출력 계약과 연결
- SKILL 또는 매뉴얼 변경에 따라 필요한 경우 `templates/mydocs/manual/task_workflow_guide.md`의 SKILL 호출 안내 및 README 표 동기화

### 제외

- 기존 완료 task 문서의 소급 재작성
- rhwp 원본 문서의 단순 복사
- GitHub label 또는 milestone 신규 생성
- 하이퍼-워터폴 승인 게이트 완화
- AGENTS.md/CLAUDE.md의 모델별 어댑터 보강
- PR review severity 체계 추가
- stale memory/archive/deprecated 정책의 전면 설계

## 설계 방향

- 중앙 템플릿 폴더는 `templates/mydocs/_templates/`로 둔다.
- 산출물 폴더 내부에는 템플릿 파일을 두지 않는다. 예를 들어 `orders/`는 날짜 파일만 허용하고, `plans/`는 실제 계획서만 보관한다.
- 템플릿은 적용 대상 저장소에 그대로 복사되는 진실 원천으로 관리한다. 본 저장소 자기 적용본에서도 필요하면 `mydocs/_templates`를 `../templates/mydocs/_templates`로 연결해 dogfooding 구조를 맞춘다.
- 각 Skill은 "표준 섹션을 기억해서 작성"하는 방식보다 "`mydocs/_templates/{name}.md`를 기준으로 작성"하는 방식으로 바꾼다.
- 템플릿은 placeholder를 사용하되, 본 저장소의 `templates/` placeholder 보존 규칙과 충돌하지 않게 이름을 명확히 한다.
- 원본 rhwp 문서의 폴더별 목적 설명은 참고하되, 본 저장소의 프레임워크 성격에 맞게 재작성한다.
- `document_structure_guide.md`는 표를 유지하되, 표 뒤에 폴더별 상세 규칙을 추가해 빠른 조회와 깊은 설명을 모두 제공한다.

## 예상 변경 파일

신규:

- `templates/mydocs/_templates/orders.md`
- `templates/mydocs/_templates/task_plan.md`
- `templates/mydocs/_templates/task_impl_plan.md`
- `templates/mydocs/_templates/stage_report.md`
- `templates/mydocs/_templates/final_report.md`
- `templates/mydocs/_templates/feedback.md`
- `templates/mydocs/_templates/tech_note.md`
- `templates/mydocs/_templates/troubleshooting.md`
- `templates/mydocs/_templates/external_pr_review.md`
- `templates/mydocs/_templates/external_pr_review_impl.md`
- `templates/mydocs/_templates/external_pr_report.md`
- 필요 시 `mydocs/_templates` 심볼릭 링크

수정:

- `templates/mydocs/manual/document_structure_guide.md`
- `templates/mydocs/skills/task-start/SKILL.md`
- `templates/mydocs/skills/task-stage-report/SKILL.md`
- `templates/mydocs/skills/task-final-report/SKILL.md`
- `templates/mydocs/skills/todo/SKILL.md`
- `templates/mydocs/skills/external-pr-review/SKILL.md`
- `README.md`
- 필요 시 `templates/mydocs/manual/task_workflow_guide.md`

이번 task 산출물:

- `mydocs/orders/20260506.md`
- `mydocs/plans/task_m010_3.md`
- `mydocs/plans/task_m010_3_impl.md`
- `mydocs/working/task_m010_3_stage{1..5}.md`
- `mydocs/report/task_m010_3_report.md`

## 잠정 단계

5단계로 분할한다. 단계별 산출물 마무리와 보고서는 `task-stage-report`, 최종 보고와 PR 게시 준비는 `task-final-report` 절차에서 처리한다.

- **Stage 1 — 중앙 템플릿 폴더와 내부 task 템플릿**
  - `templates/mydocs/_templates/` 추가
  - 오늘할일, 수행계획서, 구현계획서, 단계 보고서, 최종 보고서 템플릿 작성
  - 필요 시 `mydocs/_templates` dogfooding 연결 추가
- **Stage 2 — 지원 문서와 외부 PR 템플릿**
  - 피드백, 기술 조사, 트러블슈팅 템플릿 작성
  - 외부 PR 검토, 외부 PR 검토 구현계획서, 외부 PR 최종 보고서 템플릿 작성
- **Stage 3 — 문서 구조 가이드 보강**
  - `document_structure_guide.md`에 폴더별 목적/질문/작성 시점/허용 파일명/사용 템플릿/금지 사항 추가
  - `_templates/` 폴더의 역할과 산출물 폴더 내부 템플릿 금지 원칙 명시
- **Stage 4 — Skill 템플릿 참조 전환**
  - `task-start`, `task-stage-report`, `task-final-report`, `todo`, `external-pr-review`가 중앙 템플릿을 기준으로 문서를 만들도록 보강
  - Skill과 매뉴얼 변경 시 README 및 `task_workflow_guide.md` 동기화 규칙 준수
- **Stage 5 — README와 프롬프트 가이드 준수 근거 정리**
  - README의 "프롬프트 가이드 준수" 섹션을 중앙 템플릿 기반 출력 계약과 연결
  - "문서 구조"와 "핵심 SKILL" 설명에서 `_templates/`와 템플릿 참조 흐름을 반영
  - 전체 문서 링크, placeholder, 형식 검증 수행

## 검증 계획

### 단계별 검증

- Stage 1
  - `find templates/mydocs/_templates -maxdepth 1 -type f | sort`로 내부 task 템플릿 존재 확인
  - 각 템플릿에 제목, 목적, 필수 섹션이 있는지 grep
  - `git diff --check`
- Stage 2
  - 지원 문서/외부 PR 템플릿 존재 확인
  - 외부 PR 템플릿 3종이 `external-pr-review` Skill의 산출물명과 일치하는지 grep
  - `git diff --check`
- Stage 3
  - `document_structure_guide.md`에 `_templates/`, `orders/`, `plans/`, `working/`, `report/`, `feedback/`, `tech/`, `troubleshootings/`, `pr/` 상세 규칙 존재 확인
  - 산출물 폴더 내부 템플릿 금지 원칙 grep
  - `git diff --check`
- Stage 4
  - 관련 Skill에서 `mydocs/_templates/` 참조가 존재하는지 grep
  - 기존 표준 섹션 목록과 새 템플릿이 충돌하지 않는지 확인
  - `git diff --check`
- Stage 5
  - README에 `_templates/`와 출력 형식 통제 근거가 반영됐는지 grep
  - `templates/` 안의 치환 대상 placeholder가 의도치 않게 치환되지 않았는지 확인
  - 전체 `git diff --check`

### 통합 검증

- `templates/mydocs/_templates/`에 모든 계획된 템플릿이 존재한다.
- `document_structure_guide.md`가 폴더별 목적과 사용 템플릿을 설명한다.
- 관련 Skill이 중앙 템플릿을 참조한다.
- README의 GPT-5.5 및 Claude Opus 4.7 프롬프팅 가이드 준수 설명이 실제 중앙 템플릿 구조와 연결된다.
- `git status --short`가 PR 준비 전 빈 출력이다.

## 리스크

- **템플릿 과잉 설계**: 모든 문서를 지나치게 엄격하게 만들면 낮은 위험의 문서 보강도 무거워질 수 있다. 필수 섹션과 선택 섹션을 구분해 대응한다.
- **placeholder 혼동**: 적용 대상 저장소용 placeholder와 실제 문서 작성용 placeholder가 섞일 수 있다. 템플릿 안 placeholder 설명을 명시하고, 본 저장소 placeholder 보존 규칙을 유지한다.
- **Skill 중복 규칙**: Skill 안 표준 섹션 목록과 중앙 템플릿이 서로 달라지면 혼란이 생긴다. Skill은 섹션 목록을 반복하기보다 템플릿 참조와 예외 규칙 중심으로 줄인다.
- **원본 문서 과잉 의존**: rhwp 원본의 제품 특화 문맥을 그대로 가져오면 프레임워크 저장소의 범용성이 떨어진다. 원본은 구조와 관점만 참고하고 본문은 새로 작성한다.
- **self dogfooding 경로**: `templates/mydocs/_templates/`와 본 저장소 `mydocs/_templates`의 관계가 불명확하면 사용자가 적용 후 구조를 오해할 수 있다. Stage 1에서 연결 방식 확정 후 README에 반영한다.

## 승인 요청 사항

- 중앙 템플릿 폴더를 `templates/mydocs/_templates/`로 두고, 산출물 폴더 내부에는 템플릿 파일을 두지 않는 방식에 동의?
- 본 저장소 dogfooding 구조로 `mydocs/_templates` 심볼릭 링크를 추가하는 방향에 동의?
- 5단계 분할과 각 단계 산출물 범위에 동의?
- 제외 범위에 AGENTS.md/CLAUDE.md 어댑터, review severity, stale memory 정책을 별도 후속 작업으로 남기는 데 동의?

승인되면 `task_m010_3_impl.md`에서 단계별 산출물, 검증 명령, 커밋 메시지를 구체화한다.
