# Task #81 Stage 1 보고서 - release 기준 정합성 preflight

GitHub Issue: [#81](https://github.com/postmelee/hyper-waterfall/issues/81)
구현계획서: [`task_m050_81_impl.md`](../plans/task_m050_81_impl.md)
Stage: 1

## 단계 목적

Stage 1은 `v0.3.0` release 실행 전에 기준 상태를 고정하는 단계다. 이번 단계에서는 `origin/main`의 release 후보 commit, package/manifest version, migration/release 문서 기준, 기존 GitHub tag/Release, npm registry publish 상태, npm/GitHub 인증 상태를 확인했다.

외부 상태 변경 명령인 `git tag`, `gh release create`, `npm publish`는 실행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m050_81_stage1.md` | Stage 1 preflight 결과와 Stage 2 진행 가능 조건 기록 |

## 본문 변경 정도 / 본문 무손실 여부

소스 코드와 사용자-facing 문서는 변경하지 않았다. 이번 단계의 repository 변경은 Stage 1 보고서 추가뿐이다.

## 검증 결과

실행 명령:

```bash
git fetch origin --prune
git rev-parse origin/main
git status --short --branch
git tag --list v0.3.0
git ls-remote --tags origin refs/tags/v0.3.0
gh release view v0.3.0 --repo postmelee/hyper-waterfall
node -p "require('./package.json').version"
node -e "const m=require('./templates/manifest.json'); console.log(m.frameworkVersion, m.release && m.release.plannedTag, m.release && m.release.baselineTag, m.release && m.release.status)"
rg -n "0.3.0|v0.3.0|v0.2.0|planned|npm publish|GitHub Release" package.json templates/manifest.json docs/releases/v0.3.0.md docs/migrations/v0.2.0-to-v0.3.0.md
npm config get registry
npm ping
npm view hyper-waterfall@0.2.0 version
npm view hyper-waterfall@0.3.0 version
npm whoami
gh auth status
git diff --check
```

결과:

- OK: `origin/main`은 `83836828a4da24385d0410515d35ee43946b981f`다.
- OK: 현재 작업 브랜치는 `local/task81`이고 tracked 변경은 Stage 1 보고서 작성 전까지 없었다.
- OK: 로컬 tag `v0.3.0`은 없다.
- OK: 원격 tag `refs/tags/v0.3.0`도 없다.
- OK: `gh release view v0.3.0`은 `release not found`를 반환했다. release 전 기대 결과다.
- OK: `package.json` version은 `0.3.0`이다.
- OK: `templates/manifest.json`은 `0.3.0 v0.3.0 v0.2.0 planned`를 출력했다.
- OK: `docs/releases/v0.3.0.md`와 `docs/migrations/v0.2.0-to-v0.3.0.md`는 release/tag/npm publish가 별도 승인 후 실행되어야 한다고 설명한다.
- OK: npm registry는 `https://registry.npmjs.org/`이고 `npm ping`이 통과했다.
- OK: 기존 published latest 계열 확인용 `npm view hyper-waterfall@0.2.0 version`은 `0.2.0`을 반환했다.
- OK: `npm view hyper-waterfall@0.3.0 version`은 `E404 No match found for version 0.3.0`을 반환했다. publish 전 기대 결과다.
- OK: `npm whoami`는 최초 `E401 Unauthorized`였으나, `npm login --auth-type=web` 완료 후 `postmelee`를 반환했다.
- OK: `gh auth status`는 GitHub 계정 `postmelee` 로그인과 `repo`, `workflow` scope를 확인했다.
- OK: `git diff --check` 통과.

## 잔여 위험

- npm 인증은 현재 세션에서 `postmelee`로 복구됐지만, Stage 3 publish 시점에 2FA 또는 추가 권한 확인이 다시 필요할 수 있다. OTP나 token은 문서에 기록하지 않는다.
- `v0.3.0` release 대상은 `origin/main` commit `8383682`로 확인됐고, task branch의 계획/보고서 커밋은 publish package에 포함하지 않아야 한다.

## 다음 단계 영향

- Stage 2로 진행 가능하다.
- Stage 2에서는 `origin/main` 기준 package 산출물과 현재 작업 브랜치의 보고서 산출물 경계를 유지하면서 `npm test`, locale별 dry-run, `npm pack --dry-run`을 실행한다.
- Stage 3의 `git tag`, `gh release create`, `npm publish`는 Stage 2 보고서 승인과 별도 실행 승인 전까지 계속 보류한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 package와 locale smoke 검증으로 진행한다.
