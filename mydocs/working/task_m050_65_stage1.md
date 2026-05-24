# Task M050 #65 Stage 1 완료 보고서

GitHub Issue: [#65](https://github.com/postmelee/hyper-waterfall/issues/65)
구현계획서: [`task_m050_65_impl.md`](../plans/task_m050_65_impl.md)
Stage: 1

## 단계 목적

Stage 1은 M050 다국어 적용 지원 정책을 작성하기 전에 현재 저장소의 언어 고정 문구와 placeholder 보존 지점을 조사하고, 후속 #66~#71 이슈가 처리할 범위를 분류하는 단계다.

이번 단계에서는 원본 `templates/`, `docs/`, `.github` 본문을 수정하지 않았다. `docs/localization.md` 작성과 정책 확정은 Stage 2로 남겼다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m050_65_language_inventory.md` | 한국어 고정 정책 문구, locale 관련 기존 문구, placeholder 보존 대상, 후속 이슈별 입력을 inventory로 정리 |
| `mydocs/orders/20260523.md` | 날짜가 2026-05-23으로 넘어간 뒤 진행한 Stage 1 상태를 오늘할일에 기록 |
| `mydocs/working/task_m050_65_stage1.md` | Stage 1 산출물, 검증 결과, 잔여 위험, 다음 단계 영향을 기록 |

## 본문 변경 정도 / 본문 무손실 여부

- 원본 template/manual/Skill/README 본문은 수정하지 않았다.
- 새로 추가한 inventory는 조사 결과를 요약·분류한 작업 산출물이다.
- 기존 `mydocs/orders/20260522.md`는 수정하지 않았다. 2026-05-22 당시 상태를 보존하고, 2026-05-23 작업 진행은 새 날짜 파일에 기록했다.

## 검증 결과

실행 명령:

```bash
rg -n "작성 언어: 한국어|모든 문서는 한국어|locale|언어" templates docs README.md mydocs .github
rg -n "\\{REPO_SLUG\\}|\\{BASE_BRANCH\\}|\\{milestone\\}|\\{issue\\}|\\{stage\\}" templates docs README.md mydocs .github
git diff --check
```

결과:

- OK: 한국어 고정 문구가 `templates/AGENTS.md`, `templates/mydocs/manual/document_structure_guide.md`, `templates/mydocs/skills/todo/SKILL.md`, `templates/mydocs/_templates/*.md`에 집중되어 있음을 확인했다.
- OK: `README.md`와 `docs/homebrew-formula-tap-poc.md`의 기존 `언어` 언급은 M050 정책과 직접 충돌하지 않는 주변 문맥으로 분류했다.
- OK: `{REPO_SLUG}`, `{BASE_BRANCH}`, `{milestone}`, `{issue}`, `{stage}` placeholder 위치를 확인했고, inventory에서 번역 대상이 아니라 보존 대상이라고 분류했다.
- OK: `git diff --check`가 경고 없이 통과했다.

추가 확인:

```bash
wc -l mydocs/tech/task_m050_65_language_inventory.md mydocs/orders/20260523.md
```

결과:

- `mydocs/tech/task_m050_65_language_inventory.md`: 96 lines
- `mydocs/orders/20260523.md`: 7 lines

## 잔여 위험

- `templates/mydocs/_templates/task_plan.md`, `task_impl_plan.md`, `stage_report.md`, `final_report.md`는 명시적인 `작성 언어: 한국어` 문구는 없지만 본문과 섹션명이 한국어다. Stage 2 정책 문서에서 이 유형도 locale 대상인지 명확히 해야 한다.
- `.github` 템플릿은 한국어 본문이지만 언어 고정 문구가 없다. GitHub 플랫폼 템플릿의 locale pack 포함 방식은 #67에서 별도 결정해야 한다.
- Stage 1 inventory는 정책 확정이 아니라 조사 결과다. `작성 언어: 한국어` 대체 문구와 fallback 방식은 Stage 2에서 확정해야 한다.

## 다음 단계 영향

- Stage 2는 `mydocs/tech/task_m050_65_language_inventory.md`를 근거로 `docs/localization.md`를 작성한다.
- Stage 2에서 기본 언어 `en`, 기존 한국어 원문 `ko`, 중국어 간체 `zh-CN`, fallback, placeholder 보존, 선택 locale 기반 작성 정책을 명시해야 한다.
- #67~#71은 Stage 1 inventory의 후속 이슈 배정표를 입력으로 사용할 수 있다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 `docs/localization.md` 정책 문서 작성으로 진행한다.
