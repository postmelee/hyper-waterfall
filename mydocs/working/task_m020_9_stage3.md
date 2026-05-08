# task_m020_9_stage3.md - README와 migration guide Hyper-Waterfall 버전 업데이트 PR 연결 단계 보고서

GitHub Issue: [#9](https://github.com/postmelee/hyper-waterfall/issues/9)
구현계획서: [`task_m020_9_impl.md`](../plans/task_m020_9_impl.md)
Stage: 3

## 단계 목적

Stage 3는 README의 업데이트 안내를 짧은 사용자 진입 안내로 유지하면서, 상세 기준을 migration guide와 Manual에 연결하는 단계다. 후속 CLI가 `update`/`doctor`에서 같은 판단 결과를 출력할 수 있도록 필드 기준을 문서화했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | 기존 적용 저장소 업데이트가 승인된 범위만 일반 task 흐름으로 진행되며, 향후 CLI는 같은 판단 결과를 출력한다고 짧게 보정 |
| `docs/migrations/README.md` | `update`/`doctor`가 출력해야 할 판단 결과 필드 표 추가 |
| `docs/migrations/v0.1.0-to-v0.2.0.md` | `v0.1.0 -> v0.2.0` 기준 CLI 출력 항목 표 추가 |
| `templates/mydocs/manual/document_structure_guide.md` | CLI 출력 항목도 migration guide, manifest, version 기록 기준을 따른다고 명시 |
| `templates/mydocs/manual/git_workflow_guide.md` | CLI나 자동화가 PR 후보를 만들더라도 이슈 번호 승인 뒤 기존 브랜치 규칙을 따른다고 보강 |
| `templates/mydocs/manual/task_workflow_guide.md` | CLI 결과는 파일 변경 전 판단 보고이며 승인 전 파일 적용 금지라고 명시 |
| `mydocs/plans/task_m020_9.md` | 폐기된 구현 방식 표현 검증 명령을 중립 패턴으로 보정 |
| `mydocs/working/task_m020_9_stage1.md` | Stage 1 보고서의 검증 명령을 중립 패턴으로 보정 |

## 본문 변경 정도 / 본문 무손실 여부

README는 새 목차나 긴 절차를 추가하지 않고 기존 한 문단만 보정했다. Migration guide와 Manual은 Stage 1~2의 규칙을 대체하지 않고, 후속 CLI 출력 기준을 추가하는 방식으로 확장했다.

## 검증 결과

실행 명령:

```bash
grep -nE 'Hyper-Waterfall 버전 업데이트 PR|migration|version|manifest diff|CLI|doctor|update' README.md docs/migrations/*.md templates/mydocs/manual/*.md
rg -n 'Skill workflow|Skill이 아직 없을 때|폐기된 예정 구현|별도 유지보수 절차명' README.md docs templates/mydocs/manual templates/mydocs/skills
rg -n 'update[ ]PR|Update[ ]PR|Hyper-Waterfall[ ]update|framework-(install|update)|전용[ ]Skill|후속[ ]Skill' README.md docs templates/mydocs/manual mydocs/plans/task_m020_9.md mydocs/plans/task_m020_9_impl.md mydocs/working/task_m020_9_stage1.md mydocs/working/task_m020_9_stage2.md
git diff --check
```

결과:

- OK: README에 Hyper-Waterfall 버전 업데이트 PR 후보 보고와 향후 CLI `update`/`doctor` 출력 관계가 짧게 연결됐다.
- OK: `docs/migrations/README.md`에 `현재 version`, `목표 release/tag`, `migration guide`, `manifest diff`, `자동 적용 가능`, `수동 확인 필요`, `conflict`, `보류`, `검증`, `승인 요청` 출력 기준이 추가됐다.
- OK: `docs/migrations/v0.1.0-to-v0.2.0.md`에 이번 migration 기준 CLI 출력 항목이 추가됐다.
- OK: Manual에서 CLI가 판단 결과를 출력하더라도 승인 전 실제 파일을 적용하지 않고, 승인된 이슈 번호 뒤 기존 브랜치 규칙을 따른다는 점이 확인됐다.
- OK: 폐기된 예정 구현 방식처럼 읽힐 수 있는 표현은 README, docs, templates 대상에서 검색되지 않았다.
- OK: 단독 영문 표현과 이전 구현명 표현은 현재 작업 대상 문서에서 검색되지 않았다.
- OK: `git diff --check` 출력 없음.

## 잔여 위험

- #10 CLI가 실제 명령 출력과 PR 본문 생성을 어떻게 구현할지는 후속 이슈 범위다.
- 실제 `v0.2.0` GitHub Release/tag 생성은 아직 수행하지 않았다.

## 다음 단계 영향

- 모든 계획된 Stage가 끝났으므로, 승인되면 최종 보고서 작성과 PR 게시 단계로 진행한다.
- 최종 PR 본문에서는 PR 템플릿을 새로 만들지 않고 기존 템플릿 재사용으로 충분하다는 판단을 요약하면 된다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 최종 보고서 작성과 PR 게시 절차로 진행한다.
