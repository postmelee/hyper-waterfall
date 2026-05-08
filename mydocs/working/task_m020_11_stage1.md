# task_m020_11_stage1.md - 기준과 비교 축 확정 단계 보고서

GitHub Issue: [#11](https://github.com/postmelee/hyper-waterfall/issues/11)
구현계획서: [`task_m020_11_impl.md`](../plans/task_m020_11_impl.md)
Stage: 1

## 단계 목적

Stage 1은 추가 배포 채널 전략 문서를 쓰기 전에 기존 M020 산출물의 배포 기준을 다시 확인하고, Stage 2에서 사용할 비교 축을 고정하는 단계다.

이번 단계에서는 소스 문서를 수정하지 않고 #7~#10 최종 보고서와 현재 README, agent entrypoint, migration guide, manual을 확인했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m020_11_stage1.md` | canonical 배포 기준, 추가 채널 비교 축, Stage 2 문서 작성 입력, 검증 결과 기록 |

## 본문 변경 정도 / 본문 무손실 여부

신규 단계 보고서만 작성했다. 기존 README, docs, templates, manual, Skill 본문은 수정하지 않았다.

## 기준 확인

기존 M020 산출물 기준은 다음처럼 정리된다.

| 근거 | 확인한 기준 |
|---|---|
| #7 GitHub Release + manifest + migration guide 도입 | canonical 배포 단위는 GitHub Release/tag이며, `templates/manifest.json`과 migration guide가 release/update 판단 기준이다. |
| #8 lifecycle 프로토콜 정리 | 설치·업데이트는 core Skill이 아니라 `docs/agent-entrypoint.md`, manifest, version 기록, migration guide를 기준으로 판단한다. |
| #9 Hyper-Waterfall 버전 업데이트 PR 워크플로우 | lifecycle 판단 결과는 이슈, `local/task{N}`, 계획서, 단계 보고서, PR 흐름으로 전환한다. 사용자 수정 파일은 자동 적용 가능 항목에 넣지 않는다. |
| #10 npm CLI MVP | npm CLI는 canonical 배포 단위가 아니라 manifest/version 기반 판단 결과를 재현하는 편의 실행 채널이다. 파일을 자동 덮어쓰지 않고 승인 요청을 출력한다. |

Stage 2 전략 문서의 기준 문장은 다음으로 고정한다.

> GitHub Release/tag + `templates/manifest.json` + migration guide가 canonical 기준이며, npm, Homebrew, Docker, Codex plugin, Claude plugin은 이 프로토콜을 실행하거나 발견하기 쉽게 하는 수단이다.

## 비교 축

Stage 2의 채널별 비교표는 다음 축을 사용한다.

| 비교 축 | 판단 질문 |
|---|---|
| 사용자 문제 | 이 채널이 어떤 사용자 상황을 더 쉽게 만드는가? |
| 배포 단위 | 사용자가 실제로 설치하거나 실행하는 단위는 무엇인가? |
| canonical protocol과의 관계 | GitHub Release/tag, manifest, migration guide를 어떻게 참조하거나 실행하는가? |
| 구현 난이도 | 현재 npm CLI와 기존 문서 기준에서 추가 구현이 얼마나 필요한가? |
| 운영 비용 | release마다 유지해야 할 metadata, registry, 문서, 검증 부담은 무엇인가? |
| 검증 부담 | 로컬 검증, 원격 검증, 플랫폼별 검증 중 무엇이 필요한가? |
| 보류 조건 | 구현하지 말아야 하거나 별도 승인으로 분리해야 하는 조건은 무엇인가? |
| 후속 마일스톤 후보 | 다음 마일스톤에서 구현 또는 검증할 수 있는 최소 단위는 무엇인가? |

## Stage 2 입력

Stage 2 전략 문서는 다음 결론을 출발점으로 삼는다.

- GitHub Release/tag는 기준이며 별도 실행 채널이 아니다.
- npm CLI는 이미 MVP가 있으므로 다른 채널이 재사용할 실행 계층으로 둔다.
- Homebrew는 macOS 개발자에게 설치 발견성과 업데이트 경험을 제공할 수 있지만 formula 유지와 release asset 정책이 필요하다.
- Docker는 로컬 Node 설치 없이 동일한 CLI 판단을 실행하게 할 수 있지만 image build, registry, volume mount, UID/path 검증 비용이 있다.
- Codex plugin과 Claude plugin은 에이전트 UI 안에서 방법론 진입을 매끄럽게 만들 수 있지만 도구별 packaging, 배포 심사, 사양 변화, lock-in 비용이 크다.
- 모든 채널은 실제 파일 적용 전 판단 결과와 승인 요청을 출력해야 하며, manifest diff를 자동 적용하는 별도 우회 경로가 되면 안 된다.

## 검증 결과

실행 명령:

```bash
rg -n 'GitHub Release|manifest|migration|npm CLI|canonical|Homebrew|Docker|plugin' README.md docs templates/mydocs/manual mydocs/report/task_m020_10_report.md
rg -n 'Homebrew|Docker|Codex plugin|Claude plugin|npm|GitHub Release|manifest|migration' mydocs/plans/task_m020_11.md mydocs/plans/task_m020_11_impl.md
git diff --check
```

결과:

- OK: README, agent entrypoint, migration guide, manual, #10 최종 보고서에서 GitHub Release/tag, manifest, migration guide, npm CLI, canonical 기준이 확인됐다.
- OK: #11 수행계획서와 구현계획서에서 Homebrew, Docker, Codex plugin, Claude plugin, npm, GitHub Release, manifest, migration 키워드가 확인됐다.
- OK: `git diff --check`가 경고 없이 통과했다.

## 잔여 위험

- Stage 1은 전략 문서를 아직 작성하지 않았다. 실제 채널별 우선순위와 보류 조건은 Stage 2 산출물에서 검증해야 한다.
- Codex/Claude plugin의 실제 packaging 사양은 이번 단계에서 확정하지 않았다. Stage 2에서도 구현 명세가 아니라 후보 채널과 검증 질문으로 다룬다.

## 다음 단계 영향

- Stage 2는 이 보고서의 기준 문장과 비교 축을 그대로 사용해 `docs/distribution-channels.md`를 작성한다.
- README는 Stage 3에서만 수정한다. Stage 2에서는 전략 문서 작성에 집중한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 `추가 배포 채널 전략 문서 작성`으로 진행한다.
