# Task M040 #62 Stage 1 완료 보고서

GitHub Issue: [#62](https://github.com/postmelee/hyper-waterfall/issues/62)
구현계획서: [`task_m040_62_impl.md`](../plans/task_m040_62_impl.md)
Stage: 1

## 단계 목적

`document_structure_guide.md`에 집중되어 있던 `mydocs/` 폴더별 상세 규칙을 각 폴더의 `README.md`로 분산한다. `document_structure_guide.md`는 문서 체계 entrypoint로 남기고, 폴더별 세부 규칙은 path-specific하게 해당 폴더 가까이에 둔다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/mydocs/_templates/README.md` | 문서 출력 형식 템플릿 폴더 규칙 추가 |
| `templates/mydocs/orders/README.md` | 오늘할일 폴더 규칙 추가 |
| `templates/mydocs/plans/README.md` | 수행/구현 계획서 폴더 규칙 추가 |
| `templates/mydocs/working/README.md` | 단계 보고서 폴더 규칙 추가 |
| `templates/mydocs/report/README.md` | 최종 보고서 폴더 규칙 추가 |
| `templates/mydocs/feedback/README.md` | 피드백 폴더 규칙 추가 |
| `templates/mydocs/tech/README.md` | 기술 조사 폴더 규칙 추가 |
| `templates/mydocs/troubleshootings/README.md` | 트러블슈팅 폴더 규칙 추가 |
| `templates/mydocs/pr/README.md` | 외부 PR 검토 기록 폴더 규칙 추가 |
| `templates/mydocs/manual/README.md` | 운영 매뉴얼 폴더 규칙 추가 |
| `templates/mydocs/skills/README.md` | Skill 진실 원천 폴더 규칙과 인식 경로 추가 |
| `templates/mydocs/manual/document_structure_guide.md` | 폴더별 상세 규칙 본문을 README 링크 표로 축소 |

## 본문 변경 정도 / 본문 무손실 여부

문서 구조 매뉴얼의 폴더별 상세 규칙 126줄을 삭제하고, 각 폴더 README 11개로 분산했다. 원문에 있던 목적, 답하는 질문, 작성 시점, 허용 파일명, 사용 템플릿, 반드시 포함할 내용, 금지 내용, 다음 세션 AI가 복원해야 할 맥락은 각 README에 보존했다.

`document_structure_guide.md`는 384줄에서 281줄로 줄었고, 폴더별 상세 규칙 섹션은 각 README 링크 표와 변경 원칙만 남겼다.

## 검증 결과

실행 명령:

```bash
find templates/mydocs -maxdepth 2 -name README.md -print | sort
rg -n "목적:|허용 파일명|두면 안 되는 내용|다음 세션 AI" templates/mydocs/*/README.md
rg -n "폴더별 상세 규칙|_templates/README.md|orders/README.md|skills/README.md" templates/mydocs/manual/document_structure_guide.md
git diff --check
rg -n "^## 목적|^## 허용 파일명|^## 두면 안 되는 내용|^## 다음 세션 AI" templates/mydocs/*/README.md
wc -l templates/mydocs/*/README.md templates/mydocs/manual/document_structure_guide.md
```

결과:

- OK: `find` 결과로 `templates/mydocs/*/README.md` 11개가 확인됐다.
- OK: 각 README에 `허용 파일명`, `두면 안 되는 내용`, `다음 세션 AI가 복원해야 할 맥락` 섹션이 확인됐다.
- OK: 보강 검증에서 각 README의 `## 목적`, `## 허용 파일명`, `## 두면 안 되는 내용`, `## 다음 세션 AI가 복원해야 할 맥락` heading이 모두 확인됐다.
- OK: `document_structure_guide.md`의 `폴더별 상세 규칙` 섹션이 `_templates/README.md`, `orders/README.md`, `skills/README.md` 등 폴더별 README 링크를 포함한다.
- OK: `git diff --check` 경고 없음.
- 참고: `wc -l` 기준 README 11개 총 496줄, `document_structure_guide.md` 281줄.

## 잔여 위험

- README와 manifest 정합성은 Stage 4에서 최종 확인한다.
- 기존 README나 다른 매뉴얼이 `document_structure_guide.md#폴더별-상세-규칙`의 세부 본문을 기대하는 링크를 갖고 있을 수 있다. Stage 4에서 링크 정합성을 점검한다.

## 다음 단계 영향

- Stage 2에서 `pr_process_guide.md`를 분산할 때 `templates/mydocs/pr/README.md`와 외부 PR 검토 문서의 역할을 중복하지 않게 유지해야 한다.
- Stage 3에서 lifecycle 문서를 분리할 때 `manual/README.md`의 운영 매뉴얼 범위와 충돌하지 않게 둔다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 PR 처리 가이드 분산으로 진행한다.
