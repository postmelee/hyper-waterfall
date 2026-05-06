# task_m010_3_stage3.md — Stage 3 완료 보고서

GitHub Issue: [#3](https://github.com/postmelee/hyper-waterfall/issues/3)
구현계획서: [`task_m010_3_impl.md`](../plans/task_m010_3_impl.md)
Stage: 3

## 단계 목적

`document_structure_guide.md`를 표 중심의 폴더 역할 목록에서, 각 폴더가 어떤 작업 기억을 담당하는지 설명하는 매뉴얼로 보강했다. rhwp 원본 문서의 "orders는 지금 무엇을 할 것인가, plans는 어떻게 할 것인가"라는 관점을 참고하되, 본 저장소의 중앙 템플릿 폴더, 외부 PR 폴더, Skill 진실 원천 구조에 맞춰 새로 작성했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/mydocs/manual/document_structure_guide.md` | 중앙 템플릿 정책, 지원 문서 파일명 규칙, 폴더별 상세 규칙, FAQ 보강 |

변경 규모:

```text
templates/mydocs/manual/document_structure_guide.md | 190 +++++++++++++++++++--
1 file changed, 179 insertions(+), 11 deletions(-)
```

최종 라인 수:

```text
250 templates/mydocs/manual/document_structure_guide.md
```

## 본문 변경 정도 / 본문 무손실 여부

기존 핵심 내용은 유지하면서 확장했다.

- 유지: 내부 task 문서 파일명 규칙, 기존 폴더 역할 표, 외부 PR 처리 규칙, Agent Skills 위치 정책, FAQ, 관련 매뉴얼 링크
- 확장: `_templates/` 용어와 폴더 역할, 중앙 템플릿 정책, 지원 문서 파일명 규칙, 폴더별 상세 규칙
- 조정: 심볼릭 링크 화살표는 ASCII `->`로 정리

## 검증 결과

실행 명령:

```bash
grep -nE '`_templates/`|문서 템플릿 진실 원천' templates/mydocs/manual/document_structure_guide.md
grep -nE '^### `(orders|plans|working|report|feedback|tech|troubleshootings|pr|manual|skills|_templates)/`' templates/mydocs/manual/document_structure_guide.md
grep -nE '답하는 질문|작성 시점|사용 템플릿|두면 안 되는 내용|다음 세션' templates/mydocs/manual/document_structure_guide.md
grep -nE '산출물 폴더 내부에는 템플릿 파일을 두지 않는다|중앙 템플릿' templates/mydocs/manual/document_structure_guide.md
git diff --check
```

결과:

- `_templates/`와 `문서 템플릿 진실 원천` 용어 확인.
- `_templates/`, `orders/`, `plans/`, `working/`, `report/`, `feedback/`, `tech/`, `troubleshootings/`, `pr/`, `manual/`, `skills/` 상세 규칙 heading 확인.
- 각 폴더 상세 규칙에 `답하는 질문`, `작성 시점`, `사용 템플릿`, `두면 안 되는 내용`, `다음 세션` 맥락이 포함됨을 확인.
- 산출물 폴더 내부 템플릿 금지와 중앙 템플릿 정책 문구 확인.
- `git diff --check` 경고 없이 통과.

## 잔여 위험

- Stage 4 전까지 Skill 본문은 아직 중앙 템플릿을 직접 참조하지 않는다.
- Stage 5 전까지 README의 문서 구조 설명과 프롬프트 가이드 준수 섹션은 아직 새 `_templates/` 구조를 반영하지 않는다.

## 다음 단계 영향

Stage 4에서는 이번 단계에서 문서화한 중앙 템플릿 정책에 맞춰 `task-start`, `task-stage-report`, `task-final-report`, `todo`, `external-pr-review` Skill을 보강해야 한다. Skill은 섹션 목록을 길게 반복하기보다 템플릿 참조와 예외 규칙 중심으로 정리한다.

## 승인 요청

Stage 3 산출물과 검증 결과를 승인하면 Stage 4로 진행한다.
