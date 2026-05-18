# Hyper-Waterfall 버전 업데이트 PR 가이드

이 문서는 기존 업데이트 판단 결과에서 승인된 변경 후보를 Hyper-Waterfall 버전 업데이트 PR로 전환할 때의 조건, 명명 규칙, PR 본문 구조를 정의한다.

## 생성 조건

다음 정보가 제시되고 작업지시자가 PR 생성을 승인한 경우에만 Hyper-Waterfall 버전 업데이트 PR로 전환한다.

- 현재 version
- 목표 release/tag
- migration guide
- manifest diff
- 자동 적용 가능 항목
- 수동 확인 필요 항목
- conflict 항목

승인 전에는 manifest diff에 포함된 파일을 실제 대상 저장소에 적용하지 않는다.

## 일반 task 흐름 전환

- 이슈: 업데이트 변경 묶음마다 GitHub Issue를 하나 만든다. 이미 이슈가 있으면 해당 이슈 번호를 사용한다.
- 작업 브랜치: `local/task{issue번호}`
- PR 게시 브랜치: `publish/task{issue번호}`
- 커밋 메시지: `Task #{issue번호}: Hyper-Waterfall {fromVersion} -> {toVersion} 버전 업데이트` 또는 단계 작업이면 `Task #{issue번호} Stage {N}: Hyper-Waterfall 버전 업데이트 {내용}`
- PR 제목: `Task #{issue번호}: Hyper-Waterfall {fromVersion} -> {toVersion} 버전 업데이트`
- PR base: 적용 저장소의 `{BASE_BRANCH}`
- PR 본문: manifest diff, migration guide 요약, 자동 적용 가능 항목, 수동 확인 필요 항목, conflict 항목, 검증 결과, 검증 한계를 포함한다.

Hyper-Waterfall 버전 업데이트 PR은 release PR이나 일반 기능 task PR과 목적이 다르지만, 추적 단위는 동일하게 GitHub Issue와 하이퍼-워터폴 문서 산출물이다. 별도 예외 브랜치 체계를 만들지 않고 기존 `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` 흐름을 따른다.

## PR 본문 구조

Hyper-Waterfall 버전 업데이트 PR 본문은 기존 `.github/pull_request_template.md`를 사용한다. 별도 템플릿을 만들기보다 아래 항목을 기존 섹션에 채워 넣는다.

| PR 본문 섹션 | 포함해야 할 내용 |
|---|---|
| `요약` | 현재 version, 목표 release/tag, migration guide, 리뷰 포인트 |
| `변경 내역` | manifest diff 요약과 변경 묶음. 추가, 수정, 삭제, symlink, preserve 항목을 구분 |
| `영향 영역` | `AGENTS.md`, `CLAUDE.md`, `.github/`, `mydocs/manual/`, `mydocs/skills/`, `.hyper-waterfall/version.json` 등 영향을 받는 영역 |
| `검증` | manifest 파싱, version 기록 확인, migration guide 필수 섹션 확인, 사용자 수정 충돌 확인 |
| `검증 한계` | 자동 판별하지 못한 사용자 수정, 수동 리뷰가 필요한 파일, 원격 CI 미수행 사유 |
| `남은 리스크` | conflict, 보류 항목, 적용 저장소 maintainer가 직접 결정해야 하는 항목 |

## 변경 분류 기준

- 자동 적용 가능: 이전 manifest checksum과 대상 파일이 일치하고 update policy상 자동 반영이 허용되는 항목
- 수동 확인 필요: update policy가 `merge`, `manual`, `preserve`이거나 프로젝트별 운영 규칙이 섞일 수 있는 항목
- conflict: 대상 저장소 수정과 목표 release 변경이 같은 파일 또는 같은 링크 경로에서 충돌할 가능성이 있는 항목
- 보류: 이번 PR에서 다루지 않고 별도 이슈, 별도 PR, 또는 maintainer 수동 작업으로 넘기는 항목

사용자 수정 파일은 자동 적용 가능 항목에 넣지 않는다. PR 본문에는 해당 파일을 수동 확인 필요 또는 conflict로 남기고, 검증 한계와 남은 리스크에 판단 근거를 적는다.

## 관련 문서

- `docs/lifecycle/update.md`: 기존 업데이트 판단 결과 형식.
- `templates/mydocs/manual/framework_lifecycle_guide.md`: 판단 결과를 일반 task로 전환하는 기준.
- `templates/mydocs/manual/release_update_protocol.md`: release/tag와 update protocol.
- `templates/mydocs/manual/internal_pr_guide.md`: 내부 task PR 본문 작성 원칙.
- `templates/mydocs/manual/pr_command_guide.md`: PR 생성 명령과 문서 링크 규칙.
