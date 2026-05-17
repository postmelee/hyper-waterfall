# Task #57 Stage 1 완료 보고서 - 신규 적용 문서 경계 점검

GitHub Issue: [#57](https://github.com/postmelee/hyper-waterfall/issues/57)
구현계획서: [`task_m040_57_impl.md`](../plans/task_m040_57_impl.md)
Stage: 1

## 단계 목적

Stage 1은 신규 적용 strict 범위 규칙을 실제 문서에 반영하기 전에 현재 `docs/agent-entrypoint.md`, `templates/manifest.json`, `templates/mydocs/manual/document_structure_guide.md`, `README.md`의 표현을 점검하는 단계다. 이번 단계에서는 운영 문서 본문과 manifest를 수정하지 않고, `/docs` 의미 정의와 `mydocs/manual` 오염 가능성을 먼저 확인했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m040_57_stage1.md` | 현재 신규 적용 절차, manifest, 문서 경계 점검 결과와 Stage 2 수정 후보 정리 |
| `mydocs/orders/20260517.md` | #57 비고를 Stage 1 완료와 Stage 2 승인 대기로 갱신 |

## 본문 변경 정도 / 본문 무손실 여부

신규 단계 보고서 1개를 작성했고, 오늘할일의 #57 행 비고만 갱신했다. `docs/agent-entrypoint.md`, `templates/manifest.json`, `templates/mydocs/manual/document_structure_guide.md`, `README.md`는 Stage 1에서 읽기만 했고 본문은 수정하지 않았다.

Stage 시작 전 `origin/main`에 #52가 merge되어 `mydocs/orders/20260517.md`가 변경된 상태였다. `local/task57`을 `origin/main` 위로 rebase했고, 충돌은 #52 완료 행을 보존하면서 #57 행을 유지하는 방식으로 해소했다.

## 검증 결과

실행 명령:

```bash
git status --short --branch
git worktree list
rg -n "신규 적용|manifest|docs/|mydocs/manual|아키텍처|로드맵|제품 문서|제품 고유|별도 task" docs/agent-entrypoint.md templates/manifest.json templates/mydocs/manual/document_structure_guide.md README.md
rg -n "docs/.*제품|제품/사용자/배포 문서|mydocs/manual.*아키텍처|mydocs/manual.*로드맵|mydocs/manual.*API" docs/agent-entrypoint.md templates/mydocs/manual/document_structure_guide.md README.md || true
git diff --check
```

결과:

- OK: `git status --short --branch`는 `local/task57...origin/main [ahead 2]`를 출력했다.
- OK: `git worktree list`에서 기본 worktree, `local/task41`, `local/task57` 분리 worktree를 확인했다.
- OK: broad `rg` 검색에서 현재 신규 적용과 manifest 기준 설명은 확인됐다. 주요 위치는 `docs/agent-entrypoint.md`의 원칙/신규 적용 절차/판단 결과 형식, `templates/manifest.json`의 대상 파일 목록, `templates/mydocs/manual/document_structure_guide.md`의 배포 manifest와 버전 기록 정책, `README.md`의 적용 진입 안내다.
- OK: 금지 후보 검색은 출력이 없었다. 즉 대상 파일들에서 `/docs`를 적용 대상 프로젝트의 제품/사용자/배포 문서 위치로 규정하거나, `mydocs/manual`을 제품 아키텍처/로드맵/API 문서 목적지로 유도하는 직접 문구는 발견되지 않았다.
- OK: `git diff --check`가 출력 없이 통과했다.

## 점검 결과와 Stage 2 수정 후보

- `docs/agent-entrypoint.md`는 신규 적용이 `templates/manifest.json`과 manifest 대상 파일/심볼릭 링크 기준이라고 말하지만, manifest 외 파일 생성 금지를 독립 규칙으로 표현하지 않는다.
- `docs/agent-entrypoint.md`의 신규 적용 판단 결과는 manifest 기준 적용 후보와 보류 항목을 다루지만, 제품 고유 산출물을 생성하지 않고 별도 task 후보로만 기록하라는 문구가 없다.
- `templates/manifest.json`은 `files[]` allowlist를 제공하지만, 신규 적용 모드와 strict 적용 여부를 기계적으로 읽을 top-level 필드가 없다.
- `templates/mydocs/manual/document_structure_guide.md`는 manifest 역할과 lifecycle 판단 결과를 설명하지만, 신규 적용에서 manifest 외 산출물을 만들지 않는다는 경계는 부족하다.
- `README.md`는 `docs/agent-entrypoint.md`와 manifest 기준 적용을 안내한다. Stage 2 반영 후 충돌이 없으면 Stage 3에서 수정하지 않아도 될 가능성이 있다.
- `/docs`는 현재 프레임워크 내부 문서 경로와 release/migration 문서 위치로 쓰인다. Stage 2에서는 대상 저장소의 `/docs` 의미를 정의하지 않고, `docs/**`를 신규 적용 중 생성/수정 금지 예시로만 다뤄야 한다.

## 잔여 위험

- Stage 2에서 `docs/**` 금지 예시를 추가할 때 대상 저장소의 일반 문서 구조를 정의하는 문장으로 번질 수 있다.
- `templates/manifest.json`에 새 필드를 추가하면 현재 문서상 schemaVersion은 유지되지만, 후속 CLI/doctor가 이를 아직 강제하지 못한다.
- README 수정 여부는 Stage 2 실제 문구를 본 뒤 다시 판단해야 한다.

## 다음 단계 영향

- Stage 2는 `docs/agent-entrypoint.md`에 manifest 외 생성 금지와 제품 고유 산출물 보류/별도 task 분리 규칙을 명시한다.
- Stage 2는 `templates/manifest.json`에 additive strict 필드를 추가하되 기존 `files[]`, `updatePolicies`, checksum 구조를 바꾸지 않는다.
- Stage 2는 `templates/mydocs/manual/document_structure_guide.md`에 lifecycle 경계를 짧게 보강한다.
- Stage 2에서도 제품 고유 문서를 `mydocs/manual`로 유도하거나 `/docs`의 대상 저장소 역할을 정의하지 않는다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
