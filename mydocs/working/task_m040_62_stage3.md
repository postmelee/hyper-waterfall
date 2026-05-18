# Task M040 #62 Stage 3 완료 보고서

GitHub Issue: [#62](https://github.com/postmelee/hyper-waterfall/issues/62)
구현계획서: [`task_m040_62_impl.md`](../plans/task_m040_62_impl.md)
Stage: 3

## 단계 목적

`task_workflow_guide.md`, `git_workflow_guide.md`, `docs/agent-entrypoint.md`에 섞여 있던 framework lifecycle, release/update protocol, 신규 적용, 기존 업데이트, 업데이트 PR 전환 규칙을 역할별 문서로 분리한다. 기존 문서는 entrypoint와 요약 링크 중심으로 축소한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/mydocs/manual/framework_lifecycle_guide.md` | lifecycle 판단, core Skill 경계, 일반 task 전환, 업데이트 PR 명명 규칙 분리 |
| `templates/mydocs/manual/release_update_protocol.md` | GitHub Release/tag 기준, release PR, update protocol, 업데이트 PR 커밋 규칙 분리 |
| `docs/lifecycle/adoption.md` | 신규 적용 절차, strict manifest 범위, 판단 결과 형식 분리 |
| `docs/lifecycle/update.md` | 기존 업데이트 진입 절차, manifest diff 분류, 판단 결과 형식 분리 |
| `docs/lifecycle/update_pr.md` | Hyper-Waterfall 버전 업데이트 PR 전환 조건, 본문 구조, 변경 분류 기준 분리 |
| `docs/agent-entrypoint.md` | AI 첫 진입점과 세부 lifecycle 문서 링크 중심으로 축소 |
| `templates/mydocs/manual/task_workflow_guide.md` | 일반 task 흐름만 남기고 lifecycle 상세를 `framework_lifecycle_guide.md`로 연결 |
| `templates/mydocs/manual/git_workflow_guide.md` | 브랜치 흐름과 PR 유형 요약만 남기고 release/update 상세와 PR 링크 규칙을 분리 |
| `templates/mydocs/manual/document_structure_guide.md` | 배포 manifest와 version 기록 정책을 유지하되 세부 lifecycle 판단 문서 링크 추가 |
| `docs/migrations/README.md` | 기존 업데이트 판단과 업데이트 PR 본문 기준을 `docs/lifecycle/` 문서로 연결 |
| `docs/plugin-distribution-principles.md` | plugin 배포 원칙의 lifecycle 판단 참조를 `docs/lifecycle/` 구조로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

`task_workflow_guide.md`의 framework lifecycle 상세는 `framework_lifecycle_guide.md`로 이동했다. 신규 적용, 기존 업데이트, manifest diff, 업데이트 PR 전환 기준은 `docs/lifecycle/adoption.md`, `docs/lifecycle/update.md`, `docs/lifecycle/update_pr.md`로 분리했다.

`git_workflow_guide.md`의 release/tag와 update protocol 상세는 `release_update_protocol.md`로 이동했고, PR 본문 문서 링크 규칙은 Stage 2의 `pr_command_guide.md`로 단일화했다. 기존 `git_workflow_guide.md`에는 브랜치 흐름, PR 유형, maintainer/contributor 명령, FAQ entrypoint만 남겼다.

`docs/agent-entrypoint.md`는 세부 절차 본문을 줄이고 lifecycle 문서 선택 표와 공통 진행 순서만 남겼다. `docs/migrations/README.md`와 `docs/plugin-distribution-principles.md`는 새 분산 구조를 가리키도록 링크성 문장만 보정했다.

## 검증 결과

실행 명령:

```bash
rg -n "framework lifecycle|신규 적용|기존 업데이트|manifest diff|Hyper-Waterfall 버전 업데이트 PR" docs/lifecycle docs/agent-entrypoint.md templates/mydocs/manual/framework_lifecycle_guide.md
rg -n "Release/tag|update protocol|release PR|Hyper-Waterfall 버전 업데이트 PR" templates/mydocs/manual/release_update_protocol.md templates/mydocs/manual/git_workflow_guide.md
rg -n "docs/lifecycle|framework_lifecycle_guide|release_update_protocol" README.md docs/agent-entrypoint.md templates/mydocs/manual
git diff --check
```

결과:

- OK: 신규 적용, 기존 업데이트, manifest diff, Hyper-Waterfall 버전 업데이트 PR 키워드가 `docs/lifecycle/`, `docs/agent-entrypoint.md`, `framework_lifecycle_guide.md`에서 확인됐다.
- OK: Release/tag, update protocol, release PR, Hyper-Waterfall 버전 업데이트 PR 키워드가 `release_update_protocol.md`와 `git_workflow_guide.md`에서 확인됐다.
- OK: `docs/lifecycle`, `framework_lifecycle_guide`, `release_update_protocol` 참조가 entrypoint와 manual 문서에 연결됐다.
- OK: `git diff --check` 경고 없음.

## 잔여 위험

- README는 아직 기존 `docs/agent-entrypoint.md` 중심 설명을 일부 유지한다. Stage 4에서 README의 lifecycle 링크와 설명을 새 문서 구조에 맞춘다.
- `templates/manifest.json`은 아직 `docs/lifecycle/` 신규 문서 포함 여부를 확인하지 않았다. Stage 4에서 manifest와 배포 대상 정합성을 확인한다.
- 과거 release 기록 문서에는 당시 기준의 `docs/agent-entrypoint.md` 표현이 남아 있다. 이 문서는 역사적 기록이므로 Stage 3에서는 수정하지 않았다.

## 다음 단계 영향

- Stage 4에서 README의 "도입 후 작업 흐름", 업데이트 안내, 프롬프트 가이드 설명을 `docs/lifecycle/`와 새 manual 문서 기준으로 맞춰야 한다.
- Stage 4에서 `templates/manifest.json`이 `docs/lifecycle/*.md`를 포함해야 하는지 판단하고 반영해야 한다.
- Stage 4에서 이전 Stage에서 남은 `pr_process_guide.md#내부-task-pr-작성-규칙` 같은 오래된 링크도 함께 정리한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4 README, manifest, 링크 정합성 갱신으로 진행한다.
