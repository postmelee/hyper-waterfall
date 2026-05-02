# Hyper-Waterfall

Hyper-Waterfall은 AI 페어 프로그래머와 함께 소프트웨어를 만들 때 인간의 통제권, 추적 가능성, 엔지니어링 규율을 잃지 않도록 해주는 작업 프레임워크입니다. 한 줄 요약은 이렇습니다.

> 거시적 워터폴 + 미시적 애자일, AI가 이 둘을 동시에 가능하게 한다.
>
> — [edwardkim/rhwp · AI 페어 프로그래밍으로 개발합니다](https://github.com/edwardkim/rhwp#ai-%ED%8E%98%EC%96%B4-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9C%BC%EB%A1%9C-%EA%B0%9C%EB%B0%9C%ED%95%A9%EB%8B%88%EB%8B%A4)

이 방법론은 [`edwardkim/rhwp`](https://github.com/edwardkim/rhwp)와 [`postmelee/alhangeul-macos`](https://github.com/postmelee/alhangeul-macos) 같은 실제 프로젝트 경험을 바탕으로 정제되었습니다.

## 바이브 코딩 vs Hyper-Waterfall

> 바이브 코딩 — AI 출력을 읽지 않고 수락하고, AI에게 아키텍처 결정을 맡기고, 이해하지 못하는 코드를 배포하는 것 — 은 함정입니다. 겉보기에는 동작하지만, 이해하지 못했기 때문에 문제가 생겨도 진단할 수 없는 코드가 만들어집니다.
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
| **결과물** | 취약, 유지보수 어려움 | 추적 가능, 인수인계 가능, 어디서든 재개 가능 |

> AI는 배율기입니다. 하지만 배율기는 기존 프로세스를 증폭시킵니다. **프로세스 없음 × AI = 빠른 혼돈. 좋은 프로세스 × AI = 비범한 결과물.**
>
> — [edwardkim/rhwp · 바이브 코딩 vs AI 주도 개발](https://github.com/edwardkim/rhwp#%EB%B0%94%EC%9D%B4%EB%B8%8C-%EC%BD%94%EB%94%A9-vs-ai-%EC%A3%BC%EB%8F%84-%EA%B0%9C%EB%B0%9C)

## 왜 강력한가

AI는 두 가지 구조적 약점을 가집니다.

1. 세션이 길어지거나 도구가 바뀌면 맥락을 잃습니다.
2. 방향이 틀렸는데도 자신 있게 계속 실행할 수 있습니다.

Hyper-Waterfall은 이 약점을 작업 제약으로 바꾸고, 다음 세 축에서 강력함을 만들어냅니다.

### 1. 어디서든 작업을 추적하고 재개할 수 있다 — 운영

작업의 모든 흔적이 GitHub과 저장소에 남고 서로 링크됩니다. Issue에는 라벨·마일스톤·linked PR이 자동 cross-reference되고, PR 본문은 Stage 보고서·commit·계획서·최종 보고서를 commit SHA 고정 URL로 연결합니다. `mydocs/orders/yyyymmdd.md`에는 일일 진행 상태가, `mydocs/plans/`·`mydocs/working/`·`mydocs/report/`에는 단계별 산출물이 시간 순서로 쌓입니다.

결과적으로 **휴대폰의 GitHub 앱에서 이슈와 PR만 열어도 "지금 어디까지 진행됐고 다음 게이트가 무엇인지" 파악할 수 있고**, 데스크톱으로 옮겨와 작업을 이어갈 때도 채팅 히스토리에 의존하지 않고 저장소 산출물만으로 맥락을 복원할 수 있습니다. 새 기여자나 새 AI 세션이 합류해도 같은 출발점에서 시작할 수 있습니다.

### 2. 큰 사고 전, 게이트에서 방향 오류를 발견한다 — 리스크

의미 있는 작업은 `이슈 → 브랜치 → 수행계획서 → 구현계획서 → Stage 단위 구현·검증·보고 → 최종 보고서 → Open PR` 순서를 따르며, 각 게이트에서 작업지시자 승인을 받습니다. 큰 구현이 끝난 뒤에 "방향이 틀렸음"을 깨닫는 대신, **수행계획서·구현계획서·각 Stage 경계에서 일찍 잡히므로 매몰 비용이 작습니다.** 단계 검증이 실패하면 그 단계 안에서 회복하고, scope가 바뀌면 계획서를 갱신해 재승인을 받습니다.

### 3. 인간이 통제권을 유지하면서 AI의 속도를 활용한다 — 역할 분담

작업지시자는 **방향, 우선순위, 아키텍처, 품질 결정의 책임을 끝까지 가지고**, AI는 탐색·초안 작성·구현·테스트·보고서 작성·PR 본문 작성 같은 고반복 작업을 맡습니다. 어떤 SKILL도 묵시적으로 발동되지 않으며(`allow_implicit_invocation: false`), 모든 단계 전환은 작업지시자의 명시 승인 또는 SKILL 호출로만 일어납니다.

## 새 저장소에 빠르게 적용하기

AI 코딩 도구에 다음 한 줄을 보내주세요.

```text
https://github.com/postmelee/hyper-waterfall 의 하이퍼-워터폴 방법론을 이 저장소에 적용해줘.
```

AI는 [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)부터 읽어 적용 절차를 따릅니다. 소스 변경 전 반드시 작업지시자 승인을 받게 되어 있습니다.

## 도입 후 작업 흐름

### SKILL 호출 순서

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

`todo`는 위 흐름 어느 단계에서든 오늘할일 보드를 갱신할 때 호출합니다. `external-pr-review`는 외부 기여자 PR 검토용 별도 흐름입니다.

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

모든 SKILL은 `allow_implicit_invocation: false`로 명시 호출만 허용합니다. 진실 원천은 `templates/mydocs/skills/`이고 적용 저장소에서는 `.agents/skills`와 `.claude/skills` 심볼릭 링크가 같은 본문을 가리킵니다.

## 적용 후 대상 저장소 구조

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

## 살아있는 예시 — 직접 따라가보기

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

## 설계 원칙

- 의미 있는 소스 변경에는 인간 승인 게이트가 필요합니다.
- 이슈 진행 추적은 GitHub의 linked PR 자동 cross-reference와 라벨/마일스톤에 위임하고, 댓글은 토론·블로커·결정 기록 용도로만 둡니다.
- 최신 상태는 이슈 metadata, 현재 branch 또는 PR, `mydocs/`에서 찾을 수 있어야 합니다.
- 이 프레임워크는 다양한 프로젝트 유형에서 동작해야 합니다. 특정 언어, 빌드, 배포, 제품 규칙은 core가 아니라 대상 저장소의 템플릿과 설정에 둡니다.
- 프로세스에는 엄격하고, 도구에는 유연해야 합니다.

## 라이선스

MIT. 자세한 내용은 [LICENSE](LICENSE)를 참고하세요.
