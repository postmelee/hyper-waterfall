# Task #36 구현계획서 - Codex/Claude plugin 공통 배포 원칙 정리

수행계획서: [`task_m040_36.md`](task_m040_36.md)
GitHub Issue: [#36](https://github.com/postmelee/hyper-waterfall/issues/36)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 공식 사양과 기존 문서 inventory | `mydocs/tech/task_m040_36_plugin_specs_inventory.md`, `mydocs/working/task_m040_36_stage1.md` | 공식 문서 확인 기록, 기존 문서 키워드 inventory, 불확실성 분리 |
| 2 | 공통 canonical/package 원칙 작성 | `docs/plugin-distribution-principles.md`, `mydocs/working/task_m040_36_stage2.md` | canonical source, 포함/참조/fallback 분류, 책임 경계 점검 |
| 3 | hook guardrail와 adapter 분리 기준 작성 | `docs/plugin-distribution-principles.md`, `mydocs/working/task_m040_36_stage3.md` | 승인 자동화 금지, guardrail 후보, tool adapter 분리 기준 점검 |
| 4 | 연계 문서 갱신과 최종 정합성 검증 | `docs/distribution-channels.md`, 필요 시 `README.md`/`docs/agent-entrypoint.md`, `mydocs/working/task_m040_36_stage4.md` | #37-#40 checklist, 문서 링크, canonical drift 점검 |

## Stage 1 — 공식 사양과 기존 문서 inventory

### 산출물

신규:

- `mydocs/tech/task_m040_36_plugin_specs_inventory.md`
- `mydocs/working/task_m040_36_stage1.md`

수정:

- `mydocs/orders/20260516.md`

### 변경 내용

- OpenAI Codex plugin과 hooks 공식 문서를 확인하고 확인일, URL, 이번 task에 적용할 항목을 기록한다.
- Anthropic Claude Code plugin과 hooks 공식 문서를 확인하고 확인일, URL, 이번 task에 적용할 항목을 기록한다.
- 공식 문서에서 plugin bundle 구성, skill/command/tool 포함 가능성, hook event, hook payload, block/warn semantics, 배포 또는 설치 경로 관련 근거를 분리한다.
- `README.md`, `docs/distribution-channels.md`, `docs/agent-entrypoint.md`, `templates/mydocs/manual`, `templates/mydocs/skills`에서 plugin, hook, canonical, fallback 관련 기존 문구를 inventory로 정리한다.
- 공식 문서로 확정 가능한 항목과 도구별 packaging task에서 재확인해야 할 불확실성을 분리한다.

### 검증

```bash
rg -n 'Codex|Claude|plugin|hook|fallback|canonical|templates/mydocs/skills|templates/mydocs/manual|agent-entrypoint' README.md docs templates/mydocs/manual templates/mydocs/skills
rg -n 'OpenAI|Codex|Anthropic|Claude|plugin|hook|확인일|URL|불확실|inventory' mydocs/tech/task_m040_36_plugin_specs_inventory.md mydocs/working/task_m040_36_stage1.md
git diff --check
```

수동 확인:

- 공식 문서 URL과 확인일이 Stage 1 산출물에 남아 있는지 확인한다.
- OpenAI/Anthropic 공식 문서에서 확인한 사실과 추론을 구분했는지 확인한다.
- 공식 문서가 명확하지 않은 부분을 임의 확정하지 않고 #37-#40 재확인 항목으로 남겼는지 확인한다.

### 커밋

```text
Task #36 Stage 1: plugin 공식 사양과 기존 문서 inventory
```

## Stage 2 — 공통 canonical/package 원칙 작성

### 산출물

신규:

- `docs/plugin-distribution-principles.md`
- `mydocs/working/task_m040_36_stage2.md`

수정:

- `mydocs/tech/task_m040_36_plugin_specs_inventory.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- `docs/plugin-distribution-principles.md`에 Codex/Claude plugin 공통 원칙 문서의 기본 구조를 만든다.
- plugin이 대체하지 않는 canonical source를 명시한다: GitHub Release/tag, `templates/manifest.json`, migration guide, `docs/agent-entrypoint.md`, npm CLI 출력 계약.
- `templates/mydocs/skills`, `templates/mydocs/manual`, `docs/agent-entrypoint.md`, npm CLI의 책임 경계를 표로 정리한다.
- plugin bundle에 포함, 참조, fallback 처리할 파일을 분류하는 기준을 만든다.
- plugin bundle이 Skill, manual, manifest, migration guide의 별도 진실 원천이 되지 않는다는 금지 원칙을 작성한다.
- Codex와 Claude의 packaging 차이는 공통 문서에서 추상화하되, 도구별 packaging 검증 task가 확인할 항목으로 분리한다.

### 검증

```bash
rg -n 'canonical|manifest|migration|templates/mydocs/skills|templates/mydocs/manual|agent-entrypoint|npm CLI|fallback|bundle' docs/plugin-distribution-principles.md
rg -n '진실 원천|별도 진실 원천|복제|참조|fallback|포함|책임 경계' docs/plugin-distribution-principles.md
git diff --check
```

수동 확인:

- plugin이 release/manifest/migration 기준을 재정의하지 않는지 확인한다.
- Skill과 manual의 진실 원천이 `templates/mydocs/`로 유지되는지 확인한다.
- 공통 원칙이 Codex 또는 Claude 한쪽에만 맞는 구현 세부로 치우치지 않았는지 확인한다.

### 커밋

```text
Task #36 Stage 2: plugin canonical 배포 원칙 문서화
```

## Stage 3 — hook guardrail와 adapter 분리 기준 작성

### 산출물

신규:

- `mydocs/working/task_m040_36_stage3.md`

수정:

- `docs/plugin-distribution-principles.md`
- `mydocs/tech/task_m040_36_plugin_specs_inventory.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- hook 사용 원칙을 승인 자동화가 아니라 보조 guardrail로 정의한다.
- 객관 상태 기반 guardrail 후보를 정리한다: 이슈 없는 구현, 승인 전 파일 수정, 구현계획서 없는 stage 시작, 단계 보고 누락, 위험 shell/git/npm/gh 명령, publish/merge/close 시도 등.
- 사람 맥락이 필요한 작업지시자 승인 여부는 hook의 자동 판단 대상에서 제외한다.
- 공통 정책 규칙과 Codex/Claude hook payload adapter를 분리하는 기준을 정리한다.
- hook 결과를 block, warn, report-only 중 어떤 등급으로 다룰지 판단 기준을 작성한다.
- hook이 실패하거나 설치되지 않았을 때도 AGENTS/CLAUDE/manual 절차가 계속 기본 안전장치라는 fallback 원칙을 명시한다.

### 검증

```bash
rg -n 'hook|guardrail|승인|자동|adapter|차단|경고|report-only|publish|merge|close|위험 명령' docs/plugin-distribution-principles.md
rg -n '이슈 없는 구현|승인 전 파일 수정|단계 보고|작업지시자 승인|객관 상태|payload|adapter' docs/plugin-distribution-principles.md
git diff --check
```

수동 확인:

- hook이 작업지시자 승인을 대체하지 않는다고 명확히 표현됐는지 확인한다.
- block 대상이 사람 판단이 아니라 객관 상태와 위험 명령 중심인지 확인한다.
- 도구별 hook semantics 차이를 무시하지 않고 adapter 또는 재확인 항목으로 남겼는지 확인한다.

### 커밋

```text
Task #36 Stage 3: hook guardrail 원칙 문서화
```

## Stage 4 — 연계 문서 갱신과 최종 정합성 검증

### 산출물

신규:

- `mydocs/working/task_m040_36_stage4.md`

수정:

- `docs/plugin-distribution-principles.md`
- `docs/distribution-channels.md`
- 필요 시 `README.md`
- 필요 시 `docs/agent-entrypoint.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- `docs/distribution-channels.md`의 Codex/Claude plugin 판단을 공통 원칙 문서와 연결한다.
- 필요하면 README의 추가 배포 채널 안내에 원칙 문서 링크만 짧게 추가한다.
- 필요하면 `docs/agent-entrypoint.md`에 plugin이 lifecycle 판단 기준을 대체하지 않는다는 짧은 cross-reference를 추가한다.
- #37-#40에서 재사용할 packaging 검증 checklist를 `docs/plugin-distribution-principles.md`에 정리한다.
- 공식 문서 확인 결과, 불확실성, 후속 도구별 검증 항목이 수용 기준과 연결되는지 정리한다.

### 검증

```bash
rg -n 'plugin-distribution-principles|Codex plugin|Claude plugin|hook|canonical' README.md docs
rg -n 'Codex plugin packaging|Claude plugin packaging|check matrix|guardrail|#37|#38|#39|#40' docs/plugin-distribution-principles.md
rg -n 'manifest|migration|templates/mydocs/skills|templates/mydocs/manual|npm CLI|agent-entrypoint' docs/plugin-distribution-principles.md docs/distribution-channels.md README.md docs/agent-entrypoint.md
git diff --check
```

수동 확인:

- #37-#40이 다음 작업에서 재사용할 checklist가 충분히 구체적인지 확인한다.
- README를 수정한 경우 세부 원칙을 README에 중복하지 않고 링크 중심으로 유지했는지 확인한다.
- `docs/agent-entrypoint.md`를 수정한 경우 신규/기존 적용 판단 결과 형식을 흐리지 않았는지 확인한다.
- core Skill 또는 manual 본문을 변경하지 않았는지 확인한다. 변경 필요성이 있으면 별도 승인 항목으로 남긴다.

### 커밋

```text
Task #36 Stage 4: plugin 배포 원칙 연계 문서 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 공식 문서 확인은 가능한 한 공식 출처만 사용하고, 확인일을 산출물에 기록한다.
- 네트워크 또는 도구 접근 문제로 공식 문서를 확인하지 못하면 해당 항목을 미확인으로 기록하고 다음 단계로 넘기지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 구현계획서 자체는 별도 커밋 `Task #36: 구현계획서 작성`으로 남긴다.
- 단계 커밋은 해당 단계 산출물과 `mydocs/working/task_m040_36_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #36 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서는 `task-final-report` 절차에서 별도 커밋과 PR 게시 흐름으로 처리한다.

## 단계 의존성

- Stage 1은 구현계획서 승인 후 진행한다.
- Stage 2는 Stage 1 보고서 승인 후 진행한다.
- Stage 3은 Stage 2의 canonical/package 원칙이 확정된 뒤 진행한다.
- Stage 4는 Stage 3의 hook guardrail와 checklist가 확정된 뒤 진행한다.
- Stage 4에서 core Skill 또는 manual 본문 변경 필요성이 발견되면 즉시 반영하지 않고 별도 승인 항목 또는 후속 이슈로 분리한다.

## 위험과 대응

- **공식 사양 변동**: Codex/Claude plugin과 hook 사양은 바뀔 수 있다. 확인일과 URL을 기록하고 도구별 packaging task에서 재확인하도록 한다.
- **비공식 정보 혼입**: packaging/hook 관련 글은 비공식 자료가 많을 수 있다. 이번 task의 기준은 공식 문서와 현재 저장소 산출물로 제한한다.
- **canonical drift**: plugin bundle이 Skill, manual, manifest, migration guide를 독립 복제하면 release 기준이 갈라진다. Stage 2에서 진실 원천과 참조 기준을 명시한다.
- **hook 과신**: hook을 승인 자동화로 오해하면 하이퍼-워터폴 핵심 규칙이 깨진다. Stage 3에서 guardrail과 승인 게이트를 분리한다.
- **문서 변경 범위 확산**: README, agent entrypoint, distribution 문서가 서로 중복될 수 있다. Stage 4에서 링크와 짧은 요약 중심으로 정리하고, manual/SKILL 본문 변경은 기본 제외한다.

## 승인 요청 사항

- Stage 1-4 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- 공식 문서 확인은 OpenAI/Anthropic 공식 출처 중심으로 하고, 불확실성은 #37-#40 재확인 항목으로 분리하는 데 동의?
- Stage 2에서 `docs/plugin-distribution-principles.md`를 새 공통 원칙 문서로 만드는 데 동의?
- Stage 3에서 hook은 승인 자동화가 아니라 guardrail 후보와 adapter 분리 기준으로만 문서화하는 데 동의?
- Stage 4에서 README/agent-entrypoint 수정은 필요한 경우에만 짧은 cross-reference로 제한하는 데 동의?
