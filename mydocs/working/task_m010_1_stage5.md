# task_m010_1_stage5.md — Stage 5 완료 보고서 (scope 재확장)

GitHub Issue: [#1](https://github.com/postmelee/hyper-waterfall/issues/1)
구현계획서: [`task_m010_1_impl.md`](../plans/task_m010_1_impl.md)
이전 단계: [`task_m010_1_stage4.md`](task_m010_1_stage4.md)

## 단계 목적

PR `변경 내역` 섹션이 Stage timeline + 영역 표 + 작업 문서 링크를 한 섹션에 섞어 산만했던 가독성 문제를 해소한다. 변경 내역 본문은 Stage timeline만 두고, 영역 표·작업 문서 링크는 `### 영향 영역`·`### 작업 문서` 하위 목차로 분리한다.

## 산출물

| 파일 | 변경 |
|---|---|
| `templates/.github/pull_request_template.md` | `## 변경 내역` 본문 = Stage timeline만. `### 영향 영역`(옵션, 표) + `### 작업 문서` 하위 섹션 추가 |
| `.github/pull_request_template.md` (자기 적용본) | 동일 구조 (`{REPO_SLUG}` → `postmelee/hyper-waterfall` 치환된 사본) |
| `templates/mydocs/manual/pr_process_guide.md` | "섹션 구성"에 하위 섹션 트리 추가, "섹션별 작성 기준" 항목 분할(변경 내역 / 영향 영역 / 작업 문서), "작성 예시" 새 구조로 보정 |

## 검증 결과

```
=== templates·자기 적용본 PR 템플릿 하위 섹션 ===
templates/.github/pull_request_template.md:25:### 영향 영역
templates/.github/pull_request_template.md:34:### 작업 문서
.github/pull_request_template.md:25:### 영향 영역
.github/pull_request_template.md:34:### 작업 문서

=== pr_process_guide 작성 예시 하위 섹션 ===
136:### 영향 영역
142:### 작업 문서

=== git diff --check ===
OK
```

검증 명령:

```bash
grep -nE '^### (영향 영역|작업 문서)' templates/.github/pull_request_template.md .github/pull_request_template.md
grep -nE '^### (영향 영역|작업 문서)' templates/mydocs/manual/pr_process_guide.md
git diff --check
```

PR 템플릿 2개 모두에서 `영향 영역`과 `작업 문서` 하위 섹션이 정확히 1건씩 노출됨. 가이드 작성 예시도 새 구조 반영.

## 본문 무손실 여부

- PR 템플릿: Stage 4의 본문 길이/문구는 그대로 두고, 표 위·문서 링크 위에 `### ...` 헤더만 추가. 표 안내 주석을 "영역 1~2개면 통째 삭제" 메시지로 보강.
- pr_process_guide: 기존 `변경 내역` 작성 기준의 모든 항목을 보존하되 세 항목(변경 내역 / 영향 영역 / 작업 문서)으로 분할.

## 잔여 위험

- **PR #115의 alhangeul-macos 형식과 일시적 차이**: PR #115는 `변경 내역` 안에 표·작업 문서를 평면적으로 배치한다. 본 저장소는 이번 Stage 5에서 하위 목차 분리로 한 단계 더 나아갔다. upstream 후속 동기화에서 alhangeul-macos가 따라오면 자연스럽지만, 안 따라오면 두 저장소의 PR 본문이 작은 차이를 유지하게 된다. 의도된 차이로 본 보고서에 명시한다.
- **GitHub 사이드바 ToC 노출**: `###` 헤더는 GitHub PR 사이드바 ToC에서 한 단계 들여쓰기로 노출된다. 일반 사용자 환경에서 잘 보이는지는 PR 페이지에서 시각 확인 가능 (이번 PR #2 재작성으로 직접 검증됨).

## 다음 단계 영향

- 최종 보고서를 5단계 구성으로 다시 정리.
- PR #2 본문을 같은 구조(`변경 내역` Stage timeline + `### 영향 영역` + `### 작업 문서`)로 재배치.

## 승인 요청

- Stage 5 산출물(PR 템플릿 2개 + pr_process_guide)에 동의?
- 최종 보고서 갱신과 PR #2 본문 재배치로 진입 승인?
