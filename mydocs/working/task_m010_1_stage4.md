# task_m010_1_stage4.md — Stage 4 완료 보고서 (scope 확장)

GitHub Issue: [#1](https://github.com/postmelee/hyper-waterfall/issues/1)
구현계획서: [`task_m010_1_impl.md`](../plans/task_m010_1_impl.md)
이전 단계: [`task_m010_1_stage3.md`](task_m010_1_stage3.md)
Upstream 참고: [`postmelee/alhangeul-macos#115`](https://github.com/postmelee/alhangeul-macos/pull/115)

## 단계 목적

PR #115에서 정리한 PR 본문 구조 강화와 Open PR 기본 생성 기준을 본 저장소에 동기화한다. 이로써 본 저장소 사용자가 매뉴얼·SKILL을 그대로 따라가기만 해도 PR #115 수준의 PR 운영을 할 수 있게 만든다.

## 산출물

### templates 갱신 (5개)

| 파일 | 핵심 변경 |
|---|---|
| `templates/.github/pull_request_template.md` | 8개 섹션 새 구조 (요약·변경 내역·핵심 리뷰 포인트·검증·스크린샷·관련 이슈·후속 이슈 제안·남은 리스크). 요약은 4 bullet (대상 타스크/왜/무엇/리뷰 포인트). 변경 내역은 Stage·commit 이중 링크 + 영역 표 + 작업 문서. `Closes #` 폐지. URL은 `{REPO_SLUG}` placeholder 보존 |
| `templates/mydocs/skills/task-final-report/SKILL.md` | description의 "draft" → "Open PR". 절차 7번을 `--body-file` 우선 흐름으로 변경하고 `--draft` 제거. PR 본문 작성 가이드 7개 항목 (4 bullet, Stage 1줄, 검증, Before/After 조건부, 관련 이슈 의미). 검증 8개 항목 갱신 |
| `templates/mydocs/manual/pr_process_guide.md` | 기본 원칙에 "대상 타스크 vs 관련 이슈" 분리. 섹션 구성 8개로 갱신. 섹션별 작성 기준 전면 재작성. 작성 예시 새 형식 (Stage 이중 링크, 영역 표, 작업 문서). PR 생성 명령에서 `--draft` 제거, `--body-file` 우선 |
| `templates/mydocs/manual/git_workflow_guide.md` | 핵심 용어의 "draft PR" → "Open PR". 브랜치 운용 설명에서 "draft로 생성" → "Open PR로 생성". 메인테이너 워크플로우 명령에서 `--draft` 제거 + `--body-file` 사용. PR 본문 링크 가이드에 Stage 이중 링크 예시 추가 |
| `templates/mydocs/manual/task_workflow_guide.md` | 11번 항목 "draft PR" → "Open PR" |

### 자기 적용본 갱신 (3개)

| 파일 | 변경 |
|---|---|
| `.github/pull_request_template.md` | templates 새 본문 기준으로 placeholder를 본 저장소 슬러그(`postmelee/hyper-waterfall`)로 치환한 사본 재생성. 8개 섹션 새 구조 |
| `README.md` | "도입 후 작업 흐름" 표 5번의 "draft PR" → "Open PR". "핵심 SKILL" 표 `task-final-report` 행의 "draft PR" → "Open PR" |
| `AGENTS.md` | 본문에 draft 표현 잔존 없음 확인 (변경 없음) |

### 제외 (alhangeul-macos 특유)

- `.github/copilot-instructions.md`: 본 저장소에 없음
- AppKit/render 검증 명령: 본 저장소는 코드 빌드 없음

## 검증 결과

```
=== templates draft 잔존 ===
OK

=== templates PR 템플릿 새 섹션 ===
요약, 변경 내역, 핵심 리뷰 포인트, 검증, 스크린샷, 관련 이슈, 후속 이슈 제안, 남은 리스크 (8개 모두 존재)

=== 자기 적용본 PR 템플릿 placeholder 잔존 ===
OK ({REPO_SLUG} 잔존 없음)

=== 자기 적용본 PR 템플릿 새 섹션 ===
8개 모두 존재

=== 자기 적용본 README/AGENTS draft 잔존 ===
OK

=== git diff --check ===
OK
```

검증 명령:

```bash
grep -nE 'draft PR|--draft' templates/mydocs/skills/task-final-report/SKILL.md templates/mydocs/manual/git_workflow_guide.md templates/mydocs/manual/task_workflow_guide.md templates/mydocs/manual/pr_process_guide.md
grep -nE '^## (요약|변경 내역|핵심 리뷰 포인트|검증|스크린샷|관련 이슈|후속 이슈 제안|남은 리스크)' templates/.github/pull_request_template.md
grep -nE '\{REPO_SLUG\}' .github/pull_request_template.md
grep -nE '^## (요약|변경 내역|핵심 리뷰 포인트|검증|스크린샷|관련 이슈|후속 이슈 제안|남은 리스크)' .github/pull_request_template.md
grep -nE 'draft PR' README.md AGENTS.md
git diff --check
```

## 본문 무손실 여부

- templates의 매뉴얼·SKILL은 PR #115의 patch와 1:1 대응으로 갱신했고, 본 저장소 컨텍스트(placeholder 사용, 단일 `main` 브랜치 정책)는 그대로 유지했다.
- 자기 적용본 PR 템플릿은 검증 항목을 일부러 비웠다. 새 정책상 PR 본문은 PR마다 실제 실행한 명령만 적기 때문에, templates처럼 빈 bullet으로 두고 PR 작성자가 채운다.

## 잔여 위험

- **이번 task의 PR #2 본문은 옛 형식**: Stage 5 단계가 끝난 뒤에 PR #2 본문을 새 템플릿으로 재작성한다. (사용자 결정에 따라 draft 상태는 유지하고 본문만 갱신.)
- **`{PR_TEMPLATE_PATH}` placeholder 일관성**: 매뉴얼은 placeholder를 사용하지만 자기 적용본 운영 명령에서는 실제 경로(`.github/pull_request_template.md`)를 쓴다. agent-entrypoint.md의 placeholder 치환 단계가 이 일관성을 보장한다.

## 다음 단계 영향

- 최종 보고서를 4단계 구성(Stage 1·2·3·4)으로 재작성한다.
- PR #2 본문을 새 템플릿(요약 4 bullet · Stage 4개 이중 링크 · 영역 표 · 작업 문서 · 검증 · 관련 이슈에 PR #115 참고)으로 재작성한다.

## 승인 요청

- Stage 4 산출물(templates 5개, 자기 적용본 3개)에 동의?
- 최종 보고서 갱신과 PR #2 본문 재작성으로 진입 승인?
