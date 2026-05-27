# 적용·업데이트 workflow에 locale 선택 절차 연결 Stage 2 완료보고서

GitHub Issue: [#70](https://github.com/postmelee/hyper-waterfall/issues/70)
구현계획서: [`task_m050_70_impl.md`](../plans/task_m050_70_impl.md)
Stage: 2

## 단계 목적

Stage 2의 목적은 Stage 1에서 확정한 locale 저장 계약을 CLI dry-run 판단 흐름에 연결하는 것이다. `init`은 명시 locale 요청을 받아 선택 locale과 source 상태를 보고하고, `update`는 기존 version state의 locale 보존과 명시적 locale 전환 요청을 구분해 보고하도록 수정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `src/commands/init.js` | `--locale <locale>` 옵션을 추가하고, 신규 적용 판단 결과에 요청 locale, 선택 locale, 지원 여부, version state `locale` 생성 계획을 출력하도록 연결했다. |
| `src/commands/update.js` | `--locale <locale>` 옵션을 추가하고, version state의 top-level `locale` 우선 읽기, 호환 필드 읽기, 요청 locale 전환 판단, selected source 상태 출력을 연결했다. |
| `test/cli-smoke.test.js` | 명시 locale, unsupported locale, 기존 locale 보존, locale 전환 요청 smoke test를 추가했다. |
| `mydocs/orders/20260527.md` | #70 진행 상태를 Stage 2 완료, Stage 3 승인 대기로 갱신했다. |

## 본문 변경 정도 / 본문 무손실 여부

코드 변경은 CLI dry-run 출력 계약에 한정했다. 실제 repository 파일 적용, symlink 생성, PR 생성 같은 write mode는 추가하지 않았다. 기존 `selectedLocale`, `localization.locale`, `localization.selectedLocale` 호환 읽기는 유지하되, 새 저장 계약은 `.hyper-waterfall/version.json`의 top-level `locale`로 출력한다.

## 검증 결과

실행 명령:

```bash
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale ko --dry-run
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale zh-CN --dry-run
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --locale fr --dry-run
node bin/hyper-waterfall.js update --repo . --manifest templates/manifest.json --from v0.1.0 --to v0.2.0 --dry-run
npm test
git diff --check
```

결과:

- OK: `init --locale ko`와 `init --locale zh-CN`은 `requested`, `selected`, `supported: yes`, `selectedSourceStatus: exists=15`, version state `locale` 생성 계획을 출력했다.
- OK: `init --locale fr`은 `supported: no`, `selectedSourceStatus: missing=15`, `fallbackSourceStatus: exists=15`를 출력했다.
- OK: `update`는 locale 기록이 없는 현재 저장소에서 `locale: unknown`, `storage: .hyper-waterfall/version.json locale`, `selectedForDiff: en`을 출력했다.
- OK: `npm test` 통과. 11개 테스트 모두 pass. 새 테스트는 stored `locale: ko` 보존과 `--locale zh-CN` 전환 요청을 확인한다.
- OK: `git diff --check` 통과.

## 잔여 위험

- `docs/agent-entrypoint.md`와 `docs/lifecycle/update_pr.md`에는 아직 #70 보류 또는 미확정 표현이 남아 있다. Stage 3에서 CLI 출력 계약에 맞춰 정리해야 한다.
- `templates/mydocs/manual/`과 locale mirror 문서는 아직 새 CLI 출력 표현을 반영하지 않았다. Stage 3에서 문서 정합성 검증과 함께 반영한다.

## 다음 단계 영향

- Stage 3은 `init --locale`, `update --locale`, `.hyper-waterfall/version.json locale` 저장 계약을 lifecycle, plugin/distribution, manual 문서에 반영한다.
- Stage 3은 README의 핵심 Skill 표와 `task_workflow_guide.md`의 SKILL 호출 표시 안내 변경 필요 여부를 검토한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3으로 진행한다.
