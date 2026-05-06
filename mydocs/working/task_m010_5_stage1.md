# task_m010_5_stage1.md - Stage 1 완료 보고서

GitHub Issue: [#5](https://github.com/postmelee/hyper-waterfall/issues/5)
구현계획서: [`task_m010_5_impl.md`](../plans/task_m010_5_impl.md)
Stage: 1

## 단계 목적

하이퍼-워터폴 task를 만들 때 GitHub Issue 자체가 다음 AI 작업의 첫 프롬프트로 쓰일 수 있도록, task 전용 GitHub Issue Form을 추가했다. 루트 `.github/ISSUE_TEMPLATE/task.yml`은 본 저장소 dogfooding용이고, `templates/.github/ISSUE_TEMPLATE/task.yml`은 적용 저장소에 복사될 진실 원천이다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `.github/ISSUE_TEMPLATE/task.yml` | 본 저장소에서 사용할 Hyper-Waterfall task Issue Form 추가 |
| `templates/.github/ISSUE_TEMPLATE/task.yml` | 적용 저장소에 배포할 동일 Issue Form 추가 |

라인 수:

```text
113 .github/ISSUE_TEMPLATE/task.yml
113 templates/.github/ISSUE_TEMPLATE/task.yml
226 total
```

## 본문 변경 정도 / 본문 무손실 여부

신규 파일 2개만 추가했다. 기존 `.github/pull_request_template.md`, `templates/.github/pull_request_template.md`, Skill, 매뉴얼, README 본문은 이번 단계에서 수정하지 않았다.

Issue Form은 다음 입력을 고정한다.

- `background`: 배경
- `goals`: 목표
- `included_scope`: 범위 - 포함
- `excluded_scope`: 범위 - 제외
- `acceptance_criteria`: 수용 기준
- `validation`: 검증 기준
- `references`: 참고
- `metadata`: 마일스톤과 label 후보
- `confirmations`: 중복 확인, 제외 범위 명시, 수행계획서 승인 절차 확인

## 검증 결과

실행 명령:

```bash
test -f .github/ISSUE_TEMPLATE/task.yml
test -f templates/.github/ISSUE_TEMPLATE/task.yml
cmp .github/ISSUE_TEMPLATE/task.yml templates/.github/ISSUE_TEMPLATE/task.yml
ruby -e 'require "yaml"; YAML.load_file(".github/ISSUE_TEMPLATE/task.yml"); YAML.load_file("templates/.github/ISSUE_TEMPLATE/task.yml")'
grep -nE '^(name|description|title|body):' .github/ISSUE_TEMPLATE/task.yml templates/.github/ISSUE_TEMPLATE/task.yml
grep -nE 'id: (background|goals|included_scope|excluded_scope|acceptance_criteria|validation|references|metadata|confirmations)' .github/ISSUE_TEMPLATE/task.yml
grep -nE 'required: true' .github/ISSUE_TEMPLATE/task.yml
git diff --check
```

결과:

- 루트와 `templates/`의 `task.yml` 존재 확인.
- `cmp`로 두 Issue Form 파일이 동일함을 확인.
- Ruby YAML parser가 두 파일을 로드함을 확인. 실행 환경에서 `ffi-1.13.1` gem extension 경고가 출력됐지만 명령 종료 코드는 0이었다.
- top-level `name`, `description`, `title`, `body` 확인.
- 필수 입력 id 9종 확인.
- 필수 입력과 확인 체크박스에 `required: true` 확인.
- `git diff --check` 경고 없이 통과.

## 잔여 위험

- Stage 2 전까지 `task-register`는 아직 새 Issue Form을 직접 참조하지 않는다.
- Stage 3 전까지 README에는 Issue Form을 입력 프롬프트 구조화 장치로 설명하지 않는다.

## 다음 단계 영향

Stage 2에서는 `task-register`가 `.github/ISSUE_TEMPLATE/task.yml`을 우선 참조하도록 바꾸고, `document_structure_guide.md`에 GitHub 플랫폼 템플릿과 `mydocs/_templates/`의 역할 경계를 추가해야 한다.

## 승인 요청

Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
