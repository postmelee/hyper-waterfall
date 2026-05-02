# PR 처리 가이드

## 목적

이 문서는 `{REPO_NAME}` 저장소의 내부 task PR 생성 규칙과 외부 기여자 PR 검토 절차를 정리한다.

브랜치 흐름과 merge 전략은 [`git_workflow_guide.md`](git_workflow_guide.md)를 따른다.

## 범위

- 내부 task PR 본문 작성 규칙
- 외부 기여 PR 검토
- 리뷰 기록 문서 작성 규칙
- 검토 완료 후 아카이브 절차

## 기본 원칙

- 내부 task PR 본문은 `{PR_TEMPLATE_PATH}`를 따른다.
- 내부 task PR 본문은 최종 결과 보고서의 짧은 압축본으로 작성한다.
- PR 본문에는 실제 실행한 검증만 적는다.
- 현재 PR이 직접 수행하는 issue는 `대상 타스크`에 적는다.
- `관련 이슈`는 선행, 후속, Epic, upstream, 참고 PR/issue처럼 PR 이해에 필요한 맥락을 적는다.
- 외부 기여 PR은 코드 변경과 문서 변경을 함께 검토한다.
- 외부 PR 검토 결과는 `mydocs/pr/` 문서 흐름으로 관리한다.
- 검토 문서는 재현 가능해야 하며, 실행한 검증 명령/결과를 포함한다.

## 내부 task PR 작성 규칙

내부 task PR은 `local/task{번호}`에서 작업한 내용을 `publish/task{번호}`로 push한 뒤 `{BASE_BRANCH}` 대상으로 생성한다.

PR 본문은 `{PR_TEMPLATE_PATH}`를 기준으로 작성한다. 템플릿은 이 저장소의 하이퍼-워터폴 산출물과 연결되도록 확장한 형식이다.

### 섹션 구성

내부 task PR에는 다음 최상위 섹션을 둔다.

- `요약`
- `변경 내역`
  - `### 영향 영역` (선택)
  - `### 작업 문서`
- `핵심 리뷰 포인트`
- `검증`
- `스크린샷`
- `관련 이슈`
- `후속 이슈 제안`
- `남은 리스크`

`변경 내역`은 본문에 Stage timeline만 두고, `영향 영역`과 `작업 문서`를 하위 목차로 분리한다. 이렇게 하면 Stage 흐름이 PR 상단에 한눈에 들어오고, 영역 표·문서 링크는 GitHub 사이드바 ToC에서 따로 노출된다.

`핵심 리뷰 포인트`, `스크린샷`, `후속 이슈 제안`, `### 영향 영역`은 필요한 경우만 유지한다. 해당하지 않으면 통째로 삭제하거나 `없음` 한 줄로 정리한다.

### 섹션별 작성 기준

`요약`:

- 최대 4개 bullet로 압축한다.
- 대상 타스크, 변경 이유, 변경 내용, 리뷰어가 먼저 볼 지점을 적는다.
- 현재 PR이 직접 수행하는 issue는 `대상 타스크`에 적는다.

`변경 내역`:

- 본문에는 Stage timeline만 둔다. 영역 표와 작업 문서 링크는 하위 목차로 분리한다.
- Stage 기반 작업은 Stage당 1줄로 적는다.
- Stage 제목은 단계 보고서로 링크하고, 옆의 짧은 commit SHA는 commit URL로 링크한다.
- 예: `**[Stage 1](stage-url)** ([0cdbae0](commit-url)): 한 줄 요약`

`### 영향 영역` (`변경 내역`의 하위 섹션, 선택):

- 영역이 여럿이고 리뷰어가 영역별 우선순위를 알아야 할 때만 유지한다.
- 변경 영역이 1~2개라면 이 하위 섹션을 통째로 삭제한다.
- 최대 5행 표 (`영역 / 변경 / 리뷰 포인트`).

`### 작업 문서` (`변경 내역`의 하위 섹션):

- 수행 계획서, 구현 계획서, 최종 보고서를 적는다. 단계별 완료 보고서는 위 Stage timeline의 단계 보고서 링크에서 이미 노출되므로 중복 적지 않는다.
- 작업 문서 링크는 PR head commit SHA 기준 GitHub blob URL을 사용하고, raw URL 대신 `[파일명](URL)` 형식으로 표시한다.

`핵심 리뷰 포인트`:

- 리뷰어가 먼저 판단해야 하는 ABI, 스키마, 렌더링 계약, 알고리즘 분기, 호환성 판단이 있을 때만 유지한다.
- 최대 3개만 적고, 코드 블록은 각 20줄 이하로 제한한다.

`검증`:

- 실제 실행한 명령과 수동 확인만 적는다.
- 실행하지 않은 항목은 삭제한다.
- 수동 확인은 어떤 화면이나 파일에서 확인했는지 짧게 적는다.

`스크린샷`:

- UI, Finder, Quick Look, Thumbnail, renderer 결과처럼 시각적 변경사항이 있을 때만 유지한다.
- 시각 변경이 있으면 Before/After 표를 사용한다.
- 실제 이미지나 산출물 없이 형식만 채우지 않는다.

`관련 이슈`:

- 현재 PR의 대상 타스크가 아니라 PR 이해에 필요한 맥락 이슈를 적는다.
- 선행, 후속, Epic, upstream, 참고 PR/issue를 의미 라벨과 함께 적는다.
- 해당 없으면 `없음`으로 적는다.

`후속 이슈 제안`:

- 아직 이슈가 없지만 분리할 후보를 적는다.
- 없으면 `없음`으로 적는다.

`남은 리스크`:

- 검증 한계와 운영상 주의사항을 적는다.
- 없으면 `없음`으로 적는다.

### PR 본문과 최종 보고서의 관계

최종 결과 보고서는 장기 보관 문서이고, PR 본문은 리뷰 화면에서 빠르게 읽는 요약본이다.

- 최종 결과 보고서:
  - 전체 맥락, 단계별 결과, 검증 로그, 남은 리스크를 자세히 기록한다.
- PR 본문:
  - 리뷰어가 merge 판단에 필요한 내용만 압축한다.
  - 상세 내용은 `변경 내역`의 Stage 링크와 작업 문서 링크로 참조한다.

### 작성 예시

```md
## 요약

- 대상 타스크: #22
- 왜: {변경 이유}
- 무엇: {핵심 변경}
- 리뷰 포인트: {리뷰어가 먼저 볼 지점}

## 변경 내역

- **[Stage 1](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/working/task_m050_22_stage1.md)** ([abc1234](https://github.com/{REPO_SLUG}/commit/{stage1_sha})): {Stage 1 요약}
- **[Stage 2](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/working/task_m050_22_stage2.md)** ([def5678](https://github.com/{REPO_SLUG}/commit/{stage2_sha})): {Stage 2 요약}

### 영향 영역

| 영역 | 변경 | 리뷰 포인트 |
|------|------|-------------|
| {영역 1} | {변경 요약} | {리뷰 포인트} |

### 작업 문서

- 수행 계획서: [task_m050_22.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m050_22.md)
- 구현 계획서: [task_m050_22_impl.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m050_22_impl.md)
- 최종 보고서: [task_m050_22_report.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/report/task_m050_22_report.md)

## 검증

- `{프로젝트별 검증 명령 1}`
- `{프로젝트별 검증 명령 2}`
- `git diff --check`

## 관련 이슈

- 선행: #17
- 참고: edwardkim/rhwp#385

## 남은 리스크

- {남은 리스크 요약}
```

### PR 생성 명령

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

## 외부 기여 PR 검토 절차

외부 PR은 `mydocs/pr/` 문서 흐름으로 처리한다.

- 검토 문서: `pr_{번호}_review.md`
- 구현 계획서: `pr_{번호}_review_impl.md` (필요 시)
- 최종 보고서: `pr_{번호}_report.md`

절차:

1. PR 메타데이터 확인 (base/head, mergeable, CI, 연결 issue)
2. 코드/문서 변경 범위 확인
3. 필요한 검증 실행
4. `pr_{번호}_review.md`에 핵심 리스크와 수정 요청 정리
5. 필요 시 `pr_{번호}_review_impl.md`에 재검토 계획 정리
6. 최종 판단을 `pr_{번호}_report.md`로 기록
7. 처리 완료 문서를 `mydocs/pr/archives/`로 이동

## 머지 전 체크

- PR 대상 브랜치가 정책에 맞는지
- 리뷰 코멘트가 해결/미해결로 구분되어 있는지
- 필수 검증이 수행됐는지
- 승인/보류/반려 판단 근거가 문서에 남았는지

## 머지 후 체크

- 관련 issue 상태 확인 (auto close 또는 수동 close)
- merge 완료된 `publish/task{번호}` 원격 브랜치 삭제 여부 확인
- 다음 작업에 필요하지 않은 로컬 worktree, build 산출물, 설치 smoke test 산출물 정리
- 후속 작업이 있으면 신규 issue로 분리
- 검토 문서를 `mydocs/pr/archives/`로 이동
