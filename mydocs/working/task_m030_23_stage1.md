# Task #23 Stage 1 완료 보고서 - 기존 배포 기준과 Homebrew 요구사항 정리

GitHub Issue: [#23](https://github.com/postmelee/hyper-waterfall/issues/23)
구현계획서: [`task_m030_23_impl.md`](../plans/task_m030_23_impl.md)
Stage: 1

## 단계 목적

Stage 1의 목적은 Homebrew formula/tap PoC 문서를 작성하기 전에 기존 배포 기준과 CLI smoke 기준을 확정하는 것이다. 이번 단계에서는 `docs/distribution-channels.md`, release/npm publish 준비 문서, README, CLI help를 확인해 Homebrew가 대체하면 안 되는 canonical 기준과 Stage 2에서 문서화할 요구사항을 정리했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m030_23_stage1.md` | 기존 배포 기준, Homebrew 공식 문서 확인 결과, CLI smoke 기준, Stage 2 작성 기준, 검증 결과 기록 |

## 본문 변경 정도 / 본문 무손실 여부

이번 단계는 조사와 보고 단계이므로 제품 문서와 CLI 코드는 변경하지 않았다. 기존 README, `docs/distribution-channels.md`, release 문서, migration 문서는 읽기 전용으로 확인했으며 본문 손실은 없다.

## 확인 결과

- 기존 저장소 기준은 GitHub Release/tag, `templates/manifest.json`, migration guide가 canonical 배포 단위이고, npm CLI와 Homebrew는 이를 실행하거나 발견하기 쉽게 하는 채널이다.
- README와 `docs/distribution-channels.md`는 Homebrew를 canonical 기준을 대체하지 않는 P1 실행 채널로 설명하고 있다.
- `package.json` 기준 CLI version은 `0.2.0`이고, `node bin/hyper-waterfall.js --version` 출력도 `0.2.0`이다.
- CLI help는 `init`, `update`, `doctor` 명령과 함께 GitHub Release/tag, `templates/manifest.json`, migration guide가 canonical 기준이라는 안내를 출력한다.
- `doctor --help`는 `--repo`, `--manifest` 옵션을 제공하고 MVP flow에서 repository file을 수정하지 않는다고 설명한다.

## Homebrew 공식 문서 확인

2026-05-09 기준 Homebrew 공식 문서를 확인했다.

- [How to Create and Maintain a Tap](https://docs.brew.sh/How-to-Create-and-Maintain-a-Tap): tap은 formula/cask/external command를 제공하는 외부 source이며, GitHub에서는 `homebrew-` 접두 저장소 이름을 권장한다. formula는 `Formula/` 하위 폴더에 두는 구성이 권장되고, 사용자는 `brew install user/repository/formula`로 직접 설치할 수 있다. tap 유지에는 formula 갱신, local build-from-source 테스트, dependency 선언, URL/SHA256 확인이 포함된다.
- [Taps](https://docs.brew.sh/Taps): `brew tap <user>/<repo>`는 GitHub 저장소를 Homebrew tap 경로로 clone하고, 이후 `brew update`에서 tap도 갱신된다. 같은 이름의 core formula가 있으면 fully qualified name이 필요하다.
- [Node for Formula Authors](https://docs.brew.sh/Node-for-Formula-Authors): Node module formula는 npm registry tarball을 선호하고, 최신 Node와 호환되는 경우 `depends_on "node"`를 선언한다. 표준 Node module은 `system "npm", "install", *std_npm_args`와 `bin.install_symlink libexec.glob("bin/*")` 패턴을 사용한다.
- [Formula Cookbook](https://docs.brew.sh/Formula-Cookbook): formula는 Ruby package definition이고, 새 formula는 stable tagged version, dependency 확인, audit/test를 요구한다.

Stage 2의 PoC 문서에서는 위 기준을 근거로 npm package wrapper와 release asset wrapper를 비교하되, 실제 tap 공개 배포나 `brew install` 검증은 이번 task의 승인 없는 실행 범위에서 제외한다.

## 검증 결과

실행 명령:

```bash
rg -n 'Homebrew|formula|tap|GitHub Release|manifest|migration|canonical|doctor|version' docs README.md package.json
node bin/hyper-waterfall.js --version
node bin/hyper-waterfall.js --help
node bin/hyper-waterfall.js doctor --help
git diff --check
```

결과:

- OK: `rg` 명령이 README, `docs/agent-entrypoint.md`, `docs/distribution-channels.md`, release/npm publish 문서, migration guide에서 관련 기준을 찾았다.
- OK: `node bin/hyper-waterfall.js --version` 출력은 `0.2.0`이다.
- OK: `node bin/hyper-waterfall.js --help`는 `init`, `update`, `doctor`와 canonical 기준 안내를 출력했다.
- OK: `node bin/hyper-waterfall.js doctor --help`는 `--repo`, `--manifest` 옵션과 파일 미수정 진단 성격을 출력했다.
- OK: `git diff --check` 경고 없음.

## 잔여 위험

- Homebrew formula의 세부 Ruby 문법과 실제 install/audit 결과는 Stage 2 PoC 문서에서 설계 수준으로만 다룬다. 실제 `brew install`, `brew audit`, public tap push는 별도 승인 전에는 실행하지 않는다.
- npm package publish 또는 release asset 전략이 바뀌면 Stage 2의 추천 wrapper 접근도 달라질 수 있다.

## 다음 단계 영향

- Stage 2는 `docs/homebrew-formula-tap-poc.md`를 신설해 tap 저장소, 본 저장소 formula, npm package wrapper, release asset wrapper를 비교한다.
- Stage 2 문서에는 Homebrew가 CLI 실행 wrapper일 뿐이며 GitHub Release/tag, manifest, migration guide, 승인 게이트를 대체하지 않는다는 경계를 명시한다.
- `hyper-waterfall --version`과 `hyper-waterfall doctor --repo .`를 Homebrew smoke 검증의 기본 명령으로 둔다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
