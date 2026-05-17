# Task #52 구현계획서 - Codex plugin public 배포와 UI discovery smoke

수행계획서: [`task_m040_52.md`](task_m040_52.md)
GitHub Issue: [#52](https://github.com/postmelee/hyper-waterfall/issues/52)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 공식 문서와 배포 후보 재확인 | `mydocs/tech/task_m040_52_codex_plugin_public_smoke.md`, `mydocs/working/task_m040_52_stage1.md` | OpenAI 공식 문서 확인일, Codex CLI/plugin surface, #38 산출물 상태, public 배포 요건 확인 |
| 2 | UI discovery와 Skill invocation smoke | 기술 기록 Stage 2 섹션, `mydocs/working/task_m040_52_stage2.md` | repo-local marketplace add/remove, Codex Plugin Directory 또는 CLI `/plugins` discovery, wrapper Skill 발견성 확인 |
| 3 | public 배포 게이트와 실행/보류 판단 | 기술 기록 Stage 3 섹션, `mydocs/working/task_m040_52_stage3.md` | 별도 승인 근거, 배포 실행 결과 또는 보류 사유, 대체 설치 경로 확인 |
| 4 | cleanup, 최종 검증, 보고 | `mydocs/report/task_m040_52_report.md`, `mydocs/working/task_m040_52_stage4.md` | cleanup 상태, 수용 기준 대응, 최종 검증 명령 통과 |

## Stage 1 - 공식 문서와 배포 후보 재확인

### 산출물

신규:

- `mydocs/tech/task_m040_52_codex_plugin_public_smoke.md`
- `mydocs/working/task_m040_52_stage1.md`

수정:

- `mydocs/orders/20260517.md`

### 변경 내용

- OpenAI Codex plugin 공식 문서에서 Plugin Directory, marketplace, public distribution, manifest/interface metadata 관련 현재 요건을 재확인한다.
- local Codex CLI version과 `codex plugin` command surface를 확인한다.
- #38 최종 보고서와 기술 기록에서 repo-local candidate, local marketplace smoke, UI discovery 미확인 항목을 baseline으로 가져온다.
- `plugins/hyper-waterfall-codex/`와 `.agents/plugins/marketplace.json`의 현재 구조를 점검한다.
- public 배포 전에 필요한 metadata, asset, screenshot, privacy/terms URL, legal link가 있는지 확인하고 현재 후보와의 gap을 기록한다.
- Stage 2에서 실제로 확인 가능한 UI/CLI discovery 범위와 수동 확인이 필요한 범위를 분리한다.

### 검증

```bash
codex --version
codex plugin --help
codex plugin marketplace --help
codex plugin marketplace add --help
jq . plugins/hyper-waterfall-codex/.codex-plugin/plugin.json
jq . .agents/plugins/marketplace.json
find plugins/hyper-waterfall-codex -maxdepth 5 -type f | sort
rg -n '#38|Plugin Directory|UI discovery|Skill invocation|public 배포|보류|marketplace|cleanup' mydocs/report/task_m040_38_report.md mydocs/tech/task_m040_38_codex_plugin_smoke.md
rg -n 'OpenAI|Codex|plugin|marketplace|public|distribution|Plugin Directory|확인일|metadata|asset|legal|privacy|terms' mydocs/tech/task_m040_52_codex_plugin_public_smoke.md mydocs/working/task_m040_52_stage1.md
git diff --check
```

수동 확인:

- 공식 문서 URL과 확인일이 기술 기록에 남았는지 확인한다.
- public 배포 실행 조건을 확인 완료로 오인하지 않고, 승인 게이트로 분리했는지 확인한다.
- #38에서 이미 검증된 local smoke와 이번 task에서 새로 확인할 UI discovery를 구분했는지 확인한다.

### 커밋

```text
Task #52 Stage 1: Codex plugin public 배포 기준 재확인
```

## Stage 2 - UI discovery와 Skill invocation smoke

### 산출물

신규:

- `mydocs/working/task_m040_52_stage2.md`

수정:

- `mydocs/tech/task_m040_52_codex_plugin_public_smoke.md`
- `plugins/hyper-waterfall-codex/README.md`는 smoke 절차 보강이 필요한 경우에만 수정
- `plugins/hyper-waterfall-codex/skills/hyper-waterfall/SKILL.md`는 발견성 문구 보강이 필요한 경우에만 수정
- `mydocs/orders/20260517.md`

### 변경 내용

- repo root에서 `codex plugin marketplace add .`를 실행해 local marketplace registration을 재확인한다.
- 가능한 경우 Codex Plugin Directory UI 또는 CLI `/plugins`에서 `hyper-waterfall` plugin 후보가 보이는지 확인한다.
- 가능한 경우 wrapper Skill invocation 또는 prompt discovery를 smoke한다.
- UI/interactive 확인이 불가능하면 실행한 명령, 확인 가능한 화면/출력, 제한 사유, 수동 재현 절차를 기술 기록에 남긴다.
- `codex plugin marketplace remove hyper-waterfall-local`로 local registration cleanup을 수행한다.
- cleanup 검증 수단이 CLI surface에 없으면 remove 결과와 잔여 한계를 기록한다.

### 검증

```bash
codex plugin marketplace add .
codex plugin marketplace remove hyper-waterfall-local
rg -n 'hyper-waterfall|Plugin Directory|/plugins|Skill invocation|prompt discovery|manual|수동|cleanup|remove|add' mydocs/tech/task_m040_52_codex_plugin_public_smoke.md mydocs/working/task_m040_52_stage2.md
git diff --check
```

조건부 확인:

```text
Codex Plugin Directory UI 또는 CLI /plugins에서 hyper-waterfall 후보 표시 확인
thin wrapper Skill invocation 또는 prompt discovery 확인
```

수동 확인:

- marketplace add/remove가 사용자 local config/cache를 변경했는지와 cleanup 결과를 구분해 기록한다.
- UI discovery가 성공, 실패, 제한 중 어느 상태인지 명확히 쓴다.
- wrapper Skill을 실행하지 못했다면 실행한 것으로 쓰지 않고 재현 절차와 한계를 남긴다.

### 커밋

```text
Task #52 Stage 2: Codex plugin UI discovery smoke 정리
```

## Stage 3 - public 배포 게이트와 실행/보류 판단

### 산출물

신규:

- `mydocs/working/task_m040_52_stage3.md`

수정:

- `mydocs/tech/task_m040_52_codex_plugin_public_smoke.md`
- `plugins/hyper-waterfall-codex/.codex-plugin/plugin.json`은 metadata 보강이 승인되고 필요한 경우에만 수정
- `plugins/hyper-waterfall-codex/README.md`는 public 배포 또는 보류 안내 보강이 필요한 경우에만 수정
- `mydocs/orders/20260517.md`

### 변경 내용

- Stage 1-2 결과를 기준으로 public 배포 GO/NO-GO를 판단한다.
- public 배포 실행은 작업지시자의 별도 명시 승인이 있는 경우에만 수행한다.
- 별도 승인이 있으면 배포 명령, 권한, 결과 URL/상태, 후속 검증을 기술 기록과 단계 보고서에 남긴다.
- 별도 승인이 없거나 요건이 부족하면 public 배포를 보류하고 보류 사유, 필요한 추가 산출물, 대체 설치/사용 경로를 문서화한다.
- metadata, asset, screenshot, legal link 보강이 필요하지만 이번 task에서 확정할 수 없으면 후속 작업 후보로 분리한다.

### 검증

```bash
rg -n 'public 배포|GO|NO-GO|승인|보류|metadata|asset|screenshot|privacy|terms|대체 설치|fallback' mydocs/tech/task_m040_52_codex_plugin_public_smoke.md mydocs/working/task_m040_52_stage3.md plugins/hyper-waterfall-codex/README.md
git diff --check
```

조건부 검증:

```text
작업지시자가 public 배포를 별도 승인한 경우에만 배포 명령 실행과 결과 URL/상태 확인
```

수동 확인:

- 수행계획서 승인과 public 배포 승인을 혼동하지 않는다.
- 배포를 실행했다면 승인 문구, 실행 계정/권한, 결과 확인 방법을 기록한다.
- 배포를 보류했다면 보류 사유와 대체 경로가 #52 수용 기준을 충족하는지 확인한다.

### 커밋

```text
Task #52 Stage 3: Codex plugin public 배포 판단 정리
```

## Stage 4 - cleanup, 최종 검증, 보고

### 산출물

신규:

- `mydocs/working/task_m040_52_stage4.md`
- `mydocs/report/task_m040_52_report.md`

수정:

- `mydocs/tech/task_m040_52_codex_plugin_public_smoke.md`
- `mydocs/orders/20260517.md`

### 변경 내용

- Stage 1-3 결과를 수용 기준별로 정리한다.
- local config/cache cleanup이 완료됐는지 또는 잔여 상태가 무엇인지 최종 확인한다.
- Codex Plugin Directory UI discovery 결과, Skill invocation 결과, public 배포 실행/보류 판단, 대체 경로를 최종 보고서에 연결한다.
- 추가 metadata나 asset이 필요하면 구체적인 후속 작업 후보로 남긴다.
- 모든 산출물의 문서 링크, 이슈 번호, 마일스톤 표기를 확인한다.

### 검증

```bash
rg -n 'public 배포|Plugin Directory|UI discovery|Skill invocation|보류|cleanup|hyper-waterfall|#52|수용 기준' mydocs/tech/task_m040_52_codex_plugin_public_smoke.md mydocs/report/task_m040_52_report.md mydocs/working/task_m040_52_stage4.md
rg -n 'hyper-waterfall|marketplace|plugin.json|README|Skill|public|fallback' plugins/hyper-waterfall-codex .agents/plugins/marketplace.json
git diff --check
```

수동 확인:

- 최종 보고서가 #52 수용 기준을 모두 대응하는지 확인한다.
- public 배포를 실행했으면 결과 URL/상태와 실패 시 회복 상태를 기록했는지 확인한다.
- public 배포를 보류했으면 보류 근거와 대체 설치/사용 경로가 재현 가능한지 확인한다.

### 커밋

```text
Task #52 Stage 4: Codex plugin public smoke 최종 보고
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 공식 문서 확인은 OpenAI 공식 출처를 우선하고, 확인일과 URL을 산출물에 기록한다.
- 네트워크 또는 도구 접근 문제로 공식 문서를 확인하지 못하면 해당 항목을 미확인으로 기록하고 public 배포 판단을 보류한다.
- user config/cache를 변경하는 smoke는 실행 전 변경 범위를 기록하고 실행 후 cleanup 여부를 보고한다.
- public 배포는 별도 승인 없이 실행하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 구현계획서 자체는 별도 커밋 `Task #52: 구현계획서 작성`으로 남긴다.
- 단계 커밋은 해당 단계 산출물과 `mydocs/working/task_m040_52_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #52 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서는 Stage 4 산출물과 함께 묶고, PR 게시 직전 `task-final-report` 절차에서 최종 상태를 확인한다.

## 단계 의존성

- Stage 1은 구현계획서 승인 후 진행한다.
- Stage 2는 Stage 1에서 public 배포 요건과 현재 후보 gap을 확인한 뒤 진행한다.
- Stage 3은 Stage 2의 UI discovery와 Skill invocation smoke 결과를 기준으로 진행한다.
- Stage 4는 Stage 3의 public 배포 실행/보류 판단과 cleanup 상태가 정리된 뒤 진행한다.
- public 배포 실행, 추가 asset 제작, release snapshot bundle 전환이 필요하면 별도 승인 후 계획을 갱신한다.

## 위험과 대응

- **Codex 사양 변동**: Stage 1에서 공식 문서와 local CLI surface를 다시 확인하고, #38 후보와 차이가 있으면 구현계획 갱신 승인 후 반영한다.
- **UI 확인 한계**: Codex restart나 interactive Plugin Directory가 필요하면 자동 검증 대신 수동 재현 절차와 확인 한계를 남긴다.
- **local smoke 부작용**: user config/cache 변경이 필요한 명령은 실행 결과와 cleanup을 같은 Stage에서 기록한다.
- **public 배포 오해**: 수행계획서와 구현계획서 승인은 public 배포 승인이 아니다. public 배포 실행은 별도 명시 승인이 있을 때만 수행한다.
- **install-surface 부족**: metadata, asset, screenshot, legal link가 부족하면 배포를 보류하거나 최소 보강 범위만 별도 승인 후 반영한다.
- **canonical drift**: wrapper Skill과 README는 canonical Skill/manual/manifest를 재작성하지 않고 경로와 fallback만 안내한다.

## 승인 요청 사항

- Stage 1-4 분할, 산출물, 검증 명령, 커밋 메시지 형식을 승인할지 확인한다.
- Stage 2에서 `codex plugin marketplace add .`와 `remove hyper-waterfall-local`을 실행해 local config/cache 변경 가능성이 있는 smoke를 수행하는 방향을 승인할지 확인한다.
- Stage 3에서 public 배포는 별도 명시 승인 없이는 실행하지 않고, 보류 사유와 대체 설치 경로를 남기는 방향을 승인할지 확인한다.
