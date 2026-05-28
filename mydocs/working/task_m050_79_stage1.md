# #79 Stage 1 완료 보고서 — 다국어 진입점/링크 baseline 감사

GitHub Issue: [#79](https://github.com/postmelee/hyper-waterfall/issues/79)
구현계획서: [`task_m050_79_impl.md`](../plans/task_m050_79_impl.md)
Stage: 1

## 단계 목적

Stage 1은 README 3종, lifecycle 진입 문서, localized template/manual 자산, package/manifest version 상태를 수정 없이 점검해 Stage 2-4의 변경 범위를 확정하는 감사 단계다. 배포 전 다국어 사용자 관점에서 끊기는 진입 경로, 한국어-only anchor, v0.3.0 readiness 불일치를 찾고 다음 단계 입력으로 고정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m050_79_stage1.md` | README/entrypoint/lifecycle/package/manifest baseline 감사 결과와 다음 단계 수정 범위 정리 |

## 본문 변경 정도 / 본문 무손실 여부

공식 README, docs, package, manifest 본문은 변경하지 않았다. 이번 Stage의 변경은 감사 결과를 새 작업 보고서에 추가한 것뿐이다. 기존 README 원문과 localized template/manual 본문은 무손실이다.

## 감사 결과

| 구분 | 결과 | 다음 단계 |
|---|---|---|
| README 상단 언어 지원 | README 3종 모두 언어 링크와 Quick Start는 있으나, 지원 locale(`en`, `ko`, `zh-CN`), 기본 locale(`en`), fallback, 언어별 prompt, `--locale` dry-run 명령이 상단에 바로 드러나지 않는다. | Stage 2에서 Quick Start 근처에 짧은 언어 지원 블록과 언어별 prompt를 추가한다. |
| English/Chinese entrypoint | English/Chinese README 모두 `docs/agent-entrypoint.md`를 가리킨다. 해당 문서는 한국어 중심이다. | Stage 3에서 `docs/agent-entrypoint.en.md`, `docs/agent-entrypoint.zh-CN.md`를 추가하고 Stage 2/3에서 링크를 정렬한다. |
| lifecycle localized docs | `docs/lifecycle/`에는 `adoption.md`, `update.md`, `update_pr.md`만 존재한다. English/Chinese mirror는 없다. | Stage 3에서 `*.en.md`, `*.zh-CN.md` lifecycle 문서를 추가한다. |
| English README 한국어 anchor | `README.md`에 한국어 anchor가 남아 있다: `#타스크-진행-절차`, `#브랜치-관리`, `#skill-호출-표시-안내`, `#폴더-역할-엄격-준수`, `#문서-파일명-규칙`, `#중앙-템플릿-정책`, `#manual-문서-중립성-정책`, `#github-플랫폼-템플릿-정책`, `#agent-skills-위치-정책`, `#배포-manifest와-버전-기록-정책`. | Stage 2에서 English README는 `templates/locales/en/...` 또는 anchor 없는 localized 문서 링크로 교체한다. |
| Chinese README 한국어 anchor | `README.zh-CN.md`도 동일 계열의 한국어 anchor가 남아 있다. | Stage 2에서 Chinese README는 `templates/locales/zh-CN/...` 또는 anchor 없는 localized 문서 링크로 교체한다. |
| 의도적 다국어 문자 | README 언어 선택 줄의 `한국어`, `简体中文`은 의도된 언어 선택 UI다. English README의 실제 commit 제목 예시 `Task #1: 수행 계획서 작성`은 역사적 commit log 설명이라 수정 후보이지만 blocker는 아니다. | Stage 2에서 anchor 제거 후 잔존 한국어 grep을 의도/비의도로 분류한다. |
| localized template/manual 자산 | `templates/locales/en/mydocs/manual`, `templates/locales/zh-CN/mydocs/manual`, 각 locale의 Skill 문서가 존재한다. | Stage 2/3에서 README deep link의 target 후보로 사용한다. |
| package version | `package.json`은 `0.2.0`이다. npm registry의 `latest`도 `0.2.0`이다. | Stage 4에서 v0.3.0 release readiness 기준으로 package/manifest/release 문구를 정렬한다. |
| manifest version | `templates/manifest.json`은 `frameworkVersion: 0.2.0`, `plannedTag: v0.2.0`, `release.status: released`다. locale availability는 `complete`다. | Stage 4에서 v0.3.0 readiness와 실제 publish 제외 문구를 함께 정리한다. |
| CLI 역할 | 현재 README의 npx 예시는 `v0.1.0 -> v0.2.0` update 중심이다. 다국어 신규 적용의 `init --locale <locale> --dry-run` 예시가 상단에 없다. | Stage 2에서 신규 적용 dry-run 예시를 추가하고, Stage 4에서 v0.3.0 version과 맞춘다. |

## 검증 결과

실행 명령:

```bash
rg -n "[가-힣]" README.md README.zh-CN.md
rg -n "agent-entrypoint|docs/lifecycle|templates/mydocs/manual|templates/locales|--locale|v0.3.0|0.2.0" README.md README.ko.md README.zh-CN.md docs package.json templates/manifest.json
rg --files docs/lifecycle
npm_config_cache=/private/tmp/hyper-waterfall-npm-cache npm view hyper-waterfall version dist-tags --json
test -f docs/agent-entrypoint.en.md
test -f docs/agent-entrypoint.zh-CN.md
git diff --check
```

결과:

- `rg -n "[가-힣]" README.md README.zh-CN.md`: OK. English/Chinese README의 한국어 anchor와 의도된 언어 선택/역사적 commit title 예시를 확인했다.
- `rg -n "agent-entrypoint|docs/lifecycle|templates/mydocs/manual|templates/locales|--locale|v0.3.0|0.2.0" ...`: OK. README가 한국어 entrypoint/lifecycle로 연결되고, package/manifest가 `0.2.0` 기준임을 확인했다.
- `rg --files docs/lifecycle`: OK. 현재 lifecycle 공식 문서는 `adoption.md`, `update.md`, `update_pr.md` 3개뿐이다.
- `npm view hyper-waterfall version dist-tags --json`: OK. npm registry 현재 `latest`는 `0.2.0`이다.
- `test -f docs/agent-entrypoint.en.md`, `test -f docs/agent-entrypoint.zh-CN.md`: 예상대로 exit 1. Stage 3 신규 산출물로 추가해야 함을 확인했다.
- `git diff --check`: OK.

## 잔여 위험

- **localized lifecycle 문서 동기화 비용**: Stage 3에서 English/Chinese lifecycle 문서를 추가하면 원문 변경 시 동기화 관리가 필요하다.
- **v0.3.0 version 정렬 시점**: package/manifest를 v0.3.0으로 올리는 작업과 실제 publish/tag 생성은 분리해야 한다. Stage 4에서 readiness 문구를 명확히 해야 한다.
- **한국어 grep false positive**: 언어 선택 링크와 실제 과거 commit title은 의도적으로 남을 수 있다. Stage 2에서 제거 대상과 보존 대상을 분리한다.

## 다음 단계 영향

- Stage 2는 README 3종의 Quick Start 근처에 언어 지원 블록, 언어별 prompt, `npx ... init --locale ... --dry-run` 예시를 추가한다.
- Stage 2는 English/Chinese README의 한국어 anchor 링크를 localized template/manual 문서로 정리한다.
- Stage 3는 English/Chinese entrypoint와 lifecycle 문서를 추가한다.
- Stage 4는 `package.json`, `templates/manifest.json`, release/migration 문서의 v0.3.0 readiness 상태를 정렬한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 — README 언어 지원과 적용 프롬프트 보강으로 진행한다.
