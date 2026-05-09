# task_m020_30_stage1.md - release 전 최종 검증과 대상 commit 확정 완료보고서

GitHub Issue: [#30](https://github.com/postmelee/hyper-waterfall/issues/30)
구현계획서: [`task_m020_30_impl.md`](../plans/task_m020_30_impl.md)
Stage: 1

## 단계 목적

Stage 1은 `v0.2.0` Git tag와 GitHub Release를 만들기 전에 release 대상 commit을 확정하고, tag/release 중복 여부와 manifest/version/release notes 정합성을 검증하는 단계다. 이 단계에서는 tag, GitHub Release, npm publish를 생성하거나 실행하지 않는다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m020_30_stage1.md` | release 전 최종 검증 결과, release 대상 SHA, tag/release 미존재 상태 기록 |

## 본문 변경 정도 / 본문 무손실 여부

소스와 release 문서는 수정하지 않았다. 신규 단계 보고서만 추가했다.

## release 대상 commit

| 항목 | SHA |
|---|---|
| release 대상 `origin/main` | `9bd2439b411f76b9d4360569e2f32e0d7976816f` |
| 현재 `local/task30` HEAD | `e1895c4acfa1d889fbe3068993f9e21a34451654` |

`local/task30` HEAD에는 수행계획서와 구현계획서 커밋이 포함되어 있으므로 release 대상이 아니다. Stage 2에서 `v0.2.0` tag는 `9bd2439b411f76b9d4360569e2f32e0d7976816f`에 생성해야 한다.

## 정합성 확인

manifest/version 상태:

| 항목 | 값 |
|---|---|
| `package.json` version | `0.2.0` |
| manifest `frameworkVersion` | `0.2.0` |
| manifest `plannedTag` | `v0.2.0` |
| manifest `baselineTag` | `v0.1.0` |
| manifest `release.status` | `planned` |
| root checksum | `pending-release` |
| `kind: directory` checksum | `pending-release` 3개 |
| `kind: file` checksum | `ready` 12개 |
| `kind: symlink` checksum | `not-applicable` 2개 |

release notes 초안은 `docs/releases/v0.2.0.md`에 존재하며, 제목은 `v0.2.0 - 배포·업데이트 프로토콜 MVP`다. 본문 초안에는 `요약`, `주요 변경`, `업데이트 기준`, `보류` 섹션이 있다.

## 검증 결과

실행 명령:

```bash
git fetch --tags origin --prune
git rev-parse origin/main
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n '0.2.0|v0.2.0|plannedTag|baselineTag|GitHub Release|manifest|migration|pending-release|ready' templates/manifest.json docs/migrations/v0.1.0-to-v0.2.0.md README.md docs/distribution-channels.md docs/releases/v0.2.0.md package.json
git tag --list --sort=version:refname
git ls-remote origin refs/tags/v0.2.0
gh release list --repo postmelee/hyper-waterfall --limit 20
git diff --check
```

결과:

- OK: `git fetch --tags origin --prune` 통과.
- OK: `git rev-parse origin/main` 결과는 `9bd2439b411f76b9d4360569e2f32e0d7976816f`.
- OK: `templates/manifest.json` JSON parse 통과.
- OK: 통합 `rg`가 `0.2.0`, `v0.2.0`, `plannedTag`, `baselineTag`, `GitHub Release`, `manifest`, `migration`, `pending-release`, `ready` 표현을 확인했다.
- OK: `git tag --list --sort=version:refname` 빈 출력. local tag 없음.
- OK: `git ls-remote origin refs/tags/v0.2.0` 빈 출력. remote `v0.2.0` tag 없음.
- OK: `gh release list --repo postmelee/hyper-waterfall --limit 20` 빈 출력. GitHub Release 없음.
- OK: `git diff --check` 출력 없이 통과.

추가 확인:

- OK: release notes 초안 위치와 제목 확인.
- OK: `local/task30` HEAD와 `origin/main` SHA가 다르므로 release tag 대상은 `origin/main`으로 고정해야 함을 확인.

## 잔여 위험

- Stage 2는 외부에 tag와 GitHub Release를 생성하므로, 실행 후 삭제/수정이 필요하면 별도 승인 없이는 처리하지 않는다.
- `templates/manifest.json`의 `release.status`는 이번 task에서 `planned`로 유지한다.
- npm publish는 이번 task에서 실행하지 않는다.

## 다음 단계 영향

- Stage 2에서 사용할 release 대상 SHA는 `9bd2439b411f76b9d4360569e2f32e0d7976816f`다.
- Stage 2에서는 이 SHA를 대상으로 `git tag v0.2.0 9bd2439b411f76b9d4360569e2f32e0d7976816f`를 실행한다.
- GitHub Release notes는 `docs/releases/v0.2.0.md`의 release notes 초안을 `/private/tmp/hyper-waterfall-v0.2.0-release-notes.md`로 추출해 사용한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
