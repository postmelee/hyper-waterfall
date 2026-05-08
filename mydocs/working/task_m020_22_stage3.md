# Task #22 Stage 3 보고서 - README 빠른 적용 안내 정합성 검증

GitHub Issue: [#22](https://github.com/postmelee/hyper-waterfall/issues/22)
구현계획서: [`task_m020_22_impl.md`](../plans/task_m020_22_impl.md)
Stage: 3

## 단계 목적

README 상단 빠른 적용 안내가 이슈 수용 기준과 배포 lifecycle 기준을 해치지 않는지 확인하고, 최종 보고서 작성 전 검증 결과와 잔여 위험을 정리한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m020_22_stage3.md` | README 빠른 적용 안내의 정합성 검증 결과, 수용 기준 충족 여부, 잔여 위험 기록 |

## 본문 변경 정도 / 본문 무손실 여부

Stage 3에서는 README 본문을 추가 수정하지 않았다. Stage 2에서 추가한 상단 안내가 충분히 범위 안에 있고, 기존 `새 저장소에 빠르게 적용하기` 섹션과 canonical 기준 설명이 보존되어 있어 보강이 필요하지 않다고 판단했다.

## 수용 기준 확인

| 수용 기준 | 결과 | 근거 |
|---|---|---|
| README 첫 화면 근처에서 사용자가 적용 시작 방법을 빠르게 확인할 수 있다 | 충족 | README 14행 이후 `바로 적용하기` 섹션에서 적용 프롬프트를 바로 확인할 수 있다 |
| 안내 문구가 실제 배포 상태보다 앞서 `install` 완료를 암시하지 않는다 | 충족 | 상단 안내는 AI 적용 프롬프트와 dry-run 보조 채널만 언급하고 `install` 또는 publish 완료를 말하지 않는다 |
| `docs/agent-entrypoint.md`가 적용 절차 기준이라는 점이 유지된다 | 충족 | README 21행과 296행에서 `docs/agent-entrypoint.md` 기준을 명시한다 |
| 기존 `새 저장소에 빠르게 적용하기` 섹션과 역할이 중복되지 않는다 | 충족 | 상단은 첫 화면 요약, README 288행 이후 섹션은 상세 안내와 npm CLI dry-run 예시 역할을 유지한다 |
| canonical 기준인 GitHub Release/tag, `templates/manifest.json`, migration guide를 흐리지 않는다 | 충족 | README 21행과 300행에서 GitHub Release/tag, manifest, migration guide 기준을 유지한다 |

## 검증 결과

실행 명령:

```bash
rg -n '빠르게 적용|agent-entrypoint|npx hyper-waterfall|GitHub Release|manifest|migration' README.md
git diff --check
git status --short --branch
git show --stat --oneline -- README.md
git show -- README.md
```

결과:

- OK: `rg` 결과 README 21행에 상단 안내의 `docs/agent-entrypoint.md`, GitHub Release/tag, manifest, migration guide 기준 문구가 있다.
- OK: `rg` 결과 README 288행 이후 기존 `새 저장소에 빠르게 적용하기` 섹션과 305~307행의 `npx hyper-waterfall` dry-run 예시가 유지되어 있다.
- OK: `git diff --check` 통과.
- OK: `git status --short --branch`는 작업 브랜치 `local/task22`와 기존 untracked 파일 `DESIGN.md`, `README_draft.md`, `opus_report.md`만 보여준다.
- OK: `git show --stat --oneline -- README.md` 결과 Stage 2 README 변경은 8줄 추가로 제한되어 있다.
- OK: `git show -- README.md` 수동 확인 결과 README 상단에 신규 안내만 추가됐고 기존 상세 섹션은 변경되지 않았다.

## 잔여 위험

- 상단 안내와 기존 상세 섹션에 같은 적용 프롬프트가 한 번씩 나타난다. 그러나 첫 화면 요약과 상세 안내라는 역할 분리가 명확하므로 현재 범위에서는 추가 축약하지 않는다.
- `git status --short --branch`에 보이는 `DESIGN.md`, `README_draft.md`, `opus_report.md`는 이번 task에서 생성하거나 수정한 파일이 아니므로 커밋 대상에서 제외한다.

## 다음 단계 영향

- 모든 Stage가 완료되었으므로 다음 승인을 받으면 `task-final-report` 절차로 최종 결과보고서, 오늘할일 완료 처리, PR 게시 준비를 진행한다.
- 최종 보고 전에는 `rg`와 `git diff --check`를 다시 실행해 Stage 3 이후 상태를 확인한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 최종 결과보고서 작성 단계로 진행한다.
