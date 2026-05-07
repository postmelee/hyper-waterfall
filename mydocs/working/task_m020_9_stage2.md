# task_m020_9_stage2.md - Hyper-Waterfall 버전 업데이트 PR 본문 구조 정의 단계 보고서

GitHub Issue: [#9](https://github.com/postmelee/hyper-waterfall/issues/9)
구현계획서: [`task_m020_9_impl.md`](../plans/task_m020_9_impl.md)
Stage: 2

## 단계 목적

Stage 2는 #8의 기존 업데이트 판단 결과와 migration guide를 Hyper-Waterfall 버전 업데이트 PR 본문에 어떻게 옮길지 정의하는 단계다. 별도 PR 템플릿을 만들지 않고 기존 `.github/pull_request_template.md`의 `요약`, `변경 내역`, `검증`, `검증 한계`, `남은 리스크` 구조를 재사용하는 방향으로 정리했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/agent-entrypoint.md` | Hyper-Waterfall 버전 업데이트 PR 본문 구조와 변경 분류 기준 추가 |
| `docs/migrations/README.md` | migration guide 섹션을 PR 본문 섹션으로 옮기는 매핑 추가 |
| `docs/migrations/v0.1.0-to-v0.2.0.md` | `v0.1.0 -> v0.2.0` migration 기준 PR 본문 반영 표 추가 |
| `templates/mydocs/manual/document_structure_guide.md` | Hyper-Waterfall 버전 업데이트 PR도 GitHub 플랫폼 산출물이므로 별도 `mydocs/_templates` 템플릿을 만들지 않는다고 명시 |
| `README.md` | 영문 단독 표현을 `Hyper-Waterfall 버전 업데이트 PR`로 보정 |
| `templates/mydocs/manual/git_workflow_guide.md` | Stage 1 산출물의 용어를 `Hyper-Waterfall 버전 업데이트 PR`로 보정 |
| `templates/mydocs/manual/task_workflow_guide.md` | Stage 1 산출물의 용어를 `Hyper-Waterfall 버전 업데이트 PR`로 보정 |
| `mydocs/plans/task_m020_9.md` | 수행계획서 용어를 `Hyper-Waterfall 버전 업데이트 PR`로 보정 |
| `mydocs/plans/task_m020_9_impl.md` | 구현계획서 용어와 검증 명령을 `Hyper-Waterfall 버전 업데이트 PR` 기준으로 보정 |
| `mydocs/working/task_m020_9_stage1.md` | Stage 1 보고서 용어를 `Hyper-Waterfall 버전 업데이트 PR`로 보정 |

## 본문 변경 정도 / 본문 무손실 여부

기존 PR 템플릿 파일은 수정하지 않았다. Stage 2는 PR 템플릿을 분기하지 않고, Hyper-Waterfall 버전 업데이트 PR이 기존 템플릿의 어느 섹션에 어떤 내용을 채워야 하는지 문서로 정의했다. Stage 1에서 만든 규칙은 유지하고 용어만 보정했다.

## 검증 결과

실행 명령:

```bash
grep -nE 'manifest diff|자동 적용 가능|수동 확인|conflict|보류|검증 한계|PR 본문' docs/agent-entrypoint.md docs/migrations/*.md templates/mydocs/manual/*.md templates/.github/pull_request_template.md
grep -nE '요약|변경 내역|자동 검증|수동/시나리오 검증|CI/원격 검증|남은 리스크' templates/.github/pull_request_template.md
rg -n 'update[ ]PR|Update[ ]PR' docs/agent-entrypoint.md docs/migrations templates/mydocs/manual README.md mydocs/plans/task_m020_9.md mydocs/plans/task_m020_9_impl.md mydocs/working/task_m020_9_stage1.md mydocs/working/task_m020_9_stage2.md
git diff --check
```

결과:

- OK: `docs/agent-entrypoint.md`에 PR 본문 섹션 매핑과 `자동 적용 가능`, `수동 확인 필요`, `conflict`, `보류` 분류 기준이 추가됐다.
- OK: `docs/migrations/README.md`에 migration guide 섹션을 PR 본문 반영 위치로 옮기는 표가 추가됐다.
- OK: `docs/migrations/v0.1.0-to-v0.2.0.md`에 이번 migration의 현재 version, 목표 release/tag, manifest diff, 자동 적용 가능, 수동 확인 필요, conflict, 보류 항목 표가 추가됐다.
- OK: `.github/pull_request_template.md`는 기존 `요약`, `변경 내역`, `자동 검증`, `수동/시나리오 검증`, `CI/원격 검증`, `검증 한계`, `남은 리스크` 구조를 이미 제공하므로 수정하지 않았다.
- OK: 영문 단독 표현은 현재 작업 대상 문서에서 검색되지 않았다.
- OK: `git diff --check` 출력 없음.

## 잔여 위험

- README와 migration guide의 사용자용 짧은 흐름 연결은 아직 Stage 3에서 한 번 더 정리해야 한다.
- 후속 #10 CLI가 실제로 어떤 명령 출력과 PR 생성 입력을 만들지는 아직 구현하지 않았다.

## 다음 단계 영향

- Stage 3는 이번 단계의 본문 구조를 README와 migration guide에 짧게 연결하고, CLI `update`/`doctor`가 재사용할 출력 필드를 정리한다.
- PR 템플릿 분기는 현재 필요하지 않다는 판단을 최종 보고서와 PR 본문에 남길 수 있다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 `README/migration guide 연결과 CLI 기준 정리`로 진행한다.
