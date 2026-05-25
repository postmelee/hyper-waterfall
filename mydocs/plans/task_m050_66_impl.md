# Task M050 #66 구현 계획서

수행계획서: [`task_m050_66.md`](task_m050_66.md)
GitHub Issue: [#66](https://github.com/postmelee/hyper-waterfall/issues/66)
마일스톤: M050

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 한국어 README 구조 재정렬 | `README.ko.md`, `mydocs/working/task_m050_66_stage1.md` | 기존 한국어 핵심 내용 보존, 중복 축소, appendix 구조 확인 |
| 1.1 | 한국어 README 설득력 보강 | `README.ko.md`, `mydocs/working/task_m050_66_stage1_1.md` | 원문 방법론 표현, 저장소 가치 제안, 10개 체감 효과 보강 확인 |
| 1.2 | 한국어 README Markdown 가독성 개선 | `README.ko.md`, `mydocs/working/task_m050_66_stage1_2.md` | GitHub alert, table, details, list 가독성 확인 |
| 2 | 영어 기본 README 전환 | `README.md`, `mydocs/working/task_m050_66_stage2.md` | 영어 기본 진입 문서, 언어 링크, 적용 프롬프트 확인 |
| 3 | 중국어 간체 README 작성 | `README.zh-CN.md`, `mydocs/working/task_m050_66_stage3.md` | 중국어 간체 진입 문서, 구조적 계약 보존 확인 |
| 4 | 링크와 진입 프롬프트 정합성 검증 | 필요 시 `docs/agent-entrypoint.md`, `mydocs/working/task_m050_66_stage4.md` | 세 README의 링크, heading, #65 locale 정책 정합성 확인 |

## 문서 위치 확인

수행계획서의 "문서 위치 판단"과 실제 Stage 산출물 경로는 아래처럼 일치한다.

| 파일 | 수행계획서상 선택 위치 | Stage 산출물 경로 | 일치 여부 | 비고 |
|---|---|---|---|---|
| `README.md` | 루트 `README.md` | Stage 2 산출물 | OK | 기본 locale `en` 사용자 진입 문서 |
| `README.ko.md` | 루트 `README.ko.md` | Stage 1 산출물 | OK | 기존 한국어 원문 보존과 재구성 |
| `README.zh-CN.md` | 루트 `README.zh-CN.md` | Stage 3 산출물 | OK | 중국어 간체 사용자 진입 문서 |
| `docs/agent-entrypoint.md` | 필요 시 최소 수정 | Stage 4에서 필요 여부 판단 | OK | locale 선택 workflow 구현은 #70 범위로 유지 |
| `mydocs/working/task_m050_66_stage{N}.md` | `mydocs/working/` | 각 Stage 완료 보고서 | OK | 단계별 산출물, 검증, 잔여 위험 기록 |

## 공통 README 구조

세 README는 같은 상위 섹션 순서를 공유한다.

1. 언어 링크
2. What: Hyper-Waterfall이 무엇인지 짧은 설명
3. Quick Start: 적용 프롬프트 1개와 AI가 먼저 보고할 항목 3개
4. When to Use: 적합한 경우와 과한 경우
5. Why This Repo: 지식 자산화, 리스크 제어, 역할 분담, 컨텍스트 경량화
6. What Changes: Issue, plan, Stage report, final report, PR 흐름 요약
7. Generated Structure: 적용 후 대상 저장소에 생기는 핵심 파일 축약 tree
8. Maintainer Details: lifecycle, update, CLI, Homebrew, plugin 관련 상세 링크와 접힘 섹션
9. Appendix: Philosophy, Prompt Guide, Dogfooding
10. License

위 목록은 정보 구조 이름이다. 실제 heading은 각 README의 언어에 맞게 자연스럽게 번역하되, 세 문서가 같은 순서와 의미를 유지해야 한다.

구조적 계약인 `Issue`, `PR`, `branch`, `local/task{N}`, `publish/task{N}`, `mydocs/`, placeholder, 명령어, 파일명 패턴은 번역하지 않는다.

## Stage 1 — 한국어 README 구조 재정렬

### 산출물

신규:

- `README.ko.md`
- `mydocs/working/task_m050_66_stage1.md`

수정:

- `mydocs/orders/20260525.md`

### 변경 내용

- 현재 `README.md`의 한국어 내용을 기준으로 `README.ko.md`를 작성한다.
- 사용자와 합의한 적용자 중심 구조로 재배치한다.
- `바로 적용하기`와 `새 저장소에 빠르게 적용하기`의 중복을 제거하고 Quick Start 하나로 합친다.
- 가치 제안 반복을 줄이고 `When to Use`, `What Changes`로 압축한다.
- `타스크 진행 절차`와 `타스크 사이클`의 중복을 README에서는 요약 흐름으로 정리하고 상세는 manual 링크로 넘긴다.
- `Philosophy / Prompt Guide / Dogfooding`은 appendix로 이동한다.
- 프롬프트 가이드 상세는 삭제하지 않고 `<details>`로 유지하되, 모델명처럼 시간에 취약한 표현은 가능하면 모델 중립 표현으로 바꾼다.

### 검증

```bash
rg -n "English|한국어|简体中文|빠른 시작|언제 쓰면 좋은가|무엇이 바뀌나|적용 후 구조|유지보수자|부록" README.ko.md
rg -n "https://github.com/postmelee/hyper-waterfall 의 하이퍼-워터폴 방법론을 이 저장소에 적용해줘|docs/agent-entrypoint.md|Issue|PR|mydocs|task-start|task-final-report|pr-merge-cleanup" README.ko.md
git diff --check
```

수동 확인:

- 기존 한국어 README의 핵심 메시지, dogfooding 링크, 적용 프롬프트, 운영 흐름이 보존됐는지 확인한다.
- 세부 lifecycle·배포 채널 설명이 Quick Start를 방해하지 않는 위치로 이동했는지 확인한다.
- `바로 적용하기`와 `새 저장소에 빠르게 적용하기` 같은 중복 heading이 남지 않았는지 확인한다.
- `GPT-5.5`, `Claude Opus 4.7`처럼 시간에 취약한 모델명 중심 표현이 남지 않았는지 확인한다.

### 커밋

```text
Task #66 Stage 1: 한국어 README 구조 재정렬
```

## Stage 1.1 — 한국어 README 설득력 보강

### 산출물

신규:

- `mydocs/working/task_m050_66_stage1_1.md`

수정:

- `README.ko.md`
- `mydocs/plans/task_m050_66_impl.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- Stage 1 검토 피드백에 따라 기존 한국어 README의 설득력 있는 원문 표현을 보강한다.
- 상단 소개에 "거시적 워터폴 + 미시적 애자일" 메시지를 복원한다.
- `왜 이 저장소를 써야 하는가`를 별도 섹션으로 되살려 지식 자산화, 방향 오류 조기 발견, 자동화된 역할 분담, 세션 경량화를 설명한다.
- `무엇이 바뀌나` 표는 유지하고, 그 아래 `적용하면 바로 달라지는 것` 10개 리스트를 짧게 복원한다.
- 부록의 방법론 설명에는 원저자 표현에 가까운 `Hyper-Waterfall이란?`, 핵심 원칙, 바이브 코딩 비교, "AI 없이는 닿을 수 없는 지점"을 보강한다.

### 검증

```bash
rg -n "왜 이 저장소를 써야 하는가|작업 이력이 다음 작업의 프롬프트|AI가 잘할 수밖에|적용하면 바로 달라지는 것|사람은 절대 생각을 멈추지 않는다|같은 규율, 100배 빠른 속도|AI는 배율기" README.ko.md
rg -n "English|한국어|简体中文|빠른 시작|언제 쓰면 좋은가|왜 이 저장소를 써야 하는가|무엇이 바뀌나|적용 후 구조|유지보수자|부록" README.ko.md
git diff --check
```

수동 확인:

- `무엇이 바뀌나` 표가 유지됐는지 확인한다.
- 10개 체감 효과가 원본 의미를 유지하되 README 상단 흐름을 과도하게 늘리지 않는지 확인한다.
- `왜 이 저장소를 써야 하는가`가 사용자 관점의 도입 이유를 충분히 설명하는지 확인한다.
- 원저자 방법론 표현이 부록에서 충분히 보존됐는지 확인한다.

### 커밋

```text
Task #66 [Stage 1.1]: 한국어 README 설득력 보강
```

## Stage 1.2 — 한국어 README Markdown 가독성 개선

### 산출물

신규:

- `mydocs/working/task_m050_66_stage1_2.md`

수정:

- `README.ko.md`
- `mydocs/plans/task_m050_66_impl.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- GitHub README에서 지원하는 Markdown 요소를 활용해 Stage 1.1 본문을 더 쉽게 훑어볼 수 있게 한다.
- 상단 핵심 메시지와 Quick Start 승인 조건에 GitHub alert를 추가한다.
- `왜 이 저장소를 써야 하는가`는 핵심 네 축을 표로 먼저 보여주고, 긴 설명은 `<details>`로 접는다.
- `적용하면 바로 달라지는 것` 10개 항목은 의미를 유지하되 줄바꿈과 들여쓰기로 밀도를 낮춘다.
- 부록의 핵심 원칙과 "왜 강력한가" 설명은 표로 재배치해 스캔 가능성을 높인다.

### 검증

```bash
rg -n "\\[!NOTE\\]|\\[!IMPORTANT\\]|<details>|</details>|\\| 축 \\||\\| 원칙 \\||\\| 지점 \\|" README.ko.md
rg -n "English|한국어|简体中文|빠른 시작|언제 쓰면 좋은가|왜 이 저장소를 써야 하는가|무엇이 바뀌나|적용 후 구조|유지보수자|부록" README.ko.md
git diff --check
```

수동 확인:

- GitHub alert가 적용 흐름을 방해하지 않고 핵심 조건을 강조하는지 확인한다.
- `왜 이 저장소를 써야 하는가`가 표만 읽어도 가치 제안을 이해할 수 있는지 확인한다.
- `<details>` 안의 상세 설명이 기존 의미를 잃지 않았는지 확인한다.
- 10개 체감 효과가 번호 목록으로 유지됐는지 확인한다.

### 커밋

```text
Task #66 [Stage 1.2]: 한국어 README Markdown 가독성 개선
```

## Stage 2 — 영어 기본 README 전환

### 산출물

신규:

- `mydocs/working/task_m050_66_stage2.md`

수정:

- `README.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- `README.ko.md`의 상위 구조를 기준으로 루트 `README.md`를 영어 기본 문서로 전환한다.
- 상단에 `English | 한국어 | 简体中文` 언어 링크를 추가한다.
- 영어 사용자가 그대로 복사할 적용 프롬프트를 제공한다.
- 첫 화면에서 What, Quick Start, When to Use를 빠르게 읽을 수 있게 한다.
- Maintainer Details와 Appendix는 하단으로 내려 적용자 첫 흐름을 방해하지 않게 한다.
- OpenAI/Anthropic prompt guide 참조는 모델 중립 표현으로 둔다.

### 검증

```bash
rg -n "English|한국어|简体中文|Quick Start|When to Use|What Changes|Generated Structure|Maintainer Details|Appendix" README.md README.ko.md
rg -n "Apply the Hyper-Waterfall methodology|docs/agent-entrypoint.md|Issue|PR|mydocs|README\\.ko\\.md|README\\.zh-CN\\.md" README.md
rg -n "^# " README.md README.ko.md
git diff --check
```

수동 확인:

- 루트 `README.md`가 영어 기본 문서로 단독 진입 가능한지 확인한다.
- `README.ko.md`와 섹션 순서가 크게 어긋나지 않는지 확인한다.
- 두 번째 H1인 `# postmelee/hyper-waterfall` 같은 outline 깨짐이 남지 않았는지 확인한다.
- 시간에 취약한 모델명 중심 표현이 남지 않았는지 확인한다.

### 커밋

```text
Task #66 Stage 2: 영어 기본 README 전환
```

## Stage 3 — 중국어 간체 README 작성

### 산출물

신규:

- `README.zh-CN.md`
- `mydocs/working/task_m050_66_stage3.md`

수정:

- `mydocs/orders/20260525.md`

### 변경 내용

- `README.md`와 `README.ko.md`를 기준으로 `README.zh-CN.md`를 작성한다.
- 상단 언어 링크를 `English | 한국어 | 简体中文` 형식으로 맞춘다.
- 중국어 간체 사용자가 바로 복사할 적용 프롬프트를 제공한다.
- 승인 게이트, Issue 추적, Stage 보고, PR 흐름의 의미를 영어/한국어 문서와 맞춘다.
- `Issue`, `PR`, `branch`, `milestone`, `local/task{N}`, `publish/task{N}`, 파일명, 명령어, placeholder는 구조적 계약으로 보존한다.

### 검증

```bash
rg -n "简体中文|English|한국어|快速开始|适用场景|会发生什么变化|生成的结构|维护者|附录" README.zh-CN.md
rg -n "docs/agent-entrypoint.md|Issue|PR|mydocs|local/task\\{N\\}|publish/task\\{N\\}" README.zh-CN.md
rg -n "^# " README.md README.ko.md README.zh-CN.md
git diff --check
```

수동 확인:

- 중국어 간체 문장이 절차 의미를 바꾸지 않는지 확인한다.
- 구조적 계약이 번역되거나 실제 값으로 치환되지 않았는지 확인한다.
- placeholder, 명령어, 파일명 패턴이 등장하는 경우 #65 정책대로 번역하거나 치환하지 않았는지 확인한다.

### 커밋

```text
Task #66 Stage 3: 중국어 간체 README 작성
```

## Stage 4 — 링크와 진입 프롬프트 정합성 검증

### 산출물

신규:

- `mydocs/working/task_m050_66_stage4.md`

수정:

- 필요 시 `README.md`
- 필요 시 `README.ko.md`
- 필요 시 `README.zh-CN.md`
- 필요 시 `docs/agent-entrypoint.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- 세 README의 언어 링크와 내부 heading을 점검한다.
- 각 README의 적용 프롬프트가 해당 언어 사용자에게 자연스럽고, agent가 `docs/agent-entrypoint.md`로 진입하게 하는지 확인한다.
- `docs/agent-entrypoint.md`에 README 언어 진입 안내가 꼭 필요하면 최소 링크만 추가한다.
- #65 `docs/localization.md` 정책과 충돌하는 표현을 수정한다.
- #70 범위인 locale 선택 저장 위치, update 시 기존 locale 보존 로직, CLI locale option 구현은 이번 Stage에서 하지 않는다.

### 검증

```bash
rg -n "README\\.ko|README\\.zh-CN|English|한국어|简体中文|docs/agent-entrypoint|locale|language" README.md README.ko.md README.zh-CN.md docs/agent-entrypoint.md docs/localization.md
rg -n "Quick Start|When to Use|What Changes|Generated Structure|Maintainer Details|Appendix|License" README.md
rg -n "빠른 시작|언제 쓰면 좋은가|무엇이 바뀌나|적용 후 구조|유지보수자|부록|라이선스" README.ko.md
rg -n "快速开始|适用场景|会发生什么变化|生成的结构|维护者|附录|许可证" README.zh-CN.md
rg -n "README\\.ko\\.md|README\\.zh-CN\\.md|Apply the Hyper-Waterfall methodology|하이퍼-워터폴 방법론|Hyper-Waterfall 方法论" README.md README.ko.md README.zh-CN.md
rg -n "^# " README.md README.ko.md README.zh-CN.md
git diff --check
```

수동 확인:

- README 내부 링크와 주요 heading을 GitHub anchor 기준으로 검토한다.
- 세 README가 같은 정보 구조를 유지하면서 각 언어별 적용 프롬프트를 제공하는지 확인한다.
- `docs/agent-entrypoint.md` 수정이 있었다면 lifecycle 기준을 재정의하지 않았는지 확인한다.

### 커밋

```text
Task #66 Stage 4: README 링크와 진입 프롬프트 정합성 검증
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- Stage별 완료 보고서는 해당 단계 산출물과 같은 커밋에 포함한다.
- `README.md`는 영어 기본 문서로 동작해야 한다.
- `README.ko.md`와 `README.zh-CN.md`는 루트 README 언어 링크로 접근 가능해야 한다.
- 기존 한국어 README의 핵심 내용은 `README.ko.md`에 보존되어야 한다.
- placeholder, branch, filename, command는 번역하거나 치환하지 않는다.
- template locale pack, manifest/update 구현, CLI locale 선택 기능은 이번 task에서 구현하지 않는다.
- PR 준비 전 `git status --short`는 빈 출력이어야 한다.

## 커밋

- 구현계획서 자체는 별도 커밋 `Task #66: 구현계획서 작성`으로 남긴다.
- 단계 커밋은 해당 단계 산출물과 `mydocs/working/task_m050_66_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #66 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서와 오늘할일 완료 처리는 모든 Stage 승인 뒤 `task-final-report` 절차에서 별도 정리한다.

## 단계 의존성

- Stage 1은 기존 한국어 README의 핵심 내용을 `README.ko.md`로 먼저 보존한다.
- Stage 2는 Stage 1에서 확정한 구조를 기준으로 루트 `README.md`를 영어 기본 문서로 전환한다.
- Stage 3은 Stage 2 영어 기본 문서와 Stage 1 한국어 문서를 함께 참조해 중국어 간체 문서를 작성한다.
- Stage 4는 세 README가 모두 존재한 뒤 링크와 진입 프롬프트를 최종 검증한다.

## 위험과 대응

- **한국어 원문 손실**: Stage 1에서 먼저 `README.ko.md`를 만들고, 기존 README의 핵심 섹션을 appendix나 링크로 보존한다.
- **영어 README가 지나치게 직역되는 문제**: 한국어 문장을 기계적으로 옮기지 않고 적용자 관점의 영어 문서로 재작성한다.
- **중국어 간체 의미 불일치**: 승인 게이트, Issue 추적, Stage 보고, PR 흐름은 구조적 계약으로 보고 영어/한국어 문서와 대조한다.
- **문서 3개 유지 비용**: 세 README의 상위 섹션 순서와 언어 링크 형식을 통일한다.
- **#67/#70 범위 침범**: locale pack 파일 배치, manifest/update 판단, locale 선택 저장 로직은 후속 이슈로 유지한다.
- **anchor/link 깨짐**: Stage 4에서 heading과 링크를 별도 검증하고 필요한 최소 수정만 한다.

## 승인 요청 사항

- 4개 Stage 구성과 단계별 산출물
- Stage 1에서 `README.ko.md`를 먼저 만들어 기존 한국어 핵심 내용을 보존하는 순서
- Stage 2에서 루트 `README.md`를 영어 기본 문서로 전환하는 방식
- Stage 3에서 `README.zh-CN.md`를 작성하는 방식
- Stage 4에서 `docs/agent-entrypoint.md`는 필요한 경우에만 최소 수정하는 범위
- 각 Stage 검증 명령과 커밋 메시지
