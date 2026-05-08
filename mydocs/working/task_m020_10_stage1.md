# task_m020_10_stage1.md - npm CLI 골격 추가 단계 보고서

GitHub Issue: [#10](https://github.com/postmelee/hyper-waterfall/issues/10)
구현계획서: [`task_m020_10_impl.md`](../plans/task_m020_10_impl.md)
Stage: 1

## 단계 목적

Stage 1은 npm CLI MVP의 실행 골격을 추가하는 단계다. 실제 manifest/version 판단 로직은 Stage 2 이후로 남기고, 이번 단계에서는 `hyper-waterfall` bin entry, command dispatcher, `init`/`update`/`doctor` command help, version 출력, 기본 smoke test를 먼저 고정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `package.json` | npm package metadata, `bin.hyper-waterfall`, `npm test` script, Node engine, publish 대상 파일 목록 추가 |
| `bin/hyper-waterfall.js` | Node shebang 기반 CLI entrypoint 추가 |
| `src/cli.js` | 전역 help/version, command dispatch, unknown command 처리 추가 |
| `src/commands/init.js` | `init` command help와 Stage 1 scaffold 실행 추가 |
| `src/commands/update.js` | `update` command help와 Stage 1 scaffold 실행 추가 |
| `src/commands/doctor.js` | `doctor` command help와 Stage 1 scaffold 실행 추가 |
| `src/lib/output.js` | option parse, help rendering, scaffold output helper 추가 |
| `test/cli-smoke.test.js` | 전역 help, version, command help, unknown command smoke test 추가 |

파일 규모:

```text
29 package.json
13 bin/hyper-waterfall.js
67 src/cli.js
52 src/commands/init.js
53 src/commands/update.js
50 src/commands/doctor.js
105 src/lib/output.js
49 test/cli-smoke.test.js
418 total
```

## 본문 변경 정도 / 본문 무손실 여부

이번 단계는 신규 CLI 코드와 테스트만 추가했다. 기존 README, 매뉴얼, manifest, 템플릿 본문은 수정하지 않았다. CLI는 Stage 1 범위에서 파일 쓰기, 복사, 덮어쓰기, symlink 수정, PR 생성을 수행하지 않고 help/scaffold 출력만 제공한다.

## 검증 결과

실행 명령:

```bash
node bin/hyper-waterfall.js --help
node bin/hyper-waterfall.js --version
node bin/hyper-waterfall.js init --help
node bin/hyper-waterfall.js update --help
node bin/hyper-waterfall.js doctor --help
npm pkg get name bin scripts.test
npm test
git diff --check
```

결과:

- OK: `node bin/hyper-waterfall.js --help`가 `init`, `update`, `doctor` command와 canonical 기준 문구를 출력했다.
- OK: `node bin/hyper-waterfall.js --version`이 `0.2.0`을 출력했다.
- OK: `init --help`, `update --help`, `doctor --help`가 각각 command별 usage/options를 출력했다.
- OK: `npm pkg get name bin scripts.test`가 package name `hyper-waterfall`, bin `./bin/hyper-waterfall.js`, test script `node --test`를 확인했다.
- OK: `npm test`가 Node test 4개를 모두 통과했다.
- OK: `git diff --check`가 경고 없이 통과했다.

## 잔여 위험

- Stage 1 command 실행은 아직 실제 manifest/version 상태를 읽지 않는다. Stage 2에서 `src/lib/manifest.js`, `src/lib/version-state.js`를 추가해 scaffold 출력을 실제 판단 결과 출력으로 바꿔야 한다.
- Stage 1의 command별 일반 실행은 "파일을 수정하지 않는다"는 안전 문구를 출력한다. 이 경계는 Stage 2~3에서도 유지해야 한다.

## 다음 단계 영향

- Stage 2는 현재 command dispatcher와 option parser를 그대로 사용해 `init`/`update`의 `--repo`, `--manifest`, `--from`, `--to`, `--dry-run` 동작을 구현하면 된다.
- `src/lib/output.js`는 Stage 2에서 lifecycle 판단 결과 섹션 렌더링을 담도록 확장할 수 있다.
- Smoke test는 Stage 2에서 manifest parse와 dry-run 출력 필드 검증으로 확장한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 `manifest/version 읽기와 init/update 판단 결과 출력` 구현으로 진행한다.
