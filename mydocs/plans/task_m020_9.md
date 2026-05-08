# task_m020_9.md - 프로토콜 기반 Hyper-Waterfall 버전 업데이트 PR 워크플로우 정착 수행계획서

GitHub Issue: [#9](https://github.com/postmelee/hyper-waterfall/issues/9)
마일스톤: M020

## 목적

#8에서 정리한 framework lifecycle 판단 결과를 실제 리뷰 가능한 Hyper-Waterfall 버전 업데이트 PR로 전환하는 표준 워크플로우를 정의한다.

이번 작업의 핵심은 기존 적용 저장소를 새 Hyper-Waterfall release/tag로 올릴 때, 파일 변경을 단순 덮어쓰기나 임의 자동화로 처리하지 않고 `manifest diff`, `.hyper-waterfall/version.json`, migration guide, 사용자 수정 충돌 여부, 검증 결과를 PR 본문에 구조화해 리뷰 가능한 변경으로 남기는 것이다.

## 배경

#7에서 GitHub Release/tag, `templates/manifest.json`, `.hyper-waterfall/version.json`, `docs/migrations/` 기준이 도입됐고, #8에서 신규 적용/기존 업데이트의 lifecycle 판단 결과 형식이 정리됐다. 이제 기존 적용 저장소 업데이트가 실제로 실행될 때 어떤 브랜치와 커밋, PR 제목, PR 본문, 검증 구조를 따라야 하는지 정의해야 한다.

기존 PR 템플릿은 이미 요약, 변경 내역, 검증, 검증 한계, 남은 리스크를 담는다. 따라서 이번 task는 새 플랫폼 템플릿을 먼저 늘리기보다, Hyper-Waterfall 버전 업데이트 PR이 기존 PR 템플릿 안에서 어떤 항목을 반드시 채워야 하는지와 어떤 경우에 별도 섹션이 필요한지를 판단한다.

## 범위

### 포함

- Hyper-Waterfall 버전 업데이트 PR 생성 조건과 단계 정의
- Hyper-Waterfall 버전 업데이트 PR 브랜치명, 커밋 메시지, PR 제목 규칙 정의
- #8의 기존 업데이트 판단 결과 형식을 PR 본문 항목으로 옮기는 기준 정의
- `manifest diff`, migration guide, `.hyper-waterfall/version.json` 기반 변경 분류 기준 문서화
- 사용자 수정 충돌 감지 결과를 PR 본문에 표기하는 방식 정의
- 기존 PR 템플릿을 그대로 사용할지, Hyper-Waterfall 버전 업데이트 PR 전용 섹션 또는 별도 템플릿이 필요한지 검토
- README에는 기존 적용 저장소 업데이트 흐름을 짧게 요약

### 제외

- npm CLI 구현
- 실제 자동 병합 엔진 구현
- GitHub Actions 기반 자동 업데이트 봇
- 외부 저장소에 대한 실제 업데이트 수행
- GitHub Release 생성 자동화
- core task workflow Skill 목록 확대

## 설계 방향

- Hyper-Waterfall 버전 업데이트 PR은 #8의 lifecycle 판단 결과가 승인된 뒤 별도 이슈와 브랜치에서 수행한다.
- 브랜치/커밋/PR 제목은 일반 task workflow와 충돌하지 않게 규칙을 정하되, 기존 적용 저장소에서 반복 실행 가능한 이름을 사용한다.
- 변경 분류는 `자동 적용 가능`, `수동 확인 필요`, `conflict`, `보류`를 기준으로 한다.
- PR 본문은 기존 `.github/pull_request_template.md`의 검증 구조를 우선 재사용한다.
- 별도 Hyper-Waterfall 버전 업데이트 PR 템플릿은 필요성이 검증될 때만 제안하고, 이번 task에서는 템플릿 중복보다 문서 규칙과 예시를 우선한다.
- 후속 #10 CLI가 `update` 명령 출력과 PR 생성 입력으로 재사용할 수 있도록 필드명을 #8과 일치시킨다.

## 예상 변경 파일

신규:

- 없음

수정:

- `README.md`
- `docs/agent-entrypoint.md`
- `docs/migrations/README.md`
- `docs/migrations/v0.1.0-to-v0.2.0.md`
- `templates/mydocs/manual/git_workflow_guide.md`
- `templates/mydocs/manual/task_workflow_guide.md`
- `templates/mydocs/manual/document_structure_guide.md`
- `templates/.github/pull_request_template.md` (검토 후 필요 시 최소 수정)

이번 task 산출물:

- `mydocs/orders/20260507.md`
- `mydocs/plans/task_m020_9.md`
- `mydocs/plans/task_m020_9_impl.md`
- `mydocs/working/task_m020_9_stage{N}.md`
- `mydocs/report/task_m020_9_report.md`

## 잠정 단계

- **Stage 1 — Hyper-Waterfall 버전 업데이트 PR 워크플로우 경계와 명명 규칙 정의**
  - Hyper-Waterfall 버전 업데이트 PR이 언제 생성되는지, 일반 task PR/release PR과 어떻게 구분되는지, 브랜치·커밋·PR 제목 규칙을 정리한다.
  - `git_workflow_guide.md`, `task_workflow_guide.md`, `docs/agent-entrypoint.md` 중심으로 검증한다.
- **Stage 2 — manifest diff와 migration 기반 PR 본문 구조 정의**
  - #8 판단 결과 필드를 PR 본문으로 옮기는 매핑을 정의한다.
  - 자동 적용 가능, 수동 확인 필요, conflict, 보류 항목의 표기 방식을 정한다.
  - 기존 PR 템플릿 재사용 여부와 최소 보강 필요성을 검토한다.
- **Stage 3 — README/migration guide 연결과 후속 CLI 기준 정리**
  - README에는 짧은 Hyper-Waterfall 버전 업데이트 PR 흐름만 남긴다.
  - migration guide가 Hyper-Waterfall 버전 업데이트 PR 리뷰 근거 문서임을 보강한다.
  - #10 CLI가 재사용할 출력 필드와 검증 기준을 정리한다.

## 검증 계획

### 단계별 검증

- Stage 1
  - `grep -nE 'Hyper-Waterfall 버전 업데이트 PR|브랜치|커밋|PR 제목|release PR|task PR' docs/agent-entrypoint.md templates/mydocs/manual/*.md`
  - `git diff --check`
- Stage 2
  - `grep -nE 'manifest diff|자동 적용 가능|수동 확인|conflict|보류|검증 한계|PR 본문' docs/agent-entrypoint.md docs/migrations/*.md templates/mydocs/manual/*.md templates/.github/pull_request_template.md`
  - `git diff --check`
- Stage 3
  - `grep -nE 'Hyper-Waterfall 버전 업데이트 PR|migration|version|manifest diff|CLI|doctor|update' README.md docs/migrations/*.md templates/mydocs/manual/*.md`
  - `rg -n '폐기된 예정 구현|별도 유지보수 절차명|Skill workflow|Skill이 아직 없을 때' README.md docs templates/mydocs/manual templates/mydocs/skills`
  - `git diff --check`

### 통합 검증

- Hyper-Waterfall 버전 업데이트 PR의 생성 조건, 브랜치명, 커밋 메시지, PR 제목 규칙이 문서에서 확인된다.
- 사용자 수정 파일은 자동 적용 대상이 아니라 수동 확인 또는 conflict로 분류된다.
- migration guide와 manifest diff가 Hyper-Waterfall 버전 업데이트 PR 리뷰 근거로 연결된다.
- #8 lifecycle 판단 결과 형식과 필드명이 일관된다.
- 후속 #10 CLI가 재사용할 수 있는 update 출력 구조가 문서화된다.
- `git status --short`가 PR 준비 전 빈 출력이다.
- `git diff --check`가 경고 없이 통과한다.

## 리스크

- **PR 템플릿 중복**: Hyper-Waterfall 버전 업데이트 PR 전용 템플릿을 섣불리 만들면 플랫폼 템플릿이 분산된다. 기존 PR 템플릿 재사용을 우선하고, 필요한 차이는 Manual과 작성 규칙으로 둔다.
- **자동 적용 과신**: manifest diff만 보고 사용자 수정 파일을 덮어쓰면 운영 저장소를 손상할 수 있다. conflict와 수동 확인 분류를 PR 본문에 남긴다.
- **README 과다 설명**: README가 상세 workflow 문서가 되면 사용자 진입성이 떨어진다. README는 짧은 흐름만 유지한다.
- **후속 CLI 범위 침범**: 실제 `update` 명령 구현은 #10 범위다. 이번 task는 CLI가 참고할 출력 구조까지만 정의한다.

## 승인 요청 사항

- Hyper-Waterfall 버전 업데이트 PR을 기존 PR 템플릿 재사용 중심으로 설계하고, 필요한 차이는 Manual과 작성 규칙에 두는 방향에 동의?
- 변경 분류를 `자동 적용 가능`, `수동 확인 필요`, `conflict`, `보류` 기준으로 고정하는 방향에 동의?
- #10 CLI 구현 전 이번 task에서는 Hyper-Waterfall 버전 업데이트 PR 워크플로우 문서화와 본문 구조 정의까지만 다루는 범위에 동의?

승인되면 `task_m020_9_impl.md`에서 단계별 산출물, 검증 명령, 커밋 메시지를 구체화한다.
