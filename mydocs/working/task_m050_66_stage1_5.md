# Task M050 #66 Stage 1.5 완료 보고서

GitHub Issue: [#66](https://github.com/postmelee/hyper-waterfall/issues/66)
구현계획서: [`task_m050_66_impl.md`](../plans/task_m050_66_impl.md)
Stage: 1.5 — 한국어 README 문서 구조 정책 복원

## 단계 목적

Stage 1.4까지 `README.ko.md`의 `문서 구조` 섹션이 원본 README보다 과도하게 축약되며 운영 정책 일부가 유실된 문제를 복구했다. `mydocs/`와 공식 문서 루트의 경계, `manual/`, `tech/`, `_templates/`, GitHub Issue/PR 산출물 경계를 다시 명시해 적용 대상 저장소에서 문서 위치를 잘못 판단하지 않게 하는 것이 목적이다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.ko.md` | `문서 구조` 섹션에 폴더별 상세 규칙, 중앙 템플릿 정책, 공식 문서 루트 정책, `manual/`, `tech/`, `_templates/`, GitHub 플랫폼 산출물 경계를 원본 수준으로 복원 |
| `mydocs/plans/task_m050_66_impl.md` | Stage 1.5 계획, 검증 기준, 커밋 메시지 추가 |
| `mydocs/orders/20260525.md` | #66 상태를 `Stage 1.5 완료 보고 후 승인 대기`로 갱신 |
| `mydocs/working/task_m050_66_stage1_5.md` | Stage 1.5 완료 보고서 작성 |

## 본문 변경 정도 / 본문 무손실 여부

`README.ko.md`의 상위 구조와 부록은 유지했고, `도입 후 작업 흐름 > 문서 구조` 하단 정책 문단만 보강했다.

복원한 정책:

- 각 폴더의 상세 작성 규칙은 해당 폴더의 `README.md`를 기준으로 확인한다.
- 산출물 출력 형식은 중앙 템플릿 정책을 따른다.
- `mydocs/`는 공식 제품 문서 루트가 아니며, 공식 문서 루트 이름은 Hyper-Waterfall이 고정하지 않는다.
- 제품/사용자/기여자/API/아키텍처/로드맵 문서는 수행계획서에서 위치 판단을 먼저 승인받는다.
- `manual/` 문서는 반복 적용 운영 기준과 절차를 담고 특정 이슈·PR·릴리즈 검증·장애 기록은 산출물 문서로 분리한다.
- `tech/` 문서는 조사와 설계 판단 근거를 담으며 공식 계약 문서 승격에는 별도 task 승인이 필요하다.
- `_templates/`는 실제 task 산출물이 아니라 출력 형식의 진실 원천이다.
- GitHub Issue/PR은 GitHub 플랫폼 산출물이고 저장소 안 작업 문서는 `mydocs/_templates/` 기준으로 작성한다.

## 검증 결과

실행 명령:

```bash
rg -n "각 폴더의 상세 작성 규칙|중앙 템플릿 정책|공식 문서 루트 이름|GitHub Wiki|manual 문서 중립성 정책|tech/.*공식 계약 문서|_templates/.*진실 원천|GitHub Issue와 Pull Request는 GitHub 플랫폼 산출물|GitHub 플랫폼 템플릿 정책" README.ko.md
rg -n "문서 구조|적용 후 대상 저장소 구조|부록" README.ko.md
git diff --check
```

결과:

- OK: 유실됐던 문서 구조 정책 문구가 `README.ko.md`에 복원됐음을 확인했다.
- OK: `문서 구조`, `적용 후 대상 저장소 구조`, `부록` heading 위치가 유지됐다.
- OK: `git diff --check`가 빈 출력으로 통과했다.

## 잔여 위험

- Stage 2 영어 README 전환 시 이 정책 문단은 축약하지 말고 같은 의미 밀도로 번역해야 한다.
- Stage 3 중국어 README에서도 문서 루트와 플랫폼 산출물 경계가 모호해지지 않게 유지해야 한다.

## 다음 단계 영향

- Stage 2는 `README.ko.md`의 `문서 구조` 정책 문단을 영어 기본 README에 반영한다.
- Stage 4에서 세 언어 README 모두 `manual/`, `tech/`, `_templates/`, GitHub Issue/PR 경계를 보존하는지 검증한다.

## 승인 요청

- Stage 1.5 산출물과 검증 결과를 승인하면 추가 한국어 기준본 피드백 반영 또는 Stage 2 영어 기본 README 전환으로 진행한다.
