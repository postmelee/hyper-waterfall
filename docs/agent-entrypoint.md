# Hyper-Waterfall Agent Entrypoint

이 문서는 AI coding tool이 대상 저장소에 Hyper-Waterfall 방법론을 적용하거나 업데이트할 때 가장 먼저 읽는 진입점이다. 세부 절차는 lifecycle 문서와 manual 문서로 분산한다.

## 원칙

- 신규 적용은 `templates/manifest.json`을 먼저 읽고, manifest가 정의한 대상 파일과 심볼릭 링크를 기준으로 수행한다.
- 기존 적용 저장소 업데이트는 `.hyper-waterfall/version.json`, 목표 GitHub Release/tag, `templates/manifest.json`, `docs/migrations/`를 확인한 뒤 변경 후보를 제시한다.
- 문서를 재작성, 요약, 해석하지 않는다.
- 저장소 특화 placeholder만 치환한다.
- 중의적인 표현은 유지한다.
- 기존 파일이 있으면 덮어쓰기 전에 작업지시자에게 확인한다.
- 사용자 수정 가능성이 있는 파일은 manifest의 update policy가 `overwrite`여도 checksum 또는 diff를 확인하기 전에는 덮어쓰지 않는다.
- 신규 적용은 adoption-only strict manifest 모드로 수행한다. manifest가 정의하지 않은 파일이나 디렉터리는 생성하거나 수정하지 않는다.
- 제품 코드, 제품 문서, 아키텍처 문서, 로드맵, API 계약, 예제, 스키마처럼 대상 프로젝트 고유 산출물은 신규 적용 범위 밖으로 보고 보류 또는 별도 task 후보로만 기록한다.
- 신규 적용 중에는 대상 프로젝트의 공식 문서 루트 이름을 선택하거나 생성하지 않는다. `docs/`, `specs/`, `site/`, `website/`, `adr/` 등은 별도 task에서 문서 위치 판단을 거쳐 선택한다.

## 먼저 선택할 절차

| 상황 | 읽을 문서 |
|---|---|
| 대상 저장소에 Hyper-Waterfall을 처음 적용 | [`docs/lifecycle/adoption.md`](lifecycle/adoption.md) |
| 이미 적용된 저장소를 새 release/tag로 업데이트 | [`docs/lifecycle/update.md`](lifecycle/update.md) |
| 업데이트 판단 결과를 PR로 전환 | [`docs/lifecycle/update_pr.md`](lifecycle/update_pr.md) |
| lifecycle 판단을 일반 task 흐름으로 전환 | [`templates/mydocs/manual/framework_lifecycle_guide.md`](../templates/mydocs/manual/framework_lifecycle_guide.md) |
| release/tag와 update protocol 확인 | [`templates/mydocs/manual/release_update_protocol.md`](../templates/mydocs/manual/release_update_protocol.md) |

## 언어와 locale 참고

- 사용자-facing README 진입 문서는 `README.md`(en), `README.ko.md`(ko), `README.zh-CN.md`(zh-CN)를 기준으로 한다.
- 다국어 적용 정책은 [`docs/localization.md`](localization.md)를 따른다.
- 이 진입점은 locale 선택 저장 위치나 update 시 기존 locale 보존 절차를 정의하지 않는다. 해당 workflow 구현은 후속 #70 범위다.

## 공통 진행 순서

1. 신규 적용인지 기존 업데이트인지 판단한다.
2. 위 표의 세부 문서를 읽고 판단 결과를 먼저 작성한다.
3. 파일 변경 전 작업지시자에게 승인 요청을 한다.
4. 승인된 범위만 적용한다.
5. 실제 변경이 일반 task로 전환되면 GitHub Issue, 브랜치, 수행계획서, 구현계획서, 단계 보고서, 최종 보고서, PR로 추적한다.

이 문서는 Hyper-Waterfall framework lifecycle의 진입점이다. 신규 적용과 기존 업데이트는 core task workflow 안에 배포 lifecycle을 섞지 않고, release manifest, version 기록, migration guide를 기준으로 판단한다.

## Placeholder

- `{PROJECT_OVERVIEW}`
- `{PROJECT_SPECIFIC_RULES}`
- `{PROJECT_SPECIFIC_REQUIRED_DOCUMENTS}`
- `{PROJECT_VALIDATION_GUIDE}`
- `{REPO_SLUG}`
- `{REPO_NAME}`
- `{BASE_BRANCH}`
- `{RELEASE_BRANCH}`
- `{PR_TEMPLATE_PATH}`

권장 기본값:

- `{BASE_BRANCH}`: `devel`
- `{RELEASE_BRANCH}`: `main`
- `{PR_TEMPLATE_PATH}`: `.github/pull_request_template.md`

## 금지

- Hyper-Waterfall 문서 내용을 자기 방식으로 다시 설명하지 않는다.
- 절차를 간소화하거나 자동화 도구 중심으로 바꾸지 않는다.
- manifest, migration guide, 작업지시자 승인 없이 새 workflow, CLI, 설정 파일을 임의로 추가하지 않는다.
- 신규 적용 중 manifest 외 제품 코드, 제품 문서, 아키텍처 문서, 로드맵, API 계약, 예제, 스키마를 생성하지 않는다.
- 신규 적용 중 `docs/`, `specs/`, `site/`, `website/`, `adr/` 같은 공식 문서 루트를 임의로 선택하거나 생성하지 않는다.
