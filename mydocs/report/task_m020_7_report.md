# task_m020_7_report.md - GitHub Release + manifest + migration guide 도입 최종 보고서

GitHub Issue: [#7](https://github.com/postmelee/hyper-waterfall/issues/7)
마일스톤: M020

## 작업 요약

- 대상 이슈: #7
- 마일스톤: M020
- 단계 수: 3
- 작업 목적: 프롬프트만으로 배포하는 방식의 업데이트 한계를 보완하기 위해 GitHub Release/tag, manifest, version 기록, migration guide 기준을 도입한다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `templates/manifest.json` | 적용 파일 목록, 대상 경로, update policy, release/version/checksum 상태 정의 | 후속 `framework-install`, `framework-update`, CLI가 읽을 배포 기준 |
| `templates/mydocs/manual/document_structure_guide.md` | manifest, `.hyper-waterfall/version.json`, migration guide 경로와 교차 확인 규칙 추가 | 문서 구조와 배포 기준의 진실 원천 정렬 |
| `docs/migrations/README.md` | migration guide 목적, 파일명 규칙, 필수 섹션, 작성 기준 정의 | 버전별 migration 문서 작성 규칙 |
| `docs/migrations/v0.1.0-to-v0.2.0.md` | M020 목표 기준의 추가/수정 파일, 수동 확인, 충돌 가능성, 검증, 후속 작업 정리 | 기존 적용 저장소 업데이트 검토 기준 |
| `README.md` | 독립 배포 섹션 없이 짧은 업데이트 안내와 대상 저장소 구조의 version 기록만 반영 | 사용자용 진입 문서 |
| `docs/agent-entrypoint.md` | 신규 적용과 기존 업데이트 진입 절차를 manifest/version/migration 기준으로 분리 | 외부 저장소 적용 시 에이전트 진입 절차 |
| `templates/mydocs/manual/git_workflow_guide.md` | GitHub Release/tag와 update protocol 관계, release 전 확인 절차 추가 | 운영자용 Git/release 기준 |
| `templates/mydocs/manual/task_workflow_guide.md` | 프레임워크 설치·업데이트 작업 기준과 후속 Skill 위치 안내 추가 | 하이퍼-워터폴 작업 절차 |
| `mydocs/plans/task_m020_7.md` | 수행계획서 작성 | #7 작업 추적 |
| `mydocs/plans/task_m020_7_impl.md` | Stage 1~3 구현계획서 작성 | 단계별 구현과 검증 기준 |
| `mydocs/working/task_m020_7_stage1.md` | Stage 1 완료 보고서 작성 | manifest/version 정책 검증 기록 |
| `mydocs/working/task_m020_7_stage2.md` | Stage 2 완료 보고서 작성 | migration guide 체계 검증 기록 |
| `mydocs/working/task_m020_7_stage3.md` | Stage 3 완료 보고서 작성 | README/Manual 반영 검증 기록 |
| `mydocs/orders/20260506.md` | M020 #7 행 추가 및 완료 처리 | 오늘할일 진행 상태 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| 배포 manifest | 없음 | `templates/manifest.json` 255 lines |
| manifest 적용 항목 | 없음 | 17개 file/symlink 항목 |
| manifest update policy | 없음 | `overwrite`, `merge`, `manual`, `preserve`, `symlink` 5종 |
| 적용 저장소 version 기록 위치 | 없음 | `.hyper-waterfall/version.json` |
| migration guide 문서 | 없음 | 2개 문서, 총 157 lines |
| 단계 보고서 | 없음 | Stage 1~3 보고서 3개, 총 218 lines |
| 전체 작업 diff | 없음 | 14 files changed, 1044 insertions, 12 deletions |
| README 배포 상세 섹션 | 없음 | 없음. 사용자 피드백에 따라 독립 `## 배포와 업데이트` 섹션은 제거하고 짧은 안내만 유지 |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| manifest 파일이 존재하고 JSON으로 파싱된다 | OK — `test -f templates/manifest.json`, `ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'` 통과 |
| manifest 필수 필드를 포함한다 | OK — `schemaVersion`, `frameworkVersion`, `release`, `versionState`, `files`, `updatePolicies`, `checksum` grep 확인 |
| 주요 적용 파일과 폴더가 manifest에 포함된다 | OK — `AGENTS.md`, `CLAUDE.md`, `.github`, `mydocs/_templates`, `mydocs/skills` 계열 grep 확인 |
| manifest update policy와 source 경로가 유효하다 | OK — `files=17, policies=overwrite,merge,manual,preserve,symlink` 검증 통과 |
| migration guide 체계가 존재한다 | OK — `docs/migrations/README.md`, `docs/migrations/v0.1.0-to-v0.2.0.md` 존재 확인 |
| migration guide 필수 섹션을 포함한다 | OK — 대상 버전, 변경 요약, 추가 파일, 수정 파일, 수동 확인, 충돌 가능성, 검증, 후속 작업 섹션 grep 확인 |
| README가 배포 상세를 과도하게 노출하지 않는다 | OK — 독립 `## 배포와 업데이트` 섹션과 목차 항목이 없음을 확인 |
| README와 Manual이 업데이트 프로토콜을 연결한다 | OK — `GitHub Release`, `manifest`, `migration`, `version`, `.hyper-waterfall` 참조 확인 |
| 후속 Skill 범위가 명확하다 | OK — `framework-install`, `framework-update`가 후속 M020 작업임을 README/Manual에서 확인 |
| whitespace 오류가 없다 | OK — `git diff --check` 통과 |

### 단계별 검증 결과

- Stage 1: [`task_m020_7_stage1.md`](../working/task_m020_7_stage1.md) — manifest와 version 정책 정의, JSON parse와 policy/source 검증 통과.
- Stage 2: [`task_m020_7_stage2.md`](../working/task_m020_7_stage2.md) — migration guide 체계 추가, 필수 섹션과 버전 기준 검증 통과.
- Stage 3: [`task_m020_7_stage3.md`](../working/task_m020_7_stage3.md) — README와 Manual 반영, README 범위 보정과 release/update 용어 검증 통과.

## 잔여 위험과 후속 작업

### 잔여 위험

- 실제 `v0.2.0` GitHub Release/tag는 아직 생성하지 않았다. 이번 task는 release 기준 문서화와 manifest/migration guide 도입까지가 범위다.
- checksum은 실제 release 패키징 시점에 확정되므로 현재 `pending-release` 상태다.
- 적용 저장소에서 `docs/migrations/`를 로컬에 복사할지, 프레임워크 저장소의 버전 고정 링크로 참조할지는 update PR 워크플로우에서 확정해야 한다.
- manifest를 실제로 소비하는 `framework-install`, `framework-update`, CLI 구현은 후속 task 범위다.

### 후속 작업 후보

- #8 `framework-install / framework-update Skill 추가`
- #9 `update PR 워크플로우 정착`
- #10 `npm CLI MVP로 init/update/doctor 제공`
- #11 `추가 배포 채널 확장안 검토`

## 작업지시자 승인 요청

- 본 최종 보고서와 통합 검증 결과를 기준으로 `publish/task7` 브랜치 push 및 `main` 대상 PR 게시 절차를 진행한다.
