# Framework Lifecycle 작업 가이드

이 문서는 Hyper-Waterfall 방법론 자체를 새 저장소에 설치하거나 기존 적용 저장소를 새 version으로 업데이트할 때의 판단 기준과 일반 task 전환 규칙을 정의한다. 일반 기능 task의 단계 진행 절차는 `task_workflow_guide.md`를 따른다.

## 적용 시점

- 대상 저장소에 Hyper-Waterfall을 처음 적용할 때
- 이미 적용된 저장소를 새 GitHub Release/tag 기준으로 업데이트할 때
- npm CLI, plugin, agent prompt가 lifecycle 판단 결과를 출력하고 실제 파일 변경으로 전환할 때
- Hyper-Waterfall 버전 업데이트 PR 후보를 일반 task로 추적해야 할 때

## Core Skill 경계

여기서 core Skill은 이슈, 브랜치, 계획서, 단계 보고, 최종 보고, PR 게시, merge 후 정리처럼 하이퍼-워터폴 타스크 진행 시점에 직접 쓰이는 Skill을 뜻한다.

설치·업데이트 lifecycle은 core Skill 목록을 늘리지 않는다. 먼저 `docs/agent-entrypoint.md`, release manifest, version 기록, migration guide를 기준으로 판단한 뒤, 실제 변경은 일반 타스크 흐름으로 수행한다.

## 판단 기준 문서

| 작업 | 기준 문서 |
|---|---|
| 신규 적용 | `docs/agent-entrypoint.md`, `docs/lifecycle/adoption.md`, `templates/manifest.json` |
| 기존 업데이트 | `docs/agent-entrypoint.md`, `docs/lifecycle/update.md`, `.hyper-waterfall/version.json`, 목표 release manifest, `docs/migrations/` |
| 업데이트 PR 전환 | `docs/lifecycle/update_pr.md`, `.github/pull_request_template.md` |
| release/tag protocol | `release_update_protocol.md` |

## 파일 변경 전 판단

Lifecycle 판단 결과는 파일 변경 전 보고다. 신규 적용이나 기존 업데이트 모두 다음 정보를 먼저 작업지시자에게 제시하고 승인을 받아야 한다.

- 대상 저장소
- 목표 release/tag
- 현재 version (기존 업데이트)
- 현재 locale (기존 업데이트)
- 목표 release locale 지원
- manifest diff
- locale manifest diff
- locale 보존/전환 판단
- 자동 적용 가능 항목
- 수동 확인 필요 항목
- conflict 항목
- Hyper-Waterfall 버전 업데이트 PR 후보
- 승인 요청

기존 사용자 수정 파일이 감지되면 즉시 덮어쓰지 않는다. manifest와 migration guide로 자동 적용 가능 항목, 수동 확인 필요 항목, conflict 항목을 구분한 뒤 작업지시자 승인을 받는다.

## 일반 task 흐름 전환

판단 결과가 승인되면 다음처럼 일반 타스크 흐름으로 전환한다.

1. 이슈가 없으면 `task-register`로 lifecycle 반영 이슈를 먼저 등록한다.
2. 이미 이슈가 있으면 `task-start`로 브랜치, 오늘할일, 수행계획서를 만든다.
3. Hyper-Waterfall 버전 업데이트 PR 후보가 여러 묶음이면 작업지시자 승인에 따라 이슈 또는 Stage를 분리한다.
4. 승인 전에는 manifest diff에 포함된 파일을 실제 대상 저장소에 적용하지 않는다.

## Hyper-Waterfall 버전 업데이트 PR 명명 규칙

- 작업 브랜치: `local/task{issue번호}`
- PR 게시 브랜치: `publish/task{issue번호}`
- 커밋 메시지: `Task #{issue번호}: Hyper-Waterfall {fromVersion} -> {toVersion} 버전 업데이트`
- 단계 커밋: `Task #{issue번호} Stage {N}: Hyper-Waterfall 버전 업데이트 {내용}`
- PR 제목: `Task #{issue번호}: Hyper-Waterfall {fromVersion} -> {toVersion} 버전 업데이트`

Hyper-Waterfall 버전 업데이트 PR은 release PR과 다르다. Release PR은 프레임워크 저장소의 `{BASE_BRANCH}` 변경을 `{RELEASE_BRANCH}`로 승격해 tag 기준을 만드는 작업이고, Hyper-Waterfall 버전 업데이트 PR은 이미 적용된 저장소가 그 release/tag를 따라가도록 변경 후보를 리뷰하는 작업이다.

Hyper-Waterfall 버전 업데이트 PR은 일반 task PR과 같은 승인 게이트, 계획서, 단계 보고서, 최종 보고서를 사용한다.

## README와 CLI 경계

README는 신규 적용 프롬프트와 확정된 업데이트 프롬프트 또는 CLI 명령처럼 사용자가 복사할 짧은 진입 안내만 둔다. 상세 lifecycle 판단 기준은 `docs/agent-entrypoint.md`, `docs/lifecycle/`, `docs/migrations/`를 우선한다.

CLI가 `update`나 `doctor` 결과를 만들더라도 이 결과는 파일 변경 전 판단 보고다. CLI 출력은 현재 version, 현재 locale, 목표 release/tag, 목표 release locale 지원, migration guide, manifest diff, locale manifest diff, 자동 적용 가능, 수동 확인 필요, conflict, 보류, 검증, 승인 요청을 포함해야 하며, 승인 전에는 파일을 실제 대상 저장소에 적용하지 않는다.

## 관련 문서

- `docs/agent-entrypoint.md`: AI coding tool의 첫 진입점.
- `docs/lifecycle/adoption.md`: 신규 적용 절차와 판단 결과 형식.
- `docs/lifecycle/update.md`: 기존 적용 저장소 업데이트 판단.
- `docs/lifecycle/update_pr.md`: 업데이트 판단 결과를 PR로 전환하는 기준.
- `release_update_protocol.md`: release/tag와 update protocol.
- `task_workflow_guide.md`: 승인 후 일반 task 진행 절차.
