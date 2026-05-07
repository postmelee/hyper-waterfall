# Hyper-Waterfall migration guide 작성 규칙

이 폴더는 Hyper-Waterfall을 이미 적용한 저장소가 새 GitHub Release/tag로 업데이트할 때 참고하는 migration guide를 보관한다. 신규 설치 절차가 아니라, 기존 적용 저장소의 파일 변경, 사용자 수정 충돌, 수동 확인 항목을 리뷰하기 위한 장기 문서다.

프롬프트는 업데이트 요청을 시작하는 인터페이스이고, 실제 기준은 release에 포함된 `templates/manifest.json`, 적용 저장소의 `.hyper-waterfall/version.json`, 이 폴더의 migration guide다.

## 파일명 규칙

파일명은 다음 형식을 사용한다.

```text
v{from}-to-v{to}.md
```

예시:

- `v0.1.0-to-v0.2.0.md`
- `v0.2.0-to-v0.3.0.md`

여러 patch 버전을 한 번에 건너뛰는 migration은 실제 update path를 기준으로 별도 문서를 만든다. 예를 들어 `v0.1.0`에서 `v0.3.0`으로 직접 업데이트해야 한다면 `v0.1.0-to-v0.3.0.md`를 만들고, 중간 release별 문서를 링크한다.

## 필수 섹션

모든 migration guide는 아래 섹션을 포함한다.

- 대상 버전
- 변경 요약
- 추가 파일
- 수정 파일
- 적용 저장소 수동 확인
- 충돌 가능성
- 검증
- 후속 작업

섹션을 적용할 내용이 없으면 삭제하지 말고 `없음`과 이유를 적는다. 그래야 lifecycle 판단, Hyper-Waterfall 버전 업데이트 PR 워크플로우, CLI가 "누락"과 "해당 없음"을 구분할 수 있다.

## 작성 기준

- `templates/manifest.json`의 `files`, `versionState`, `updatePolicies`, `checksum` 상태를 기준으로 작성한다.
- 적용 저장소의 현재 version은 `.hyper-waterfall/version.json`에서 읽는 것을 전제로 한다.
- 사용자 수정 가능성이 높은 `AGENTS.md`, `CLAUDE.md`, `.github/`, `mydocs/manual/`, `mydocs/skills/` 변경은 수동 확인 또는 충돌 가능성에 반드시 언급한다.
- `overwrite`, `merge`, `manual`, `preserve`, `symlink` update policy의 의미를 문서마다 재정의하지 않는다. 정책 정의는 `templates/mydocs/manual/document_structure_guide.md`와 manifest를 따른다.
- 실제 GitHub Release/tag 생성, npm publish, Homebrew, Docker, plugin 배포는 migration guide만으로 수행하지 않는다. 해당 작업은 별도 이슈와 승인 절차를 따른다.

## 검증

새 migration guide를 추가하면 최소한 다음을 확인한다.

```bash
test -f docs/migrations/v{from}-to-v{to}.md
grep -nE '대상 버전|변경 요약|추가 파일|수정 파일|수동 확인|충돌 가능성|검증|후속 작업' docs/migrations/v{from}-to-v{to}.md
grep -nE 'manifest|version|GitHub Release|\.hyper-waterfall' docs/migrations/v{from}-to-v{to}.md
git diff --check
```

## lifecycle 판단과 Hyper-Waterfall 버전 업데이트 PR의 관계

기존 적용 저장소 업데이트는 `docs/agent-entrypoint.md`의 "기존 업데이트 판단 결과 형식"을 따른다. Migration guide는 그 판단 결과와 Hyper-Waterfall 버전 업데이트 PR 후보를 만들 때 다음 항목의 근거로 사용한다.

- 현재 version과 목표 version
- manifest diff 요약
- 자동 적용 가능한 파일
- 수동 확인이 필요한 파일
- 충돌 가능성이 있는 파일
- maintainer가 승인해야 할 항목

Hyper-Waterfall 버전 업데이트 PR 본문에서는 migration guide의 각 섹션을 다음처럼 옮긴다.

| migration guide 섹션 | PR 본문 반영 위치 |
|---|---|
| 대상 버전 | `요약`의 현재 version과 목표 release/tag |
| 변경 요약 | `요약`과 `변경 내역` |
| 추가 파일 | `변경 내역`의 manifest diff |
| 수정 파일 | `변경 내역`의 manifest diff |
| 적용 저장소 수동 확인 | `수동/시나리오 검증`, `검증 한계`, `남은 리스크` |
| 충돌 가능성 | `영향 영역`, `검증 한계`, `남은 리스크` |
| 검증 | `자동 검증`, `수동/시나리오 검증`, `CI/원격 검증` |
| 후속 작업 | `후속 이슈 제안`, `남은 리스크` |

따라서 migration guide는 단순 changelog가 아니라 lifecycle 판단 결과, Hyper-Waterfall 버전 업데이트 PR 리뷰, 향후 CLI `update`/`doctor` 출력의 근거 문서로 작성한다.

## 후속 CLI 출력 기준

CLI는 migration guide를 대체하지 않는다. `update`와 `doctor`는 release manifest, `.hyper-waterfall/version.json`, migration guide를 읽어 다음 판단 결과를 출력하고, 실제 파일 변경은 작업지시자 승인 후 일반 task 흐름에서 수행한다.

| 출력 항목 | `update`에서의 의미 | `doctor`에서의 의미 |
|---|---|---|
| 현재 version | 대상 저장소의 `.hyper-waterfall/version.json` 기준 version | version 기록 파일 존재 여부와 파싱 가능 여부 |
| 목표 release/tag | 사용자가 지정했거나 기본으로 선택된 Hyper-Waterfall release/tag | 현재 설치 상태에서 도달 가능한 최신 release/tag |
| migration guide | update path에 필요한 `docs/migrations/v{from}-to-v{to}.md` | 필요한 migration guide 존재 여부와 필수 섹션 누락 여부 |
| manifest diff | 추가, 수정, 삭제, symlink, preserve 대상 요약 | manifest source/target 경로와 checksum 상태 점검 |
| 자동 적용 가능 | checksum 일치와 update policy 기준으로 자동 반영 가능한 후보 | 자동 반영 가능하더라도 아직 미적용인 항목 |
| 수동 확인 필요 | `merge`, `manual`, `preserve` 또는 사용자 수정 가능성이 있는 항목 | maintainer 판단이 필요한 파일과 이유 |
| conflict | 사용자 수정과 목표 release 변경이 충돌할 수 있는 항목 | checksum 불일치, 경로 충돌, symlink 충돌 |
| 보류 | 이번 Hyper-Waterfall 버전 업데이트 PR에서 제외할 항목 | 별도 이슈나 수동 조치가 필요한 항목 |
| 검증 | PR에 남길 자동/수동/원격 검증 계획 | 현재 저장소 상태 진단 결과와 재실행할 명령 |
| 승인 요청 | Hyper-Waterfall 버전 업데이트 PR 생성 또는 범위 분리 요청 | 진단 결과를 바탕으로 update 진행 여부 요청 |

CLI가 Hyper-Waterfall 버전 업데이트 PR 본문을 만들 수 있더라도, PR은 별도 이슈 번호와 `local/task{N}` -> `publish/task{N}` 흐름을 따른다.
