# #69 중국어 간체 locale pack 작성 구현계획서

수행계획서: [`task_m050_69.md`](task_m050_69.md)
GitHub Issue: [#69](https://github.com/postmelee/hyper-waterfall/issues/69)
마일스톤: M050

## 단계 개요

| Stage | 제목 | 주요 산출 | 검증 |
|---|---|---|---|
| 1 | zh-CN 번역 기준과 source inventory 확정 | `mydocs/tech/task_m050_69_translation_terms.md`, `mydocs/working/task_m050_69_stage1.md` | en/ko 43개 파일 대조, manifest localized entry, 용어 기준 확인 |
| 2 | 핵심 적용 template과 산출물 template 작성 | `templates/locales/zh-CN/AGENTS.md`, GitHub template, `_templates/**`, folder README, `mydocs/working/task_m050_69_stage2.md` | placeholder/명령어/branch/file pattern 보존, YAML parse, 핵심 template 수동 검토 |
| 3 | manual과 Skill 중국어 간체 pack 작성 | `templates/locales/zh-CN/mydocs/manual/**`, `templates/locales/zh-CN/mydocs/skills/**`, `mydocs/working/task_m050_69_stage3.md` | `requiresSemanticReview` 대상 대표 파일 의미 대조, 절차 계약 보존 |
| 4 | pack 정합성 검증과 문서/test 기대값 정렬 | 필요한 최소 manifest/docs/test 보정, `mydocs/working/task_m050_69_stage4.md` | `doctor`, `init --dry-run`, `npm test`, locale source 누락 0개 확인 |

## 문서 위치 확인

수행계획서의 "문서 위치 판단"과 실제 Stage 산출물 경로는 다음처럼 정렬한다.

| 파일 | 수행계획서상 선택 위치 | Stage 산출물 경로 | 일치 여부 | 비고 |
|---|---|---|---|---|
| `templates/locales/zh-CN/**` | `templates/locales/zh-CN/**` | Stage 2, Stage 3 | OK | #67 manifest `sourcePattern`과 일치 |
| `mydocs/tech/task_m050_69_translation_terms.md` | `mydocs/tech/` | Stage 1, Stage 2/3 보강 | OK | 번역 판단 근거와 중국어 간체 용어 대응표 |
| `README.zh-CN.md`, `docs/agent-entrypoint.md` | 기존 위치 유지 | Stage 4에서 필요 시 최소 보정 | OK | #69 결과와 불일치가 있을 때만 수정 |
| `docs/localization.md` | `docs/` | Stage 4에서 필요 시 최소 보정 | OK | M050 locale 정책의 장기 기준 문서 |
| `mydocs/working/task_m050_69_stage{N}.md` | `mydocs/working/` | 각 Stage 종료 | OK | 단계별 완료보고서 |
| `mydocs/report/task_m050_69_report.md` | `mydocs/report/` | 최종 보고 | OK | 최종 결과보고서 |

## Stage 1 — zh-CN 번역 기준과 source inventory 확정

### 산출물

신규:

- `mydocs/tech/task_m050_69_translation_terms.md`
- `mydocs/working/task_m050_69_stage1.md`

수정:

- 없음. 조사 결과가 수행계획서 범위를 바꾸는 경우에는 구현계획서를 먼저 갱신하고 승인받는다.

### 변경 내용

- #68 결과 기준 `templates/locales/en`과 `templates/locales/ko`의 43개 파일 목록을 대조한다.
- `templates/manifest.json`의 `localization.enabled: true` entry 15개가 요구하는 `zh-CN` source 경로를 확정한다.
- 중국어 간체 용어 대응표를 만든다. 최소 항목은 approval gate, task requester, task plan, implementation plan, stage report, final report, daily task board, artifact, selected locale, fallback, semantic review, Issue, PR, Stage, Skill이다.
- 구조적 계약 보존 기준을 문서에 적는다. placeholder, branch pattern, filename pattern, command/code block, GitHub 식별자, symlink target은 번역하지 않는다.
- `zh-CN` 작성 언어 정책 문구를 확정한다. 의미는 "이 저장소에 선택된 Hyper-Waterfall locale을 따른다"여야 한다.

### 검증

```bash
find templates/locales/en -type f | sort
find templates/locales/ko -type f | sort
rg -n "zh-CN|简体中文|locale|requiresSemanticReview|sourcePattern" templates docs test
git diff --check
```

보조 확인:

```bash
node - <<'NODE'
const fs = require('fs');
const manifest = require('./templates/manifest.json');
const localized = manifest.files.filter((file) => file.localization && file.localization.enabled === true);
console.log(`localized=${localized.length}`);
for (const file of localized) {
  console.log(file.localization.sourcePattern.replace('{locale}', 'zh-CN'));
}
NODE
```

### 커밋

```text
Task #69 Stage 1: zh-CN 번역 기준 확정
```

## Stage 2 — 핵심 적용 template과 산출물 template 작성

### 산출물

신규:

- `templates/locales/zh-CN/AGENTS.md`
- `templates/locales/zh-CN/CLAUDE.md`
- `templates/locales/zh-CN/.github/ISSUE_TEMPLATE/task.yml`
- `templates/locales/zh-CN/.github/pull_request_template.md`
- `templates/locales/zh-CN/mydocs/_templates/**`
- `templates/locales/zh-CN/mydocs/{orders,plans,working,report,feedback,tech,troubleshootings,pr}/README.md`
- `mydocs/working/task_m050_69_stage2.md`

수정:

- `mydocs/tech/task_m050_69_translation_terms.md`

### 변경 내용

- 신규 적용과 생성 문서에 직접 노출되는 핵심 template을 중국어 간체로 작성한다.
- `AGENTS.md`의 에이전트 운영 규칙, `CLAUDE.md` 진입 문서, GitHub Issue/PR template의 사용자-facing 문구를 중국어 간체로 작성한다.
- `mydocs/_templates/**`는 계획서, 구현계획서, Stage 보고서, 최종 보고서 등 생성 문서의 섹션 의미를 보존해 작성한다.
- folder README 8개는 해당 산출물 폴더의 역할과 금지 사항을 중국어 간체로 정렬한다.
- `Issue`, `PR`, `Stage`, `Skill`, branch/file pattern, command/code block은 식별자로 보존한다.

### 검증

```bash
rg -n "\{REPO_SLUG\}|\{BASE_BRANCH\}|\{issue\}|\{stage\}|\{head_sha\}|local/task\{N\}|publish/task\{N\}" templates/locales/zh-CN
ruby -ryaml -e 'YAML.load_file("templates/locales/zh-CN/.github/ISSUE_TEMPLATE/task.yml"); puts "OK: issue template YAML parses"'
git diff --check
```

추가 수동 검토:

- `templates/locales/zh-CN/AGENTS.md`
- `templates/locales/zh-CN/.github/ISSUE_TEMPLATE/task.yml`
- `templates/locales/zh-CN/.github/pull_request_template.md`
- `templates/locales/zh-CN/mydocs/_templates/task_plan.md`
- `templates/locales/zh-CN/mydocs/_templates/stage_report.md`

### 커밋

```text
Task #69 Stage 2: zh-CN 핵심 template 작성
```

## Stage 3 — manual과 Skill 중국어 간체 pack 작성

### 산출물

신규:

- `templates/locales/zh-CN/mydocs/manual/**`
- `templates/locales/zh-CN/mydocs/skills/**`
- `mydocs/working/task_m050_69_stage3.md`

수정:

- `mydocs/tech/task_m050_69_translation_terms.md`

### 변경 내용

- manual 11개 파일을 중국어 간체로 작성한다.
- Skill directory 8개 파일을 중국어 간체로 작성한다.
- Skill `name` 같은 기계 식별자는 유지하고, `description`과 본문 자연어를 중국어 간체로 정렬한다.
- 승인 게이트, 단계 전환 승인, 이슈 close 조건, PR merge cleanup, fallback 조건, 금지 사항이 약해지지 않도록 `en`/`ko`와 대표 파일을 대조한다.

### 검증

```bash
rg -n "\{REPO_SLUG\}|\{BASE_BRANCH\}|local/task\{N\}|publish/task\{N\}|Writing language|작성 언어|简体中文|locale" templates/locales/zh-CN
git diff --check
```

추가 수동 검토:

- `templates/locales/zh-CN/mydocs/manual/document_structure_guide.md`
- `templates/locales/zh-CN/mydocs/manual/task_workflow_guide.md`
- `templates/locales/zh-CN/mydocs/manual/git_workflow_guide.md`
- `templates/locales/zh-CN/mydocs/skills/task-start/SKILL.md`
- `templates/locales/zh-CN/mydocs/skills/task-final-report/SKILL.md`
- `templates/locales/zh-CN/mydocs/skills/todo/SKILL.md`

보조 확인:

```bash
find templates/locales/zh-CN -type f | wc -l
```

### 커밋

```text
Task #69 Stage 3: zh-CN manual과 Skill 작성
```

## Stage 4 — pack 정합성 검증과 문서/test 기대값 정렬

### 산출물

신규:

- `mydocs/working/task_m050_69_stage4.md`

수정:

- `templates/manifest.json`: `zh-CN` pack source 작성 결과와 availability note/status가 어긋나는 경우에만 최소 수정
- `docs/localization.md`: #69 완료 상태 반영이 필요한 경우에만 최소 수정
- `test/cli-smoke.test.js`: `zh-CN` source 존재 기대값이 변경되는 경우 수정
- `README.zh-CN.md` 또는 `docs/agent-entrypoint.md`: 실제 `zh-CN` pack 상태와 안내가 어긋나는 경우에만 최소 수정

### 변경 내용

- manifest의 `sourcePattern`이 실제 `templates/locales/zh-CN/**` source와 맞는지 확인한다.
- `en`, `ko`, `zh-CN` source가 모두 존재하는 상태에서 `doctor`, `init --dry-run`, `npm test`를 실행한다.
- `test/cli-smoke.test.js`의 #68 기대값이 `zh-CN missing=15`에서 #69 이후 기대값으로 바뀌어야 하는지 판단하고 수정한다.
- manifest availability 문구는 locale pack source 준비 상태를 반영하되, #70 workflow 연결과 #71 smoke/migration이 남아 있음을 과장하지 않는다.

### 검증

```bash
node bin/hyper-waterfall.js doctor --repo . --manifest templates/manifest.json
node bin/hyper-waterfall.js init --repo . --manifest templates/manifest.json --dry-run
npm test
rg -n "zh-CN|简体中文|\{REPO_SLUG\}|\{BASE_BRANCH\}|Writing language|작성 언어|locale" README* docs templates test
git diff --check
```

보조 확인:

```bash
node - <<'NODE'
const fs = require('fs');
const manifest = require('./templates/manifest.json');
for (const locale of manifest.localization.supportedLocales) {
  const missing = [];
  for (const file of manifest.files) {
    if (!file.localization || file.localization.enabled !== true) continue;
    const p = file.localization.sourcePattern.replace('{locale}', locale);
    if (!fs.existsSync(p)) missing.push(p);
  }
  console.log(`${locale}: missing=${missing.length}`);
}
NODE
find templates/locales/zh-CN -type f | wc -l
```

### 커밋

```text
Task #69 Stage 4: zh-CN locale pack 정합성 검증
```

## 검증

- 각 Stage 검증 명령은 단계 보고서 작성 전에 실행한다.
- 실패한 검증은 단계 완료로 처리하지 않는다.
- `zh-CN` locale source 누락이 남으면 Stage 4 완료로 처리하지 않는다.
- 계획 변경이 필요하면 구현계획서를 먼저 갱신하고 작업지시자 승인을 받는다.
- `templates/manifest.json`의 release checksum 확정은 릴리스 범위이므로 이번 task에서 수행하지 않는다.

## 커밋

- 단계 커밋은 단계 산출물과 `mydocs/working/task_m050_69_stage{N}.md`를 함께 묶는다.
- 커밋 메시지는 다음 형식을 따른다.
  - `Task #69 Stage 1: zh-CN 번역 기준 확정`
  - `Task #69 Stage 2: zh-CN 핵심 template 작성`
  - `Task #69 Stage 3: zh-CN manual과 Skill 작성`
  - `Task #69 Stage 4: zh-CN locale pack 정합성 검증`

## 단계 의존성

- Stage 2는 Stage 1의 파일 범위와 용어 기준이 승인된 뒤 진행한다.
- Stage 3은 Stage 2의 핵심 template 작성과 검증이 승인된 뒤 진행한다.
- Stage 4는 Stage 2와 Stage 3의 `zh-CN` pack 본문이 모두 작성된 뒤 진행한다.
- 최종 보고와 PR 게시는 Stage 4 승인 후 `task-final-report` 절차로 수행한다.

## 위험과 대응

- **절차 의미 drift**: manual/Skill은 `en`/`ko` 대표 파일과 수동 대조하고, 흔들리는 표현은 용어 대응표에 기록한다.
- **도구 식별자 번역 과다**: GitHub와 git 식별자는 원문을 유지하고 중국어 설명만 보탠다.
- **mixed locale pack**: #68과 같은 43개 파일 범위를 맞추고 Stage 4에서 manifest source 누락 0개를 확인한다.
- **availability 표현 과장**: pack source 준비 상태와 workflow 연결 완료 상태를 분리해 표현한다.
- **범위 과대화**: README 구조 재개편, CLI locale 선택 구현, migration guide는 후속 이슈 범위로 남긴다.

## 승인 요청 사항

- 위 4단계 분할, 산출물 경로, 검증 명령, 커밋 메시지로 #69 구현을 진행한다.
- Stage 1 완료 후 중국어 간체 용어 기준과 source inventory를 보고받고 승인한 뒤 Stage 2로 넘어간다.
- Stage 4에서 `templates/manifest.json`, `docs/localization.md`, `test/cli-smoke.test.js`, `README.zh-CN.md`, `docs/agent-entrypoint.md` 수정 여부는 실제 smoke 결과에 따라 최소 범위로 판단한다.
