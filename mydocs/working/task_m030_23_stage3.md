# Task #23 Stage 3 완료 보고서 - Homebrew PoC 수용 기준 검증

GitHub Issue: [#23](https://github.com/postmelee/hyper-waterfall/issues/23)
구현계획서: [`task_m030_23_impl.md`](../plans/task_m030_23_impl.md)
Stage: 3

## 단계 목적

Stage 3의 목적은 Stage 1~2 산출물이 이슈 #23의 수용 기준을 만족하는지 검증하고, Homebrew formula/tap PoC 문서의 책임 경계와 승인 지점을 최종 점검하는 것이다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/homebrew-formula-tap-poc.md` | 이슈 수용 기준을 바로 검토할 수 있도록 `수용 기준 점검` 표 추가 |
| `mydocs/working/task_m030_23_stage3.md` | Stage 3 검증 결과, 잔여 위험, 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

`docs/homebrew-formula-tap-poc.md`의 기존 본문은 보존하고, `후속 작업 후보`와 `결론` 사이에 수용 기준 점검 표만 추가했다. 기존 추천 PoC, formula 초안, smoke 검증 경로, public tap 승인 게이트 내용은 재작성하지 않았다.

## 수용 기준 검토

| 수용 기준 | 확인 결과 |
|---|---|
| Homebrew가 해결하는 사용자 문제와 비목표가 명확하다. | `목적`과 `비목표`에서 macOS 설치 발견성 개선, 파일 수정/배포 실행 제외, public tap 별도 승인을 분리했다. |
| PoC에서 검증할 설치 경로와 smoke 명령이 명확하다. | `smoke 검증 경로`에서 `brew tap-new`, `brew create`, `brew install --build-from-source`, `hyper-waterfall --version`, `hyper-waterfall doctor --repo .`, `brew test` 후보와 기대 결과를 정리했다. |
| formula가 canonical 기준을 대체하지 않고 CLI 실행 수단으로만 동작한다는 경계가 드러난다. | `책임 경계`, `version과 checksum 기준`, `추천 PoC`에서 GitHub Release/tag, manifest, migration guide와 formula wrapper 역할을 분리했다. |
| 실제 public 배포 여부는 별도 승인 지점으로 남는다. | `public tap 배포 승인 게이트`에 tap 공개, formula push, README 안내, 자동화 여부를 별도 승인 항목으로 남겼다. |

## 검증 결과

실행 명령:

```bash
test -f docs/homebrew-formula-tap-poc.md
rg -n 'Homebrew|formula|tap|GitHub Release|manifest|migration|canonical|doctor|version' docs README.md package.json
rg -n '사용자 문제|비목표|smoke|승인 게이트|수용 기준|npm package wrapper|release asset wrapper|canonical|CLI 실행 수단' docs/homebrew-formula-tap-poc.md
git diff --check
git status --short --branch
```

결과:

- OK: `docs/homebrew-formula-tap-poc.md` 존재 확인.
- OK: 이슈 검증 기준의 `rg` 명령이 Homebrew, formula, tap, GitHub Release, manifest, migration, canonical, doctor, version 관련 항목을 `docs`, README, `package.json`에서 찾았다.
- OK: 추가 점검 `rg` 명령이 PoC 문서의 사용자 문제, 비목표, smoke, 승인 게이트, 수용 기준, npm package wrapper, release asset wrapper, canonical, CLI 실행 수단 항목을 찾았다.
- OK: `git diff --check` 경고 없음.
- OK: `git status --short --branch`는 커밋 전 기준 `local/task23`이 `origin/main`보다 4커밋 앞서 있고, 계획된 변경 파일 `docs/homebrew-formula-tap-poc.md`와 `mydocs/working/task_m030_23_stage3.md`만 변경 상태임을 확인했다.

## 실행하지 않은 명령

- `brew tap-new`
- `brew create`
- `brew install --build-from-source`
- `brew test`
- `curl -L ... | shasum -a 256`
- `npm publish`
- `git tag`
- `gh release create`

이번 task는 PoC 설계와 승인 게이트 정리 범위이므로 실제 Homebrew 공개 배포, npm publish, GitHub Release/tag 생성, 자동 release pipeline 구현은 실행하지 않았다.

## 잔여 위험

- 실제 macOS Homebrew 환경의 install/audit/test는 아직 수행하지 않았다.
- `hyper-waterfall@0.2.0` npm publish 상태와 tarball SHA256이 확정되기 전까지 formula의 `url`/`sha256`은 초안이다.
- release asset wrapper를 선택해야 하는 상황이 생기면 asset 구조와 checksum 정책을 별도 설계해야 한다.

## 다음 단계 영향

- Stage 3가 승인되면 `task-final-report` 절차로 최종 결과보고서, 오늘할일 갱신, 최종 검증, PR 게시 준비를 진행한다.
- 최종 보고서에는 Homebrew PoC 1순위가 별도 tap 저장소의 npm package wrapper라는 점과 public 배포가 별도 승인 지점이라는 점을 명시한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 최종 보고 단계로 진행한다.
