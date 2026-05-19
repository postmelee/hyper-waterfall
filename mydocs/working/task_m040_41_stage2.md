# Task #41 Stage 2 보고서 - 사용자 문서 배포 상태 정합성 갱신

GitHub Issue: [#41](https://github.com/postmelee/hyper-waterfall/issues/41)
구현계획서: [`task_m040_41_impl.md`](../plans/task_m040_41_impl.md)
Stage: 2

## 단계 목적

Stage 1에서 확인한 실제 배포 상태를 기준으로 사용자-facing 문서의 release/channel 표현을 갱신한다. 이미 완료된 GitHub Release, npm publish, Homebrew public tap은 완료 상태로 쓰고, Codex/Claude plugin public 배포, Claude release asset, Homebrew core, Docker image는 후속 또는 보류 항목으로 분리한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/releases/v0.2.0.md` | release 전 준비 문서를 release 전후 상태 문서로 전환하고, `v0.2.0` GitHub Release/npm/Homebrew 완료 상태와 Codex/Claude/Docker/Homebrew core 보류 상태를 표와 release notes 기준에 반영했다. |
| `docs/distribution-channels.md` | 현재 채널 상태 표를 추가하고, Homebrew public tap 완료, Homebrew core 보류, Docker M040 제외, Codex repo-local 후보, Claude local/zip 후보 상태를 사용자-facing 경로와 후속 조건으로 분리했다. |
| `mydocs/tech/task_m040_41_distribution_audit.md` | Stage 2 적용 메모를 추가해 수정한 문서, 수정하지 않은 문서, Stage 3으로 넘긴 manifest/migration 판단 대상을 기록했다. |
| `mydocs/orders/20260519.md` | 2026-05-19 기준 오늘할일 보드를 추가하고 #41을 Stage 2 진행 상태로 기록했다. |
| `mydocs/working/task_m040_41_stage2.md` | Stage 2 목적, 산출물, 검증 결과, 잔여 위험, 다음 단계 영향을 정리했다. |

## 본문 변경 정도 / 본문 무손실 여부

문서 본문은 배포 상태 표현을 현재 사실에 맞추는 범위에서만 수정했다. 기존 release 전 체크리스트와 release notes 초안 맥락은 삭제하지 않고 "기록" 또는 "기준"으로 재라벨링했다.

README, `docs/agent-entrypoint.md`, plugin README/CHANGELOG는 최신 main 기준으로 Stage 1 감사 결과와 직접 충돌하는 사용자-facing 문구가 없어 수정하지 않았다. `docs/migrations/v0.1.0-to-v0.2.0.md`와 `templates/manifest.json`은 release status와 migration 출력 기준이 연결되어 있어 Stage 3에서 함께 판단한다.

## 검증 결과

실행 명령:

```bash
rg -n 'planned|PoC|public|보류|Docker|npm|Homebrew|Codex|Claude|release asset|Official|Plugin Directory|core|postmelee/tap/hyper-waterfall|hyper-waterfall@0.2.0|npx hyper-waterfall@0.2.0|v0.2.0|templates/manifest.json|migration guide' README.md docs plugins mydocs/tech/task_m040_41_distribution_audit.md
rg -n 'npm publish|Homebrew public tap|Codex plugin|Claude plugin|Official directory|release asset|Docker 제외|후속|#41' README.md docs mydocs/working/task_m040_41_stage2.md
git diff --check
```

결과:

- OK: 첫 번째 검색은 현재 문서의 완료/보류/후속 표현을 확인했다. 남은 `planned`, `migration guide`, `templates/manifest.json`, checksum 관련 표현은 Stage 3 판단 대상 또는 역사적 기록으로 분류됐다.
- OK: 두 번째 검색은 npm publish 완료, Homebrew public tap 완료, Codex/Claude plugin public 보류, Official directory, release asset, Docker 제외, 후속 분리가 사용자-facing 문서와 이 보고서에 드러남을 확인했다.
- OK: `git diff --check`가 공백 오류 없이 통과했다.

수동 확인:

- OK: 지금 실행 가능한 설치/확인 경로와 별도 승인 전 실행하지 않을 public action을 분리했다.
- OK: Codex/Claude plugin을 public stable channel로 표현하지 않고 repo-local 또는 local/zip 후보와 public 보류 상태로 표현했다.
- OK: manual/SKILL 본문 수정 필요는 발견하지 않아 README의 "핵심 SKILL" 표와 workflow guide의 SKILL 호출 안내 갱신 의무가 발생하지 않았다.

## 잔여 위험

- `templates/manifest.json`의 `release.status: planned`와 실제 `v0.2.0` Release/tag 공개 완료 상태의 관계는 Stage 3에서 판단해야 한다.
- `docs/migrations/v0.1.0-to-v0.2.0.md`의 출력 예시와 canonical 상태 표현은 Stage 3에서 manifest와 함께 확인해야 한다.
- root/directory checksum은 산식이 확정되지 않았으므로 `pending-release`를 임의 값으로 대체하지 않았다.
- Codex official public 배포, Claude Official directory 제출, Claude release asset 게시, Homebrew core 제출, Docker image 구현은 이번 Stage에서 실행하지 않았다.

## 다음 단계 영향

- Stage 3은 `templates/manifest.json`, migration guide, canonical 기준 문서를 함께 보며 release 완료 상태와 `planned` 표현의 충돌 여부를 판단한다.
- Stage 3에서 완료 항목, 명시 보류 항목, 후속 이슈 후보를 최종 분리해야 한다.
- 외부 public action이 필요하다고 판단되면 이번 task 범위에서 실행하지 않고 별도 승인 또는 별도 이슈 후보로 기록한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 canonical 기준과 후속 작업 분리로 진행한다.
