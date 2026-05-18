# 기존 업데이트 Lifecycle 가이드

이 문서는 Hyper-Waterfall이 이미 적용된 저장소를 새 GitHub Release/tag 기준으로 업데이트할 때의 판단 절차와 결과 형식을 정의한다.

## 진입 조건

- 대상 저장소에 `.hyper-waterfall/version.json`이 존재한다.
- 목표 GitHub Release/tag가 정해졌거나 후보가 있다.
- 목표 release의 `templates/manifest.json`과 관련 `docs/migrations/` 문서를 확인할 수 있다.

## 업데이트 진입 절차

1. 대상 저장소의 `.hyper-waterfall/version.json` 존재 여부와 현재 version 확인
2. 목표 GitHub Release/tag의 `templates/manifest.json` 확인
3. 현재 version에서 목표 version으로 가는 `docs/migrations/v{from}-to-v{to}.md` 확인
4. manifest diff를 기준으로 자동 적용 가능, 수동 확인 필요, 충돌 가능 항목 분류
5. 사용자 수정 파일은 덮어쓰지 않고 Hyper-Waterfall 버전 업데이트 PR 후보로 정리
6. 작업지시자 승인 후 별도 이슈와 브랜치에서 업데이트 진행

## 분류 기준

- 자동 적용 가능: 이전 manifest checksum과 대상 파일이 일치하고 update policy상 자동 반영이 허용되는 항목
- 수동 확인 필요: update policy가 `merge`, `manual`, `preserve`이거나 프로젝트별 운영 규칙이 섞일 수 있는 항목
- conflict: 대상 저장소 수정과 목표 release 변경이 같은 파일 또는 같은 링크 경로에서 충돌할 가능성이 있는 항목
- 보류: 이번 변경에서 다루지 않고 별도 이슈, 별도 PR, 또는 maintainer 수동 작업으로 넘기는 항목

사용자 수정 파일은 자동 적용 가능 항목에 넣지 않는다. 판단 결과에는 해당 파일을 수동 확인 필요 또는 conflict로 남기고 근거를 적는다.

## 기존 업데이트 판단 결과 형식

기존 적용 저장소 업데이트는 파일을 변경하기 전에 다음 판단 결과를 먼저 제시하고, 승인된 범위만 별도 이슈와 브랜치에서 진행한다.

- 대상 저장소: 업데이트할 저장소 루트와 기준 브랜치
- 현재 version: 대상 저장소의 `.hyper-waterfall/version.json`에 기록된 version, release, appliedAt
- 목표 release/tag: 적용하려는 Hyper-Waterfall GitHub Release 또는 tag
- migration guide: 현재 version에서 목표 version으로 이동할 때 읽어야 하는 `docs/migrations/v{from}-to-v{to}.md`
- manifest diff: 현재 적용 기준과 목표 release manifest 사이의 추가, 변경, 삭제, symlink 차이 요약
- 자동 적용 가능: checksum 일치, 사용자 수정 없음, update policy상 자동 반영 가능한 항목
- 수동 확인 필요: update policy가 `merge`, `manual`, `preserve`이거나 사용자 판단이 필요한 항목
- conflict: 대상 저장소 수정과 목표 release 변경이 충돌할 가능성이 있어 직접 덮어쓰면 안 되는 항목
- Hyper-Waterfall 버전 업데이트 PR 후보: 승인 후 별도 PR로 만들 변경 묶음, 검증 항목, 남은 리스크
- 작업지시자 승인 요청: 자동 적용, 수동 확인, conflict 처리, Hyper-Waterfall 버전 업데이트 PR 생성 여부

## CLI 출력 계약

CLI가 `update`나 `doctor` 결과를 출력하더라도 이 결과는 파일 변경 전 판단 보고다. 출력 항목은 현재 version, 목표 release/tag, migration guide, manifest diff, 자동 적용 가능, 수동 확인 필요, conflict, 보류, 검증, 승인 요청을 포함해야 한다.

승인 전에는 manifest diff에 포함된 파일을 실제 대상 저장소에 적용하지 않는다.

## 관련 문서

- `docs/agent-entrypoint.md`: lifecycle 진입점.
- `docs/lifecycle/update_pr.md`: 승인된 업데이트 후보를 PR로 전환하는 기준.
- `docs/migrations/README.md`: migration guide 작성 규칙.
- `templates/mydocs/manual/release_update_protocol.md`: release/tag와 update protocol.
