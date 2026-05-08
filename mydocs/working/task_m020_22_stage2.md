# Task #22 Stage 2 보고서 - README 상단 빠른 적용 안내 추가

GitHub Issue: [#22](https://github.com/postmelee/hyper-waterfall/issues/22)
구현계획서: [`task_m020_22_impl.md`](../plans/task_m020_22_impl.md)
Stage: 2

## 단계 목적

README 첫 화면 근처에 사용자가 바로 복사할 수 있는 Hyper-Waterfall 적용 안내를 추가하고, 기존 `새 저장소에 빠르게 적용하기` 섹션은 상세 안내 역할로 유지한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | 소개 블록 직후 `바로 적용하기` 섹션을 추가하고, 적용 프롬프트와 `docs/agent-entrypoint.md` 기준, 승인 게이트, dry-run 보조 채널 경계를 짧게 연결 |
| `mydocs/working/task_m020_22_stage2.md` | Stage 2 변경 내용, 검증 결과, README diff 수동 확인 결과 기록 |

## 본문 변경 정도 / 본문 무손실 여부

README 상단에 신규 안내 섹션만 추가했다. 기존 `새 저장소에 빠르게 적용하기` 섹션, npm CLI dry-run 예시, lifecycle/canonical 기준 설명은 삭제하거나 재작성하지 않았다.

## 변경 내용

- README 제목, 소개 문단, 원칙 인용문 직후에 `### 바로 적용하기` 섹션을 추가했다.
- AI 코딩 도구에 보낼 한 줄 적용 프롬프트를 상단에서 바로 확인할 수 있게 했다.
- `docs/agent-entrypoint.md`가 적용 기준이며, 파일 변경 전 작업지시자 승인을 요청한다는 점을 상단 안내에 명시했다.
- npm CLI는 dry-run 판단 보조 채널로만 표현하고, canonical 기준이 GitHub Release/tag, `templates/manifest.json`, migration guide임을 유지했다.
- 기존 README 하단의 상세 섹션은 그대로 두어 새 사용자에게는 상단 요약, 더 읽을 사용자에게는 상세 안내가 제공되도록 했다.

## 검증 결과

실행 명령:

```bash
rg -n '빠르게 적용|agent-entrypoint|npx hyper-waterfall|GitHub Release|manifest|migration|새 저장소에 빠르게 적용하기' README.md
sed -n '1,130p' README.md
sed -n '270,310p' README.md
git diff -- README.md
git diff --check
```

결과:

- OK: `rg` 결과 README 21행에 `docs/agent-entrypoint.md`, GitHub Release/tag, manifest, migration guide 연결 문구가 추가됐다.
- OK: `rg` 결과 README 288행 이후 기존 `새 저장소에 빠르게 적용하기` 섹션과 305~307행의 `npx hyper-waterfall` dry-run 예시가 유지됐다.
- OK: `sed -n '1,130p' README.md`로 첫 화면 상단에서 `바로 적용하기` 섹션, 적용 프롬프트, 승인 게이트 문구를 확인했다.
- OK: `sed -n '270,310p' README.md`로 기존 상세 섹션이 보존됐음을 확인했다.
- OK: `git diff -- README.md` 수동 확인 결과 README 상단에 신규 섹션만 추가됐고 기존 상세 섹션 변경은 없다.
- OK: `git diff --check` 통과.

## 잔여 위험

- 상단 안내와 기존 상세 섹션이 같은 적용 프롬프트를 공유하므로 중복 자체는 남는다. 다만 상단은 첫 화면 요약, 기존 섹션은 상세 안내로 역할이 분리되어 있다.

## 다음 단계 영향

- Stage 3에서는 이슈 검증 기준을 다시 실행하고, README 전체 정합성과 수용 기준 충족 여부를 정리한다.
- Stage 3에서 불필요한 중복이나 배포 상태 오인 가능성이 발견되면 README를 최소 보강한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 정합성 검증과 수용 기준 확인으로 진행한다.
