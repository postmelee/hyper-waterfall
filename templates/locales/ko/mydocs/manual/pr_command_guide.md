# PR 생성 명령과 링크 가이드

## 목적

이 문서는 내부 task PR을 생성할 때 사용하는 `publish/task{번호}` push, `gh pr create` 명령, PR 본문 문서 링크 규칙을 정의한다.

내부 task PR 본문 구조는 [`internal_pr_guide.md`](internal_pr_guide.md)를 따른다.

## PR 생성 명령

기본 PR 생성은 `publish/task{번호}`를 원격에 push한 뒤 실행한다.

```bash
git checkout local/task24
git push origin local/task24:publish/task24
gh pr create \
  --base {BASE_BRANCH} \
  --head publish/task24 \
  --title "Task #24: PR 템플릿과 PR 생성 규격 표준화" \
  --template {PR_TEMPLATE_PATH}
```

`--template`은 PR 본문 작성의 출발점으로만 사용한다.

최종 보고서와 단계 보고서를 바탕으로 PR 본문을 완성한 경우에는 `--body-file`을 우선 사용한다.

```bash
gh pr create \
  --base {BASE_BRANCH} \
  --head publish/task24 \
  --title "Task #24: PR 템플릿과 PR 생성 규격 표준화" \
  --body-file /tmp/task24-pr-body.md
```

운영 기준은 다음과 같다.

- 템플릿에서 본문을 시작할 때: `--template {PR_TEMPLATE_PATH}`
- 최종 보고서 기반으로 본문을 확정했을 때: `--body-file <작성한 PR 본문 파일>` 우선
- `--fill`은 커밋 메시지만으로 본문을 만들기 때문에 이 저장소의 기본 방식으로 쓰지 않는다.
- `--body`에 긴 본문을 직접 넣는 방식은 재사용과 검토가 어렵기 때문에 피한다.

## PR 본문 문서 링크 규칙

PR 본문에서 계획서, 단계 보고서, 최종 보고서, troubleshooting 문서를 링크할 때는 merge 후에도 열리는 commit SHA 고정 GitHub blob URL을 우선 사용한다.

PR 생성 직전 `git rev-parse HEAD`로 얻은 PR head commit SHA를 기준으로 다음 형식을 사용한다.

```text
https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/...
```

이렇게 하면 `publish/task{번호}` 브랜치 삭제 후에도 링크가 유지된다.

## 작업 문서 링크 형식

변경 내역의 작업 문서 항목은 raw URL이 아니라 `[파일명](URL)` 형식으로 작성한다. 예시는 다음과 같다.

```md
- 수행 계획서: [task_m010_61.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m010_61.md)
- 구현 계획서: [task_m010_61_impl.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m010_61_impl.md)
- 최종 보고서: [task_m010_61_report.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/report/task_m010_61_report.md)
```

Stage별 요약에서는 Stage 제목을 단계 보고서로 링크하고, 옆의 짧은 commit SHA를 commit URL로 링크한다. 예시는 다음과 같다.

```md
- **[Stage 1](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/working/task_m010_61_stage1.md)** ([abc1234](https://github.com/{REPO_SLUG}/commit/{stage1_sha})): {Stage 1 한 줄 요약}
```

## 금지

- PR 본문 상대 링크 사용
- `blob/publish/task{번호}/...` 링크 사용
- URL만 그대로 노출하는 문서 링크 사용
- `--fill`을 기본 PR 본문 작성 방식으로 사용

위 방식은 merge 후 탐색성과 가독성을 떨어뜨리므로 사용하지 않는다.
