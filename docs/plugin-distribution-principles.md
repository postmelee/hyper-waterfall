# Codex/Claude plugin 공통 배포 원칙

이 문서는 Codex plugin과 Claude plugin을 실제로 packaging하기 전에 두 채널이 공유해야 할 canonical 참조 원칙과 bundle 책임 경계를 정의한다. 실제 Codex plugin bundle 생성, Claude plugin bundle 생성, hook 구현, public 배포는 이 문서의 범위가 아니다.

## 목적

Codex plugin과 Claude plugin의 목적은 Hyper-Waterfall을 agent UI 안에서 더 쉽게 발견하고 실행하게 만드는 것이다. plugin은 사용자가 `task-start`, `task-stage-report`, `task-final-report` 같은 정형 흐름을 찾고, `docs/agent-entrypoint.md`와 npm CLI 판단 흐름으로 진입하도록 돕는다.

plugin은 새로운 방법론 본문이나 release 기준을 만들지 않는다. plugin package는 특정 도구에 맞춘 배포 artifact일 뿐이며, Hyper-Waterfall의 canonical source는 계속 release와 저장소의 기존 문서 구조가 담당한다.

## 비목표

- plugin이 `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, npm CLI 출력 계약을 재정의하지 않는다.
- plugin이 `templates/mydocs/skills` 또는 `templates/mydocs/manual`의 별도 진실 원천이 되지 않는다.
- Codex 전용 절차나 Claude 전용 절차를 만들어 multi-agent 호환성을 깨뜨리지 않는다.
- plugin 설치만으로 작업지시자 승인 게이트, 이슈 기반 추적, 단계 보고, PR 흐름을 우회하지 않는다.
- hook을 작업지시자 승인 자동화 장치로 사용하지 않는다.

## canonical source

| 구성 | 책임 | plugin에서의 취급 |
|---|---|---|
| GitHub Release/tag | Hyper-Waterfall version을 고정하는 canonical 배포 단위 | plugin version과 산출물의 기준 version을 대조한다. |
| `templates/manifest.json` | 적용 대상 파일, target 경로, update policy, checksum 상태를 정의하는 manifest | plugin bundle 안에서 복제하거나 수정하지 않는다. 필요 시 읽기 기준으로 참조한다. |
| `docs/migrations/` | 기존 적용 저장소가 version을 올릴 때 읽는 migration 기준 | plugin이 migration guide를 재작성하지 않는다. 업데이트 판단은 migration guide 링크와 `docs/agent-entrypoint.md` 형식을 따른다. |
| `docs/agent-entrypoint.md` | 신규 적용과 기존 업데이트 판단 결과 형식 | plugin의 agent-friendly 진입 문구가 따라야 할 출력 계약이다. |
| npm CLI | `init`, `update`, `doctor` 판단을 실행하는 편의 실행 채널 | plugin이 CLI를 호출할 수는 있지만, CLI 출력만으로 파일을 자동 적용하지 않는다. |
| `templates/mydocs/skills` | Codex와 Claude Code가 함께 읽는 core Skill 진실 원천 | plugin에 포함되더라도 release snapshot 또는 packaging artifact로만 둔다. |
| `templates/mydocs/manual` | 하이퍼-워터폴 운영 규칙과 절차 설명의 진실 원천 | plugin에 별도 manual 본문을 만들지 않는다. 필요한 설명은 원문 링크 또는 release snapshot 참조로 둔다. |

## 책임 경계

| 영역 | 담당 | 책임 경계 |
|---|---|---|
| 작업 승인 | 작업지시자와 하이퍼-워터폴 절차 | plugin과 hook은 승인 여부를 자동 판정하지 않는다. |
| 신규 적용 판단 | `docs/agent-entrypoint.md`, `templates/manifest.json`, npm CLI dry-run | plugin은 판단 결과 형식을 안내하거나 CLI 실행을 돕는다. |
| 기존 업데이트 판단 | `.hyper-waterfall/version.json`, 목표 release manifest, migration guide | plugin은 update 후보를 직접 적용하지 않고 판단 결과와 승인 요청을 노출한다. |
| 정형 task 절차 | `templates/mydocs/skills`의 core Skill | plugin은 Skill을 발견하고 호출하기 쉽게 한다. Skill 본문을 갈라서 관리하지 않는다. |
| 운영 규칙 설명 | `AGENTS.md`, `CLAUDE.md`, `templates/mydocs/manual` | plugin은 요약 안내와 링크를 제공할 수 있지만, 규칙의 새 원천이 아니다. |
| CLI 실행 | npm CLI | plugin이 npm CLI를 호출할 경우 CLI version과 release 기준을 대조하고 read-only/dry-run 기본값을 유지한다. |
| guardrail | hook 후보와 공통 정책 script | hook은 객관 상태와 위험 동작을 보조 확인한다. 승인 자동화와 파일 자동 적용은 하지 않는다. |

## bundle 분류 기준

plugin bundle에 어떤 파일을 넣을지는 "포함", "참조", "fallback"을 구분해 결정한다. 이 구분은 Codex와 Claude가 서로 다른 manifest 형식을 쓰더라도 공통으로 적용한다.

| 분류 | 의미 | 허용 대상 | 금지 |
|---|---|---|---|
| 포함 | plugin package 안에 파일을 둔다. | 도구별 `plugin.json`, plugin README, starter prompt, thin wrapper Skill, release snapshot으로 고정한 core Skill copy, hook adapter 후보 | 편집 원천으로 쓰는 manual/Skill fork, 독자 manifest, 독자 migration guide |
| 참조 | plugin이 저장소나 release의 canonical 파일을 가리킨다. | GitHub Release/tag, `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, npm CLI package | runtime에 임의 branch HEAD를 canonical 기준처럼 참조 |
| fallback | canonical 파일을 읽을 수 없거나 plugin 환경 제약이 있을 때만 제한적으로 사용한다. | 최소 안내 문구, "저장소의 AGENTS/CLAUDE/manual을 읽으라"는 복구 지시, CLI 설치/실행 실패 시 수동 진입 안내 | fallback 본문으로 절차를 재정의하거나 최신 원칙처럼 취급 |

포함 파일은 release artifact다. 포함된 Skill이나 문서 조각이 있더라도 편집은 `templates/mydocs/skills`, `templates/mydocs/manual`, `docs/agent-entrypoint.md`에서 먼저 이뤄져야 하고, plugin은 후속 packaging task에서 그 결과를 다시 가져간다.

## 공통 bundle 원칙

1. plugin manifest는 도구별로 분리한다. Codex는 `.codex-plugin/plugin.json`, Claude는 `.claude-plugin/plugin.json`을 사용한다.
2. 공통 원칙 문서와 canonical source는 하나로 유지한다. Codex/Claude manifest가 같은 내용을 각자 재작성하지 않는다.
3. core Skill을 plugin에 넣는 경우 release tag 기준 snapshot으로 표시한다. snapshot에는 원본 경로와 release/tag를 기록한다.
4. thin wrapper Skill을 만드는 경우 wrapper는 원본 Skill을 요약하지 않고 canonical Skill 또는 agent entrypoint를 읽도록 안내한다.
5. `templates/manifest.json`과 migration guide는 plugin에 별도 복제하지 않는다. 필요한 경우 release URL 또는 repository path를 참조한다.
6. plugin이 npm CLI를 실행하면 기본은 read-only 또는 dry-run 판단 출력이어야 한다. 파일 적용은 작업지시자 승인 후 일반 task 흐름으로 전환한다.
7. plugin 설치가 없는 환경에서도 `AGENTS.md`, `CLAUDE.md`, `.agents/skills`, `.claude/skills`, npm CLI, manual 기준으로 같은 절차를 수행할 수 있어야 한다.
8. plugin hook은 opt-in guardrail로만 설명한다. hook이 꺼져 있거나 설치되지 않아도 하이퍼-워터폴 규칙의 기본 효력은 AGENTS/CLAUDE/manual에 남아야 한다.

## 도구별 packaging 차이

| 항목 | Codex plugin | Claude plugin | 공통 처리 |
|---|---|---|---|
| manifest | `.codex-plugin/plugin.json` required entry point | `.claude-plugin/plugin.json`은 manifest가 있으면 `name` required | manifest schema는 공유하지 않고 책임 경계만 공유한다. |
| Skill 배치 | manifest의 `skills` field가 plugin root 상대 경로를 가리킨다. | plugin root의 `skills/` 또는 manifest의 `skills` field를 사용한다. | Skill 본문 source는 `templates/mydocs/skills` 기준으로 추적한다. |
| hook 배치 | plugin hook은 default `hooks/hooks.json` 또는 manifest `hooks` entry 후보이며 feature flag가 필요하다. | plugin hook은 `hooks/hooks.json` 또는 inline config 후보이며 enabled plugin에서 merge된다. | hook 상세 정책은 Stage 3에서 공통 policy와 adapter로 분리한다. |
| path 규칙 | manifest path는 `./`로 시작하고 plugin root 내부에 있어야 한다. | plugin component는 plugin root level에 두는 구조를 따른다. | 외부 canonical 파일을 runtime path로 직접 벗어나 참조하지 않는다. |
| local smoke | Codex plugin packaging 검증에서 install/load surface를 확인한다. | `claude --plugin-dir ./my-plugin` 또는 zip plugin smoke 후보를 확인한다. | smoke는 실제 배포와 분리하고 결과를 task 보고서로 남긴다. |
| 실행 책임 | Codex UI에서 Skill, app, MCP, hook integration이 가능하다. | Claude Code에서 skill, agent, hook, MCP, monitor 등이 가능하다. | Hyper-Waterfall plugin은 기능 폭을 좁혀 discovery와 protocol 실행 보조에 집중한다. |

## 참조와 fallback 예시

| 상황 | 권장 처리 | 이유 |
|---|---|---|
| 사용자가 신규 적용을 요청 | plugin이 `docs/agent-entrypoint.md`의 신규 적용 판단 결과 형식을 안내하고, 필요 시 npm CLI `init --dry-run`을 제안한다. | 승인 전 파일 변경 금지와 manifest 기준을 유지한다. |
| 사용자가 기존 적용 저장소 update를 요청 | `.hyper-waterfall/version.json`, 목표 release manifest, migration guide 확인을 안내한다. | update protocol을 plugin 전용으로 재정의하지 않는다. |
| core Skill을 plugin UI에서 노출 | wrapper 또는 snapshot에 원본 경로와 release 기준을 명시한다. | Skill 별도 진실 원천 생성을 피한다. |
| canonical 문서를 읽을 수 없음 | "저장소의 AGENTS/CLAUDE/manual과 release manifest를 먼저 확인하라"는 최소 fallback만 제공한다. | fallback이 절차 본문을 대체하지 않게 한다. |
| npm CLI 실행 실패 | 실패 사유와 수동 진입 경로를 보여주고 파일 적용을 중단한다. | CLI 실패 상태에서 무승인 적용을 막는다. |

## 후속 packaging 검증 입력

Stage 4에서 최종 checklist를 정리하기 전, Stage 2 기준으로 도구별 packaging task가 이어받을 입력은 다음과 같다.

| 후속 task | 확인해야 할 항목 |
|---|---|
| #37 Codex plugin packaging 검증 | `.codex-plugin/plugin.json` schema, `skills` path, default prompt, hook feature flag, plugin root 내부 path, release snapshot 표기, npm CLI 호출 여부 |
| #38 Codex plugin 배포 후보와 설치 smoke | Codex install/load surface, plugin hook 비활성 기본값 안내, Skill discovery, CLI dry-run 또는 entrypoint 안내, uninstall/cleanup |
| #39 Claude plugin packaging 검증 | `.claude-plugin/plugin.json` schema, `skills/` namespace, `hooks/hooks.json` 후보, `bin/` 사용 여부, local `--plugin-dir` smoke 후보, release snapshot 표기 |
| #40 Claude plugin 배포 후보와 설치 smoke | marketplace 또는 local bundle 설치 경로, namespaced Skill 호출, hook merge 동작, CLI dry-run 또는 entrypoint 안내, uninstall/cleanup |

## Stage 3로 넘기는 항목

다음 항목은 이 문서에 방향만 남기고 Stage 3에서 확정한다.

- hook guardrail 후보 목록
- block, warn, report-only 분류
- Codex hook payload adapter와 Claude hook payload adapter 분리 기준
- 위험 shell/git/npm/gh 명령의 판정 기준
- 승인 자동화 금지 문구와 실패 시 fallback 동작

## 검증 기준

이 문서는 최소한 다음 검증을 통과해야 한다.

```bash
rg -n 'canonical|manifest|migration|templates/mydocs/skills|templates/mydocs/manual|agent-entrypoint|npm CLI|fallback|bundle' docs/plugin-distribution-principles.md
rg -n '진실 원천|별도 진실 원천|복제|참조|fallback|포함|책임 경계' docs/plugin-distribution-principles.md
git diff --check
```

후속 Stage에서 `docs/distribution-channels.md`, README, `docs/agent-entrypoint.md`를 연결하더라도 이 문서의 핵심 원칙은 유지한다.
