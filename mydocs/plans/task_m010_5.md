# task_m010_5.md - GitHub Issue 템플릿과 task-register 출력 형식 보강 수행계획서

GitHub Issue: [#5](https://github.com/postmelee/hyper-waterfall/issues/5)
마일스톤: M010

## 목적

하이퍼-워터폴에서 GitHub Issue를 단순한 티켓이 아니라 다음 AI 작업의 첫 프롬프트로 취급하도록, task용 GitHub Issue Form을 추가한다. 이슈 생성 시점에 배경, 목표, 포함 범위, 제외 범위, 수용 기준, 검증, 참고 자료를 구조화해 다음 `task-start` 단계가 더 안정적인 입력을 받게 한다.

PR #4에서 추가한 `mydocs/_templates/`가 문서 산출물의 출력 형식을 고정했다면, 이번 작업은 `.github/ISSUE_TEMPLATE/`로 작업 입력 프롬프트의 구조를 고정하는 역할을 맡는다.

## 배경

현재 `task-register`는 이슈 본문 권장 섹션을 Skill 본문에만 간단히 적고 있다. 이 방식은 에이전트가 CLI로 이슈를 생성할 때는 참고할 수 있지만, GitHub UI에서 사람이 직접 만드는 이슈나 적용 저장소의 표준 이슈 생성 흐름에는 충분히 강제되지 않는다.

검토 기준은 세 갈래다.

- 현재 저장소 #1은 `배경 / 목표 / 범위 / 제외 / 참고` 구조로 실제 하이퍼-워터폴 task 프롬프트에 가깝다.
- rhwp 원본 이슈 템플릿은 기능 요청과 버그 리포트에 실용적이지만, 하이퍼-워터폴의 승인 게이트와 산출물 흐름을 담기에는 짧다.
- GitHub Issue Forms와 Kubernetes/Playwright식 YAML Issue Form 관행은 필수 입력과 구조화된 Markdown body를 만들 수 있어, 이슈를 다음 작업 프롬프트로 만드는 목적에 적합하다.

공식 프롬프팅 가이드와의 관계도 명확하다. GPT-5.5와 Claude Opus 4.7 모두 작업 의도, 제약, 성공 기준, 출력 형식을 명확히 주는 구조를 권장한다. 이번 작업은 Issue Form으로 입력 프롬프트를 구조화하고, 기존 `mydocs/_templates/`로 출력 형식을 구조화하는 쌍을 만든다.

## 범위

### 포함

- 하이퍼-워터폴 task용 GitHub Issue Form 추가
- 루트 `.github/ISSUE_TEMPLATE/task.yml`과 적용 저장소용 `templates/.github/ISSUE_TEMPLATE/task.yml` 정렬
- `task-register` Skill이 Issue Form을 우선 참조하도록 보강
- `document_structure_guide.md`에 `mydocs/_templates/`와 `.github/ISSUE_TEMPLATE/`의 역할 경계 추가
- README에 "Issue Form = 입력 프롬프트 구조화, `mydocs/_templates/` = 출력 형식 구조화" 설명 추가

### 제외

- 새 label 또는 milestone 생성
- GitHub bot, Action, 자동 triage workflow 추가
- `mydocs/_templates/`에 GitHub Issue용 템플릿을 넣는 구조
- 기존 PR 템플릿의 전면 개편
- 버그 리포트, 질문, 외부 기여자용 Issue Form까지 한 번에 추가

## 설계 방향

- #1의 하이퍼-워터폴형 본문 구조를 기본으로 삼는다.
- rhwp 원본 형식은 간결성만 참고하고, 그대로 복제하지 않는다.
- 대형 오픈소스 템플릿은 중복 확인, 무엇/왜, 예시/동기, 필수 입력 같은 관행만 흡수한다.
- GitHub Issue Forms YAML을 사용해 UI에서 생성되는 이슈도 일정한 Markdown body를 남기게 한다.
- `task-register`는 `.github/ISSUE_TEMPLATE/task.yml`을 우선 참조하고, 읽을 수 없는 상황에서만 Skill 본문 fallback 섹션을 사용한다.
- GitHub 플랫폼 산출물 템플릿은 `.github/` 계열에 두고, `mydocs/_templates/`는 저장소 문서 산출물 전용으로 유지한다.

## 예상 변경 파일

신규:

- `.github/ISSUE_TEMPLATE/task.yml`
- `templates/.github/ISSUE_TEMPLATE/task.yml`

수정:

- `templates/mydocs/skills/task-register/SKILL.md`
- `templates/mydocs/manual/document_structure_guide.md`
- `README.md`
- `mydocs/orders/20260506.md`

이번 task 산출물:

- `mydocs/orders/20260506.md`
- `mydocs/plans/task_m010_5.md`
- `mydocs/plans/task_m010_5_impl.md`
- `mydocs/working/task_m010_5_stage{N}.md`
- `mydocs/report/task_m010_5_report.md`

## 잠정 단계

- **Stage 1 - GitHub Issue Form 추가**
  - 루트와 `templates/`에 task용 Issue Form을 추가한다.
  - GitHub YAML Issue Form 문법, 필수 입력, 기본 label, 프롬프트 섹션 구성을 검증한다.
- **Stage 2 - task-register와 매뉴얼 보강**
  - `task-register`가 Issue Form을 우선 참조하도록 변경하고, `document_structure_guide.md`에 플랫폼 템플릿 경계를 추가한다.
  - Skill 참조 경로와 fallback 섹션이 충돌하지 않는지 검증한다.
- **Stage 3 - README 프롬프트 가이드 근거 보강**
  - README에 Issue Form을 입력 프롬프트 구조화 장치로 설명한다.
  - GPT-5.5/Opus 4.7 프롬프팅 가이드 정합성 설명과 기존 중앙 템플릿 설명이 연결되는지 검증한다.

## 검증 계획

### 단계별 검증

- Stage 1
  - `test -f .github/ISSUE_TEMPLATE/task.yml`
  - `test -f templates/.github/ISSUE_TEMPLATE/task.yml`
  - `ruby -e 'require "yaml"; YAML.load_file(".github/ISSUE_TEMPLATE/task.yml"); YAML.load_file("templates/.github/ISSUE_TEMPLATE/task.yml")'`
  - `grep -nE 'name:|description:|title:|labels:|body:' .github/ISSUE_TEMPLATE/task.yml templates/.github/ISSUE_TEMPLATE/task.yml`
- Stage 2
  - `grep -nE '\\.github/ISSUE_TEMPLATE/task\\.yml|fallback|GitHub Issue Form' templates/mydocs/skills/task-register/SKILL.md`
  - `grep -nE 'GitHub 플랫폼|ISSUE_TEMPLATE|mydocs/_templates' templates/mydocs/manual/document_structure_guide.md`
- Stage 3
  - `grep -nE 'Issue Form|입력 프롬프트|출력 형식|GPT-5.5|Opus 4.7' README.md`
  - `grep -nE 'task-register|ISSUE_TEMPLATE|mydocs/_templates' README.md templates/mydocs/manual/document_structure_guide.md`

### 통합 검증

- Issue Form이 GitHub YAML Issue Form 문법을 따른다.
- 이슈 본문이 다음 작업 프롬프트로 쓰일 수 있도록 배경, 목표, 포함 범위, 제외 범위, 수용 기준, 검증, 참고를 요구한다.
- `task-register`는 `.github/ISSUE_TEMPLATE/task.yml`을 우선 참조하고, 읽을 수 없을 때만 fallback 섹션을 사용한다.
- README가 문서 산출물 템플릿과 GitHub 플랫폼 템플릿의 차이를 설명한다.
- `git status --short`가 PR 준비 전 빈 출력이다.
- `git diff --check`가 경고 없이 통과한다.

## 리스크

- **GitHub Form 과설계**: 필수 입력이 너무 많으면 이슈 생성 장벽이 높아질 수 있다. 하이퍼-워터폴 task에 필요한 항목만 필수화하고, 추가 설명은 선택 입력으로 둔다.
- **템플릿 위치 혼동**: GitHub Issue용 템플릿을 `mydocs/_templates/`에 넣으면 문서 산출물 템플릿 경계가 흐려진다. `.github/ISSUE_TEMPLATE/`을 플랫폼 템플릿 위치로 명확히 문서화한다.
- **README 주장 과장**: 공식 가이드 준수는 보장 표현이 아니라 핵심 원칙 반영으로 적는다.
- **루트와 templates 불일치**: 루트 `.github/ISSUE_TEMPLATE/task.yml`과 `templates/.github/ISSUE_TEMPLATE/task.yml`이 diverge하지 않도록 동일 구조로 유지한다.

## 승인 요청 사항

- Issue Form은 #1의 하이퍼-워터폴형 구조를 기본으로 하고, GitHub YAML Issue Form으로 구현하는 방향에 동의?
- `mydocs/_templates/`에는 Issue 템플릿을 넣지 않고, `.github/ISSUE_TEMPLATE/`을 GitHub 플랫폼 산출물 템플릿 위치로 두는 방향에 동의?
- Stage 1~3 분할과 검증 계획에 동의?

승인되면 `task_m010_5_impl.md`에서 단계별 산출물, 검증 명령, 커밋 메시지를 구체화한다.
