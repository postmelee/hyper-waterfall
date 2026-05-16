---
name: hyper-waterfall
description: Hyper-Waterfall workflow entrypoint for Codex. Use when starting or continuing issue-based Hyper-Waterfall tasks, checking lifecycle init/update paths, or finding canonical manuals and skills.
---

# Hyper-Waterfall Codex Entrypoint

This plugin is not a canonical source.

## 우선순위

1. 현재 저장소의 `AGENTS.md`를 먼저 읽는다.
2. 정형 task 절차는 현재 저장소의 `mydocs/skills/{skill-name}/SKILL.md`를 읽고 따른다.
3. 신규 적용 또는 기존 업데이트 판단은 `docs/agent-entrypoint.md`, `templates/manifest.json`, `docs/migrations/`, npm CLI dry-run을 기준으로 한다.
4. canonical 파일을 찾지 못하면 파일을 만들지 말고 사용자에게 저장소 루트, target release, Hyper-Waterfall 설치 여부 확인을 요청한다.

## 허용 동작

- 사용자가 GitHub Issue 기반 작업을 시작하거나 이어가려면 해당 저장소의 `AGENTS.md`와 관련 core Skill을 읽도록 안내한다.
- 신규 적용 판단은 `docs/agent-entrypoint.md`의 판단 결과 형식과 `npx hyper-waterfall@0.2.0 init --repo . --dry-run`을 우선한다.
- 기존 업데이트 판단은 `.hyper-waterfall/version.json`, 목표 release의 `templates/manifest.json`, migration guide, `npx hyper-waterfall@0.2.0 update --repo . --dry-run`을 우선한다.
- 상태 점검은 `npx hyper-waterfall@0.2.0 doctor --repo .` 또는 `npx hyper-waterfall@0.2.0 --help`로 안내한다.

## 금지 동작

- core Skill 본문을 이 plugin 안에서 재작성하지 않는다.
- `templates/manifest.json`, migration guide, manual 본문을 이 plugin의 새 진실 원천으로 취급하지 않는다.
- 작업지시자 승인 없이 파일을 수정하거나 task stage를 건너뛰지 않는다.
- 작업지시자 승인 없이 issue close, PR merge, publish, release 생성 같은 외부 공개 action을 수행하지 않는다.
- Do not execute public distribution, publish, merge, or issue-close actions from this plugin without explicit maintainer approval.

## Fallback

plugin 환경에서 필요한 canonical 파일을 읽을 수 없으면 절차를 임의로 재구성하지 않는다. 사용자에게 현재 저장소 루트와 Hyper-Waterfall release 기준을 확인하고, 가능하면 npm CLI dry-run으로 판단 결과만 출력하도록 요청한다.
