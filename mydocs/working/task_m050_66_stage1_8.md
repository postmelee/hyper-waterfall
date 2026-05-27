# Task M050 #66 Stage 1.8 완료 보고서

GitHub Issue: [#66](https://github.com/postmelee/hyper-waterfall/issues/66)
구현계획서: [`task_m050_66_impl.md`](../plans/task_m050_66_impl.md)
Stage: 1.8 — 한국어 README 적용 적합성·표 구조 보강

## 단계 목적

한국어 README 기준본에 적용 적합성 판단 섹션을 복원하고, 장문 정책 설명을 표로 바꿔 읽기 밀도를 낮췄다. 요청 범위는 `적용 후 대상 저장소 구조`까지의 본문이며, `적용하면 바로 달라지는 것` 10개 리스트는 유지했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.ko.md` | `언제 쓰면 좋은가` 섹션 복원, `왜 Hyper-Waterfall인가` heading 변경, 중요 알림 통합, 문서 구조/적용 후 구조 정책 설명 표 전환 |
| `mydocs/plans/task_m050_66_impl.md` | Stage 1.8 계획 추가와 공통 README 구조 갱신 |
| `mydocs/orders/20260525.md` | #66 상태를 `Stage 1.8 완료 보고 후 승인 대기`로 갱신 |
| `mydocs/working/task_m050_66_stage1_8.md` | Stage 1.8 완료 보고서 작성 |

## 본문 변경 정도 / 본문 무손실 여부

`README.ko.md`는 적용 판단과 정책 설명 형식만 조정했다. 방법론 설명, 구현 확장, 작업 흐름, `적용하면 바로 달라지는 것` 10개 리스트는 삭제하지 않았다.

주요 변경:

- `바로 설치` 다음에 `언제 쓰면 좋은가`를 복원하고, 잘 맞는 경우와 과한 경우를 표로 정리했다.
- 상단 중요 문구와 결정권 메시지를 하나의 `[!IMPORTANT]` alert로 합쳤다.
- `왜 이 저장소를 써야 하는가`를 `왜 Hyper-Waterfall인가`로 바꿨다.
- `문서 구조`의 `mydocs/`, `manual/`, `tech/`, `_templates/`, GitHub Issue/PR 경계를 표로 전환했다.
- `적용 후 대상 저장소 구조`의 tree 아래 설명을 주요 항목별 기준 표로 전환했다.
- 모델명 중심 표현이 남지 않았는지 확인했다.

## 검증 결과

실행 명령:

```bash
rg -n "언제 쓰면 좋은가|잘 맞는 경우|과한 경우|왜 Hyper-Waterfall인가|^## 부록" README.ko.md
rg -n "README에서는 아래 경계|^\\| 영역 \\| README에서 알아야 할 기준 \\| 상세 기준 \\||적용 후 생성되는 주요 항목|^\\| 항목 \\| 역할 \\| 기준 문서 \\|" README.ko.md
rg -n "OpenAI GPT|Claude Opus|GPT-5|Opus 4|^# 부록|왜 이 저장소를 써야 하는가|Why Hyper-waterfall" README.ko.md
rg -n "^### 적용하면 바로 달라지는 것|^10\\. \\*\\*AI 코딩이" README.ko.md
git diff --check
```

결과:

- OK: `언제 쓰면 좋은가`, `잘 맞는 경우`, `과한 경우`, `왜 Hyper-Waterfall인가`, `## 부록` heading이 확인됐다.
- OK: `문서 구조` 정책 표와 `적용 후 대상 저장소 구조` 기준 표가 확인됐다.
- OK: 모델명 중심 표현, `# 부록`, 기존 `왜 이 저장소를 써야 하는가`, `Why Hyper-waterfall` 검색은 결과 없음(exit 1)으로 확인됐다.
- OK: `적용하면 바로 달라지는 것` heading과 10번째 항목이 유지됐다.
- OK: `git diff --check`가 빈 출력으로 통과했다.

## 잔여 위험

- Stage 2 영어 README 전환 시 이번 한국어 기준본의 `When to Use` 표와 문서 구조 정책 표를 같은 정보 밀도로 옮겨야 한다.
- Stage 3 중국어 간체 README에서도 공식 문서 루트와 GitHub 플랫폼 산출물 경계가 축약되며 의미를 잃지 않게 해야 한다.

## 다음 단계 영향

- Stage 2는 이번 `README.ko.md`의 상위 구조를 영어 기본 README로 옮긴다.
- Stage 4에서는 세 README의 heading, 언어 링크, 문서 구조 표, 적용 후 구조 표의 링크 정합성을 함께 검증한다.

## 승인 요청

- Stage 1.8 산출물과 검증 결과를 승인하면 Stage 2 영어 기본 README 전환으로 진행한다.
