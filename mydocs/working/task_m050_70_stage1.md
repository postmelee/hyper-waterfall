# 적용·업데이트 workflow에 locale 선택 절차 연결 Stage 1 완료보고서

GitHub Issue: [#70](https://github.com/postmelee/hyper-waterfall/issues/70)
구현계획서: [`task_m050_70_impl.md`](../plans/task_m050_70_impl.md)
Stage: 1

## 단계 목적

Stage 1의 목적은 신규 적용과 기존 update에서 사용할 locale 선택·저장 계약을 구현 전에 확정하는 것이다. 승인된 선택 locale의 저장 위치를 `.hyper-waterfall/version.json`의 top-level `locale` 필드로 고정하고, 기존 적용 저장소에 locale 기록이 없을 때 `unknown`으로 보고하는 호환 기준을 문서화했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/manifest.json` | `versionState.format.locale` 예시 필드를 추가하고, locale pack availability note에 #70 저장 계약과 #71 smoke/migration 범위를 반영했다. |
| `docs/localization.md` | 신규 적용 locale 기록, 기존 update locale 보존, locale 전환 승인 기준, `versionState.format.locale` 계약을 정책 문서에 추가했다. |
| `docs/lifecycle/adoption.md` | 신규 적용 절차와 판단 결과 형식에서 locale 저장 보류 표현을 제거하고, 승인된 locale을 version state의 `locale`에 기록하도록 바꿨다. |
| `docs/lifecycle/update.md` | 기존 update 진입 조건과 판단 결과 형식에서 top-level `locale` 우선 읽기와 호환 필드 읽기 기준을 명시했다. |
| `mydocs/orders/20260527.md` | #70 진행 상태를 Stage 1 완료, Stage 2 승인 대기로 갱신했다. |

## 본문 변경 정도 / 본문 무손실 여부

문서 본문은 Stage 1 범위에 해당하는 locale 저장 계약 문단만 교체·보강했다. 기존 fallback, locale pack, lifecycle 책임 경계 설명은 유지했고, #71로 남는 smoke 검증과 migration guide 범위도 유지했다.

## 검증 결과

실행 명령:

```bash
rg -n "#70|후속 #70|locale 선택 저장 위치|workflow 실행" docs templates README.md src test
rg -n "\"locale\"|selectedLocale|localization\\.locale" templates/manifest.json src docs templates/mydocs/manual
node -e "JSON.parse(require('fs').readFileSync('templates/manifest.json','utf8')); console.log('manifest json ok')"
git diff --check
npm test
```

결과:

- OK: `templates/manifest.json` JSON parse 통과. `versionState.format.locale`이 확인된다.
- OK: `git diff --check` 통과.
- OK: `npm test` 통과. 9개 테스트 모두 pass.
- OK: `rg` 검증에서 Stage 1 대상 문서의 "locale 저장 보류" 표현은 제거됐다.
- 확인 필요: `docs/agent-entrypoint.md`, `src/commands/update.js`, `docs/lifecycle/update_pr.md`에는 아직 #70 보류 또는 미확정 표현이 남아 있다. 이는 구현계획서상 Stage 2와 Stage 3 대상이므로 이번 Stage의 잔여 작업으로 분리했다.

## 잔여 위험

- CLI는 아직 새 `locale` 계약을 출력 계약에 반영하지 않았다. Stage 2에서 `init/update` dry-run 옵션과 version state 읽기 로직으로 연결해야 한다.
- `docs/agent-entrypoint.md`와 `docs/lifecycle/update_pr.md`의 보류 표현은 Stage 3에서 정리해야 한다.

## 다음 단계 영향

- Stage 2는 `.hyper-waterfall/version.json`의 top-level `locale`을 새 기준으로 구현한다.
- Stage 2는 기존 호환을 위해 `selectedLocale`, `localization.locale`, `localization.selectedLocale` 읽기를 유지하되, 출력의 기본 저장 계약은 `locale`로 설명해야 한다.
- Stage 2에서 `init --locale <locale>`과 `update --locale <locale>` dry-run 판단을 연결한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
