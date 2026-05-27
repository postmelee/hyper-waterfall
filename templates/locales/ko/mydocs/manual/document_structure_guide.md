# 문서 구조와 명명 규칙 매뉴얼

본 매뉴얼은 `mydocs/` 하위 폴더 역할, 문서 파일명 규칙, 중앙 문서 템플릿 정책, GitHub 플랫폼 템플릿 경계, 외부 기여자 PR 검토 폴더 정책, Agent Skills 위치 정책을 정의한다. 새 문서를 만들거나 기존 문서의 위치를 옮기기 전에 읽는다. 코드 작성 방식, Git 브랜치 운용, 타스크 단계 진행 절차는 이 문서가 아니라 관련 매뉴얼에서 다룬다. 모든 문서는 이 저장소에 선택된 Hyper-Waterfall locale로 작성한다.

`mydocs/`는 문서를 많이 쌓기 위한 폴더가 아니다. 새 세션의 AI가 "지금 무엇을 해야 하는가", "어떻게 하기로 했는가", "어디까지 했는가", "왜 그렇게 판단했는가", "어떤 함정이 있었는가"를 저장소만 읽고 복원하게 하는 작업 기억 체계다.

## 핵심 용어

- **문서 진실 원천**: 같은 정보를 여러 곳에 복제하지 않고, 최신 기준으로 삼는 단일 문서 또는 폴더.
- **문서 템플릿 진실 원천**: 산출물별 출력 형식을 정의하는 `mydocs/_templates/` 폴더. 본 프레임워크 저장소에서는 `templates/mydocs/_templates/`가 실제 진실 원천이고, dogfooding용 `mydocs/_templates`는 그 위치를 가리킨다.
- **GitHub 플랫폼 템플릿**: GitHub Issue나 Pull Request처럼 GitHub UI/CLI가 만드는 플랫폼 산출물의 입력 또는 본문 형식을 정의하는 `.github/ISSUE_TEMPLATE/`와 `.github/pull_request_template.md`.
- **공식 문서 루트**: 대상 프로젝트가 사용자, 기여자, 외부 통합자, 배포 채널을 위해 공식적으로 채택한 제품 문서 위치. 예: `docs/`, `specs/`, `site/`, `website/`, `adr/`, `book/`, GitHub Wiki. Hyper-Waterfall은 이 이름을 고정하지 않는다.
- **배포 manifest**: Hyper-Waterfall release에 포함되는 파일, 적용 대상 경로, 업데이트 정책, checksum 상태를 정의하는 `templates/manifest.json`.
- **적용 버전 기록**: Hyper-Waterfall이 적용된 대상 저장소가 현재 사용하는 프레임워크 버전을 기록하는 `.hyper-waterfall/version.json`.
- **실제 산출물 문서**: 특정 날짜, 이슈, PR, 조사 주제에 대해 작성된 문서. 예: `orders/20260506.md`, `plans/task_m010_3.md`.
- **내부 타스크**: GitHub Issue를 기준으로 수행계획서, 구현계획서, 단계 보고서, 최종 보고서를 남기는 저장소 내부 작업.
- **외부 기여 PR**: 외부 기여자가 제출한 Pull Request를 검토하는 작업. 내부 타스크와 다른 폴더와 절차를 사용한다.
- **마일스톤 포함 문서명**: `task_m010_49.md`처럼 마일스톤과 이슈 번호를 함께 넣은 신규 문서명.
- **Agent Skills 진실 원천**: Codex와 Claude Code가 함께 읽는 `mydocs/skills/{skill-name}/SKILL.md`.

## 문서 파일명 규칙

신규 내부 타스크 문서의 표준 형식은 GitHub Issue 번호와 마일스톤을 함께 사용한다.

- 수행 계획서: `task_{milestone}_{이슈번호}.md` (예: `task_m100_7.md`)
- 구현 계획서: `task_{milestone}_{이슈번호}_impl.md` (예: `task_m100_7_impl.md`)
- 단계별 완료 보고서: `task_{milestone}_{이슈번호}_stage{N}.md` (예: `task_m100_7_stage1.md`)
- 최종 보고서: `task_{milestone}_{이슈번호}_report.md` (예: `task_m100_7_report.md`)

지원 문서는 주제와 날짜를 함께 알 수 있게 작성한다.

- 오늘할일: `{yyyymmdd}.md` (예: `20260506.md`)
- 피드백: `{yyyymmdd}_{topic}.md` 또는 `task_{milestone}_{이슈번호}_feedback.md`
- 기술 조사: `{yyyymmdd}_{topic}.md` 또는 `task_{milestone}_{이슈번호}_{topic}.md`
- 트러블슈팅: `{yyyymmdd}_{topic}.md` 또는 `task_{milestone}_{이슈번호}_{topic}.md`
- 외부 PR 검토 문서: `pr_{번호}_review.md`, `pr_{번호}_review_impl.md`, `pr_{번호}_report.md`

강제 규칙:

- 신규 내부 타스크 문서는 반드시 `task_{milestone}_{이슈번호}` 형식을 사용한다.
- 마일스톤은 항상 `m{숫자}` 형식으로 적는다. 예: `m100`, `m200`
- 마일스톤 없이 `task_{이슈번호}` 형식으로 신규 내부 타스크 문서를 만들지 않는다.
- 기존 레거시 문서명은 유지할 수 있으나, 신규 이슈부터는 마일스톤 포함 형식을 고정한다.
- 실제 산출물 폴더 내부에는 템플릿 파일을 두지 않는다. 템플릿은 중앙 템플릿 폴더인 `mydocs/_templates/`에만 둔다.

## 폴더 역할 (엄격 준수)

| 폴더 | 용도 | 비고 |
|------|------|------|
| `_templates/` | 문서 출력 형식 템플릿 | 실제 task 산출물이 아니라 산출물별 작성 형식의 진실 원천 |
| `orders/` | 오늘 할일 | `yyyymmdd.md`만 허용. 상세 조사/분석은 `tech/` 또는 `troubleshootings/`에 기록. 완료 항목은 비고에 `완료: HH:mm` 형식으로 완료 시각 기록 |
| `plans/` | 수행/구현 계획서 | `_stage{N}`, `_report` 파일은 두지 않는다 |
| `plans/archives/` | 완료된 계획서 보관 | merge 후 정리 시 사용 |
| `working/` | 단계별 완료 보고서 (`_stage{N}.md`) | 최종 보고서는 두지 않는다 |
| `report/` | 최종 결과보고서 (`_report.md`) + 장기 보관 보고서 | 최종 보고서는 반드시 이 폴더 |
| `feedback/` | 작업지시자 피드백, 코드 리뷰 의견 | AI가 스스로 만들 수 없는 인간 판단을 보존 |
| `tech/` | 기술 조사, 구조/스펙 분석 | 재사용 가능한 조사 근거, 대안 비교, 공식화 전 초안 |
| `manual/` | 운영 매뉴얼, 가이드 | Hyper-Waterfall 운영 절차, 에이전트 규칙, 반복 적용되는 작업 기준 |
| `troubleshootings/` | 트러블슈팅, 재발 방지 기록 | 해결 과정과 함정을 남기는 폴더 |
| `pr/` | 외부 기여자 PR 검토 기록 | 내부 타스크와 분리 |
| `pr/archives/` | 처리 완료된 PR 검토 기록 보관 | |
| `skills/` | Agent Skills SKILL.md 진실 원천 | `.agents/skills`와 `.claude/skills` 심볼릭 링크가 이 폴더를 가리킨다 |

## 공식 문서 루트와 `mydocs/` 경계 정책

Hyper-Waterfall은 적용 대상 프로젝트의 공식 문서 루트 이름을 고정하지 않는다. 대상 프로젝트는 성격에 따라 `docs/`, `specs/`, `site/`, `website/`, `adr/`, `book/`, GitHub Wiki 등을 선택할 수 있다. 이 목록은 예시이며 기본값이 아니다.

공식 문서 루트에 둘 수 있는 내용:

- 사용자, 기여자, 외부 통합자가 직접 참조하는 제품 문서
- API, 프로토콜, DSL, 스키마, MCP 도구 계약처럼 구현과 외부 사용자가 따라야 하는 공식 계약
- 배포 웹사이트, 업데이트 피드, 릴리즈 노트처럼 대상 프로젝트가 공개 표면으로 운영하는 문서
- README에서 공식 기준으로 링크하는 아키텍처, 보안, 통합, 운영 정책 문서

`mydocs/`에 남겨야 하는 내용:

- 특정 Issue의 계획, 단계 결과, 최종 보고
- 조사, 대안 비교, 결정 근거, 아직 공식화되지 않은 초안
- 작업지시자 피드백과 리뷰 판단
- Hyper-Waterfall 운영 절차, 에이전트 규칙, 반복 적용되는 작업 기준
- 실패 증상, 원인, 해결, 재발 방지 기록

강제 규칙:

- 신규 Hyper-Waterfall 적용 중에는 공식 문서 루트를 선택하거나 생성하지 않는다. manifest 외 제품 문서가 필요해 보이면 적용 판단 결과의 보류 항목 또는 별도 task 후보로만 기록한다.
- 제품/사용자/기여자/외부 통합/API/아키텍처/로드맵 문서를 만들거나 옮기는 task는 수행계획서에 문서 위치 판단을 기록하고 작업지시자 승인을 받는다.
- 문서 위치 판단에는 대상 독자, 공식화 수준, 선택한 경로, 대안 경로, 선택 이유를 포함한다.
- `mydocs/manual/`은 대상 프로젝트 제품 문서 위치가 아니다. 반복 적용되는 Hyper-Waterfall 운영 절차와 기준만 둔다.
- `mydocs/tech/`는 기술 조사와 설계 판단 근거 위치다. 공식 계약이나 사용자 참조 문서로 승격하려면 별도 task에서 공식 문서 루트를 선택하고 승인받는다.
- 기존 저장소가 이미 공식 문서 루트나 문서 사이트 규칙을 가지고 있으면 그 관습을 우선 검토한다. Hyper-Waterfall은 `docs/`라는 이름을 기본값으로 만들지 않는다.

## manual 문서 중립성 정책

`mydocs/manual/` 문서는 장기적으로 반복 적용되는 원칙, 절차, 판단 기준을 기록한다. 특정 이슈, 특정 PR, 특정 Stage, 특정 release, 일회성 검증 결과, 실패 사건의 세부 기록은 manual 본문에 누적하지 않는다.

manual 본문에 둘 수 있는 내용:

- 반복 적용 가능한 정책과 guardrail
- 작업자가 직접 재사용할 수 있는 절차와 확인 기준
- 바뀌면 문서 자체를 갱신해야 하는 운영 기준과 책임 경계
- 하위 문서나 산출물 위치를 찾기 위한 짧은 entrypoint와 링크

manual 본문에서 분리해야 하는 내용:

- 특정 이슈, PR, Stage의 분석, 판단 근거, 완료 결과
- 특정 release 준비, 배포 검증, release decision의 상세 기록
- 특정 migration/update 검토 결과와 후속 이슈 handoff
- 실제 실패 증상, 재현 조건, 원인, 재발 방지 절차가 필요한 사건 기록

분리 위치:

| 내용 | 위치 |
|---|---|
| 내부 task의 단계 결과와 승인 근거 | `mydocs/working/` |
| 내부 task의 최종 결과와 장기 보관 보고 | `mydocs/report/` |
| 재사용 가능한 기술 조사와 설계 판단 | `mydocs/tech/` |
| 실패 증상, 원인, 해결, 재발 방지 기록 | `mydocs/troubleshootings/` |
| 본 프레임워크 저장소의 Hyper-Waterfall release 준비와 배포 검증 기록 | `docs/releases/` |
| 본 프레임워크 저장소의 기존 적용 저장소 migration/update 판단 기준 | `docs/migrations/` |

manual에서 특정 사건 문서를 참조해야 할 때는 사건 내용을 복제하지 않는다. 본문에는 일반화한 판단 기준과 짧은 링크만 두고, 상세 맥락은 해당 산출물 문서에 남긴다.

## 중앙 템플릿 정책

문서 출력 형식은 `mydocs/_templates/`에서 관리한다. 각 Skill은 가능한 한 중앙 템플릿을 먼저 참조하고, 템플릿을 읽을 수 없는 상황에서만 Skill 본문에 남은 최소 섹션 요약을 fallback으로 사용한다.

- 프레임워크 진실 원천: `templates/mydocs/_templates/`
- 적용 저장소 위치: `mydocs/_templates/`
- 본 저장소 dogfooding 위치: `mydocs/_templates -> ../templates/mydocs/_templates`

중앙 템플릿의 역할:

- GPT-5.5 프롬프팅 가이드의 expected output shape, Output Format 요구를 파일 구조로 고정한다.
- Claude Opus 4.7의 literal instruction following에 맞게 desired output format과 constraints를 명시한다.
- 모델이 매번 문서 구조를 새로 발명하지 않게 한다.
- 문서가 다음 세션의 입력 프롬프트로 재사용될 때 섹션 의미가 흔들리지 않게 한다.

강제 규칙:

- 산출물 폴더 내부에는 템플릿 파일을 두지 않는다.
- `orders/`, `plans/`, `working/`, `report/`, `feedback/`, `tech/`, `troubleshootings/`, `pr/`에는 실제 산출물만 둔다.
- 템플릿 파일은 실제 산출물로 오해되지 않도록 첫 제목에 `템플릿`을 포함한다.
- 템플릿이 바뀌면 관련 Skill의 템플릿 참조와 README의 문서 구조 설명을 함께 확인한다.

## GitHub 플랫폼 템플릿 정책

GitHub Issue와 Pull Request는 `mydocs/` 산출물이 아니라 GitHub 플랫폼 산출물이다. 따라서 해당 형식은 `mydocs/_templates/`에 두지 않고 `.github/` 경로에서 관리한다.

- Issue Form 진실 원천: `templates/.github/ISSUE_TEMPLATE/task.yml`
- 적용 저장소 위치: `.github/ISSUE_TEMPLATE/task.yml`
- 본 저장소 dogfooding 위치: `.github/ISSUE_TEMPLATE/task.yml`
- PR 본문 템플릿 진실 원천: `templates/.github/pull_request_template.md`
- PR 본문 적용 저장소 위치: `.github/pull_request_template.md`

역할 구분:

- `.github/ISSUE_TEMPLATE/task.yml`: GitHub Issue를 다음 작업의 첫 입력 프롬프트로 만들기 위해 배경, 목표, 포함 범위, 제외 범위, 수용 기준, 검증 기준, 참고, 메타데이터를 구조화한다.
- `.github/pull_request_template.md`: 최종 보고 후 PR 리뷰 화면에 들어갈 요약, 변경 내역, 검증, 남은 리스크의 출력 형식을 정의한다.
- `mydocs/_templates/`: 수행계획서, 구현계획서, 단계 보고서, 최종 보고서, 피드백, 기술 조사, 트러블슈팅, 외부 PR 검토 문서처럼 저장소 안에 남는 문서 산출물의 출력 형식을 정의한다.

강제 규칙:

- GitHub Issue Form을 `mydocs/_templates/`에 넣지 않는다.
- `task-register`는 이슈 본문을 만들 때 `.github/ISSUE_TEMPLATE/task.yml`을 우선 참조하고, 파일을 읽을 수 없을 때만 Skill 본문의 fallback 섹션을 사용한다.
- `.github/ISSUE_TEMPLATE/task.yml`이 바뀌면 `task-register` Skill, README의 프롬프트 가이드 설명, 본 매뉴얼의 역할 구분을 함께 확인한다.

## 배포 manifest와 버전 기록 정책

Hyper-Waterfall의 canonical 배포 단위는 GitHub Release/tag다. 프롬프트는 설치나 업데이트를 시작하는 사용자 인터페이스일 뿐이며, 실제 파일 적용 기준은 release에 포함된 `templates/manifest.json`, version 기록, migration guide다.

- manifest 진실 원천: `templates/manifest.json`
- 적용 저장소 버전 기록 위치: `.hyper-waterfall/version.json`
- migration guide 위치: `docs/migrations/`

세부 lifecycle 판단은 이 문서가 아니라 다음 문서를 따른다.

| 주제 | 진실 원천 |
|---|---|
| 신규 적용 절차와 판단 결과 형식 | `docs/lifecycle/adoption.md` |
| 기존 적용 저장소 업데이트 판단 | `docs/lifecycle/update.md` |
| Hyper-Waterfall 버전 업데이트 PR 전환 | `docs/lifecycle/update_pr.md` |
| release/tag와 update protocol | [`release_update_protocol.md`](release_update_protocol.md) |

`templates/manifest.json`의 역할:

- release에 포함되는 프레임워크 파일과 적용 대상 경로를 나열한다.
- `AGENTS.md`, `CLAUDE.md`, `.github/`, `mydocs/_templates/`, `mydocs/manual/`, `mydocs/skills/`처럼 업데이트 대상이 되는 영역을 명시한다.
- 각 항목의 업데이트 정책을 `overwrite`, `merge`, `manual`, `preserve`, `symlink` 중 하나로 표현한다.
- release 패키징 전에는 checksum을 `pending-release`로 둘 수 있고, 실제 tag/release 생성 시점에 확정한다.

업데이트 정책 의미:

- `overwrite`: 이전 manifest checksum과 대상 파일이 일치할 때만 자동 교체할 수 있다. 사용자 수정이 감지되면 충돌로 처리한다.
- `merge`: 사용자에게 보이는 규칙·템플릿 파일처럼 수정 가능성이 높은 파일에 사용한다. 자동 덮어쓰기보다 patch와 리뷰를 우선한다.
- `manual`: migration guide를 보고 유지보수자가 직접 판단해야 하는 항목에 사용한다.
- `preserve`: 없으면 만들 수 있지만, 한 번 생성된 뒤에는 명시 승인 없이 바꾸지 않는다.
- `symlink`: `.agents/skills -> ../mydocs/skills`, `.claude/skills -> ../mydocs/skills`처럼 링크 목표를 검증한다.

`.hyper-waterfall/version.json`은 작업 문서 산출물이 아니다. 따라서 `mydocs/` 아래에 두지 않는다. 이 파일은 대상 저장소가 어떤 Hyper-Waterfall release를 기준으로 설치되었는지와 마지막 업데이트 시점을 기록하기 위한 상태 파일이다. Framework lifecycle 판단은 이 파일을 읽어 현재 version과 목표 release의 manifest 차이, 관련 migration guide를 비교한다.

신규 적용은 strict manifest 기준으로 수행한다. 허용 대상은 manifest `files[]`의 target, `.hyper-waterfall/version.json`, manifest가 정의한 symlink이며, manifest 밖 파일이나 디렉터리는 생성하거나 수정하지 않는다. 제품 코드, 제품 문서, 아키텍처 문서, 로드맵, API 계약, 예제, 스키마 같은 대상 프로젝트 고유 산출물은 신규 적용 중 만들지 않는다. 필요성이 보이면 적용 판단 결과의 보류 항목 또는 별도 task 후보로 기록한다.

Hyper-Waterfall 버전 업데이트 PR도 GitHub 플랫폼 산출물이므로 별도 문서 템플릿을 `mydocs/_templates/`에 만들지 않는다. PR 본문은 `.github/pull_request_template.md`를 사용하고, manifest diff와 migration guide 근거는 `요약`, `변경 내역`, `검증`, `검증 한계`, `남은 리스크` 섹션에 반영한다.

Lifecycle 판단 결과는 적용 전 보고 형식이지 `mydocs/`에 장기 보관하는 산출물 템플릿이 아니다. 판단 결과가 승인되어 실제 변경이 시작되면 그때부터 GitHub Issue, 수행계획서, 구현계획서, 단계 보고서, 최종 보고서, PR 본문 템플릿으로 추적한다.

강제 규칙:

- `templates/manifest.json`이 바뀌면 README의 배포·업데이트 설명과 migration guide를 함께 확인한다.
- `.hyper-waterfall/version.json`은 실제 적용 저장소에 남는 상태 파일이며, 본 프레임워크 저장소의 문서 산출물 템플릿과 섞지 않는다.
- 사용자 수정 가능성이 높은 파일은 manifest에서 무조건 `overwrite`로 두지 않는다.
- README나 `docs/agent-entrypoint.md`의 설치·업데이트 설명이 바뀌면 manifest, migration guide, `framework_lifecycle_guide.md`, `release_update_protocol.md` 설명을 함께 확인한다.

## 폴더별 상세 규칙

각 폴더의 상세 규칙은 해당 폴더의 `README.md`를 진실 원천으로 삼는다. 이 매뉴얼에는 전체 구조와 폴더 간 경계만 둔다.

| 폴더 | 상세 규칙 |
|---|---|
| `_templates/` | [`../_templates/README.md`](../_templates/README.md) |
| `orders/` | [`../orders/README.md`](../orders/README.md) |
| `plans/` | [`../plans/README.md`](../plans/README.md) |
| `working/` | [`../working/README.md`](../working/README.md) |
| `report/` | [`../report/README.md`](../report/README.md) |
| `feedback/` | [`../feedback/README.md`](../feedback/README.md) |
| `tech/` | [`../tech/README.md`](../tech/README.md) |
| `troubleshootings/` | [`../troubleshootings/README.md`](../troubleshootings/README.md) |
| `pr/` | [`../pr/README.md`](../pr/README.md) |
| `manual/` | [`README.md`](README.md) |
| `skills/` | [`../skills/README.md`](../skills/README.md) |

규칙 변경 시에는 관련 폴더 README를 먼저 수정하고, 이 매뉴얼의 요약 표와 관련 매뉴얼 링크가 여전히 맞는지 확인한다.

## 외부 기여자 PR 처리 (`mydocs/pr/`)

외부 기여 PR 검토 상세 절차는 [`pr_process_guide.md`](pr_process_guide.md)와 [`external-pr-review`](../skills/external-pr-review/SKILL.md)를 따른다.

강제 규칙:

- 외부 기여자 PR은 내부 타스크와 다른 본질을 가지므로 별도 절차와 폴더를 사용한다.
- 이 목차는 외부 기여 PR 검토에만 적용한다.
- 외부 PR 검토 기록은 `mydocs/pr/`에 남긴다.
- 파일명은 `pr_{번호}_review.md`, `pr_{번호}_review_impl.md`(필요 시), `pr_{번호}_report.md`를 사용한다.
- 처리 완료 문서는 `mydocs/pr/archives/`로 이동한다.

내부 타스크의 `수행 -> 구현 -> 단계별 보고 -> 최종 보고` 절차는 외부 기여 PR 검토에 그대로 적용하지 않는다. 상세는 [`pr_process_guide.md`](pr_process_guide.md) 참조.

## Agent Skills 위치 정책

- 진실 원천: `mydocs/skills/{skill-name}/SKILL.md`
- Codex 인식 경로: `.agents/skills/` (저장소 루트 심볼릭 링크 -> `mydocs/skills`)
- Claude Code 인식 경로: `.claude/skills/` (저장소 루트 심볼릭 링크 -> `mydocs/skills`)
- 두 심볼릭 링크는 git에 mode `120000`으로 커밋된다.
- skill 본문은 도구 비종속(`gh`, `git`, 파일 생성)으로 작성하고, 도구별 호출 차이는 SKILL.md 말미 "호출 방법" 섹션에만 둔다.
- Skill이 계획서, 보고서, 리뷰 문서를 작성할 때는 먼저 `mydocs/_templates/`의 해당 템플릿을 참조한다.

## FAQ / 흔한 실수

### 마일스톤이 아직 확정되지 않았을 때

신규 하이퍼-워터폴 타스크는 GitHub Issue의 마일스톤을 먼저 확인한다. 이슈가 아직 없으면 [`task-register`](../skills/task-register/SKILL.md) Skill로 열린 milestone을 확인하고 생성 전 작업지시자 승인을 받는다. 마일스톤이 비어 있거나 모호하면 임의로 `m000` 같은 임시명을 만들지 말고 작업지시자에게 확인한다. 기존 레거시 문서는 이름을 유지할 수 있지만, 신규 문서는 마일스톤 포함 형식을 기준으로 한다.

### 외부 PR인지 내부 타스크인지 경계가 모호할 때

외부 기여자가 올린 PR을 검토하는 작업이면 `mydocs/pr/`와 [`pr_process_guide.md`](pr_process_guide.md)를 우선한다. 저장소 내부 Issue를 해결하기 위해 직접 변경하는 작업이면 `plans/`, `working/`, `report/` 흐름을 따른다. 외부 PR 검토 중 내부 후속 수정이 필요해지면 별도 GitHub Issue를 만들고 내부 타스크로 분리하는 편이 추적하기 쉽다.

### 산출물 폴더에 템플릿을 두고 싶을 때

두지 않는다. 산출물 폴더 내부에는 템플릿 파일을 두지 않는다. 예를 들어 `orders/`는 `yyyymmdd.md`만 허용하고, 오늘할일 템플릿은 `mydocs/_templates/orders.md`에 둔다. 이렇게 해야 실제 산출물과 출력 형식 정의가 섞이지 않는다.

GitHub Issue Form이나 PR 본문 템플릿도 `mydocs/_templates/`에 넣지 않는다. 이들은 문서 산출물 템플릿이 아니라 GitHub 플랫폼 템플릿이므로 `.github/ISSUE_TEMPLATE/` 또는 `.github/pull_request_template.md`에서 관리한다.

### 템플릿과 Skill 설명이 다를 때

중앙 템플릿과 Skill 중 하나만 고치지 않는다. Skill은 절차와 검증을 정의하고, 템플릿은 출력 형식을 정의한다. 둘이 어긋나면 같은 PR에서 함께 수정하고 README의 문서 구조 설명도 확인한다.

## 관련 매뉴얼

- [`task_workflow_guide.md`](task_workflow_guide.md): 내부 타스크의 수행계획서, 구현계획서, 단계 보고서, 최종 보고서 진행 순서.
- [`git_workflow_guide.md`](git_workflow_guide.md): `local/taskN`, `publish/taskN`, `{BASE_BRANCH}` 브랜치 운용과 PR 게시.
- [`pr_process_guide.md`](pr_process_guide.md): 외부 기여자 PR 검토 절차.
- `docs/migrations/README.md`: Hyper-Waterfall release 간 migration guide 작성 규칙.
