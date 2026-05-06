# task_m020_7.md - GitHub Release + manifest + migration guide 도입 수행계획서

GitHub Issue: [#7](https://github.com/postmelee/hyper-waterfall/issues/7)
마일스톤: M020

## 목적

Hyper-Waterfall의 배포 방식을 "AI에게 최신 프롬프트를 요청해 파일을 반영하는 방식"에서 "GitHub Release/tag와 manifest, version 기록, migration guide를 기준으로 업데이트 가능한 방식"으로 끌어올린다.

이번 task는 M020의 기반 작업이다. 후속 `framework-install`/`framework-update` Skill, update PR 워크플로우, npm CLI가 공통으로 참조할 배포 단위와 업데이트 정책을 먼저 고정한다.

## 배경

Task #5에서 GitHub Issue Form, PR 템플릿, README, Skill, Manual이 함께 바뀌었다. 신규 사용자는 최신 `templates/`를 복사하면 되지만, 이미 적용한 저장소는 어떤 파일이 프레임워크 원본이고 어떤 파일이 사용자 수정분인지 구분하기 어렵다.

프롬프트만 배포 채널로 삼으면 다음 문제가 남는다.

- 적용 저장소가 현재 어떤 Hyper-Waterfall 버전을 사용하는지 알기 어렵다.
- Skill, Manual, `_templates`, `.github` 템플릿이 바뀌었을 때 무엇을 덮어써도 되는지 판단하기 어렵다.
- 기존 사용자 수정 파일을 AI가 실수로 덮어쓸 위험이 있다.
- npm CLI나 plugin 같은 추가 채널을 만들더라도 내부 업데이트 프로토콜이 없으면 같은 문제가 반복된다.

따라서 canonical 배포 단위는 GitHub Release/tag로 두고, release 안의 `templates/manifest.json`, 적용 저장소의 version 기록, 버전 간 migration guide를 먼저 정의한다.

## 범위

### 포함

- `templates/manifest.json` 초안 추가
- 적용 저장소에 남길 Hyper-Waterfall version 기록 위치와 필드 정책 정의
- migration guide 위치, 파일명, 필수 섹션 정의
- M020 이전 baseline과 M020 release tag 관계 정리
- GitHub Release/tag가 canonical 배포 단위라는 설명을 README와 Manual에 반영
- 기존 적용 저장소 업데이트를 고려한 overwrite/merge/symlink 정책 정리

### 제외

- npm CLI 구현
- `framework-install`/`framework-update` Skill 구현
- update PR 자동 생성 워크플로우 구현
- 실제 GitHub Release 생성 자동화
- Homebrew, Docker, Codex/Claude plugin 배포 구현
- 적용 저장소별 자동 병합 알고리즘 구현

## 설계 방향

- GitHub Release/tag를 canonical 배포 단위로 정의한다. npm, Homebrew, Docker, plugin은 후속 실행 채널이며 canonical 원천을 대체하지 않는다.
- manifest는 `templates/manifest.json`에 둔다. release에 포함되는 템플릿 파일, 적용 대상 경로, 파일 역할, 업데이트 정책, symlink 여부, 체크섬 필드를 사람이 검토 가능한 구조로 표현한다.
- 적용 저장소의 version 상태는 저장소 문서 산출물이 아니므로 `mydocs/`가 아니라 `.hyper-waterfall/` 계열 위치에 두는 방향을 우선 검토한다.
- migration guide는 프레임워크 저장소의 `docs/migrations/`에 두고, 적용 저장소가 참고할 수 있는 장기 문서로 관리한다.
- M020에서는 실제 업데이트 엔진을 만들지 않고, 후속 #8~#10이 참조할 정책과 파일 형식을 먼저 확정한다.
- 사용자 수정 충돌 가능성이 있는 파일은 manifest에서 무조건 overwrite로 두지 않는다. `merge`, `manual`, `preserve` 같은 정책을 명시해 후속 `framework-update`가 판단할 수 있게 한다.

## 예상 변경 파일

신규:

- `templates/manifest.json`
- `docs/migrations/README.md`
- `docs/migrations/v0.1.0-to-v0.2.0.md`

수정:

- `README.md`
- `docs/agent-entrypoint.md`
- `templates/mydocs/manual/document_structure_guide.md`
- `templates/mydocs/manual/git_workflow_guide.md`
- `templates/mydocs/manual/task_workflow_guide.md`
- `mydocs/orders/20260506.md`

이번 task 산출물:

- `mydocs/orders/20260506.md`
- `mydocs/plans/task_m020_7.md`
- `mydocs/plans/task_m020_7_impl.md`
- `mydocs/working/task_m020_7_stage{N}.md`
- `mydocs/report/task_m020_7_report.md`

## 잠정 단계

- **Stage 1 — manifest와 version 정책 정의**
  - `templates/manifest.json` 초안을 추가하고 적용 저장소 version 기록 위치와 필드 정책을 문서화한다.
  - JSON parse, 필수 필드, 주요 템플릿 파일 포함 여부를 검증한다.
- **Stage 2 — migration guide 체계 추가**
  - `docs/migrations/`에 migration guide 인덱스와 M020 대상 migration 문서를 추가한다.
  - 신규/수정/수동 확인/후속 작업 섹션이 업데이트 리뷰에 충분한지 검증한다.
- **Stage 3 — README와 Manual에 배포·업데이트 프로토콜 반영**
  - README, agent entrypoint, 관련 Manual에 GitHub Release, manifest, version, migration의 역할을 반영한다.
  - 프롬프트는 설치·업데이트 요청 인터페이스이고, 실제 기준은 버전된 파일과 manifest라는 설명이 일관적인지 검증한다.

## 검증 계획

### 단계별 검증

- Stage 1
  - `test -f templates/manifest.json`
  - `ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'`
  - `grep -nE '"version"|"files"|"target"|"updatePolicy"|"checksum"' templates/manifest.json`
  - `grep -nE 'AGENTS.md|templates/mydocs/skills|templates/mydocs/_templates|templates/.github' templates/manifest.json`
- Stage 2
  - `test -f docs/migrations/README.md`
  - `test -f docs/migrations/v0.1.0-to-v0.2.0.md`
  - `grep -nE '추가 파일|수정 파일|수동 확인|충돌 가능성|검증' docs/migrations/*.md`
- Stage 3
  - `grep -nE 'GitHub Release|manifest|migration|version|\\.hyper-waterfall' README.md docs/agent-entrypoint.md templates/mydocs/manual/*.md`
  - `grep -nE '프롬프트|canonical|배포 단위|업데이트 프로토콜' README.md templates/mydocs/manual/*.md`

### 통합 검증

- manifest JSON이 parse된다.
- manifest가 포함 파일과 업데이트 정책을 사람이 검토 가능한 구조로 표현한다.
- 적용 저장소의 현재 Hyper-Waterfall version 기록 위치가 명확하다.
- migration guide가 버전 간 추가/수정/수동 확인 항목을 설명한다.
- README/Manual에서 "프롬프트만 배포"가 아니라 "버전된 배포 단위 + 업데이트 프로토콜"로 설명된다.
- `git status --short`가 PR 준비 전 빈 출력이다.
- `git diff --check`가 경고 없이 통과한다.

## 리스크

- **버전 기준 과도한 확정**: 아직 공식 release가 없으므로 `v0.1.0` baseline과 `v0.2.0` target을 문서화할 때 실제 tag 생성 절차와 혼동될 수 있다. 이번 task에서는 정책과 migration 문서만 만들고 실제 release 생성은 별도 절차로 남긴다.
- **manifest 과설계**: 후속 CLI가 없는데 스키마를 너무 복잡하게 만들면 유지 비용이 커진다. 사람이 읽고 후속 Skill이 참조할 수 있는 최소 필드부터 둔다.
- **사용자 수정 파일 덮어쓰기 위험**: 적용 저장소의 `AGENTS.md`, `CLAUDE.md`, `.github`, `mydocs`는 사용자가 수정할 수 있다. manifest 정책에 `manual` 또는 `merge` 후보를 명시해 무조건 overwrite를 피한다.
- **문서 중복**: README와 Manual에 같은 설명이 과하게 반복될 수 있다. README는 개념과 사용 흐름, Manual은 정책과 파일 위치 중심으로 나눈다.

## 승인 요청 사항

- 적용 저장소 version 기록 위치는 `mydocs/`가 아니라 `.hyper-waterfall/` 계열로 두는 방향에 동의?
- M020의 배포 기준을 GitHub Release/tag + `templates/manifest.json` + `docs/migrations/`로 잡는 방향에 동의?
- Stage 1~3 분할과 예상 변경 파일 범위에 동의?

승인되면 `task_m020_7_impl.md`에서 단계별 산출물, 검증 명령, 커밋 메시지를 구체화한다.
