## 요약

<!-- 최대 4개 bullet로 압축합니다.
- 대상 타스크는 무엇인가요?
- 왜 변경했나요?
- 무엇을 변경했나요?
- 리뷰어가 먼저 볼 지점은 무엇인가요?
-->

- 대상 타스크: #
- 왜:
- 무엇:
- 리뷰 포인트:

## 변경 내역

<!--
Stage 기반 작업이면 Stage당 1줄로 적습니다.
Stage 제목은 단계 보고서로, 짧은 커밋 SHA는 commit URL로 링크합니다.
예: **[Stage 1](stage-url)** ([0cdbae0](commit-url)): 한 줄 요약
-->

- **[Stage 1](stage-url)** ([0cdbae0](commit-url)):

### 영향 영역

<!-- 영역이 여럿이고 리뷰어가 영역별 우선순위를 알아야 할 때만 유지합니다.
1~2개 영역만 변경되면 이 하위 섹션을 통째로 삭제합니다. 최대 5행. -->

| 영역 | 변경 | 리뷰 포인트 |
|------|------|-------------|
|  |  |  |

### 작업 문서

<!--
작업 문서는 PR 생성 직전 `git rev-parse HEAD`로 확인한 PR head commit SHA 기준 GitHub blob URL을 사용합니다.
raw URL 대신 `[파일명](https://github.com/postmelee/hyper-waterfall/blob/{head_sha}/mydocs/...)` 형식으로 적습니다.
해당 없는 항목은 삭제합니다.
-->

- 수행 계획서: [task_m{milestone}_{issue}.md](https://github.com/postmelee/hyper-waterfall/blob/{head_sha}/mydocs/plans/task_m{milestone}_{issue}.md)
- 구현 계획서: [task_m{milestone}_{issue}_impl.md](https://github.com/postmelee/hyper-waterfall/blob/{head_sha}/mydocs/plans/task_m{milestone}_{issue}_impl.md)
- 최종 보고서: [task_m{milestone}_{issue}_report.md](https://github.com/postmelee/hyper-waterfall/blob/{head_sha}/mydocs/report/task_m{milestone}_{issue}_report.md)

## 핵심 리뷰 포인트

<!-- 필요한 경우만 유지합니다. 최대 3개, 코드 블록은 각 20줄 이하로 제한합니다. 해당 없으면 섹션을 삭제합니다. -->

-

## 검증

<!--
실제 수행한 검증만 남깁니다.
명령만 나열하지 말고, 주제 / 검증 방법 / 결과 / 근거를 함께 적습니다.
긴 로그는 붙이지 말고 핵심 출력, 통과 개수, 확인한 조건만 요약합니다.
실행하지 않은 검증은 표에 남기지 말고 `검증 한계` 또는 `남은 리스크`에 사유를 적습니다.
해당 없는 하위 섹션은 통째로 삭제합니다.
-->

### 자동 검증

| 주제 | 검증 방법 | 결과 | 근거 |
|------|-----------|------|------|
|  | `명령` | OK/MISS | 핵심 출력 또는 확인한 조건 |

### 수동/시나리오 검증

| 시나리오 | 확인 절차 | 결과 | 자료 |
|----------|-----------|------|------|
|  |  | OK/MISS | 스크린샷, 영상, 산출물 링크 또는 없음 |

### CI/원격 검증

| 항목 | 결과 | 근거 |
|------|------|------|
|  | OK/MISS/SKIP | GitHub Check 이름, run 링크 또는 확인 시점 |

### 검증 한계

- 없음

## 스크린샷

<!-- 시각적 변경사항이 있을 때만 유지합니다. 실제 이미지나 산출물 없이 형식만 채우지 않습니다. 해당 없으면 섹션을 삭제합니다. -->

| Before | After |
|--------|-------|
|  |  |

## 관련 이슈

<!-- 현재 PR의 대상 타스크가 아니라, PR 이해에 필요한 선행/후속/Epic/upstream/참고 이슈를 적습니다. 해당 없으면 "없음"으로 적습니다. -->

-

## 후속 이슈 제안

<!-- 아직 이슈가 없지만 분리할 후보를 적습니다. 없으면 "없음"으로 적습니다. -->

-

## 남은 리스크

<!-- 리뷰어가 알아야 할 검증 한계나 운영상 주의사항을 적습니다. 없으면 "없음"으로 적습니다. -->

-
