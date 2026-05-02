# Hyper-Waterfall

Hyper-Waterfall은 AI 페어 프로그래머와 함께 소프트웨어를 만들 때 인간의 통제권, 추적 가능성, 엔지니어링 규율을 잃지 않도록 해주는 작업 프레임워크입니다.

이 방법론은 [`edwardkim/rhwp`](https://github.com/edwardkim/rhwp)와 [`postmelee/alhangeul-macos`](https://github.com/postmelee/alhangeul-macos) 같은 실제 프로젝트 경험을 바탕으로 정제되었습니다. 핵심 교훈은 단순합니다. AI는 명시적인 규율이 있을 때만 소프트웨어 개발을 더 빠르게 만듭니다. 프로세스가 없으면 AI는 모호함, 숨겨진 의사결정, 검토되지 않은 코드를 더 빠르게 늘릴 뿐입니다.

Hyper-Waterfall은 폭포수 방식과 애자일 방식의 장점을 동시에 취합니다.

| 기준 | 전통적 폭포수 | 애자일 | 바이브 코딩 | Hyper-Waterfall |
|---|---|---|---|---|
| 계획 | 무겁고 느림 | 가벼움 | 대개 없음 | AI가 초안을 만들고 인간이 승인 |
| 실행 | 긴 단계 단위 | 반복 스프린트 | 즉시 생성 | 작은 Stage 단위 구현 루프 |
| 문서화 | 비용이 큼 | 자주 생략됨 | 거의 없음 | AI가 생성하고 인간이 검토 |
| 통제권 | 프로세스 중심 | 팀 역량 의존 | AI 주도 | 인간 주도 |
| 인수인계 | 형식적이지만 낡기 쉬움 | 구두 의존 | 어려움 | Issue, branch, docs, comments, PR에 기록 |

이 방법론의 목적은 문서를 많이 쓰는 것이 아닙니다. 목표, 결정, 근거, 현재 상태를 AI 채팅창 밖의 저장소 아티팩트로 남겨서 다음 작업자가 기억이 아니라 사실을 보고 이어갈 수 있게 만드는 것입니다.

## 왜 강력한가

AI를 소프트웨어 작업에 투입할 때 반복적으로 나타나는 구조적 약점이 있습니다.

1. 세션이 길어지거나 도구가 바뀌면 맥락을 잃습니다.
2. 방향이 틀렸는데도 자신 있게 계속 실행할 수 있습니다.

Hyper-Waterfall은 이 약점을 작업 제약으로 바꿉니다. 의미 있는 작업은 Issue, branch, 계획 문서, Stage 리포트, 검증 근거, 최종 리포트, PR을 거칩니다. 각 게이트는 빠르게 통과할 수 있을 만큼 작지만, 사람이 중단하거나 방향을 바꾸거나 다른 사람에게 넘길 수 있을 만큼 명시적입니다.

그 결과 팀은 다음 이점을 얻습니다.

- 인간이 방향, 우선순위, 아키텍처, 품질 판단을 계속 책임집니다.
- AI는 탐색, 초안 작성, 구현, 테스트, 리포트, PR 설명 같은 고반복 작업을 맡습니다.
- 새 기여자나 새 AI 세션이 저장소 안의 기록만으로 작업 맥락을 복원할 수 있습니다.
- 큰 구현이 끝난 뒤가 아니라 계획 또는 Stage 경계에서 방향 오류를 발견할 수 있습니다.
- 프로젝트 지식이 채팅 히스토리가 아니라 `mydocs/`에 축적됩니다.

## 새 저장소에 빠르게 적용하기

AI 코딩 도구에 이 저장소 링크를 넣고 다음처럼 요청합니다.

```text
https://github.com/postmelee/hyper-waterfall 의 하이퍼-워터폴 방법론을 이 저장소에 적용해줘.
docs/agent-entrypoint.md 부터 읽어.
```

AI는 다음 순서로 진행합니다.

1. `templates/AGENTS.md`, `templates/CLAUDE.md`를 대상 저장소 루트에 복사합니다.
2. `templates/.github/pull_request_template.md`를 대상 저장소의 `.github/`로 복사합니다.
3. `templates/mydocs/` 전체를 대상 저장소의 `mydocs/`로 복사합니다.
4. `.agents/skills`와 `.claude/skills`를 각각 `../mydocs/skills`로 가리키는 심볼릭 링크로 만듭니다.
5. placeholder(`{REPO_SLUG}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`, `{PR_TEMPLATE_PATH}` 등)를 대상 프로젝트 값으로 치환합니다.
6. 변경 후 `git diff`로 결과를 확인하고 작업지시자에게 보고합니다.

소스 코드 변경 전 반드시 작업지시자 승인을 받아야 합니다. 자세한 진입 절차는 [`docs/agent-entrypoint.md`](docs/agent-entrypoint.md)를 참고하세요.

## 도입 후 작업 흐름

작업지시자(사람)와 AI 페어 프로그래머는 단계마다 역할을 명확히 나눕니다.

```
작업지시자 (사람)                    AI 페어 프로그래머
────────────────                    ─────────────────────────────
방향 설정, 우선순위 결정        →    분석, 계획, 구현
계획 검토, 승인                ←    수행계획서, 구현계획서 작성
도메인 피드백 제공              →    디버깅, 테스트, 반복
아키텍처 결정                  →    정밀하게 실행
품질 및 정확성 판단            ←    코드, 문서, 테스트 생성
이슈 close, merge 결정          →    PR 생성, 정리
```

작업은 다음 사용자 흐름을 따라 진행되고, 각 단계마다 발동되는 SKILL이 정해져 있습니다. 작업지시자의 승인 없이 다음 단계로 넘어가지 않는 것이 하이퍼-워터폴의 핵심 게이트입니다.

| 단계 | 작업지시자 행동 | AI 행동 | 발동 SKILL |
|---|---|---|---|
| 0. 작업 정의 | 작업 의도 설명 | 이슈가 없으면 등록, 있으면 그대로 다음 단계 진입 | 신규 이슈: `task-register` |
| 1. 작업 시작 | 이슈 번호 지정, 시작 승인 | 브랜치 생성, 오늘할일 추가, 수행계획서 템플릿 작성, 이슈 추적 댓글 등록 | `task-start` + `issue-checkpoint` + `todo` |
| 2. 수행계획 승인 | 수행계획서 검토, 승인 | 구현계획서로 단계 분할 | (수동) |
| 3. 단계 구현 | 도메인 피드백 제공 | 단계별 구현, 검증 | (수동, 단계마다 검증) |
| 4. 단계 종료 | 단계 보고서 검토, 다음 단계 승인 | 단계 보고서 작성, 단계 묶음 커밋, 이슈 체크포인트 댓글 | `task-stage-report` + `issue-checkpoint` + `todo` |
| 5. 최종 보고 | 최종 보고서 검토, PR 생성 승인 | 최종 보고서 작성, Open PR 생성 | `task-final-report` + `issue-checkpoint` + `todo` |
| 6. 리뷰 & merge | 리뷰, merge 결정 | PR 본문 보강, 검증 결과 반영 | (수동) |
| 7. merge 후 정리 | 정리 승인 | 이슈 close, 브랜치 정리, 오늘할일 마감 | `pr-merge-cleanup` + `issue-checkpoint` + `todo` |
| 별도. 외부 PR 검토 | 외부 PR 검토 요청 | 검토 문서 작성, 검증, 리뷰 응답 | `external-pr-review` |

## 저장소 구조

저장소 구조는 두 관점에서 봅니다. **(1) 적용 후 대상 저장소 구조** — 사용자가 자신의 프로젝트에 적용한 결과. **(2) 본 저장소(자기 적용 후) 구조** — 프레임워크 보관 + 자기 적용 dogfooding이 함께 있는 모습.

### (1) 적용 후 대상 저장소 구조

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

### (2) 본 저장소(자기 적용 후) 구조

이 저장소는 위 (1) 구조에 더해, 프레임워크 진실 원천인 `templates/`와 외부 진입 문서 `docs/`를 함께 보관합니다. 매뉴얼·SKILL은 한 번만 작성해 모든 곳에서 같은 본문을 보도록, 자기 적용 쪽 `mydocs/manual`과 `mydocs/skills`를 `templates/mydocs/`로 가는 심볼릭 링크로 둡니다.

```text
hyper-waterfall/
├── README.md, LICENSE
├── AGENTS.md, CLAUDE.md            (자기 적용 — placeholder 치환된 사본)
├── .github/pull_request_template.md (자기 적용)
├── .agents/skills  -> ../mydocs/skills        (사용자 적용 저장소와 동일 패턴)
├── .claude/skills  -> ../mydocs/skills
├── docs/
│   └── agent-entrypoint.md         외부 저장소 적용 진입 문서
├── templates/                      ─── 진실 원천 (대상 저장소에 복사할 파일)
│   ├── AGENTS.md, CLAUDE.md        placeholder 보존본
│   ├── .github/pull_request_template.md
│   └── mydocs/
│       ├── manual/                 매뉴얼 진실 원천
│       └── skills/                 SKILL 진실 원천
└── mydocs/                         ─── 자기 적용 산출물
    ├── manual  -> ../templates/mydocs/manual    (심볼릭 링크)
    ├── skills  -> ../templates/mydocs/skills    (심볼릭 링크)
    └── orders/, plans/, working/, report/, feedback/, tech/, troubleshootings/, pr/
```

본 저장소에서 매뉴얼이나 SKILL을 수정할 때는 `templates/mydocs/manual/` 또는 `templates/mydocs/skills/`를 직접 수정합니다. `mydocs/manual`과 `mydocs/skills`는 심볼릭 링크라 같은 본문을 즉시 가리키므로 사본 동기화 작업이 필요하지 않습니다.

## 핵심 SKILL

| SKILL | 사용하는 시점 | 주요 산출물 |
|---|---|---|
| `task-register` | 신규 작업이라 GitHub Issue를 먼저 만들어야 할 때 | 범위·라벨·마일스톤·담당자가 채워진 GitHub Issue |
| `issue-checkpoint` | 작업 진행 상태를 이슈 댓글로 추적할 때 | 추적 댓글(현재 상태) + 이벤트별 체크포인트 댓글 |
| `task-start` | 승인된 이슈 작업을 시작할 때 | `local/task{N}` 브랜치, 오늘할일 행, 수행계획서 템플릿 |
| `task-stage-report` | 한 Stage 구현이 끝나고 다음 단계로 넘어가기 직전 | 단계 보고서, 단계 묶음 커밋, 단계 검증 결과 |
| `task-final-report` | 모든 Stage가 끝나고 PR을 게시하기 직전 | 최종 보고서, 오늘할일 완료 처리, Open PR |
| `pr-merge-cleanup` | PR이 실제로 merge된 직후 | 이슈 close, `publish/task{N}` 원격 삭제, 로컬 브랜치/worktree 정리 |
| `external-pr-review` | 외부 기여자 PR을 검토할 때 | `mydocs/pr/` 검토 문서, 검증 결과, 권고(merge/수정/닫기) |
| `todo` | 오늘할일 보드를 새로 만들거나 갱신할 때 | `mydocs/orders/yyyymmdd.md` 표 형식 갱신 |

모든 SKILL은 `allow_implicit_invocation: false`로 명시 호출만 허용합니다. 진실 원천은 `templates/mydocs/skills/`이고 적용 저장소에서는 `.agents/skills`와 `.claude/skills` 심볼릭 링크가 같은 본문을 가리킵니다.

## 설계 원칙

- 의미 있는 소스 변경에는 인간 승인 게이트가 필요합니다.
- Issue 댓글은 진행 상황 공유에 유용하지만, 오래 남는 기준 기록은 커밋된 문서와 PR입니다.
- 최신 상태는 Issue metadata, tracking comment, 현재 branch 또는 PR, `mydocs/`에서 찾을 수 있어야 합니다.
- 이 프레임워크는 다양한 프로젝트 유형에서 동작해야 합니다. 특정 언어, 빌드, 배포, 제품 규칙은 core가 아니라 대상 저장소의 템플릿과 설정에 둡니다.
- 프로세스에는 엄격하고, 도구에는 유연해야 합니다.

## 라이선스

MIT. 자세한 내용은 [LICENSE](LICENSE)를 참고하세요.
