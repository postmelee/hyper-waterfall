# #68 Stage 3 완료보고서

GitHub Issue: [#68](https://github.com/postmelee/hyper-waterfall/issues/68)
구현계획서: [`task_m050_68_impl.md`](../plans/task_m050_68_impl.md)
Stage: 3

## 단계 목적

Stage 3의 목적은 기존 `templates/` 한국어 원문을 `templates/locales/ko/**`에 보존해, locale pack 적용 시 한국어 원문도 명시적인 source로 선택할 수 있게 만드는 것이다. Stage 1에서 확정한 범위에 따라 manifest의 `localization.enabled: true` entry가 가리키는 모든 한국어 source를 추가했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/locales/ko/AGENTS.md` | root 한국어 원문을 보존하고 문서 언어 정책만 selected locale 기준으로 정렬했다. |
| `templates/locales/ko/CLAUDE.md` | Claude Code 진입 문서 한국어 원문을 보존했다. |
| `templates/locales/ko/.github/ISSUE_TEMPLATE/task.yml` | GitHub Issue Form 한국어 원문을 보존했다. |
| `templates/locales/ko/.github/pull_request_template.md` | PR 본문 템플릿 한국어 원문을 보존했다. |
| `templates/locales/ko/mydocs/_templates/*.md` | 중앙 산출물 템플릿 12개를 보존하고, 7개 파일의 작성 언어 정책만 selected locale 기준으로 정렬했다. |
| `templates/locales/ko/mydocs/{orders,plans,working,report,feedback,tech,troubleshootings,pr}/README.md` | 산출물 폴더 README 8개 한국어 원문을 보존했다. |
| `templates/locales/ko/mydocs/manual/*.md` | manual 11개 파일을 보존하고, `document_structure_guide.md`의 문서 언어 정책만 selected locale 기준으로 정렬했다. |
| `templates/locales/ko/mydocs/skills/README.md`, `templates/locales/ko/mydocs/skills/*/SKILL.md` | Skill directory 8개 파일을 보존하고, `todo/SKILL.md`의 작성 언어 정책만 selected locale 기준으로 정렬했다. |
| `mydocs/tech/task_m050_68_translation_terms.md` | Stage 3 실행 메모를 추가했다. |
| `mydocs/working/task_m050_68_stage3.md` | Stage 3 검증 결과와 다음 단계 영향 보고서를 작성했다. |

## 본문 변경 정도 / 본문 무손실 여부

이번 단계는 root `templates/` 파일을 수정하지 않고 `templates/locales/ko/**` source만 추가했다. 한국어 pack은 기존 root 한국어 원문을 기계적으로 보존했고, 원본과 다른 파일은 고정 언어 정책을 selected locale 정책으로 바꾼 10개로 제한했다.

원본 대비 변경된 한국어 pack 파일:

- `templates/locales/ko/AGENTS.md`
- `templates/locales/ko/mydocs/_templates/external_pr_report.md`
- `templates/locales/ko/mydocs/_templates/external_pr_review.md`
- `templates/locales/ko/mydocs/_templates/external_pr_review_impl.md`
- `templates/locales/ko/mydocs/_templates/feedback.md`
- `templates/locales/ko/mydocs/_templates/orders.md`
- `templates/locales/ko/mydocs/_templates/tech_note.md`
- `templates/locales/ko/mydocs/_templates/troubleshooting.md`
- `templates/locales/ko/mydocs/manual/document_structure_guide.md`
- `templates/locales/ko/mydocs/skills/todo/SKILL.md`

보존한 구조적 계약:

- placeholder: `{REPO_SLUG}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`, `{PR_TEMPLATE_PATH}`, `{issue}`, `{stage}`, `{sha}`, `{head_sha}`
- branch pattern: `local/task{N}`, `publish/task{N}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`
- filename pattern: `task_{milestone}_{issue}.md`, `task_{milestone}_{issue}_impl.md`, `task_{milestone}_{issue}_stage{N}.md`, `task_{milestone}_{issue}_report.md`
- command/code block: `gh issue view`, `git diff --check`, `npm test`, `node bin/hyper-waterfall.js doctor`
- GitHub 식별자: Issue, PR, label, milestone, commit, branch

## 검증 결과

실행 명령:

```bash
rg -n "작성 언어: 한국어|모든 문서는 한국어|선택한 Hyper-Waterfall locale|선택된 Hyper-Waterfall locale" templates/locales/ko
rg -n "\{REPO_SLUG\}|\{BASE_BRANCH\}|\{issue\}|\{stage\}|\{head_sha\}|local/task\{N\}|publish/task\{N\}" templates/locales/ko
git diff --check
```

결과:

- OK. `작성 언어: 한국어`, `모든 문서는 한국어` 고정 정책 문구는 `templates/locales/ko`에 남아 있지 않다.
- OK. selected locale 정책 문구는 10개 위치에만 남아 있다.
- OK. placeholder, branch pattern, filename pattern, command/link 계약이 `templates/locales/ko`에 보존되어 있음을 확인했다.
- OK. `git diff --check`는 출력 없이 통과했다.

보조 확인:

```bash
node - <<'NODE'
const fs=require('fs');
const manifest=require('./templates/manifest.json');
const missing=[];
for (const file of manifest.files) {
  if (!file.localization || file.localization.enabled !== true) continue;
  const p=file.localization.sourcePattern.replace('{locale}', 'ko');
  if (!fs.existsSync(p)) missing.push(p);
}
if (missing.length) {
  console.error(missing.join('\n'));
  process.exit(1);
}
console.log('OK: all ko locale sources exist');
NODE
ruby -ryaml -e 'YAML.load_file("templates/locales/ko/.github/ISSUE_TEMPLATE/task.yml"); puts "OK: issue template YAML parses"'
find templates/locales/ko -type f | wc -l
```

결과:

- OK. manifest 기준 `ko` locale source 누락은 0개다. 출력: `OK: all ko locale sources exist`
- OK. 한국어 Issue Form YAML 파싱이 통과했다. Ruby 환경 경고(`ffi` extension warning)는 있었지만 YAML parse 자체는 `OK: issue template YAML parses`로 완료됐다.
- OK. `templates/locales/ko` 파일 수는 43개다.

원문 보존 범위 확인:

root source와 `templates/locales/ko` source의 43개 대응 파일을 Node 스크립트로 대조해 다른 파일 목록만 출력했다.

결과:

- OK. 대조 대상 43개 중 원본과 다른 파일은 10개이며, 모두 selected locale 정책 문구를 반영한 파일이다.

## 잔여 위험

- 한국어 pack은 원문 복사 기반이라 의미 drift 위험은 낮지만, Stage 4에서 `doctor`, `init --dry-run`, `npm test`로 실제 manifest/source 정합성을 다시 검증해야 한다.
- `zh-CN` locale source는 아직 없고 #69 범위다.

## 다음 단계 영향

- Stage 4에서는 `en`, `ko` source가 모두 존재하는 상태에서 CLI `doctor`, `init --dry-run`, `npm test`를 실행한다.
- `zh-CN` source 누락은 #69 후속 범위로 보고하되, #68의 실패로 처리하지 않는다.
- manifest availability나 smoke test 기대값이 실제 pack 상태와 어긋나는 경우에만 최소 수정한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 Stage 4 pack 정합성 검증과 smoke 기대값 정렬로 진행한다.
