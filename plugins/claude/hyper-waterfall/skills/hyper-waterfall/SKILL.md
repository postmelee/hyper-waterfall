---
name: hyper-waterfall
description: Use when the user wants to apply or run the Hyper-Waterfall workflow from Claude Code. Read the repository canonical files and route the task through the existing Hyper-Waterfall gates instead of redefining the workflow.
---

# Hyper-Waterfall Claude Entrypoint

이 plugin Skill은 Hyper-Waterfall 절차의 새 진실 원천이 아니다. Claude Code에서 Hyper-Waterfall 진입점을 찾기 쉽게 하는 얇은 wrapper다.

## 우선 읽을 파일

대상 저장소에서 다음 파일을 순서대로 확인한다.

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/agent-entrypoint.md`
4. `templates/manifest.json`
5. `.claude/skills`
6. `mydocs/skills`

파일이 없거나 경로가 다르면 추측으로 절차를 만들지 말고 작업지시자에게 확인한다.

## 신규 적용 요청

사용자가 Hyper-Waterfall을 새 저장소에 적용해 달라고 요청하면 `docs/agent-entrypoint.md`의 신규 적용 판단 결과 형식을 따른다.

파일을 변경하기 전에 최소한 다음을 보고한다.

- 대상 저장소 루트와 기준 브랜치
- 적용할 Hyper-Waterfall release 또는 tag
- `templates/manifest.json` 기준 적용 후보
- 기존 파일 충돌 가능성
- placeholder 치환 대상
- 작업지시자 승인 요청

승인 전에는 대상 저장소 파일을 적용하거나 덮어쓰지 않는다.

## 기존 적용 저장소 업데이트 요청

기존 적용 저장소를 새 version으로 올리는 요청이면 `docs/agent-entrypoint.md`의 기존 업데이트 판단 결과 형식을 따른다.

확인할 기준은 다음이다.

- 대상 저장소의 `.hyper-waterfall/version.json`
- 목표 GitHub Release 또는 tag
- 목표 release의 `templates/manifest.json`
- `docs/migrations/`
- 사용자 수정 가능 파일과 conflict 후보

판단 결과가 승인되면 일반 task 흐름으로 전환한다. 이슈, 브랜치, 수행계획서, 구현계획서, Stage 보고서, 최종 보고서, PR을 생략하지 않는다.

## 이미 적용된 저장소의 task 요청

이미 Hyper-Waterfall이 적용된 저장소에서 이슈 작업을 요청받으면 `.claude/skills` 또는 `mydocs/skills`의 canonical Skill을 사용한다.

대표 흐름:

- task 시작: `task-start`
- 단계 종료: `task-stage-report`
- 최종 보고와 PR: `task-final-report`
- PR merge 후 정리: `pr-merge-cleanup`

각 단계 전환은 작업지시자의 명시 승인이 있을 때만 진행한다.

## CLI fallback

npm CLI가 사용 가능한 환경이면 dry-run 또는 도움말 경로를 확인할 수 있다.

```bash
npx hyper-waterfall@0.2.0 --help
```

CLI 출력은 판단 보조다. CLI가 실패해도 승인 전 파일 적용을 진행하지 않고, `AGENTS.md`, `CLAUDE.md`, manual, Skill 절차로 fallback한다.

## 금지

- Hyper-Waterfall 절차를 이 plugin 안에서 새로 요약해 canonical 규칙처럼 취급하지 않는다.
- `templates/manifest.json`, migration guide, core Skill 본문을 plugin 전용 진실 원천으로 복제하지 않는다.
- 작업지시자 승인, 이슈 추적, Stage 보고, PR 흐름을 우회하지 않는다.
- public publish, issue close, PR merge 같은 외부 상태 변경을 별도 승인 없이 실행하지 않는다.
- hook이나 permission 설정을 승인 자동화 장치로 사용하지 않는다.
