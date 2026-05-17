# Task M040 #60 Stage 1 완료 보고서

GitHub Issue: [#60](https://github.com/postmelee/hyper-waterfall/issues/60)
구현계획서: [`task_m040_60_impl.md`](../plans/task_m040_60_impl.md)
Stage: 1

## 단계 목적

Stage 1은 문서 구조 매뉴얼에서 공식 문서 루트와 `mydocs/`의 경계를 먼저 확정하는 단계다. `docs/` 같은 특정 이름을 Hyper-Waterfall 기본값으로 만들지 않고, 대상 프로젝트가 공식 문서 루트를 별도 task에서 선택하도록 정책을 정리했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/mydocs/manual/document_structure_guide.md` | 공식 문서 루트 용어와 경계 정책 추가, `manual/`/`tech/` 역할 설명 수정, 신규 적용 중 공식 문서 루트 자동 생성 금지 명확화 |
| `mydocs/orders/20260518.md` | 날짜 변경에 맞춰 #60 Stage 1 진행 상태 추가 |
| `mydocs/working/task_m040_60_stage1.md` | Stage 1 검증과 잔여 위험 기록 |

## 본문 변경 정도 / 본문 무손실 여부

기존 문서 구조 매뉴얼의 큰 목차와 기존 정책은 유지했다. 변경은 `핵심 용어`, `폴더 역할`, `manual 문서 중립성 정책`, `배포 manifest와 버전 기록 정책`, `tech/`, `manual/` 상세 규칙에 국소적으로 반영했다.

기존 신규 적용 guardrail인 `docs/**` 등 manifest 외 경로 생성 금지와 대상 프로젝트 고유 산출물 생성 금지는 유지했다. 다만 해당 문구가 대상 저장소의 일반 문서 구조나 공식 문서 루트 이름을 정의하지 않는다는 점을 추가했다.

## 검증 결과

실행 명령:

```bash
rg -n "사용자/개발자 문서|공식 문서|문서 위치|mydocs/manual|mydocs/tech" templates/mydocs/manual/document_structure_guide.md
rg -n "docs/\\*\\*|manifest 외|제품 문서|공식 문서 루트" templates/mydocs/manual/document_structure_guide.md
rg -n "사용자/개발자 문서" templates/mydocs/manual/document_structure_guide.md
git diff --check
git status --short
```

결과:

- OK: `공식 문서 루트` 용어와 `공식 문서 루트와 mydocs 경계 정책` 섹션이 확인됐다.
- OK: 문서 위치 판단, 신규 적용 중 공식 문서 루트 생성 금지, `mydocs/manual`과 `mydocs/tech` 경계 문구가 확인됐다.
- OK: 기존의 넓은 표현인 `사용자/개발자 문서`는 더 이상 검색되지 않았다.
- OK: `docs/**`는 신규 적용 금지 예시일 뿐 공식 문서 루트 이름을 정의하지 않는다는 문구가 확인됐다.
- OK: `git diff --check`가 경고 없이 통과했다.
- 참고: `git status --short`는 Stage 1 산출물 작성 전 기준으로 `templates/mydocs/manual/document_structure_guide.md` 수정과 `mydocs/orders/20260518.md` 신규 파일을 표시했다. 보고서 작성 후 같은 파일 묶음으로 커밋한다.

## 잔여 위험

- Stage 2에서 `task_plan.md`, `task_impl_plan.md`, `final_report.md`, `docs/agent-entrypoint.md`, `templates/AGENTS.md`, `templates/CLAUDE.md`가 Stage 1 정책과 같은 표현을 사용하도록 맞춰야 한다.
- Stage 3에서 README가 새 정책을 짧게 요약하되, 매뉴얼과 중복되지 않게 정리해야 한다.

## 다음 단계 영향

- Stage 2는 이번 Stage에서 확정한 용어인 `공식 문서 루트`, `문서 위치 판단`, `mydocs/manual`, `mydocs/tech` 경계를 그대로 사용한다.
- Stage 2에서도 `templates/manifest.json`에 공식 문서 루트 자동 생성 항목을 추가하지 않는 검증을 유지한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
