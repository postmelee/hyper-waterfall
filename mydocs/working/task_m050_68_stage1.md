# #68 Stage 1 완료보고서

GitHub Issue: [#68](https://github.com/postmelee/hyper-waterfall/issues/68)
구현계획서: [`task_m050_68_impl.md`](../plans/task_m050_68_impl.md)
Stage: 1

## 단계 목적

Stage 1의 목적은 실제 locale pack 본문을 작성하기 전에 `templates/manifest.json` 기준 locale 대상과 비대상을 확정하고, manual/Skill 번역 포함 범위와 용어 대응 기준을 정리하는 것이다.

이번 단계에서는 `en` 기본 pack과 `ko` 보존 pack의 작성 범위를 확정했다. 실제 `templates/locales/en/**`, `templates/locales/ko/**` 파일 작성은 Stage 2와 Stage 3에서 진행한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m050_68_translation_terms.md` | manifest locale 대상 15개 entry, locale 비대상 10개 entry, manual/Skill 포함 판단, 한국어 고정 문구 inventory, 구조적 계약 보존 기준, 용어 대응표를 작성했다. |
| `mydocs/working/task_m050_68_stage1.md` | Stage 1 검증 결과와 다음 단계 영향 보고서를 작성했다. |

## 본문 변경 정도 / 본문 무손실 여부

이번 단계는 조사/계획 산출물만 추가했다. `templates/` 원문, manifest, lifecycle 문서, CLI 코드는 수정하지 않았다.

manual/Skill 포함 판단은 다음처럼 확정했다.

- `templates/mydocs/manual`과 `templates/mydocs/skills`는 manifest에서 directory 단위 locale source로 지정되어 있으므로 #68에 포함한다.
- 부분 번역 directory는 mixed locale 위험이 있으므로 Stage 2와 Stage 3에서 directory 전체를 작성한다.
- manual 11개 파일과 Skill directory 8개 파일은 `requiresSemanticReview: true` 기준으로 절차 의미 보존 검토를 수행한다.
- `zh-CN` pack은 #69 범위로 유지한다.

## 검증 결과

실행 명령:

```bash
rg -n "작성 언어: 한국어|모든 문서는 한국어|language|locale|requiresSemanticReview" templates docs mydocs/tech/task_m050_67_locale_manifest_design.md
rg -n '"localization"|"sourcePattern"|"requiresSemanticReview"' templates/manifest.json
git diff --check
```

결과:

- OK. 첫 번째 `rg`는 locale 정책, 기존 한국어 고정 문구, #65/#67 문서의 locale 기준을 확인했다. 출력은 261줄이며, 실제 한국어 고정 문구는 `templates/` 기준 10개 위치로 확인했다.
- OK. 두 번째 `rg`는 manifest의 top-level `localization`, entry별 `sourcePattern`, `requiresSemanticReview` 위치를 확인했다. locale 대상은 15개 entry, 비대상은 10개 entry이며, semantic review 대상은 `mydocs/manual`, `mydocs/skills`다.
- OK. `git diff --check`는 출력 없이 통과했다.

보조 확인:

```bash
rg -n "작성 언어: 한국어|모든 문서는 한국어" templates
node -e 'const m=require("./templates/manifest.json"); const enabled=m.files.filter(f=>f.localization&&f.localization.enabled===true); const disabled=m.files.filter(f=>f.localization&&f.localization.enabled===false); const semantic=enabled.filter(f=>f.localization.requiresSemanticReview===true); console.log(JSON.stringify({enabled:enabled.length,disabled:disabled.length,semanticReview:semantic.map(f=>f.target)},null,2));'
```

결과:

- 한국어 고정 문구는 `templates/AGENTS.md`, `templates/mydocs/manual/document_structure_guide.md`, `templates/mydocs/skills/todo/SKILL.md`, `templates/mydocs/_templates/*` 7개 파일에서 확인했다.
- manifest 요약은 `enabled=15`, `disabled=10`, `semanticReview=["mydocs/manual","mydocs/skills"]`로 확인했다.

## 잔여 위험

- manual/Skill 전체를 포함하기로 했으므로 Stage 2와 Stage 3의 번역량이 크다. 단, manifest directory source의 partial pack 위험을 줄이려면 전체 포함이 더 일관적이다.
- `templates/mydocs/skills/*.md`의 front matter `name`은 식별자라 그대로 두어야 하고, `description`은 사용자-facing 설명이므로 선택 locale에 맞춰 번역하되 의미를 바꾸면 안 된다.
- `templates/locales/en`이 작성되면 `doctor`의 fallback source 누락 상태가 달라질 수 있다. Stage 4에서 smoke 기대값과 manifest availability 문구를 다시 판단한다.

## 다음 단계 영향

- Stage 2는 `mydocs/tech/task_m050_68_translation_terms.md`의 용어 대응표를 기준으로 `templates/locales/en/**` 전체를 작성한다.
- Stage 2에서는 manual 11개 파일과 Skill directory 8개 파일을 포함한다.
- 구조적 계약 보존 대상은 placeholder, branch pattern, filename pattern, command/code block, GitHub 식별자, manifest field, symlink target이다.
- `ko` pack 작성 기준은 Stage 3에서 기존 한국어 원문 보존과 선택 locale 정책 문구 정렬로 이어진다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 영어 기본 locale pack 작성으로 진행한다.
