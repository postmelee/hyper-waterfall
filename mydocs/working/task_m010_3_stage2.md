# task_m010_3_stage2.md — Stage 2 완료 보고서

GitHub Issue: [#3](https://github.com/postmelee/hyper-waterfall/issues/3)
구현계획서: [`task_m010_3_impl.md`](../plans/task_m010_3_impl.md)
Stage: 2

## 단계 목적

Stage 1에서 만든 중앙 `_templates` 폴더에 내부 task 외의 지원 문서 템플릿을 추가했다. 피드백, 기술 조사, 트러블슈팅, 외부 PR 검토 문서도 출력 형식이 고정되어야 README의 "정해진 위치와 템플릿" 주장을 실제 구조로 뒷받침할 수 있다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/mydocs/_templates/feedback.md` | 작업지시자 피드백, 코드 리뷰 의견, 재작업 지시용 템플릿 추가 |
| `templates/mydocs/_templates/tech_note.md` | 기술 조사, 구조 분석, 스펙 검토, 대안 비교용 템플릿 추가 |
| `templates/mydocs/_templates/troubleshooting.md` | 증상, 재현 조건, 원인, 해결, 재발 방지, 검증을 기록하는 템플릿 추가 |
| `templates/mydocs/_templates/external_pr_review.md` | 외부 PR 초기 검토와 권고 승인 요청용 템플릿 추가 |
| `templates/mydocs/_templates/external_pr_review_impl.md` | 외부 PR 추가 검증/보조 작업 계획 템플릿 추가 |
| `templates/mydocs/_templates/external_pr_report.md` | 외부 PR 최종 권고와 GitHub 코멘트 본문 기록 템플릿 추가 |

라인 수:

```text
  42 templates/mydocs/_templates/feedback.md
  53 templates/mydocs/_templates/tech_note.md
  53 templates/mydocs/_templates/troubleshooting.md
  53 templates/mydocs/_templates/external_pr_review.md
  48 templates/mydocs/_templates/external_pr_review_impl.md
  47 templates/mydocs/_templates/external_pr_report.md
 296 total
```

## 본문 변경 정도 / 본문 무손실 여부

신규 템플릿 6종만 추가했다. 기존 내부 task 템플릿, Skill, 매뉴얼, README 본문은 이번 단계에서 수정하지 않았다.

## 검증 결과

실행 명령:

```bash
find templates/mydocs/_templates -maxdepth 1 -type f | sort
grep -nE '^# .*템플릿' templates/mydocs/_templates/feedback.md templates/mydocs/_templates/tech_note.md templates/mydocs/_templates/troubleshooting.md templates/mydocs/_templates/external_pr_review.md templates/mydocs/_templates/external_pr_review_impl.md templates/mydocs/_templates/external_pr_report.md
grep -nE 'pr_\{번호\}_review\.md|pr_\{번호\}_review_impl\.md|pr_\{번호\}_report\.md' templates/mydocs/_templates/external_pr_review.md templates/mydocs/_templates/external_pr_review_impl.md templates/mydocs/_templates/external_pr_report.md templates/mydocs/skills/external-pr-review/SKILL.md
grep -nE '^## (증상|재현 조건|원인|해결|재발 방지|검증)' templates/mydocs/_templates/troubleshooting.md
git diff --check
```

결과:

- 중앙 템플릿 폴더에 총 11개 템플릿 존재 확인.
- 신규 템플릿 6종 모두 제목에 `템플릿` 명시 확인.
- 외부 PR 템플릿 3종이 실제 파일명 정책(`pr_{번호}_review.md`, `pr_{번호}_review_impl.md`, `pr_{번호}_report.md`)을 포함함을 확인.
- 트러블슈팅 템플릿의 필수 heading grep 통과.
- `git diff --check` 경고 없이 통과.

## 잔여 위험

- Stage 3 전까지 `document_structure_guide.md`에는 아직 `_templates/`의 목적과 산출물 폴더 내부 템플릿 금지 규칙이 반영되지 않았다.
- Stage 4 전까지 Skill들은 아직 새 템플릿 파일을 직접 참조하지 않는다.

## 다음 단계 영향

Stage 3에서는 이번 단계까지 확정된 11개 템플릿 파일명을 기준으로 `document_structure_guide.md`를 보강해야 한다. 특히 `feedback/`, `tech/`, `troubleshootings/`, `pr/` 폴더가 각각 어떤 질문에 답하는지와 어떤 중앙 템플릿을 사용하는지 연결해야 한다.

## 승인 요청

Stage 2 산출물과 검증 결과를 승인하면 Stage 3으로 진행한다.
