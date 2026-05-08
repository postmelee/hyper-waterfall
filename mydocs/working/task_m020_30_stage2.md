# task_m020_30_stage2.md - v0.2.0 tag와 GitHub Release 생성 완료보고서

GitHub Issue: [#30](https://github.com/postmelee/hyper-waterfall/issues/30)
구현계획서: [`task_m020_30_impl.md`](../plans/task_m020_30_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Stage 1에서 확정한 `origin/main` commit에 `v0.2.0` tag를 생성하고, 해당 tag를 기준으로 GitHub Release `v0.2.0`을 publish하는 단계다.

## 산출물

| 파일/산출물 | 변경 요약 |
|---|---|
| Git tag `v0.2.0` | `9bd2439b411f76b9d4360569e2f32e0d7976816f` commit에 local tag 생성 |
| remote Git tag `v0.2.0` | `origin`에 `refs/tags/v0.2.0` push 완료 |
| GitHub Release `v0.2.0` | `v0.2.0 - 배포·업데이트 프로토콜 MVP` 제목으로 publish 완료 |
| `/private/tmp/hyper-waterfall-v0.2.0-release-notes.md` | `docs/releases/v0.2.0.md`의 release notes 초안을 기준으로 만든 임시 notes 파일 |
| `mydocs/working/task_m020_30_stage2.md` | tag/release 생성 명령, 검증 결과, 잔여 위험 기록 |

## 본문 변경 정도 / 본문 무손실 여부

repository 파일은 단계 보고서만 추가했다. `templates/manifest.json`의 `release.status`는 계획대로 `planned`에서 변경하지 않았다. npm publish, Homebrew/Docker/plugin 배포, root/directory checksum 산식 확정은 실행하지 않았다.

## 실행 결과

release 대상 SHA:

```text
9bd2439b411f76b9d4360569e2f32e0d7976816f
```

실행 명령:

```bash
git tag v0.2.0 9bd2439b411f76b9d4360569e2f32e0d7976816f
git push origin refs/tags/v0.2.0
gh release create v0.2.0 --repo postmelee/hyper-waterfall --verify-tag --title "v0.2.0 - 배포·업데이트 프로토콜 MVP" --notes-file /private/tmp/hyper-waterfall-v0.2.0-release-notes.md
```

결과:

- OK: local tag `v0.2.0` 생성.
- OK: remote tag `v0.2.0` push.
- OK: GitHub Release 생성.
- URL: `https://github.com/postmelee/hyper-waterfall/releases/tag/v0.2.0`

GitHub Release 상태:

| 항목 | 값 |
|---|---|
| tag | `v0.2.0` |
| title | `v0.2.0 - 배포·업데이트 프로토콜 MVP` |
| draft | `false` |
| prerelease | `false` |
| targetCommitish | `main` |
| created | `2026-05-08T19:01:36Z` |
| published | `2026-05-08T20:34:07Z` |

## 검증 결과

실행 명령:

```bash
git tag --list v0.2.0
git rev-list -n 1 v0.2.0
git ls-remote origin refs/tags/v0.2.0
gh release view v0.2.0 --repo postmelee/hyper-waterfall --json tagName,name,isDraft,isPrerelease,url,targetCommitish
git diff --check
```

결과:

- OK: `git tag --list v0.2.0` 출력이 `v0.2.0`.
- OK: `git rev-list -n 1 v0.2.0` 출력이 `9bd2439b411f76b9d4360569e2f32e0d7976816f`.
- OK: `git ls-remote origin refs/tags/v0.2.0` 출력이 `9bd2439b411f76b9d4360569e2f32e0d7976816f	refs/tags/v0.2.0`.
- OK: `gh release view` JSON 기준 `tagName: v0.2.0`, `name: v0.2.0 - 배포·업데이트 프로토콜 MVP`, `isDraft: false`, `isPrerelease: false`, `url: https://github.com/postmelee/hyper-waterfall/releases/tag/v0.2.0`.
- OK: `gh release view` 본문이 임시 release notes 파일 내용과 일치.
- OK: `git diff --check` 출력 없이 통과.

## 잔여 위험

- `targetCommitish`는 GitHub Release API에서 `main`으로 표시되지만, 실제 tag SHA는 `9bd2439b411f76b9d4360569e2f32e0d7976816f`로 검증했다.
- `templates/manifest.json`의 `release.status`는 이번 task에서 `planned`로 유지했다.
- npm publish는 아직 실행하지 않았다.
- root/directory checksum 공식 산식은 아직 확정하지 않았다.

## 다음 단계 영향

- Stage 3에서는 release view/list, local/remote tag, npm publish 미실행 상태를 재검증한다.
- 최종 보고서에는 GitHub Release URL과 tag SHA를 포함해야 한다.
- npm publish는 `docs/releases/v0.2.0-npm-publish.md` 기준으로 별도 승인 후 진행한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3으로 진행한다.
