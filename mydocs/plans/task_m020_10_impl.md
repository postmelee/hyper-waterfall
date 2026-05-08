# task_m020_10_impl.md - npm CLI MVP로 init/update/doctor 제공 구현계획서

수행계획서: [`task_m020_10.md`](task_m020_10.md)
GitHub Issue: [#10](https://github.com/postmelee/hyper-waterfall/issues/10)
마일스톤: M020

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | npm 패키지와 CLI 골격 추가 | `package.json`, `bin/hyper-waterfall.js`, `src/cli.js`, `src/commands/*`, `test/cli-smoke.test.js` | help 출력, package metadata, 기본 smoke test, `git diff --check` |
| 2 | manifest/version 읽기와 init/update 판단 결과 출력 | `src/lib/manifest.js`, `src/lib/version-state.js`, `src/lib/output.js`, `src/commands/init.js`, `src/commands/update.js` | manifest parse, init/update dry-run 출력 필드, Node test, `git diff --check` |
| 3 | doctor 진단과 비파괴 안전장치 보강 | `src/commands/doctor.js`, shared lib/test 보강 | version/target/symlink/template 진단, 자동 수정 배제 문구, Node test, `git diff --check` |
| 4 | README와 로컬 검증 정리 | `README.md`, 필요 시 lifecycle 문서 최소 보강 | npx 예시, canonical 기준 설명, 전체 CLI smoke, manifest JSON parse, `git diff --check` |

## Stage 1 - npm 패키지와 CLI 골격 추가

### 산출물

신규:

- `package.json`
- `bin/hyper-waterfall.js`
- `src/cli.js`
- `src/commands/init.js`
- `src/commands/update.js`
- `src/commands/doctor.js`
- `src/lib/output.js`
- `test/cli-smoke.test.js`

수정:

- 없음

### 변경 내용

- npm 패키지 이름은 `hyper-waterfall`로 두고, `bin.hyper-waterfall`이 `bin/hyper-waterfall.js`를 가리키도록 설정한다.
- `npm test`는 Node.js 내장 test runner 기반 smoke test를 실행하도록 둔다.
- CLI 엔트리는 `hyper-waterfall <command> [options]` 구조로 만들고, `--help`, `--version`, unknown command 처리를 구현한다.
- `init`, `update`, `doctor` 명령은 Stage 1에서는 help와 최소 option validation 중심으로 둔다.
- 외부 npm dependency 없이 Node.js 표준 라이브러리만 사용한다.
- 출력 문구에는 CLI가 편의 실행 채널이며 파일 변경 전 판단 결과를 출력한다는 경계를 포함한다.

### 검증

```bash
node bin/hyper-waterfall.js --help
node bin/hyper-waterfall.js --version
node bin/hyper-waterfall.js init --help
node bin/hyper-waterfall.js update --help
node bin/hyper-waterfall.js doctor --help
npm pkg get name bin scripts.test
npm test
git diff --check
```

### 커밋

```text
Task #10 Stage 1: npm CLI 골격 추가
```

## Stage 2 - manifest/version 읽기와 init/update 판단 결과 출력

### 산출물

신규:

- `src/lib/manifest.js`
- `src/lib/version-state.js`

수정:

- `src/commands/init.js`
- `src/commands/update.js`
- `src/lib/output.js`
- `test/cli-smoke.test.js`

### 변경 내용

- manifest loader를 추가해 `templates/manifest.json`을 읽고 JSON parse, `schemaVersion`, `frameworkVersion`, `release`, `versionState`, `files` 필수 필드를 검증한다.
- version state reader를 추가해 대상 저장소의 `.hyper-waterfall/version.json` 존재 여부와 JSON parse 결과를 안전하게 읽는다.
- `init`은 `--repo`, `--manifest`, `--target-release`, `--dry-run` 옵션을 받아 신규 적용 판단 결과를 출력한다.
  - 대상 저장소
  - 목표 release/tag
  - manifest 기준 적용 후보
  - 기존 파일 충돌 가능성
  - `.hyper-waterfall/version.json` 생성 계획
  - placeholder 체크리스트
  - 승인 요청
- `update`는 `--repo`, `--manifest`, `--from`, `--to`, `--dry-run` 옵션을 받아 기존 업데이트 판단 결과를 출력한다.
  - 현재 version
  - 목표 release/tag
  - migration guide 후보
  - manifest diff 후보
  - 자동 적용 가능
  - 수동 확인 필요
  - conflict
  - 보류
  - 승인 요청
- Stage 2의 `manifest diff`는 실제 이전 release manifest와의 완전 비교가 아니라, 현재 MVP에서 확인 가능한 target 존재 여부와 update policy 기반 후보 요약으로 제한한다.
- `init`과 `update`는 파일을 쓰지 않고 판단 결과만 출력한다.

### 검증

```bash
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --dry-run
node bin/hyper-waterfall.js update --repo . --manifest templates/manifest.json --from v0.1.0 --to v0.2.0 --dry-run
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n '현재 version|목표 release/tag|manifest diff|자동 적용 가능|수동 확인 필요|conflict|보류|승인 요청' src test
npm test
git diff --check
```

### 커밋

```text
Task #10 Stage 2: manifest와 version 판단 출력 구현
```

## Stage 3 - doctor 진단과 비파괴 안전장치 보강

### 산출물

수정:

- `src/commands/doctor.js`
- `src/lib/manifest.js`
- `src/lib/version-state.js`
- `src/lib/output.js`
- `test/cli-smoke.test.js`

### 변경 내용

- `doctor`는 `--repo`, `--manifest` 옵션을 받아 적용 저장소 상태를 점검한다.
- `.hyper-waterfall/version.json`의 존재 여부, parse 가능 여부, manifest의 target version과의 차이를 진단한다.
- manifest `files` 목록의 source/target 경로 존재 여부를 확인한다.
- `updatePolicy: symlink` 항목은 target이 symlink인지, 예상 target 경로와 연결되는지 진단한다.
- placeholder가 보존되어야 하는 template source 파일을 실제 저장소 값으로 치환하지 않았는지 최소 grep성 점검을 추가한다.
- 진단 결과는 `OK`, `WARN`, `ERROR`, `INFO` 수준으로 구분한다.
- 자동 수정, 자동 복사, 자동 덮어쓰기, symlink 재생성은 구현하지 않는다. 필요한 조치는 승인 후 일반 task workflow로 넘기도록 출력한다.

### 검증

```bash
node bin/hyper-waterfall.js doctor --repo . --manifest templates/manifest.json
rg -n 'OK|WARN|ERROR|INFO|자동 수정하지 않습니다|승인' src test
rg -n 'writeFile|copyFile|rename|unlink|rmSync|mkdir|symlink' src || true
npm test
git diff --check
```

### 커밋

```text
Task #10 Stage 3: doctor 진단과 비파괴 안전장치 구현
```

## Stage 4 - README와 로컬 검증 정리

### 산출물

수정:

- `README.md`
- `docs/agent-entrypoint.md` (필요할 때만 CLI 출력 기준과 승인 경계 최소 보강)
- `docs/migrations/README.md` (필요할 때만 CLI 출력 기준 최소 보강)
- `docs/migrations/v0.1.0-to-v0.2.0.md` (필요할 때만 후속 CLI 기준 갱신)
- `templates/mydocs/manual/task_workflow_guide.md` (필요할 때만 CLI와 core workflow 경계 최소 보강)
- `templates/mydocs/manual/document_structure_guide.md` (필요할 때만 manifest/version 진단 기준 최소 보강)
- `test/cli-smoke.test.js` (최종 smoke 보강 필요 시)

### 변경 내용

- README에 `npx hyper-waterfall init`, `npx hyper-waterfall update`, `npx hyper-waterfall doctor` 사용 예시를 추가한다.
- npm CLI를 canonical 배포 단위가 아니라 GitHub Release/tag + manifest + migration guide를 실행하기 쉽게 하는 편의 채널로 설명한다.
- README의 기존 "향후 CLI" 표현을 실제 MVP 명령 기준으로 보정한다.
- lifecycle 문서는 기존 출력 기준과 CLI 구현이 충돌하거나 빠진 경우에만 최소 보강한다.
- 로컬 검증 명령을 README 또는 package script와 일치시킨다.
- 전체 stage 산출물을 훑어 placeholder 보존, 자동 덮어쓰기 배제, 출력 필드 일관성을 확인한다.

### 검증

```bash
npm test
node bin/hyper-waterfall.js --version
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --dry-run
node bin/hyper-waterfall.js update --repo . --manifest templates/manifest.json --from v0.1.0 --to v0.2.0 --dry-run
node bin/hyper-waterfall.js doctor --repo . --manifest templates/manifest.json
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n 'npx hyper-waterfall (init|update|doctor)|canonical|GitHub Release|manifest|migration|편의 실행 채널' README.md docs templates/mydocs/manual
grep -nF '{REPO_SLUG}' templates/AGENTS.md templates/.github/pull_request_template.md
git diff --check
```

### 커밋

```text
Task #10 Stage 4: README와 CLI 검증 정리
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- Stage 완료 보고서는 해당 Stage 산출물과 함께 커밋한다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m020_10_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 `Task #10 Stage {N}: {핵심 내용 요약}` 형식을 따른다.
- 최종 보고서와 오늘할일 완료 처리는 `task-final-report` 단계에서 별도 커밋 또는 마지막 Stage와 묶음 커밋으로 처리한다.

## 단계 의존성

- Stage 2는 Stage 1에서 CLI 실행 골격과 help 출력이 확정된 뒤 진행한다.
- Stage 3은 Stage 2에서 manifest/version reader와 출력 형식이 확정된 뒤 진행한다.
- Stage 4는 Stage 1~3의 실제 CLI 동작이 확정된 뒤 README와 lifecycle 문서의 사용자 안내를 맞춘다.
- 모든 Stage는 작업지시자 승인 없이 다음 Stage로 넘어가지 않는다.

## 위험과 대응

- **npm이 canonical 배포 기준처럼 보일 위험**: README와 help에서 npm은 편의 실행 채널이고 기준은 GitHub Release/tag, manifest, migration guide임을 명시한다.
- **승인 게이트 우회 위험**: MVP는 파일 쓰기와 자동 적용을 제외하고 판단 결과, 진단, 승인 요청만 출력한다.
- **manifest diff 과장**: Stage 2의 diff는 이전 release manifest와의 완전한 checksum 비교가 아니라 MVP 수준의 후보 분류임을 출력과 README에서 명확히 한다.
- **검증 환경 의존성**: 외부 package를 쓰지 않고 Node.js 내장 test runner와 표준 라이브러리만 사용해 로컬 검증 변수를 줄인다.
- **문서와 CLI 출력 불일치**: #8/#9에서 고정한 lifecycle 판단 결과 필드명을 CLI 출력에 그대로 사용하고, Stage 4에서 README/docs grep으로 확인한다.

## 승인 요청 사항

- 위 4개 Stage, 산출물, 검증 명령, 커밋 메시지로 Stage 1 구현을 시작해도 되는지 승인 요청한다.
- CLI MVP에서 사용자 저장소 파일 쓰기, 자동 덮어쓰기, symlink 자동 수정, PR 생성 자동화는 제외하는 방향에 동의 요청한다.
- Stage 2의 `manifest diff`를 완전한 release 간 checksum 비교가 아니라 MVP 후보 분류로 제한하는 방향에 동의 요청한다.

승인되면 Stage 1 구현을 시작한다.
