# Hyper-Waterfall

[English](README.md) | 한국어 | [简体中文](README.zh-CN.md)

![Hyper-Waterfall overview](docs/assets/hyper-waterfall.png)

Hyper-Waterfall은 AI 코딩을 `Issue`, `branch`, 계획서, Stage 보고서, 최종 보고서, PR로 묶어 **추적 가능하고 승인 가능한 개발 프로세스**로 만드는 방법론 하네스입니다.

AI가 바로 파일을 고치게 두지 않고, 작업 목적과 범위, 검증 기준을 먼저 문서화합니다. 소스 수정, 단계 전환, 최종 보고, PR 생성 앞에는 작업지시자 승인 게이트가 있습니다.

이 저장소는 Hyper-Waterfall을 다른 저장소에 반복 적용할 수 있도록 템플릿, 운영 문서, GitHub workflow, Agent Skill, lifecycle 문서, CLI를 패키지화합니다.

## 빠른 시작

AI 코딩 도구에 다음 문장을 보내면 적용 절차가 시작됩니다.

```text
https://github.com/postmelee/hyper-waterfall 의 하이퍼-워터폴 방법론을 이 저장소에 적용해줘.
```

> [!IMPORTANT]
> AI는 파일을 수정하기 전에 적용 모드, 변경 후보, 승인 요청을 먼저 보고해야 합니다.

AI는 먼저 [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)를 읽고, 신규 적용이면 [`docs/lifecycle/adoption.md`](docs/lifecycle/adoption.md), 기존 적용 저장소 업데이트이면 [`docs/lifecycle/update.md`](docs/lifecycle/update.md)를 기준으로 판단합니다.

| AI가 먼저 보고할 것 | 내용 |
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
- PR 리뷰에서 무엇을 왜 바꿨고 어떻게 검증했는지가 바로 보여야 할 때
- 큰 작업을 Issue, branch, Stage 단위로 나눠 방향 오류를 일찍 잡고 싶을 때
- 새 기여자나 새 AI 세션이 저장소 문서만 읽고 같은 맥락에서 다시 시작해야 할 때

### 과한 경우

- 한두 줄 수정처럼 계획서와 보고서 비용이 변경 자체보다 큰 작업
- 버리는 프로토타입처럼 추적 가능성보다 즉시 실험이 중요한 작업
- GitHub Issue, branch, PR 흐름을 쓰지 않는 저장소
- 사람이 결과를 검토하지 않고 AI 출력만 그대로 수락하려는 작업

## 왜 이 저장소를 써야 하는가

AI 코딩 도구는 두 가지 구조적 약점을 가집니다.

- 세션이 길어지거나 도구가 바뀌면 맥락을 잃습니다.
- 방향이 틀렸는데도 자신 있게 계속 실행할 수 있습니다.

이 저장소는 그 약점을 작업 제약으로 바꿉니다.

| 축 | 사용자가 얻는 것 | 작동 방식 |
|---|---|---|
| 지식 자산화 | 채팅이 사라져도 작업 기억이 남음 | 의도, 계획, 검증 결과, 결정 근거가 `mydocs/`, Issue, PR, commit log에 남음 |
| 리스크 제어 | 큰 구현 뒤 방향 오류를 발견하는 일이 줄어듦 | 수행계획서, 구현계획서, Stage 경계마다 사람이 검토 |
| 역할 분담 | AI에게 잘 부탁하는 대신 AI가 잘할 수밖에 없는 구조를 만듦 | SKILL과 템플릿이 산출물, 멈춤 조건, 보고 형식을 고정 |
| 컨텍스트 경량화 | 세션이 작고 선명하게 유지됨 | `1 Issue = 1 Task = 1 Branch = 1 Session` 단위로 작업 |

작업의 의도, 계획, 단계별 검증 결과, 의사결정 근거는 모두 다음 작업의 input이 됩니다. 잘 쓴 문서가 좋은 프롬프트가 되고, 좋은 프롬프트가 다시 좋은 문서를 만드는 순환이 생깁니다.

> AI 세션은 길수록 똑똑해지는 것이 아니라, 종종 흐려집니다. Hyper-Waterfall은 세션을 짧게 유지하고 기억은 저장소에 남깁니다.

## 이 하네스가 하는 일

### 1. 프롬프트 한 줄로 어떤 저장소에든 적용 — 모듈화 + placeholder 치환

Hyper-Waterfall 운영 방식이 특정 저장소의 문서·관습과 강하게 결합되어 있으면, 다른 프로젝트에 그대로 가져다 쓰기 어렵습니다. 본 저장소는 운영 규칙·매뉴얼·SKILL을 `templates/`로 분리하고 진입 절차를 [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)로 정형화했습니다. 결과적으로 **AI 코딩 도구에 한 줄 프롬프트만 보내면** 어떤 저장소에든 적용됩니다. AI가 진입 절차를 따라 `REPO_SLUG`·`BASE_BRANCH` 같은 placeholder까지 자동으로 치환합니다.

기존 적용 저장소 업데이트를 위한 lifecycle 기준도 별도 문서로 정리하고 있습니다. GitHub Release/tag, manifest, migration guide, `.hyper-waterfall/version.json`을 읽어 현재 version, 목표 release/tag, manifest diff, Hyper-Waterfall 버전 업데이트 PR 후보를 먼저 판단하는 구조입니다. 세부 기준은 [`docs/lifecycle/update.md`](docs/lifecycle/update.md)와 [`docs/lifecycle/update_pr.md`](docs/lifecycle/update_pr.md)에 둡니다. 본 저장소 자체가 자기 자신에 적용한 dogfooding 첫 사례입니다 (Issue #1, PR #2).

### 2. 공식 프롬프팅 가이드와의 정합

작업 문서 포맷이 OpenAI와 Anthropic의 공식 프롬프팅 가이드 핵심을 자연스럽게 만족하도록 설계했습니다. 특히 GitHub Issue/PR 템플릿은 GitHub 플랫폼 산출물의 본문 구조를 잡고, `templates/mydocs/_templates/`는 계획서·보고서·피드백·외부 PR 검토 문서의 출력 형식을 명시합니다.

> AI가 문서를 작성하고 다시 참조 및 레퍼런스로 사용하는 재귀적 과정에서 응답 품질 저하를 최소화할 수 있습니다.

- 명확성(Clarity): 작업 목표가 명확하게 정의됨
- 일관성(Consistency): 모든 작업 문서가 동일한 구조를 가짐
- 단계적 접근(Step-by-step thinking): 작업을 작은 단계로 분할하여 진행
- 맥락 제공(Context): 작업에 필요한 모든 정보가 문서에 포함됨
- 출력 포맷 제약(Output format): 작업 결과물이 중앙 템플릿의 특정 포맷으로 출력됨

상세 매핑은 아래 [프롬프트 가이드 준수](#프롬프트-가이드-준수) 섹션에서 펼쳐 확인할 수 있습니다.

### 3. Multi-agent 호환 + 운영 규칙·SKILL·매뉴얼 분리로 토큰·컨텍스트 효율

운영 규칙·문서 구조·폴더 정책·명명 규칙·PR 처리를 하나의 도구 전용 파일에 모두 인라인하면 특정 에이전트에 강하게 결합되고, 매 턴 컨텍스트도 불필요하게 커집니다. 본 저장소는 두 축으로 분리·확장했습니다.

**(1) Multi-agent 호환**: `AGENTS.md`를 단일 진실 원천으로 두고 `CLAUDE.md`는 `@AGENTS.md` 한 줄로 참조합니다. SKILL은 `.agents/skills`(Codex) + `.claude/skills`(Claude Code) 심볼릭 링크로 같은 본문이 양쪽 도구에서 인식됩니다. 새로 추가되는 SKILL 인식 도구도 같은 패턴으로 확장됩니다.

**(2) 운영 규칙·SKILL·매뉴얼·템플릿 분리**: `AGENTS.md`에는 매 턴 시스템 프롬프트로 적재될 정책·제약·인덱스만 두고, 절차 상세는 [`mydocs/manual/`](templates/mydocs/manual/)의 주제별 매뉴얼(문서 구조, 타스크 진행, Git, PR, lifecycle, release/update, 충돌 규칙), 각 `mydocs/` 폴더의 `README.md`, [`.github/`](templates/.github/)의 GitHub Issue/PR 템플릿, [`mydocs/_templates/`](templates/mydocs/_templates/)의 문서 출력 형식, [`mydocs/skills/`](templates/mydocs/skills/)의 7개 SKILL로 분리했습니다.

효과:

- **토큰 효율**: 매 턴 시스템 프롬프트로 적재되는 분량을 축소. 매뉴얼·SKILL 본문은 호출 시점에만 컨텍스트로 들어옵니다.
- **컨텍스트 효율**: 모델은 필요한 시점에 필요한 절차만 읽습니다. 무관한 절차로 컨텍스트가 오염되지 않습니다.
- **의도 전달 명확성**: GitHub 템플릿과 중앙 템플릿이 반복 산출물의 구조를 고정하고, 단계별 SKILL이 절차의 어느 시점에 호출되는지 명시해 AI가 추론으로 절차나 출력 형식을 재구성하지 않습니다.
- **모델 간 이식성**: SKILL은 표준 형식이라 다른 SKILL 인식 도구로 옮기기 쉽습니다.

## 무엇이 바뀌나

| 기존 AI 코딩 방식 | Hyper-Waterfall 적용 후 |
|---|---|
| "이거 만들어줘"라고 시키면 AI가 바로 파일을 고침 | 먼저 Issue와 수행계획서로 목적, 범위, 검증 기준을 정리 |
| 작업 범위가 대화 중 계속 흔들림 | 구현계획서에서 Stage 단위로 쪼개고 승인된 범위 안에서만 진행 |
| AI가 어느 파일을 왜 고쳤는지 추적하기 어려움 | Stage 보고서와 커밋으로 변경 이유, 산출물, 검증 결과를 기록 |
| 채팅이 길어지면 맥락이 흐려짐 | `mydocs/`, Issue, PR, commit log에 작업 기억을 외부화 |
| 큰 구현이 끝난 뒤 방향 오류를 발견 | 수행계획서, 구현계획서, Stage 완료마다 승인 또는 수정 지시 |
| PR 리뷰 때 채팅 로그를 다시 찾아야 함 | PR과 보고서만 봐도 변경 이유와 검증 근거를 확인 가능 |

### 적용하면 바로 달라지는 것

1. **AI가 마음대로 코드를 고치지 않습니다.** 소스 수정 전 계획서와 승인 게이트를 거칩니다.
2. **사람이 통제권을 잃지 않습니다.** AI는 실행하지만 방향과 품질 결정은 사람이 가집니다.
3. **어디까지 했는지 채팅 기록에서 찾지 않아도 됩니다.** Issue, 오늘할일, 계획서, 보고서, PR이 작업 타임라인을 만듭니다.
4. **채팅이 사라져도 작업 기억은 남습니다.** 의도와 검증 결과가 저장소 산출물로 남습니다.
5. **타스크별 컨텍스트가 작고 선명하게 유지됩니다.** 권장 운용은 `1 Issue = 1 Task = 1 Branch = 1 Session`입니다.
6. **여러 AI 세션을 병렬로 돌릴 수 있습니다.** 독립 Issue는 별도 branch나 worktree에서 진행합니다.
7. **PR 리뷰가 쉬워집니다.** 리뷰어는 채팅 로그가 아니라 저장소 산출물을 보면 됩니다.
8. **큰 구현 뒤 방향 오류를 발견하는 일이 줄어듭니다.** 계획서와 Stage 경계에서 먼저 검토합니다.
9. **바이브 코딩의 속도는 살리고, 엔지니어링 규율은 되찾습니다.**
10. **AI 코딩이 바이브가 아니라 추적 가능한 개발 프로세스가 됩니다.**

## 도입 후 작업 흐름

Hyper-Waterfall은 **타스크** 단위로 작업을 진행합니다.

### 타스크 진행 절차

모든 타스크는 아래 절차를 엄격하게 따릅니다.

```text
1. GitHub Issue 확인 또는 등록
2. 오늘할일 기록
3. 타스크 브랜치 생성
4. 수행계획서 작성 -> 작업지시자 승인
5. 구현계획서 작성 -> 작업지시자 승인
6. 단계별 구현
7. 단계별 완료보고서 -> 작업지시자 승인
8. 다음 단계 반복
9. 최종 결과보고서 -> 작업지시자 승인
10. 오늘할일 상태 갱신
11. publish branch PR 생성
12. PR merge 후 이슈와 브랜치 정리
```

| 산출물 | 기본 위치 |
|---|---|
| 오늘할일 | `mydocs/orders/yyyymmdd.md` |
| 수행계획서 | `mydocs/plans/task_{milestone}_{N}.md` |
| 구현계획서 | `mydocs/plans/task_{milestone}_{N}_impl.md` |
| 단계 보고서 | `mydocs/working/task_{milestone}_{N}_stage{S}.md` |
| 최종 보고서 | `mydocs/report/task_{milestone}_{N}_report.md` |
| Open PR | `publish/task{N}` -> base branch |

> 각 승인 지점이 품질 게이트입니다. 코드 리뷰만으로는 잡기 어려운 방향성 오류를 문서 리뷰에서 먼저 잡습니다.

세부 절차는 [타스크 진행 절차 매뉴얼](templates/mydocs/manual/task_workflow_guide.md#타스크-진행-절차)을 기준으로 합니다. 브랜치와 PR 게시 흐름은 [Git 워크플로우 매뉴얼](templates/mydocs/manual/git_workflow_guide.md#브랜치-관리)에서 확인할 수 있습니다.

### 핵심 SKILL 상세

| SKILL | 사용하는 시점 | 주요 산출물 |
|---|---|---|
| `task-register` | 신규 작업이라 GitHub Issue를 먼저 만들어야 할 때 | GitHub Issue, milestone·label 후보와 선택 이유 |
| `task-start` | 승인된 이슈 작업을 시작할 때 | `local/task{N}` branch, 오늘할일 행, 수행계획서 |
| `task-stage-report` | 한 Stage 구현이 끝나고 다음 단계로 넘어가기 직전 | 단계 보고서, 단계 묶음 커밋, 단계 검증 결과 |
| `task-final-report` | 모든 Stage가 끝나고 PR을 게시하기 직전 | 최종 보고서, 오늘할일 완료 처리, Open PR |
| `pr-merge-cleanup` | PR이 실제로 merge된 직후 | 이슈 close, `publish/task{N}` 원격 삭제, 로컬 branch/worktree 정리 |
| `external-pr-review` | 외부 기여자 PR을 검토할 때 | `mydocs/pr/` 검토 문서, 검증 결과, 권고 |
| `todo` | 오늘할일 보드를 새로 만들거나 갱신할 때 | `mydocs/orders/yyyymmdd.md` 표 형식 갱신 |

각 SKILL을 언제 사용자에게 표시하는지는 [SKILL 호출 표시 안내](templates/mydocs/manual/task_workflow_guide.md#skill-호출-표시-안내)를 따릅니다. PR 본문 작성과 검증 구조는 [내부 task PR 작성 가이드](templates/mydocs/manual/internal_pr_guide.md)를 기준으로 하고, PR 생성 명령과 문서 링크 형식은 [PR 생성 명령과 링크 가이드](templates/mydocs/manual/pr_command_guide.md)를 따릅니다.

문서 구조와 manual 문서 중립성 기준은 별도 SKILL이 아니라 [문서 구조 매뉴얼](templates/mydocs/manual/document_structure_guide.md)을 기준으로 확인합니다.

### 타스크 사이클

이슈가 이미 있으면 `task-register`를 건너뛰고 바로 `task-start`로 수행계획서 작성에 들어갑니다. 예를 들어 작업지시자가 `issue #17 작업을 진행해줘`라고 지시하면 AI는 #17의 milestone과 본문을 확인한 뒤 `local/task17`, 오늘할일, 수행계획서를 만듭니다.

아직 이슈가 없을 때만 `task-register`가 중복 이슈, milestone, label을 확인하고 생성 전 승인을 받은 뒤 GitHub Issue를 만듭니다.

```text
0. 타스크 등록 -> task-register
   - AI: 중복 이슈, milestone, label 후보 확인
   - 작업지시자: 이슈 생성 승인
   - AI: GitHub Issue 생성 후 task-start 진입 승인 요청

1. 수행계획서 -> task-start
   - 작업지시자: 기존 이슈를 지정하거나 방금 생성한 이슈로 시작 승인
   - AI: 계획서 작성
   - 작업지시자: 검토 후 승인 또는 수정 요청

2. 단계별 구현 -> task-stage-report
   - AI: 코드 작성과 테스트
   - AI: 단계 완료 보고서 작성
   - 작업지시자: 검증 후 승인 또는 피드백

3. 피드백 반영
   - 작업지시자: 피드백 제공
   - AI: 피드백 반영
   - scope가 바뀌면 계획서 갱신 후 재승인

4. 최종 보고 + Open PR -> task-final-report
   - AI: 최종 결과 보고서 작성
   - AI: 검증 결과와 근거를 구조화한 Open PR 생성
   - 작업지시자: 검증 후 승인 또는 피드백

5. PR 리뷰 + merge + 정리 -> pr-merge-cleanup
   - 작업지시자: PR 검토 후 승인 또는 피드백
   - AI: merge 확인 후 이슈 close, branch, worktree, 오늘할일 정리
```

`todo`는 위 흐름 어느 단계에서든 오늘할일 보드를 갱신할 때 호출합니다. `external-pr-review`는 외부 기여자 PR 검토용 별도 흐름입니다.

### 문서 구조

타스크가 사용하거나 만들어내는 문서 구조는 다음과 같습니다.

```text
mydocs/
├── _templates/                         산출물별 출력 형식
├── orders/yyyymmdd.md                  오늘할일
├── plans/task_{milestone}_{N}.md       수행계획서
├── plans/task_{milestone}_{N}_impl.md  구현계획서
├── working/task_{milestone}_{N}_stage{S}.md
│                                        단계별 완료 보고서
├── report/task_{milestone}_{N}_report.md
│                                        최종 결과 보고서
├── feedback/                           피드백·리뷰 의견
├── tech/                               기술 조사·공식화 전 초안
├── manual/                             운영 매뉴얼·반복 작업 기준
├── troubleshootings/                   트러블슈팅
└── pr/                                 외부 PR 검토 기록
```

`mydocs/`는 작업 기억, 운영 매뉴얼, 조사 근거를 보관하는 구조이며 대상 프로젝트의 공식 제품 문서 루트가 아닙니다. 제품/사용자/기여자/API/아키텍처/로드맵 문서를 생성·이동·수정하는 task는 수행계획서에서 대상 독자, 공식화 수준, 선택 경로, 대안 경로, 선택 이유를 먼저 승인받습니다.

폴더별 역할은 [문서 구조 매뉴얼의 폴더 역할](templates/mydocs/manual/document_structure_guide.md#폴더-역할-엄격-준수)에서 확인하고, 문서 파일명은 [문서 파일명 규칙](templates/mydocs/manual/document_structure_guide.md#문서-파일명-규칙)을 따릅니다.

## 적용 후 대상 저장소 구조

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

프레임워크의 문서 템플릿, GitHub Issue Form, SKILL 진실 원천은 각각 다음 위치에 있습니다.

| 진실 원천 | 위치 |
|---|---|
| 문서 템플릿 | `templates/mydocs/_templates/` |
| GitHub Issue Form | `templates/.github/ISSUE_TEMPLATE/task.yml` |
| SKILL 본문 | `templates/mydocs/skills/` |

## 유지보수자 세부 정보

<details>
<summary><strong>신규 적용과 기존 업데이트</strong></summary>

신규 적용은 Hyper-Waterfall 운영 파일과 작업 기억 구조를 설치합니다. 대상 프로젝트의 `docs/`, `specs/`, `site/`, `website/`, `adr/` 같은 공식 문서 루트는 자동 생성하지 않습니다.

기존 적용 저장소 업데이트는 GitHub Release/tag와 manifest를 기준으로 수행합니다. AI는 [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)를 진입점으로 삼고, [`docs/lifecycle/update.md`](docs/lifecycle/update.md)의 판단 결과 형식에 따라 현재 version, 목표 release/tag, migration guide, manifest diff, Hyper-Waterfall 버전 업데이트 PR 후보를 먼저 보고합니다.

승인된 업데이트 후보를 PR로 전환할 때는 [`docs/lifecycle/update_pr.md`](docs/lifecycle/update_pr.md)를 따릅니다.

</details>

<details>
<summary><strong>CLI와 배포 채널</strong></summary>

`hyper-waterfall` CLI는 lifecycle 판단을 dry-run으로 확인할 수 있는 실행 채널입니다.

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

## 부록

### Hyper-Waterfall이란?

#### 거시적 워터폴 + 미시적 애자일, AI가 이 둘을 동시에 가능하게 한다

AI가 없던 시대에는 불가능했던 방법론입니다. 워터폴의 규율과 애자일의 속도를 동시에 가져갑니다.

방법론의 배경과 더 긴 설명은 [edwardkim/rhwp · hyper_waterfall.md](https://github.com/edwardkim/rhwp/blob/main/mydocs/manual/hyper_waterfall.md)를 참고할 수 있습니다. 이 README는 대상 저장소에 적용 가능한 일반 하네스 관점으로 설명합니다.

### 핵심 구조

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

- 거시적 방향은 워터폴의 규율로 통제합니다: 계획서, 승인, 단계별 보고, 최종 검증.
- 미시적 실행은 애자일의 빠른 반복으로 수행합니다: AI와 즉각적인 피드백 루프를 돌립니다.
- 모든 작업이 문서화되고, 모든 결정이 기록됩니다.

### 핵심 원칙

> **사람은 절대 생각을 멈추지 않는다.**

AI가 아무리 뛰어나도 방향을 결정하고 품질을 판단하는 것은 사람입니다. AI의 출력을 읽지 않고 수락하는 순간 Hyper-Waterfall은 바이브 코딩으로 전락합니다.

| 원칙 | 운영 규칙 |
|---|---|
| 사람이 방향을 끝까지 가진다 | 단계 전환, 계획 변경, 소스 수정에는 작업지시자의 명시 승인이 필요합니다. |
| AI에게 충분한 맥락을 준다 | 작업의 의도, 범위, 승인 기준을 `mydocs/`에 남겨 모델이 같은 컨텍스트 위에서 작업하게 합니다. |
| AI의 작업 기억을 외부화한다 | Stage 보고서, 최종 보고서, PR 본문에 의도, 결정, 검증 근거를 증류해 기록합니다. |

### 역할 분담

| 역할 | 집중할 일 |
|---|---|
| 작업지시자 | 방향 설정, 우선순위, 품질 판단, 아키텍처 결정, 도메인 지식, 피드백 |
| AI 페어 프로그래머 | 코드베이스 탐색, 원인 추적, 계획 초안, 구현, 테스트, 문서, 반복 수정 |

AI는 결정의 도구이지 결정자가 아닙니다. 사람은 결정에, AI는 실행에 집중합니다.

### 바이브 코딩 vs Hyper-Waterfall

> 바이브 코딩은 AI 출력을 읽지 않고 수락하고, AI에게 아키텍처 결정을 맡기고, 이해하지 못하는 코드를 배포하는 것입니다. 겉보기에는 동작하지만, 문제가 생겼을 때 진단할 수 없는 코드가 만들어집니다.

| | 바이브 코딩 | Hyper-Waterfall |
|---|---|---|
| 사람의 역할 | AI 출력 수락 | 지시, 검토, 결정 |
| 계획 | 없음 | 수행계획서 -> 승인 -> 구현계획서 -> Stage |
| 품질 관문 | 동작하길 바람 | 검증 + 승인 게이트 + PR 리뷰 |
| 디버깅 | AI에게 AI 버그 수정 요청 | 사람이 진단, AI가 구현 |
| 아키텍처 | 우연히 형성 | 작업지시자가 의도적으로 설계 |
| 문서 | 없음 | `mydocs/`, Issue, PR, commit log |
| 재현 가능성 | 낮음 | 전 과정 타임라인 추적 가능 |
| 결과물 | 취약, 유지보수 어려움 | 추적 가능, 인수인계 가능, 어디서든 재개 가능 |

### 왜 강력한가

거시적 워터폴과 미시적 애자일은 오랫동안 trade-off였습니다. 규율을 챙기면 느려졌고, 속도를 챙기면 규율이 빠졌습니다. AI 페어 프로그래머가 등장하면서 이 trade-off가 깨졌습니다.

| 지점 | 설명 |
|---|---|
| 속도는 잃지 않으면서 규율을 회복 | AI가 문서, 계획, 검증 초안을 빠르게 만들고 반복 작업을 처리합니다. **같은 규율, 100배 빠른 속도**가 목표입니다. |
| 지식이 저장소에 외부화 | 결정, 근거, 검증 결과가 `mydocs/`와 PR/Issue에 남아 다음 사람이나 다음 AI 세션이 같은 출발점에서 시작합니다. |
| 사람은 결정에, AI는 실행에 집중 | 사람은 방향, 우선순위, 아키텍처, 품질을 책임지고 AI는 탐색, 구현, 테스트, 문서, 반복을 맡습니다. **AI는 배율기**입니다. |
| 여러 곳에서 이동하며 작업 | 지금 할 일은 `orders/`, 진행 상황은 `working/`, 결정한 방식은 `plans/`에서 찾습니다. |

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
| 충분한 맥락 | `mydocs/`의 계획서, 보고서, 피드백, 기술 조사 | 새 세션도 저장소 문서로 맥락 복원 |
| 출력 형식 제약 | `mydocs/_templates/`, Issue/PR template | 계획, 보고, 검증 결과가 같은 구조로 남음 |
| 단계적 진행 | Stage 단위 구현, 검증, 보고 | 복잡한 작업을 검토 가능한 단위로 분할 |
| 검증 기준 | Stage 보고서, 최종 보고서, PR 본문 | 결과물을 기록된 기준으로 판단 |
| 멈춤 조건 | 승인 게이트 | AI가 임의로 다음 단계로 넘어가지 않음 |
| 장기 작업 기억 | `mydocs/`, commit log, PR timeline | 채팅이 사라져도 작업 이력 유지 |
| 컨텍스트 경량화 | `1 Issue = 1 Task = 1 Branch = 1 Session` | 세션이 작고 선명하게 유지됨 |

<details>
<summary><strong>Prompt guidance와의 대응</strong></summary>

1. 결과물을 먼저 정한다. 작업 시작부터 Issue, 수행계획서, 구현계획서, Stage 보고서, 최종 보고서, PR이라는 산출물을 둡니다.
2. 좋은 답변의 기준을 적는다. 각 Stage는 구현뿐 아니라 검증 기준과 리뷰 포인트를 함께 남깁니다.
3. 제약 조건을 짧게 건다. 승인 없이 다음 단계 진행 금지, 소스 수정 전 승인, Issue 기준 추적 같은 경계를 명시합니다.
4. 필요한 근거 수준을 말한다. 구현 결과는 Stage 보고서, 검증 로그, PR 본문으로 증류됩니다.
5. 출력 형식을 정한다. `mydocs/_templates/`와 `.github/pull_request_template.md`가 expected output shape를 고정합니다.
6. 언제 멈출지도 알려준다. Stage 경계마다 멈추고 사람의 승인을 기다립니다.

</details>

## 라이선스

MIT. 자세한 내용은 [LICENSE](LICENSE)를 참고하세요.
