# Task #38 Stage 3 보고서 - local marketplace와 install/load/discovery smoke

GitHub Issue: [#38](https://github.com/postmelee/hyper-waterfall/issues/38)
구현계획서: [`task_m040_38_impl.md`](../plans/task_m040_38_impl.md)
Stage: 3

## 단계 목적

Stage 3은 Stage 2에서 만든 Codex plugin 후보를 repo-local marketplace에 연결하고, Codex CLI에서 local marketplace add smoke가 가능한지 확인하는 단계다. 실제 public 배포는 이 단계 범위가 아니며, plugin UI discovery가 자동 검증되지 않으면 그 한계를 기록한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `.agents/plugins/marketplace.json` | repo-local marketplace 후보 생성. `hyper-waterfall-local` marketplace가 `./plugins/hyper-waterfall-codex`를 가리킴 |
| `mydocs/tech/task_m040_38_codex_plugin_smoke.md` | Stage 3 marketplace 구조, CLI add smoke, upgrade 한계, cleanup 결과 추가 |
| `mydocs/working/task_m040_38_stage3.md` | Stage 3 단계 보고서 작성 |
| `mydocs/orders/20260516.md` | #38 비고를 Stage 3 완료 후 승인 대기 상태로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

Stage 3은 repo-local marketplace candidate를 새로 추가하고 smoke 결과를 문서화했다. Stage 2 plugin bundle 본문은 수정하지 않았다. 기존 manual, core Skill, manifest, migration guide 본문도 변경하지 않았다.

## 검증 결과

실행 명령:

```bash
jq . .agents/plugins/marketplace.json
rg -n 'hyper-waterfall|hyper-waterfall-codex|local|source|path|AVAILABLE|Productivity' .agents/plugins/marketplace.json
codex plugin marketplace add --help
codex plugin marketplace add .
codex plugin marketplace upgrade hyper-waterfall-local
codex plugin marketplace remove hyper-waterfall-local
rg -n 'marketplace|install|load|discovery|cache|config|cleanup|restart|성공|실패|보류' mydocs/tech/task_m040_38_codex_plugin_smoke.md mydocs/working/task_m040_38_stage3.md
git diff --check
```

결과:

- OK: `jq`가 `.agents/plugins/marketplace.json`을 정상 JSON으로 파싱했다.
- OK: `rg`로 marketplace name, plugin name, local source, path, `AVAILABLE`, `Productivity` metadata를 확인했다.
- OK: `codex plugin marketplace add --help`에서 local marketplace root directory source 지원을 확인했다.
- OK: `codex plugin marketplace add .`가 `hyper-waterfall-local` marketplace를 `/private/tmp/hyper-waterfall-task38`에서 추가했다고 출력했다.
- OK with limit: `codex plugin marketplace upgrade hyper-waterfall-local`은 local marketplace가 Git marketplace가 아니므로 `not configured as a Git marketplace` 오류를 냈다. 이 오류는 local source 구조 실패가 아니라 upgrade 명령의 적용 범위 한계로 기록했다.
- OK: `codex plugin marketplace remove hyper-waterfall-local`로 smoke 후 registration cleanup을 완료했다.
- OK: Stage 3 기술 노트와 보고서에서 marketplace, install/load/discovery, cache/config cleanup, restart, 성공/실패/보류 관련 항목을 확인했다.
- OK: `git diff --check`가 출력 없이 통과했다.

수동 확인:

- OK: `.agents/plugins/marketplace.json`의 `source.path`는 marketplace root 기준 `./plugins/hyper-waterfall-codex`다.
- OK: CLI add smoke는 성공했지만 Codex restart 후 Plugin Directory 또는 CLI `/plugins` UI discovery는 자동화하지 않았다.
- OK: cleanup이 필요한 local registration은 remove 명령으로 제거했다.

## 잔여 위험

- 실제 Codex app/CLI interactive Plugin Directory에서 plugin이 어떻게 표시되는지는 restart/UI 확인이 필요하다.
- CLI add는 marketplace 등록 smoke이며, plugin Skill invocation까지 자동 확인하지는 못했다.
- marketplace list 명령이 없어 remove 이후 등록 목록이 비었는지는 CLI output 외 추가 검증을 하지 못했다.

## 다음 단계 영향

- Stage 4는 public 배포 판단을 "repo-local marketplace add smoke 성공, UI discovery 수동 확인 필요"로 정리해야 한다.
- Stage 4는 fallback 경로와 npm CLI help를 확인해, plugin discovery가 제한돼도 사용자 진입 경로가 유지되는지 판단해야 한다.
- Thin wrapper discoverability가 부족하면 release snapshot bundle 후보를 후속 리스크로 남겨야 한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4 - fallback, 배포 판단, 최종 보고로 진행한다.
