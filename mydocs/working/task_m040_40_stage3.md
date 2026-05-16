# Task #40 Stage 3 보고서 - Claude plugin local smoke 결과 정리

GitHub Issue: [#40](https://github.com/postmelee/hyper-waterfall/issues/40)
구현계획서: [`task_m040_40_impl.md`](../plans/task_m040_40_impl.md)
Stage: 3

## 단계 목적

Stage 3은 Stage 2에서 만든 Claude plugin 후보를 local validation과 discovery smoke로 확인하는 단계다.

이번 단계에서는 `claude plugin validate`, `--plugin-dir` session-only plugin load, fallback 경로를 확인했다. Claude Code 업데이트는 시도했지만 완료되지 않아 zip smoke는 수행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_40_claude_plugin_candidate_smoke.md` | Stage 3 결과 추가: Claude update 시도, validation 통과, directory load, debug 기반 Skill load, fallback, zip smoke 보류 |
| `plugins/claude/hyper-waterfall/README.md` | framework 저장소 내부에서 `npx` fallback을 검증할 때 package name resolution 영향이 있을 수 있음을 보강하고, zip smoke를 업데이트 후 별도 검증으로 보정 |
| `plugins/claude/hyper-waterfall/CHANGELOG.md` | zip smoke를 Stage 3 완료 항목이 아니라 업데이트 후 별도 검증 항목으로 보정 |
| `mydocs/orders/20260516.md` | #40 비고를 Stage 3 완료와 Stage 4 승인 대기 상태로 갱신 |
| `mydocs/working/task_m040_40_stage3.md` | Stage 3 목적, 산출물, 검증 결과, 잔여 위험, 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

기존 plugin 후보 구조와 wrapper Skill 본문은 유지했다. Stage 3에서 확인된 `npx` fallback 환경 차이를 README에 1문단 추가했고, zip smoke 미수행 결과에 맞춰 README와 CHANGELOG의 문구를 보정했다.

debug log와 `latest` symlink는 검증 과정에서 생성됐지만, 결과 확인 후 커밋 대상에서 제외하고 정리했다.

## 검증 결과

실행 명령:

```bash
claude --version
claude update
claude --version
/opt/homebrew/bin/timeout 15s claude plugin validate plugins/claude/hyper-waterfall
/opt/homebrew/bin/timeout 15s claude --bare plugin validate plugins/claude/hyper-waterfall
/opt/homebrew/bin/timeout 15s claude plugin validate plugins/claude/hyper-waterfall/.claude-plugin/plugin.json
/opt/homebrew/bin/timeout 15s claude --plugin-dir plugins/claude/hyper-waterfall plugin list
/opt/homebrew/bin/timeout 15s claude --plugin-dir plugins/claude/hyper-waterfall plugin validate plugins/claude/hyper-waterfall
/opt/homebrew/bin/timeout 15s claude --plugin-dir plugins/claude/hyper-waterfall --debug-file /private/tmp/hyper-waterfall-task40/claude-plugin-debug.log --print '/help'
claude --help
claude plugin --help
npx hyper-waterfall@0.2.0 --help
npm view hyper-waterfall@0.2.0 bin version --json
npm pack hyper-waterfall@0.2.0 --dry-run --json
test -L .claude/skills
test -f docs/agent-entrypoint.md
rg -n 'validate|--plugin-dir|discovery|namespaced|fallback|npx hyper-waterfall|실패|보류' mydocs/tech/task_m040_40_claude_plugin_candidate_smoke.md plugins/claude/hyper-waterfall/README.md
git diff --check
```

결과:

- OK: `claude --version`은 업데이트 전후 모두 `2.1.111 (Claude Code)`였다.
- MISS: `claude update`는 `Checking for updates to latest version...` 이후 30초 이상 무응답이라 중단했다. 따라서 zip smoke version 조건을 충족하지 못했다.
- OK: `claude plugin validate plugins/claude/hyper-waterfall`는 timeout 적용 재실행에서 `Validation passed`를 출력했다.
- OK: `claude --bare plugin validate`도 `Validation passed`를 출력했다.
- OK: manifest file path 직접 validation도 `Validation passed`를 출력했다.
- OK: `claude --plugin-dir plugins/claude/hyper-waterfall plugin list`에서 session-only plugin `hyper-waterfall@inline`, version `0.2.0-candidate.1`, status `loaded`가 확인됐다.
- OK: `claude --plugin-dir ... plugin validate`도 `Validation passed`를 출력했다.
- OK: debug log에서 inline plugin 로드, session-only plugin 1개, plugin Skill 1개 로드가 확인됐다.
- MISS: `/help` print smoke는 `/help isn't available in this environment.`를 출력해 slash command UI discovery는 비대화식 환경에서 확인하지 못했다.
- OK: `claude --help`와 `claude plugin --help`에서 `--plugin-dir`, `--print`, `update`, `plugin validate` 등 필요한 CLI surface가 확인됐다.
- OK: `.claude/skills` symlink와 `docs/agent-entrypoint.md`가 존재한다.
- OK: `/private/tmp`에서 `npx hyper-waterfall@0.2.0 --help`는 CLI help를 출력했다.
- OK: npm metadata와 pack dry-run에서 `bin/hyper-waterfall.js`가 확인됐다.
- MISS: framework repo root에서 같은 `npx` 명령은 `sh: hyper-waterfall: command not found`로 실패했다. package name이 같은 repository 내부 local resolution 영향으로 판단해 README에 보강했다.
- OK: `rg`에서 validation, `--plugin-dir`, discovery, namespaced, fallback, `npx hyper-waterfall`, 실패, 보류 관련 기록이 확인됐다.
- OK: `git diff --check`는 출력 없이 통과했다.

## 잔여 위험

- zip smoke는 local Claude Code update가 완료되지 않아 수행하지 못했다.
- slash command UI에서 `/hyper-waterfall:hyper-waterfall` 호출이 보이는지는 비대화식 환경에서 직접 확인하지 못했다.
- `claude plugin validate`는 timeout 없이 한 번 대기했으므로, automated smoke에는 timeout을 적용하는 편이 안전하다.
- framework repo root 내부의 `npx` fallback은 package name 충돌 영향이 있어 대상 저장소 밖 검증 결과로 보완했다.

## 다음 단계 영향

- Stage 4는 public 배포 판단에서 zip smoke 미수행과 slash command UI discovery 미확인을 제한 사항으로 남겨야 한다.
- Stage 4는 local directory candidate는 GO, public/zip 배포는 version update 후 재검증 필요로 정리하는 방향이 적절하다.
- 작업지시자가 별도 환경에서 Claude Code를 v2.1.128 이상으로 업데이트하면 Stage 4 또는 후속 task에서 zip archive smoke를 추가할 수 있다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4로 진행한다.
