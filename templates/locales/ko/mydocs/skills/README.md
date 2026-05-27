# `skills/` 폴더 규칙

## 목적

Codex와 Claude Code가 호출하는 하이퍼-워터폴 Skill 본문을 보관한다.

## 답하는 질문

"정형 절차를 수행할 때 어떤 순서와 검증을 따라야 하는가?"

## 작성 시점

task 시작, 단계 종료, 최종 보고, PR merge cleanup, 외부 PR 검토 같은 정형 절차가 바뀔 때.

## 허용 파일명

`mydocs/skills/{skill-name}/SKILL.md`

## 사용 템플릿

Skill 본문은 도구별 Skill 형식을 따른다. 산출물 문서를 만들 때는 `mydocs/_templates/`의 해당 템플릿을 참조한다.

## 반드시 포함할 내용

- 트리거
- 사전 조건
- 절차
- 검증
- 절대 하지 말 것
- 호출 방법

## 두면 안 되는 내용

- 특정 task 결과
- 특정 모델 전용 장황한 프롬프트
- 다른 Skill과 충돌하는 절차

## 다음 세션 AI가 복원해야 할 맥락

언제 어떤 Skill을 호출하고, 어떤 산출물을 어떤 템플릿으로 만들어야 하는지.

## 인식 경로

- 진실 원천: `mydocs/skills/{skill-name}/SKILL.md`
- Codex 인식 경로: `.agents/skills/` (저장소 루트 심볼릭 링크 -> `mydocs/skills`)
- Claude Code 인식 경로: `.claude/skills/` (저장소 루트 심볼릭 링크 -> `mydocs/skills`)
