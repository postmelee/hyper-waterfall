# task_m020_21_stage4.md - 통합 검증과 publish 승인 경계 확정 단계 보고서

GitHub Issue: [#21](https://github.com/postmelee/hyper-waterfall/issues/21)
구현계획서: [`task_m020_21_impl.md`](../plans/task_m020_21_impl.md)
Stage: 4

## 단계 목적

Stage 4는 Stage 1~3 산출물을 기준으로 npm publish 전 통합 검증을 실행하고, 로컬 tarball smoke로 package entrypoint와 bundled manifest 접근을 확인하는 단계다. 실제 `npm publish`, Git tag 생성, GitHub Release publish는 실행하지 않고 승인 경계로 남겼다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/releases/v0.2.0-npm-publish.md` | Stage 4 통합 검증 결과, 로컬 tarball smoke 결과, 실행하지 않은 publish/tag/release 명령을 기록했다. |
| `mydocs/working/task_m020_21_stage4.md` | Stage 4 목적, 검증 결과, 잔여 위험, 다음 단계 영향을 기록했다. |

## 본문 변경 정도 / 본문 무손실 여부

기존 npm publish 준비 문서의 체크리스트와 절차는 유지하고, Stage 4 기준 실제 검증 결과 표만 추가했다. 문서의 승인 게이트와 publish 명령 후보는 실행 지시가 아니라 승인 후 후보라는 표현을 유지했다.

로컬 tarball smoke에 사용한 `/private/tmp/hyper-waterfall-task21-pack.rxaN5I`, `/private/tmp/hyper-waterfall-task21-smoke.8cO6ZJ`, `/private/tmp/hyper-waterfall-task21-target.VE15PT` 임시 디렉터리는 검증 후 정리했다.

## 검증 결과

실행 명령:

```bash
npm test
npm pack --dry-run
node bin/hyper-waterfall.js --version
node bin/hyper-waterfall.js --help
npm pack --pack-destination /private/tmp/hyper-waterfall-task21-pack.rxaN5I
npm install /private/tmp/hyper-waterfall-task21-pack.rxaN5I/hyper-waterfall-0.2.0.tgz --prefix /private/tmp/hyper-waterfall-task21-smoke.8cO6ZJ
/private/tmp/hyper-waterfall-task21-smoke.8cO6ZJ/node_modules/.bin/hyper-waterfall --version
/private/tmp/hyper-waterfall-task21-smoke.8cO6ZJ/node_modules/.bin/hyper-waterfall --help
/private/tmp/hyper-waterfall-task21-smoke.8cO6ZJ/node_modules/.bin/hyper-waterfall init --repo /private/tmp/hyper-waterfall-task21-target.VE15PT --dry-run
git diff --check
git status --short --branch
```

결과:

- OK: `npm test` 통과. `node --test` 기준 8개 테스트 모두 pass.
- OK: `npm pack --dry-run` 통과. sandbox에서는 `/Users/melee/.npm/_cacache` 권한 문제로 실패했으나, 동일 명령을 외부 권한으로 재실행해 통과했다.
- OK: dry-run tarball 결과는 `hyper-waterfall-0.2.0.tgz`, package size `74.1 kB`, unpacked size `267.7 kB`, total files `53`이다.
- OK: tarball contents에 `docs/releases/v0.2.0-npm-publish.md`, `bin`, `src`, `templates`, `docs`, README, LICENSE가 포함됐다.
- OK: `node bin/hyper-waterfall.js --version` 출력은 `0.2.0`이다.
- OK: `node bin/hyper-waterfall.js --help`는 `init`, `update`, `doctor` 명령과 canonical 기준 안내를 출력했다.
- OK: `npm pack --pack-destination ...`는 외부 권한 재실행 기준 통과했다.
- OK: `npm install ... --prefix ...`는 sandbox의 npm cache 권한 문제로 실패했으나, 외부 권한 재실행 기준 local tarball 설치에 성공했다.
- OK: 설치된 binary의 `--version` 출력은 `0.2.0`이다.
- OK: 설치된 binary의 `--help`는 `init`, `update`, `doctor` 명령과 canonical 기준 안내를 출력했다.
- OK: 설치된 binary의 `init --repo ... --dry-run`은 신규 적용 판단 결과, bundled `templates/manifest.json`, 승인 요청, 파일 자동 수정 금지 안내를 출력했다.
- OK: 로컬 smoke 임시 디렉터리 3개는 검증 후 정리했고 `test ! -e`로 삭제를 확인했다.
- OK: `git diff --check` 통과.
- OK: Stage 4 보고서 작성 전 `git status --short --branch`는 `docs/releases/v0.2.0-npm-publish.md` 수정만 표시했다.

실행하지 않은 명령:

- `npm publish`
- `git tag v0.2.0`
- `git push origin v0.2.0`
- `gh release create`

## 잔여 위험

- npm cache에 root-owned file이 있어 sandbox 권한으로 `npm pack`과 `npm install`이 실패한다. publish 전 maintainer 환경에서는 npm cache 권한을 정리하거나 외부 권한 실행 기준을 명확히 해야 한다.
- 실제 npm registry publish는 아직 실행하지 않았으므로 `npm view`, `dist-tags`, `gitHead`, `npx hyper-waterfall@0.2.0` 검증은 publish 승인 이후에만 가능하다.
- README의 "첫 npm publish 전" 문구는 publish 완료 후 후속 문서 갱신이 필요하다.

## 다음 단계 영향

- Stage 4 승인 후 `task-final-report` 절차로 최종 결과보고서, 오늘할일 완료 처리, PR 게시 준비를 진행한다.
- 최종 보고서에는 npm publish가 실행되지 않았고 별도 승인 항목으로 남아 있음을 명시한다.

## 승인 요청

- Stage 4 산출물과 검증 결과를 승인하면 최종 보고 절차로 진행한다.
