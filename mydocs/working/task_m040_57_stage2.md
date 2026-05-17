# Task #57 Stage 2 완료 보고서 - 신규 적용 strict 범위 규칙 반영

GitHub Issue: [#57](https://github.com/postmelee/hyper-waterfall/issues/57)
구현계획서: [`task_m040_57_impl.md`](../plans/task_m040_57_impl.md)
Stage: 2

## 단계 목적

Stage 2는 신규 적용 중 manifest 외 산출물이 생성되지 않도록 entrypoint, manifest, 문서 구조 매뉴얼에 strict 범위 규칙을 반영하는 단계다. `/docs`의 대상 저장소 내 의미를 정의하지 않고, `docs/**`는 신규 적용 중 생성/수정 금지 예시로만 다뤘다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/agent-entrypoint.md` | adoption-only strict manifest 원칙, 신규 적용 범위 제한 섹션, manifest 외 보류 후보 항목, 금지 규칙 추가 |
| `templates/manifest.json` | `applicationMode`, `strictManifest`, `forbiddenTargetsOnAdoption`, `outOfScopeArtifactPolicy` top-level 필드 추가 |
| `templates/mydocs/manual/document_structure_guide.md` | strict manifest 신규 적용 경계, 금지 예시, 제품 고유 산출물 보류/별도 task 분리 원칙 추가 |
| `mydocs/working/task_m040_57_stage2.md` | Stage 2 완료 보고서 작성 |
| `mydocs/orders/20260517.md` | #57 비고를 Stage 2 완료와 Stage 3 승인 대기로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

기존 문서를 재작성하지 않고 신규 적용 범위 제한 문장과 manifest top-level 필드만 추가했다. `docs/**`는 적용 중 금지 예시로만 기록했고, 대상 저장소의 일반 문서 구조나 제품 문서 위치를 정의하지 않았다.

`templates/manifest.json`은 기존 `schemaVersion`, `frameworkVersion`, `release`, `versionState`, `updatePolicies`, `files[]` 구조를 유지했다. 새 필드는 additive 변경이며 기존 target 목록이나 update policy를 바꾸지 않았다.

## 검증 결과

실행 명령:

```bash
node -e "JSON.parse(require('fs').readFileSync('templates/manifest.json', 'utf8')); console.log('ok')"
rg -n "strict|manifest 외|생성/수정 금지|docs/|src/|examples/|schemas/|별도 task|제품 고유|forbidden|applicationMode|strictManifest" docs/agent-entrypoint.md templates/manifest.json templates/mydocs/manual/document_structure_guide.md
rg -n "docs/.*제품|제품/사용자/배포 문서|mydocs/manual.*아키텍처|mydocs/manual.*로드맵|mydocs/manual.*API" docs/agent-entrypoint.md templates/mydocs/manual/document_structure_guide.md README.md || true
git diff --check
```

결과:

- OK: manifest JSON 파싱 명령은 `ok`를 출력했다.
- OK: strict/forbidden 검색에서 `applicationMode`, `strictManifest`, `forbiddenTargetsOnAdoption`, 신규 적용 범위 제한, `docs/**`, `src/**`, `examples/**`, `schemas/**`, 별도 task 후보 문구가 확인됐다.
- OK: 금지 후보 검색은 출력이 없었다. 즉 `/docs`를 대상 저장소의 제품/사용자/배포 문서 위치로 규정하거나, `mydocs/manual`을 제품 아키텍처/로드맵/API 문서 목적지로 유도하는 문구는 확인되지 않았다.
- OK: `git diff --check`가 출력 없이 통과했다.

## 잔여 위험

- 새 manifest 필드는 문서/manifest 기준을 세우는 additive 데이터이며, 현재 CLI가 강제 검증하는 로직은 아직 없다.
- README는 아직 수정하지 않았다. Stage 3에서 새 entrypoint/manifest 설명과 README 적용 안내가 충돌하는지 확인해야 한다.
- `docs/**` 금지 예시가 향후 독자가 대상 저장소의 일반 문서 구조 금지로 오해하지 않도록 PR 리뷰에서 문구를 다시 확인할 필요가 있다.

## 다음 단계 영향

- Stage 3는 README 수정 필요 여부를 확인한다.
- Stage 3는 `/docs` 역할 미규정, `mydocs/manual` 경계, manifest JSON 파싱, README/entrypoint/manual/manifest 정합성을 다시 검증한다.
- README가 이미 `docs/agent-entrypoint.md`와 manifest 기준 적용을 충분히 안내하면 수정하지 않고 근거를 남긴다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3로 진행한다.
