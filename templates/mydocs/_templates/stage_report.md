# 단계 보고서 템플릿

이 파일은 `mydocs/working/task_{milestone}_{issue}_stage{stage}.md` 작성용 중앙 템플릿이다. 단계 보고서는 한 Stage의 구현, 검증, 잔여 위험, 다음 단계 영향을 기록하고 다음 단계 진입 승인을 받기 위한 문서다.

GitHub Issue: [#{issue}](https://github.com/{REPO_SLUG}/issues/{issue})
구현계획서: [`task_{milestone}_{issue}_impl.md`](../plans/task_{milestone}_{issue}_impl.md)
Stage: {stage}

## 단계 목적

{이번 Stage가 해결하려던 목적과 구현계획서상 위치를 적는다.}

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `{path}` | {변경 요약} |

## 본문 변경 정도 / 본문 무손실 여부

{문서 작업이면 원문 보존 여부와 재작성 범위를 적는다. 코드 작업이면 해당 없음 또는 API/동작 보존 여부를 적는다.}

## 검증 결과

실행 명령:

```bash
{검증 명령}
```

결과:

- {OK/MISS와 핵심 출력 요약}

## 잔여 위험

- {남은 위험. 없으면 `없음`으로 적는다.}

## 다음 단계 영향

- {다음 Stage에서 이어받아야 할 맥락. 없으면 `없음`으로 적는다.}

## 승인 요청

- Stage {stage} 산출물과 검증 결과를 승인하면 다음 단계로 진행한다.
