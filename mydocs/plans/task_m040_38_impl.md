# Task #38 구현계획서 - Codex plugin 배포 후보 생성과 설치 smoke

수행계획서: [`task_m040_38.md`](task_m040_38.md)
GitHub Issue: [#38](https://github.com/postmelee/hyper-waterfall/issues/38)
마일스톤: M040

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | 사양과 smoke 환경 재확인 | `mydocs/tech/task_m040_38_codex_plugin_smoke.md`, `mydocs/working/task_m040_38_stage1.md` | OpenAI 공식 문서 확인일, local Codex CLI/plugin marketplace surface, #37 인계 조건 확인 |
| 2 | hook 없는 thin wrapper bundle 생성 | `plugins/hyper-waterfall-codex/`, `mydocs/working/task_m040_38_stage2.md` | manifest JSON, plugin root 내부 path, wrapper fallback/canonical 참조 확인 |
| 3 | local marketplace와 install/load/discovery smoke | `.agents/plugins/marketplace.json`, `mydocs/working/task_m040_38_stage3.md` | marketplace JSON, local add/install/load 가능 여부, cleanup 필요 여부 확인 |
| 4 | fallback, 배포 판단, 최종 보고 | `mydocs/tech/task_m040_38_codex_plugin_smoke.md`, `mydocs/working/task_m040_38_stage4.md`, `mydocs/report/task_m040_38_report.md` | public 배포 go/no-go, fallback, 최종 수용 기준 확인 |

## Stage 1 - 사양과 smoke 환경 재확인

### 산출물

신규:

- `mydocs/tech/task_m040_38_codex_plugin_smoke.md`
- `mydocs/working/task_m040_38_stage1.md`

수정:

- `mydocs/orders/20260516.md`

### 변경 내용

- OpenAI Codex plugin 공식 문서와 hooks 공식 문서를 다시 확인하고 확인일, URL, #38에 적용할 packaging/install 조건을 기록한다.
- local Codex CLI의 plugin command surface를 확인한다.
- #37 인계 조건 중 `thin wrapper`, `local marketplace`, `install/load smoke`, hook 제외, public 배포 보류 조건을 Stage 1 산출물에 연결한다.
- 이번 task에서 실제로 smoke 가능한 항목과 Codex app restart 또는 user config 접근 때문에 제한되는 항목을 구분한다.
- Stage 2 bundle에 적용할 manifest field, plugin version, component path, wrapper 책임 범위를 확정 후보로 둔다.

### 검증

```bash
codex --version
codex plugin --help
codex plugin marketplace --help
codex plugin marketplace add --help
rg -n '#38|thin wrapper|local marketplace|install/load|smoke|GO|NO-GO|hook 없는|hook 포함|public 배포' mydocs/tech/task_m040_37_codex_plugin_packaging_validation.md mydocs/report/task_m040_37_report.md
rg -n 'OpenAI|Codex|plugin|hook|확인일|URL|local marketplace|install|load|smoke|재확인' mydocs/tech/task_m040_38_codex_plugin_smoke.md mydocs/working/task_m040_38_stage1.md
git diff --check
```

수동 확인:

- 공식 문서 확인일과 URL이 Stage 1 산출물에 기록됐는지 확인한다.
- #37의 hook 없는 thin wrapper GO 판단을 변경 없이 이어받는지 확인한다.
- 확인하지 못한 install/load 항목을 실행 완료처럼 쓰지 않았는지 확인한다.

### 커밋

```text
Task #38 Stage 1: Codex plugin smoke 환경 재확인
```

## Stage 2 - hook 없는 thin wrapper bundle 생성

### 산출물

신규:

- `plugins/hyper-waterfall-codex/.codex-plugin/plugin.json`
- `plugins/hyper-waterfall-codex/skills/hyper-waterfall/SKILL.md`
- `plugins/hyper-waterfall-codex/README.md`
- `mydocs/working/task_m040_38_stage2.md`

수정:

- `mydocs/tech/task_m040_38_codex_plugin_smoke.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- `plugins/hyper-waterfall-codex/` 아래에 Codex plugin 후보를 생성한다.
- `.codex-plugin/plugin.json`에 `name`, `version`, `description`, `repository`, `license`, `keywords`, `skills`, `interface` 정보를 작성한다.
- `skills` path는 plugin root 내부 `./skills/`만 가리키게 한다.
- thin wrapper Skill은 Hyper-Waterfall의 canonical source가 아님을 명시하고, 현재 repo의 `AGENTS.md`, `mydocs/skills/{skill-name}/SKILL.md`, `docs/agent-entrypoint.md`, npm CLI dry-run으로 사용자를 안내한다.
- wrapper는 `task-start`, `task-stage-report`, `task-final-report` 같은 core Skill 절차를 요약 재작성하지 않는다.
- README는 local candidate 설치/검증 목적과 public 배포 전 승인 게이트를 설명한다.
- `templates/manifest.json`, migration guide, manual 전문, core Skill fork는 bundle에 포함하지 않는다.

### 검증

```bash
find plugins/hyper-waterfall-codex -maxdepth 5 -type f | sort
jq . plugins/hyper-waterfall-codex/.codex-plugin/plugin.json
rg -n 'AGENTS.md|mydocs/skills|docs/agent-entrypoint.md|npx hyper-waterfall|승인|canonical|진실 원천|not a canonical source|not execute public' plugins/hyper-waterfall-codex
test ! -e plugins/hyper-waterfall-codex/templates/manifest.json
test ! -d plugins/hyper-waterfall-codex/docs/migrations
test ! -d plugins/hyper-waterfall-codex/templates/mydocs/manual
git diff --check
```

수동 확인:

- plugin manifest path가 plugin root 밖을 참조하지 않는지 확인한다.
- thin wrapper가 core Skill 본문을 fork하거나 절차를 재정의하지 않는지 확인한다.
- hook 관련 파일이나 `[features].plugin_hooks = true` 요구 항목이 기본 bundle에 포함되지 않았는지 확인한다.

### 커밋

```text
Task #38 Stage 2: Codex thin wrapper bundle 생성
```

## Stage 3 - local marketplace와 install/load/discovery smoke

### 산출물

신규:

- `.agents/plugins/marketplace.json`
- `mydocs/working/task_m040_38_stage3.md`

수정:

- `mydocs/tech/task_m040_38_codex_plugin_smoke.md`
- `mydocs/orders/20260516.md`
- 필요 시 `plugins/hyper-waterfall-codex/README.md`

### 변경 내용

- repo-local marketplace 후보 `.agents/plugins/marketplace.json`을 작성한다.
- marketplace `source.path`는 plugin bundle 위치를 가리키되, #37에서 확인한 local marketplace root 상대 path 규칙을 따른다.
- 가능한 경우 repo root를 marketplace root로 두고 `codex plugin marketplace add` 흐름을 실행해 local marketplace add 또는 install/load surface를 확인한다.
- Codex CLI 또는 app이 plugin install/load/discovery를 지원하지 않거나 restart/user config 접근이 필요한 경우, 실패 조건과 필요한 수동 확인을 기록한다.
- smoke 중 user config, plugin cache, local marketplace registration을 변경했다면 변경 위치와 cleanup 절차를 기록한다.
- wrapper Skill discoverability가 충분하지 않으면 release snapshot 후보 검토 필요성을 Stage 4로 넘긴다.

### 검증

```bash
jq . .agents/plugins/marketplace.json
rg -n 'hyper-waterfall|hyper-waterfall-codex|local|source|path|AVAILABLE|Productivity' .agents/plugins/marketplace.json
codex plugin marketplace add --help
rg -n 'marketplace|install|load|discovery|cache|config|cleanup|restart|성공|실패|보류' mydocs/tech/task_m040_38_codex_plugin_smoke.md mydocs/working/task_m040_38_stage3.md
git diff --check
```

조건부 검증:

```bash
codex plugin marketplace add .
```

수동 확인:

- 조건부 검증 명령은 local config/cache 변경이 허용되는 경우에만 실행한다.
- add/install/load 결과가 성공인지, 제한된 smoke인지, 실행 불가인지 명확히 구분한다.
- cleanup이 필요한 변경을 남기고 단계 완료로 처리하지 않는다.

### 커밋

```text
Task #38 Stage 3: Codex local marketplace smoke 검증
```

## Stage 4 - fallback, 배포 판단, 최종 보고

### 산출물

신규:

- `mydocs/working/task_m040_38_stage4.md`
- `mydocs/report/task_m040_38_report.md`

수정:

- `mydocs/tech/task_m040_38_codex_plugin_smoke.md`
- 필요 시 `docs/distribution-channels.md`
- 필요 시 `docs/plugin-distribution-principles.md`
- `mydocs/orders/20260516.md`

### 변경 내용

- Stage 1-3 결과를 종합해 public 배포 go/no-go를 정리한다.
- local smoke가 통과하면 public 배포를 즉시 실행하지 않고 별도 승인 요청 조건을 기록한다.
- local smoke가 제한되거나 실패하면 보류 사유, 대체 설치/사용 경로, 필요한 후속 작업을 기록한다.
- fallback 경로를 확인한다: `AGENTS.md`, `docs/agent-entrypoint.md`, `templates/mydocs/skills`, npm CLI `npx hyper-waterfall@0.2.0 --help`.
- Codex 사용자가 Hyper-Waterfall 시작 지점과 core Skill 흐름을 발견할 수 있는지 문서와 plugin wrapper 기준으로 점검한다.
- 최종 보고서를 작성하고 #38 수용 기준과 검증 결과를 연결한다.
- 공통 배포 문서 갱신이 필요한 경우에만 `docs/distribution-channels.md` 또는 `docs/plugin-distribution-principles.md`를 좁게 수정한다.

### 검증

```bash
npx hyper-waterfall@0.2.0 --help
rg -n 'public 배포|go/no-go|보류|fallback|AGENTS|agent-entrypoint|npm CLI|#38|install|load|discovery' mydocs/tech/task_m040_38_codex_plugin_smoke.md mydocs/report/task_m040_38_report.md
rg -n 'Codex plugin|hyper-waterfall-codex|marketplace|plugin.json|thin wrapper' docs plugins .agents mydocs/report/task_m040_38_report.md
git diff --check
```

수동 확인:

- 최종 보고서가 issue #38 수용 기준을 모두 대응하는지 확인한다.
- public 배포를 실행했다면 별도 승인 근거와 실행 결과가 기록됐는지 확인한다.
- public 배포를 보류했다면 보류 사유와 대체 경로가 명확한지 확인한다.

### 커밋

```text
Task #38 Stage 4: Codex plugin smoke 결과와 배포 판단 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 공식 문서 확인은 OpenAI 공식 출처를 우선하고, 확인일과 URL을 산출물에 기록한다.
- 네트워크 또는 도구 접근 문제로 공식 문서를 확인하지 못하면 해당 항목을 미확인으로 기록하고 Stage 2 bundle 설계를 확정하지 않는다.
- user config/cache를 변경하는 smoke는 실행 전 변경 범위를 확인하고, 실행 후 cleanup 여부를 보고한다.
- public 배포는 별도 승인 없이 실행하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.

## 커밋

- 구현계획서 자체는 별도 커밋 `Task #38: 구현계획서 작성`으로 남긴다.
- 단계 커밋은 해당 단계 산출물과 `mydocs/working/task_m040_38_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #38 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서는 `task-final-report` 절차에서 Stage 4 산출물과 함께 묶거나 별도 완료 처리 커밋으로 처리한다.

## 단계 의존성

- Stage 1은 구현계획서 승인 후 진행한다.
- Stage 2는 Stage 1에서 manifest/path/install 조건을 재확인한 뒤 진행한다.
- Stage 3은 Stage 2 bundle 후보가 검증된 뒤 진행한다.
- Stage 4는 Stage 3의 smoke 결과와 cleanup 상태가 정리된 뒤 진행한다.
- hook 포함 smoke 또는 public 배포 실행이 필요하면 별도 승인 후 계획을 갱신한다.

## 위험과 대응

- **Codex 사양 변동**: Stage 1에서 공식 문서와 local CLI surface를 다시 확인하고, #37 후보와 차이가 있으면 구현계획 갱신 승인 후 반영한다.
- **local smoke 부작용**: user config/cache 변경이 필요한 명령은 조건부 검증으로 두고, 실행 시 cleanup 기록을 남긴다.
- **canonical drift**: wrapper Skill과 README는 canonical Skill/manual/manifest를 재작성하지 않고 경로와 fallback만 안내한다.
- **public 배포 오해**: local smoke 성공은 public 배포 승인과 별개다. public 배포 실행은 별도 승인 게이트로 둔다.
- **discoverability 부족**: thin wrapper만으로 core workflow 발견성이 낮으면 release snapshot 후보를 Stage 4 보류/후속 작업으로 기록한다.
- **network 제약**: `npx hyper-waterfall@0.2.0 --help`나 Codex official docs 확인이 네트워크 제약으로 실패하면 실패 원인과 대체 확인 범위를 보고한다.

## 승인 요청 사항

- Stage 1-4 분할, 산출물, 검증 명령, 커밋 메시지에 동의?
- Stage 2의 기본 bundle을 hook 없는 thin wrapper로 만들고 hook 포함은 제외하는 데 동의?
- Stage 3의 `codex plugin marketplace add .`는 local config/cache 변경 가능성이 있으므로 실행 전 단계 보고에서 조건부 승인 항목으로 다루는 데 동의?
- Stage 4에서 public 배포는 smoke 결과와 별도 승인 없이는 실행하지 않는 데 동의?
- smoke 실패 또는 제한 시 우회 구현 대신 보류 사유와 대체 경로를 최종 보고서에 남기는 데 동의?
