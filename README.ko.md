# Hyper-Waterfall

[English](README.md) | 한국어 | [简体中文](README.zh-CN.md)

![Hyper-Waterfall overview](docs/assets/hyper-waterfall.png)

Hyper-Waterfall은 AI 페어 프로그래밍을 GitHub Issue, 계획서, Stage 보고서, 최종 보고서, PR로 추적 가능한 개발 프로세스로 바꾸는 방법론 하네스입니다.

AI가 바로 파일을 고치게 두지 않고, 작업 목적과 범위, 검증 기준을 먼저 문서화합니다. 소스 수정, 단계 전환, 최종 보고, PR 생성 앞에는 작업지시자 승인 게이트가 있습니다.

결과적으로 사람은 방향과 품질 결정을 끝까지 가지고, AI는 분석·구현·검증·문서화를 빠르게 수행합니다. 채팅 컨텍스트가 사라져도 작업 의도와 검증 결과는 저장소에 남습니다.

## 빠른 시작

AI 코딩 도구에 다음 문장을 보내면 적용 절차가 시작됩니다.

```text
https://github.com/postmelee/hyper-waterfall 의 하이퍼-워터폴 방법론을 이 저장소에 적용해줘.
```

AI는 먼저 [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)를 읽고, 신규 적용이면 [`docs/lifecycle/adoption.md`](docs/lifecycle/adoption.md), 기존 적용 저장소 업데이트이면 [`docs/lifecycle/update.md`](docs/lifecycle/update.md)를 기준으로 판단합니다.

파일을 바꾸기 전에 AI가 먼저 보고해야 하는 것은 세 가지입니다.

| 보고 항목 | 내용 |
|---|---|
| 적용 모드 | 신규 적용인지, 기존 Hyper-Waterfall 업데이트인지 |
| 변경 후보 | 어떤 파일을 만들거나 바꿀지, placeholder 치환이 필요한지 |
| 승인 요청 | 실제 파일 변경 전에 작업지시자가 승인해야 할 범위 |

CLI는 같은 판단을 dry-run으로 확인하는 보조 수단입니다. canonical 기준은 GitHub Release/tag, `templates/manifest.json`, migration guide이며, CLI 출력만으로 파일을 자동 적용하지 않습니다.

## 언제 쓰면 좋은가

Hyper-Waterfall은 AI가 빠르게 코드를 바꾸는 상황에서 사람이 통제권과 추적 가능성을 잃지 않게 만드는 데 초점이 있습니다.

### 잘 맞는 경우

- AI 코딩 도구에 실제 소스 수정을 맡기지만, 변경 범위와 품질 기준은 사람이 승인하고 싶을 때
- 여러 날, 여러 세션, 여러 에이전트에 걸쳐 작업을 이어가야 할 때
- PR 리뷰에서 "무엇을 왜 바꿨고 어떻게 검증했는지"가 바로 보여야 할 때
- 큰 작업을 Issue, branch, Stage 단위로 나눠 방향 오류를 일찍 잡고 싶을 때
- 새 기여자나 새 AI 세션이 저장소 문서만 읽고 같은 맥락에서 다시 시작해야 할 때

### 과한 경우

- 한두 줄 수정처럼 계획서와 보고서 비용이 변경 자체보다 큰 작업
- 버리는 프로토타입처럼 추적 가능성보다 즉시 실험이 중요한 작업
- GitHub Issue, branch, PR 흐름을 쓰지 않는 저장소
- 사람이 결과를 검토하지 않고 AI 출력만 그대로 수락하려는 작업

## 무엇이 바뀌나

| 기존 AI 코딩 방식 | Hyper-Waterfall 적용 후 |
|---|---|
| "이거 만들어줘"라고 시키면 AI가 바로 파일을 고침 | 먼저 Issue와 수행계획서로 목적, 범위, 검증 기준을 정리 |
| 작업 범위가 대화 중 계속 흔들림 | 구현계획서에서 Stage 단위로 쪼개고 승인된 범위 안에서만 진행 |
| AI가 어느 파일을 왜 고쳤는지 추적하기 어려움 | Stage 보고서와 커밋으로 변경 이유, 산출물, 검증 결과를 기록 |
| 채팅이 길어지면 맥락이 흐려짐 | `mydocs/`, Issue, PR, commit log에 작업 기억을 외부화 |
| 큰 구현이 끝난 뒤 방향 오류를 발견 | 수행계획서, 구현계획서, Stage 완료마다 승인 또는 수정 지시 |
| PR 리뷰 때 채팅 로그를 다시 찾아야 함 | PR과 보고서만 봐도 변경 이유와 검증 근거를 확인 가능 |

기본 작업 흐름은 다음과 같습니다.

```text
GitHub Issue
  -> local/task{N} branch
  -> 수행계획서
  -> 구현계획서
  -> Stage 구현 + Stage 보고서
  -> 최종 보고서
  -> publish/task{N} PR
  -> merge 후 정리
```

핵심 SKILL은 이 흐름의 정형 지점을 담당합니다.

| SKILL | 사용하는 시점 | 주요 산출물 |
|---|---|---|
| `task-register` | 새 GitHub Issue가 필요한 작업 | GitHub Issue, milestone·label 후보 |
| `task-start` | 승인된 이슈 작업 시작 | `local/task{N}` branch, 오늘할일, 수행계획서 |
| `task-stage-report` | 한 Stage 완료 후 | Stage 보고서, 단계 검증 결과, 단계 커밋 |
| `task-final-report` | 모든 Stage 완료 후 PR 직전 | 최종 보고서, 오늘할일 완료 처리, Open PR |
| `pr-merge-cleanup` | PR merge 직후 | 이슈 close, `publish/task{N}` 삭제, 로컬 branch/worktree 정리 |
| `external-pr-review` | 외부 기여자 PR 검토 | `mydocs/pr/` 검토 문서, 검증 결과, 권고 |
| `todo` | 오늘할일 보드 작성·갱신 | `mydocs/orders/yyyymmdd.md` |

상세 절차는 [타스크 진행 절차 매뉴얼](templates/mydocs/manual/task_workflow_guide.md#타스크-진행-절차), branch와 PR 흐름은 [Git 워크플로우 매뉴얼](templates/mydocs/manual/git_workflow_guide.md#브랜치-관리)을 기준으로 합니다.

## 적용 후 구조

`templates/`를 복사하고 placeholder를 치환하면 대상 저장소에는 대략 다음 구조가 생깁니다.

```text
your-repo/
├── AGENTS.md                       운영 규칙 단일 진실 원천
├── CLAUDE.md                       Claude Code용 AGENTS.md 참조
├── .hyper-waterfall/
│   └── version.json                적용된 Hyper-Waterfall version 기록
├── .github/
│   ├── ISSUE_TEMPLATE/task.yml
│   └── pull_request_template.md
├── .agents/skills -> ../mydocs/skills
├── .claude/skills -> ../mydocs/skills
└── mydocs/
    ├── _templates/                 계획서·보고서 출력 형식
    ├── manual/                     반복 운영 매뉴얼
    ├── skills/                     SKILL 진실 원천
    ├── orders/                     오늘할일
    ├── plans/                      수행계획서·구현계획서
    ├── working/                    Stage 보고서
    ├── report/                     최종 보고서
    ├── feedback/                   피드백·리뷰 의견
    ├── tech/                       기술 조사·공식화 전 초안
    ├── troubleshootings/           트러블슈팅
    └── pr/                         외부 PR 검토 기록
```

`mydocs/`는 제품 공식 문서 루트가 아니라 작업 기억과 운영 문서를 보관하는 공간입니다. 제품 문서, API 문서, 아키텍처 문서가 필요하면 해당 task의 수행계획서에서 위치를 먼저 승인받습니다.

## 유지보수자 세부 정보

<details>
<summary><strong>신규 적용과 기존 업데이트</strong></summary>

신규 적용은 Hyper-Waterfall 운영 파일과 작업 기억 구조를 설치합니다. 대상 프로젝트의 `docs/`, `specs/`, `site/`, `website/`, `adr/` 같은 공식 문서 루트는 자동 생성하지 않습니다.

기존 적용 저장소 업데이트는 GitHub Release/tag와 manifest를 기준으로 수행합니다. AI는 [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)를 진입점으로 삼고, [`docs/lifecycle/update.md`](docs/lifecycle/update.md)의 판단 결과 형식에 따라 현재 version, 목표 release/tag, migration guide, manifest diff, Hyper-Waterfall 버전 업데이트 PR 후보를 먼저 보고합니다.

승인된 업데이트 후보를 PR로 전환할 때는 [`docs/lifecycle/update_pr.md`](docs/lifecycle/update_pr.md)를 따릅니다.

</details>

<details>
<summary><strong>CLI와 배포 채널</strong></summary>

`hyper-waterfall` CLI는 npm registry에 publish되어 있으며 lifecycle 판단을 dry-run으로 확인할 수 있습니다.

```bash
npx hyper-waterfall init --repo . --dry-run
npx hyper-waterfall update --repo . --from v0.1.0 --to v0.2.0 --dry-run
npx hyper-waterfall doctor --repo .
```

macOS에서는 Homebrew public tap으로 CLI를 설치할 수 있습니다.

```bash
brew install postmelee/tap/hyper-waterfall
hyper-waterfall --version
hyper-waterfall doctor --repo .
```

Homebrew, Docker, Codex plugin, Claude plugin 같은 추가 배포 채널은 canonical 기준을 대체하지 않는 프로토콜 실행 수단으로만 다룹니다. 채널별 목적과 우선순위는 [`docs/distribution-channels.md`](docs/distribution-channels.md)를 참고하세요.

</details>

<details>
<summary><strong>문서와 템플릿의 진실 원천</strong></summary>

프레임워크의 문서 템플릿, GitHub Issue Form, SKILL 진실 원천은 각각 다음 위치에 있습니다.

- `templates/mydocs/_templates/`
- `templates/.github/ISSUE_TEMPLATE/task.yml`
- `templates/mydocs/skills/`

적용 저장소에서는 `.agents/skills`와 `.claude/skills` 심볼릭 링크가 같은 `mydocs/skills` 본문을 가리킵니다. 문서 구조와 manual 문서 중립성 기준은 [문서 구조 매뉴얼](templates/mydocs/manual/document_structure_guide.md)을 따릅니다.

</details>

## 부록

### 철학

Hyper-Waterfall은 AI에게 결정권을 넘기는 방식이 아닙니다. AI의 실행 속도를 사람의 승인·검토·문서화 규율 안에 넣는 방식입니다.

> **AI에게 코드를 맡기되, 결정권은 넘기지 않습니다.**

이 방법론은 [`edwardkim/rhwp`](https://github.com/edwardkim/rhwp)와 [`postmelee/alhangeul-macos`](https://github.com/postmelee/alhangeul-macos) 같은 실제 프로젝트 경험을 바탕으로 정제되었습니다. 핵심 철학은 [edwardkim/rhwp · hyper_waterfall.md](https://github.com/edwardkim/rhwp/blob/main/mydocs/manual/hyper_waterfall.md)에 가장 완성된 형태로 정리되어 있습니다.

### 거시적 워터폴 + 미시적 애자일

```text
거시 (프로젝트 수준) — 워터폴의 규율:
  계획 -> 설계 -> 구현 -> 검증 -> 배포
   |      |      |      |      |
   v      v      v      v      v
  문서화  문서화  문서화  문서화  문서화

미시 (타스크 수준, 수 시간) — 애자일의 속도:
  구현 -> 테스트 -> 피드백 -> 수정 -> 테스트 -> ...
   |       |        |        |        |
  AI      자동화    사람 판단  AI      자동화
```

워터폴의 규율과 애자일의 속도는 오랫동안 trade-off였습니다. AI 페어 프로그래머가 계획서 초안, 구현, 검증 로그 정리, 보고서 작성 같은 고반복 작업을 빠르게 처리하면서, 같은 규율을 훨씬 작은 시간 단위로 적용할 수 있게 됐습니다.

### 바이브 코딩 vs Hyper-Waterfall

| | 바이브 코딩 | Hyper-Waterfall |
|---|---|---|
| 사람의 역할 | AI 출력 수락 | 지시, 검토, 결정 |
| 계획 | 없음 | 수행계획서 -> 승인 -> 구현계획서 -> Stage |
| 품질 관문 | 동작하길 바람 | 검증 + 승인 게이트 + PR 리뷰 |
| 디버깅 | AI에게 AI 버그 수정 요청 | 사람이 진단, AI가 구현 |
| 문서 | 없음 | `mydocs/`, Issue, PR, commit log |
| 재현 가능성 | 낮음 | 전 과정 타임라인 추적 가능 |

바이브 코딩은 빠르게 보이지만, 사람이 이해하지 못한 코드가 남으면 유지보수 비용이 커집니다. Hyper-Waterfall은 속도를 포기하지 않으면서도 사람이 방향, 우선순위, 아키텍처, 품질 판단을 끝까지 유지하게 합니다.

### 살아있는 예시

이 저장소 자체가 Hyper-Waterfall을 자기 자신에게 적용한 dogfooding 사례입니다. 실제 운영이 어떻게 돌아가는지 보려면 다음 순서로 확인할 수 있습니다.

1. [Issue #1 하이퍼-워터폴 자기 적용](https://github.com/postmelee/hyper-waterfall/issues/1)
2. [Pull Request #2](https://github.com/postmelee/hyper-waterfall/pull/2)
3. [수행계획서 `task_m010_1.md`](mydocs/plans/task_m010_1.md)
4. [구현계획서 `task_m010_1_impl.md`](mydocs/plans/task_m010_1_impl.md)
5. [단계 보고서 폴더 `mydocs/working/`](mydocs/working/)
6. [최종 보고서 `task_m010_1_report.md`](mydocs/report/task_m010_1_report.md)
7. [오늘할일 `mydocs/orders/`](mydocs/orders/)
8. [commit log](https://github.com/postmelee/hyper-waterfall/commits/main)

이 첫 task는 scope 확장 두 번을 거치며 5단계로 진행됐습니다. 승인 게이트, Stage 보고, scope 변경 처리, PR 본문 재작성, merge 후 정리까지 README의 절차가 실제 산출물로 남아 있습니다.

### 프롬프트 가이드 준수

Hyper-Waterfall은 OpenAI와 Anthropic의 공식 프롬프팅 가이드가 강조하는 명확한 지시, 충분한 맥락, 출력 형식 제약, 검증 기준, 장기 작업 기억, agentic workflow 제어 원칙을 개발 프로세스 차원에서 구현합니다.

| 원칙 | Hyper-Waterfall에서 구현되는 방식 | 효과 |
|---|---|---|
| 명확한 목표 | GitHub Issue, 수행계획서, 구현계획서 | AI가 작업 범위와 성공 기준을 먼저 이해 |
| 충분한 맥락 | `mydocs/`의 계획서·보고서·피드백·기술 조사 | 새 세션도 저장소 문서로 맥락 복원 |
| 출력 형식 제약 | `mydocs/_templates/`, Issue/PR template | 계획·보고·검증 결과가 같은 구조로 남음 |
| 단계적 진행 | Stage 단위 구현·검증·보고 | 복잡한 작업을 검토 가능한 단위로 분할 |
| 검증 기준 | Stage 보고서, 최종 보고서, PR 본문 | 결과물을 기록된 기준으로 판단 |
| 멈춤 조건 | 승인 게이트 | AI가 임의로 다음 단계로 넘어가지 않음 |
| 장기 작업 기억 | `mydocs/`, commit log, PR timeline | 채팅이 사라져도 작업 이력 유지 |
| 컨텍스트 경량화 | `1 Issue = 1 Task = 1 Branch = 1 Session` | 세션이 작고 선명하게 유지됨 |

<details>
<summary><strong>OpenAI prompt guidance와의 대응</strong></summary>

1. 결과물을 먼저 정한다. Hyper-Waterfall은 작업 시작부터 Issue, 수행계획서, 구현계획서, Stage 보고서, 최종 보고서, PR이라는 산출물을 둡니다.
2. 좋은 답변의 기준을 적는다. 각 Stage는 구현뿐 아니라 검증 기준과 리뷰 포인트를 함께 남깁니다.
3. 제약 조건을 짧게 건다. "승인 없이 다음 단계 진행 금지", "소스 수정 전 승인", "Issue 기준 추적" 같은 경계를 명시합니다.
4. 필요한 근거 수준을 말한다. 구현 결과는 Stage 보고서, 검증 로그, PR 본문으로 증류됩니다.
5. 출력 형식을 정한다. `mydocs/_templates/`와 `.github/pull_request_template.md`가 expected output shape를 고정합니다.
6. 언제 멈출지도 알려준다. Stage 경계마다 멈추고 사람의 승인을 기다립니다.

</details>

<details>
<summary><strong>Anthropic prompting best practices와의 대응</strong></summary>

1. 명확하고 직접적인 지시. 작업 의도를 Issue, 수행계획서, 구현계획서로 단계마다 명시화합니다.
2. 워크플로우와 목표 맥락 제공. `mydocs/`, Issue, PR 본문에 맥락이 남아 모델이 같은 컨텍스트를 읽습니다.
3. 순차적 단계 제시. Stage 단위 진행과 승인 게이트가 작업을 순차적 단계로 쪼갭니다.
4. 출력 형식 통제. 계획서·보고서·피드백·기술 조사·외부 PR 검토 문서는 중앙 템플릿을 따릅니다.
5. 장기 작업과 외부 기억. 채팅 컨텍스트가 사라져도 파일시스템에 작업 기억이 남습니다.
6. Literal 지시 따름과 정합. 절차와 경계를 문서화하므로 명시된 범위에 잘 묶이는 모델일수록 안정적으로 동작합니다.

Hyper-Waterfall은 최대 자율성보다 인간 통제권과 추적 가능성을 우선합니다. 단순한 프롬프트 문장이 아니라, 프롬프트가 잘 써질 수밖에 없는 저장소 구조를 만드는 접근입니다.

</details>

## 라이선스

MIT. 자세한 내용은 [LICENSE](LICENSE)를 참고하세요.
