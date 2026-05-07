# Hyper-Waterfall

### AI 페어 프로그래밍을 통제 가능한 개발 프로세스로 바꾸는 하네스 프레임워크

Hyper-Waterfall은 AI 페어 프로그래머와 함께 소프트웨어를 만들 때, AI의 속도를 유지하면서도 사람의 통제권, 작업 추적성, 승인 게이트, 문서화 규율을 잃지 않게 해주는 이식 가능한 작업 프레임워크입니다.

> [!IMPORTANT]
> **AI에게 코드를 맡기되, 결정권은 넘기지 않습니다.**

> 누구나 GitHub 저장소에 Hyper-Waterfall을 적용하고, Codex·Claude Code 등 여러 AI 코딩 에이전트가 같은 규율 위에서 작업하게 만듭니다.
> </br> AI에게 “그냥 만들어줘”라고 맡기는 대신, 계획·승인·구현·검증·보고·PR까지 이어지는 작업 레일을 저장소 안에 설치합니다.



### 적용하면 바로 달라지는 것

1. **AI가 마음대로 코드를 고치지 않습니다.**  
  소스 수정 전 계획서와 승인 게이트를 거치므로, 작업지시자가 방향을 끝까지 통제합니다.

2. **사람이 통제권을 잃지 않습니다.**  
  소스 수정, 단계 전환, 최종 보고, PR 생성 앞에는 승인 게이트가 있습니다. AI는 실행하지만, 방향과 품질 결정은 사람이 가집니다.
  
3. **“어디까지 했지?”를 채팅 기록에서 찾지 않아도 됩니다.**  
  이슈, 오늘할일, 수행계획서, 단계 보고서, 최종 보고서, PR이 작업 타임라인을 자동으로 구성합니다.

4. **채팅이 사라져도 작업 기억은 남습니다.**  
  의도, 결정, 검증 결과가 `mydocs/`, Issue, PR, commit log에 남습니다. 새 세션·새 에이전트·새 기여자가 와도 같은 맥락에서 다시 시작할 수 있습니다.
  
5. **타스크 별 작업으로 컨텍스트가 작고 선명하게 유지됩니다.**  
  권장 운용은 `1 Issue = 1 Task = 1 Branch = 1 Session`입니다. 타스크가 끝나면 세션도 닫고, 다음 이슈는 깨끗한 새 세션에서 시작합니다.

6. **여러 AI 세션을 병렬로 돌릴 수 있습니다.**  
  독립적인 Issue는 각각 `local/task{N}` 브랜치나 분리 worktree에서 진행할 수 있습니다. 컨텍스트와 변경 범위가 섞이지 않습니다.

7. **PR 리뷰가 쉬워집니다.**  
  PR에는 무엇을 왜 바꿨는지, 어떤 Stage를 거쳤는지, 어떤 검증을 했는지가 정리됩니다. 리뷰어는 채팅 로그가 아니라 저장소 산출물을 보면 됩니다.
  
8. **큰 구현이 끝난 뒤 방향 오류를 발견하는 일이 줄어듭니다.**  
  수행계획서, 구현계획서, Stage 완료보고서마다 사람이 검토하는 품질 게이트가 생깁니다.

9. **바이브 코딩의 속도는 살리고, 엔지니어링 규율은 되찾습니다.**  
  빠르게 만들되, 무엇을 만들었는지 설명할 수 있고, 어디서 잘못됐는지 추적할 수 있고, 언제든 이어받을 수 있습니다.
  
10. **AI 코딩이 “바이브”가 아니라 추적 가능한 개발 프로세스가 됩니다.**  
  모든 작업은 Issue, branch, 문서, commit, PR로 연결되어 나중에 검토하고 인수인계할 수 있습니다.

## Hyper-Waterfall이란?
### 거시적 워터폴 + 미시적 애자일, AI가 이 둘을 동시에 가능하게 한다.
AI가 없던 시대에는 불가능했던 방법론. 워터폴의 규율과 애자일의 속도를 동시에.

> 이 방법론은 [`edwardkim/rhwp`](https://github.com/edwardkim/rhwp)와 [`postmelee/alhangeul-macos`](https://github.com/postmelee/alhangeul-macos) 같은 실제 프로젝트 경험을 바탕으로 정제되었습니다. 
> 본 방법론의 핵심 철학은 [edwardkim/rhwp · hyper_waterfall.md](https://github.com/edwardkim/rhwp/blob/main/mydocs/manual/hyper_waterfall.md)에 가장 완성된 형태로 정리되어 있습니다. 본 저장소는 그 방법론을 다른 저장소에 손쉽게 적용할 수 있게 모듈화한 프레임워크입니다.

방법론을 먼저 이해하려면 아래 [핵심 구조](#핵심-구조)부터, 우리 저장소의 차별점만 보려면 [이 저장소가 한 일](#이-저장소가-한-일)로 점프하세요.

## 목차

**Part 1. 최초의 Hyper-Waterfall** ([rhwp](https://github.com/edwardkim/rhwp))

1. [핵심 구조](#핵심-구조)
2. [핵심 원칙](#핵심-원칙)
3. [역할 분담](#역할-분담)
4. [바이브 코딩 vs Hyper-Waterfall](#바이브-코딩-vs-hyper-waterfall)
5. [왜 강력한가 — AI 없이는 닿을 수 없는 지점](#왜-강력한가--ai-없이는-닿을-수-없는-지점)

**Part 2. 이 저장소의 Hyper-Waterfall** (`postmelee/hyper-waterfall`)

6. [이 저장소가 한 일](#이-저장소가-한-일)
7. [왜 이 저장소를 써야 하는가](#왜-이-저장소를-써야-하는가)
8. [새 저장소에 빠르게 적용하기](#새-저장소에-빠르게-적용하기)
9. [도입 후 작업 흐름](#도입-후-작업-흐름)
10. [적용 후 대상 저장소 구조](#적용-후-대상-저장소-구조)
11. [살아있는 예시 — 직접 따라가보기](#살아있는-예시--직접-따라가보기)
12. [설계 원칙](#설계-원칙)
13. [프롬프트 가이드 준수](#프롬프트-가이드-준수)

---

## 핵심 구조

### 거시적 워터폴 + 미시적 애자일

```
거시 (프로젝트 수준) — 워터폴의 규율:
  계획 ──→ 설계 ──→ 구현 ──→ 검증 ──→ 배포
  │         │        │        │        │
  ▼         ▼        ▼        ▼        ▼
  문서화    문서화    문서화    문서화    문서화

미시 (타스크 수준, 수 시간) — 애자일의 속도:
  구현 → 테스트 → 피드백 → 수정 → 테스트 → ... (빠른 반복)
  │       │         │        │       │
  AI     자동화    사람 판단   AI    자동화
```

- 거시적 방향: **워터폴의 규율**로 통제한다 — 계획서, 승인, 단계별 보고, 최종 검증.
- 미시적 실행: **애자일의 빠른 반복**으로 수행한다 — AI와 즉각적인 피드백 루프를 돌린다 (전체 사이클이 **몇 시간** 안에 완료).

이 과정에서 모든 작업이 문서화되고, 모든 결정이 기록됩니다. → 이것이 Hyper-Waterfall을 가능하게 합니다.

## 핵심 원칙

> **사람은 절대 생각을 멈추지 않는다.**

AI가 아무리 뛰어나도 방향을 결정하고 품질을 판단하는 것은 사람입니다. AI의 출력을 읽지 않고 수락하는 순간 Hyper-Waterfall은 바이브 코딩으로 전락합니다. 이 원칙을 운영 차원에서 풀어내면 다음 세 가지가 됩니다.

### 1. 사람이 방향을 끝까지 가진다

단계 전환, 계획 변경, 소스 수정에는 작업지시자의 명시 승인이 필요합니다. AI는 결정의 도구이지 결정자가 아닙니다. 게이트를 한 번이라도 건너뛰기 시작하면 방법론이 빠르게 무너집니다.

### 2. AI에게 항상 충분한 맥락을 준다

작업의 의도·범위·승인 기준을 매번 프롬프트에 처음부터 설명하지 않도록, 의도와 계획을 `mydocs/`에 박아둡니다. 모델은 같은 저장소를 읽으며 같은 컨텍스트 위에서 작업합니다. 맥락이 흩어진 상태로 작업을 시작하면 AI는 추측으로 빈 자리를 메우게 됩니다.

### 3. AI의 작업 기억을 주기적으로 외부화한다

단계 보고서·최종 보고서·PR 본문에 의도·결정·검증 근거를 증류해 기록합니다. 채팅 컨텍스트는 사라지지만 저장소의 markdown은 남고, 새 세션·새 기여자가 합류해도 같은 출발점에서 시작할 수 있습니다.

## 역할 분담

### 작업지시자 (사람)

사람은 **생각하는 역할**에 집중한다:

- 방향 설정: "다음에 뭘 해야 하는가?"
- 우선순위: "무엇이 더 중요한가?"
- 품질 판단: "이것이 충분히 좋은가?"
- 아키텍처 결정: "이 구조가 올바른가?"
- 도메인 지식: "한컴은 이 경우 어떻게 동작하는가?"
- 피드백: "이 부분이 잘못되었다, 왜냐하면..."

### AI 페어 프로그래머

AI는 **실행하는 역할**에 집중한다:

- 분석: 코드베이스 탐색, 원인 추적
- 계획: 구현 계획서 작성
- 구현: 코드 작성, 테스트 생성
- 문서: 보고서, 기술 문서, 커밋 메시지
- 디버깅: 로그 분석, 수정안 제시
- 반복: 피드백 반영, 재시도

## 바이브 코딩 vs Hyper-Waterfall

> 바이브 코딩 — `AI 출력을 읽지 않고 수락하고, AI에게 아키텍처 결정을 맡기고, 이해하지 못하는 코드를 배포하는 것` — 은 함정입니다. 겉보기에는 동작하지만, 이해하지 못했기 때문에 문제가 생겨도 진단할 수 없는 코드가 만들어집니다.
>
> 이 프로젝트는 정반대의 접근을 취합니다. 사람 작업지시자가 방향, 품질, 아키텍처 결정의 완전한 소유권을 유지하고, AI는 혼자서는 불가능한 속도와 규모로 구현을 수행합니다. 핵심 차이: **사람은 절대 생각을 멈추지 않습니다.**
>
> — [edwardkim/rhwp · 바이브 코딩 vs AI 주도 개발](https://github.com/edwardkim/rhwp#%EB%B0%94%EC%9D%B4%EB%B8%8C-%EC%BD%94%EB%94%A9-vs-ai-%EC%A3%BC%EB%8F%84-%EA%B0%9C%EB%B0%9C)

| | 바이브 코딩 | Hyper-Waterfall |
|---|---|---|
| **사람의 역할** | AI 출력 수락 | 지시, 검토, 결정 |
| **계획** | 없음 — "그냥 만들어" | 수행계획서 → 승인 → 구현계획서 → Stage 단위 실행 |
| **품질 관문** | 동작하길 바람 | 단계마다 검증 + 승인 게이트 + Open PR 리뷰 |
| **디버깅** | AI에게 AI 버그 수정 요청 | 사람이 진단, AI가 구현 |
| **아키텍처** | 우연히 형성 | 작업지시자가 의도적으로 설계 |
| **문서** | 없음 | `mydocs/`(계획서·단계 보고서·최종 보고서) + Issue/PR 본문 |
| 재현 가능성 | 불가능 | 전 과정 타임라인 추적 가능 |
| **결과물** | 취약, 유지보수 어려움 | 추적 가능, 인수인계 가능, 어디서든 재개 가능 |

## 왜 강력한가 — AI 없이는 닿을 수 없는 지점

거시적 워터폴과 미시적 애자일은 오랫동안 trade-off였습니다. 규율을 챙기면 느려졌고, 속도를 챙기면 규율이 빠졌습니다. AI 페어 프로그래머가 등장하면서 이 trade-off가 처음으로 깨졌습니다.

### 1. 속도는 잃지 않으면서 규율을 회복한다

워터폴이 무거워진 큰 이유 중 하나는 **사람이 모든 문서·계획·검증을 짊어졌기 때문**입니다. AI가 이 초안을 빠르게 만들어주면서 워터폴이 잃어버린 속도와 애자일이 잃어버린 규율을 동시에 살릴 수 있게 되었습니다. **같은 규율, 100배 빠른 속도** — 이것이 AI 없이는 닿을 수 없던 지점입니다.

### 2. 지식이 머릿속이 아니라 저장소에 외부화된다

결정·근거·검증 결과가 모두 `mydocs/`와 PR/Issue에 남습니다. 한 명에게 몰린 컨텍스트가 사라져도 다음 사람·다음 AI 세션이 **같은 출발점에서 시작**합니다. 애자일의 약점인 bus-factor 문제가 구조적으로 해소됩니다.

### 3. 사람은 결정에, AI는 실행에 집중한다

사람이 방향·우선순위·아키텍처·품질을 끝까지 책임지고, AI는 탐색·구현·테스트·문서·반복을 맡습니다. 한 사람의 집중력으로는 닿을 수 없는 작업량이 한 사이클 안에 들어옵니다. **AI는 배율기**입니다 — 좋은 프로세스 위에 올리면 비범한 결과물이 됩니다.

### 4. 여러 곳에서 이동하며 작업이 가능하다.

[rhwp](https://github.com/edwardkim/rhwp)의 메인테이너는 사무실, 집, 이동 중 — 3곳에서 각각 다른 클로드 세션으로 작업한다. 매번 새 세션은 이전의 기억이 없다.

하지만 문서가 있으면:

| "지금 뭘 해야 하지?" | → `orders/20260409.md` |
|---|---|
| "어디까지 했지?" | → `working/task_m100_86_stage1.md` |
| "어떻게 하기로 했지?" | → `plans/task_m100_86_impl.md` |
| "왜 이 방식으로 하지?" | → `feedback/` + `tech/` |
| "이 함정은 뭐지?" | → `troubleshootings/` |

**작업지시자가 컨텍스트 전달에 소비하는 시간이 거의 0**이다. 이것이 3곳을 이동하며 연속 작업이 가능한 이유이고, 컨트리뷰터가 합류했을 때도 동일하게 작동하는 이유이다.

---

# `postmelee/hyper-waterfall`

> 이 저장소는 [rhwp](https://github.com/edwardkim/rhwp)에서 처음 도입된 '하이퍼-워터폴' 방법론을 참고하여 다음과 같이 확장했습니다.

## 이 저장소가 한 일

### 1. 프롬프트 한 줄로 어떤 저장소에든 적용 — 모듈화 + placeholder 치환

원본 방법론(rhwp)은 그 저장소의 문서·관습과 강하게 결합되어 있어, 다른 프로젝트에 그대로 가져다 쓰기 어려웠습니다. 본 저장소는 운영 규칙·매뉴얼·SKILL을 `templates/`로 분리하고 진입 절차를 [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)로 정형화했습니다. 결과적으로 **AI 코딩 도구에 한 줄 프롬프트만 보내면** 어떤 저장소에든 적용됩니다. AI가 진입 절차를 따라 `REPO_SLUG`·`BASE_BRANCH` 같은 placeholder까지 자동으로 치환합니다.

기존 적용 저장소 업데이트를 위한 lifecycle 기준도 별도 문서로 정리하고 있습니다. GitHub Release/tag, manifest, migration guide, `.hyper-waterfall/version.json`을 읽어 현재 version, 목표 release/tag, manifest diff, Hyper-Waterfall 버전 업데이트 PR 후보를 먼저 판단하는 구조입니다. 본 저장소 자체가 자기 자신에 적용한 dogfooding 첫 사례입니다 (Issue #1, PR #2).

### 2. 공식 프롬프팅 가이드와의 정합

작업 문서 포맷이 [OpenAI](https://developers.openai.com/api/docs/guides/prompt-guidance)와 [Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)의 공식 프롬프팅 가이드 핵심을 자연스럽게 만족하도록 설계했습니다. 특히 GitHub Issue/PR 템플릿은 GitHub 플랫폼 산출물의 본문 구조를 잡고, `templates/mydocs/_templates/`는 계획서·보고서·피드백·외부 PR 검토 문서의 출력 형식을 명시합니다.

> AI가 문서를 작성하고 다시 참조 및 레퍼런스로 사용하는 재귀적 과정에서 응답 품질 저하를 최소화할 수 있습니다.

- 명확성(Clarity): 작업 목표가 명확하게 정의됨
- 일관성(Consistency): 모든 작업 문서가 동일한 구조를 가짐
- 단계적 접근(Step-by-step thinking): 작업을 작은 단계로 분할하여 진행
- 맥락 제공(Context): 작업에 필요한 모든 정보가 문서에 포함됨
- 출력 포맷 제약(Output format): 작업 결과물이 중앙 템플릿의 특정 포맷으로 출력됨

상세 매핑은 아래 [프롬프트 가이드 준수](#프롬프트-가이드-준수) 섹션에서 펼쳐 확인할 수 있습니다.

### 3. Multi-agent 호환 + 운영 규칙·SKILL·매뉴얼 분리로 토큰·컨텍스트 효율

rhwp는 `CLAUDE.md` 한 파일에 운영 규칙·문서 구조·폴더 정책·명명 규칙·PR 처리를 모두 인라인했고, `AGENTS.md`가 없어 Claude Code 전용으로 동작했습니다. 본 저장소는 두 축으로 분리·확장했습니다.

**(1) Multi-agent 호환**: `AGENTS.md`를 단일 진실 원천으로 두고 `CLAUDE.md`는 `@AGENTS.md` 한 줄로 참조합니다. SKILL은 `.agents/skills`(Codex) + `.claude/skills`(Claude Code) 심볼릭 링크로 같은 본문이 양쪽 도구에서 인식됩니다. 새로 추가되는 SKILL 인식 도구도 같은 패턴으로 확장됩니다.

**(2) 운영 규칙·SKILL·매뉴얼·템플릿 분리**: `AGENTS.md`에는 매 턴 시스템 프롬프트로 적재될 정책·제약·인덱스만 두고, 절차 상세는 [`mydocs/manual/`](templates/mydocs/manual/)의 5개 매뉴얼(문서 구조, 타스크 진행, Git, PR, 충돌 규칙), [`.github/`](templates/.github/)의 GitHub Issue/PR 템플릿, [`mydocs/_templates/`](templates/mydocs/_templates/)의 문서 출력 형식, [`mydocs/skills/`](templates/mydocs/skills/)의 7개 SKILL로 분리했습니다.

효과:

- **토큰 효율**: 매 턴 시스템 프롬프트로 적재되는 분량을 축소. 매뉴얼·SKILL 본문은 호출 시점에만 컨텍스트로 들어옵니다.
- **컨텍스트 효율**: 모델은 필요한 시점에 필요한 절차만 읽습니다. 무관한 절차로 컨텍스트가 오염되지 않습니다.
- **의도 전달 명확성**: GitHub 템플릿과 중앙 템플릿이 반복 산출물의 구조를 고정하고, 단계별 SKILL이 절차의 어느 시점에 호출되는지 명시해 AI가 추론으로 절차나 출력 형식을 재구성하지 않습니다.
- **모델 간 이식성**: SKILL은 표준 형식이라 다른 SKILL 인식 도구로 옮기기 쉽습니다.

## 왜 이 저장소를 써야 하는가

AI는 두 가지 구조적 약점을 가집니다.

- 세션이 길어지거나 도구가 바뀌면 맥락을 잃습니다.
- 방향이 틀렸는데도 자신 있게 계속 실행할 수 있습니다.

본 저장소는 이 약점을 작업 제약으로 바꾸고, 다음 세 축에서 사용자가 즉시 체감할 수 있는 이점을 만들어냅니다.

### 1. 모든 작업이 문서가 되고, 문서가 다음 작업의 프롬프트가 된다 — 지식 자산화

- 작업의 의도, 계획, 단계별 검증 결과, 의사결정 근거가 모두 `mydocs/` 안의 markdown 파일로 쌓입니다. 단순 기록이 아니라 **다음 작업의 input** — 모델이 새 task를 시작할 때 같은 저장소에 있는 과거 계획서·보고서·결정 기록을 읽고 그 위에서 작업합니다. **잘 쓴 문서가 곧 좋은 프롬프트가 되고, 잘 쓴 프롬프트가 곧 다음 좋은 문서를 만드는 선순환**이 일어납니다.
- 작업을 이어갈 때도 채팅 히스토리에 의존하지 않고 저장소 산출물만으로 맥락을 복원할 수 있습니다. 새 기여자나 새 AI 세션이 합류해도 같은 출발점에서 시작할 수 있습니다.

> 이는 옵시디언 vault를 LLM에 연결해 개인 지식 저장소를 컨텍스트로 쓰는 흐름과 같은 구조입니다. 차이는 vault의 성격에 있습니다. 옵시디언이 일반 지식·아이디어를 모은다면, `mydocs/`는 **작업 이력에 특화된 vault**로서 의도·계획·검증·산출물·트러블슈팅을 작업 단위로 자동 누적합니다. 절차가 강제하기 때문에 누락이 없고 일관됩니다.

### 2. 큰 사고 전, 게이트에서 방향 오류를 발견한다 — 리스크

- 작업은 `이슈 → 브랜치 → 수행계획서 → 구현계획서 → Stage 단위 구현·검증·보고 → 최종 보고서 → Open PR` 순서를 따르며, 각 게이트에서 작업지시자 승인을 받습니다.
- 큰 구현이 끝난 뒤에 "방향이 틀렸음"을 깨닫는 대신, **수행계획서·구현계획서·각 Stage 경계에서 일찍 잡히므로 매몰 비용이 작습니다.**
- 단계 검증이 실패하면 그 단계 안에서 회복하고, scope가 바뀌면 계획서를 갱신해 재승인을 받습니다.

### 3. "AI한테 잘 부탁한다"가 아니라 "AI가 잘할 수밖에 없게 만든다" — 자동화된 역할 분담

- 작업지시자는 **방향, 우선순위, 아키텍처, 품질 결정의 책임을 끝까지 가지고**, AI는 탐색·초안 작성·구현·테스트·보고서 작성·PR 본문 작성 같은 고반복 작업을 맡습니다. 모든 단계 전환은 작업지시자의 명시 승인이 필요합니다.
- 본 저장소는 이 분담을 **운영 차원에서 자동화**합니다. task 관리 규칙을 SKILL로 분리해 AI가 단계별로 무엇을 해야 하는지·어떤 산출물을 남겨야 하는지·언제 멈추고 사람에게 넘겨야 하는지를 자연스럽게 준수합니다.
- 작업 문서 포맷 자체가 OpenAI·Anthropic 공식 프롬프팅 가이드 핵심을 자연스럽게 만족합니다. 사용자가 프롬프트 엔지니어링을 따로 공부하지 않아도, AI는 일관된 중앙 템플릿·명확한 맥락·단계별 사고·정해진 출력 형식 안에서 작업합니다.

### 4. 세션을 타스크 단위로 열고 닫는다 — 컨텍스트 경량화
- Hyper-Waterfall은 하나의 AI 세션에 모든 작업 맥락을 계속 누적하는 방식이 아닙니다. 권장 운용은 **`1 Issue = 1 Task = 1 Branch = 1 Session`** 입니다. 하나의 세션은 하나의 Issue를 맡고, 해당 타스크가 끝나면 세션도 닫습니다.
- 각 세션은 현재 Issue, 수행계획서, 구현계획서, 단계 보고서, 관련 코드만 읽고 작업합니다. 오래된 대화 기록이나 다른 타스크의 결정이 현재 판단을 오염시키지 않으므로 **컨텍스트가 작고 선명하게 유지됩니다.**
- 타스크가 끝나면 결과는 채팅이 아니라 `mydocs/`, Issue, PR, commit log에 남습니다. 다음 타스크는 새 세션에서 시작해도 저장소에 남은 문서를 읽고 같은 맥락 위에서 다시 출발할 수 있습니다.
- 서로 독립적인 Issue는 별도 `local/task{N}` 브랜치나 분리 worktree에서 여러 AI 세션으로 병렬 진행할 수 있습니다. 단, 같은 파일이나 같은 아키텍처 결정을 건드리는 작업은 먼저 순서를 정합니다.

> AI 세션은 길수록 똑똑해지는 것이 아니라, 종종 흐려집니다. Hyper-Waterfall은 세션을 짧게 유지하고 기억은 저장소에 남깁니다.

### 5. 결과
위 네 가지는 따로 떨어진 기능이 아니라 하나의 작업 루프입니다. 작업은 문서로 남고, 방향 오류는 게이트에서 걸러지고, 사람과 AI의 역할은 분리되며, 세션은 타스크 단위로 작게 유지됩니다. 

그 결과 AI 코딩은 긴 채팅이 아니라, 저장소 안에서 추적·검토·재개 가능한 개발 프로세스가 됩니다.

> [!NOTE]
> 이 구조는 [OpenAI GPT-5.5](https://developers.openai.com/api/docs/guides/prompt-guidance)와 [Claude Opus 4.7](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) 공식 프롬프팅 가이드가 강조하는 명확한 지시, 충분한 맥락, 출력 형식 제약, 검증 기준, 장기 작업 기억, agentic workflow 제어 원칙과 정합됩니다. 상세 매핑은 아래 [프롬프트 가이드 준수](#프롬프트-가이드-준수) 섹션에서 확인할 수 있습니다.

## 새 저장소에 빠르게 적용하기

AI 코딩 도구에 다음 한 줄을 보내주세요.

```text
https://github.com/postmelee/hyper-waterfall 의 하이퍼-워터폴 방법론을 이 저장소에 적용해줘.
```

AI는 [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)부터 읽어 적용 절차를 따릅니다. 소스 변경 전 반드시 작업지시자 승인을 받게 되어 있습니다.

도입 후에는 AI가 알아서 Hyper-Waterfall 방식을 지키며 작업을 진행합니다. 처음 시작하는 사용자는 AI에게 `"이거 구현해줘"`와 같은 자연어 명령을 내리기만 하면 됩니다.

기존 적용 저장소 업데이트는 GitHub Release/tag와 manifest를 기준으로 수행합니다. AI는 [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)의 기존 업데이트 판단 결과 형식에 따라 현재 version, 목표 release/tag, migration guide, manifest diff, Hyper-Waterfall 버전 업데이트 PR 후보를 먼저 보고하고, 승인된 범위만 별도 task로 진행합니다. 배포 채널이 확정되면 README에는 사용자가 복사할 업데이트 프롬프트나 CLI 명령만 남깁니다.

## 도입 후 작업 흐름

Hyper-Waterfall은 **타스크** 단위로 작업을 진행합니다.


### 타스크 진행 절차

모든 타스크는 아래 절차를 **엄격하게** 따릅니다.

```
1. GitHub Issue 확인 또는 등록
2. 오늘할일(orders/) 기록
3. 타스크 브랜치 생성 (local/task{번호})
4. 수행계획서 작성 → [작업지시자 승인]
5. 구현계획서 작성 → [작업지시자 승인]
6. 단계별 구현
7. 단계별 완료보고서 → [작업지시자 승인]
8. (다음 단계 반복)
9. 최종 결과보고서 → [작업지시자 승인]
10. 오늘할일 상태 갱신
```

> 각 `[승인]` 지점이 품질 게이트입니다. 코드 리뷰만으로는 잡을 수 없는 **방향성 오류**를 문서 리뷰에서 잡는다.

세부 절차는 [타스크 진행 절차 매뉴얼](templates/mydocs/manual/task_workflow_guide.md#타스크-진행-절차)을 기준으로 합니다. 브랜치와 PR 게시 흐름은 [Git 워크플로우 매뉴얼](templates/mydocs/manual/git_workflow_guide.md#브랜치-관리)에서 확인할 수 있습니다.

### 핵심 SKILL 상세

| SKILL | 사용하는 시점 | 주요 산출물 |
|---|---|---|
| `task-register` | 신규 작업이라 GitHub Issue를 먼저 만들어야 할 때 | `task.yml` Issue Form 구조를 따르는 GitHub Issue, milestone·label 후보와 선택 이유 |
| `task-start` | 승인된 이슈 작업을 시작할 때 | `local/task{N}` 브랜치, 오늘할일 행, `task_plan.md` 기반 수행계획서 |
| `task-stage-report` | 한 Stage 구현이 끝나고 다음 단계로 넘어가기 직전 | `stage_report.md` 기반 단계 보고서, 단계 묶음 커밋, 단계 검증 결과 |
| `task-final-report` | 모든 Stage가 끝나고 PR을 게시하기 직전 | `final_report.md` 기반 최종 보고서, 오늘할일 완료 처리, Open PR |
| `pr-merge-cleanup` | PR이 실제로 merge된 직후 | 이슈 close, `publish/task{N}` 원격 삭제, 로컬 브랜치/worktree 정리 |
| `external-pr-review` | 외부 기여자 PR을 검토할 때 | `external_pr_*` 템플릿 기반 `mydocs/pr/` 검토 문서, 검증 결과, 권고(merge/수정/닫기) |
| `todo` | 오늘할일 보드를 새로 만들거나 갱신할 때 | `orders.md` 기반 `mydocs/orders/yyyymmdd.md` 표 형식 갱신 |

각 SKILL을 언제 사용자에게 표시하는지는 [SKILL 호출 표시 안내](templates/mydocs/manual/task_workflow_guide.md#skill-호출-표시-안내)를 따릅니다. PR 본문 작성과 검증 구조는 [내부 task PR 작성 규칙](templates/mydocs/manual/pr_process_guide.md#내부-task-pr-작성-규칙)을 기준으로 합니다.

### 타스크 사이클

이슈가 이미 있으면 `task-register`를 건너뛰고 바로 `task-start`로 수행계획서 작성에 들어갑니다. 예를 들어 작업지시자가 `"issue #17 작업을 진행해줘"`라고 지시하면 AI는 #17의 milestone과 본문을 확인한 뒤 `local/task17`, 오늘할일, 수행계획서를 만듭니다. 아직 이슈가 없을 때만 `task-register`가 중복 이슈·milestone·label을 확인하고 생성 전 승인을 받은 뒤 GitHub Issue를 만듭니다.

각 단계 전환에는 작업지시자의 명시 승인이 필요합니다.
```
0. 타스크 등록 → `task-register`
   └─ AI: 중복 이슈, milestone, label 후보 확인
   └─ 작업지시자: 이슈 생성 승인
   └─ AI: GitHub Issue 생성 후 `task-start` 진입 승인 요청

1. 수행 계획서 → `task-start`
   └─ 작업지시자: "issue #N 작업을 진행해줘"처럼 기존 이슈를 지정하거나, 방금 생성한 이슈로 시작 승인
   └─ AI: 계획서 작성 (최소 3단계, 최대 6단계)
   └─ 작업지시자: 검토 → 승인 또는 수정 요청

2. 단계별 구현 → `task-stage-report`(단계 수만큼 반복)
   └─ AI: 코드 작성 + 테스트
   └─ AI: 단계 완료 보고서 작성
   └─ 작업지시자: 검증 → 승인 또는 피드백

3. 피드백 반영 → (수동)
   └─ 작업지시자: 피드백 문서 작성 (mydocs/feedback/), AI가 반영. scope가 바뀌면 계획서를 갱신해 재승인
   └─ AI: 피드백 반영, 수정

4. 최종 보고 + Open PR → `task-final-report`
   └─ AI: 최종 결과 보고서 작성, 검증 결과·근거를 구조화한 Open PR 생성
   └─ 작업지시자: 검증 → 승인 또는 피드백

5. PR 리뷰 + merge + 정리 → `pr-merge-cleanup`
   └─ 작업지시자: PR 검토 → 승인 또는 피드백
   └─ AI: 리뷰·merge 후 이슈 close, 브랜치/오늘할일 정리
```
`todo`는 위 흐름 어느 단계에서든 오늘할일 보드를 갱신할 때 호출합니다. `external-pr-review`는 외부 기여자 PR 검토용 별도 흐름입니다.

### 문서 구조

타스크가 사용하거나 만들어내는 문서 구조:

```
mydocs/
├── _templates/                         ← 산출물별 출력 형식
├── orders/yyyymmdd.md                  ← 오늘 할일 (타스크 목록 + 상태)
├── plans/task_{milestone}_{N}.md       ← 수행 계획서
├── plans/task_{milestone}_{N}_impl.md  ← 구현 계획서
├── working/task_{milestone}_{N}_stage{S}.md
│                                        ← 단계별 완료 보고서
├── report/task_{milestone}_{N}_report.md
│                                        ← 최종 결과 보고서
├── feedback/                           ← 피드백·리뷰 의견
├── tech/                               ← 기술 조사
├── troubleshootings/                   ← 트러블슈팅
└── pr/                                 ← 외부 PR 검토 기록
```

폴더별 역할과 허용 파일명은 [문서 구조 매뉴얼의 폴더별 상세 규칙](templates/mydocs/manual/document_structure_guide.md#폴더별-상세-규칙)과 [문서 파일명 규칙](templates/mydocs/manual/document_structure_guide.md#문서-파일명-규칙)을 기준으로 확인합니다. 산출물 출력 형식은 [중앙 템플릿 정책](templates/mydocs/manual/document_structure_guide.md#중앙-템플릿-정책)에 정리되어 있습니다.

`_templates/`는 실제 task 산출물이 아니라 출력 형식의 진실 원천입니다. 각 Skill은 산출물을 만들 때 먼저 `mydocs/_templates/`의 해당 템플릿을 참조하고, 템플릿을 읽을 수 없는 상황에서만 Skill 안의 최소 섹션 요약을 fallback으로 사용합니다.

GitHub Issue와 Pull Request는 GitHub 플랫폼 산출물입니다. 이슈 본문은 `.github/ISSUE_TEMPLATE/task.yml`, PR 본문은 `.github/pull_request_template.md`를 기준으로 구조화하고, 저장소 안에 남는 작업 문서는 `mydocs/_templates/`를 기준으로 작성합니다. 세부 경계는 [GitHub 플랫폼 템플릿 정책](templates/mydocs/manual/document_structure_guide.md#github-플랫폼-템플릿-정책)을 따릅니다.

## 적용 후 대상 저장소 구조

`templates/`를 복사하고 placeholder를 치환한 뒤 사용자 저장소에 만들어지는 모습입니다.

```text
your-repo/
├── AGENTS.md                       운영 규칙 단일 진실 원천
├── CLAUDE.md                       Claude Code용 (AGENTS.md 참조)
├── .hyper-waterfall/
│   └── version.json                 적용된 Hyper-Waterfall version 기록
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── task.yml
│   └── pull_request_template.md
├── .agents/
│   └── skills -> ../mydocs/skills  Codex 인식 경로 (심볼릭 링크)
├── .claude/
│   └── skills -> ../mydocs/skills  Claude Code 인식 경로 (심볼릭 링크)
└── mydocs/
    ├── _templates/         산출물별 출력 형식 템플릿
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

적용 저장소의 `.agents/skills`와 `.claude/skills` 심볼릭 링크 구조는 [Agent Skills 위치 정책](templates/mydocs/manual/document_structure_guide.md#agent-skills-위치-정책)을 따릅니다. `.hyper-waterfall/version.json`과 manifest 기준 업데이트 흐름은 [배포 manifest와 버전 기록 정책](templates/mydocs/manual/document_structure_guide.md#배포-manifest와-버전-기록-정책)에 정리되어 있습니다.

프레임워크의 문서 템플릿, GitHub Issue Form, SKILL 진실 원천은 각각 `templates/mydocs/_templates/`, `templates/.github/ISSUE_TEMPLATE/task.yml`, `templates/mydocs/skills/`입니다. 적용 저장소에서는 `.agents/skills`와 `.claude/skills` 심볼릭 링크가 같은 `mydocs/skills` 본문을 가리킵니다.

## 살아있는 예시 — 직접 따라가보기

이 저장소 자체가 하이퍼-워터폴을 자기 자신에게 적용한 첫 사례입니다. 적용 여부를 검토하기 전에 실제 운영이 어떻게 돌아가는지 보고 싶다면 다음 순서로 둘러보세요.

1. **이슈** [`#1` 하이퍼-워터폴 자기 적용 (dogfooding)](https://github.com/postmelee/hyper-waterfall/issues/1) — 라벨 3개, 마일스톤 M010, linked PR이 자동 표시되는 깔끔한 구조 (상태 알림 댓글 없음)
2. **Pull Request** [`#2`](https://github.com/postmelee/hyper-waterfall/pull/2) — Open PR 본문 형식: 요약 4 bullet (대상 타스크/왜/무엇/리뷰 포인트), Stage 5개 timeline 이중 링크(단계 보고서 + commit URL), 영향 영역 표, 작업 문서, 검증 결과와 근거
3. **수행계획서** [`mydocs/plans/task_m010_1.md`](mydocs/plans/task_m010_1.md) — 목적·배경·범위·설계 방향·예상 변경 파일·잠정 단계·검증 계획·리스크
4. **구현계획서 5단계** [`mydocs/plans/task_m010_1_impl.md`](mydocs/plans/task_m010_1_impl.md) — 단계별 산출물·검증 명령·커밋 메시지를 사전에 확정
5. **단계 보고서 5개** [`mydocs/working/`](mydocs/working/) — 각 Stage 종료 시 산출물·검증 결과·잔여 위험·다음 단계 영향
6. **최종 보고서** [`mydocs/report/task_m010_1_report.md`](mydocs/report/task_m010_1_report.md) — 5단계 종합, 변경 전·후 정량 비교, 수용 기준 검증
7. **오늘할일** [`mydocs/orders/`](mydocs/orders/) — 일일 보드 형식 (마일스톤별 표 + 완료 시각)
8. **commit log** [`git log` (main)](https://github.com/postmelee/hyper-waterfall/commits/main) — `Task #1: 수행 계획서 작성`부터 `pr-merge-cleanup`까지 12개 task 커밋이 시간 순서로 보존

이 첫 task는 scope 확장 두 번을 거치며 5단계로 진행됐습니다. 즉 README에 적힌 절차가 실제 어떻게 돌아가는지 — 승인 게이트, 단계 보고, scope 변경 처리, PR 본문 재작성, merge 후 정리까지 — 모두 살아있는 산출물로 따라갈 수 있습니다.

## 설계 원칙

- 의미 있는 소스 변경에는 인간 승인 게이트가 필요합니다.
- 이슈 진행 추적은 GitHub의 linked PR 자동 cross-reference와 라벨/마일스톤에 위임하고, 댓글은 토론·블로커·결정 기록 용도로만 둡니다.
- 최신 상태는 이슈 metadata, 현재 branch 또는 PR, `mydocs/`에서 찾을 수 있어야 합니다.
- 이 프레임워크는 다양한 프로젝트 유형에서 동작해야 합니다. 특정 언어, 빌드, 배포, 제품 규칙은 core가 아니라 대상 저장소의 템플릿과 설정에 둡니다.
- 프로세스에는 엄격하고, 도구에는 유연해야 합니다.

> Hyper-Waterfall은 새로운 마법이 아니라, 워터폴의 규율과 애자일의 속도를 AI라는 배율기 위에서 동시에 살리는 운영 방식입니다. 좋은 프로세스 위에서 AI는 비범한 결과물을 만들어냅니다.

## 프롬프트 가이드 정합

Hyper-Waterfall은 OpenAI와 Anthropic의 공식 프롬프팅 가이드의 핵심을 개발 프로세스 차원에서 구현합니다. "프롬프트를 잘 쓰는 법"이 아니라 **프롬프트가 잘 써질 수밖에 없는 저장소 구조**를 만드는 접근입니다.

### 정합성 요약

| 원칙 | Hyper-Waterfall에서 구현되는 방식 | 효과 |
|---|---|---|
| 명확한 목표 | GitHub Issue, 수행계획서, 구현계획서 | AI가 작업 범위와 성공 기준을 먼저 이해함 |
| 충분한 맥락 | `mydocs/`의 계획서·보고서·피드백·기술 조사 | 새 세션도 저장소 문서로 맥락 복원 |
| 출력 형식 제약 | `mydocs/_templates/`, Issue/PR template | 계획·보고·검증 결과가 매번 같은 구조로 남음 |
| 단계적 진행 | Stage 단위 구현·검증·보고 | 복잡한 작업을 검토 가능한 단위로 분할 |
| 검증 기준 | Stage 보고서, 최종 보고서, PR 본문 | 결과물을 감이 아니라 기록된 기준으로 판단 |
| 멈춤 조건 | 승인 게이트 | AI가 임의로 다음 단계로 넘어가지 않음 |
| 장기 작업 기억 | `mydocs/`, commit log, PR timeline | 채팅이 사라져도 작업 이력 유지 |
| 컨텍스트 경량화 | `1 Issue = 1 Task = 1 Branch = 1 Session` | 세션이 작고 선명하게 유지됨 |

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
   `mydocs/_templates/`는 계획서, 구현계획서, 단계 보고서, 최종 보고서, 피드백, 기술 조사, 트러블슈팅, 외부 PR 검토 문서의 expected output shape를 파일로 고정합니다. PR 본문은 `.github/pull_request_template.md`가 리뷰 화면에 맞춰 구조화합니다. AI의 답변이 흩어지는 대신, 다음 작업자가 다시 읽을 수 있는 구조가 됩니다.

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
   계획서·단계 보고서·최종 보고서·피드백·기술 조사·외부 PR 검토 문서는 `mydocs/_templates/`의 desired output format을 따르고, PR 본문은 `.github/pull_request_template.md`를 따릅니다. 모델이 "어디에 무엇을 적을지"를 매 작업마다 발명하지 않게 합니다.

5. **장기 작업과 외부 기억.**
   Opus 4.7이 강한 long-horizon agentic work와 memory task에 `mydocs/`가 그대로 대응합니다. 채팅 컨텍스트가 사라져도 파일시스템에 작업 기억이 증류되어 남습니다.

6. **Literal 지시 따름과 정합.**
   Opus 4.7은 명시된 범위에 더 정확히 묶이는 경향이 있습니다. Hyper-Waterfall은 "소스 수정 전 승인", "승인 없이 다음 Stage 진행 금지", "Issue 기준 추적" 같은 경계를 애초에 문서화하므로 literal한 모델일수록 잘 작동합니다.

> 단, Hyper-Waterfall은 "최대 자율성"보다 "인간 통제권과 추적 가능성"을 우선합니다. Opus 4.7 가이드가 권장하는 "interactive coding에서 첫 턴에 의도와 제약을 명확히 주고 반복 상호작용을 줄이라"는 권고와 같은 layer가 아니라, 한 단계 위 — task 전체 관점의 게이트 — 에서 작동합니다. XML 태그 구조화는 직접 채택하지 않으며, `mydocs/` 폴더 구조, 파일명 규칙, 중앙 템플릿이 같은 역할을 수행합니다.

> **한 줄 요약**: Hyper-Waterfall은 Claude Opus 4.7 프롬프팅 가이드의 핵심을 단순한 프롬프트 문장이 아니라, 개발 프로세스로 구현한 하네스입니다.

</details>

## 라이선스

MIT. 자세한 내용은 [LICENSE](LICENSE)를 참고하세요.
