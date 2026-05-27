# PR 처리 가이드

## 목적

이 문서는 `{REPO_NAME}` 저장소의 PR 처리 절차를 찾기 위한 entrypoint다. 내부 task PR 작성, PR 생성 명령, 외부 기여자 PR 검토는 역할별 세부 문서를 따른다.

브랜치 흐름과 merge 전략은 [`git_workflow_guide.md`](git_workflow_guide.md)를 따른다.

## 범위

- 내부 task PR 본문 작성 기준 안내
- PR 생성 명령과 문서 링크 규칙 안내
- 외부 기여 PR 검토 절차 안내
- 검토 완료 후 아카이브 위치 안내

## 기본 원칙

- 내부 task PR 본문은 `{PR_TEMPLATE_PATH}`를 따른다.
- 내부 task PR 본문은 최종 결과 보고서의 짧은 압축본으로 작성한다.
- PR 본문에는 실제 실행한 검증만 적고, 명령 나열이 아니라 검증 결과 요약과 근거를 함께 남긴다.
- 현재 PR이 직접 수행하는 issue는 `대상 타스크`에 적는다.
- `관련 이슈`는 선행, 후속, Epic, upstream, 참고 PR/issue처럼 PR 이해에 필요한 맥락을 적는다.
- 외부 기여 PR은 코드 변경과 문서 변경을 함께 검토한다.
- 외부 PR 검토 결과는 `mydocs/pr/` 문서 흐름으로 관리한다.
- 검토 문서는 재현 가능해야 하며, 실행한 검증 명령/결과를 포함한다.

## 세부 문서

| 주제 | 문서 | 사용 시점 |
|---|---|---|
| 내부 task PR 본문 작성 | [`internal_pr_guide.md`](internal_pr_guide.md) | `task-final-report` 이후 `{BASE_BRANCH}` 대상 Open PR 본문을 작성할 때 |
| PR 생성 명령과 문서 링크 | [`pr_command_guide.md`](pr_command_guide.md) | `publish/task{번호}` push, `gh pr create`, PR 본문 문서 링크를 만들 때 |
| 외부 기여자 PR 검토 | [`external_pr_review_guide.md`](external_pr_review_guide.md) | 외부 contributor fork PR을 검토하고 `mydocs/pr/` 문서를 남길 때 |

## 내부 task와 외부 PR 경계

- 내부 task PR은 GitHub Issue, `local/task{번호}`, 수행계획서, 구현계획서, 단계 보고서, 최종 보고서를 기준으로 처리한다.
- 외부 기여자 PR은 내부 task 단계 문서 형식을 강제하지 않고, `mydocs/pr/`의 `pr_{번호}_review.md`, `pr_{번호}_review_impl.md`, `pr_{번호}_report.md` 흐름으로 처리한다.
- 외부 PR 검토 중 내부 후속 수정이 필요하면 별도 GitHub Issue를 만들고 내부 task로 분리한다.

## 머지 전후 확인

내부 task PR의 merge 전후 정리는 [`task-final-report`](../skills/task-final-report/SKILL.md), [`pr-merge-cleanup`](../skills/pr-merge-cleanup/SKILL.md), [`pr_command_guide.md`](pr_command_guide.md)를 따른다.

외부 기여 PR의 검토, 최종 권고, 아카이브는 [`external_pr_review_guide.md`](external_pr_review_guide.md)와 [`external-pr-review`](../skills/external-pr-review/SKILL.md)를 따른다.

## 관련 매뉴얼

- [`git_workflow_guide.md`](git_workflow_guide.md): 브랜치 흐름과 merge 전략.
- [`task_workflow_guide.md`](task_workflow_guide.md): 내부 task의 수행, 구현, 단계 보고, 최종 보고 흐름.
- [`document_structure_guide.md`](document_structure_guide.md): `mydocs/pr/`, `working/`, `report/` 폴더 경계.
