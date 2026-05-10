# Task #44 Stage 1 완료 보고서

GitHub Issue: [#44](https://github.com/postmelee/hyper-waterfall/issues/44)
구현계획서: [`task_m040_44_impl.md`](../plans/task_m040_44_impl.md)
Stage: 1

## 단계 목적

Stage 1의 목적은 `templates/mydocs/manual/document_structure_guide.md`에 manual 문서 중립성 정책을 추가해, manual 본문이 반복 적용 가능한 원칙과 절차를 담고 특정 사건 기록은 적절한 산출물 위치로 분리하도록 기준을 세우는 것이다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/mydocs/manual/document_structure_guide.md` | 폴더 역할 표 뒤에 `manual 문서 중립성 정책` 섹션 추가. manual에 둘 내용, 분리할 내용, 분리 위치, 특정 사건 문서 링크 방식 정리 |
| `mydocs/working/task_m040_44_stage1.md` | Stage 1 완료 보고서 추가 |

## 본문 변경 정도 / 본문 무손실 여부

기존 문단은 삭제하거나 재작성하지 않았다. `폴더 역할 (엄격 준수)` 표와 `중앙 템플릿 정책` 사이에 신규 정책 섹션만 추가했다.

원문 PR의 취지는 반영하되, 본 저장소 구조와 맞지 않는 `mydocs/release/` 경로와 macOS 앱 특화 사례는 넣지 않았다. 릴리즈와 migration 관련 분리 위치는 현재 저장소 구조인 `docs/releases/`, `docs/migrations/` 기준으로 일반화했다.

## 검증 결과

실행 명령:

```bash
rg -n 'Manual 문서|manual|중립|특정 이슈|특정 PR|docs/releases|docs/migrations|mydocs/working|mydocs/report|mydocs/tech|mydocs/troubleshootings' templates/mydocs/manual/document_structure_guide.md
! rg -n 'mydocs/release|notarization|deprecation warning' templates/mydocs/manual/document_structure_guide.md
git diff --check
```

결과:

- OK: 첫 번째 `rg`가 신규 정책 섹션과 분리 위치 항목을 확인했다.
- OK: 금지 경로와 특화 사례 검색은 매칭 없이 통과했다.
- OK: `git diff --check`가 경고 없이 통과했다.

## 잔여 위험

- README와 `task_workflow_guide.md`가 새 정책을 길게 복제하지 않으면서도 충분히 연결되는지는 Stage 2에서 확인해야 한다.
- `AGENTS.md`에는 상세 정책을 추가하지 않는 방향이 맞지만, 기존 필수 참조 문서 인덱스가 충분한지는 Stage 2에서 다시 확인한다.

## 다음 단계 영향

- Stage 2는 README와 관련 manual에서 새 정책과 충돌하거나 중복되는 문구가 있는지 확인한다.
- 관련 문서 수정이 필요 없으면 Stage 2 보고서에 무수정 판단 근거를 남긴다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
