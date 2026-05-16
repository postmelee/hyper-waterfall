# Task #38 Stage 2 보고서 - hook 없는 thin wrapper bundle 생성

GitHub Issue: [#38](https://github.com/postmelee/hyper-waterfall/issues/38)
구현계획서: [`task_m040_38_impl.md`](../plans/task_m040_38_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Stage 1에서 확정한 Codex plugin 사양과 #37 인계 조건을 실제 bundle 후보 파일로 만드는 단계다. 기본 scope는 hook 없는 thin wrapper이며, core Skill, manual, manifest, migration guide를 별도 진실 원천으로 복제하지 않는다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `plugins/hyper-waterfall-codex/.codex-plugin/plugin.json` | Codex plugin required manifest 생성. `skills: "./skills/"`, install-surface metadata, `Read` capability 설정 |
| `plugins/hyper-waterfall-codex/skills/hyper-waterfall/SKILL.md` | Hyper-Waterfall Codex thin wrapper Skill 생성. canonical 파일과 npm CLI dry-run으로 진입하도록 안내 |
| `plugins/hyper-waterfall-codex/README.md` | local candidate 목적, 포함 파일, 설계 원칙, local smoke 후보, public 배포 승인 게이트 설명 |
| `mydocs/tech/task_m040_38_codex_plugin_smoke.md` | Stage 2 bundle 생성 결과와 검증 결과 추가 |
| `mydocs/working/task_m040_38_stage2.md` | Stage 2 단계 보고서 작성 |
| `mydocs/orders/20260516.md` | #38 비고를 Stage 2 완료 후 승인 대기 상태로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

Stage 2는 신규 plugin candidate 파일을 추가했다. 기존 canonical Skill, manual, manifest, migration guide 본문은 수정하거나 복제하지 않았다. 기존 구현계획서는 Stage 1에서 이미 보정됐고, 이번 Stage에서는 변경하지 않았다.

## 검증 결과

실행 명령:

```bash
find plugins/hyper-waterfall-codex -maxdepth 5 -type f | sort
jq . plugins/hyper-waterfall-codex/.codex-plugin/plugin.json
rg -n 'AGENTS.md|mydocs/skills|docs/agent-entrypoint.md|npx hyper-waterfall|승인|canonical|진실 원천|not a canonical source|not execute public' plugins/hyper-waterfall-codex
test ! -e plugins/hyper-waterfall-codex/templates/manifest.json
test ! -d plugins/hyper-waterfall-codex/docs/migrations
test ! -d plugins/hyper-waterfall-codex/templates/mydocs/manual
git diff --check
```

결과:

- OK: `find` 결과는 `.codex-plugin/plugin.json`, `README.md`, `skills/hyper-waterfall/SKILL.md` 세 파일이었다.
- OK: `jq`가 `plugin.json`을 정상 JSON으로 파싱했다.
- OK: wrapper와 README에서 `AGENTS.md`, `mydocs/skills`, `docs/agent-entrypoint.md`, `npx hyper-waterfall`, 승인 게이트, canonical source, 진실 원천, `not a canonical source`, `not execute public` 문구를 확인했다.
- OK: `templates/manifest.json`, `docs/migrations`, `templates/mydocs/manual` 사본이 plugin bundle 안에 없음을 확인했다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: `plugin.json`의 component path는 plugin root 내부 `./skills/`만 가리킨다.
- OK: thin wrapper는 core Skill 본문을 fork하지 않고 canonical 파일과 npm CLI dry-run으로 넘긴다.
- OK: 기본 bundle에 `hooks` field, `hooks/` directory, `[features].plugin_hooks = true` 요구 항목은 없다.

## 잔여 위험

- Thin wrapper가 실제 Codex plugin directory에서 충분히 발견되는지는 Stage 3 smoke 전에는 확인되지 않았다.
- Plugin artifact version `0.2.0`은 framework version과 맞췄지만, public 배포 시 artifact version 의미를 release note나 install-surface copy에서 재확인해야 한다.
- Visual asset은 아직 없다. Codex install surface에서 asset이 필요하면 Stage 4 후속 리스크로 남기거나 별도 작업으로 분리한다.

## 다음 단계 영향

- Stage 3은 `.agents/plugins/marketplace.json`을 만들고 repo root 기준 local marketplace smoke를 설계하면 된다.
- Stage 3의 조건부 실행 후보는 `codex plugin marketplace add .`이며, local config/cache 변경 가능성 때문에 실행 전 승인 항목으로 다시 다뤄야 한다.
- Stage 3에서 discoverability가 부족하면 release snapshot 후보를 Stage 4 보류/후속 항목으로 검토한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 - local marketplace와 install/load/discovery smoke로 진행한다.
