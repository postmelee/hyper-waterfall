# #69 Stage 1 완료보고서

GitHub Issue: [#69](https://github.com/postmelee/hyper-waterfall/issues/69)
구현계획서: [`task_m050_69_impl.md`](../plans/task_m050_69_impl.md)
Stage: 1

## 단계 목적

Stage 1의 목적은 `zh-CN` locale pack 작성 전에 파일 범위, manifest source 대상, 중국어 간체 용어 기준, 구조적 계약 보존 기준을 확정하는 것이다. Stage 2와 Stage 3에서 실제 번역 파일을 작성하기 전에 mixed locale 위험과 절차 의미 drift를 줄이기 위한 기준을 고정했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/tech/task_m050_69_translation_terms.md` | #68 `en`/`ko` pack과 같은 43개 파일 범위, manifest localized entry 15개, 중국어 간체 용어 대응표, 작성 언어 정책 문구, 후속 Stage 체크리스트를 정리했다. |
| `mydocs/working/task_m050_69_stage1.md` | Stage 1 검증 결과와 다음 단계 영향을 기록했다. |
| `mydocs/orders/20260527.md` | #69 비고를 Stage 1 완료 상태로 갱신했다. |

## 본문 변경 정도 / 본문 무손실 여부

이번 단계는 실제 `templates/locales/zh-CN/**` 본문을 아직 작성하지 않았다. 기존 `en`/`ko` pack과 manifest를 조사해 중국어 간체 작성 기준만 신규 문서로 고정했다.

확정한 기준:

- `zh-CN` pack은 #68 `en`/`ko`와 같은 43개 파일을 작성한다.
- Stage 2는 핵심 적용 template과 산출물 template 24개를 작성한다.
- Stage 3은 manual 11개와 Skill 8개를 작성한다.
- manifest localized entry 15개의 `zh-CN` source 누락은 현재 15개이며, Stage 4까지 0개로 만들어야 한다.
- placeholder, branch pattern, filename pattern, command/code block, GitHub 식별자, Skill identifier는 번역하지 않는다.

## 검증 결과

실행 명령:

```bash
find templates/locales/en -type f | sort
find templates/locales/ko -type f | sort
rg -n "zh-CN|简体中文|locale|requiresSemanticReview|sourcePattern" templates docs test
git diff --check
```

결과:

- OK. `templates/locales/en` 파일 수는 43개다.
- OK. `templates/locales/ko` 파일 수는 43개다.
- OK. `en`과 `ko`의 상대 경로 목록 차이는 없다. `onlyEn=[]`, `onlyKo=[]`.
- OK. `rg`로 `zh-CN`, locale, `requiresSemanticReview`, `sourcePattern` 관련 기존 정책과 test 기대값을 확인했다. #69 범위와 충돌하는 기존 문구는 없다.
- OK. `git diff --check`는 출력 없이 통과했다.

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
```

결과:

- OK. `en: missing=0`
- OK. `ko: missing=0`
- OK. `zh-CN: missing=15`이며 #69에서 해소할 직접 범위다.

## 잔여 위험

- 중국어 간체 번역 중 승인 게이트, 금지 사항, cleanup 조건이 약해질 수 있다. Stage 2/3에서 대표 파일 수동 대조를 수행해야 한다.
- `Issue`, `PR`, `Stage`, `Skill` 같은 식별자를 중국어 문장 안에서 어디까지 유지할지 일관성이 필요하다. Stage 2/3에서 용어 대응표를 계속 참조한다.

## 다음 단계 영향

- Stage 2는 핵심 적용 template과 산출물 template 24개를 작성한다.
- Stage 2 작성 시 `mydocs/tech/task_m050_69_translation_terms.md`의 용어 대응표와 작성 언어 정책 문구를 기준으로 삼는다.
- Stage 3은 manual/Skill 19개를 작성하고 `requiresSemanticReview: true` 의미 보존 검토를 수행한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 핵심 적용 template과 산출물 template 작성으로 진행한다.
