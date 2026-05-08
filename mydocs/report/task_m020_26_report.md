# task_m020_26_report.md - v0.2.0 manifest release 상태와 checksum 확정 최종 보고서

GitHub Issue: [#26](https://github.com/postmelee/hyper-waterfall/issues/26)
마일스톤: M020

## 작업 요약

- 대상 이슈: #26
- 마일스톤: M020
- 단계 수: 3
- 작업 목적: `v0.2.0` GitHub Release/tag 생성 전에 `templates/manifest.json`의 release 상태와 checksum 기준을 확정하고 문서 정합성을 맞춘다.

## 변경 파일 목록과 영향 범위

| 경로 | 변경 요약 | 영향 범위 |
|---|---|---|
| `templates/manifest.json` | file 12개 checksum을 SHA-256 값과 `ready` 상태로 확정. root/directory는 `pending-release`, symlink는 `not-applicable` 유지 | release manifest, update 판단 기준 |
| `docs/releases/v0.2.0.md` | checksum 산출 정책, 보류 항목, 통합 검증 결과, release notes 초안 보강 | `v0.2.0` release 생성 전 maintainer 체크리스트 |
| `docs/migrations/v0.1.0-to-v0.2.0.md` | checksum 상태를 file/root/directory/symlink별로 구분하고 자동 적용 가능 범위를 file checksum으로 제한 | 기존 적용 저장소 update 판단 |
| `docs/distribution-channels.md` | 추가 배포 채널에서 checksum 정책과 보류 상태를 안정 배포처럼 오해하지 않도록 표현 보강 | Homebrew/Docker/plugin 등 후속 채널 기준 |
| `mydocs/plans/task_m020_26.md` | 수행계획서 작성 | 작업 범위와 제외 범위 |
| `mydocs/plans/task_m020_26_impl.md` | 구현계획서 작성 | Stage 1~3 산출물과 검증 기준 |
| `mydocs/working/task_m020_26_stage1.md` | manifest checksum 산출 가능성 조사 보고 | Stage 2 판단 근거 |
| `mydocs/working/task_m020_26_stage2.md` | checksum 정책 반영 보고 | Stage 2 검증 기록 |
| `mydocs/working/task_m020_26_stage3.md` | 문서 정합성과 release 전 검증 보고 | Stage 3 검증 기록 |
| `mydocs/orders/20260509.md` | #26 오늘할일 완료 처리 | 작업 현황 관리 |

## 변경 전·후 정량 비교

| 지표 | 변경 전 | 변경 후 |
|---|---|---|
| manifest `kind: file` checksum ready 항목 | 0개 | 12개 |
| manifest root checksum | `pending-release` | `pending-release` |
| manifest `kind: directory` checksum | 3개 모두 `pending-release` | 3개 모두 `pending-release` |
| manifest `kind: symlink` checksum | 2개 모두 `not-applicable` | 2개 모두 `not-applicable` |
| release status | `planned` | `planned` |
| Stage 보고서 | 없음 | 3개 |
| 실제 `v0.2.0` tag / GitHub Release | 없음 | 없음 |

## 검증 결과

| 수용 기준 | 결과 |
|---|---|
| manifest JSON parse가 통과한다 | OK — `ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'` 통과 |
| file checksum이 source SHA-256과 일치한다 | OK — file checksum ready 항목 12개가 source SHA-256과 일치 |
| release/checksum 표현이 주요 문서에서 정합하다 | OK — 통합 `rg`로 manifest, release 문서, migration guide, README, distribution strategy의 표현 확인 |
| 실제 tag/release는 생성하지 않는다 | OK — `git tag --list --sort=version:refname` 빈 출력, `gh release list --repo postmelee/hyper-waterfall --limit 20` 빈 출력 |
| 공백 오류가 없다 | OK — `git diff --check` 통과 |
| 작업 브랜치 상태가 정리되어 있다 | OK — 최종 보고서 작성 전 `local/task26` ahead 5, 미커밋 변경 없음 |

### 단계별 검증 결과

- Stage 1: [`task_m020_26_stage1.md`](../working/task_m020_26_stage1.md) — file 12개 checksum 산출 가능, directory/root 보류 필요성 확인.
- Stage 2: [`task_m020_26_stage2.md`](../working/task_m020_26_stage2.md) — file checksum 12개 `ready` 반영, root/directory 보류 정책 문서화.
- Stage 3: [`task_m020_26_stage3.md`](../working/task_m020_26_stage3.md) — migration/release/distribution 문서 정합성 보강, tag/release 미생성 확인.

## 잔여 위험과 후속 작업

### 잔여 위험

- root checksum 의미와 directory checksum 공식 산식은 아직 확정하지 않았다.
- `v0.2.0` Git tag와 GitHub Release는 아직 생성하지 않았다.
- npm publish, Homebrew, Docker, Codex plugin, Claude plugin 배포는 별도 승인과 후속 이슈가 필요하다.

### 후속 작업 후보

- `v0.2.0` Git tag와 GitHub Release 생성 여부 최종 승인.
- root/directory checksum 공식 산식 확정 또는 release artifact checksum으로 대체할지 결정.
- npm publish와 추가 배포 채널 구현 이슈 분리.

## 작업지시자 승인 요청

- 최종 보고서와 수용 기준 검증 결과를 승인하면 `publish/task26` push와 PR 생성 결과를 검토한다.
