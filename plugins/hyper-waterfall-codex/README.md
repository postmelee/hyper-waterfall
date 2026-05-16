# Hyper-Waterfall Codex Plugin Candidate

이 디렉터리는 Task #38에서 만든 Codex plugin 배포 후보이다. 목적은 Codex 사용자가 Hyper-Waterfall의 issue-first workflow, core Skill, lifecycle entrypoint를 쉽게 발견하게 하는 것이다.

This plugin is not a canonical source. Hyper-Waterfall의 canonical source는 GitHub Release/tag, `templates/manifest.json`, `docs/migrations/`, `docs/agent-entrypoint.md`, `templates/mydocs/skills/`, `templates/mydocs/manual/`, npm CLI다.

## 포함 파일

```text
plugins/hyper-waterfall-codex/
  .codex-plugin/
    plugin.json
  skills/
    hyper-waterfall/
      SKILL.md
  README.md
```

## 설계 원칙

- `.codex-plugin/plugin.json`은 `skills: "./skills/"`만 사용한다.
- `skills/hyper-waterfall/SKILL.md`는 thin wrapper이며 core Skill 본문을 복제하지 않는다.
- `templates/manifest.json`, migration guide, manual 전문은 plugin bundle에 포함하지 않는다.
- hooks, apps, MCP servers는 기본 bundle에 포함하지 않는다.
- public distribution은 smoke 결과와 작업지시자 별도 승인 전에는 실행하지 않는다.

## 사용 흐름

1. 현재 저장소의 `AGENTS.md`를 읽는다.
2. task 절차는 현재 저장소의 `mydocs/skills/{skill-name}/SKILL.md`를 읽고 따른다.
3. 신규 적용 또는 기존 업데이트 판단은 `docs/agent-entrypoint.md`와 npm CLI dry-run을 사용한다.
4. 필요한 canonical 파일이 없으면 파일을 만들지 말고 사용자에게 경로와 release 기준을 확인한다.

## Local smoke 후보

repo marketplace는 repository root의 `.agents/plugins/marketplace.json`에 둔다. Codex 공식 문서 기준으로 `source.path`는 marketplace root 기준으로 해석되므로 local marketplace add 후보는 repository root에서 다음 형태다.

```bash
codex plugin marketplace add .
```

이 명령은 local config/cache를 변경할 수 있으므로 별도 승인 후 실행한다. Task #52 Stage 2에서는 CLI `/plugins`에서 `Hyper-Waterfall Local Plugins`, `Hyper-Waterfall`, bundled Skill `hyper-waterfall:hyper-waterfall` 표시를 확인했고, `codex plugin marketplace remove hyper-waterfall-local`로 cleanup했다.

## 공개 배포 게이트

Do not execute public distribution from this plugin candidate without explicit maintainer approval. Local smoke 통과는 public 배포 승인이 아니다.

Task #52 기준으로 Codex 공식 self-serve public plugin publishing/management surface는 아직 확인되지 않았다. 따라서 public 배포는 보류하며, 대체 경로는 repo-local marketplace 등록, 현재 저장소의 `AGENTS.md`, `mydocs/skills/{skill-name}/SKILL.md`, `docs/agent-entrypoint.md`, npm CLI dry-run이다.
