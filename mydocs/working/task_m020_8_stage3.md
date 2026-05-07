# task_m020_8_stage3.md - README와 migration guide 연결 보정 단계 보고서

GitHub Issue: [#8](https://github.com/postmelee/hyper-waterfall/issues/8)
구현계획서: [`task_m020_8_impl.md`](../plans/task_m020_8_impl.md)
Stage: 3

## 단계 목적

Stage 3는 README의 설치·업데이트 설명을 짧은 사용자 진입 안내로 유지하면서, 상세 lifecycle 판단 기준은 `docs/agent-entrypoint.md`, `docs/migrations/`, Manual이 맡도록 연결을 보정하는 단계다. 또한 migration guide에 남아 있던 설치·업데이트 전용 Skill 예정 표현을 제거한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | 기존 적용 저장소 업데이트가 현재 version, 목표 release/tag, manifest diff, update PR 후보를 먼저 보고하는 lifecycle 흐름임을 짧게 안내 |
| `docs/migrations/README.md` | migration guide를 lifecycle 판단 결과, update PR 리뷰, 향후 CLI 출력의 근거 문서로 재정의 |
| `docs/migrations/v0.1.0-to-v0.2.0.md` | `framework-install`/`framework-update` 예정 Skill 표현을 제거하고 lifecycle, update PR workflow, npm CLI 기준으로 후속 작업 정리 |
| `templates/mydocs/manual/task_workflow_guide.md` | README는 짧은 진입 안내만 두고 상세 판단 기준은 agent entrypoint와 migration guide를 우선한다는 경계 추가 |
| `templates/mydocs/manual/document_structure_guide.md` | migration guide가 README와 agent entrypoint 판단 결과 형식 사이를 잇는 상세 근거 문서임을 명시 |

## 본문 변경 정도 / 본문 무손실 여부

기존 README 구조와 핵심 SKILL 설명은 유지했다. 새 목차나 긴 배포 섹션을 추가하지 않고 기존 문단 두 곳만 보강했다. Migration guide는 오래된 후속 Skill 표현과 Stage 예정 표현을 lifecycle/update PR/CLI 용어로 치환했다.

## 검증 결과

실행 명령:

```bash
grep -nE 'lifecycle|update PR|manifest diff|migration|version|CLI' README.md docs/migrations/*.md templates/mydocs/manual/*.md
rg -n 'framework-install|framework-update|후속 Skill|Skill workflow|Skill이 아직 없을 때' README.md docs templates/mydocs/manual templates/mydocs/skills
test ! -e templates/mydocs/skills/framework-install
test ! -e templates/mydocs/skills/framework-update
find templates/mydocs/skills -maxdepth 2 -name SKILL.md | sort
git diff --check
```

결과:

- OK: README, migration guide, Manual에서 `lifecycle`, `update PR`, `manifest diff`, `migration`, `version`, `CLI` 연결 표현이 검색됐다.
- OK: `framework-install`, `framework-update`, `후속 Skill`, `Skill workflow`, `Skill이 아직 없을 때`는 `README.md`, `docs/`, `templates/mydocs/manual`, `templates/mydocs/skills`에서 검색 결과가 없었다.
- OK: `templates/mydocs/skills/framework-install`, `templates/mydocs/skills/framework-update` 폴더가 존재하지 않는다.
- OK: 기존 Skill 목록은 `external-pr-review`, `pr-merge-cleanup`, `task-final-report`, `task-register`, `task-stage-report`, `task-start`, `todo`만 확인됐다.
- OK: `git diff --check` 출력 없음.

## 잔여 위험

- update PR workflow의 세부 본문 구성과 생성 절차는 #9 범위다.
- npm CLI `init/update/doctor` 명령의 실제 인터페이스와 검증은 #10 범위다.
- 실제 `v0.2.0` GitHub Release/tag 생성은 M020 산출물 안정화 후 별도 승인으로 수행해야 한다.

## 다음 단계 영향

- 이번 task의 모든 구현 Stage가 완료됐으므로 다음 승인을 받으면 최종 결과보고서와 PR 게시 절차로 전환한다.
- #9는 migration guide의 수동 확인/충돌 가능성 섹션과 `docs/agent-entrypoint.md`의 기존 업데이트 판단 결과 형식을 update PR workflow 입력으로 사용한다.
- #10은 README가 아니라 manifest, version 기록, migration guide를 CLI 기준으로 삼아야 한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 최종 결과보고서 작성과 PR 게시 준비로 진행한다.
