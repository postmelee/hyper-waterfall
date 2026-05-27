# #69 Stage 2 완료보고서

GitHub Issue: [#69](https://github.com/postmelee/hyper-waterfall/issues/69)
구현계획서: [`task_m050_69_impl.md`](../plans/task_m050_69_impl.md)
Stage: 2

## 단계 목적

Stage 2의 목적은 신규 적용과 생성 문서에 직접 노출되는 핵심 template을 중국어 간체 `zh-CN` locale pack으로 작성하는 것이다. Stage 1에서 확정한 파일 범위, 용어 대응표, 구조적 계약 보존 기준을 적용해 `AGENTS.md`, `CLAUDE.md`, GitHub Issue/PR template, 중앙 산출물 template, 산출물 폴더 README를 작성했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/locales/zh-CN/AGENTS.md` | Agent 운영 규칙, 승인 게이트, 문서 위치 판단, branch/commit 규칙을 중국어 간체로 작성했다. |
| `templates/locales/zh-CN/CLAUDE.md` | Claude Code 진입 문서를 중국어 간체로 작성하고 `AGENTS.md` 참조를 유지했다. |
| `templates/locales/zh-CN/.github/ISSUE_TEMPLATE/task.yml` | GitHub Issue Form label/description/placeholder를 중국어 간체로 작성하고 YAML 구조를 유지했다. |
| `templates/locales/zh-CN/.github/pull_request_template.md` | PR template의 작성 안내와 section heading을 중국어 간체로 작성했다. |
| `templates/locales/zh-CN/mydocs/_templates/**` | 중앙 산출물 template 12개를 중국어 간체로 작성했다. |
| `templates/locales/zh-CN/mydocs/{orders,plans,working,report,feedback,tech,troubleshootings,pr}/README.md` | 산출물 폴더 README 8개를 중국어 간체로 작성했다. |
| `mydocs/tech/task_m050_69_translation_terms.md` | Stage 2 적용 결과와 `{...}` placeholder 보존 기준을 추가했다. |
| `mydocs/orders/20260527.md` | #69 비고를 Stage 2 완료 상태로 갱신했다. |
| `mydocs/working/task_m050_69_stage2.md` | Stage 2 검증 결과와 다음 단계 영향을 기록했다. |

## 본문 변경 정도 / 본문 무손실 여부

Stage 2는 `templates/locales/en/**`의 Stage 2 대상 24개 파일을 기준으로 중국어 간체 본문을 새로 작성했다. 자연어 설명, label, description, section heading은 중국어 간체로 번역했지만 다음 구조적 계약은 보존했다.

- `{REPO_SLUG}`, `{BASE_BRANCH}`, `{issue}`, `{stage}`, `{head_sha}` 등 placeholder와 `{...}` template placeholder token 집합
- `Issue`, `PR`, `Stage`, `Skill`, `Task plan`, `Implementation plan`, `Final report` 등 workflow 식별자
- `local/task{issue_number}`, `publish/task{issue_number}`, `task_{milestone}_{issue}.md` 등 branch/file pattern
- GitHub Issue Form의 `type`, `id`, `validations.required` 등 YAML 구조
- code block과 명령어 예시

이번 단계에서는 `manual`과 `Skill` 본문을 아직 작성하지 않았다. 해당 19개 파일은 Stage 3 범위다.

## 검증 결과

실행 명령:

```bash
rg -n "\{REPO_SLUG\}|\{BASE_BRANCH\}|\{issue\}|\{stage\}|\{head_sha\}|local/task\{N\}|publish/task\{N\}" templates/locales/zh-CN
ruby -ryaml -e 'YAML.load_file("templates/locales/zh-CN/.github/ISSUE_TEMPLATE/task.yml"); puts "OK: issue template YAML parses"'
git diff --check
node -e 'const fs=require("fs"),p=require("path"); const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const x=p.join(d,e.name); return e.isDirectory()?walk(x):[x];}); const files=walk("templates/locales/en").map(x=>p.relative("templates/locales/en",x)).filter(x=>!x.startsWith("mydocs/manual/")&&!x.startsWith("mydocs/skills/")).sort(); const missing=files.filter(x=>!fs.existsSync(p.join("templates/locales/zh-CN",x))); let diff=0; for(const f of files){if(missing.includes(f)) continue; const en=fs.readFileSync(p.join("templates/locales/en",f),"utf8"); const zh=fs.readFileSync(p.join("templates/locales/zh-CN",f),"utf8"); const re=/\{[^\}\n]+\}/g; const a=[...new Set(en.match(re)||[])].sort(); const b=[...new Set(zh.match(re)||[])].sort(); if(JSON.stringify(a)!==JSON.stringify(b)) diff++;} console.log(`stage2-files=${files.length}`); console.log(`missing=${JSON.stringify(missing)}`); console.log(`placeholder-diff-files=${diff}`);'
```

결과:

- OK. `rg`로 주요 placeholder, branch/file pattern, GitHub template token이 `zh-CN` pack에 보존되어 있음을 확인했다.
- OK. Issue Form YAML은 파싱된다. 실행 환경의 `ffi-1.13.1` native extension 경고가 stderr에 출력됐지만, 파싱 결과는 `OK: issue template YAML parses`였다.
- OK. `git diff --check`는 출력 없이 통과했다.
- OK. Stage 2 대상 파일 수는 24개이며 `missing=[]`이다.
- OK. Stage 2 대상 파일의 `{...}` placeholder token 집합은 `en` pack과 일치한다. `placeholder-diff-files=0`.

수동 검토:

- `templates/locales/zh-CN/AGENTS.md`: 승인 게이트, Issue 추적, Stage 전환 승인, 문서 위치 판단, cleanup 조건이 유지된다.
- `templates/locales/zh-CN/.github/ISSUE_TEMPLATE/task.yml`: 사용자-facing 문구는 중국어 간체이고 GitHub Form 구조는 유지된다.
- `templates/locales/zh-CN/.github/pull_request_template.md`: PR 작성 안내와 `{REPO_SLUG}`, `{head_sha}` 링크 template이 유지된다.
- `templates/locales/zh-CN/mydocs/_templates/task_plan.md`: 문서 위치 판단과 승인 요청 구조가 유지된다.
- `templates/locales/zh-CN/mydocs/_templates/stage_report.md`: Stage 목적, 산출물, 검증 결과, 승인 요청 구조가 유지된다.

## 잔여 위험

- Stage 3에서 작성할 manual/Skill 19개는 `requiresSemanticReview: true` 대상이므로, 번역 품질보다 승인 게이트와 금지 사항 의미 보존을 우선해 대조해야 한다.
- Stage 4 전까지 `zh-CN` manifest localized entry 누락은 `mydocs/manual`과 `mydocs/skills` directory 2개가 남는다.

## 다음 단계 영향

- Stage 3은 `templates/locales/zh-CN/mydocs/manual/**` 11개와 `templates/locales/zh-CN/mydocs/skills/**` 8개를 작성한다.
- Stage 3 작성 시 Stage 2에서 고정한 `{...}` placeholder token 원문 보존 검사를 manual/Skill에도 적용한다.
- Skill `name`, directory name, `SKILL.md` 같은 discovery 식별자는 번역하지 않는다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 manual과 Skill 중국어 간체 pack 작성으로 진행한다.
