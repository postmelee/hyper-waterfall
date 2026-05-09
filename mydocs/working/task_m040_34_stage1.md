# Task #34 Stage 1 보고서 - npm tarball 기준과 로컬 Homebrew 환경 확인

GitHub Issue: [#34](https://github.com/postmelee/hyper-waterfall/issues/34)
구현계획서: [`task_m040_34_impl.md`](../plans/task_m040_34_impl.md)
Stage: 1

## 단계 목적

`hyper-waterfall@0.2.0` Homebrew formula smoke의 입력 기준을 고정했다. npm registry metadata, registry tarball URL, tarball SHA256, 로컬 Homebrew/Node 실행 환경을 확인해 Stage 2 formula 후보 작성에 필요한 값을 확보했다.

이번 단계에서는 formula 작성, local tap 생성, `brew tap`, `brew install`, `brew test`를 실행하지 않았다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m040_34_stage1.md` | Stage 1 검증 결과, tarball SHA256, 로컬 Homebrew/Node 환경, 다음 단계 입력값 기록 |
| `/private/tmp/hyper-waterfall-task34-homebrew/hyper-waterfall-0.2.0.tgz` | npm registry tarball 다운로드 결과. Git 커밋 대상 아님 |

## 본문 변경 정도 / 본문 무손실 여부

Stage 1은 검증과 기록 단계라 repository 본문 문서는 수정하지 않았다. 작업 브랜치의 tracked 파일은 단계 보고서 추가만 포함한다.

## 검증 결과

실행 명령:

```bash
mkdir -p /private/tmp/hyper-waterfall-task34-homebrew
npm view hyper-waterfall@0.2.0 version
npm view hyper-waterfall@0.2.0 dist.tarball
npm view hyper-waterfall@0.2.0 dist.integrity
curl -L https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz -o /private/tmp/hyper-waterfall-task34-homebrew/hyper-waterfall-0.2.0.tgz
shasum -a 256 /private/tmp/hyper-waterfall-task34-homebrew/hyper-waterfall-0.2.0.tgz
brew --version
brew config
node --version
npm --version
rg -n 'hyper-waterfall@0.2.0|registry tarball|dist.tarball|Homebrew|public tap' mydocs/report/task_m040_33_report.md docs/homebrew-formula-tap-poc.md docs/distribution-channels.md
git diff --check
git status --short
```

결과:

- OK: `npm view hyper-waterfall@0.2.0 version` -> `0.2.0`
- OK: `npm view hyper-waterfall@0.2.0 dist.tarball` -> `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz`
- OK: `npm view hyper-waterfall@0.2.0 dist.integrity` -> `sha512-snQCsypiXj/S6lQUmNJze0QAhygAQCDYw1eX6pRdSnkj8J75HHonDI5gWdp88MOzVRP+Nio0cZjal/8T3lNCng==`
- OK: tarball download 완료. 파일 크기 `74408` bytes.
- OK: SHA256 -> `34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7`
- OK: `brew --version` -> `Homebrew 5.1.10-52-g1c3a79e`
- OK: `brew config` 주요 값 -> prefix `/opt/homebrew`, macOS `26.3.1-arm64`, Homebrew Ruby `4.0.3`, Git `2.53.0`, Curl `8.7.1`
- OK: `node --version` -> `v24.15.0`
- OK: `npm --version` -> `11.12.1`
- OK: `rg` 검증에서 #33 최종 보고서의 registry tarball URL과 Homebrew PoC 문서의 public tap 승인 게이트를 확인했다.
- OK: `git diff --check` 통과.
- OK: Stage 1 검증 종료 시점의 `git status --short`는 빈 출력이었다.

참고:

- 샌드박스 내부 첫 `npm view` 실행은 `getaddrinfo ENOTFOUND registry.npmjs.org`로 실패했다. 네트워크 접근 승인을 받아 같은 `npm view` 명령을 재실행했고 최종 검증은 통과했다.
- tarball 다운로드도 네트워크 접근 승인을 받아 실행했다.

## 잔여 위험

- Stage 1은 Homebrew 실행 가능 조건만 확인했다. formula 문법, audit, install, `brew test`는 아직 검증하지 않았다.
- Node `v24.15.0`과 Homebrew `node` formula의 실제 install runtime이 다를 수 있다. Stage 3에서 설치된 formula 기준으로 다시 확인해야 한다.
- `brew config`는 현재 로컬 머신 상태다. public tap readiness 판단에는 이 환경 기준과 Homebrew 버전 차이를 함께 기록해야 한다.

## 다음 단계 영향

- Stage 2 formula 후보의 `url`은 `https://registry.npmjs.org/hyper-waterfall/-/hyper-waterfall-0.2.0.tgz`를 사용한다.
- Stage 2 formula 후보의 `sha256`은 `34dc90ca4b9cefa3f13034711e6bffc3f3c184360c44ab4924e00e26163e0cc7`을 사용한다.
- `/private/tmp/hyper-waterfall-task34-homebrew`는 Stage 2 local tap workspace의 부모 디렉터리로 이어서 사용한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 formula 후보와 local tap 준비로 진행한다.
