# 기존 업데이트 Lifecycle 가이드

이 문서는 Hyper-Waterfall이 이미 적용된 저장소를 새 GitHub Release/tag 기준으로 업데이트할 때의 판단 절차와 결과 형식을 정의한다.

## 진입 조건

- 대상 저장소에 `.hyper-waterfall/version.json`이 존재한다.
- 목표 GitHub Release/tag가 정해졌거나 후보가 있다.
- 목표 release의 `templates/manifest.json`과 관련 `docs/migrations/` 문서를 확인할 수 있다.
- 목표 release의 `templates/manifest.json`에 `localization`이 있으면 지원 locale, 기본 locale, fallback locale, 기존 locale 보존 기준을 확인할 수 있다.
- 현재 적용 저장소의 `.hyper-waterfall/version.json`에 top-level `locale` 기록이 있으면 그 값을 확인한다. 기존 적용 저장소 호환을 위해 `selectedLocale`, `localization.locale`, `localization.selectedLocale`도 읽기 후보로 볼 수 있다. 어떤 기록도 없으면 `unknown`으로 보고한다.

## 업데이트 진입 절차

1. 대상 저장소의 `.hyper-waterfall/version.json` 존재 여부와 현재 version 확인
2. 현재 locale 기록이 있으면 확인하고, 없으면 `unknown`으로 분류
3. 목표 GitHub Release/tag의 `templates/manifest.json`과 `localization` 계약 확인
4. 현재 version에서 목표 version으로 가는 `docs/migrations/v{from}-to-v{to}.md` 확인
5. manifest diff와 locale source diff를 기준으로 자동 적용 가능, 수동 확인 필요, 충돌 가능 항목 분류
6. 사용자 수정 파일은 덮어쓰지 않고 Hyper-Waterfall 버전 업데이트 PR 후보로 정리
7. 작업지시자 승인 후 별도 이슈와 브랜치에서 업데이트 진행

## 분류 기준

- 자동 적용 가능: 이전 manifest checksum과 대상 파일이 일치하고 update policy상 자동 반영이 허용되며, 기존 선택 locale source가 목표 release에 존재하고 fallback이 필요 없는 항목
- 수동 확인 필요: update policy가 `merge`, `manual`, `preserve`이거나 프로젝트별 운영 규칙이 섞일 수 있는 항목, 선택 locale source 누락으로 fallback 후보를 제시해야 하는 항목, locale 전환 요청이 있는 항목
- conflict: 대상 저장소 수정과 목표 release 변경이 같은 파일 또는 같은 링크 경로에서 충돌할 가능성이 있는 항목, 선택 locale과 fallback locale source가 섞여 의미 drift 위험이 있는 항목
- 보류: 이번 변경에서 다루지 않고 별도 이슈, 별도 PR, 또는 maintainer 수동 작업으로 넘기는 항목

사용자 수정 파일은 자동 적용 가능 항목에 넣지 않는다. 판단 결과에는 해당 파일을 수동 확인 필요 또는 conflict로 남기고 근거를 적는다.

`localization.preserveSelectedLocaleOnUpdate`가 `true`이면 기존 적용 저장소 update는 기존 locale 보존을 기본값으로 한다. locale 전환은 update의 부수 효과로 처리하지 않고, 작업지시자의 명시 요청과 별도 승인 항목으로 분리한다.

## 기존 업데이트 판단 결과 형식

기존 적용 저장소 업데이트는 파일을 변경하기 전에 다음 판단 결과를 먼저 제시하고, 승인된 범위만 별도 이슈와 브랜치에서 진행한다.

- 대상 저장소: 업데이트할 저장소 루트와 기준 브랜치
- 현재 version: 대상 저장소의 `.hyper-waterfall/version.json`에 기록된 version, release, appliedAt
- 현재 locale: `.hyper-waterfall/version.json`의 top-level `locale` 값 또는 호환 필드에서 읽은 값, 기록이 없을 때의 `unknown`, 확인 근거
- 목표 release/tag: 적용하려는 Hyper-Waterfall GitHub Release 또는 tag
- 목표 release locale 지원: `supportedLocales`, `defaultLocale`, `fallbackLocale`, `availability.status`, 기존 locale 보존 여부
- migration guide: 현재 version에서 목표 version으로 이동할 때 읽어야 하는 `docs/migrations/v{from}-to-v{to}.md`
- manifest diff: 현재 적용 기준과 목표 release manifest 사이의 추가, 변경, 삭제, symlink 차이 요약
- locale manifest diff: 기존 locale source 존재 여부, 선택 locale source 변경 여부, 누락 파일 또는 directory, fallback 후보, 혼합 locale 위험
- locale 보존/전환 판단: 기존 locale 보존 여부, 작업지시자가 요청한 locale 전환 여부, 전환 시 별도 승인 필요성
- 자동 적용 가능: checksum 일치, 사용자 수정 없음, update policy상 자동 반영 가능한 항목
- 수동 확인 필요: update policy가 `merge`, `manual`, `preserve`이거나 사용자 판단이 필요한 항목
- conflict: 대상 저장소 수정과 목표 release 변경이 충돌할 가능성이 있어 직접 덮어쓰면 안 되는 항목
- Hyper-Waterfall 버전 업데이트 PR 후보: 승인 후 별도 PR로 만들 변경 묶음, 검증 항목, 남은 리스크
- 작업지시자 승인 요청: 자동 적용, 수동 확인, conflict 처리, Hyper-Waterfall 버전 업데이트 PR 생성 여부

## CLI 출력 계약

CLI가 `update`나 `doctor` 결과를 출력하더라도 이 결과는 파일 변경 전 판단 보고다. 출력 항목은 현재 version, 현재 locale, 요청 locale 또는 전환 요청, 목표 release/tag, 목표 release locale 지원, migration guide, manifest diff, locale manifest diff, 자동 적용 가능, 수동 확인 필요, conflict, 보류, 검증, 승인 요청을 포함해야 한다.

승인 전에는 manifest diff에 포함된 파일을 실제 대상 저장소에 적용하지 않는다.

## 관련 문서

- `docs/agent-entrypoint.md`: lifecycle 진입점.
- `docs/lifecycle/update_pr.md`: 승인된 업데이트 후보를 PR로 전환하는 기준.
- `docs/migrations/README.md`: migration guide 작성 규칙.
- `templates/mydocs/manual/release_update_protocol.md`: release/tag와 update protocol.
