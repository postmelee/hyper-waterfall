# 추가 배포 채널 확장 전략

이 문서는 npm CLI MVP 이후 Hyper-Waterfall을 어떤 채널로 확장할지 판단하기 위한 전략 문서다. 실제 Homebrew formula, Docker image, Codex plugin, Claude plugin 구현은 이 문서의 범위가 아니다.

## 목적과 원칙

추가 배포 채널의 목적은 Hyper-Waterfall의 설치와 업데이트 판단을 더 쉽게 시작하게 만드는 것이다. 채널이 늘어나도 배포 기준은 하나로 유지한다.

핵심 원칙:

- GitHub Release/tag + `templates/manifest.json` + migration guide가 canonical 기준이다.
- npm, Homebrew, Docker, Codex plugin, Claude plugin은 canonical protocol을 실행하거나 발견하기 쉽게 하는 프로토콜 실행 수단이다.
- 어떤 채널도 `templates/manifest.json`, `.hyper-waterfall/version.json`, migration guide, 작업지시자 승인 게이트를 우회하지 않는다.
- 추가 채널은 파일 적용 전에 판단 결과와 승인 요청을 출력해야 한다.
- 사용자 수정 가능성이 있는 파일은 채널 종류와 무관하게 자동 덮어쓰기 대상이 아니다.
- 실제 배포 구현은 GitHub Issue, 계획서, 단계 보고서, PR로 별도 추적한다.

## canonical 배포 단위

Hyper-Waterfall의 배포 원천은 GitHub Release/tag다. Release는 다음 기준을 함께 제공해야 한다.

| 구성 | 역할 |
|---|---|
| GitHub Release/tag | 특정 Hyper-Waterfall version을 고정하는 canonical 배포 단위 |
| `templates/manifest.json` | 적용 대상 파일, target 경로, update policy, checksum 상태를 정의하는 기계 판독 기준 |
| `docs/migrations/` | 기존 적용 저장소가 version을 올릴 때 읽는 수동 확인과 충돌 검토 기준 |
| `.hyper-waterfall/version.json` | 적용 저장소가 현재 어떤 Hyper-Waterfall release를 기준으로 설치됐는지 기록하는 상태 파일 |
| npm CLI | canonical 기준을 읽어 `init`, `update`, `doctor` 판단 결과를 출력하는 편의 실행 채널 |

따라서 추가 채널은 release asset, manifest, migration guide, npm CLI 중 무엇을 어떻게 실행할지 결정하는 얇은 계층이어야 한다. 채널별 package나 image 자체가 새 canonical 원천이 되면 안 된다.

## 채널별 비교

| 채널 | 사용자 문제 | 배포 단위 | canonical protocol과의 관계 | 운영 비용 | 우선순위 |
|---|---|---|---|---|---|
| GitHub Release/tag | version 고정, 적용 기준 검토, 업데이트 근거 확보 | tag, release asset, manifest, migration guide | canonical 기준 자체 | release notes, checksum, migration guide 유지 | P0 - 계속 유지 |
| npm CLI | Node.js 환경에서 `init/update/doctor` 판단을 빠르게 실행 | npm package, `npx hyper-waterfall` | manifest/version/migration을 읽는 편의 실행 채널 | npm package metadata, test, publish 승인 | P0 - 기존 MVP 유지 |
| Homebrew | macOS 개발자가 익숙한 방식으로 CLI를 설치하고 업데이트 | formula 또는 tap | npm CLI나 release asset을 설치하는 wrapper | formula 유지, checksum 갱신, macOS 검증 | P1 - 다음 구현 후보 |
| Docker | 로컬 Node 설치 없이 격리된 환경에서 CLI 판단 실행 | image, tag, volume mount | container 안에서 npm CLI와 manifest 판단을 실행 | image build, registry, UID/path 검증, multi-arch 검토 | P2 - 제한적 PoC 후보 |
| Codex plugin | Codex 사용자가 에이전트 UI 안에서 방법론 진입과 Skill 흐름을 발견 | 도구별 plugin bundle | canonical protocol을 호출하거나 설명하는 UI/agent integration | plugin spec 추적, 배포 심사, 호환성 검증 | P3 - 사양 검증 후 보류 |
| Claude plugin | Claude Code 사용자가 같은 방법론 진입과 명령 흐름을 발견 | 도구별 plugin bundle | canonical protocol을 호출하거나 설명하는 UI/agent integration | plugin spec 추적, 배포 심사, 호환성 검증 | P3 - 사양 검증 후 보류 |

우선순위는 사용자 가치만이 아니라 운영 비용과 canonical 기준 훼손 위험을 함께 본다. 설치 편의성이 높아도 release/manifest/migration 기준과 다른 업데이트 경로를 만들면 보류한다.

## 채널별 세부 판단

### GitHub Release/tag

목적:

- Hyper-Waterfall의 version을 고정한다.
- `templates/manifest.json`과 migration guide를 함께 묶어 update protocol의 기준을 제공한다.
- 확정 가능한 file checksum, root/directory checksum 보류 정책, release notes를 통해 적용 저장소 maintainer가 변경 근거를 검토할 수 있게 한다.

비목표:

- 사용자가 매번 release asset을 직접 내려받아 수동 적용하게 만드는 것이 목표가 아니다.
- Homebrew, Docker, plugin 같은 실행 채널을 대체하는 UX 계층이 아니다.

판단:

- 계속 P0로 유지한다.
- 다른 모든 채널은 GitHub Release/tag를 기준으로 동작해야 한다.
- `planned` 상태의 release는 전략 문서나 CLI가 "실제 배포 완료"로 표현하면 안 된다.

### npm CLI

목적:

- `npx hyper-waterfall init --repo . --dry-run`
- `npx hyper-waterfall update --repo . --from v0.1.0 --to v0.2.0 --dry-run`
- `npx hyper-waterfall doctor --repo .`

위 명령으로 신규 적용, 기존 업데이트, 상태 진단의 판단 결과를 재현 가능하게 출력한다.

`hyper-waterfall@0.2.0`은 npm registry에 publish되어 있으며, 위 `npx` 명령은 lifecycle 판단을 실행하는 안정 경로다. publish 전후 검증 결과는 `docs/releases/v0.2.0-npm-publish.md`를 기준으로 확인한다.

비목표:

- 사용자 저장소 파일을 무승인으로 수정하지 않는다.
- PR 생성, 자동 병합, release 생성, publish 자동화까지 담당하지 않는다.
- GitHub Release/tag, manifest, migration guide를 대체하지 않는다.

판단:

- 이미 M020 MVP가 있으므로 P0로 유지한다.
- Homebrew와 Docker는 npm CLI를 재사용하거나 같은 출력 계약을 유지해야 한다.
- npm publish 실행은 별도 승인 게이트로 분리하고, publish 자동화는 후속 이슈로 분리한다.

### Homebrew

목적:

- macOS 개발자가 `brew install` 또는 tap 기반 흐름으로 CLI를 설치하게 한다.
- Node.js/npm 명령을 직접 기억하지 않아도 `hyper-waterfall` 실행 파일에 접근하게 한다.
- macOS 중심의 AI coding workflow에서 설치 발견성을 높인다.

비목표:

- Homebrew formula가 manifest나 migration guide를 자체적으로 재정의하지 않는다.
- formula가 적용 저장소 파일을 직접 수정하지 않는다.
- npm package publish, GitHub Release checksum 정책 확정 없이 formula만 먼저 안정 채널처럼 배포하지 않는다.

운영 비용:

- release마다 formula URL, version, checksum을 갱신해야 한다.
- tap 저장소를 둘지 본 저장소에 formula를 둘지 결정해야 한다.
- macOS 환경에서 설치와 `hyper-waterfall --version`, `doctor`를 검증해야 한다.
- Node.js runtime을 formula dependency로 둘지, release asset으로 묶을지 결정해야 한다.

판단:

- `postmelee/homebrew-tap` public tap이 생성됐고, `postmelee/tap/hyper-waterfall` 공개 설치 smoke가 통과했다.
- 사용자-facing 설치 명령은 `brew install postmelee/tap/hyper-waterfall`이다. 이 명령은 Homebrew가 tap을 자동으로 추가하고 formula를 설치하는 한 줄 경로다.
- 아무 tap도 지정하지 않는 `brew install hyper-waterfall` 첫 설치 경로는 Homebrew core 등재가 필요하므로 [#46](https://github.com/postmelee/hyper-waterfall/issues/46)에서 별도로 검토한다.
- formula/tap PoC와 public smoke 결과는 [`docs/homebrew-formula-tap-poc.md`](homebrew-formula-tap-poc.md)와 `mydocs/tech/task_m040_35_homebrew_public_tap_smoke.md`에 둔다.

### Docker

목적:

- 로컬 Node.js/npm 설치 없이 동일한 CLI 판단을 실행한다.
- CI, 임시 환경, locked-down workstation에서 `doctor` 또는 `update --dry-run`을 재현 가능하게 돌린다.
- framework repository와 적용 저장소를 volume mount해 상태 점검을 실행한다.

비목표:

- Docker image가 canonical release bundle이 되지 않는다.
- container가 host repository 파일을 자동 수정하지 않는다.
- Docker를 기본 사용자 경로로 강제하지 않는다.

운영 비용:

- image build와 registry publish가 필요하다.
- image tag와 GitHub Release/tag version 정합성을 검증해야 한다.
- volume mount 경로, UID/GID, symlink, file permission 차이를 검증해야 한다.
- macOS/Linux multi-arch image가 필요한지 결정해야 한다.

판단:

- 팀/CI 사용 시 가치는 있지만, 일반 사용자 최초 도입 경로로는 Homebrew보다 무겁다.
- `doctor` 중심의 read-only image PoC부터 검토한다.
- 후속 마일스톤 후보: `M030 - Docker doctor/update dry-run image PoC`.

### Codex plugin

목적:

- Codex 사용자가 저장소 안에서 Hyper-Waterfall 절차와 Skill 흐름을 쉽게 발견하게 한다.
- `task-start`, `task-stage-report`, `task-final-report` 같은 core workflow를 도구 UI 안에서 자연스럽게 안내한다.
- npm CLI나 `docs/agent-entrypoint.md`를 호출하는 agent-friendly 진입점을 제공한다.

비목표:

- Codex plugin이 core Skill 본문이나 manual의 별도 진실 원천이 되지 않는다.
- plugin 안에 manifest나 migration guide를 복제해 release 기준을 갈라놓지 않는다.
- Codex 전용 UX를 이유로 Claude Code나 일반 CLI 사용자를 깨뜨리지 않는다.

운영 비용:

- Codex plugin packaging 사양과 배포 경로를 추적해야 한다.
- plugin bundle, Skill 경로, MCP/app integration 여부가 바뀌면 문서를 함께 갱신해야 한다.
- 도구별 테스트와 manual fallback을 같이 유지해야 한다.

판단:

- 사용자 경험 가치는 크지만 tool-specific lock-in과 사양 변화 위험이 크다.
- 구현보다 먼저 plugin packaging 검증 task를 분리한다.
- 후속 마일스톤 후보: `M030 - Codex plugin packaging 검증`.

### Claude plugin

목적:

- Claude Code 사용자가 `CLAUDE.md`, `.claude/skills`, Hyper-Waterfall core Skill을 쉽게 발견하고 실행하게 한다.
- Codex와 같은 canonical 문서와 Skill 본문을 읽되 Claude Code의 진입 방식에 맞게 안내한다.
- agent entrypoint와 npm CLI 판단 결과를 Claude Code workflow에서 호출하기 쉽게 만든다.

비목표:

- Claude plugin이 `AGENTS.md`, `CLAUDE.md`, `mydocs/skills`의 진실 원천을 복제하지 않는다.
- Claude Code 전용 절차를 만들어 multi-agent 호환성을 깨뜨리지 않는다.
- plugin 배포를 이유로 승인 게이트를 생략하지 않는다.

운영 비용:

- Claude Code plugin packaging 사양과 배포 경로를 추적해야 한다.
- Codex plugin과 중복되는 설명, Skill, 문서 drift를 방지해야 한다.
- Claude 전용 테스트와 일반 repository fallback을 함께 유지해야 한다.

판단:

- Codex plugin과 같은 수준의 후보지만, 둘을 한 번에 구현하면 중복과 drift가 커진다.
- Codex/Claude 공통 plugin 설계 원칙을 먼저 정한 뒤 도구별 구현을 분리한다.
- 후속 마일스톤 후보: `M030 - Claude plugin packaging 검증`.

## 구현 우선순위

| 우선순위 | 후보 | 이유 | 시작 조건 |
|---|---|---|---|
| P0 | GitHub Release/tag + manifest + migration guide 유지 | canonical 기준이 흔들리면 모든 채널이 갈라진다. | release checklist, checksum, migration guide 유지 |
| P0 | npm CLI 안정화 | 다른 실행 채널이 재사용할 최소 실행 계층이다. | `init/update/doctor` 출력 계약 유지, test 유지 |
| P1 | Homebrew formula/tap | macOS 개발자 설치 경험 개선 효과가 크고 Docker/plugin보다 운영 모델이 단순하다. | public tap smoke 통과. core 등재 가능성은 #46에서 별도 검토 |
| P2 | Docker read-only image | CI와 격리 실행 가치가 있지만 volume/path 검증 비용이 있다. | CLI read-only 보장, image tag/version 정책 확정 |
| P3 | Codex plugin packaging 검증 | agent UI 통합 가치는 크지만 사양 변화와 lock-in 위험이 있다. | plugin packaging 사양 확인, canonical 문서 참조 방식 확정 |
| P3 | Claude plugin packaging 검증 | Codex와 같은 가치를 갖지만 중복 구현 위험이 있다. | 공통 plugin 원칙 확정, Claude Code 진입 방식 검증 |

권장 순서:

1. P0: `v0.2.0` GitHub Release/tag와 npm CLI publish 준비를 안정화한다.
2. P1: Homebrew public tap은 `postmelee/tap/hyper-waterfall` 경로로 유지하고, core 등재 가능성은 #46에서 별도로 평가한다.
3. P2: Docker는 `doctor`와 `update --dry-run` read-only image부터 검증한다.
4. P3: Codex plugin과 Claude plugin은 packaging 검증 task를 먼저 만들고, 실제 배포는 그 결과를 보고 분리한다.

## 구현 후보

아래 후보는 배포 채널별 구현 단위를 작게 나눈다.

| 후보 | 범위 | 제외 |
|---|---|---|
| M020 - npm publish 준비 | npm package publish checklist, tag/release 정합성, publish 전 검증 | Homebrew, Docker, plugin 구현, 승인 없는 publish |
| M040 - Homebrew public tap 배포 | `postmelee/tap/hyper-waterfall` 설치, version 확인, `doctor` smoke | 자동 release pipeline, Homebrew core 제출 |
| M030 - Docker read-only CLI image PoC | `doctor`, `init --dry-run`, `update --dry-run` 실행 image | host 파일 자동 수정 |
| M030 - Codex plugin packaging 검증 | Codex plugin bundle 구조, canonical 문서 참조 방식, fallback 확인 | 실제 public 배포 |
| M030 - Claude plugin packaging 검증 | Claude plugin bundle 구조, `.claude/skills`와 canonical 문서 참조 방식 확인 | 실제 public 배포 |

## 보류 항목과 리스크

보류:

- Homebrew core 제출은 이번 task에서 하지 않는다. `brew install hyper-waterfall` 첫 설치 경로는 #46에서 별도 검토한다.
- Docker image 구현은 이번 task에서 하지 않는다.
- Codex plugin과 Claude plugin 실제 packaging과 배포는 이번 task에서 하지 않는다.
- 자동 릴리스 파이프라인은 이번 task에서 하지 않는다.
- 추가 채널에서 파일 자동 적용, 자동 PR 생성, 자동 병합을 구현하지 않는다.

리스크:

| 리스크 | 영향 | 대응 |
|---|---|---|
| canonical 기준 혼선 | 채널마다 다른 manifest나 migration 기준을 쓰면 적용 저장소 업데이트가 재현 불가능해진다. | GitHub Release/tag + manifest + migration guide만 기준으로 둔다. |
| checksum 미확정 상태 배포 | root/directory `pending-release` 상태를 전체 checksum 확정처럼 보이게 할 수 있다. | release/tag 확정 전 채널은 PoC 또는 planned 상태로만 표현하고, file checksum `ready`와 root/directory `pending-release`를 구분한다. |
| 사용자 파일 자동 덮어쓰기 | Hyper-Waterfall 승인 게이트를 우회한다. | 모든 채널은 판단 결과와 승인 요청만 출력한다. |
| channel drift | npm, Homebrew, Docker, plugin 설명과 동작이 서로 달라진다. | npm CLI 출력 계약과 agent entrypoint 판단 결과 형식을 공통 기준으로 둔다. |
| tool-specific lock-in | Codex/Claude plugin이 특정 도구에만 맞는 절차를 만들 수 있다. | `AGENTS.md`, `CLAUDE.md`, `mydocs/skills` canonical 구조를 유지하고 plugin은 발견/실행 계층으로 제한한다. |

## 검증 기준

전략 문서 또는 후속 구현 task는 최소한 다음을 확인한다.

```bash
rg -n 'Homebrew|Docker|Codex plugin|Claude plugin|npm|GitHub Release|manifest|migration|canonical' docs/distribution-channels.md
rg -n '목적|비목표|사용자|운영 비용|우선순위|후속 마일스톤|보류|프로토콜 실행 수단' docs/distribution-channels.md
git diff --check
```

후속 구현 task는 이 문서만으로 배포하지 않고, 각 채널별 이슈와 승인된 계획서를 먼저 만든다.
