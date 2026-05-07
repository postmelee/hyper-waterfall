# Stage 1 완료 보고서

GitHub Issue: [#13](https://github.com/postmelee/hyper-waterfall/issues/13)
구현계획서: [`task_m020_13_impl.md`](../plans/task_m020_13_impl.md)
Stage: 1

## 단계 목적

PR 템플릿의 `검증` 섹션을 실행 명령 단일 목록에서 주제별 검증 결과 구조로 개편한다. 이번 단계는 dogfooding 위치인 `.github/pull_request_template.md`와 적용 저장소용 진실 원천인 `templates/.github/pull_request_template.md`를 함께 수정해, 이후 PR 본문이 검증 목적·방법·결과·근거·한계를 남기도록 만드는 것이 목적이다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `.github/pull_request_template.md` | `## 검증` 아래에 자동 검증, 수동/시나리오 검증, CI/원격 검증, 검증 한계 하위 섹션과 표 구조를 추가했다. |
| `templates/.github/pull_request_template.md` | dogfooding 템플릿과 같은 검증 구조를 반영하고 `{REPO_SLUG}` placeholder를 보존했다. |
| `mydocs/plans/task_m020_13_impl.md` | `{REPO_SLUG}` 확인 명령을 정규식 grep에서 고정 문자열 grep으로 보정했다. |

## 본문 변경 정도 / 본문 무손실 여부

문서 템플릿 변경이다. PR 템플릿의 기존 `요약`, `변경 내역`, `작업 문서`, `스크린샷`, `관련 이슈`, `후속 이슈 제안`, `남은 리스크` 구조는 유지했고, `검증` 섹션 내부만 단일 bullet placeholder에서 하위 목차와 표 중심 구조로 확장했다.

`templates/.github/pull_request_template.md`의 `{REPO_SLUG}` placeholder는 유지했다. 구현계획서의 검증 명령은 산출물 변경 범위를 바꾸지 않고 명령 오류를 피하도록 `grep -nF`로 보정했다.

## 검증 결과

실행 명령:

```bash
grep -nE '### 자동 검증|### 수동/시나리오 검증|### CI/원격 검증|### 검증 한계' .github/pull_request_template.md templates/.github/pull_request_template.md
grep -nE '주제 \| 검증 방법 \| 결과 \| 근거|항목 \| 결과 \| 근거|실행하지 않은|긴 로그' .github/pull_request_template.md templates/.github/pull_request_template.md
grep -nF '{REPO_SLUG}' templates/.github/pull_request_template.md
diff -u .github/pull_request_template.md templates/.github/pull_request_template.md
ruby -e 'a=File.read(".github/pull_request_template.md"); b=File.read("templates/.github/pull_request_template.md").gsub("{REPO_SLUG}", "postmelee/hyper-waterfall"); abort("template mismatch beyond REPO_SLUG") unless a == b; puts "OK: templates match after REPO_SLUG normalization"'
git diff --check
```

결과:

- OK: 두 PR 템플릿 모두 `자동 검증`, `수동/시나리오 검증`, `CI/원격 검증`, `검증 한계` 하위 섹션을 포함한다.
- OK: 두 PR 템플릿 모두 `주제 / 검증 방법 / 결과 / 근거`, `항목 / 결과 / 근거`, `실행하지 않은`, `긴 로그` 안내를 포함한다.
- OK: `templates/.github/pull_request_template.md`에 `{REPO_SLUG}` placeholder가 4곳 보존됐다.
- OK: `diff -u` 결과는 dogfooding 파일의 `postmelee/hyper-waterfall`과 template 원본의 `{REPO_SLUG}` 차이만 보여줬다.
- OK: `{REPO_SLUG}` 정규화 후 두 템플릿이 완전히 일치했다.
- OK: `git diff --check` 경고 없음.

## 잔여 위험

- 없음.

## 다음 단계 영향

- Stage 2에서 `pr_process_guide.md`와 `task-final-report/SKILL.md`는 이번 단계에서 확정한 하위 섹션명과 표 컬럼을 기준으로 PR 작성 규칙을 설명해야 한다.
- Stage 2 검증에서도 `grep -nF '{REPO_SLUG}'` 형태를 사용한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
