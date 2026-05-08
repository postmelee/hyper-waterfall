# task_m020_10_stage2.md - manifest와 version 판단 출력 구현 단계 보고서

GitHub Issue: [#10](https://github.com/postmelee/hyper-waterfall/issues/10)
구현계획서: [`task_m020_10_impl.md`](../plans/task_m020_10_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Stage 1에서 만든 CLI 골격에 manifest/version 읽기와 lifecycle 판단 결과 출력을 붙이는 단계다. 이번 단계에서는 `init`과 `update`가 `templates/manifest.json`, `.hyper-waterfall/version.json`, migration guide 후보를 읽고, 파일 변경 전 작업지시자가 승인할 수 있는 판단 결과를 출력하도록 구현했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `src/lib/manifest.js` | manifest 경로 해석, JSON parse, 필수 필드 검증, source/target 상태 요약, init/update 후보 분류 추가 |
| `src/lib/version-state.js` | `.hyper-waterfall/version.json` 존재 여부와 JSON parse 결과를 읽는 reader 추가 |
| `src/lib/output.js` | lifecycle 판단 결과 섹션 렌더링 helper 추가 |
| `src/commands/init.js` | manifest 기반 신규 적용 판단 결과 출력으로 scaffold 대체 |
| `src/commands/update.js` | version state, migration guide, manifest diff 후보 기반 기존 업데이트 판단 결과 출력으로 scaffold 대체 |
| `test/cli-smoke.test.js` | `init --dry-run`, `update --dry-run` 출력 필드 smoke test 추가 |

파일 규모:

```text
219 src/lib/manifest.js
56 src/lib/version-state.js
142 src/lib/output.js
133 src/commands/init.js
182 src/commands/update.js
93 test/cli-smoke.test.js
825 total
```

## 본문 변경 정도 / 본문 무손실 여부

이번 단계는 Stage 1 CLI 코드의 내부 동작과 테스트만 수정했다. README, 매뉴얼, migration guide, manifest 원문은 수정하지 않았다. CLI는 manifest와 version state를 읽지만 파일 쓰기, 자동 적용, 자동 덮어쓰기, symlink 수정, PR 생성을 수행하지 않는다.

## 검증 결과

실행 명령:

```bash
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --dry-run
node bin/hyper-waterfall.js update --repo . --manifest templates/manifest.json --from v0.1.0 --to v0.2.0 --dry-run
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n '현재 version|목표 release/tag|manifest diff|자동 적용 가능|수동 확인 필요|conflict|보류|승인 요청' src test
npm test
git diff --check
```

결과:

- OK: `init --dry-run`이 `신규 적용 판단 결과`, 대상 저장소, 목표 release/tag, manifest 기준 적용 후보, 기존 파일 충돌 가능성, version 생성 계획, placeholder 체크리스트, 승인 요청을 출력했다.
- OK: `update --dry-run`이 `기존 업데이트 판단 결과`, 현재 version, 목표 release/tag, migration guide, manifest diff, 자동 적용 가능, 수동 확인 필요, conflict, 보류, 승인 요청을 출력했다.
- OK: `ruby -rjson`으로 `templates/manifest.json`이 parse됨을 확인했다.
- OK: `rg`로 Stage 2 구현과 테스트에 lifecycle 출력 필드명이 존재함을 확인했다.
- OK: `npm test`가 Node test 6개를 모두 통과했다.
- OK: `git diff --check`가 경고 없이 통과했다.

## 잔여 위험

- Stage 2의 `manifest diff`는 실제 이전 release manifest와 checksum을 비교하는 완전한 diff가 아니라, 현재 target 존재 여부와 update policy 기반 MVP 후보 분류다.
- `doctor`는 아직 version, target, symlink, template 상태를 진단하지 않는다. Stage 3에서 같은 manifest/version reader를 재사용해 진단 출력을 추가해야 한다.
- 자동 적용 가능 항목은 checksum 확정 전에는 실제 적용하지 않는다는 경계를 Stage 3~4 help/README에서도 유지해야 한다.

## 다음 단계 영향

- Stage 3은 `src/lib/manifest.js`의 target/source status와 `src/lib/version-state.js` reader를 그대로 사용해 `doctor` 진단을 구현하면 된다.
- Stage 3에서는 `OK`, `WARN`, `ERROR`, `INFO` 수준을 추가하고, 자동 수정 금지 문구와 쓰기 API 부재를 검증한다.
- Stage 4 README는 Stage 2 출력 필드와 Stage 3 doctor 진단 결과가 확정된 뒤 npm CLI 예시로 연결한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 `doctor 진단과 비파괴 안전장치 보강` 구현으로 진행한다.
