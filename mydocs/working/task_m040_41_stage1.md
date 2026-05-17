# Task #41 Stage 1 보고서 - 실제 배포 상태와 선행 이슈 입력 감사

GitHub Issue: [#41](https://github.com/postmelee/hyper-waterfall/issues/41)
구현계획서: [`task_m040_41_impl.md`](../plans/task_m040_41_impl.md)
Stage: 1

## 단계 목적

Stage 1은 #41 문서 정합성 수정 전에 실제 배포 상태와 선행 이슈 결과를 확인하는 단계다. GitHub Release/tag, npm, Homebrew, Codex plugin, Claude plugin, Docker 제외 상태를 대조해 Stage 2/3 수정 후보를 분류했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_41_distribution_audit.md` | 확인 시점, GitHub/npm/Homebrew actual status, #33-#40/#52/#54 결과, 수정 후보, 보류 항목 정리 |
| `mydocs/working/task_m040_41_stage1.md` | Stage 1 검증 결과와 다음 단계 영향 기록 |
| `mydocs/orders/20260517.md` | #57 완료 행을 보존한 상태에서 #41 비고를 Stage 1 완료 후 승인 대기로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

이번 Stage는 감사 기록과 단계 보고서 신규 작성이 중심이다. 사용자-facing 문서 본문은 수정하지 않았고, 오늘할일 파일은 기존 #54, #52, #57 행을 보존한 채 #41 비고만 갱신했다.

Stage 1 시작 전 `origin/main`의 #57 변경을 rebase로 반영했다. `mydocs/orders/20260517.md` 충돌은 #57 완료 행과 #41 진행 행을 모두 유지하는 방식으로 해결했다.

## 검증 결과

실행 명령:

```bash
git status --short --branch
gh issue view 41 --json number,title,state,milestone,body
gh issue list --repo postmelee/hyper-waterfall --state all --json number,title,state --limit 100
gh release view v0.2.0 --repo postmelee/hyper-waterfall --json tagName,name,isDraft,isPrerelease,publishedAt,url
git tag --list v0.2.0
npm view hyper-waterfall@0.2.0 version
npm view hyper-waterfall@0.2.0 dist.tarball
npx hyper-waterfall@0.2.0 --version
HOMEBREW_NO_AUTO_UPDATE=1 brew info postmelee/tap/hyper-waterfall
rg -n '#33|#34|#35|#36|#37|#38|#39|#40|#52|#54|npm|Homebrew|Codex|Claude|Docker|보류|public|planned|PoC|release asset' mydocs/report docs README.md plugins
rg -n '#41|확인 시점|actual|planned|npm|Homebrew|Codex|Claude|Docker|수정 후보|보류' mydocs/tech/task_m040_41_distribution_audit.md mydocs/working/task_m040_41_stage1.md
git diff --check
```

결과:

- OK: `git status --short --branch`는 `local/task41...origin/main [ahead 2]`와 Stage 1 산출물 변경 3개를 보여줬다. rebase 전에는 `origin/main` 대비 behind 상태였고, Stage 1 작성 전 최신 `origin/main` 위로 재정렬했다.
- OK: #41은 OPEN이고 M040 이슈다.
- OK: #33-#40, #52, #54는 CLOSED 상태다. #57도 CLOSED로 최신 main에 반영됐다.
- OK: `gh release view v0.2.0`은 draft/prerelease가 아닌 공개 Release를 반환했다. URL은 `https://github.com/postmelee/hyper-waterfall/releases/tag/v0.2.0`이다.
- OK: `git tag --list v0.2.0`은 `v0.2.0`을 반환했다.
- OK: `npm view hyper-waterfall@0.2.0 version`은 `0.2.0`을 반환했다.
- OK: `npm view hyper-waterfall@0.2.0 dist.tarball`은 `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz`를 반환했다.
- OK: `/private/tmp`에서 실행한 `npx hyper-waterfall@0.2.0 --version`은 `0.2.0`을 반환했다.
- OK: `HOMEBREW_NO_AUTO_UPDATE=1 brew info postmelee/tap/hyper-waterfall`은 stable `0.2.0`, formula source, MIT license, `node` dependency를 반환했다. local install 상태는 `Not installed`였다.
- OK: 문서 검색으로 `docs/releases/v0.2.0.md`, `docs/migrations/v0.1.0-to-v0.2.0.md`, `templates/manifest.json`, `docs/distribution-channels.md`의 수정 후보를 확인했다.
- OK: `git diff --check`는 출력 없이 통과했다.

## 잔여 위험

- `templates/manifest.json`의 `release.status: planned`를 actual Release 상태에 맞춰 바꿀지 여부는 Stage 3 판단으로 남았다.
- release 문서와 migration guide의 release 전 표현은 Stage 2/3에서 수정해야 한다.
- Codex/Claude plugin public 배포와 release asset 게시 여부는 이번 Stage에서 실행하지 않았고, 별도 승인 전 보류 상태다.

## 다음 단계 영향

- Stage 2는 `docs/releases/v0.2.0.md`, `docs/distribution-channels.md`, `docs/migrations/v0.1.0-to-v0.2.0.md`의 사용자-facing 표현부터 실제 상태에 맞춘다.
- Stage 3은 manifest `release.status`, root/directory checksum 보류, 후속 작업 후보를 최종 분리한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 사용자-facing 문서 표현 정합성 갱신으로 진행한다.
