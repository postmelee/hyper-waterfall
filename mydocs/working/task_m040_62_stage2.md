# Task M040 #62 Stage 2 완료 보고서

GitHub Issue: [#62](https://github.com/postmelee/hyper-waterfall/issues/62)
구현계획서: [`task_m040_62_impl.md`](../plans/task_m040_62_impl.md)
Stage: 2

## 단계 목적

`pr_process_guide.md` 한 문서에 함께 있던 내부 task PR 작성 규칙, PR 생성 명령, 외부 기여 PR 검토 절차를 역할별 문서로 분리한다. 기존 `pr_process_guide.md`는 PR 처리 entrypoint로 축소해 세부 문서로 연결한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/mydocs/manual/internal_pr_guide.md` | 내부 task PR 본문 섹션 구성, 섹션별 작성 기준, 작성 예시를 분리 |
| `templates/mydocs/manual/pr_command_guide.md` | `publish/task{번호}` push, `gh pr create`, `--template`, `--body-file`, SHA 고정 문서 링크 규칙을 분리 |
| `templates/mydocs/manual/external_pr_review_guide.md` | 외부 기여 PR 검토 절차, `mydocs/pr/` 문서 흐름, merge 전후 체크를 분리 |
| `templates/mydocs/manual/pr_process_guide.md` | 256줄 문서를 51줄 entrypoint와 링크 표 중심으로 축소 |

## 본문 변경 정도 / 본문 무손실 여부

원래 `pr_process_guide.md`에 있던 내부 PR 본문 규칙과 작성 예시는 `internal_pr_guide.md`에 보존했다. PR 생성 명령과 `--body-file` 기준은 `pr_command_guide.md`로 이동했고, Git workflow 문서에 있던 SHA 고정 blob URL 링크 규칙도 함께 모았다.

외부 기여 PR 검토 절차와 `pr_{번호}_review.md`, `pr_{번호}_review_impl.md`, `pr_{번호}_report.md` 흐름은 `external_pr_review_guide.md`에 보존했다. 기존 `pr_process_guide.md`는 기본 원칙, 내부/외부 PR 경계, 세부 문서 링크만 남겼다.

## 검증 결과

실행 명령:

```bash
rg -n "내부 task PR|섹션별 작성 기준|Stage timeline" templates/mydocs/manual/internal_pr_guide.md templates/mydocs/manual/pr_process_guide.md
rg -n "외부 기여 PR|pr_\{번호\}_review|archives" templates/mydocs/manual/external_pr_review_guide.md templates/mydocs/manual/pr_process_guide.md templates/mydocs/skills/external-pr-review/SKILL.md
rg -n "PR 생성 명령|--body-file|publish/task|blob/\{sha\}" templates/mydocs/manual/pr_command_guide.md templates/mydocs/manual/git_workflow_guide.md
git diff --check
```

결과:

- OK: `internal_pr_guide.md`에서 내부 task PR, `섹션별 작성 기준`, `Stage timeline`이 확인됐다.
- OK: `pr_process_guide.md`가 내부 task PR 본문 작성, PR 생성 명령, 외부 PR 검토 세부 문서로 연결된다.
- OK: `external_pr_review_guide.md`, `pr_process_guide.md`, `external-pr-review` Skill에서 외부 PR 검토 문서 흐름과 `archives` 규칙이 확인됐다.
- OK: `pr_command_guide.md`에서 PR 생성 명령, `--body-file`, `publish/task`, `blob/{sha}` 링크 규칙이 확인됐다.
- OK: `git diff --check` 경고 없음.

## 잔여 위험

- `git_workflow_guide.md`에도 SHA 고정 PR 문서 링크 규칙이 아직 남아 있다. Stage 3에서 Git/release/update 규칙 분산을 진행할 때 `pr_command_guide.md`로 단일화할지 확인한다.
- README의 기존 `pr_process_guide.md#내부-task-pr-작성-규칙` 링크는 Stage 4에서 새 `internal_pr_guide.md` 링크로 정리해야 한다.

## 다음 단계 영향

- Stage 3에서 `git_workflow_guide.md`를 축소할 때 PR 생성 명령과 문서 링크 규칙은 `pr_command_guide.md`를 참조하도록 조정할 수 있다.
- Stage 4에서 README와 manifest 정합성을 확인할 때 새 manual 문서 3개가 적용 경로에 포함되는지 확인한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 task/Git/lifecycle 규칙 분산으로 진행한다.
