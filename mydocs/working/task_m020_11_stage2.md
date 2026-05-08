# task_m020_11_stage2.md - 추가 배포 채널 전략 문서 작성 단계 보고서

GitHub Issue: [#11](https://github.com/postmelee/hyper-waterfall/issues/11)
구현계획서: [`task_m020_11_impl.md`](../plans/task_m020_11_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Stage 1에서 확정한 기준 문장과 비교 축을 바탕으로 추가 배포 채널 전략 문서를 작성하는 단계다.

이번 단계에서는 `docs/distribution-channels.md`를 신설해 GitHub Release/tag, npm CLI, Homebrew, Docker, Codex plugin, Claude plugin의 목적, 비목표, 운영 비용, 우선순위, 후속 마일스톤 후보를 정리했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/distribution-channels.md` | 추가 배포 채널 전략 문서 신설. canonical 기준, 채널별 비교, 채널별 세부 판단, 구현 우선순위, 후속 마일스톤 후보, 보류 항목과 리스크, 검증 기준 정리 |
| `mydocs/working/task_m020_11_stage2.md` | Stage 2 변경 범위와 검증 결과 기록 |

## 본문 변경 정도 / 본문 무손실 여부

신규 문서 2개만 작성했다. 기존 README, docs, templates, manual, Skill 본문은 수정하지 않았다.

`docs/distribution-channels.md`는 구현 명세가 아니라 전략 판단 문서다. 실제 Homebrew formula, Docker image, Codex plugin, Claude plugin packaging은 작성하지 않았고, 후속 마일스톤 후보로만 분리했다.

## 주요 결정

| 항목 | 결정 |
|---|---|
| canonical 기준 | GitHub Release/tag + `templates/manifest.json` + migration guide를 유지한다. |
| 추가 채널 성격 | npm, Homebrew, Docker, Codex plugin, Claude plugin은 프로토콜 실행 수단으로 제한한다. |
| P0 | GitHub Release/tag + manifest + migration guide 유지, npm CLI 안정화 |
| P1 | Homebrew formula/tap PoC |
| P2 | Docker read-only image PoC |
| P3 | Codex plugin packaging 검증, Claude plugin packaging 검증 |
| 보류 | 실제 formula/image/plugin 구현, 자동 릴리스 파이프라인, 자동 파일 적용, 자동 PR 생성, 자동 병합 |

## 검증 결과

실행 명령:

```bash
test -f docs/distribution-channels.md
rg -n 'Homebrew|Docker|Codex plugin|Claude plugin|npm|GitHub Release|manifest|migration|canonical' docs/distribution-channels.md
rg -n '목적|비목표|사용자|운영 비용|우선순위|후속 마일스톤|보류|프로토콜 실행 수단' docs/distribution-channels.md
git diff --check
```

결과:

- OK: `docs/distribution-channels.md` 파일이 존재한다.
- OK: Homebrew, Docker, Codex plugin, Claude plugin, npm, GitHub Release, manifest, migration, canonical 키워드가 확인됐다.
- OK: 목적, 비목표, 사용자, 운영 비용, 우선순위, 후속 마일스톤, 보류, 프로토콜 실행 수단 키워드가 확인됐다.
- OK: `git diff --check`가 경고 없이 통과했다.

## 잔여 위험

- README에는 아직 전략 문서 링크가 없다. Stage 3에서 README 연결과 통합 검증을 수행해야 한다.
- Homebrew, Docker, Codex plugin, Claude plugin의 실제 packaging 사양은 구현하지 않았다. 후속 이슈에서 각 채널별 최신 사양을 확인해야 한다.
- 실제 `v0.2.0` GitHub Release/tag, npm publish, checksum 확정은 이번 Stage 범위가 아니다.

## 다음 단계 영향

- Stage 3은 README의 기존 배포·업데이트 안내 주변에 `docs/distribution-channels.md` 링크와 짧은 경계 설명을 추가한다.
- Stage 3에서는 상세 비교표를 README로 옮기지 않고, 전략 문서로 연결만 한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 `README 연결과 전략 검증 정리`로 진행한다.
