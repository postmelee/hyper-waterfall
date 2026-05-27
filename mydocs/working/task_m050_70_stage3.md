# 적용·업데이트 workflow에 locale 선택 절차 연결 Stage 3 완료보고서

GitHub Issue: [#70](https://github.com/postmelee/hyper-waterfall/issues/70)
구현계획서: [`task_m050_70_impl.md`](../plans/task_m050_70_impl.md)
Stage: 3

## 단계 목적

Stage 3의 목적은 Stage 1의 locale 저장 계약과 Stage 2의 CLI dry-run 출력 계약을 lifecycle, plugin/distribution, 적용 저장소 manual, locale mirror 문서에 반영하는 것이다. 특히 `docs/agent-entrypoint.md`에 남아 있던 #70 보류 표현을 제거하고, `.hyper-waterfall/version.json`의 top-level `locale`과 `init/update --locale` 판단 흐름을 공식 문서에 연결했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/agent-entrypoint.md` | 신규 적용 시 승인된 locale을 `.hyper-waterfall/version.json`의 top-level `locale`에 기록하고, 기존 update는 `docs/lifecycle/update.md` 기준으로 보존/전환 판단을 수행하도록 정리했다. |
| `docs/lifecycle/update_pr.md` | update PR 본문에 요청 locale 또는 전환 요청, locale 보존/전환 후보, version state `locale` 확인, `unknown` 검증 한계를 포함하도록 보강했다. |
| `docs/plugin-distribution-principles.md` | plugin이 신규 적용과 기존 update에서 locale 판단을 별도 규칙으로 만들지 않고 CLI dry-run과 lifecycle 문서를 안내하도록 정렬했다. |
| `docs/distribution-channels.md` | `.hyper-waterfall/version.json`을 release와 locale 상태 파일로 설명하고, `init/update --locale` dry-run 예시와 channel drift 대응 기준을 추가했다. |
| `README.md`, `README.ko.md`, `README.zh-CN.md` | 적용 후 구조와 기존 update 설명에서 version state가 locale도 기록하고, update 판단이 현재 locale, 요청 locale/전환 요청, locale manifest diff를 포함한다고 맞췄다. |
| `templates/mydocs/manual/document_structure_guide.md` | 적용 version/locale 기록 위치와 `.hyper-waterfall/version.json`의 lifecycle 판단 역할을 명확히 했다. |
| `templates/mydocs/manual/framework_lifecycle_guide.md` | lifecycle 판단 결과와 CLI 출력 필드에 요청 locale, 전환 요청, version state `locale` 기록 계획을 추가했다. |
| `templates/mydocs/manual/release_update_protocol.md` | release/update protocol 입력에 현재 locale 기록, 요청 locale/전환 요청, locale 보존/전환 판단을 추가했다. |
| `templates/locales/en/mydocs/manual/*` | 위 manual 변경을 영어 locale mirror에 반영했다. |
| `templates/locales/ko/mydocs/manual/*` | 위 manual 변경을 한국어 locale mirror에 반영했다. |
| `templates/locales/zh-CN/mydocs/manual/*` | 위 manual 변경을 중국어 간체 locale mirror에 반영했다. |
| `mydocs/orders/20260527.md` | #70 진행 상태를 Stage 3 완료, Stage 4 승인 대기로 갱신했다. |

## 본문 변경 정도 / 본문 무손실 여부

문서 변경은 Stage 1-2에서 확정된 locale 저장/판단 계약을 기존 lifecycle 설명에 추가하는 범위로 제한했다. `templates/mydocs/manual/`과 locale mirror의 기존 절차 의미, core Skill 이름, Skill 호출 시점은 바꾸지 않았다.

README의 "핵심 SKILL"·"도입 후 작업 흐름" 표와 `templates/mydocs/manual/task_workflow_guide.md`의 "SKILL 호출 표시 안내"는 검토했지만 수정하지 않았다. 이번 Stage는 `init/update --locale` 판단 결과와 version state 기록을 문서화한 것이며, 새 Skill을 추가하거나 기존 Skill 호출 순서를 바꾸는 변경이 아니기 때문이다.

`docs/migrations/`는 검토했지만 수정하지 않았다. locale별 smoke 검증과 기존 한국어-only 적용 저장소 migration guide는 구현계획서상 #71 범위로 남겨야 하므로, Stage 3에서는 lifecycle/manual 정합성만 반영했다.

## 검증 결과

실행 명령:

```bash
rg -n "실제 locale 선택 저장 위치와 workflow|#70 범위|후속 #70|locale 선택 저장 위치 미확정" docs templates README.md README.ko.md README.zh-CN.md src test
rg -n 'Applied version record|적용 버전 기록|records the framework version used|framework version。' templates/mydocs/manual templates/locales/en/mydocs/manual templates/locales/ko/mydocs/manual templates/locales/zh-CN/mydocs/manual docs README.md README.ko.md README.zh-CN.md
rg -n "locale|language|version.json|preserveSelectedLocaleOnUpdate" docs README.md README.ko.md README.zh-CN.md templates/mydocs/manual templates/locales/en/mydocs/manual templates/locales/ko/mydocs/manual templates/locales/zh-CN/mydocs/manual
git diff --check
npm test
```

결과:

- OK: #70 보류 표현, locale 저장 위치 미확정 표현, 오래된 "Applied version record/적용 버전 기록" 표현 검색 결과가 없다.
- OK: locale 관련 문맥 검색에서 `docs/agent-entrypoint.md`, `docs/lifecycle/update_pr.md`, distribution/plugin 문서, README 3종, template manual과 locale mirror가 `.hyper-waterfall/version.json`의 `locale`과 보존/전환 판단을 같은 방향으로 설명한다.
- OK: `git diff --check` 통과.
- OK: `npm test` 통과. 11개 테스트 모두 pass.

## 잔여 위험

- locale별 전체 smoke matrix와 기존 한국어-only 적용 저장소 migration guide는 아직 작성하지 않았다. 이는 #71과 Stage 4 handoff 범위다.
- README와 manual의 다국어 설명은 의미 정렬을 했지만, 최종 PR 전 Stage 4에서 CLI 전체 dry-run과 함께 한 번 더 중복·drift 검색이 필요하다.

## 다음 단계 영향

- Stage 4는 Stage 1-3 산출물을 대상으로 `doctor`, `init --locale en/ko/zh-CN`, `update` dry-run, `npm test`, `git diff --check`를 다시 실행한다.
- Stage 4 보고서와 최종 보고서는 #71로 넘길 smoke matrix와 migration guide 범위를 명확히 남겨야 한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4로 진행한다.
