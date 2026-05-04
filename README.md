# Hyper-Waterfall

> 본 방법론의 핵심 철학은 [edwardkim/rhwp · hyper_waterfall.md](https://github.com/edwardkim/rhwp/blob/main/mydocs/manual/hyper_waterfall.md)에 가장 완성된 형태로 정리되어 있습니다. 본 저장소는 그 방법론을 다른 저장소에 손쉽게 적용할 수 있게 모듈화한 프레임워크입니다.

Hyper-Waterfall은 AI 페어 프로그래머와 함께 소프트웨어를 만들 때 인간의 통제권, 추적 가능성, 엔지니어링 규율을 잃지 않도록 해주는 작업 프레임워크입니다. **거시적 워터폴 + 미시적 애자일**을 AI가 동시에 가능하게 한다는 한 줄로 요약할 수 있습니다.

## 목차

1. [바이브 코딩 vs Hyper-Waterfall](#1-바이브-코딩-vs-hyper-waterfall)
2. [왜 강력한가](#2-왜-강력한가)
3. [핵심 원칙](#3-핵심-원칙)
4. [역할 분담](#4-역할-분담)
5. [프로세스](#5-프로세스)
6. [AI가 왜 필수인가](#6-ai가-왜-필수인가)
7. [언제 이 방법론이 맞는가](#7-언제-이-방법론이-맞는가)
8. [새 저장소에 빠르게 적용하기](#8-새-저장소에-빠르게-적용하기)
9. [적용 후 대상 저장소 구조](#9-적용-후-대상-저장소-구조)
10. [살아있는 예시 — 직접 따라가보기](#10-살아있는-예시--직접-따라가보기)
11. [설계 원칙](#11-설계-원칙)
12. [프롬프트 가이드 준수](#12-프롬프트-가이드-준수)
13. [참고](#13-참고)

## 1. 바이브 코딩 vs Hyper-Waterfall

바이브 코딩 — AI 출력을 읽지 않고 그대로 수락하고, 아키텍처 결정을 AI에게 맡기고, 이해하지 못한 채로 코드를 배포하는 방식 — 은 함정입니다. 겉보기엔 동작하지만 사람이 이해하지 못한 코드라 문제가 생겨도 진단할 수 없습니다.

Hyper-Waterfall은 정반대로 갑니다. 사람 작업지시자가 방향, 품질, 아키텍처 결정의 책임을 끝까지 가지고, AI는 혼자서는 불가능한 속도와 규모로 구현을 수행합니다. 사람은 절대 생각을 멈추지 않습니다.

| | 바이브 코딩 | Hyper-Waterfall |
|---|---|---|
| **사람의 역할** | AI 출력 수락 | 지시, 검토, 결정 |
| **계획** | 없음 — "그냥 만들어" | 수행계획서 → 승인 → 구현계획서 → Stage 단위 실행 |
| **품질 관문** | 동작하길 바람 | 단계마다 검증 + 승인 게이트 + Open PR 리뷰 |
| **디버깅** | AI에게 AI 버그 수정 요청 | 사람이 진단, AI가 구현 |
| **아키텍처** | 우연히 형성 | 작업지시자가 의도적으로 설계 |
| **문서** | 없음 | `mydocs/`(계획서·단계 보고서·최종 보고서) + Issue/PR 본문 |
| **결과물** | 취약, 유지보수 어려움 | 추적 가능, 인수인계 가능, 어디서든 재개 가능 |

AI는 배율기입니다. 기존 프로세스를 증폭시키므로 프로세스 없이 AI를 쓰면 빠른 혼돈이 되고, 좋은 프로세스 위에 AI를 올리면 비범한 결과물이 됩니다.

## 2. 왜 강력한가

AI는 두 가지 구조적 약점을 가집니다.

1. 세션이 길어지거나 도구가 바뀌면 맥락을 잃습니다.
2. 방향이 틀렸는데도 자신 있게 계속 실행할 수 있습니다.

Hyper-Waterfall은 이 약점을 작업 제약으로 바꾸고, 다음 세 축에서 강력함을 만들어냅니다.

### 1. 모든 작업이 문서가 되고, 문서가 다음 작업의 프롬프트가 된다 — 지식 자산화

작업의 의도, 계획, 단계별 검증 결과, 의사결정 근거가 모두 `mydocs/` 안의 markdown 파일로 쌓입니다. 단순 기록이 아니라 **다음 작업의 input** — 모델이 새 task를 시작할 때 같은 저장소에 있는 과거 계획서·보고서·결정 기록을 읽고 그 위에서 작업합니다. **잘 쓴 문서가 곧 좋은 프롬프트가 되고, 잘 쓴 프롬프트가 곧 다음 좋은 문서를 만드는 선순환**이 일어납니다.

이는 옵시디언 vault를 LLM에 연결해 개인 지식 저장소를 컨텍스트로 쓰는 흐름과 같은 구조입니다. 차이는 vault의 성격에 있습니다. 옵시디언이 일반 지식·아이디어를 모은다면, `mydocs/`는 **작업 이력에 특화된 vault**로서 의도·계획·검증·산출물·트러블슈팅을 작업 단위로 자동 누적합니다. 절차가 강제하기 때문에 누락이 없고 일관됩니다. 새 LLM 세션을 띄워도 채팅 히스토리에 의존하지 않고 저장소 안의 markdown만으로 맥락을 복원할 수 있습니다.

### 2. 큰 사고 전, 게이트에서 방향 오류를 발견한다 — 리스크

의미 있는 작업은 `이슈 → 브랜치 → 수행계획서 → 구현계획서 → Stage 단위 구현·검증·보고 → 최종 보고서 → Open PR` 순서를 따르며, 각 게이트에서 작업지시자 승인을 받습니다. 큰 구현이 끝난 뒤에 "방향이 틀렸음"을 깨닫는 대신, **수행계획서·구현계획서·각 Stage 경계에서 일찍 잡히므로 매몰 비용이 작습니다.** 단계 검증이 실패하면 그 단계 안에서 회복하고, scope가 바뀌면 계획서를 갱신해 재승인을 받습니다.

### 3. 인간이 통제권을 유지하면서 AI의 속도를 활용한다 — 역할 분담

작업지시자는 **방향, 우선순위, 아키텍처, 품질 결정의 책임을 끝까지 가지고**, AI는 탐색·초안 작성·구현·테스트·보고서 작성·PR 본문 작성 같은 고반복 작업을 맡습니다. 모든 단계 전환은 작업지시자의 명시 승인이 필요합니다.

> 이 세 축은 [OpenAI](https://developers.openai.com/api/docs/guides/prompt-guidance)와 [Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)의 공식 프롬프팅 가이드의 핵심을 개발 프로세스 차원에서 구현한 결과이기도 합니다. 항목별 매핑은 아래 [프롬프트 가이드 준수](#12-프롬프트-가이드-준수) 섹션에서 펼쳐 확인할 수 있습니다.

## 3. 핵심 원칙

세 가지 운영 원칙입니다.

1. **AI에게 항상 충분한 맥락을 준다.** 작업 의도·범위·승인 기준을 매번 처음부터 설명하지 않도록, 의도와 계획을 `mydocs/`에 박아둡니다. 모델은 같은 저장소를 읽으며 같은 컨텍스트 위에서 작업합니다.
2. **방향 결정의 권한은 사람이 끝까지 가진다.** 단계 전환과 소스 변경에는 작업지시자의 명시 승인이 필요합니다. AI가 알아서 다음 단계로 넘어가지 않습니다.
3. **AI의 작업 기억을 주기적으로 외부화한다.** Stage 보고서·최종 보고서·PR 본문에 의도·결정·검증 근거를 증류해 기록합니다. 채팅 컨텍스트가 사라져도 다음 세션이 같은 출발점에서 시작할 수 있습니다.

## 4. 역할 분담

사람은 생각하고 결정하고, AI는 실행하고 문서화합니다.

| 사람 (작업지시자) | AI 페어 프로그래머 |
|---|---|
| 작업 의도와 우선순위 결정 | 분석, 탐색, 초안 작성 |
| 수행계획서·구현계획서 검토와 승인 | 계획서 초안과 단계 분할 제안 |
| 도메인 피드백, 아키텍처 결정 | 단계별 구현, 테스트, 검증 |
| 단계·PR·merge 승인 | 보고서, PR 본문, 정리 작업 |
| 품질·정확성 최종 판단 | 산출물 일관성과 형식 유지 |

핵심은 단순합니다. 사람은 절대 생각을 멈추지 않고, AI는 사람의 결정 위에서 실행 속도를 가속합니다.

## 5. 프로세스

### 타스크 사이클

한 작업은 다음 5단계 사이클로 진행됩니다. 각 단계 전환은 작업지시자의 명시 승인을 거칩니다.

1. **타스크 등록** — 새 이슈를 만들거나 기존 이슈를 작업으로 도입 → `task-register`
2. **계획 단계** — 수행계획서 작성·승인, 구현계획서 작성·승인 → `task-start` (수행계획서 + 브랜치 + 오늘할일)
3. **단계별 구현 + 검증** — Stage 단위로 구현·검증·보고서 작성. 승인 후 다음 단계 진행 → `task-stage-report`
4. **피드백 수렴** — 작업지시자 피드백을 수정·재검증으로 흡수. scope가 바뀌면 계획서를 갱신해 재승인
5. **최종 보고와 PR** — 최종 보고서, Open PR 생성, 리뷰, merge, 정리 → `task-final-report` → (리뷰·merge) → `pr-merge-cleanup`

`todo`는 위 흐름 어느 단계에서든 오늘할일 보드를 갱신할 때 호출합니다. `external-pr-review`는 외부 기여자 PR 검토용 별도 흐름입니다.

```text
task-register      ─ 신규 이슈가 필요할 때
      ↓
task-start         ─ 브랜치, 오늘할일, 수행계획서 작성
      ↓
task-stage-report  ─ Stage 1 완료
      ↓
task-stage-report  ─ Stage 2 완료
      ↓        ...  (단계 수만큼 반복)
task-final-report  ─ 모든 단계 완료, Open PR 생성
      ↓
(리뷰 → merge)
      ↓
pr-merge-cleanup   ─ 이슈 close, 브랜치/오늘할일 정리
```

이슈 진행 추적은 GitHub의 linked PR 자동 cross-reference와 라벨/마일스톤에 위임합니다 (kubernetes·vscode·rust 등 빅테크 OSS 표준). 상태 알림 댓글은 사용하지 않고, 댓글은 토론·블로커·결정 기록 용도로만 둡니다.

### 핵심 SKILL

| SKILL | 사용하는 시점 | 주요 산출물 |
|---|---|---|
| `task-register` | 신규 작업이라 GitHub Issue를 먼저 만들어야 할 때 | 범위·라벨·마일스톤·담당자가 채워진 GitHub Issue |
| `task-start` | 승인된 이슈 작업을 시작할 때 | `local/task{N}` 브랜치, 오늘할일 행, 수행계획서 템플릿 |
| `task-stage-report` | 한 Stage 구현이 끝나고 다음 단계로 넘어가기 직전 | 단계 보고서, 단계 묶음 커밋, 단계 검증 결과 |
| `task-final-report` | 모든 Stage가 끝나고 PR을 게시하기 직전 | 최종 보고서, 오늘할일 완료 처리, Open PR |
| `pr-merge-cleanup` | PR이 실제로 merge된 직후 | 이슈 close, `publish/task{N}` 원격 삭제, 로컬 브랜치/worktree 정리 |
| `external-pr-review` | 외부 기여자 PR을 검토할 때 | `mydocs/pr/` 검토 문서, 검증 결과, 권고(merge/수정/닫기) |
| `todo` | 오늘할일 보드를 새로 만들거나 갱신할 때 | `mydocs/orders/yyyymmdd.md` 표 형식 갱신 |

진실 원천은 `templates/mydocs/skills/`이고 적용 저장소에서는 `.agents/skills`와 `.claude/skills` 심볼릭 링크가 같은 본문을 가리킵니다.

### 문서 구조

작업의 산출물은 `mydocs/` 안 정해진 위치와 형식으로 자동 누적됩니다.

| 폴더 | 역할 |
|---|---|
| `mydocs/orders/` | 일일 작업 보드 (`yyyymmdd.md`) |
| `mydocs/plans/` | 수행계획서·구현계획서 (`task_m{milestone}_{issue}*.md`) |
| `mydocs/working/` | 단계별 완료 보고서 (`_stage{N}.md`) |
| `mydocs/report/` | 최종 결과 보고서 (`_report.md`) |
| `mydocs/feedback/` | 작업지시자 피드백, 코드 리뷰 의견 |
| `mydocs/tech/` | 기술 조사, 구조·스펙 분석 |
| `mydocs/manual/` | 매뉴얼, 가이드 |
| `mydocs/troubleshootings/` | 트러블슈팅, 재발 방지 기록 |
| `mydocs/pr/` | 외부 기여자 PR 검토 기록 |
| `mydocs/skills/` | SKILL 본문 진실 원천 |

이 문서들은 AI가 초안을 만들고 사람이 검토·승인하는 형태라, 문서화 부담이 사람에게 전가되지 않습니다.

## 6. AI가 왜 필수인가

Hyper-Waterfall이 요구하는 의도서·계획서·단계 보고서·최종 보고서·PR 본문은 사람만으로 감당하면 비용이 너무 큽니다. 워터폴이 무거워진 이유 중 하나는 이 문서 비용을 사람이 모두 짊어졌기 때문이고, 애자일이 규율을 잃은 이유 중 하나는 그 비용을 감당하기 싫어 문서를 빼버렸기 때문입니다.

AI 페어 프로그래머는 이 문서들을 초안 단계에서 빠르게 만들어줍니다. 사람은 검토와 승인에 집중하고, 결과적으로 워터폴이 잃어버린 속도와 애자일이 잃어버린 규율을 동시에 회복합니다. 또한 AI는 작업 기억을 머릿속이 아니라 저장소에 외부화하기 때문에, 새 기여자나 새 AI 세션이 합류해도 같은 출발점에서 시작할 수 있습니다.

같은 규율, 100배 빠른 속도. 이것이 AI 없이는 닿을 수 없는 지점이고, Hyper-Waterfall이 AI를 단순한 도구가 아니라 필수 요소로 두는 이유입니다.

## 7. 언제 이 방법론이 맞는가

다음 조건이 갖춰질 때 효과가 큽니다.

- **작업지시자가 도메인을 충분히 이해한다.** 아키텍처 판단과 품질 평가가 사람의 책임이므로, 사람이 그 판단을 할 수 있어야 합니다.
- **작업지시자가 자기 통제를 가진다.** 승인 게이트를 일관되게 지킬 의지가 필요합니다. 게이트를 자주 건너뛰기 시작하면 방법론이 무너집니다.
- **프로젝트가 일정 복잡도를 가진다.** 여러 단계, 여러 파일, 여러 결정을 거치는 작업일 때 게이트와 문서가 가치 있습니다.

작은 한 회성 스크립트나 throwaway prototype에는 절차의 무게가 더 큽니다. 반대로 장기 유지보수, 팀 인수인계, 외부 기여자 합류, 여러 LLM 세션에 걸친 누적 작업이 예정된 프로젝트일수록 진가를 발휘합니다.

## 8. 새 저장소에 빠르게 적용하기

AI 코딩 도구에 다음 한 줄을 보내주세요.

```text
https://github.com/postmelee/hyper-waterfall 의 하이퍼-워터폴 방법론을 이 저장소에 적용해줘.
```

AI는 [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)부터 읽어 적용 절차를 따릅니다. 소스 변경 전 반드시 작업지시자 승인을 받게 되어 있습니다.

## 9. 적용 후 대상 저장소 구조

`templates/`를 복사하고 placeholder를 치환한 뒤 사용자 저장소에 만들어지는 모습입니다.

```text
your-repo/
├── AGENTS.md                       운영 규칙 단일 진실 원천
├── CLAUDE.md                       Claude Code용 (AGENTS.md 참조)
├── .github/
│   └── pull_request_template.md
├── .agents/
│   └── skills -> ../mydocs/skills  Codex 인식 경로 (심볼릭 링크)
├── .claude/
│   └── skills -> ../mydocs/skills  Claude Code 인식 경로 (심볼릭 링크)
└── mydocs/
    ├── manual/             매뉴얼 (문서 구조, 타스크 진행, Git, PR, 충돌 규칙)
    ├── skills/             SKILL 진실 원천 (Codex/Claude Code 공용)
    ├── orders/             오늘할일 (yyyymmdd.md)
    ├── plans/              수행/구현 계획서
    │   └── archives/
    ├── working/            단계별 완료 보고서
    ├── report/             최종 결과 보고서
    ├── feedback/           피드백·리뷰 의견
    ├── tech/               기술 조사
    ├── troubleshootings/   트러블슈팅
    └── pr/                 외부 PR 검토 기록
        └── archives/
```

## 10. 살아있는 예시 — 직접 따라가보기

이 저장소 자체가 하이퍼-워터폴을 자기 자신에게 적용한 첫 사례입니다. 적용 여부를 검토하기 전에 실제 운영이 어떻게 돌아가는지 보고 싶다면 다음 순서로 둘러보세요.

1. **이슈** [`#1` 하이퍼-워터폴 자기 적용 (dogfooding)](https://github.com/postmelee/hyper-waterfall/issues/1) — 라벨 3개, 마일스톤 M010, linked PR이 자동 표시되는 깔끔한 구조 (상태 알림 댓글 없음)
2. **Pull Request** [`#2`](https://github.com/postmelee/hyper-waterfall/pull/2) — Open PR 본문 형식: 요약 4 bullet (대상 타스크/왜/무엇/리뷰 포인트), Stage 5개 timeline 이중 링크(단계 보고서 + commit URL), 영향 영역 표, 작업 문서, 검증 명령
3. **수행계획서** [`mydocs/plans/task_m010_1.md`](mydocs/plans/task_m010_1.md) — 목적·배경·범위·설계 방향·예상 변경 파일·잠정 단계·검증 계획·리스크
4. **구현계획서 5단계** [`mydocs/plans/task_m010_1_impl.md`](mydocs/plans/task_m010_1_impl.md) — 단계별 산출물·검증 명령·커밋 메시지를 사전에 확정
5. **단계 보고서 5개** [`mydocs/working/`](mydocs/working/) — 각 Stage 종료 시 산출물·검증 결과·잔여 위험·다음 단계 영향
6. **최종 보고서** [`mydocs/report/task_m010_1_report.md`](mydocs/report/task_m010_1_report.md) — 5단계 종합, 변경 전·후 정량 비교, 수용 기준 검증
7. **오늘할일** [`mydocs/orders/`](mydocs/orders/) — 일일 보드 형식 (마일스톤별 표 + 완료 시각)
8. **commit log** [`git log` (main)](https://github.com/postmelee/hyper-waterfall/commits/main) — `Task #1: 수행 계획서 작성`부터 `pr-merge-cleanup`까지 12개 task 커밋이 시간 순서로 보존

이 첫 task는 scope 확장 두 번을 거치며 5단계로 진행됐습니다. 즉 README에 적힌 절차가 실제 어떻게 돌아가는지 — 승인 게이트, 단계 보고, scope 변경 처리, PR 본문 재작성, merge 후 정리까지 — 모두 살아있는 산출물로 따라갈 수 있습니다.

## 11. 설계 원칙

- 의미 있는 소스 변경에는 인간 승인 게이트가 필요합니다.
- 이슈 진행 추적은 GitHub의 linked PR 자동 cross-reference와 라벨/마일스톤에 위임하고, 댓글은 토론·블로커·결정 기록 용도로만 둡니다.
- 최신 상태는 이슈 metadata, 현재 branch 또는 PR, `mydocs/`에서 찾을 수 있어야 합니다.
- 이 프레임워크는 다양한 프로젝트 유형에서 동작해야 합니다. 특정 언어, 빌드, 배포, 제품 규칙은 core가 아니라 대상 저장소의 템플릿과 설정에 둡니다.
- 프로세스에는 엄격하고, 도구에는 유연해야 합니다.

> Hyper-Waterfall은 새로운 마법이 아니라, 워터폴의 규율과 애자일의 속도를 AI라는 배율기 위에서 동시에 살리는 운영 방식입니다. 좋은 프로세스 위에서 AI는 비범한 결과물을 만들어냅니다.

## 12. 프롬프트 가이드 준수

Hyper-Waterfall은 OpenAI와 Anthropic의 공식 프롬프팅 가이드의 핵심을 개발 프로세스 차원에서 구현합니다. "프롬프트를 잘 쓰는 법"이 아니라 **프롬프트가 잘 써질 수밖에 없는 저장소 구조**를 만드는 접근입니다.

<details>
<summary><strong>OpenAI GPT-5.5 프롬프팅 가이드 매핑</strong> · 출처: <a href="https://developers.openai.com/api/docs/guides/prompt-guidance">OpenAI prompt guidance</a></summary>

1. **결과물을 먼저 정한다.**
   Hyper-Waterfall은 작업 시작부터 Issue, 수행계획서, 구현계획서, Stage 보고서, 최종 보고서, PR이라는 산출물을 명확히 둡니다. AI에게 "잘 해줘"라고 맡기는 게 아니라, 무엇을 남겨야 하는지 먼저 고정합니다.

2. **좋은 답변의 기준을 적는다.**
   각 Stage는 구현뿐 아니라 검증 기준과 리뷰 포인트를 함께 남깁니다. 그래서 AI의 결과물은 감으로 평가되지 않고, 문서화된 기준 위에서 판단됩니다.

3. **제약 조건을 짧게 건다.**
   Hyper-Waterfall은 "승인 없이 다음 단계 진행 금지", "소스 수정 전 승인", "Issue 기준 추적"처럼 AI가 넘지 말아야 할 경계를 명시합니다. 자유도를 없애는 게 아니라, 폭주하지 않게 레일을 까는 방식입니다.

4. **필요한 근거 수준을 말한다.**
   구현 결과는 Stage 보고서, 검증 로그, PR 본문으로 증류됩니다. 단순히 코드가 바뀐 것이 아니라, 왜 바뀌었고 어떻게 확인했는지가 저장소에 남습니다.

5. **출력 형식을 정한다.**
   `mydocs/`는 계획서, 작업 보고서, 최종 보고서, 피드백, 기술 조사 문서를 정해진 위치와 형식으로 저장합니다. AI의 답변이 흩어지는 대신, 다음 작업자가 다시 읽을 수 있는 구조가 됩니다.

6. **언제 멈출지도 알려준다.**
   Hyper-Waterfall은 Stage 경계마다 멈추고 사람의 승인을 기다립니다. AI가 끝까지 달리는 것이 아니라, 사람이 방향을 확인할 수 있는 정지선을 둡니다.

</details>

<details>
<summary><strong>Anthropic Claude Opus 4.7 프롬프팅 가이드 매핑</strong> · 출처: <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices">Claude prompting best practices</a></summary>

1. **명확하고 직접적인 지시.**
   작업의 의도를 Issue, 수행계획서, 구현계획서로 단계마다 명시화합니다. 모호한 의도를 모델에 던지는 대신, 무엇을 만들지·왜 만드는지·어디까지 만들지를 게이트 전에 고정합니다.

2. **워크플로우와 목표 맥락 제공.**
   작업이 어떤 흐름의 일부인지, 어떤 결과물의 어디에 들어가는지를 매번 프롬프트에 적게 하지 않습니다. `mydocs/`, Issue, PR 본문에 그 맥락이 박혀 있어 모델이 자연스럽게 같은 컨텍스트를 읽습니다.

3. **순차적 단계 제시.**
   Stage 단위 진행과 단계마다의 승인 게이트가 Anthropic이 권장하는 "지시를 순차적 단계로 쪼개기"를 그대로 구현합니다.

4. **출력 형식 통제.**
   계획서·단계 보고서·최종 보고서·PR 본문은 모두 정해진 위치와 템플릿이 있습니다. 모델이 "어디에 무엇을 적을지"를 매 작업마다 발명하지 않게 합니다.

5. **장기 작업과 외부 기억.**
   Opus 4.7이 강한 long-horizon agentic work와 memory task에 `mydocs/`가 그대로 대응합니다. 채팅 컨텍스트가 사라져도 파일시스템에 작업 기억이 증류되어 남습니다.

6. **Literal 지시 따름과 정합.**
   Opus 4.7은 명시된 범위에 더 정확히 묶이는 경향이 있습니다. Hyper-Waterfall은 "소스 수정 전 승인", "승인 없이 다음 Stage 진행 금지", "Issue 기준 추적" 같은 경계를 애초에 문서화하므로 literal한 모델일수록 잘 작동합니다.

> 단, Hyper-Waterfall은 "최대 자율성"보다 "인간 통제권과 추적 가능성"을 우선합니다. Opus 4.7 가이드가 권장하는 "interactive coding에서 첫 턴에 의도와 제약을 명확히 주고 반복 상호작용을 줄이라"는 권고와 같은 layer가 아니라, 한 단계 위 — task 전체 관점의 게이트 — 에서 작동합니다. XML 태그 구조화는 직접 채택하지 않으며, `mydocs/` 폴더 구조와 파일명 규칙이 같은 역할을 수행합니다.

> **한 줄 요약**: Hyper-Waterfall은 Claude Opus 4.7 프롬프팅 가이드의 핵심을 단순한 프롬프트 문장이 아니라, GitHub-native 개발 프로세스로 끌어내린 하네스입니다.

</details>

## 13. 참고

- [edwardkim/rhwp · hyper_waterfall.md](https://github.com/edwardkim/rhwp/blob/main/mydocs/manual/hyper_waterfall.md) — 본 방법론의 핵심 철학과 원형이 가장 완성된 형태로 정리된 문서
- [edwardkim/rhwp](https://github.com/edwardkim/rhwp) — 1차 적용 사례 (Rust + WebAssembly HWP/HWPX 뷰어)
- [postmelee/alhangeul-macos](https://github.com/postmelee/alhangeul-macos) — 2차 적용 사례 (macOS 한글 viewer)
- [OpenAI prompt guidance](https://developers.openai.com/api/docs/guides/prompt-guidance)
- [Anthropic Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

## 라이선스

MIT. 자세한 내용은 [LICENSE](LICENSE)를 참고하세요.
