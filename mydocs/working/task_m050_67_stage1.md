# 단계 보고서

GitHub Issue: [#67](https://github.com/postmelee/hyper-waterfall/issues/67)
구현계획서: [`task_m050_67_impl.md`](../plans/task_m050_67_impl.md)
Stage: 1

## 단계 목적

Stage 1의 목적은 현재 `templates/`와 `templates/manifest.json` 구조를 inventory하고, #65 다국어 정책을 기준으로 locale 대상/비대상/후속 보류 대상을 분류하는 것이다.

이번 단계에서는 실제 manifest나 lifecycle 문서를 수정하지 않고, Stage 2에서 적용할 locale pack 구조 후보와 manifest 계약 방향을 기술 기록으로 고정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m050_67_locale_manifest_design.md` | `templates/` 파일 inventory, manifest role 분류, 한국어 고정 문구 inventory, locale pack 구조 후보, Stage 2 manifest 계약 권장안을 정리 |

## 본문 변경 정도 / 본문 무손실 여부

신규 기술 조사 문서 1개를 추가했다. 기존 `templates/`, `docs/`, `README`, lifecycle 문서 본문은 변경하지 않았다.

조사 결과 root `templates/`의 기존 한국어 원문은 Stage 1에서 이동하거나 수정하지 않았고, #68에서 `ko` 기준 자료로 보존할 수 있도록 구조 후보에 반영했다.

## 검증 결과

실행 명령:

```bash
rg -n "작성 언어: 한국어|모든 문서는 한국어|locale|언어|manifest|fallback" templates docs mydocs/tech
find templates -maxdepth 3 -type f | sort
git diff --check
```

결과:

- OK: `rg` 명령으로 locale, manifest, fallback, 한국어 고정 문구 관련 기존 위치를 확인했다. 출력은 597 lines였고, Stage 1 기술 기록에는 `templates/AGENTS.md`, `templates/mydocs/_templates/*`, `templates/mydocs/manual/document_structure_guide.md`, `templates/mydocs/skills/todo/SKILL.md`의 한국어 고정 문구를 별도 표로 정리했다.
- OK: `find templates -maxdepth 3 -type f | sort`로 현재 template 파일 목록을 확인했다. 출력에 `templates/.DS_Store`가 포함됐지만 `git ls-files templates/.DS_Store --error-unmatch` 결과 Git 추적 파일이 아니므로 manifest 대상은 아니다.
- OK: `templates/manifest.json`의 현재 `files[]`는 25개 entry이며, role별 entry 수와 directory entry 3개(`templates/mydocs/_templates`, `templates/mydocs/manual`, `templates/mydocs/skills`)를 기술 기록에 반영했다.
- OK: `git diff --check`가 경고 없이 통과했다.

## 잔여 위험

- `templates/.DS_Store`는 Git 추적 파일은 아니지만 local filesystem에 존재한다. Stage 1 범위에서는 삭제하지 않았고, manifest 대상에서도 제외한다.
- Stage 1은 구조 후보와 권장 manifest 계약을 정리한 단계다. 실제 `templates/locales/{locale}` 디렉터리 생성, manifest 필드 반영, lifecycle 문서 정렬은 아직 수행하지 않았다.
- `templates/mydocs/manual`과 `templates/mydocs/skills`는 locale 대상 후보이나 절차 의미 drift 위험이 있어 Stage 2 이후에도 의미 보존 검증이 필요하다.

## 다음 단계 영향

- Stage 2는 `templates/locales/{locale}/...` 미러 구조를 우선 후보로 두고 `templates/manifest.json`에 최소 locale 계약을 반영한다.
- Stage 2 manifest 계약은 `defaultLocale: en`, `supportedLocales: [en, ko, zh-CN]`, `fallbackLocale: en`, `localePackRoot: templates/locales`, `missingLocalePolicy: report-and-fallback-candidate`를 기본 후보로 검토한다.
- locale pack 본문 작성은 #68/#69, 실제 locale 선택 저장 위치와 workflow 연결은 #70으로 남긴다는 경계를 유지해야 한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 — locale pack 구조와 manifest 계약 반영으로 진행한다.
