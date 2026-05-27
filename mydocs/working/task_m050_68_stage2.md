# #68 Stage 2 완료보고서

GitHub Issue: [#68](https://github.com/postmelee/hyper-waterfall/issues/68)
구현계획서: [`task_m050_68_impl.md`](../plans/task_m050_68_impl.md)
Stage: 2

## 단계 목적

Stage 2의 목적은 신규 적용 기본 locale인 `en` pack을 작성하는 것이다. Stage 1에서 확정한 범위에 따라 `templates/manifest.json`의 `localization.enabled: true` entry가 가리키는 모든 영어 source를 `templates/locales/en/**` 아래에 추가했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/locales/en/AGENTS.md` | 적용 저장소 에이전트 운영 규칙을 영어로 작성하고 문서 언어 정책을 selected locale 기준으로 정렬했다. |
| `templates/locales/en/CLAUDE.md` | Claude Code 진입 문서를 영어로 작성했다. |
| `templates/locales/en/.github/ISSUE_TEMPLATE/task.yml` | GitHub Issue Form label, description, placeholder, confirmation 문구를 영어로 작성했다. |
| `templates/locales/en/.github/pull_request_template.md` | PR 본문 템플릿을 영어로 작성하고 검증 섹션 구조를 유지했다. |
| `templates/locales/en/mydocs/_templates/*.md` | 중앙 산출물 템플릿 12개를 영어로 작성했다. |
| `templates/locales/en/mydocs/{orders,plans,working,report,feedback,tech,troubleshootings,pr}/README.md` | 산출물 폴더 README 8개를 영어로 작성했다. |
| `templates/locales/en/mydocs/manual/*.md` | manual 11개 파일을 영어로 작성했다. |
| `templates/locales/en/mydocs/skills/README.md`, `templates/locales/en/mydocs/skills/*/SKILL.md` | Skill directory 8개 파일을 영어로 작성했다. |
| `mydocs/tech/task_m050_68_translation_terms.md` | Stage 2 실행 메모를 추가했다. |
| `mydocs/working/task_m050_68_stage2.md` | Stage 2 검증 결과와 다음 단계 영향 보고서를 작성했다. |

## 본문 변경 정도 / 본문 무손실 여부

이번 단계는 root `templates/` 원문을 수정하지 않고 `templates/locales/en/**` source만 추가했다. 영어 pack은 기존 한국어 원문의 구조와 절차 의미를 기준으로 작성했다.

보존한 구조적 계약:

- placeholder: `{REPO_SLUG}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`, `{PR_TEMPLATE_PATH}`, `{issue}`, `{stage}`, `{sha}`, `{head_sha}`
- branch pattern: `local/task{N}`, `publish/task{N}`, `{BASE_BRANCH}`, `{RELEASE_BRANCH}`
- filename pattern: `task_{milestone}_{issue}.md`, `task_{milestone}_{issue}_impl.md`, `task_{milestone}_{issue}_stage{N}.md`, `task_{milestone}_{issue}_report.md`
- command/code block: `gh issue view`, `git diff --check`, `npm test`, `node bin/hyper-waterfall.js doctor`
- GitHub 식별자: Issue, PR, label, milestone, commit, branch

manual/Skill은 Stage 1 결정대로 전체 directory를 포함했다. `name` 같은 Skill 식별자는 유지했고, `description`과 본문 자연어만 영어로 정렬했다.

## 검증 결과

실행 명령:

```bash
rg -n "\{REPO_SLUG\}|\{BASE_BRANCH\}|\{issue\}|\{stage\}|\{head_sha\}|local/task\{N\}|publish/task\{N\}" templates/locales/en
if rg -n "작성 언어: 한국어|모든 문서는 한국어" templates/locales/en; then exit 1; else echo "OK: no Korean fixed-language policy remains in en locale"; fi
git diff --check
```

결과:

- OK. placeholder, branch pattern, filename pattern, command/link 계약이 `templates/locales/en`에 보존되어 있음을 확인했다.
- OK. 한국어 고정 언어 정책 문구는 `templates/locales/en`에 남아 있지 않다. 출력: `OK: no Korean fixed-language policy remains in en locale`
- OK. `git diff --check`는 출력 없이 통과했다.

보조 확인:

```bash
node - <<'NODE'
const fs=require('fs');
const manifest=require('./templates/manifest.json');
const missing=[];
for (const file of manifest.files) {
  if (!file.localization || file.localization.enabled !== true) continue;
  const p=file.localization.sourcePattern.replace('{locale}', 'en');
  if (!fs.existsSync(p)) missing.push(p);
}
if (missing.length) {
  console.error(missing.join('\n'));
  process.exit(1);
}
console.log('OK: all en locale sources exist');
NODE
ruby -ryaml -e 'YAML.load_file("templates/locales/en/.github/ISSUE_TEMPLATE/task.yml"); puts "OK: issue template YAML parses"'
if rg -n "[가-힣]" templates/locales/en; then exit 1; else echo "OK: no Korean text remains in en locale"; fi
find templates/locales/en -type f | wc -l
wc -l $(find templates/locales/en -type f | sort) mydocs/tech/task_m050_68_translation_terms.md
```

결과:

- OK. manifest 기준 `en` locale source 누락은 0개다. 출력: `OK: all en locale sources exist`
- OK. 영어 Issue Form YAML 파싱이 통과했다. Ruby 환경 경고(`ffi` extension warning)는 있었지만 YAML parse 자체는 `OK: issue template YAML parses`로 완료됐다.
- OK. `templates/locales/en`에 한글 문자는 남아 있지 않다. 출력: `OK: no Korean text remains in en locale`
- OK. `templates/locales/en` 파일 수는 43개다.
- 참고. 영어 pack과 번역 기준 문서의 총 line count는 3,394줄이다.

## 잔여 위험

- manual/Skill 전체 영어본은 절차 의미 보존을 우선해 작성했지만, Stage 4에서 대표 파일을 다시 대조해 semantic drift를 확인해야 한다.
- `templates/manifest.json`의 `availability.status`는 아직 `planned`다. `ko`와 `zh-CN` pack이 남아 있으므로 Stage 2에서는 manifest availability를 수정하지 않았다.
- `zh-CN` locale source는 아직 없고 #69 범위다.

## 다음 단계 영향

- Stage 3은 기존 한국어 원문을 `templates/locales/ko/**`에 보존한다.
- Stage 3에서도 manual/Skill directory 전체를 포함해야 mixed locale 위험을 줄일 수 있다.
- 한국어 pack은 기존 원문을 보존하되, "한국어로 작성" 고정 문구만 "선택된 Hyper-Waterfall locale" 정책으로 바꾼다.
- Stage 4에서 `doctor`, `init --dry-run`, `npm test`를 실행해 `en` fallback source 누락 해소와 남은 `zh-CN` 누락 범위를 확인한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 한국어 원문 보존 pack 작성으로 진행한다.
