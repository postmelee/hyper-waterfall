# task_m010_5_stage3.md - Stage 3 완료 보고서

GitHub Issue: [#5](https://github.com/postmelee/hyper-waterfall/issues/5)
구현계획서: [`task_m010_5_impl.md`](../plans/task_m010_5_impl.md)
Stage: 3

## 단계 목적

Stage 1~2에서 추가한 GitHub Issue Form과 `task-register` 참조 흐름을 README에 반영했다. README의 GPT-5.5 및 Claude Opus 4.7 프롬프팅 가이드 정합성 설명이 `mydocs/_templates/` 기반 출력 형식뿐 아니라 `.github/ISSUE_TEMPLATE/task.yml` 기반 입력 프롬프트 구조화까지 포함하도록 보강했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | 공식 프롬프팅 가이드 정합 설명에 Issue Form 기반 입력 프롬프트 구조화 추가 |
| `README.md` | 도입 후 작업 흐름의 GitHub Issue 등록 단계와 `task-register` 산출물 설명 보강 |
| `README.md` | 문서 구조 설명에 GitHub 플랫폼 템플릿과 `mydocs/_templates/`의 역할 경계 추가 |
| `README.md` | 적용 저장소 구조 예시에 `.github/ISSUE_TEMPLATE/task.yml` 추가 |
| `README.md` | GPT-5.5/Opus 4.7 매핑에서 Issue Form과 중앙 템플릿의 입력/출력 역할 분리 |

변경 규모:

```text
README.md | 32 ++++++++++++++++++++------------
1 file changed, 20 insertions(+), 12 deletions(-)
```

최종 라인 수:

```text
443 README.md
```

## 본문 변경 정도 / 본문 무손실 여부

기존 README의 구조와 핵심 주장은 유지했다.

- 유지: 공식 가이드 링크, 프롬프트 가이드 준수 섹션 구조, 핵심 Skill 표, 도입 후 작업 흐름
- 보강: Issue Form을 입력 프롬프트 형식으로 설명, `mydocs/_templates/`를 출력 형식으로 설명
- 조정: `task-register` 산출물과 적용 저장소 구조가 새 `.github/ISSUE_TEMPLATE/task.yml`과 어긋나지 않게 갱신

공식 가이드 관련 표현은 "완전 보장"이 아니라 "핵심을 자연스럽게 만족"과 "구조화" 수준으로 유지했다.

## 검증 결과

실행 명령:

```bash
grep -nE 'Issue Form|입력 프롬프트|출력 형식|GPT-5.5|Opus 4.7' README.md
grep -nE 'task-register|ISSUE_TEMPLATE|mydocs/_templates|pull_request_template' README.md templates/mydocs/manual/document_structure_guide.md
grep -nE '핵심 원칙|구조적으로 반영|다음 작업의 첫 프롬프트' README.md
grep -nE 'ISSUE_TEMPLATE/task\.yml|task\.yml|Issue Form' README.md templates/mydocs/skills/task-register/SKILL.md templates/mydocs/manual/task_workflow_guide.md
git diff --check
```

결과:

- README에서 Issue Form, 입력 프롬프트, 출력 형식, GPT-5.5, Opus 4.7 문구 확인.
- README와 `document_structure_guide.md`에서 `task-register`, `ISSUE_TEMPLATE`, `mydocs/_templates`, `pull_request_template` 참조 확인.
- README에서 다음 작업의 첫 프롬프트 역할 문구 확인.
- README, `task-register`, `task_workflow_guide.md`가 `.github/ISSUE_TEMPLATE/task.yml`을 일관되게 참조함을 확인.
- `git diff --check` 경고 없이 통과.

## 잔여 위험

- README는 공식 가이드의 핵심 원칙과의 구조적 정합을 설명하지만, 외부 공식 문서가 바뀌면 표현 재검토가 필요하다.
- 이번 작업은 하이퍼-워터폴 task용 Issue Form만 추가했다. 버그 리포트, 질문, 외부 기여자용 Issue Form은 범위 밖이다.

## 다음 단계 영향

모든 구현 Stage가 끝났으므로 다음 단계는 `task-final-report` 절차다. 최종 보고서에서 Issue Form, `task-register`, 매뉴얼, README의 입력/출력 템플릿 경계와 통합 검증 결과를 정리해야 한다.

## 승인 요청

Stage 3 산출물과 검증 결과를 승인하면 최종 보고서 작성 및 PR 준비 단계로 진행한다.
