# Task #23 Stage 2 완료 보고서 - Homebrew formula/tap PoC 문서 작성

GitHub Issue: [#23](https://github.com/postmelee/hyper-waterfall/issues/23)
구현계획서: [`task_m030_23_impl.md`](../plans/task_m030_23_impl.md)
Stage: 2

## 단계 목적

Stage 2의 목적은 Homebrew formula/tap PoC의 최소 범위, 접근안 비교, smoke 검증 경로, 운영 비용, 보류 조건을 별도 문서로 확정하는 것이다. Stage 1에서 확인한 canonical 배포 기준과 Homebrew 공식 문서 기준을 바탕으로 `docs/homebrew-formula-tap-poc.md`를 신설하고, 상위 전략 문서에는 해당 문서 링크만 최소 반영했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/homebrew-formula-tap-poc.md` | Homebrew formula/tap PoC 설계 문서 신설. 책임 경계, 접근안 비교, 추천 PoC, formula 초안, version/checksum 기준, smoke 검증 경로, public tap 승인 게이트, 운영 비용 정리 |
| `docs/distribution-channels.md` | Homebrew 세부 판단에 PoC 문서 링크 1줄 추가 |
| `mydocs/working/task_m030_23_stage2.md` | Stage 2 산출물과 검증 결과 기록 |

## 본문 변경 정도 / 본문 무손실 여부

`docs/homebrew-formula-tap-poc.md`는 신규 문서이므로 기존 본문 손실은 없다. `docs/distribution-channels.md`는 Homebrew 판단 섹션에 신규 PoC 문서 링크를 1줄 추가했으며, 기존 전략 문구와 우선순위 표는 보존했다.

## 주요 결정

- Homebrew PoC 1순위는 별도 tap 저장소의 npm package wrapper로 정리했다.
- npm package wrapper는 Homebrew Node formula 기준과 맞고, Task #21의 npm tarball smoke 결과를 재사용할 수 있어 release asset wrapper보다 운영 변수가 적다.
- GitHub Release asset wrapper는 npm publish를 쓰지 못할 때의 후보로 남겼다.
- 본 저장소 안 formula 파일은 내부 초안 검토에는 쓸 수 있지만, 일반 사용자의 Homebrew 설치 발견성을 해결하지 못하므로 공개 UX PoC로는 부적합하다고 정리했다.
- formula의 `url`, `version`, `sha256`은 CLI artifact 설치 기준이며, manifest checksum이나 migration guide를 대체하지 않는다고 명시했다.
- 실제 public tap 배포, `brew install`, `brew test`, npm publish, GitHub Release/tag 생성, 자동 release pipeline 구현은 별도 승인 전에는 실행하지 않는 범위로 고정했다.

## 검증 결과

실행 명령:

```bash
test -f docs/homebrew-formula-tap-poc.md
rg -n 'Homebrew|formula|tap|GitHub Release|manifest|migration|canonical|doctor|version|checksum|npm package|release asset' docs/homebrew-formula-tap-poc.md docs/distribution-channels.md
git diff --check
```

결과:

- OK: `docs/homebrew-formula-tap-poc.md` 존재 확인.
- OK: `rg` 명령이 PoC 문서와 전략 문서에서 Homebrew, formula, tap, GitHub Release, manifest, migration, canonical, doctor, version, checksum, npm package, release asset 관련 항목을 모두 찾았다.
- OK: `git diff --check` 경고 없음.

## 실행하지 않은 명령

- `brew tap-new`
- `brew create`
- `brew install --build-from-source`
- `brew test`
- `curl -L ... | shasum -a 256`
- `npm publish`
- `git tag`
- `gh release create`

위 명령은 public tap 또는 배포 artifact에 영향을 주거나 publish 이후에만 의미가 있으므로 이번 Stage에서는 후보 명령으로 문서화만 했다.

## 잔여 위험

- 실제 Homebrew formula syntax, `brew audit`, macOS local install 결과는 아직 검증하지 않았다.
- npm package publish 또는 GitHub Release asset 전략이 바뀌면 추천 wrapper 접근도 조정해야 한다.
- `doctor --repo .` smoke는 read-only 실행 확인에는 충분하지만, 적용 저장소 정합성 자체를 보장하지 않는다.

## 다음 단계 영향

- Stage 3에서는 이슈 수용 기준 관점에서 PoC 문서의 책임 경계, 접근안 비교, smoke 명령, public 배포 승인 게이트가 충분한지 점검한다.
- 필요하면 Stage 3에서 `docs/homebrew-formula-tap-poc.md`의 결론 또는 체크리스트만 보강한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3으로 진행한다.
