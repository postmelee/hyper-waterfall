# task_m010_3_stage5.md — Stage 5 완료 보고서

GitHub Issue: [#3](https://github.com/postmelee/hyper-waterfall/issues/3)
구현계획서: [`task_m010_3_impl.md`](../plans/task_m010_3_impl.md)
Stage: 5

## 단계 목적

Stage 1~4에서 추가한 중앙 템플릿 구조와 Skill 참조 흐름을 README에 반영했다. README의 GPT-5.5 및 Claude Opus 4.7 프롬프팅 가이드 준수 주장을 "정해진 위치와 템플릿이 있다"는 선언에서 `templates/mydocs/_templates/`에 실제 출력 형식이 존재한다는 근거로 강화했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | 공식 프롬프팅 가이드 정합 설명에 중앙 템플릿 추가 |
| `README.md` | 운영 규칙·SKILL·매뉴얼 분리에 `_templates/`를 포함 |
| `README.md` | 문서 구조 트리에 `_templates/`, `report/`, `tech/`, `troubleshootings/`, `pr/` 반영 |
| `README.md` | 핵심 SKILL 표의 산출물을 중앙 템플릿 기준으로 보정 |
| `README.md` | OpenAI/Anthropic 매핑의 출력 형식 항목을 expected output shape와 desired output format으로 구체화 |

변경 규모:

```text
README.md | 51 ++++++++++++++++++++++++++++++---------------------
1 file changed, 30 insertions(+), 21 deletions(-)
```

최종 라인 수:

```text
435 README.md
```

## 본문 변경 정도 / 본문 무손실 여부

README의 기존 주장과 흐름은 유지하면서 근거를 보강했다.

- 유지: 도입 문구, 작업 흐름, 핵심 SKILL 목록, 공식 가이드 링크, OpenAI/Anthropic 매핑 구조
- 보강: `templates/mydocs/_templates/`, `mydocs/_templates/`, 중앙 템플릿, Skill fallback 설명
- 수정: 문서 구조 트리의 오래된 `task_{N}`/`_final` 표기를 현재 명명 규칙(`task_{milestone}_{N}_stage{S}`, `report/`)에 맞춤

## 검증 결과

실행 명령:

```bash
grep -nE '_templates|중앙 템플릿|출력 형식|출력 계약' README.md
grep -nE 'GPT-5.5|Opus 4.7|Output Format|desired output format' README.md
grep -nE 'task-start|task-stage-report|task-final-report|external-pr-review|todo' README.md templates/mydocs/manual/task_workflow_guide.md
grep -RnE '\{(PROJECT_OVERVIEW|PROJECT_SPECIFIC_RULES|PROJECT_SPECIFIC_REQUIRED_DOCUMENTS|PROJECT_VALIDATION_GUIDE|BASE_BRANCH|RELEASE_BRANCH|PR_TEMPLATE_PATH|REPO_NAME)\}' AGENTS.md CLAUDE.md .github/pull_request_template.md README.md templates/mydocs/manual templates/mydocs/skills || true
git diff --check
```

결과:

- README의 `_templates`, 중앙 템플릿, 출력 형식 문구 확인.
- README의 GPT-5.5, Opus 4.7, desired output format 문구 확인.
- README와 `task_workflow_guide.md`의 주요 Skill명 참조 확인.
- 치환 대상 placeholder는 README/루트 운영 파일에는 없고, `templates/` 진실 원천 내부의 의도된 placeholder만 남아 있음을 확인.
- `git diff --check` 경고 없이 통과.

추가 확인:

```bash
grep -RnE '\{(PROJECT_OVERVIEW|PROJECT_SPECIFIC_RULES|PROJECT_SPECIFIC_REQUIRED_DOCUMENTS|PROJECT_VALIDATION_GUIDE|BASE_BRANCH|RELEASE_BRANCH|PR_TEMPLATE_PATH|REPO_NAME)\}' README.md AGENTS.md CLAUDE.md .github/pull_request_template.md || true
```

결과: 빈 출력.

## 잔여 위험

- README는 Stage 1~4의 구조를 설명하지만, 최종 보고서 작성 전까지 통합 검증과 PR 본문 갱신은 아직 남아 있다.
- GPT-5.5와 Opus 4.7 가이드는 외부 공식 문서이므로 향후 문서 내용이 바뀌면 README의 매핑 표현을 재검토해야 한다.

## 다음 단계 영향

모든 구현 Stage가 끝났으므로 다음 단계는 `task-final-report` 절차다. 최종 보고서에서 5개 Stage 전체 산출물, 중앙 템플릿 11종, 문서 구조 가이드, Skill 참조 전환, README 보강을 통합 검증해야 한다.

## 승인 요청

Stage 5 산출물과 검증 결과를 승인하면 최종 보고서 작성 및 PR 준비 단계로 진행한다.
