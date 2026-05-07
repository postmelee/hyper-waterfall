# task_m020_8.md - 프레임워크 설치·업데이트 lifecycle 프로토콜 정리 수행계획서

GitHub Issue: [#8](https://github.com/postmelee/hyper-waterfall/issues/8)
마일스톤: M020

## 목적

Hyper-Waterfall 프레임워크를 처음 적용하거나 기존 적용 저장소를 새 버전으로 올리는 절차를 core task workflow와 분리된 lifecycle 프로토콜로 정리한다.

이번 작업의 핵심은 사용자가 실제 타스크를 진행할 때 보게 되는 Skill 목록을 방법론 실행에 필요한 절차로 유지하는 것이다. 설치·업데이트는 `docs/agent-entrypoint.md`, `templates/manifest.json`, `.hyper-waterfall/version.json`, `docs/migrations/`를 기준으로 설명하고, 적용 대상 저장소에 유지보수용 Skill이 늘어나지 않도록 경계를 분명히 한다.

## 배경

#7에서 GitHub Release/tag, manifest, version 기록, migration guide 기준이 도입됐다. 그러나 현재 일부 문서에는 설치·업데이트를 별도 후속 Skill로 둘 수 있다는 표현이 남아 있어, 적용 대상 저장소의 Skill 목록이 방법론 실행 절차와 프레임워크 lifecycle 절차를 섞어 보일 위험이 있다.

Hyper-Waterfall의 본질은 GitHub Issue를 기준으로 수행계획서, 구현계획서, 단계 보고서, 최종 보고서, PR을 남기는 작업 방법론이다. 설치와 업데이트는 이 방법론을 배포하고 적용 상태를 관리하는 별도 lifecycle 영역으로 다루는 편이 README와 Manual의 역할을 더 선명하게 만든다.

## 범위

### 포함

- `docs/agent-entrypoint.md`의 신규 적용/기존 업데이트 진입 절차 보강
- `templates/mydocs/manual/task_workflow_guide.md`에 core task workflow와 framework lifecycle의 경계 명시
- `templates/mydocs/manual/document_structure_guide.md`에 `.hyper-waterfall/version.json`, manifest, migration guide의 lifecycle 역할 보강
- `docs/migrations/`의 후속 작업 표현이 lifecycle/update PR/CLI 방향과 일관되는지 확인하고 필요한 부분 보정
- README의 설치/업데이트 설명을 짧은 진입 안내 수준으로 유지
- 후속 #9 update PR 워크플로우와 #10 npm CLI가 참조할 lifecycle 판단 결과 형식 또는 체크리스트 초안 정의

### 제외

- 설치·업데이트 전용 Skill 추가
- `templates/mydocs/skills/` 하위 신규 lifecycle Skill 폴더 추가
- 실제 파일 복사 스크립트 구현
- update PR 생성 자동화
- npm CLI 구현
- GitHub Release 생성 자동화

## 설계 방향

- `mydocs/skills/`에는 하이퍼-워터폴 타스크 진행에 직접 쓰이는 core Skill만 둔다.
- 신규 적용은 agent entrypoint와 manifest를 기준으로 "적용 계획 -> 작업지시자 승인 -> 파일 적용" 흐름으로 설명한다.
- 기존 업데이트는 version 기록, 목표 release manifest, migration guide를 기준으로 "현재 상태 확인 -> 변경 후보 분류 -> update PR 후보 정리" 흐름으로 설명한다.
- 설치·업데이트의 판단 결과는 후속 #9가 update PR 본문으로 옮길 수 있도록 구조화한다.
- README는 사용자가 복사할 프롬프트나 추후 CLI 명령을 찾는 진입 문서로 유지하고, 세부 절차는 agent entrypoint와 Manual에 둔다.
- 기존 문서의 특정 예정 Skill 표현은 새 lifecycle 프로토콜 표현으로 치환한다.

## 예상 변경 파일

신규:

- 없음

수정:

- `README.md`
- `docs/agent-entrypoint.md`
- `docs/migrations/README.md`
- `docs/migrations/v0.1.0-to-v0.2.0.md`
- `templates/mydocs/manual/task_workflow_guide.md`
- `templates/mydocs/manual/document_structure_guide.md`

이번 task 산출물:

- `mydocs/orders/20260507.md`
- `mydocs/plans/task_m020_8.md`
- `mydocs/plans/task_m020_8_impl.md`
- `mydocs/working/task_m020_8_stage{N}.md`
- `mydocs/report/task_m020_8_report.md`

## 잠정 단계

- **Stage 1 — lifecycle 경계와 기존 표현 정리**
  - 설치·업데이트가 core Skill이 아니라 lifecycle 프로토콜임을 Manual과 agent entrypoint에 정리한다.
  - 기존 문서의 후속 Skill 중심 표현을 식별하고 치환 범위를 확정한다.
- **Stage 2 — 신규 적용/기존 업데이트 판단 결과 형식 정의**
  - 신규 적용과 기존 업데이트의 판단 결과/checklist를 agent entrypoint 또는 Manual에 구조화한다.
  - #9 update PR 워크플로우가 재사용할 필드를 최소 형식으로 둔다.
- **Stage 3 — README와 migration guide 연결 보정**
  - README는 짧은 진입 안내로 유지하고, migration guide의 후속 작업 표현을 lifecycle/update PR/CLI 방향으로 맞춘다.
  - core Skill 표가 타스크 진행 Skill 중심으로 유지되는지 확인한다.

## 검증 계획

### 단계별 검증

- Stage 1
  - `rg -n '후속 Skill|Skill workflow|설치·업데이트 전용 Skill|전담 Skill' README.md docs templates/mydocs/manual`
  - `git diff --check`
- Stage 2
  - `grep -nE 'lifecycle|manifest|version|migration|체크리스트|판단 결과' docs/agent-entrypoint.md templates/mydocs/manual/*.md`
  - `git diff --check`
- Stage 3
  - `grep -nE 'update PR|manifest diff|migration|version|CLI|lifecycle' README.md docs/migrations/*.md templates/mydocs/manual/*.md`
  - `find templates/mydocs/skills -maxdepth 2 -name SKILL.md | sort`
  - `git diff --check`

### 통합 검증

- README 핵심 Skill 표에 lifecycle 전용 항목이 없다.
- agent entrypoint와 Manual에서 manifest, version, migration, lifecycle, core Skill 경계가 확인된다.
- `templates/mydocs/skills/`에 lifecycle 전용 신규 Skill 폴더가 없다.
- README의 설치/업데이트 설명이 상세 절차가 아니라 진입 안내 수준이다.
- 후속 #9가 참조할 lifecycle 판단 결과 형식 또는 체크리스트가 존재한다.
- `git status --short`가 PR 준비 전 빈 출력이다.
- `git diff --check`가 경고 없이 통과한다.

## 리스크

- **README 과다 설명**: lifecycle 절차를 README에 길게 쓰면 사용자가 core workflow를 읽기 어려워진다. README는 짧은 진입 안내만 유지한다.
- **core Skill 경계 혼동**: 설치·업데이트를 Skill 목록에 넣으면 적용 저장소의 방법론 사용 경험이 흐려질 수 있다. core Skill 표에는 타스크 진행 절차만 남긴다.
- **후속 작업과 범위 충돌**: update PR 상세 워크플로우는 #9, CLI 구현은 #10 범위로 남긴다. 이번 task는 lifecycle 경계와 판단 결과 형식까지만 다룬다.
- **기존 문서 표현 누락**: #7 산출물에 남은 후속 표현이 여러 문서에 흩어져 있을 수 있다. `rg` 기반으로 확인한다.

## 승인 요청 사항

- 설치·업데이트를 core Skill이 아니라 framework lifecycle 프로토콜로 분리하는 방향에 동의?
- README는 짧은 진입 안내만 유지하고, 세부 판단 절차는 agent entrypoint와 Manual에 두는 방향에 동의?
- #9 update PR과 #10 CLI가 재사용할 최소 판단 결과 형식/checklist까지만 이번 task에서 정의하는 범위에 동의?

승인되면 `task_m020_8_impl.md`에서 단계별 산출물, 검증 명령, 커밋 메시지를 구체화한다.
