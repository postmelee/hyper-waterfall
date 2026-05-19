# Task #41 Stage 3 보고서 - canonical 기준과 후속 작업 분리

GitHub Issue: [#41](https://github.com/postmelee/hyper-waterfall/issues/41)
구현계획서: [`task_m040_41_impl.md`](../plans/task_m040_41_impl.md)
Stage: 3

## 단계 목적

Stage 1-2에서 확인한 실제 배포 상태와 사용자-facing 문서 갱신 결과를 기준으로 canonical 기준을 확정한다. `templates/manifest.json`의 release status, migration guide의 release 후 보류 항목, distribution 문서의 완료/후속 분리를 실제 `v0.2.0` 공개 상태와 맞춘다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/manifest.json` | 실제 `v0.2.0` GitHub Release/tag 공개 완료 상태와 맞게 `release.status`를 `released`로 전환했다. `release.plannedTag` 필드는 schema 호환을 위해 유지했다. |
| `docs/migrations/v0.1.0-to-v0.2.0.md` | release 전 기준 문구를 release 후 update protocol 기준으로 갱신하고, 완료된 GitHub Release/tag와 npm publish를 보류 항목에서 제거했다. |
| `docs/releases/v0.2.0.md` | canonical 표와 정합성 대조 결과에 `released` 상태를 반영하고, release 후 보류 항목이 checksum, Homebrew core, Docker, plugin public, automation을 가리키도록 보강했다. |
| `docs/distribution-channels.md` | 현재 채널 상태에 manifest `released`를 반영하고, M040 완료 항목과 후속 승인 필요 항목을 분리한 표를 추가했다. |
| `mydocs/tech/task_m040_41_distribution_audit.md` | Stage 3 결정과 적용 메모를 추가하고, Stage 1 당시 수정 후보를 해소된 상태로 갱신했다. |
| `mydocs/orders/20260519.md` | #41 비고를 Stage 3 진행 상태로 갱신했다. |
| `mydocs/working/task_m040_41_stage3.md` | Stage 3 목적, 산출물, 검증 결과, 잔여 위험, 다음 단계 영향을 정리했다. |

## 본문 변경 정도 / 본문 무손실 여부

문서 본문은 release 완료 상태와 보류 항목 분리를 맞추는 범위에서만 수정했다. migration guide의 수동 확인, 충돌 가능성, CLI 출력 기준 구조는 유지했고, release 전 historical record는 release 문서 안에서 기록 문맥으로 남겼다.

`templates/manifest.json`은 새 schema를 만들지 않고 `release.status` 값만 `planned`에서 `released`로 바꿨다. root checksum과 directory checksum은 공식 산식 없이 채우지 않고 기존 `pending-release`와 `null` 값을 유지했다.

## 검증 결과

실행 명령:

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n 'canonical|GitHub Release/tag|templates/manifest.json|migration guide|pending-release|released|planned|fallback|NO-GO|GO|후속|보류|Homebrew core|Docker|Official directory|release asset|Codex official|Claude Official' README.md docs templates/manifest.json mydocs/tech/task_m040_41_distribution_audit.md mydocs/working/task_m040_41_stage3.md
git diff --check
```

결과:

- OK: `templates/manifest.json` JSON parse가 통과했다.
- OK: 검색 검증에서 canonical 기준, `released`, `pending-release`, 보류/후속 항목, plugin public 보류 표현을 확인했다.
- OK: `git diff --check`가 공백 오류 없이 통과했다.

수동 확인:

- OK: manifest 변경은 release protocol을 새로 정의하지 않고 actual Release/tag 상태와 표현을 맞추는 최소 수정이다.
- OK: root/directory checksum 보류는 임의 값으로 채우지 않았다.
- OK: Homebrew core, Docker, Codex official public, Claude Official directory, Claude release asset, release automation은 후속 승인 필요 항목으로만 남겼다.
- OK: 신규 public 배포, release asset 게시, Homebrew core 제출, Docker publish는 실행하지 않았다.

## 잔여 위험

- root/directory checksum 산식은 아직 확정되지 않았으므로 적용 저장소 업데이트에서는 계속 수동 확인이 필요하다.
- `release.plannedTag` 필드명은 schema 호환을 위해 유지했으나, 이후 schema 정리 작업에서 `releaseTag` 같은 명칭으로 바꿀지 별도 판단할 수 있다.
- Codex/Claude plugin public 배포와 release asset 게시 여부는 이번 task에서 결정하지 않고 후속 승인 대상으로 유지한다.

## 다음 단계 영향

- Stage 4는 #41 수용 기준별로 Stage 1-3 결과를 묶어 최종 보고서를 작성한다.
- 최종 보고서에는 완료 채널, 보류 채널, manifest/migration 정합성, 검증 결과, 후속 작업 후보를 분리해 기록해야 한다.
- 오늘할일 완료 처리는 Stage 4 완료 승인 후 `task-final-report` 절차에서 수행한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4 최종 검증과 보고로 진행한다.
