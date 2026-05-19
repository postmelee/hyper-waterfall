# Task #41 배포 채널 정합성 감사

## 조사 배경

#41은 M040의 마지막 정합성 감사 task다. npm, Homebrew, Codex plugin, Claude plugin의 실제 배포 또는 검증 상태가 사용자-facing 문서의 `planned`, `PoC`, `public`, `보류` 표현과 충돌하지 않는지 확인한다.

## 조사 질문

- 2026-05-17 현재 `v0.2.0` GitHub Release/tag, npm, Homebrew public tap의 actual status는 무엇인가?
- #33-#40, #52, #54 선행 결과는 모두 닫혔고 #41 문서 갱신 입력으로 사용할 수 있는가?
- README, release 문서, distribution 문서, migration guide, plugin 문서 중 실제 상태와 충돌하는 수정 후보는 무엇인가?

## 조사 대상

| 대상 | 이유 | 위치 |
|---|---|---|
| GitHub Issue/Release | #41 범위와 M040 선행 이슈, `v0.2.0` Release actual status 확인 | `gh issue`, `gh release` |
| npm registry | `hyper-waterfall@0.2.0` publish actual status 확인 | `npm view`, `npx` |
| Homebrew formula | `postmelee/tap/hyper-waterfall` public tap actual status 확인 | `brew info` |
| 저장소 문서 | planned/PoC/public/보류 표현 수정 후보 확인 | `README.md`, `docs/`, `plugins/`, `mydocs/report/` |
| manifest/migration | canonical 기준과 release status 표현 충돌 후보 확인 | `templates/manifest.json`, `docs/migrations/v0.1.0-to-v0.2.0.md` |

## 확인 시점

- 기준 시점: 2026-05-17 09:48:39 KST
- 작업 브랜치: `local/task41`
- 최신 기준: Stage 1 시작 전 `origin/main`의 #57 변경을 rebase로 반영했다.
- rebase 충돌 처리: `mydocs/orders/20260517.md`에서 #57 완료 행과 #41 진행 행을 모두 보존했다.

## 발견 내용

### GitHub Release/tag actual status

검증 결과:

| 항목 | 결과 |
|---|---|
| `git tag --list v0.2.0` | `v0.2.0` |
| `gh release view v0.2.0` | `tagName: v0.2.0`, `name: v0.2.0 - 배포·업데이트 프로토콜 MVP`, `isDraft: false`, `isPrerelease: false`, `publishedAt: 2026-05-08T20:34:07Z` |
| Release URL | `https://github.com/postmelee/hyper-waterfall/releases/tag/v0.2.0` |

수정 후보:

- `templates/manifest.json`은 Stage 3에서 `release.status: "released"`로 전환했다. `release.plannedTag` 필드명은 schema 호환을 위해 유지한다.
- `docs/releases/v0.2.0.md`는 Stage 2에서 상태 문서로 전환했고, Stage 3에서 `release.status`와 migration 보류 항목 기준을 보강했다.
- `docs/migrations/v0.1.0-to-v0.2.0.md`는 Stage 3에서 release 후 update protocol 기준 문서로 갱신했다.

### npm actual status

검증 결과:

| 항목 | 결과 |
|---|---|
| `npm view hyper-waterfall@0.2.0 version` | `0.2.0` |
| `npm view hyper-waterfall@0.2.0 dist.tarball` | `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz` |
| `npx hyper-waterfall@0.2.0 --version` | `0.2.0` |

`npx`는 package source root가 아닌 `/private/tmp`에서 실행했다. 기존 #33 보고서와 같이 source root에서는 local package resolution이 끼어들 수 있기 때문이다.

수정 후보:

- `README.md`와 `docs/releases/v0.2.0-npm-publish.md`는 npm publish 완료 상태와 일치한다.
- `docs/releases/v0.2.0.md`의 release notes 기준과 보류 항목은 Stage 2에서 npm publish 완료 상태와 후속 보류 항목을 분리했다.
- `docs/migrations/v0.1.0-to-v0.2.0.md`의 보류 항목은 Stage 3에서 npm publish를 제거하고 후속 승인 필요 항목으로 교체했다.

### Homebrew actual status

검증 결과:

| 항목 | 결과 |
|---|---|
| `HOMEBREW_NO_AUTO_UPDATE=1 brew info postmelee/tap/hyper-waterfall` | `stable 0.2.0`, formula source `https://github.com/postmelee/homebrew-tap/blob/HEAD/Formula/hyper-waterfall.rb`, license `MIT`, required dependency `node` |
| local install 상태 | `Not installed` |

`brew info`는 public formula metadata 확인이며 local install smoke는 실행하지 않았다.

수정 후보:

- `README.md`, `docs/distribution-channels.md`, `docs/homebrew-formula-tap-poc.md`는 public tap 경로와 Homebrew core 보류 상태를 대체로 정확히 설명한다.
- `docs/releases/v0.2.0.md`는 release notes 초안에 Homebrew public tap 완료를 반영했지만, 문서 전체가 release 전 준비 문서 상태로 남아 있다.

### Codex plugin actual status

근거:

- #37, #38, #52는 closed 상태다.
- #52 최종 보고서 기준 repo-local marketplace/CLI `/plugins` discovery가 확인됐다.
- #52 기준 Codex official self-serve public plugin publishing/management surface는 확인되지 않았고, public 배포는 실행하지 않았다.
- 대체 경로는 repo-local marketplace 등록, `AGENTS.md`, `mydocs/skills/{skill-name}/SKILL.md`, `docs/agent-entrypoint.md`, npm CLI dry-run이다.

수정 후보:

- `plugins/hyper-waterfall-codex/README.md`는 #52 결과와 일치한다.
- `docs/distribution-channels.md`는 Stage 2에서 #37/#38/#52 완료 상태와 official public 보류 상태를 한곳에 정리했다.

### Claude plugin actual status

근거:

- #39, #40, #54는 closed 상태다.
- #54 최종 보고서 기준 Claude plugin local/zip 후보는 validation과 directory/zip smoke를 통과했다.
- Official Claude plugin directory 제출은 실행하지 않았다.
- GitHub Release asset 게시도 실행하지 않았다. `v0.2.0` release에 `0.2.0-candidate.1` zip 후보를 올릴지는 별도 승인과 asset명/checksum 공개 방식 확정이 필요하다.

수정 후보:

- `plugins/claude/hyper-waterfall/README.md`는 public distribution을 별도 승인 후 판단한다고 설명하며 #54 결과와 일치한다.
- `docs/distribution-channels.md`는 Stage 2에서 Official directory 제출과 release asset 게시를 별도 public action 승인 전 보류로 정리했다.

### Docker actual status

Docker image 구현과 registry 배포는 M040 범위에서 제외된 상태다.

수정 후보:

- `README.md`는 Docker를 추가 배포 채널 후보로만 언급하므로 충돌이 작다.
- `docs/distribution-channels.md`는 Stage 2-3에서 Docker를 M040 제외와 후속 read-only image PoC 후보로 분리했다.

### 선행 이슈 상태

`gh issue list` 기준 주요 이슈 상태:

| Issue | 제목 | 상태 |
|---|---|---|
| #33 | npm publish 실행과 post-publish 검증 | CLOSED |
| #34 | Homebrew formula local tap smoke PoC | CLOSED |
| #35 | Homebrew public tap 배포와 설치 안내 | CLOSED |
| #36 | Codex/Claude plugin 공통 배포 원칙 정리 | CLOSED |
| #37 | Codex plugin packaging 검증 | CLOSED |
| #38 | Codex plugin 배포 후보 생성과 설치 smoke | CLOSED |
| #39 | Claude plugin packaging 검증 | CLOSED |
| #40 | Claude plugin 배포 후보 생성과 설치 smoke | CLOSED |
| #52 | Codex plugin public 배포와 UI discovery smoke | CLOSED |
| #54 | Claude plugin public marketplace 배포와 release asset 게시 | CLOSED |
| #57 | 신규 적용 시 manifest strict 범위 제한 명시 | CLOSED |
| #41 | 최종 배포 채널 정합성 감사와 문서 갱신 | OPEN |

## 결정

- Stage 2에서는 사용자-facing 문서의 배포 상태 표현을 실제 사용 가능 경로와 보류 경로에 맞춘다.
- Stage 3에서는 `templates/manifest.json`, migration guide, release 문서의 `planned`/release 전 표현을 actual Release/tag 상태와 맞췄다.
- #41에서는 신규 public 배포, release asset 게시, Homebrew core 제출, Docker publish를 실행하지 않는다.

## 비결정 / 보류

- Codex official public plugin 배포: official self-serve publishing surface와 별도 승인이 없어 보류한다.
- Claude Official directory 제출: 별도 public action 승인 전 보류한다.
- Claude GitHub Release asset 게시: asset명/checksum 공개 방식과 별도 승인 전 보류한다.
- Homebrew core 제출: #46 판단에 따라 보류한다.
- Docker image: M040 범위 밖으로 보류한다.
- root/directory checksum 값 확정: 공식 산식 없이 임의 값으로 채우지 않는다.

## 적용 영향

- Stage 2의 주요 수정 후보는 `docs/releases/v0.2.0.md`, `docs/distribution-channels.md`, `docs/migrations/v0.1.0-to-v0.2.0.md`다.
- `README.md`, `docs/agent-entrypoint.md`, plugin README들은 큰 충돌은 없지만 Stage 2 검색 검증 대상에 포함한다.
- `templates/manifest.json`은 actual Release/tag와 맞춰 Stage 3에서 `release.status: released`로 전환했다.

## Stage 2 적용 메모

- `docs/releases/v0.2.0.md`는 release 전 준비 문서 표현을 상태 문서로 바꾸고, GitHub Release/npm/Homebrew 완료와 Docker/Codex/Claude 보류 상태를 반영했다.
- `docs/distribution-channels.md`는 현재 채널 상태 표를 추가하고, Codex/Claude plugin을 packaging 후보가 아니라 검증 완료 local/repo-local 후보와 official public 보류 상태로 정리했다.
- `README.md`, `docs/agent-entrypoint.md`, plugin README는 최신 main 기준으로 actual status와 직접 충돌하는 문구가 없어 Stage 2에서 수정하지 않았다.
- `docs/migrations/v0.1.0-to-v0.2.0.md`와 `templates/manifest.json`은 release status와 migration 출력 기준이 연결되어 있어 Stage 3에서 함께 판단한다.

## Stage 3 적용 메모

- `templates/manifest.json`의 `release.status`는 actual `v0.2.0` Release/tag 공개 완료 상태와 맞도록 `released`로 전환했다. 기존 `release.plannedTag` 필드는 schema 호환을 위해 유지하고 실제 tag 값 `v0.2.0`을 계속 가리킨다.
- root checksum과 directory checksum은 산식이 확정되지 않았으므로 `pending-release`와 `null` 값을 유지했다.
- `docs/migrations/v0.1.0-to-v0.2.0.md`는 release 전 문맥을 release 후 기준 문서로 갱신하고, 완료된 GitHub Release/tag와 npm publish를 보류 항목에서 제거했다.
- `docs/releases/v0.2.0.md`와 `docs/distribution-channels.md`는 완료 항목, 이번 task의 상태 정리 항목, 후속 승인 필요 항목을 분리했다.

## Stage 4 적용 메모

- `mydocs/report/task_m040_41_report.md`는 #41 수용 기준 5개를 모두 대응하고, 완료 채널과 후속 승인 필요 항목을 최종 분리했다.
- `mydocs/working/task_m040_41_stage4.md`는 최종 검증 명령과 PR 전 남은 `task-final-report` 절차를 기록했다.
- Stage 4에서는 사용자-facing 문서, manifest, migration guide를 추가 수정하지 않았다.
- 오늘할일 완료 처리는 Stage 4 승인 후 `task-final-report` 절차에서 수행한다.

## 참고 링크

- [Issue #41](https://github.com/postmelee/hyper-waterfall/issues/41)
- [v0.2.0 Release](https://github.com/postmelee/hyper-waterfall/releases/tag/v0.2.0)
- [npm package](https://www.npmjs.com/package/hyper-waterfall/v/0.2.0)
- [Homebrew tap](https://github.com/postmelee/homebrew-tap)
