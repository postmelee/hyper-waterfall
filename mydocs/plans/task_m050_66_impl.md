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
| 1.3 | 한국어 README 원본 기반 재정렬 | `README.ko.md`, `mydocs/working/task_m050_66_stage1_3.md` | 상단 흐름 유지, 하네스 설명 상향, task 절차·SKILL·cycle 보존 확인 |
| 1.4 | 한국어 README upstream 하네스 설명 원문 보존 | `README.ko.md`, `mydocs/working/task_m050_66_stage1_4.md` | 부록 유지, upstream `이 저장소가 한 일` 내용 상단 보존, 중복 Quick Start 제거 확인 |
| 1.5 | 한국어 README 문서 구조 정책 복원 | `README.ko.md`, `mydocs/working/task_m050_66_stage1_5.md` | 폴더별 규칙, 공식 문서 루트, manual/tech/_templates, GitHub 플랫폼 경계 복원 확인 |
| 1.6 | 한국어 README draft 기반 전체 재작성 | `README.ko.md`, `mydocs/working/task_m050_66_stage1_6.md` | 바로 설치 상단 배치, 후킹 요약에 공식 프롬프팅 가이드 정합 추가, 부록 구조 유지 확인 |
| 1.7 | 한국어 README 상단 후킹 관점 보정 | `README.ko.md`, `mydocs/working/task_m050_66_stage1_7.md` | 상단 후킹을 사용자 적용 관점으로 보정, 구현 확장 제목 변경 확인 |
| 1.8 | 한국어 README 적용 적합성·표 구조 보강 | `README.ko.md`, `mydocs/working/task_m050_66_stage1_8.md` | When to Use 복원, 문서 구조/적용 후 구조 표 전환, 모델 중립 표현 확인 |
| 1.9 | 업스트림 README 상단 후킹·요약 표 반영 | `README.md`, `mydocs/working/task_m050_66_stage1_9.md` | 최신 `origin/main` 기준 상단 블록만 변경, `## 바로 설치` 이하 유지 확인 |
| 1.10 | 업스트림 README 핵심 섹션 순서 조정 | `README.md`, `mydocs/working/task_m050_66_stage1_10.md` | 최신 `origin/main` 기준 제목/본문 유지, `Hyper-Waterfall의 강점` 위치만 이동 확인 |
| 1.11 | 업스트림 README 최신 수정본 동기화 | `README.md`, `mydocs/working/task_m050_66_stage1_11.md` | 최신 `origin/main`의 길잡이/보강 문장 반영, 이후 Stage 기준본 확인 |
| 2 | 영어 기본 README 전환 | `README.md`, `README.ko.md`, `mydocs/working/task_m050_66_stage2.md` | 영어 기본 진입 문서, 한국어 최신본 보존, 언어 링크, 적용 프롬프트 확인 |
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
3. Hook Summary: 한 줄 적용, 승인 게이트, 작업 기억 외부화, 공식 프롬프팅 가이드 정합, Multi-agent 운영
4. Quick Install: 적용 프롬프트 1개와 AI가 먼저 보고할 항목 3개
5. When to Use: 잘 맞는 경우와 과한 경우
6. What Changes: 기존 AI 코딩 방식과 적용 후 변화
7. Why Hyper-Waterfall: 지식 자산화, 리스크 제어, 역할 분담, 컨텍스트 경량화
8. Implementation Extension: 방법론을 하네스로 만든 방식, 모듈화, 프롬프팅 가이드 정합, Multi-agent 호환
9. Workflow: 타스크 진행 절차, 핵심 SKILL 상세, 타스크 사이클, 문서 구조
10. Generated Structure: 적용 후 대상 저장소에 생기는 핵심 파일 tree
11. Maintainer Details: lifecycle, update, CLI, Homebrew, plugin 관련 상세 링크와 접힘 섹션
12. Appendix: Philosophy, Prompt Guide, Dogfooding
13. License

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

## Stage 1.3 — 한국어 README 원본 기반 재정렬

### 산출물

신규:

- `mydocs/working/task_m050_66_stage1_3.md`

수정:

- `README.ko.md`
- `mydocs/plans/task_m050_66_impl.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- Stage 1.2 결과가 원본 README의 실전 운영감을 충분히 살리지 못했다는 피드백을 반영한다.
- `빠른 시작`, `언제 쓰면 좋은가`, `왜 이 저장소를 써야 하는가`의 상단 흐름은 유지한다.
- `postmelee/hyper-waterfall`이 제공하는 하네스 구성 요소를 상단으로 올린다.
- 특정 원 저장소를 직접 확장했다는 표현은 제거하고, 여러 저장소에 적용 가능한 일반 하네스 관점으로 설명한다.
- 원본 README의 중복을 줄이되 `타스크 진행 절차`, `핵심 SKILL 상세`, `타스크 사이클`, `문서 구조`를 보존한다.
- inline code가 과도하게 이어지는 부분은 표나 code block으로 재배치한다.

### 검증

```bash
rg -n "빠른 시작|언제 쓰면 좋은가|왜 이 저장소를 써야 하는가|이 저장소가 제공하는 것|도입 후 작업 흐름|타스크 진행 절차|핵심 SKILL 상세|타스크 사이클|문서 구조|부록" README.ko.md
rg -n "rhwp에서 처음 도입|다음과 같이 확장" README.ko.md
rg -n "task-register|task-start|task-stage-report|task-final-report|pr-merge-cleanup|external-pr-review|todo" README.ko.md
git diff --check
```

수동 확인:

- `README.ko.md` 상단 흐름이 사용자가 승인한 순서를 유지하는지 확인한다.
- 하네스 구성 설명이 방법론 부록보다 앞에 있는지 확인한다.
- 원본 README의 task 절차, 핵심 SKILL 상세, 타스크 사이클이 삭제되지 않았는지 확인한다.
- 반복되던 lifecycle, CLI, prompt guide 상세가 상단 흐름을 방해하지 않는지 확인한다.

### 커밋

```text
Task #66 [Stage 1.3]: 한국어 README 원본 기반 재정렬
```

## Stage 1.4 — 한국어 README upstream 하네스 설명 원문 보존

### 산출물

신규:

- `mydocs/working/task_m050_66_stage1_4.md`

수정:

- `README.ko.md`
- `mydocs/plans/task_m050_66_impl.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- 현재 부록으로 이동한 방법론 설명은 유지한다.
- upstream README의 `postmelee/hyper-waterfall` 블록 중 `이 저장소가 한 일` 내용을 상단으로 최대한 그대로 옮긴다.
- `이 저장소가 한 일` heading과 일부 비교 표현은 일반 하네스 관점으로 바꾸되, 세 하위 섹션의 핵심 문장과 효과 목록은 보존한다.
- `새 저장소에 빠르게 적용하기`는 상단 `빠른 시작`과 중복되므로 다시 추가하지 않는다.
- Stage 1.3의 요약 표 중심 `이 저장소가 제공하는 것` 섹션은 제거하고 원본 서술 중심 섹션으로 대체한다.

### 검증

```bash
rg -n "이 하네스가 하는 일|프롬프트 한 줄로 어떤 저장소에든 적용|공식 프롬프팅 가이드와의 정합|Multi-agent 호환|토큰 효율|컨텍스트 효율|의도 전달 명확성|모델 간 이식성" README.ko.md
rg -n "새 저장소에 빠르게 적용하기|rhwp에서 처음 도입|다음과 같이 확장|원본 방법론\\(rhwp\\)|rhwp는" README.ko.md
rg -n "부록|Hyper-Waterfall이란\\?|핵심 구조|핵심 원칙|바이브 코딩 vs Hyper-Waterfall|프롬프트 가이드 준수" README.ko.md
git diff --check
```

수동 확인:

- 부록 내용이 삭제되거나 상단으로 다시 올라오지 않았는지 확인한다.
- `이 하네스가 하는 일`의 세 하위 섹션이 upstream `이 저장소가 한 일`의 의미와 문장 흐름을 최대한 유지하는지 확인한다.
- `새 저장소에 빠르게 적용하기` heading이 재도입되지 않았는지 확인한다.

### 커밋

```text
Task #66 [Stage 1.4]: 한국어 README upstream 하네스 설명 보존
```

## Stage 1.5 — 한국어 README 문서 구조 정책 복원

### 산출물

신규:

- `mydocs/working/task_m050_66_stage1_5.md`

수정:

- `README.ko.md`
- `mydocs/plans/task_m050_66_impl.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- Stage 1.4까지 축약되며 유실된 `문서 구조` 정책 문단을 원본 README 수준으로 복원한다.
- 폴더별 상세 작성 규칙, 문서 파일명 규칙, 중앙 템플릿 정책 링크를 복원한다.
- `mydocs/`가 공식 제품 문서 루트가 아니며 공식 문서 루트 이름을 고정하지 않는다는 설명을 복원한다.
- `manual/`, `tech/`, `_templates/`의 역할과 경계 설명을 복원한다.
- GitHub Issue/PR은 GitHub 플랫폼 산출물이고, 저장소 작업 문서는 `mydocs/_templates/`를 기준으로 작성한다는 경계를 복원한다.

### 검증

```bash
rg -n "각 폴더의 상세 작성 규칙|중앙 템플릿 정책|공식 문서 루트 이름|GitHub Wiki|manual 문서 중립성 정책|tech/.*공식 계약 문서|_templates/.*진실 원천|GitHub Issue와 Pull Request는 GitHub 플랫폼 산출물|GitHub 플랫폼 템플릿 정책" README.ko.md
rg -n "문서 구조|적용 후 대상 저장소 구조|부록" README.ko.md
git diff --check
```

수동 확인:

- 복원 문단이 `도입 후 작업 흐름 > 문서 구조` 아래에 위치하는지 확인한다.
- 원본 README의 정책 의미가 축약되지 않았는지 확인한다.
- `적용 후 대상 저장소 구조`와 부록은 위치를 유지하는지 확인한다.

### 커밋

```text
Task #66 [Stage 1.5]: 한국어 README 문서 구조 정책 복원
```

## Stage 1.6 — 한국어 README draft 기반 전체 재작성

### 산출물

신규:

- `mydocs/working/task_m050_66_stage1_6.md`

수정:

- `README.ko.md`
- `mydocs/plans/task_m050_66_impl.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- 사용자가 작성한 `readme_draft.md`의 흐름을 기준으로 `README.ko.md`를 전체 재작성한다.
- 맨 상단에 `이 저장소가 한 일`의 핵심을 짧게 요약한 후킹 표를 둔다.
- 후킹 표에는 한 줄 적용, 작업 산출물 구조화, 공식 프롬프팅 가이드 정합, Multi-agent 운영을 포함한다.
- `새 저장소에 빠르게 적용하기`는 `바로 설치`로 이름을 바꾸고 상단 후킹 요약 바로 아래에 배치한다.
- 기존 `Hyper-Waterfall이란?`, 핵심 구조, 핵심 원칙, 역할 분담, 바이브 코딩 비교, 왜 강력한가, 살아있는 예시, 설계 원칙, 프롬프트 가이드 준수는 `부록` 아래로 묶는다.
- 문서 구조 정책, 핵심 SKILL 상세, 타스크 사이클, 적용 후 대상 저장소 구조는 본문에 유지한다.

### 검증

```bash
rg -n "바로 설치|공식 프롬프팅 가이드 정합|한 줄 적용|작업 산출물 구조화|Multi-agent 운영|이 저장소가 한 일|도입 후 작업 흐름|문서 구조|부록|프롬프트 가이드 준수" README.ko.md
rg -n "^# |^## |^### |^#### " README.ko.md
rg -n "각 폴더의 상세 작성 규칙|중앙 템플릿 정책|공식 문서 루트 이름|GitHub Wiki|manual 문서 중립성 정책|_templates/.*진실 원천|GitHub Issue와 Pull Request는 GitHub 플랫폼 산출물|GitHub 플랫폼 템플릿 정책" README.ko.md
git diff --check
```

수동 확인:

- `바로 설치`가 상단 후킹 요약 바로 아래에 있는지 확인한다.
- 상단 후킹 요약에 공식 프롬프팅 가이드 정합이 포함됐는지 확인한다.
- `새 저장소에 빠르게 적용하기`가 별도 heading으로 남지 않았는지 확인한다.
- 부록 경계가 명확하게 유지되는지 확인한다.

### 커밋

```text
Task #66 [Stage 1.6]: 한국어 README draft 기반 전체 재작성
```

## Stage 1.7 — 한국어 README 상단 후킹 관점 보정

### 산출물

신규:

- `mydocs/working/task_m050_66_stage1_7.md`

수정:

- `README.ko.md`
- `mydocs/plans/task_m050_66_impl.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- 상단 후킹에서 `이 저장소가 한 일` 관점을 제거하고, 사용자가 자신의 저장소에 적용했을 때 설치되는 `운영 레일` 관점으로 바꾼다.
- 후킹 표에는 한 줄 적용, 승인 게이트, 작업 기억 외부화, 공식 프롬프팅 가이드 정합, Multi-agent 운영을 둔다.
- 기존 `이 저장소가 한 일` heading은 `구현 확장: 방법론을 하네스로 만든 방식`으로 변경한다.
- 상세 본문은 방법론을 하네스로 패키징한 구현 설명으로 유지하고, 상단에서는 rhwp 비교처럼 보이지 않게 한다.

### 검증

```bash
rg -n "이 하네스를 적용하면|제공되는 것|승인 게이트|작업 기억 외부화|공식 프롬프팅 가이드 정합|Multi-agent 운영" README.ko.md
rg -n "구현 확장: 방법론을 하네스로 만든 방식" README.ko.md
rg -n "^## 이 저장소가 한 일|#이-저장소가-한-일|\\[이 저장소가 한 일\\]" README.ko.md
git diff --check
```

수동 확인:

- 상단 후킹이 프로젝트 역사 설명이 아니라 적용자가 얻는 운영 능력으로 읽히는지 확인한다.
- 구현 상세 heading이 요청한 문구로 변경됐는지 확인한다.
- 기존 상세 본문이 삭제되지 않았는지 확인한다.

### 커밋

```text
Task #66 [Stage 1.7]: 한국어 README 상단 후킹 관점 보정
```

## Stage 1.8 — 한국어 README 적용 적합성·표 구조 보강

### 산출물

신규:

- `mydocs/working/task_m050_66_stage1_8.md`

수정:

- `README.ko.md`
- `mydocs/plans/task_m050_66_impl.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- 이전 버전의 `언제 쓰면 좋은가` 섹션을 복원하고, `잘 맞는 경우`와 `과한 경우`를 표로 정리한다.
- 상단의 중복 중요 문구를 하나의 `[!IMPORTANT]` alert로 합친다.
- `왜 이 저장소를 써야 하는가` heading을 `왜 Hyper-Waterfall인가`로 변경한다.
- `적용하면 바로 달라지는 것` 10개 리스트는 유지한다.
- `문서 구조`의 장문 정책 문단을 경계 규칙 표로 바꾼다.
- `적용 후 대상 저장소 구조` tree 아래의 정책 설명을 주요 항목 기준 표로 바꾼다.
- `# 부록`이 아닌 `## 부록` outline을 유지하고, 모델명 중심 표현이 남지 않았는지 확인한다.

### 검증

```bash
rg -n "언제 쓰면 좋은가|잘 맞는 경우|과한 경우|왜 Hyper-Waterfall인가|^## 부록" README.ko.md
rg -n "README에서는 아래 경계|^\\| 영역 \\| README에서 알아야 할 기준 \\| 상세 기준 \\||적용 후 생성되는 주요 항목|^\\| 항목 \\| 역할 \\| 기준 문서 \\|" README.ko.md
rg -n "OpenAI GPT|Claude Opus|GPT-5|Opus 4|^# 부록|왜 이 저장소를 써야 하는가|Why Hyper-waterfall" README.ko.md
git diff --check
```

수동 확인:

- `언제 쓰면 좋은가`가 `바로 설치` 다음에 위치해 적용 판단 흐름을 돕는지 확인한다.
- 문서 구조 정책 표가 원문 경계 의미를 잃지 않는지 확인한다.
- 적용 후 대상 저장소 구조의 tree와 기준 표가 중복되지 않고 서로 보완하는지 확인한다.
- `적용하면 바로 달라지는 것` 10개 리스트가 유지됐는지 확인한다.

### 커밋

```text
Task #66 [Stage 1.8]: 한국어 README 적용 적합성·표 구조 보강
```

## Stage 1.9 — 업스트림 README 상단 후킹·요약 표 반영

### 산출물

신규:

- `mydocs/working/task_m050_66_stage1_9.md`

수정:

- `README.md`
- `mydocs/plans/task_m050_66_impl.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- `README.md`를 최신 `origin/main`의 업스트림 본문 기준으로 맞춘다.
- `## 바로 설치` 위 상단 후킹 블록만 수정한다.
- 첫 표는 Hyper-Waterfall 자체의 핵심인 사람의 결정권 유지, 승인 게이트, 작업 기억 외부화, 단계적 실행, 재개 가능한 프로세스를 설명한다.
- 두 번째 표는 지식 자산화, 리스크 조기 발견, 자동화된 역할 분담, 컨텍스트 경량화, 프롬프트 가이드 정합을 요약한다.
- `## 바로 설치` 이하 기존 업스트림 README 본문은 변경하지 않는다.

### 검증

```bash
git diff --stat origin/main -- README.md
git diff origin/main -- README.md
rg -n "AI 코딩을 추적 가능하고 승인 가능한 개발 프로세스로 바꾸는 방법론|Hyper-Waterfall의 핵심|왜 Hyper-Waterfall인가|^\\| 강점 \\| 의미 \\||^## 바로 설치|^## 왜 Hyper-waterfall\\?" README.md
git diff --check
```

수동 확인:

- `origin/main` 대비 diff가 상단 후킹 블록에만 있는지 확인한다.
- `## 바로 설치` 아래 본문이 최신 업스트림 README와 동일하게 유지됐는지 확인한다.
- 두 표가 설치/운영 기능이 아니라 Hyper-Waterfall 자체의 철학과 강점을 설명하는지 확인한다.

### 커밋

```text
Task #66 [Stage 1.9]: 업스트림 README 상단 후킹 요약 보강
```

## Stage 1.10 — 업스트림 README 핵심 섹션 순서 조정

### 산출물

신규:

- `mydocs/working/task_m050_66_stage1_10.md`

수정:

- `README.md`
- `mydocs/plans/task_m050_66_impl.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- `README.md`를 최신 `origin/main` 기준으로 맞춘다.
- `Hyper-Waterfall의 강점` 제목과 본문은 변경하지 않는다.
- `Hyper-Waterfall의 강점` 섹션을 `적용하면 바로 달라지는 것` 뒤, `도입 후 작업 흐름` 앞으로 이동한다.
- `언제 쓰면 좋은가`, `기존 AI 코딩 방식과 비교`, `적용하면 바로 달라지는 것` 섹션의 제목과 본문은 변경하지 않는다.

### 검증

```bash
rg -n "^## (Hyper-Waterfall의 강점|언제 쓰면 좋은가|기존 AI 코딩 방식과 비교|적용하면 바로 달라지는 것|도입 후 작업 흐름)" README.md
git diff --stat origin/main -- README.md
git diff origin/main -- README.md
git diff --check
```

수동 확인:

- `README.md`의 관련 섹션 순서가 `언제 쓰면 좋은가 -> 기존 AI 코딩 방식과 비교 -> 적용하면 바로 달라지는 것 -> Hyper-Waterfall의 강점 -> 도입 후 작업 흐름`인지 확인한다.
- `Hyper-Waterfall의 강점` 제목과 본문이 변경 없이 이동만 됐는지 확인한다.
- 최신 업스트림 기준에서 다른 섹션 내용이 변경되지 않았는지 확인한다.

### 커밋

```text
Task #66 [Stage 1.10]: 업스트림 README 핵심 섹션 순서 조정
```

## Stage 1.11 — 업스트림 README 최신 수정본 동기화

### 산출물

신규:

- `mydocs/working/task_m050_66_stage1_11.md`

수정:

- `README.md`
- `mydocs/plans/task_m050_66_impl.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- 사용자가 직접 수정한 최신 `origin/main:README.md`를 현재 작업 브랜치의 `README.md` 기준본으로 반영한다.
- `Hyper-Waterfall 자세히 알아보기` 링크 줄을 포함한다.
- `언제 쓰면 좋은가`와 `기존 AI 코딩 방식과 비교`의 보강 문장을 포함한다.
- 이후 Stage 2 영어 기본 README 전환은 이 최신 업스트림 README를 기준으로 진행한다.

### 검증

```bash
git diff --stat HEAD..origin/main -- README.md
git diff HEAD..origin/main -- README.md
rg -n "Hyper-Waterfall 자세히 알아보기|AI에게 실제 소스 수정을 맡기되|차이는 AI를 쓰느냐" README.md
git diff --check
```

수동 확인:

- 최신 업스트림 README의 직접 수정 사항이 현재 작업 브랜치에 반영됐는지 확인한다.
- Stage 2 번역 기준으로 삼을 상단 흐름이 `바로 설치 -> Hyper-Waterfall 자세히 알아보기 -> 언제 쓰면 좋은가 -> 기존 AI 코딩 방식과 비교 -> 적용하면 바로 달라지는 것 -> Hyper-Waterfall의 강점`인지 확인한다.

### 커밋

```text
Task #66 [Stage 1.11]: 업스트림 README 최신 수정본 동기화
```

## Stage 2 — 영어 기본 README 전환

### 산출물

신규:

- `mydocs/working/task_m050_66_stage2.md`

수정:

- `README.md`
- `README.ko.md`
- `mydocs/orders/20260525.md`

### 변경 내용

- 최신 업스트림 한국어 `README.md`를 `README.ko.md`에 먼저 동기화해 한국어 기준본을 보존한다.
- 동기화된 `README.ko.md`의 상위 구조를 기준으로 루트 `README.md`를 영어 기본 문서로 전환한다.
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
