# Release와 Update Protocol 가이드

이 문서는 Hyper-Waterfall 방법론 자체의 GitHub Release/tag 기준, release PR, 기존 적용 저장소 update protocol을 정의한다. 일반 task 브랜치 운용은 `git_workflow_guide.md`를 따른다.

## Canonical 배포 기준

Hyper-Waterfall 방법론 자체의 canonical 배포 단위는 GitHub Release/tag다. `{RELEASE_BRANCH}`에 반영된 상태를 tag로 고정하고, 해당 release의 `templates/manifest.json`과 `docs/migrations/`를 기준으로 기존 적용 저장소가 업데이트한다.

프롬프트, npm CLI, plugin, Homebrew 같은 채널은 release/tag 기준을 실행하거나 발견하기 쉽게 하는 경로일 뿐 canonical 기준을 대체하지 않는다.

## Release 준비 체크

Release 준비 시 다음 항목을 확인한다.

- `templates/manifest.json`의 `frameworkVersion`, `plannedTag`, `baselineTag`가 release 의도와 맞는지 확인
- release 패키징 시 checksum이 `pending-release`에서 확정 가능한지 확인
- `docs/migrations/v{from}-to-v{to}.md`가 추가 파일, 수정 파일, 수동 확인, 충돌 가능성, 검증 기준을 포함하는지 확인
- 적용 저장소의 `.hyper-waterfall/version.json`이 목표 version과 선택 locale을 기록하거나 보존할 수 있는지 확인

## PR 유형 구분

일반 task PR, release PR, Hyper-Waterfall 버전 업데이트 PR은 서로 다른 목적을 가진다.

| 유형 | 목적 | 브랜치 흐름 | PR 제목 |
|---|---|---|---|
| task PR | 저장소 기능, 문서, 운영 작업을 이슈 단위로 반영 | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: {작업 제목}` |
| release PR | `{BASE_BRANCH}`에 누적된 프레임워크 변경을 `{RELEASE_BRANCH}`로 승격하고 tag 기준을 만든다 | `{BASE_BRANCH}` -> `{RELEASE_BRANCH}` | `Release: {version}` |
| Hyper-Waterfall 버전 업데이트 PR | 기존 적용 저장소를 현재 version에서 목표 release/tag로 올린다 | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: Hyper-Waterfall {fromVersion} -> {toVersion} 버전 업데이트` |

일반 task PR과 release PR은 분리한다. 기존 적용 저장소 업데이트는 release 이후 별도 Hyper-Waterfall 버전 업데이트 PR로 수행한다.

## Release PR 흐름

릴리즈 시점에는 `{BASE_BRANCH}`에서 검증된 변경을 `{RELEASE_BRANCH}`로 승격하는 PR을 만든다.

```bash
gh pr create --base {RELEASE_BRANCH} --head {BASE_BRANCH} --title "Release: {version}"
gh pr review --approve
gh pr merge --merge --delete-branch=false
```

Tag 생성 전에는 manifest와 migration guide를 다시 확인한다.

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
grep -nE '대상 버전|추가 파일|수정 파일|수동 확인|충돌 가능성|검증' docs/migrations/v{from}-to-v{to}.md
```

실제 tag 생성과 GitHub Release 발행은 별도 승인된 release 단계에서 수행한다.

## Update Protocol

기존 적용 저장소 업데이트는 다음 입력을 비교해 판단한다.

- 대상 저장소의 `.hyper-waterfall/version.json`
- 목표 GitHub Release/tag의 `templates/manifest.json`
- 현재 version에서 목표 version으로 가는 `docs/migrations/v{from}-to-v{to}.md`
- 대상 저장소의 사용자 수정 diff
- manifest가 `localization`을 제공하면 `.hyper-waterfall/version.json`의 현재 locale 기록, 요청 locale 또는 전환 요청, 목표 release locale 지원, locale manifest diff, locale 보존/전환 판단

판단 결과는 `docs/lifecycle/update.md` 형식으로 먼저 보고한다. 승인 전에는 manifest diff에 포함된 파일을 실제 대상 저장소에 적용하지 않는다.

## Hyper-Waterfall 버전 업데이트 PR

Hyper-Waterfall 버전 업데이트 PR은 일반 task PR과 같은 브랜치 흐름을 사용한다. 차이는 PR의 입력과 본문이다.

- 입력: 기존 업데이트 판단 결과, manifest diff, locale manifest diff, locale 보존/전환 판단, migration guide
- 본문: `docs/lifecycle/update_pr.md` 기준으로 `.github/pull_request_template.md`에 반영
- 추적: GitHub Issue, 수행계획서, 구현계획서, 단계 보고서, 최종 보고서

커밋 메시지 규칙:

- 단일 커밋: `Task #{N}: Hyper-Waterfall {fromVersion} -> {toVersion} 버전 업데이트`
- 단계 커밋: `Task #{N} Stage {S}: Hyper-Waterfall 버전 업데이트 {내용}`
- 최종 보고 커밋: `Task #{N}: 최종 보고서 작성과 오늘할일 완료 처리`

Hyper-Waterfall 버전 업데이트 PR 브랜치를 별도 prefix로 만들지 않는 이유는 작업 추적 기준을 GitHub Issue와 하이퍼-워터폴 산출물로 유지하기 위해서다. CLI나 자동화가 PR 후보를 만들더라도 먼저 판단 결과를 출력하고, 승인된 이슈 번호를 받은 뒤 `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` 규칙을 따른다.

## 관련 문서

- `git_workflow_guide.md`: 브랜치 흐름과 maintainer/contributor Git 명령.
- `framework_lifecycle_guide.md`: lifecycle 판단을 일반 task로 전환하는 기준.
- `docs/lifecycle/update.md`: 기존 업데이트 판단 결과 형식.
- `docs/lifecycle/update_pr.md`: 업데이트 PR 본문 반영 기준.
- `docs/migrations/README.md`: migration guide 작성 규칙.
