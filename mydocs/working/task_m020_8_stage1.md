# task_m020_8_stage1.md - lifecycle 경계와 기존 표현 정리 단계 보고서

GitHub Issue: [#8](https://github.com/postmelee/hyper-waterfall/issues/8)
구현계획서: [`task_m020_8_impl.md`](../plans/task_m020_8_impl.md)
Stage: 1

## 단계 목적

Stage 1은 Hyper-Waterfall 설치·업데이트를 core Skill 추가 작업처럼 설명하던 문구를 제거하고, release manifest, version 기록, migration guide를 기준으로 판단하는 framework lifecycle 프로토콜로 경계를 정리하는 단계다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/agent-entrypoint.md` | 특정 설치·업데이트 Skill 예정 문구를 제거하고, agent entrypoint가 framework lifecycle 진입점임을 명시 |
| `templates/mydocs/manual/task_workflow_guide.md` | "프레임워크 설치와 업데이트 작업"을 "프레임워크 lifecycle 작업"으로 조정하고 core Skill의 범위와 lifecycle 판단 경계를 설명 |
| `templates/mydocs/manual/document_structure_guide.md` | `.hyper-waterfall/version.json` 설명에서 후속 Skill 표현을 제거하고 version, manifest, migration guide 비교 기준으로 정리 |

## 본문 변경 정도 / 본문 무손실 여부

기존 절차 문서의 구조와 기존 타스크 진행 절차는 유지했다. 변경 범위는 설치·업데이트를 특정 후속 Skill로 예고하던 문장과 그 주변 설명에 한정했다.

## 검증 결과

실행 명령:

```bash
rg -n 'framework-install|framework-update|후속 Skill|Skill workflow|전담 Skill|Skill이 아직 없을 때' docs/agent-entrypoint.md templates/mydocs/manual/task_workflow_guide.md templates/mydocs/manual/document_structure_guide.md
rg -n 'framework-install|framework-update|후속 Skill|Skill workflow|전담 Skill|Skill이 아직 없을 때' README.md docs templates/mydocs/manual templates/mydocs/skills
grep -nE 'lifecycle|core Skill|manifest|version|migration' docs/agent-entrypoint.md templates/mydocs/manual/task_workflow_guide.md templates/mydocs/manual/document_structure_guide.md
git diff --check
```

결과:

- OK: Stage 1 대상 파일 3개에서는 `framework-install`, `framework-update`, `후속 Skill`, `Skill workflow`, `전담 Skill`, `Skill이 아직 없을 때` 검색 결과가 없었다.
- OK: 전체 검색에서 남은 오래된 Skill 표현은 `docs/migrations/README.md`, `docs/migrations/v0.1.0-to-v0.2.0.md`에만 있었다. 두 파일은 구현계획서상 Stage 3 대상이므로 이번 Stage 잔여 범위로 분리했다.
- OK: `lifecycle`, `core Skill`, `manifest`, `version`, `migration` 기준 표현이 `docs/agent-entrypoint.md`, `task_workflow_guide.md`, `document_structure_guide.md`에 반영됐다.
- OK: `git diff --check` 출력 없음.

## 잔여 위험

- `docs/migrations/README.md`, `docs/migrations/v0.1.0-to-v0.2.0.md`에는 아직 `framework-install`, `framework-update` 표현이 남아 있다. 이는 Stage 3에서 migration guide 연결을 보정할 때 제거한다.
- 신규 적용/기존 업데이트 판단 결과의 구체 출력 형식은 아직 정의하지 않았다. 이는 Stage 2 범위다.

## 다음 단계 영향

- Stage 2는 이번 단계에서 정리한 "core Skill은 타스크 진행 Skill"이라는 경계를 기준으로 신규 적용/기존 업데이트 판단 결과 형식을 정의한다.
- Stage 3는 README와 migration guide에서 남은 오래된 설치·업데이트 Skill 표현을 lifecycle, update PR, CLI 흐름에 맞게 보정한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 `신규 적용/기존 업데이트 판단 결과 형식 정의`로 진행한다.
