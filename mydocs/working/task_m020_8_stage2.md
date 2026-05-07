# task_m020_8_stage2.md - 신규 적용/기존 업데이트 판단 결과 형식 정의 단계 보고서

GitHub Issue: [#8](https://github.com/postmelee/hyper-waterfall/issues/8)
구현계획서: [`task_m020_8_impl.md`](../plans/task_m020_8_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Hyper-Waterfall framework lifecycle에서 파일 변경 전에 에이전트가 제시해야 하는 신규 적용 판단 결과와 기존 업데이트 판단 결과의 출력 형식을 고정하는 단계다. 설치·업데이트 전용 Skill을 만들지 않고 `docs/agent-entrypoint.md`와 Manual에 판단 기준을 문서화하는 것이 목적이다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/agent-entrypoint.md` | "신규 적용 판단 결과 형식"과 "기존 업데이트 판단 결과 형식"을 추가하고 승인 전 출력 필드를 정의 |
| `templates/mydocs/manual/task_workflow_guide.md` | lifecycle 판단 결과가 승인되면 일반 타스크 흐름으로 전환하는 기준과 이슈/Stage 분리 기준을 추가 |
| `templates/mydocs/manual/document_structure_guide.md` | lifecycle 판단 결과가 `mydocs/` 장기 보관 템플릿이 아니라 적용 전 보고 형식임을 명시 |

## 본문 변경 정도 / 본문 무손실 여부

기존 절차와 폴더 정책은 유지했다. 새 섹션과 보강 문단만 추가했으며, Stage 1에서 정리한 core Skill 경계를 바꾸지 않았다.

## 검증 결과

실행 명령:

```bash
grep -nE '판단 결과|체크리스트|대상 저장소|목표 release|현재 version|manifest diff|자동 적용 가능|수동 확인|conflict|update PR 후보' docs/agent-entrypoint.md templates/mydocs/manual/*.md
test ! -e templates/mydocs/skills/framework-install
test ! -e templates/mydocs/skills/framework-update
find templates/mydocs/skills -maxdepth 2 -name SKILL.md | sort
git diff --check
```

결과:

- OK: `docs/agent-entrypoint.md`에 신규 적용과 기존 업데이트 판단 결과 형식이 추가됐고, `대상 저장소`, `목표 release/tag`, `현재 version`, `manifest diff`, `자동 적용 가능`, `수동 확인 필요`, `conflict`, `update PR 후보`, `placeholder 체크리스트`가 검색됐다.
- OK: `task_workflow_guide.md`와 `document_structure_guide.md`에 판단 결과 형식의 참조 위치와 일반 타스크 전환 기준이 검색됐다.
- OK: `templates/mydocs/skills/framework-install`, `templates/mydocs/skills/framework-update` 폴더가 존재하지 않는다.
- OK: 기존 Skill 목록은 `external-pr-review`, `pr-merge-cleanup`, `task-final-report`, `task-register`, `task-stage-report`, `task-start`, `todo`만 확인됐다.
- OK: `git diff --check` 출력 없음.

## 잔여 위험

- README와 migration guide에는 아직 Stage 3에서 정리할 lifecycle/update PR/CLI 연결 표현이 남아 있다.
- update PR 워크플로우의 세부 PR 생성 절차는 #9 범위로 남겼다.
- CLI의 `init/update/doctor` 출력 구현은 #10 범위로 남겼다.

## 다음 단계 영향

- Stage 3는 이번 단계에서 고정한 판단 결과 형식을 README와 migration guide에서 참조할 수 있도록 연결한다.
- #9는 `기존 업데이트 판단 결과 형식`의 `update PR 후보`를 PR workflow 설계 입력으로 사용할 수 있다.
- #10은 신규 적용/기존 업데이트 판단 결과 필드를 CLI 출력 기준으로 재사용할 수 있다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 `README와 migration guide 연결 보정`으로 진행한다.
