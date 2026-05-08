# task_m020_26_stage3.md - release 전 manifest 검증 기준 확정 완료보고서

GitHub Issue: [#26](https://github.com/postmelee/hyper-waterfall/issues/26)
구현계획서: [`task_m020_26_impl.md`](../plans/task_m020_26_impl.md)
Stage: 3

## 단계 목적

Stage 3는 `templates/manifest.json`, release 준비 문서, migration guide, README, distribution strategy의 release/checksum 표현을 대조하고, 실제 `v0.2.0` tag와 GitHub Release가 아직 생성되지 않았는지 확인하는 단계다. 실제 `git tag`, `git push`, `gh release create`, npm publish는 실행하지 않는다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/releases/v0.2.0.md` | Stage 3 기준 정합성 대조 결과와 tag/release 미생성 검증 결과 반영 |
| `docs/migrations/v0.1.0-to-v0.2.0.md` | checksum 상태를 file `ready`, root/directory `pending-release`, symlink `not-applicable` 기준으로 보강하고 자동 적용 가능 범위를 file checksum으로 제한 |
| `docs/distribution-channels.md` | 추가 배포 채널 문서에서 checksum 정책 확정과 root/directory 보류 상태를 구분하도록 표현 보강 |
| `mydocs/working/task_m020_26_stage3.md` | Stage 3 변경 내용, 검증 결과, 잔여 위험, 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

문서 구조와 기존 release 방향은 유지했다. 변경은 Stage 2에서 확정한 checksum 상태 분포와 Stage 3 검증 결과에 맞춰 표현을 정합화하는 데 한정했다. README는 checksum 상태를 직접 단정하지 않아 수정하지 않았다.

## 반영 내용

- migration guide의 checksum 상태를 `pending-release` 단일 표현에서 file `ready`, root/directory `pending-release`, symlink `not-applicable` 표현으로 바꿨다.
- directory/root checksum은 자동 적용 기준으로 쓰지 않고 수동 확인 대상으로 남긴다는 점을 migration guide에 반영했다.
- distribution strategy에서 "checksum 확정" 표현이 root/directory까지 확정된 것처럼 읽히지 않도록 checksum 정책과 보류 상태를 구분했다.
- release 준비 문서의 통합 검증 표를 Stage 3 실행 결과로 갱신했다.

## 검증 결과

실행 명령:

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n 'planned|released|pending-release|checksum|v0.2.0|GitHub Release' templates/manifest.json docs/releases/v0.2.0.md docs/migrations/v0.1.0-to-v0.2.0.md README.md docs/distribution-channels.md
git tag --list --sort=version:refname
gh release list --repo postmelee/hyper-waterfall --limit 20
git diff --check
git status --short --branch
```

결과:

- OK: `templates/manifest.json` JSON parse 통과.
- OK: 통합 `rg`가 release/checksum 표현을 확인했다.
- OK: `git tag --list --sort=version:refname` 빈 출력. `v0.2.0` tag 없음.
- OK: `gh release list --repo postmelee/hyper-waterfall --limit 20` 빈 출력. GitHub Release 없음.
- OK: `git diff --check` 출력 없이 통과.
- OK: `git status --short --branch`에서 `local/task26` ahead 4와 Stage 3 문서 변경만 확인했다.

추가 검증 명령:

```bash
git fetch --tags origin
```

결과:

- OK: 원격 tag 동기화 통과.

## 잔여 위험

- root checksum 의미와 directory checksum 공식 산식은 아직 확정하지 않았다.
- 실제 `v0.2.0` tag와 GitHub Release는 아직 생성하지 않았다.
- npm publish, Homebrew, Docker, plugin 배포는 계속 별도 승인 대상이다.

## 다음 단계 영향

- 최종 결과보고서와 PR 게시 단계에서는 `task-final-report` 절차를 적용한다.
- 최종 보고서에는 file checksum 12개 `ready`, root/directory `pending-release`, symlink `not-applicable`, `v0.2.0` tag/release 미생성 상태를 요약해야 한다.
- 실제 release 생성은 이 task의 PR merge 후 별도 명시 승인 없이는 실행하지 않는다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 최종 결과보고서와 PR 게시 단계로 진행한다.
