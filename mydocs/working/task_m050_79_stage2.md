# #79 Stage 2 완료 보고서 — README 다국어 진입 안내 보강

GitHub Issue: [#79](https://github.com/postmelee/hyper-waterfall/issues/79)
구현계획서: [`task_m050_79_impl.md`](../plans/task_m050_79_impl.md)
Stage: 2

## 단계 목적

Stage 2는 README 3종의 Quick Start 근처에 다국어 사용자가 바로 확인해야 할 locale 지원 정보를 추가하고, English/Chinese README에서 한국어-only manual anchor로 이동하던 깊은 링크를 localized template/manual 문서로 정리하는 단계다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | `Language support` 블록 추가, 언어별 AI prompt와 `npx hyper-waterfall@0.3.0 init --locale ... --dry-run` 예시 추가, manual deep link를 `templates/locales/en/...`로 정리 |
| `README.ko.md` | `언어 지원` 블록 추가, 언어별 AI prompt와 `npx hyper-waterfall@0.3.0 init --locale ... --dry-run` 예시 추가 |
| `README.zh-CN.md` | `语言支持` 블록 추가, 언어별 AI prompt와 `npx hyper-waterfall@0.3.0 init --locale ... --dry-run` 예시 추가, manual deep link를 `templates/locales/zh-CN/...`로 정리 |
| `mydocs/working/task_m050_79_stage2.md` | Stage 2 변경과 검증 결과 기록 |

## 본문 변경 정도 / 본문 무손실 여부

README 기존 설명 흐름은 유지했다. Quick Start의 AI 보고 표 아래에 언어 지원 블록을 추가했고, English/Chinese README의 한국어 anchor 링크는 같은 의미의 localized manual 문서 링크로 교체했다. 기존 방법론 설명, 적용 흐름, 구조 설명, 부록 본문은 삭제하지 않았다.

## 검증 결과

실행 명령:

```bash
rg -n "Language support|언어 지원|语言支持|--locale|npx hyper-waterfall@0.3.0|README\.ko|README\.zh-CN" README.md README.ko.md README.zh-CN.md
rg -n "[가-힣]" README.md README.zh-CN.md
rg -n "templates/mydocs/manual.*#[가-힣]|#타스크|#브랜치|#skill-|#폴더|#문서|#중앙|#manual-문서|#github-플랫폼|#agent-skills|#배포" README.md README.zh-CN.md
test -f templates/locales/en/mydocs/manual/task_workflow_guide.md
test -f templates/locales/en/mydocs/manual/git_workflow_guide.md
test -f templates/locales/en/mydocs/manual/document_structure_guide.md
test -f templates/locales/zh-CN/mydocs/manual/task_workflow_guide.md
test -f templates/locales/zh-CN/mydocs/manual/document_structure_guide.md
git diff --check
```

결과:

- 언어 지원 블록과 `--locale`/`npx hyper-waterfall@0.3.0` 예시 검색: OK. README 3종 모두에서 확인됐다.
- `rg -n "[가-힣]" README.md README.zh-CN.md`: OK. 남은 한국어는 언어 선택 링크, 한국어 locale 적용 prompt, English README의 역사적 commit title 예시다. 한국어-only manual anchor는 제거됐다.
- 한국어 anchor 검색: OK. `templates/mydocs/manual...#한국어-anchor`와 관련 anchor 패턴은 더 이상 검색되지 않았다.
- localized manual link target 존재 확인: OK.
- `git diff --check`: OK.

## 잔여 위험

- **localized lifecycle 문서 미존재**: README의 Quick Start 자체는 아직 기존 `docs/agent-entrypoint.md`를 가리킨다. Stage 3에서 `docs/agent-entrypoint.en.md`, `docs/agent-entrypoint.zh-CN.md`와 localized lifecycle 문서를 추가한 뒤 링크를 최종 정렬한다.
- **v0.3.0 package metadata 미정렬**: README에는 v0.3.0 dry-run 예시가 들어갔지만 `package.json`과 `templates/manifest.json`은 아직 `0.2.0` 기준이다. Stage 4에서 release readiness와 함께 맞춘다.
- **의도적 다국어 prompt로 인한 grep 잔존**: README 3종에 언어별 prompt를 모두 싣기 때문에 English/Chinese README에 한국어/중국어 문자가 의도적으로 남는다.

## 다음 단계 영향

- Stage 3에서 README의 localized entrypoint/lifecycle 경로를 실제 파일과 맞춰야 한다.
- Stage 3에서 localized lifecycle 문서의 상대 링크와 구조적 계약 보존을 검증해야 한다.
- Stage 4에서 v0.3.0 package/manifest/release readiness를 README의 `npx` 예시와 정렬해야 한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 — localized entrypoint/lifecycle 문서 추가로 진행한다.
