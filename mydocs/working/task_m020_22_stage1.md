# Task #22 Stage 1 보고서 - README 빠른 적용 안내 위치 조사

GitHub Issue: [#22](https://github.com/postmelee/hyper-waterfall/issues/22)
구현계획서: [`task_m020_22_impl.md`](../plans/task_m020_22_impl.md)
Stage: 1

## 단계 목적

README 본문을 수정하기 전에 첫 화면 상단, 목차, 기존 `새 저장소에 빠르게 적용하기` 섹션의 역할을 비교하고, 상단 빠른 적용 안내의 위치와 중복 방지 기준을 확정한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m020_22_stage1.md` | README 빠른 적용 안내 위치, 기존 섹션 역할, Stage 2 반영 기준, 검증 결과 기록 |

## 본문 변경 정도 / 본문 무손실 여부

Stage 1에서는 README와 기준 문서 본문을 변경하지 않았다. 기존 본문은 무손실이며, 조사 결과만 본 단계 보고서에 신규 작성했다.

## 조사 결과

- README 첫 화면 상단에는 프로젝트 소개와 원칙이 먼저 나오지만, 사용자가 바로 복사할 적용 프롬프트는 없다.
- 적용 프롬프트는 `새 저장소에 빠르게 적용하기` 섹션의 README 280행 이후에만 있으며, 목차를 거쳐 내려가야 확인할 수 있다.
- README 203행과 205행은 `docs/agent-entrypoint.md`, GitHub Release/tag, manifest, migration guide를 설명하지만 사용자 즉시 실행 안내라기보다 저장소가 한 일의 설명에 가깝다.
- 기존 빠른 적용 섹션은 프롬프트, `docs/agent-entrypoint.md`, 승인 게이트, 기존 업데이트, npm CLI dry-run, 추가 배포 채널까지 다루므로 상세 안내 역할을 유지하는 편이 적절하다.
- `docs/agent-entrypoint.md`는 신규 적용과 기존 업데이트 모두 파일 변경 전 판단 결과와 작업지시자 승인을 요구한다.
- `docs/distribution-channels.md`와 migration guide는 GitHub Release/tag, `templates/manifest.json`, migration guide가 canonical 기준이며 npm CLI는 편의 실행 채널임을 반복한다.

## Stage 2 반영 기준

- README 첫 제목과 프로젝트 설명 직후, `적용하면 바로 달라지는 것` 이전에 상단 빠른 적용 안내를 추가한다.
- 상단 안내는 3~5줄 수준으로 제한하고, 적용 프롬프트와 `docs/agent-entrypoint.md` 링크만 짧게 연결한다.
- 기존 `새 저장소에 빠르게 적용하기` 섹션은 상세 안내로 유지한다.
- npm CLI는 상단 안내에서 주요 적용 경로처럼 강조하지 않는다. 필요 시 기존 섹션의 dry-run 예시만 유지한다.
- `install`, npm publish 완료, GitHub Release/tag 생성 완료처럼 현재 배포 상태를 앞서 암시하는 표현은 쓰지 않는다.
- canonical 기준인 GitHub Release/tag, `templates/manifest.json`, migration guide, 승인 게이트를 흐리는 문구는 피한다.

## 검증 결과

실행 명령:

```bash
rg -n '빠르게 적용|agent-entrypoint|npx hyper-waterfall|GitHub Release|manifest|migration|새 저장소에 빠르게 적용하기' README.md docs/agent-entrypoint.md docs/distribution-channels.md docs/migrations templates/manifest.json
sed -n '1,120p' README.md
sed -n '270,310p' README.md
git diff --check
```

결과:

- OK: `rg`로 README의 관련 위치를 확인했다. 상단 관련 설명은 README 203행, 205행에 있고, 실제 빠른 적용 섹션은 README 280행 이후에 있다.
- OK: 기존 빠른 적용 섹션은 README 280~299행에서 적용 프롬프트, `docs/agent-entrypoint.md`, 기존 업데이트 기준, npm CLI dry-run 예시를 포함한다.
- OK: `docs/agent-entrypoint.md`, `docs/distribution-channels.md`, `docs/migrations/`에서 GitHub Release/tag, manifest, migration guide, 승인 게이트 기준이 확인된다.
- OK: `sed -n '1,120p' README.md`로 첫 화면 상단에 즉시 복사 가능한 적용 프롬프트가 없음을 확인했다.
- OK: `sed -n '270,310p' README.md`로 기존 빠른 적용 섹션이 상세 안내 역할을 하고 있음을 확인했다.
- OK: `git diff --check` 통과.

## 잔여 위험

- Stage 2에서 상단 안내가 기존 섹션과 같은 내용을 길게 반복하면 README 첫 화면이 과밀해질 수 있다.
- npm CLI dry-run 예시가 상단 안내와 결합되면 아직 확정되지 않은 배포 상태를 사용자가 오인할 수 있다.

## 다음 단계 영향

- Stage 2는 README 상단에 짧은 적용 안내를 추가하고, 기존 `새 저장소에 빠르게 적용하기` 섹션은 상세 안내로 유지한다.
- Stage 2에서 README 외 매뉴얼, SKILL, CLI 동작, release/tag/npm publish는 변경하지 않는다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2에서 README 상단 빠른 적용 안내를 반영한다.
