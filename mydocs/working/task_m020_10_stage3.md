# task_m020_10_stage3.md - doctor 진단과 비파괴 안전장치 구현 단계 보고서

GitHub Issue: [#10](https://github.com/postmelee/hyper-waterfall/issues/10)
구현계획서: [`task_m020_10_impl.md`](../plans/task_m020_10_impl.md)
Stage: 3

## 단계 목적

Stage 3은 `doctor` 명령을 Stage 1의 scaffold에서 실제 lifecycle 진단 명령으로 바꾸는 단계다. 이번 단계에서는 version state, manifest source/target, symlink, template placeholder 상태를 `OK`, `WARN`, `ERROR`, `INFO` 수준으로 출력하고, 자동 수정 없이 승인 후 task workflow로 넘긴다는 안전 경계를 명시했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `src/commands/doctor.js` | manifest/version reader 기반 doctor 진단, version/source/target/symlink/placeholder 진단, 안전 문구 추가 |
| `src/lib/manifest.js` | target/source absolute path와 symlink target 정보를 status 요약에 포함 |
| `src/lib/output.js` | `renderDiagnosticReport` 추가 |
| `test/cli-smoke.test.js` | doctor 진단 출력과 비파괴 안전 문구 smoke test 추가 |

파일 규모:

```text
255 src/commands/doctor.js
226 src/lib/manifest.js
171 src/lib/output.js
113 test/cli-smoke.test.js
765 total
```

## 본문 변경 정도 / 본문 무손실 여부

이번 단계는 CLI 코드와 테스트만 수정했다. README, 매뉴얼, migration guide, manifest 본문은 수정하지 않았다. `doctor`는 `fs.lstatSync`, `fs.readlinkSync`, `fs.readFileSync` 등 read-only API만 사용하며 파일 복사, 덮어쓰기, symlink 재생성, PR 생성을 수행하지 않는다.

## 검증 결과

실행 명령:

```bash
node bin/hyper-waterfall.js doctor --repo . --manifest templates/manifest.json
rg -n 'OK|WARN|ERROR|INFO|자동 수정하지 않습니다|승인' src test
rg -n 'writeFile|copyFile|rename|unlink|rmSync|mkdir|symlink' src || true
npm test
git diff --check
```

결과:

- OK: `doctor`가 `doctor 진단 결과`, `Levels: OK, WARN, ERROR, INFO`, summary, diagnostics, safety 섹션을 출력했다.
- OK: version state 누락은 `[WARN] version-state`로 표시되고, 승인 후 생성해야 한다는 문구가 출력됐다.
- OK: manifest source 17개는 `[OK] manifest-source`로 확인됐고, target 누락 2개는 `[WARN] manifest-target`와 `[INFO] manifest-target` 세부 항목으로 출력됐다.
- OK: `.agents/skills`, `.claude/skills` symlink는 `[OK] symlink`로 확인됐다.
- OK: `templates/AGENTS.md`, `templates/.github/pull_request_template.md` placeholder 보존 여부가 `[OK] placeholder`로 확인됐다.
- OK: `rg -n 'OK|WARN|ERROR|INFO|자동 수정하지 않습니다|승인' src test`가 doctor 출력 레벨과 안전 문구를 확인했다.
- OK: write API 확인 명령에서 `writeFile`, `copyFile`, `rename`, `unlink`, `rmSync`, `mkdir` 사용은 없고, symlink 관련 진단 문자열과 `readlinkSync`만 확인됐다.
- OK: `npm test`가 Node test 7개를 모두 통과했다.
- OK: `git diff --check`가 경고 없이 통과했다.

## 잔여 위험

- `doctor`의 placeholder 점검은 MVP 범위에서 `templates/AGENTS.md`와 `templates/.github/pull_request_template.md`의 핵심 placeholder만 확인한다. 전체 template tree의 모든 placeholder 정책 검증은 후속 확장 범위다.
- `doctor`는 target 누락과 symlink 상태를 진단하지만 자동 복구하지 않는다. Stage 4 README에서 이 비파괴 경계를 사용자 안내에 반영해야 한다.

## 다음 단계 영향

- Stage 4는 README에 `npx hyper-waterfall init`, `update`, `doctor` 예시를 추가하고, npm CLI가 canonical 배포 단위가 아니라 편의 실행 채널이라는 설명을 맞추면 된다.
- Stage 4 통합 검증은 `init`, `update`, `doctor`, `npm test`, manifest JSON parse를 모두 다시 실행해야 한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4 `README와 로컬 검증 정리` 구현으로 진행한다.
