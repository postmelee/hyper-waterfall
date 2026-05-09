# Task #34 Stage 4 보고서 - Homebrew smoke 결과 정리

GitHub Issue: [#34](https://github.com/postmelee/hyper-waterfall/issues/34)
구현계획서: [`task_m040_34_impl.md`](../plans/task_m040_34_impl.md)
Stage: 4

## 단계 목적

Stage 1~3의 npm tarball SHA256, formula 후보, Homebrew audit/install/smoke/test 결과를 public tap 배포 판단에 재사용할 수 있는 문서로 정리했다. local technical smoke 통과 항목과 public tap 배포 전 보류 조건을 분리하고, #35로 넘길 항목을 명시했다.

이번 단계에서도 public tap 저장소 생성, formula push, README Homebrew 설치 안내 추가는 수행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m040_34_homebrew_local_tap_smoke.md` | Task #34 local tap smoke 결과 신설. tarball URL/SHA256, formula 후보, 검증 결과, cleanup, readiness, #35 인계 항목 기록 |
| `docs/homebrew-formula-tap-poc.md` | Task #34 smoke 결과 문서 링크, 확인된 SHA256, public tap 승인 게이트 상태, 후속 작업 후보, 결론 갱신 |
| `mydocs/orders/20260510.md` | #34 비고를 Stage 4 결과 문서화 후 승인 대기로 갱신 |
| `mydocs/working/task_m040_34_stage4.md` | Stage 4 검증 결과와 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

기존 PoC 문서는 구조를 유지하고, Task #34에서 실제 확인한 값과 결과 링크만 필요한 위치에 추가했다. 기존의 Homebrew 책임 경계와 public tap 별도 승인 원칙은 유지했다.

신규 smoke 결과 문서는 Stage 1~3 보고서의 검증 결과를 요약한 파생 문서다. 임시 formula 파일은 repository에 직접 커밋하지 않고, 재현 가능한 formula 후보를 문서 본문에 기록했다.

## 검증 결과

실행 명령:

```bash
rg -n 'Homebrew|formula|tap|SHA256|brew audit|brew install|doctor|public tap|보류|readiness' docs mydocs/tech mydocs/working mydocs/orders/20260510.md
git diff --check
git status --short --branch
```

결과:

- OK: `rg` 검증에서 신규 smoke 결과 문서, 기존 PoC 문서, Stage 보고서, 오늘할일에서 Homebrew/formula/tap/SHA256/audit/install/doctor/public tap/보류/readiness 관련 내용을 확인했다.
- OK: `mydocs/tech/task_m040_34_homebrew_local_tap_smoke.md`에 다음 결과가 기록됐다.
  - npm tarball URL: `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz`
  - SHA256: `34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7`
  - `brew audit --new --formula` 통과
  - `brew install --build-from-source` 통과
  - `hyper-waterfall --version` -> `0.2.0`
  - `hyper-waterfall doctor --repo .` exit 0, read-only 확인
  - `brew test` 통과
  - cleanup 완료
- OK: `docs/homebrew-formula-tap-poc.md`의 public tap 승인 게이트에서 local technical smoke 항목은 완료로 갱신했고, public tap 배포 승인/README 안내/formula 업데이트 운영은 보류로 남겼다.
- OK: `mydocs/orders/20260510.md`가 Stage 4 승인 대기 상태를 표시한다.
- OK: `git diff --check` 통과.
- OK: `git status --short --branch`는 Stage 4 산출물만 변경된 상태를 보여줬다.

## 잔여 위험

- public tap 배포는 아직 승인되지 않았다. Task #34는 local tap smoke PoC까지만 완료했다.
- Homebrew `node` 의존성 설치 중 `/opt/homebrew/bin/npm`, `/opt/homebrew/bin/npx` overwrite backup 경고가 있었다. #35에서 사용자 안내 또는 troubleshooting 반영 여부를 결정해야 한다.
- public tap repository 이름, 기본 branch, 공개 범위, formula source 보관 위치가 아직 확정되지 않았다.
- README 또는 release notes에 Homebrew 설치 안내를 추가할지 별도 승인해야 한다.
- release마다 formula `url`과 `sha256`을 갱신하는 운영 방식이 아직 없다.

## 다음 단계 영향

- 최종 보고서에서는 `public tap readiness`를 "local technical smoke 통과, public 배포는 보류"로 정리한다.
- #35는 이 문서의 tarball URL, SHA256, formula 후보를 public tap 후보로 재사용할 수 있다.
- #35에서는 public tap 생성/푸시 전에 Homebrew `node` 의존성 영향 안내와 README/release notes 반영 여부를 별도 승인 항목으로 두어야 한다.

## 승인 요청

- Stage 4 산출물과 검증 결과를 승인하면 최종 결과보고서 작성 절차로 진행한다.
