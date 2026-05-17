# Task M040 #62 구현 계획서

수행계획서: [`task_m040_62.md`](task_m040_62.md)
GitHub Issue: [#62](https://github.com/postmelee/hyper-waterfall/issues/62)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 폴더별 README 분산 | `templates/mydocs/*/README.md`, `document_structure_guide.md` | README 존재와 폴더별 규칙 이동 확인 |
| 2 | PR 처리 가이드 분산 | `internal_pr_guide.md`, `external_pr_review_guide.md`, `pr_command_guide.md`, `pr_process_guide.md` | PR 규칙 링크와 Skill 참조 정합성 확인 |
| 3 | task/Git/lifecycle 규칙 분산 | `framework_lifecycle_guide.md`, `release_update_protocol.md`, `docs/lifecycle/*.md` | lifecycle/update/release 단일 참조 구조 확인 |
| 4 | README, manifest, 링크 정합성 | `README.md`, `templates/manifest.json`, 관련 링크 | manifest JSON 파싱, 링크/키워드/whitespace 확인 |

## 문서 위치 확인

수행계획서의 "문서 위치 판단"과 실제 Stage 산출물 경로는 아래처럼 일치한다. 이 task는 제품/사용자/API/아키텍처 문서가 아니라 Hyper-Waterfall 운영 문서와 적용 템플릿을 다룬다.

| 파일 | 수행계획서상 선택 위치 | Stage 산출물 경로 | 일치 여부 | 비고 |
|---|---|---|---|---|
| `templates/mydocs/*/README.md` | 각 폴더 내부 | Stage 1 산출물 | OK | 폴더별 path-specific 규칙 |
| `templates/mydocs/manual/*_guide.md` | `templates/mydocs/manual/` | Stage 2, Stage 3 산출물 | OK | 반복 적용되는 운영 절차 |
| `docs/lifecycle/*.md` | `docs/lifecycle/` | Stage 3 산출물 | OK | 프레임워크 적용/업데이트 lifecycle 기준 |

## Stage 1 — 폴더별 README 분산

### 산출물

신규:

- `templates/mydocs/_templates/README.md`
- `templates/mydocs/orders/README.md`
- `templates/mydocs/plans/README.md`
- `templates/mydocs/working/README.md`
- `templates/mydocs/report/README.md`
- `templates/mydocs/feedback/README.md`
- `templates/mydocs/tech/README.md`
- `templates/mydocs/troubleshootings/README.md`
- `templates/mydocs/pr/README.md`
- `templates/mydocs/manual/README.md`
- `templates/mydocs/skills/README.md`

수정:

- `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- `document_structure_guide.md`의 `폴더별 상세 규칙` 본문을 각 폴더 README로 이동한다.
- 각 README는 목적, 답하는 질문, 작성 시점, 허용 파일명, 사용 템플릿, 반드시 포함할 내용, 두면 안 되는 내용, 다음 세션 AI가 복원해야 할 맥락을 담는다.
- `document_structure_guide.md`에는 전체 폴더 표, 핵심 경계 정책, 각 README 링크만 남긴다.
- `mydocs/manual`과 `mydocs/skills` 심볼릭 링크 정책은 유지하되, 상세 폴더 규칙은 README와 중복하지 않는다.

### 검증

```bash
find templates/mydocs -maxdepth 2 -name README.md -print | sort
rg -n "목적:|허용 파일명|두면 안 되는 내용|다음 세션 AI" templates/mydocs/*/README.md
rg -n "폴더별 상세 규칙|_templates/README.md|orders/README.md|skills/README.md" templates/mydocs/manual/document_structure_guide.md
git diff --check
```

### 커밋

```text
Task #62 Stage 1: 폴더별 README로 문서 구조 규칙 분산
```

## Stage 2 — PR 처리 가이드 분산

### 산출물

신규:

- `templates/mydocs/manual/internal_pr_guide.md`
- `templates/mydocs/manual/external_pr_review_guide.md`
- `templates/mydocs/manual/pr_command_guide.md`

수정:

- `templates/mydocs/manual/pr_process_guide.md`
- 필요 시 `README.md`
- 필요 시 `templates/mydocs/skills/external-pr-review/SKILL.md`

### 변경 내용

- 내부 task PR 본문 작성 기준과 섹션별 작성 규칙을 `internal_pr_guide.md`로 이동한다.
- 외부 기여자 PR 검토 절차, 검토 문서 흐름, merge 전후 체크를 `external_pr_review_guide.md`로 이동한다.
- `gh pr create`, `--template`, `--body-file`, SHA 고정 문서 링크 규칙을 `pr_command_guide.md`로 이동한다.
- `pr_process_guide.md`는 PR 처리 entrypoint로 축소하고, 기본 원칙과 각 세부 문서 링크를 제공한다.
- 외부 PR 검토 Skill이 분리된 외부 PR 문서를 참조해야 하면 링크를 갱신한다.

### 검증

```bash
rg -n "내부 task PR|섹션별 작성 기준|Stage timeline" templates/mydocs/manual/internal_pr_guide.md templates/mydocs/manual/pr_process_guide.md
rg -n "외부 기여 PR|pr_\\{번호\\}_review|archives" templates/mydocs/manual/external_pr_review_guide.md templates/mydocs/manual/pr_process_guide.md templates/mydocs/skills/external-pr-review/SKILL.md
rg -n "PR 생성 명령|--body-file|publish/task|blob/\\{sha\\}" templates/mydocs/manual/pr_command_guide.md templates/mydocs/manual/git_workflow_guide.md
git diff --check
```

### 커밋

```text
Task #62 Stage 2: PR 처리 가이드를 역할별 문서로 분산
```

## Stage 3 — task/Git/lifecycle 규칙 분산

### 산출물

신규:

- `templates/mydocs/manual/framework_lifecycle_guide.md`
- `templates/mydocs/manual/release_update_protocol.md`
- `docs/lifecycle/adoption.md`
- `docs/lifecycle/update.md`
- `docs/lifecycle/update_pr.md`

수정:

- `docs/agent-entrypoint.md`
- `templates/mydocs/manual/task_workflow_guide.md`
- `templates/mydocs/manual/git_workflow_guide.md`
- `templates/mydocs/manual/document_structure_guide.md`

### 변경 내용

- `task_workflow_guide.md`의 framework lifecycle 작업 설명을 `framework_lifecycle_guide.md`로 이동하고, task workflow 문서에는 일반 task 흐름과 lifecycle 문서 링크만 남긴다.
- `git_workflow_guide.md`의 release/tag/update protocol 세부 내용을 `release_update_protocol.md`로 이동하고, Git 문서에는 브랜치 흐름과 PR 유형 요약만 남긴다.
- `docs/agent-entrypoint.md`는 AI가 처음 읽는 entrypoint로 유지하되, 신규 적용 절차는 `docs/lifecycle/adoption.md`, 기존 업데이트 절차는 `docs/lifecycle/update.md`, 업데이트 PR 전환/본문 구조는 `docs/lifecycle/update_pr.md`로 이동한다.
- `document_structure_guide.md`의 배포 manifest와 version 기록 정책이 새 lifecycle 문서를 참조하도록 갱신한다.

### 검증

```bash
rg -n "framework lifecycle|신규 적용|기존 업데이트|manifest diff|Hyper-Waterfall 버전 업데이트 PR" docs/lifecycle docs/agent-entrypoint.md templates/mydocs/manual/framework_lifecycle_guide.md
rg -n "Release/tag|update protocol|release PR|Hyper-Waterfall 버전 업데이트 PR" templates/mydocs/manual/release_update_protocol.md templates/mydocs/manual/git_workflow_guide.md
rg -n "docs/lifecycle|framework_lifecycle_guide|release_update_protocol" README.md docs/agent-entrypoint.md templates/mydocs/manual
git diff --check
```

### 커밋

```text
Task #62 Stage 3: lifecycle와 release update 규칙 분리
```

## Stage 4 — README, manifest, 링크 정합성

### 산출물

수정:

- `README.md`
- `templates/manifest.json`
- 필요한 경우 `docs/migrations/README.md`
- 필요한 경우 `templates/mydocs/manual/task_workflow_guide.md`

### 변경 내용

- README의 문서 구조, 도입 후 작업 흐름, 핵심 SKILL 상세, 프롬프트 가이드 정합 설명을 새 분산 구조와 맞춘다.
- `templates/manifest.json`이 `templates/mydocs/manual`, `templates/mydocs/_templates`, `templates/mydocs/skills` 디렉터리 단위 항목으로 새 README와 manual 문서를 포함하는지 확인한다.
- `docs/lifecycle/*.md`가 release 또는 적용 프로세스에 필요한 문서라면 manifest 포함 대상인지 판단하고 반영한다.
- `task_workflow_guide.md`의 `SKILL 호출 표시 안내`가 README의 핵심 SKILL 상세와 충돌하지 않는지 확인한다.
- 전체 문서에서 오래된 링크, 이동된 섹션명, 중복된 본문성 규칙을 정리한다.

### 검증

```bash
rg -n "핵심 SKILL|도입 후 작업 흐름|문서 구조|프롬프트 가이드|SKILL 호출 표시 안내" README.md templates/mydocs/manual/task_workflow_guide.md
rg -n "document_structure_guide.md#폴더별-상세-규칙|pr_process_guide.md#내부-task-pr-작성-규칙|docs/agent-entrypoint.md#기존-업데이트-판단-결과-형식" README.md templates/mydocs/manual docs
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
git status --short
git diff --check
```

### 커밋

```text
Task #62 Stage 4: 문서 링크와 manifest 정합성 갱신
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- 문서 위치가 수행계획서 판단과 달라지면 구현 전에 수행계획서 또는 구현계획서를 갱신하고 작업지시자 승인을 받는다.
- Stage 4에서 `git status --short`는 단계 보고서 작성과 커밋 전 변경 파일만 보여야 하며, PR 준비 전에는 빈 출력이어야 한다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m040_62_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #62 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서와 오늘할일 완료 처리 커밋은 `Task #62: 최종 보고서 작성과 오늘할일 완료 처리` 형식을 사용한다.

## 단계 의존성

- Stage 2는 Stage 1의 폴더 README 분산과 `document_structure_guide.md` 링크 구조가 확정된 뒤 진행한다.
- Stage 3은 Stage 2에서 PR 문서 분산 방식이 확정된 뒤, lifecycle/update PR 문서와 링크 정책이 충돌하지 않게 진행한다.
- Stage 4는 Stage 1-3의 새 문서 경로가 확정된 뒤 README와 manifest를 한 번에 맞춘다.

## 위험과 대응

- **문서 이동 중 정보 손실**: 이동 전후로 `rg` 키워드를 비교하고, 세부 규칙은 요약하지 않고 대상 README 또는 분리 문서에 보존한다.
- **링크 단절**: 기존 README와 매뉴얼의 섹션 링크를 `rg`로 찾고, 새 문서 경로 또는 새 anchor로 갱신한다.
- **중복 기준 유지**: entrypoint 문서에는 상세 규칙을 반복하지 않고, 단일 진실 원천 링크와 요약만 둔다.
- **manifest 누락**: 새 문서가 적용 저장소에 복사되어야 하는지 확인하고, `templates/manifest.json`의 디렉터리 항목 또는 파일 항목이 실제 배포 의도와 맞는지 검증한다.

## 승인 요청 사항

- 4개 Stage 구성과 단계별 산출물
- `templates/mydocs/*/README.md`를 폴더별 상세 규칙의 진실 원천으로 삼는 방식
- PR/lifecycle/release/update 세부 규칙을 별도 문서로 분리하고 기존 가이드는 entrypoint로 축소하는 방식
- Stage별 검증 명령과 커밋 메시지
