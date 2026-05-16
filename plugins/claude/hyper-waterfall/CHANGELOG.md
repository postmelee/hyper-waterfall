# Changelog

## 0.2.0-candidate.1 public readiness notes - 2026-05-17

- Task #54에서 public 제출 전 source review와 permission 안내를 README에 보강했다.
- Public directory 제출과 GitHub Release asset 게시는 별도 승인 전 실행하지 않는다.
- Plugin 구성은 manifest, thin wrapper Skill, README, CHANGELOG 4개 파일과 hook 없는 구조를 유지한다.

## 0.2.0-candidate.1 - 2026-05-16

- Claude Code용 Hyper-Waterfall plugin 후보를 추가했다.
- `.claude-plugin/plugin.json` manifest를 추가했다.
- `skills/hyper-waterfall/SKILL.md` thin wrapper Skill을 추가했다.
- `hooks/hooks.json`은 포함하지 않았다.
- 기준 입력은 Task #36 공통 plugin 원칙과 Task #39 Claude plugin packaging 검증 결과다.
- Claude Code `2.1.143`에서 directory load, zip load, component inventory smoke를 통과했다.
