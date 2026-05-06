# task_m010_5_stage3.md - Stage 3 완료 보고서

GitHub Issue: [#5](https://github.com/postmelee/hyper-waterfall/issues/5)
구현계획서: [`task_m010_5_impl.md`](../plans/task_m010_5_impl.md)
Stage: 3

## 단계 목적

Stage 1~2에서 추가한 GitHub Issue Form과 `task-register` 참조 흐름을 README에 반영했다. 첫 반영 후 작업지시자 피드백에 따라 Issue Form 단독 설명은 줄이고, GitHub Issue/PR 템플릿을 GitHub 플랫폼 산출물 형식으로 묶어 설명하도록 보정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | 공식 프롬프팅 가이드 정합 설명을 GitHub Issue/PR 템플릿과 `mydocs/_templates/` 역할 구분 중심으로 보강 |
| `README.md` | 도입 후 작업 흐름에서 이슈가 없을 때만 `task-register`를 쓰고, 기존 이슈가 있으면 `task-start`로 바로 시작하는 흐름 추가 |
| `README.md` | 문서 구조 설명에 GitHub 플랫폼 템플릿과 `mydocs/_templates/`의 역할 경계 추가 |
| `README.md` | 적용 저장소 구조 예시에 `.github/ISSUE_TEMPLATE/task.yml` 추가 |
| `README.md` | GPT-5.5/Opus 4.7 매핑에서 Issue Form 반복 언급을 줄이고 PR 템플릿과 중앙 템플릿의 출력 형식 설명 유지 |

변경 규모:

```text
README.md | 23 ++++++++++++++---------
1 file changed, 14 insertions(+), 9 deletions(-)
```

최종 라인 수:

```text
444 README.md
```

## 본문 변경 정도 / 본문 무손실 여부

기존 README의 구조와 핵심 주장은 유지했다.

- 유지: 공식 가이드 링크, 프롬프트 가이드 준수 섹션 구조, 핵심 Skill 표, 적용 후 대상 저장소 구조
- 보강: GitHub Issue/PR 템플릿은 GitHub 플랫폼 산출물 형식, `mydocs/_templates/`는 저장소 문서 출력 형식이라는 경계
- 조정: Issue Form이 모든 작업의 첫 입력 프롬프트처럼 보이는 표현 제거, 기존 이슈 기반 시작 예시 추가

공식 가이드 관련 표현은 "완전 보장"이 아니라 "핵심을 자연스럽게 만족"과 "구조화" 수준으로 유지했다.

## 검증 결과

실행 명령:

```bash
grep -nE 'GitHub Issue/PR|출력 형식|GPT-5.5|Opus 4.7' README.md
grep -nE 'task-register|ISSUE_TEMPLATE|mydocs/_templates|pull_request_template' README.md templates/mydocs/manual/document_structure_guide.md
grep -nE '첫 작업 프롬프트|첫 입력 프롬프트|첫 human turn|desired input format' README.md || true
grep -nE 'GitHub Issue 확인 또는 등록|이슈가 이미 있으면|task-register|task-start|issue #[0-9]+ 작업을 진행해줘|이슈가 없을 때만|수행계획서' README.md
grep -nE '0\. 타스크 등록|1\. 수행 계획서|2\. 단계별 구현|3\. 피드백 반영|4\. 최종 보고|5\. PR 리뷰' README.md
grep -nE 'ISSUE_TEMPLATE/task\.yml|task\.yml|pull_request_template' README.md templates/mydocs/skills/task-register/SKILL.md templates/mydocs/manual/task_workflow_guide.md
git diff --check
```

결과:

- README에서 GitHub Issue/PR 템플릿, 출력 형식, GPT-5.5, Opus 4.7 문구 확인.
- README와 `document_structure_guide.md`에서 `task-register`, `ISSUE_TEMPLATE`, `mydocs/_templates`, `pull_request_template` 참조 확인.
- README에서 Issue Form 표현은 `핵심 SKILL 상세`와 템플릿 진실 원천 설명으로 제한됐고, 항상 첫 입력처럼 읽히는 표현은 제거됐음을 확인.
- README의 타스크 사이클에서 기존 이슈는 `task-start`로 바로 시작하고, 이슈가 없을 때만 `task-register`를 쓰는 예시 확인.
- README, `task-register`, `task_workflow_guide.md`가 `.github/ISSUE_TEMPLATE/task.yml`과 `.github/pull_request_template.md`를 일관되게 참조함을 확인.
- `git diff --check` 경고 없이 통과.

## 잔여 위험

- README는 공식 가이드의 핵심 원칙과의 구조적 정합을 설명하지만, 외부 공식 문서가 바뀌면 표현 재검토가 필요하다.
- 이번 작업은 하이퍼-워터폴 task용 Issue Form만 추가했다. 버그 리포트, 질문, 외부 기여자용 Issue Form은 범위 밖이다.

## 다음 단계 영향

모든 구현 Stage가 끝났으므로 다음 단계는 `task-final-report` 절차다. 최종 보고서에서 Issue Form, PR 템플릿, `task-register`, 매뉴얼, README의 GitHub 플랫폼 템플릿과 문서 출력 템플릿 경계, 통합 검증 결과를 정리해야 한다.

## 승인 요청

Stage 3 산출물과 검증 결과를 승인하면 최종 보고서 작성 및 PR 준비 단계로 진행한다.
