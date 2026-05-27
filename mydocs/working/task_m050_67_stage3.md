# 단계 보고서

GitHub Issue: [#67](https://github.com/postmelee/hyper-waterfall/issues/67)
구현계획서: [`task_m050_67_impl.md`](../plans/task_m050_67_impl.md)
Stage: 3

## 단계 목적

Stage 2에서 `templates/manifest.json`에 추가한 locale 계약을 신규 적용과 기존 업데이트 lifecycle 문서의 판단 결과 형식에 연결한다. 이번 단계는 실제 locale pack 본문, checksum 산출, locale 선택 저장 위치, workflow 실행 구현을 만들지 않고, adoption/update가 파일 변경 전에 보고해야 할 판단 기준을 정렬하는 것이 목적이다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/agent-entrypoint.md` | locale source 선택 계약의 원천을 `templates/manifest.json`으로 명시하고, 신규 적용은 adoption 문서, 기존 update는 update 문서로 연결했다. |
| `docs/lifecycle/adoption.md` | 신규 적용 원칙, 절차, 판단 결과 형식에 선택 locale, 기본 locale, source 누락, fallback 후보, locale 비대상 source, #70 저장 위치 보류를 추가했다. |
| `docs/lifecycle/update.md` | 기존 update 진입 조건, 절차, 분류 기준, 판단 결과 형식, CLI 출력 계약에 현재 locale, 목표 release locale 지원, locale 보존/전환, locale manifest diff를 추가했다. |
| `mydocs/tech/task_m050_67_locale_manifest_design.md` | Stage 3에서 adoption/update 문서에 연결한 판단 기준과 후속 이슈 경계를 기록했다. |
| `mydocs/working/task_m050_67_stage3.md` | Stage 3 산출물, 검증 결과, 잔여 위험을 기록했다. |

## 본문 변경 정도 / 본문 무손실 여부

기존 문서의 lifecycle 흐름과 금지 범위는 유지하고, locale 판단 항목만 추가했다. `docs/lifecycle/adoption.md`의 절차 번호는 locale 확인 단계를 넣기 위해 재정렬했지만, 기존 복사, symlink, version 기록, placeholder 치환, 보고 절차는 삭제하지 않았다.

이번 단계는 template 본문 번역이나 locale pack 파일 생성이 아니므로 `templates/locales/*` 본문은 만들지 않았다. `.hyper-waterfall/version.json`의 locale 선택 저장 위치와 workflow 실행 구현도 #70 범위로 남겼다.

## 검증 결과

실행 명령:

```bash
rg -n "locale|default|fallback|preserve|manifest diff|언어|선택" docs/agent-entrypoint.md docs/lifecycle/adoption.md docs/lifecycle/update.md docs/localization.md
rg -n "#70|선택 저장 위치|workflow" docs/agent-entrypoint.md docs/lifecycle/adoption.md docs/lifecycle/update.md mydocs/tech/task_m050_67_locale_manifest_design.md
git diff --check
```

결과:

- OK: `docs/agent-entrypoint.md`, `docs/lifecycle/adoption.md`, `docs/lifecycle/update.md`, `docs/localization.md`에서 `locale`, `fallback`, `preserve`, `manifest diff`, `선택` 관련 항목이 확인됐다.
- OK: `docs/agent-entrypoint.md`, `docs/lifecycle/adoption.md`, `docs/lifecycle/update.md`, `mydocs/tech/task_m050_67_locale_manifest_design.md`에서 #70 선택 저장 위치와 workflow 보류 경계가 확인됐다.
- OK: `git diff --check` 출력 없음.

## 잔여 위험

- 실제 `templates/locales/en`, `templates/locales/ko`, `templates/locales/zh-CN` 본문은 아직 없으며 #68, #69 범위다.
- 현재 locale 기록 위치와 update workflow 실행 방식은 아직 정의하지 않았으며 #70 범위다.
- locale별 smoke 검증과 migration guide 기준은 #71 범위다.

## 다음 단계 영향

- Stage 4에서는 `docs/localization.md`, `templates/manifest.json`, lifecycle 문서, 기술 기록 사이의 용어와 후속 이슈 경계를 통합 검증한다.
- Stage 4에서는 placeholder, branch, filename pattern, command/code block 보존 기준이 manifest/lifecycle 문서와 충돌하지 않는지 확인한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4로 진행한다.
