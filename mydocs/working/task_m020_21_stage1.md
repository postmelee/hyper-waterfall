# task_m020_21_stage1.md - package metadata와 pack 구성 점검 단계 보고서

GitHub Issue: [#21](https://github.com/postmelee/hyper-waterfall/issues/21)
구현계획서: [`task_m020_21_impl.md`](../plans/task_m020_21_impl.md)
Stage: 1

## 단계 목적

Stage 1은 `hyper-waterfall@0.2.0` npm publish 전 package metadata와 tarball 포함 범위를 점검하는 단계다. `package.json`의 public registry metadata를 확인하고, `npm pack --dry-run` 결과로 CLI 실행에 필요한 파일이 package에 포함되는지 검증했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `package.json` | npm package 페이지와 registry metadata에 필요한 `repository`, `bugs`, `homepage` 필드를 추가했다. |
| `mydocs/working/task_m020_21_stage1.md` | Stage 1 목적, 변경 내용, 검증 결과, 다음 단계 영향을 기록했다. |

## 본문 변경 정도 / 본문 무손실 여부

코드 동작 변경은 없다. `package.json`의 metadata만 보강했고 `bin`, `scripts.test`, `engines`, `files`, CLI command contract는 유지했다.

`npm pack --dry-run` 결과 `bin/hyper-waterfall.js`, `src`, `templates`, `docs`, `README.md`, `LICENSE`가 tarball에 포함됨을 확인했다. 따라서 `files` 범위는 Stage 1에서 변경하지 않았다.

## 검증 결과

실행 명령:

```bash
npm test
npm pack --dry-run
node bin/hyper-waterfall.js --version
node bin/hyper-waterfall.js --help
git diff --check
```

결과:

- OK: `npm test` 통과. `node --test` 기준 8개 테스트 모두 pass.
- OK: `npm pack --dry-run` 통과. 최초 실행은 sandbox의 `/Users/melee/.npm/_cacache` 접근 권한 문제로 실패했으나, 동일 명령을 외부 권한으로 재실행해 통과했다.
- OK: `npm pack --dry-run` 결과 `hyper-waterfall-0.2.0.tgz`, package size `71.5 kB`, unpacked size `257.8 kB`, total files `52`로 표시됐다.
- OK: tarball contents에 `LICENSE`, `README.md`, `bin/hyper-waterfall.js`, `docs/`, `src/`, `templates/`, `package.json`이 포함됐다.
- OK: `node bin/hyper-waterfall.js --version` 출력은 `0.2.0`이다.
- OK: `node bin/hyper-waterfall.js --help`는 `init`, `update`, `doctor` 명령과 canonical 기준 안내를 출력했다.
- OK: `git diff --check` 통과.

## 잔여 위험

- npm registry의 현재 package name 점유 여부와 실제 publish 상태는 Stage 1 범위에서 확인하지 않았다. Stage 2 또는 Stage 3에서 publish 체크리스트와 README 정합성 검토에 포함한다.
- 실제 로컬 tarball 설치 smoke는 Stage 4 통합 검증에서 수행한다.

## 다음 단계 영향

- Stage 2는 `package.json` metadata 보강 결과와 `npm pack --dry-run` 포함 범위 확인 결과를 `docs/releases/v0.2.0-npm-publish.md` 체크리스트에 반영한다.
- `files` 범위는 현재 충분하므로 Stage 2에서는 tarball 구성 검증 절차를 문서화하는 데 집중한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
